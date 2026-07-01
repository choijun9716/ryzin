const fs = require('fs');
let storePath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let storeContent = fs.readFileSync(storePath, 'utf8');

const target1 = `const hostCost = matchings.reduce((sum, m) => sum + (m.fee || 0), 0);`;
const replace1 = `const hostCost = matchings.reduce((sum, m) => sum + (m.brandPays ? 0 : (m.fee || 0)), 0);`;

storeContent = storeContent.replace(target1, replace1);
fs.writeFileSync(storePath, storeContent);
