const fs = require('fs');

let fileAdmin = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/live_stream.js';
let contentAdmin = fs.readFileSync(fileAdmin, 'utf8');

const targetAdminSendChat = `    // 관리자 채팅 전송
    const chatInput = document.getElementById('admin-chat-input');
    const sendChat = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      
      const newChat = { id: Date.now(), name: '관리자', text: text, isAdmin: true };
      
      // trigger event via localStorage
      localStorage.setItem('ryzin_admin_chat_trigger', JSON.stringify(newChat));
      
      // Update local view
      const chatList = document.getElementById('admin-chat-list');
      const div = document.createElement('div');
      div.style.marginBottom = '8px';
      div.innerHTML = \`<span style="font-weight:bold; color:var(--primary); margin-right:4px;">\${newChat.name}:</span> \${newChat.text}\`;
      chatList.appendChild(div);
      chatList.scrollTop = chatList.scrollHeight;
      
      chatInput.value = '';
    };`;

const newAdminSendChat = `    // 관리자 채팅 전송
    const chatInput = document.getElementById('admin-chat-input');
    let isSending = false;
    const sendChat = async () => {
      const text = chatInput.value.trim();
      if (!text || isSending) return;
      
      isSending = true;
      const newChat = { id: Date.now(), name: '관리자', text: text, isAdmin: true };
      
      // Update local view (optimistic)
      const chatList = document.getElementById('admin-chat-list');
      const div = document.createElement('div');
      div.style.marginBottom = '8px';
      div.innerHTML = \`<span style="font-weight:bold; color:var(--primary); margin-right:4px;">\${newChat.name}:</span> \${newChat.text}\`;
      chatList.appendChild(div);
      chatList.scrollTop = chatList.scrollHeight;
      
      chatInput.value = '';
      
      // SheetDB로 POST
      try {
        await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브채팅')}\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [{ '시간': newChat.id.toString(), '닉네임': '관리자', '내용': text }] })
        });
      } catch(e) { console.warn('Admin chat sync failed', e); }
      finally { isSending = false; }
    };`;

contentAdmin = contentAdmin.replace(targetAdminSendChat, newAdminSendChat);

const targetAdminReceiveChat = `    // 실시간 채팅 수신 리스너 (iframe이나 다른 탭에서 유저가 채팅을 치면 localStorage에 저장한다고 가정)
    window.addEventListener('storage', (e) => {
      if (e.key === 'ryzin_user_chat_trigger') {
        const msg = JSON.parse(e.newValue);
        if (msg) {
          const chatList = document.getElementById('admin-chat-list');
          const div = document.createElement('div');
          div.style.marginBottom = '8px';
          div.innerHTML = \`<span style="font-weight:bold; color:#666; margin-right:4px;">\${msg.name}:</span> \${msg.text}\`;
          chatList.appendChild(div);
          chatList.scrollTop = chatList.scrollHeight;
        }
      }
    });`;

const newAdminReceiveChat = `    // 어드민 채팅 폴링 (유저들이 보낸 채팅 수신)
    let lastAdminChatTime = Date.now() - 5000;
    setInterval(async () => {
      try {
        const res = await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브채팅')}&t=\${Date.now()}\`);
        if(res.ok) {
          const chats = await res.json();
          if(chats && Array.isArray(chats)) {
            const chatList = document.getElementById('admin-chat-list');
            chats.forEach(c => {
               if(c['시간'] && parseInt(c['시간']) > lastAdminChatTime) {
                 if(c['닉네임'] !== '관리자') {
                   const div = document.createElement('div');
                   div.style.marginBottom = '8px';
                   div.innerHTML = \`<span style="font-weight:bold; color:#666; margin-right:4px;">\${c['닉네임']}:</span> \${c['내용']}\`;
                   chatList.appendChild(div);
                   chatList.scrollTop = chatList.scrollHeight;
                 }
                 lastAdminChatTime = parseInt(c['시간']);
               }
            });
          }
        }
      } catch(e) {}
    }, 3000);`;

contentAdmin = contentAdmin.replace(targetAdminReceiveChat, newAdminReceiveChat);

fs.writeFileSync(fileAdmin, contentAdmin);

