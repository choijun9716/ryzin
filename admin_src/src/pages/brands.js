// ===== 브랜드 관리 페이지 =====
import { store } from '../data/store.js';
import { formatCurrency, formatNumber, formatDate, formatROI, formatCurrencyShort } from '../utils/format.js';
import { openModal, closeModal, confirmDialog } from '../components/modal.js';
import { showSuccess, showError } from '../components/toast.js';
import { generateId, CATEGORIES } from '../data/models.js';
import { router } from '../router.js';
import { renderStatusBadge } from '../components/statusBadge.js';

export function renderBrands() {
  const container = document.createElement('div');
  let searchTerm = '';

  function render() {
    let brands = store.getAll('brands');
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      brands = brands.filter(b =>
        b.name.toLowerCase().includes(term) ||
        (b.manager && b.manager.toLowerCase().includes(term)) ||
        (b.category && b.category.toLowerCase().includes(term))
      );
    }

    const brandsWithStats = brands.map(b => {
      const stats = store.getBrandStats(b.id);
      return { ...b, stats };
    });

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">브랜드 관리</h1>
            <p class="page-description">브랜드 정보 및 방송 실적 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <button class="btn btn-primary" id="btn-add-brand">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            브랜드 등록
          </button>
        </div>
      </div>
      <div class="page-body">
        <div class="table-container">
          <div class="table-toolbar">
            <div class="table-toolbar-left">
              <div class="table-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="브랜드명, 담당자 검색..." id="brand-search" value="${searchTerm}">
              </div>
              <span class="table-count">총 <strong>${brandsWithStats.length}</strong>개</span>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>브랜드명</th>
                  <th>사업자명</th>
                  <th>카테고리</th>
                  <th>담당자</th>
                  <th>연락처</th>
                  <th>세금계산서</th>
                  <th class="text-right">총 방송</th>
                  <th class="text-right">누적 매출</th>
                  <th>최근 방송일</th>
                  <th class="text-right">평균 ROI</th>
                  <th class="col-actions"></th>
                </tr>
              </thead>
              <tbody>
                ${brandsWithStats.length > 0 ? brandsWithStats.map(b => `
                  <tr class="clickable" data-id="${b.id}">
                    <td><a href="javascript:void(0)" class="brand-link" data-id="${b.id}">${b.name}</a></td>
                    <td>${b.companyName || '-'}</td>
                    <td><span class="badge badge-default">${b.category || '-'}</span></td>
                    <td>${b.manager || '-'}</td>
                    <td>${b.phone || '-'}</td>
                    <td>${b.taxInvoice ? '<span class="badge badge-success">발행</span>' : '<span class="badge badge-default">미발행</span>'}</td>
                    <td class="text-right">${formatNumber(b.stats.totalBroadcasts)}회</td>
                    <td class="text-right">${formatCurrency(b.stats.totalRevenue)}</td>
                    <td>${formatDate(b.stats.lastBroadcastDate)}</td>
                    <td class="text-right">${formatROI(b.stats.avgROI)}</td>
                    <td class="col-actions">
                      <button class="btn btn-ghost btn-icon btn-sm btn-edit-brand" data-id="${b.id}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                    </td>
                  </tr>
                `).join('') : '<tr><td colspan="10" class="text-center" style="padding: var(--space-10); color: var(--text-tertiary);">등록된 브랜드가 없습니다.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      container.querySelector('#brand-search')?.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        render();
        const input = document.getElementById('brand-search');
        if (input) {
          input.focus();
          const len = input.value.length;
          input.setSelectionRange(len, len);
        }
      });
      container.querySelector('#btn-add-brand')?.addEventListener('click', () => openBrandModal());
      container.querySelectorAll('.brand-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          router.navigate(`/brands/${link.getAttribute('data-id')}`);
        });
      });
      container.querySelectorAll('.btn-edit-brand').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          openBrandModal(btn.getAttribute('data-id'));
        });
      });
      container.querySelectorAll('tr.clickable').forEach(tr => {
        tr.addEventListener('click', () => router.navigate(`/brands/${tr.getAttribute('data-id')}`));
      });
    }, 0);
  }

  render();
  store.on('brands:changed', render);
  return container;
}

