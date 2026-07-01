const fs = require('fs');
let content = fs.readFileSync('live/live.js', 'utf8');

const targetInitial = `  if (Hls.isSupported()) {
    window.hlsInstance = new Hls({
      // 옵션: 실시간 라이브에 맞게 튜닝 가능
      lowLatencyMode: true
    });
    window.hlsInstance.loadSource(m3u8Url);
    window.hlsInstance.attachMedia(video);
    window.hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play().catch(e => console.warn("자동 재생이 브라우저 정책에 의해 차단되었습니다.", e));
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari 등 네이티브 지원 브라우저
    video.src = m3u8Url;
    video.addEventListener('loadedmetadata', function () {
      video.play().catch(e => console.warn("자동 재생이 브라우저 정책에 의해 차단되었습니다.", e));
    });
  }`;

const newInitial = `  // 초기에는 아무것도 재생하지 않고 pollConfig()를 기다립니다.
  // 방송상태 확인 후 재생 여부를 결정합니다.
  if (Hls.isSupported()) {
    window.hlsInstance = new Hls({ lowLatencyMode: true });
  }`;
content = content.replace(targetInitial, newInitial);

const targetUpdate = `        if(c.streamUrl && window.__lastStreamUrl !== c.streamUrl) {
          window.__lastStreamUrl = c.streamUrl;
          if (window.hlsInstance) {
            window.hlsInstance.loadSource(c.streamUrl);
            window.hlsInstance.attachMedia(video);
            window.hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
              video.play().catch(e => console.warn(e));
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = c.streamUrl;
            video.play().catch(e => console.warn(e));
          }
        }`;

const newUpdate = `        const overlay = document.getElementById('thumbnail-overlay');
        
        // 라이브 상태 변경 확인 (streamUrl 변경 또는 isLive 변경)
        if(c.streamUrl && (window.__lastStreamUrl !== c.streamUrl || window.__lastIsLive !== c.isLive)) {
          window.__lastStreamUrl = c.streamUrl;
          window.__lastIsLive = c.isLive;
          
          if (c.isLive) {
            if (overlay) overlay.classList.add('hidden');
            if (window.hlsInstance) {
              window.hlsInstance.loadSource(c.streamUrl);
              window.hlsInstance.attachMedia(video);
              window.hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play().catch(e => console.warn(e));
              });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
              video.src = c.streamUrl;
              video.play().catch(e => console.warn(e));
            }
          } else {
            if (overlay) overlay.classList.remove('hidden');
            video.pause();
          }
        }`;

content = content.replace(targetUpdate, newUpdate);

fs.writeFileSync('live/live.js', content);
