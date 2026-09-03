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
  let parsedLiveId = urlParams.get('id');
  if (!parsedLiveId) {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart && lastPart !== 'live' && lastPart !== 'embed.html' && lastPart !== 'index.html') {
      parsedLiveId = lastPart;
    }
  }
  LIVE_ID = window.INJECTED_LIVE_ID || parsedLiveId || 'PAZIW92';

  // [NEW] Embed/Iframe 모드 동적 크기 조절 헬퍼
  window.currentWidgetPosition = 'right';
  window.resizeParentIframe = function(expand) {
    const width = expand ? '440px' : '220px';
    const height = expand ? '780px' : '90px';
    const bottom = expand ? '12px' : '56px';
    const position = window.currentWidgetPosition || 'right';

    if (window.parent) {
      window.parent.postMessage({
        type: 'ryzin-widget-resize',
        expand: expand,
        width: width,
        height: height,
        bottom: bottom,
        position: position
      }, '*');
    }

    try {
      const myIframe = window.frameElement;
      if (myIframe) {
        myIframe.style.width = width;
        myIframe.style.height = height;
        myIframe.style.bottom = bottom;
        myIframe.style.top = 'auto';
        
        if (expand) {
          myIframe.style.borderRadius = '20px';
          myIframe.style.overflow = 'hidden';
          myIframe.style.border = '1px solid #e2e8f0';
          myIframe.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
        } else {
          myIframe.style.borderRadius = '0px';
          myIframe.style.overflow = 'visible';
          myIframe.style.border = 'none';
          myIframe.style.boxShadow = 'none';
        }

        if (position === 'left') {
          myIframe.style.left = '12px';
          myIframe.style.right = 'auto';
        } else {
          myIframe.style.right = '12px';
          myIframe.style.left = 'auto';
        }
      }
    } catch(e) {}
  };

  // [NEW] Embed/Iframe 모드에 따른 플로팅 배너 초기 활성화
  const isEmbedParam = urlParams.get('embed') === '1';
  const isWidgetParam = urlParams.get('widget') === '1';

  if (isEmbedParam || window.location.pathname.includes('embed.html')) {
    document.body.classList.add('embed-active-full');
    document.body.classList.remove('embed-mode');
  }

  if (isWidgetParam) {
    document.body.classList.add('embed-mode');
    resizeParentIframe(false); // 위젯 모드 크기로 초기화

    const banner = document.getElementById('live-floating-banner');
    const closeLiveBtn = document.getElementById('btn-close-live');
    
    if (banner) {
      // 깜빡임 방지를 위해 로컬스토리지 캐시에서 위젯 위치/이미지/문구 우선 적용
      try {
        const c = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`));
        if (c) {
          const bannerText = banner.querySelector('.ryzin-widget-title');
          if (bannerText) {
            bannerText.textContent = c.widgetText || '라이브 보기';
          }
          const isLeft = c.widgetPosition === 'left';
          banner.style.right = isLeft ? 'auto' : '16px';
          banner.style.left = isLeft ? '16px' : 'auto';
          const circle = banner.querySelector('.banner-circle');
          if (circle) {
            circle.style.borderRadius = '50px';
            circle.style.border = '1px solid #e2e8f0';
            circle.style.boxShadow = 'none';
            if (c.widgetImageUrl) {
              circle.style.backgroundImage = `url('${c.widgetImageUrl}')`;
              circle.style.backgroundSize = 'cover';
              circle.style.backgroundPosition = 'center';
              const badge = banner.querySelector('.ryzin-widget-badge');
              if (badge) badge.style.display = 'none';
              if (bannerText) bannerText.style.display = 'none';
            }
          }
          const closeBtn = banner.querySelector('#btn-close-widget');
          if (closeBtn) {
            closeBtn.style.left = isLeft ? 'auto' : '-4px';
            closeBtn.style.right = isLeft ? '-4px' : 'auto';
          }
        }
      } catch (e) {}

      banner.style.display = 'flex';

      // 닫기 버튼 클릭 처리 (이벤트 버블링 방지)
      const closeBtn = document.getElementById('btn-close-widget');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          banner.style.opacity = '0';
          banner.style.transform = 'scale(0.8)';
          setTimeout(() => {
            banner.remove();
            if (closeLiveBtn) closeLiveBtn.remove();
          }, 300);
        });
      }

      // 라이브 닫기(복귀) 버튼 이벤트
      if (closeLiveBtn) {
        closeLiveBtn.addEventListener('click', () => {
          // 1. 비디오 중지
          const video = document.getElementById('live-video');
          if (video) {
            video.pause();
          }

          // 2. 라이브 컨테이너 숨김 대신 100% 핏 보장
          document.body.classList.add('embed-mode');
          document.body.classList.remove('embed-active-full');

          // 3. 라이브 닫기 버튼 숨김
          closeLiveBtn.style.display = 'none';

          // 4. 배너 복원
          banner.style.display = 'flex';
          banner.style.opacity = '1';
          banner.style.transform = 'scale(1)';
          resizeParentIframe(false); // [NEW] 위젯 크기로 축소
        });
      }

      banner.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // 새 창으로 라이브 페이지 열기
        const liveUrl = `${window.location.origin}/live?id=${LIVE_ID}`;
        window.open(liveUrl, '_blank', 'width=400,height=700,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no');
      });
    }
  }

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
      } else {
        showInvalidLiveScreen();
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

      if (!error) {
        if (data) {
          applyLiveConfig(data);
        } else {
          showInvalidLiveScreen();
        }
      }
    } catch (e) {
      console.warn("Polling fallback failed:", e);
    }
  }, 1200);

  // 2. 실시간 라이브 제어 감지 설정
  function subscribeConfig() {
    if (!db) return;
    db.channel(`live-control-channel-${LIVE_ID}`)
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
        const chatSectionForModal = document.querySelector('.chat-section');
        if (chatSectionForModal) chatSectionForModal.classList.remove('banner-active');
      }
    }

    // [NEW] 채팅 금칙어 및 차단 유저 정보 전역 변수에 실시간 갱신
    window.bannedWords = row.banned_words || '';
    window.bannedUsers = row.banned_users || '';
    if (typeof checkUserBanStatus === 'function') {
      checkUserBanStatus();
    }

    const rawLogoUrl = row.profile_image || '';
    const showSplash = !rawLogoUrl.includes('#nosplash');
    
    // [NEW] 위젯 해시 파라미터 디코딩
    let widgetText = '라이브 보기';
    let widgetPosition = 'right';
    let widgetImageUrl = '';
    let standbyImageUrl = '';
    let useStandbyImage = false;
    
    const hashParts = rawLogoUrl.split('#');
    const cleanLogoUrl = hashParts[0];
    
    hashParts.slice(1).forEach(part => {
      if (part === 'nosplash') {
        // nosplash flag
      } else if (part.startsWith('widgetText=')) {
        widgetText = decodeURIComponent(part.replace('widgetText=', ''));
      } else if (part.startsWith('widgetPosition=')) {
        widgetPosition = part.replace('widgetPosition=', '');
      } else if (part.startsWith('widgetImageUrl=')) {
        widgetImageUrl = part.replace('widgetImageUrl=', '');
      } else if (part.startsWith('standbyImageUrl=')) {
        standbyImageUrl = decodeURIComponent(part.replace('standbyImageUrl=', ''));
      } else if (part.startsWith('useStandbyImage=')) {
        useStandbyImage = part.replace('useStandbyImage=', '') === 'true';
      }
    });
    window.currentWidgetPosition = widgetPosition;
    


    const config = {
      liveId: row.live_id || 'live01',
      brandName: row.title || 'Ryzin Corp',
      title: row.subtitle || '단독 특가 라이브 방송 중!',
      logoUrl: cleanLogoUrl || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
      streamUrl: row.stream_url || '',
      showViewers: row.show_viewers !== false,
      showSplash: showSplash,
      thumbnailUrl: row.thumbnail_url || '',
      liveStartTime: row.start_time || '',
      isLive: row.status === 'ON',
      likeImageUrl: row.like_image_url || '',
      widgetText: widgetText,
      widgetPosition: widgetPosition,
      widgetImageUrl: widgetImageUrl,
      standbyImageUrl: standbyImageUrl,
      useStandbyImage: useStandbyImage
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
        .limit(300);

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
    db.channel(`live-chats-channel-${LIVE_ID}`)
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
        const standbyOverlay = document.getElementById('standby-overlay');
        const standbyImg = document.getElementById('standby-img');

        // ── 방송 진행 중 예비 썸네일 오버레이 제어 (ON 설정 시 표시) ──
        if (c.useStandbyImage && c.standbyImageUrl && c.standbyImageUrl.trim()) {
          if (standbyOverlay && standbyImg) {
            standbyImg.src = c.standbyImageUrl.trim();
            standbyOverlay.style.display = 'flex';
          }
        } else {
          if (standbyOverlay) {
            standbyOverlay.style.display = 'none';
          }
        }

        // 라이브 상태 변경 확인 (streamUrl 변경 또는 isLive 변경)
        if (c.streamUrl && (window.__lastStreamUrl !== c.streamUrl || window.__lastIsLive !== c.isLive)) {
          window.__lastStreamUrl = c.streamUrl;
          window.__lastIsLive = c.isLive;
          playStreamUrl(c.streamUrl, c.isLive);
        }
        const titleEl = document.querySelector('.broadcast-title');
        if (titleEl) titleEl.textContent = c.title;
        const brandNameEl = document.querySelector('.brand-name');

        // 썸네일 및 시작 시간 적용
        const thumbImg = document.getElementById('thumbnail-img');
        const startText = document.getElementById('live-start-text');

        if (!c.isLive) {
          // [방송 대기/종료 상태] 썸네일 오버레이 활성화
          if (overlay) {
            overlay.style.display = 'flex';
            overlay.classList.remove('hidden');
          }
          if (thumbImg) {
            if (c.thumbnailUrl && c.thumbnailUrl.trim()) {
              thumbImg.src = c.thumbnailUrl.trim();
              thumbImg.style.display = 'block';
            } else {
              thumbImg.style.display = 'none';
            }
          }
        } else {
          // [방송 진행 중] 썸네일 오버레이 숨김
          if (overlay) {
            overlay.style.display = 'none';
            overlay.classList.add('hidden');
          }
        }

        // [NEW] 라이브 위젯 UI 업데이트 (위치, 이미지, 문구)
        const banner = document.getElementById('live-floating-banner');
        if (banner) {
          // 1. 문구 적용
          const bannerText = banner.querySelector('.ryzin-widget-title');
          if (bannerText) {
            bannerText.textContent = c.widgetText || '라이브 보기';
          }

          // 2. 위치 적용 (좌측 vs 우측)
          const isLeft = c.widgetPosition === 'left';
          window.currentWidgetPosition = c.widgetPosition;
          
          const container = document.querySelector('.live-container');
          const isEmbedPage = window.location.pathname.includes('embed.html');
          const isViewFullMode = new URLSearchParams(window.location.search).get('view') === 'full';
          const isClosed = !isEmbedPage && !isViewFullMode && container && (container.style.display === 'none' || window.getComputedStyle(container).display === 'none');
          if (isClosed && !document.body.classList.contains('embed-active-full')) {
            resizeParentIframe(false);
          }
          
          banner.style.right = isLeft ? 'auto' : '16px';
          banner.style.left = isLeft ? '16px' : 'auto';

          const circle = banner.querySelector('.banner-circle');
          if (circle) {
            circle.style.borderRadius = '50px';
            circle.style.border = '1.5px solid rgba(255,255,255,0.18)';
            circle.style.boxShadow = 'none';

            // 3. 이미지 적용
            const badge = banner.querySelector('.ryzin-widget-badge');
            if (c.widgetImageUrl) {
              circle.style.backgroundImage = `url('${c.widgetImageUrl}')`;
              circle.style.backgroundSize = 'cover';
              circle.style.backgroundPosition = 'center';
              if (badge) badge.style.display = 'none';
              if (bannerText) bannerText.style.display = 'none';
            } else {
              circle.style.backgroundImage = 'none';
              circle.style.backgroundColor = '#0f172a';
              if (badge) badge.style.display = 'inline-flex';
              if (bannerText) {
                bannerText.style.display = 'block';
                bannerText.style.color = '#ffffff';
              }
            }
          }

          // 4. 닫기(X) 버튼 위치 보정
          const closeBtn = banner.querySelector('#btn-close-widget');
          if (closeBtn) {
            closeBtn.style.left = isLeft ? 'auto' : '-4px';
            closeBtn.style.right = isLeft ? '-4px' : 'auto';
          }
        }




        // 카운트다운 타이머 관련 전역 변수 해제 (중복 방지)
        if (window.liveCountdownInterval) {
          clearInterval(window.liveCountdownInterval);
        }

        if (c.liveStartTime && startText && !c.isLive) {
          let rawStart = String(c.liveStartTime).trim();
          if (rawStart.length === 16 && !rawStart.includes('Z') && !rawStart.includes('+')) {
            rawStart += ':00';
          }
          let targetTime = new Date(rawStart).getTime();
          if (isNaN(targetTime)) {
            targetTime = new Date(rawStart.replace('T', ' ')).getTime();
          }

          const updateCountdown = () => {
            const now = Date.now();
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

          if (!isNaN(targetTime) && targetTime > Date.now()) {
            updateCountdown();
            window.liveCountdownInterval = setInterval(updateCountdown, 1000);
          } else if (!isNaN(targetTime) && targetTime <= Date.now()) {
            startText.textContent = '곧 라이브가 시작됩니다!';
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

        // 라이브 배지 텍스트 업데이트
        const liveBadge = document.querySelector('.live-badge');
        if (liveBadge) {
          if (c.isLive) {
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
        // 일반 상품 목록 유무와 무관하게 무료나눔 상태 즉시 검사 & 동기화
        if (typeof checkAndShowGiveaway === 'function') {
          checkAndShowGiveaway(p);
        }
        const modalProductsList = document.getElementById('modal-products-list');
        modalProductsList.innerHTML = '';
        const now = Date.now();
        
        // 롤링 배너에 노출될 수 있는 유효한 상품 목록 필터링
        const activeProducts = p.filter(item => {
          // 무료나눔 전용 상품은 일반 상품 목록/하단 롤링 배너에서 완전 제외! (화면 중앙 이벤트 카드로만 노출)
          if (item.isFreeGiveaway === true || item.isFreeGiveaway === 'true') {
            return false;
          }

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
          const pNum = Number((item.price || '').toString().replace(/[^0-9]/g, ''));
          const npNum = Number((item.normalPrice || '').toString().replace(/[^0-9]/g, ''));

          if (pNum > 0) {
            priceHtml = `<span class="discounted-price" style="font-weight:800; color:#e50914; font-size:15px;">${pNum.toLocaleString()}원</span>`;
            if (npNum > pNum) {
              priceHtml += `<span style="font-size:11.5px; color:#94a3b8; text-decoration:line-through; margin-left:5px;">${npNum.toLocaleString()}원</span>`;
            }
            priceHtml += `<span class="live-benefit-tag" style="background:#fff1f2; border:1.5px solid #ffe4e6; color:#f43f5e; font-size:10px; font-weight:700; padding:2px 6px; border-radius:6px; margin-left:6px; vertical-align:middle; display:inline-block; line-height:1.2;">라이브 혜택가</span>`;
          } else if (item.price === '0' || item.price === 0) {
            priceHtml = `<span class="discounted-price" style="font-weight:800; color:#16a34a; font-size:15px;">무료나눔</span>`;
          } else {
            priceHtml = `<span style="font-size:13px; color:#94a3b8; font-weight:600;">가격 준비중</span>`;
          }
          el.innerHTML = `
            <img src="${item.image}" alt="product" class="product-image">
            <div class="product-info" style="flex:1; min-width:0;">
              <div class="product-name">${item.dealEndTime && item.dealEndTime > Date.now() ? '<span style="color:#e11d48; font-weight:800; margin-right:4px;">[깜짝딜]</span>' : ''}${item.name}</div>
              <div class="product-price">${priceHtml}</div>
            </div>
            <button type="button" class="btn-card-add-cart" style="background:#0f172a; color:#ffffff; border:none; border-radius:8px; padding:7px 12px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:4px; flex-shrink:0; align-self:center; transition:all 0.15s; outline:none; box-shadow:0 2px 6px rgba(15,23,42,0.15);" onmouseover="this.style.background='#1e293b'" onmouseout="this.style.background='#0f172a'">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>담기</span>
            </button>
          `;
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
              if (typeof addToCart === 'function') {
                addToCart(item);
              }
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
              
              const pNum = Number((item.price || '').toString().replace(/[^0-9]/g, ''));
              let priceDisplay = pNum > 0 ? `${pNum.toLocaleString()}원` : (item.price === '0' || item.price === 0 ? '무료' : '가격 준비중');

              card.innerHTML = `
                <div class="banner-img-box">
                  <img src="${item.image}" alt="product">
                  <span class="banner-badge">특가</span>
                </div>
                <div class="banner-info-box">
                  <div class="banner-title">${item.dealEndTime && item.dealEndTime > Date.now() ? '<span style="color:#e11d48; font-weight:800; margin-right:4px;">[깜짝딜]</span>' : ''}${item.name}</div>
                  <div class="banner-price-row">
                    <span class="banner-price">${priceDisplay}</span>
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
                  if (typeof addToCart === 'function') {
                    addToCart(item);
                  }
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
            if (typeof checkAndShowGiveaway === 'function') {
          checkAndShowGiveaway(p);
        }

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

  // 1. 비디오 스트리밍 설정 (HLS 및 YouTube 라이브 자동 지원)
  const video = document.getElementById('live-video');
  const savedConfig = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`) || '{}');
  const initialStreamUrl = savedConfig.streamUrl || 'https://ib3fjwlmgu0bwksrq8ao15010.edge.naverncp.com/live/video/ls-20260701130603-WkL1g/1080p-16-9/playlist.m3u8';

  if (Hls.isSupported()) {
    window.hlsInstance = new Hls({ lowLatencyMode: true });
  }

  playStreamUrl(initialStreamUrl, savedConfig.isLive !== false);



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

  if (btnSetNickname && nicknameInput) {
    btnSetNickname.addEventListener('click', () => {
      const n = nicknameInput.value.trim();
      if (n) {
        userNickname = n;
        localStorage.setItem('ryzin_nickname', n);
        nicknameModal.style.display = 'none';
        if (typeof checkUserBanStatus === 'function') checkUserBanStatus();
        if (typeof window.updateCheckoutMemberUI === 'function') window.updateCheckoutMemberUI();
      }
    });
    nicknameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') btnSetNickname.click();
    });
  }

  // ── 아이디 / 닉네임 기반 간편 계정 및 배송지 자동 연동 ──────────────
  // 주문서 화면의 회원/비회원 상태 UI 갱신
  window.updateCheckoutMemberUI = function() {
    const memberBadge = document.getElementById('checkout-member-badge');
    const guestBox = document.getElementById('checkout-guest-box');
    const memberNameEl = document.getElementById('checkout-member-name');
    const memberSubEl = document.getElementById('checkout-member-sub');
    const nameInput = document.getElementById('checkout-name');
    const phoneInput = document.getElementById('checkout-phone');
    const addrInput = document.getElementById('checkout-address');

    const currentAcc = (userNickname || localStorage.getItem('ryzin_nickname') || '').trim();
    const avatarEl = document.getElementById('checkout-member-avatar');

    if (currentAcc) {
      if (memberBadge) memberBadge.style.display = 'none'; // 로그인됨/계정변경 박스 완전 숨김
      if (guestBox) guestBox.style.display = 'none';

      // 해당 계정에 저장된 배송 정보 불러오기
      try {
        const savedAddr = JSON.parse(localStorage.getItem(`ryzin_account_addr_${currentAcc}`) || 'null');
        const generalSaved = JSON.parse(localStorage.getItem('ryzin_saved_order_info') || 'null');
        let kakaoUserObj = null;
        try { kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}

        // 닉네임은 이름에 절대 올리지 않음 (실명이 없으면 무조건 빈칸으로 유지)
        const savedName = (savedAddr && savedAddr.name && savedAddr.name !== currentAcc) ? savedAddr.name
          : (generalSaved && generalSaved.name && generalSaved.name !== currentAcc) ? generalSaved.name
          : (kakaoUserObj && kakaoUserObj.name && kakaoUserObj.name !== currentAcc) ? kakaoUserObj.name : '';

        const savedPhone = (savedAddr && savedAddr.phone) || (generalSaved && generalSaved.phone) || (kakaoUserObj && kakaoUserObj.phone) || '';
        const savedAddress = (savedAddr && savedAddr.address) || (generalSaved && generalSaved.address) || '';

        if (nameInput) nameInput.value = savedName; // 실명이 없으면 빈칸 유지
        if (phoneInput && savedPhone) phoneInput.value = savedPhone;
        if (addrInput) addrInput.value = savedAddress;

        // 기본 주소와 상세 주소 인풋 분리 채움
        const baseInput = document.getElementById('checkout-base-address');
        const detailInput = document.getElementById('checkout-detail-address');
        if (baseInput && savedAddress) {
          baseInput.value = savedAddress;
        }
      } catch(e) {}
    } else {
      // 비회원 상태
      if (memberBadge) memberBadge.style.display = 'none';
      if (guestBox) guestBox.style.display = 'block';
    }
  };

  // 계정 변경 / 다른 아이디로 로그인
  window.switchAccount = function() {
    const modal = document.getElementById('nickname-modal');
    const input = document.getElementById('nickname-input');
    if (modal) {
      modal.style.display = 'flex';
      if (input) {
        input.value = userNickname || '';
        setTimeout(() => input.focus(), 100);
      }
    }
  };

  // ── 카카오 1초 간편 로그인 연동 ──────────────────────────
  window.KAKAO_JS_KEY = '95fa521ea12208ad849b0ce9bb64b19f';

  window.initKakaoSDK = function() {
    if (typeof Kakao !== 'undefined' && !Kakao.isInitialized() && window.KAKAO_JS_KEY) {
      try {
        Kakao.init(window.KAKAO_JS_KEY);
      } catch (e) {
        console.warn('Kakao SDK Init:', e);
      }
    }
  };
  window.initKakaoSDK();
  if (typeof restoreUserAddressFromDB === 'function') {
    restoreUserAddressFromDB();
  }
  if (typeof updateCartUI === 'function') {
    updateCartUI();
  }

  window.loginWithKakao = function(source = 'chat') {
    if (typeof syncCartStorage === 'function') syncCartStorage();
    if (typeof Kakao === 'undefined') {
      alert('카카오 SDK를 로딩 중입니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    if (!Kakao.isInitialized()) {
      try {
        Kakao.init(window.KAKAO_JS_KEY);
      } catch (e) {
        console.warn('Kakao init error:', e);
      }
    }

    const handleKakaoSuccess = function(authObj) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
          const kakaoId = String(res.id || '');
          const kakaoAccount = res.kakao_account || {};
          const profile = kakaoAccount.profile || {};
          // 회원명은 카카오 닉네임이 아닌 카카오 실명(name)만 적용하고 실명이 없으면 비워둠
          const realName = kakaoAccount.name || '';
          const nickname = profile.nickname || kakaoAccount.name || '카카오회원';
          let phone = kakaoAccount.phone_number || '';
          if (phone.startsWith('+82')) {
            phone = '0' + phone.replace('+82', '').trim().replace(/\s+/g, '-').replace(/--/g, '-');
          }
          const name = realName;

          userNickname = nickname;
          localStorage.setItem('ryzin_nickname', nickname);
          localStorage.setItem('ryzin_kakao_user', JSON.stringify({ id: kakaoId, nickname, name, phone }));

          // ── Supabase shop_users 테이블에 카카오 회원 자동 등록/동기화 ──
          const clientDb = db || window.supabaseClient;
          if (clientDb) {
            const userCode = 'KAKAO-' + kakaoId;
            const userEmail = phone || kakaoAccount.email || ('kakao_' + kakaoId + '@ryzin.com');
            const userAddress = '카카오 회원가입 (주소 미입력)';

            clientDb.from('shop_users')
              .select('id')
              .eq('user_code', userCode)
              .maybeSingle()
              .then(({ data: existUser, error: selectErr }) => {
                if (selectErr) {
                  console.warn('shop_users 조회 오류:', selectErr);
                  return;
                }
                if (!existUser) {
                  clientDb.from('shop_users').insert({
                    user_code: userCode,
                    name: realName,
                    email: userEmail,
                    points: 3000,
                    coupons_count: 1,
                    membership_active: true,
                    default_address: userAddress
                  }).then(({ error: insertErr }) => {
                    if (insertErr) console.warn('shop_users 신규 등록 오류:', insertErr);
                    else console.log('카카오 회원 신규 등록 완료:', userCode);
                  });
                } else {
                  clientDb.from('shop_users').update({
                    name: realName,
                    email: userEmail,
                    default_address: userAddress
                  }).eq('id', existUser.id).then(() => {});
                }
              }).catch(err => console.warn('shop_users 연동 예외:', err));
          }

          if (typeof window.updateCheckoutMemberUI === 'function') {
            window.updateCheckoutMemberUI();
          }

          const nicknameModal = document.getElementById('nickname-modal');
          if (nicknameModal) nicknameModal.style.display = 'none';

          if (source === 'chat') {
            if (typeof checkUserBanStatus === 'function') checkUserBanStatus();
            if (typeof addMessage === 'function') addMessage(nickname, '채팅에 입장했습니다.', false);
            const chatInput = document.getElementById('chat-input');
            if (chatInput && !chatInput.disabled) chatInput.focus();
          } else if (source === 'checkout') {
            // 주문정보 입력 시 번거로운 alert 모달창 삭제
          }

          // 비회원 시 담아둔 장바구니 복원 및 보존
          try {
            const storedCart = loadCartFromStorage();
            if (storedCart.length > 0) {
              cartItems = storedCart;
            }
          } catch(e) {}

          // 장바구니 담기 대기 상품이 있었다면 자동 합산
          if (window.__pendingCartItem) {
            const p = window.__pendingCartItem;
            window.__pendingCartItem = null;
            const exists = cartItems.find(item => item.name === p.name);
            if (exists) {
              exists.quantity = (exists.quantity || 1) + 1;
            } else {
              cartItems.push({ ...p, quantity: 1 });
            }
          }

          if (typeof updateCartUI === 'function') updateCartUI();
          if (typeof renderCartItems === 'function') renderCartItems();

          // 장바구니 클릭으로 로그인한 경우 로그인 후 장바구니 모달 자동 열기
          if (window.__openCartAfterLogin) {
            window.__openCartAfterLogin = false;
            if (typeof openCartModal === 'function') {
              openCartModal();
            }
          }
        },
        fail: function(err) {
          console.warn('Kakao User Profile Error:', err);
          alert('카카오 프로필 정보를 가져오지 못했습니다: ' + (err.msg || JSON.stringify(err)));
        }
      });
    };

    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      Kakao.Auth.login({
        throughTalk: isMobile,
        persistAccessToken: true,
        success: handleKakaoSuccess,
        fail: function(err) {
          console.warn('Kakao Login Error:', err);
          if (err && err.error === 'access_denied') return; // 사용자가 창을 닫은 경우
          const errDetail = (err && (err.error_description || err.msg || err.error)) ? String(err.error_description || err.msg || err.error) : JSON.stringify(err);
          alert('카카오 로그인 실패:\n' + errDetail + '\n\n※ 카카오 디벨로퍼스 콘솔의 [플랫폼 > Web 사이트 도메인]에 현재 접속 주소가 등록되어 있는지 확인해 주세요.');
        }
      });
    } catch(err) {
      console.error('Kakao login exception:', err);
      alert('카카오 로그인 호출 중 오류가 발생했습니다: ' + err.message);
    }
  };

  // 주문서에서 로그인 모달 열기
  window.openLoginFromCheckout = function() {
    window.switchAccount();
  };


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
  // 0. [NEW] 선착순 무료나눔 실시간 시작/종료 1초 즉시 동기화 감시
  try {
    const p = JSON.parse(localStorage.getItem(`ryzin_live_products_${LIVE_ID}`));
    if (p && Array.isArray(p) && typeof checkAndShowGiveaway === 'function') {
      checkAndShowGiveaway(p);
    }
  } catch (e) {}

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

// --- 자동 PIP (Picture-in-Picture) 지원 로직 ---
const videoEl = document.getElementById('live-video');

if (videoEl && document.pictureInPictureEnabled && typeof videoEl.requestPictureInPicture === 'function') {
  // 사용자가 화면을 벗어날 때 (탭 전환 등) 자동 PIP 전환
  document.addEventListener('visibilitychange', async () => {
    try {
      if (document.visibilityState === 'hidden') {
        // 비디오가 재생 중이고 일시정지 상태가 아닐 때만 자동 PIP 시작
        if (videoEl.readyState >= 2 && !videoEl.paused) {
          await videoEl.requestPictureInPicture();
        }
      } else if (document.visibilityState === 'visible') {
        // 다시 페이지로 돌아오면 자동으로 PIP 해제
        if (document.pictureInPictureElement === videoEl) {
          await document.exitPictureInPicture();
        }
      }
    } catch (err) {
      console.warn('Auto Picture-in-Picture error:', err);
    }
  });
}

function showInvalidLiveScreen() {
  if (document.getElementById('invalid-live-overlay')) return;

  const video = document.getElementById('live-video');
  if (video) video.pause();

  const overlay = document.createElement('div');
  overlay.id = 'invalid-live-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0f172a;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
  `;

  overlay.innerHTML = `
    <svg style="width: 64px; height: 64px; margin-bottom: 24px; fill: #ef4444;" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
    <h2 style="font-size: 22px; font-weight: 700; margin: 0 0 12px 0; color: #ffffff;">존재하지 않거나 삭제된 라이브 방송입니다</h2>
    <p style="font-size: 14px; color: #94a3b8; margin: 0; line-height: 1.5;">요청하신 라이브 방송 정보를 찾을 수 없습니다.<br>입력하신 링크를 다시 확인해 주세요.</p>
  `;

  document.body.appendChild(overlay);
}

// ----------------------------------------------------
// [NEW] 장바구니 및 자체 결제 (PortOne) 연동 로직
// ----------------------------------------------------
// 장바구니 로컬스토리지 영구 보존 및 동기화
// ── 유튜브 스트리밍 자동 감지 및 재생 헬퍼 ──
function extractYoutubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|live\/|shorts\/))([\w-]{11})/i);
  return match ? match[1] : null;
}

