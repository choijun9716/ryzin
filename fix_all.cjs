const fs = require('fs');

// 1. live_stream.js (어드민 패널) 업데이트
let fileAdmin = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/live_stream.js';
let contentAdmin = fs.readFileSync(fileAdmin, 'utf8');

// (a) 상품목록 전체를 SheetDB로 보내기
const targetSync = `'첫상품명': products.length > 0 ? products[0].name : '',`;
const newSync = `'첫상품명': products.length > 0 ? products[0].name : '',
        '상품목록': JSON.stringify(products),`;
if (contentAdmin.includes(targetSync)) {
  contentAdmin = contentAdmin.replace(targetSync, newSync);
}

// (b) 상품 렌더링 시 이미지 업로드 버튼 추가
const targetRenderProd = `        <img src="\${p.image}" style="width:48px; height:48px; border-radius:4px; object-fit:cover;">`;
const newRenderProd = `        <div style="position:relative; width:48px; height:48px; flex-shrink:0;">
          <img src="\${p.image}" id="img-preview-\${idx}" style="width:100%; height:100%; border-radius:4px; object-fit:cover; border:1px solid #ccc; cursor:pointer;" onclick="document.getElementById('upload-prod-\${idx}').click()" title="클릭하여 이미지 업로드">
          <input type="file" id="upload-prod-\${idx}" accept="image/*" style="display:none;" data-idx="\${idx}" class="prod-img-upload">
        </div>`;
if (contentAdmin.includes(targetRenderProd)) {
  contentAdmin = contentAdmin.replace(targetRenderProd, newRenderProd);
}

// (c) 상품 이벤트 바인딩 시 이미지 업로드 로직 추가
const targetProdEvents = `      container.querySelectorAll('.btn-del-product').forEach(btn => {`;
const newProdEvents = `      container.querySelectorAll('.prod-img-upload').forEach(input => {
        input.addEventListener('change', async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const idx = parseInt(e.target.dataset.idx);
          
          const formData = new FormData();
          formData.append('file', file);
          
          const previewImg = document.getElementById(\`img-preview-\${idx}\`);
          previewImg.style.opacity = '0.5';
          
          try {
            const res = await fetch('https://tmpfiles.org/api/v1/upload', { method: 'POST', body: formData });
            const json = await res.json();
            if (json.status === 'success') {
              const url = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
              products[idx].image = url;
              previewImg.src = url;
              saveProducts();
            } else {
              alert('상품 이미지 업로드 실패');
            }
          } catch (err) {
            console.error(err);
            alert('상품 이미지 업로드 에러');
          } finally {
            previewImg.style.opacity = '1';
          }
        });
      });
      container.querySelectorAll('.btn-del-product').forEach(btn => {`;
if (contentAdmin.includes(targetProdEvents)) {
  contentAdmin = contentAdmin.replace(targetProdEvents, newProdEvents);
}

fs.writeFileSync(fileAdmin, contentAdmin);


// 2. live.js (프론트/모바일 화면) 업데이트
let fileLive = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let contentLive = fs.readFileSync(fileLive, 'utf8');

// (a) 하트수 포맷에서 0.0 없애기 (.0K 방지)
const targetHeart1 = `document.getElementById('like-count').textContent = (likeCount >= 1000 ? (likeCount / 1000).toFixed(1) + 'K' : likeCount);`;
const newHeart1 = `document.getElementById('like-count').textContent = (likeCount >= 1000 ? (likeCount / 1000).toFixed(1).replace(/\\.0$/, '') + 'K' : likeCount);`;
// There are two places where this is done. 1) loadLiveStats and 2) click listener and setInterval
contentLive = contentLive.split(targetHeart1).join(newHeart1); // replaceAll essentially

// (b) pollSheetDB에서 상품 목록 파싱해서 적용하기
const targetPoll = `          localStorage.setItem('ryzin_live_config', JSON.stringify(config));
          localStorage.setItem('ryzin_live_stats', JSON.stringify(stats));
          
          loadLiveConfig();
          loadLiveStats();`;
const newPoll = `          localStorage.setItem('ryzin_live_config', JSON.stringify(config));
          localStorage.setItem('ryzin_live_stats', JSON.stringify(stats));
          
          if (latest['상품목록']) {
             try {
                const parsed = JSON.parse(latest['상품목록']);
                localStorage.setItem('ryzin_live_products', JSON.stringify(parsed));
                loadLiveProducts();
             } catch(e){}
          }
          
          loadLiveConfig();
          loadLiveStats();`;
if (contentLive.includes(targetPoll)) {
  contentLive = contentLive.replace(targetPoll, newPoll);
}

fs.writeFileSync(fileLive, contentLive);

// 3. 브라우저 캐시 버스터 업데이트 (HTML 파일)
let fileHtml = '/Users/chaeijun/Downloads/ryzin-main 2/live/index.html';
let contentHtml = fs.readFileSync(fileHtml, 'utf8');
contentHtml = contentHtml.replace(/live\.js\?v=\d+/, 'live.js?v=' + Date.now());
contentHtml = contentHtml.replace(/live\.css\?v=\d+/, 'live.css?v=' + Date.now());
fs.writeFileSync(fileHtml, contentHtml);

