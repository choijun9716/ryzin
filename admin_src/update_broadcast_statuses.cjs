const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/models.js';
let content = fs.readFileSync(file, 'utf8');

const newStatuses = `export const BROADCAST_STATUSES = [
  { key: 'scheduled', label: '일정부킹', color: 'indigo' },
  { key: 'host_cast', label: '쇼호스트 선정', color: 'rose' },
  { key: 'tech_request', label: '기술서요청', color: 'purple' },
  { key: 'design', label: '디자인진행', color: 'orange' },
  { key: 'cue_sheet', label: '큐시트작성', color: 'yellow' },
  { key: 'done', label: '방송종료', color: 'gray' }
];`;

content = content.replace(/export const BROADCAST_STATUSES = \[[\s\S]*?\];/, newStatuses);

fs.writeFileSync(file, content);
