const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/components/sidebar.js';
let content = fs.readFileSync(file, 'utf8');

const targetIcon = `const icons = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',`;
const newIcon = `const icons = {
  live_stream: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12A10 10 0 1 0 12 22a10 10 0 0 0 10-10z"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>',
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',`;
content = content.replace(targetIcon, newIcon);

const targetMenu = `const menuConfig = [
  { key: 'dashboard', label: '대시보드', path: '/', icon: 'dashboard' },
  { key: 'projects', label: '라이브 관리', path: '/projects', icon: 'projects' },`;
const newMenu = `const menuConfig = [
  { key: 'dashboard', label: '대시보드', path: '/', icon: 'dashboard' },
  { key: 'live_stream', label: '라이브 송출 관리', path: '/live_stream', icon: 'live_stream' },
  { key: 'projects', label: '라이브 관리', path: '/projects', icon: 'projects' },`;
content = content.replace(targetMenu, newMenu);

fs.writeFileSync(file, content);
