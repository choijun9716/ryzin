const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let content = fs.readFileSync(file, 'utf8');

const target1 = `      if (!hasDemo) {
        this._data.users.push({ id: 'demo', name: '데모 시연 계정', password: CryptoJS.SHA256('demo').toString(), role: 'admin' });
        changed = true;
      }`;
const replace1 = `      if (!hasDemo) {
        this._data.users.push({ id: 'demo', name: '데모 시연 계정', password: CryptoJS.SHA256('demo').toString(), role: 'demo' });
        changed = true;
      }`;

content = content.replace(target1, replace1);
fs.writeFileSync(file, content);
