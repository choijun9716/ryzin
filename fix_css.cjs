const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.css';
let content = fs.readFileSync(file, 'utf8');

const targetChat = `.chat-section {
  height: 250px;
  padding: 0 80px 16px 16px; /* 우측 액션버튼 공간 확보 */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}`;

const newChat = `.chat-section {
  height: 250px;
  margin-top: auto; /* 상단 공간을 다 밀어내서 하단으로 내림 */
  padding: 0 80px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}`;

content = content.replace(targetChat, newChat);

const targetMute = `.btn-mute {
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  pointer-events: auto;
  z-index: 10;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}`;

const newMute = `.btn-mute {
  background: transparent;
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  pointer-events: auto;
  z-index: 10;
  opacity: 0.8;
}`;

content = content.replace(targetMute, newMute);

// Fix the top overlay to look cleaner too
const viewCountTarget = `.view-count {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}`;
const viewCountNew = `.view-count {
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 4px;
}`;
content = content.replace(viewCountTarget, viewCountNew);

fs.writeFileSync(file, content);
