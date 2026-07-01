const fs = require('fs');

let fileLive = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let contentLive = fs.readFileSync(fileLive, 'utf8');

// 1. Add global array
const targetGlobal = `  let lastChatTime = Date.now() - 3000; // 최근 3초 전 메시지부터만 수신
  async function pollSheetDB() {`;
const newGlobal = `  let lastChatTime = Date.now() - 3000; // 최근 3초 전 메시지부터만 수신
  const mySentTexts = []; // 내가 방금 보낸 채팅 텍스트 보관용
  async function pollSheetDB() {`;
if (contentLive.includes(targetGlobal)) {
  contentLive = contentLive.replace(targetGlobal, newGlobal);
}

// 2. Add to array when sending
const targetSend = `      // 로컬에 먼저 보여주기
      addMessage(userNickname, text);
      chatInput.value = '';`;
const newSend = `      // 로컬에 먼저 보여주기
      addMessage(userNickname, text);
      mySentTexts.push(text);
      chatInput.value = '';`;
if (contentLive.includes(targetSend)) {
  contentLive = contentLive.replace(targetSend, newSend);
}

// 3. Prevent duplicate when polling
const targetPoll = `                // 자신이 보낸 건 이미 로컬에 표시되었으므로 닉네임과 내용이 같으면 패스 (완벽하진 않지만 데모용)
                if (c['닉네임'] !== userNickname || c['시간'] > lastChatTime + 5000) {
                   addMessage(c['닉네임'], c['내용'], c['닉네임'] === '관리자');
                }`;
const newPoll = `                // 자신이 보낸 건 이미 로컬에 표시되었으므로 닉네임과 내용이 같으면 패스
                if (c['닉네임'] === userNickname) {
                  const idx = mySentTexts.indexOf(c['내용']);
                  if (idx !== -1) {
                    // 방금 로컬에서 띄운 내 메시지면 스킵하고 배열에서 지움
                    mySentTexts.splice(idx, 1);
                  } else {
                    addMessage(c['닉네임'], c['내용'], c['닉네임'] === '관리자');
                  }
                } else {
                   addMessage(c['닉네임'], c['내용'], c['닉네임'] === '관리자');
                }`;
if (contentLive.includes(targetPoll)) {
  contentLive = contentLive.replace(targetPoll, newPoll);
}

fs.writeFileSync(fileLive, contentLive);

