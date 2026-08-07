// ===== 쇼호스트 관리 페이지 =====
import { store } from '../data/store.js';
import { formatCurrency, formatNumber, formatDate, formatROI, maskSSN } from '../utils/format.js';
import { openModal, closeModal, confirmDialog } from '../components/modal.js';
import { showSuccess, showError } from '../components/toast.js';
import { generateId, BANKS } from '../data/models.js';
import { router } from '../router.js';

export function renderHosts() {
  const container = document.createElement('div');
  let searchTerm = '';

  function render() {
    let hosts = store.getAll('hosts');

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      hosts = hosts.filter(h =>
        h.name.toLowerCase().includes(term) ||
        (h.phone && h.phone.includes(term))
      );
    }

    // 각 호스트 통계 계산
    const hostsWithStats = hosts.map(h => {
      const stats = store.getHostStats(h.id);
      return { ...h, stats };
    });

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">쇼호스트 관리</h1>
            <p class="page-description">쇼호스트 정보 및 방송 실적 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <button class="btn btn-primary" id="btn-add-host">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            쇼호스트 등록
          </button>
        </div>
      </div>
      <div class="page-body">
        <div class="table-container">
          <div class="table-toolbar">
            <div class="table-toolbar-left">
              <div class="table-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="이름, 전화번호 검색..." id="host-search" value="${searchTerm}">
              </div>
              <span class="table-count">총 <strong>${hostsWithStats.length}</strong>명</span>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>전화번호</th>
                  <th class="text-right">총 방송</th>
                  <th class="text-right">이번달</th>
                  <th class="text-right">누적 정산</th>
                  <th>최근 방송일</th>
                  <th class="text-right">평균 매출</th>
                  <th class="text-right">평균 ROI</th>
                  <th class="col-actions"></th>
                </tr>
              </thead>
              <tbody>
                ${hostsWithStats.length > 0 ? hostsWithStats.map(h => `
                  <tr class="clickable" data-id="${h.id}">
                    <td><a href="javascript:void(0)" class="host-link" data-id="${h.id}">${h.name}</a></td>
                    <td>${h.phone || '-'}</td>
                    <td class="text-right">${formatNumber(h.stats.totalBroadcasts)}회</td>
                    <td class="text-right">${formatNumber(h.stats.monthBroadcasts)}회</td>
                    <td class="text-right">${formatCurrency(h.stats.totalSettlement)}</td>
                    <td>${formatDate(h.stats.lastBroadcastDate)}</td>
                    <td class="text-right">${formatCurrency(h.stats.avgRevenue)}</td>
                    <td class="text-right">${formatROI(h.stats.avgROI)}</td>
                    <td class="col-actions">
                      <button class="btn btn-ghost btn-icon btn-sm btn-edit-host" data-id="${h.id}" data-tooltip="수정">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                    </td>
                  </tr>
                `).join('') : `
                  <tr><td colspan="9" class="text-center" style="padding: var(--space-10); color: var(--text-tertiary);">등록된 쇼호스트가 없습니다.</td></tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // 이벤트 바인딩
    setTimeout(() => {
      container.querySelector('#host-search')?.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        render();
        const input = document.getElementById('host-search');
        if (input) {
          input.focus();
          const len = input.value.length;
          input.setSelectionRange(len, len);
        }
      });

      container.querySelector('#btn-add-host')?.addEventListener('click', () => {
        openHostModal();
      });

      container.querySelectorAll('.host-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          router.navigate(`/hosts/${link.getAttribute('data-id')}`);
        });
      });

      container.querySelectorAll('.btn-edit-host').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          openHostModal(btn.getAttribute('data-id'));
        });
      });

      container.querySelectorAll('tr.clickable').forEach(tr => {
        tr.addEventListener('click', () => {
          router.navigate(`/hosts/${tr.getAttribute('data-id')}`);
        });
      });
    }, 0);
  }

  render();
  store.on('hosts:changed', render);

  return container;
}

function openHostModal(hostId = null) {
  const isEdit = !!hostId;
  const host = isEdit ? store.getById('hosts', hostId) : {};

  const content = `
    <div class="form-grid">
      <div class="input-group">
        <label class="required">이름</label>
        <input class="input" id="host-name" value="${host.name || ''}" placeholder="이름 입력">
      </div>
      <div class="input-group">
        <label class="required">전화번호</label>
        <input class="input" id="host-phone" value="${host.phone || ''}" placeholder="010-0000-0000">
      </div>
      <div class="input-group">
        <label>주민등록번호</label>
        <input class="input" id="host-ssn" value="${host.ssn || ''}" placeholder="마스킹 처리됨">
      </div>
      <div class="input-group">
        <label>은행명</label>
        <select class="input" id="host-bank">
          <option value="">선택</option>
          ${BANKS.map(b => `<option value="${b}" ${host.bank === b ? 'selected' : ''}>${b}</option>`).join('')}
        </select>
      </div>
      <div class="input-group">
        <label>계좌번호</label>
        <input class="input" id="host-account" value="${host.account || ''}" placeholder="계좌번호">
      </div>
      <div class="input-group">
        <label>예금주</label>
        <input class="input" id="host-holder" value="${host.accountHolder || ''}" placeholder="예금주">
      </div>
      <div class="input-group full-width">
        <label>주소</label>
        <input class="input" id="host-address" value="${host.address || ''}" placeholder="주소">
      </div>
    </div>
  `;

  const footer = document.createElement('div');
  footer.style.cssText = 'display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;';

  if (isEdit) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = '삭제';
    deleteBtn.style.marginRight = 'auto';
    deleteBtn.addEventListener('click', () => {
      closeModal();
      confirmDialog({
        title: '쇼호스트 삭제',
        message: `"${host.name}" 쇼호스트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`,
        confirmText: '삭제',
        danger: true,
        onConfirm: () => {
          store.delete('hosts', hostId);
          showSuccess('쇼호스트가 삭제되었습니다.');
        }
      });
    });
    footer.appendChild(deleteBtn);
  }

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn btn-secondary';
  cancelBtn.textContent = '취소';
  cancelBtn.addEventListener('click', closeModal);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-primary';
  saveBtn.textContent = isEdit ? '수정' : '등록';
  saveBtn.addEventListener('click', () => {
    const name = document.getElementById('host-name').value.trim();
    const phone = document.getElementById('host-phone').value.trim();

    if (!name) {
      showError('이름을 입력해주세요.');
      return;
    }

    const data = {
      name,
      phone,
      ssn: document.getElementById('host-ssn').value.trim(),
      bank: document.getElementById('host-bank').value,
      account: document.getElementById('host-account').value.trim(),
      accountHolder: document.getElementById('host-holder').value.trim(),
      address: document.getElementById('host-address').value.trim(),
    };

    if (isEdit) {
      store.update('hosts', hostId, data);
      showSuccess('쇼호스트 정보가 수정되었습니다.');
    } else {
      data.id = 'h_' + name;
      data.memo = { features: '', strengths: '', weaknesses: '', style: '', brandPreference: '', caution: '', comment: '' };
      data.createdAt = new Date().toISOString().split('T')[0];
      store.create('hosts', data);
      showSuccess('쇼호스트가 등록되었습니다.');
    }
    closeModal();
  });

  footer.appendChild(cancelBtn);
  footer.appendChild(saveBtn);

  openModal({
    title: isEdit ? '쇼호스트 수정' : '쇼호스트 등록',
    size: 'lg',
    content,
    footer
  });
}

// 쇼호스트 상세 페이지
export function renderHostDetail(params) {
  const container = document.createElement('div');
  const host = store.getById('hosts', params.id);

  if (!host) {
    container.innerHTML = `
      <div class="page-header"><div class="page-header-left"><h1 class="page-title">쇼호스트를 찾을 수 없습니다</h1></div></div>
      <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>
    `;
    setTimeout(() => {
      container.querySelector('#btn-back')?.addEventListener('click', () => router.navigate('/hosts'));
    }, 0);
    return container;
  }

  const stats = store.getHostStats(host.id);
  const memo = host.memo || {};

  // 방송 이력
  const matchings = store.query('liveHosts', m => m.hostId === host.id);
  const broadcastHistory = matchings.map(m => {
    const project = store.getById('projects', m.liveId);
    const brand = project ? store.getById('brands', project.brandId) : null;
    const result = store.getById('results', m.liveId);
    return { matching: m, project, brand, result };
  }).filter(h => h.project);

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <div class="breadcrumb">
            <a href="javascript:void(0)" id="breadcrumb-list">쇼호스트 관리</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${host.name}</span>
          </div>
          <h1 class="page-title" style="margin-top: var(--space-2);">${host.name}</h1>
        </div>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" id="btn-edit-host">수정</button>
      </div>
    </div>
    <div class="page-body">
      <!-- 통계 -->
      <div class="stats-grid" style="margin-bottom: var(--space-6);">
        <div class="stat-card">
          <div class="stat-label">총 방송횟수</div>
          <div class="stat-value">${formatNumber(stats.totalBroadcasts)}회</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">이번달 방송</div>
          <div class="stat-value">${formatNumber(stats.monthBroadcasts)}회</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">누적 정산금액</div>
          <div class="stat-value">${formatCurrency(stats.totalSettlement)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">최근 방송일</div>
          <div class="stat-value">${formatDate(stats.lastBroadcastDate)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">평균 매출</div>
          <div class="stat-value">${formatCurrency(stats.avgRevenue)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">평균 ROI</div>
          <div class="stat-value">${formatROI(stats.avgROI)}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-6);">
        <!-- 기본 정보 -->
        <div class="card">
          <div class="card-header"><h3>기본 정보</h3></div>
          <div class="card-body">
            <div class="detail-grid" style="grid-template-columns: 1fr 1fr;">
              <div class="detail-field">
                <span class="detail-field-label">전화번호</span>
                <span class="detail-field-value">${host.phone || '-'}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">주민등록번호</span>
                <span class="detail-field-value ssn-toggle" data-ssn="${host.ssn || ''}" style="cursor: pointer; text-decoration: underline;" title="클릭하여 확인">${host.ssn ? maskSSN(host.ssn) : '-'}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">은행</span>
                <span class="detail-field-value">${host.bank || '-'}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">계좌번호</span>
                <span class="detail-field-value">${host.account || '-'}</span>
              </div>
              <div class="detail-field">
                <span class="detail-field-label">예금주</span>
                <span class="detail-field-value">${host.accountHolder || '-'}</span>
              </div>
              <div class="detail-field" style="grid-column: 1/-1;">
                <span class="detail-field-label">주소</span>
                <span class="detail-field-value">${host.address || '-'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 메모 -->
        <div class="card">
          <div class="card-header">
            <h3>메모</h3>
            <button class="btn btn-ghost btn-sm" id="btn-edit-memo">수정</button>
          </div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: var(--space-3);">
              ${renderMemoField('특징', memo.features)}
              ${renderMemoField('강점', memo.strengths)}
              ${renderMemoField('약점', memo.weaknesses)}
              ${renderMemoField('진행 스타일', memo.style)}
              ${renderMemoField('브랜드 선호도', memo.brandPreference)}
              ${renderMemoField('주의사항', memo.caution)}
              ${renderMemoField('기타', memo.comment)}
            </div>
          </div>
        </div>
      </div>

      <!-- 방송 이력 -->
      <div class="card">
        <div class="card-header"><h3>방송 이력</h3></div>
        <div class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>방송일</th>
                <th>브랜드</th>
                <th>역할</th>
                <th class="text-right">진행금액</th>
                <th>정산상태</th>
                <th>매출 성과</th>
              </tr>
            </thead>
            <tbody>
              ${broadcastHistory.length > 0 ? broadcastHistory.map(h => `
                <tr>
                  <td>${formatDate(h.project.broadcastDate)}</td>
                  <td><a href="javascript:void(0)" class="project-link" data-id="${h.project.id}">${h.brand ? h.brand.name : '-'}</a></td>
                  <td>${{main: '메인', sub: '서브', guest: '게스트'}[h.matching.role] || '-'}</td>
                  <td class="text-right">${formatCurrency(h.matching.fee)}</td>
                  <td><span class="badge ${h.matching.settleStatus === 'done' ? 'badge-success' : 'badge-default'}">${{pending:'대기', processing:'진행중', done:'완료'}[h.matching.settleStatus] || '-'}</span></td>
                  <td>${h.result ? formatCurrency(h.result.liveRevenue) : '-'}</td>
                </tr>
              `).join('') : '<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">방송 이력이 없습니다.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const ssnToggle = container.querySelector('.ssn-toggle');
    if (ssnToggle && ssnToggle.dataset.ssn) {
      let isMasked = true;
      ssnToggle.addEventListener('click', () => {
        isMasked = !isMasked;
        ssnToggle.textContent = isMasked ? maskSSN(ssnToggle.dataset.ssn) : ssnToggle.dataset.ssn;
      });
    }

    container.querySelector('#breadcrumb-list')?.addEventListener('click', () => router.navigate('/hosts'));
    container.querySelector('#btn-edit-host')?.addEventListener('click', () => openHostModal(host.id));
    container.querySelector('#btn-edit-memo')?.addEventListener('click', () => openMemoModal(host));
    container.querySelectorAll('.project-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(`/projects/${link.getAttribute('data-id')}`);
      });
    });
  }, 0);

  return container;
}

function renderMemoField(label, value) {
  return `
    <div>
      <div style="font-size: var(--text-xs); color: var(--text-tertiary); font-weight: var(--weight-medium); margin-bottom: 2px;">${label}</div>
      <div style="font-size: var(--text-sm); color: var(--text-secondary);">${value || '-'}</div>
    </div>
  `;
}

function openMemoModal(host) {
  const memo = host.memo || {};
  const fields = [
    { key: 'features', label: '특징' },
    { key: 'strengths', label: '강점' },
    { key: 'weaknesses', label: '약점' },
    { key: 'style', label: '진행 스타일' },
    { key: 'brandPreference', label: '브랜드 선호도' },
    { key: 'caution', label: '주의사항' },
    { key: 'comment', label: '기타 코멘트' },
  ];

  const content = `
    <div style="display: flex; flex-direction: column; gap: var(--space-4);">
      ${fields.map(f => `
        <div class="input-group">
          <label>${f.label}</label>
          <textarea class="input" id="memo-${f.key}" rows="2">${memo[f.key] || ''}</textarea>
        </div>
      `).join('')}
    </div>
  `;

  const footer = document.createElement('div');
  footer.style.cssText = 'display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn btn-secondary';
  cancelBtn.textContent = '취소';
  cancelBtn.addEventListener('click', closeModal);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-primary';
  saveBtn.textContent = '저장';
  saveBtn.addEventListener('click', () => {
    const newMemo = {};
    fields.forEach(f => {
      newMemo[f.key] = document.getElementById(`memo-${f.key}`).value.trim();
    });
    store.update('hosts', host.id, { memo: newMemo });
    closeModal();
    showSuccess('메모가 저장되었습니다.');
    router.navigate(`/hosts/${host.id}`);
  });

  footer.appendChild(cancelBtn);
  footer.appendChild(saveBtn);

  openModal({ title: '메모 수정', size: 'lg', content, footer });
}
