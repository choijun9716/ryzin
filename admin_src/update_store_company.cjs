const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let content = fs.readFileSync(file, 'utf8');

// Update brand parsing logic
content = content.replace(/name: row\['브랜드명'\],/g, "name: row['브랜드명'],\n        companyName: row['사업자명'] || '',");

fs.writeFileSync(file, content);