function openBrandModal(brandId = null) {
  const isEdit = !!brandId;
  const brand = isEdit ? store.getById('brands', brandId) : {};

  const content = `
    <div class="form-grid">
      <div class="input-group">
        <label class="required">브랜드명</label>
        <input class="input" id="brand-name" value="${brand.name || ''}" placeholder="브랜드명">
      </div>
      <div class="input-group">
        <label>사업자명(법인명)</label>
        <input class="input" id="brand-company" value="${brand.companyName || ''}" placeholder="사업자명">
      </div>
      <div class="input-group">
        <label>카테고리</label>
        <select class="input" id="brand-category">
          <option value="">선택</option>
          ${CATEGORIES.map(c => `<option value="${c}" ${brand.category === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="input-group">
        <label>담당자명</label>
        <input class="input" id="brand-manager" value="${brand.manager || ''}" placeholder="담당자명">
      </div>
      <div class="input-group">
        <label>연락처</label>
        <input class="input" id="brand-phone" value="${brand.phone || ''}" placeholder="연락처">
      </div>
      <div class="input-group">
        <label>이메일</label>
        <input class="input" id="brand-email" value="${brand.email || ''}" placeholder="이메일">
      </div>
      <div class="input-group">
        <label>사업자등록번호</label>
        <input class="input" id="brand-biz" value="${brand.businessNo || ''}" placeholder="000-00-00000">
      </div>
      <div class="input-group">
        <label>세금계산서 발행</label>
        <select class="input" id="brand-tax">
          <option value="true" ${brand.taxInvoice ? 'selected' : ''}>발행</option>
          <option value="false" ${brand.taxInvoice === false ? 'selected' : ''}>미발행</option>
        </select>
      </div>
      <div class="input-group">
        <label>주소</label>
        <input class="input" id="brand-address" value="${brand.address || ''}" placeholder="주소">
      </div>
      <div class="input-group full-width">
        <label>메모</label>
        <textarea class="input" id="brand-memo" rows="3">${brand.memo || ''}</textarea>
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
        title: '브랜드 삭제',
        message: `"${brand.name}" 브랜드를 삭제하시겠습니까?`,
        confirmText: '삭제', danger: true,
        onConfirm: () => { store.delete('brands', brandId); showSuccess('브랜드가 삭제되었습니다.'); }
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
    const name = document.getElementById('brand-name').value.trim();
    if (!name) { showError('브랜드명을 입력해주세요.'); return; }

    const data = {
      name,
      companyName: document.getElementById('brand-company').value.trim(),
      category: document.getElementById('brand-category').value,
      manager: document.getElementById('brand-manager').value.trim(),
      phone: document.getElementById('brand-phone').value.trim(),
      email: document.getElementById('brand-email').value.trim(),
      businessNo: document.getElementById('brand-biz').value.trim(),
      taxInvoice: document.getElementById('brand-tax').value === 'true',
      address: document.getElementById('brand-address').value.trim(),
      memo: document.getElementById('brand-memo').value.trim(),
    };

    if (isEdit) {
      store.update('brands', brandId, data);
      showSuccess('브랜드 정보가 수정되었습니다.');
    } else {
      data.id = generateId('brand');
      data.createdAt = new Date().toISOString().split('T')[0];
      store.create('brands', data);
      showSuccess('브랜드가 등록되었습니다.');
    }
    closeModal();
  });

  footer.appendChild(cancelBtn);
  footer.appendChild(saveBtn);

  openModal({ title: isEdit ? '브랜드 수정' : '브랜드 등록', size: 'lg', content, footer });
}

