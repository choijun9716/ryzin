const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/projects.js';
let content = fs.readFileSync(file, 'utf8');

const oldFunc = `// Helper: Calculate deadline based on broadcast date
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
}`;

const newFunc = `// Helper: Calculate deadline based on broadcast date
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
  
  const today = new Date();
  today.setHours(0,0,0,0);
  const diffTime = dDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let ddayText = '';
  if (diffDays === 0) ddayText = 'D-Day';
  else if (diffDays > 0) ddayText = \`D-\${diffDays}\`;
  else ddayText = \`D+\${Math.abs(diffDays)}\`;
  
  return \`<br><span style="font-size: 10px; opacity: 0.8; font-weight: normal;">(\${mm}/\${dd} 까지 / <strong style="color:var(--status-error);">\${ddayText}</strong>)</span>\`;
}`;

content = content.replace(oldFunc, newFunc);
fs.writeFileSync(file, content);
