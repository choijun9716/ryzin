const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/components/sidebar.js';
let content = fs.readFileSync(file, 'utf8');

const target = `<div class="sidebar-header" style="padding: var(--space-4) var(--space-4); margin-bottom: var(--space-2);">
      <div style="display: flex; align-items: center; justify-content: flex-start; width: 100%;">`;
const replacement = `<div class="sidebar-header" style="padding: var(--space-4) var(--space-4); margin-bottom: var(--space-2);">
      \${store.isDemoMode ? '<div style="background: var(--status-error); color: white; text-align: center; font-size: 11px; font-weight: bold; padding: 4px; border-radius: 4px; margin-bottom: 8px;">데모 모드 활성화됨</div>' : ''}
      <div style="display: flex; align-items: center; justify-content: flex-start; width: 100%;">`;

content = content.replace(target, replacement);

fs.writeFileSync(file, content);
