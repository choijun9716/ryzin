const fs = require('fs');

let content = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

// We will replace the entire leftPanel creation down to rightPanel.
const targetStart = `  const leftPanel = document.createElement('div');
  leftPanel.style.flex = '1';`;

const targetEnd = `  // 3. 우측 패널 (미리보기)
  const rightPanel = document.createElement('div');`;

const targetString = content.substring(content.indexOf(targetStart), content.indexOf(targetEnd));

const newStructure = `  const leftPanel = document.createElement('div');
  leftPanel.style.flex = '1';
  leftPanel.style.display = 'flex';
  leftPanel.style.flexDirection = 'column';
  leftPanel.style.gap = '24px';
  leftPanel.style.overflowY = 'auto';
  leftPanel.style.paddingRight = '12px';

  // --- 메인 탭 헤더 ---
  const tabHeader = document.createElement('div');
  tabHeader.className = 'card';
  tabHeader.style.padding = '16px 24px';
  tabHeader.style.borderRadius = '12px';
  tabHeader.style.display = 'flex';
  tabHeader.style.gap = '24px';
  tabHeader.style.border = 'none';
  tabHeader.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  tabHeader.innerHTML = \`
    <div id="main-tab-config" style="cursor:pointer; font-weight:700; color:#111; border-bottom:2px solid #111; padding-bottom:4px;">라이브 기본설정</div>
    <div id="main-tab-chat" style="cursor:pointer; font-weight:600; color:#888; padding-bottom:4px;">채팅 / 봇 관리</div>
    <div id="main-tab-product" style="cursor:pointer; font-weight:600; color:#888; padding-bottom:4px;">상품 관리</div>
  \`;
  leftPanel.appendChild(tabHeader);

  // --- 1. 기본 설정 폼 (Tab 1) ---
  const configCard = document.createElement('div');
  configCard.id = 'panel-config';
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
        <label class="modern-label">시청자 수 가라 데이터 (현재: \${stats.viewers})</label>
        <input type="number" class="modern-input" id="stat-viewers" value="\${stats.viewers}">
      </div>
      <div>
        <label class="modern-label">하트 수 가라 데이터 (현재: \${stats.hearts})</label>
        <input type="number" class="modern-input" id="stat-hearts" value="\${stats.hearts}">
      </div>
    </div>

    <div style="display:flex; align-items:center; gap:12px; margin-bottom:24px;">
      <label class="modern-label" style="margin-bottom:0;">시청자 수 및 하트 노출 여부</label>
      <label class="switch">
        <input type="checkbox" id="config-showViewers" \${config.showViewers ? 'checked' : ''}>
        <span class="slider round"></span>
      </label>
    </div>

    <div>
      <button id="btn-toggle-live" class="btn" style="width:100%; background:\${config.isLive ? '#6b7280' : '#10b981'}; padding:14px; font-size:16px; font-weight:bold; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1); border-radius:8px;">
        \${config.isLive ? '라이브 종료하기' : '라이브 시작하기'}
      </button>
    </div>
  \`;
  leftPanel.appendChild(configCard);

  // --- 2. 채팅 / 봇 관리 (Tab 2) ---
  const chatCard = document.createElement('div');
  chatCard.id = 'panel-chat';
  chatCard.className = 'card';
  chatCard.style.padding = '24px';
  chatCard.style.borderRadius = '12px';
  chatCard.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  chatCard.style.border = 'none';
  chatCard.style.display = 'none';
  chatCard.innerHTML = \`
    <!-- 관리자 채팅 -->
    <div style="margin-bottom:32px;">
      <h3 style="margin-top:0; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:16px; font-size:18px; font-weight:700; color:#111;">💬 관리자 채팅</h3>
      <div id="admin-chat-list" style="height:200px; overflow-y:auto; background:#f9fafb; padding:12px; border-radius:8px; border:1px solid #e5e7eb; margin-bottom:12px; font-size:13px; line-height:1.5;">
        <div style="color:#888; text-align:center; margin-top:80px;">실시간 채팅 내역이 여기에 표시됩니다.</div>
      </div>
      <div style="display:flex; gap:8px;">
        <input type="text" id="admin-chat-input" class="form-control" placeholder="관리자 공지 전송..." style="flex:1;">
        <button id="btn-send-chat" class="btn btn-primary" style="white-space:nowrap;">전송</button>
      </div>
    </div>

    <!-- 채팅 봇 -->
    <div>
      <h3 style="margin-top:0; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:16px; font-size:18px; font-weight:700; color:#111;">🤖 채팅 봇 (더미 채팅)</h3>
      <p style="font-size:13px; color:#666; margin-bottom:12px; line-height:1.5;">
        시청자에게 보여질 더미 채팅 리스트입니다.<br>
        <b>닉네임|채팅내용</b> 형식으로 한 줄씩 입력해주세요.
      </p>
      <textarea id="bot-chat-list" class="modern-input" style="width:100%; height:120px; font-family:monospace; margin-bottom:12px; resize:vertical; padding:12px; font-size:13px;" placeholder="구매자1|와 진짜 싸네요!\\n라이브맘|방금 주문했습니다ㅎㅎ"></textarea>
      
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:12px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <label class="modern-label" style="margin-bottom:0;">전송 주기 (초)</label>
          <input type="number" id="bot-interval" class="modern-input" style="width:80px; text-align:center;" value="5" min="1">
        </div>
      </div>
      
      <button id="btn-toggle-bot" class="btn" style="width:100%; background:#3b82f6; border-radius:8px; padding:12px; font-size:15px; font-weight:600; box-shadow:0 2px 4px rgba(59,130,246,0.3); color:white; border:none; cursor:pointer;">채팅 봇 시작</button>
    </div>
  \`;
  leftPanel.appendChild(chatCard);

  // --- 3. 상품 관리 폼 (Tab 3) ---
  const productCard = document.createElement('div');
  productCard.id = 'panel-product';
  productCard.className = 'card';
  productCard.style.padding = '24px';
  productCard.style.borderRadius = '12px';
  productCard.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  productCard.style.border = 'none';
  productCard.style.display = 'none';

  const renderProductList = () => {
    return products.map((p, idx) => \`
      <div class="product-edit-card">
        <div class="product-edit-row">
          <label>상품명</label>
          <input type="text" class="modern-input" id="p-name-\${idx}" value="\${p.name}">
        </div>
        <div class="product-edit-row">
          <label>URL</label>
          <input type="text" class="modern-input" id="p-url-\${idx}" value="\${p.url}">
        </div>
        <div class="product-edit-row" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <label>정상가 (원)</label>
            <input type="text" class="modern-input p-normal-price" data-idx="\${idx}" value="\${formatNumber(p.normalPrice)}">
          </div>
          <div>
            <label>할인가 (원)</label>
            <input type="text" class="modern-input p-price" data-idx="\${idx}" value="\${formatNumber(p.price)}">
          </div>
        </div>
        <div class="product-edit-row">
          <label>할인율 (%) - 자동계산</label>
          <input type="text" class="modern-input" id="p-discount-\${idx}" value="\${p.discountRate}" readonly style="background:#f9fafb;">
        </div>
        
        <div class="product-edit-row" style="margin-top:16px; padding-top:16px; border-top:1px dashed #e5e7eb;">
          <label style="color:#e11d48; font-weight:bold;">⚡ 깜짝딜 설정</label>
          <div style="display:flex; gap:8px; align-items:center;">
            \${p.dealEndTime > Date.now() ? \`
              <span style="color:#e11d48; font-weight:bold; flex:1;">진행중 (종료: \${new Date(p.dealEndTime).toLocaleTimeString()})</span>
              <button class="btn btn-deal-cancel" data-idx="\${idx}" style="background:#fef2f2; color:#ef4444; border:1px solid #fee2e2; padding:6px 12px;">깜짝딜 종료</button>
            \` : \`
              <input type="text" class="modern-input" style="width:120px; padding:6px 10px;" id="deal-text-\${idx}" placeholder="배너 문구" value="\${p.dealText || '깜짝딜 종료까지'}">
              <input type="number" class="modern-input" style="width:70px; padding:6px 10px;" id="deal-min-\${idx}" placeholder="분">
              <button class="btn btn-deal-start" data-idx="\${idx}" style="background:#e11d48; color:white; border:none; padding:6px 12px; font-weight:bold;">깜짝딜 시작</button>
            \`}
          </div>
        </div>

        <div style="text-align:right; margin-top:16px;">
          <button class="btn btn-del-product" data-idx="\${idx}" style="background:#fee2e2; color:#ef4444; border:none;">이 상품 삭제</button>
        </div>
      </div>
    \`).join('');
  };

  productCard.innerHTML = \`
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:24px;">
      <h3 style="margin:0; font-size:18px; font-weight:700; color:#111;">상품 관리</h3>
      <button id="btn-add-product" class="btn" style="background:#10b981; color:white; font-weight:600;">+ 새 상품 추가</button>
    </div>
    <div id="product-list-container" style="display:flex; flex-direction:column; gap:16px;">
      \${renderProductList()}
    </div>
    <div style="margin-top:24px;">
      <button id="btn-save-products" class="btn" style="width:100%; background:#3b82f6; color:white; font-weight:bold; padding:14px; font-size:16px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
        모든 상품 변경사항 적용
      </button>
    </div>
  \`;
  leftPanel.appendChild(productCard);

`;

