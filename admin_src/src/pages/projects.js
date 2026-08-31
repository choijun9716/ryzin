// ===== 라이브 프로젝트 관리 페이지 (메인 리스트) =====
import { store } from '../data/store.js';
import { formatCurrency, formatNumber, formatDate, formatROI, formatCurrencyShort } from '../utils/format.js';
import { renderBroadcastBadge, renderSettleBadge } from '../components/statusBadge.js';
import { openModal, closeModal, confirmDialog } from '../components/modal.js';
import { showSuccess, showError } from '../components/toast.js';
import { generateId, BROADCAST_STATUSES, SETTLE_STATUSES, PLATFORMS, CATEGORIES, CHECKLIST_ITEMS, getBroadcastStatusLabel, getSettleStatusLabel, HOST_ROLES, DESIGN_STATUSES } from '../data/models.js';
import { router } from '../router.js';

// Helper: Calculate deadline based on broadcast date
function getDeadlineText(broadcastDate, statusKey) {
  if (!broadcastDate) return '';
  const dateStr = broadcastDate.replace(/\./g, '-');
  const bDate = new Date(dateStr);
  if (isNaN(bDate.getTime())) return '';

  let offset = 0;
  if (statusKey === 'design') offset = -4;
  else if (statusKey === 'cue_sheet') offset = -5;
  else if (statusKey === 'host_cast') offset = -7;
  
  if (offset === 0) return '';
  
  const dDate = new Date(bDate);
  dDate.setDate(dDate.getDate() + offset);
  
  const mm = String(dDate.getMonth() + 1).padStart(2, '0');
  const dd = String(dDate.getDate()).padStart(2, '0');
  
  const today = new Date();
  today.setHours(0,0,0,0);
  const diffTime = dDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let ddayText = '';
  if (diffDays === 0) ddayText = 'D-Day';
  else if (diffDays > 0) ddayText = `D-${diffDays}`;
  else ddayText = `D+${Math.abs(diffDays)}`;
  
  return `<br><span style="font-size: 10px; opacity: 0.8; font-weight: normal;">(${mm}/${dd} 까지 / <strong style="color:var(--status-error);">${ddayText}</strong>)</span>`;
}


