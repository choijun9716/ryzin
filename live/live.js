// === Global Supabase & State Variables ===
let db = null;
let LIVE_ID = 'live01';

document.addEventListener('DOMContentLoaded', () => {
  // === Supabase 및 localStorage 연동 로직 (어드민 제어) ===
  db = window.supabaseClient;
  let userNickname = '';
  window.__winnerCountdownSeconds = 0;
  window.__lastWinnerTimestamp = null;
  window.__confettiTriggerCount = 0;
  window.__triggeringSurpriseDeal = false;

  // URL 파라미터에서 라이브 ID 추출 (예: /live?id=live01)
  const urlParams = new URLSearchParams(window.location.search);
  LIVE_ID = window.INJECTED_LIVE_ID || urlParams.get('id') || 'live01';

  let lastChatTime = 0; // 0으로 설정하면 최초 로드 시 전체 채팅 이력 로드
  let chatHistoryLoaded = false; // 최초 전체 이력 로드 여부 추적
  const mySentTexts = []; // 내가 방금 보낸 채팅 텍스트 보관용

  // 1. 초기 라이브 제어 정보 로드 (최초 1회 실행)
  async function loadConfigOnce() {
    if (!db) {
      console.warn("Supabase client not initialized.");
      return;
    }
    try {
      const { data, error } = await db
        .from('live_control')
        .select('*')
        .eq('live_id', LIVE_ID)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        applyLiveConfig(data);
      }
    } catch (e) {
      console.warn("Supabase loadConfigOnce failed:", e);
    }
  }

  // 백그라운드 1.2초 폴링 백업 연동 (실시간 채널 끊김 및 캐시 딜레이 무력화)
  setInterval(async () => {
    if (!db) return;
    try {
      const { data, error } = await db
        .from('live_control')
        .select('*')
        .eq('live_id', LIVE_ID)
        .maybeSingle();

      if (!error && data) {
        applyLiveConfig(data);
      }
    } catch (e) {
      console.warn("Polling fallback failed:", e);
    }
  }, 1200);

  // 2. 실시간 라이브 제어 감지 설정
  function subscribeConfig() {
    if (!db) return;
    db.channel('live-control-channel')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'live_control', filter: `live_id=eq.${LIVE_ID}` }, async payload => {
        // Supabase 실시간 UPDATE 시, 누락된 필드로 인한 UI 오염을 막기 위해 DB에서 100% 온전한 전체 레코드를 다시 조회해서 안전하게 적용
        try {
          const { data, error } = await db
            .from('live_control')
            .select('*')
            .eq('live_id', LIVE_ID)
            .maybeSingle();
          if (!error && data) {
            applyLiveConfig(data);
          }
        } catch (e) {
          if (payload.new) {
            applyLiveConfig(payload.new);
          }
        }
      })
      .subscribe();
  }

  // 설정 데이터를 파싱하고 UI에 적용하는 헬퍼 함수
  function applyLiveConfig(row) {
    // === [NEW] 소통왕 당첨자 정보 로컬스토리지 즉시 동기화 및 락인 검사 ===
    if (row.winner_name !== undefined) localStorage.setItem(`ryzin_winner_name_${LIVE_ID}`, row.winner_name || '');
    if (row.winner_timestamp !== undefined) {
      const rowTS = Number(row.winner_timestamp) || 0;
      localStorage.setItem(`ryzin_winner_timestamp_${LIVE_ID}`, rowTS.toString());

      if (rowTS > 0) {
        if (window.__lastWinnerTimestamp === null) {
          // 최초 입장(새로고침) 시점!
          window.__lastWinnerTimestamp = rowTS;
          // 아직 종료 시간이 지나지 않은 미래 시간 상태라면, 새로고침 시에도 남은 초만큼 이어서 활성화!
          const diffSec = Math.round((rowTS - Date.now()) / 1000);
          if (diffSec > 0) {
            window.__winnerCountdownSeconds = diffSec;
          }
        } else if (window.__lastWinnerTimestamp !== rowTS) {
          // 실시간으로 새로운 발표(타임스탬프 갱신)가 발생했을 때만 카운트다운 초 장전!
          window.__lastWinnerTimestamp = rowTS;
          const diffSec = Math.round((rowTS - Date.now()) / 1000);
          window.__winnerCountdownSeconds = diffSec > 0 ? diffSec : 60;
          // 실시간 당첨 발표가 처음 울리는 시점에 꽃가루 폭사 2회 카운터를 예약 장전!
          window.__confettiTriggerCount = 2;

          // 실시간으로 당첨되었을 때, 본인이라면 자동으로 배송 정보 입력 팝업 띄우기
          setTimeout(() => {
            const currentNick = (userNickname || localStorage.getItem('ryzin_chat_nickname') || '').trim();
            const wName = row.winner_name || '';
            const parts = wName.split('|');
            const cleanNick = (parts.length > 1 ? parts[1] : wName).trim();

            if (currentNick && cleanNick && currentNick === cleanNick) {
              const alreadySubmitted = localStorage.getItem(`ryzin_submitted_winner_${LIVE_ID}_` + rowTS);
              if (!alreadySubmitted) {
                const addrModal = document.getElementById('winner-address-modal');
                if (addrModal) addrModal.style.display = 'flex';
              }
            }
          }, 300);
        }
      } else {
        // 어드민에서 강제 종료를 누른 경우 즉시 카운트다운을 종료시킴
        window.__winnerCountdownSeconds = 0;
        window.__lastWinnerTimestamp = 0;
        const winnerEl = document.getElementById('winner-alert-overlay');
        if (winnerEl) winnerEl.style.display = 'none';
      }
    }

    // [NEW] 채팅 금칙어 및 차단 유저 정보 전역 변수에 실시간 갱신
    window.bannedWords = row.banned_words || '';
    window.bannedUsers = row.banned_users || '';
    if (typeof checkUserBanStatus === 'function') {
      checkUserBanStatus();
    }

    const rawLogoUrl = row.profile_image || '';
    const showSplash = !rawLogoUrl.endsWith('#nosplash');
    
    // 스플래시 제어
    if (showSplash === false) {
      const splash = document.getElementById('splash-screen');
      if (splash) splash.remove();
      const splashAudio = document.getElementById('splash-audio');
      if (splashAudio) {
        splashAudio.pause();
        splashAudio.remove();
      }
    }

    const config = {
      liveId: row.live_id || 'live01',
      brandName: row.title || 'Ryzin Corp',
      title: row.subtitle || '단독 특가 라이브 방송 중!',
      logoUrl: rawLogoUrl.replace('#nosplash', '') || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
      streamUrl: row.stream_url || '',
      showViewers: row.show_viewers !== false,
      showSplash: showSplash,
      thumbnailUrl: row.thumbnail_url || '',
      liveStartTime: row.start_time || '',
      isLive: row.status === 'ON',
      likeImageUrl: row.like_image_url || ''
    };

    const stats = {
      viewers: parseInt(row.viewers) || 0,
      hearts: parseInt(row.hearts) || 0,
      cumViewers: parseInt(row.cum_viewers) || 0
    };

    localStorage.setItem(`ryzin_live_config_${LIVE_ID}`, JSON.stringify(config));
    localStorage.setItem(`ryzin_live_stats_${LIVE_ID}`, JSON.stringify(stats));

    if (row.products) {
      try {
        const productsList = typeof row.products === 'string' ? JSON.parse(row.products) : row.products;
        localStorage.setItem(`ryzin_live_products_${LIVE_ID}`, JSON.stringify(productsList));
        loadLiveProducts();
      } catch (e) {}
    }

    loadLiveConfig();
    loadLiveStats();
  }

  // 3. 초기 채팅 로드 (최초 1회 실행)
  async function loadChatOnce() {
    if (!db) return;
    try {
      const blockedList = JSON.parse(localStorage.getItem(`ryzin_blocked_${LIVE_ID}`) || '[]');
      const adminList = JSON.parse(localStorage.getItem(`ryzin_admins_${LIVE_ID}`) || '["관리자"]');

      // 기존 채팅 내역 로드 (최신 100개)
      const { data: chats, error } = await db
        .from('live_chats')
        .select('*')
        .eq('live_id', LIVE_ID)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      if (chats && Array.isArray(chats)) {
        chats.reverse().forEach(c => {
          const nick = c.nickname || '';
          if (blockedList.includes(nick)) return;
          const isAdmin = adminList.includes(nick);
          addMessage(nick, c.content, isAdmin, true);
          lastChatTime = parseInt(c.created_at) || 0;
        });

        chatHistoryLoaded = true;
        setTimeout(() => {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
      }
    } catch (e) {
      console.warn("Supabase loadChatOnce failed:", e);
    }
  }

  // 4. 실시간 채팅 감지 설정 (구독)
  function subscribeChat() {
    if (!db) return;
    db.channel('live-chats-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'live_chats', filter: `live_id=eq.${LIVE_ID}` }, payload => {
        const c = payload.new;
        if (!c) return;

        const blockedList = JSON.parse(localStorage.getItem(`ryzin_blocked_${LIVE_ID}`) || '[]');
        const adminList = JSON.parse(localStorage.getItem(`ryzin_admins_${LIVE_ID}`) || '["관리자"]');

        const nick = c.nickname || '';
        if (blockedList.includes(nick)) return;

        const isAdmin = adminList.includes(nick);
        
        // 내가 방금 보낸 메시지 처리
        if (nick === userNickname) {
          const idx = mySentTexts.indexOf(c.content);
          if (idx !== -1) {
            mySentTexts.splice(idx, 1);
          } else {
            addMessage(nick, c.content, isAdmin, false);
          }
        } else {
          addMessage(nick, c.content, isAdmin, false);
        }
        lastChatTime = parseInt(c.created_at) || 0;
      })
      .subscribe();
  }

  // 초기 1회 로드 및 실시간 구독 시작
  setTimeout(() => {
    loadConfigOnce();
    loadChatOnce();
    subscribeConfig();
    subscribeChat();
  }, 100);

  // === 페이지 로드(새로고침 포함) 시마다 누적 시청자수 +1 ===
  setTimeout(async () => {
    try {
      const targetLiveId = LIVE_ID || 'live01';
      if (!db) return;

        const { data, error } = await db
          .from('live_control')
          .select('cum_viewers, viewers, status')
          .eq('live_id', targetLiveId)
          .maybeSingle();

        if (data) {
          const newCum = (parseInt(data.cum_viewers) || 0) + 1;
          const updateData = { cum_viewers: newCum };
          if (data.status === 'ON') {
            updateData.viewers = (parseInt(data.viewers) || 0) + 1;
          }
          await db
            .from('live_control')
            .update(updateData)
            .eq('live_id', targetLiveId);
        }
      } catch (e) {
        console.warn('Viewer count increment failed:', e);
      }
    }, 800);

  function loadLiveConfig() {
    try {
      const c = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`));
      if (c) {
        const overlay = document.getElementById('thumbnail-overlay');

        // 라이브 상태 변경 확인 (streamUrl 변경 또는 isLive 변경)
        if (c.streamUrl && (window.__lastStreamUrl !== c.streamUrl || window.__lastIsLive !== c.isLive)) {
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
        if (titleEl) titleEl.textContent = c.title;
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
          if (!c.isLive) {
            startText.textContent = '라이브가 종료되었습니다.';
          } else {
            startText.textContent = '';
          }
        }

        if (brandNameEl && c.brandName) brandNameEl.textContent = c.brandName;
        const brandLogo = document.querySelector('.brand-logo');
        if (brandLogo && c.logoUrl) brandLogo.src = c.logoUrl;
        const viewCountWrapper = document.querySelector('.view-count');
        if (viewCountWrapper) {
          viewCountWrapper.style.display = (c.showViewers === false) ? 'none' : '';
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

        // ── 채팅 활성/비활성 처리 ──────────────────────────────
        const chatInputEl = document.getElementById('chat-input');
        const btnSendEl = document.getElementById('btn-send');
        if (chatInputEl && btnSendEl) {
          if (c.isLive) {
            // 라이브 중 → 채팅 활성화
            chatInputEl.disabled = false;
            chatInputEl.placeholder = '실시간 채팅에 참여하세요...';
            chatInputEl.style.opacity = '1';
            chatInputEl.style.cursor = '';
            btnSendEl.disabled = false;
            btnSendEl.style.opacity = '1';
            btnSendEl.style.cursor = '';
          } else {
            // 방송 전 → 채팅 비활성화
            chatInputEl.disabled = true;
            chatInputEl.placeholder = '방송 시작 후 채팅이 활성화됩니다';
            chatInputEl.style.opacity = '0.45';
            chatInputEl.style.cursor = 'not-allowed';
            btnSendEl.disabled = true;
            btnSendEl.style.opacity = '0.45';
            btnSendEl.style.cursor = 'not-allowed';
          }
        }
      }
    } catch (e) { }
  }

  function loadLiveStats() {
    try {
      const c = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`)) || {};
      const s = JSON.parse(localStorage.getItem(`ryzin_live_stats_${LIVE_ID}`));
      
      const viewCountEl = document.getElementById('view-count');
      if (!viewCountEl) return;

      const isLive = c.isLive;
      const isShowViewers = c.showViewers !== false;

      if (!isShowViewers) {
        viewCountEl.style.display = 'none';
        return;
      }
      viewCountEl.style.display = 'flex';

      if (!isLive) {
        // 대기 화면일 때는 "N명 대기중" 노출
        const viewers = s ? (parseInt(s.viewers) || 0) : 0;
        viewCountEl.textContent = viewers.toLocaleString() + '명 대기중';
      } else if (s) {
        // 라이브 중일 때는 [누적시청자수 + 실시간시청자수] 가산하여 노출
        const total = (parseInt(s.cumViewers) || 0) + (parseInt(s.viewers) || 0);
        viewCountEl.textContent = total.toLocaleString() + '명 시청중';
      }
    } catch (e) { }
  }

  let rollingInterval = null;

  function loadLiveProducts() {
    try {
      const p = JSON.parse(localStorage.getItem(`ryzin_live_products_${LIVE_ID}`));
      if (p && Array.isArray(p)) {
        const modalProductsList = document.getElementById('modal-products-list');
        modalProductsList.innerHTML = '';
        const now = Date.now();
        
        // 롤링 배너에 노출될 수 있는 유효한 상품 목록 필터링
        const activeProducts = p.filter(item => {
          const isDealActive = item.dealEndTime && item.dealEndTime > now;

          // A. 좋아요 목표 수가 설정되어 있는 상품인 경우 -> 깜짝딜 활성 시에만 노출
          if (item.targetLikes && parseInt(item.targetLikes) > 0) {
            return isDealActive;
          }

          // B. 어드민에서 "평소 숨김" 체크를 해둔 상품인 경우 -> 깜짝딜 활성 시에만 노출
          if (item.hideByDefault === true || item.hideByDefault === 'true') {
            return isDealActive;
          }

          // C. 깜짝딜 기간이 설정되었으나 이미 만료된 상품인 경우 -> 미노출
          if (item.dealEndTime && item.dealEndTime > 0 && now >= item.dealEndTime) {
            return false;
          }

          // 일반 상품은 상시 노출
          return true;
        });

        // 1. 기존 모달 리스트 렌더링
        activeProducts.forEach(item => {
          const el = document.createElement('a');
          el.href = item.url || "#";
          el.className = 'product-card';
          let priceHtml = '';
          const currentPriceStr = item.price ? item.price.toString().replace(/[^0-9]/g, '') : '';
          const normalPriceStr = item.normalPrice ? item.normalPrice.toString().replace(/[^0-9]/g, '') : '';

          if (currentPriceStr) {
            const current = Number(currentPriceStr);
            let rateHtml = '';
            let rate = parseInt(item.discountRate) || 0;
            if (!rate && normalPriceStr) {
              const normal = Number(normalPriceStr);
              if (normal > current) {
                rate = Math.round(((normal - current) / normal) * 100);
              }
            }
            if (rate > 0) {
              rateHtml = `<span class="discount-rate" style="color:#ef4444; font-weight:800; font-size:15px; margin-right:6px;">${rate}%</span>`;
            }
            priceHtml = `${rateHtml}<span class="discounted-price" style="font-weight:800; color:#e50914; font-size:15px;">${current.toLocaleString()}원</span><span class="live-benefit-tag" style="background:#fff1f2; border:1.5px solid #ffe4e6; color:#f43f5e; font-size:10px; font-weight:700; padding:2px 6px; border-radius:6px; margin-left:6px; vertical-align:middle; display:inline-block; line-height:1.2;">라이브 혜택가</span>`;
          }
          el.innerHTML = `<img src="${item.image}" alt="product" class="product-image"><div class="product-info"><div class="product-name">${item.dealEndTime && item.dealEndTime > Date.now() ? '<span style="color:#e11d48; font-weight:800; margin-right:4px;">[깜짝딜]</span>' : ''}${item.name}</div><div class="product-price">${priceHtml}</div></div>`;
          el.addEventListener('click', async (e) => {
            const currentConfig = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`) || '{}');
            if (!currentConfig.isLive) {
              e.preventDefault();
              alert('라이브 방송 중에만 구매 가능합니다.');
              return;
            }
            if (item.url === '__LEAD_FORM__') {
              e.preventDefault();
              openLeadModal(item.name);
              // don't return, let it sync clicks!
            } else if (!item.url || item.url === '#') {
              e.preventDefault();
            } else {
              el.target = '_blank';
            }
            try {
              const targetLiveId = LIVE_ID || 'live01';
              if (!targetLiveId || !db) return;

              const { data, error } = await db
                .from('live_control')
                .select('products')
                .eq('live_id', targetLiveId)
                .maybeSingle();

              if (data && data.products) {
                const remoteProducts = typeof data.products === 'string' ? JSON.parse(data.products) : data.products;
                const targetProd = remoteProducts.find(p => p.name === item.name);
                if (targetProd) {
                  targetProd.clicks = (parseInt(targetProd.clicks) || 0) + 1;
                  localStorage.setItem(`ryzin_live_products_${LIVE_ID}`, JSON.stringify(remoteProducts));
                  await db
                    .from('live_control')
                    .update({ 
                      products: remoteProducts,
                      updated_at: new Date().toISOString()
                    })
                    .eq('live_id', targetLiveId);
                }
              }
            } catch (err) {
              console.warn('Product click sync failed', err);
            }
          });
          modalProductsList.appendChild(el);
        });

        // 2. 하단 플로팅 롤링 배너 렌더링
        const bottomBanner = document.getElementById('bottom-product-banner');
        const track = document.getElementById('banner-product-track');
        const moreCount = document.getElementById('banner-more-count');
        const chatSection = document.querySelector('.chat-section');

        if (bottomBanner && track && moreCount) {
          const pModal = document.getElementById('product-modal');
          const isModalOpen = pModal && !pModal.classList.contains('hidden');

          if (activeProducts.length === 0 || isModalOpen) {
            bottomBanner.style.display = 'none';
            if (chatSection) chatSection.classList.remove('banner-active');
          } else {
            bottomBanner.style.display = 'flex';
            if (chatSection) chatSection.classList.add('banner-active');
            moreCount.textContent = activeProducts.length;

            track.innerHTML = '';
            activeProducts.forEach((item) => {
              const card = document.createElement('a');
              card.href = item.url || "#";
              card.className = 'banner-product-card';
              
              const currentPriceStr = item.price ? item.price.toString().replace(/[^0-9]/g, '') : '';
              const normalPriceStr = item.normalPrice ? item.normalPrice.toString().replace(/[^0-9]/g, '') : '';
              const current = Number(currentPriceStr) || 0;
              
              let rate = parseInt(item.discountRate) || 0;
              if (!rate && normalPriceStr) {
                const normal = Number(normalPriceStr);
                if (normal > current) {
                  rate = Math.round(((normal - current) / normal) * 100);
                }
              }

              let rateHtml = '';
              if (rate > 0) {
                rateHtml = `<span class="banner-discount">${rate}%</span>`;
              }

              card.innerHTML = `
                <div class="banner-img-box">
                  <img src="${item.image}" alt="product">
                  <span class="banner-badge">특가</span>
                </div>
                <div class="banner-info-box">
                  <div class="banner-title">${item.dealEndTime && item.dealEndTime > Date.now() ? '<span style="color:#e11d48; font-weight:800; margin-right:4px;">[깜짝딜]</span>' : ''}${item.name}</div>
                  <div class="banner-price-row">
                    ${rateHtml}
                    <span class="banner-price">${current.toLocaleString()}원</span>
                  </div>
                </div>
              `;
              
              card.addEventListener('click', async (e) => {
                const currentConfig = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`) || '{}');
                if (!currentConfig.isLive) {
                  e.preventDefault();
                  alert('라이브 방송 중에만 구매 가능합니다.');
                  return;
                }
                if (item.url === '__LEAD_FORM__') {
                  e.preventDefault();
                  openLeadModal(item.name);
                } else if (!item.url || item.url === '#') {
                  e.preventDefault();
                } else {
                  card.target = '_blank';
                }
                try {
                  const targetLiveId = LIVE_ID || 'live01';
                  if (!targetLiveId || !db) return;

                  const { data, error } = await db
                    .from('live_control')
                    .select('products')
                    .eq('live_id', targetLiveId)
                    .maybeSingle();

                  if (data && data.products) {
                    const remoteProducts = typeof data.products === 'string' ? JSON.parse(data.products) : data.products;
                    const targetProd = remoteProducts.find(p => p.name === item.name);
                    if (targetProd) {
                      targetProd.clicks = (parseInt(targetProd.clicks) || 0) + 1;
                      localStorage.setItem(`ryzin_live_products_${LIVE_ID}`, JSON.stringify(remoteProducts));
                      await db
                        .from('live_control')
                        .update({ 
                          products: remoteProducts,
                          updated_at: new Date().toISOString()
                        })
                        .eq('live_id', targetLiveId);
                    }
                  }
                } catch (err) { }
              });

              track.appendChild(card);
            });

            // 여러 개일 경우 수직 롤링 타이머 셋업
            if (rollingInterval) clearInterval(rollingInterval);
            if (activeProducts.length > 1) {
              // Clone the first card for seamless infinite loop
              const firstCardClone = track.firstElementChild.cloneNode(true);
              track.appendChild(firstCardClone);
              
              let currentIdx = 0;
              rollingInterval = setInterval(() => {
                currentIdx++;
                track.classList.remove('no-transition');
                track.style.transform = `translateY(-${currentIdx * 72}px)`;
                
                if (currentIdx === activeProducts.length) {
                  // After transition ends, instantly reset to first item
                  setTimeout(() => {
                    track.classList.add('no-transition');
                    currentIdx = 0;
                    track.style.transform = 'translateY(0)';
                  }, 300); // matches the 0.3s CSS transition
                }
              }, 1500);
            } else {
              track.style.transform = 'translateY(0)';
            }
          }
        }
      }
    } catch (e) { }
  }

  // 초기 로드
  loadLiveConfig();
  loadLiveStats();
  loadLiveProducts();

  // 어드민 iframe에서 postMessage로 실시간 데이터 쏘는 것 수신
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'sync_preview') {
      if (e.data.config) localStorage.setItem(`ryzin_live_config_${LIVE_ID}`, JSON.stringify(e.data.config));
      if (e.data.stats) localStorage.setItem(`ryzin_live_stats_${LIVE_ID}`, JSON.stringify(e.data.stats));
      if (e.data.products) localStorage.setItem(`ryzin_live_products_${LIVE_ID}`, JSON.stringify(e.data.products));
      loadLiveConfig();
      loadLiveStats();
      loadLiveProducts();
    }
  });

  window.addEventListener('storage', (e) => {
    if (e.key === `ryzin_live_config_${LIVE_ID}`) loadLiveConfig();
    if (e.key === `ryzin_live_stats_${LIVE_ID}`) loadLiveStats();
    if (e.key === `ryzin_live_products_${LIVE_ID}`) loadLiveProducts();
    if (e.key === 'ryzin_admin_chat_trigger') {
      try {
        const msg = JSON.parse(e.newValue);
        if (msg) {
          const el = document.createElement('div');
          el.className = 'chat-msg admin-notice';
          el.innerHTML = `<span class="chat-name" style="color:#ffcc00;">[공지] ${msg.name}</span><span class="chat-text" style="font-weight:bold;">${msg.text}</span>`;
          chatMessages.appendChild(el);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      } catch (err) { }
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
    if (sideActions) sideActions.classList.toggle('chat-hidden');
    document.body.classList.toggle('ui-hidden');
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
  const bannerMoreBtn = document.getElementById('banner-more-btn');
  const bottomProductBanner = document.getElementById('bottom-product-banner');
  const chatSectionForModal = document.querySelector('.chat-section');

  const openProductModal = () => {
    if (productModal) productModal.classList.remove('hidden');
    if (bottomProductBanner) bottomProductBanner.style.display = 'none';
    if (chatSectionForModal) chatSectionForModal.classList.remove('banner-active');
  };

  const closeProductModal = () => {
    if (productModal) productModal.classList.add('hidden');
    // 모달이 완전히 화면 밖으로 퇴장(슬라이드 다운 300ms)한 뒤 시간차를 두고 상품 배너 복구
    setTimeout(() => {
      if (productModal && productModal.classList.contains('hidden')) {
        try {
          const p = JSON.parse(localStorage.getItem(`ryzin_live_products_${LIVE_ID}`));
          const now = Date.now();
          const activeProducts = (p && Array.isArray(p)) ? p.filter(item => {
            if (item.dealEndTime && item.dealEndTime > 0 && now >= item.dealEndTime) return false;
            return true;
          }) : [];

          if (activeProducts.length > 0) {
            if (bottomProductBanner) bottomProductBanner.style.display = 'flex';
            if (chatSectionForModal) chatSectionForModal.classList.add('banner-active');
          }
        } catch (e) {}
      }
    }, 300);
  };

  if (btnShop) {
    btnShop.addEventListener('click', openProductModal);
  }

  if (bannerMoreBtn) {
    bannerMoreBtn.addEventListener('click', openProductModal);
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeProductModal);
  }

  // 3. 채팅 로직 (더미)
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send');
  const nicknameModal = document.getElementById('nickname-modal');
  const chatSectionWrap = document.getElementById('chat-section-wrap');
  const nicknameInput = document.getElementById('nickname-input');
  const btnSetNickname = document.getElementById('btn-set-nickname');

  userNickname = localStorage.getItem('ryzin_nickname') || '';

  // 페이지 초기 로드 시 차단 여부 선제 적용
  setTimeout(() => {
    if (typeof checkUserBanStatus === 'function') checkUserBanStatus();
  }, 300);

  // 채팅 입력창은 항상 보여줌 (닉네임 여부와 무관)
  chatSectionWrap.style.display = 'block';

  // 닉네임 모달 열기 함수
  const openNicknameModal = () => {
    nicknameModal.style.display = 'flex';
    setTimeout(() => nicknameInput.focus(), 100);
  };

  // 채팅 구역 클릭 시 닉네임 없으면 무조건 모달 강제 팝업 (포커스 씹힘 방지)
  const handleChatInteract = (e) => {
    if (!userNickname) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      chatInput.blur();
      openNicknameModal();
    }
  };

  // 입력창 및 주변 구역 클릭/터치 시 닉네임 검사 인터셉터
  chatInput.addEventListener('click', handleChatInteract);
  chatInput.addEventListener('focus', handleChatInteract);
  if (chatSectionWrap) {
    chatSectionWrap.addEventListener('click', handleChatInteract);
  }

  // 전송 버튼 클릭 시 닉네임 없으면 모달 팝업, 있으면 채팅 전송!
  btnSend.addEventListener('click', (e) => {
    if (!userNickname) {
      handleChatInteract(e);
    } else {
      sendMessage();
    }
  });

  btnSetNickname.addEventListener('click', () => {
    const n = nicknameInput.value.trim();
    if (n) {
      userNickname = n;
      localStorage.setItem('ryzin_nickname', n);
      nicknameModal.style.display = 'none';
      if (typeof checkUserBanStatus === 'function') checkUserBanStatus();
      setTimeout(() => {
        if (chatInput && !chatInput.disabled) {
          chatInput.focus();
        }
      }, 100);
    }
  });

  nicknameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnSetNickname.click();
  });


  // 닉네임에서 이름 색상 및 말풍선 배경색 분리 헬퍼 함수
  function parseNick(rawNick) {
    if (!rawNick || typeof rawNick !== 'string') return { name: rawNick || '', color: '', bg: '' };
    if (rawNick.includes('|')) {
      const parts = rawNick.split('|');
      return { 
        name: parts[0], 
        color: parts[1] || '', 
        bg: parts[2] || '' 
      };
    }
    return { name: rawNick, color: '', bg: '' };
  }

  function addMessage(name, text, isAdmin = false, isHistory = false) {
    const parsed = parseNick(name);
    const displayName = parsed.name;
    const nameColor = parsed.color;
    const bgColor = parsed.bg;
    if (nameColor) isAdmin = true;

    const el = document.createElement('div');
    el.className = 'chat-msg' + (isAdmin ? ' me' : '');
    if (isHistory) el.style.opacity = '0.72';

    if (bgColor) {
      let finalBg = bgColor;
      if (bgColor.startsWith('#') && bgColor.length === 7) {
        finalBg = bgColor + 'b3';
      }
      el.style.backgroundColor = finalBg;
    }

    const colorStyle = nameColor ? ` style="color: ${nameColor};"` : '';
    el.innerHTML = `
      <span class="chat-name"${colorStyle}>${displayName}</span>
      <span class="chat-text">${text}</span>
    `;
    chatMessages.appendChild(el);
    if (!isHistory) chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // 사용자 메시지 전송
  let isChatSending = false;
  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || !userNickname || isChatSending) return;

    // 1. 차단 유저 실시간 검사
    const bans = (window.bannedUsers || '').split(',').map(u => u.trim()).filter(u => u);
    if (bans.includes(userNickname)) {
      alert('채팅이 제한된 사용자입니다.');
      chatInput.value = '';
      if (typeof checkUserBanStatus === 'function') checkUserBanStatus();
      return;
    }

    // 2. 금칙어 실시간 필터링 검사
    const badWords = (window.bannedWords || '').split(',').map(w => w.trim()).filter(w => w);
    for (const word of badWords) {
      if (text.includes(word)) {
        alert('금칙어 혹은 비속어가 포함되어 있어 전송할 수 없습니다.');
        chatInput.value = '';
        return;
      }
    }

    isChatSending = true;
    // 로컬에 먼저 보여주기
    addMessage(userNickname, text);
    mySentTexts.push(text);
    chatInput.value = '';

    // Supabase 'live_chats' 전송
    try {
      if (!db) return;
      const chatData = { 
        'live_id': LIVE_ID, 
        'created_at': new Date().getTime(), 
        'nickname': userNickname, 
        'content': text 
      };
      await db.from('live_chats').insert([chatData]);
    } catch (e) { console.warn(e); }
    finally { isChatSending = false; }
  }

  // 차단 상태 체크 및 입력 인풋 잠금(disabled) 제어
  window.checkUserBanStatus = function() {
    const currentNick = (userNickname || '').trim();
    const bans = (window.bannedUsers || '').split(',').map(u => u.trim()).filter(u => u);
    const inputEl = document.getElementById('chat-input');
    if (!inputEl) return;
    
    if (currentNick && bans.includes(currentNick)) {
      inputEl.disabled = true;
      inputEl.placeholder = '채팅이 제한된 사용자입니다.';
      inputEl.blur();
    } else {
      inputEl.disabled = false;
      inputEl.placeholder = '실시간 채팅에 참여하세요...';
    }
  };

  // 엔터 키 입력 시 모바일/PC 100% 호환 전송 보장
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!userNickname) {
        handleChatInteract(e);
        return;
      }
      sendMessage();
    }
  });



  // 4. 좋아요 버튼 연출 (Supabase 60초 배치 가산 및 로컬 보존 연동)
  const btnLike = document.getElementById('btn-like');
  const likeCountEl = document.getElementById('like-count');
  let likeCount = 0;
  let pendingLikeCount = parseInt(localStorage.getItem(`ryzin_pending_likes_${LIVE_ID}`)) || 0;

  try {
    const s = JSON.parse(localStorage.getItem(`ryzin_live_stats_${LIVE_ID}`));
    if (s && s.hearts !== undefined) {
      likeCount = parseInt(s.hearts) || 0;
    }
  } catch (e) {}

  if (btnLike && likeCountEl) {
    likeCount += pendingLikeCount;
    likeCountEl.textContent = likeCount.toLocaleString();

    // 60초(1분)마다 누적된 클릭 수를 Supabase DB에 일괄 가산(RPC 호출)
    setInterval(async () => {
      if (pendingLikeCount > 0 && db) {
        const sendVal = pendingLikeCount;
        pendingLikeCount = 0; // 전송 중 중복 연산 방지를 위해 선제 리셋
        localStorage.setItem(`ryzin_pending_likes_${LIVE_ID}`, 0);
        try {
          const { error } = await db.rpc('increment_hearts', {
            live_id_param: LIVE_ID,
            increment_val: sendVal
          });
          if (error) {
            pendingLikeCount += sendVal; // 실패 시 버퍼에 복원
            localStorage.setItem(`ryzin_pending_likes_${LIVE_ID}`, pendingLikeCount);
            console.warn('Hearts sync failed:', error);
          }
        } catch (err) {
          pendingLikeCount += sendVal;
          localStorage.setItem(`ryzin_pending_likes_${LIVE_ID}`, pendingLikeCount);
          console.warn(err);
        }
      }
    }, 60000);

    // 시각적 카운트 업 연출 유지
    setInterval(() => {
      likeCount += Math.floor(Math.random() * 3);
      likeCountEl.textContent = likeCount.toLocaleString();
    }, 4000);

    btnLike.addEventListener('click', () => {
      likeCount += 1;
      pendingLikeCount += 1; // 1분 배치 버퍼에 가산
      localStorage.setItem(`ryzin_pending_likes_${LIVE_ID}`, pendingLikeCount);
      likeCountEl.textContent = likeCount.toLocaleString();

      const rect = btnLike.getBoundingClientRect();

      // === [NEW] 조그마한 색폭죽 파티클 폭발 효과 추가 ===
      const particleCount = 8;
      const particleColors = ['#ff4081', '#ffea00', '#00e5ff', '#651fff', '#ff3d00', '#00e676'];
      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'like-particle';
        p.style.position = 'absolute';
        p.style.width = '6px';
        p.style.height = '6px';
        p.style.borderRadius = '50%';
        p.style.backgroundColor = particleColors[Math.floor(Math.random() * particleColors.length)];
        p.style.pointerEvents = 'none';
        p.style.zIndex = '9999';
        
        // 폭죽 시작 위치 (좋아요 버튼 중앙 부근)
        p.style.left = rect.left + (rect.width / 2) - 3 + 'px';
        p.style.top = rect.top + 10 + 'px';

        // 360도 방향으로 파바박 번지는 거리각 산출
        const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const distance = 30 + Math.random() * 40; // 30px ~ 70px 반경
        const px = Math.cos(angle) * distance;
        const py = Math.sin(angle) * distance - 15; // 살짝 공중으로 튀게

        p.style.setProperty('--px', px + 'px');
        p.style.setProperty('--py', py + 'px');
        p.style.animation = 'particleExplode 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards';

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
      }

      // === [NEW] 랜덤 믹스 엔진: 커스텀 이미지가 등록되어 있으면 85% 확률로 섞어서 띄움 ===
      let likeImgUrl = '';
      try {
        const c = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`));
        if (c && c.likeImageUrl) likeImgUrl = c.likeImageUrl;
      } catch (e) {}

      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.style.position = 'absolute';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '9999';

      const showCustomIcon = likeImgUrl && (Math.random() < 0.85);

      if (showCustomIcon) {
        // 85% 확률로 커스텀 PNG/GIF 애니메이션 이미지 발사
        heart.innerHTML = `<img src="${likeImgUrl}" style="width: 32px; height: 32px; object-fit: contain; filter: drop-shadow(0 3px 8px rgba(0,0,0,0.22));">`;
      } else {
        // 15% 확률로 다채로운 그라데이션 하트 랜덤 발사
        const colors = [
          ['#ff4081', '#ff1744'],
          ['#ff9100', '#ffea00'],
          ['#00e5ff', '#00e676'],
          ['#651fff', '#d500f9'],
          ['#ff3d00', '#ff9100'],
          ['#e040fb', '#00e5ff']
        ];
        const randGrad = colors[Math.floor(Math.random() * colors.length)];
        const gradId = `heart-grad-${Math.floor(Math.random() * 1000000)}`;

        heart.innerHTML = `
          <svg width="28" height="28" viewBox="0 0 24 24" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.2));">
            <defs>
              <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${randGrad[0]}" />
                <stop offset="100%" stop-color="${randGrad[1]}" />
              </linearGradient>
            </defs>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="url(#${gradId})"></path>
          </svg>
        `;
      }

      heart.style.left = rect.left + (rect.width / 2) - 14 + 'px';
      heart.style.top = rect.top + 'px';

      const randomX = (Math.random() - 0.5) * 120;
      const rot1 = (Math.random() - 0.5) * 45;
      const rot2 = (Math.random() - 0.5) * 90;
      const rot3 = (Math.random() - 0.5) * 140;

      heart.style.setProperty('--tx', randomX + 'px');
      heart.style.setProperty('--rot1', rot1 + 'deg');
      heart.style.setProperty('--rot2', rot2 + 'deg');
      heart.style.setProperty('--rot3', rot3 + 'deg');

      heart.style.animation = 'dynamicFloatUp 1.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards';
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1800);
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

  // === [NEW] 소통왕 당첨자 정보 입력 리스너 및 애니메이션 연계 ===
  window.__lastWinnerTimestamp = null;

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
    transform: translate(0, 0) scale(0.4) rotate(0deg); 
    opacity: 0; 
  }
  15% { 
    transform: translate(calc(var(--tx) * 0.15), -40px) scale(1.3) rotate(var(--rot1)); 
    opacity: 0.95; 
  }
  50% {
    transform: translate(calc(var(--tx) * 0.5), -120px) scale(1.1) rotate(var(--rot2)); 
    opacity: 0.85;
  }
  100% { 
    transform: translate(var(--tx), -260px) scale(0.6) rotate(var(--rot3)); 
    opacity: 0; 
  }
}
@keyframes toastFade {
  0% { opacity: 0; transform: translate(-50%, -20px); }
  15% { opacity: 1; transform: translate(-50%, 0); }
  85% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -20px); }
}
@keyframes particleExplode {
  0% {
    transform: translate(0, 0) scale(1.2);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--px), var(--py)) scale(0.2);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

// 깜짝딜 및 소통왕 당첨 실시간 동기화 1초 주기 감시 엔진
setInterval(() => {
  // 1. 깜짝딜 타이머 로직
  try {
    const p = JSON.parse(localStorage.getItem(`ryzin_live_products_${LIVE_ID}`));
    const timerEl = document.getElementById('surprise-deal-timer');
    const textEl = document.getElementById('surprise-deal-text');
    if (p && Array.isArray(p) && timerEl && textEl) {
      const now = Date.now();
      const activeDeals = p.filter(item => item.dealEndTime && item.dealEndTime > now).sort((a, b) => a.dealEndTime - b.dealEndTime);
      if (activeDeals.length > 0) {
        const deal = activeDeals[0];
        const diff = deal.dealEndTime - now;
        const m = Math.floor(diff / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        const dealText = deal.dealText || '깜짝딜 종료까지';
        textEl.textContent = `${dealText} ${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        if (timerEl.style.display === 'none') {
          timerEl.style.display = 'flex';
          loadLiveProducts();
        }
      } else {
        if (timerEl.style.display !== 'none') {
          timerEl.style.display = 'none';
          loadLiveProducts();
        }
      }
    }
  } catch (e) { }

  // 3. [NEW] 좋아요 수 달성 시 깜짝딜 자동 오픈 감시 로직
  try {
    const p = JSON.parse(localStorage.getItem(`ryzin_live_products_${LIVE_ID}`));
    const s = JSON.parse(localStorage.getItem(`ryzin_live_stats_${LIVE_ID}`));
    if (p && Array.isArray(p) && s && s.hearts !== undefined && db && !window.__triggeringSurpriseDeal) {
      const currentHearts = parseInt(s.hearts) || 0;
      const targetProduct = p.find(item => 
        item.targetLikes && 
        parseInt(item.targetLikes) > 0 && 
        currentHearts >= parseInt(item.targetLikes) && 
        (!item.dealEndTime || item.dealEndTime === 0)
      );

      if (targetProduct) {
        window.__triggeringSurpriseDeal = true;
        (async () => {
          try {
            const { data: row, error: selectErr } = await db
              .from('live_control')
              .select('products')
              .eq('live_id', LIVE_ID)
              .maybeSingle();

            if (!selectErr && row && row.products) {
              const remoteProducts = typeof row.products === 'string' ? JSON.parse(row.products) : row.products;
              if (Array.isArray(remoteProducts)) {
                const remoteMatchIdx = remoteProducts.findIndex(rp => rp.name === targetProduct.name);
                if (remoteMatchIdx !== -1) {
                  const rp = remoteProducts[remoteMatchIdx];
                  if (!rp.dealEndTime || rp.dealEndTime === 0) {
                    const min = parseInt(rp.targetDealMin) || 10;
                    rp.dealEndTime = Date.now() + min * 60 * 1000;
                    rp.dealText = rp.dealText || `${parseInt(rp.targetLikes).toLocaleString()}개 좋아요 달성 특가!`;
                    
                    const { error: updateErr } = await db
                      .from('live_control')
                      .update({
                        products: remoteProducts,
                        updated_at: new Date().toISOString()
                      })
                      .eq('live_id', LIVE_ID);

                    if (!updateErr) {
                      if (typeof spawnConfettiContinuous === 'function') {
                        spawnConfettiContinuous(40);
                      }
                      if (typeof addMessage === 'function') {
                        addMessage('알림', `좋아요 ${parseInt(rp.targetLikes).toLocaleString()}개 달성! [${rp.name}] 깜짝딜이 오픈되었습니다.`, true, false);
                      }
                    }
                  }
                }
              }
            }
          } catch (err) {
            console.warn('Auto surprise deal trigger failed:', err);
          } finally {
            window.__triggeringSurpriseDeal = false;
          }
        })();
      }
    }
  } catch (err) { }

  // 2. [NEW] 소통왕/구매인증 당첨 배너 1초 감시 로직 (스톱워치 카운트다운 방식)
  try {
    const winnerEl = document.getElementById('winner-alert-overlay');
    const emojiSpan = document.getElementById('winner-emoji-span');
    const textSpan = document.getElementById('winner-text-span');

    if (window.__winnerCountdownSeconds > 0) {
      const wName = localStorage.getItem(`ryzin_winner_name_${LIVE_ID}`) || '당첨자';
      
      // 닉네임 문자열에 '|' 기호가 포함되어 있다면 [유형|닉네임] 파싱 처리
      const parts = wName.split('|');
      let awardType = '소통왕';
      let cleanNick = wName;
      if (parts.length > 1) {
        awardType = parts[0];
        cleanNick = parts[1];
      }

      if (winnerEl && emojiSpan && textSpan) {
        if (awardType === '구매인증') {
          emojiSpan.textContent = '🎁';
          textSpan.innerHTML = `구매인증 당첨: <span style="text-decoration:underline; font-weight:900; font-size:14px; margin-right:2px; color:#fff;">${cleanNick}</span>님! 축하드립니다! 🎉`;
        } else {
          emojiSpan.textContent = '🏆';
          textSpan.innerHTML = `소통왕 당첨: <span style="text-decoration:underline; font-weight:900; font-size:14px; margin-right:2px; color:#fff;">${cleanNick}</span>님! 축하드립니다! 🎉`;
        }

        if (winnerEl.style.display === 'none') {
          winnerEl.style.display = 'flex';
        }
      }
      
      // === [NEW] 꽃가루 폭죽 파티클은 배너 개시 후 정확히 2회만 팡 팡 쏟아지도록 설계 ===
      if (window.__confettiTriggerCount > 0) {
        spawnConfettiContinuous(35); // 35개의 화려한 묶음 폭발!
        window.__confettiTriggerCount -= 1;
      }

      window.__winnerCountdownSeconds -= 1; // 1초씩 차감
    } else {
      if (winnerEl && winnerEl.style.display !== 'none') {
        winnerEl.style.display = 'none';
      }
    }
  } catch (err) { }
}, 1000);

