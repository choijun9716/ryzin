// ===== 대시보드 페이지 =====
import { store } from '../data/store.js';
import { formatCurrency, formatCurrencyShort, formatNumber, formatDate, formatDateShort, formatROI } from '../utils/format.js';
import { renderBroadcastBadge, renderSettleBadge } from '../components/statusBadge.js';
import { openModal, closeModal } from '../components/modal.js';
import { showSuccess } from '../components/toast.js';
import { BROADCAST_STATUSES, getBroadcastStatusLabel } from '../data/models.js';
import { router } from '../router.js';

let currentProjectFilter = 'in_progress';

export function renderDashboard() {
  const container = document.createElement('div');

  const kpi = store.getDashboardKPI();
  const projects = store.getAll('projects');
  
  let filteredProjects = projects;
  if (currentProjectFilter === 'in_progress') {
    filteredProjects = projects.filter(p => !['done'].includes(p.broadcastStatus));
  } else if (currentProjectFilter === 'ended') {
    filteredProjects = projects.filter(p => ['done'].includes(p.broadcastStatus) && p.settleStatus !== 'done');
  } else {
    // 전체 보기 (모든 프로젝트)
    filteredProjects = projects;
  }

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <h1 class="page-title">대시보드</h1>
          <p class="page-description">라이브커머스 운영 현황 요약</p>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="dashboard-kpi-grid" id="kpi-grid">
        ${renderKPI('오늘 예정 방송', formatNumber(kpi.todayBroadcasts) + '건')}
        ${renderKPI('이번달 방송 수', formatNumber(kpi.monthBroadcasts) + '건')}
        ${renderKPI('이번달 매출', formatCurrencyShort(kpi.monthRevenue))}
        ${renderKPI('이번달 영업이익', formatCurrencyShort(kpi.monthProfit))}
        ${renderKPI('이번달 ROI', formatROI(kpi.monthROI))}
        ${renderKPI('정산 대기', formatCurrencyShort(kpi.settleWaitAmount))}
      </div>

      <div class="section-header">
        <div>
          <h2 class="section-title">라이브 프로젝트</h2>
          <p class="section-subtitle">상태별 프로젝트 모아보기</p>
        </div>
        <div style="display: flex; gap: var(--space-3); align-items: center;">
          <select id="dashboard-filter" class="input" style="padding: 6px 12px; width: auto; font-size: 14px;">
            <option value="in_progress" ${currentProjectFilter === 'in_progress' ? 'selected' : ''}>진행 중 (기본)</option>
            <option value="ended" ${currentProjectFilter === 'ended' ? 'selected' : ''}>방송 종료</option>
            <option value="all" ${currentProjectFilter === 'all' ? 'selected' : ''}>전체 보기</option>
          </select>
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
        </div>
      </div>

      <div class="project-grid" id="project-grid">
        ${filteredProjects.length > 0
          ? filteredProjects
              .sort((a, b) => (a.broadcastDate || '').localeCompare(b.broadcastDate || ''))
              .map(p => renderProjectCard(p)).join('')
          : renderEmptyState()
        }
      </div>
    </div>
  `;

  // 이벤트 바인딩
  setTimeout(() => {
    // 프로젝트 카드 클릭 → 상태 변경 모달
    container.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-id');
        openStatusModal(projectId);
      });
    });

    // 신규 등록 버튼
    const newBtn = container.querySelector('#btn-new-project');
    if (newBtn) {
      newBtn.addEventListener('click', () => {
        router.navigate('/projects/new');
      });
    }

    // 필터 드롭다운 변경 이벤트
    const filterSelect = container.querySelector('#dashboard-filter');
    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        currentProjectFilter = e.target.value;
        const mainContent = document.getElementById('page-content');
        if (mainContent) {
          mainContent.innerHTML = '';
          mainContent.appendChild(renderDashboard());
        }
      });
    }
  }, 0);

  return container;
}

function renderKPI(label, value) {
  return `
    <div class="kpi-card">
      <div class="kpi-label">${label}</div>
      <div class="kpi-value">${value}</div>
    </div>
  `;
}

function renderProjectCard(project) {
  const brand = store.getById('brands', project.brandId);
  const brandName = project.brandName || (brand ? brand.name : '-');
  const tasks = store.query('tasks', t => t.liveId === project.id);
  const doneTasks = tasks.filter(t => t.done).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  // 쇼호스트
  const matchings = store.query('liveHosts', m => m.liveId === project.id);
  const hostNames = matchings.map(m => {
    const host = store.getById('hosts', m.hostId);
    return host ? host.name : '-';
  }).join(', ');

  return `
    <div class="project-card" data-id="${project.id}">
      <div class="project-card-header">
        <div>
          <div class="project-card-header">
            <span class="project-card-brand">${brandName}</span>
            <div style="display:flex; gap: 4px;">
              ${renderBroadcastBadge(project.broadcastStatus)}
            </div>
          </div>
        </div>
      </div>
      <div class="project-card-meta">
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">방송일</span>
          <span>${formatDate(project.broadcastDate)}</span>
        </div>
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">시간</span>
          <span>${project.broadcastTime || '-'}</span>
        </div>
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">플랫폼</span>
          <span>${project.platform || '-'}</span>
        </div>
        ${hostNames ? `
        <div class="project-card-meta-item">
          <span class="project-card-meta-label">쇼호스트</span>
          <span>${hostNames}</span>
        </div>
        ` : ''}
      </div>
      <div class="project-card-footer">
        <div class="project-card-progress">
          <div class="project-card-progress-text">${progress}%</div>
          <div class="progress-bar progress-bar-sm">
            <div class="progress-bar-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="project-card-pd">${project.pd || '-'}</div>
      </div>
    </div>
  `;
}

function renderEmptyState() {
  return `
    <div class="empty-state" style="grid-column: 1 / -1;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
      <h3>진행중인 프로젝트가 없습니다</h3>
      <p>새 라이브 프로젝트를 등록해 주세요.</p>
    </div>
  `;
}

function openStatusModal(projectId) {
  const project = store.getById('projects', projectId);
  if (!project) return;

  const brand = store.getById('brands', project.brandId);
  const brandName = project.brandName || (brand ? brand.name : '-');

  const content = document.createElement('div');
  content.innerHTML = `
    <div style="margin-bottom: var(--space-5);">
      <div style="font-size: var(--text-md); font-weight: var(--weight-semibold); margin-bottom: var(--space-1);">${brandName}</div>
      <div style="font-size: var(--text-sm); color: var(--text-tertiary);">${formatDate(project.broadcastDate)}</div>
    </div>
    <div style="margin-bottom: var(--space-4);">
      <label style="font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-secondary); display: block; margin-bottom: var(--space-2);">방송 진행 상태 변경</label>
      <div class="status-options" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2);">
        ${BROADCAST_STATUSES.map(s => `
          <button class="btn ${project.broadcastStatus === s.key ? 'btn-primary' : 'btn-secondary'} btn-sm status-option" data-status="${s.key}" style="justify-content: flex-start; font-size: 12px;">
            ${s.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  let selectedStatus = project.broadcastStatus;

  const footer = document.createElement('div');
  footer.style.cssText = 'display: flex; gap: var(--space-3); justify-content: space-between; width: 100%;';
  footer.innerHTML = `
    <button class="btn btn-ghost" id="modal-view-detail">상세 보기</button>
    <div style="display: flex; gap: var(--space-3);">
      <button class="btn btn-secondary" id="modal-cancel">취소</button>
      <button class="btn btn-primary" id="modal-save">저장</button>
    </div>
  `;

  openModal({ title: '프로젝트 상태 변경', size: 'md', content, footer });

  // 상태 옵션 클릭
  document.querySelectorAll('.status-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.status-option').forEach(b => {
        b.className = 'btn btn-secondary btn-sm status-option';
        b.style.justifyContent = 'flex-start';
        b.style.fontSize = '12px';
      });
      btn.className = 'btn btn-primary btn-sm status-option';
      btn.style.justifyContent = 'flex-start';
      btn.style.fontSize = '12px';
      selectedStatus = btn.getAttribute('data-status');
    });
  });

  document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
  document.getElementById('modal-view-detail')?.addEventListener('click', () => {
    closeModal();
    router.navigate(`/projects/${projectId}`);
  });
  document.getElementById('modal-save')?.addEventListener('click', () => {
    store.update('projects', projectId, { broadcastStatus: selectedStatus });
    closeModal();
    showSuccess(`방송 상태가 "${getBroadcastStatusLabel(selectedStatus)}"(으)로 변경되었습니다.`);
    // 대시보드 리렌더
    const mainContent = document.getElementById('page-content');
    if (mainContent) {
      mainContent.innerHTML = '';
      mainContent.appendChild(renderDashboard());
    }
  });
}
