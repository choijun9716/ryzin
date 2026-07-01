const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const replacement = `
  // === localStorage 연동 로직 (어드민 제어) ===
  function loadLiveConfig() {
    try {
      const c = JSON.parse(localStorage.getItem('ryzin_live_config'));
      if(c) {
        if(c.streamUrl && video.src !== c.streamUrl && c.streamUrl !== m3u8Url) {
          // url이 바뀌었을 경우 리로드 로직 (데모에선 생략하거나 지원)
        }
        const titleEl = document.querySelector('.broadcast-title');
        if(titleEl) titleEl.textContent = c.title;
        const brandLogo = document.querySelector('.brand-logo');
        if(brandLogo && c.logoUrl) brandLogo.src = c.logoUrl;
      }
    }catch(e){}
  }

  function loadLiveStats() {
    try {
      const s = JSON.parse(localStorage.getItem('ryzin_live_stats'));
      if(s) {
        document.getElementById('view-count').textContent = s.viewers.toLocaleString() + '명 시청중';
        likeCount = s.hearts;
        document.getElementById('like-count').textContent = (likeCount >= 1000 ? (likeCount / 1000).toFixed(1) + 'K' : likeCount);
      }
    }catch(e){}
  }

  function loadLiveProducts() {
    try {
      const p = JSON.parse(localStorage.getItem('ryzin_live_products'));
      if(p && Array.isArray(p)) {
        const modalProductsList = document.getElementById('modal-products-list');
        modalProductsList.innerHTML = '';
        p.forEach(item => {
          const el = document.createElement('a');
          el.href = item.url || "#";
          el.className = 'product-card';
          el.innerHTML = \`<img src="\${item.image}" alt="product" class="product-image"><div class="product-info"><div class="product-name">\${item.name}</div><div class="product-price">\${item.price}</div></div>\`;
          el.addEventListener('click', (e) => {
            if(!item.url || item.url === '#') e.preventDefault();
            showToast('상품 구매 페이지로 이동합니다: ' + item.name);
          });
          modalProductsList.appendChild(el);
        });
      }
    }catch(e){}
  }

  // 초기 로드
  loadLiveConfig();
  loadLiveStats();
  loadLiveProducts();

  window.addEventListener('storage', (e) => {
    if(e.key === 'ryzin_live_config') loadLiveConfig();
    if(e.key === 'ryzin_live_stats') loadLiveStats();
    if(e.key === 'ryzin_live_products') loadLiveProducts();
    if(e.key === 'ryzin_admin_chat_trigger') {
      try {
        const msg = JSON.parse(e.newValue);
        if(msg) {
          const el = document.createElement('div');
          el.className = 'chat-msg admin-notice';
          el.innerHTML = \`<span class="chat-name" style="color:#ffcc00;">[공지] \${msg.name}</span><span class="chat-text" style="font-weight:bold;">\${msg.text}</span>\`;
          chatMessages.appendChild(el);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }catch(err){}
    }
  });
  // ===========================================
`;

// Insert after document.addEventListener('DOMContentLoaded', () => {
content = content.replace(`document.addEventListener('DOMContentLoaded', () => {`, `document.addEventListener('DOMContentLoaded', () => {` + replacement);

// Also update the sendMessage function to send chat trigger to localStorage
const targetSendMessage = `    addMessage('나(사용자)', text, true);
    chatInput.value = '';
    
    // 챗봇 자동 응답 (재미 요소)`;

const newSendMessage = `    addMessage('나(사용자)', text, true);
    chatInput.value = '';
    
    // 어드민에 알림 (로컬스토리지 트리거)
    localStorage.setItem('ryzin_user_chat_trigger', JSON.stringify({ name: '고객', text: text }));
    
    // 챗봇 자동 응답 (재미 요소)`;
content = content.replace(targetSendMessage, newSendMessage);

fs.writeFileSync(file, content);
