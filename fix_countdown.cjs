const fs = require('fs');
let content = fs.readFileSync('live/live.js', 'utf8');

// Find the logic where c.liveStartTime is applied
const targetTimeLogic = `        if (c.liveStartTime && startText) {
          startText.textContent = c.liveStartTime;
        } else if (startText) {
          startText.textContent = '';
        }`;

const newTimeLogic = `        
        // 카운트다운 타이머 관련 전역 변수 해제 (중복 방지)
        if (window.liveCountdownInterval) {
          clearInterval(window.liveCountdownInterval);
        }

        if (c.liveStartTime && startText) {
          const targetTime = new Date(c.liveStartTime).getTime();
          
          const updateCountdown = () => {
            const now = new Date().getTime();
            const diff = targetTime - now;
            
            if (diff <= 0) {
              startText.textContent = '곧 라이브가 시작됩니다!';
              if (window.liveCountdownInterval) clearInterval(window.liveCountdownInterval);
            } else {
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((diff % (1000 * 60)) / 1000);
              
              let countStr = '라이브 시작까지\\n';
              if (days > 0) countStr += \`\${days}일 \`;
              countStr += \`\${String(hours).padStart(2, '0')}:\${String(minutes).padStart(2, '0')}:\${String(seconds).padStart(2, '0')}\`;
              
              startText.innerText = countStr;
            }
          };
          
          if (!isNaN(targetTime)) {
            updateCountdown();
            window.liveCountdownInterval = setInterval(updateCountdown, 1000);
          } else {
            startText.textContent = c.liveStartTime;
          }
        } else if (startText) {
          startText.textContent = '';
        }`;

content = content.replace(targetTimeLogic, newTimeLogic);

fs.writeFileSync('live/live.js', content);
