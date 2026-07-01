const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/models.js';
let content = fs.readFileSync(file, 'utf8');

const newConsts = `
export const CRM_STATUSES = [
  { key: 'new', label: '신규문의', color: 'blue' },
  { key: 'quote', label: '견적발송', color: 'orange' },
  { key: 'meeting', label: '미팅진행', color: 'purple' },
  { key: 'contract', label: '계약완료', color: 'green' },
  { key: 'hold', label: '보류/취소', color: 'gray' },
];

export const CRM_CATEGORIES = [
  { key: 'S', label: 'S급 (VIP)' },
  { key: 'A', label: 'A급 (주요)' },
  { key: 'B', label: 'B급 (일반)' },
  { key: 'C', label: 'C급 (잠재)' },
];

export const ACTIVITY_TYPES = [
  { key: 'kakao', label: '카카오톡', icon: '💬' },
  { key: 'phone', label: '전화', icon: '📞' },
  { key: 'sms', label: '문자', icon: '📱' },
  { key: 'email', label: '이메일', icon: '✉️' },
  { key: 'meeting', label: '미팅', icon: '🤝' },
];
`;

content = content.replace('export const CATEGORIES = [', newConsts + '\nexport const CATEGORIES = [');
fs.writeFileSync(file, content);
