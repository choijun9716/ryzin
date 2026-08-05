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

  // CSS 주입 (플로팅 뱃지, 데모 띠 배너, 도입문의 버튼, 상담 폼 모달 스타일 일괄 선언)
  const style = document.createElement('style');
  style.innerHTML = `
    .ryzin-widget-container {
      position: fixed;
      bottom: 94px;
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

    /* 홈페이지 최상단 데모 시연 배너 */
    .ryzin-demo-top-notice {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 44px;
      height: auto;
      background: linear-gradient(90deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%);
      border-bottom: 2px solid #3b82f6;
      color: #ffffff;
      z-index: 9999998;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: -0.3px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      user-select: none;
      padding: 8px 16px;
      box-sizing: border-box;
      text-align: center;
    }
    .ryzin-demo-top-badge {
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      border: 1px solid rgba(96, 165, 250, 0.4);
      padding: 3px 8px;
      border-radius: 50px;
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.06em;
      line-height: 1;
      flex-shrink: 0;
    }

    @media (max-width: 600px) {
      .ryzin-demo-top-notice {
        font-size: 10.5px;
        gap: 6px;
        padding: 6px 12px;
        line-height: 1.4;
      }
      .ryzin-demo-top-badge {
        padding: 2px 6px;
        font-size: 8.5px;
      }
    }

    /* 홈페이지 우측 하단 도입 문의 플로팅 버튼 (라이브 방송 보기 밑으로 정렬) */
    .ryzin-demo-lead-btn {
      position: fixed;
      bottom: 26px;
      right: 26px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #ffffff;
      padding: 13px 22px;
      border-radius: 50px;
      border: 1.5px solid rgba(255,255,255,0.18);
      box-shadow: 0 12px 30px -4px rgba(37,99,235,0.42);
      font-size: 15px;
      font-weight: 700;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .ryzin-demo-lead-btn:hover {
      transform: translateY(-4px) scale(1.03);
      box-shadow: 0 18px 36px -4px rgba(37,99,235,0.52);
      background: linear-gradient(135deg, #1d4ed8, #1e40af);
    }

    /* 도입 문의 상담 폼 모달 오버레이 */
    .ryzin-lead-modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(5px);
      z-index: 10000000;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .ryzin-lead-modal-content {
      background: #ffffff;
      width: 90%;
      max-width: 340px;
      border-radius: 20px;
      padding: 30px 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.25);
      position: relative;
      color: #0f172a;
      border: 1px solid #e2e8f0;
      text-align: left;
    }
    .ryzin-lead-modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      font-size: 22px;
      color: #94a3b8;
      cursor: pointer;
      outline: none;
      transition: color 0.2s;
    }
    .ryzin-lead-modal-close:hover {
      color: #475569;
    }
    .ryzin-lead-modal-title {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
    }
    .ryzin-lead-modal-desc {
      font-size: 13px;
      color: #64748b;
      margin: 0 0 22px 0;
      line-height: 1.5;
      font-weight: 500;
    }
    .ryzin-lead-field-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }
    .ryzin-lead-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .ryzin-lead-label {
      font-size: 12px;
      font-weight: 700;
      color: #475569;
    }
    .ryzin-lead-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      font-size: 14px;
      color: #0f172a;
      background: #f8fafc;
      outline: none;
      box-sizing: border-box;
      transition: all 0.2s;
    }
    .ryzin-lead-input:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
      background: #ffffff;
    }
    .ryzin-lead-submit-btn {
      width: 100%;
      padding: 14px;
      background: #0f172a;
      color: #ffffff;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      outline: none;
    }
    .ryzin-lead-submit-btn:hover {
      background: #1e293b;
    }
    .ryzin-lead-submit-btn:disabled {
      background: #94a3b8;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);

  // 1. 홈페이지 최상단 데모 안내 배너 주입
  const topNotice = document.createElement('div');
  topNotice.className = 'ryzin-demo-top-notice';
  topNotice.innerHTML = `
    <span class="ryzin-demo-top-badge">CONNECT</span>
    <span>현재 보고계신 화면은, 라이진 커넥트가 적용된 화면입니다. 실제로 반영이 되지 않는 예시 화면으로 안심하세요.</span>
  `;
  document.body.appendChild(topNotice);

  // 2. 홈페이지 우측 하단 플로팅 라이브 뱃지 위젯 주입
  const widget = document.createElement('div');
  widget.className = 'ryzin-widget-container';
  widget.innerHTML = `
    <span class="ryzin-widget-badge"><span class="ryzin-widget-badge-dot"></span>LIVE</span>
    <span class="ryzin-widget-title">라이브 방송 보기</span>
  `;
  document.body.appendChild(widget);

  // 3. 홈페이지 좌측 하단 도입 문의 플로팅 버튼 주입
  const leadBtn = document.createElement('div');
  leadBtn.className = 'ryzin-demo-lead-btn';
  leadBtn.innerHTML = `
    <span>✉️</span>
    <span>도입 문의</span>
  `;
  document.body.appendChild(leadBtn);

  // 4. 도입 문의 모달창 오버레이 주입
  const leadModal = document.createElement('div');
  leadModal.className = 'ryzin-lead-modal-overlay';
  leadModal.innerHTML = `
    <div class="ryzin-lead-modal-content">
      <button class="ryzin-lead-modal-close">&times;</button>
      <h3 class="ryzin-lead-modal-title">상담 문의 남기기</h3>
      <p class="ryzin-lead-modal-desc">연락처를 남겨주시면 빠르게 안내해 드리겠습니다.</p>
      <div class="ryzin-lead-field-group">
        <div class="ryzin-lead-field">
          <label class="ryzin-lead-label">브랜드명 (회사명)</label>
          <input type="text" class="ryzin-lead-input" id="ryzin-lead-brand" placeholder="예: 라이진">
        </div>
        <div class="ryzin-lead-field">
          <label class="ryzin-lead-label">성함</label>
          <input type="text" class="ryzin-lead-input" id="ryzin-lead-name" placeholder="성함을 입력해 주세요">
        </div>
        <div class="ryzin-lead-field">
          <label class="ryzin-lead-label">연락처</label>
          <input type="tel" class="ryzin-lead-input" id="ryzin-lead-phone" placeholder="010-0000-0000">
        </div>
      </div>
      <button class="ryzin-lead-submit-btn" id="ryzin-lead-submit">문의 접수하기</button>
    </div>
  `;
  document.body.appendChild(leadModal);

  // 이벤트 연동 1: 라이브 뱃지 클릭 시 팝업 띄우기
  widget.addEventListener('click', function () {
    const popupUrl = `${hostUrl}/live/?id=${liveId}`;
    const popupWidth = 390;
    const popupHeight = 693;
    const left = (window.screen.width - popupWidth) / 2;
    const top = (window.screen.height - popupHeight) / 2;
    
    window.open(
      popupUrl,
      'ryzin_live_popup',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes,status=no,location=no,toolbar=no,menubar=no`
    );
  });

  // 이벤트 연동 2: 도입 문의 버튼 클릭 시 모달 열기
  leadBtn.addEventListener('click', function () {
    leadModal.style.display = 'flex';
    document.getElementById('ryzin-lead-brand').value = '';
    document.getElementById('ryzin-lead-name').value = '';
    document.getElementById('ryzin-lead-phone').value = '';
  });

  // 이벤트 연동 3: 모달 닫기
  const modalClose = leadModal.querySelector('.ryzin-lead-modal-close');
  modalClose.addEventListener('click', function () {
    leadModal.style.display = 'none';
  });
  leadModal.addEventListener('click', function (e) {
    if (e.target === leadModal) leadModal.style.display = 'none';
  });

  // 이벤트 연동 4: 리드 폼 제출 API 통신
  const submitBtn = document.getElementById('ryzin-lead-submit');
  submitBtn.addEventListener('click', async function () {
    const brandVal = document.getElementById('ryzin-lead-brand').value.trim();
    const nameVal = document.getElementById('ryzin-lead-name').value.trim();
    const phoneVal = document.getElementById('ryzin-lead-phone').value.trim();

    if (!brandVal || !nameVal || !phoneVal) {
      alert('모든 필수 정보를 정확하게 입력해 주세요.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '제출 중...';

    // DB Schema 에러 방지를 위해 name 컬럼에 도입문의 식별 접두어와 성함, 브랜드를 안전하게 병합 저장
    const combinedName = `[도입문의] ${nameVal} (${brandVal})`;

    try {
      const response = await fetch('https://vybrnhyaeugfwezbygdt.supabase.co/rest/v1/live_leads', {
        method: 'POST',
        headers: {
          'apikey': 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9',
          'Authorization': 'Bearer sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9',
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          live_id: liveId,
          name: combinedName,
          phone: phoneVal,
          created_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('리드 저장 실패');
      }

      alert('✅ 상담 문의가 정상적으로 접수되었습니다!');
      leadModal.style.display = 'none';
    } catch (err) {
      console.error(err);
      alert('접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '문의 접수하기';
    }
  });
})();
