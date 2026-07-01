const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/crm.js';
let content = fs.readFileSync(file, 'utf8');

const headerTarget = `<div class="page-header-right">
          <button class="btn btn-primary" id="btn-add-client">고객 등록</button>
        </div>`;

const newHeaderTarget = `<div class="page-header-right" style="display: flex; gap: var(--space-2);">
          <button class="btn btn-secondary" id="btn-csv-upload">CSV 대량등록</button>
          <button class="btn btn-primary" id="btn-add-client">고객 등록</button>
          <input type="file" id="csv-file-input" accept=".csv" style="display: none;">
        </div>`;

content = content.replace(headerTarget, newHeaderTarget);
fs.writeFileSync(file, content);
