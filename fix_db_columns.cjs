const fs = require('fs');
// 1. Fix admin_src/src/pages/live_stream.js
let adminContent = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

const targetAdminPayload = `        '첫상품명': products.length > 0 ? products[0].name : '',
        '상품목록': JSON.stringify(products),
        '시청자수노출': config.showViewers ? 'O' : 'X',
        '썸네일URL': config.thumbnailUrl || '',
        '시작일시': config.liveStartTime || '',
        '방송상태': config.isLive ? 'ON' : 'OFF'
      };`;

const newAdminPayload = `        '첫상품명': JSON.stringify({
          thumbnailUrl: config.thumbnailUrl || '',
          liveStartTime: config.liveStartTime || '',
          isLive: config.isLive === true
        }),
        '상품목록': JSON.stringify(products),
        '시청자수노출': config.showViewers ? 'O' : 'X',
        '썸네일URL': config.thumbnailUrl || '',
        '시작일시': config.liveStartTime || '',
        '방송상태': config.isLive ? 'ON' : 'OFF'
      };`;

adminContent = adminContent.replace(targetAdminPayload, newAdminPayload);
fs.writeFileSync('admin_src/src/pages/live_stream.js', adminContent);

// 2. Fix live/live.js
let liveContent = fs.readFileSync('live/live.js', 'utf8');

const targetLiveConfig = `          const config = {
            brandName: latest['제목'] || 'Ryzin Corp',
            title: latest['부제목'] || '단독 특가 라이브 방송 중!',
            logoUrl: latest['프로필이미지'] || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
            streamUrl: latest['URL'] || '',
            showViewers: latest['시청자수노출'] !== 'X',
            thumbnailUrl: latest['썸네일URL'] || '',
            liveStartTime: latest['시작일시'] || '',
            isLive: latest['방송상태'] === 'ON'
          };`;

const newLiveConfig = `          let extraConfig = {};
          try {
            if (latest['첫상품명'] && latest['첫상품명'].startsWith('{')) {
              extraConfig = JSON.parse(latest['첫상품명']);
            }
          } catch(e){}

          const config = {
            brandName: latest['제목'] || 'Ryzin Corp',
            title: latest['부제목'] || '단독 특가 라이브 방송 중!',
            logoUrl: latest['프로필이미지'] || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
            streamUrl: latest['URL'] || '',
            showViewers: latest['시청자수노출'] !== 'X',
            thumbnailUrl: extraConfig.thumbnailUrl || latest['썸네일URL'] || '',
            liveStartTime: extraConfig.liveStartTime || latest['시작일시'] || '',
            isLive: (extraConfig.isLive === true || latest['방송상태'] === 'ON')
          };`;

liveContent = liveContent.replace(targetLiveConfig, newLiveConfig);
fs.writeFileSync('live/live.js', liveContent);