export function renderProjects() {
  const container = document.createElement('div');
  const role = store.getCurrentRole();
  const isBrandPartner = role && role.startsWith('brand:');
  const targetBrandId = isBrandPartner ? role.split(':')[1] : null;

  const urlParams = new URLSearchParams(window.location.search);
  const initialSettleStatus = urlParams.get('settleStatus') || '';
  let searchTerm = '';
  let filters = { status: '', brand: '', platform: '', month: '', category: '', settleStatus: initialSettleStatus };
  let colGroups = { basic: true, host: true, result: false, finance: false };
  let currentView = 'list'; // 'list' or 'calendar'
  let calendarDate = new Date();

  function render() {
    let projects = store.getAll('projects');
    if (isBrandPartner && targetBrandId) {
      projects = projects.filter(p => p.brandId === targetBrandId);
    }
    const brands = store.getAll('brands');
    const hosts = store.getAll('hosts');

    // 검색
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      projects = projects.filter(p => {
        const brand = store.getById('brands', p.brandId);
        
        // Get showhosts for this project
        const mappedHosts = store.query('liveHosts', lh => lh.liveId === p.id);
        const hasHostMatch = mappedHosts.some(lh => {
           const host = store.getById('hosts', lh.hostId);
           return host && host.name.toLowerCase().includes(term);
        });

        return (brand && brand.name.toLowerCase().includes(term)) || hasHostMatch;
      });
    }

    // 필터
    if (filters.settleStatus) {
      if (filters.settleStatus === 'pending') {
        projects = projects.filter(p => p.settleStatus !== 'done' && p.settleStatus !== 'settle_done');
      } else {
        projects = projects.filter(p => p.settleStatus === filters.settleStatus);
      }
    }
    if (filters.status) projects = projects.filter(p => p.broadcastStatus === filters.status);
    if (filters.brand) projects = projects.filter(p => p.brandId === filters.brand);
    if (filters.platform) projects = projects.filter(p => p.platform === filters.platform);
    if (filters.month) {
      projects = projects.filter(p => {
        if (p.broadcastMonth === filters.month) return true;
        if (p.broadcastDate && p.broadcastDate.startsWith(filters.month.replace('-', '.'))) return true;
        if (p.broadcastDate && p.broadcastDate.startsWith(filters.month)) return true;
        if (p.broadcastMonth && p.broadcastMonth.length <= 2) {
          return parseInt(p.broadcastMonth, 10) === parseInt(filters.month.split('-')[1], 10);
        }
        return false;
      });
    }
    if (filters.category) projects = projects.filter(p => p.category === filters.category);

    // 정렬: 방송일 기준 내림차순
    projects.sort((a, b) => (b.broadcastDate || '').localeCompare(a.broadcastDate || ''));

    // 각 프로젝트에 관련 데이터 매핑
    const enriched = projects.map(p => {
      const brand = store.getById('brands', p.brandId);
      const matchings = store.query('liveHosts', m => m.liveId === p.id);
      const result = store.getAll('results').find(r => r.liveId === p.id);
      const finance = store.getAll('finances').find(f => f.liveId === p.id);

      const hostA = matchings[0] ? store.getById('hosts', matchings[0].hostId) : null;
      const hostB = matchings[1] ? store.getById('hosts', matchings[1].hostId) : null;
      const totalHostFee = matchings.reduce((sum, m) => sum + (m.fee || 0), 0);
      const allSettled = matchings.length > 0 && matchings.every(m => m.settleStatus === 'done');
      const settleLabel = allSettled ? '완료' : matchings.some(m => m.settleStatus === 'done') ? '일부완료' : '대기';

      return {
        ...p, brand, matchings, result, finance,
        hostA, hostB, totalHostFee, settleLabel,
        hostAFee: matchings[0]?.fee || 0,
        hostBFee: matchings[1]?.fee || 0,
      };
    });

    // 고유한 월 목록
    const months = [...new Set(store.getAll('projects').map(p => p.broadcastMonth).filter(Boolean))].sort().reverse();


    function renderCalendarView(enriched) {
      const year = calendarDate.getFullYear();
      const month = calendarDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = new Date();
      const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
      
      let daysHtml = '';
      for (let i = 0; i < firstDay; i++) {
        daysHtml += `<div class="calendar-day empty"></div>`;
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const dayProjects = enriched.filter(p => p.broadcastDate === dateStr);
        const isToday = isCurrentMonth && today.getDate() === d;
        
        const projectsHtml = dayProjects.map(p => {
          let badgeColor = '#e2e8f0'; let textColor = '#475569';
          if (p.broadcastStatus === 'ready') { badgeColor = '#dbeafe'; textColor = '#2563eb'; }
          else if (p.broadcastStatus === 'live') { badgeColor = '#fee2e2'; textColor = '#dc2626'; }
          else if (p.broadcastStatus === 'done') { badgeColor = '#dcfce3'; textColor = '#16a34a'; }
          else if (p.broadcastStatus === 'cancel') { badgeColor = '#f1f5f9'; textColor = '#64748b'; }
          return `
            <div class="calendar-project-block clickable" data-id="${p.id}" style="background-color: ${badgeColor}; color: ${textColor}; border-left: 3px solid ${textColor};">
              <div class="cp-time">${p.broadcastTime || '-'}</div>
              <div class="cp-brand">${p.brandName || (p.brand ? p.brand.name : '-')}</div>
            </div>`;
        }).join('');
        daysHtml += `
          <div class="calendar-day ${isToday ? 'today' : ''}">
            <div class="calendar-date">${d}</div>
            <div class="calendar-projects">${projectsHtml}</div>
          </div>`;
      }
      return `
        <style>
          .calendar-wrapper { background: #fff; border-radius: var(--radius-lg); border: 1px solid var(--border-color); overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          .calendar-header { display: flex; justify-content: space-between; align-items: center; padding: var(--space-4) var(--space-5); border-bottom: 1px solid var(--border-color); background: #f8fafc; }
          .calendar-title { font-size: 18px; font-weight: bold; color: var(--text-primary); }
          .calendar-nav { display: flex; gap: var(--space-2); }
          .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
          .calendar-dow { text-align: center; font-weight: bold; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-color); font-size: 13px; color: var(--text-secondary); background: #fff; }
          .calendar-day { min-height: 120px; padding: var(--space-2); border-bottom: 1px solid var(--border-color); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; gap: var(--space-1); background: #fff; }
          .calendar-day:nth-child(7n) { border-right: none; }
          .calendar-day.empty { background: #f8fafc; }
          .calendar-date { font-size: 14px; font-weight: 500; color: var(--text-secondary); padding: 2px 6px; align-self: flex-start; border-radius: 4px; }
          .calendar-day.today .calendar-date { background: #3b82f6; color: white; }
          .calendar-projects { display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto; }
          .calendar-project-block { padding: 4px 6px; border-radius: 4px; font-size: 11px; cursor: pointer; transition: transform 0.2s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: flex; flex-direction: column; gap: 2px; }
          .calendar-project-block:hover { transform: translateY(-1px); filter: brightness(0.95); }
          .cp-time { font-weight: bold; opacity: 0.8; font-size: 10px; }
          .cp-brand { font-weight: bold; overflow: hidden; text-overflow: ellipsis; }
        </style>
        <div class="calendar-wrapper">
          <div class="calendar-header">
            <button class="btn btn-secondary btn-icon" id="btn-prev-month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div class="calendar-title">${year}년 ${month + 1}월</div>
            <button class="btn btn-secondary btn-icon" id="btn-next-month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
          <div class="calendar-grid">
            <div class="calendar-dow" style="color: #ef4444;">일</div>
            <div class="calendar-dow">월</div>
            <div class="calendar-dow">화</div>
            <div class="calendar-dow">수</div>
            <div class="calendar-dow">목</div>
            <div class="calendar-dow">금</div>
            <div class="calendar-dow" style="color: #3b82f6;">토</div>
            ${daysHtml}
          </div>
        </div>
      `;
    }

    const headerHtml = `
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">라이브 관리</h1>
            <p class="page-description">전체 라이브 방송 프로젝트 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <div style="display: flex; gap: 8px; margin-right: 16px;">
            <button class="btn btn-sm ${currentView === 'list' ? 'btn-primary' : 'btn-secondary'}" id="btn-view-list">리스트</button>
            <button class="btn btn-sm ${currentView === 'calendar' ? 'btn-primary' : 'btn-secondary'}" id="btn-view-calendar">캘린더</button>
          </div>
          ${isBrandPartner ? '' : `
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
          `}
        </div>
      </div>`;

    
    const availableMonths = [...new Set(projects.map(p => {
      if (p.broadcastDate) {
        const d = new Date(p.broadcastDate.replace(/\./g, '-'));
        if (!isNaN(d.getTime())) return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      }
      if (p.broadcastMonth) {
        let m = String(p.broadcastMonth);
        if (!m.includes('-') && m.length <= 2) m = `2026-${m.padStart(2, '0')}`;
        return m;
      }
      return null;
    }).filter(Boolean))].sort().reverse();

    let bodyHtml = '';
    if (currentView === 'list') {
      bodyHtml = `
        <!-- 필터바 -->
        <div class="filter-bar">
          <select class="filter-select ${filters.month ? 'active' : ''}" id="filter-month">
            <option value="">전체 월</option>
            ${availableMonths.map(m => `<option value="${m}" ${filters.month === m ? 'selected' : ''}>${m}</option>`).join('')}
          </select>
          <select class="filter-select ${filters.status ? 'active' : ''}" id="filter-status">
            <option value="">진행상태</option>
            ${BROADCAST_STATUSES.map(s => `<option value="${s.key}" ${filters.status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
          </select>
          <select class="filter-select ${filters.category ? 'active' : ''}" id="filter-category">
            <option value="">카테고리</option>
            ${CATEGORIES.map(c => `<option value="${c}" ${filters.category === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
          <select class="filter-select ${filters.platform ? 'active' : ''}" id="filter-platform">
            <option value="">플랫폼</option>
            ${PLATFORMS.map(p => `<option value="${p}" ${filters.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
          </select>
          <div class="table-search" style="margin-left: 4px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="검색" id="project-search" value="${searchTerm}" style="background: white;">
          </div>
          ${(Object.values(filters).some(v => v) || searchTerm) ? '<button class="filter-reset" id="filter-reset">초기화</button>' : ''}
        </div>

        <!-- 테이블 -->
        <div class="table-container">
          <div class="table-toolbar">
            <div class="table-toolbar-left" style="display: flex; align-items: center; gap: var(--space-4);">
              <div style="display: flex; align-items: center; gap: var(--space-2);">
                <span class="table-count" style="margin-right: 8px;">총 <strong>${enriched.length}</strong>건</span>
              </div>
              <div style="display: flex; gap: var(--space-3); align-items: center; font-size: var(--text-sm); margin-left: var(--space-2);">
                <span style="color: var(--text-tertiary); font-weight: var(--weight-medium);">표시 항목:</span>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-basic" ${colGroups.basic ? 'checked' : ''}> 기본정보
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-host" ${colGroups.host ? 'checked' : ''}> 쇼호스트
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-result" ${colGroups.result ? 'checked' : ''}> 성과
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="checkbox" id="toggle-col-finance" ${colGroups.finance ? 'checked' : ''}> 정산
                </label>
              </div>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table" id="projects-table">
              <thead>
                <tr>
                  ${colGroups.basic ? `
                  <th>방송 상태</th>
                  <th>브랜드</th>
                  <th>카테고리</th>
                  <th>방송일</th>
                  <th>시간</th>
                  <th>플랫폼</th>
                  ` : ''}
                  ${colGroups.host ? `
                  <th class="text-center" style="text-align: center;">쇼호스트A</th>
                  <th class="text-center" style="text-align: center;">쇼호스트B</th>
                  ` : ''}
                  ${colGroups.result ? `
                  <th class="text-right">시청뷰</th>
                  <th class="text-right">라이브매출</th>
                  <th class="text-right">ROI</th>
                  ` : ''}
                  ${colGroups.finance ? `
                  <th>정산</th>
                  ` : ''}
                  ${colGroups.basic ? `
                  <th>PD</th>
                  ` : ''}
                </tr>
              </thead>
              <tbody>
                ${enriched.length > 0 ? enriched.map(p => `
                  <tr class="clickable" data-id="${p.id}">
                    ${colGroups.basic ? `
                    <td>${renderBroadcastBadge(p.broadcastStatus)}</td>
                    <td><a href="javascript:void(0)" class="project-link" data-id="${p.id}">${p.brandName || (p.brand ? p.brand.name : '-')}</a></td>
                    <td><span class="badge badge-default">${p.category || '-'}</span></td>
                    <td>${formatDate(p.broadcastDate)}</td>
                    <td>${p.broadcastTime || '-'}</td>
                    <td>${p.platform || '-'}</td>
                    ` : ''}
                    ${colGroups.host ? `
                    <td class="text-center" style="text-align: center;">${p.hostA ? p.hostA.name : '-'}</td>
                    <td class="text-center" style="text-align: center;">${p.hostB ? p.hostB.name : '-'}</td>
                    ` : ''}
                    ${colGroups.result ? `
                    <td class="text-right">${p.result ? formatNumber(p.result.views) : '-'}</td>
                    <td class="text-right" style="font-weight: bold;">${p.result ? formatCurrencyShort(p.result.liveRevenue) : '-'}</td>
                    <td class="text-right" style="font-weight: bold;">${p.result ? formatROI(p.result.roi) : '-'}</td>
                    ` : ''}
                    ${colGroups.finance ? `
                    <td><span class="badge ${p.settleLabel === '완료' ? 'badge-success' : p.settleLabel === '일부완료' ? 'badge-warning' : 'badge-default'}">${p.settleLabel}</span></td>
                    ` : ''}
                    ${colGroups.basic ? `
                    <td>${p.pd || '-'}</td>
                    ` : ''}
                  </tr>
                `).join('') : '<tr><td colspan="20" class="text-center" style="padding: var(--space-10); color: var(--text-tertiary);">등록된 프로젝트가 없습니다.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else {
      bodyHtml = renderCalendarView(enriched);
    }
    
    container.innerHTML = headerHtml + '<div class="page-body">' + bodyHtml + '</div>';


    setTimeout(() => {
      container.querySelector('#btn-view-list')?.addEventListener('click', () => {
        if (currentView !== 'list') { currentView = 'list'; render(); }
      });
      container.querySelector('#btn-view-calendar')?.addEventListener('click', () => {
        if (currentView !== 'calendar') { currentView = 'calendar'; render(); }
      });
      container.querySelector('#btn-prev-month')?.addEventListener('click', () => {
        calendarDate.setMonth(calendarDate.getMonth() - 1); render();
      });
      container.querySelector('#btn-next-month')?.addEventListener('click', () => {
        calendarDate.setMonth(calendarDate.getMonth() + 1); render();
      });
      container.querySelectorAll('.calendar-project-block').forEach(el => {
        el.addEventListener('click', () => {
          router.navigate(`/projects/${el.getAttribute('data-id')}`);
        });
      });
      let isComposing = false;
      const searchInput = container.querySelector('#project-search');
      if (searchInput) {
        searchInput.addEventListener('compositionstart', () => { isComposing = true; });
        searchInput.addEventListener('compositionend', (e) => {
          isComposing = false;
          searchTerm = e.target.value;
          render();
          const input = document.getElementById('project-search');
          if (input) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
          }
        });
        searchInput.addEventListener('input', (e) => {
          if (isComposing) return;
          searchTerm = e.target.value;
          render();
          const input = document.getElementById('project-search');
          if (input) {
            input.focus();
            const len = input.value.length;
            input.setSelectionRange(len, len);
          }
        });
      }

      ['status', 'brand', 'platform', 'month', 'category'].forEach(key => {
        container.querySelector(`#filter-${key}`)?.addEventListener('change', (e) => {
          filters[key] = e.target.value;
          render();
        });
      });

      ['basic', 'host', 'result', 'finance'].forEach(key => {
        container.querySelector(`#toggle-col-${key}`)?.addEventListener('change', (e) => {
          colGroups[key] = e.target.checked;
          render();
        });
      });

      container.querySelector('#filter-reset')?.addEventListener('click', () => {
        filters = { status: '', brand: '', platform: '', month: '', category: '', settleStatus: '' };
        searchTerm = '';
        render();
      });

      container.querySelector('#btn-new-project')?.addEventListener('click', () => {
        openProjectCreateModal(() => render());
      });

      container.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          router.navigate(`/projects/${link.getAttribute('data-id')}`);
        });
      });

      container.querySelectorAll('tr.clickable').forEach(tr => {
        tr.addEventListener('click', () => {
          router.navigate(`/projects/${tr.getAttribute('data-id')}`);
        });
      });
    }, 0);
  }

  render();
  store.on('projects:changed', render);
  return container;
}

