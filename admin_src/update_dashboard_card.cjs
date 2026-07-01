const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/dashboard.js';
let content = fs.readFileSync(file, 'utf8');

const jsTargetRegex = /\/\/ 쇼호스트/;
const jsReplace = `  let ddayText = '';
  if (project.broadcastStatus === 'done') {
    ddayText = 'D-0';
  } else if (project.broadcastDate) {
    const bDate = new Date(project.broadcastDate.replace(/\\./g, '-'));
    if (!isNaN(bDate.getTime())) {
      const today = new Date();
      today.setHours(0,0,0,0);
      const diffDays = Math.ceil((bDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) ddayText = 'D-Day';
      else if (diffDays > 0) ddayText = \`D-\${diffDays}\`;
      else ddayText = \`D+\${Math.abs(diffDays)}\`;
    }
  }

  // 쇼호스트`;

content = content.replace(jsTargetRegex, jsReplace);


const htmlTarget = `<div class="project-card-header">
        <div>
          <div class="project-card-header">
            <span class="project-card-brand">\${brandName}</span>
            <div style="display:flex; gap: 4px;">
              \${renderBroadcastBadge(project.broadcastStatus)}
            </div>
          </div>
        </div>
      </div>`;

const htmlReplace = `<div class="project-card-header" style="justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
        <div style="display:flex; align-items:center; gap: 8px;">
          <span class="project-card-brand">\${brandName}</span>
          \${renderBroadcastBadge(project.broadcastStatus)}
        </div>
        \${ddayText ? \`<div style="font-size: 11px; font-weight: 600; padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.05); color: var(--text-secondary);">\${ddayText}</div>\` : ''}
      </div>`;

content = content.replace(htmlTarget, htmlReplace);

fs.writeFileSync(file, content);
