document.addEventListener('DOMContentLoaded', () => {
  // === SheetDB 및 localStorage 연동 로직 (어드민 제어) ===
  const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';

  // URL 파라미터에서 라이브 ID 추출 (예: /live?id=live01)
  const urlParams = new URLSearchParams(window.location.search);
  const LIVE_ID = urlParams.get('id') || null; // null이면 전체 중 최신

  let lastChatTime = 0; // 0으로 설정하면 최초 폴링 시 전체 채팅 이력 로드
  let chatHistoryLoaded = false; // 최초 전체 이력 로드 여부 추적
  const mySentTexts = []; // 내가 방금 보낸 채팅 텍스트 보관용
  async function pollConfig() {
    try {
      const res = await fetch(`${SHEETDB_URL}?sheet=${encodeURIComponent('라이브관제')}&t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          // live_id가 지정된 경우 해당 라이브 데이터만 사용
          // ⚠️ 일치하는 데이터가 없으면 다른 라이브 데이터를 절대 사용하지 않음
          let filtered;
          if (LIVE_ID) {
            filtered = data.filter(row => row['live_id'] === LIVE_ID);
            if (filtered.length === 0) return; // 해당 live_id 데이터 없음 → 아무것도 재생 안 함
          } else {
            filtered = data; // id 파라미터 없으면 전체 최신
          }
          const latest = filtered[filtered.length - 1]; // 가장 마지막 업데이트 내역
          
          // 파싱 후 로컬스토리지 최신화 (다른 탭 호환 및 구조 유지)
          let extraConfig = {};
          try {
            if (latest['첫상품명'] && latest['첫상품명'].startsWith('{')) {
              extraConfig = JSON.parse(latest['첫상품명']);
            }
          } catch(e){}

          const config = {
            liveId: latest['live_id'] || 'live01',
            brandName: latest['제목'] || 'Ryzin Corp',
            title: latest['부제목'] || '단독 특가 라이브 방송 중!',
            logoUrl: latest['프로필이미지'] || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
            streamUrl: latest['URL'] || '',
            showViewers: latest['시청자수노출'] !== 'X',
            thumbnailUrl: extraConfig.thumbnailUrl || latest['썸네일URL'] || '',
            liveStartTime: extraConfig.liveStartTime || latest['시작일시'] || '',
            isLive: (extraConfig.isLive === true || latest['방송상태'] === 'ON')
          };

          // 사용자의 요청에 따라 라이브 중에도 상품 즉각 적용을 위해 폴링 주기 단축 (5초)
          if (config.isLive) {
            if (window.__currentPollRate !== 'live') {
              window.__currentPollRate = 'live';
              clearInterval(window.pollConfigIntervalId);
              window.pollConfigIntervalId = setInterval(pollConfig, 5000); // 5초
            }
          } else {
            if (window.__currentPollRate !== 'standby') {
              window.__currentPollRate = 'standby';
              clearInterval(window.pollConfigIntervalId);
              window.pollConfigIntervalId = setInterval(pollConfig, 3000); // 3초
            }
          }
          
          const stats = {
            viewers: parseInt(latest['시청자수']) || 0,
            hearts: parseInt(latest['하트수']) || 0,
            cumViewers: latest['누적시청자수'] !== undefined && latest['누적시청자수'] !== '' ? parseInt(latest['누적시청자수']) || 0 : 0
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
      // 채팅 조회 (live_id로 필터)
      const chatRes = await fetch(`${SHEETDB_URL}?sheet=${encodeURIComponent('라이브채팅')}&t=${Date.now()}`, { cache: 'no-store' });
      if (chatRes.ok) {
        let chats = await chatRes.json();
        // live_id가 있으면 해당 라이브 채팅만 표시
        if (LIVE_ID && Array.isArray(chats)) {
          chats = chats.filter(c => !c['live_id'] || c['live_id'] === LIVE_ID);
        }
        if (chats && Array.isArray(chats)) {
          // 시간순 정렬
          chats.sort((a, b) => (parseInt(a['시간']) || 0) - (parseInt(b['시간']) || 0));
          
          const isFirstLoad = !chatHistoryLoaded;
          let addedCount = 0;
          
          chats.forEach(c => {
             if (c['시간'] && parseInt(c['시간']) > lastChatTime) {
                if (c['닉네임'] === userNickname && !isFirstLoad) {
                  // 내가 방금 보낸 메시지는 로컬에 이미 표시된 경우만 스킵
                  const idx = mySentTexts.indexOf(c['내용']);
                  if (idx !== -1) {
                    mySentTexts.splice(idx, 1);
                  } else {
                    addMessage(c['닉네임'], c['내용'], c['닉네임'] === '관리자', isFirstLoad);
                    addedCount++;
                  }
                } else {
                   addMessage(c['닉네임'], c['내용'], c['닉네임'] === '관리자', isFirstLoad);
                   addedCount++;
                }
                lastChatTime = parseInt(c['시간']);
             }
          });
          
          // 최초 로드 완료 후 맨 아래로 스크롤
          if (isFirstLoad) {
            chatHistoryLoaded = true;
            if (addedCount > 0) {
              setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
              }, 100);
            }
          }
        }
      }
    } catch (e) {
      console.warn("SheetDB pollChat failed:", e);
    }
  }

  // 채팅 30초마다 조회
  setInterval(pollChat, 30000);
  // 방송 전에는 즉각적인 시작을 위해 3초마다 조회, 방송 시작 후에는 데이터 절감을 위해 10분마다 조회
  window.pollConfigIntervalId = setInterval(pollConfig, 3000);
  
  // 초기 1회 즉시 실행
  setTimeout(() => {
    pollConfig();
    pollChat();
  }, 500);

  // === 페이지 로드(새로고침 포함) 시마다 누적 시청자수 +1 ===
  // sessionStorage 사용: 탭 닫고 재진입하면 다시 카운트. 같은 탭 내에서는 중복 집계 없음
  const SESSION_KEY = `ryzin_viewer_counted_${LIVE_ID || 'default'}`;
  if (!sessionStorage.getItem(SESSION_KEY)) {
    sessionStorage.setItem(SESSION_KEY, '1');
    // 0.8초 뒤 SheetDB 조회 후 누적 시청자수 +1 PATCH
    setTimeout(async () => {
      try {
        const targetLiveId = LIVE_ID || 'live01';
        const res = await fetch(`${SHEETDB_URL}?sheet=${encodeURIComponent('라이브관제')}&t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          const row = data.find(r => r.live_id === targetLiveId);
          if (row) {
            const newCum = (parseInt(row['누적시청자수']) || 0) + 1;
            await fetch(`${SHEETDB_URL}/live_id/${targetLiveId}?sheet=${encodeURIComponent('라이브관제')}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ data: { '누적시청자수': newCum } })
            });
          }
        }
      } catch(e) {
        console.warn('Viewer count increment failed:', e);
      }
    }, 800);
  }

  function loadLiveConfig() {
    try {
      const c = JSON.parse(localStorage.getItem('ryzin_live_config'));
      if(c) {
        const overlay = document.getElementById('thumbnail-overlay');
        
        // 라이브 상태 변경 확인 (streamUrl 변경 또는 isLive 변경)
        if(c.streamUrl && (window.__lastStreamUrl !== c.streamUrl || window.__lastIsLive !== c.isLive)) {
          window.__lastStreamUrl = c.streamUrl;
          window.__lastIsLive = c.isLive;
          
          if (c.isLive) {
            if (overlay) overlay.classList.add('hidden');
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
          } else {
            if (overlay) overlay.classList.remove('hidden');
            video.pause();
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
        
        
        // 카운트다운 타이머 관련 전역 변수 해제 (중복 방지)
        if (window.liveCountdownInterval) {
          clearInterval(window.liveCountdownInterval);
        }

        if (c.liveStartTime && startText) {
          const targetTime = new Date(c.liveStartTime).getTime();
          
          const updateCountdown = () => {
            const now = new Date().getTime();
            const diff = targetTime - now;
            
            if (diff <= 0) {
              startText.textContent = '곧 라이브가 시작됩니다!';
              if (window.liveCountdownInterval) clearInterval(window.liveCountdownInterval);
            } else {
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((diff % (1000 * 60)) / 1000);
              
              let countStr = '라이브 시작까지\n';
              if (days > 0) countStr += `${days}일 `;
              countStr += `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
              
              startText.innerText = countStr;
            }
          };
          
          if (!isNaN(targetTime)) {
            updateCountdown();
            window.liveCountdownInterval = setInterval(updateCountdown, 1000);
          } else {
            startText.textContent = c.liveStartTime;
          }
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

        // 라이브 배지 텍스트 업데이트 (스트리밍 URL 없으면 숨김)
        const liveBadge = document.querySelector('.live-badge');
        if (liveBadge) {
          if (!c.streamUrl) {
            liveBadge.style.display = 'none';
          } else if (c.isLive) {
            liveBadge.style.display = '';
            liveBadge.textContent = 'LIVE';
            liveBadge.style.background = '#e50914';
          } else {
            liveBadge.style.display = '';
            liveBadge.textContent = '대기';
            liveBadge.style.background = '#374151';
          }
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
        const now = Date.now();
        p.forEach(item => {
          // 깜짝딜 만료 시 상품 숨김
          if (item.dealEndTime && item.dealEndTime > 0 && now >= item.dealEndTime) {
            return;
          }
          const el = document.createElement('a');
          el.href = item.url || "#";
          el.className = 'product-card';
          let priceHtml = '';
          const normalPriceStr = item.normalPrice ? item.normalPrice.toString().replace(/[^0-9]/g, '') : '';
          const currentPriceStr = item.price ? item.price.toString().replace(/[^0-9]/g, '') : '';
          
          if (normalPriceStr && item.discountRate) {
            const normal = Number(normalPriceStr);
            const rate = Number(item.discountRate);
            let current = Number(currentPriceStr);
            if (!currentPriceStr || current === 0) {
              current = Math.round(normal * (1 - rate / 100));
            }
            priceHtml = `<span class="discounted-price" style="font-weight:bold; color:#333; font-size:16px; margin-right:4px;">${current.toLocaleString()}원</span><span class="original-price" style="text-decoration:line-through; color:#aaa; margin-right:4px; font-size:12px;">${normal.toLocaleString()}원</span><span style="color:#e50914; font-weight:bold; font-size:14px;">${rate}%</span>`;
          } else {
            const current = currentPriceStr ? Number(currentPriceStr) : 0;
            priceHtml = currentPriceStr ? `${current.toLocaleString()}원` : '';
          }
          el.innerHTML = `<img src="${item.image}" alt="product" class="product-image"><div class="product-info"><div class="product-name">${item.dealEndTime && item.dealEndTime > Date.now() ? '<span style="color:#e11d48; font-weight:800; margin-right:4px;">[깜짝딜]</span>' : ''}${item.name}</div><div class="product-price">${priceHtml}</div></div>`;
          el.addEventListener('click', async (e) => {
            if(!item.url || item.url === '#') e.preventDefault();
            // 상품 클릭수 (조회수) 트래킹 - SheetDB에서 실시간 상품목록을 조회한 뒤 안전하게 누적합산 PATCH
            try {
              const targetLiveId = LIVE_ID || (config && config.liveId) || 'live01';
              if (!targetLiveId) return;

              // 1. 최신 시트 데이터 조회
              const res = await fetch(`${SHEETDB_URL}?sheet=${encodeURIComponent('라이브관제')}&t=${Date.now()}`);
              if (res.ok) {
                const data = await res.json();
                const row = data.find(r => r.live_id === targetLiveId);
                if (row && row['상품목록']) {
                  const remoteProducts = JSON.parse(row['상품목록']) || [];
                  const targetProd = remoteProducts.find(p => p.name === item.name);
                  if (targetProd) {
                    // 원격 데이터에서 가져온 값에 1 누적
                    targetProd.clicks = (parseInt(targetProd.clicks) || 0) + 1;
                    
                    // 2. 누적된 신규 데이터를 로컬 스토리지에 즉시 반영 및 PATCH
                    localStorage.setItem('ryzin_live_products', JSON.stringify(remoteProducts));
                    
                    const updatePayload = {
                      '상품목록': JSON.stringify(remoteProducts),
                      '업데이트시간': new Date().toISOString()
                    };
                    
                    await fetch(`${SHEETDB_URL}/live_id/${targetLiveId}?sheet=${encodeURIComponent('라이브관제')}`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ data: updatePayload })
                    });
                  }
                }
              }
            } catch(err){
              console.warn('Product click sync failed', err);
            }
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


  function addMessage(name, text, isAdmin = false, isHistory = false) {
    const el = document.createElement('div');
    el.className = 'chat-msg' + (isAdmin ? ' me' : '');
    if (isHistory) el.style.opacity = '0.72';
    el.innerHTML = `
      <span class="chat-name">${name}</span>
      <span class="chat-text">${text}</span>
    `;
    chatMessages.appendChild(el);
    // 히스토리 로드 중엔 자동스크롤 없음, 새 메시지만 아래로 스크롤
    if (!isHistory) chatMessages.scrollTop = chatMessages.scrollHeight;
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
        const chatData = { '시간': new Date().getTime().toString(), '닉네임': userNickname, '내용': text };
        if (LIVE_ID) chatData['live_id'] = LIVE_ID;
        await fetch(`${SHEETDB_URL}?sheet=${encodeURIComponent('라이브채팅')}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [chatData] })
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
        const dealText = deal.dealText || '깜짝딜 종료까지';
        textEl.textContent = `${dealText} ${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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

