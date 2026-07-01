const fs = require('fs');

let fileLive = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let contentLive = fs.readFileSync(fileLive, 'utf8');

// 1. 하드코딩된 더미 상품 리스트 제거
const targetDummy = `  // 2. 더미 상품 리스트 렌더링
  const products = [
    {
      id: 1,
      name: "[특가] 트루쿡 인덕션 프라이팬 3종 세트",
      price: "49,900원",
      image: "https://images.unsplash.com/photo-1584990347449-a6e81cb8860a?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 2,
      name: "네티컬 딥 클렌징 앰플 기획세트",
      price: "24,000원",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 3,
      name: "탐루미 수분폭탄 마스크팩 10매",
      price: "12,900원",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ];

  const modalProductsList = document.getElementById('modal-products-list');
  products.forEach(p => {
    const el = document.createElement('a');
    el.href = "#"; // 실제 링크로 대체 가능
    el.className = 'product-card';
    el.innerHTML = \`
      <img src="\${p.image}" alt="product" class="product-image">
      <div class="product-info">
        <div class="product-name">\${p.name}</div>
        <div class="product-price">\${p.price}</div>
      </div>
    \`;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('상품 구매 페이지로 이동합니다: ' + p.name);
    });
    modalProductsList.appendChild(el);
  });`;

contentLive = contentLive.replace(targetDummy, '');

// 2. loadLiveProducts 함수 보강 (이동 링크 처리)
const targetLoad = `          el.href = item.url || "#";
          el.className = 'product-card';
          el.innerHTML = \`<img src="\${item.image}" alt="product" class="product-image"><div class="product-info"><div class="product-name">\${item.name}</div><div class="product-price">\${item.price}</div></div>\`;
          modalProductsList.appendChild(el);`;

const newLoad = `          el.href = item.url && item.url.startsWith('http') ? item.url : "#";
          el.target = item.url && item.url.startsWith('http') ? "_blank" : "";
          el.className = 'product-card';
          el.innerHTML = \`<img src="\${item.image}" alt="product" class="product-image"><div class="product-info"><div class="product-name">\${item.name}</div><div class="product-price">\${item.price}</div></div>\`;
          el.addEventListener('click', (e) => {
            if (!item.url || !item.url.startsWith('http')) {
              e.preventDefault();
              showToast('상품 구매 링크가 등록되지 않았습니다.');
            } else {
              // 브라우저 팝업/새 탭으로 이동
            }
          });
          modalProductsList.appendChild(el);`;

if(contentLive.includes('el.href = item.url || "#";')) {
  contentLive = contentLive.replace(targetLoad, newLoad);
}

fs.writeFileSync(fileLive, contentLive);

// 3. 브라우저 캐시 버스터 업데이트 (HTML 파일)
let fileHtml = '/Users/chaeijun/Downloads/ryzin-main 2/live/index.html';
let contentHtml = fs.readFileSync(fileHtml, 'utf8');
contentHtml = contentHtml.replace(/live\.js\?v=\d+/, 'live.js?v=' + Date.now());
fs.writeFileSync(fileHtml, contentHtml);

