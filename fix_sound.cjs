const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const targetLogic = `  // 음소거 제어 로직
  const btnMute = document.getElementById('btn-mute');
  btnMute.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      btnMute.textContent = '🔊';
    } else {
      video.muted = true;
      btnMute.textContent = '🔇';
    }
  });`;

const newLogic = `  // 음소거 제어 로직
  const btnMute = document.getElementById('btn-mute');
  btnMute.addEventListener('click', () => {
    if (video.muted || video.volume === 0) {
      video.muted = false;
      video.volume = 1.0;
      btnMute.textContent = '🔊';
      // 혹시라도 멈췄을 경우를 대비해 다시 재생 명령
      video.play().catch(e => console.warn(e));
    } else {
      video.muted = true;
      video.volume = 0;
      btnMute.textContent = '🔇';
    }
  });`;

if (content.includes(targetLogic)) {
  content = content.replace(targetLogic, newLogic);
  fs.writeFileSync(file, content);
} else {
  console.log("Not found targetLogic");
}