function openProjectCreateModal(onSave) {
  const brands = store.getAll('brands');

  const content = `
    <div class="form-grid">
      <div class="input-group">
        <label class="required">방송 제목(브랜드)</label>
        <input type="text" class="input" id="proj-brandName" list="brand-list" placeholder="브랜드명 또는 방송 제목 입력">
        <datalist id="brand-list">
          ${brands.map(b => `<option value="${b.name}">`).join('')}
        </datalist>
      </div>
      <div class="input-group">
        <label>카테고리</label>
        <select class="input" id="proj-category">
          <option value="">선택</option>
          ${CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>
      </div>
      <div class="input-group">
        <label class="required">방송일</label>
        <input class="input" type="date" id="proj-date">
      </div>
      <div class="input-group">
        <label>방송시간</label>
        <input class="input" type="time" id="proj-time">
      </div>
      <div class="input-group">
        <label>방송 플랫폼</label>
        <select class="input" id="proj-platform">
          <option value="">선택</option>
          ${PLATFORMS.map(p => `<option value="${p}">${p}</option>`).join('')}
        </select>
      </div>
      <div class="input-group">
        <label>담당 PD</label>
        <input class="input" id="proj-pd" placeholder="담당 PD">
      </div>
      <div class="input-group">
        <label>담당 디자이너</label>
        <input class="input" id="proj-designer" placeholder="담당 디자이너">
      </div>
      <div class="input-group full-width">
        <label>비고</label>
        <textarea class="input" id="proj-note" rows="2" placeholder="비고"></textarea>
      </div>
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
  saveBtn.textContent = '등록';
  saveBtn.addEventListener('click', () => {
    const brandInput = document.getElementById('proj-brandName').value.trim();
    const broadcastDate = document.getElementById('proj-date').value;

    if (!brandInput) { showError('방송 제목(브랜드)을 입력해주세요.'); return; }
    if (!broadcastDate) { showError('방송일을 선택해주세요.'); return; }

    const matchedBrand = brands.find(b => b.name === brandInput);
    const brandId = matchedBrand ? matchedBrand.id : ('b_' + brandInput);
    const id = generateId('live');
    const project = {
      id,
      brandId,
      brandName: brandInput,
      adName: '',
      category: document.getElementById('proj-category').value,
      broadcastMonth: broadcastDate.substring(0, 7),
      broadcastDate,
      broadcastTime: document.getElementById('proj-time').value,
      platform: document.getElementById('proj-platform').value,
      liveUrl: '',
      pd: document.getElementById('proj-pd').value.trim(),
      designer: document.getElementById('proj-designer').value.trim(),
      cuesheetLink: '',
      note: document.getElementById('proj-note').value.trim(),
      broadcastStatus: 'new',
      settleStatus: 'wait',
      createdAt: new Date().toISOString().split('T')[0],
    };

    store.create('projects', project);



    closeModal();
    showSuccess('프로젝트가 등록되었습니다.');
    if (onSave) onSave();
  });

  footer.appendChild(cancelBtn);
  footer.appendChild(saveBtn);

  openModal({ title: '신규 프로젝트 등록', size: 'lg', content, footer });
}

// ===== 프로젝트 상세 페이지 =====
export function renderProjectDetail(params) {
  const container = document.createElement('div');
  const role = store.getCurrentRole();
  const isBrandPartner = role && role.startsWith('brand:');
  const targetBrandId = isBrandPartner ? role.split(':')[1] : null;

  let activeTab = isBrandPartner ? 'scheme' : 'info';

  function render() {
    const project = store.getById('projects', params.id);
    if (!project) {
      container.innerHTML = `<div class="page-header"><div class="page-header-left"><h1 class="page-title">프로젝트를 찾을 수 없습니다</h1></div></div>
      <div class="page-body"><button class="btn btn-secondary" id="btn-back">목록으로</button></div>`;
      setTimeout(() => { container.querySelector('#btn-back')?.addEventListener('click', () => router.navigate('/projects')); }, 0);
      return;
    }

    const brand = store.getById('brands', project.brandId);
    const brandName = project.brandName || (brand ? brand.name : '-');
    const tasks = store.query('tasks', t => t.liveId === project.id);
    const doneTasks = tasks.filter(t => t.done).length;
    
    let progress = 0;
    if (project.broadcastStatus === 'scheduled') progress = 20;
    else if (project.broadcastStatus === 'host_cast') progress = 40;
    else if (project.broadcastStatus === 'tech_request') progress = 60;
    else if (project.broadcastStatus === 'design') progress = 80;
    else if (project.broadcastStatus === 'cue_sheet') progress = 90;
    else if (project.broadcastStatus === 'done') progress = 100;


    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <div class="breadcrumb">
              <a href="javascript:void(0)" id="breadcrumb-list">라이브 관리</a>
              <span class="breadcrumb-separator">/</span>
              <span class="breadcrumb-current">${brandName}</span>
            </div>
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-top: var(--space-2);">
              <h1 class="page-title">${brandName}</h1>
              <div style="display:flex; gap: 4px; align-items:center;">
                ${renderBroadcastBadge(project.broadcastStatus)}
              </div>
            </div>
          </div>
        </div>
        <div class="page-header-right">
          <div style="display: flex; align-items: center; gap: var(--space-2); margin-right: var(--space-4);">
            <span style="font-size: var(--text-sm); color: var(--text-tertiary);">진행률</span>
            <div class="progress-bar" style="width: 120px;">
              <div class="progress-bar-fill" style="width: ${progress}%"></div>
            </div>
            <span style="font-size: var(--text-sm); font-weight: var(--weight-semibold);">${progress}%</span>
          </div>
          ${isBrandPartner ? '' : '<button class="btn btn-secondary" id="btn-delete-project">삭제</button>'}
        </div>
      </div>
      <div class="page-body">
        <!-- 탭 -->
        <div class="tabs" style="margin-bottom: var(--space-5);">
          ${isBrandPartner ? `
            <div class="tab active" data-tab="scheme">스킴관리</div>
          ` : `
            <div class="tab ${activeTab === 'info' ? 'active' : ''}" data-tab="info">기본정보</div>
            <div class="tab ${activeTab === 'scheme' ? 'active' : ''}" data-tab="scheme">스킴관리</div>
            <div class="tab ${activeTab === 'hosts' ? 'active' : ''}" data-tab="hosts">쇼호스트</div>
            <div class="tab ${activeTab === 'design' ? 'active' : ''}" data-tab="design">디자인</div>
            <div class="tab ${activeTab === 'result' ? 'active' : ''}" data-tab="result">성과</div>
            <div class="tab ${activeTab === 'finance' ? 'active' : ''}" data-tab="finance">정산</div>
          `}
        </div>

        <div id="tab-content"></div>
      </div>
    `;

    // 탭 콘텐츠 렌더링
    const tabContent = container.querySelector('#tab-content');
    switch (activeTab) {
      case 'info': tabContent.appendChild(renderInfoTab(project, brand)); break;
      case 'scheme': tabContent.appendChild(renderSchemeTab(project)); break;
      case 'hosts': tabContent.appendChild(renderHostsTab(project)); break;
      case 'design': tabContent.appendChild(renderDesignTab(project)); break;
      case 'result': tabContent.appendChild(renderResultTab(project)); break;
      case 'finance': tabContent.appendChild(renderFinanceTab(project)); break;
    }

    setTimeout(() => {
      container.querySelector('#breadcrumb-list')?.addEventListener('click', () => router.navigate('/projects'));
      container.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
          activeTab = tab.getAttribute('data-tab');
          render();
        });
      });
      container.querySelector('#btn-delete-project')?.addEventListener('click', () => {
        confirmDialog({
          title: '프로젝트 삭제',
          message: `"${project.adName}" 프로젝트를 삭제하시겠습니까? 관련된 체크리스트, 쇼호스트 매칭, 성과, 정산 데이터도 모두 삭제됩니다.`,
          confirmText: '삭제', danger: true,
          onConfirm: () => {
            // 관련 데이터 삭제
            store.query('tasks', t => t.liveId === project.id).forEach(t => store.delete('tasks', t.id));
            store.query('liveHosts', m => m.liveId === project.id).forEach(m => store.delete('liveHosts', m.id));
            store.query('designs', d => d.liveId === project.id).forEach(d => store.delete('designs', d.id));
            store.delete('results', project.id);
            store.delete('finances', project.id);
            store.delete('projects', project.id);
            showSuccess('프로젝트가 삭제되었습니다.');
            router.navigate('/projects');
          }
        });
      });
    }, 0);
  }

  render();
  return container;
}

