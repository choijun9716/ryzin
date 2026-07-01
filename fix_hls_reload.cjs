const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

// Expose Hls instance
const targetHls = `  if (Hls.isSupported()) {
    const hls = new Hls({
      enableWorker: true,`;
const newHls = `  if (Hls.isSupported()) {
    const hls = new Hls({
      enableWorker: true,`;
// Wait, let's just make `let hls;` at the top of the block.
const hlsTarget2 = `  if (Hls.isSupported()) {
    const hls = new Hls({`;
const hlsNew2 = `  if (Hls.isSupported()) {
    window.hlsInstance = new Hls({`;
content = content.replace(hlsTarget2, hlsNew2);

// Fix hls references
content = content.replace(/hls\.loadSource/g, 'window.hlsInstance.loadSource');
content = content.replace(/hls\.attachMedia/g, 'window.hlsInstance.attachMedia');
content = content.replace(/hls\.on/g, 'window.hlsInstance.on');

// Implement reload logic
const targetReload = `        if(c.streamUrl && video.src !== c.streamUrl && c.streamUrl !== m3u8Url) {
          // url이 바뀌었을 경우 리로드 로직 (데모에선 생략하거나 지원)
        }`;
const newReload = `        if(c.streamUrl && window.__lastStreamUrl !== c.streamUrl) {
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
content = content.replace(targetReload, newReload);

fs.writeFileSync(file, content);
