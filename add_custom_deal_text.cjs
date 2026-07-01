const fs = require('fs');

// 1. Update admin UI
let adminContent = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

const adminTarget = `<input type="number" class="modern-input" style="width:70px; padding:6px 10px;" id="deal-min-\${idx}" placeholder="분">
            <button class="btn btn-deal-start" data-idx="\${idx}"`;

const adminReplace = `<input type="text" class="modern-input" style="width:120px; padding:6px 10px;" id="deal-text-\${idx}" placeholder="배너 문구" value="\${p.dealText || '깜짝딜 종료까지'}">
            <input type="number" class="modern-input" style="width:70px; padding:6px 10px;" id="deal-min-\${idx}" placeholder="분">
            <button class="btn btn-deal-start" data-idx="\${idx}"`;

adminContent = adminContent.replace(adminTarget, adminReplace);

const adminEventTarget = `const minInput = document.getElementById(\`deal-min-\${idx}\`);
          const min = parseInt(minInput.value);
          if(min > 0) {
            products[idx].dealEndTime = Date.now() + min * 60 * 1000;`;

const adminEventReplace = `const minInput = document.getElementById(\`deal-min-\${idx}\`);
          const textInput = document.getElementById(\`deal-text-\${idx}\`);
          const min = parseInt(minInput.value);
          if(min > 0) {
            products[idx].dealText = textInput ? textInput.value : '깜짝딜 종료까지';
            products[idx].dealEndTime = Date.now() + min * 60 * 1000;`;

adminContent = adminContent.replace(adminEventTarget, adminEventReplace);

fs.writeFileSync('admin_src/src/pages/live_stream.js', adminContent);

// 2. Update live.js to use custom text
let liveJsContent = fs.readFileSync('live/live.js', 'utf8');
const liveJsTarget = `textEl.textContent = \`깜짝딜 종료까지 \${m.toString().padStart(2, '0')}:\${s.toString().padStart(2, '0')}\`;`;
const liveJsReplace = `const dealText = deal.dealText || '깜짝딜 종료까지';
        textEl.textContent = \`\${dealText} \${m.toString().padStart(2, '0')}:\${s.toString().padStart(2, '0')}\`;`;
liveJsContent = liveJsContent.replace(liveJsTarget, liveJsReplace);

// Remove timer emoji from live JS badge if any... Wait, badge is in HTML.
fs.writeFileSync('live/live.js', liveJsContent);

// 3. Update live/index.html to remove emoji
let liveHtmlContent = fs.readFileSync('live/index.html', 'utf8');
const liveHtmlTarget = `<span style="font-size:16px;">⏰</span>`;
liveHtmlContent = liveHtmlContent.replace(liveHtmlTarget, '');
fs.writeFileSync('live/index.html', liveHtmlContent);

