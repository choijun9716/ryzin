const fs = require('fs');
let loginPath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/login.js';
let loginContent = fs.readFileSync(loginPath, 'utf8');

const targetLoginInit = `export function renderLogin() {
  const container = document.createElement('div');`;

const replaceLoginInit = `export function renderLogin() {
  // 로그인 화면 진입 시 데모 모드가 켜져있다면 강제로 끔 (갇힘 방지)
  if (store.isDemoMode) {
    localStorage.setItem('ryzin_is_demo_mode', 'false');
    store.isDemoMode = false;
    store.STORAGE_KEY = 'livecommerce_erp_data';
    store._load();
  }

  const container = document.createElement('div');`;

loginContent = loginContent.replace(targetLoginInit, replaceLoginInit);
fs.writeFileSync(loginPath, loginContent);
