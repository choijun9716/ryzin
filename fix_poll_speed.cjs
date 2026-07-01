const fs = require('fs');
let content = fs.readFileSync('live/live.js', 'utf8');

const targetLogic = `          // 동적 폴링 주기 조절
          if (config.isLive) {
            if (window.__currentPollRate !== 'slow') {
              window.__currentPollRate = 'slow';
              clearInterval(window.pollConfigIntervalId);
              window.pollConfigIntervalId = setInterval(pollConfig, 600000); // 10분
            }
          } else {
            if (window.__currentPollRate !== 'fast') {
              window.__currentPollRate = 'fast';
              clearInterval(window.pollConfigIntervalId);
              window.pollConfigIntervalId = setInterval(pollConfig, 3000); // 3초
            }
          }`;

const newLogic = `          // 사용자의 요청에 따라 라이브 중에도 상품 즉각 적용을 위해 폴링 주기 단축 (5초)
          if (config.isLive) {
            if (window.__currentPollRate !== 'live') {
              window.__currentPollRate = 'live';
              clearInterval(window.pollConfigIntervalId);
              window.pollConfigIntervalId = setInterval(pollConfig, 5000); // 5초
            }
          } else {
            if (window.__currentPollRate !== 'standby') {
              window.__currentPollRate = 'standby';
              clearInterval(window.pollConfigIntervalId);
              window.pollConfigIntervalId = setInterval(pollConfig, 3000); // 3초
            }
          }`;

content = content.replace(targetLogic, newLogic);
fs.writeFileSync('live/live.js', content);
