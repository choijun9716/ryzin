const fs = require('fs');
let content = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

// Inject the style block at the beginning
const styleInjection = `
  const style = document.createElement('style');
  style.innerHTML = \`
    .modern-input { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; transition: all 0.2s; background: #fff; box-sizing: border-box; }
    .modern-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
    .modern-input[readonly] { background: #f3f4f6; cursor: not-allowed; }
    .modern-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
    .file-upload-wrapper { display: flex; align-items: center; gap: 12px; }
    .file-upload-btn { display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; background: #fff; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: background 0.2s; color: #374151; }
    .file-upload-btn:hover { background: #f9fafb; }
    .product-row { display: flex; gap: 16px; align-items: center; background: #fff; padding: 16px; border-radius: 12px; margin-bottom: 12px; border: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .product-img-box { position: relative; width: 64px; height: 64px; flex-shrink: 0; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; cursor: pointer; }
    .product-img-box img { width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s; }
    .product-img-box:hover img { opacity: 0.8; }
    .product-inputs { flex: 1; display: flex; flex-direction: column; gap: 8px; }
    .product-prices { display: flex; gap: 8px; align-items: center; }
  \`;
  container.appendChild(style);
`;

content = content.replace("  // 기본 상태 (localStorage 연동)", styleInjection + "\n  // 기본 상태 (localStorage 연동)");

// Re-write configCard
const oldConfigCardRegex = /const configCard = document\.createElement\('div'\);[\s\S]*?configCard\.innerHTML = `[\s\S]*?`;/m;
const newConfigCard = `const configCard = document.createElement('div');
  configCard.className = 'card';
  configCard.style.padding = '24px';
  configCard.style.borderRadius = '12px';
  configCard.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  configCard.style.border = 'none';
  configCard.innerHTML = \`
    <h3 style="margin-top:0; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:24px; font-size:18px; font-weight:700; color:#111;">라이브 기본 설정</h3>
    
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">
      <div>
        <label class="modern-label">제목 (브랜드명)</label>
        <input type="text" class="modern-input" id="config-brandName" value="\${config.brandName || 'Ryzin Corp'}">
      </div>
      <div>
        <label class="modern-label">부제목 (방송 제목)</label>
        <input type="text" class="modern-input" id="config-title" value="\${config.title || ''}">
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <label class="modern-label">방송 시작 일시 (카운트다운용)</label>
      <input type="datetime-local" class="modern-input" id="config-liveStartTime" value="\${config.liveStartTime || ''}">
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:24px;">
      <div class="file-upload-wrapper">
        <div style="width:56px; height:56px; border-radius:50%; overflow:hidden; border:2px solid #e5e7eb; flex-shrink:0;">
          <img id="logo-preview" src="\${config.logoUrl || ''}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <label class="modern-label">프로필 이미지</label>
          <label class="file-upload-btn" for="config-logoFile">이미지 업로드</label>
          <input type="file" id="config-logoFile" accept="image/*" style="display:none;">
        </div>
      </div>
      <div class="file-upload-wrapper">
        <div style="width:40px; height:71px; border-radius:6px; overflow:hidden; border:2px solid #e5e7eb; flex-shrink:0;">
          <img id="thumbnail-preview" src="\${config.thumbnailUrl || ''}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <label class="modern-label">라이브 썸네일 (9:16 비율)</label>
          <label class="file-upload-btn" for="config-thumbnailFile">이미지 업로드</label>
          <input type="file" id="config-thumbnailFile" accept="image/*" style="display:none;">
        </div>
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <label class="modern-label">스트리밍 URL (m3u8)</label>
      <input type="text" class="modern-input" id="config-stream" value="\${config.streamUrl}">
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:24px;">
      <div>
        <label class="modern-label">시청자 수 뻥튀기</label>
        <input type="number" class="modern-input" id="stat-viewers" value="\${stats.viewers}">
      </div>
      <div>
        <label class="modern-label">하트 수 뻥튀기</label>
        <input type="number" class="modern-input" id="stat-hearts" value="\${stats.hearts}">
      </div>
    </div>

    <div style="display:flex; align-items:center; gap:24px; margin-bottom:32px; background:#f9fafb; padding:16px; border-radius:8px;">
      <label style="display:flex; align-items:center; gap:8px; font-size:14px; font-weight:500; cursor:pointer;">
        <input type="checkbox" id="config-show-viewers" style="width:18px; height:18px; accent-color:#e50914;" \${config.showViewers !== false ? 'checked' : ''}>
        시청자 수 노출
      </label>
      <label style="display:flex; align-items:center; gap:8px; font-size:14px; font-weight:500; cursor:pointer;">
        <input type="checkbox" id="config-bot" style="width:18px; height:18px; accent-color:#e50914;" \${config.botEnabled ? 'checked' : ''}>
        채팅 봇 활성화
      </label>
    </div>

    <div style="display:flex; gap:12px; flex-direction:column;">
      <button id="btn-save-config" class="btn" style="width:100%; padding:14px; font-weight:700; background:#111; color:#fff; border:none; border-radius:8px; font-size:15px; transition:opacity 0.2s;">
        라이브 설정 일괄 적용 (저장)
      </button>
      <button id="btn-toggle-live" class="btn" style="width:100%; padding:14px; font-weight:700; color:white; background:\${config.isLive ? '#6b7280' : '#e50914'}; border:none; border-radius:8px; font-size:15px; transition:opacity 0.2s;">
        \${config.isLive ? '라이브 종료하기' : '라이브 시작하기'}
      </button>
    </div>
  \`;`;
