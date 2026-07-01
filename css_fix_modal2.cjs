const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.css';
let content = fs.readFileSync(file, 'utf8');

const modalTarget = `  transition: transform 0.3s ease-out;`;
const modalNew = `  transition: transform 0.3s ease-out, visibility 0.3s;`;

content = content.replace(modalTarget, modalNew);

// Also need to allow scrolling inside the chat messages and product modal list if body has touch-action: none.
// But touch-action: none on body prevents ALL scrolling globally, including inside overflow-y: auto divs!
// So we must remove touch-action: none from body and just rely on position: fixed and overscroll-behavior: none.

const bodyNewTarget = `body {
  background-color: #000;
  color: #fff;
  overflow: hidden; /* 스크롤 방지 */
  position: fixed; /* 모바일에서 바운스/스크롤 원천 차단 */
  width: 100%;
  height: 100%;
  touch-action: none;
}`;

const bodyBetter = `body {
  background-color: #000;
  color: #fff;
  overflow: hidden; /* 스크롤 방지 */
  position: fixed; /* 모바일에서 바운스/스크롤 원천 차단 */
  width: 100%;
  height: 100%;
  overscroll-behavior: none; /* 스와이프 바운스 현상만 차단 */
}`;

content = content.replace(bodyNewTarget, bodyBetter);

fs.writeFileSync(file, content);