// Confetti 오색폭죽 지속 흩날림 함수 (안전 가드 및 입자수 동적 조절)
function spawnConfettiContinuous(count = 8) {
  const container = document.body;
  if (!container) return; // 철벽 가드

  const colors = ['#fcc419', '#ff8787', '#74c0fc', '#63e6be', '#da77f3', '#ff922b'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-20px';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const w = 5 + Math.random() * 6;
    const h = 5 + Math.random() * 6;
    p.style.width = w + 'px';
    p.style.height = h + 'px';

    const rotation = Math.random() * 360;
    p.style.transform = `rotate(${rotation}deg)`;

    const dur = 2.0 + Math.random() * 2.0;
    const delay = Math.random() * 0.5;

    p.style.transition = `transform ${dur}s linear ${delay}s, top ${dur}s linear ${delay}s, opacity ${dur}s ease-in ${delay}s`;
    container.appendChild(p);

    setTimeout(() => {
      p.style.top = '105vh';
      p.style.transform = `rotate(${rotation + (Math.random() - 0.5) * 720}deg) translate(${(Math.random() - 0.5) * 120}px, 0)`;
      p.style.opacity = '0';
    }, 30);

    setTimeout(() => p.remove(), (dur + delay) * 1000 + 100);
  }
}

// === [NEW] 당첨자 배송지 주소 입력 모달 제어 및 Supabase 제출 ===
const addrModal = document.getElementById('winner-address-modal');
const btnCloseAddr = document.getElementById('btn-close-address-modal');
const btnSubmitAddr = document.getElementById('btn-submit-address');
const winnerAlertOverlay = document.getElementById('winner-alert-overlay');

