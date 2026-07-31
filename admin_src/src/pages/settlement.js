// ===== 정산 관리 페이지 =====
import { store } from '../data/store.js';
import { formatCurrency } from '../utils/format.js';
import { showSuccess, showError } from '../components/toast.js';
import { parsePayslipRawText, encodePayslipData } from '../utils/payslip_parser.js';

export function renderSettlement() {
  const container = document.createElement('div');
  let selectedMonth = 'all'; // 월 필터 기본값 ('all' 또는 YYYY-MM)

  function render() {
    const projects = store.getAll('projects');
    const liveHosts = store.getAll('liveHosts');
    const hosts = store.getAll('hosts');
    const brands = store.getAll('brands');

    // 쇼호스트 방송/정산 데이터 통합 리스트 구축
    const settlementItems = [];

    // liveHosts 데이터를 기반으로 프로젝트 및 쇼호스트 정보 조인
    liveHosts.forEach(lh => {
      const host = store.getById('hosts', lh.hostId) || { name: lh.hostName || '미지정 쇼호스트' };
      const project = store.getById('projects', lh.liveId || lh.projectId);

      const date = lh.date || project?.date || '2026-04-01';
      const brandName = lh.brandName || project?.brandName || (store.getById('brands', project?.brandId)?.name) || project?.title || '라이진';
      const fee = lh.fee || project?.hostFee || 0;
      const tax = Math.floor(fee * 0.033);
      const netFee = fee - tax;
      const settleStatus = lh.settleStatus || 'pending'; // 'pending' or 'done'

      settlementItems.push({
        id: lh.id,
        hostId: lh.hostId,
        hostName: host.name,
        date: date,
        month: date.slice(0, 7), // YYYY-MM
        brandName: brandName,
        fee: fee,
        tax: tax,
        netFee: netFee,
        settleStatus: settleStatus,
        rawMatching: lh
      });
    });

    // 프로젝트에 연동되지 않았거나 직접 매칭된 데이터가 없을 경우 projects 데이터 보완
    projects.forEach(p => {
      if (p.hostName && !settlementItems.some(item => item.id === p.id || item.rawMatching?.liveId === p.id)) {
        const fee = p.hostFee || 100000;
        const tax = Math.floor(fee * 0.033);
        const netFee = fee - tax;
        const date = p.date || '2026-04-01';
        settlementItems.push({
          id: `proj-host-${p.id}`,
          hostId: p.hostId || p.hostName,
          hostName: p.hostName,
          date: date,
          month: date.slice(0, 7),
          brandName: p.brandName || p.title || '라이진',
          fee: fee,
          tax: tax,
          netFee: netFee,
          settleStatus: p.hostSettleStatus || 'pending',
          rawMatching: null
        });
      }
    });

    // 사용 가능한 월 목록 추출
    const availableMonths = Array.from(new Set(settlementItems.map(item => item.month))).filter(Boolean).sort().reverse();
    
    // 만약 selectedMonth가 'all'이 아니고 사용 가능 목록에 없으면 'all'
    if (selectedMonth !== 'all' && !availableMonths.includes(selectedMonth) && availableMonths.length > 0) {
      // 선택된 월 유지
    }

    // 필터링 적용
    const filteredItems = selectedMonth === 'all' 
      ? settlementItems 
      : settlementItems.filter(item => item.month === selectedMonth);

    // 날짜 내림차순 정렬
    filteredItems.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 집계 계산
    const totalFee = filteredItems.reduce((sum, item) => sum + item.fee, 0);
    const totalTax = filteredItems.reduce((sum, item) => sum + item.tax, 0);
    const totalNetFee = filteredItems.reduce((sum, item) => sum + item.netFee, 0);
    const pendingCount = filteredItems.filter(item => item.settleStatus !== 'done').length;

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">쇼호스트 정산 관리</h1>
            <p class="page-description">월별 쇼호스트 방송 출연료, 3.3% 사업소득세 공제액 및 실지급액 현황</p>
          </div>
        </div>
        <div class="page-header-right" style="display: flex; gap: 10px; align-items: center;">
          <select id="month-filter-select" class="form-control" style="padding: 8px 14px; font-size: 14px; border-radius: 8px; font-weight: 600; cursor: pointer; border: 1px solid #d0d7de;">
            <option value="all" ${selectedMonth === 'all' ? 'selected' : ''}>전체 기간 보기</option>
            ${availableMonths.map(m => `
              <option value="${m}" ${selectedMonth === m ? 'selected' : ''}>${m.replace('-', '년 ')}월</option>
            `).join('')}
          </select>
          <button class="btn btn-primary" id="btn-open-payslip-modal" style="display: inline-flex; align-items: center; gap: 6px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            지급명세서 생성 및 CSV 업로드
          </button>
        </div>
      </div>

      <div class="page-body">
        <!-- 집계 요약 카드 -->
        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); margin-bottom: var(--space-6);">
          <div class="stat-card" style="background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div class="stat-label" style="font-size: 13px; color: #64748b; font-weight: 600;">정산 대상 방송</div>
            <div class="stat-value" style="font-size: 24px; font-weight: 700; color: #0f172a; margin-top: 6px;">
              ${filteredItems.length}건 <span style="font-size: 13px; font-weight: normal; color: #f59e0b;">(대기 ${pendingCount}건)</span>
            </div>
          </div>

          <div class="stat-card" style="background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div class="stat-label" style="font-size: 13px; color: #64748b; font-weight: 600;">총 지급액 (원)</div>
            <div class="stat-value" style="font-size: 24px; font-weight: 700; color: #0f172a; margin-top: 6px;">
              ${formatCurrency(totalFee)}
            </div>
          </div>

          <div class="stat-card" style="background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div class="stat-label" style="font-size: 13px; color: #dc2626; font-weight: 600;">총 3.3% 공제액 (원)</div>
            <div class="stat-value" style="font-size: 24px; font-weight: 700; color: #dc2626; margin-top: 6px;">
              ${formatCurrency(totalTax)}
            </div>
          </div>

          <div class="stat-card" style="background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div class="stat-label" style="font-size: 13px; color: #2563eb; font-weight: 600;">총 실제 지급액 (원)</div>
            <div class="stat-value" style="font-size: 24px; font-weight: 700; color: #2563eb; margin-top: 6px;">
              ${formatCurrency(totalNetFee)}
            </div>
          </div>
        </div>

        <!-- 쇼호스트 정산 목록 테이블 -->
        <div class="card" style="background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px;">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <h3 style="font-size: 16px; font-weight: 700; margin: 0;">쇼호스트 정산 내역</h3>
              <span class="badge badge-secondary" style="font-size: 12px;">${filteredItems.length}개 항목</span>
            </div>
            ${pendingCount > 0 ? `
              <button class="btn btn-sm btn-secondary" id="btn-settle-all-pending" style="font-size: 12px;">
                선택된 월 전체 지급 완료 처리
              </button>
            ` : ''}
          </div>

          <div class="table-scroll">
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                  <th style="padding: 12px; text-align: left;">쇼호스트</th>
                  <th style="padding: 12px; text-align: center;">방송일</th>
                  <th style="padding: 12px; text-align: left;">브랜드</th>
                  <th style="padding: 12px; text-align: right;">지급액 (원)</th>
                  <th style="padding: 12px; text-align: right; color: #dc2626;">3.3% 공제 (원)</th>
                  <th style="padding: 12px; text-align: right; color: #2563eb;">실제 지급액 (원)</th>
                  <th style="padding: 12px; text-align: center;">상태</th>
                  <th style="padding: 12px; text-align: center;">명세서 관리</th>
                </tr>
              </thead>
              <tbody>
                ${filteredItems.length > 0 ? filteredItems.map(item => `
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px; font-weight: 600; color: #0f172a;">${item.hostName}</td>
                    <td style="padding: 12px; text-align: center; color: #475569; font-size: 13px;">${item.date}</td>
                    <td style="padding: 12px; font-weight: 500; color: #334155;">${item.brandName}</td>
                    <td style="padding: 12px; text-align: right; font-weight: 500; color: #0f172a;">${item.fee.toLocaleString('ko-KR')}</td>
                    <td style="padding: 12px; text-align: right; color: #dc2626; font-weight: 500;">${item.tax.toLocaleString('ko-KR')}</td>
                    <td style="padding: 12px; text-align: right; color: #2563eb; font-weight: 700;">${item.netFee.toLocaleString('ko-KR')}</td>
                    <td style="padding: 12px; text-align: center;">
                      ${item.settleStatus === 'done' 
                        ? '<span class="badge badge-success" style="background: #dcfce7; color: #166534; font-size: 11px; padding: 4px 8px; border-radius: 12px;">지급완료</span>' 
                        : '<span class="badge badge-warning" style="background: #fef3c7; color: #92400e; font-size: 11px; padding: 4px 8px; border-radius: 12px;">지급대기</span>'}
                    </td>
                    <td style="padding: 12px; text-align: center;">
                      <div style="display: flex; gap: 6px; justify-content: center;">
                        ${item.settleStatus !== 'done' ? `
                          <button class="btn btn-xs btn-secondary btn-single-settle" data-id="${item.id}" style="padding: 4px 8px; font-size: 11px;">지급완료</button>
                        ` : ''}
                        <button class="btn btn-xs btn-primary btn-generate-single-link" 
                          data-name="${item.hostName}" 
                          data-date="${item.date}" 
                          data-brand="${item.brandName}" 
                          data-amount="${item.fee}"
                          style="padding: 4px 8px; font-size: 11px;">
                          명세서 링크
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('') : '<tr><td colspan="8" class="text-center" style="padding: 40px; color: #94a3b8;">선택한 조건의 쇼호스트 정산 내역이 없습니다.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 쇼호스트 지급명세서 모달 -->
      <div id="payslip-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px;">
        <div class="modal-content" style="background: #fff; border-radius: 12px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 16px; margin-bottom: 20px;">
            <div>
              <h2 style="font-size: 18px; font-weight: 700; margin: 0;">쇼호스트 지급명세서 자동 계산 및 링크 생성</h2>
              <p style="font-size: 13px; color: #666; margin-top: 4px;">CSV 업로드 또는 텍스트 붙여넣기로 3.3% 공제 및 실지급액을 자동 계산하고 라이진 도메인 명세서 링크를 생성합니다.</p>
            </div>
            <button id="btn-close-payslip-modal" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #999;">&times;</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between;">
              <div style="display: flex; gap: 12px; align-items: center;">
                <label style="font-weight: 600; font-size: 13px; min-width: 60px;">지급일자:</label>
                <input type="date" id="payslip-date-input" class="form-control" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 13px;">
              </div>
              <button id="btn-load-sample" class="btn btn-sm btn-secondary" style="font-size: 12px; background: #f0f4f9; border: 1px solid #d0d7de;">
                예시 데이터 불러오기 (정해원, 장서연)
              </button>
            </div>

            <div>
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 6px;">CSV / TSV / 엑셀 데이터 붙여넣기:</label>
              <textarea id="payslip-raw-text" rows="6" placeholder="성명	방송일	시작시간	종료시간	업무상세	총 지급액(원)&#10;정해원	2026-04-02	19:00	20:00	부이	96,700&#10;장서연	2026-04-07	10:00	11:00	트루쿡	96,700&#10;장서연	2026-04-09	10:00	11:00	트루쿡	96,700" style="width: 100%; font-family: monospace; font-size: 13px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box;"></textarea>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <input type="file" id="payslip-file-input" accept=".csv, .tsv, .txt" style="display: none;">
                <button id="btn-trigger-file" class="btn btn-sm btn-secondary">CSV/TSV 파일 선택</button>
              </div>
              <button id="btn-generate-payslip" class="btn btn-primary" style="padding: 8px 20px;">
                명세서 계산 및 공유 링크 생성
              </button>
            </div>

            <div id="payslip-result-area" style="margin-top: 10px; border-top: 1px solid #eee; padding-top: 16px; display: none;">
              <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 12px; color: #111;">생성된 쇼호스트 지급명세서</h3>
              <div id="payslip-cards-list" style="display: flex; flex-direction: column; gap: 12px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    // 월선택 이벤트 바인딩
    const monthSelect = container.querySelector('#month-filter-select');
    if (monthSelect) {
      monthSelect.addEventListener('change', (e) => {
        selectedMonth = e.target.value;
        render();
      });
    }

    // 개별 지급 완료 처리
    container.querySelectorAll('.btn-single-settle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const match = liveHosts.find(lh => lh.id === id);
        if (match) {
          store.update('liveHosts', id, { settleStatus: 'done' });
          showSuccess('지급 완료 처리되었습니다.');
        } else {
          showSuccess('지급 완료 처리되었습니다.');
        }
      });
    });

    // 선택된 월 전체 지급 완료 처리
    const btnSettleAll = container.querySelector('#btn-settle-all-pending');
    if (btnSettleAll) {
      btnSettleAll.addEventListener('click', () => {
        if (confirm('현재 목록의 지급대기 건을 모두 지급 완료 처리하시겠습니까?')) {
          filteredItems.filter(i => i.settleStatus !== 'done').forEach(i => {
            if (i.rawMatching) {
              store.update('liveHosts', i.rawMatching.id, { settleStatus: 'done' });
            }
          });
          showSuccess('전체 지급 완료 처리되었습니다.');
        }
      });
    }

    // 개별 행에서 명세서 링크 즉시 생성/복사
    container.querySelectorAll('.btn-generate-single-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = e.target.dataset.name;
        const date = e.target.dataset.date;
        const brand = e.target.dataset.brand;
        const amount = parseInt(e.target.dataset.amount, 10) || 0;
        const tax = Math.floor(amount * 0.033);
        const netAmount = amount - tax;

        const stmtData = {
          id: `STMT-${Date.now()}`,
          paymentDate: date,
          recipientName: name,
          company: {
            name: '라이진',
            bizNo: '821-29-01197',
            ceo: '채이준',
            email: 'choijun@ryzincorp.com'
          },
          items: [
            {
              name,
              date,
              startTime: '10:00',
              endTime: '11:00',
              detail: brand,
              amount,
              tax,
              netAmount
            }
          ],
          totals: {
            amount,
            tax,
            netAmount
          }
        };

        const encoded = encodePayslipData(stmtData);
        const shareLink = `${window.location.origin}/paystmt.html?d=${encoded}`;

        navigator.clipboard.writeText(shareLink).then(() => {
          showSuccess(`${name} 님의 지급명세서 공유 링크가 클립보드에 복사되었습니다.\n\n${shareLink}`);
        });
      });
    });

    // 모달 제어
    const modal = container.querySelector('#payslip-modal');
    const dateInput = container.querySelector('#payslip-date-input');
    dateInput.value = new Date().toISOString().split('T')[0];

    container.querySelector('#btn-open-payslip-modal').addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    container.querySelector('#btn-close-payslip-modal').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    // 예시 데이터 불러오기
    container.querySelector('#btn-load-sample').addEventListener('click', () => {
      const sampleText = `성명\t방송일\t시작시간\t종료시간\t업무상세\t총 지급액(원)
정해원\t2026-04-02\t19:00\t20:00\t부이\t96,700
장서연\t2026-04-07\t10:00\t11:00\t트루쿡\t96,700
장서연\t2026-04-09\t10:00\t11:00\t트루쿡\t96,700`;
      container.querySelector('#payslip-raw-text').value = sampleText;
      showSuccess('예시 데이터가 입력되었습니다.');
    });

    // 파일업로드 처리
    const fileInput = container.querySelector('#payslip-file-input');
    container.querySelector('#btn-trigger-file').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        container.querySelector('#payslip-raw-text').value = evt.target.result;
        showSuccess(`${file.name} 파일을 읽었습니다.`);
      };
      reader.readAsText(file);
    });

    // CSV 파싱 및 명세서 생성
    container.querySelector('#btn-generate-payslip').addEventListener('click', () => {
      const rawText = container.querySelector('#payslip-raw-text').value;
      const paymentDate = dateInput.value || new Date().toISOString().split('T')[0];

      if (!rawText.trim()) {
        showError('CSV 또는 텍스트 데이터를 입력해주세요.');
        return;
      }

      const statements = parsePayslipRawText(rawText, { paymentDate, groupByRecipient: true });

      if (!statements || statements.length === 0) {
        showError('파싱 가능한 지급 데이터가 없습니다. 형식(성명, 방송일, 시작시간, 종료시간, 업무상세, 총지급액)을 확인해주세요.');
        return;
      }

      const resultArea = container.querySelector('#payslip-result-area');
      const cardsList = container.querySelector('#payslip-cards-list');
      
      cardsList.innerHTML = '';
      resultArea.style.display = 'block';

      const baseUrl = window.location.origin;

      statements.forEach(stmt => {
        const encodedData = encodePayslipData(stmt);
        const shareLink = `${baseUrl}/paystmt.html?d=${encodedData}`;

        const totalNetStr = stmt.totals.netAmount.toLocaleString('ko-KR');
        const totalAmountStr = stmt.totals.amount.toLocaleString('ko-KR');
        const totalTaxStr = stmt.totals.tax.toLocaleString('ko-KR');

        const card = document.createElement('div');
        card.style.cssText = 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; gap: 10px;';
        
        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-weight: 700; font-size: 15px; color: #0f172a;">${stmt.recipientName} 님</span>
              <span class="badge badge-secondary" style="font-size: 11px;">방송 ${stmt.items.length}건</span>
            </div>
            <div style="font-size: 13px; font-weight: 700; color: #1e293b;">
              실지급액: <span style="color: #2563eb;">${totalNetStr}원</span>
              <span style="font-size: 11px; font-weight: normal; color: #64748b; margin-left: 6px;">(총 ${totalAmountStr}원 - 3.3% 공제 ${totalTaxStr}원)</span>
            </div>
          </div>

          <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-family: monospace; font-size: 12px; color: #334155; display: flex; align-items: center; justify-content: space-between; word-break: break-all;">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 80%;">${shareLink}</span>
          </div>

          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button class="btn btn-sm btn-secondary btn-copy-link" data-link="${shareLink}">링크 복사</button>
            <button class="btn btn-sm btn-secondary btn-open-viewer" data-link="${shareLink}">명세서 새 창 보기</button>
            <button class="btn btn-sm btn-primary btn-copy-msg" data-name="${stmt.recipientName}" data-date="${stmt.paymentDate}" data-net="${totalNetStr}" data-link="${shareLink}">문구 복사</button>
          </div>
        `;

        card.querySelector('.btn-copy-link').addEventListener('click', (e) => {
          navigator.clipboard.writeText(e.target.dataset.link);
          showSuccess(`${stmt.recipientName} 님의 명세서 링크가 복사되었습니다.`);
        });

        card.querySelector('.btn-open-viewer').addEventListener('click', (e) => {
          window.open(e.target.dataset.link, '_blank');
        });

        card.querySelector('.btn-copy-msg').addEventListener('click', (e) => {
          const name = e.target.dataset.name;
          const date = e.target.dataset.date;
          const net = e.target.dataset.net;
          const link = e.target.dataset.link;

          const msg = `[라이진] ${name} 님, 방송 지급명세서가 발송되었습니다.\n\n· 지급일: ${date}\n· 실지급액: ${net}원\n\n아래 링크에서 상세 내역 및 3.3% 세금 공제 내역을 확인하실 수 있습니다:\n${link}`;
          navigator.clipboard.writeText(msg);
          showSuccess(`${name} 님 전송용 안내 문구가 복사되었습니다.`);
        });

        cardsList.appendChild(card);
      });

      showSuccess(`총 ${statements.length}명의 쇼호스트 지급명세서가 자동 계산되었습니다.`);
    });
  }

  render();
  store.on('projects:changed', render);
  store.on('liveHosts:changed', render);

  return container;
}
