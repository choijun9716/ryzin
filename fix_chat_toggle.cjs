const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const targetLogic = `  // 화면 첫 터치/클릭 시 자동 음소거 해제 (브라우저 정책 우회)`;

const newLogic = `  // 화면 클릭 시 채팅창 숨기기/보이기 토글
  const videoWrapper = document.querySelector('.video-wrapper');
  const chatSection = document.querySelector('.chat-section');
  const inputSection = document.querySelector('.input-section');

  videoWrapper.addEventListener('click', () => {
    chatSection.classList.toggle('chat-hidden');
    inputSection.classList.toggle('chat-hidden');
  });

  // 화면 첫 터치/클릭 시 자동 음소거 해제 (브라우저 정책 우회)`;

if (content.includes(targetLogic)) {
  content = content.replace(targetLogic, newLogic);
  fs.writeFileSync(file, content);
} else {
  console.log("Not found targetLogic");
}
