const fs = require('fs');
let content = fs.readFileSync('live/live.js', 'utf8');

// Replace the HLS loading logic inside pollConfig
const oldPollStart = `        const startStream = () => {
          if (overlay) overlay.classList.add('hidden');
          if (Hls.isSupported()) {
            hls.loadSource(c.streamUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
              video.play().catch(e => console.warn('재생 실패:', e));
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = c.streamUrl;
            video.play().catch(e => console.warn(e));
          }
        };

        if (overlay && !overlay.classList.contains('hidden')) {
          if (btnStart) {
            btnStart.onclick = startStream;
          }
        } else {
          startStream();
        }`;

const newPollStart = `        const isLive = latest['방송상태'] === 'ON';
        const startStream = () => {
          if (overlay) overlay.classList.add('hidden');
          if (video.src !== c.streamUrl && !Hls.isSupported()) {
             if (video.canPlayType('application/vnd.apple.mpegurl')) {
               video.src = c.streamUrl;
             }
          } else if (Hls.isSupported()) {
             hls.loadSource(c.streamUrl);
             hls.attachMedia(video);
          }
          video.play().catch(e => console.warn('재생 실패:', e));
        };
        const stopStream = () => {
          if (overlay) overlay.classList.remove('hidden');
          video.pause();
        };

        if (isLive) {
          startStream();
        } else {
          stopStream();
        }`;
content = content.replace(oldPollStart, newPollStart);

// Also replace the initial load logic
const oldInitial = `  const initialStartStream = () => {
    const overlay = document.getElementById('thumbnail-overlay');
    if (overlay) overlay.classList.add('hidden');
    if (Hls.isSupported()) {
      hls.loadSource(m3u8Url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play().catch(e => console.warn("자동 재생 차단됨", e));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = m3u8Url;
      video.play().catch(e => console.warn("자동 재생 차단됨", e));
    }
  };

  const overlayInit = document.getElementById('thumbnail-overlay');
  const btnStartInit = document.getElementById('btn-start-live');
  if (overlayInit && !overlayInit.classList.contains('hidden')) {
    if (btnStartInit) {
      btnStartInit.onclick = initialStartStream;
    }
  } else {
    initialStartStream();
  }`;
const newInitial = `  // 초기 로드 시 시트 DB를 확인하기 전에는 썸네일을 띄워둡니다.
  // 방송상태(ON/OFF) 확인 후 pollConfig에서 재생을 관장합니다.`;
content = content.replace(oldInitial, newInitial);

fs.writeFileSync('live/live.js', content);
