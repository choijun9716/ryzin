const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/projects.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove checklist generation
content = content.replace(/\/\/ 기본 체크리스트 생성[\s\S]*?}\);/g, '');

// 2. Remove checklist tab
content = content.replace(/<div class="tab \$\{activeTab === 'checklist' \? 'active' : ''\}" data-tab="checklist">체크리스트<\/div>\n/g, '');

// 3. Remove switch case
content = content.replace(/case 'checklist': tabContent\.appendChild\(renderChecklistTab\(project\)\); break;\n/g, '');

// 4. Remove renderChecklistTab function
// Find the index of '// ===== 탭: 체크리스트 ====='
const startIdx = content.indexOf('// ===== 탭: 체크리스트 =====');
if (startIdx !== -1) {
  // Find the start of the next tab '// ===== 탭: 쇼호스트 ====='
  const endIdx = content.indexOf('// ===== 탭: 쇼호스트 =====', startIdx);
  if (endIdx !== -1) {
    content = content.slice(0, startIdx) + content.slice(endIdx);
  }
}

fs.writeFileSync(file, content);
