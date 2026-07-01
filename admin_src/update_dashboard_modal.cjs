const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/dashboard.js';
let content = fs.readFileSync(file, 'utf8');

const deadlineHelper = `
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
  
  // Calculate D-day
  const today = new Date();
  today.setHours(0,0,0,0);
  const diffTime = dDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let ddayText = '';
  if (diffDays === 0) ddayText = 'D-Day';
  else if (diffDays > 0) ddayText = \`D-\${diffDays}\`;
  else ddayText = \`D+\${Math.abs(diffDays)}\`;
  
  return \`<br><span style="font-size: 10px; opacity: 0.8; font-weight: normal;">(\${mm}/\${dd} 까지 / <strong style="color:var(--status-error);">\${ddayText}</strong>)</span>\`;
}
`;

const replaceTarget = `        \${BROADCAST_STATUSES.map(s => \`
          <button class="btn \${project.broadcastStatus === s.key ? 'btn-primary' : 'btn-secondary'} btn-sm status-option" data-status="\${s.key}" style="justify-content: flex-start; font-size: 12px;">
            \${s.label}
          </button>
        \`).join('')}`;

const replacementStr = `        \${BROADCAST_STATUSES.map(s => \`
          <button class="btn \${project.broadcastStatus === s.key ? 'btn-primary' : 'btn-secondary'} btn-sm status-option" data-status="\${s.key}" style="flex-direction: column; align-items: flex-start; justify-content: flex-start; font-size: 12px; padding: var(--space-1) var(--space-2); height: auto; line-height: 1.3;">
            <span>\${s.label}</span>\${getDeadlineText(project.broadcastDate, s.key)}
          </button>
        \`).join('')}`;

if (!content.includes('function getDeadlineText')) {
  // insert helper before openStatusModal
  content = content.replace(/function openStatusModal\(projectId\) \{/, deadlineHelper + '\nfunction openStatusModal(projectId) {');
}

content = content.replace(replaceTarget, replacementStr);

fs.writeFileSync(file, content);
