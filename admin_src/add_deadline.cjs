const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/projects.js';
let content = fs.readFileSync(file, 'utf8');

const getDeadlineFunc = `
// Helper: Calculate deadline based on broadcast date
function getDeadlineText(broadcastDate, statusKey) {
  if (!broadcastDate) return '';
  const dateStr = broadcastDate.replace(/\\./g, '-');
  const bDate = new Date(dateStr);
  if (isNaN(bDate.getTime())) return '';

  let offset = 0;
  if (statusKey === 'design') offset = -4;
  else if (statusKey === 'cue_sheet') offset = -5;
  else if (statusKey === 'host_cast') offset = -7;
  
  if (offset === 0) return '';
  
  const dDate = new Date(bDate);
  dDate.setDate(dDate.getDate() + offset);
  
  const mm = String(dDate.getMonth() + 1).padStart(2, '0');
  const dd = String(dDate.getDate()).padStart(2, '0');
  return \`<br><span style="font-size: 9px; opacity: 0.8; font-weight: normal;">(\${mm}/\${dd} 까지)</span>\`;
}
`;

// Insert the helper function after the imports
content = content.replace(/import { router } from '\.\.\/router\.js';/, "import { router } from '../router.js';\n" + getDeadlineFunc);

// Update the button render logic
const oldBtn = `            <button class="btn \${project.broadcastStatus === s.key ? 'btn-primary' : 'btn-secondary'} btn-sm status-change-btn" data-status="\${s.key}" style="font-size: 11px;">
              \${s.label}
            </button>`;

const newBtn = `            <button class="btn \${project.broadcastStatus === s.key ? 'btn-primary' : 'btn-secondary'} btn-sm status-change-btn" data-status="\${s.key}" style="font-size: 11px; padding: var(--space-1); line-height: 1.2;">
              \${s.label}\${getDeadlineText(project.broadcastDate, s.key)}
            </button>`;

content = content.replace(oldBtn, newBtn);

fs.writeFileSync(file, content);