function renderSchemeTab(project, isSharedView = false) {
  const el = document.createElement('div');
  
  const scheme = project.scheme || {
    liveInfo: { mainProduct: '', brandIntro: '', sellingPoints: '', highlight: '', delivery: '' },
    products: [],
    events: [],
    productionDriveUrl: ''
  };

  if (!scheme.liveInfo) scheme.liveInfo = { mainProduct: '', brandIntro: '', sellingPoints: '', highlight: '', delivery: '' };
  if (!scheme.products) scheme.products = [];
  if (!scheme.events) scheme.events = [];
  if (scheme.productionDriveUrl === undefined) scheme.productionDriveUrl = '';

  function getProductRowsHtml() {
    if (scheme.products.length === 0) {
      return `<tr><td colspan="12" class="text-center" style="padding:var(--space-4); color:var(--text-tertiary);" id="no-products-row">등록된 상품이 없습니다.</td></tr>`;
    }
    return scheme.products.map((prod, idx) => {
      const price = parseFloat(prod.price) || 0;
      const livePrice = parseFloat(prod.livePrice) || 0;
      const targetQty = parseInt(prod.targetQty, 10) || 0;

      const discountRate = price > 0 ? Math.round(((price - livePrice) / price) * 100) + '%' : '0%';
      const targetSales = livePrice * targetQty;

      return `
        <tr class="product-row" data-idx="${idx}">
          <td><input type="text" class="input prod-prodName" style="width: 160px; padding: 6px 8px; font-size: 13px;" value="${prod.prodName || ''}" placeholder="상품명"></td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <input type="text" class="input prod-prodUrl" style="width: 110px; padding: 6px 8px; font-size: 13px;" value="${prod.prodUrl || ''}" placeholder="상품 URL">
              <a href="${prod.prodUrl ? (prod.prodUrl.startsWith('http') ? prod.prodUrl : `https://${prod.prodUrl}`) : '#'}" target="_blank" class="btn-prod-url-link" style="display: ${prod.prodUrl ? 'inline-flex' : 'none'}; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 6px; color: var(--primary); background: #eff6ff; transition: all 0.2s; flex-shrink: 0;" title="상품 바로가기">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </td>
          <td><input type="number" class="input prod-stock" style="width: 80px; padding: 6px 8px; font-size: 13px;" value="${prod.stock || ''}" placeholder="재고"></td>
          <td><input type="text" class="input prod-price" style="width: 95px; padding: 6px 8px; font-size: 13px;" value="${prod.price ? parseInt(prod.price, 10).toLocaleString() : ''}" placeholder="정상가"></td>
          <td><input type="text" class="input prod-livePrice" style="width: 95px; padding: 6px 8px; font-size: 13px;" value="${prod.livePrice ? parseInt(prod.livePrice, 10).toLocaleString() : ''}" placeholder="할인가"></td>
          <td class="prod-discountRate text-center" style="font-size: 13px; font-weight: bold; color: var(--status-error);">${discountRate}</td>
          <td><input type="number" class="input prod-targetQty" style="width: 80px; padding: 6px 8px; font-size: 13px;" value="${prod.targetQty || ''}" placeholder="목표수"></td>
          <td class="prod-targetSales text-right" style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${targetSales.toLocaleString()}</td>
          <td class="text-center"><button class="btn btn-danger btn-sm btn-delete-prod-row" data-idx="${idx}">삭제</button></td>
        </tr>
      `;
    });
  }

  function getEventRowsHtml() {
    if (scheme.events.length === 0) {
      return `<tr><td colspan="7" class="text-center" style="padding:var(--space-4); color:var(--text-tertiary);" id="no-events-row">등록된 이벤트 혜택이 없습니다.</td></tr>`;
    }
    return scheme.events.map((evt, idx) => `
      <tr class="event-row" data-idx="${idx}">
        <td><input type="text" class="input evt-type" style="padding: 6px 8px; font-size: 13px;" value="${evt.type || ''}" placeholder="예: 리뷰 이벤트"></td>
        <td><input type="text" class="input evt-cond" style="padding: 6px 8px; font-size: 13px;" value="${evt.condition || ''}" placeholder="예: 구매 확정 후"></td>
        <td><input type="text" class="input evt-benefit" style="padding: 6px 8px; font-size: 13px;" value="${evt.benefit || ''}" placeholder="예: 네이버 포인트 지급"></td>
        <td><input type="number" class="input evt-price" style="padding: 6px 8px; font-size: 13px;" value="${evt.price || ''}" placeholder="단가"></td>
        <td><input type="number" class="input evt-count" style="padding: 6px 8px; font-size: 13px;" value="${evt.count || ''}" placeholder="명"></td>
        <td><input type="number" class="input evt-budget" style="padding: 6px 8px; font-size: 13px;" value="${evt.budget || ''}" placeholder="총액"></td>
        <td class="text-center"><button class="btn btn-danger btn-sm btn-delete-evt-row" data-idx="${idx}">삭제</button></td>
      </tr>
    `).join('');
  }



  function render() {
    el.innerHTML = `
      <style>
        .scheme-textarea { width: 100%; height: 100px; padding: 10px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; font-family: sans-serif; resize: vertical; line-height: 1.5; color: var(--text-primary); outline: none; transition: border-color 0.2s; }
        .scheme-textarea:focus { border-color: var(--primary); }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .flex-col { display: flex; flex-direction: column; gap: 14px; }
      </style>
      <div class="flex-col">
        ${isSharedView ? '' : `
        <div style="display:flex; justify-content:flex-end; margin-bottom: 4px;">
          <button class="btn btn-secondary btn-sm" id="btn-copy-scheme-url" style="font-weight:600; font-size:12.5px; padding: 8px 24px; min-width: 140px;">공유 URL 복사</button>
        </div>
        `}

        <!-- 1. 라이브 정보 -->
        <div class="card">
          <div class="card-header">
            <h3>라이브 정보</h3>
          </div>
          <div class="card-body flex-col" style="padding: 20px;">
            <div class="grid-2">
              <div>
                <label class="required" style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">주 메인 제품</label>
                <textarea class="scheme-textarea" id="sch-mainProduct" placeholder="핵심 판매 및 노출 대상 상품을 기재하세요.">${scheme.liveInfo.mainProduct || ''}</textarea>
              </div>
              <div>
                <label class="required" style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">브랜드 소개</label>
                <textarea class="scheme-textarea" id="sch-brandIntro" placeholder="브랜드에 대한 핵심 소개 문구 및 히스토리를 기재하세요.">${scheme.liveInfo.brandIntro || ''}</textarea>
              </div>
            </div>
            <div class="grid-2">
              <div>
                <label class="required" style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">제품 소구포인트</label>
                <textarea class="scheme-textarea" id="sch-sellingPoints" placeholder="방송 진행 시 집중적으로 강조해야 할 강점을 기재하세요.">${scheme.liveInfo.sellingPoints || ''}</textarea>
              </div>
              <div>
                <label class="required" style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">강조 노출 사항</label>
                <textarea class="scheme-textarea" id="sch-highlight" placeholder="라이브 화면 노출 또는 멘트 강조 권장 사항을 기재하세요.">${scheme.liveInfo.highlight || ''}</textarea>
              </div>
            </div>
            <div>
              <label class="required" style="display:block; font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">배송 정보</label>
              <textarea class="scheme-textarea" id="sch-delivery" style="height:80px;" placeholder="예: 배송비 3000원 / 도서산간지역 6000원 N만원 이상 구매시 무료">${scheme.liveInfo.delivery || ''}</textarea>
            </div>
          </div>
        </div>

        <!-- 2. 상품 관리 -->
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>상품 관리</h3>
            <button class="btn btn-secondary btn-sm" id="btn-add-prod-row">행 추가</button>
          </div>
          <div class="card-body" style="padding: 20px;">
            <div class="table-scroll" style="margin: 0; border: 1px solid var(--border-color); border-radius: 8px;">
              <table class="data-table" style="min-width: 1000px;">
                <thead>
                  <tr>
                    <th style="width: 180px;">상품명</th>
                    <th style="width: 150px;">상품 URL</th>
                    <th style="width: 90px;">재고수량</th>
                    <th style="width: 105px;">정상가</th>
                    <th style="width: 105px;">라이브 할인가</th>
                    <th style="width: 90px; text-align: center;">할인율</th>
                    <th style="width: 90px;">목표수량</th>
                    <th style="width: 120px; text-align: right;">목표 매출</th>
                    <th style="width: 80px; text-align: center;">작업</th>
                  </tr>
                </thead>
                <tbody id="prod-table-body">
                  ${getProductRowsHtml()}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 3. 이벤트 관리 -->
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>이벤트 관리</h3>
            <button class="btn btn-secondary btn-sm" id="btn-add-evt-row">행 추가</button>
          </div>
          <div class="card-body" style="padding: 20px;">
            <div class="table-scroll" style="margin: 0; border: 1px solid var(--border-color); border-radius: 8px;">
              <table class="data-table" style="min-width: 800px;">
                <thead>
                  <tr>
                    <th>이벤트 유형</th>
                    <th>조건</th>
                    <th>경품 / 혜택</th>
                    <th>단가</th>
                    <th>당첨인원</th>
                    <th>예산 총액</th>
                    <th style="width:80px; text-align:center;">작업</th>
                  </tr>
                </thead>
                <tbody id="evt-table-body">
                  ${getEventRowsHtml()}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 4. 제작 자료 업로드 -->
        <div class="card">
          <div class="card-header">
            <h3>제작 자료 업로드</h3>
          </div>
          <div class="card-body" style="padding: 20px;">
            <div style="display:flex; flex-direction:column; gap:8px;">
              <label style="display:block; font-size:12.5px; font-weight:700; color:var(--text-secondary);">공유 폴더 주소 (URL)</label>
              <div style="display:flex; gap:12px; align-items:center;">
                <input type="text" class="input" id="sch-productionDriveUrl" placeholder="https://drive.google.com/... 또는 공유 자료 링크를 입력하세요." value="${scheme.productionDriveUrl || ''}" style="flex:1; padding: 10px 12px; font-size: 13.5px;">
                ${scheme.productionDriveUrl ? `
                <a href="${scheme.productionDriveUrl}" target="_blank" class="btn btn-secondary" style="white-space:nowrap; padding:10px 18px; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; gap:6px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  열기
                </a>` : ''}
              </div>
              <p style="font-size:12px; color:var(--text-tertiary); margin: 0; line-height: 1.4;">입력된 주소는 브랜드사와 실시간으로 상호 공유하며 직접 접속하여 제작 리소스를 다운로드할 수 있습니다.</p>
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; padding:10px 0;">
          <button class="btn btn-primary" id="btn-save-project-scheme" style="padding:12px 36px; font-weight:700; font-size:15px; box-shadow: 0 4px 12px rgba(59,130,246,0.25);">스킴 정보 저장</button>
        </div>
      </div>
    `;

    // 공유 URL 복사 바인딩
    if (!isSharedView) {
      el.querySelector('#btn-copy-scheme-url')?.addEventListener('click', () => {
        const shareUrl = `${window.location.origin}${window.location.pathname}#/shared_scheme/${project.id}`;
        navigator.clipboard.writeText(shareUrl)
          .then(() => showSuccess('공유 URL이 클립보드에 복사되었습니다.'))
          .catch(() => showError('URL 복사에 실패했습니다.'));
      });
    }

    // 상품 이벤트 리스너 바인딩
    el.querySelector('#btn-add-prod-row').addEventListener('click', () => {
      collectCurrentData();
      scheme.products.push({ prodName: '', prodUrl: '', stock: '', price: '', livePrice: '', targetQty: '', feeRate: '' });
      render();
    });

    el.querySelectorAll('.btn-delete-prod-row').forEach(btn => {
      btn.addEventListener('click', () => {
        collectCurrentData();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        scheme.products.splice(idx, 1);
        render();
      });
    });

    // 천단위 콤마 포맷터 보조 함수
    const formatMoney = (val) => {
      const num = val.replace(/[^0-9]/g, '');
      return num ? parseInt(num, 10).toLocaleString() : '';
    };

    const parseMoney = (val) => {
      return parseFloat(val.replace(/,/g, '')) || 0;
    };

    const calculateMoneyRow = (rowEl) => {
      const price = parseMoney(rowEl.querySelector('.prod-price').value);
      const livePrice = parseMoney(rowEl.querySelector('.prod-livePrice').value);
      const targetQty = parseInt(rowEl.querySelector('.prod-targetQty').value, 10) || 0;

      // 할인율
      const discountRate = price > 0 ? Math.round(((price - livePrice) / price) * 100) + '%' : '0%';
      rowEl.querySelector('.prod-discountRate').textContent = discountRate;

      // 목표 매출
      const targetSales = livePrice * targetQty;
      rowEl.querySelector('.prod-targetSales').textContent = targetSales.toLocaleString();
    };

    // 각 상품 행 인풋 변경 시 실시간 자동계산 바인딩
    el.querySelectorAll('.product-row').forEach(row => {
      const priceInput = row.querySelector('.prod-price');
      const livePriceInput = row.querySelector('.prod-livePrice');

      const bindMoneyMask = (input) => {
        input.addEventListener('input', (e) => {
          const start = e.target.selectionStart;
          const oldLen = e.target.value.length;
          const formatted = formatMoney(e.target.value);
          e.target.value = formatted;
          const newLen = formatted.length;
          e.target.setSelectionRange(start + (newLen - oldLen), start + (newLen - oldLen));
          calculateMoneyRow(row);
        });
      };

      if (priceInput) bindMoneyMask(priceInput);
      if (livePriceInput) bindMoneyMask(livePriceInput);

      const prodUrlInput = row.querySelector('.prod-prodUrl');
      if (prodUrlInput) {
        prodUrlInput.addEventListener('input', (e) => {
          const val = e.target.value.trim();
          const linkBtn = row.querySelector('.btn-prod-url-link');
          if (linkBtn) {
            if (val) {
              linkBtn.href = val.startsWith('http') ? val : `https://${val}`;
              linkBtn.style.display = 'inline-flex';
            } else {
              linkBtn.href = '#';
              linkBtn.style.display = 'none';
            }
          }
        });
      }

      row.querySelectorAll('input').forEach(input => {
        if (input !== priceInput && input !== livePriceInput) {
          input.addEventListener('input', () => {
            calculateMoneyRow(row);
          });
        }
      });
    });

    // 이벤트 리스너 바인딩
    el.querySelector('#btn-add-evt-row').addEventListener('click', () => {
      collectCurrentData();
      scheme.events.push({ type: '', condition: '', benefit: '', price: '', count: '', budget: '' });
      render();
    });

    el.querySelectorAll('.btn-delete-evt-row').forEach(btn => {
      btn.addEventListener('click', () => {
        collectCurrentData();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        scheme.events.splice(idx, 1);
        render();
      });
    });



    el.querySelector('#btn-save-project-scheme').addEventListener('click', async () => {
      collectCurrentData();
      const saveBtn = el.querySelector('#btn-save-project-scheme');
      saveBtn.disabled = true;
      saveBtn.textContent = '저장 중...';

      try {
        store.update('projects', project.id, { scheme });
        showSuccess('스킴 정보가 정상적으로 저장되었습니다.');
      } catch (err) {
        console.error('스킴 저장 실패:', err);
        showError('스킴 저장 중 오류가 발생했습니다.');
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = '스킴 정보 저장';
      }
    });
  }

  function collectCurrentData() {
    scheme.liveInfo.mainProduct = el.querySelector('#sch-mainProduct').value;
    scheme.liveInfo.brandIntro = el.querySelector('#sch-brandIntro').value;
    scheme.liveInfo.sellingPoints = el.querySelector('#sch-sellingPoints').value;
    scheme.liveInfo.highlight = el.querySelector('#sch-highlight').value;
    scheme.liveInfo.delivery = el.querySelector('#sch-delivery').value;

    const prodRows = el.querySelectorAll('.product-row');
    scheme.products = Array.from(prodRows).map(row => {
      const priceRaw = row.querySelector('.prod-price').value.replace(/,/g, '');
      const livePriceRaw = row.querySelector('.prod-livePrice').value.replace(/,/g, '');
      return {
        prodName: row.querySelector('.prod-prodName').value,
        prodUrl: row.querySelector('.prod-prodUrl').value,
        stock: row.querySelector('.prod-stock').value ? parseInt(row.querySelector('.prod-stock').value, 10) : '',
        price: priceRaw ? parseFloat(priceRaw) : '',
        livePrice: livePriceRaw ? parseFloat(livePriceRaw) : '',
        targetQty: row.querySelector('.prod-targetQty').value ? parseInt(row.querySelector('.prod-targetQty').value, 10) : ''
      };
    });

    const rows = el.querySelectorAll('.event-row');
    scheme.events = Array.from(rows).map(row => {
      return {
        type: row.querySelector('.evt-type').value,
        condition: row.querySelector('.evt-cond').value,
        benefit: row.querySelector('.evt-benefit').value,
        price: row.querySelector('.evt-price').value ? parseFloat(row.querySelector('.evt-price').value) : '',
        count: row.querySelector('.evt-count').value ? parseInt(row.querySelector('.evt-count').value, 10) : '',
        budget: row.querySelector('.evt-budget').value ? parseFloat(row.querySelector('.evt-budget').value) : ''
      };
    });

    scheme.productionDriveUrl = el.querySelector('#sch-productionDriveUrl').value.trim();
  }

  render();
  return el;
}

