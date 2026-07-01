const fs = require('fs');

// Update index.css
let indexCss = fs.readFileSync('/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/styles/index.css', 'utf8');
const mobileStyles = `
/* ===== Mobile Global Styles ===== */
.mobile-menu-btn {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--bg-dark);
  color: white;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 90;
  opacity: 0;
  transition: opacity 0.3s;
}

@media (max-width: 1024px) {
  .mobile-menu-btn {
    display: flex;
  }
  .sidebar.open ~ .mobile-overlay {
    display: block;
    opacity: 1;
  }
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .page-header-right {
    width: 100%;
    justify-content: flex-end;
  }
}
`;
fs.writeFileSync('/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/styles/index.css', indexCss + '\n' + mobileStyles);

// Update table.css to scroll on mobile
let tableCss = fs.readFileSync('/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/styles/table.css', 'utf8');
if (!tableCss.includes('overflow-x: auto')) {
  tableCss = tableCss.replace('.table-container {', '.table-container {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;');
  fs.writeFileSync('/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/styles/table.css', tableCss);
}

