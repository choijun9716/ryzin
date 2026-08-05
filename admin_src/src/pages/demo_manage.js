// ===== 데모 시연 관리 페이지 =====

const getDemoList = () => JSON.parse(localStorage.getItem('ryzin_demo_list') || '[]');
const saveDemoList = (list) => localStorage.setItem('ryzin_demo_list', JSON.stringify(list));

export function renderDemoManagePage(container) {
  container.innerHTML = `
    <div style="padding: 28px; max-width: 1300px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <!-- 헤더 -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0;">데모 시연 관리</h1>
        <p style="font-size: 13px; color: #64748b; margin: 0;">권한이 없는 타사 웹사이트 주소를 등록하여, 상단바 없이 100% 깔끔한 라이브 위젯 데모 링크를 생성하고 공유합니다.</p>
      </div>

      <!-- 신규 데모 생성 카드 -->
      <div style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 24px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0;">신규 데모 시연 생성</h3>
        <div style="display: grid; grid-template-columns: 1fr 2.5fr 1.2fr auto; gap: 12px; align-items: flex-end;">
          <div>
            <label style="display: block; font-size: 11px; font-weight: 700; color: #64748b; margin-bottom: 6px; letter-spacing: 0.05em;">데모명 (구분용)</label>
            <input type="text" id="demo-name-input" placeholder="예: 올리브영 메인 시연" style="width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; outline: none; box-sizing: border-box;">
          </div>
          <div>
            <label style="display: block; font-size: 11px; font-weight: 700; color: #64748b; margin-bottom: 6px; letter-spacing: 0.05em;">타겟 웹사이트 URL</label>
            <input type="text" id="demo-url-input" placeholder="예: https://oliveyoung.co.kr" style="width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; outline: none; box-sizing: border-box;">
          </div>
          <div>
            <label style="display: block; font-size: 11px; font-weight: 700; color: #64748b; margin-bottom: 6px; letter-spacing: 0.05em;">연동 라이브</label>
            <select id="demo-live-select" style="width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; outline: none; background: #fff; box-sizing: border-box; height: 38px;">
              <option value="PAZIW92">PAZIW92 (쏘랩)</option>
              <option value="HRNCB9K">HRNCB9K (기억의문화)</option>
              <option value="live02">live02 (하나스톤)</option>
            </select>
          </div>
          <div>
            <button id="btn-create-demo" style="background: #2563eb; color: #fff; border: none; padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; height: 38px;">
              링크 생성 및 등록
            </button>
          </div>
        </div>
      </div>

      <!-- 데모 목록 -->
      <div style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); margin-bottom: 28px;">
        <div style="padding: 16px 24px; border-bottom: 1.5px solid #e2e8f0; background: #f8fafc; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0;">등록된 데모 시연 목록</h3>
          <span id="demo-count-badge" style="font-size: 12px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 4px 10px; border-radius: 20px; border: 1px solid #bfdbfe;">0개</span>
        </div>
        <div id="demo-list-table-container"></div>
      </div>

      <!-- 데모 시연 상담문의 접수 현황 -->
      <div style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="padding: 16px 24px; border-bottom: 1.5px solid #e2e8f0; background: #f8fafc; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0;">데모 시연 상담문의 접수 현황</h3>
          <button id="btn-refresh-demo-leads" style="background: #fff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 6px 14px; font-size: 12px; font-weight: 700; cursor: pointer; color: #475569; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fff'">새로고침</button>
        </div>
        <div id="demo-leads-table-container">
          <div style="padding: 40px; text-align: center; color: #94a3b8; font-size: 14px;">데이터를 불러오는 중입니다...</div>
        </div>
      </div>
    </div>
  `;

  // DB에서 라이브 목록 동기화
  const loadLiveOptions = async () => {
    const select = container.querySelector('#demo-live-select');
    const db = window.supabaseClient;
    if (!select || !db) return;
    try {
      const { data, error } = await db.from('live_control').select('live_id, title');
      if (!error && data && data.length > 0) {
        select.innerHTML = data.map(item => `
          <option value="${item.live_id}">${item.live_id} (${item.title || '라이브'})</option>
        `).join('');
      }
    } catch (e) {}
  };
  loadLiveOptions();

  // 목록 렌더링
  const renderList = () => {
    const listContainer = container.querySelector('#demo-list-table-container');
    const countBadge = container.querySelector('#demo-count-badge');
    const demos = getDemoList();

    if (countBadge) countBadge.textContent = `${demos.length}개`;

    if (demos.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #94a3b8; font-size: 14px;">
          등록된 데모 시연이 없습니다. 위에서 새로운 데모를 생성해보세요.
        </div>
      `;
      return;
    }

    listContainer.innerHTML = `
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; table-layout: fixed;">
          <colgroup>
            <col style="width: 130px;">
            <col style="width: 220px;">
            <col style="width: 110px;">
            <col style="min-width: 200px;">
            <col style="width: 230px;">
          </colgroup>
          <thead>
            <tr style="border-bottom: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
              <th style="padding: 12px 16px;">데모명</th>
              <th style="padding: 12px 16px;">타겟 URL</th>
              <th style="padding: 12px 16px;">연동 라이브</th>
              <th style="padding: 12px 16px;">시연 링크</th>
              <th style="padding: 12px 16px; text-align: right;">작업</th>
            </tr>
          </thead>
          <tbody>
            ${demos.map((d, index) => {
              let cleanUrl = d.url;
              if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
                cleanUrl = 'https://' + cleanUrl;
              }
              const cleanShareUrl = `${window.location.origin}/demo.html?url=${encodeURIComponent(cleanUrl)}&live_id=${d.liveId}&clean=true`;
              // URL 짧게 표시 (hostname만)
              let displayUrl = d.url;
              try { displayUrl = new URL(cleanUrl).hostname; } catch(e) {}
              return `
                <tr style="border-bottom: 1px solid #f1f5f9; transition: background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
                  <td style="padding: 14px 16px; font-weight: 700; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${d.name}</td>
                  <td style="padding: 14px 16px; overflow: hidden;">
                    <a href="${cleanUrl}" target="_blank" style="color:#2563eb; text-decoration:none; font-size:12px; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${cleanUrl}">${displayUrl}</a>
                  </td>
                  <td style="padding: 14px 16px;">
                    <span style="background: #eff6ff; color: #1d4ed8; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 5px; border: 1px solid #bfdbfe; white-space: nowrap;">${d.liveId}</span>
                  </td>
                  <td style="padding: 14px 16px; overflow: hidden;">
                    <input type="text" readonly value="${cleanShareUrl}" onclick="this.select()" style="width: 100%; padding: 5px 8px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 10px; background: #f8fafc; font-family: monospace; box-sizing: border-box; color: #475569; cursor: pointer;">
                  </td>
                  <td style="padding: 14px 16px; text-align: right; white-space: nowrap;">
                    <button class="btn-copy-clean-link" data-url="${cleanShareUrl}" style="background: #2563eb; color: #fff; border: none; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer; margin-right: 4px;">
                      링크 복사
                    </button>
                    <button class="btn-preview-demo" data-url="${cleanShareUrl}" style="background: #f1f5f9; color: #334155; border: 1px solid #e2e8f0; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; margin-right: 4px;">
                      미리보기
                    </button>
                    <button class="btn-delete-demo" data-index="${index}" style="background: #fff1f2; color: #e11d48; border: 1px solid #fecdd3; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer;">
                      삭제
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    listContainer.querySelectorAll('.btn-copy-clean-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const url = e.currentTarget.dataset.url;
        navigator.clipboard.writeText(url).then(() => {
          const orig = e.currentTarget.textContent;
          e.currentTarget.textContent = '복사 완료!';
          e.currentTarget.style.background = '#16a34a';
          setTimeout(() => {
            e.currentTarget.textContent = orig;
            e.currentTarget.style.background = '#2563eb';
          }, 2000);
        });
      });
    });

    listContainer.querySelectorAll('.btn-preview-demo').forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.open(e.currentTarget.dataset.url, '_blank');
      });
    });

    listContainer.querySelectorAll('.btn-delete-demo').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!confirm('이 데모 시연을 삭제하시겠습니까?')) return;
        const idx = parseInt(e.currentTarget.dataset.index);
        const current = getDemoList();
        current.splice(idx, 1);
        saveDemoList(current);
        renderList();
      });
    });
  };

  // 데모 생성 버튼
  const btnCreate = container.querySelector('#btn-create-demo');
  if (btnCreate) {
    btnCreate.addEventListener('click', () => {
      const name = container.querySelector('#demo-name-input').value.trim();
      const url = container.querySelector('#demo-url-input').value.trim();
      const liveId = container.querySelector('#demo-live-select').value;

      if (!name || !url) {
        alert('데모명과 타겟 사이트 URL을 모두 입력해주세요.');
        return;
      }

      const list = getDemoList();
      list.unshift({ name, url, liveId, createdAt: new Date().toISOString() });
      saveDemoList(list);

      container.querySelector('#demo-name-input').value = '';
      container.querySelector('#demo-url-input').value = '';

      renderList();
    });
  }

  // 데모 상담문의 목록 렌더링
  const renderLeadsList = async () => {
    const leadsContainer = container.querySelector('#demo-leads-table-container');
    if (!leadsContainer) return;

    const db = window.supabaseClient;
    if (!db) {
      leadsContainer.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #ef4444; font-size: 14px; font-weight: 600;">
          Supabase 클라이언트가 초기화되지 않았습니다.
        </div>
      `;
      return;
    }

    try {
      // 1. live_leads 단독 조회 (관계 에러 차단)
      const { data: leads, error: leadsError } = await db
        .from('live_leads')
        .select('id, live_id, name, phone, created_at')
        .order('created_at', { ascending: false });

      if (leadsError) throw leadsError;

      // 2. live_control 단독 조회 (브랜드 및 방송 타이틀 매핑용)
      const { data: lives, error: livesError } = await db
        .from('live_control')
        .select('live_id, brand_name, title');

      const liveMap = {};
      if (!livesError && lives) {
        lives.forEach(item => {
          liveMap[item.live_id] = {
            brand: item.brand_name || '미지정',
            title: item.title || ''
          };
        });
      }

      if (!leads || leads.length === 0) {
        leadsContainer.innerHTML = `
          <div style="padding: 40px; text-align: center; color: #94a3b8; font-size: 14px;">
            아직 접수된 상담문의가 없습니다.
          </div>
        `;
        return;
      }

      leadsContainer.innerHTML = `
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; min-width: 800px;">
            <thead>
              <tr style="border-bottom: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
                <th style="padding: 12px 20px;">신청 일시</th>
                <th style="padding: 12px 20px;">작성한 브랜드명</th>
                <th style="padding: 12px 20px;">연동 라이브 ID (기본 브랜드)</th>
                <th style="padding: 12px 20px;">신청자 성함</th>
                <th style="padding: 12px 20px;">연락처</th>
              </tr>
            </thead>
            <tbody>
              ${leads.map(lead => {
                const date = new Date(lead.created_at);
                const dateStr = date.toLocaleString('ko-KR', { hour12: false });
                
                // 이름 필드에서 브랜드명 파싱 테스트 (예: 홍길동 (쏘랩))
                let displayName = lead.name || '';
                let displayBrand = '';
                
                const match = displayName.match(/^(.+?)\s*\((.+?)\)$/);
                if (match) {
                  displayName = match[1].trim();
                  displayBrand = match[2].trim();
                }

                // 매핑 데이터 조회
                const mapped = liveMap[lead.live_id] || { brand: '미지정', title: '' };
                
                // 만약 사용자가 적은 브랜드명이 비어있다면 매핑된 기본 브랜드명을 활용
                if (!displayBrand) {
                  displayBrand = mapped.brand;
                }

                return `
                  <tr style="border-bottom: 1px solid #f1f5f9; transition: background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
                    <td style="padding: 14px 20px; color: #64748b; font-size: 12px; white-space: nowrap;">${dateStr}</td>
                    <td style="padding: 14px 20px; font-weight: 700; color: #2563eb;">${displayBrand}</td>
                    <td style="padding: 14px 20px; color: #475569; font-size: 12px;">
                      <span style="background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px; border: 1px solid #cbd5e1; font-weight: 600;">${lead.live_id}</span>
                      <span style="color:#94a3b8; font-size:11px; margin-left:4px;">${mapped.brand} - ${mapped.title}</span>
                    </td>
                    <td style="padding: 14px 20px; font-weight: 700; color: #0f172a;">${displayName}</td>
                    <td style="padding: 14px 20px; font-weight: 700; color: #2563eb; font-family: monospace;">${lead.phone}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    } catch (e) {
      console.error('Leads 로드 오류:', e);
      leadsContainer.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #ef4444; font-size: 13px;">
          데이터 로드 중 오류가 발생했습니다. (오류 내용: ${e.message})
        </div>
      `;
    }
  };

  // 새로고침 버튼 이벤트
  const btnRefresh = container.querySelector('#btn-refresh-demo-leads');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      renderLeadsList();
    });
  }

  renderList();
  renderLeadsList();
}