export function renderSharedScheme(params) {
  const container = document.createElement('div');
  container.style.padding = 'var(--space-8)';
  container.style.maxWidth = '1200px';
  container.style.margin = '0 auto';

  function render() {
    const project = store.getById('projects', params.id);
    if (!project) {
      container.innerHTML = `
        <div style="text-align:center; padding: 100px 20px;">
          <h2 style="color:var(--text-secondary); margin-bottom: 20px;">프로젝트 정보를 찾을 수 없습니다.</h2>
          <p style="color:var(--text-tertiary);">올바르지 않은 공유 주소이거나 삭제된 프로젝트입니다.</p>
        </div>
      `;
      return;
    }

    const brand = store.getById('brands', project.brandId);
    const brandName = project.brandName || (brand ? brand.name : '');
    const broadcastDate = project.broadcastDate || '';
    const titleText = `[${brandName}] 라이브 스킴 _ ${broadcastDate}`;

    const mappedHosts = store.query('liveHosts', lh => lh.liveId === project.id);
    const hostNames = mappedHosts
      .map(lh => {
        const host = store.getById('hosts', lh.hostId);
        return host ? host.name : '';
      })
      .filter(Boolean)
      .join(', ') || '-';
    const pdName = project.pd || '-';

    container.innerHTML = `
      <div class="page-header" style="margin-bottom: 24px; padding: 24px 32px; background: #111827; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 20px rgba(0,0,0,0.08); color: #ffffff; gap: 24px; flex-wrap: wrap;">
        <div class="page-header-left" style="flex: 1; min-width: 280px;">
          <div>
            <h1 class="page-title" style="font-size: 22px; color: #ffffff; font-weight: 700; margin: 0; letter-spacing: -0.5px;">${titleText}</h1>
            <p class="page-description" style="margin-top: 6px; margin-bottom: 0; color: #94a3b8; font-size: 13px;">브랜드사 공유 전용 기재 페이지입니다. 내용을 작성하고 저장 버튼을 눌러주세요.</p>
          </div>
        </div>
        <div class="page-header-right" style="text-align: left; display: flex; flex-direction: column; gap: 6px; align-items: flex-start; background: rgba(255,255,255,0.06); padding: 12px 18px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); min-width: 220px; flex-shrink: 0;">
          <div style="font-size: 13px; color: #f1f5f9; font-weight: 500; display: flex; align-items: center;">
            <span style="color: #94a3b8; margin-right: 6px; font-weight: 600; width: 60px; display: inline-block;">담당 PD</span>
            <span style="color: #ffffff;">${pdName}</span>
          </div>
          <div style="font-size: 13px; color: #f1f5f9; font-weight: 500; display: flex; align-items: center;">
            <span style="color: #94a3b8; margin-right: 6px; font-weight: 600; width: 60px; display: inline-block;">쇼호스트</span>
            <span style="color: #ffffff;">${hostNames}</span>
          </div>
        </div>
      </div>
      <div id="shared-scheme-content"></div>
    `;

    const contentDiv = container.querySelector('#shared-scheme-content');
    contentDiv.appendChild(renderSchemeTab(project, true));
  }

  render();
  return container;
}

