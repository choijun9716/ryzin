const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const targetLogic = `  // 음소거 제어 로직
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

const newLogic = `  // 화면 첫 터치/클릭 시 자동 음소거 해제 (브라우저 정책 우회)
  const unmuteOnInteraction = () => {
    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      video.play().catch(e => console.warn(e));
    }
    // 한 번 실행된 후 이벤트 리스너 제거
    document.removeEventListener('click', unmuteOnInteraction);
    document.removeEventListener('touchstart', unmuteOnInteraction);
  };
  
  document.addEventListener('click', unmuteOnInteraction);
  document.addEventListener('touchstart', unmuteOnInteraction, { passive: true });`;

if (content.includes(targetLogic)) {
  content = content.replace(targetLogic, newLogic);
  fs.writeFileSync(file, content);
} else {
  console.log("Not found targetLogic");
}