content = content.replace(targetString, newStructure);

// Fix Tab logic in event bindings
const eventTarget = `  // 이벤트 바인딩
  setTimeout(() => {
    // 탭 전환 로직
    const tabBasic = document.getElementById('tab-basic');
    const tabChat = document.getElementById('tab-chat');
    const contentBasic = document.getElementById('tab-content-basic');
    const contentChat = document.getElementById('tab-content-chat');

    tabBasic.addEventListener('click', () => {
      tabBasic.style.fontWeight = '700';
      tabBasic.style.color = '#111';
      tabBasic.style.borderBottom = '2px solid #111';
      tabChat.style.fontWeight = '600';
      tabChat.style.color = '#888';
      tabChat.style.borderBottom = 'none';
      contentBasic.style.display = 'block';
      contentChat.style.display = 'none';
    });

    tabChat.addEventListener('click', () => {
      tabChat.style.fontWeight = '700';
      tabChat.style.color = '#111';
      tabChat.style.borderBottom = '2px solid #111';
      tabBasic.style.fontWeight = '600';
      tabBasic.style.color = '#888';
      tabBasic.style.borderBottom = 'none';
      contentBasic.style.display = 'none';
      contentChat.style.display = 'flex';
    });`;

const newEventTarget = `  // 이벤트 바인딩
  setTimeout(() => {
    // 메인 탭 전환 로직
    const tabConfig = document.getElementById('main-tab-config');
    const tabChat = document.getElementById('main-tab-chat');
    const tabProduct = document.getElementById('main-tab-product');
    
    const panelConfig = document.getElementById('panel-config');
    const panelChat = document.getElementById('panel-chat');
    const panelProduct = document.getElementById('panel-product');

    const resetTabs = () => {
      [tabConfig, tabChat, tabProduct].forEach(t => { t.style.fontWeight = '600'; t.style.color = '#888'; t.style.borderBottom = 'none'; });
      [panelConfig, panelChat, panelProduct].forEach(p => { p.style.display = 'none'; });
    };

    tabConfig.addEventListener('click', () => {
      resetTabs();
      tabConfig.style.fontWeight = '700';
      tabConfig.style.color = '#111';
      tabConfig.style.borderBottom = '2px solid #111';
      panelConfig.style.display = 'block';
    });

    tabChat.addEventListener('click', () => {
      resetTabs();
      tabChat.style.fontWeight = '700';
      tabChat.style.color = '#111';
      tabChat.style.borderBottom = '2px solid #111';
      panelChat.style.display = 'block';
    });
    
    tabProduct.addEventListener('click', () => {
      resetTabs();
      tabProduct.style.fontWeight = '700';
      tabProduct.style.color = '#111';
      tabProduct.style.borderBottom = '2px solid #111';
      panelProduct.style.display = 'block';
    });`;

if (content.includes('tabBasic.addEventListener')) {
    content = content.replace(eventTarget, newEventTarget);
} else {
    // If the old tab logic wasn't there (maybe it failed or I didn't match it correctly), just inject it at the start of setTimeout
    const fallbackTarget = `  // 이벤트 바인딩
  setTimeout(() => {`;
    content = content.replace(fallbackTarget, newEventTarget);
}

fs.writeFileSync('admin_src/src/pages/live_stream.js', content);

