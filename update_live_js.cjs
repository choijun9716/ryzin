const fs = require('fs');
let content = fs.readFileSync('live/live.js', 'utf8');

// 1. Update loadLiveProducts
const oldLoadProducts = `        modalProductsList.innerHTML = '';
        p.forEach(item => {`;
const newLoadProducts = `        modalProductsList.innerHTML = '';
        const now = Date.now();
        p.forEach(item => {
          // 깜짝딜 만료 시 상품 숨김
          if (item.dealEndTime && item.dealEndTime > 0 && now >= item.dealEndTime) {
            return;
          }`;
content = content.replace(oldLoadProducts, newLoadProducts);

// 2. Add deal badge to product name
const oldProductName = `<div class="product-name">\${item.name}</div>`;
const newProductName = `<div class="product-name">\${item.dealEndTime && item.dealEndTime > Date.now() ? '<span style="color:#e11d48; font-weight:800; margin-right:4px;">[깜짝딜]</span>' : ''}\${item.name}</div>`;
content = content.replace(oldProductName, newProductName);

// 3. Add global setInterval for surprise deal timer
const globalTimerCode = `
// 깜짝딜 글로벌 타이머 로직
setInterval(() => {
  try {
    const p = JSON.parse(localStorage.getItem('ryzin_live_products'));
    const timerEl = document.getElementById('surprise-deal-timer');
    const textEl = document.getElementById('surprise-deal-text');
    if(p && Array.isArray(p) && timerEl && textEl) {
      const now = Date.now();
      // 가장 먼저 끝나는 활성 깜짝딜 찾기
      const activeDeals = p.filter(item => item.dealEndTime && item.dealEndTime > now).sort((a,b) => a.dealEndTime - b.dealEndTime);
      if (activeDeals.length > 0) {
        const deal = activeDeals[0];
        const diff = deal.dealEndTime - now;
        const m = Math.floor(diff / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        textEl.textContent = \`깜짝딜 종료까지 \${m.toString().padStart(2, '0')}:\${s.toString().padStart(2, '0')}\`;
        if (timerEl.style.display === 'none') {
          timerEl.style.display = 'flex';
          loadLiveProducts(); // UI 갱신 (뱃지 추가)
        }
      } else {
        if (timerEl.style.display !== 'none') {
          timerEl.style.display = 'none';
          loadLiveProducts(); // UI 갱신 (만료된 상품 숨김)
        }
      }
    }
  } catch(e) {}
}, 1000);

`;
content += globalTimerCode;

fs.writeFileSync('live/live.js', content);
