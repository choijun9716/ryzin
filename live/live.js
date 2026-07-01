document.addEventListener('DOMContentLoaded', () => {
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
          el.innerHTML = `<img src="${item.image}" alt="product" class="product-image"><div class="product-info"><div class="product-name">${item.name}</div><div class="product-price">${item.price}</div></div>`;
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
          el.innerHTML = `<span class="chat-name" style="color:#ffcc00;">[공지] ${msg.name}</span><span class="chat-text" style="font-weight:bold;">${msg.text}</span>`;
          chatMessages.appendChild(el);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }catch(err){}
    }
  });
  // ===========================================

  // 1. 비디오 HLS 스트리밍 설정
  const video = document.getElementById('live-video');
  const m3u8Url = 'https://ib3fjwlmgu0bwksrq8ao15010.edge.naverncp.com/live/video/ls-20260701130603-WkL1g/1080p-16-9/playlist.m3u8';

  if (Hls.isSupported()) {
    const hls = new Hls({
      // 옵션: 실시간 라이브에 맞게 튜닝 가능
      lowLatencyMode: true
    });
    hls.loadSource(m3u8Url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play().catch(e => console.warn("자동 재생이 브라우저 정책에 의해 차단되었습니다.", e));
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari 등 네이티브 지원 브라우저
    video.src = m3u8Url;
    video.addEventListener('loadedmetadata', function () {
      video.play().catch(e => console.warn("자동 재생 차단됨", e));
    });
  }

  // 2. 더미 상품 리스트 렌더링
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
    el.innerHTML = `
      <img src="${p.image}" alt="product" class="product-image">
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-price">${p.price}</div>
      </div>
    `;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('상품 구매 페이지로 이동합니다: ' + p.name);
    });
    modalProductsList.appendChild(el);
  });

  // 화면 클릭 시 채팅창 숨기기/보이기 토글
  const videoWrapper = document.querySelector('.video-wrapper');
  const chatSection = document.querySelector('.chat-section');
  const inputSection = document.querySelector('.input-section');

  const sideActions = document.querySelector('.side-actions');
  videoWrapper.addEventListener('click', () => {
    chatSection.classList.toggle('chat-hidden');
    inputSection.classList.toggle('chat-hidden');
    if(sideActions) sideActions.classList.toggle('chat-hidden');
  });

  // 화면 첫 터치/클릭 시 자동 음소거 해제 (브라우저 정책 우회)
  const unmuteOnInteraction = () => {
    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      video.play().catch(e => console.warn(e));
    }
    // 한 번 실행된 후 이벤트 리스너 제거
    document.removeEventListener('click', unmuteOnInteraction);
    document.removeEventListener('touchstart', unmuteOnInteraction);
  };
  
  document.addEventListener('click', unmuteOnInteraction);
  document.addEventListener('touchstart', unmuteOnInteraction, { passive: true });

  // 모달 제어 로직
  const btnShop = document.getElementById('btn-shop');
  const productModal = document.getElementById('product-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');

  btnShop.addEventListener('click', () => {
    productModal.classList.remove('hidden');
  });

  btnCloseModal.addEventListener('click', () => {
    productModal.classList.add('hidden');
  });

  // 3. 채팅 로직 (더미)
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send');

  const botNames = ['라이즌팬', '쇼핑왕', '득템요정', '오늘만산다', '트루쿡매니아', '김지현', '박민수', '이서연'];
  const botMsgs = ['대박이네요', '어머 이건 사야해', '배송 언제 오나요?', '품절되기 전에 결제했습니다', '컬러 고민되네요', '할인율 미쳤다', '진행자님 예뻐요!'];

  function addMessage(name, text, isMe = false) {
    const el = document.createElement('div');
    el.className = 'chat-msg' + (isMe ? ' me' : '');
    el.innerHTML = `
      <span class="chat-name">${name}</span>
      <span class="chat-text">${text}</span>
    `;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // 사용자 메시지 전송
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage('나(사용자)', text, true);
    chatInput.value = '';
    
    // 어드민에 알림 (로컬스토리지 트리거)
    localStorage.setItem('ryzin_user_chat_trigger', JSON.stringify({ name: '고객', text: text }));
    
    // 챗봇 자동 응답 (재미 요소)
    setTimeout(() => {
      if(text.includes('안녕')) addMessage('관리자', '안녕하세요! 환영합니다 ❤️');
      else if(text.includes('얼마')) addMessage('관리자', '하단의 상품 리스트를 클릭하시면 가격 확인이 가능합니다!');
    }, 1000);
  }

  btnSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // 주기적으로 다른 사람들의 채팅이 올라오는 것처럼 연출
  setInterval(() => {
    // 30% 확률로 봇 채팅
    if (Math.random() < 0.3) {
      const rName = botNames[Math.floor(Math.random() * botNames.length)];
      const rMsg = botMsgs[Math.floor(Math.random() * botMsgs.length)];
      addMessage(rName, rMsg);
    }
  }, 2000);

  // 4. 좋아요 버튼 연출
  const btnLike = document.getElementById('btn-like');
  const likeCountEl = document.getElementById('like-count');
  let likeCount = 12040;

  // 주기적으로 좋아요 증가
  setInterval(() => {
    likeCount += Math.floor(Math.random() * 5);
    likeCountEl.textContent = (likeCount / 1000).toFixed(1) + 'K';
  }, 3000);

  btnLike.addEventListener('click', () => {
    likeCount += 1;
    likeCountEl.textContent = (likeCount / 1000).toFixed(1) + 'K';
    
    // 하트 / RYZIN 텍스트 번갈아 띄우기
    window._heartToggle = !window._heartToggle; // 번갈아가며 나타나도록 전역 변수 사용 (또는 클로저)
    
    const colors = ['#e50914', '#ff4081', '#ffca28', '#29b6f6', '#66bb6a'];
    const heartColor = colors[Math.floor(Math.random() * colors.length)];
    
    const heart = document.createElement('div');
    if (window._heartToggle) {
      heart.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="${heartColor}" stroke="${heartColor}" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    } else {
      heart.innerHTML = `<span style="font-size: 16px; font-weight: 900; color: #000; font-style: italic; -webkit-text-stroke: 1.5px #fff; paint-order: stroke fill; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">RYZIN</span>`;
    }
    heart.style.position = 'absolute';
    
    // 버튼 위치를 기준으로 시작 (중앙)
    const rect = btnLike.getBoundingClientRect();
    heart.style.left = rect.left + (rect.width / 2) - 12 + 'px';
    heart.style.top = rect.top + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    
    // 랜덤 이동 경로 계산
    const randomX = (Math.random() - 0.5) * 100; // 좌우 퍼짐 정도
    heart.style.setProperty('--tx', randomX + 'px');
    
    heart.style.animation = 'dynamicFloatUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1500);
  });
  // 모바일 키보드 열림 등으로 인해 비디오가 일시정지되는 현상 방지
  video.addEventListener('pause', () => {
    // 탭을 내리거나 다른 앱으로 간 게 아니라면(document.hidden이 아니라면) 강제 재재생
    if (!document.hidden) {
      video.play().catch(e => console.warn('강제 재생 실패:', e));
    }
  });
  
  // 브라우저 포커스가 돌아왔을 때 무조건 다시 재생
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      video.play().catch(e => console.warn(e));
    }
  });

});

// 커스텀 토스트 알림 함수 (alert 대체용)
function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = 'rgba(229, 9, 20, 0.9)';
  toast.style.color = 'white';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '24px';
  toast.style.fontSize = '14px';
  toast.style.fontWeight = 'bold';
  toast.style.zIndex = '99999';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  toast.style.pointerEvents = 'none';
  toast.style.animation = 'toastFade 3s forwards';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// 토스트/하트 애니메이션 키프레임 (JS로 동적 추가)
const style = document.createElement('style');
style.innerHTML = `
@keyframes dynamicFloatUp {
  0% { 
    transform: translate(0, 0) scale(0.5); 
    opacity: 0; 
  }
  20% { 
    transform: translate(calc(var(--tx) * 0.2), -30px) scale(1.2); 
    opacity: 1; 
  }
  100% { 
    transform: translate(var(--tx), -200px) scale(1); 
    opacity: 0; 
  }
}
@keyframes toastFade {
  0% { opacity: 0; transform: translate(-50%, -20px); }
  15% { opacity: 1; transform: translate(-50%, 0); }
  85% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -20px); }
}
`;
document.head.appendChild(style);
