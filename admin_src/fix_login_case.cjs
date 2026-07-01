const fs = require('fs');
let loginPath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/login.js';
let loginContent = fs.readFileSync(loginPath, 'utf8');

const targetLogin = `        if (id === 'admin' && pw === '1234') {`;
const replaceLogin = `        if (id.toLowerCase() === 'admin' && pw.trim() === '1234') {`;
loginContent = loginContent.replace(targetLogin, replaceLogin);

fs.writeFileSync(loginPath, loginContent);
