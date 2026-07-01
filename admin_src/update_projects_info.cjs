const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/projects.js';
let content = fs.readFileSync(file, 'utf8');

const oldHTML = `<div class="detail-field"><span class="detail-field-label">등록일</span><span class="detail-field-value">\${formatDate(project.createdAt)}</span></div>
          <div class="detail-field"><span class="detail-field-label">진행월</span><span class="detail-field-value">\${project.broadcastMonth || '-'}</span></div>
          <div class="detail-field"><span class="detail-field-label">방송일</span><span class="detail-field-value">\${formatDate(project.broadcastDate)}</span></div>
          <div class="detail-field"><span class="detail-field-label">방송시간</span><span class="detail-field-value">\${project.broadcastTime || '-'}</span></div>
          <div class="detail-field"><span class="detail-field-label">브랜드</span><span class="detail-field-value">\${project.brandName || (brand ? brand.name : '-')}</span></div>`;

const newHTML = `<div class="detail-field"><span class="detail-field-label">브랜드</span><span class="detail-field-value">\${project.brandName || (brand ? brand.name : '-')}</span></div>
          <div class="detail-field"><span class="detail-field-label">진행월</span><span class="detail-field-value">\${project.broadcastMonth || '-'}</span></div>
          <div class="detail-field"><span class="detail-field-label">방송일</span><span class="detail-field-value">\${formatDate(project.broadcastDate)}</span></div>
          <div class="detail-field"><span class="detail-field-label">방송시간</span><span class="detail-field-value">\${project.broadcastTime || '-'}</span></div>`;

content = content.replace(oldHTML, newHTML);

fs.writeFileSync(file, content);
