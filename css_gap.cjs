const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.css';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `.side-actions {
  position: absolute;
  right: 16px;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  pointer-events: auto;
  z-index: 5;
}`;

const newStr = `.side-actions {
  position: absolute;
  right: 16px;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 28px; /* 버튼 사이 간격 띄움 */
  pointer-events: auto;
  z-index: 5;
}

.action-btn {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 44px; /* 조금 더 미니멀하게 */
  height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  position: relative;
  transition: transform 0.1s;
}

.action-btn:active {
  transform: scale(0.9);
}

.action-btn .icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn .label {
  position: absolute;
  bottom: -20px;
  font-size: 11px;
  font-weight: normal;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
  white-space: nowrap;
}`;

content = content.replace(targetStr, newStr);

// Also we need to strip out the old .action-btn definition since I merged it into newStr
const oldActionBtn = `.action-btn {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  position: relative;
}

.action-btn .icon {
  font-size: 20px;
  line-height: 1;
}

.action-btn .label {
  position: absolute;
  bottom: -18px;
  font-size: 11px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
  white-space: nowrap;
}`;

content = content.replace(oldActionBtn, '');

fs.writeFileSync(file, content);
