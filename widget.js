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

  // CSS 주입 (더 큼직하고 웅장한 프리미엄 크기)
  const style = document.createElement('style');
  style.innerHTML = `
    .ryzin-widget-container {
      position: fixed;
      bottom: 36px;
      right: 36px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 14px;
      background: #0f172a;
      color: #fff;
      padding: 16px 28px;
      border-radius: 60px;
      box-shadow: 0 16px 40px -5px rgba(0,0,0,0.45);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid rgba(255,255,255,0.22);
    }
    .ryzin-widget-container:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 22px 45px -5px rgba(0,0,0,0.55);
      background: #1e293b;
    }
    .ryzin-widget-badge {
      font-size: 12px;
      font-weight: 800;
      color: #ef4444;
      background: #fee2e2;
      border: 1.5px solid #fecaca;
      padding: 5px 11px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      letter-spacing: 0.05em;
    }
    .ryzin-widget-badge-dot {
      width: 8px;
      height: 8px;
      background: #ef4444;
      border-radius: 50%;
      box-shadow: 0 0 0 2px #fee2e2;
      animation: ryzin-pulse 1.5s infinite;
    }
    .ryzin-widget-title {
      font-size: 18px;
      font-weight: 800;
      white-space: nowrap;
      letter-spacing: -0.01em;
    }
    @keyframes ryzin-pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
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
      width: 440px;
      max-width: 95vw;
      height: 780px;
      max-height: 94vh;
      background: #000;
      border-radius: 26px;
      overflow: hidden;
      box-shadow: 0 30px 60px -12px rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.15);
    }
    .ryzin-modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 10;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(0,0,0,0.65);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
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
      <iframe class="ryzin-modal-iframe" src="${targetLiveUrl}"></iframe>
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
