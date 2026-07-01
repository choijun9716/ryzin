const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/dashboard.js';
let content = fs.readFileSync(file, 'utf8');

// Replace the modified strings back to original
content = content.replace(/<span class="project-card-brand">\$\{brandName\} <span style="font-weight:normal; font-size: 12px; color: var\(--text-secondary\);">\| \$\{project.title \|\| '제목없음'\}<\/span><\/span>/g, '<span class="project-card-brand">${brandName}</span>');

content = content.replace(/<div style="font-size: var\(--text-md\); font-weight: var\(--weight-semibold\); margin-bottom: var\(--space-1\);">\$\{brandName\} <span style="font-weight:normal; font-size: 14px; color: var\(--text-secondary\);">\| \$\{project.title \|\| '제목없음'\}<\/span><\/div>/g, '<div style="font-size: var(--text-md); font-weight: var(--weight-semibold); margin-bottom: var(--space-1);">${brandName}</div>');

fs.writeFileSync(file, content);
