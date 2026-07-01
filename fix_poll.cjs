const fs = require('fs');
let content = fs.readFileSync('live/live.js', 'utf8');

const targetConfigObj = `          const config = {
            brandName: latest['제목'] || 'Ryzin Corp',
            title: latest['부제목'] || '단독 특가 라이브 방송 중!',
            logoUrl: latest['프로필이미지'] || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
            streamUrl: latest['URL'] || '',
            showViewers: latest['시청자수노출'] !== 'X'
          };`;

const newConfigObj = `          const config = {
            brandName: latest['제목'] || 'Ryzin Corp',
            title: latest['부제목'] || '단독 특가 라이브 방송 중!',
            logoUrl: latest['프로필이미지'] || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
            streamUrl: latest['URL'] || '',
            showViewers: latest['시청자수노출'] !== 'X',
            thumbnailUrl: latest['썸네일URL'] || '',
            liveStartTime: latest['시작일시'] || '',
            isLive: latest['방송상태'] === 'ON'
          };`;

content = content.replace(targetConfigObj, newConfigObj);
fs.writeFileSync('live/live.js', content);