// ── 스트리밍 소리 켜기 / 끄기 토글 제어 ──
let isStreamMuted = false;

window.toggleStreamSound = function() {
  isStreamMuted = !isStreamMuted;
  const video = document.getElementById('live-video');
  const ytPlayer = document.getElementById('youtube-player');
  const iconOff = document.getElementById('icon-sound-off');
  const iconOn = document.getElementById('icon-sound-on');

  if (iconOff && iconOn) {
    iconOff.style.display = isStreamMuted ? 'block' : 'none';
    iconOn.style.display = isStreamMuted ? 'none' : 'block';
  }
  const textStatus = document.getElementById('text-sound-status');
  if (textStatus) {
    textStatus.textContent = isStreamMuted ? '소리 켜기' : '소리 끄기';
  }

  if (video) {
    video.muted = isStreamMuted;
  }

  if (ytPlayer && ytPlayer.contentWindow) {
    const cmd = isStreamMuted ? 'mute' : 'unMute';
    ytPlayer.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: cmd
    }), '*');
    if (!isStreamMuted) {
      ytPlayer.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'setVolume',
        args: [100]
      }), '*');
    }
  }
};

// 사용자가 화면을 첫 터치/클릭할 때 강제 소리 ON 확실 보장
function forceSoundOn() {
  const video = document.getElementById('live-video');
  const ytPlayer = document.getElementById('youtube-player');
  if (video) {
    video.muted = false;
    video.volume = 1.0;
  }
  if (ytPlayer && ytPlayer.contentWindow) {
    ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
    ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
  }
}
['click', 'touchstart', 'touchend'].forEach(evtType => {
  document.addEventListener(evtType, forceSoundOn, { once: true });
});

