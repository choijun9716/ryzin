import { store } from '../data/store.js';
import { router } from '../router.js';
import { showSuccess, showError } from '../components/toast.js';
import ryzinLogo from '../assets/ryzin_studio_black.png';

export function renderLogin() {
  // 로그인 화면 진입 시 데모 모드가 켜져있다면 강제로 끔
  if (store.isDemoMode) {
    localStorage.setItem('ryzin_is_demo_mode', 'false');
    store.isDemoMode = false;
    store.STORAGE_KEY = 'livecommerce_erp_data';
    store._load();
  }

  const container = document.createElement('div');
  container.className = 'login-container';
  container.innerHTML = `
    <style>
      .login-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        width: 100vw;
        background-color: #f8fafc;
        background-image: radial-gradient(at 50% 0%, rgba(226, 232, 240, 0.6) 0px, transparent 65%);
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif;
        color: #0f172a;
      }
      .login-card-container {
        width: 100%;
        max-width: 390px;
        position: relative;
        overflow: hidden;
        border-radius: 16px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
      }
      .slide-container {
        display: flex;
        width: 200%;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .slide-pane {
        width: 50%;
        padding: 40px 32px 36px 32px;
        flex-shrink: 0;
        text-align: center;
        box-sizing: border-box;
      }
      .login-logo {
        display: flex;
        justify-content: center;
        margin-bottom: 8px;
      }
      .login-logo img {
        height: 30px;
        max-width: 180px;
        object-fit: contain;
      }
      .login-subtitle {
        color: #64748b;
        font-size: 13px;
        margin-bottom: 28px;
        font-weight: 400;
        letter-spacing: -0.01em;
      }
      .login-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        text-align: left;
      }
      .input-group {
        position: relative;
      }
      .login-input {
        width: 100%;
        padding: 11px 14px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 14px;
        color: #0f172a;
        transition: all 0.15s ease;
        box-sizing: border-box;
      }
      .login-input::placeholder {
        color: #94a3b8;
        font-size: 13px;
      }
      .login-input:focus {
        outline: none;
        background: #ffffff;
        border-color: #0f172a;
        box-shadow: 0 0 0 1px #0f172a;
      }
      .login-label {
        display: block;
        margin-bottom: 6px;
        font-weight: 600;
        color: #334155;
        font-size: 12px;
        letter-spacing: -0.01em;
      }
      .login-btn {
        width: 100%;
        height: 42px;
        background: #0f172a;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
        margin-top: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .login-btn:hover:not(:disabled) {
        background: #1e293b;
      }
      .login-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .security-icon-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        background: #f1f5f9;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        margin-bottom: 12px;
        color: #0f172a;
      }
      .otp-email-pill {
        display: inline-block;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 12px;
        font-weight: 600;
        color: #0f172a;
        background: #f1f5f9;
        padding: 3px 8px;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
        margin-top: 4px;
      }
      .otp-timer-container {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        font-weight: 600;
        color: #e11d48;
        background: #fff1f2;
        padding: 2px 8px;
        border-radius: 6px;
      }
      .timer-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #e11d48;
        animation: pulse 1.5s infinite ease-in-out;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(0.8); }
      }
      .btn-sub-action {
        flex: 1;
        height: 36px;
        font-size: 12px;
        font-weight: 500;
        color: #64748b;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .btn-sub-action:hover:not(:disabled) {
        color: #0f172a;
        border-color: #cbd5e1;
        background: #f8fafc;
      }
      .btn-sub-action:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    </style>
    <div class="login-wrapper">
      <div class="login-card-container">
        <div class="slide-container" id="login-slider">
          
          <!-- Step 1: ID / Password -->
          <div class="slide-pane" id="step-1">
            <div class="login-logo">
              <img src="${ryzinLogo}" alt="Ryzin Logo" />
            </div>
            <div class="login-subtitle">운영 관리 시스템</div>
            <form class="login-form" id="login-form">
              <div class="input-group">
                <label class="login-label">아이디</label>
                <input type="text" id="login-id" class="login-input" placeholder="아이디 입력" required autocomplete="username">
              </div>
              <div class="input-group">
                <label class="login-label">비밀번호</label>
                <input type="password" id="login-pw" class="login-input" placeholder="비밀번호 입력" required autocomplete="current-password">
              </div>
              <button type="submit" class="login-btn" id="btn-login-submit">로그인</button>
            </form>
          </div>

          <!-- Step 2: 사내메일 2단계 OTP 인증 -->
          <div class="slide-pane" id="step-2">
            <div class="security-icon-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div style="font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 6px; letter-spacing: -0.02em;">사내 보안 인증</div>
            <div style="font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 22px;">
              인증번호가 사내 메일로 발송되었습니다.<br>
              <span id="otp-target-email" class="otp-email-pill"></span>
            </div>

            <form class="login-form" id="otp-form">
              <div class="input-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="login-label" style="margin-bottom: 0;">인증코드</label>
                  <div class="otp-timer-container">
                    <span class="timer-dot"></span>
                    <span id="otp-timer">05:00</span>
                  </div>
                </div>
                <input type="text" id="login-otp" class="login-input" placeholder="6자리 번호" required maxlength="6" pattern="[0-9]{6}" autocomplete="off" style="text-align: center; font-size: 26px; letter-spacing: 8px; font-weight: 700; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; padding: 10px; height: 50px;">
              </div>
              <button type="submit" class="login-btn" id="btn-verify-otp">인증 및 로그인</button>

              <div style="display: flex; gap: 8px; margin-top: 4px;">
                <button type="button" class="btn-sub-action" id="btn-resend-otp">인증코드 재발송</button>
                <button type="button" class="btn-sub-action" id="btn-back">뒤로 가기</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const loginForm = document.getElementById('login-form');
    const otpForm = document.getElementById('otp-form');
    const slider = document.getElementById('login-slider');
    const btnBack = document.getElementById('btn-back');
    const btnResendOtp = document.getElementById('btn-resend-otp');
    const otpInput = document.getElementById('login-otp');
    const otpTargetEmail = document.getElementById('otp-target-email');
    const otpTimerEl = document.getElementById('otp-timer');
    const btnVerifyOtp = document.getElementById('btn-verify-otp');

    let currentSessionToken = null;
    let timerInterval = null;
    let remainingSeconds = 300;
    let isSubmittingLogin = false;
    let resendCooldownTimer = null;
    let resendCooldownSeconds = 0;

    function startTimer(seconds = 300) {
      if (timerInterval) clearInterval(timerInterval);
      remainingSeconds = seconds;
      updateTimerDisplay();

      timerInterval = setInterval(() => {
        remainingSeconds -= 1;
        if (remainingSeconds <= 0) {
          clearInterval(timerInterval);
          if (otpTimerEl) {
            otpTimerEl.textContent = '시간 만료';
            otpTimerEl.style.color = '#dc2626';
          }
          if (btnVerifyOtp) btnVerifyOtp.disabled = true;
          showError('인증번호 유효시간이 만료되었습니다. 재발송을 눌러주세요.');
        } else {
          updateTimerDisplay();
        }
      }, 1000);
    }

    function updateTimerDisplay() {
      if (!otpTimerEl) return;
      const m = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
      const s = (remainingSeconds % 60).toString().padStart(2, '0');
      otpTimerEl.textContent = `${m}:${s}`;
      if (btnVerifyOtp) btnVerifyOtp.disabled = false;
    }

    // Step 1: 아이디/비밀번호 검증 및 사내메일 OTP 발송
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (isSubmittingLogin) return;
        isSubmittingLogin = true;

        const idInput = document.getElementById('login-id');
        const pwInput = document.getElementById('login-pw');
        const id = idInput ? idInput.value.trim() : '';
        const pw = pwInput ? pwInput.value : '';

        if (idInput) idInput.disabled = true;
        if (pwInput) pwInput.disabled = true;

        const submitBtn = document.getElementById('btn-login-submit');
        const originalText = submitBtn ? submitBtn.textContent : '로그인';
        if (submitBtn) {
          submitBtn.textContent = '인증 메일 발송 중...';
          submitBtn.disabled = true;
        }

        try {
          const resp = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, password: pw }),
          });

          const result = await resp.json().catch(() => ({}));

          if (resp.ok && result.success) {
            // 2단계 OTP 인증이 필요한 경우 (사내메일 발송 완료)
            if (result.step === 'otp_required') {
              currentSessionToken = result.sessionToken;
              if (otpTargetEmail) {
                otpTargetEmail.textContent = result.email || '사내 메일';
              }
              if (otpInput) {
                otpInput.value = '';
              }
              startTimer(300);
              slider.style.transform = 'translateX(-50%)';
              setTimeout(() => {
                if (otpInput) otpInput.focus();
              }, 350);
              showSuccess('사내 메일로 인증코드가 발송되었습니다.');
              return;
            }

            // OTP가 생략된 경우 (바로 토큰 발급)
            if (result.token && result.user) {
              handleLoginSuccess(result.token, result.user);
              return;
            }
          }

          // 오류 처리
          showError(result.error || '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
        } catch (err) {
          console.error('[Login] 오류 발생:', err);
          showError('로그인 처리 중 네트워크 오류가 발생했습니다.');
        } finally {
          if (idInput) idInput.disabled = false;
          if (pwInput) pwInput.disabled = false;
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
          isSubmittingLogin = false;
        }
      });
    }

    // Step 2: 6자리 OTP 검증
    if (otpForm) {
      otpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentSessionToken) {
          showError('인증 세션이 유효하지 않습니다. 다시 로그인해주세요.');
          slider.style.transform = 'translateX(0)';
          return;
        }

        const code = otpInput.value.trim();
        if (!code || code.length !== 6) {
          showError('6자리 인증번호를 정확히 입력해주세요.');
          return;
        }

        if (btnVerifyOtp) {
          btnVerifyOtp.textContent = '확인 중...';
          btnVerifyOtp.disabled = true;
        }

        try {
          const resp = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'verify_otp',
              sessionToken: currentSessionToken,
              code,
            }),
          });

          const result = await resp.json().catch(() => ({}));

          if (resp.ok && result.success) {
            if (timerInterval) clearInterval(timerInterval);
            if (resendCooldownTimer) clearInterval(resendCooldownTimer);
            handleLoginSuccess(result.token, result.user);
          } else {
            showError(result.error || '인증코드가 일치하지 않습니다.');
            otpInput.value = '';
            otpInput.focus();
          }
        } catch (err) {
          console.error('[OTP Verify] 오류:', err);
          showError('인증 확인 중 오류가 발생했습니다.');
        } finally {
          if (btnVerifyOtp) {
            btnVerifyOtp.textContent = '인증 및 로그인';
            btnVerifyOtp.disabled = false;
          }
        }
      });
    }

    // 인증번호 재발송
    if (btnResendOtp) {
      btnResendOtp.addEventListener('click', async () => {
        if (!currentSessionToken) {
          showError('다시 처음부터 로그인해주세요.');
          slider.style.transform = 'translateX(0)';
          return;
        }

        if (resendCooldownSeconds > 0) {
          showError(`${resendCooldownSeconds}초 후에 재발송할 수 있습니다.`);
          return;
        }

        btnResendOtp.textContent = '발송 중...';
        btnResendOtp.disabled = true;

        try {
          const resp = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'resend_otp',
              sessionToken: currentSessionToken,
            }),
          });

          const result = await resp.json().catch(() => ({}));

          if (resp.ok && result.success) {
            currentSessionToken = result.sessionToken;
            startTimer(300);
            otpInput.value = '';
            otpInput.focus();
            showSuccess('새 인증코드가 사내 메일로 재발송되었습니다.');

            // 20초 쿨다운 타이머 시작
            resendCooldownSeconds = 20;
            btnResendOtp.disabled = true;
            btnResendOtp.textContent = `재발송 (20s)`;
            if (resendCooldownTimer) clearInterval(resendCooldownTimer);
            resendCooldownTimer = setInterval(() => {
              resendCooldownSeconds -= 1;
              if (resendCooldownSeconds <= 0) {
                clearInterval(resendCooldownTimer);
                btnResendOtp.disabled = false;
                btnResendOtp.textContent = '인증코드 재발송';
              } else {
                btnResendOtp.textContent = `재발송 (${resendCooldownSeconds}s)`;
              }
            }, 1000);
          } else {
            showError(result.error || '인증코드 재발송에 실패했습니다.');
            btnResendOtp.textContent = '인증코드 재발송';
            btnResendOtp.disabled = false;
          }
        } catch (err) {
          showError('재발송 요청 중 네트워크 오류가 발생했습니다.');
          btnResendOtp.textContent = '인증코드 재발송';
          btnResendOtp.disabled = false;
        }
      });
    }

    // 뒤로 가기
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        if (timerInterval) clearInterval(timerInterval);
        if (resendCooldownTimer) clearInterval(resendCooldownTimer);
        resendCooldownSeconds = 0;
        if (btnResendOtp) {
          btnResendOtp.textContent = '인증코드 재발송';
          btnResendOtp.disabled = false;
        }
        slider.style.transform = 'translateX(0)';
        currentSessionToken = null;
        if (otpInput) otpInput.value = '';
      });
    }

    // 로그인 완료 공통 처리 함수
    async function handleLoginSuccess(token, user) {
      localStorage.setItem('ryzin_admin_token', token);

      if (!store.isDemoMode) {
        try {
          await store.init();
        } catch (err) {
          console.warn('init after login failed:', err);
        }
      }

      store.completeLogin(user);
      showSuccess('보안 인증 완료! 환영합니다.');

      if (user.role && user.role.startsWith('live_stream:')) {
        router.navigate('/live_stream');
      } else if (user.role && user.role.startsWith('brand:')) {
        router.navigate('/projects');
      } else {
        router.navigate('/');
      }
    }

  }, 0);

  return container;
}