// 당첨 캡슐 배너 클릭 시, 본인인 경우 주소 수집 모달 수동 토글
if (winnerAlertOverlay) {
  winnerAlertOverlay.style.cursor = 'pointer';
  winnerAlertOverlay.addEventListener('click', () => {
    const currentNick = (userNickname || localStorage.getItem('ryzin_chat_nickname') || '').trim();
    const wName = localStorage.getItem(`ryzin_winner_name_${LIVE_ID}`) || '';
    const parts = wName.split('|');
    const cleanNick = (parts.length > 1 ? parts[1] : wName).trim();

    if (currentNick && cleanNick && currentNick === cleanNick) {
      if (addrModal) addrModal.style.display = 'flex';
    } else {
      alert('이 알림은 당첨자 본인 전용 배송 정보 입력 배너입니다. 🎉');
    }
  });
}

// 모달 닫기
if (btnCloseAddr) {
  btnCloseAddr.addEventListener('click', () => {
    if (addrModal) addrModal.style.display = 'none';
  });
}

// 배송지 정보 제출
if (btnSubmitAddr) {
  btnSubmitAddr.addEventListener('click', async () => {
    const nameVal = document.getElementById('address-name').value.trim();
    const phoneVal = document.getElementById('address-phone').value.trim();
    const addrVal = document.getElementById('address-main').value.trim();

    if (!nameVal || !phoneVal || !addrVal) {
      alert('수령인 이름, 전화번호, 상세 주소를 모두 입력해 주세요.');
      return;
    }

    btnSubmitAddr.disabled = true;
    btnSubmitAddr.textContent = '제출 처리 중...';

    const wName = localStorage.getItem(`ryzin_winner_name_${LIVE_ID}`) || '';
    const parts = wName.split('|');
    const cleanNick = parts.length > 1 ? parts[1] : wName;
    const rowTS = localStorage.getItem(`ryzin_winner_timestamp_${LIVE_ID}`) || '0';

    try {
      if (!db) throw new Error('Supabase 클라이언트가 초기화되지 않았습니다.');
      const { error } = await db.from('live_winners').insert({
        live_id: LIVE_ID,
        nickname: cleanNick,
        name: nameVal,
        phone: phoneVal,
        address: addrVal,
        created_at: new Date().toISOString()
      });

      if (error) throw error;

      // 성공 플래그 셋
      localStorage.setItem(`ryzin_submitted_winner_${LIVE_ID}_` + rowTS, 'true');
      alert('🎉 배송 정보가 성공적으로 제출되었습니다. 감사합니다!');
      if (addrModal) addrModal.style.display = 'none';
    } catch (err) {
      alert('제출 도중 에러가 발생했습니다: ' + err.message);
    } finally {
      btnSubmitAddr.disabled = false;
      btnSubmitAddr.textContent = '배송 정보 제출하기';
    }
  });
}


