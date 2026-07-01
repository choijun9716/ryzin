const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/utils/popbill.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/http:\/\/localhost:3001\/api\/popbill\/send/g, 'https://good-facts-shake.loca.lt/api/popbill/send');

fs.writeFileSync(file, content);
