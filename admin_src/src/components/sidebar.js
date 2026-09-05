// ===== 사이드바 컴포넌트 =====
import { router } from '../router.js';
import { store } from '../data/store.js';
import { ROLES } from '../data/models.js';
import { getAccessibleMenus } from '../utils/permissions.js';
import { sessionManager } from '../utils/session_manager.js';
import ryzinLogo from '../assets/ryzin_studio_white.png';

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
  shop_manage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>',
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
  { key: 'shop_manage', label: '쇼핑몰 관리', path: '/shop_manage', icon: 'shop_manage' },
  { key: 'class_applications', label: '클래스 신청 관리', path: '/class_applications', icon: 'crm' },
  { key: 'news_manage', label: '뉴스룸 관리', path: '/news_manage', icon: 'marketing' },
  { key: 'homepage_manage', label: '홈페이지 관리', path: '/homepage_manage', icon: 'dashboard' },
  { key: 'demo_manage', label: '데모 시연 관리', path: '/demo_manage', icon: 'projects' },
  { key: 'settings', label: '설정', path: '/settings', icon: 'settings' },
];

export function renderSidebar() {
  const currentUser = store.getCurrentUser();
  const currentRole = store.getCurrentRole();
  const roleLabel = ROLES[currentRole]?.label || '관리자';
  const userName = currentUser ? currentUser.name : roleLabel;
  const accessibleMenus = getAccessibleMenus();
  const accessibleKeys = accessibleMenus.map(m => m.key);
  const isDemoUser = store.isDemoMode || (currentUser && (currentUser.id === 'demo' || currentUser.role === 'demo'));

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';

  sidebar.innerHTML = `
    <div class="sidebar-header" style="padding: var(--space-4) var(--space-4); margin-bottom: var(--space-2);">
      <div id="sidebar-logo-container" style="display: flex; align-items: center; justify-content: flex-start; width: 100%; cursor: pointer;">
        <img src="${ryzinLogo}" alt="Ryzin Logo" style="height: 26px; max-width: 175px; object-fit: contain; margin-bottom: 0;" />
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
      ${store.isDemoMode ? `
      <div style="font-size: 11px; color: var(--status-error); text-align: center; margin-bottom: var(--space-3); font-weight: 600; background: rgba(239,68,68,0.1); padding: 6px; border-radius: var(--radius-sm); border: 1px dashed rgba(239,68,68,0.3);">
        데모 샌드박스 활성화됨
      </div>
      ` : ''}
      <!-- 세션 만료 타이머 -->
      <div class="sidebar-session-box" style="display: flex; align-items: center; justify-content: space-between; padding: 7px 10px; background: rgba(255,255,255,0.03); border-radius: 6px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: var(--space-3); font-size: 11px;">
        <span style="color: #94a3b8; font-size: 11px;">세션 만료</span>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span id="sidebar-session-countdown" style="font-weight: 600; color: #ffffff; letter-spacing: 0.5px; font-variant-numeric: tabular-nums;">30:00</span>
          <button id="btn-sidebar-session-extend" style="background: transparent; border: none; font-size: 10px; padding: 0; color: #94a3b8; cursor: pointer; text-decoration: underline;">연장</button>
        </div>
      </div>
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

  // 세션 타이머 실시간 갱신 바인딩
  const countdownEl = sidebar.querySelector('#sidebar-session-countdown');
  const extendBtn = sidebar.querySelector('#btn-sidebar-session-extend');

  if (countdownEl) {
    const handleTick = ({ formatted, remainingSeconds }) => {
      if (countdownEl) {
        countdownEl.textContent = formatted;
        if (remainingSeconds < 300) {
          countdownEl.style.color = '#f87171'; // 5분 미만 경고 시 은은한 레드
        } else {
          countdownEl.style.color = '#ffffff'; // 기본 순백색
        }
      }
    };
    sessionManager.onTick(handleTick);
  }

  if (extendBtn) {
    extendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionManager.extendSession();
    });
  }

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
      sessionManager.stop();
      store.logout();
      router.navigate('/login');
    });
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
