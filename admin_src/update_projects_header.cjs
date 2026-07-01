const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/projects.js';
let content = fs.readFileSync(file, 'utf8');

// The table header might have "방송 제목(브랜드)" or "방송제목(브랜드)"
content = content.replace(/<th>방송 제목\(브랜드\)<\/th>/g, '<th>브랜드</th>');
content = content.replace(/<th>방송제목\(브랜드\)<\/th>/g, '<th>브랜드</th>');

fs.writeFileSync(file, content);
