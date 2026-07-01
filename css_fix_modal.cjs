const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.css';
let content = fs.readFileSync(file, 'utf8');

const bodyTarget = `body {
  background-color: #000;
  color: #fff;
  overflow: hidden; /* 스크롤 방지 */
}`;

const bodyNew = `body {
  background-color: #000;
  color: #fff;
  overflow: hidden; /* 스크롤 방지 */
  position: fixed; /* 모바일에서 바운스/스크롤 원천 차단 */
  width: 100%;
  height: 100%;
  touch-action: none;
}`;

content = content.replace(bodyTarget, bodyNew);

const hiddenTarget = `.product-modal.hidden {
  transform: translateY(100%);
}`;

const hiddenNew = `.product-modal.hidden {
  transform: translateY(100%);
  pointer-events: none;
  visibility: hidden; /* 숨김 상태일 때 스크롤이나 클릭 이벤트 완전 차단 */
}`;

content = content.replace(hiddenTarget, hiddenNew);

fs.writeFileSync(file, content);
