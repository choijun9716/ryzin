const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/dashboard.js';
let content = fs.readFileSync(file, 'utf8');

// The dashboard displays projects as cards.
// Search for `<span class="project-card-brand">${brandName}</span>`
// We will change it to `<span class="project-card-brand">${brandName} <span style="font-weight:normal; font-size: 13px; color: var(--text-secondary);">| ${project.title || '제목없음'}</span></span>`

content = content.replace(/<span class="project-card-brand">\$\{brandName\}<\/span>/g, '<span class="project-card-brand">${brandName} <span style="font-weight:normal; font-size: 12px; color: var(--text-secondary);">| ${project.title || \'제목없음\'}</span></span>');

// For the detail modal:
// <div style="font-size: var(--text-md); font-weight: var(--weight-semibold); margin-bottom: var(--space-1);">${brandName}</div>
content = content.replace(/<div style="font-size: var\(--text-md\); font-weight: var\(--weight-semibold\); margin-bottom: var\(--space-1\);">\$\{brandName\}<\/div>/, '<div style="font-size: var(--text-md); font-weight: var(--weight-semibold); margin-bottom: var(--space-1);">${brandName} <span style="font-weight:normal; font-size: 14px; color: var(--text-secondary);">| ${project.title || \'제목없음\'}</span></div>');

fs.writeFileSync(file, content);
