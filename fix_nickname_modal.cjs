const fs = require('fs');

// 1. Update index.html
let fileHtml = '/Users/chaeijun/Downloads/ryzin-main 2/live/index.html';
let contentHtml = fs.readFileSync(fileHtml, 'utf8');

const targetNicknameSection = `      <!-- 닉네임 설정 영역 -->
      <div class="input-section" id="nickname-section" style="display:none;">
        <div class="input-wrapper">
          <input type="text" id="nickname-input" placeholder="사용할 닉네임을 입력해주세요" autocomplete="off">
          <button id="btn-set-nickname">확인</button>
        </div>
      </div>`;

const newNicknameModal = `      <!-- 닉네임 설정 모달 -->
      <div id="nickname-modal" class="nickname-modal" style="display:none;">
        <div class="nickname-modal-content">
          <h3>라이브 채팅 참여하기</h3>
          <p>채팅에 사용할 닉네임을 설정해주세요.</p>
          <input type="text" id="nickname-input" placeholder="닉네임 입력 (예: 라이진)" autocomplete="off">
          <button id="btn-set-nickname">입장하기</button>
        </div>
      </div>`;

contentHtml = contentHtml.replace(targetNicknameSection, newNicknameModal);
contentHtml = contentHtml.replace(/live\.css\?v=\d+/, 'live.css?v=' + Date.now());
contentHtml = contentHtml.replace(/live\.js\?v=\d+/, 'live.js?v=' + Date.now());
fs.writeFileSync(fileHtml, contentHtml);


// 2. Update live.js
let fileLive = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let contentLive = fs.readFileSync(fileLive, 'utf8');

contentLive = contentLive.replace("const nicknameSection = document.getElementById('nickname-section');", "const nicknameModal = document.getElementById('nickname-modal');");
contentLive = contentLive.replace("nicknameSection.style.display = 'block';", "nicknameModal.style.display = 'flex';");
contentLive = contentLive.replace("nicknameSection.style.display = 'none';", "nicknameModal.style.display = 'none';");

fs.writeFileSync(fileLive, contentLive);


// 3. Update live.css
let fileCss = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.css';
let contentCss = fs.readFileSync(fileCss, 'utf8');

const newCss = `
/* 닉네임 설정 모달 */
.nickname-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.nickname-modal-content {
  background: rgba(25, 25, 25, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 32px 24px;
  border-radius: 20px;
  width: 80%;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0,0,0,0.5);
  animation: modalScaleUp 0.3s ease-out;
}

.nickname-modal-content h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #fff;
  font-weight: 600;
}

.nickname-modal-content p {
  font-size: 13px;
  color: #aaa;
  margin-bottom: 24px;
}

.nickname-modal-content input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 15px;
  margin-bottom: 16px;
  outline: none;
  text-align: center;
}

.nickname-modal-content input:focus {
  border-color: #e50914;
}

.nickname-modal-content button {
  width: 100%;
  background: #e50914;
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

@keyframes modalScaleUp {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
`;

fs.appendFileSync(fileCss, newCss);

