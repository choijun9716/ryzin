// ===== 사이드바 컴포넌트 =====
import { router } from '../router.js';
import { store } from '../data/store.js';
import { ROLES } from '../data/models.js';
import { getAccessibleMenus } from '../utils/permissions.js';
import ryzinLogo from '../assets/Ryzin.png';

// SVG 아이콘
const icons = {
  live_stream: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12A10 10 0 1 0 12 22a10 10 0 0 0 10-10z"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>',
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  projects: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>',
  hosts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  brands: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  finance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  marketing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
  crm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
};

const menuConfig = [
  { key: 'dashboard', label: '대시보드', path: '/', icon: 'dashboard' },
  { key: 'projects', label: '라이브 관리', path: '/projects', icon: 'projects' },
  { key: 'live_stream', label: '라이브 송출 관리', path: '/live_stream', icon: 'live_stream' },
  { key: 'hosts', label: '쇼호스트 관리', path: '/hosts', icon: 'hosts' },
  { key: 'brands', label: '브랜드 관리', path: '/brands', icon: 'brands' },
  { key: 'finance', label: '매출/손익', path: '/finance', icon: 'finance' },
  { key: 'settlement', label: '정산 관리', path: '/settlement', icon: 'finance' },
  { key: 'contracts', label: '계약 관리', path: '/contracts', icon: 'finance' },
  { key: 'marketing', label: '마케팅 메시지', path: '/marketing', icon: 'marketing' },
  { key: 'crm', label: '영업 CRM', path: '/crm', icon: 'crm' },
  { key: 'settings', label: '설정', path: '/settings', icon: 'settings' },
];

export function renderSidebar() {
  const currentUser = store.getCurrentUser();
  const currentRole = store.getCurrentRole();
  const roleLabel = ROLES[currentRole]?.label || '관리자';
  const userName = currentUser ? currentUser.name : roleLabel;
  const accessibleMenus = getAccessibleMenus();
  const accessibleKeys = accessibleMenus.map(m => m.key);
  const isDemoUser = currentUser && (currentUser.id === 'demo' || currentUser.role === 'demo');

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';

  sidebar.innerHTML = `
    <div class="sidebar-header" style="padding: var(--space-4) var(--space-4); margin-bottom: var(--space-2);">
      <div id="sidebar-logo-container" style="display: flex; align-items: center; justify-content: flex-start; width: 100%; cursor: pointer;">
        <img src="${ryzinLogo}" alt="Ryzin Logo" style="height: 32px; object-fit: contain; margin-bottom: 4px; filter: brightness(0) invert(1);" />
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section">
        ${menuConfig
          .filter(m => accessibleKeys.includes(m.key))
          .filter(m => !(isDemoUser && m.key === 'live_stream'))
          .map(m => `
            <div class="sidebar-item" data-href="${m.path}" id="nav-${m.key}">
              ${icons[m.icon] || ''}
              <span>${m.label}</span>
            </div>
          `).join('')}
      </div>
    </nav>
    <div class="sidebar-footer">
      ${isDemoUser ? `
      <div id="demo-timer-box" style="font-size: 11px; color: var(--status-error); text-align: center; margin-bottom: var(--space-3); font-weight: 600; background: rgba(239,68,68,0.1); padding: 8px; border-radius: var(--radius-sm); border: 1px dashed rgba(239,68,68,0.3);">
        <div style="margin-bottom: 2px;">데모 체험 시간 제한</div>
        <div id="demo-remaining-time" style="font-size: 14px; font-weight: 800; margin-top: 4px; font-family: monospace; letter-spacing: 0.5px;">30:00</div>
      </div>
      ` : (store.isDemoMode ? `
      <div style="font-size: 11px; color: var(--status-error); text-align: center; margin-bottom: var(--space-3); font-weight: 600; background: rgba(239,68,68,0.1); padding: 6px; border-radius: var(--radius-sm); border: 1px dashed rgba(239,68,68,0.3);">
        데모 샌드박스 활성화됨
      </div>
      ` : '')}
      <div class="sidebar-user">
        <div class="sidebar-user-avatar">${userName[0]}</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">${userName}</div>
          <div class="sidebar-user-role">${roleLabel}</div>
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" id="btn-logout" style="width: 100%; margin-top: var(--space-3);">로그아웃</button>
    </div>
  `;

  // 로고 클릭 이벤트 (대시보드로 이동)
  const logoContainer = sidebar.querySelector('#sidebar-logo-container');
  if (logoContainer) {
    logoContainer.addEventListener('click', () => {
      router.navigate('/');
    });
  }

  // 메뉴 클릭 이벤트
  sidebar.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const href = item.getAttribute('data-href');
      router.navigate(href);
    });
  });

  // 로그아웃 이벤트
  const logoutBtn = sidebar.querySelector('#btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (window.demoTimerInterval) {
        clearInterval(window.demoTimerInterval);
        window.demoTimerInterval = null;
      }
      store.logout();
      router.navigate('/login');
    });
  }

  // 데모 체험용 타이머 구동
  if (isDemoUser) {
    if (window.demoTimerInterval) {
      clearInterval(window.demoTimerInterval);
    }
    setTimeout(() => {
      const remainingTimeEl = sidebar.querySelector('#demo-remaining-time');
      if (remainingTimeEl) {
        const updateTimer = () => {
          const expireTimeStr = localStorage.getItem('ryzin_demo_expire_time');
          if (!expireTimeStr) return;
          const expireTime = parseInt(expireTimeStr, 10);
          const now = Date.now();
          const diff = expireTime - now;

          if (diff <= 0) {
            clearInterval(window.demoTimerInterval);
            window.demoTimerInterval = null;
            alert('데모 체험 시간이 만료되었습니다. 로그아웃됩니다.');
            store.logout();
            router.navigate('/login');
            return;
          }

          const totalSeconds = Math.floor(diff / 1000);
          const min = Math.floor(totalSeconds / 60);
          const sec = totalSeconds % 60;
          remainingTimeEl.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        };

        updateTimer();
        window.demoTimerInterval = setInterval(updateTimer, 1000);
      }
    }, 0);
  }

  return sidebar;
}

export function updateSidebar() {
  const oldSidebar = document.getElementById('sidebar');
  if (oldSidebar) {
    const newSidebar = renderSidebar();
    oldSidebar.replaceWith(newSidebar);
    // Re-activate current route
    router._updateSidebarActive(router.getCurrentPath());
  }
}
