// ===== SPA Router =====

class Router {
  constructor() {
    this._routes = {};
    this._currentRoute = null;
    this._container = null;
    this._beforeHooks = [];

    window.addEventListener('popstate', () => this._handleRoute());
  }

  // 라우트 등록
  register(path, handler) {
    this._routes[path] = handler;
    return this;
  }

  // 전역 가드 등록
  beforeEach(hook) {
    this._beforeHooks.push(hook);
    return this;
  }

  // 컨테이너 설정
  setContainer(el) {
    this._container = el;
    return this;
  }

  // 네비게이션
  navigate(path, replace = false) {
    if (path === this._currentRoute) return;
    if (replace) {
      history.replaceState(null, '', path);
    } else {
      history.pushState(null, '', path);
    }
    this._handleRoute();
  }

  // 현재 경로
  getCurrentPath() {
    return window.location.pathname || '/';
  }

  // 라우트 처리
  _handleRoute() {
    const path = this.getCurrentPath();
    this._currentRoute = path;

    // 매칭되는 라우트 찾기
    let handler = null;
    let params = {};

    for (const [routePath, routeHandler] of Object.entries(this._routes)) {
      const match = this._matchRoute(routePath, path);
      if (match) {
        handler = routeHandler;
        params = match.params;
        break;
      }
    }

    // 가드 실행
    for (const hook of this._beforeHooks) {
      const result = hook(path);
      if (result === false) return;
      if (typeof result === 'string') {
        this.navigate(result, true);
        return;
      }
    }

    if (!handler) {
      // 기본 라우트로 리다이렉트
      this.navigate('/', true);
      return;
    }

    // 사이드바 활성 상태 업데이트
    this._updateSidebarActive(path);

    // 페이지 렌더링
    if (this._container) {
      this._container.innerHTML = '';
      const content = handler(params);
      if (typeof content === 'string') {
        this._container.innerHTML = content;
      } else if (content instanceof HTMLElement) {
        this._container.appendChild(content);
      }
    }
  }

  // 라우트 매칭 (파라미터 지원)
  _matchRoute(routePath, actualPath) {
    const routeParts = routePath.split('/').filter(Boolean);
    const pathParts = actualPath.split('/').filter(Boolean);

    if (routeParts.length !== pathParts.length) return null;

    const params = {};
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].substring(1)] = decodeURIComponent(pathParts[i]);
      } else if (routeParts[i] !== pathParts[i]) {
        return null;
      }
    }

    return { params };
  }

  // 사이드바 활성 상태 업데이트
  _updateSidebarActive(path) {
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('data-href');
      if (href === '/' && path === '/') {
        item.classList.add('active');
      } else if (href !== '/' && path.startsWith(href)) {
        item.classList.add('active');
      }
    });
  }

  // 초기 라우트 처리
  start() {
    this._handleRoute();
  }
}

export const router = new Router();
