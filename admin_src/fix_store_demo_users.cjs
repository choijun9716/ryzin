const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let content = fs.readFileSync(file, 'utf8');

const target1 = `        users: [{ id: 'admin', name: '최고관리자 (데모)', password: CryptoJS.SHA256('admin').toString(), role: 'admin' }],`;
const replacement1 = `        users: [
          { id: 'admin', name: '최고관리자 (데모)', password: CryptoJS.SHA256('admin').toString(), role: 'admin' },
          { id: 'demo', name: '데모 시연 계정', password: CryptoJS.SHA256('demo').toString(), role: 'admin' }
        ],`;

content = content.replace(target1, replacement1);
content = content.replace(target1, replacement1); // just in case it appears multiple times (init and toggleDemoMode)

fs.writeFileSync(file, content);
