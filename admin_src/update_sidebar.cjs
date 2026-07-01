const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/components/sidebar.js';
let content = fs.readFileSync(file, 'utf8');

// The sidebar items use 'router.navigate'. We can just close the sidebar on click if it has the 'open' class.
const newLogic = `
  el.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
      const path = item.getAttribute('data-path');
      if (path) {
        router.navigate(path);
        // Mobile: close sidebar on navigation
        if (window.innerWidth <= 1024) {
          document.querySelector('.sidebar').classList.remove('open');
        }
      }
    });
  });
`;

content = content.replace(/el\.querySelectorAll\('\.sidebar-item'\)\.forEach\(item => {[\s\S]*?}\);/, newLogic);

fs.writeFileSync(file, content);
