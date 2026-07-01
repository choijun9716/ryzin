const fs = require('fs');

let content = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

// 1. Add tab header after leftPanel creation
const targetLeftPanel = `  leftPanel.style.paddingRight = '12px';`;
const newLeftPanel = `  leftPanel.style.paddingRight = '12px';

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
`;
content = content.replace(targetLeftPanel, newLeftPanel);

// 2. Hide productCard initially
const targetProductCard = `  const productCard = document.createElement('div');
  productCard.className = 'card';`;
const newProductCard = `  const productCard = document.createElement('div');
  productCard.className = 'card';
  productCard.style.display = 'none';`;
content = content.replace(targetProductCard, newProductCard);

// 3. Prevent chatCard and botCard from appending to rightPanel, move them to leftPanel inside a container
const targetChatCards = `  rightPanel.appendChild(previewCard);
  rightPanel.appendChild(chatCard);
  rightPanel.appendChild(botCard);`;

const newChatCards = `  rightPanel.appendChild(previewCard);

  // 채팅 & 봇 탭 컨테이너
  const chatContainer = document.createElement('div');
  chatContainer.style.display = 'none';
  chatContainer.style.flexDirection = 'column';
  chatContainer.style.gap = '24px';
  chatContainer.appendChild(chatCard);
  chatContainer.appendChild(botCard);
  leftPanel.appendChild(chatContainer);
`;
content = content.replace(targetChatCards, newChatCards);

// 4. Add Tab switching logic in setTimeout
const targetSetTimeout = `  // 이벤트 바인딩
  setTimeout(() => {`;

const newSetTimeout = `  // 이벤트 바인딩
  setTimeout(() => {
    // 탭 전환 로직
    const tabConfig = document.getElementById('main-tab-config');
    const tabChat = document.getElementById('main-tab-chat');
    const tabProduct = document.getElementById('main-tab-product');
    
    const resetTabs = () => {
      [tabConfig, tabChat, tabProduct].forEach(t => { t.style.fontWeight = '600'; t.style.color = '#888'; t.style.borderBottom = 'none'; });
      configCard.style.display = 'none';
      chatContainer.style.display = 'none';
      productCard.style.display = 'none';
    };

    tabConfig.addEventListener('click', () => {
      resetTabs();
      tabConfig.style.fontWeight = '700';
      tabConfig.style.color = '#111';
      tabConfig.style.borderBottom = '2px solid #111';
      configCard.style.display = 'block';
    });

    tabChat.addEventListener('click', () => {
      resetTabs();
      tabChat.style.fontWeight = '700';
      tabChat.style.color = '#111';
      tabChat.style.borderBottom = '2px solid #111';
      chatContainer.style.display = 'flex';
    });
    
    tabProduct.addEventListener('click', () => {
      resetTabs();
      tabProduct.style.fontWeight = '700';
      tabProduct.style.color = '#111';
      tabProduct.style.borderBottom = '2px solid #111';
      productCard.style.display = 'block';
    });
`;
content = content.replace(targetSetTimeout, newSetTimeout);

fs.writeFileSync('admin_src/src/pages/live_stream.js', content);