// ===== 탭: 기본정보 =====
function renderInfoTab(project, brand) {
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>기본 정보</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-info">수정</button>
      </div>
      <div class="card-body">
        <div class="detail-grid">
          <div class="detail-field"><span class="detail-field-label">브랜드</span><span class="detail-field-value">${project.brandName || (brand ? brand.name : '-')}</span></div>
          <div class="detail-field"><span class="detail-field-label">진행월</span><span class="detail-field-value">${project.broadcastMonth || '-'}</span></div>
          <div class="detail-field"><span class="detail-field-label">방송일</span><span class="detail-field-value">${formatDate(project.broadcastDate)}</span></div>
          <div class="detail-field"><span class="detail-field-label">방송시간</span><span class="detail-field-value">${project.broadcastTime || '-'}</span></div>
          <div class="detail-field"><span class="detail-field-label">카테고리</span><span class="detail-field-value">${project.category || '-'}</span></div>
          <div class="detail-field"><span class="detail-field-label">플랫폼</span><span class="detail-field-value">${project.platform || '-'}</span></div>
          <div class="detail-field"><span class="detail-field-label">담당 PD</span><span class="detail-field-value">${project.pd || '-'}</span></div>
          <div class="detail-field"><span class="detail-field-label">담당 디자이너</span><span class="detail-field-value">${project.designer || '-'}</span></div>
          <div class="detail-field"><span class="detail-field-label">큐시트</span><span class="detail-field-value">${project.cuesheetLink ? `<a href="${project.cuesheetLink}" target="_blank">바로가기</a>` : '-'}</span></div>
          <div class="detail-field"><span class="detail-field-label">라이브 URL</span><span class="detail-field-value">${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">바로가기</a>` : '-'}</span></div>
          <div class="detail-field" style="grid-column: 1/-1;"><span class="detail-field-label">비고</span><span class="detail-field-value">${project.note || '-'}</span></div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top: var(--space-4);">
      <div class="card-header"><h3>방송 진행 상태 변경</h3></div>
      <div class="card-body">
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--space-2);">
          ${BROADCAST_STATUSES.map(s => `
            <button class="btn ${project.broadcastStatus === s.key ? 'btn-primary' : 'btn-secondary'} btn-sm status-change-btn" data-status="${s.key}" style="font-size: 11px; padding: var(--space-1); line-height: 1.2;">
              ${s.label}${getDeadlineText(project.broadcastDate, s.key)}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="card" style="margin-top: var(--space-4);">
      <div class="card-header"><h3>정산 상태 변경</h3></div>
      <div class="card-body">
        <div style="display: flex; gap: var(--space-4); align-items: center;">
          <div style="display: flex; gap: var(--space-2);">
            ${SETTLE_STATUSES.map(s => `
              <button class="btn ${project.settleStatus === s.key ? 'btn-primary' : 'btn-secondary'} btn-sm settle-status-change-btn" data-status="${s.key}" style="font-size: 11px;">
                ${s.label}
              </button>
            `).join('')}
          </div>
          <div style="border-left: 1px solid var(--border-color); padding-left: var(--space-4); display: flex; align-items: center; gap: var(--space-2);">
            <span style="font-size: var(--text-sm); font-weight: var(--weight-medium);">세금계산서:</span>
            <button class="btn ${brand && brand.taxInvoice ? 'btn-primary' : 'btn-secondary'} btn-sm tax-invoice-btn" style="font-size: 11px;">
              ${brand && brand.taxInvoice ? '발행완료' : '미발행'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    el.querySelector('#btn-edit-info')?.addEventListener('click', () => {
      openEditInfoModal(project);
    });
    el.querySelectorAll('.status-change-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const newStatus = btn.getAttribute('data-status');
        store.update('projects', project.id, { broadcastStatus: newStatus });
        showSuccess(`방송 상태가 "${getBroadcastStatusLabel(newStatus)}"(으)로 변경되었습니다.`);
        router.navigate(`/projects/${project.id}`);
      });
    });
    el.querySelectorAll('.settle-status-change-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const newStatus = btn.getAttribute('data-status');
        store.update('projects', project.id, { settleStatus: newStatus });
        showSuccess(`정산 상태가 "${getSettleStatusLabel(newStatus)}"(으)로 변경되었습니다.`);
        router.navigate(`/projects/${project.id}`);
      });
    });
    el.querySelector('.tax-invoice-btn')?.addEventListener('click', () => {
      if (!brand) {
        showError('등록된 브랜드 정보가 없어 세금계산서 상태를 변경할 수 없습니다.');
        return;
      }
      const newStatus = !brand.taxInvoice;
      store.update('brands', brand.id, { taxInvoice: newStatus });
      showSuccess(`세금계산서 상태가 "${newStatus ? '발행완료' : '미발행'}"(으)로 변경되었습니다.`);
      router.navigate(`/projects/${project.id}`);
    });
  }, 0);

  return el;
}

function openEditInfoModal(project) {
  const brands = store.getAll('brands');
  const content = `
    <div class="form-grid">
      <div class="input-group">
        <label>방송 제목(브랜드)</label>
        <input type="text" class="input" id="edit-brandName" list="brand-list" value="${project.brandName || (brands.find(b => b.id === project.brandId)?.name || '')}">
        <datalist id="brand-list">${brands.map(b => `<option value="${b.name}">`).join('')}</datalist>
      </div>
      <div class="input-group">
        <label>카테고리</label>
        <select class="input" id="edit-category">${CATEGORIES.map(c => `<option value="${c}" ${project.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select>
      </div>
      <div class="input-group">
        <label>방송일</label>
        <input class="input" type="date" id="edit-date" value="${project.broadcastDate || ''}">
      </div>
      <div class="input-group">
        <label>방송시간</label>
        <input class="input" type="time" id="edit-time" value="${project.broadcastTime || ''}">
      </div>
      <div class="input-group">
        <label>플랫폼</label>
        <select class="input" id="edit-platform"><option value="">선택</option>${PLATFORMS.map(p => `<option value="${p}" ${project.platform === p ? 'selected' : ''}>${p}</option>`).join('')}</select>
      </div>
      <div class="input-group">
        <label>라이브 URL</label>
        <input class="input" id="edit-url" value="${project.liveUrl || ''}">
      </div>
      <div class="input-group">
        <label>담당 PD</label>
        <input class="input" id="edit-pd" value="${project.pd || ''}">
      </div>
      <div class="input-group">
        <label>담당 디자이너</label>
        <input class="input" id="edit-designer" value="${project.designer || ''}">
      </div>
      <div class="input-group">
        <label>큐시트 링크</label>
        <input class="input" id="edit-cuesheet" value="${project.cuesheetLink || ''}">
      </div>
      <div class="input-group full-width">
        <label>비고</label>
        <textarea class="input" id="edit-note" rows="2">${project.note || ''}</textarea>
      </div>
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
    const broadcastDate = document.getElementById('edit-date').value;
    const brandInput = document.getElementById('edit-brandName').value.trim();
    const matchedBrand = brands.find(b => b.name === brandInput);
    const brandId = matchedBrand ? matchedBrand.id : ('b_' + brandInput);

    store.update('projects', project.id, {
      brandId: brandId,
      brandName: brandInput,
      category: document.getElementById('edit-category').value,
      broadcastDate,
      broadcastMonth: broadcastDate ? broadcastDate.substring(0, 7) : '',
      broadcastTime: document.getElementById('edit-time').value,
      platform: document.getElementById('edit-platform').value,
      liveUrl: document.getElementById('edit-url').value.trim(),
      pd: document.getElementById('edit-pd').value.trim(),
      designer: document.getElementById('edit-designer').value.trim(),
      cuesheetLink: document.getElementById('edit-cuesheet').value.trim(),
      note: document.getElementById('edit-note').value.trim(),
    });
    closeModal();
    showSuccess('기본 정보가 수정되었습니다.');
    router.navigate(`/projects/${project.id}`);
  });
  footer.appendChild(cancelBtn);
  footer.appendChild(saveBtn);
  openModal({ title: '기본 정보 수정', size: 'lg', content, footer });
}

// ===== 탭: 쇼호스트 =====
function renderHostsTab(project) {
  const el = document.createElement('div');
  const matchings = store.query('liveHosts', m => m.liveId === project.id);
  const hosts = store.getAll('hosts');

  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>쇼호스트 매칭</h3>
        <button class="btn btn-primary btn-sm" id="btn-add-host-match">쇼호스트 추가</button>
      </div>
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>쇼호스트</th>
              <th>역할</th>
              <th class="text-right">진행금액</th>
              <th>정산상태</th>
              <th>메모</th>
              <th class="col-actions"></th>
            </tr>
          </thead>
          <tbody>
            ${matchings.length > 0 ? matchings.map(m => {
              const host = store.getById('hosts', m.hostId);
              return `
                <tr>
                  <td>${host ? host.name : '-'}</td>
                  <td>${HOST_ROLES.find(r => r.key === m.role)?.label || '-'}</td>
                  <td class="text-right">${m.brandPays ? `<span class="badge" style="background: var(--bg-secondary); color: var(--text-tertiary); margin-right: 4px;">브랜드 부담</span><span style="text-decoration: line-through; color: var(--text-tertiary);">${formatCurrency(m.fee)}</span>` : formatCurrency(m.fee)}</td>
                  <td>${renderSettleBadge(m.settleStatus)}</td>
                  <td style="font-size: var(--text-xs); color: var(--text-tertiary);">${m.memo || '-'}</td>
                  <td class="col-actions">
                    <button class="btn btn-ghost btn-icon btn-sm btn-edit-match" data-id="${m.id}">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                  </td>
                </tr>
              `;
            }).join('') : '<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">매칭된 쇼호스트가 없습니다.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;

  setTimeout(() => {
    el.querySelector('#btn-add-host-match')?.addEventListener('click', () => {
      openHostMatchModal(project.id, null, () => {
        const newEl = renderHostsTab(project);
        el.replaceWith(newEl);
      });
    });
    el.querySelectorAll('.btn-edit-match').forEach(btn => {
      btn.addEventListener('click', () => {
        openHostMatchModal(project.id, btn.getAttribute('data-id'), () => {
          const newEl = renderHostsTab(project);
          el.replaceWith(newEl);
        });
      });
    });
  }, 0);

  return el;
}

function openHostMatchModal(liveId, matchId, onSave) {
  const isEdit = !!matchId;
  const match = isEdit ? store.getById('liveHosts', matchId) : {};
  const hosts = store.getAll('hosts');
  const content = `
    <div class="form-grid">
      <div class="input-group" style="position: relative;">
        <label class="required">쇼호스트</label>
        <input type="hidden" id="match-host" value="${match.hostId || ''}">
        <input type="text" class="input" id="match-host-search" placeholder="쇼호스트 이름 검색 및 선택..." autocomplete="off" value="${match.hostId ? (hosts.find(h=>h.id===match.hostId)?.name || '') : ''}">
        <div id="match-host-dropdown" style="display:none; position:absolute; top:calc(100% + 4px); left:0; right:0; max-height:200px; overflow-y:auto; background:var(--bg-primary); border:1px solid var(--border-default); border-radius:var(--radius-md); box-shadow:var(--shadow-md); z-index:1000;">
        </div>
      </div>
      <div class="input-group">
        <label>역할</label>
        <select class="input" id="match-role">
          ${HOST_ROLES.map(r => `<option value="${r.key}" ${match.role === r.key ? 'selected' : ''}>${r.label}</option>`).join('')}
        </select>
      </div>
      <div class="input-group">
        <label>진행금액</label>
        <input class="input" type="number" id="match-fee" value="${match.fee || ''}" placeholder="금액">
      </div>
      <div class="input-group">
        <label>정산상태</label>
        <select class="input" id="match-settle">
          <option value="pending" ${match.settleStatus === 'pending' ? 'selected' : ''}>대기</option>
          <option value="processing" ${match.settleStatus === 'processing' ? 'selected' : ''}>진행중</option>
          <option value="done" ${match.settleStatus === 'done' ? 'selected' : ''}>완료</option>
        </select>
      </div>
      <div class="input-group full-width">
        <label>메모</label>
        <input class="input" id="match-memo" value="${match.memo || ''}">
      </div>
      <div class="input-group full-width" style="margin-top: 4px;">
        <label style="display: flex; align-items: center; gap: 8px; font-weight: 500; cursor: pointer; color: var(--text-primary);">
          <input type="checkbox" id="match-brand-pays" ${match.brandPays ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--primary-color);">
          브랜드 자체 부담 (자사 집행비용에서 제외)
        </label>
      </div>
    </div>
  `;

  const footer = document.createElement('div');
  footer.style.cssText = 'display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;';
  if (isEdit) {
    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger';
    delBtn.textContent = '삭제';
    delBtn.style.marginRight = 'auto';
    delBtn.addEventListener('click', () => { store.delete('liveHosts', matchId); closeModal(); showSuccess('삭제되었습니다.'); if (onSave) onSave(); });
    footer.appendChild(delBtn);
  }
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn btn-secondary';
  cancelBtn.textContent = '취소';
  cancelBtn.addEventListener('click', closeModal);
  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-primary';
  saveBtn.textContent = isEdit ? '수정' : '추가';
  saveBtn.addEventListener('click', () => {
    const hostId = document.getElementById('match-host').value;
    if (!hostId) { showError('쇼호스트를 선택해주세요.'); return; }
    const data = {
      liveId,
      hostId,
      role: document.getElementById('match-role').value,
      fee: parseInt(document.getElementById('match-fee').value) || 0,
      settleStatus: document.getElementById('match-settle').value,
      memo: document.getElementById('match-memo').value.trim(),
      brandPays: document.getElementById('match-brand-pays').checked,
    };
    if (isEdit) { store.update('liveHosts', matchId, data); showSuccess('수정되었습니다.'); }
    else { data.id = generateId('lh'); store.create('liveHosts', data); showSuccess('쇼호스트가 매칭되었습니다.'); }
    closeModal();
    if (onSave) onSave();
  });
  footer.appendChild(cancelBtn);
  footer.appendChild(saveBtn);
  openModal({ title: isEdit ? '쇼호스트 매칭 수정' : '쇼호스트 추가', size: 'md', content, footer });

  setTimeout(() => {
    const searchInput = document.getElementById('match-host-search');
    const hiddenInput = document.getElementById('match-host');
    const dropdown = document.getElementById('match-host-dropdown');
    
    const renderOptions = (term) => {
      const filtered = hosts.filter(h => h.name.toLowerCase().includes(term));
      if(filtered.length === 0) {
        dropdown.innerHTML = '<div style="padding: 8px 12px; color: var(--text-tertiary); font-size: var(--text-sm);">검색 결과가 없습니다.</div>';
        return;
      }
      dropdown.innerHTML = filtered.map(h => 
        `<div class="dropdown-item" data-id="${h.id}" data-name="${h.name}" style="padding: 8px 12px; cursor: pointer; font-size: var(--text-sm); border-bottom: 1px solid var(--border-light); transition: background var(--transition-fast);">
          ${h.name}
        </div>`
      ).join('');
      
      dropdown.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
          searchInput.value = item.getAttribute('data-name');
          hiddenInput.value = item.getAttribute('data-id');
          dropdown.style.display = 'none';
        });
        item.addEventListener('mouseenter', () => item.style.background = 'var(--bg-hover)');
        item.addEventListener('mouseleave', () => item.style.background = 'transparent');
      });
    };

    if (searchInput && dropdown) {
      searchInput.addEventListener('focus', () => {
        dropdown.style.display = 'block';
        renderOptions(searchInput.value.toLowerCase());
      });

      searchInput.addEventListener('input', (e) => {
        dropdown.style.display = 'block';
        hiddenInput.value = ''; 
        renderOptions(e.target.value.toLowerCase());
      });

      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.style.display = 'none';
          if(!hiddenInput.value) searchInput.value = '';
        }
      });
    }
  }, 0);
}

// ===== 탭: 디자인 =====
function renderDesignTab(project) {
  const el = document.createElement('div');
  const designs = store.query('designs', d => d.liveId === project.id);
  const { renderDesignBadge } = require_statusBadge();

  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>디자인 요청</h3>
        <button class="btn btn-primary btn-sm" id="btn-add-design">요청 추가</button>
      </div>
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>요청일</th>
              <th>담당 디자이너</th>
              <th>상태</th>
              <th>작업 링크</th>
              <th>파일 링크</th>
              <th>메모</th>
              <th class="col-actions"></th>
            </tr>
          </thead>
          <tbody>
            ${designs.length > 0 ? designs.map(d => `
              <tr>
                <td>${formatDate(d.requestDate)}</td>
                <td>${d.designer || '-'}</td>
                <td>${renderDesignBadge(d.status)}</td>
                <td>${d.workLink ? `<a href="${d.workLink}" target="_blank">바로가기</a>` : '-'}</td>
                <td>${d.fileLink ? `<a href="${d.fileLink}" target="_blank">바로가기</a>` : '-'}</td>
                <td style="font-size: var(--text-xs); color: var(--text-tertiary);">${d.memo || '-'}</td>
                <td class="col-actions">
                  <button class="btn btn-ghost btn-icon btn-sm btn-edit-design" data-id="${d.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </td>
              </tr>
            `).join('') : '<tr><td colspan="7" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">디자인 요청이 없습니다.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;

  setTimeout(() => {
    el.querySelector('#btn-add-design')?.addEventListener('click', () => {
      openDesignModal(project.id, null, () => {
        const newEl = renderDesignTab(project);
        el.replaceWith(newEl);
      });
    });
    el.querySelectorAll('.btn-edit-design').forEach(btn => {
      btn.addEventListener('click', () => {
        openDesignModal(project.id, btn.getAttribute('data-id'), () => {
          const newEl = renderDesignTab(project);
          el.replaceWith(newEl);
        });
      });
    });
  }, 0);

  return el;
}

function require_statusBadge() {
  // Lazy import workaround
  return { renderDesignBadge: (status) => {
    const labels = { requested: '요청', working: '작업중', reviewing: '검수중', done: '완료' };
    const styles = { requested: 'badge-default', working: 'badge-warning', reviewing: 'badge-warning', done: 'badge-success' };
    return `<span class="badge ${styles[status] || 'badge-default'}">${labels[status] || status}</span>`;
  }};
}

function openDesignModal(liveId, designId, onSave) {
  const isEdit = !!designId;
  const design = isEdit ? store.getById('designs', designId) : {};
  const content = `
    <div class="form-grid">
      <div class="input-group"><label>요청일</label><input class="input" type="date" id="design-date" value="${design.requestDate || new Date().toISOString().split('T')[0]}"></div>
      <div class="input-group"><label>담당 디자이너</label><input class="input" id="design-designer" value="${design.designer || ''}" placeholder="디자이너"></div>
      <div class="input-group"><label>상태</label><select class="input" id="design-status">${DESIGN_STATUSES.map(s => `<option value="${s.key}" ${design.status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}</select></div>
      <div class="input-group"><label>작업 링크</label><input class="input" id="design-work" value="${design.workLink || ''}"></div>
      <div class="input-group"><label>파일 링크</label><input class="input" id="design-file" value="${design.fileLink || ''}"></div>
      <div class="input-group"><label>메모</label><input class="input" id="design-memo" value="${design.memo || ''}"></div>
    </div>
  `;
  const footer = document.createElement('div');
  footer.style.cssText = 'display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;';
  if (isEdit) {
    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger'; delBtn.textContent = '삭제'; delBtn.style.marginRight = 'auto';
    delBtn.addEventListener('click', () => { store.delete('designs', designId); closeModal(); showSuccess('삭제되었습니다.'); if (onSave) onSave(); });
    footer.appendChild(delBtn);
  }
  const cancelBtn = document.createElement('button'); cancelBtn.className = 'btn btn-secondary'; cancelBtn.textContent = '취소'; cancelBtn.addEventListener('click', closeModal);
  const saveBtn = document.createElement('button'); saveBtn.className = 'btn btn-primary'; saveBtn.textContent = isEdit ? '수정' : '등록';
  saveBtn.addEventListener('click', () => {
    const data = {
      liveId, requestDate: document.getElementById('design-date').value, designer: document.getElementById('design-designer').value.trim(),
      status: document.getElementById('design-status').value, workLink: document.getElementById('design-work').value.trim(),
      fileLink: document.getElementById('design-file').value.trim(), memo: document.getElementById('design-memo').value.trim(),
    };
    if (isEdit) { store.update('designs', designId, data); showSuccess('수정되었습니다.'); }
    else { data.id = generateId('design'); store.create('designs', data); showSuccess('디자인 요청이 등록되었습니다.'); }
    closeModal(); if (onSave) onSave();
  });
  footer.appendChild(cancelBtn); footer.appendChild(saveBtn);
  openModal({ title: isEdit ? '디자인 요청 수정' : '디자인 요청 추가', size: 'md', content, footer });
}

// ===== 탭: 성과 =====
function renderResultTab(project) {
  const el = document.createElement('div');
  const result = store.getAll('results').find(r => r.liveId === project.id) || {};

  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>방송 성과</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-result">수정</button>
      </div>
      <div class="card-body">
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-label">시청뷰</div><div class="stat-value">${formatNumber(result.views)}</div></div>
          <div class="stat-card"><div class="stat-label">좋아요</div><div class="stat-value">${formatNumber(result.likes)}</div></div>
          <div class="stat-card"><div class="stat-label">주문건수</div><div class="stat-value">${formatNumber(result.orders)}건</div></div>
          <div class="stat-card"><div class="stat-label">라이브 매출</div><div class="stat-value">${formatCurrency(result.liveRevenue)}</div></div>
          <div class="stat-card"><div class="stat-label">ROI</div><div class="stat-value">${formatROI(result.roi)}</div></div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    el.querySelector('#btn-edit-result')?.addEventListener('click', () => {
      const content = `
        <div class="form-grid">
          <div class="input-group"><label>시청뷰</label><input class="input" type="number" id="res-views" value="${result.views || ''}"></div>
          <div class="input-group"><label>좋아요</label><input class="input" type="number" id="res-likes" value="${result.likes || ''}"></div>
          <div class="input-group"><label>주문건수</label><input class="input" type="number" id="res-orders" value="${result.orders || ''}"></div>
          <div class="input-group"><label>라이브 매출</label><input class="input" type="number" id="res-revenue" value="${result.liveRevenue || ''}"></div>
        </div>
      `;
      const footer = document.createElement('div');
      footer.style.cssText = 'display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;';
      const cancelBtn = document.createElement('button'); cancelBtn.className = 'btn btn-secondary'; cancelBtn.textContent = '취소'; cancelBtn.addEventListener('click', closeModal);
      const saveBtn = document.createElement('button'); saveBtn.className = 'btn btn-primary'; saveBtn.textContent = '저장';
      saveBtn.addEventListener('click', () => {
        const liveRevenue = parseInt(document.getElementById('res-revenue').value) || 0;
        const finance = store.getAll('finances').find(f => f.liveId === project.id);
        const totalCost = finance ? (finance.adCost + finance.productionCost + finance.hostCost + finance.otherCost) : 0;
        const roi = totalCost > 0 ? Math.round((liveRevenue / totalCost) * 100) / 100 : 0;

        const data = {
          liveId: project.id,
          views: parseInt(document.getElementById('res-views').value) || 0,
          likes: parseInt(document.getElementById('res-likes').value) || 0,
          orders: parseInt(document.getElementById('res-orders').value) || 0,
          liveRevenue, roi,
        };

        const existing = store.getAll('results').find(r => r.liveId === project.id);
        if (existing) { store.update('results', existing.id, data); }
        else { data.id = project.id; store.create('results', data); }

        closeModal(); showSuccess('성과가 저장되었습니다.');
        const newEl = renderResultTab(project); el.replaceWith(newEl);
      });
      footer.appendChild(cancelBtn); footer.appendChild(saveBtn);
      openModal({ title: '방송 성과 수정', size: 'md', content, footer });
    });
  }, 0);

  return el;
}

// ===== 탭: 정산 =====
function renderFinanceTab(project) {
  const el = document.createElement('div');
  const finance = store.getAll('finances').find(f => f.liveId === project.id) || {};
  const matchings = store.query('liveHosts', m => m.liveId === project.id);
  const hostCost = matchings.reduce((sum, m) => sum + (m.fee || 0), 0);

  const productionCost = finance.productionCost || 0;
  const adCost = finance.adCost || 0;
  const otherCost = finance.otherCost || 0;
  const includeHostCost = !!finance.includeHostCost;
  const brandPaysHost = !!finance.brandPaysHost;

  const effectiveHostCost = brandPaysHost ? 0 : hostCost;

  // 1. 영업매출액 = 브랜드사 직접부담 or 제작비에 쇼호스트비 포함 시 (제작비 + 광고비), 별도 시 (제작비 + 쇼호스트비 + 광고비)
  const salesRevenue = (brandPaysHost || includeHostCost)
    ? (productionCost + adCost)
    : (productionCost + hostCost + adCost);

  // 2. 영업이익 = 영업매출액 - (effectiveHostCost + 광고비 + 기타비용)
  const operatingProfit = salesRevenue - (effectiveHostCost + adCost + otherCost);

  // 3. 부가가치세 = 영업매출액 × 10%
  const vat = Math.round(salesRevenue * 0.1);

  // 4. 순마진 = 영업이익 - 부가가치세
  const netMargin = operatingProfit - vat;

  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>매출 및 정산</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-finance">수정</button>
      </div>
      <div class="card-body">
        <div class="stats-grid" style="margin-bottom: var(--space-6);">
          <div class="stat-card">
            <div class="stat-label">
              제작비 <span style="font-size: 11px; font-weight: normal; color: var(--text-tertiary);">${includeHostCost ? '(쇼호스트비 포함)' : '(쇼호스트비 별도)'}</span>
            </div>
            <div class="stat-value">${formatCurrency(productionCost)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">
              쇼호스트비 <span style="font-size: 11px; font-weight: normal; color: var(--text-tertiary);">${brandPaysHost ? '(브랜드사 직접 부담)' : '(대행사 정산)'}</span>
            </div>
            <div class="stat-value">${formatCurrency(hostCost)}</div>
          </div>
          <div class="stat-card"><div class="stat-label">광고비</div><div class="stat-value">${formatCurrency(adCost)}</div></div>
          <div class="stat-card"><div class="stat-label">기타비용</div><div class="stat-value">${formatCurrency(otherCost)}</div></div>
        </div>
        <div style="border-top: 1px solid var(--border-light); padding-top: var(--space-5);">
          <div class="stats-grid">
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업매출액</div>
              <div class="stat-value">${formatCurrency(salesRevenue)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업이익</div>
              <div class="stat-value" style="color: ${operatingProfit >= 0 ? 'var(--status-success)' : 'var(--status-error)'};">${formatCurrency(operatingProfit)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">순마진 <span style="font-size: 11px; font-weight: normal; color: var(--text-tertiary);">(VAT 차감 후)</span></div>
              <div class="stat-value" style="color: ${netMargin >= 0 ? 'var(--status-success)' : 'var(--status-error)'};">
                ${formatCurrency(netMargin)}
                <span style="font-size: 13px; font-weight: 600; margin-left: 4px;">(${salesRevenue ? (netMargin / salesRevenue * 100).toFixed(1) : 0}%)</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-label">부가가치세 <span style="font-size: 11px; font-weight: normal; color: var(--text-tertiary);">(VAT 10%)</span></div>
              <div class="stat-value">${formatCurrency(vat)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    el.querySelector('#btn-edit-finance')?.addEventListener('click', () => {
      const content = `
        <div class="form-grid">
          <div class="input-group"><label>제작비</label><input class="input" type="number" id="fin-prod" value="${finance.productionCost || ''}" placeholder="0"></div>
          <div class="input-group"><label>광고비</label><input class="input" type="number" id="fin-ad" value="${finance.adCost || ''}" placeholder="0"></div>
          <div class="input-group"><label>기타비용</label><input class="input" type="number" id="fin-other" value="${finance.otherCost || ''}" placeholder="0"></div>
        </div>
        <div style="margin-top: var(--space-3); margin-bottom: var(--space-3); display: flex; flex-direction: column; gap: 8px;">
          <label style="display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; cursor: pointer; user-select: none;">
            <input type="checkbox" id="fin-brand-pays-host" ${brandPaysHost ? 'checked' : ''} style="width: 16px; height: 16px; cursor: pointer;">
            브랜드사 쇼호스트비 직접 부담 (대행사 매출/지출 제외)
          </label>
          <label style="display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; cursor: pointer; user-select: none;">
            <input type="checkbox" id="fin-include-host" ${includeHostCost ? 'checked' : ''} style="width: 16px; height: 16px; cursor: pointer;">
            총제작비에 쇼호스트비 포함
          </label>
        </div>
        <div style="margin-top: var(--space-4); padding: var(--space-4); background: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-light);">
          <div style="font-weight: 600; margin-bottom: 8px; font-size: 13px; color: var(--text-primary); display: flex; justify-content: space-between;">
            <span>실시간 계산 미리보기</span>
            <span style="font-weight: normal; color: var(--text-tertiary); font-size: 12px;">쇼호스트비: ${formatCurrency(hostCost)}</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
            <div>영업매출액: <strong id="prev-sales" style="color: var(--text-primary);">-</strong></div>
            <div>영업이익: <strong id="prev-profit" style="color: var(--text-primary);">-</strong></div>
            <div>부가가치세 (10%): <strong id="prev-vat" style="color: var(--text-primary);">-</strong></div>
            <div>순마진: <strong id="prev-margin" style="color: var(--text-primary);">-</strong></div>
          </div>
        </div>
      `;
      const footer = document.createElement('div');
      footer.style.cssText = 'display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;';
      const cancelBtn = document.createElement('button'); cancelBtn.className = 'btn btn-secondary'; cancelBtn.textContent = '취소'; cancelBtn.addEventListener('click', closeModal);
      const saveBtn = document.createElement('button'); saveBtn.className = 'btn btn-primary'; saveBtn.textContent = '저장';
      saveBtn.addEventListener('click', () => {
        const adCost = parseInt(document.getElementById('fin-ad').value) || 0;
        const productionCost = parseInt(document.getElementById('fin-prod').value) || 0;
        const otherCost = parseInt(document.getElementById('fin-other').value) || 0;
        const includeHostCost = document.getElementById('fin-include-host').checked;
        const brandPaysHost = document.getElementById('fin-brand-pays-host').checked;

        const effectiveHostCost = brandPaysHost ? 0 : hostCost;
        const salesRevenue = (brandPaysHost || includeHostCost) ? (productionCost + adCost) : (productionCost + hostCost + adCost);
        const operatingProfit = salesRevenue - effectiveHostCost - adCost - otherCost;
        const vat = Math.round(salesRevenue * 0.1);
        const netMargin = operatingProfit - vat;

        const data = { liveId: project.id, adCost, productionCost, otherCost, includeHostCost, brandPaysHost, salesRevenue, operatingProfit, vat, netMargin };
        const existing = store.getAll('finances').find(f => f.liveId === project.id);
        if (existing) { store.update('finances', existing.id, data); }
        else { data.id = project.id; store.create('finances', data); }

        closeModal(); showSuccess('정산 정보가 저장되었습니다.');
        const newEl = renderFinanceTab(project); el.replaceWith(newEl);
      });
      footer.appendChild(cancelBtn); footer.appendChild(saveBtn);
      openModal({ title: '정산 정보 수정', size: 'md', content, footer });

      // 실시간 계산 이벤트 바인딩
      setTimeout(() => {
        const prodInp = document.getElementById('fin-prod');
        const adInp = document.getElementById('fin-ad');
        const otherInp = document.getElementById('fin-other');
        const includeHostChk = document.getElementById('fin-include-host');
        const brandPaysHostChk = document.getElementById('fin-brand-pays-host');

        const updateCalc = () => {
          const prod = parseInt(prodInp?.value) || 0;
          const ad = parseInt(adInp?.value) || 0;
          const oth = parseInt(otherInp?.value) || 0;
          const incHost = includeHostChk ? includeHostChk.checked : false;
          const brandHost = brandPaysHostChk ? brandPaysHostChk.checked : false;

          const effHost = brandHost ? 0 : hostCost;
          const sRev = (brandHost || incHost) ? (prod + ad) : (prod + hostCost + ad);
          const oProf = sRev - effHost - ad - oth;
          const v = Math.round(sRev * 0.1);
          const nMarg = oProf - v;
          const mRate = sRev ? ((nMarg / sRev) * 100).toFixed(1) : '0.0';

          const elSales = document.getElementById('prev-sales');
          const elProfit = document.getElementById('prev-profit');
          const elVat = document.getElementById('prev-vat');
          const elMargin = document.getElementById('prev-margin');

          if (elSales) elSales.textContent = formatCurrency(sRev);
          if (elProfit) {
            elProfit.textContent = formatCurrency(oProf);
            elProfit.style.color = oProf >= 0 ? 'var(--status-success)' : 'var(--status-error)';
          }
          if (elVat) elVat.textContent = formatCurrency(v);
          if (elMargin) {
            elMargin.textContent = `${formatCurrency(nMarg)} (${mRate}%)`;
            elMargin.style.color = nMarg >= 0 ? 'var(--status-success)' : 'var(--status-error)';
          }
        };

        prodInp?.addEventListener('input', updateCalc);
        adInp?.addEventListener('input', updateCalc);
        otherInp?.addEventListener('input', updateCalc);
        includeHostChk?.addEventListener('change', updateCalc);
        brandPaysHostChk?.addEventListener('change', updateCalc);
        updateCalc();
      }, 0);
    });
  }, 0);

  return el;
}
