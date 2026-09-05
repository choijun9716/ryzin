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
        height: 100vh;
        width: 100vw;
        background: linear-gradient(135deg, #f6f8fd 0%, #f1f5f9 100%);
        position: relative;
        overflow: hidden;
      }
      .login-wrapper::before, .login-wrapper::after {
        content: "";
        position: absolute;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        filter: blur(80px);
        z-index: 0;
        opacity: 0.5;
        animation: float 10s infinite ease-in-out alternate;
      }
      .login-wrapper::before {
        background: rgba(59, 130, 246, 0.15);
        top: -100px;
        left: -100px;
      }
      .login-wrapper::after {
        background: rgba(139, 92, 246, 0.15);
        bottom: -150px;
        right: -100px;
        animation-delay: -5s;
      }
      @keyframes float {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-30px) scale(1.05); }
      }
      .login-card-container {
        width: 100%;
        max-width: 420px;
        z-index: 1;
        position: relative;
        overflow: hidden;
        border-radius: 24px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0,0,0,0.05);
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.6);
      }
      .slide-container {
        display: flex;
        width: 200%;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .slide-pane {
        width: 50%;
        padding: 40px;
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
        height: 38px;
        max-width: 220px;
        object-fit: contain;
      }
      .login-subtitle {
        color: var(--text-secondary, #6b7280);
        font-size: 14px;
        margin-bottom: 28px;
      }
      .login-form {
        display: flex;
        flex-direction: column;
        gap: 18px;
        text-align: left;
      }
      .input-group {
        position: relative;
      }
      .login-input {
        width: 100%;
        padding: 13px 16px;
        background: rgba(255, 255, 255, 0.95);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        font-size: 15px;
        color: var(--text-primary, #111827);
        transition: all 0.2s ease;
        box-sizing: border-box;
      }
      .login-input::placeholder {
        color: var(--text-tertiary, #9ca3af);
      }
      .login-input:focus {
        outline: none;
        background: #fff;
        border-color: #111111;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.08);
      }
      .login-label {
        display: block;
        margin-bottom: 6px;
        font-weight: 600;
        color: var(--text-secondary, #4b5563);
        font-size: 13px;
        letter-spacing: 0.02em;
      }
      .login-btn {
        width: 100%;
        padding: 13px;
        background: #111111;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      }
      .login-btn:hover:not(:disabled) {
        transform: translateY(-1px);
        background: #000000;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
      .login-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .email-badge-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        background: #eff6ff;
        border-radius: 16px;
        margin-bottom: 12px;
        color: #2563eb;
      }
      .otp-timer-badge {
        font-size: 12px;
        font-weight: 600;
        color: #dc2626;
        background: #fef2f2;
        padding: 2px 8px;
        border-radius: 6px;
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
            <div class="login-subtitle">라이브커머스 운영 관리 시스템</div>
            <form class="login-form" id="login-form">
              <div class="input-group">
                <label class="login-label">아이디</label>
                <input type="text" id="login-id" class="login-input" placeholder="계정 아이디를 입력하세요" required autocomplete="username">
              </div>
              <div class="input-group">
                <label class="login-label">비밀번호</label>
                <input type="password" id="login-pw" class="login-input" placeholder="비밀번호를 입력하세요" required autocomplete="current-password">
              </div>
              <button type="submit" class="login-btn" id="btn-login-submit">로그인</button>
            </form>
          </div>

          <!-- Step 2: 사내메일 2단계 OTP 인증 -->
          <div class="slide-pane" id="step-2">
            <div class="email-badge-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div style="font-size: 17px; font-weight: 700; color: #111827; margin-bottom: 6px;">사내메일 2단계 인증</div>
            <div style="font-size: 13px; color: #6b7280; line-height: 1.5; margin-bottom: 20px;">
              사내 메일(<span id="otp-target-email" style="font-weight: 600; color: #111827;"></span>)로<br>
              6자리 인증번호가 발송되었습니다.
            </div>

            <form class="login-form" id="otp-form">
              <div class="input-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="login-label" style="margin-bottom: 0;">인증번호 (6자리)</label>
                  <span id="otp-timer" class="otp-timer-badge">05:00</span>
                </div>
                <input type="text" id="login-otp" class="login-input" placeholder="6자리 숫자" required maxlength="6" pattern="[0-9]{6}" autocomplete="off" style="text-align: center; font-size: 24px; letter-spacing: 6px; font-weight: bold; font-family: monospace;">
              </div>
              <button type="submit" class="login-btn" id="btn-verify-otp">인증 및 로그인</button>

              <div style="display: flex; gap: 8px; margin-top: 4px;">
                <button type="button" class="btn" id="btn-resend-otp" style="flex: 1; font-size: 13px; padding: 10px; color: #4b5563; border: 1px solid #e5e7eb; border-radius: 10px; background: white; cursor: pointer;">인증번호 재발송</button>
                <button type="button" class="btn" id="btn-back" style="flex: 1; font-size: 13px; padding: 10px; color: #4b5563; border: 1px solid #e5e7eb; border-radius: 10px; background: white; cursor: pointer;">뒤로 가기</button>
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
          showError('인증번호 유효시간이 만료되었습니다. 재발송 버튼을 눌러주세요.');
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
      otpTimerEl.style.color = remainingSeconds <= 60 ? '#dc2626' : '#2563eb';
      if (btnVerifyOtp) btnVerifyOtp.disabled = false;
    }

    // Step 1: 아이디/비밀번호 검증 및 사내메일 OTP 발송
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('login-id').value.trim();
        const pw = document.getElementById('login-pw').value;

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
              }, 400);
              showSuccess('사내 메일로 인증번호가 발송되었습니다.');
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
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
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
          btnVerifyOtp.textContent = '인증 중...';
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
            handleLoginSuccess(result.token, result.user);
          } else {
            showError(result.error || '인증번호가 일치하지 않습니다.');
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
            showSuccess('새 인증번호가 사내 메일로 재발송되었습니다.');
          } else {
            showError(result.error || '인증번호 재발송에 실패했습니다.');
          }
        } catch (err) {
          showError('재발송 요청 중 네트워크 오류가 발생했습니다.');
        } finally {
          btnResendOtp.textContent = '인증번호 재발송';
          btnResendOtp.disabled = false;
        }
      });
    }

    // 뒤로 가기
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        if (timerInterval) clearInterval(timerInterval);
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
      showSuccess('사내 보안 인증 완료! 환영합니다.');

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
