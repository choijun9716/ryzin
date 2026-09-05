import { store } from '../data/store.js';
import { router } from '../router.js';
import { showSuccess, showError } from '../components/toast.js';
import ryzinLogo from '../assets/ryzin_studio_black.png';
import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';

export function renderLogin() {
  // 로그인 화면 진입 시 데모 모드가 켜져있다면 강제로 끔 (갇힘 방지)
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
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.5);
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
        color: var(--text-secondary);
        font-size: 15px;
        margin-bottom: 32px;
      }
      .login-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        text-align: left;
      }
      .input-group {
        position: relative;
      }
      .login-input {
        width: 100%;
        padding: 14px 16px;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        font-size: 15px;
        color: var(--text-primary);
        transition: all 0.2s ease;
      }
      .login-input::placeholder {
        color: var(--text-tertiary);
      }
      .login-input:focus {
        outline: none;
        background: #fff;
        border-color: #000000;
        box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
      }
      .login-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: var(--text-secondary);
        font-size: 13px;
        letter-spacing: 0.02em;
      }
      .login-btn {
        width: 100%;
        padding: 14px;
        background: #111111;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      .login-btn:hover {
        transform: translateY(-2px);
        background: #000000;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      }
      .otp-qrcode {
        margin: 16px auto;
        padding: 8px;
        background: white;
        border-radius: 8px;
        width: fit-content;
      }
      .otp-qrcode img {
        width: 150px;
        height: 150px;
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
              <button type="submit" class="login-btn">로그인</button>
            </form>
          </div>

          <!-- Step 2: Google OTP -->
          <div class="slide-pane" id="step-2">
            <div class="login-logo">
              <img src="${ryzinLogo}" alt="Ryzin Logo" />
            </div>
            <div class="login-subtitle" style="margin-bottom: 16px;">보안 강화를 위해 2단계 인증을 완료해주세요.</div>
            
            <div id="otp-setup-container" style="display: none; text-align: center; margin-bottom: 20px;">

              <div class="otp-qrcode" id="qrcode-box"></div>
            </div>

            <form class="login-form" id="otp-form">
              <div class="input-group">
                <label class="login-label">Google OTP 인증번호</label>
                <input type="text" id="login-otp" class="login-input" placeholder="6자리 숫자를 입력하세요" required maxlength="6" pattern="[0-9]{6}" autocomplete="off" style="text-align: center; font-size: 24px; letter-spacing: 4px; font-weight: bold;">
              </div>
              <button type="submit" class="login-btn">인증 및 로그인</button>

              <button type="button" class="btn btn-ghost" id="btn-back" style="width: 100%; margin-top: 8px; color: var(--text-tertiary);">뒤로 가기</button>
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
    const btnResetOtp = document.getElementById('btn-reset-otp');
    const setupContainer = document.getElementById('otp-setup-container');
    const qrcodeBox = document.getElementById('qrcode-box');
    const otpInput = document.getElementById('login-otp');
    
    let pendingUser = null;
    let newSecret = null;

    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('login-id').value.trim();
        const pw = document.getElementById('login-pw').value;

        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '로그인';
        if (submitBtn) {
          submitBtn.textContent = '로그인 중...';
          submitBtn.disabled = true;
        }

        try {
          // [보안] 로그인은 /api/admin/login 서버 엔드포인트를 통해 처리합니다.
          // 비밀번호 검증 및 JWT 발급이 서버에서 service_role 키로 안전하게 처리됩니다.
          const resp = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, password: pw }),
          });

          if (resp.ok) {
            const result = await resp.json();
            const { token, user } = result;

            // JWT 토큰 저장 (이후 모든 어드민 API 요청에 자동으로 첨부됩니다)
            localStorage.setItem('ryzin_admin_token', token);

            // 데모 모드가 아닐 때 store 초기화 (토큰이 있으므로 이제 데이터 조회 가능)
            if (!store.isDemoMode) {
              try {
                await store.init();
              } catch (err) {
                console.warn('init after login failed:', err);
              }
            }

            // store에 로그인 상태 반영
            store.completeLogin(user);

            if (store.isDemoMode) {
              showSuccess('데모 모드로 접속되었습니다.');
            } else {
              showSuccess('환영합니다.');
            }

            if (user.role && user.role.startsWith('live_stream:')) {
              router.navigate('/live_stream');
            } else if (user.role && user.role.startsWith('brand:')) {
              router.navigate('/projects');
            } else {
              router.navigate('/');
            }
          } else {
            // 서버 로그인 실패 시 fallback: 로컬 캐시 데이터로 검증 시도 (오프라인/서버 미배포 환경)
            const errData = await resp.json().catch(() => ({}));
            const errMsg = errData.error || '로그인 실패';

            // 서버가 배포되지 않은 환경(로컬 개발) 또는 오프라인일 때 로컬 검증 fallback
            if (resp.status >= 500 || resp.status === 404) {
              console.warn('[Login] 서버 로그인 불가, 로컬 캐시 fallback 시도...');
              try {
                await store.init();
              } catch (err) {
                console.warn('store init failed:', err);
              }
              const user = store.verifyPassword(id, pw);
              if (user) {
                store.completeLogin(user);
                showSuccess('환영합니다. (로컬 모드)');
                if (user.role && user.role.startsWith('live_stream:')) {
                  router.navigate('/live_stream');
                } else if (user.role && user.role.startsWith('brand:')) {
                  router.navigate('/projects');
                } else {
                  router.navigate('/');
                }
              } else {
                showError('로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.');
              }
            } else {
              showError(`로그인 실패: ${errMsg}`);
            }
          }
        } catch (err) {
          // 네트워크 오류 시 로컬 fallback
          console.warn('[Login] 네트워크 오류, 로컬 캐시 fallback:', err);
          try { await store.init(); } catch (_) {}
          const user = store.verifyPassword(id, pw);
          if (user) {
            store.completeLogin(user);
            showSuccess('환영합니다. (오프라인 모드)');
            router.navigate('/');
          } else {
            showError('로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.');
          }
        } finally {
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
        }
      });
    }

    if (otpForm) {
      otpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!pendingUser) return;
        
        const token = otpInput.value.trim();
        const savedSecret = pendingUser.otpSecret || localStorage.getItem(`ryzin_otp_${pendingUser.id}`);
        const secretToUse = savedSecret || newSecret;
        
        try {
          let totpValidate = new OTPAuth.TOTP({
            issuer: 'Ryzin Admin',
            label: pendingUser.id,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(secretToUse)
          });
          
          const delta = totpValidate.validate({ token: token, window: 1 });
          if (delta !== null) {
            if (!savedSecret && newSecret) {
              localStorage.setItem(`ryzin_otp_${pendingUser.id}`, newSecret);
              pendingUser.otpSecret = newSecret;
              store.updateUser(pendingUser);
            }
            localStorage.setItem(`ryzin_otp_trusted_${pendingUser.id}`, 'true');
            
            store.completeLogin(pendingUser);
            showSuccess('OTP 인증 성공! 환영합니다.');
            router.navigate('/');
          } else {
            showError('인증번호가 올바르지 않습니다.');
            otpInput.value = '';
            otpInput.focus();
          }
        } catch (err) {
          showError('인증 과정에 문제가 발생했습니다.');
        }
      });
    }

    if (btnResetOtp) {
      btnResetOtp.addEventListener('click', () => {
        if (pendingUser) {
          if (confirm('OTP 설정을 초기화하시겠습니까? 기기에서 기존 계정을 삭제하고 새로 등록해야 합니다.')) {
            localStorage.removeItem(`ryzin_otp_${pendingUser.id}`);
            alert('OTP 설정이 초기화되었습니다. 다시 로그인하여 새 QR 코드를 스캔하세요.');
            slider.style.transform = 'translateX(0)';
            pendingUser = null;
            otpInput.value = '';
          }
        }
      });
    }

    if (btnBack) {
      btnBack.addEventListener('click', () => {
        slider.style.transform = 'translateX(0)';
        pendingUser = null;
        otpInput.value = '';
      });
    }
  }, 0);

  return container;
}
