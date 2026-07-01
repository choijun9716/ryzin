const fs = require('fs');
let content = fs.readFileSync('live/live.js', 'utf8');

// There are two places where video is played:
// 1. In pollConfig (streamUrl change)
// 2. The initial load at the bottom of the script

// Let's replace the whole streamUrl change block in pollConfig
const targetPoll = `        const startStream = () => {
          overlay.classList.add('hidden');
          hls.loadSource(c.streamUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play().catch(e => console.warn('재생 실패:', e));
          });
        };

        if (overlay && !overlay.classList.contains('hidden')) {
          if (btnStart) {
            btnStart.onclick = startStream;
          }
        } else {
          // 이미 플레이 중인 상태에서 url만 변경되었다면
          startStream();
        }
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = c.streamUrl;
            video.play().catch(e => console.warn(e));
          }`;

const replacementPoll = `        const startStream = () => {
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
content = content.replace(targetPoll, replacementPoll);

// And the initial load
const targetInitial = `  if (Hls.isSupported()) {
    hls.loadSource(m3u8Url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play().catch(e => console.warn("자동 재생 차단됨", e));
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari 등 네이티브 지원 브라우저
    video.src = m3u8Url;
    video.addEventListener('loadedmetadata', function () {
      video.play().catch(e => console.warn("자동 재생 차단됨", e));
    });
  }`;

const replacementInitial = `
  const initialStartStream = () => {
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
  }
`;
content = content.replace(targetInitial, replacementInitial);

fs.writeFileSync('live/live.js', content);
