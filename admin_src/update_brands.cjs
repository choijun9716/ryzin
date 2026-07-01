const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/brands.js';
let content = fs.readFileSync(file, 'utf8');

// Add to table header
content = content.replace(/<th>브랜드명<\/th>/, '<th>브랜드명</th>\n                  <th>사업자명</th>');

// Add to table body
content = content.replace(/<td><a href="javascript:void\(0\)" class="brand-link" data-id="\$\{b\.id\}">\$\{b\.name\}<\/a><\/td>/, '<td><a href="javascript:void(0)" class="brand-link" data-id="${b.id}">${b.name}</a></td>\n                    <td>${b.companyName || \'-\'}</td>');

// Add to modal
content = content.replace(/<input class="input" id="brand-name" value="\$\{brand\.name \|\| ''\}" placeholder="브랜드명">\n      <\/div>/, `<input class="input" id="brand-name" value="\$\{brand.name || ''\}" placeholder="브랜드명">\n      </div>\n      <div class="input-group">\n        <label>사업자명(법인명)</label>\n        <input class="input" id="brand-company" value="\$\{brand.companyName || ''\}" placeholder="사업자명">\n      </div>`);

// Add to modal save logic
content = content.replace(/name,\n      category/, 'name,\n      companyName: document.getElementById(\'brand-company\').value.trim(),\n      category');

// Add to detail page
content = content.replace(/<div class="detail-field"><span class="detail-field-label">카테고리<\/span><span class="detail-field-value">\$\{brand\.category \|\| '-'\}<\/span><\/div>/, '<div class="detail-field"><span class="detail-field-label">사업자명</span><span class="detail-field-value">${brand.companyName || \'-\'}</span></div>\n            <div class="detail-field"><span class="detail-field-label">카테고리</span><span class="detail-field-value">${brand.category || \'-\'}</span></div>');

fs.writeFileSync(file, content);
