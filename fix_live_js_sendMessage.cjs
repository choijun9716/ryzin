const fs = require('fs');

let fileLive = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let contentLive = fs.readFileSync(fileLive, 'utf8');

const targetFunction = `  // 사용자 메시지 전송
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage('나(사용자)', text, true);
    chatInput.value = '';
    
    // 어드민에 알림 (로컬스토리지 트리거)
    localStorage.setItem('ryzin_user_chat_trigger', JSON.stringify({ name: '고객', text: text }));
    
    // 챗봇 자동 응답 (재미 요소)
    setTimeout(() => {
      if(text.includes('안녕')) addMessage('관리자', '안녕하세요! 환영합니다 ❤️');
      else if(text.includes('얼마')) addMessage('관리자', '하단의 상품 리스트를 클릭하시면 가격 확인이 가능합니다!');
    }, 1000);
  }`;

const newFunction = `  // 사용자 메시지 전송
  let isChatSending = false;
  async function sendMessage() {
    const text = chatInput.value.trim();
    if(text && userNickname && !isChatSending) {
      isChatSending = true;
      // 로컬에 먼저 보여주기
      addMessage(userNickname, text);
      chatInput.value = '';
      
      // 더미 챗봇 자동 응답
      setTimeout(() => {
        if(text.includes('안녕')) addMessage('관리자', '안녕하세요! 환영합니다 ❤️', true);
        else if(text.includes('얼마')) addMessage('관리자', '하단의 상품 리스트를 클릭하시면 가격 확인이 가능합니다!', true);
      }, 1000);

      // 시트 DB '라이브채팅' 전송
      try {
        await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브채팅')}\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [{ '시간': new Date().getTime().toString(), '닉네임': userNickname, '내용': text }] })
        });
      } catch(e) { console.warn(e); }
      finally { isChatSending = false; }
    }
  }`;

if(contentLive.includes('function sendMessage() {')) {
  contentLive = contentLive.replace(targetFunction, newFunction);
} else {
  console.log("NOT FOUND");
}

fs.writeFileSync(fileLive, contentLive);

// HTML 버전 업 (캐시 버스팅)
let fileHtml = '/Users/chaeijun/Downloads/ryzin-main 2/live/index.html';
let contentHtml = fs.readFileSync(fileHtml, 'utf8');
contentHtml = contentHtml.replace(/live\.js\?v=\d+/, 'live.js?v=' + Date.now());
fs.writeFileSync(fileHtml, contentHtml);

