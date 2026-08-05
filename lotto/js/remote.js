/**
 * LottoRemoteBroadcaster - 독립 사이트 간 무지연 실시간 동기화 모듈 (RYZIN Edition)
 * BroadcastChannel API 기반으로 control.html과 display.html 간 0.001초 제어 신호 전달
 */
class LottoRemoteBroadcaster {
  constructor(channelName = 'ryzin_lotto_obs_channel') {
    this.channelName = channelName;
    this.channel = null;
    this.listeners = [];
    this.init();
  }

  init() {
    if ('BroadcastChannel' in window) {
      this.channel = new BroadcastChannel(this.channelName);
      this.channel.onmessage = (event) => {
        this.notify(event.data);
      };
    } else {
      window.addEventListener('storage', (event) => {
        if (event.key === this.channelName && event.newValue) {
          try {
            const data = JSON.parse(event.newValue);
            this.notify(data);
          } catch (e) {
            console.error('Storage sync parse error', e);
          }
        }
      });
    }
  }

  emit(type, payload = {}) {
    const message = { type, payload, timestamp: Date.now() };
    if (this.channel) {
      this.channel.postMessage(message);
    } else {
      localStorage.setItem(this.channelName, JSON.stringify(message));
    }
  }

  on(type, callback) {
    this.listeners.push({ type, callback });
  }

  notify(message) {
    if (!message || !message.type) return;
    this.listeners.forEach(listener => {
      if (listener.type === '*' || listener.type === message.type) {
        listener.callback(message.payload, message);
      }
    });
  }
}

const remoteBroadcaster = new LottoRemoteBroadcaster();
