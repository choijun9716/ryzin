// ===== 쇼호스트 출연 계약서 PDF 생성 페이지/모달 =====
import { formatDate } from '../utils/format.js';
import { openModal, closeModal } from '../components/modal.js';
import { store } from '../data/store.js';

export function showContractModal(project, liveHosts) {
  const container = document.createElement('div');
  
  // 배정된 쇼호스트 리스트 추출
  const hosts = [];
  if (liveHosts && liveHosts.length > 0) {
    liveHosts.forEach(lh => {
      const hostData = store.getById('hosts', lh.hostId);
      if (hostData) {
        hosts.push({
          ...hostData,
          role: lh.role,
          fee: lh.fee || 0
        });
      }
    });
  }

  function render() {
    if (hosts.length === 0) {
      container.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-tertiary);">이 프로젝트에 배정된 쇼호스트가 없습니다.</div>`;
      openModal({ title: '쇼호스트 계약서 발급', size: 'md', content: container });
      return;
    }

    container.innerHTML = `
      <div style="width: 600px; max-width: 100%;">
        <div style="margin-bottom: var(--space-4);">
          <h3 style="font-size: 16px;">${project.title}</h3>
          <p style="color: var(--text-tertiary); font-size: 13px;">방송일: ${formatDate(project.broadcastDate)}</p>
        </div>
        
        <p style="margin-bottom: var(--space-3); font-size: 14px; color: var(--text-secondary);">
          아래 쇼호스트별로 <strong>[PDF 다운로드]</strong> 버튼을 누르면 출연 계약서가 즉시 생성됩니다.
        </p>

        <div style="margin-bottom: var(--space-4);">
          <label style="display: block; font-size: 13px; font-weight: bold; margin-bottom: 8px;">특약 사항 및 추가 계약 내용 (선택)</label>
          <textarea id="contract-extra-content" class="input" style="width: 100%; height: 80px; resize: vertical; padding: 12px; line-height: 1.5;" placeholder="계약서 하단에 추가될 특약 사항이나 상세 조항을 자유롭게 입력하세요..."></textarea>
        </div>

        <div class="table-scroll" style="border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <table class="data-table" style="margin: 0; box-shadow: none;">
            <thead>
              <tr>
                <th style="width: 25%;">구분</th>
                <th style="width: 25%;">이름</th>
                <th class="text-right" style="width: 25%;">출연료</th>
                <th class="text-center" style="width: 25%;">계약서 발급</th>
              </tr>
            </thead>
            <tbody>
              ${hosts.map((h, idx) => `
                <tr>
                  <td><span style="color: var(--text-secondary); font-size: 13px;">${h.role === 'main' ? '메인 쇼호스트' : '게스트'}</span></td>
                  <td style="font-weight: var(--weight-medium);">${h.name}</td>
                  <td class="text-right">${h.fee.toLocaleString()}원</td>
                  <td class="text-center">
                    <button class="btn btn-primary btn-sm btn-download-contract" data-idx="${idx}">PDF 다운로드</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // PDF 다운로드 이벤트 바인딩
    container.querySelectorAll('.btn-download-contract').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.currentTarget.dataset.idx;
        const extraContent = container.querySelector('#contract-extra-content').value.trim();
        generateContractPDF(hosts[idx], project, extraContent);
      });
    });
  }

  // PDF 생성 로직
  function generateContractPDF(host, project, extraContent) {
    if (typeof html2pdf === 'undefined') {
      alert('PDF 생성 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const today = new Date();
    const bDate = new Date(project.broadcastDate || today);

    // 인쇄용 HTML 구성
    const htmlString = `
      <div style="padding: 40px; font-family: 'Inter', 'Noto Sans KR', sans-serif; color: #1e293b; line-height: 1.7;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 28px; font-weight: 800; border-bottom: 2px solid #1e293b; display: inline-block; padding-bottom: 8px;">라이브방송 출연 계약서</h1>
        </div>

        <p style="font-size: 14px; margin-bottom: 24px; text-align: justify;">
          라이브커머스컴퍼니(주)(이하 "갑"이라 한다)와 쇼호스트 <strong>${host.name}</strong>(이하 "을"이라 한다)은(는) 
          [<strong>${project.title}</strong>] 라이브 방송 출연과 관련하여 다음과 같이 계약을 체결한다.
        </p>

        <h3 style="font-size: 16px; font-weight: 700; margin-top: 24px; margin-bottom: 12px;">제 1 조 (목적)</h3>
        <p style="font-size: 13px; margin-bottom: 16px; padding-left: 12px;">
          본 계약은 "갑"이 기획, 제작하는 라이브 방송에 "을"이 출연함에 있어 필요한 제반 사항과 당사자 간의 권리 및 의무를 규정함을 목적으로 한다.
        </p>

        <h3 style="font-size: 16px; font-weight: 700; margin-top: 24px; margin-bottom: 12px;">제 2 조 (출연 내용)</h3>
        <p style="font-size: 13px; margin-bottom: 16px; padding-left: 12px;">
          1. 방송명 : ${project.title}<br>
          2. 방송일시 : ${bDate.getFullYear()}년 ${bDate.getMonth() + 1}월 ${bDate.getDate()}일<br>
          3. 방송 플랫폼 : ${project.platform || '미정'}<br>
          4. "을"은 사전에 합의된 큐시트 및 "갑"의 연출에 따라 성실히 방송에 임해야 한다.
        </p>

        <h3 style="font-size: 16px; font-weight: 700; margin-top: 24px; margin-bottom: 12px;">제 3 조 (출연료 및 지급 방법)</h3>
        <p style="font-size: 13px; margin-bottom: 16px; padding-left: 12px;">
          1. "갑"은 "을"에게 본 방송 출연료로 일금 <strong>${host.fee.toLocaleString()}</strong>원(VAT 별도/포함 여부 상호 협의)을 지급한다.<br>
          2. "갑"은 방송 종료 후 "을"이 지정한 은행 계좌로 익월 10일 이내에 출연료를 입금한다.
        </p>

        <h3 style="font-size: 16px; font-weight: 700; margin-top: 24px; margin-bottom: 12px;">제 4 조 (비밀 유지 및 초상권)</h3>
        <p style="font-size: 13px; margin-bottom: 16px; padding-left: 12px;">
          1. "을"은 본 방송과 관련하여 취득한 "갑" 및 브랜드의 영업 비밀을 제3자에게 누설해서는 안 된다.<br>
          2. "갑"은 본 방송의 녹화본 및 캡처 이미지를 마케팅 목적으로 사용할 수 있으며, "을"은 이에 동의한다.
        </p>
        
        ${extraContent ? `
        <h3 style="font-size: 16px; font-weight: 700; margin-top: 24px; margin-bottom: 12px;">제 5 조 (특약 사항)</h3>
        <p style="font-size: 13px; margin-bottom: 16px; padding-left: 12px; white-space: pre-wrap;">${extraContent}</p>
        ` : ''}

        <div style="margin-top: 60px; text-align: center; font-size: 14px;">
          ${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 60px; padding: 0 20px;">
          <div style="width: 45%;">
            <div style="font-weight: 700; margin-bottom: 16px;">[갑]</div>
            <div style="font-size: 13px; line-height: 1.8;">
              상 호 : 라이브커머스컴퍼니(주)<br>
              대 표 : 홍길동 (인)<br>
              주 소 : 서울특별시 강남구 테헤란로 123
            </div>
          </div>
          <div style="width: 45%;">
            <div style="font-weight: 700; margin-bottom: 16px;">[을]</div>
            <div style="font-size: 13px; line-height: 1.8;">
              성 명 : ${host.name} (인)<br>
              연락처 : ${host.phone || '-'}<br>
              주 소 : (본인 서명 시 기입)
            </div>
          </div>
        </div>
      </div>
    `;

    const printEl = document.createElement('div');
    printEl.innerHTML = htmlString;
    
    const opt = {
      margin:       10,
      filename:     `출연계약서_${host.name}_${project.title}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(printEl).save();
  }

  render();
  openModal({
    title: '쇼호스트 출연 계약서 발급',
    size: 'md',
    content: container,
    footer: false
  });
}
