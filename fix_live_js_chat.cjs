const fs = require('fs');

let fileLive = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let contentLive = fs.readFileSync(fileLive, 'utf8');

const targetChatInit = `  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send');`;

const newChatInit = `  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send');
  const nicknameSection = document.getElementById('nickname-section');
  const chatSectionWrap = document.getElementById('chat-section-wrap');
  const nicknameInput = document.getElementById('nickname-input');
  const btnSetNickname = document.getElementById('btn-set-nickname');

  let userNickname = localStorage.getItem('ryzin_nickname') || '';
  if (userNickname) {
    chatSectionWrap.style.display = 'block';
  } else {
    nicknameSection.style.display = 'block';
  }

  btnSetNickname.addEventListener('click', () => {
    const n = nicknameInput.value.trim();
    if (n) {
      userNickname = n;
      localStorage.setItem('ryzin_nickname', n);
      nicknameSection.style.display = 'none';
      chatSectionWrap.style.display = 'block';
      chatInput.focus();
    }
  });

  nicknameInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') btnSetNickname.click();
  });
`;

contentLive = contentLive.replace(targetChatInit, newChatInit);

const targetAddMessage = `  const addMessage = (name, text) => {
    const el = document.createElement('div');
    el.className = 'chat-msg';
    el.innerHTML = \`<span class="chat-name">\${name}</span><span class="chat-text">\${text}</span>\`;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };`;

const newAddMessage = `  const addMessage = (name, text, isAdmin = false) => {
    const el = document.createElement('div');
    if (isAdmin) {
      el.className = 'chat-msg admin-notice';
      el.innerHTML = \`<span class="chat-name" style="color:#ffcc00;">[공지] \${name}</span><span class="chat-text" style="font-weight:bold;">\${text}</span>\`;
    } else {
      el.className = 'chat-msg';
      el.innerHTML = \`<span class="chat-name">\${name}</span><span class="chat-text">\${text}</span>\`;
    }
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };`;

contentLive = contentLive.replace(targetAddMessage, newAddMessage);

const targetSendMessage = `  const sendMessage = () => {
    const text = chatInput.value.trim();
    if(text) {
      addMessage('시청자', text);
      chatInput.value = '';
      
      // 더미 챗봇 응답
      if(botEnabled) {
        setTimeout(() => {
          if(text.includes('안녕')) addMessage('관리자', '안녕하세요! 특가 이벤트 진행 중입니다.');
          else if(text.includes('얼마')) addMessage('관리자', '하단의 상품 리스트를 클릭하시면 가격 확인이 가능합니다!');
        }, 1000);
      }
    }
  };`;

const newSendMessage = `  let isChatSending = false;
  const sendMessage = async () => {
    const text = chatInput.value.trim();
    if(text && userNickname && !isChatSending) {
      isChatSending = true;
      // 로컬에 먼저 보여주기
      addMessage(userNickname, text);
      chatInput.value = '';
      
      // 더미 챗봇 응답 (원할경우 유지)
      if(botEnabled) {
        setTimeout(() => {
          if(text.includes('안녕')) addMessage('관리자', '안녕하세요! 특가 이벤트 진행 중입니다.', true);
          else if(text.includes('얼마')) addMessage('관리자', '하단의 상품 리스트를 클릭하시면 가격 확인이 가능합니다!', true);
        }, 1000);
      }

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
  };`;

contentLive = contentLive.replace(targetSendMessage, newSendMessage);


const targetPollChat = `          loadLiveStats();
        }
      }
    } catch (e) {
      console.warn("SheetDB polling failed:", e);
    }`;

const newPollChat = `          loadLiveStats();
        }
      }

      // 채팅 조회
      const chatRes = await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브채팅')}&t=\${Date.now()}\`);
      if (chatRes.ok) {
        const chats = await chatRes.json();
        if (chats && Array.isArray(chats)) {
          chats.forEach(c => {
             if (c['시간'] && parseInt(c['시간']) > lastChatTime) {
                // 자신이 보낸 건 이미 로컬에 표시되었으므로 닉네임과 내용이 같으면 패스 (완벽하진 않지만 데모용)
                if (c['닉네임'] !== userNickname || c['시간'] > lastChatTime + 5000) {
                   addMessage(c['닉네임'], c['내용'], c['닉네임'] === '관리자');
                }
                lastChatTime = parseInt(c['시간']);
             }
          });
        }
      }
    } catch (e) {
      console.warn("SheetDB polling failed:", e);
    }`;

contentLive = contentLive.replace(targetPollChat, newPollChat);

const targetGlobalVars = `  async function pollSheetDB() {`;
const newGlobalVars = `  let lastChatTime = Date.now() - 3000; // 최근 3초 전 메시지부터만 수신
  async function pollSheetDB() {`;
contentLive = contentLive.replace(targetGlobalVars, newGlobalVars);


fs.writeFileSync(fileLive, contentLive);
