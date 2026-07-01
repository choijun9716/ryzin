const fs = require('fs');
let loginPath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/login.js';
let loginContent = fs.readFileSync(loginPath, 'utf8');

const targetLogin = `        // 특별 데모 계정 하드코딩 패스
        if (id === 'demo' && pw === 'demo') {
          store.loginAsDemo();
          return;
        }

        const user = store.verifyPassword(id, pw);`;

const replaceLogin = `        const user = store.verifyPassword(id, pw);`;

loginContent = loginContent.replace(targetLogin, replaceLogin);
fs.writeFileSync(loginPath, loginContent);