content = content.replace(oldConfigCardRegex, newConfigCard);

const oldRenderProduct = /const renderProductList = \(\) => \{[\s\S]*?^\s*\};\n/m;
const newRenderProduct = `const renderProductList = () => {
    return products.map((p, idx) => \`
      <div class="product-row">
        <div class="product-img-box" onclick="document.getElementById('upload-prod-\${idx}').click()" title="클릭하여 이미지 업로드">
          <img src="\${p.image}" id="img-preview-\${idx}">
          <input type="file" id="upload-prod-\${idx}" accept="image/*" style="display:none;" data-idx="\${idx}" class="prod-img-upload">
        </div>
        <div class="product-inputs">
          <input type="text" class="modern-input" value="\${p.name}" data-idx="\${idx}" data-field="name" placeholder="상품명">
          <input type="text" class="modern-input" value="\${p.url}" data-idx="\${idx}" data-field="url" placeholder="상품 구매 링크 URL">
          <div class="product-prices">
            <input type="number" class="modern-input" value="\${(p.price||'').toString().replace(/[^0-9]/g, '')}" data-idx="\${idx}" data-field="price" placeholder="라이브가(숫자)">
            <input type="number" class="modern-input" value="\${(p.normalPrice||'').toString().replace(/[^0-9]/g, '')}" data-idx="\${idx}" data-field="normalPrice" placeholder="정상가(숫자)">
            <input type="number" min="0" max="100" class="modern-input" style="max-width:80px; text-align:center;" value="\${p.discountRate || 0}" data-idx="\${idx}" data-field="discountRate" placeholder="할인율%" readonly>
            <button class="btn btn-danger btn-del-product" data-idx="\${idx}" style="padding:10px 16px; font-weight:600; border-radius:8px; border:none; background:#ef4444; color:#fff;">삭제</button>
          </div>
        </div>
      </div>
    \`).join('');
  };
`;
content = content.replace(oldRenderProduct, newRenderProduct);

const oldProductCardHeader = /<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:16px;">[\s\S]*?<\/div>/m;
const newProductCardHeader = `<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:20px;">
      <h3 style="margin:0; font-size:18px; font-weight:700; color:#111;">상품 관리</h3>
      <div style="display:flex; gap:8px;">
        <button class="btn" id="btn-add-product" style="padding:8px 16px; background:#f3f4f6; border:1px solid #d1d5db; color:#374151; font-weight:600; border-radius:6px; font-size:14px;">+ 상품 추가</button>
        <button class="btn" id="btn-save-products" style="padding:8px 16px; background:#111; border:none; color:#fff; font-weight:600; border-radius:6px; font-size:14px;">상품 일괄 적용</button>
      </div>
    </div>`;
content = content.replace(oldProductCardHeader, newProductCardHeader);

fs.writeFileSync('admin_src/src/pages/live_stream.js', content);
