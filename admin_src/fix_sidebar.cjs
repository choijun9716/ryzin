const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/components/sidebar.js';
let content = fs.readFileSync(file, 'utf8');

// I need to properly restore the menu click event.
// The broken section looks like this:
/*
  // 메뉴 클릭 이벤트
  sidebar.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const href = item.getAttribute('data-href');
      router.navigate(href);
    });
  });

  // 로고 클릭 이벤트 (대시보드로 이동)
  const logoContainer = sidebar.querySelector('#sidebar-logo-container');
  if (logoContainer) {
    logoContainer.addEventListener('click', () => {
      router.navigate('/');
    });
  }
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const href = item.getAttribute('data-href');
      router.navigate(href);
    });
  });
*/

// Let's just find everything from "// 메뉴 클릭 이벤트" down to the start of "// 로그아웃 이벤트"
// and replace it cleanly.

const startStr = '// 메뉴 클릭 이벤트';
const endStr = '// 로그아웃 이벤트';
const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const cleanCode = `// 로고 클릭 이벤트 (대시보드로 이동)
  const logoContainer = sidebar.querySelector('#sidebar-logo-container');
  if (logoContainer) {
    logoContainer.addEventListener('click', () => {
      router.navigate('/');
    });
  }

  // 메뉴 클릭 이벤트
  sidebar.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const href = item.getAttribute('data-href');
      router.navigate(href);
    });
  });

  `;
  content = content.substring(0, startIndex) + cleanCode + content.substring(endIndex);
  fs.writeFileSync(file, content);
}
