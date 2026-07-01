const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/seed.js';
let content = fs.readFileSync(file, 'utf8');

// The brands array contains objects like:
// {
//   "id": "b1",
//   "name": "트러스티푸드",
//   "category": "펫",

// We will add "companyName": "" after "name"
content = content.replace(/"name": "([^"]+)",/g, '"name": "$1",\n    "companyName": "",');

fs.writeFileSync(file, content);
