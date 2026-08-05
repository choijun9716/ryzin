(function () {
  const currentScript = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  const liveId = currentScript ? (currentScript.getAttribute('data-live-id') || 'PAZIW92') : 'PAZIW92';
  
  let hostUrl = 'https://ryzincorp.com';
  if (currentScript && currentScript.src) {
    try {
      const u = new URL(currentScript.src);
      hostUrl = u.origin;
    } catch(e) {}
  }

  // CSS 주입 (플로팅 뱃지는 깔끔하고 세련된 유선형 알약 디자인 유지)
  const style = document.createElement('style');
  style.innerHTML = `
    .ryzin-widget-container {
      position: fixed;
      bottom: 26px;
      right: 26px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 11px;
      background: #0f172a;
      color: #fff;
      padding: 13px 22px;
      border-radius: 50px;
      box-shadow: 0 12px 30px -4px rgba(0,0,0,0.38);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1.5px solid rgba(255,255,255,0.18);
    }
    .ryzin-widget-container:hover {
      transform: translateY(-4px) scale(1.03);
      box-shadow: 0 18px 36px -4px rgba(0,0,0,0.48);
      background: #1e293b;
    }
    .ryzin-widget-badge {
      font-size: 11px;
      font-weight: 800;
      color: #ef4444;
      background: #fee2e2;
      border: 1px solid #fecaca;
      padding: 4px 9px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      letter-spacing: 0.04em;
    }
    .ryzin-widget-badge-dot {
      width: 7px;
      height: 7px;
      background: #ef4444;
      border-radius: 50%;
      box-shadow: 0 0 0 2px #fee2e2;
      animation: ryzin-pulse 1.5s infinite;
    }
    .ryzin-widget-title {
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      letter-spacing: -0.01em;
    }
    @keyframes ryzin-pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 7px rgba(239, 68, 68, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
  `;
  document.head.appendChild(style);

  // 플로팅 위젯 돔 생성
  const widget = document.createElement('div');
  widget.className = 'ryzin-widget-container';
  widget.innerHTML = `
    <span class="ryzin-widget-badge"><span class="ryzin-widget-badge-dot"></span>LIVE</span>
    <span class="ryzin-widget-title">라이브 방송 보기</span>
  `;
  document.body.appendChild(widget);

  // 위젯 클릭 이벤트 - 별도의 팝업창으로 깔끔하게 노출 (여백/사이즈 문제 100% 해결)
  widget.addEventListener('click', function () {
    const popupUrl = `${hostUrl}/live/?id=${liveId}`;
    const popupWidth = 390;
    const popupHeight = 693;
    const left = (window.screen.width - popupWidth) / 2;
    const top = (window.screen.height - popupHeight) / 2;
    
    window.open(
      popupUrl,
      'ryzin_live_popup',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=no,scrollbars=no,status=no,location=no,toolbar=no,menubar=no`
    );
  });
})();
