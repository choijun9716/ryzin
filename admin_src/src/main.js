// ===== 라이브커머스 ERP - 메인 진입점 =====
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
inject();
injectSpeedInsights();
import './styles/index.css';
import './styles/components.css';
import './styles/sidebar.css';
import './styles/table.css';
import './styles/form.css';
import './styles/dashboard.css';

import { router } from './router.js';
import { store } from './data/store.js';
import { renderSidebar } from './components/sidebar.js';

// 페이지 import
import { renderDashboard } from './pages/dashboard.js';
import { renderLiveStream } from './pages/live_stream.js';
import { renderHosts, renderHostDetail } from './pages/hosts.js';
import { renderBrands, renderBrandDetail } from './pages/brands.js';
import { renderProjects, renderProjectDetail } from './pages/projects.js';
import { renderFinance } from './pages/finance.js';
import { renderSettlement } from './pages/settlement.js';
import { renderContracts } from './pages/contracts.js';
import { renderMarketing } from './pages/marketing.js';
import { renderCRM } from './pages/crm.js';
import { renderSettings } from './pages/settings.js';
import { renderLogin } from './pages/login.js';
import { renderShopManage } from './pages/shop_manage.js';
import { renderClassApplications } from './pages/class_applications.js';
import { renderNewsManage } from './pages/news_manage.js';
import { renderHomepageManage } from './pages/homepage_manage.js';
import { renderDemoManagePage } from './pages/demo_manage.js';


// 앱 레이아웃 생성
async function initApp() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:center; height:100vh;">
      <div style="width:48px; height:48px; border:4px solid rgba(0,0,0,0.05); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
      <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    </div>
  `;

  // Supabase/DB 연동 및 로드 (최대 3초 타임아웃 처리로 로그인창 차단 방지)
  try {
    const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(true), 3000));
    await Promise.race([store.init(), timeoutPromise]);
  } catch (e) {
    console.warn('데이터 로딩 타임아웃/오류 발생, 로컬 데이터로 접속합니다.', e);
  }

  // 로그인되지 않은 경우 레이아웃(사이드바)을 그리지 않고 전체화면 처리
  const renderLayout = () => {
    if (app.querySelector('.sidebar')) return; // 이미 그려져있음
    app.innerHTML = '';
    app.className = 'app-layout';
    
    app.appendChild(renderSidebar());
    
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.onclick = () => document.querySelector('.sidebar').classList.remove('open');
    app.appendChild(overlay);

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    mobileMenuBtn.onclick = () => document.querySelector('.sidebar').classList.toggle('open');
    app.appendChild(mobileMenuBtn);

    const main = document.createElement('main');

    main.className = 'main-content';
    main.id = 'page-content';
    app.appendChild(main);
    router.setContainer(main);
  };

  // 라우터 권한 체크
  router.beforeEach((to) => {
    const isLoggedIn = !!store.getCurrentUser();
    if (!isLoggedIn && to !== '/login') {
      return '/login';
    }
    if (isLoggedIn && to === '/login') {
      return '/';
    }

    // 데모 계정은 라이브 송출관리(/live_stream) 페이지 접근 제한
    if (isLoggedIn && to === '/live_stream') {
      const currentUser = store.getCurrentUser();
      if (store.isDemoMode || (currentUser && (currentUser.id === 'demo' || currentUser.role === 'demo'))) {
        return '/';
      }
    }

    if (to === '/login') {
      app.innerHTML = '';
      app.className = '';
      router.setContainer(app);
    } else {
      renderLayout();
    }
    return true;
  });

  router.register('/login', () => renderLogin());

  router.register('/', () => renderDashboard());
  router.register('/live_stream', () => renderLiveStream());
  router.register('/projects', () => renderProjects());
  router.register('/projects/new', () => renderProjects());
  router.register('/projects/:id', (params) => renderProjectDetail(params));
  router.register('/hosts', () => renderHosts());
  router.register('/hosts/:id', (params) => renderHostDetail(params));
  router.register('/brands', () => renderBrands());
  router.register('/brands/:id', (params) => renderBrandDetail(params));
  router.register('/finance', () => renderFinance());
  router.register('/settlement', () => renderSettlement());
  router.register('/contracts', () => renderContracts());
  router.register('/marketing', () => renderMarketing());
  router.register('/crm', () => renderCRM());
  router.register('/shop_manage', () => renderShopManage());
  router.register('/class_applications', () => renderClassApplications());
  router.register('/news_manage', () => renderNewsManage());
  router.register('/homepage_manage', () => renderHomepageManage());
  router.register('/demo_manage', () => renderDemoManagePage(document.getElementById('page-content')));
  router.register('/settings', () => renderSettings());

  // 라우터 시작 (SheetDB init 후에 호출되도록 대기 처리)
  router.start();

  // 모든 앵커 클릭 인터셉트 (SPA 네비게이션)
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href]');
    if (anchor && anchor.getAttribute('href').startsWith('/') && !anchor.getAttribute('target')) {
      e.preventDefault();
      router.navigate(anchor.getAttribute('href'));
    }
  });
}

// 앱 시작
initApp();
