const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const targetLogic = `// 모달 제어 로직`;

const muteLogic = `// 음소거 제어 로직
  const btnMute = document.getElementById('btn-mute');
  btnMute.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      btnMute.textContent = '🔊';
    } else {
      video.muted = true;
      btnMute.textContent = '🔇';
    }
  });

  // 모달 제어 로직`;

if (content.includes(targetLogic)) {
  content = content.replace(targetLogic, muteLogic);
  fs.writeFileSync(file, content);
} else {
  console.log("Not found targetLogic");
}
