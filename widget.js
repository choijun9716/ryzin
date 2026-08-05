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

  const targetLiveUrl = `${hostUrl}/live/${liveId}`;

  // CSS 주입 (플로팅 뱃지는 한단계 아담하고 균형잡힌 크기, 모달은 시원한 큼직함 유지)
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
    .ryzin-modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.75);
      z-index: 9999999;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(5px);
    }
    .ryzin-modal-content {
      position: relative;
      width: 400px;
      max-width: 92vw;
      height: 720px;
      max-height: 90vh;
      background: #0f172a;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.15);
    }
    .ryzin-modal-close {
      position: absolute;
      top: 14px;
      right: 14px;
      z-index: 10;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: rgba(0,0,0,0.65);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.25);
      transition: all 0.2s;
    }
    .ryzin-modal-close:hover {
      background: rgba(0,0,0,0.85);
      transform: scale(1.08);
    }
    .ryzin-modal-iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      background: transparent;
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

  // 모달 돔 생성
  const modal = document.createElement('div');
  modal.className = 'ryzin-modal-overlay';
  modal.innerHTML = `
    <div class="ryzin-modal-content">
      <div class="ryzin-modal-close">&times;</div>
      <iframe class="ryzin-modal-iframe" src="${targetLiveUrl}" allow="autoplay; fullscreen" allowfullscreen></iframe>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.ryzin-modal-close');
  widget.addEventListener('click', function () {
    modal.style.display = 'flex';
  });
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.style.display = 'none';
  });
})();
