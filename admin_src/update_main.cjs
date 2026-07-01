const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/main.js';
let content = fs.readFileSync(file, 'utf8');

const layoutInjection = `
    app.appendChild(renderSidebar());
    
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.onclick = () => document.querySelector('.sidebar').classList.remove('open');
    app.appendChild(overlay);

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    mobileMenuBtn.onclick = () => document.querySelector('.sidebar').classList.toggle('open');
    app.appendChild(mobileMenuBtn);

    const main = document.createElement('main');
`;

content = content.replace(/app\.appendChild\(renderSidebar\(\)\);\n\s*const main = document\.createElement\('main'\);/, layoutInjection);

fs.writeFileSync(file, content);
