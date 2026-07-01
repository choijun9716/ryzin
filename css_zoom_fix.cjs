const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.css';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `body {
  background-color: #000;
  color: #fff;`;

const newStr = `* {
  touch-action: manipulation; /* 사파리 더블탭 확대 방지 */
}

body {
  background-color: #000;
  color: #fff;`;

if (!content.includes('* {\n  touch-action: manipulation;')) {
  content = content.replace(targetStr, newStr);
  fs.writeFileSync(file, content);
}
