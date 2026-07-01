const fs = require('fs');
let content = fs.readFileSync('live/live.js', 'utf8');

const targetPoll = `  // 상품/관제 10분마다 조회 (600,000ms)
  setInterval(pollConfig, 600000);`;

const newPoll = `  // 방송 전에는 즉각적인 시작을 위해 3초마다 조회, 방송 시작 후에는 데이터 절감을 위해 10분마다 조회
  window.pollConfigIntervalId = setInterval(pollConfig, 3000);`;

content = content.replace(targetPoll, newPoll);

const targetConfigLogic = `          const config = {
            brandName: latest['제목'] || 'Ryzin Corp',
            title: latest['부제목'] || '단독 특가 라이브 방송 중!',
            logoUrl: latest['프로필이미지'] || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
            streamUrl: latest['URL'] || '',
            showViewers: latest['시청자수노출'] !== 'X',
            thumbnailUrl: latest['썸네일URL'] || '',
            liveStartTime: latest['시작일시'] || '',
            isLive: latest['방송상태'] === 'ON'
          };`;

const newConfigLogic = `          const config = {
            brandName: latest['제목'] || 'Ryzin Corp',
            title: latest['부제목'] || '단독 특가 라이브 방송 중!',
            logoUrl: latest['프로필이미지'] || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
            streamUrl: latest['URL'] || '',
            showViewers: latest['시청자수노출'] !== 'X',
            thumbnailUrl: latest['썸네일URL'] || '',
            liveStartTime: latest['시작일시'] || '',
            isLive: latest['방송상태'] === 'ON'
          };

          // 동적 폴링 주기 조절
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

content = content.replace(targetConfigLogic, newConfigLogic);

fs.writeFileSync('live/live.js', content);
