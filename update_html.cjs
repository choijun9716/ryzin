const fs = require('fs');

let fileHtml = '/Users/chaeijun/Downloads/ryzin-main 2/live/index.html';
let contentHtml = fs.readFileSync(fileHtml, 'utf8');

const targetInputSection = `      <!-- 입력 영역 (최하단) -->
      <div class="input-section">
        <div class="input-wrapper">
          <input type="text" id="chat-input" placeholder="실시간 채팅에 참여하세요..." autocomplete="off">
          <button id="btn-send">전송</button>
        </div>
      </div>`;

const newInputSection = `      <!-- 닉네임 설정 영역 -->
      <div class="input-section" id="nickname-section" style="display:none;">
        <div class="input-wrapper">
          <input type="text" id="nickname-input" placeholder="사용할 닉네임을 입력해주세요" autocomplete="off">
          <button id="btn-set-nickname">확인</button>
        </div>
      </div>

      <!-- 입력 영역 (최하단) -->
      <div class="input-section" id="chat-section-wrap" style="display:none;">
        <div class="input-wrapper">
          <input type="text" id="chat-input" placeholder="실시간 채팅에 참여하세요..." autocomplete="off">
          <button id="btn-send">전송</button>
        </div>
      </div>`;

if(contentHtml.includes('id="chat-input"')) {
  contentHtml = contentHtml.replace(targetInputSection, newInputSection);
  contentHtml = contentHtml.replace(/live\.js\?v=\d+/, 'live.js?v=' + Date.now());
  fs.writeFileSync(fileHtml, contentHtml);
}

