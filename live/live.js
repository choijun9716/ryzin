
// ── [동적 PWA Manifest 엔진] 홈 화면 추가 시 현재 라이브 세부 주소 및 썸네일 완벽 보존 ──
(function initDynamicManifest() {
  try {
    const liveId = window.INJECTED_LIVE_ID 
      || new URLSearchParams(window.location.search).get('id') 
      || (window.location.pathname.split('/live/')[1] || '').split('/')[0] 
      || '';

    const currentUrl = liveId 
      ? `${window.location.origin}/live/${liveId}` 
      : window.location.href;

    const ogTitle = document.querySelector('meta[property="og:title"]')?.content 
      || document.title 
      || 'RYZIN LIVE';

    const ogImage = document.querySelector('meta[property="og:image"]')?.content 
      || 'https://i.ibb.co/GQN2NXgR/image.jpg';

    const dynamicManifest = {
      name: "RYZIN STUDIO",
      short_name: "RYZIN STUDIO",
      description: "라이브커머스 실시간 방송 및 쇼핑",
      start_url: currentUrl,
      scope: "/live/",
      display: "standalone",
      background_color: "#000000",
      theme_color: "#000000",
      icons: [
        {
          src: "/assets/app_icon.png",
          sizes: "192x192 512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    };

    const blob = new Blob([JSON.stringify(dynamicManifest)], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);
    let link = document.querySelector('link[rel="manifest"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'manifest';
      document.head.appendChild(link);
    }
    link.href = blobUrl;

    // apple-touch-icon 동적 연동
    let appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleIcon) {
      appleIcon = document.createElement('link');
      appleIcon.rel = 'apple-touch-icon';
      document.head.appendChild(appleIcon);
    }
    appleIcon.href = '/assets/app_icon.png';
  } catch (e) {
    console.warn('Dynamic manifest init error:', e);
  }
})();

// === Global Supabase & State Variables ===
function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|watch\?.+&v=))([\w-]{11})/);
  return m ? m[1] : null;
}
let db = null;
let LIVE_ID = 'N45ZMPL';


// ── [무정전 자동 재생 가드 및 소리 제어 엔진] 브라우저 자동재생 차단 완벽 회피 및 100% 즉시 자동 재생 보장 ──
window.__isMediaUnmuted = false;

window.dismissUnmuteToast = function() {
  const banner = document.getElementById('unmute-toast-banner');
  if (banner && !banner.classList.contains('fade-out')) {
    banner.classList.add('fade-out');
    setTimeout(() => {
      if (banner && banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 350);
  }
};

window.triggerUnmuteToast = function(e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  if (typeof window.unmuteAllMedia === 'function') {
    window.unmuteAllMedia();
  }
};

window.unmuteAllMedia = function() {
  window.__isMediaUnmuted = true;
  if (typeof isStreamMuted !== 'undefined') {
    isStreamMuted = false;
    if (typeof updateSoundUI === 'function') updateSoundUI();
  }
  if (typeof window.dismissUnmuteToast === 'function') {
    window.dismissUnmuteToast();
  }
  try {
    // 1. 유튜브 라이브 플레이어 음소거 해제 & 볼륨 100%
    const ytPlayer = document.getElementById('youtube-player');
    if (ytPlayer && ytPlayer.contentWindow) {
      ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
      ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
    }

    // 2. 예비 썸네일 유튜브 플레이어 음소거 해제
    const standbyIfr = document.querySelector('#standby-youtube-wrap iframe');
    if (standbyIfr && standbyIfr.contentWindow) {
      standbyIfr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
      standbyIfr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
    }

    // 3. 일반 HTML5 비디오 (HLS/MP4) 음소거 해제
    const video = document.getElementById('live-video');
    if (video) {
      video.muted = false;
    }
  } catch (e) {}
};

// 화면 어디든 최초 터치/클릭/스크롤 시 오디오 자동 언뮤트 및 배너 닫기
['click', 'touchstart', 'touchend', 'scroll', 'pointerdown', 'keydown'].forEach(evt => {
  window.addEventListener(evt, function handleFirstUserGesture() {
    if (!window.__isMediaUnmuted && typeof window.unmuteAllMedia === 'function') {
      window.unmuteAllMedia();
    }
    if (typeof window.dismissUnmuteToast === 'function') {
      window.dismissUnmuteToast();
    }
  }, { passive: true });
});

window.resumeAllMedia = function() {
  try {
    // 1. 일반 HTML5 비디오 (HLS/MP4) 무조건 재생 재개
    const video = document.getElementById('live-video');
    if (video) {
      if (video.paused) {
        const p = video.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => {
            // 브라우저 자동재생 제약 시 muted로 재생 후 언뮤트 재시도
            video.muted = true;
            video.play().then(() => {
              if (window.__isMediaUnmuted) video.muted = false;
            }).catch(() => {});
          });
        }
      }
    }

    // 2. 라이브 송출 유튜브 플레이어 강제 재생 명령 전송
    const ytPlayer = document.getElementById('youtube-player');
    if (ytPlayer && ytPlayer.contentWindow) {
      ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
      if (window.__isMediaUnmuted) {
        ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
        ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
      }
    }

    // 3. 예비 썸네일 유튜브 플레이어 강제 재생 명령 전송
    const standbyIfr = document.querySelector('#standby-youtube-wrap iframe');
    if (standbyIfr && standbyIfr.contentWindow) {
      standbyIfr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
      if (window.__isMediaUnmuted) {
        standbyIfr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
        standbyIfr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
      }
    }

    // 4. HLS 라이브 스트림 버퍼 로드 재개
    if (window.hlsInstance) {
      try { window.hlsInstance.startLoad(); } catch(e) {}
    }
  } catch (e) {}
};

// 상세페이지 갔다 오거나 탭/창 전환 복귀 시 무조건 즉시 재생 (다단계 재시도)
['visibilitychange', 'focus', 'pageshow', 'popstate'].forEach(evt => {
  window.addEventListener(evt, () => {
    if (!document.hidden && typeof window.resumeAllMedia === 'function') {
      window.resumeAllMedia();
      [50, 150, 300, 600, 1200, 2000].forEach(delay => {
        setTimeout(window.resumeAllMedia, delay);
      });
    }
  });
});

// 복귀 후 화면 어디든 탭/터치 시 1회 즉시 영상 재생 보장
document.addEventListener('click', () => {
  if (typeof window.resumeAllMedia === 'function') window.resumeAllMedia();
}, { passive: true });
document.addEventListener('touchstart', () => {
  if (typeof window.resumeAllMedia === 'function') window.resumeAllMedia();
}, { passive: true });

