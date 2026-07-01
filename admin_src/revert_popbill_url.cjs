const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/utils/popbill.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/https:\/\/good-facts-shake\.loca\.lt\/api\/popbill\/send/g, 'http://localhost:3001/api/popbill/send');
content = content.replace(/'Bypass-Tunnel-Reminder': 'true'/g, '');

fs.writeFileSync(file, content);
