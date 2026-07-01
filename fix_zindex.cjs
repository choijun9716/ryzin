const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.css';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `.video-overlay {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;`;

const newStr = `.video-overlay {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  z-index: 30; /* 그라데이션 및 UI 위로 빼냄 */`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, newStr);
  fs.writeFileSync(file, content);
}
