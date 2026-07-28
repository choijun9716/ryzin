// ===== 라이진클래스 수강신청 관리 페이지 =====
import { store } from '../data/store.js';
import { openModal, closeModal, confirmDialog } from '../components/modal.js';
import { showSuccess, showError } from '../components/toast.js';

export function renderClassApplications() {
  const container = document.createElement('div');
  let selectedFilter = 'all'; // 필터 상태 ('all', '1기', '2기', '3기', '4기')

  // 날짜 포맷 함수
  function formatDate(dateStr) {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const hh = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    } catch (e) {
      return dateStr;
    }
  }

  function render() {
    const list = store.getAll('classApplications') || [];

    // 필터링 적용
    const filteredList = list.filter(item => {
      if (selectedFilter === 'all') return true;
      return item.class_date && item.class_date.startsWith(selectedFilter);
    });

    // 신청 기수 종류 추출
    const editions = ['all', '1기', '2기', '3기', '4기'];

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">원데이 클래스 신청 관리</h1>
          <p class="page-description">라이진 크리에이터 원데이 클래스 수강 신청 현황을 실시간으로 확인하고 관리합니다.</p>
        </div>
        <div class="page-header-right">
          <button class="btn btn-secondary" id="btn-refresh-class">새로고침</button>
        </div>
      </div>

      <div class="page-body">
        <!-- 필터 영역 -->
        <div class="card" style="margin-bottom: var(--space-4);">
          <div style="padding: var(--space-4); display: flex; gap: var(--space-2); align-items: center;">
            <span style="font-size: var(--text-sm); font-weight: 600; color: var(--text-secondary); margin-right: var(--space-2);">기수 필터:</span>
            ${editions.map(ed => {
              const label = ed === 'all' ? '전체 보기' : ed;
              const activeClass = selectedFilter === ed ? 'btn-primary' : 'btn-secondary';
              return `<button class="btn ${activeClass} btn-sm filter-btn" data-edition="${ed}">${label}</button>`;
            }).join('')}
          </div>
        </div>

        <!-- 목록 테이블 -->
        <div class="card">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th style="width: 80px;">번호</th>
                  <th style="width: 180px;">신청 기수 / 일정</th>
                  <th style="width: 120px;">이름</th>
                  <th style="width: 80px; text-align: center;">사진</th>
                  <th style="width: 140px;">전화번호</th>
                  <th>크리에이터가 되고 싶은 이유</th>
                  <th style="width: 150px;">신청일시</th>
                  <th style="width: 130px; text-align: center;">관리</th>
                </tr>
              </thead>
              <tbody>
                ${filteredList.length === 0 ? `
                  <tr>
                    <td colspan="8" style="text-align: center; color: var(--text-tertiary); padding: var(--space-8) 0;">
                      신청 내역이 존재하지 않습니다.
                    </td>
                  </tr>
                ` : filteredList.map((item, idx) => `
                  <tr class="application-row" data-id="${item.id}" style="cursor: pointer;">
                    <td>${filteredList.length - idx}</td>
                    <td><span class="badge badge-indigo">${item.class_date || '-'}</span></td>
                    <td style="font-weight: 600;">${item.name || ''}</td>
                    <td style="text-align: center;">
                      ${item.photo_url ? `<span class="badge badge-green">첨부됨</span>` : `<span style="color: var(--text-tertiary); font-size: var(--text-xs);">없음</span>`}
                    </td>
                    <td>${item.phone || ''}</td>
                    <td class="text-ellipsis" style="max-width: 300px;">${item.reason || ''}</td>
                    <td style="color: var(--text-tertiary); font-size: var(--text-xs);">${formatDate(item.created_at)}</td>
                    <td style="text-align: center;" onclick="event.stopPropagation();">
                      <div style="display: flex; gap: var(--space-2); justify-content: center;">
                        <button class="btn btn-secondary btn-xs btn-detail" data-id="${item.id}">상세</button>
                        <button class="btn btn-danger btn-xs btn-delete" data-id="${item.id}">삭제</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // 이벤트 리스너 바인딩
    
    // 필터 버튼 클릭
    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedFilter = btn.getAttribute('data-edition');
        render();
      });
    });

    // 테이블 행 클릭 (상세보기)
    container.querySelectorAll('.application-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        openDetailModal(id);
      });
    });

    // 상세 버튼 클릭
    container.querySelectorAll('.btn-detail').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openDetailModal(id);
      });
    });

    // 삭제 버튼 클릭
    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        handleDelete(id);
      });
    });

    // 새로고침 버튼 클릭
    container.querySelector('#btn-refresh-class').addEventListener('click', async () => {
      const btn = container.querySelector('#btn-refresh-class');
      btn.disabled = true;
      btn.textContent = '불러오는 중...';
      try {
        await store.init();
        showSuccess('신청 목록이 성공적으로 갱신되었습니다.');
      } catch (err) {
        showError('데이터를 가져오는데 실패했습니다.');
      } finally {
        btn.disabled = false;
        btn.textContent = '새로고침';
        render();
      }
    });
  }

  // 상세보기 모달 오픈
  function openDetailModal(id) {
    const item = store.getById('classApplications', id);
    if (!item) return;

    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.gap = 'var(--space-4)';
    content.style.fontSize = 'var(--text-sm)';

    content.innerHTML = `
      <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--space-3); border-bottom: 1px solid var(--border); padding-bottom: var(--space-3);">
        <span style="font-weight: 600; color: var(--text-secondary);">신청자 이름</span>
        <span>${item.name || ''}</span>
      </div>
      <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--space-3); border-bottom: 1px solid var(--border); padding-bottom: var(--space-3);">
        <span style="font-weight: 600; color: var(--text-secondary);">연락처</span>
        <span>${item.phone || ''}</span>
      </div>
      <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--space-3); border-bottom: 1px solid var(--border); padding-bottom: var(--space-3);">
        <span style="font-weight: 600; color: var(--text-secondary);">신청 기수</span>
        <span><span class="badge badge-indigo">${item.class_date || ''}</span></span>
      </div>
      <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--space-3); border-bottom: 1px solid var(--border); padding-bottom: var(--space-3);">
        <span style="font-weight: 600; color: var(--text-secondary);">신청일시</span>
        <span>${formatDate(item.created_at)}</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: var(--space-2);">
        <span style="font-weight: 600; color: var(--text-secondary);">크리에이터가 되고 싶은 이유</span>
        <div style="background-color: var(--bg); padding: var(--space-4); border-radius: var(--radius-sm); white-space: pre-wrap; line-height: 1.6; max-height: 200px; overflow-y: auto; border: 1px solid var(--border);">
          ${item.reason || ''}
        </div>
      </div>
      ${item.photo_url ? `
      <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-2);">
        <span style="font-weight: 600; color: var(--text-secondary);">첨부 사진</span>
        <div style="text-align: center; background-color: var(--bg); padding: var(--space-2); border-radius: var(--radius-sm); border: 1px solid var(--border);">
          <a href="${item.photo_url}" target="_blank" title="원본 이미지 보기">
            <img src="${item.photo_url}" alt="첨부 사진" style="max-width: 100%; max-height: 200px; object-fit: contain; border-radius: var(--radius-sm);" />
          </a>
        </div>
      </div>
      ` : ''}
    `;

    const footer = document.createElement('div');
    footer.style.display = 'flex';
    footer.style.justifyContent = 'flex-end';
    footer.style.width = '100%';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-secondary';
    closeBtn.textContent = '닫기';
    closeBtn.addEventListener('click', closeModal);
    footer.appendChild(closeBtn);

    openModal({
      title: '수강 신청 상세 정보',
      size: 'md',
      content,
      footer,
      onClose: null
    });
  }

  // 삭제 처리
  function handleDelete(id) {
    const item = store.getById('classApplications', id);
    if (!item) return;

    confirmDialog({
      title: '신청 정보 삭제',
      message: `${item.name} 님의 수강신청 내역을 영구히 삭제하시겠습니까?`,
      danger: true,
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          store.delete('classApplications', id);
          showSuccess('신청 정보가 삭제되었습니다.');
          render();
        } catch (err) {
          showError('삭제 처리 중 에러가 발생했습니다.');
        }
      }
    });
  }

  // 초기 렌더링
  render();
  return container;
}
