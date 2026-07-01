const fs = require('fs');

// --- 1. store.js 수정 ---
let storePath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let storeContent = fs.readFileSync(storePath, 'utf8');

const storeTarget1 = `password: CryptoJS.SHA256('admin').toString()`;
const storeReplace1 = `password: CryptoJS.SHA256('1234').toString()`;

// Replaces all occurrences (both in init() and loginAsDemo())
storeContent = storeContent.split(storeTarget1).join(storeReplace1);

// Also change the loginAsDemo behavior to pick the 'admin' user since they typed 'admin'
const storeTarget2 = `const demoUser = targetData.users.find(u => u.id === 'demo');`;
const storeReplace2 = `const demoUser = targetData.users.find(u => u.id === 'admin');`;
storeContent = storeContent.replace(storeTarget2, storeReplace2);

fs.writeFileSync(storePath, storeContent);

// --- 2. login.js 수정 ---
let loginPath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/login.js';
let loginContent = fs.readFileSync(loginPath, 'utf8');

const loginSubtitleTarget = `아이디: <strong>demo</strong> / 비밀번호: <strong>demo</strong>`;
const loginSubtitleReplace = `아이디: <strong>admin</strong> / 비밀번호: <strong>1234</strong>`;
loginContent = loginContent.replace(loginSubtitleTarget, loginSubtitleReplace);

const loginSubmitTarget = `        const user = store.verifyPassword(id, pw);`;
const loginSubmitReplace = `        // 데모 환경 다이렉트 패스
        if (id === 'admin' && pw === '1234') {
          store.loginAsDemo();
          return;
        }

        const user = store.verifyPassword(id, pw);`;

loginContent = loginContent.replace(loginSubmitTarget, loginSubmitReplace);

fs.writeFileSync(loginPath, loginContent);