// --- 상담문의 (리드 폼) 관련 로직 ---
const leadModal = document.getElementById('lead-form-modal');
const btnCloseLead = document.getElementById('btn-close-lead-modal');
const btnSubmitLead = document.getElementById('btn-submit-lead');

if (btnCloseLead && leadModal) {
  btnCloseLead.addEventListener('click', () => {
    leadModal.style.display = 'none';
  });
}

function openLeadModal(productName) {
  if (leadModal) {
    leadModal.style.display = 'flex';
    leadModal.dataset.productName = productName || '상담 문의 남기기';
    const titleSpan = leadModal.querySelector('#lead-modal-title span');
    if (titleSpan) titleSpan.textContent = productName || '상담 문의 남기기';
    document.getElementById('lead-name').value = '';
    document.getElementById('lead-phone').value = '';
  }
}

if (btnSubmitLead) {
  btnSubmitLead.addEventListener('click', async () => {
    const nameVal = document.getElementById('lead-name').value.trim();
    const phoneVal = document.getElementById('lead-phone').value.trim();
    if (!nameVal || !phoneVal) {
      alert('이름과 전화번호를 모두 입력해 주세요.');
      return;
    }
    btnSubmitLead.disabled = true;
    btnSubmitLead.textContent = '제출 처리 중...';

    try {
      if (!db) throw new Error('Supabase 클라이언트가 초기화되지 않았습니다.');
      const { error } = await db.from('live_leads').insert({
        live_id: LIVE_ID,
        name: nameVal,
        phone: phoneVal,
        created_at: new Date().toISOString()
      });
      if (error) throw error;
      alert('✅ 상담 문의가 정상적으로 접수되었습니다!');
      if (leadModal) leadModal.style.display = 'none';
    } catch (err) {
      console.error(err);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      btnSubmitLead.disabled = false;
      btnSubmitLead.textContent = '문의 접수하기';
    }
  });
}
