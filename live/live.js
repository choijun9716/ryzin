document.addEventListener('DOMContentLoaded', () => {
  // === SheetDB 및 localStorage 연동 로직 (어드민 제어) ===
  const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';
  
  let lastChatTime = Date.now() - 3000; // 최근 3초 전 메시지부터만 수신
  const mySentTexts = []; // 내가 방금 보낸 채팅 텍스트 보관용
  async function pollConfig() {
    try {
      const res = await fetch(`${SHEETDB_URL}?sheet=${encodeURIComponent('라이브관제')}&t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const latest = data[data.length - 1]; // 가장 마지막 업데이트 내역
          
          // 파싱 후 로컬스토리지 최신화 (다른 탭 호환 및 구조 유지)
          const config = {
            brandName: latest['제목'] || 'Ryzin Corp',
            title: latest['부제목'] || '단독 특가 라이브 방송 중!',
            logoUrl: latest['프로필이미지'] || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
            streamUrl: latest['URL'] || '',
            showViewers: latest['시청자수노출'] !== 'X'
          };
          
          const stats = {
            viewers: parseInt(latest['시청자수']) || 0,
            hearts: parseInt(latest['하트수']) || 0
          };
          
          localStorage.setItem('ryzin_live_config', JSON.stringify(config));
          localStorage.setItem('ryzin_live_stats', JSON.stringify(stats));
          
          if (latest['상품목록']) {
             try {
                const parsed = JSON.parse(latest['상품목록']);
                localStorage.setItem('ryzin_live_products', JSON.stringify(parsed));
                loadLiveProducts();
             } catch(e){}
          }
          
          loadLiveConfig();
          loadLiveStats();
        }
      }
    } catch (e) {
      console.warn("SheetDB pollConfig failed:", e);
    }
  }

  async function pollChat() {
    try {
      // 채팅 조회
      const chatRes = await fetch(`${SHEETDB_URL}?sheet=${encodeURIComponent('라이브채팅')}&t=${Date.now()}`);
      if (chatRes.ok) {
        const chats = await chatRes.json();
        if (chats && Array.isArray(chats)) {
          chats.forEach(c => {
             if (c['시간'] && parseInt(c['시간']) > lastChatTime) {
                // 자신이 보낸 건 이미 로컬에 표시되었으므로 닉네임과 내용이 같으면 패스
                if (c['닉네임'] === userNickname) {
                  const idx = mySentTexts.indexOf(c['내용']);
                  if (idx !== -1) {
                    // 방금 로컬에서 띄운 내 메시지면 스킵하고 배열에서 지움
                    mySentTexts.splice(idx, 1);
                  } else {
                    addMessage(c['닉네임'], c['내용'], c['닉네임'] === '관리자');
                  }
                } else {
                   addMessage(c['닉네임'], c['내용'], c['닉네임'] === '관리자');
                }
                lastChatTime = parseInt(c['시간']);
             }
          });
        }
      }
    } catch (e) {
      console.warn("SheetDB pollChat failed:", e);
    }
  }

  // 채팅 30초마다 조회
  setInterval(pollChat, 30000);
  // 상품/관제 10분마다 조회 (600,000ms)
  setInterval(pollConfig, 600000);
  
  // 초기 1회 즉시 실행
  setTimeout(() => {
    pollConfig();
    pollChat();
  }, 500);

  function loadLiveConfig() {
    try {
      const c = JSON.parse(localStorage.getItem('ryzin_live_config'));
      if(c) {
        if(c.streamUrl && window.__lastStreamUrl !== c.streamUrl) {
          window.__lastStreamUrl = c.streamUrl;
          if (window.hlsInstance) {
            window.hlsInstance.loadSource(c.streamUrl);
            window.hlsInstance.attachMedia(video);
            window.hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
              video.play().catch(e => console.warn(e));
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = c.streamUrl;
            video.play().catch(e => console.warn(e));
          }
        }
        const titleEl = document.querySelector('.broadcast-title');
        if(titleEl) titleEl.textContent = c.title;
        const brandNameEl = document.querySelector('.brand-name');
        
        // 썸네일 및 시작 시간 적용
        const thumbImg = document.getElementById('thumbnail-img');
        const startText = document.getElementById('live-start-text');
        
        if (c.thumbnailUrl && thumbImg) {
          thumbImg.src = c.thumbnailUrl;
          thumbImg.style.display = 'block';
        } else if (thumbImg) {
          thumbImg.style.display = 'none';
        }
        
        if (c.liveStartTime && startText) {
          startText.textContent = c.liveStartTime;
        } else if (startText) {
          startText.textContent = '';
        }

        if(brandNameEl && c.brandName) brandNameEl.textContent = c.brandName;
        const brandLogo = document.querySelector('.brand-logo');
        if(brandLogo && c.logoUrl) brandLogo.src = c.logoUrl;
        const viewCountWrapper = document.querySelector('.view-count');
        if(viewCountWrapper) {
          viewCountWrapper.style.display = (c.showViewers === false) ? 'none' : 'block';
        }
      }
    }catch(e){}
  }

  function loadLiveStats() {
    try {
      const s = JSON.parse(localStorage.getItem('ryzin_live_stats'));
      if(s) {
        document.getElementById('view-count').textContent = s.viewers.toLocaleString() + '명 시청중';
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
          let priceHtml = '';
          const normalPriceStr = item.normalPrice ? item.normalPrice.toString().replace(/[^0-9]/g, '') : '';
          const currentPriceStr = item.price ? item.price.toString().replace(/[^0-9]/g, '') : '';
          
          if (normalPriceStr && item.discountRate) {
            const normal = Number(normalPriceStr);
            const rate = Number(item.discountRate);
            const current = currentPriceStr ? Number(currentPriceStr) : Math.round(normal * (1 - rate / 100));
            priceHtml = `<span style="color:#e50914; font-weight:bold; margin-right:4px;">${rate}%</span><span class="original-price" style="text-decoration:line-through; color:#aaa; margin-right:4px; font-size:12px;">${normal.toLocaleString()}원</span><span class="discounted-price" style="font-weight:bold; color:#333; font-size:16px;">${current.toLocaleString()}원</span>`;
          } else {
            priceHtml = `${item.price}`;
          }
          el.innerHTML = `<img src="${item.image}" alt="product" class="product-image"><div class="product-info"><div class="product-name">${item.name}</div><div class="product-price">${priceHtml}</div></div>`;
          el.addEventListener('click', (e) => {
            if(!item.url || item.url === '#') e.preventDefault();
// removed alert, direct navigation
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

  // 어드민 iframe에서 postMessage로 실시간 데이터 쏘는 것 수신
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'sync_preview') {
      if (e.data.config) localStorage.setItem('ryzin_live_config', JSON.stringify(e.data.config));
      if (e.data.stats) localStorage.setItem('ryzin_live_stats', JSON.stringify(e.data.stats));
      if (e.data.products) localStorage.setItem('ryzin_live_products', JSON.stringify(e.data.products));
      loadLiveConfig();
      loadLiveStats();
      loadLiveProducts();
    }
  });

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
    window.hlsInstance = new Hls({
      // 옵션: 실시간 라이브에 맞게 튜닝 가능
      lowLatencyMode: true
    });
    window.hlsInstance.loadSource(m3u8Url);
    window.hlsInstance.attachMedia(video);
    window.hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play().catch(e => console.warn("자동 재생이 브라우저 정책에 의해 차단되었습니다.", e));
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari 등 네이티브 지원 브라우저
    video.src = m3u8Url;
    video.addEventListener('loadedmetadata', function () {
      video.play().catch(e => console.warn("자동 재생 차단됨", e));
    });
  }



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
  const nicknameModal = document.getElementById('nickname-modal');
  const chatSectionWrap = document.getElementById('chat-section-wrap');
  const nicknameInput = document.getElementById('nickname-input');
  const btnSetNickname = document.getElementById('btn-set-nickname');

  let userNickname = localStorage.getItem('ryzin_nickname') || '';
  if (userNickname) {
    chatSectionWrap.style.display = 'block';
  } else {
    nicknameModal.style.display = 'flex';
  }

  btnSetNickname.addEventListener('click', () => {
    const n = nicknameInput.value.trim();
    if (n) {
      userNickname = n;
      localStorage.setItem('ryzin_nickname', n);
      nicknameModal.style.display = 'none';
      chatSectionWrap.style.display = 'block';
      chatInput.focus();
    }
  });

  nicknameInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') btnSetNickname.click();
  });


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
  let isChatSending = false;
  async function sendMessage() {
    const text = chatInput.value.trim();
    if(text && userNickname && !isChatSending) {
      isChatSending = true;
      // 로컬에 먼저 보여주기
      addMessage(userNickname, text);
      mySentTexts.push(text);
      chatInput.value = '';
      


      // 시트 DB '라이브채팅' 전송
      try {
        await fetch(`${SHEETDB_URL}?sheet=${encodeURIComponent('라이브채팅')}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [{ '시간': new Date().getTime().toString(), '닉네임': userNickname, '내용': text }] })
        });
      } catch(e) { console.warn(e); }
      finally { isChatSending = false; }
    }
  }

  btnSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });



  // 4. 좋아요 버튼 연출 (시각적 효과만, DB 연동 X)
  const btnLike = document.getElementById('btn-like');
  const likeCountEl = document.getElementById('like-count');
  let likeCount = 12040;

  if (btnLike && likeCountEl) {
    // 주기적으로 하트 증가 연출
    setInterval(() => {
      likeCount += Math.floor(Math.random() * 5);
      likeCountEl.textContent = (likeCount / 1000).toFixed(1).replace(/\\.0$/, '') + 'K';
    }, 3000);

    btnLike.addEventListener('click', () => {
      likeCount += 1;
      likeCountEl.textContent = (likeCount / 1000).toFixed(1).replace(/\\.0$/, '') + 'K';

      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="#e50914" stroke="#e50914" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';
      heart.style.position = 'absolute';
      
      const rect = btnLike.getBoundingClientRect();
      heart.style.left = rect.left + (rect.width / 2) - 12 + 'px';
      heart.style.top = rect.top + 'px';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '9999';
      
      const randomX = (Math.random() - 0.5) * 100;
      heart.style.setProperty('--tx', randomX + 'px');
      
      heart.style.animation = 'dynamicFloatUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
      document.body.appendChild(heart);
      
      setTimeout(() => heart.remove(), 1500);
    });
  }
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
