const fs = require('fs');
let routerPath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/router.js';
let routerContent = fs.readFileSync(routerPath, 'utf8');

const target1 = `    window.addEventListener('popstate', () => this._handleRoute());`;
const replace1 = `    window.addEventListener('popstate', () => this._handleRoute());
    window.addEventListener('hashchange', () => this._handleRoute());`;

const target2 = `  // 네비게이션
  navigate(path, replace = false) {
    if (path === this._currentRoute) return;
    
    let fullPath = path;
    if (!fullPath.startsWith('/admin')) {
      fullPath = '/admin' + (fullPath === '/' ? '' : fullPath);
      if (fullPath === '/admin') fullPath = '/admin/';
    }
    
    if (replace) {
      history.replaceState(null, '', fullPath);
    } else {
      history.pushState(null, '', fullPath);
    }
    this._handleRoute();
  }`;

const replace2 = `  // 네비게이션 (해시 라우터로 변경)
  navigate(path, replace = false) {
    if (path === this._currentRoute) return;
    
    const hashPath = '#' + path;
    
    if (replace) {
      window.location.replace(hashPath);
    } else {
      window.location.hash = hashPath;
    }
    this._handleRoute();
  }`;

const target3 = `  // 현재 경로
  getCurrentPath() {
    let path = window.location.pathname || '/';
    if (path.startsWith('/admin')) {
      path = path.slice('/admin'.length);
    }
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    return path;
  }`;

const replace3 = `  // 현재 경로 (해시 기준)
  getCurrentPath() {
    let path = window.location.hash.slice(1) || '/';
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    return path;
  }`;

routerContent = routerContent.replace(target1, replace1).replace(target2, replace2).replace(target3, replace3);
fs.writeFileSync(routerPath, routerContent);
