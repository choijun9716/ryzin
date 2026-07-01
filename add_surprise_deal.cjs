const fs = require('fs');
let content = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

// Update renderProductList
const oldProductPrices = `<div class="product-prices">
            <input type="number" class="modern-input" value="\\$\\{(p.price||'').toString().replace(/\\[\\^0-9\\]/g, '')\\}" data-idx="\\$\\{idx\\}" data-field="price" placeholder="라이브가(숫자)">
            <input type="number" class="modern-input" value="\\$\\{(p.normalPrice||'').toString().replace(/\\[\\^0-9\\]/g, '')\\}" data-idx="\\$\\{idx\\}" data-field="normalPrice" placeholder="정상가(숫자)">
            <input type="number" min="0" max="100" class="modern-input" style="max-width:80px; text-align:center;" value="\\$\\{p.discountRate || 0\\}" data-idx="\\$\\{idx\\}" data-field="discountRate" placeholder="할인율%" readonly>
            <button class="btn btn-danger btn-del-product" data-idx="\\$\\{idx\\}" style="padding:10px 16px; font-weight:600; border-radius:8px; border:none; background:#ef4444; color:#fff;">삭제</button>
          </div>`;

// Wait, regex might fail with all those special chars. Let's do simple split and join or exact match on substring.
const target = `<div class="product-prices">
            <input type="number" class="modern-input" value="\${(p.price||'').toString().replace(/[^0-9]/g, '')}" data-idx="\${idx}" data-field="price" placeholder="라이브가(숫자)">
            <input type="number" class="modern-input" value="\${(p.normalPrice||'').toString().replace(/[^0-9]/g, '')}" data-idx="\${idx}" data-field="normalPrice" placeholder="정상가(숫자)">
            <input type="number" min="0" max="100" class="modern-input" style="max-width:80px; text-align:center;" value="\${p.discountRate || 0}" data-idx="\${idx}" data-field="discountRate" placeholder="할인율%" readonly>
            <button class="btn btn-danger btn-del-product" data-idx="\${idx}" style="padding:10px 16px; font-weight:600; border-radius:8px; border:none; background:#ef4444; color:#fff;">삭제</button>
          </div>`;

const replaceWith = target + `
          <div style="display:flex; gap:8px; align-items:center; background:#fff1f2; padding:8px 12px; border-radius:8px; border:1px solid #fecdd3;">
            <span style="font-size:13px; font-weight:600; color:#e11d48;">🎁 깜짝딜</span>
            <input type="number" class="modern-input" style="width:70px; padding:6px 10px;" id="deal-min-\${idx}" placeholder="분">
            <button class="btn btn-deal-start" data-idx="\${idx}" style="padding:6px 12px; background:#e11d48; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">시작</button>
            <button class="btn btn-deal-cancel" data-idx="\${idx}" style="padding:6px 12px; background:#f3f4f6; color:#374151; border:1px solid #d1d5db; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">종료/취소</button>
            <span id="deal-status-\${idx}" style="font-size:12px; font-weight:600; color:#e11d48; margin-left:auto;">\${p.dealEndTime && p.dealEndTime > Date.now() ? '진행중 ⏰' : ''}</span>
          </div>`;

content = content.replace(target, replaceWith);

// Update event listeners
const eventTarget = `      container.querySelectorAll('.btn-del-product').forEach(btn => {`;
const eventReplaceWith = `      container.querySelectorAll('.btn-deal-start').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          const minInput = document.getElementById(\`deal-min-\${idx}\`);
          const min = parseInt(minInput.value);
          if(min > 0) {
            products[idx].dealEndTime = Date.now() + min * 60 * 1000;
            saveProducts();
            document.getElementById('product-list-container').innerHTML = renderProductList();
            bindProductEvents();
            syncAllToSheetDB();
            alert(\`\${min}분 깜짝딜이 시작되었습니다.\`);
          }
        });
      });
      container.querySelectorAll('.btn-deal-cancel').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          products[idx].dealEndTime = 0;
          saveProducts();
          document.getElementById('product-list-container').innerHTML = renderProductList();
          bindProductEvents();
          syncAllToSheetDB();
        });
      });
` + eventTarget;

content = content.replace(eventTarget, eventReplaceWith);

fs.writeFileSync('admin_src/src/pages/live_stream.js', content);