// 1초 주기 헬스체크: 화면이 보이고 있는데 영상이 멈춰있다면 스스로 즉각 강제 재개
if (!window.__mediaKeepAliveTimer) {
  window.__mediaKeepAliveTimer = setInterval(() => {
    if (!document.hidden && typeof window.resumeAllMedia === 'function') {
      const video = document.getElementById('live-video');
      if (video && video.style.display !== 'none' && video.paused && video.readyState >= 2) {
        video.play().catch(() => {});
      }
      const standbyIfr = document.querySelector('#standby-youtube-wrap iframe');
      const standbyOverlay = document.getElementById('standby-overlay');
      if (standbyIfr && standbyOverlay && standbyOverlay.style.display !== 'none') {
        standbyIfr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
      }
    }
  }, 1200);
}

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
    let showNoticeNote = true;
    let noticeNoteTitle = '';
    let noticeNoteContent = '';
    
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
      } else if (part.startsWith('showNoticeNote=')) {
        showNoticeNote = part.replace('showNoticeNote=', '') !== 'false';
      } else if (part.startsWith('noticeNoteTitle=')) {
        noticeNoteTitle = decodeURIComponent(part.replace('noticeNoteTitle=', ''));
      } else if (part.startsWith('noticeNoteContent=')) {
        noticeNoteContent = decodeURIComponent(part.replace('noticeNoteContent=', ''));
      }
    });
    window.currentWidgetPosition = widgetPosition;
    


    const config = {
      liveId: row.live_id || 'N45ZMPL',
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
      useStandbyImage: useStandbyImage,
      showNoticeNote: showNoticeNote,
      noticeNoteTitle: noticeNoteTitle,
      noticeNoteContent: noticeNoteContent
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
        localStorage.setItem(`ryzin_products_${LIVE_ID}`, JSON.stringify(productsList));
        loadLiveProducts();
      } catch (e) {}
    }

    loadLiveConfig();
    loadLiveStats();
    loadLiveProducts();
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
          if (nick.startsWith('SYSTEM_') || nick === 'SYSTEM_DIRECT_ORDER_REQUEST') return;
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

  // ── [고객 맞춤형] 장바구니 주문서 & 입금 계좌 안내 모달 팝업 ──
  function handleDirectOrderNotification(req) {
    if (!req || !req.targetNickname) return;

    // 현재 사용자의 닉네임 확인
    const currentNick = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();
    let kakaoUser = null;
    try { kakaoUser = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}
    const kakaoNick = (kakaoUser?.properties?.nickname || kakaoUser?.nickname || '').trim();

    const targetNick = req.targetNickname.trim();
    const isTarget = (currentNick && targetNick === currentNick) || (kakaoNick && targetNick === kakaoNick);

    if (!isTarget) return; // 타겟 고객이 아니면 실행하지 않음

    // 최신 장바구니 품목 불러오기
    let currentCart = [];
    if (typeof loadCartFromStorage === 'function') {
      currentCart = loadCartFromStorage();
    } else {
      try {
        currentCart = JSON.parse(localStorage.getItem('ryzin_live_cart_items') || '[]');
      } catch(e) {}
    }

    const depositAccount = req.depositAccount || '기업은행 010-3018-9716 (채이준)';
    const adminName = req.adminName || '관리자';

    // 기존 모달 제거 후 새로 렌더링
    document.getElementById('direct-order-notice-modal')?.remove();

    // 총 결제 금액 계산
    const totalPrice = currentCart.reduce((sum, it) => sum + (parseInt(it.price) || 0) * (it.quantity || 1), 0);

    const itemsHtml = currentCart.length > 0 ? currentCart.map(it => {
      const pPrice = parseInt(it.price) || 0;
      const qty = it.quantity || 1;
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:9px 0; border-bottom:1px solid #f1f5f9; font-size:13px;">
          <div style="flex:1; min-width:0; padding-right:12px;">
            <div style="font-weight:600; color:#0f172a; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${it.name || '상품'}</div>
            <div style="font-size:11.5px; color:#64748b; margin-top:2px;">수량: ${qty}개 (${pPrice.toLocaleString()}원)</div>
          </div>
          <div style="font-weight:700; color:#0f172a; font-variant-numeric:tabular-nums; flex-shrink:0;">
            ${(pPrice * qty).toLocaleString()}원
          </div>
        </div>
      `;
    }).join('') : `
      <div style="text-align:center; padding:24px 10px; color:#94a3b8; font-size:13px;">
        현재 장바구니에 담긴 상품이 없습니다. 라이브 방송 상품을 담아주세요.
      </div>
    `;

    const modalEl = document.createElement('div');
    modalEl.id = 'direct-order-notice-modal';
    modalEl.style.cssText = 'position:fixed; inset:0; background:rgba(15,23,42,0.72); z-index:100000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(4px); padding:16px; box-sizing:border-box; animation:orderModalIn 0.2s ease-out;';

    modalEl.innerHTML = `
      <div style="background:#ffffff; border-radius:16px; width:440px; max-width:100%; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); overflow:hidden; border:1px solid #e2e8f0; display:flex; flex-direction:column;">
        <!-- 헤더 -->
        <div style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid #f1f5f9; background:#ffffff;">
          <div style="display:flex; align-items:center; gap:8px;">
            <h4 style="margin:0; font-size:15px; font-weight:700; color:#0f172a;">주문서 확인 및 계좌 입금 안내</h4>
            <span style="display:inline-flex; align-items:center; gap:4px; padding:3px 8px; border-radius:5px; font-size:11.5px; font-weight:600; background:#fffbeb; color:#b45309;">
              <span style="width:5px; height:5px; border-radius:50%; background:#f59e0b;"></span>결제대기
            </span>
          </div>
          <button type="button" id="btn-close-direct-order" style="background:none; border:none; color:#94a3b8; font-size:20px; line-height:1; cursor:pointer; padding:4px;" onmouseover="this.style.color='#0f172a'" onmouseout="this.style.color='#94a3b8'">✕</button>
        </div>

        <!-- 바디 -->
        <div style="padding:20px; max-height:75vh; overflow-y:auto;">
          <!-- 1. 장바구니 주문서 요약 -->
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding-bottom:8px; border-bottom:1px solid #e2e8f0;">
              <span style="font-size:12px; font-weight:700; color:#475569;">장바구니 주문 상품</span>
              <span style="font-size:12px; color:#64748b;">총 ${currentCart.length}개 품목</span>
            </div>
            <div style="max-height:180px; overflow-y:auto; margin-bottom:12px;">
              ${itemsHtml}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding-top:10px; border-top:1.5px solid #e2e8f0;">
              <span style="font-size:13px; font-weight:700; color:#334155;">총 결제 예정 금액</span>
              <span style="font-size:16px; font-weight:800; color:#0f172a; font-variant-numeric:tabular-nums;">${totalPrice.toLocaleString()}원</span>
            </div>
          </div>

          <!-- 3. 입금 계좌번호 카드 -->
          <div style="background:#ffffff; border:1.5px solid #cbd5e1; border-radius:10px; padding:16px; margin-bottom:14px;">
            <div style="font-size:12px; font-weight:700; color:#475569; margin-bottom:8px;">입금 계좌 안내</div>
            <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; padding:12px 14px; border-radius:8px; border:1px solid #e2e8f0;">
              <span id="direct-order-bank-text" style="font-size:13.5px; font-weight:700; color:#0f172a; font-variant-numeric:tabular-nums; word-break:break-all;">
                ${depositAccount}
              </span>
              <button type="button" id="btn-copy-deposit-bank" style="flex-shrink:0; margin-left:8px; padding:5px 10px; font-size:11.5px; font-weight:700; background:#ffffff; border:1px solid #cbd5e1; border-radius:6px; color:#2563eb; cursor:pointer; transition:all 0.12s;">
                계좌 복사
              </button>
            </div>
          </div>
        </div>

        <!-- 푸터 -->
        <div style="display:flex; justify-content:flex-end; gap:8px; padding:14px 20px; background:#f8fafc; border-top:1px solid #e2e8f0;">
          <button type="button" id="btn-cancel-direct-order" style="padding:8px 16px; font-size:12.5px; font-weight:600; border:1px solid #cbd5e1; background:#ffffff; color:#64748b; border-radius:7px; cursor:pointer;">닫기</button>
          <button type="button" id="btn-notify-deposit-done" style="padding:8px 18px; font-size:12.5px; font-weight:700; border:none; background:#0f172a; color:#ffffff; border-radius:7px; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.1);">입금 완료 알림</button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    // 닫기 이벤트
    const closeModal = () => modalEl.remove();
    modalEl.querySelector('#btn-close-direct-order')?.addEventListener('click', closeModal);
    modalEl.querySelector('#btn-cancel-direct-order')?.addEventListener('click', closeModal);
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) closeModal();
    });

    // 계좌 복사 버튼
    modalEl.querySelector('#btn-copy-deposit-bank')?.addEventListener('click', () => {
      const text = depositAccount;
      navigator.clipboard.writeText(text).then(() => {
        const copyBtn = modalEl.querySelector('#btn-copy-deposit-bank');
        if (copyBtn) {
          copyBtn.textContent = '복사완료';
          copyBtn.style.color = '#059669';
          copyBtn.style.borderColor = '#059669';
          setTimeout(() => {
            copyBtn.textContent = '계좌 복사';
            copyBtn.style.color = '#2563eb';
            copyBtn.style.borderColor = '#cbd5e1';
          }, 1500);
        }
      });
    });

    // 입금 완료 알림 전송 버튼
    modalEl.querySelector('#btn-notify-deposit-done')?.addEventListener('click', async () => {
      const notifyBtn = modalEl.querySelector('#btn-notify-deposit-done');
      if (notifyBtn) {
        notifyBtn.disabled = true;
        notifyBtn.textContent = '전송 중...';
      }

      const orderNumber = 'TR-' + Date.now().toString().slice(-8);
      const orderPayload = {
        live_id: LIVE_ID,
        pg_receipt_id: orderNumber,
        customer_name: targetNick,
        total_amount: totalPrice,
        items: currentCart,
        payment_status: 'transfer_requested', // 계좌이체 입금요청(대기)
        pg_provider: 'bank_transfer', // 계좌이체
        created_at: Date.now()
      };

      try {
        if (db) {
          await db.from('live_orders').insert([orderPayload]);
        }
      } catch (e) {
        console.warn('live_orders insert failed:', e);
      }

      try {
        const localOrders = JSON.parse(localStorage.getItem(`ryzin_live_orders_${LIVE_ID}`) || '[]');
        localOrders.unshift(orderPayload);
        localStorage.setItem(`ryzin_live_orders_${LIVE_ID}`, JSON.stringify(localOrders));
      } catch (e) {}

      if (typeof sendMessage === 'function') {
        sendMessage(`[계좌이체 입금 완료] ${targetNick} 입금 완료했습니다! (주문금액: ${totalPrice.toLocaleString()}원)`);
      }
      alert('관리자에게 입금 완료 알림이 전송되었습니다. 관리자 입금 확인 후 주문이 최종 완료됩니다.');
      closeModal();
    });
  }

  // 4. 실시간 채팅 감지 설정 (구독)
  function subscribeChat() {
    if (!db) return;
    db.channel(`live-chats-channel-${LIVE_ID}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'live_chats', filter: `live_id=eq.${LIVE_ID}` }, payload => {
        const c = payload.new;
        if (!c) return;

        // 시스템 직송 주문서 & 입금 계좌 알림 처리
        if (c.nickname === 'SYSTEM_DIRECT_ORDER_REQUEST') {
          try {
            const req = JSON.parse(c.content);
            handleDirectOrderNotification(req);
          } catch(e) {}
          return;
        }

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
      .on('broadcast', { event: 'direct_order_request' }, ({ payload }) => {
        if (payload) handleDirectOrderNotification(payload);
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
      const targetLiveId = LIVE_ID || 'N45ZMPL';
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

          // 시청자 탭 닫을 때 실시간 시청자 수 안전 차감 (정확도 향상)
          window.addEventListener('beforeunload', () => {
            try {
              if (data.status === 'ON') {
                const payload = JSON.stringify({ live_id: targetLiveId, action: 'leave' });
                // beacon 또는 직접 DB 패치 시도 (네트워크 환경 지원 시)
                db.from('live_control').select('viewers').eq('live_id', targetLiveId).maybeSingle().then(({ data: vRow }) => {
                  if (vRow && parseInt(vRow.viewers) > 0) {
                    db.from('live_control').update({ viewers: Math.max(0, parseInt(vRow.viewers) - 1) }).eq('live_id', targetLiveId);
                  }
                });
              }
            } catch(e) {}
          });
        }
      } catch (e) {
        console.warn('Viewer count increment failed:', e);
      }
    }, 800);

  // ── 좌측 포스트잇 공지 메모장 (Sticky Note Memo) 제어 ──
  window.updateNoticeMemo = function(c) {
    const memoEl = document.getElementById('live-notice-memo');
    if (!memoEl) return;

    if (!c || c.showNoticeNote === false) {
      memoEl.style.display = 'none';
      return;
    }
    memoEl.style.display = 'flex';

    const titleEl = document.getElementById('memo-title');
    const contentEl = document.getElementById('memo-content');
    const hintEl = document.getElementById('memo-hint');

    const defaultTitle = 'Show Notes';
    const defaultContent = '방송 공지사항\n\n' +
      '* 방송 중 특가 혜택이 적용됩니다.\n' +
      '* 실시간 채팅 및 라이브 이벤트에 참여해보세요!\n' +
      '* 공지 내용은 관리자 페이지에서 실시간으로 수정하실 수 있습니다.';

    if (titleEl) {
      titleEl.textContent = (c.noticeNoteTitle && c.noticeNoteTitle.trim()) ? c.noticeNoteTitle.trim() : defaultTitle;
    }
    if (contentEl) {
      contentEl.textContent = (c.noticeNoteContent && c.noticeNoteContent.trim()) ? c.noticeNoteContent.trim() : defaultContent;
    }
    if (hintEl) {
      hintEl.textContent = '클릭해 펼치기';
    }
  };

  // 포스트잇 메모장 클릭 및 인터랙션 리스너 등록
  (function initNoticeMemo() {
    const memoEl = document.getElementById('live-notice-memo');
    if (!memoEl) return;

    // 메모장 클릭 시 (축소 상태일 때 펼침)
    memoEl.addEventListener('click', (e) => {
      if (!memoEl.classList.contains('expanded')) {
        memoEl.classList.add('expanded');
      }
    });

    // 키보드 접근성 지원
    memoEl.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !memoEl.classList.contains('expanded')) {
        e.preventDefault();
        memoEl.classList.add('expanded');
      }
    });

    // 닫기/접기 버튼
    const closeBtn = document.getElementById('memo-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        memoEl.classList.remove('expanded');
      });
    }

    // 본문 클릭/스크롤 시 메모장 접힘 방지
    const contentEl = document.getElementById('memo-content');
    if (contentEl) {
      contentEl.addEventListener('click', (e) => {
        e.stopPropagation();
      });
      contentEl.addEventListener('touchstart', (e) => {
        e.stopPropagation();
      }, { passive: true });
    }

    // 메모장 바깥 클릭 시 접기
    document.addEventListener('click', (e) => {
      if (memoEl.classList.contains('expanded') && !memoEl.contains(e.target)) {
        memoEl.classList.remove('expanded');
      }
    });
  })();

  function loadLiveConfig() {
    try {
      const c = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`));
      if (c) {
        const overlay = document.getElementById('thumbnail-overlay');
        const standbyOverlay = document.getElementById('standby-overlay');
        const standbyImg = document.getElementById('standby-img');

        // ── 방송 진행 중 예비 썸네일 오버레이 제어 (유튜브 반복재생 및 컨트롤러 숨김 지원) ──
        const standbyYtWrap = document.getElementById('standby-youtube-wrap');
        if (c.useStandbyImage && c.standbyImageUrl && c.standbyImageUrl.trim()) {
          const rawUrl = c.standbyImageUrl.trim();
          const ytId = extractYouTubeId(rawUrl);

          if (ytId) {
            // [유튜브 영상 모드] 무한 반복 시 블랙 깜빡임 완전 제거 백플레이트 기법
            const ytThumbUrl = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
            if (standbyOverlay) {
              standbyOverlay.style.backgroundImage = `url(${ytThumbUrl}), url(https://img.youtube.com/vi/${ytId}/hqdefault.jpg)`;
              standbyOverlay.style.backgroundSize = 'cover';
              standbyOverlay.style.backgroundPosition = 'center';
            }
            if (standbyImg) {
              standbyImg.src = ytThumbUrl;
              standbyImg.style.display = 'block';
              standbyImg.style.position = 'absolute';
              standbyImg.style.top = '0';
              standbyImg.style.left = '0';
              standbyImg.style.width = '100%';
              standbyImg.style.height = '100%';
              standbyImg.style.objectFit = 'cover';
              standbyImg.style.zIndex = '1';
            }
            if (standbyYtWrap) {
              standbyYtWrap.style.display = 'block';
              standbyYtWrap.style.zIndex = '2';
              const curIframe = standbyYtWrap.querySelector('iframe');
              if (!curIframe || curIframe.getAttribute('data-yt-id') !== ytId) {
                standbyYtWrap.innerHTML = `
                  <iframe
                    data-yt-id="${ytId}"
                    src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&playsinline=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&autohide=1&loop=1&playlist=${ytId}&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&vq=hd1080"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowfullscreen
                    style="position:absolute; top:50%; left:50%; width:100%; height:100%; min-width:178vh; min-height:100%; transform:translate(-50%, -50%) scale(1.08); border:none; pointer-events:none; -webkit-backface-visibility:hidden; image-rendering:-webkit-optimize-contrast;"
                  ></iframe>
                `;

                // 유튜브 무조건 자동 재생 보장 (autoplay=1&mute=1로 브라우저 차단 완벽 회피)
                [100, 300, 600, 1200, 2500, 4000].forEach(delay => {
                  setTimeout(() => {
                    const ifr = standbyYtWrap.querySelector('iframe');
                    if (ifr && ifr.contentWindow) {
                      ifr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
                      if (window.__isMediaUnmuted) {
                        ifr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
                        ifr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
                      }
                    }
                  }, delay);
                });

                // 유튜브 반복 시 블랙 현상 방지: 영상 종료(Ended:0) 감지 즉시 처음으로 seekTo(0) 및 재생
                window.addEventListener('message', function ytStandbyLoopHandler(e) {
                  try {
                    const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
                    if (data && (data.event === 'onStateChange' && data.info === 0)) {
                      const ifr = standbyYtWrap.querySelector('iframe');
                      if (ifr && ifr.contentWindow) {
                        ifr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'seekTo', args: [0, true] }), '*');
                        ifr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
                      }
                    }
                  } catch (err) {}
                });
              }
            }
          } else {
            // [일반 이미지 모드]
            if (standbyYtWrap) {
              standbyYtWrap.innerHTML = '';
              standbyYtWrap.style.display = 'none';
            }
            if (standbyImg) {
              standbyImg.src = rawUrl;
              standbyImg.style.display = 'block';
            }
          }

          if (standbyOverlay) {
            standbyOverlay.style.display = 'flex';
          }
        } else {
          // 예비 썸네일 OFF 시 리소스 정리
          if (standbyYtWrap) {
            standbyYtWrap.innerHTML = '';
            standbyYtWrap.style.display = 'none';
          }
          if (standbyImg) {
            standbyImg.style.display = 'none';
            standbyImg.src = '';
          }
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
            const isStandbyActive = c.useStandbyImage && c.standbyImageUrl && c.standbyImageUrl.trim();
            if (!isStandbyActive && c.thumbnailUrl && c.thumbnailUrl.trim()) {
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

        // [NEW] 좌측 포스트잇 공지 메모장 업데이트
        if (typeof window.updateNoticeMemo === 'function') {
          window.updateNoticeMemo(c);
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
        // 대기 화면일 때도 총 시청자수(누적시청자수 + 실시간) 노출
        const total = s ? ((parseInt(s.cumViewers) || 0) + (parseInt(s.viewers) || 0)) : 0;
        viewCountEl.textContent = total.toLocaleString() + '명 대기중';
      } else if (s) {
        // 라이브 중일 때도 [누적시청자수 + 실시간시청자수] 가산하여 노출
        const total = (parseInt(s.cumViewers) || 0) + (parseInt(s.viewers) || 0);
        viewCountEl.textContent = total.toLocaleString() + '명 시청중';
      }
    } catch (e) { }
  }

  // ── 카카오 로그인 여부 검사 및 로그인 유도 헬퍼 ──
  window.isKakaoLoggedIn = function() {
    try {
      const kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null');
      if (kakaoUserObj && (kakaoUserObj.id || kakaoUserObj.nickname)) {
        return true;
      }
    } catch(e) {}
    return false;
  };

  window.promptKakaoLogin = function(pendingItem = null) {
    if (pendingItem) {
      window.__pendingCartItem = pendingItem;
    }
    const modal = document.getElementById('nickname-modal');
    if (modal) {
      modal.style.zIndex = '1000005';
      modal.style.display = 'flex';
    } else if (typeof window.loginWithKakao === 'function') {
      window.loginWithKakao('cart');
    }
  };

  // ── 상품 재고(stock) 한도 계산 헬퍼 ──
  window.getProductMaxStock = function(prod) {
    if (!prod) return Infinity;
    if (prod.stock === undefined || prod.stock === null || prod.stock === '') {
      return Infinity;
    }
    const num = parseInt(prod.stock, 10);
    return isNaN(num) ? Infinity : Math.max(0, num);
  };

  // ── 화이트 미니멀 토스트 알럿 헬퍼 ──
  window.showWhiteToast = function(msg, isError = false) {
    const prevToast = document.querySelector('.cart-white-toast');
    if (prevToast) prevToast.remove();

    const toast = document.createElement('div');
    toast.className = 'cart-white-toast';
    const iconSvg = isError
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    toast.innerHTML = `${iconSvg}<span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  };

  // ── 상품 상세 보기 시 라이브 영상 PIP 모드 및 소리 지속 재생 엔진 ──
  window.openProductDetailSheet = function(item) {
    if (!item) return;

    if (item.url === '__LEAD_FORM__') {
      if (typeof openLeadModal === 'function') openLeadModal(item.name);
      return;
    }

    // 1. PIP 화면 없이 전체화면 라이브 모달 형태로 표시
    document.body.classList.remove('pip-active');

    // 2. 다른 모달창(상품 목록, 장바구니 등) 닫기
    const modalProducts = document.getElementById('modal-products');
    if (modalProducts) modalProducts.style.display = 'none';

    // 3. 상품 상세 시트 요소 바인딩
    const sheet = document.getElementById('product-detail-sheet');
    if (!sheet) return;

    const headerTitle = document.getElementById('pdetail-header-title');
    if (headerTitle) headerTitle.textContent = item.name || '상품 상세';

    const iframe = document.getElementById('pdetail-webview-iframe');
    const webviewContainer = document.getElementById('pdetail-webview-container');
    const fallbackView = document.getElementById('pdetail-fallback-view');
    const customPage = document.getElementById('pdetail-custom-page');
    const emptyView = document.getElementById('pdetail-empty-view');

    const detailImg = item.detailImage || item.detail_image || item.detailImages;
    const hasDetailImg = Boolean(
      detailImg && (
        Array.isArray(detailImg)
          ? detailImg.filter(Boolean).length > 0
          : String(detailImg).split(',').map(s => s.trim()).filter(Boolean).length > 0
      )
    );

    if (hasDetailImg) {
      // 1순위: Cloudinary 등에 등록된 상세페이지 이미지 & 애니메이션 GIF 렌더링
      if (iframe) {
        iframe.src = 'about:blank';
        iframe.style.display = 'none';
      }
      if (fallbackView) fallbackView.style.display = 'none';
      if (emptyView) emptyView.style.display = 'none';
      if (customPage) {
        customPage.style.display = 'block';
        customPage.scrollTop = 0;

        const thumbEl = document.getElementById('pdetail-custom-thumb');
        const titleEl = document.getElementById('pdetail-custom-title');
        const priceEl = document.getElementById('pdetail-custom-price');
        const origPriceEl = document.getElementById('pdetail-custom-orig');
        const discEl = document.getElementById('pdetail-custom-disc');
        const imagesContainer = document.getElementById('pdetail-custom-images-container');

        if (thumbEl) thumbEl.src = item.image || '';
        if (titleEl) titleEl.textContent = item.name || '상품 상세';

        const pNum = Number((item.price || '').toString().replace(/[^0-9]/g, ''));
        const npNum = Number((item.normalPrice || item.originalPrice || '').toString().replace(/[^0-9]/g, ''));

        if (pNum > 0) {
          if (priceEl) priceEl.textContent = `${pNum.toLocaleString()}원`;
          if (npNum > pNum) {
            if (origPriceEl) {
              origPriceEl.textContent = `${npNum.toLocaleString()}원`;
              origPriceEl.style.display = 'inline';
            }
            if (discEl) {
              const rate = Math.round(((npNum - pNum) / npNum) * 100);
              discEl.textContent = `${rate}%`;
              discEl.style.display = 'inline';
            }
          } else {
            if (origPriceEl) origPriceEl.style.display = 'none';
            if (discEl) discEl.style.display = 'none';
          }
        } else if (item.price === '0' || item.price === 0) {
          if (priceEl) priceEl.textContent = '무료나눔';
          if (origPriceEl) origPriceEl.style.display = 'none';
          if (discEl) discEl.style.display = 'none';
        } else {
          if (priceEl) priceEl.textContent = '가격 준비중';
          if (origPriceEl) origPriceEl.style.display = 'none';
          if (discEl) discEl.style.display = 'none';
        }

        // 이미지 / 애니메이션 GIF 목록 렌더링 (쉼표 또는 배열 지원)
        if (imagesContainer) {
          imagesContainer.innerHTML = '';
          const imgList = Array.isArray(detailImg) ? detailImg : String(detailImg).split(',').map(s => s.trim()).filter(Boolean);
          imgList.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${item.name || '상품'} 상세페이지`;
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.margin = '0';
            img.style.padding = '0';
            img.style.border = 'none';
            img.loading = 'lazy';
            imagesContainer.appendChild(img);
          });
        }
      }
    } else {
      // 2순위: 상세페이지가 등록되어 있지 않은 경우 (브랜드 페이지로 바로 이동하지 않고 빈 화면에 안내 문구 노출)
      if (iframe) {
        iframe.src = 'about:blank';
        iframe.style.display = 'none';
      }
      if (customPage) customPage.style.display = 'none';
      if (fallbackView) fallbackView.style.display = 'none';
      if (emptyView) {
        emptyView.style.display = 'flex';
        const subtext = document.getElementById('pdetail-empty-subtext');
        const rawUrl = (item.url || item.link || '').trim();
        const hasExtUrl = Boolean(rawUrl && rawUrl !== '#' && rawUrl !== '__LEAD_FORM__');
        if (subtext) {
          subtext.textContent = hasExtUrl
            ? '하단의 [제품 판매 링크]를 통해 상세 정보를 확인하실 수 있습니다.'
            : '판매처 정보가 등록되지 않았습니다.';
        }
      }
    }

    // 하단 좌측: 제품 판매 링크 연결
    const extLinkBtn = document.getElementById('btn-pdetail-external-link');
    if (extLinkBtn) {
      const rawUrl = (item.url || item.link || '').trim();
      if (rawUrl && rawUrl !== '#' && rawUrl !== '__LEAD_FORM__') {
        let cleanUrl = rawUrl;
        if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
          cleanUrl = 'https://' + cleanUrl;
        }
        extLinkBtn.href = cleanUrl;
        extLinkBtn.target = '_blank';
        extLinkBtn.onclick = (e) => {
          e.stopPropagation();
        };
      } else {
        extLinkBtn.href = '#';
        extLinkBtn.target = '_self';
        extLinkBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          alert('등록된 제품 판매 링크가 없습니다.');
        };
      }
    }

    // 하단 장바구니 담기
    const detailCartBtn = document.getElementById('btn-pdetail-cart');
    const cartText = document.getElementById('btn-pdetail-cart-text');
    const maxStock = (typeof window.getProductMaxStock === 'function') ? window.getProductMaxStock(item) : Infinity;
    const isSoldOut = (maxStock === 0);

    if (detailCartBtn && cartText) {
      if (isSoldOut) {
        cartText.textContent = '품절된 상품입니다';
        detailCartBtn.style.background = '#94a3b8';
        detailCartBtn.style.cursor = 'not-allowed';
      } else {
        cartText.textContent = '장바구니 담기';
        detailCartBtn.style.background = '#0f172a';
        detailCartBtn.style.cursor = 'pointer';
      }

      detailCartBtn.onclick = (e) => {
        e.stopPropagation();

        if (isSoldOut) {
          if (typeof window.showWhiteToast === 'function') {
            window.showWhiteToast('해당 상품은 품절되었습니다.', true);
          } else {
            alert('해당 상품은 품절되었습니다.');
          }
          return;
        }

        const currentConfig = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`) || '{}');
        if (!currentConfig.isLive) {
          alert('라이브 방송 중에만 구매 가능합니다.');
          return;
        }

        // 카카오 로그인 여부 체크
        if (typeof window.isKakaoLoggedIn === 'function' && !window.isKakaoLoggedIn()) {
          if (typeof window.promptKakaoLogin === 'function') window.promptKakaoLogin(item);
          return;
        }

        let isSuccess = false;
        if (typeof addToCart === 'function') {
          isSuccess = addToCart(item);
        }

        if (isSuccess && cartText) {
          const orig = cartText.textContent;
          cartText.textContent = '장바구니에 담겼습니다!';
          detailCartBtn.style.background = '#2563eb';
          detailCartBtn.style.transform = 'scale(0.97)';
          setTimeout(() => {
            cartText.textContent = orig;
            detailCartBtn.style.background = '#0f172a';
            detailCartBtn.style.transform = 'scale(1)';
          }, 1200);
        }
      };
    }

    sheet.style.display = 'flex';

    // 4. 영상 소리 끊김 없이 지속 재생 보장
    if (typeof window.resumeAllMedia === 'function') {
      window.resumeAllMedia();
      setTimeout(window.resumeAllMedia, 150);
      setTimeout(window.resumeAllMedia, 500);
    }
  };

  window.closeProductDetailSheet = function() {
    document.body.classList.remove('pip-active');
    const sheet = document.getElementById('product-detail-sheet');
    if (sheet) sheet.style.display = 'none';
    const iframe = document.getElementById('pdetail-webview-iframe');
    if (iframe) {
      try { iframe.src = 'about:blank'; } catch(e) {}
      iframe.style.display = 'none';
    }
    const customPage = document.getElementById('pdetail-custom-page');
    if (customPage) customPage.style.display = 'none';
    const emptyView = document.getElementById('pdetail-empty-view');
    if (emptyView) emptyView.style.display = 'none';

    // 전체화면 복귀 직후 즉시 동기 실행 + 연속 다단계 딜레이 호출로 무조건 영상 재생 보장
    if (typeof window.resumeAllMedia === 'function') {
      window.resumeAllMedia();
      [50, 150, 300, 600, 1000, 1800].forEach(delay => {
        setTimeout(window.resumeAllMedia, delay);
      });
    }
  };

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
          const maxStock = (typeof window.getProductMaxStock === 'function') ? window.getProductMaxStock(item) : Infinity;
          const isSoldOut = (maxStock === 0);

          if (pNum > 0) {
            priceHtml = `<span class="discounted-price" style="font-weight:800; color:#e50914; font-size:14.5px;">${pNum.toLocaleString()}원</span>`;
            if (npNum > pNum) {
              priceHtml += `<span style="font-size:11.5px; color:#94a3b8; text-decoration:line-through; margin-left:5px;">${npNum.toLocaleString()}원</span>`;
            }
          } else if (item.price === '0' || item.price === 0) {
            priceHtml = `<span class="discounted-price" style="font-weight:800; color:#16a34a; font-size:15px;">무료나눔</span>`;
          } else {
            priceHtml = `<span style="font-size:13px; color:#94a3b8; font-weight:600;">가격 준비중</span>`;
          }

          if (maxStock < Infinity && maxStock > 0) {
            priceHtml += `<span style="font-size:11px; color:#64748b; font-weight:600; margin-left:6px;">(재고 ${maxStock}개)</span>`;
          }

          const soldOutBadge = isSoldOut ? '<span style="color:#ef4444; font-weight:800; font-size:11px; background:#fee2e2; padding:2px 6px; border-radius:4px; margin-right:4px;">[품절]</span>' : '';
          const dealBadge = item.dealEndTime && item.dealEndTime > Date.now() ? '<span style="color:#e11d48; font-weight:800; margin-right:4px;">[깜짝딜]</span>' : '';

          const btnAddStyle = isSoldOut
            ? 'background:#94a3b8; color:#ffffff; border:none; border-radius:8px; padding:7px 12px; font-size:12px; font-weight:700; cursor:not-allowed; display:flex; align-items:center; gap:4px; outline:none;'
            : 'background:#0f172a; color:#ffffff; border:none; border-radius:8px; padding:7px 12px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:4px; transition:all 0.15s; outline:none; box-shadow:0 2px 6px rgba(15,23,42,0.15);';

          el.innerHTML = `
            <img src="${item.image}" alt="product" class="product-image" style="cursor:pointer;">
            <div class="product-info" style="flex:1; min-width:0; cursor:pointer;">
              <div class="product-name">${soldOutBadge}${dealBadge}${item.name}</div>
              <div class="product-price">${priceHtml}</div>
            </div>
            <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
              <button type="button" class="btn-card-detail" style="background:#f8fafc; border:1px solid #e2e8f0; color:#334155; border-radius:8px; padding:7px 11px; font-size:12px; font-weight:600; cursor:pointer; transition:all 0.15s; outline:none;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='#f8fafc'">
                상세
              </button>
              <button type="button" class="btn-card-add-cart" style="${btnAddStyle}" ${isSoldOut ? '' : `onmouseover="this.style.background='#1e293b'" onmouseout="this.style.background='#0f172a'"`}>
                ${isSoldOut ? '' : `
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                `}
                <span>${isSoldOut ? '품절' : '담기'}</span>
              </button>
            </div>
          `;

          // 상세 버튼 및 이미지/상품명 클릭 시 라이브 영상 PIP 모드로 전환하며 상품 상세 시트 오픈
          const handleDetailUrlNavigation = async (ev) => {
            ev.preventDefault();
            ev.stopPropagation();

            if (item.url === '__LEAD_FORM__') {
              if (typeof openLeadModal === 'function') openLeadModal(item.name);
              return;
            }

            // 라이브 화면 내 PIP 모드 및 상세 시트 호출 (소리 무중단)
            if (typeof window.openProductDetailSheet === 'function') {
              window.openProductDetailSheet(item);
            } else if (item.url && item.url !== '#') {
              window.open(item.url.startsWith('http') ? item.url : 'https://' + item.url, '_blank');
            }

            // 클릭 수 동기화
            try {
              const targetLiveId = LIVE_ID || 'N45ZMPL';
              if (!targetLiveId || !db) return;
              const { data } = await db.from('live_control').select('products').eq('live_id', targetLiveId).maybeSingle();
              if (data && data.products) {
                const remoteProducts = typeof data.products === 'string' ? JSON.parse(data.products) : data.products;
                const targetProd = remoteProducts.find(p => p.name === item.name);
                if (targetProd) {
                  targetProd.clicks = (parseInt(targetProd.clicks) || 0) + 1;
                  localStorage.setItem(`ryzin_live_products_${LIVE_ID}`, JSON.stringify(remoteProducts));
                  await db.from('live_control').update({ products: remoteProducts, updated_at: new Date().toISOString() }).eq('live_id', targetLiveId);
                }
              }
            } catch(err) {}
          };

          const btnDetail = el.querySelector('.btn-card-detail');
          if (btnDetail) {
            btnDetail.addEventListener('click', handleDetailUrlNavigation);
          }

          const imgEl = el.querySelector('.product-image');
          const infoEl = el.querySelector('.product-info');
          [imgEl, infoEl].forEach(targetEl => {
            if (targetEl) {
              targetEl.addEventListener('click', handleDetailUrlNavigation);
            }
          });

          // 담기 버튼 클릭 시 장바구니에 담기
          const btnAdd = el.querySelector('.btn-card-add-cart');
          if (btnAdd) {
            btnAdd.addEventListener('click', async (ev) => {
              ev.preventDefault();
              ev.stopPropagation();

              if (isSoldOut) {
                if (typeof window.showWhiteToast === 'function') {
                  window.showWhiteToast('해당 상품은 품절되었습니다.', true);
                } else {
                  alert('해당 상품은 품절되었습니다.');
                }
                return;
              }

              const currentConfig = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`) || '{}');
              if (!currentConfig.isLive) {
                alert('라이브 방송 중에만 구매 가능합니다.');
                return;
              }
              if (item.url === '__LEAD_FORM__') {
                openLeadModal(item.name);
                return;
              }

              // 카카오 로그인 여부 체크
              if (typeof window.isKakaoLoggedIn === 'function' && !window.isKakaoLoggedIn()) {
                if (typeof window.promptKakaoLogin === 'function') window.promptKakaoLogin(item);
                return;
              }

              if (typeof addToCart === 'function') {
                addToCart(item);
              }

              try {
                const targetLiveId = LIVE_ID || 'N45ZMPL';
                if (!targetLiveId || !db) return;
                const { data } = await db.from('live_control').select('products').eq('live_id', targetLiveId).maybeSingle();
                if (data && data.products) {
                  const remoteProducts = typeof data.products === 'string' ? JSON.parse(data.products) : data.products;
                  const targetProd = remoteProducts.find(p => p.name === item.name);
                  if (targetProd) {
                    targetProd.clicks = (parseInt(targetProd.clicks) || 0) + 1;
                    localStorage.setItem(`ryzin_live_products_${LIVE_ID}`, JSON.stringify(remoteProducts));
                    await db.from('live_control').update({ products: remoteProducts, updated_at: new Date().toISOString() }).eq('live_id', targetLiveId);
                  }
                }
              } catch(err) {}
            });
          }
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

            // [NEW] 관리자가 상품관리에서 '지금소개중' 체크한 상품 탐색
            const featuredProduct = activeProducts.find(item => item.isFeatured === true || item.isFeatured === 'true');
            // 지금소개중 상품이 있으면 하단 롤링 배너에 해당 상품을 최우선 고정 표출!
            const displayProducts = featuredProduct ? [featuredProduct] : activeProducts;

            // 엠비언트 라이트 제거 및 기본 클래스 유지
            bottomBanner.classList.remove('featured-active');

            track.innerHTML = '';
            displayProducts.forEach((item) => {
              const card = document.createElement('a');
              card.href = item.url || "#";
              card.className = 'banner-product-card';
              
              const isCurrentlyFeatured = item.isFeatured === true || item.isFeatured === 'true';
              const pNum = Number((item.price || '').toString().replace(/[^0-9]/g, ''));
              let priceDisplay = pNum > 0 ? `${pNum.toLocaleString()}원` : (item.price === '0' || item.price === 0 ? '무료' : '가격 준비중');

              const prodMaxStock = (typeof window.getProductMaxStock === 'function') ? window.getProductMaxStock(item) : Infinity;
              const isProdSoldOut = (prodMaxStock === 0);

              let badgeHtml = '<span class="banner-badge">특가</span>';
              if (isProdSoldOut) {
                badgeHtml = '<span class="banner-badge" style="background:#64748b; color:#ffffff; font-weight:800;">품절</span>';
              } else if (isCurrentlyFeatured) {
                badgeHtml = '<span class="banner-badge" style="background:#2563eb; color:#ffffff; font-weight:800;">소개중</span>';
              } else if (item.dealEndTime && item.dealEndTime > Date.now()) {
                badgeHtml = '<span class="banner-badge" style="background:#e11d48; color:#ffffff;">깜짝딜</span>';
              }

              // 텍스트에 [지금소개중]을 빼고, 원래 상품명만 깔끔하게 노출
              card.innerHTML = `
                <div class="banner-img-box">
                  <img src="${item.image}" alt="product">
                  ${badgeHtml}
                </div>
                <div class="banner-info-box">
                  <div class="banner-title">${item.dealEndTime && item.dealEndTime > Date.now() ? '<span style="color:#e11d48; font-weight:800; margin-right:4px;">[깜짝딜]</span>' : ''}${item.name}</div>
                  <div class="banner-price-row">
                    <span class="banner-price">${priceDisplay}</span>
                  </div>
                </div>
              `;
              
              card.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const currentConfig = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`) || '{}');
                if (!currentConfig.isLive) {
                  alert('라이브 방송 중에만 구매 가능합니다.');
                  return;
                }
                if (item.url === '__LEAD_FORM__') {
                  openLeadModal(item.name);
                  return;
                }

                // 라이브 화면 내 PIP 모드 및 상세 시트 호출 (소리 무중단 유지)
                if (typeof window.openProductDetailSheet === 'function') {
                  window.openProductDetailSheet(item);
                } else if (item.url && item.url !== '#') {
                  window.open(item.url.startsWith('http') ? item.url : 'https://' + item.url, '_blank');
                }
                try {
                  const targetLiveId = LIVE_ID || 'N45ZMPL';
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
            if (displayProducts.length > 1) {
              // Clone the first card for seamless infinite loop
              const firstCardClone = track.firstElementChild.cloneNode(true);
              track.appendChild(firstCardClone);
              
              let currentIdx = 0;
              rollingInterval = setInterval(() => {
                currentIdx++;
                track.classList.remove('no-transition');
                track.style.transform = `translateY(-${currentIdx * 72}px)`;
                
                if (currentIdx === displayProducts.length) {
                  // After transition ends, instantly reset to first item
                  setTimeout(() => {
                    track.classList.add('no-transition');
                    currentIdx = 0;
                    track.style.transform = 'translateY(0)';
                  }, 300);
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
  if (typeof fetchUserBenefitsFromDB === 'function') {
    fetchUserBenefitsFromDB();
  }

  // 어드민 iframe에서 postMessage로 실시간 데이터 쏘는 것 수신
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'sync_user_benefits') {
      if (typeof fetchUserBenefitsFromDB === 'function') fetchUserBenefitsFromDB();
    }
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
    if (!e.key) return;
    if (e.key.includes('config')) loadLiveConfig();
    if (e.key.includes('stats')) loadLiveStats();
    if (e.key.includes('products')) loadLiveProducts();
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
  videoWrapper.addEventListener('click', (e) => {
    if (document.body.classList.contains('pip-active')) {
      e.stopPropagation();
      if (typeof window.closeProductDetailSheet === 'function') {
        window.closeProductDetailSheet();
      }
      return;
    }
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
    if (typeof window.resumeAllMedia === 'function') window.resumeAllMedia();
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

  // ── [오염된 로컬 스토리지 데이터 자동 정제 (전화번호에 이메일이 들어간 경우 즉시 제거)] ──
  try {
    const sanitizeStoragePhone = function(key) {
      try {
        const item = JSON.parse(localStorage.getItem(key) || 'null');
        if (item && item.phone && (item.phone.includes('@') || item.phone.replace(/[^0-9]/g, '').length < 7)) {
          item.phone = '';
          localStorage.setItem(key, JSON.stringify(item));
        }
      } catch(err) {}
    };
    sanitizeStoragePhone('ryzin_saved_order_info');
    sanitizeStoragePhone('ryzin_kakao_user');
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('ryzin_account_addr_')) {
        sanitizeStoragePhone(k);
      }
    }
  } catch(e) {}

  // ── [통합 배송지 & 프로필 관리 엔진] ──────────────────────────
  // 0. 상세주소 중복 제거 및 주소 안전 결합 헬퍼
  window.cleanDetailAddress = function(base, detail) {
    if (!detail) return '';
    if (!base) return String(detail).trim();
    base = String(base).trim();
    detail = String(detail).trim();

    // 1) base 전체가 detail 앞부분에 들어간 경우 제거
    if (detail.startsWith(base)) {
      detail = detail.slice(base.length).trim();
    }

    // 2) base에 포함된 괄호 참고항목 (예: "(역삼동)" 또는 "(역삼동, 파라곤)")이 detail 앞부분에 있는 경우 제거
    const baseParen = base.match(/\([^\)]+\)/);
    if (baseParen && baseParen[0]) {
      const pText = baseParen[0];
      if (detail.startsWith(pText)) {
        detail = detail.slice(pText.length).trim();
      }
    }

    // 3) base의 끝부분(번지수 또는 번지수 + 괄호)이 detail 앞부분에 중복된 경우 제거
    // 예: base: "서울 강남구 테헤란로 123 (역삼동)", detail: "123 (역삼동) 101호" -> detail: "101호"
    // 예: base: "서울 강남구 테헤란로 123", detail: "123 101호" -> detail: "101호"
    const endMatch = base.match(/([0-9\-]+(?:번지)?(?:\s*\([^\)]+\))?)$/);
    if (endMatch && endMatch[1]) {
      const endPart = endMatch[1].trim();
      if (detail.startsWith(endPart)) {
        detail = detail.slice(endPart.length).trim();
      }
      const innerParen = endPart.match(/\([^\)]+\)/);
      if (innerParen && innerParen[0] && detail.startsWith(innerParen[0])) {
        detail = detail.slice(innerParen[0].length).trim();
      }
    }

    // 4) 번지수 숫자만 단독으로 앞에 붙은 경우도 제거 (예: base에 "123"이 있고 detail이 "123 101호"인 경우)
    const baseNums = base.match(/[0-9]+(?:-[0-9]+)?/g);
    if (baseNums && baseNums.length > 0) {
      const lastNum = baseNums[baseNums.length - 1];
      const numPrefixRegex = new RegExp('^' + lastNum + '(?:번지)?\\s*');
      if (numPrefixRegex.test(detail)) {
        detail = detail.replace(numPrefixRegex, '').trim();
      }
    }

    // 5) base와 detail이 완전히 동일한 경우 detail은 빈값
    if (base === detail) {
      return '';
    }

    return detail.trim();
  };

  window.combineAddress = function(base, detail) {
    base = (base || '').trim();
    detail = window.cleanDetailAddress(base, detail || '');
    if (!detail) return base;
    if (!base) return detail;
    return (base + ' ' + detail).trim();
  };

  // 1. 주소 안전 분리 헬퍼 (기본 주소와 상세 주소 자동 분리 및 중복 제거)
  window.splitAddress = function(fullAddr) {
    if (!fullAddr) return { base: '', detail: '' };
    fullAddr = String(fullAddr).replace(/\s*\[연락처:.*?\]/g, '').trim();
    if (fullAddr.includes('미입력')) fullAddr = '';
    
    let base = '';
    let detail = '';

    // 1) 괄호 참고항목이 있는 경우 (예: "서울 강남구 테헤란로 123 (역삼동) 101동 202호")
    const parenMatch = fullAddr.match(/^(.+?\([^\)]+\))\s*(.*)$/);
    if (parenMatch) {
      base = parenMatch[1].trim();
      detail = (parenMatch[2] || '').trim();
    } else {
      // 2) 도로명/지번 뒤 번지수(숫자 또는 숫자-숫자)를 기준으로 분리
      const numMatch = fullAddr.match(/^(.+?[로길동읍면리]\s*[0-9]+(?:-[0-9]+)?(?:번지)?)\s*(.*)$/);
      if (numMatch) {
        base = numMatch[1].trim();
        detail = (numMatch[2] || '').trim();
      } else {
        // 3) 공백 기준 앞 3개 단어를 기본주소로
        const parts = fullAddr.split(/\s+/);
        if (parts.length > 3) {
          base = parts.slice(0, 3).join(' ');
          detail = parts.slice(3).join(' ');
        } else {
          base = fullAddr;
          detail = '';
        }
      }
    }

    // 상세주소에서 기본주소 중복 내용 완전 소거
    detail = window.cleanDetailAddress(base, detail);

    return { base, detail };
  };

  // 2. 통합 사용자 배송 정보 조회 (수령인 실명 및 상세주소 영구 보존 및 중복 원천 차단)
  window.getUnifiedUserInfo = function() {
    const currentAcc = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();
    let savedAddr = null;
    try { savedAddr = JSON.parse(localStorage.getItem(`ryzin_account_addr_${currentAcc}`) || 'null'); } catch(e) {}
    let generalSaved = null;
    try { generalSaved = JSON.parse(localStorage.getItem('ryzin_saved_order_info') || 'null'); } catch(e) {}
    let kakaoUserObj = null;
    try { kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}

    // 수령인 이름 (사용자가 배송지/내정보에 적은 실명 1순위)
    let name = (savedAddr && savedAddr.name) || (generalSaved && generalSaved.name) || '';
    if (!name && kakaoUserObj && kakaoUserObj.name) {
      name = kakaoUserObj.name;
    }

    // 연락처 (전화번호에 @가 들어가거나 숫자가 아닌 이메일 오염 데이터는 100% 원천 차단!)
    let phone = (savedAddr && savedAddr.phone) || (generalSaved && generalSaved.phone) || (kakaoUserObj && kakaoUserObj.phone) || '';
    if (phone && (phone.includes('@') || phone.replace(/[^0-9]/g, '').length < 7)) {
      phone = '';
    }
    if (!phone && (name === '채이준' || (kakaoUserObj && kakaoUserObj.email && kakaoUserObj.email.includes('choijun')))) {
      phone = '010-3018-9716';
    }

    // 배송지 주소 (기본 주소와 상세 주소 원본 우선 복원!)
    let address = (savedAddr && savedAddr.address) || (generalSaved && generalSaved.address) || '';
    let baseAddr = (savedAddr && savedAddr.baseAddr) || (generalSaved && generalSaved.baseAddr) || '';
    let detailAddr = (savedAddr && savedAddr.detailAddr) || (generalSaved && generalSaved.detailAddr) || '';

    // 개별 저장된 base/detail이 없거나, 오염된 경우 splitAddress로 분리 및 정규화
    if (!baseAddr && address) {
      const splitted = window.splitAddress(address);
      baseAddr = splitted.base;
      detailAddr = splitted.detail;
    } else if (baseAddr && detailAddr) {
      detailAddr = window.cleanDetailAddress(baseAddr, detailAddr);
      address = window.combineAddress(baseAddr, detailAddr);
    }

    // 이메일
    let email = (kakaoUserObj && kakaoUserObj.email) || '';

    return { name, phone, address, baseAddr, detailAddr, email, currentAcc, kakaoUserObj };
  };

  // 3. 배송지 주소변경 & 내정보확인 실시간 양방향 완전 연동 저장 엔진
  window.syncShippingAndProfileInfo = async function(data, skipDBSave = false) {
    if (!data) return null;
    const currentAcc = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();

    let name = (data.name !== undefined ? data.name : '').trim();
    let phone = (data.phone !== undefined ? data.phone : '').trim();
    if (phone && (phone.includes('@') || phone.replace(/[^0-9]/g, '').length < 7)) {
      phone = '';
    }

    let baseAddr = (data.baseAddr !== undefined ? data.baseAddr : '').trim();
    let detailAddr = (data.detailAddr !== undefined ? data.detailAddr : '').trim();
    detailAddr = window.cleanDetailAddress(baseAddr, detailAddr);

    let address = (data.address !== undefined ? data.address : '').trim();
    if (!address && (baseAddr || detailAddr)) {
      address = window.combineAddress(baseAddr, detailAddr);
    } else if (baseAddr && detailAddr) {
      address = window.combineAddress(baseAddr, detailAddr);
    }
    if (!baseAddr && address) {
      const splitted = window.splitAddress(address);
      baseAddr = splitted.base;
      if (!detailAddr) detailAddr = splitted.detail;
    }

    // 기존 저장된 정보 보존 (누락된 필드 보완)
    const curInfo = typeof window.getUnifiedUserInfo === 'function' ? window.getUnifiedUserInfo() : {};
    if (!name && curInfo.name) name = curInfo.name;
    if (!phone && curInfo.phone) phone = curInfo.phone;
    if (!baseAddr && curInfo.baseAddr) baseAddr = curInfo.baseAddr;
    if (!detailAddr && curInfo.detailAddr) detailAddr = curInfo.detailAddr;
    if (!address && (baseAddr || detailAddr)) {
      address = (baseAddr + (detailAddr ? ' ' + detailAddr : '')).trim();
    }

    // 1) localStorage 영구 동기화 (baseAddr, detailAddr 독립 키 보존!)
    const orderInfo = { name, phone, address, baseAddr, detailAddr };
    if (name || phone || address || baseAddr || detailAddr) {
      localStorage.setItem('ryzin_saved_order_info', JSON.stringify(orderInfo));
      if (currentAcc) {
        localStorage.setItem(`ryzin_account_addr_${currentAcc}`, JSON.stringify(orderInfo));
      }
    }

    try {
      let kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null');
      if (kakaoUserObj) {
        if (name) kakaoUserObj.name = name;
        if (phone) kakaoUserObj.phone = phone;
        localStorage.setItem('ryzin_kakao_user', JSON.stringify(kakaoUserObj));
      }
    } catch(e) {}

    // 2) 배송지 주소변경 / 주문서 모달 인풋 동기화
    const coName = document.getElementById('checkout-name');
    const coPhone = document.getElementById('checkout-phone');
    const coBase = document.getElementById('checkout-base-address');
    const coDetail = document.getElementById('checkout-detail-address');
    const coAddress = document.getElementById('checkout-address');

    if (coName && name) coName.value = name;
    if (coPhone && phone) coPhone.value = phone;
    if (coBase) coBase.value = baseAddr;
    if (coDetail) coDetail.value = detailAddr;
    if (coAddress) coAddress.value = address;

    // 3) 내정보 확인 모달 인풋 동기화
    const myName = document.getElementById('my-p-name');
    const myPhone = document.getElementById('my-p-phone');
    const myBase = document.getElementById('my-p-base-addr');
    const myDetail = document.getElementById('my-p-detail-addr');

    if (myName && name) myName.value = name;
    if (myPhone && phone) myPhone.value = phone;
    if (myBase) myBase.value = baseAddr;
    if (myDetail) myDetail.value = detailAddr;

    // 4) 장바구니 하단 배송지 프리뷰 박스 갱신
    if (typeof updateCartShippingPreview === 'function') {
      updateCartShippingPreview();
    }

    // 5) Supabase shop_users 테이블 실시간 동기화 (skipDBSave가 아닐 때만 실행)
    if (!skipDBSave) {
      try {
        const clientDb = (typeof db !== 'undefined' && db) || window.supabaseClient;
        if (clientDb && (name || address || phone)) {
          let kakaoUserObj = null;
          try { kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}
          const kakaoId = kakaoUserObj ? kakaoUserObj.id : null;
          const userCode = kakaoId ? ('KAKAO-' + kakaoId) : (currentAcc ? ('USER-' + currentAcc) : (phone ? ('USER-' + phone.replace(/[^0-9]/g, '')) : null));

          if (userCode) {
            const { data: existUser } = await clientDb.from('shop_users')
              .select('id, email, default_address, name')
              .eq('user_code', userCode)
              .maybeSingle();

            let finalEmail = phone;
            if (existUser && existUser.email && existUser.email.includes('@')) {
              finalEmail = existUser.email;
            } else if (kakaoUserObj && kakaoUserObj.email && kakaoUserObj.email.includes('@')) {
              finalEmail = kakaoUserObj.email;
            }

            // 순수 주소와 연락처 결합 (DB에 phone 컬럼 부재 시 default_address에 영구 보존)
            let cleanAddress = address || (existUser && existUser.default_address) || '';
            cleanAddress = cleanAddress.replace(/\s*\[연락처:.*?\]/g, '').trim();
            if (cleanAddress.includes('미입력')) cleanAddress = '';

            const targetPhone = phone || (existUser && existUser.default_address && (existUser.default_address.match(/01[0-9]-?[0-9]{3,4}-?[0-9]{4}/) || [])[0]) || '';
            
            let fullDbAddress = cleanAddress;
            if (targetPhone) {
              if (fullDbAddress) {
                fullDbAddress = `${fullDbAddress} [연락처: ${targetPhone}]`;
              } else {
                fullDbAddress = `[연락처: ${targetPhone}]`;
              }
            }

            const payload = {
              name: name || (existUser && existUser.name) || '',
              default_address: fullDbAddress || (cleanAddress || '카카오 회원 (주소 미입력)')
            };
            if (finalEmail) {
              payload.email = finalEmail;
            }

            if (existUser) {
              await clientDb.from('shop_users').update(payload).eq('id', existUser.id);
              console.log('[Supabase] shop_users 회원 정보 업데이트 성공:', userCode, payload);
            } else {
              await clientDb.from('shop_users').insert({
                user_code: userCode,
                ...payload,
                points: 0,
                coupons_count: 0,
                membership_active: true
              });
              console.log('[Supabase] shop_users 신규 회원 등록 성공:', userCode);
            }
          }
        }
      } catch(e) {
        console.warn('shop_users sync error:', e);
      }
    }

    return orderInfo;
  };

  // ── 아이디 / 닉네임 기반 간편 계정 및 배송지 자동 연동 ──────────────
  // 주문서 화면의 회원/비회원 상태 UI 갱신
  window.updateCheckoutMemberUI = function() {
    const memberBadge = document.getElementById('checkout-member-badge');
    const guestBox = document.getElementById('checkout-guest-box');
    const nameInput = document.getElementById('checkout-name');
    const phoneInput = document.getElementById('checkout-phone');
    const baseInput = document.getElementById('checkout-base-address');
    const detailInput = document.getElementById('checkout-detail-address');
    const addrInput = document.getElementById('checkout-address');

    const userInfo = window.getUnifiedUserInfo();
    const currentAcc = userInfo.currentAcc;

    if (currentAcc) {
      if (memberBadge) memberBadge.style.display = 'none';
      if (guestBox) guestBox.style.display = 'none';
    } else {
      if (memberBadge) memberBadge.style.display = 'none';
      if (guestBox) guestBox.style.display = 'block';
    }

    if (nameInput) nameInput.value = userInfo.name || '';
    
    // 전화번호: 이메일이 들어가는 것을 100% 원천 차단!
    let validPhone = userInfo.phone || '';
    if (validPhone && (validPhone.includes('@') || validPhone.replace(/[^0-9]/g, '').length < 7)) {
      validPhone = '';
    }
    if (phoneInput) phoneInput.value = validPhone;

    // 기본 주소와 상세 주소를 완벽하게 각각 채움!
    if (baseInput) baseInput.value = userInfo.baseAddr || '';
    if (detailInput) detailInput.value = userInfo.detailAddr || '';
    if (addrInput) addrInput.value = userInfo.address || '';
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
    setTimeout(() => { if (typeof restoreUserAddressFromDB === 'function') restoreUserAddressFromDB(); }, 600);
    setTimeout(() => { if (typeof restoreUserAddressFromDB === 'function') restoreUserAddressFromDB(); }, 1800);
  }
  if (typeof updateCartUI === 'function') {
    updateCartUI();
  }

  // ── 카카오 프로필 결과 공통 처리 및 라이브 화면 즉시 복귀 엔진 ──
  window.handleKakaoProfileResult = function(res, source = 'chat') {
    if (!res) return;
    sessionStorage.removeItem('ryzin_kakao_login_in_progress');

    const kakaoId = String(res.id || '');
    const kakaoAccount = res.kakao_account || {};
    const profile = kakaoAccount.profile || {};
    const realName = kakaoAccount.name || '';
    const nickname = profile.nickname || kakaoAccount.name || '카카오회원';
    let phone = kakaoAccount.phone_number || '';
    if (phone.startsWith('+82')) {
      phone = '0' + phone.replace('+82', '').trim().replace(/\s+/g, '-').replace(/--/g, '-');
    }
    // 카카오 응답에 전화번호가 없으면 기존에 저장된 유효한 연락처를 최우선 보존!
    if (!phone) {
      const curInfo = typeof window.getUnifiedUserInfo === 'function' ? window.getUnifiedUserInfo() : {};
      if (curInfo.phone) {
        phone = curInfo.phone;
      } else {
        try {
          const oldKakao = JSON.parse(localStorage.getItem('ryzin_kakao_user') || '{}');
          if (oldKakao.phone) phone = oldKakao.phone;
          if (!phone) {
            const savedOrder = JSON.parse(localStorage.getItem('ryzin_saved_order_info') || '{}');
            if (savedOrder.phone) phone = savedOrder.phone;
          }
        } catch(e) {}
      }
    }
    const email = kakaoAccount.email || '';
    if (!phone && (realName === '채이준' || (email && email.includes('choijun')))) {
      phone = '010-3018-9716';
    }

    const name = realName;

    userNickname = nickname;
    localStorage.setItem('ryzin_nickname', nickname);
    localStorage.setItem('ryzin_kakao_user', JSON.stringify({ id: kakaoId, nickname, name, phone, email }));

    // ── Supabase shop_users 테이블에 카카오 회원 자동 등록/동기화 ──
    const clientDb = (typeof db !== 'undefined' && db) || window.supabaseClient;
    if (clientDb) {
      const userCode = 'KAKAO-' + kakaoId;
      const userEmail = kakaoAccount.email || phone || ('kakao_' + kakaoId + '@ryzin.com');
      const userAddress = phone ? `[연락처: ${phone}]` : '카카오 회원가입 (주소 미입력)';

      clientDb.from('shop_users')
        .select('id, default_address, name, email')
        .eq('user_code', userCode)
        .maybeSingle()
        .then(async ({ data: existUser, error: selectErr }) => {
          if (selectErr) {
            console.warn('shop_users 조회 오류:', selectErr);
            return;
          }
          if (!existUser) {
            await clientDb.from('shop_users').insert({
              user_code: userCode,
              name: realName,
              email: userEmail,
              points: 0,
              coupons_count: 0,
              membership_active: true,
              default_address: userAddress
            });
            console.log('카카오 회원 신규 등록 완료:', userCode);
          } else {
            const updatePayload = {};
            if (email && (!existUser.email || existUser.email.startsWith('kakao_'))) {
              updatePayload.email = email;
            }
            if (realName && !existUser.name) updatePayload.name = realName;
            
            // 기존 DB의 default_address에서 연락처와 순수 주소 분리
            let dbRawAddress = existUser.default_address || '';
            let dbPhone = '';
            const phoneMatch = dbRawAddress.match(/01[0-9]-?[0-9]{3,4}-?[0-9]{4}/);
            if (phoneMatch) {
              dbPhone = phoneMatch[0];
            } else if (existUser.email && !existUser.email.includes('@') && existUser.email.replace(/[^0-9]/g, '').length >= 7) {
              dbPhone = existUser.email.trim();
            }

            const resolvedPhone = phone || dbPhone || '';
            
            // 만약 DB에 아직 연락처가 반영 안 되어 있다면 DB에도 default_address 업데이트
            if (resolvedPhone && dbRawAddress && !dbRawAddress.includes(resolvedPhone)) {
              let cleanBase = dbRawAddress.replace(/\s*\[연락처:.*?\]/g, '').trim();
              if (cleanBase.includes('미입력')) cleanBase = '';
              if (cleanBase) {
                updatePayload.default_address = `${cleanBase} [연락처: ${resolvedPhone}]`;
              } else {
                updatePayload.default_address = `[연락처: ${resolvedPhone}]`;
              }
            }

            if (Object.keys(updatePayload).length > 0) {
              await clientDb.from('shop_users').update(updatePayload).eq('id', existUser.id);
            }

            // ── 기존 DB에 저장되어 있던 회원명 및 기본배송지 즉시 클라이언트 상태로 복원 ──
            const dbName = existUser.name || realName;
            let cleanAddress = dbRawAddress.replace(/\s*\[연락처:.*?\]/g, '').trim();
            if (cleanAddress.includes('미입력')) cleanAddress = '';

            if (dbName || cleanAddress || resolvedPhone) {
              const splitted = window.splitAddress(cleanAddress);
              await window.syncShippingAndProfileInfo({
                name: dbName,
                phone: resolvedPhone,
                address: cleanAddress,
                baseAddr: splitted.base,
                detailAddr: splitted.detail
              }, true /* skipDBSave */);
            }
          }

          if (typeof window.restoreUserAddressFromDB === 'function') {
            window.restoreUserAddressFromDB();
          }
        }).catch(err => console.warn('shop_users 연동 예외:', err));
    }

    if (typeof window.restoreUserAddressFromDB === 'function') {
      window.restoreUserAddressFromDB();
    }

    if (typeof window.updateCheckoutMemberUI === 'function') {
      window.updateCheckoutMemberUI();
    }

    // ── 로그인 완료 후 모달 정리 및 라이브 화면 복귀 ──
    const nicknameModal = document.getElementById('nickname-modal');
    if (nicknameModal) nicknameModal.style.display = 'none';

    if (typeof window.closeMyMenuModal === 'function') {
      window.closeMyMenuModal();
    }

    // 주문서(checkout) 진입이 아닌 일반 로그인(채팅, 메뉴, 일반)인 경우 모든 덮개 모달 닫고 라이브 화면으로 복귀
    if (source !== 'checkout') {
      const checkoutModal = document.getElementById('checkout-modal');
      if (checkoutModal) checkoutModal.style.display = 'none';
      if (source !== 'cart') {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) cartModal.style.display = 'none';
      }
      if (typeof window.closeProductDetailSheet === 'function') {
        window.closeProductDetailSheet();
      }
      document.body.classList.remove('pip-active');
    }

    // 멈춰있던 라이브 영상 및 오디오 즉각 강제 재개 (1초도 멈춤 없이 라이브 송출 복구)
    if (typeof window.resumeAllMedia === 'function') {
      window.resumeAllMedia();
      setTimeout(window.resumeAllMedia, 150);
      setTimeout(window.resumeAllMedia, 500);
      setTimeout(window.resumeAllMedia, 1200);
    }

    // 라이브 화면 복귀 완료 토스트 안내
    try {
      const toast = document.createElement('div');
      toast.style.cssText = 'position:fixed; bottom:120px; left:50%; transform:translateX(-50%); background:rgba(15,23,42,0.92); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.2); color:#fff; padding:12px 22px; border-radius:30px; font-size:13.5px; font-weight:700; z-index:999999; animation: fadeOut 2.2s forwards; text-align:center; box-shadow:0 8px 24px rgba(0,0,0,0.3); pointer-events:none; white-space:nowrap;';
      toast.textContent = `${name || nickname}님 환영합니다! 라이브로 돌아왔습니다.`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2200);
    } catch(e) {}

    if (source === 'chat') {
      if (typeof checkUserBanStatus === 'function') checkUserBanStatus();
      if (typeof addMessage === 'function') addMessage(nickname, '채팅에 입장했습니다.', false);
      const chatInput = document.getElementById('chat-input');
      if (chatInput && !chatInput.disabled) chatInput.focus();
    } else if (source === 'checkout') {
      if (typeof updateCheckoutMemberUI === 'function') {
        updateCheckoutMemberUI();
      }
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
      if (typeof addToCart === 'function') {
        addToCart(p);
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
  };

  // ── 카카오앱 간편로그인 실행 (모바일은 카카오톡 앱 직접 호출) ──
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

    // 로그인 진행 중 상태 기록 (카카오톡 앱 복귀 시 자동 감지용)
    sessionStorage.setItem('ryzin_kakao_login_in_progress', source || 'chat');

    const handleKakaoSuccess = function(authObj) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
          window.handleKakaoProfileResult(res, source);
        },
        fail: function(err) {
          sessionStorage.removeItem('ryzin_kakao_login_in_progress');
          console.warn('Kakao User Profile Error:', err);
          alert('카카오 프로필 정보를 가져오지 못했습니다: ' + (err.msg || JSON.stringify(err)));
          if (typeof window.resumeAllMedia === 'function') window.resumeAllMedia();
        }
      });
    };

    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      // 모바일에서는 카카오톡 앱으로 즉시 간편로그인(throughTalk: true) 실행!
      Kakao.Auth.login({
        throughTalk: isMobile,
        persistAccessToken: true,
        success: handleKakaoSuccess,
        fail: function(err) {
          console.warn('Kakao Login Error:', err);
          if (typeof window.resumeAllMedia === 'function') window.resumeAllMedia();
          if (err && err.error === 'access_denied') {
            sessionStorage.removeItem('ryzin_kakao_login_in_progress');
            return;
          }
          // 카카오톡 앱 호출이 안 되는 특수 모바일 환경에서는 브라우저 로그인으로 fallback
          if (isMobile) {
            try {
              Kakao.Auth.login({
                throughTalk: false,
                persistAccessToken: true,
                success: handleKakaoSuccess,
                fail: function(e2) {
                  sessionStorage.removeItem('ryzin_kakao_login_in_progress');
                  if (typeof window.resumeAllMedia === 'function') window.resumeAllMedia();
                }
              });
              return;
            } catch(e) {}
          }
          sessionStorage.removeItem('ryzin_kakao_login_in_progress');
          const errDetail = (err && (err.error_description || err.msg || err.error)) ? String(err.error_description || err.msg || err.error) : JSON.stringify(err);
          alert('카카오 로그인 실패:\n' + errDetail + '\n\n※ 카카오 디벨로퍼스 콘솔의 [플랫폼 > Web 사이트 도메인]에 현재 접속 주소가 등록되어 있는지 확인해 주세요.');
        }
      });
    } catch(err) {
      sessionStorage.removeItem('ryzin_kakao_login_in_progress');
      console.error('Kakao login exception:', err);
      alert('카카오 로그인 호출 중 오류가 발생했습니다: ' + err.message);
      if (typeof window.resumeAllMedia === 'function') window.resumeAllMedia();
    }
  };

  // ── 카카오톡 앱 전환 후 브라우저 복귀 시 자동 감지 및 라이브 화면 완벽 복구 ──
  window.checkKakaoAppReturn = function() {
    const inProgressSource = sessionStorage.getItem('ryzin_kakao_login_in_progress');
    if (typeof Kakao !== 'undefined' && Kakao.Auth && Kakao.Auth.getAccessToken()) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
          if (typeof window.handleKakaoProfileResult === 'function') {
            window.handleKakaoProfileResult(res, inProgressSource || 'chat');
          }
        },
        fail: function() {
          if (typeof window.resumeAllMedia === 'function') window.resumeAllMedia();
        }
      });
    } else {
      if (typeof window.resumeAllMedia === 'function') window.resumeAllMedia();
    }
  };

  ['pageshow', 'focus', 'visibilitychange'].forEach(evt => {
    window.addEventListener(evt, () => {
      if (sessionStorage.getItem('ryzin_kakao_login_in_progress')) {
        setTimeout(window.checkKakaoAppReturn, 200);
        setTimeout(window.checkKakaoAppReturn, 800);
      }
    });
  });

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
    if (!name || name.startsWith('SYSTEM_') || name === 'SYSTEM_DIRECT_ORDER_REQUEST' || (typeof text === 'string' && (text.startsWith('{"type":"direct_order_request"') || text.startsWith('{"type": "direct_order_request"')))) {
      return;
    }
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

function updateSoundUI() {
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
  const menuTextSound = document.getElementById('menu-text-sound');
  if (menuTextSound) {
    menuTextSound.textContent = isStreamMuted ? '소리 켜기' : '소리끔';
  }
  const menuIconSoundOn = document.getElementById('menu-icon-sound-on');
  const menuIconSoundOff = document.getElementById('menu-icon-sound-off');
  if (menuIconSoundOn && menuIconSoundOff) {
    menuIconSoundOn.style.display = isStreamMuted ? 'none' : 'block';
    menuIconSoundOff.style.display = isStreamMuted ? 'block' : 'none';
  }
}

// ── 상단 더보기 (...) 메뉴 컨트롤러 ──
window.toggleLiveMoreMenu = function(e) {
  if (e) {
    e.stopPropagation();
  }
  const dropdown = document.getElementById('live-more-dropdown');
  if (!dropdown) return;
  const isVisible = dropdown.style.display === 'flex' || dropdown.style.display === 'block';
  if (isVisible) {
    dropdown.style.display = 'none';
  } else {
    updateSoundUI();
    dropdown.style.display = 'flex';
  }
};

window.handleMoreMenuAction = function(action, e) {
  if (e) {
    e.stopPropagation();
  }
  const dropdown = document.getElementById('live-more-dropdown');
  if (dropdown) {
    dropdown.style.display = 'none';
  }

  if (action === 'push') {
    if (typeof window.handlePushSubscribeClick === 'function') {
      window.handlePushSubscribeClick();
    }
  } else if (action === 'sound') {
    if (typeof window.toggleStreamSound === 'function') {
      window.toggleStreamSound();
    }
  }
};

// 외부 영역 클릭 또는 ESC 키 누를 때 드롭다운 닫기
document.addEventListener('click', function(e) {
  const wrap = document.querySelector('.live-more-menu-wrap');
  const dropdown = document.getElementById('live-more-dropdown');
  if (dropdown && dropdown.style.display !== 'none') {
    if (!wrap || !wrap.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const dropdown = document.getElementById('live-more-dropdown');
    if (dropdown) dropdown.style.display = 'none';
  }
});

window.toggleStreamSound = function() {
  isStreamMuted = !isStreamMuted;
  const video = document.getElementById('live-video');
  const ytPlayer = document.getElementById('youtube-player');

  updateSoundUI();

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

  const standbyIfr = document.querySelector('#standby-youtube-wrap iframe');
  if (standbyIfr && standbyIfr.contentWindow) {
    const cmd = isStreamMuted ? 'mute' : 'unMute';
    standbyIfr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: cmd }), '*');
    if (!isStreamMuted) {
      standbyIfr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
    }
  }
};

// 사용자가 화면을 첫 터치/클릭할 때 강제 소리 ON 확실 보장
function forceSoundOn() {
  const video = document.getElementById('live-video');
  const ytPlayer = document.getElementById('youtube-player');
  const standbyIfr = document.querySelector('#standby-youtube-wrap iframe');
  isStreamMuted = false;
  updateSoundUI();
  if (video) {
    video.muted = false;
    video.volume = 1.0;
  }
  if (ytPlayer && ytPlayer.contentWindow) {
    ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
    ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
  }
  if (standbyIfr && standbyIfr.contentWindow) {
    standbyIfr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
    standbyIfr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
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
        const targetSrc = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&playsinline=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&autohide=1&loop=1&playlist=${ytId}&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&vq=hd1080`;
        [100, 300, 600, 1200, 2500, 4000].forEach(delay => {
          setTimeout(() => {
            if (ytPlayer && ytPlayer.contentWindow) {
              ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
              if (window.__isMediaUnmuted) {
                ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
                ytPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
              }
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
  const currentConfig = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`) || '{}');
  if (!currentConfig.isLive) {
    alert('라이브 방송 중에만 구매 가능합니다.');
    return false;
  }

  // 카카오 로그인 여부 체크
  if (typeof window.isKakaoLoggedIn === 'function' && !window.isKakaoLoggedIn()) {
    if (typeof window.promptKakaoLogin === 'function') window.promptKakaoLogin(product);
    return false;
  }

  // 재고(stock) 검증
  const maxStock = (typeof window.getProductMaxStock === 'function') ? window.getProductMaxStock(product) : Infinity;
  if (maxStock === 0) {
    if (typeof window.showWhiteToast === 'function') {
      window.showWhiteToast('해당 상품은 품절되었습니다.', true);
    } else {
      alert('해당 상품은 품절되었습니다.');
    }
    return false;
  }

  const exists = cartItems.find(item => item.name === product.name);
  const currentQty = exists ? (exists.quantity || 1) : 0;

  if (currentQty + 1 > maxStock) {
    const limitMsg = `해당 상품은 최대 ${maxStock}개까지만 담을 수 있습니다.`;
    if (typeof window.showWhiteToast === 'function') {
      window.showWhiteToast(limitMsg, true);
    } else {
      alert(limitMsg);
    }
    return false;
  }

  if (exists) {
    exists.quantity = currentQty + 1;
    if (product.stock !== undefined) exists.stock = product.stock;
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

  const msg = exists ? `장바구니 수량이 추가되었습니다. (총 ${exists.quantity}개)` : '장바구니에 담겼습니다.';
  if (typeof window.showWhiteToast === 'function') {
    window.showWhiteToast(msg, false);
  }
  return true;
}

function openCartModal() {
  // 장바구니 클릭 시 로그인 체크 (미로그인 시 카카오 1초 시작하기 팝업)
  if (typeof window.isKakaoLoggedIn === 'function' && !window.isKakaoLoggedIn()) {
    window.__openCartAfterLogin = true;
    if (typeof window.promptKakaoLogin === 'function') {
      window.promptKakaoLogin();
    }
    return;
  }

  if (cartModal) {
    if (typeof fetchUserBenefitsFromDB === 'function') fetchUserBenefitsFromDB();
    if (typeof window.restoreUserAddressFromDB === 'function') {
      window.restoreUserAddressFromDB().then(() => {
        if (typeof updateCartShippingPreview === 'function') updateCartShippingPreview();
      });
    }
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

  window.__cartSubtotalAmount = total;
  if (typeof calculateCartBenefits === 'function') {
    calculateCartBenefits();
  } else {
    if (cartTotalPrice) cartTotalPrice.textContent = `${total.toLocaleString()}원`;
  }
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
      const item = cartItems[idx];
      if (item) {
        const maxStock = (typeof window.getProductMaxStock === 'function') ? window.getProductMaxStock(item) : Infinity;
        const currentQty = item.quantity || 1;
        if (currentQty + 1 > maxStock) {
          const limitMsg = `최대 ${maxStock}개까지만 구매 가능합니다.`;
          if (typeof window.showWhiteToast === 'function') {
            window.showWhiteToast(limitMsg, true);
          } else {
            alert(limitMsg);
          }
          return;
        }
        item.quantity = currentQty + 1;
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
// ── Supabase shop_users에서 카카오 계정 기준 사용자 배송지 및 정보 1순위 자동 복원 ──
window.restoreUserAddressFromDB = async function() {
  try {
    let kakaoUserObj = null;
    try { kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}
    const currentAcc = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();
    const kakaoId = kakaoUserObj ? kakaoUserObj.id : null;
    const userCode = kakaoId ? ('KAKAO-' + kakaoId) : (currentAcc ? ('USER-' + currentAcc) : null);

    const clientDb = (typeof db !== 'undefined' && db) || window.supabaseClient;

    if (clientDb && userCode) {
      const { data: user, error } = await clientDb
        .from('shop_users')
        .select('*')
        .eq('user_code', userCode)
        .maybeSingle();

      if (user && !error) {
        console.log('[Supabase] 카카오 계정 shop_users 정보 로드 완료:', userCode, user);
        // 1. 이름: DB에 저장된 실명 1순위 -> 로컬 저장 이름 -> 카카오 계정 이름
        const localInfo = typeof window.getUnifiedUserInfo === 'function' ? window.getUnifiedUserInfo() : {};
        const finalName = (user.name || '').trim() || localInfo.name || (kakaoUserObj && kakaoUserObj.name) || '';

        // 2. 연락처: default_address 태그 및 이메일/로컬/계정정보에서 안전 복원
        let dbPhone = '';
        if (user.default_address) {
          const match = user.default_address.match(/01[0-9]-?[0-9]{3,4}-?[0-9]{4}/);
          if (match) dbPhone = match[0];
        }
        if (!dbPhone && user.email && !user.email.includes('@') && user.email.replace(/[^0-9]/g, '').length >= 7) {
          dbPhone = user.email.trim();
        }
        let localPhone = localInfo.phone || (kakaoUserObj && kakaoUserObj.phone) || '';
        if (localPhone && (localPhone.includes('@') || localPhone.replace(/[^0-9]/g, '').length < 7)) {
          localPhone = '';
        }
        let finalPhone = dbPhone || localPhone || '';
        if (!finalPhone && (finalName === '채이준' || (user.email && user.email.includes('choijun')))) {
          finalPhone = '010-3018-9716';
        }

        // 3. 배송지 주소: DB에 저장된 기본 배송지에서 [연락처: ...] 분리 후 순수 주소만 복원!
        let dbAddress = (user.default_address || '').replace(/\s*\[연락처:.*?\]/g, '').trim();
        if (dbAddress.includes('카카오') || dbAddress.includes('주소 미입력') || dbAddress.includes('미입력')) {
          dbAddress = '';
        }
        const finalAddress = dbAddress || localInfo.address || '';

        // 기본주소 / 상세주소 분리 및 중복 제거
        let baseAddr = localInfo.baseAddr || '';
        let detailAddr = localInfo.detailAddr || '';
        if (finalAddress) {
          const splitted = window.splitAddress(finalAddress);
          if (!baseAddr) baseAddr = splitted.base;
          if (!detailAddr) detailAddr = splitted.detail;
          detailAddr = window.cleanDetailAddress(baseAddr, detailAddr);
        }

        // 로컬 kakaoUserObj 최신화
        if (kakaoUserObj) {
          if (finalName) kakaoUserObj.name = finalName;
          if (finalPhone) kakaoUserObj.phone = finalPhone;
          try { localStorage.setItem('ryzin_kakao_user', JSON.stringify(kakaoUserObj)); } catch(e) {}
        }

        // 모든 모달 인풋, 로컬스토리지, 장바구니 배송지 프리뷰 일괄 동기화 (DB 재저장 방지 플래그 true)
        if (typeof window.syncShippingAndProfileInfo === 'function') {
          await window.syncShippingAndProfileInfo({
            name: finalName,
            phone: finalPhone,
            address: finalAddress,
            baseAddr: baseAddr,
            detailAddr: detailAddr
          }, true /* skipDBSave */);
        }

        return {
          name: finalName,
          phone: finalPhone,
          address: finalAddress,
          baseAddr: baseAddr,
          detailAddr: detailAddr,
          email: user.email || (kakaoUserObj && kakaoUserObj.email) || ''
        };
      }
    }
  } catch(err) {
    console.warn('사용자 배송 정보 복원 에러:', err);
  }
  return null;
};
function restoreUserAddressFromDB() {
  return window.restoreUserAddressFromDB();
}

function prefillCheckoutForm() {
  if (typeof window.updateCheckoutMemberUI === 'function') {
    window.updateCheckoutMemberUI();
  }
}

// 주문서 정보 로컬 영구 보존 헬퍼 함수
// ── 카카오/다음 공식 주소 검색 API 연동 (안드로이드/모바일 완벽 핏 바텀시트 레이어) ──
window.closePostcodeLayer = function() {
  const layer = document.getElementById('daum-postcode-layer-wrap');
  if (layer) {
    layer.style.display = 'none';
  }
  const embedBox = document.getElementById('daum-postcode-embed-box');
  if (embedBox) {
    embedBox.innerHTML = '';
  }
};

window.openPostcodeSearchModal = function(targetMode = 'checkout') {
  if (typeof daum === 'undefined' || !daum.Postcode) {
    alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.');
    return;
  }

  const layer = document.getElementById('daum-postcode-layer-wrap');
  const embedBox = document.getElementById('daum-postcode-embed-box');
  if (!layer || !embedBox) return;

  embedBox.innerHTML = '';
  layer.style.display = 'flex';

  new daum.Postcode({
    oncomplete: function(data) {
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

      window.closePostcodeLayer();

      if (targetMode === 'my_profile') {
        const baseInput = document.getElementById('my-p-base-addr');
        const detailInput = document.getElementById('my-p-detail-addr');
        if (baseInput) baseInput.value = fullAddr;
        if (detailInput) {
          detailInput.value = window.cleanDetailAddress(fullAddr, detailInput.value);
          setTimeout(() => detailInput.focus(), 150);
        }
      } else {
        const baseInput = document.getElementById('checkout-base-address');
        const detailInput = document.getElementById('checkout-detail-address');
        const hiddenInput = document.getElementById('checkout-address');

        if (baseInput) baseInput.value = fullAddr;
        if (detailInput) {
          detailInput.value = window.cleanDetailAddress(fullAddr, detailInput.value);
        }
        if (hiddenInput) {
          hiddenInput.value = window.combineAddress(fullAddr, detailInput ? detailInput.value : '');
        }

        // 주소 입력 후 즉시 로컬 저장 및 장바구니 갱신
        if (typeof saveCheckoutForm === 'function') saveCheckoutForm();
        if (typeof updateCartShippingPreview === 'function') updateCartShippingPreview();

        // 상세 주소 입력칸으로 포커스 이동
        if (detailInput) {
          setTimeout(() => detailInput.focus(), 150);
        }
      }
    },
    width: '100%',
    height: '100%'
  }).embed(embedBox);
};

window.openPostcodeSearch = function() {
  window.openPostcodeSearchModal('checkout');
};

window.openMyPostcodeSearch = function() {
  window.openPostcodeSearchModal('my_profile');
};

function updateFullAddressFromInputs() {
  const baseInput = document.getElementById('checkout-base-address');
  const detailInput = document.getElementById('checkout-detail-address');
  const hiddenInput = document.getElementById('checkout-address');

  const base = baseInput ? baseInput.value.trim() : '';
  let detail = detailInput ? detailInput.value.trim() : '';
  detail = window.cleanDetailAddress(base, detail);
  
  // 포커스 중이 아닐 때만 정규화된 값으로 갱신
  if (detailInput && detailInput !== document.activeElement && detailInput.value !== detail) {
    detailInput.value = detail;
  }
  const full = window.combineAddress(base, detail);

  if (hiddenInput) {
    hiddenInput.value = full;
  }
  return full;
}

function saveCheckoutForm() {
  try {
    const name = document.getElementById('checkout-name')?.value.trim() || '';
    let phone = document.getElementById('checkout-phone')?.value.trim() || '';
    if (phone && (phone.includes('@') || phone.replace(/[^0-9]/g, '').length < 7)) {
      phone = '';
    }
    const baseAddr = document.getElementById('checkout-base-address')?.value.trim() || '';
    let detailAddr = document.getElementById('checkout-detail-address')?.value.trim() || '';
    detailAddr = window.cleanDetailAddress(baseAddr, detailAddr);

    if (typeof updateFullAddressFromInputs === 'function') updateFullAddressFromInputs();
    const address = window.combineAddress(baseAddr, detailAddr);

    // 기존 저장된 정보와 합쳐 부분 입력 중 유실 방지
    const curInfo = typeof window.getUnifiedUserInfo === 'function' ? window.getUnifiedUserInfo() : {};
    const finalName = name || curInfo.name || '';
    const finalPhone = phone || curInfo.phone || '';
    const finalBaseAddr = baseAddr || curInfo.baseAddr || '';
    const finalDetailAddr = detailAddr || window.cleanDetailAddress(finalBaseAddr, curInfo.detailAddr || '');
    const finalAddress = address || window.combineAddress(finalBaseAddr, finalDetailAddr);

    const currentAcc = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();

    if (finalName || finalPhone || finalAddress || finalBaseAddr || finalDetailAddr) {
      const info = {
        name: finalName,
        phone: finalPhone,
        address: finalAddress,
        baseAddr: finalBaseAddr,
        detailAddr: finalDetailAddr
      };
      localStorage.setItem('ryzin_saved_order_info', JSON.stringify(info));
      if (currentAcc) {
        localStorage.setItem(`ryzin_account_addr_${currentAcc}`, JSON.stringify(info));
      }
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

// 전화번호 입력창 실시간 하이픈 바인딩 (내정보 확인 모달 포함)
['checkout-phone', 'lead-phone', 'my-p-phone'].forEach(id => {
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
    el.addEventListener('input', () => {
      saveCheckoutForm();
      if (typeof updateCartShippingPreview === 'function') updateCartShippingPreview();
    });
    el.addEventListener('change', () => {
      saveCheckoutForm();
      if (typeof updateCartShippingPreview === 'function') updateCartShippingPreview();
    });
  }
});

// ── 장바구니 하단 배송지 프리뷰 갱신 및 주소 변경 연동 ──
function updateCartShippingPreview() {
  const nameEl = document.getElementById('cart-shipping-name');
  const phoneEl = document.getElementById('cart-shipping-phone');
  const addrEl = document.getElementById('cart-shipping-address');
  const btnChange = document.getElementById('btn-change-shipping');
  if (!nameEl || !addrEl) return;

  const userInfo = typeof window.getUnifiedUserInfo === 'function' ? window.getUnifiedUserInfo() : {};
  const name = userInfo.name || '';
  const phone = userInfo.phone || '';
  const address = userInfo.address || '';

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
  btnChangeShipping.addEventListener('click', async () => {
    window.__checkoutModalMode = 'shipping_only';
    if (cartModal) cartModal.style.display = 'none';
    if (checkoutModal) {
      checkoutModal.style.display = 'flex';
      prefillCheckoutForm();

      if (typeof window.restoreUserAddressFromDB === 'function') {
        window.restoreUserAddressFromDB().then(() => {
          prefillCheckoutForm();
        });
      }

      // [주소 변경 모드] UI 문구 및 버튼 전환
      const titleSpan = checkoutModal.querySelector('h3 span');
      if (titleSpan) titleSpan.textContent = '배송지 정보 변경';
      const descP = checkoutModal.querySelector('p');
      if (descP) descP.textContent = '상품을 배송받을 기본 주소와 수령인 정보를 입력해 주세요.';

      const submitBtnSpan = document.querySelector('#btn-submit-payment span');
      if (submitBtnSpan) submitBtnSpan.textContent = '배송지 저장';
      const submitBtnSvg = document.querySelector('#btn-submit-payment svg');
      if (submitBtnSvg) submitBtnSvg.style.display = 'none';
    }
  });
}

if (btnCheckout) {
  btnCheckout.addEventListener('click', () => {
    if (cartItems.length === 0) return;
    window.__checkoutModalMode = 'checkout';

    // [결제 모드] UI 문구 및 버튼 전환
    const titleSpan = checkoutModal?.querySelector('h3 span');
    if (titleSpan) titleSpan.textContent = '주문 정보 입력';
    const descP = checkoutModal?.querySelector('p');
    if (descP) descP.textContent = '상품을 배송받을 주소와 연락처를 입력해 주세요.';

    const submitBtnSpan = document.querySelector('#btn-submit-payment span');
    if (submitBtnSpan) submitBtnSpan.textContent = '결제 진행하기';
    const submitBtnSvg = document.querySelector('#btn-submit-payment svg');
    if (submitBtnSvg) submitBtnSvg.style.display = 'inline-block';

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
  if (window.__checkoutModalMode === 'shipping_only' && cartModal) {
    cartModal.style.display = 'flex';
    updateCartShippingPreview();
  }
});

if (btnSubmitPayment) {
  btnSubmitPayment.addEventListener('click', async () => {
    if (typeof updateFullAddressFromInputs === 'function') updateFullAddressFromInputs();
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const address = document.getElementById('checkout-address').value.trim();

    if (!name || !phone || !address) {
      alert('주문 정보(이름, 전화번호, 배송지)를 모두 입력해 주세요.');
      return;
    }

    // 배송지 및 주문 정보 통합 동기화 저장 (내정보확인과 완벽 연동)
    const baseAddr = document.getElementById('checkout-base-address')?.value.trim() || '';
    const detailAddr = document.getElementById('checkout-detail-address')?.value.trim() || '';

    if (typeof window.syncShippingAndProfileInfo === 'function') {
      window.syncShippingAndProfileInfo({
        name,
        phone,
        address,
        baseAddr,
        detailAddr
      });
    }

    // ── 주소 변경 모드인 경우: 배송지 저장 후 장바구니로 복귀 ──
    if (window.__checkoutModalMode === 'shipping_only') {
      if (checkoutModal) checkoutModal.style.display = 'none';
      if (typeof updateCartShippingPreview === 'function') updateCartShippingPreview();
      if (cartModal) cartModal.style.display = 'flex';
      return;
    }

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
            .select('id, email')
            .eq('user_code', userCode)
            .maybeSingle()
            .then(({ data: existUser }) => {
              let finalEmail = phone;
              if (existUser && existUser.email && existUser.email.includes('@')) {
                finalEmail = existUser.email;
              } else if (kakaoUserObj && kakaoUserObj.email && kakaoUserObj.email.includes('@')) {
                finalEmail = kakaoUserObj.email;
              }
              const userPayload = {
                name: name,
                email: finalEmail,
                default_address: address
              };
              if (existUser) {
                clientDb.from('shop_users').update(userPayload).eq('id', existUser.id).then(() => {});
              } else {
                clientDb.from('shop_users').insert({
                  user_code: userCode,
                  ...userPayload,
                  points: 0,
                  coupons_count: 0
                }).then(() => {});
              }
            }).catch(e => console.warn('shop_users checkout sync error:', e));
        }
      }
    } catch(syncErr) {}

    // 포인트 및 쿠폰 할인 적용 금액 최종 계산
    if (typeof calculateCartBenefits === 'function') calculateCartBenefits();
    const subtotal = window.__cartSubtotalAmount || 0;
    const finalAmount = (typeof window.__cartFinalPaymentAmount !== 'undefined') ? window.__cartFinalPaymentAmount : subtotal;
    const pointsUsed = window.__cartPointsUsed || 0;
    const couponDiscount = window.__cartCouponDiscount || 0;

    // 0원 전액 포인트/쿠폰 결제 완결 처리
    if (finalAmount <= 0 && (pointsUsed > 0 || couponDiscount > 0)) {
      const isConfirmed = confirm(`포인트/쿠폰 혜택으로 전액 결제(0원)를 완료하시겠습니까?`);
      if (!isConfirmed) return;

      // 포인트 및 쿠폰 차감
      try {
        const { points: curP, coupons: curC } = getUserAvailableBenefits();
        if (pointsUsed > 0) localStorage.setItem('ryzin_user_points', Math.max(0, curP - pointsUsed));
        if (couponDiscount > 0) localStorage.setItem('ryzin_user_coupons', Math.max(0, curC - 1));
      } catch(e) {}

      // 로컬 및 DB 주문 완료 저장
      const completedOrder = {
        id: 'ORDER-FREE-' + Date.now(),
        items: [...cartItems],
        totalPrice: 0,
        subtotalPrice: subtotal,
        discountPrice: (pointsUsed + couponDiscount),
        customer_name: name,
        customer_phone: phone,
        address: address,
        created_at: new Date().toISOString(),
        paymentMethod: '포인트/쿠폰 전액결제',
        status: '결제완료'
      };

      try {
        let history = JSON.parse(localStorage.getItem('ryzin_my_orders_history') || '[]');
        history.unshift(completedOrder);
        localStorage.setItem('ryzin_my_orders_history', JSON.stringify(history));
      } catch(e) {}

      const clientDb = db || window.supabaseClient;
      if (clientDb) {
        clientDb.from('live_orders').insert({
          order_id: completedOrder.id,
          live_id: LIVE_ID,
          customer_name: name,
          customer_phone: phone,
          address: address,
          items: completedOrder.items,
          total_price: 0,
          status: '결제완료'
        }).then(() => {});
      }

      // 장바구니 비우기
      cartItems = [];
      syncCartStorage();
      updateCartUI();
      if (checkoutModal) checkoutModal.style.display = 'none';
      if (cartModal) cartModal.style.display = 'none';

      alert('포인트/쿠폰 혜택으로 결제가 정상 완료되었습니다!');
      if (typeof openMyOrdersModal === 'function') openMyOrdersModal();
      return;
    }

    const total = finalAmount;
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
          var1: LIVE_ID || 'N45ZMPL',
          var2: JSON.stringify(cartItems.map(i => ({ name: i.name, price: i.price })))
        })
      });

      const result = await response.json();

      if (result.success && result.payurl) {
        const orderData = {
          id: 'ord_' + Date.now(),
          live_id: LIVE_ID || 'N45ZMPL',
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

        // 포인트 및 쿠폰 차감 저장
        try {
          if (typeof getUserAvailableBenefits === 'function') {
            const { points: curP, coupons: curC } = getUserAvailableBenefits();
            if (pointsUsed > 0) localStorage.setItem('ryzin_user_points', Math.max(0, curP - pointsUsed));
            if (couponDiscount > 0) localStorage.setItem('ryzin_user_coupons', Math.max(0, curC - 1));
          }
        } catch(e) {}

        // 로컬 스토리지 즉시 캐시 백업 및 내 주문 히스토리 저장
        try {
          const localOrders = JSON.parse(localStorage.getItem(`ryzin_live_orders_${LIVE_ID || 'N45ZMPL'}`) || '[]');
          localOrders.unshift(orderData);
          localStorage.setItem(`ryzin_live_orders_${LIVE_ID || 'N45ZMPL'}`, JSON.stringify(localOrders));

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
      badgeHtml = '<span style="font-size:10px; font-weight:600; color:#b91c1c; background:#fef2f2; border:1px solid #fecdd3; padding:2px 6px; border-radius:4px;">결제취소</span>';
    } else if (isPaid) {
      badgeHtml = '<span style="font-size:10px; font-weight:600; color:#15803d; background:#f0fdf4; border:1px solid #bbf7d0; padding:2px 6px; border-radius:4px;">결제완료</span>';
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

    // 상세 개별 품목 HTML (미니멀 라인형)
    const itemsDetailHtml = itemsList.length > 0 ? itemsList.map(item => {
      const unitPrice = item.price ? Number(item.price.toString().replace(/[^0-9]/g, '')) : 0;
      const qty = item.quantity || 1;
      const subTotal = (unitPrice * qty).toLocaleString();
      const imgTag = item.image ? `<img src="${item.image}" alt="thumb" style="width:32px; height:32px; border-radius:6px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0;">` : '';
      return `
        <div style="display:flex; align-items:center; gap:8px; padding:5px 0; border-bottom:1px solid #f8fafc;">
          ${imgTag}
          <div style="flex:1; min-width:0;">
            <div style="font-size:11.5px; font-weight:600; color:#1e293b; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.name}</div>
            <div style="font-size:10.5px; color:#64748b;">${unitPrice.toLocaleString()}원 × ${qty}개</div>
          </div>
          <div style="font-size:11.5px; font-weight:700; color:#0f172a; flex-shrink:0;">${subTotal}원</div>
        </div>
      `;
    }).join('') : `<div style="font-size:11.5px; color:#64748b; padding:4px 0;">${itemsSummary}</div>`;

    return `
      <!-- 미니멀 게시판 리스트 아이템 (시원하고 여유로운 상하 여백) -->
      <div class="my-order-item" style="border-bottom:1px solid #f1f5f9; padding:18px 0;">
        <!-- 리스트 헤더 행 (클릭 시 아코디언 토글) -->
        <div onclick="toggleOrderDetail(${idx})" style="cursor:pointer; display:flex; flex-direction:column; gap:8px;" title="클릭하여 상세 정보 확인">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11px; color:#94a3b8; font-weight:500;">${dateStr}</span>
            <div style="display:flex; align-items:center; gap:5px;">
              ${badgeHtml}
              <span id="order-arrow-${idx}" style="font-size:10px; color:#94a3b8; font-weight:700; transition:transform 0.2s;">▼</span>
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <div style="font-size:13px; font-weight:600; color:#0f172a; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1;">
              ${itemsSummary}
            </div>
            <div style="font-size:13.5px; font-weight:700; color:${isCancelled ? '#94a3b8' : '#0f172a'}; text-decoration:${isCancelled ? 'line-through' : 'none'}; flex-shrink:0;">
              ${totalStr}원
            </div>
          </div>
        </div>

        <!-- 클릭 시 펼쳐지는 미니멀 상세 정보 (여유로운 간격) -->
        <div id="order-detail-${idx}" style="display:none; padding-top:14px; margin-top:12px; border-top:1px dashed #f1f5f9; flex-direction:column; gap:10px;">
          <!-- 품목 리스트 -->
          <div style="display:flex; flex-direction:column; gap:2px;">
            ${itemsDetailHtml}
          </div>

          <!-- 배송지 정보 (미니멀 텍스트) -->
          <div style="padding:8px 10px; background:#f8fafc; border-radius:8px; font-size:11px; color:#64748b; line-height:1.5;">
            <div><strong style="color:#475569;">받는분:</strong> ${ord.customer_name || '-'} (${ord.customer_phone || '-'})</div>
            <div style="word-break:break-all;"><strong style="color:#475569;">주소:</strong> ${ord.customer_address || '-'}</div>
            ${mulNo ? `<div style="color:#94a3b8; margin-top:2px;">승인번호: ${mulNo}</div>` : ''}
          </div>

          <!-- 결제 취소 버튼 (결제완료 건만) -->
          ${(isPaid && mulNo) ? `
            <div style="display:flex; justify-content:flex-end; margin-top:2px;">
              <button type="button" onclick="cancelMyOrder('${mulNo}', '${ord.id || ''}', event)"
                style="padding:5px 10px; background:#ffffff; color:#dc2626; border:1px solid #fca5a5; border-radius:6px; font-size:11px; font-weight:600; cursor:pointer; transition:all 0.15s; outline:none;"
                onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='#ffffff'">
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


// ====================================================
// [NEW] 상단 MY 메뉴 모달 및 7대 항목 제어 엔진
// (내정보 확인 / 내 주문목록 / 공지사항 / 고객센터 / 이용약관 / 버전 / 로그아웃)
// ====================================================

window.openMyMenuModal = function() {
  if (typeof fetchUserBenefitsFromDB === 'function') fetchUserBenefitsFromDB();
  const modal = document.getElementById('my-menu-modal');
  const profileBox = document.getElementById('my-menu-profile-box');
  const logoutRow = document.getElementById('my-menu-logout-row');
  if (!modal || !profileBox) return;

  let kakaoUserObj = null;
  try { kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}
  const currentNick = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();
  const isLogged = Boolean(kakaoUserObj || currentNick);

  if (isLogged) {
    const unified = typeof window.getUnifiedUserInfo === 'function' ? window.getUnifiedUserInfo() : {};
    const displayName = (kakaoUserObj && kakaoUserObj.name) || unified.name || currentNick || '회원';
    const displayEmail = (kakaoUserObj && kakaoUserObj.email) || (kakaoUserObj && kakaoUserObj.phone) || unified.phone || '';

    profileBox.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
        <div style="display:flex; align-items:center; gap:9px;">
          <div style="width:34px; height:34px; border-radius:50%; background:#f1f5f9; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#475569;">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:5px;">
              <span style="font-size:14.5px; font-weight:700; color:#0f172a;">${displayName}</span>
              <span style="background:#f1f5f9; color:#64748b; font-size:10px; font-weight:600; padding:1px 5px; border-radius:4px;">회원</span>
            </div>
            <div style="font-size:11.5px; color:#64748b; margin-top:1px;">${displayEmail}</div>
          </div>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; background:#f8fafc; border:1px solid #f1f5f9; border-radius:12px; padding:12px 14px; margin-top:12px;">
        <div style="text-align:center; border-right:1px solid #e2e8f0;">
          <div style="font-size:11px; font-weight:500; color:#64748b; margin-bottom:3px;">보유 포인트</div>
          <div style="font-size:15px; font-weight:700; color:#0f172a;">${(typeof getUserAvailableBenefits === 'function' ? getUserAvailableBenefits().points : 3000).toLocaleString()}P</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:11px; font-weight:500; color:#64748b; margin-bottom:3px;">할인 쿠폰</div>
          <div style="font-size:15px; font-weight:700; color:#0f172a;">${(typeof getUserAvailableBenefits === 'function' ? getUserAvailableBenefits().coupons : 1)}장</div>
        </div>
      </div>
    `;
    if (logoutRow) logoutRow.style.display = 'block';
  } else {
    profileBox.innerHTML = `
      <div style="margin-bottom:10px;">
        <div style="font-size:14.5px; font-weight:700; color:#0f172a; margin-bottom:3px;">로그인</div>
        <div style="font-size:11.5px; color:#64748b; line-height:1.4;">로그인하고 주문 내역과 혜택을 확인하세요.</div>
      </div>
      <button type="button" onclick="closeMyMenuModal(); loginWithKakao('menu');"
        style="width:100%; padding:11px; background:#0f172a; color:#ffffff; border:none; border-radius:12px; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; outline:none; transition:background 0.15s;"
        onmouseover="this.style.background='#1e293b'" onmouseout="this.style.background='#0f172a'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.868 1.864 5.395 4.707 6.786-.208.766-.755 2.774-.864 3.208-.135.539.197.532.414.388.171-.114 2.715-1.848 3.815-2.602.62.086 1.265.132 1.928.132 5.523 0 10-3.582 10-8s-4.477-8-10-8z"/>
        </svg>
        <span>카카오 간편 로그인</span>
      </button>
    `;
    if (logoutRow) logoutRow.style.display = 'none';
  }

  modal.style.display = 'flex';
};

window.closeMyMenuModal = function() {
  const modal = document.getElementById('my-menu-modal');
  if (modal) modal.style.display = 'none';
};

window.openMyOrdersFromMenu = function() {
  closeMyMenuModal();
  if (typeof window.openMyOrdersModal === 'function') {
    window.openMyOrdersModal();
  }
};

window.openMyProfileModal = async function() {
  closeMyMenuModal();
  const pModal = document.getElementById('my-profile-modal');
  if (!pModal) return;

  // 1. 기존 로컬 정보로 즉시 채움 (깜빡임 없이 즉각 표시)
  const userInfo = typeof window.getUnifiedUserInfo === 'function' ? window.getUnifiedUserInfo() : {};

  const nameInput = document.getElementById('my-p-name');
  const phoneInput = document.getElementById('my-p-phone');
  const emailInput = document.getElementById('my-p-email');
  const baseAddrInput = document.getElementById('my-p-base-addr');
  const detailAddrInput = document.getElementById('my-p-detail-addr');

  if (nameInput && userInfo.name) nameInput.value = userInfo.name;
  let validPhone = userInfo.phone || '';
  if (validPhone && (validPhone.includes('@') || validPhone.replace(/[^0-9]/g, '').length < 7)) {
    validPhone = '';
  }
  if (phoneInput) {
    if (validPhone) {
      phoneInput.value = validPhone;
    } else if (!phoneInput.value.trim() && (userInfo.name === '채이준' || (userInfo.email && userInfo.email.includes('choijun')))) {
      phoneInput.value = '010-3018-9716';
    }
  }
  if (emailInput) emailInput.value = userInfo.email || '카카오 계정 연동 이메일';
  if (baseAddrInput && userInfo.baseAddr) baseAddrInput.value = userInfo.baseAddr;
  if (detailAddrInput && userInfo.detailAddr) detailAddrInput.value = userInfo.detailAddr;

  pModal.style.display = 'flex';

  // 2. 카카오 계정 기준 Supabase shop_users에서 최신 DB 데이터 실시간 동기화
  if (typeof window.restoreUserAddressFromDB === 'function') {
    const dbData = await window.restoreUserAddressFromDB();
    if (dbData) {
      if (nameInput && dbData.name) nameInput.value = dbData.name;
      if (phoneInput && dbData.phone) phoneInput.value = dbData.phone;
      if (baseAddrInput && dbData.baseAddr) baseAddrInput.value = dbData.baseAddr;
      if (detailAddrInput && dbData.detailAddr) detailAddrInput.value = dbData.detailAddr;
      if (emailInput && dbData.email) emailInput.value = dbData.email;
    }
  }
};

window.openMyPostcodeSearch = function() {
  if (typeof window.openPostcodeSearchModal === 'function') {
    window.openPostcodeSearchModal('my_profile');
  }
};

window.saveMyProfileInfo = async function() {
  const name = document.getElementById('my-p-name')?.value.trim() || '';
  const phone = document.getElementById('my-p-phone')?.value.trim() || '';
  const baseAddr = document.getElementById('my-p-base-addr')?.value.trim() || '';
  let detailAddr = document.getElementById('my-p-detail-addr')?.value.trim() || '';
  detailAddr = window.cleanDetailAddress(baseAddr, detailAddr);
  const address = window.combineAddress(baseAddr, detailAddr);

  if (!name) {
    alert('회원 이름(수령인)을 입력해 주세요.');
    return;
  }
  if (!phone) {
    alert('연락처(전화번호)를 입력해 주세요.');
    return;
  }

  // 통합 동기화 엔진 호출 -> 배송지 주소변경 모달, 장바구니 배송지 프리뷰, DB, 로컬스토리지 모두 한 번에 연동!
  if (typeof window.syncShippingAndProfileInfo === 'function') {
    await window.syncShippingAndProfileInfo({
      name,
      phone,
      address,
      baseAddr,
      detailAddr
    }, false /* skipDBSave: false -> Supabase shop_users 즉시 영구 저장! */);
  }

  document.getElementById('my-profile-modal').style.display = 'none';
  alert('회원 정보 및 기본 배송지가 성공적으로 저장되었습니다.');
  openMyMenuModal();
};

window.openMyNoticeModal = function() {
  closeMyMenuModal();
  const m = document.getElementById('my-notice-modal');
  if (m) m.style.display = 'flex';
};

window.openMyCsModal = function() {
  closeMyMenuModal();
  const m = document.getElementById('my-cs-modal');
  if (m) m.style.display = 'flex';
};

window.openMyTermsModal = function() {
  closeMyMenuModal();
  const m = document.getElementById('my-terms-modal');
  if (m) m.style.display = 'flex';
};

window.handleMyLogout = function() {
  if (!confirm('로그아웃 하시겠습니까?')) return;

  try {
    if (typeof Kakao !== 'undefined' && Kakao.Auth && Kakao.Auth.getAccessToken()) {
      Kakao.Auth.logout();
    }
  } catch(e) {}

  localStorage.removeItem('ryzin_kakao_user');
  localStorage.removeItem('ryzin_nickname');
  window.userNickname = '';

  closeMyMenuModal();
  if (typeof updateCartShippingPreview === 'function') updateCartShippingPreview();
  alert('로그아웃되었습니다.');
};


// ====================================================
// [NEW] 장바구니 포인트 및 쿠폰 실시간 계산 및 차감 엔진
// ====================================================

window.__cartSubtotalAmount = 0;
window.__cartFinalPaymentAmount = 0;
window.__cartCouponDiscount = 0;
window.__cartPointsUsed = 0;

window.getUserAvailableBenefits = function() {
  let points = 0;
  let coupons = 0;
  try {
    const savedPoints = localStorage.getItem('ryzin_user_points');
    if (savedPoints !== null) points = Number(savedPoints);
    const savedCoupons = localStorage.getItem('ryzin_user_coupons');
    if (savedCoupons !== null) coupons = Number(savedCoupons);
  } catch(e) {}
  return { points: Math.max(0, points), coupons: Math.max(0, coupons) };
};

// Supabase shop_users에서 관리자가 부여한 실제 포인트와 쿠폰 100% 다이렉트 동기화
window.fetchUserBenefitsFromDB = async function() {
  try {
    let kakaoUserObj = null;
    try { kakaoUserObj = JSON.parse(localStorage.getItem('ryzin_kakao_user') || 'null'); } catch(e) {}
    const kakaoId = kakaoUserObj ? String(kakaoUserObj.id) : '';
    const kakaoEmail = kakaoUserObj ? (kakaoUserObj.email || '') : '';
    const currentAcc = (window.userNickname || localStorage.getItem('ryzin_nickname') || '').trim();
    let savedInfo = {};
    try { savedInfo = JSON.parse(localStorage.getItem('ryzin_saved_order_info') || '{}'); } catch(e) {}
    const phone = (savedInfo.phone || (kakaoUserObj && kakaoUserObj.phone) || '').replace(/[^0-9]/g, '');
    const userName = (savedInfo.name || (kakaoUserObj && kakaoUserObj.name) || currentAcc || '').trim();

    if (!kakaoId && !kakaoEmail && !currentAcc && !phone && !userName) {
      localStorage.setItem('ryzin_user_points', '0');
      localStorage.setItem('ryzin_user_coupons', '0');
      return;
    }

    const SUPA_URL = 'https://vybrnhyaeugfwezbygdt.supabase.co';
    const SUPA_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';

    // 1단계: user_code로 정확한 매칭 시도
    let matchedUser = null;
    const candidates = [];
    if (kakaoId) candidates.push(`user_code.eq.KAKAO-${kakaoId}`);
    if (currentAcc) candidates.push(`user_code.eq.USER-${currentAcc}`);
    if (phone) candidates.push(`user_code.eq.USER-${phone}`);

    const res = await fetch(`${SUPA_URL}/rest/v1/shop_users?select=id,user_code,name,email,points,coupons_count&limit=100`, {
      headers: {
        'apikey': SUPA_KEY,
        'Authorization': `Bearer ${SUPA_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const allUsers = await res.json();
      if (Array.isArray(allUsers) && allUsers.length > 0) {
        matchedUser = allUsers.find(u => {
          if (kakaoId && u.user_code && u.user_code.includes(kakaoId)) return true;
          if (kakaoEmail && u.email && u.email === kakaoEmail) return true;
          if (phone && ((u.email && u.email.includes(phone)) || (u.default_address && u.default_address.includes(phone)))) return true;
          if (userName && u.name && u.name === userName) return true;
          if (currentAcc && ((u.name && u.name === currentAcc) || (u.user_code && u.user_code.includes(currentAcc)))) return true;
          return false;
        });
      }
    }

    if (matchedUser) {
      const dbPoints = Math.max(0, parseInt(matchedUser.points) || 0);
      const dbCoupons = Math.max(0, parseInt(matchedUser.coupons_count) || 0);
      localStorage.setItem('ryzin_user_points', dbPoints.toString());
      localStorage.setItem('ryzin_user_coupons', dbCoupons.toString());
    } else {
      // DB에 없는 미등록 회원이면 기본 0 고정
      localStorage.setItem('ryzin_user_points', '0');
      localStorage.setItem('ryzin_user_coupons', '0');
    }

    // 장바구니 및 MY 메뉴 UI 실시간 반영
    if (typeof calculateCartBenefits === 'function') {
      calculateCartBenefits();
    }
    const myPointsEl = document.getElementById('my-menu-profile-box');
    if (myPointsEl && document.getElementById('my-menu-modal')?.style.display === 'flex') {
      openMyMenuModal();
    }
  } catch(e) {
    console.warn('fetchUserBenefitsFromDB error:', e);
  }
};

window.calculateCartBenefits = function() {
  const subtotalEl = document.getElementById('cart-subtotal-price');
  const discountRow = document.getElementById('cart-discount-row');
  const discountEl = document.getElementById('cart-discount-price');
  const totalEl = document.getElementById('cart-total-price');
  const couponSelect = document.getElementById('cart-coupon-select');
  const pointsInput = document.getElementById('cart-points-input');
  const availablePointsEl = document.getElementById('cart-available-points');

  const { points: availPoints, coupons: availCoupons } = getUserAvailableBenefits();
  if (availablePointsEl) availablePointsEl.textContent = availPoints.toLocaleString();

  // 소계 금액 산출
  let subtotal = 0;
  if (Array.isArray(cartItems)) {
    cartItems.forEach(item => {
      const qty = item.quantity || 1;
      const unit = item.price ? Number(item.price.toString().replace(/[^0-9]/g, '')) : 0;
      subtotal += unit * qty;
    });
  }
  window.__cartSubtotalAmount = subtotal;
  if (subtotalEl) subtotalEl.textContent = `${subtotal.toLocaleString()}원`;

  // 쿠폰 옵션 동적 렌더링 (보유 쿠폰이 없으면 0원 비활성화)
  if (couponSelect) {
    if (availCoupons <= 0) {
      couponSelect.innerHTML = '<option value="0">보유 쿠폰 없음 (0장)</option>';
      couponSelect.disabled = true;
      couponSelect.style.color = '#94a3b8';
    } else {
      const currentSelected = couponSelect.value;
      couponSelect.disabled = false;
      couponSelect.style.color = '#0f172a';
      couponSelect.innerHTML = `
        <option value="0">쿠폰 선택 안함</option>
        <option value="2000" ${currentSelected === '2000' ? 'selected' : ''}>라이브 2,000원 할인 쿠폰 (${availCoupons}장 보유)</option>
      `;
    }
  }

  // 쿠폰 할인 계산
  let couponDiscount = 0;
  if (couponSelect && availCoupons > 0) {
    couponDiscount = Number(couponSelect.value) || 0;
    couponDiscount = Math.min(couponDiscount, subtotal);
  }
  window.__cartCouponDiscount = couponDiscount;

  // 포인트 사용 계산 (0P면 비활성화)
  let remainForPoints = Math.max(0, subtotal - couponDiscount);
  let pointsUsed = 0;
  if (pointsInput) {
    if (availPoints <= 0) {
      pointsInput.value = '0';
      pointsInput.disabled = true;
      pointsInput.style.color = '#94a3b8';
    } else {
      pointsInput.disabled = false;
      pointsInput.style.color = '#0f172a';
      let inputVal = Number(pointsInput.value) || 0;
      if (inputVal < 0) inputVal = 0;
      if (inputVal > availPoints) inputVal = availPoints;
      if (inputVal > remainForPoints) inputVal = remainForPoints;
      pointsInput.value = inputVal > 0 ? inputVal : (pointsInput.value === '' ? '' : 0);
      pointsUsed = inputVal;
    }
  }
  window.__cartPointsUsed = pointsUsed;

  // 총 할인 및 최종 결제 금액
  const totalDiscount = couponDiscount + pointsUsed;
  const finalTotal = Math.max(0, subtotal - totalDiscount);
  window.__cartFinalPaymentAmount = finalTotal;

  if (discountRow && discountEl) {
    if (totalDiscount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-${totalDiscount.toLocaleString()}원`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (totalEl) {
    totalEl.textContent = `${finalTotal.toLocaleString()}원`;
  }
};

window.applyAllPoints = function() {
  const pointsInput = document.getElementById('cart-points-input');
  if (!pointsInput) return;
  const { points: availPoints } = getUserAvailableBenefits();
  const subtotal = window.__cartSubtotalAmount || 0;
  const couponDiscount = window.__cartCouponDiscount || 0;
  const maxUsable = Math.max(0, subtotal - couponDiscount);
  const toUse = Math.min(availPoints, maxUsable);
  pointsInput.value = toUse;
  calculateCartBenefits();
};


window.addEventListener('storage', (e) => {
  if (e.key === 'ryzin_user_benefits_sync' || (e.key && e.key.includes('user_points'))) {
    if (typeof fetchUserBenefitsFromDB === 'function') fetchUserBenefitsFromDB();
  }
});

// ====================================================
// [NEW] 제품 상세 모달 제어 엔진
// ====================================================

window.__currentDetailProduct = null;

window.openProductDetailModal = function(item) {
  if (!item) return;
  window.__currentDetailProduct = item;

  const modal = document.getElementById('product-detail-modal');
  const imgEl = document.getElementById('detail-modal-img');
  const nameEl = document.getElementById('detail-modal-name');
  const priceEl = document.getElementById('detail-modal-price');
  const urlWrap = document.getElementById('detail-modal-url-wrap');
  const urlBtn = document.getElementById('detail-modal-url-btn');
  const addCartBtn = document.getElementById('detail-modal-add-cart-btn');

  if (!modal) return;

  if (imgEl) imgEl.src = item.image || 'https://via.placeholder.com/300';
  if (nameEl) {
    const dealBadge = (item.dealEndTime && item.dealEndTime > Date.now()) 
      ? '<span style="color:#e11d48; font-weight:800; margin-right:5px;">[깜짝딜]</span>' : '';
    nameEl.innerHTML = dealBadge + (item.name || '상품 정보');
  }

  if (priceEl) {
    const pNum = Number((item.price || '').toString().replace(/[^0-9]/g, ''));
    const npNum = Number((item.normalPrice || '').toString().replace(/[^0-9]/g, ''));

    if (pNum > 0) {
      let pHtml = `<span style="font-size:17px; font-weight:800; color:#e50914;">${pNum.toLocaleString()}원</span>`;
      if (npNum > pNum) {
        pHtml += `<span style="font-size:13px; color:#94a3b8; text-decoration:line-through; margin-left:6px;">${npNum.toLocaleString()}원</span>`;
      }
      priceEl.innerHTML = pHtml;
    } else if (item.price === '0' || item.price === 0) {
      priceEl.innerHTML = `<span style="font-size:18px; font-weight:800; color:#16a34a;">무료나눔</span>`;
    } else {
      priceEl.innerHTML = `<span style="font-size:15px; color:#94a3b8; font-weight:600;">가격 준비중</span>`;
    }
  }

  // 자사몰 링크 유무에 따른 노출 처리
  if (urlWrap && urlBtn) {
    if (item.url && item.url !== '#' && item.url !== '__LEAD_FORM__') {
      urlWrap.style.display = 'block';
      urlBtn.href = item.url;
    } else {
      urlWrap.style.display = 'none';
    }
  }

  if (addCartBtn) {
    addCartBtn.onclick = function() {
      if (typeof window.isKakaoLoggedIn === 'function' && !window.isKakaoLoggedIn()) {
        if (typeof window.promptKakaoLogin === 'function') window.promptKakaoLogin(item);
        return;
      }
      if (typeof addToCart === 'function') {
        addToCart(item);
      }
      closeProductDetailModal();
    };
  }

  modal.style.display = 'flex';
};

window.closeProductDetailModal = function() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) modal.style.display = 'none';
  if (typeof window.resumeAllMedia === 'function') {
    window.resumeAllMedia();
    setTimeout(window.resumeAllMedia, 200);
  }
};


// =========================================================================
// ── [웹 푸시(Web Push) 알림 엔진] VAPID & PWA 연동 ──
// =========================================================================
const VAPID_PUBLIC_KEY = 'BBM6fCUu5FI8wW3tOH3nzyOanT45GBcCEd9TrrDgIim0xnz_i4piPm46cyJNZx86YAiVuBwCkkTf5OTcMJ0ZyOA';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// 서비스 워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(e => console.warn('SW Fail:', e));
  });
}

// 알림 신청 버튼 클릭 핸들러
window.handlePushSubscribeClick = async function() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;

  // 아이폰(iOS) 사파리 브라우저 상태에서 푸시 미지원 시 홈 화면 추가 가이드 모달 표시
  if (isIOS && !isStandalone && !('Notification' in window)) {
    const iosModal = document.getElementById('ios-pwa-modal');
    if (iosModal) iosModal.style.display = 'flex';
    return;
  }

  if (!('Notification' in window) || !('serviceWorker' in navigator)) {
    alert('현재 브라우저 환경에서는 웹 푸시 알림을 지원하지 않습니다.');
    return;
  }

  if (Notification.permission === 'denied') {
    alert('브라우저 알림 권한이 차단되어 있습니다.\n브라우저 주소창 왼쪽 자물쇠/설정 아이콘을 눌러 알림을 [허용]으로 변경해주세요.');
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('알림 권한이 허용되지 않았습니다.');
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      const convertedVapidKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });
    }

    if (subscription && db) {
      // Supabase live_leads에 __WEB_PUSH__ 토큰 저장
      const subJson = JSON.stringify(subscription);
      
      // 중복 체크 후 저장
      const { data: existing } = await db.from('live_leads')
        .select('id')
        .eq('live_id', LIVE_ID)
        .eq('name', '__WEB_PUSH__')
        .eq('phone', subJson)
        .limit(1);

      if (!existing || existing.length === 0) {
        await db.from('live_leads').insert([{
          live_id: LIVE_ID,
          name: '__WEB_PUSH__',
          phone: subJson
        }]);
      }

      const bellBtn = document.getElementById('btn-push-notification');
      if (bellBtn) {
        bellBtn.title = '방송 알림 신청 완료';
      }

      alert('방송 알림 신청이 완료되었습니다!\n방송 시작 시 푸시 알림을 보내드립니다.');
    }
  } catch (err) {
    console.error('Push subscribe error:', err);
    alert('알림 등록 중 오류가 발생했습니다: ' + (err.message || err));
  }
};

// ═══════════════════════════════════════════════════════════
// 셀러 프로필 & 소통 채널 뷰 제어 (무중단 영상 연속 재생)
// ═══════════════════════════════════════════════════════════

const BASE_FAN_COUNT = 341746;

window.openSellerChannelView = function() {
  // 사용자 요청으로 일시 비활성화 (숨김)
  return;

  const cfg = JSON.parse(localStorage.getItem(`ryzin_live_config_${LIVE_ID}`) || '{}');

  // DOM 또는 설정에서 데이터 가져오기
  const brandName = cfg.brandName || document.querySelector('.brand-name')?.textContent || 'RYZIN';
  const broadcastTitle = cfg.title || document.querySelector('.broadcast-title')?.textContent || '단독 특가 라이브 방송이 진행 중입니다';
  const logoUrl = cfg.logoUrl || document.querySelector('.brand-logo')?.src || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff';
  const thumbUrl = cfg.thumbnailUrl || document.getElementById('thumbnail-img')?.src || '';
  const isLive = cfg.isLive !== false;

  // 채널 상단 커버 & 프로필 영역 갱신
  const coverImgEl = document.getElementById('channel-cover-img');
  const sellerNameEl = document.getElementById('channel-seller-name');
  const avatarImgEl = document.getElementById('channel-avatar-img');
  const avatarBadgeEl = document.getElementById('channel-avatar-badge');
  const liveBadgeTextEl = document.getElementById('channel-live-badge-text');
  const cardLiveTitleEl = document.getElementById('channel-card-live-title');

  if (coverImgEl) {
    if (thumbUrl && thumbUrl.trim()) {
      coverImgEl.src = thumbUrl.trim();
      coverImgEl.style.display = 'block';
    } else {
      coverImgEl.style.display = 'none';
    }
  }

  if (sellerNameEl) sellerNameEl.textContent = brandName;
  if (avatarImgEl) avatarImgEl.src = logoUrl;
  if (cardLiveTitleEl) cardLiveTitleEl.textContent = broadcastTitle;

  if (avatarBadgeEl) {
    avatarBadgeEl.textContent = isLive ? 'LIVE' : '대기';
    avatarBadgeEl.style.background = isLive ? '#f43f5e' : '#64748b';
  }
  if (liveBadgeTextEl) {
    liveBadgeTextEl.textContent = isLive ? 'NOW LIVE' : 'BROADCAST STANDBY';
  }

  // 공지사항 연동 (관리자 설정 공지가 있으면 1번째 줄로 반영)
  if (cfg.noticeNoteContent && cfg.noticeNoteContent.trim()) {
    const firstLine = cfg.noticeNoteContent.trim().split('\n')[0].replace(/^[\*\-\•]\s*/, '');
    const line1El = document.getElementById('channel-notice-line1');
    if (line1El && firstLine) line1El.textContent = firstLine;
  }

  // 단골/일촌 상태 업데이트
  updateChannelFanUI();

  // 오버레이 활성화 (영상을 덮음)
  channelView.style.display = 'flex';
  channelView.scrollTop = 0;
};

window.closeSellerChannelView = function() {
  const channelView = document.getElementById('seller-channel-view');
  if (channelView) {
    channelView.style.display = 'none';
  }
};

window.enterLiveFullScreen = function() {
  closeSellerChannelView();

  const video = document.getElementById('live-video');
  if (video && video.muted) {
    video.muted = false;
    video.volume = 1.0;
  }
  showToast('라이브 방송에 입장했습니다.');
};

function updateChannelFanUI() {
  const btn = document.getElementById('btn-channel-fan');
  const text = document.getElementById('text-channel-fan');
  const fanNumEl = document.getElementById('channel-fan-num');
  if (!btn || !text) return;

  const isFan = localStorage.getItem(`ryzin_fan_${LIVE_ID}`) === 'true';

  if (isFan) {
    btn.classList.add('is-active');
    text.textContent = '단골 (완료)';
    if (fanNumEl) fanNumEl.textContent = (BASE_FAN_COUNT + 1).toLocaleString();
  } else {
    btn.classList.remove('is-active');
    text.textContent = '단골맺기';
    if (fanNumEl) fanNumEl.textContent = BASE_FAN_COUNT.toLocaleString();
  }
}

window.toggleChannelFriend = function() {
  const isFan = localStorage.getItem(`ryzin_fan_${LIVE_ID}`) === 'true';
  const newStatus = !isFan;
  localStorage.setItem(`ryzin_fan_${LIVE_ID}`, String(newStatus));
  updateChannelFanUI();

  if (newStatus) {
    showToast('단골을 맺었습니다! 특별 혜택 및 방송 알림을 가장 먼저 보내드립니다.');
  } else {
    showToast('단골이 해제되었습니다.');
  }
};

window.toggleChannelNoticeMore = function() {
  const moreContent = document.getElementById('channel-notice-more-content');
  const moreBtn = document.getElementById('btn-channel-more');
  if (!moreContent || !moreBtn) return;

  if (moreContent.style.display === 'none' || !moreContent.style.display) {
    moreContent.style.display = 'flex';
    moreBtn.textContent = '접기';
  } else {
    moreContent.style.display = 'none';
    moreBtn.textContent = '...더보기';
  }
};

window.openChannelChat = function() {
  closeSellerChannelView();
  setTimeout(() => {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
      chatInput.focus();
      showToast('실시간 라이브 채팅창으로 이동했습니다.');
    }
  }, 200);
};

window.shareChannel = function() {
  const liveUrl = window.location.href.split('#')[0];
  const sellerName = document.getElementById('channel-seller-name')?.textContent || 'RYZIN';

  if (navigator.share) {
    navigator.share({
      title: `${sellerName} 셀러 채널`,
      text: `${sellerName}님의 라이브 채널에 방문해보세요!`,
      url: liveUrl
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(liveUrl).then(() => {
      showToast('채널 링크가 클립보드에 복사되었습니다.');
    }).catch(() => {
      showToast('링크 복사에 실패했습니다.');
    });
  }
};
