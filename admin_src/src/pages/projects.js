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
  let searchTerm = '';
  let filters = { status: '', brand: '', platform: '', month: '', category: '', settleStatus: '' };
  let colGroups = { basic: true, host: true, result: false, finance: false };
  let currentView = 'list'; // 'list' or 'calendar'
  let calendarDate = new Date();

  function render() {
    let projects = store.getAll('projects');
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
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
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
  let activeTab = 'info';

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
          <button class="btn btn-secondary" id="btn-delete-project">삭제</button>
        </div>
      </div>
      <div class="page-body">
        <!-- 탭 -->
        <div class="tabs" style="margin-bottom: var(--space-5);">
          <div class="tab ${activeTab === 'info' ? 'active' : ''}" data-tab="info">기본정보</div>
                    <div class="tab ${activeTab === 'hosts' ? 'active' : ''}" data-tab="hosts">쇼호스트</div>
          <div class="tab ${activeTab === 'design' ? 'active' : ''}" data-tab="design">디자인</div>
          <div class="tab ${activeTab === 'result' ? 'active' : ''}" data-tab="result">성과</div>
          <div class="tab ${activeTab === 'finance' ? 'active' : ''}" data-tab="finance">정산</div>
        </div>

        <div id="tab-content"></div>
      </div>
    `;

    // 탭 콘텐츠 렌더링
    const tabContent = container.querySelector('#tab-content');
    switch (activeTab) {
      case 'info': tabContent.appendChild(renderInfoTab(project, brand)); break;
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

  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>매출 및 정산</h3>
        <button class="btn btn-secondary btn-sm" id="btn-edit-finance">수정</button>
      </div>
      <div class="card-body">
        <div class="stats-grid" style="margin-bottom: var(--space-6);">
          <div class="stat-card"><div class="stat-label">제작비</div><div class="stat-value">${formatCurrency(finance.productionCost)}</div></div>
          <div class="stat-card"><div class="stat-label">쇼호스트비</div><div class="stat-value">${formatCurrency(hostCost)}</div></div>
          <div class="stat-card"><div class="stat-label">광고비</div><div class="stat-value">${formatCurrency(finance.adCost)}</div></div>
          <div class="stat-card"><div class="stat-label">기타비용</div><div class="stat-value">${formatCurrency(finance.otherCost)}</div></div>
        </div>
        <div style="border-top: 1px solid var(--border-light); padding-top: var(--space-5);">
          <div class="stats-grid">
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업매출액</div>
              <div class="stat-value">${formatCurrency(finance.salesRevenue)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">영업이익</div>
              <div class="stat-value" style="color: ${(finance.operatingProfit || 0) >= 0 ? 'var(--status-success)' : 'var(--status-error)'};">${formatCurrency(finance.operatingProfit)}</div>
            </div>
            <div class="stat-card" style="border-color: var(--border-strong);">
              <div class="stat-label">순마진 <span style="font-size: 11px; font-weight: normal; color: var(--text-tertiary);">(VAT 차감 후)</span></div>
              <div class="stat-value" style="color: ${(finance.netMargin || 0) >= 0 ? 'var(--status-success)' : 'var(--status-error)'};">
                ${formatCurrency(finance.netMargin)}
                <span style="font-size: 13px; font-weight: 600; margin-left: 4px;">(${finance.salesRevenue ? ((finance.netMargin || 0) / finance.salesRevenue * 100).toFixed(1) : 0}%)</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-label">부가가치세 <span style="font-size: 11px; font-weight: normal; color: var(--text-tertiary);">(VAT 10%)</span></div>
              <div class="stat-value">${formatCurrency(finance.vat !== undefined ? finance.vat : Math.round((finance.salesRevenue || 0) * 0.1))}</div>
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
          <div class="input-group"><label>광고비</label><input class="input" type="number" id="fin-ad" value="${finance.adCost || ''}"></div>
          <div class="input-group"><label>제작비</label><input class="input" type="number" id="fin-prod" value="${finance.productionCost || ''}"></div>
          <div class="input-group"><label>기타비용</label><input class="input" type="number" id="fin-other" value="${finance.otherCost || ''}"></div>
          <div class="input-group"><label>영업매출액</label><input class="input" type="number" id="fin-sales" value="${finance.salesRevenue || ''}"></div>
        </div>
        <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-secondary); border-radius: var(--radius-md); font-size: var(--text-sm); color: var(--text-tertiary);">
          쇼호스트비는 쇼호스트 매칭 탭에서 설정한 금액의 합계로 자동 계산됩니다. (현재: ${formatCurrency(hostCost)})
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
        const salesRevenue = parseInt(document.getElementById('fin-sales').value) || 0;
        const operatingProfit = salesRevenue - hostCost - adCost - otherCost;
        const vat = Math.round(salesRevenue * 0.1);
        const netMargin = operatingProfit - vat;

        const data = { liveId: project.id, adCost, productionCost, hostCost, otherCost, salesRevenue, operatingProfit, vat, netMargin };
        const existing = store.getAll('finances').find(f => f.liveId === project.id);
        if (existing) { store.update('finances', existing.id, data); }
        else { data.id = project.id; store.create('finances', data); }

        closeModal(); showSuccess('정산 정보가 저장되었습니다.');
        const newEl = renderFinanceTab(project); el.replaceWith(newEl);
      });
      footer.appendChild(cancelBtn); footer.appendChild(saveBtn);
      openModal({ title: '정산 정보 수정', size: 'md', content, footer });
    });
  }, 0);

  return el;
}
