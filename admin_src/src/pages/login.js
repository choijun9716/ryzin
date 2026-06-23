import { store } from '../data/store.js';
import { router } from '../router.js';
import { showSuccess, showError } from '../components/toast.js';
import ryzinLogo from '../assets/Ryzin.png';
import { TOTP, generateSecret, generateURI, verifySync } from 'otplib';
import QRCode from 'qrcode';

const authenticator = new TOTP();
authenticator.options = { window: 1 };

export function renderLogin() {
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
        background: linear-gradient(135deg, #111111 0%, #000000 100%);
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
        opacity: 0.3;
        animation: float 10s infinite ease-in-out alternate;
      }
      .login-wrapper::before {
        background: rgba(59, 130, 246, 0.2);
        top: -100px;
        left: -100px;
      }
      .login-wrapper::after {
        background: rgba(139, 92, 246, 0.2);
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
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0,0,0,0.3);
        background: rgba(30, 30, 30, 0.8);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
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
        filter: brightness(0) invert(1);
      }
      .login-logo img {
        height: 48px;
        object-fit: contain;
      }
      .login-subtitle {
        color: #a1a1aa;
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
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        font-size: 15px;
        color: #ffffff;
        transition: all 0.2s ease;
      }
      .login-input::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
      .login-input:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.1);
        border-color: #3b82f6;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
      }
      .login-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #d4d4d8;
        font-size: 13px;
        letter-spacing: 0.02em;
      }
      .login-btn {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 8px;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }
      .login-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
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
              <div style="font-size: 13px; color: var(--text-tertiary); background: #f1f5f9; padding: 12px; border-radius: 8px; text-align: left; line-height: 1.5;">
                <strong>최초 1회 등록 안내</strong><br>
                스마트폰의 Google OTP 앱을 실행하고 아래 QR 코드를 스캔하여 계정을 추가해주세요.
              </div>
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

        const user = store.verifyPassword(id, pw);

        if (user) {
          pendingUser = user;
          
          const savedSecret = localStorage.getItem(`ryzin_otp_${id}`);
          
          if (!savedSecret) {
            newSecret = generateSecret();
            const otpauth = generateURI({ issuer: 'Ryzin Admin', accountName: id, secret: newSecret });
            setupContainer.style.display = 'block';
            
            try {
              const url = await QRCode.toDataURL(otpauth, { margin: 1, width: 150 });
              qrcodeBox.innerHTML = `<img src="${url}" alt="QR Code">`;
            } catch (err) {
              console.error('QR 생성이 실패했습니다.', err);
            }
          } else {
            setupContainer.style.display = 'none';
          }
          
          slider.style.transform = 'translateX(-50%)';
          setTimeout(() => otpInput.focus(), 400);
        } else {
          showError('로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      });
    }

    if (otpForm) {
      otpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!pendingUser) return;
        
        const token = otpInput.value.trim();
        const savedSecret = localStorage.getItem(`ryzin_otp_${pendingUser.id}`);
        const secretToUse = savedSecret || newSecret;
        
        try {
          const isValid = verifySync({ token, secret: secretToUse });
          if (isValid) {
            if (!savedSecret && newSecret) {
              localStorage.setItem(`ryzin_otp_${pendingUser.id}`, newSecret);
            }
            
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