function playStreamUrl(url, isLive) {
  const video = document.getElementById('live-video');
  const ytBox = document.getElementById('youtube-box');
  const ytPlayer = document.getElementById('youtube-player');
  const overlay = document.getElementById('thumbnail-overlay');
  if (!video) return;

  const ytId = extractYoutubeVideoId(url);

  if (ytId) {
    if (window.hlsInstance) {
      try { window.hlsInstance.stopLoad(); } catch(e) {}
    }
    video.pause();
    video.style.display = 'none';

    if (isLive) {
      // [방송 ON] 유튜브 영상 재생
      if (ytBox) ytBox.style.display = 'block';
      if (ytPlayer) {
        const targetSrc = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=0&playsinline=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&autohide=1&loop=1&playlist=${ytId}&enablejsapi=1&vq=hd1080`;
        [300, 800, 1500, 3000].forEach(delay => {
          setTimeout(() => {
            if (ytPlayer && ytPlayer.contentWindow) {
              ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
              ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
              // 모바일/임베드 화면에서도 최상위 화질(1080p) 강제 고정 요청
              ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQuality', args: ['hd1080'] }), '*');
              ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setPlaybackQualityRange', args: ['hd1080', 'highres'] }), '*');
            }
          }, delay);
        });
        if (!ytPlayer.src.includes(ytId)) {
          ytPlayer.src = targetSrc;
        }
      }
      if (overlay) {
        overlay.classList.add('hidden');
        overlay.style.display = 'none';
      }
    } else {
      // [방송 OFF - 라이브 종료] 유튜브 정지 및 종료 오버레이 표시
      if (ytBox) ytBox.style.display = 'none';
      if (ytPlayer) {
        ytPlayer.src = '';
      }
      if (overlay) {
        overlay.classList.remove('hidden');
        overlay.style.display = 'flex';
      }
      const startText = document.getElementById('live-start-text');
      if (startText) {
        startText.textContent = '라이브가 종료되었습니다.';
      }
    }
  } else {
    if (ytBox) ytBox.style.display = 'none';
    if (ytPlayer) {
      ytPlayer.src = '';
    }
    video.style.display = 'block';

    if (isLive) {
      if (overlay) overlay.classList.add('hidden');
      if (window.hlsInstance) {
        window.hlsInstance.loadSource(url);
        window.hlsInstance.attachMedia(video);
        window.hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play().catch(e => console.warn(e));
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.play().catch(e => console.warn(e));
      }
    } else {
      if (overlay) overlay.classList.remove('hidden');
      video.pause();
    }
  }
}

let cartItems = [];
function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem('ryzin_live_cart_items');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch(e) {}
  return [];
}
cartItems = loadCartFromStorage();

function syncCartStorage() {
  try {
    localStorage.setItem('ryzin_live_cart_items', JSON.stringify(cartItems));
  } catch(e) {}
}
const btnCart = document.getElementById('btn-cart');
const cartCountEl = document.getElementById('cart-count');
const cartBadgeDot = document.getElementById('cart-badge-dot');
const cartModal = document.getElementById('cart-modal');
const btnCloseCartModal = document.getElementById('btn-close-cart-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const btnCheckout = document.getElementById('btn-checkout');

const checkoutModal = document.getElementById('checkout-modal');
const btnCloseCheckoutModal = document.getElementById('btn-close-checkout-modal');
const btnSubmitPayment = document.getElementById('btn-submit-payment');

function updateCartUI() {
  syncCartStorage();
  const count = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  if (cartCountEl) {
    cartCountEl.textContent = count.toLocaleString();
  }
  if (cartBadgeDot) {
    cartBadgeDot.style.display = count > 0 ? 'block' : 'none';
  }
}

function addToCart(product) {
  const exists = cartItems.find(item => item.name === product.name);
  if (exists) {
    exists.quantity = (exists.quantity || 1) + 1;
  } else {
    cartItems.push({
      ...product,
      quantity: 1
    });
  }
  updateCartUI();
  
  // 하트 버튼과 유사한 바운스 애니메이션 효과
  if (btnCart) {
    btnCart.style.transition = 'transform 0.15s ease-out';
    btnCart.style.transform = 'scale(1.25)';
    setTimeout(() => {
      btnCart.style.transform = 'scale(1)';
    }, 150);
  }

  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed; bottom:150px; left:50%; transform:translateX(-50%); background:rgba(15,23,42,0.9); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.15); color:#fff; padding:12px 24px; border-radius:30px; font-size:14px; font-weight:600; z-index:99999; animation: fadeOut 2s forwards; text-align:center; box-shadow:0 8px 24px rgba(0,0,0,0.3);';
  toast.innerHTML = exists ? `장바구니 수량이 추가되었습니다. (총 ${exists.quantity}개)` : '장바구니에 담겼습니다.';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function openCartModal() {
  // 장바구니 클릭 시 로그인 체크 (미로그인 시 카카오 1초 시작하기 팝업)
  let kakaoUserObj = null;
  try { kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}
  const currentAcc = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();

  if (!kakaoUserObj && !currentAcc) {
    const modal = document.getElementById('nickname-modal');
    if (modal) {
      modal.style.display = 'flex';
      window.__openCartAfterLogin = true; // 로그인 완료 후 장바구니 자동 오픈 플래그
    } else if (typeof window.loginWithKakao === 'function') {
      window.loginWithKakao('cart');
    }
    return;
  }

  if (cartModal) {
    cartModal.style.display = 'flex';
    renderCartItems();
    if (typeof updateCartShippingPreview === 'function') {
      updateCartShippingPreview();
    }
  }
}

function renderCartItems() {
  if (!cartItemsContainer) return;
  // 항상 최신 로컬스토리지에서 장바구니 데이터 복원
  if (typeof loadCartFromStorage === 'function') {
    cartItems = loadCartFromStorage();
  }



  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align:center; padding:36px 20px; color:#94a3b8;">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:12px;">
          <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p style="font-size:14px; margin:0; font-weight:600; color:#64748b;">장바구니에 담긴 상품이 없습니다.</p>
      </div>
    `;
    if (cartTotalPrice) cartTotalPrice.textContent = '0원';
    if (btnCheckout) {
      btnCheckout.disabled = true;
      btnCheckout.style.opacity = '0.5';
      btnCheckout.style.cursor = 'not-allowed';
    }
    return;
  }

  if (btnCheckout) {
    btnCheckout.disabled = false;
    btnCheckout.style.opacity = '1';
    btnCheckout.style.cursor = 'pointer';
  }

  cartItems.forEach((item, index) => {
    const qty = Math.max(1, item.quantity || 1);
    item.quantity = qty;
    let unitPrice = 0;
    if (item.price) unitPrice = Number(item.price.toString().replace(/[^0-9]/g, ''));
    const itemTotal = unitPrice * qty;
    total += itemTotal;

    const isMin = qty <= 1;

    const div = document.createElement('div');
    div.style.cssText = 'display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid #f8fafc;';
    div.innerHTML = `
      <img src="${item.image}" alt="product" style="width:46px; height:46px; border-radius:8px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0;">
      <div style="flex:1; min-width:0;">
        <div style="font-size:13px; font-weight:700; color:#0f172a; margin-bottom:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.name}</div>
        <div style="display:flex; align-items:center; justify-content:space-between; margin-top:4px;">
          <!-- 미니멀 수량 조절 버튼 -->
          <div style="display:inline-flex; align-items:center; background:#f1f5f9; border-radius:6px; padding:1px;">
            <button class="btn-qty-minus" data-index="${index}" style="width:22px; height:22px; background:none; border:none; font-weight:700; font-size:13px; color:#475569; cursor:${isMin ? 'not-allowed' : 'pointer'}; opacity:${isMin ? '0.35' : '1'}; display:flex; align-items:center; justify-content:center; outline:none; border-radius:4px;" ${isMin ? 'disabled' : ''}>-</button>
            <span style="font-size:12px; font-weight:700; color:#0f172a; min-width:24px; text-align:center;">${qty}</span>
            <button class="btn-qty-plus" data-index="${index}" style="width:22px; height:22px; background:none; border:none; font-weight:700; font-size:13px; color:#475569; cursor:pointer; display:flex; align-items:center; justify-content:center; outline:none; border-radius:4px;">+</button>
          </div>
          <!-- 상품별 소계 금액 -->
          <div style="font-size:13px; font-weight:800; color:#0f172a;">${itemTotal.toLocaleString()}원</div>
        </div>
      </div>
      <button class="btn-remove-cart" data-index="${index}" style="background:none; border:none; color:#cbd5e1; font-size:16px; cursor:pointer; padding:4px; margin-left:2px; transition:color 0.15s;" title="삭제" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#cbd5e1'">✕</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  if (cartTotalPrice) cartTotalPrice.textContent = `${total.toLocaleString()}원`;
  if (typeof updateCartShippingPreview === 'function') {
    updateCartShippingPreview();
  }

  // 수량 감소 (최소 1 유지, 삭제는 우측 X 버튼으로만 가능)
  cartItemsContainer.querySelectorAll('.btn-qty-minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      if (cartItems[idx] && (cartItems[idx].quantity || 1) > 1) {
        cartItems[idx].quantity -= 1;
        updateCartUI();
        renderCartItems();
      }
    });
  });

  // 수량 증가
  cartItemsContainer.querySelectorAll('.btn-qty-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      if (cartItems[idx]) {
        cartItems[idx].quantity = (cartItems[idx].quantity || 1) + 1;
        updateCartUI();
        renderCartItems();
      }
    });
  });

  // 삭제 버튼 (명시적 삭제)
  cartItemsContainer.querySelectorAll('.btn-remove-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      const removedItem = cartItems[idx];
      if (removedItem) {
        // 무료나눔 상품 삭제 시 담기 기록도 초기화하여 깨끗이 삭제
        if (removedItem.isFreeGiveaway) {
          try {
            let myClaimed = JSON.parse(localStorage.getItem('ryzin_claimed_giveaways') || '[]');
            myClaimed = myClaimed.filter(id => String(id) !== String(removedItem.id));
            localStorage.setItem('ryzin_claimed_giveaways', JSON.stringify(myClaimed));
            localStorage.removeItem(`ryzin_claimed_time_${removedItem.id}`);
          } catch(err) {}
        }
      }
      cartItems.splice(idx, 1);
      syncCartStorage();
      updateCartUI();
      renderCartItems();

      // 라이브 화면 무료나눔 카드 상태도 즉시 새로고침 없이 갱신
      try {
        const allProds = JSON.parse(localStorage.getItem(`ryzin_live_products_${LIVE_ID}`) || '[]');
        if (typeof checkAndShowGiveaway === 'function') checkAndShowGiveaway(allProds);
      } catch(err) {}
    });
  });
}

if (btnCart) btnCart.addEventListener('click', openCartModal);
if (btnCloseCartModal) btnCloseCartModal.addEventListener('click', () => cartModal.style.display = 'none');

// 주문서 정보 자동 채우기 헬퍼 함수
// ── Supabase shop_users에서 사용자 배송지 및 정보 자동 복원 ──
async function restoreUserAddressFromDB() {
  try {
    let kakaoUserObj = null;
    try { kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}
    const currentAcc = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();
    const kakaoId = kakaoUserObj ? kakaoUserObj.id : null;
    const userCode = kakaoId ? ('KAKAO-' + kakaoId) : (currentAcc ? ('USER-' + currentAcc) : null);

    if (db && userCode) {
      const { data: user } = await db
        .from('shop_users')
        .select('*')
        .eq('user_code', userCode)
        .maybeSingle();

      if (user) {
        const name = user.name || '';
        let phone = user.email || '';
        let address = user.default_address || '';
        if (address.includes('카카오') || address.includes('주소 미입력')) address = '';

        if (address || phone || name) {
          const info = { name, phone, address };
          localStorage.setItem('ryzin_saved_order_info', JSON.stringify(info));
          if (currentAcc) {
            localStorage.setItem(`ryzin_account_addr_${currentAcc}`, JSON.stringify(info));
          }
          if (typeof updateCartShippingPreview === 'function') updateCartShippingPreview();
          if (typeof prefillCheckoutForm === 'function') prefillCheckoutForm();
        }
      }
    }
  } catch(err) {
    console.warn('사용자 배송 정보 복원 에러:', err);
  }
}

function prefillCheckoutForm() {
  if (typeof window.updateCheckoutMemberUI === 'function') {
    window.updateCheckoutMemberUI();
  }
}

// 주문서 정보 로컬 영구 보존 헬퍼 함수
// ── 카카오/다음 공식 주소 검색 API 연동 ──
window.openPostcodeSearch = function() {
  if (typeof daum === 'undefined' || !daum.Postcode) {
    alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.');
    return;
  }

  new daum.Postcode({
    oncomplete: function(data) {
      // 도로명 주소 또는 지번 주소 선택 결과
      let fullAddr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        if (extraAddr !== '') {
          fullAddr += ' (' + extraAddr + ')';
        }
      }

      const baseInput = document.getElementById('checkout-base-address');
      const detailInput = document.getElementById('checkout-detail-address');
      const hiddenInput = document.getElementById('checkout-address');

      if (baseInput) baseInput.value = fullAddr;
      if (hiddenInput) hiddenInput.value = fullAddr + (detailInput && detailInput.value.trim() ? ' ' + detailInput.value.trim() : '');

      // 주소 입력 후 즉시 로컬 저장 및 장바구니 갱신
      if (typeof saveCheckoutForm === 'function') saveCheckoutForm();
      if (typeof updateCartShippingPreview === 'function') updateCartShippingPreview();

      // 상세 주소 입력칸으로 포커스 이동
      if (detailInput) {
        detailInput.focus();
      }
    }
  }).open();
};

function updateFullAddressFromInputs() {
  const baseInput = document.getElementById('checkout-base-address');
  const detailInput = document.getElementById('checkout-detail-address');
  const hiddenInput = document.getElementById('checkout-address');

  const base = baseInput ? baseInput.value.trim() : '';
  const detail = detailInput ? detailInput.value.trim() : '';
  const full = (base + (detail ? ' ' + detail : '')).trim();

  if (hiddenInput) {
    hiddenInput.value = full;
  }
  return full;
}

function saveCheckoutForm() {
  try {
    const name = document.getElementById('checkout-name')?.value.trim() || '';
    const phone = document.getElementById('checkout-phone')?.value.trim() || '';
    if (typeof updateFullAddressFromInputs === 'function') updateFullAddressFromInputs();
    const address = document.getElementById('checkout-address')?.value.trim() || '';

    const currentAcc = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();

    // 1. 로그인된 아이디(닉네임) 계정에 배송 정보 영구 저장
    if (currentAcc && (name || phone || address)) {
      const key = `ryzin_account_addr_${currentAcc}`;
      localStorage.setItem(key, JSON.stringify({ name, phone, address }));
    }

    // 2. 일반 로컬 스토리지 백업
    if (name || phone || address) {
      localStorage.setItem('ryzin_saved_order_info', JSON.stringify({ name, phone, address }));
    }
  } catch(e) {}
}

// 입력 필드 실시간 저장 리스너 부착
// ── 전화번호 자동 하이픈(-) 포맷팅 함수 ──
function autoFormatPhoneNumber(val) {
  if (!val) return '';
  const clean = val.replace(/[^0-9]/g, '');
  if (clean.length < 4) return clean;
  if (clean.startsWith('02')) {
    if (clean.length < 6) return clean.replace(/(\d{2})(\d+)/, '$1-$2');
    if (clean.length < 10) return clean.replace(/(\d{2})(\d{3,4})(\d+)/, '$1-$2-$3');
    return clean.slice(0, 10).replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  if (clean.length < 7) return clean.replace(/(\d{3})(\d+)/, '$1-$2');
  if (clean.length < 11) return clean.replace(/(\d{3})(\d{3,4})(\d+)/, '$1-$2-$3');
  return clean.slice(0, 11).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
}

// 전화번호 입력창 실시간 하이픈 바인딩
['checkout-phone', 'lead-phone'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', (e) => {
      const formatted = autoFormatPhoneNumber(e.target.value);
      e.target.value = formatted;
    });
  }
});

['checkout-detail-address'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => {
      if (typeof updateFullAddressFromInputs === 'function') updateFullAddressFromInputs();
      if (typeof saveCheckoutForm === 'function') saveCheckoutForm();
      if (typeof updateCartShippingPreview === 'function') updateCartShippingPreview();
    });
  }
});

['checkout-name', 'checkout-phone', 'checkout-address'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', saveCheckoutForm);
    el.addEventListener('change', saveCheckoutForm);
  }
});

// ── 장바구니 하단 배송지 프리뷰 갱신 및 주소 변경 연동 ──
function updateCartShippingPreview() {
  const nameEl = document.getElementById('cart-shipping-name');
  const phoneEl = document.getElementById('cart-shipping-phone');
  const addrEl = document.getElementById('cart-shipping-address');
  const btnChange = document.getElementById('btn-change-shipping');
  if (!nameEl || !addrEl) return;

  const currentAcc = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();
  let savedAddr = null;
  try { savedAddr = JSON.parse(localStorage.getItem(`ryzin_account_addr_${currentAcc}`) || 'null'); } catch(e) {}
  let generalSaved = null;
  try { generalSaved = JSON.parse(localStorage.getItem('ryzin_saved_order_info') || 'null'); } catch(e) {}
  let kakaoUserObj = null;
  try { kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}

  const name = (savedAddr && savedAddr.name && savedAddr.name !== currentAcc) ? savedAddr.name
    : (generalSaved && generalSaved.name && generalSaved.name !== currentAcc) ? generalSaved.name
    : (kakaoUserObj && kakaoUserObj.name && kakaoUserObj.name !== currentAcc) ? kakaoUserObj.name : '';

  const phone = (savedAddr && savedAddr.phone) || (generalSaved && generalSaved.phone) || (kakaoUserObj && kakaoUserObj.phone) || '';
  const address = (savedAddr && savedAddr.address) || (generalSaved && generalSaved.address) || '';

  if (address) {
    nameEl.textContent = name ? name : '수령인 미입력';
    phoneEl.textContent = phone ? phone : '';
    addrEl.textContent = address;
    addrEl.title = address;
    if (btnChange) btnChange.textContent = '주소 변경';
  } else {
    nameEl.textContent = '배송지 미등록';
    phoneEl.textContent = '';
    addrEl.textContent = '주문 시 최초 1회 배송지를 입력합니다.';
    addrEl.title = '';
    if (btnChange) btnChange.textContent = '주소 입력';
  }
}

const btnChangeShipping = document.getElementById('btn-change-shipping');
if (btnChangeShipping) {
  btnChangeShipping.addEventListener('click', () => {
    if (cartModal) cartModal.style.display = 'none';
    if (checkoutModal) {
      checkoutModal.style.display = 'flex';
      prefillCheckoutForm();
    }
  });
}

if (btnCheckout) {
  btnCheckout.addEventListener('click', () => {
    if (cartItems.length === 0) return;
    if (cartModal) cartModal.style.display = 'none';

    // 저장된 주문/배송 정보 불러오기
    prefillCheckoutForm();

    const name = document.getElementById('checkout-name')?.value.trim() || '';
    const phone = document.getElementById('checkout-phone')?.value.trim() || '';
    if (typeof updateFullAddressFromInputs === 'function') updateFullAddressFromInputs();
    const address = document.getElementById('checkout-address')?.value.trim() || '';

    // 최초 1회 입력되어 이름, 연락처, 주소가 모두 온전히 있는 경우 -> 모달창 건너뛰고 즉시 결제 직행!
    if (name && phone && address) {
      if (btnSubmitPayment) {
        btnSubmitPayment.click();
      }
      return;
    }

    // 최초 1회이거나 필수 정보가 없는 경우에만 모달 표시
    if (checkoutModal) {
      checkoutModal.style.display = 'flex';
    }
  });
}

const btnKakaoFillCheckout = document.getElementById('btn-kakao-fill-checkout');
if (btnKakaoFillCheckout) {
  btnKakaoFillCheckout.addEventListener('click', () => {
    if (typeof window.loginWithKakao === 'function') {
      window.loginWithKakao('checkout');
    }
  });
}

if (btnCloseCheckoutModal) btnCloseCheckoutModal.addEventListener('click', () => {
  if (checkoutModal) checkoutModal.style.display = 'none';
});

if (btnSubmitPayment) {
  btnSubmitPayment.addEventListener('click', async () => {
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const address = document.getElementById('checkout-address').value.trim();

    if (!name || !phone || !address) {
      alert('주문 정보(이름, 전화번호, 배송지)를 모두 입력해 주세요.');
      return;
    }

    // 주문 정보 영구 저장
    saveCheckoutForm();

    // ── Supabase shop_users 테이블에 실명, 연락처, 배송지 주소 실시간 동기화 ──
    try {
      const clientDb = db || window.supabaseClient;
      if (clientDb) {
        let kakaoUserObj = null;
        try { kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}
        const kakaoId = kakaoUserObj ? kakaoUserObj.id : null;
        const currentAcc = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();
        const userCode = kakaoId ? ('KAKAO-' + kakaoId) : (currentAcc ? ('USER-' + currentAcc) : ('USER-' + phone.replace(/[^0-9]/g, '')));

        if (userCode) {
          clientDb.from('shop_users')
            .select('id')
            .eq('user_code', userCode)
            .maybeSingle()
            .then(({ data: existUser }) => {
              const userPayload = {
                name: name,
                email: phone,
                default_address: address,
                membership_active: true
              };
              if (existUser) {
                clientDb.from('shop_users').update(userPayload).eq('id', existUser.id).then(() => {});
              } else {
                clientDb.from('shop_users').insert({
                  user_code: userCode,
                  ...userPayload,
                  points: 3000,
                  coupons_count: 1
                }).then(() => {});
              }
            }).catch(e => console.warn('shop_users checkout sync error:', e));
        }
      }
    } catch(syncErr) {}

    let total = 0;
    cartItems.forEach(item => {
      const qty = item.quantity || 1;
      const unit = item.price ? Number(item.price.toString().replace(/[^0-9]/g, '')) : 0;
      total += unit * qty;
    });

    if (total <= 0) {
      alert('결제 금액이 0원입니다.');
      return;
    }

    const firstItem = cartItems[0];
    const firstItemQtyStr = (firstItem.quantity && firstItem.quantity > 1) ? ` (${firstItem.quantity}개)` : '';
    const orderName = cartItems.length > 1 
      ? `${firstItem.name}${firstItemQtyStr} 외 ${cartItems.length - 1}건` 
      : `${firstItem.name}${firstItemQtyStr}`;

    // 결제 진행 중 UI 상태 처리
    const originalBtnHtml = btnSubmitPayment.innerHTML;
    btnSubmitPayment.disabled = true;
    btnSubmitPayment.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
      </svg>
      <span>결제창 연결 중...</span>
    `;

    try {
      const returnUrlObj = new URL(window.location.href);
      returnUrlObj.searchParams.set('pay_success', '1');
      const returnUrl = returnUrlObj.toString();

      const response = await fetch('/api/payapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          goodname: orderName,
          price: total,
          recvphone: phone,
          buyerName: name,
          address: address,
          returnurl: returnUrl,
          var1: LIVE_ID || 'live01',
          var2: JSON.stringify(cartItems.map(i => ({ name: i.name, price: i.price })))
        })
      });

      const result = await response.json();

      if (result.success && result.payurl) {
        const orderData = {
          id: 'ord_' + Date.now(),
          live_id: LIVE_ID || 'live01',
          customer_name: name,
          customer_phone: phone,
          customer_address: address,
          total_amount: total,
          items: cartItems,
          payment_status: 'payapp_requested',
          pg_provider: 'payapp',
          pg_receipt_id: String(result.mul_no || ''),
          created_at: new Date().toISOString()
        };

        // 로컬 스토리지 즉시 캐시 백업 및 내 주문 히스토리 저장
        try {
          const localOrders = JSON.parse(localStorage.getItem(`ryzin_live_orders_${LIVE_ID || 'live01'}`) || '[]');
          localOrders.unshift(orderData);
          localStorage.setItem(`ryzin_live_orders_${LIVE_ID || 'live01'}`, JSON.stringify(localOrders));

          // 내 주문 전용 로컬 히스토리 누적 보존
          const myOrders = JSON.parse(localStorage.getItem('ryzin_my_orders_history') || '[]');
          myOrders.unshift(orderData);
          localStorage.setItem('ryzin_my_orders_history', JSON.stringify(myOrders));
        } catch(e) {}

        // Supabase DB에 주문건 적재 시도 (live_winners 기반 무설정 즉시 연동 + live_orders)
        if (db) {
          try {
            const orderMeta = JSON.stringify({
              type: 'order',
              goodname: orderName,
              total: total,
              items: cartItems,
              mul_no: String(result.mul_no || ''),
              status: 'payapp_requested',
              pg_provider: 'payapp'
            });

            await db.from('live_winners').insert({
              live_id: orderData.live_id,
              nickname: orderMeta,
              name: orderData.customer_name,
              phone: orderData.customer_phone,
              address: orderData.customer_address
            });
          } catch(e) {
            console.warn('live_winners 백업 적재 실패:', e);
          }

          try {
            await db.from('live_orders').insert({
              live_id: orderData.live_id,
              customer_name: orderData.customer_name,
              customer_phone: orderData.customer_phone,
              customer_address: orderData.customer_address,
              total_amount: orderData.total_amount,
              items: orderData.items,
              payment_status: orderData.payment_status,
              pg_provider: orderData.pg_provider,
              pg_receipt_id: orderData.pg_receipt_id
            });
          } catch(e) {
            console.warn('live_orders 전용 테이블 적재 생략:', e);
          }
        }

        // 장바구니 비우기 및 모달 닫기
        cartItems = [];
        syncCartStorage();
        updateCartUI();
        if (checkoutModal) checkoutModal.style.display = 'none';

        // 페이앱 결제 화면으로 이동
        window.location.href = result.payurl;
      } else {
        alert(result.message || '페이앱 결제 요청에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (err) {
      console.error('PayApp Call Error:', err);
      alert('결제 연동 중 오류가 발생했습니다: ' + err.message);
    } finally {
      btnSubmitPayment.disabled = false;
      btnSubmitPayment.innerHTML = originalBtnHtml;
    }
  });
}

// ----------------------------------------------------
// [NEW] 결제 완료 복귀 처리 (pay_success 파라미터 감지)
// ----------------------------------------------------
function checkPaymentSuccessOnReturn() {
  try {
    const url = new URL(window.location.href);
    const hasPaySuccess = url.searchParams.get('pay_success') === '1';
    const mulNo = url.searchParams.get('mul_no');

    if (hasPaySuccess || mulNo) {
      const completeModal = document.getElementById('payment-complete-modal');
      if (completeModal && hasPaySuccess) {
        completeModal.style.display = 'flex';
      }

      // 내 주문 히스토리 최신 주문 'paid'로 갱신
      try {
        const myOrders = JSON.parse(localStorage.getItem('ryzin_my_orders_history') || '[]');
        if (myOrders.length > 0) {
          if (mulNo) {
            const found = myOrders.find(o => String(o.pg_receipt_id) === String(mulNo));
            if (found) found.payment_status = 'paid';
            else myOrders[0].payment_status = 'paid';
          } else {
            myOrders[0].payment_status = 'paid';
          }
          localStorage.setItem('ryzin_my_orders_history', JSON.stringify(myOrders));
        }
      } catch(e) {}

      url.searchParams.delete('pay_success');
      url.searchParams.delete('mul_no');
      window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
    }
  } catch (e) {}
}

const btnClosePaymentComplete = document.getElementById('btn-close-payment-complete');
if (btnClosePaymentComplete) {
  btnClosePaymentComplete.addEventListener('click', () => {
    const completeModal = document.getElementById('payment-complete-modal');
    if (completeModal) completeModal.style.display = 'none';
  });
}

// 페이지 로드 시 결제 복귀 확인 실행
checkPaymentSuccessOnReturn();




// ----------------------------------------------------
// [NEW] 우측 상단 '내 주문' 모달 및 실시간 주문 내역 조회
// ----------------------------------------------------
window.openMyOrdersModal = async function() {
  const modal = document.getElementById('my-orders-modal');
  const listEl = document.getElementById('my-orders-list');
  const countText = document.getElementById('my-orders-count-text');
  if (!modal || !listEl) return;

  modal.style.display = 'flex';
  listEl.innerHTML = `
    <div style="text-align:center; padding:40px 20px; color:#94a3b8;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; margin-bottom:8px;">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
      </svg>
      <div style="font-size:13px; font-weight:600;">주문 내역을 불러오는 중...</div>
    </div>
  `;

  let orders = [];

  // 1. 로컬스토리지 내 주문 히스토리 수집
  try {
    const local = JSON.parse(localStorage.getItem('ryzin_my_orders_history') || '[]');
    if (Array.isArray(local)) orders = [...local];
  } catch(e) {}

  // 2. 고객 정보 확인 (전화번호, 이름, 카카오유저)
  let savedInfo = {};
  try { savedInfo = JSON.parse(localStorage.getItem('ryzin_saved_order_info') || '{}'); } catch(e) {}
  let kakaoUserObj = null;
  try { kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}
  
  const phone = (savedInfo.phone || (kakaoUserObj && kakaoUserObj.phone) || '').replace(/[^0-9]/g, '');
  const userName = (savedInfo.name || (kakaoUserObj && kakaoUserObj.name) || '').trim();

  // 3. Supabase live_orders 테이블과 통합 조회
  if (db) {
    try {
      const { data: dbOrders } = await db
        .from('live_orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);

      if (dbOrders && dbOrders.length > 0) {
        dbOrders.forEach(dbo => {
          const dboPhone = (dbo.customer_phone || '').replace(/[^0-9]/g, '');
          const isMyPhone = phone && dboPhone && (dboPhone === phone || dboPhone.endsWith(phone.slice(-8)));
          const isMyName = userName && dbo.customer_name && dbo.customer_name === userName;

          if ((isMyPhone || isMyName) && !orders.some(o => (o.pg_receipt_id && o.pg_receipt_id === dbo.pg_receipt_id) || o.id === dbo.id)) {
            orders.push(dbo);
          }
        });
      }
    } catch(err) {
      console.warn('DB 내 주문 조회 에러:', err);
    }
  }

  // 4. 페이앱 실시간 상태 동기화 (mul_no가 있는 주문들)
  const mulNos = orders.map(o => o.pg_receipt_id).filter(Boolean);
  if (mulNos.length > 0) {
    try {
      const checkRes = await fetch('/api/payapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cmd: 'check_orders', mul_nos: mulNos })
      });
      const checkJson = await checkRes.json();
      if (checkJson.success && checkJson.results) {
        orders.forEach(o => {
          if (o.pg_receipt_id && checkJson.results[o.pg_receipt_id]) {
            o.payment_status = checkJson.results[o.pg_receipt_id].status;
          }
        });
        // 최신 상태 로컬 저장 동기화
        try {
          localStorage.setItem('ryzin_my_orders_history', JSON.stringify(orders));
        } catch(e) {}
      }
    } catch(e) {
      console.warn('페이앱 실시간 상태 조회 실패:', e);
    }
  }

  // 결제 대기(미결제 건) 완전 제외 (오직 결제완료 및 결제취소 건만 노출)
  orders = orders.filter(o => {
    const st = o.payment_status;
    return st === 'paid' || st === '결제완료' || st === 'cancelled' || st === '결제취소';
  });

  // 최신순 정렬
  orders.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

  if (countText) {
    countText.textContent = `총 ${orders.length}건의 주문 내역이 있습니다.`;
  }

  if (orders.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; padding:48px 20px; color:#94a3b8;">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:12px;">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <p style="font-size:14px; font-weight:700; color:#475569; margin:0 0 4px 0;">주문 내역이 없습니다</p>
        <p style="font-size:12px; color:#94a3b8; margin:0;">라이브 특가 상품을 주문해 보세요!</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = orders.map((ord, idx) => {
    const isPaid = ord.payment_status === 'paid' || ord.payment_status === '결제완료';
    const isCancelled = ord.payment_status === 'cancelled' || ord.payment_status === '결제취소';
    const mulNo = ord.pg_receipt_id || '';
    
    let badgeHtml = '';
    if (isCancelled) {
      badgeHtml = '<span style="font-size:10.5px; font-weight:700; background:#fee2e2; color:#b91c1c; padding:3px 8px; border-radius:6px;">결제취소</span>';
    } else if (isPaid) {
      badgeHtml = '<span style="font-size:10.5px; font-weight:700; background:#dcfce7; color:#166534; padding:3px 8px; border-radius:6px;">결제완료</span>';
    }

    const dateStr = ord.created_at ? new Date(ord.created_at).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '-';
    const totalStr = (ord.total_amount || 0).toLocaleString();

    // 상품 목록 파싱
    let itemsList = [];
    if (Array.isArray(ord.items) && ord.items.length > 0) {
      itemsList = ord.items;
    } else if (typeof ord.items === 'string') {
      try { itemsList = JSON.parse(ord.items); } catch(e) {}
    }

    let itemsSummary = '';
    if (itemsList.length > 0) {
      const first = itemsList[0];
      itemsSummary = itemsList.length > 1 ? `${first.name} 외 ${itemsList.length - 1}건` : first.name;
    } else {
      itemsSummary = ord.goodname || '라이브 주문 상품';
    }

    // 상세 개별 품목 HTML
    const itemsDetailHtml = itemsList.length > 0 ? itemsList.map(item => {
      const unitPrice = item.price ? Number(item.price.toString().replace(/[^0-9]/g, '')) : 0;
      const qty = item.quantity || 1;
      const subTotal = (unitPrice * qty).toLocaleString();
      const imgTag = item.image ? `<img src="${item.image}" alt="thumb" style="width:36px; height:36px; border-radius:6px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0;">` : '';
      return `
        <div style="display:flex; align-items:center; gap:8px; padding:6px 0; border-bottom:1px solid #f1f5f9;">
          ${imgTag}
          <div style="flex:1; min-width:0;">
            <div style="font-size:12px; font-weight:700; color:#1e293b; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.name}</div>
            <div style="font-size:11px; color:#64748b;">${unitPrice.toLocaleString()}원 × ${qty}개</div>
          </div>
          <div style="font-size:12px; font-weight:800; color:#0f172a; flex-shrink:0;">${subTotal}원</div>
        </div>
      `;
    }).join('') : `<div style="font-size:12px; color:#64748b; padding:4px 0;">${itemsSummary}</div>`;

    return `
      <div class="my-order-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.03);">
        <!-- 카드 헤더 (클릭 시 아코디언 토글) -->
        <div onclick="toggleOrderDetail(${idx})" style="padding:12px 14px; background:#f8fafc; cursor:pointer; display:flex; flex-direction:column; gap:6px; border-bottom:1px solid #f1f5f9;" title="클릭하여 상세 상품 확인">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11.5px; color:#64748b; font-weight:600;">${dateStr}</span>
            <div style="display:flex; align-items:center; gap:6px;">
              ${badgeHtml}
              <span id="order-arrow-${idx}" style="font-size:11px; color:#94a3b8; font-weight:800; transition:transform 0.2s;">▼</span>
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <div style="font-size:13.5px; font-weight:800; color:#0f172a; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1;">${itemsSummary}</div>
            <div style="font-size:14.5px; font-weight:800; color:${isCancelled ? '#94a3b8' : '#0f172a'}; text-decoration:${isCancelled ? 'line-through' : 'none'}; flex-shrink:0;">${totalStr}원</div>
          </div>
        </div>

        <!-- 상세 상품 및 배송지 아코디언 영역 -->
        <div id="order-detail-${idx}" style="display:none; padding:12px 14px; background:#ffffff; flex-direction:column; gap:8px;">
          <div style="font-size:11.5px; font-weight:800; color:#475569; margin-bottom:2px;">주문 상세 상품</div>
          <div style="display:flex; flex-direction:column; margin-bottom:6px;">
            ${itemsDetailHtml}
          </div>

          <div style="background:#f8fafc; border:1px solid #f1f5f9; border-radius:10px; padding:9px 11px; font-size:11.5px; color:#475569; display:flex; flex-direction:column; gap:3px;">
            <div><span style="color:#94a3b8; font-weight:700;">수령인:</span> ${ord.customer_name || '-'} (${ord.customer_phone || '-'})</div>
            <div style="word-break:break-all;"><span style="color:#94a3b8; font-weight:700;">배송지:</span> ${ord.customer_address || '-'}</div>
            ${mulNo ? `<div style="font-size:10.5px; color:#94a3b8; margin-top:2px;">결제승인번호: ${mulNo}</div>` : ''}
          </div>

          <!-- 고객 직접 결제 취소 버튼 (결제완료 건만 노출) -->
          ${(isPaid && mulNo) ? `
            <div style="margin-top:4px; display:flex; justify-content:flex-end;">
              <button type="button" onclick="cancelMyOrder('${mulNo}', '${ord.id || ''}', event)"
                style="padding:6px 12px; background:#fff1f2; color:#e11d48; border:1px solid #fecdd3; border-radius:8px; font-size:11.5px; font-weight:700; cursor:pointer; transition:all 0.15s; outline:none;"
                onmouseover="this.style.background='#ffe4e6'" onmouseout="this.style.background='#fff1f2'">
                주문 결제 취소
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// 상단 내 주문 버튼 이벤트 연결
const btnOpenMyOrders = document.getElementById('btn-open-my-orders');
if (btnOpenMyOrders) {
  btnOpenMyOrders.addEventListener('click', openMyOrdersModal);
}

const btnCloseMyOrders = document.getElementById('btn-close-my-orders');
if (btnCloseMyOrders) {
  btnCloseMyOrders.addEventListener('click', () => {
    const modal = document.getElementById('my-orders-modal');
    if (modal) modal.style.display = 'none';
  });
}



// 주문 상세 상품 아코디언 토글
window.toggleOrderDetail = function(idx) {
  const detailEl = document.getElementById(`order-detail-${idx}`);
  const arrowEl = document.getElementById(`order-arrow-${idx}`);
  if (!detailEl) return;
  const isHidden = detailEl.style.display === 'none';
  detailEl.style.display = isHidden ? 'flex' : 'none';
  if (arrowEl) {
    arrowEl.textContent = isHidden ? '▲' : '▼';
  }
};

// 고객 직접 주문 취소 처리 함수
window.cancelMyOrder = async function(mulNo, orderId, evt) {
  if (evt) evt.stopPropagation();
  if (!mulNo) {
    alert('결제 번호를 찾을 수 없어 취소할 수 없습니다.');
    return;
  }

  if (!confirm('정말 주문 결제를 취소하시겠습니까?\n확인 시 즉시 카드 승인이 취소됩니다.')) {
    return;
  }

  const btn = evt ? evt.target : null;
  if (btn) {
    btn.disabled = true;
    btn.textContent = '취소 처리 중...';
  }

  try {
    const res = await fetch('/api/payapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cmd: 'cancel',
        mul_no: String(mulNo),
        cancelmemo: '고객 직접 주문 취소'
      })
    });

    const data = await res.json();
    if (data.success) {
      alert('결제가 정상적으로 취소되었습니다.');

      // 1. 로컬스토리지 내 주문 상태를 'cancelled'로 즉시 갱신
      try {
        const myOrders = JSON.parse(localStorage.getItem('ryzin_my_orders_history') || '[]');
        myOrders.forEach(o => {
          if (String(o.pg_receipt_id) === String(mulNo) || o.id === orderId) {
            o.payment_status = 'cancelled';
          }
        });
        localStorage.setItem('ryzin_my_orders_history', JSON.stringify(myOrders));
      } catch(e) {}

      // 2. 모달 다시 불러와서 최신 상태 반영
      if (typeof openMyOrdersModal === 'function') {
        openMyOrdersModal();
      }
    } else {
      alert(data.message || '결제 취소에 실패했습니다. 관리자에게 문의해 주세요.');
      if (btn) {
        btn.disabled = false;
        btn.textContent = '주문 결제 취소';
      }
    }
  } catch(err) {
    alert('취소 통신 중 오류가 발생했습니다: ' + err.message);
    if (btn) {
      btn.disabled = false;
      btn.textContent = '주문 결제 취소';
    }
  }
};



// ----------------------------------------------------
// [NEW] 화면 중앙 선착순 무료나눔 이벤트 및 플라잉 담기 애니메이션
// ----------------------------------------------------
let currentActiveGiveaway = null;

window.__userClosedGiveawayTime = window.__userClosedGiveawayTime || 0;

function checkAndShowGiveaway(productList) {
  if (!Array.isArray(productList)) return;
  const giveawayCard = document.getElementById('giveaway-overlay-card');
  if (!giveawayCard) return;

  // 무료나눔 상품 찾기
  const freeItem = productList.find(p => p.isFreeGiveaway === true || p.isFreeGiveaway === 'true');
  if (!freeItem) {
    giveawayCard.style.display = 'none';
    currentActiveGiveaway = null;
    return;
  }

  // 관리자가 명시적으로 '종료'한 경우만 닫음
  if (freeItem.isGiveawayActive === false || freeItem.isGiveawayActive === 'false') {
    giveawayCard.style.display = 'none';
    currentActiveGiveaway = null;
    return;
  }

  // 관리자가 활성화해둔 무료나눔 상품은 화면 중앙에 무조건 즉각 노출!
  giveawayCard.style.display = 'block';

  const stock = parseInt(freeItem.giveawayStock) || 5;
  const claimed = parseInt(freeItem.giveawayClaimed) || 0;
  const remaining = Math.max(0, stock - claimed);

  currentActiveGiveaway = { ...freeItem, remainingStock: remaining, giveawayStock: stock };

  // UI 데이터 주입
  const titleEl = document.getElementById('giveaway-title');
  const imgEl = document.getElementById('giveaway-img');
  const stockEl = document.getElementById('giveaway-stock-display');
  const btnEl = document.getElementById('btn-claim-giveaway');
  const btnTextEl = document.getElementById('giveaway-btn-text');

  if (titleEl) titleEl.textContent = freeItem.name || '무료나눔 상품';
  if (imgEl) imgEl.src = freeItem.image || 'https://via.placeholder.com/94';
  if (stockEl) stockEl.textContent = remaining;

  // 현재 장바구니에 실제로 들어있는지 확인
  let currentSavedCart = [];
  try { currentSavedCart = JSON.parse(localStorage.getItem('ryzin_live_cart_items') || '[]'); } catch(e) {}
  const inCart = currentSavedCart.some(item => 
    String(item.id) === String(freeItem.id) || 
    (item.isFreeGiveaway && item.name.includes(freeItem.name))
  );

  // 관리자가 새로 시작한 회차인지 확인
  const startedAt = Number(freeItem.giveawayStartedAt) || 0;
  const lastClaimedTime = Number(localStorage.getItem(`ryzin_claimed_time_${freeItem.id}`)) || 0;
  const isNewRound = startedAt > 0 && startedAt > lastClaimedTime;

  // 장바구니에 실제로 들어있고, 새로운 회차가 아닐 때만 이미 담기 완료로 표시!
  const alreadyClaimed = inCart && !isNewRound;

  if (btnEl && btnTextEl) {
    if (alreadyClaimed) {
      btnEl.disabled = true;
      btnEl.style.background = '#f1f5f9';
      btnEl.style.color = '#94a3b8';
      btnEl.style.cursor = 'not-allowed';
      btnTextEl.textContent = '이미 담기 완료';
    } else if (remaining <= 0) {
      btnEl.disabled = true;
      btnEl.style.background = '#f1f5f9';
      btnEl.style.color = '#94a3b8';
      btnEl.style.cursor = 'not-allowed';
      btnTextEl.textContent = '수량 소진 (마감)';
    } else {
      btnEl.disabled = false;
      btnEl.style.background = '#0f172a';
      btnEl.style.color = '#ffffff';
      btnEl.style.cursor = 'pointer';
      btnTextEl.textContent = '선착순 무료로 담기';
    }
  }

  // 화면 중앙에 노출
  if (giveawayCard.style.display === 'none') {
    giveawayCard.style.display = 'block';
  }
}

window.closeGiveawayCard = function(evt) {
  if (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  // 사용자가 닫은 시각을 밀리초 타임스탬프로 기록
  window.__userClosedGiveawayTime = Date.now();
  const card = document.getElementById('giveaway-overlay-card');
  if (card) {
    card.style.animation = 'giveawayPopOut 0.25s ease-in forwards';
    setTimeout(() => {
      card.style.display = 'none';
      card.style.animation = 'giveawayPopIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }, 250);
  }
};

window.claimGiveawayItem = async function() {
  if (!currentActiveGiveaway) return;
  const freeItem = currentActiveGiveaway;

  // 1. 현재 장바구니 실존 여부 및 신규 회차 검사
  let currentSavedCart = [];
  try { currentSavedCart = JSON.parse(localStorage.getItem('ryzin_live_cart_items') || '[]'); } catch(e) {}
  const inCart = currentSavedCart.some(item => 
    String(item.id) === String(freeItem.id) || 
    (item.isFreeGiveaway && item.name.includes(freeItem.name))
  );

  const startedAt = Number(freeItem.giveawayStartedAt) || 0;
  const lastClaimedTime = Number(localStorage.getItem(`ryzin_claimed_time_${freeItem.id}`)) || 0;
  const isNewRound = startedAt > 0 && startedAt > lastClaimedTime;

  if (inCart && !isNewRound) {
    alert('이미 장바구니에 담으신 무료나눔 상품입니다.');
    return;
  }

  // 2. 잔여 수량 확인
  if (freeItem.remainingStock <= 0) {
    alert('앗! 준비된 선착순 수량이 모두 소진되었습니다.');
    return;
  }

  const btnEl = document.getElementById('btn-claim-giveaway');
  const btnTextEl = document.getElementById('giveaway-btn-text');
  if (btnEl) btnEl.disabled = true;
  if (btnTextEl) btnTextEl.textContent = '담는 중...';

  // 3. 플라잉 담기 애니메이션 실행!
  const startImg = document.getElementById('giveaway-img');
  const cartBtn = document.getElementById('btn-cart');

  if (startImg && cartBtn) {
    const startRect = startImg.getBoundingClientRect();
    const endRect = cartBtn.getBoundingClientRect();

    const flying = document.createElement('img');
    flying.src = startImg.src;
    flying.className = 'flying-giveaway-item';
    flying.style.width = startRect.width + 'px';
    flying.style.height = startRect.height + 'px';
    flying.style.top = startRect.top + 'px';
    flying.style.left = startRect.left + 'px';
    document.body.appendChild(flying);

    // 다음 프레임에서 장바구니로 날아가도록 위치 이동
    requestAnimationFrame(() => {
      flying.style.top = (endRect.top + endRect.height / 4) + 'px';
      flying.style.left = (endRect.left + endRect.width / 4) + 'px';
      flying.style.width = '24px';
      flying.style.height = '24px';
      flying.style.opacity = '0.3';
      flying.style.transform = 'rotate(360deg) scale(0.8)';
    });

    setTimeout(() => {
      flying.remove();
      // 장바구니 아이콘 바운스 효과
      cartBtn.classList.add('cart-bouncing');
      setTimeout(() => cartBtn.classList.remove('cart-bouncing'), 600);
    }, 750);
  }

  // 4. 장바구니에 0원으로 담기 (로컬스토리지 직접 영구 보존)
  const giveawayCartItem = {
    id: freeItem.id || Date.now(),
    name: `[무료나눔] ${freeItem.name}`,
    price: '0',
    normalPrice: freeItem.normalPrice || '',
    image: freeItem.image || '',
    quantity: 1,
    isFreeGiveaway: true
  };

  try {
    let currentSaved = [];
    try { currentSaved = JSON.parse(localStorage.getItem('ryzin_live_cart_items') || '[]'); } catch(e) {}
    if (!Array.isArray(currentSaved)) currentSaved = [];
    
    // 중복 없으면 최상단에 추가
    if (!currentSaved.some(item => String(item.id) === String(giveawayCartItem.id) || item.name === giveawayCartItem.name)) {
      currentSaved.unshift(giveawayCartItem);
    }
    localStorage.setItem('ryzin_live_cart_items', JSON.stringify(currentSaved));
    cartItems = currentSaved;
    if (typeof updateCartUI === 'function') updateCartUI();
  } catch(e) {
    console.error('무료나눔 장바구니 저장 에러:', e);
  }

  // 내가 담은 기록 및 시간 보존
  localStorage.setItem(`ryzin_claimed_time_${freeItem.id}`, Date.now().toString());

  // 5. 실시간 수량 차감 처리
  try {
    const allProducts = JSON.parse(localStorage.getItem(`ryzin_live_products_${LIVE_ID}`) || '[]');
    const target = allProducts.find(p => String(p.id) === String(freeItem.id));
    if (target) {
      target.giveawayClaimed = (parseInt(target.giveawayClaimed) || 0) + 1;
      localStorage.setItem(`ryzin_live_products_${LIVE_ID}`, JSON.stringify(allProducts));
      
      // Supabase에도 비동기 동기화
      if (db) {
        db.from('live_control').update({
          products: allProducts,
          updated_at: new Date().toISOString()
        }).eq('live_id', LIVE_ID).then(() => {});
      }
    }
  } catch(e) {}

  if (btnTextEl) btnTextEl.textContent = '담기 완료!';

  // 6. 1.2초 후 화면 중앙 카드 부드럽게 닫기
  setTimeout(() => {
    window.closeGiveawayCard();
  }, 1200);
};