// 브랜드 상세 페이지
export function renderBrandDetail(params) {
  const container = document.createElement('div');
  const brand = store.getById('brands', params.id);

  if (!brand) {
    container.innerHTML = `<div class="page-header"><div class="page-header-left"><h1 class="page-title">브랜드를 찾을 수 없습니다</h1></div></div>
    <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>`;
    setTimeout(() => { container.querySelector('#btn-back')?.addEventListener('click', () => router.navigate('/brands')); }, 0);
    return container;
  }

  const stats = store.getBrandStats(brand.id);
  const projects = store.query('projects', p => p.brandId === brand.id || p.brandName === brand.name);

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <div class="breadcrumb">
            <a href="javascript:void(0)" id="breadcrumb-list">브랜드 관리</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${brand.name}</span>
          </div>
          <h1 class="page-title" style="margin-top: var(--space-2);">${brand.name}</h1>
        </div>
      </div>
      <div class="page-header-right">
        <button class="btn btn-secondary" id="btn-edit-brand">수정</button>
      </div>
    </div>
    <div class="page-body">
      <div class="stats-grid" style="margin-bottom: var(--space-6);">
        <div class="stat-card"><div class="stat-label">총 방송횟수</div><div class="stat-value">${formatNumber(stats.totalBroadcasts)}회</div></div>
        <div class="stat-card"><div class="stat-label">누적 매출</div><div class="stat-value">${formatCurrency(stats.totalRevenue)}</div></div>
        <div class="stat-card"><div class="stat-label">최근 방송일</div><div class="stat-value">${formatDate(stats.lastBroadcastDate)}</div></div>
        <div class="stat-card"><div class="stat-label">평균 ROI</div><div class="stat-value">${formatROI(stats.avgROI)}</div></div>
      </div>

      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="card-header"><h3>기본 정보</h3></div>
        <div class="card-body">
          <div class="detail-grid">
            <div class="detail-field"><span class="detail-field-label">사업자명</span><span class="detail-field-value">${brand.companyName || '-'}</span></div>
            <div class="detail-field"><span class="detail-field-label">카테고리</span><span class="detail-field-value">${brand.category || '-'}</span></div>
            <div class="detail-field"><span class="detail-field-label">담당자</span><span class="detail-field-value">${brand.manager || '-'}</span></div>
            <div class="detail-field"><span class="detail-field-label">연락처</span><span class="detail-field-value">${brand.phone || '-'}</span></div>
            <div class="detail-field"><span class="detail-field-label">이메일</span><span class="detail-field-value">${brand.email || '-'}</span></div>
            <div class="detail-field"><span class="detail-field-label">사업자등록번호</span><span class="detail-field-value">${brand.businessNo || '-'}</span></div>
            <div class="detail-field"><span class="detail-field-label">세금계산서</span><span class="detail-field-value">${brand.taxInvoice ? '발행' : '미발행'}</span></div>
            <div class="detail-field"><span class="detail-field-label">주소</span><span class="detail-field-value">${brand.address || '-'}</span></div>
            <div class="detail-field"><span class="detail-field-label">메모</span><span class="detail-field-value">${brand.memo || '-'}</span></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><h3>방송 이력</h3></div>
        <div class="table-scroll">
          <table class="data-table">
            <thead>
              <tr><th>진행상태</th><th>방송일</th><th>플랫폼</th><th class="text-right">시청뷰</th><th class="text-right">매출</th><th class="text-right">ROI</th></tr>
            </thead>
            <tbody>
              ${projects.length > 0 ? projects.map(p => {
                const result = store.getProjectResult(p.id);
                return `
                <tr class="clickable" data-id="${p.id}">
                  <td>${renderStatusBadge(p.status)}</td>
                  <td><a href="javascript:void(0)" class="project-link" data-id="${p.id}">${formatDate(p.broadcastDate) || '상세보기'}</a></td>
                  <td>${p.platform || '-'}</td>
                  <td class="text-right">${result ? formatNumber(result.views) : '-'}</td>
                  <td class="text-right">${result ? formatCurrencyShort(result.liveRevenue) : '-'}</td>
                  <td class="text-right">${result ? formatROI(result.roi) : '-'}</td>
                </tr>`;
              }).join('') : '<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">방송 이력이 없습니다.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    container.querySelector('#breadcrumb-list')?.addEventListener('click', () => router.navigate('/brands'));
    container.querySelector('#btn-edit-brand')?.addEventListener('click', () => openBrandModal(brand.id));
    container.querySelectorAll('.project-link').forEach(link => {
      link.addEventListener('click', (e) => { e.preventDefault(); router.navigate(`/projects/${link.getAttribute('data-id')}`); });
    });
  }, 0);

  return container;
}

