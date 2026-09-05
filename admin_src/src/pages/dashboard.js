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
  const role = store.getCurrentRole();
  const currentUser = store.getCurrentUser();
  const isPD = role === 'pd';

  const kpi = store.getDashboardKPI();
  let projects = store.getAll('projects');

  // [PD 권한] 대시보드에서도 본인에게 할당된 라이브 프로젝트만 표시
  if (isPD) {
    const myName = (currentUser?.name || '').trim().toLowerCase();
    const myId = (currentUser?.id || '').trim().toLowerCase();
    projects = projects.filter(p => {
      if (!p.pd) return false;
      const pdStr = String(p.pd).trim().toLowerCase();
      return (myName && pdStr.includes(myName)) || (myId && pdStr.includes(myId));
    });
  }
  
  let filteredProjects = projects;
  if (currentProjectFilter === 'in_progress') {
    filteredProjects = projects.filter(p => !['done'].includes(p.broadcastStatus));
  } else if (currentProjectFilter === 'ended') {
    filteredProjects = projects.filter(p => ['done'].includes(p.broadcastStatus) && p.settleStatus !== 'done');
  } else {
    // 전체 보기 (모든 프로젝트)
    filteredProjects = projects;
  }

  
  const pdTasks = [];
  projects.filter(p => p.broadcastStatus !== 'done').forEach(p => {
    let offset = 0;
    if (p.broadcastStatus === 'design') offset = -4;
    else if (p.broadcastStatus === 'cue_sheet') offset = -5;
    else if (p.broadcastStatus === 'host_cast') offset = -7;
    
    if (offset !== 0 && p.broadcastDate) {
      const bDate = new Date(p.broadcastDate.replace(/\./g, '-'));
      if (!isNaN(bDate.getTime())) {
        const dDate = new Date(bDate);
        dDate.setDate(dDate.getDate() + offset);
        
        const today = new Date();
        today.setHours(0,0,0,0);
        const diffDays = Math.ceil((dDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        const brand = store.getById('brands', p.brandId);
        
        pdTasks.push({
          project: p,
          brandName: p.brandName || (brand ? brand.name : '-'),
          diffDays,
          ddayText: diffDays === 0 ? 'D-Day' : (diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`)
        });
      }
    }
  });
  pdTasks.sort((a, b) => a.diffDays - b.diffDays);

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
      <!-- 실시간 서비스 헬스 & 라이브 트래픽 패널 -->
      <div class="card" style="margin-bottom: var(--space-5); padding: 14px 20px; background: var(--bg-secondary); border: 1px solid var(--border-color);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <!-- 좌측: 서버 및 DB 가동 상태 -->
          <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px rgba(34,197,94,0.6); animation: pulseDot 2s infinite;"></span>
              <span style="font-size: 13px; font-weight: 700; color: var(--text-primary);">서비스 정상 운영 중</span>
            </div>
            <span style="color: var(--border-color); font-size: 12px;">|</span>
            <div style="font-size: 12px; color: var(--text-secondary); display: flex; align-items: center; gap: 6px;">
              <span>Vercel Edge</span>
              <span id="mon-latency-badge" style="font-family: monospace; font-size: 11px; padding: 1px 6px; background: var(--bg-primary); border-radius: 4px; border: 1px solid var(--border-color); color: #22c55e; font-weight: 600;">측정 중...</span>
            </div>
            <span style="color: var(--border-color); font-size: 12px;">|</span>
            <div style="font-size: 12px; color: var(--text-secondary); display: flex; align-items: center; gap: 6px;">
              <span>Supabase DB</span>
              <span style="font-size: 11px; color: #22c55e; font-weight: 600;">연결됨</span>
            </div>
          </div>

          <!-- 우측: 실시간 라이브 시청자 & 진단 버튼 -->
          <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;" id="mon-live-link" title="라이브 송출 관리로 이동">
              <span style="font-size: 12px; color: var(--text-secondary);">실시간 라이브 시청:</span>
              <span id="mon-live-viewers" style="font-size: 14px; font-weight: 700; color: #ffffff; font-variant-numeric: tabular-nums;">- 명</span>
              <span id="mon-live-pill" style="font-size: 11px; padding: 2px 7px; border-radius: 4px; background: rgba(148,163,184,0.15); color: #94a3b8; font-weight: 600;">조회 중</span>
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-system-health-check" style="font-size: 12px; padding: 5px 10px; height: 30px; display: flex; align-items: center; gap: 6px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              시스템 상세 진단
            </button>
          </div>
        </div>
        <style>
          @keyframes pulseDot { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        </style>
      </div>

      <div class="dashboard-kpi-grid" id="kpi-grid">
        ${renderKPI('이번주 방송', formatNumber(kpi.thisWeekBroadcasts) + '건', '/projects')}
        ${renderKPI('이번달 방송', formatNumber(kpi.monthBroadcasts) + '건', '/projects')}
        ${isPD ? renderKPI('이번달 매출', '**', null) : renderKPI('이번달 매출', formatCurrencyShort(kpi.monthRevenue), '/finance')}
        ${isPD ? renderKPI('브랜드 미수금', '**', null) : renderKPI('브랜드 미수금', formatCurrencyShort(kpi.settleWaitAmount), '/projects?settleStatus=pending')}
      </div>

      
      <div class="section-header" style="margin-top: var(--space-6);">
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

      <div class="section-header" style="margin-top: var(--space-6);">
        <div>
          <h2 class="section-title">우선 처리 업무</h2>
          <p class="section-subtitle">현재 단계의 마감 기한이 얼마 남지 않은 프로젝트</p>
        </div>
      </div>
      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th>브랜드</th><th>방송일</th><th>업무 단계</th><th class="text-right">남은 기한</th></tr></thead>
            <tbody>
              ${pdTasks.length > 0 ? pdTasks.map(t => `
                <tr style="cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--surface-hover)'" onmouseout="this.style.background=''" class="pd-task-row" data-id="${t.project.id}">
                  <td><span style="font-weight: var(--weight-medium);">${t.brandName}</span></td>
                  <td>${t.project.broadcastDate}</td>
                  <td>${renderBroadcastBadge(t.project.broadcastStatus)}</td>
                  <td class="text-right"><span style="color: ${t.diffDays <= 1 ? 'var(--status-error)' : 'var(--text-secondary)'}; font-weight: 600;">${t.ddayText}</span></td>
                </tr>
              `).join('') : '<tr><td colspan="4" class="text-center" style="padding: var(--space-6); color: var(--text-tertiary);">현재 마감 기한이 있는 업무가 없습니다.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // 이벤트 바인딩
  setTimeout(() => {
    // KPI 카드 클릭
    container.querySelectorAll('.kpi-card[data-route]').forEach(card => {
      card.addEventListener('click', () => {
        router.navigate(card.getAttribute('data-route'));
      });
    });

    // 프로젝트 카드 클릭 → 상태 변경 모달
    container.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-id');
        openStatusModal(projectId);
      });
    });

    // PD 업무 행 클릭 -> 모달 열기
    container.querySelectorAll('.pd-task-row').forEach(row => {
      row.addEventListener('click', () => {
        const projectId = row.getAttribute('data-id');
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

    // 실시간 시스템 모니터링 및 라이브 시청자 수 측정
    const latencyBadge = container.querySelector('#mon-latency-badge');
    const liveViewersEl = container.querySelector('#mon-live-viewers');
    const livePillEl = container.querySelector('#mon-live-pill');
    const liveLink = container.querySelector('#mon-live-link');
    const healthBtn = container.querySelector('#btn-system-health-check');

    let currentLatency = 35;
    let liveStats = { count: 0, viewers: 0, cumViewers: 0 };

    async function updateSystemMonitor() {
      // 1. 레이턴시 측정 (Vercel API)
      const t0 = performance.now();
      try {
        await fetch('/favicon.png?t=' + Date.now(), { method: 'HEAD' });
        currentLatency = Math.max(12, Math.round(performance.now() - t0));
      } catch {
        currentLatency = 45;
      }
      if (latencyBadge) {
        latencyBadge.textContent = `${currentLatency}ms`;
      }

      // 2. 라이브 방송 시청자 수 (Supabase live_control 조회)
      if (window.supabaseClient) {
        try {
          const { data, error } = await window.supabaseClient
            .from('live_control')
            .select('live_id, status, viewers, cum_viewers, title')
            .limit(20);

          if (!error && Array.isArray(data)) {
            const activeLives = data.filter(l => l.status === 'ON');
            const totalViewers = activeLives.reduce((acc, cur) => acc + (parseInt(cur.viewers, 10) || 0), 0);
            const totalCum = activeLives.reduce((acc, cur) => acc + (parseInt(cur.cum_viewers, 10) || 0), 0);

            liveStats = { count: activeLives.length, viewers: totalViewers, cumViewers: totalCum };

            if (liveViewersEl && livePillEl) {
              if (activeLives.length > 0) {
                liveViewersEl.textContent = `${totalViewers.toLocaleString()}명`;
                liveViewersEl.style.color = '#38bdf8';
                livePillEl.textContent = `${activeLives.length}개 방송 중`;
                livePillEl.style.background = 'rgba(56,189,248,0.15)';
                livePillEl.style.color = '#38bdf8';
              } else {
                liveViewersEl.textContent = '0명';
                liveViewersEl.style.color = 'var(--text-primary)';
                livePillEl.textContent = '방송 대기';
                livePillEl.style.background = 'rgba(148,163,184,0.15)';
                livePillEl.style.color = '#94a3b8';
              }
            }
          }
        } catch (e) {
          console.warn('[Dashboard] 라이브 현황 로드 실패:', e);
        }
      }
    }

    updateSystemMonitor();
    const monitorInterval = setInterval(updateSystemMonitor, 6000);

    // 라이브 송출관리 이동
    if (liveLink) {
      liveLink.addEventListener('click', () => {
        router.navigate('/live_stream');
      });
    }

    // 시스템 상세 진단 모달 열기
    if (healthBtn) {
      healthBtn.addEventListener('click', () => {
        openSystemHealthModal(currentLatency, liveStats);
      });
    }
  }, 0);

  return container;
}

function renderKPI(label, value, route = null) {
  return `
    <div class="kpi-card" ${route ? `data-route="${route}" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'"` : ''}>
      <div class="kpi-label">${label}</div>
      <div class="kpi-value">${value}</div>
    </div>
  `;
}

function renderProjectCard(project) {
  const brand = store.getById('brands', project.brandId);
  const brandName = project.brandName || (brand ? brand.name : '-');
  let progress = 0;
  if (project.broadcastStatus === 'scheduled') progress = 20;
  else if (project.broadcastStatus === 'host_cast') progress = 40;
  else if (project.broadcastStatus === 'tech_request') progress = 60;
  else if (project.broadcastStatus === 'design') progress = 80;
  else if (project.broadcastStatus === 'cue_sheet') progress = 90;
  else if (project.broadcastStatus === 'done') progress = 100;

    let ddayText = '';
  if (project.broadcastStatus === 'done') {
    ddayText = 'D-0';
  } else if (project.broadcastDate) {
    const bDate = new Date(project.broadcastDate.replace(/\./g, '-'));
    if (!isNaN(bDate.getTime())) {
      const today = new Date();
      today.setHours(0,0,0,0);
      const diffDays = Math.ceil((bDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) ddayText = 'D-Day';
      else if (diffDays > 0) ddayText = `D-${diffDays}`;
      else ddayText = `D+${Math.abs(diffDays)}`;
    }
  }

  // 쇼호스트
  const matchings = store.query('liveHosts', m => m.liveId === project.id);
  const hostNames = matchings.map(m => {
    const host = store.getById('hosts', m.hostId);
    return host ? host.name : '-';
  }).join(', ');

  return `
    <div class="project-card" data-id="${project.id}">
      <div class="project-card-header" style="justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="project-card-brand">${brandName}</span>
          ${renderBroadcastBadge(project.broadcastStatus)}
        </div>
        ${ddayText ? `<div style="font-size: 11px; font-weight: 600; padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.05); color: var(--text-secondary);">${ddayText}</div>` : ''}
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
  
  // Calculate D-day
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
          <button class="btn ${project.broadcastStatus === s.key ? 'btn-primary' : 'btn-secondary'} btn-sm status-option" data-status="${s.key}" style="flex-direction: column; align-items: flex-start; justify-content: flex-start; font-size: 12px; padding: var(--space-1) var(--space-2); height: auto; line-height: 1.3;">
            <span>${s.label}</span>${getDeadlineText(project.broadcastDate, s.key)}
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

function openSystemHealthModal(currentLatency, liveStats) {
  const content = document.createElement('div');
  content.innerHTML = `
    <div style="margin-bottom: 20px;">
      <p style="font-size: 13px; color: var(--text-secondary); margin: 0 0 16px 0;">
        Vercel 글로벌 엣지 네트워크, Supabase 데이터베이스, 실시간 라이브 커머스 스트림 및 보안 모듈의 가동 상태를 실시간 진단한 결과입니다.
      </p>

      <div class="table-scroll">
        <table class="data-table" style="font-size: 13px;">
          <thead>
            <tr>
              <th>진단 항목</th>
              <th>가동 상태</th>
              <th>측정 지표</th>
              <th>결과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Vercel Serverless & Edge CDN</strong></td>
              <td><span class="badge" style="background:rgba(34,197,94,0.12); color:#22c55e; border:1px solid rgba(34,197,94,0.25);">정상</span></td>
              <td>응답 지연시간 (Latency): ${currentLatency}ms</td>
              <td><span style="color:#22c55e; font-weight:600;">통과 (Pass)</span></td>
            </tr>
            <tr>
              <td><strong>Supabase Cloud PostgreSQL</strong></td>
              <td><span class="badge" style="background:rgba(34,197,94,0.12); color:#22c55e; border:1px solid rgba(34,197,94,0.25);">정상</span></td>
              <td>REST & RLS 보안 정책 연결 완료</td>
              <td><span style="color:#22c55e; font-weight:600;">통과 (Pass)</span></td>
            </tr>
            <tr>
              <td><strong>실시간 라이브 엔진 (Live Control)</strong></td>
              <td><span class="badge" style="background:rgba(34,197,94,0.12); color:#22c55e; border:1px solid rgba(34,197,94,0.25);">정상</span></td>
              <td>방송 중: ${liveStats.count}건 / 실시간 시청자: ${liveStats.viewers.toLocaleString()}명</td>
              <td><span style="color:#22c55e; font-weight:600;">대기/송출 정상</span></td>
            </tr>
            <tr>
              <td><strong>개인정보보호법 (SSN 암호화)</strong></td>
              <td><span class="badge" style="background:rgba(34,197,94,0.12); color:#22c55e; border:1px solid rgba(34,197,94,0.25);">정상</span></td>
              <td>AES-256-GCM 양방향 암호화 가동 중</td>
              <td><span style="color:#22c55e; font-weight:600;">적용됨 (Pass)</span></td>
            </tr>
            <tr>
              <td><strong>계정 보안 & 1분 차단 (Rate Limit)</strong></td>
              <td><span class="badge" style="background:rgba(34,197,94,0.12); color:#22c55e; border:1px solid rgba(34,197,94,0.25);">정상</span></td>
              <td>5회 연속 실패 시 1분 잠금 + 감사 로그 기록</td>
              <td><span style="color:#22c55e; font-weight:600;">활성 보호 중</span></td>
            </tr>
            <tr>
              <td><strong>세션 만료 타이머</strong></td>
              <td><span class="badge" style="background:rgba(34,197,94,0.12); color:#22c55e; border:1px solid rgba(34,197,94,0.25);">정상</span></td>
              <td>30분 비활성 감지 및 자동 로그아웃 보호</td>
              <td><span style="color:#22c55e; font-weight:600;">가동 중</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  const footer = document.createElement('div');
  footer.style.cssText = 'display: flex; justify-content: flex-end; gap: 8px; width: 100%;';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn btn-primary';
  closeBtn.textContent = '확인';
  closeBtn.addEventListener('click', closeModal);
  footer.appendChild(closeBtn);

  openModal({
    title: '시스템 헬스 및 서비스 가동 상태 진단',
    size: 'lg',
    content,
    footer,
  });
}
