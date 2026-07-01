const fs = require('fs');

// 1. sidebar.js 수정
let sidebarFile = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/components/sidebar.js';
let sidebarContent = fs.readFileSync(sidebarFile, 'utf8');

const targetSidebar = `<a href="/admin/marketing" class="sidebar-item" data-href="/admin/marketing">
          <span class="icon">📈</span>
          마케팅 관리
        </a>`;
const replaceSidebar = `<a href="/admin/marketing" class="sidebar-item" data-href="/admin/marketing">
          <span class="icon">📈</span>
          마케팅 관리
        </a>
        <a href="/admin/crm" class="sidebar-item" data-href="/admin/crm">
          <span class="icon">🤝</span>
          영업 CRM
        </a>`;

sidebarContent = sidebarContent.replace(targetSidebar, replaceSidebar);
fs.writeFileSync(sidebarFile, sidebarContent);

// 2. main.js 수정
let mainFile = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/main.js';
let mainContent = fs.readFileSync(mainFile, 'utf8');

const targetImport = `import { renderMarketing } from './pages/marketing.js';`;
const replaceImport = `import { renderMarketing } from './pages/marketing.js';\nimport { renderCRM } from './pages/crm.js';`;

const targetRoute = `router.register('/marketing', () => renderMarketing());`;
const replaceRoute = `router.register('/marketing', () => renderMarketing());\n  router.register('/crm', () => renderCRM());`;

mainContent = mainContent.replace(targetImport, replaceImport).replace(targetRoute, replaceRoute);
fs.writeFileSync(mainFile, mainContent);

