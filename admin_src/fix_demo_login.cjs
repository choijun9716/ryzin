const fs = require('fs');

// --- 1. Update store.js ---
let storePath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let storeContent = fs.readFileSync(storePath, 'utf8');

const targetStore = `  toggleDemoMode(enable) {`;
const replaceStore = `  loginAsDemo() {
    localStorage.setItem('ryzin_is_demo_mode', 'true');
    let targetData = JSON.parse(localStorage.getItem('livecommerce_erp_demo_data') || 'null');
    if (!targetData) {
      targetData = {
        users: [
          { id: 'admin', name: '최고관리자 (데모)', password: CryptoJS.SHA256('admin').toString(), role: 'admin' },
          { id: 'demo', name: '데모 시연 계정', password: CryptoJS.SHA256('demo').toString(), role: 'admin' }
        ], 
        currentUser: null, hosts: [], brands: [], projects: [], tasks: [], liveHosts: [], contracts: [],
        products: [], designs: [], results: [], finances: [], currentRole: 'admin'
      };
    }
    const demoUser = targetData.users.find(u => u.id === 'demo');
    targetData.currentUser = demoUser;
    targetData.authSignature = CryptoJS.SHA256(demoUser.id + SECRET_SALT).toString();
    targetData.currentRole = 'admin';
    localStorage.setItem('livecommerce_erp_demo_data', JSON.stringify(targetData));
    window.location.reload();
  }

  toggleDemoMode(enable) {`;

storeContent = storeContent.replace(targetStore, replaceStore);
fs.writeFileSync(storePath, storeContent);

// --- 2. Update login.js ---
let loginPath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/login.js';
let loginContent = fs.readFileSync(loginPath, 'utf8');

const targetLogin = `        const user = store.verifyPassword(id, pw);

        if (user) {`;

const replaceLogin = `        // 특별 데모 계정 하드코딩 패스
        if (id === 'demo' && pw === 'demo') {
          store.loginAsDemo();
          return;
        }

        const user = store.verifyPassword(id, pw);

        if (user) {`;

loginContent = loginContent.replace(targetLogin, replaceLogin);
fs.writeFileSync(loginPath, loginContent);

