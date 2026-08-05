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

  // CSS 주입
  const style = document.createElement('style');
  style.innerHTML = `
    .ryzin-widget-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      background: #0f172a;
      color: #fff;
      padding: 10px 16px;
      border-radius: 40px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .ryzin-widget-container:hover {
      transform: translateY(-4px) scale(1.03);
      box-shadow: 0 15px 30px -5px rgba(0,0,0,0.4);
    }
    .ryzin-widget-badge {
      font-size: 10px;
      font-weight: 800;
      color: #ef4444;
      background: #fee2e2;
      border: 1px solid #fecaca;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .ryzin-widget-badge-dot {
      width: 6px;
      height: 6px;
      background: #ef4444;
      border-radius: 50%;
      box-shadow: 0 0 0 2px #fee2e2;
    }
    .ryzin-widget-title {
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }
    .ryzin-modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.7);
      z-index: 9999999;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
    }
    .ryzin-modal-content {
      position: relative;
      width: 380px;
      max-width: 92vw;
      height: 680px;
      max-height: 90vh;
      background: #000;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
    }
    .ryzin-modal-close {
      position: absolute;
      top: 14px;
      right: 14px;
      z-index: 10;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(0,0,0,0.6);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.2);
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
