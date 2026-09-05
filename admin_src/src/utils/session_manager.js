// admin_src/src/utils/session_manager.js
// 관리자 30분 비활성 시 자동 로그아웃 및 세션 만료 타이머 관리자

import { store } from '../data/store.js';
import { router } from '../router.js';
import { showError } from '../components/toast.js';

const INACTIVITY_TIMEOUT_SECONDS = 30 * 60; // 30분 (1800초)

class SessionManager {
  constructor() {
    this.remainingSeconds = INACTIVITY_TIMEOUT_SECONDS;
    this.lastActivity = Date.now();
    this.timerId = null;
    this.listeners = [];
    this.throttledActivity = this._throttle(() => this.recordActivity(), 3000);
    this.isListening = false;
  }

  // 활동 기록 (타이머 리셋)
  recordActivity() {
    if (!store.getCurrentUser()) return;
    this.lastActivity = Date.now();
    this.remainingSeconds = INACTIVITY_TIMEOUT_SECONDS;
    this._notifyListeners();
  }

  // 타이머 시작
  start() {
    this.stop();
    if (!store.getCurrentUser()) return;

    this.lastActivity = Date.now();
    this.remainingSeconds = INACTIVITY_TIMEOUT_SECONDS;

    // 브라우저 활동 이벤트 감지
    if (!this.isListening) {
      const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
      events.forEach(evt => {
        window.addEventListener(evt, this.throttledActivity, { passive: true });
      });
      this.isListening = true;
    }

    // 1초 단위 타이머
    this.timerId = setInterval(() => {
      if (!store.getCurrentUser()) {
        this.stop();
        return;
      }

      const elapsed = Math.floor((Date.now() - this.lastActivity) / 1000);
      this.remainingSeconds = Math.max(0, INACTIVITY_TIMEOUT_SECONDS - elapsed);
      this._notifyListeners();

      // 30분 경과 시 자동 로그아웃
      if (this.remainingSeconds <= 0) {
        this.expireSession();
      }
    }, 1000);

    this._notifyListeners();
  }

  // 타이머 중단
  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.remainingSeconds = INACTIVITY_TIMEOUT_SECONDS;
    this._notifyListeners();
  }

  // 세션 연장 (사용자가 직접 [연장] 클릭 시)
  extendSession() {
    this.recordActivity();
  }

  // 세션 만료 및 자동 로그아웃
  expireSession() {
    this.stop();
    store.logout();
    showError('30분 동안 활동이 없어 보안을 위해 자동 로그아웃되었습니다.');
    router.navigate('/login');
  }

  // 남은 시간(초) 포맷팅 (mm:ss)
  getFormattedTime() {
    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // 타이머 변화 구독
  onTick(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
      // 등록 즉시 현재 상태 전달
      callback({
        remainingSeconds: this.remainingSeconds,
        formatted: this.getFormattedTime(),
      });
    }
  }

  // 구독 해제
  offTick(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  _notifyListeners() {
    const info = {
      remainingSeconds: this.remainingSeconds,
      formatted: this.getFormattedTime(),
    };
    this.listeners.forEach(cb => {
      try {
        cb(info);
      } catch (err) {
        console.error('[SessionManager] Listener error:', err);
      }
    });
  }

  _throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function (...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
}

export const sessionManager = new SessionManager();
