const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.css';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `.side-actions {
  position: absolute;
  right: 16px;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 28px; /* 버튼 사이 간격 띄움 */
  pointer-events: auto;
  z-index: 5;
}`;

const newStr = `.side-actions {
  position: absolute;
  right: 16px;
  bottom: 110px; /* 조금 더 위로 */
  display: flex;
  flex-direction: column;
  gap: 36px; /* 간격 더 벌림 */
  pointer-events: auto;
  z-index: 5;
}`;

content = content.replace(targetStr, newStr);

// 채팅 숨김 트랜지션 및 클래스 추가
content += `

/* 채팅창 토글 숨김용 클래스 */
.chat-section, .input-section {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.chat-hidden {
  opacity: 0 !important;
  pointer-events: none !important;
  transform: translateY(20px);
}
`;

fs.writeFileSync(file, content);
