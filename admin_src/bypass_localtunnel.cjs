const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/utils/popbill.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/'Content-Type': 'application\/json'/g, "'Content-Type': 'application/json',\n        'Bypass-Tunnel-Reminder': 'true'");

fs.writeFileSync(file, content);
