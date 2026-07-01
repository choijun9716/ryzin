const fs = require('fs');
let storePath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let storeContent = fs.readFileSync(storePath, 'utf8');

const targetLogout = `  logout() {
    this._data.currentUser = null;
    this._data.authSignature = null;
    this._save();
    window.location.href = '/login';
  }`;

const replaceLogout = `  logout() {
    this._data.currentUser = null;
    this._data.authSignature = null;
    this._save();
    
    // 로그아웃 시 데모 모드를 해제하여 라이브 모드로 원복
    if (this.isDemoMode) {
      localStorage.setItem('ryzin_is_demo_mode', 'false');
    }
    
    window.location.href = '/login';
  }`;

storeContent = storeContent.replace(targetLogout, replaceLogout);
fs.writeFileSync(storePath, storeContent);
