const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.css';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `/* 입력 영역 */
.input-section {
  padding: 8px 16px 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
}

.btn-like {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  color: white;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  cursor: pointer;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.input-wrapper {
  flex: 1;
  display: flex;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 4px 4px 4px 16px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}`;

const newStr = `/* 사이드 액션 버튼 */
.side-actions {
  position: absolute;
  right: 16px;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  pointer-events: auto;
  z-index: 5;
}

.action-btn {
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
}

/* 입력 영역 */
.input-section {
  padding: 8px 16px 16px;
  display: flex;
  align-items: center;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  pointer-events: auto;
  z-index: 5;
}

.input-wrapper {
  flex: 1;
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 6px 6px 6px 16px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}`;

content = content.replace(targetStr, newStr);

// 채팅 영역도 패딩 조절
const chatStr = `.chat-section {
  height: 250px;
  padding: 0 16px 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}`;
const newChatStr = `.chat-section {
  height: 250px;
  padding: 0 80px 16px 16px; /* 우측 액션버튼 공간 확보 */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}`;
content = content.replace(chatStr, newChatStr);

fs.writeFileSync(file, content);
