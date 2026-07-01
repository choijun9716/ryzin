const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/package.json';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/"build": "vite build"/, '"build": "vite build && cp dist/index.html dist/404.html"');

fs.writeFileSync(file, content);
