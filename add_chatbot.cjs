const fs = require('fs');

let content = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

// 1. Add botCard HTML
const appendTarget = `  rightPanel.appendChild(previewCard);
  rightPanel.appendChild(chatCard);`;

const botCardHTML = `
  // --- NEW CHAT BOT CARD ---
  const botCard = document.createElement('div');
  botCard.className = 'card';
  botCard.style.padding = '24px';
  botCard.style.borderRadius = '12px';
  botCard.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  botCard.style.border = 'none';
  botCard.style.marginTop = '24px';
  botCard.innerHTML = \`
    <h3 style="margin-top:0; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:16px; font-size:18px; font-weight:700; color:#111;">🤖 채팅 봇 (더미 채팅)</h3>
    <p style="font-size:13px; color:#666; margin-bottom:16px; line-height:1.5;">
      시청자에게 보여질 더미 채팅 리스트입니다. <br>
      <b>닉네임|채팅내용</b> 형식으로 한 줄씩 입력해주세요.
    </p>
    <textarea id="bot-chat-list" class="modern-input" style="width:100%; height:120px; font-family:monospace; margin-bottom:16px; resize:vertical; padding:12px; font-size:13px;" placeholder="구매자1|와 진짜 싸네요!\\n라이브맘|방금 주문했습니다ㅎㅎ"></textarea>
    
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">
      <div style="display:flex; align-items:center; gap:8px;">
        <label class="modern-label" style="margin-bottom:0;">전송 주기 (초)</label>
        <input type="number" id="bot-interval" class="modern-input" style="width:80px; text-align:center;" value="5" min="1">
      </div>
    </div>
    
    <button id="btn-toggle-bot" class="btn" style="width:100%; background:#3b82f6; border-radius:8px; padding:12px; font-size:15px; font-weight:600; box-shadow:0 2px 4px rgba(59,130,246,0.3); color:white; border:none; cursor:pointer;">채팅 봇 시작</button>
  \`;

  rightPanel.appendChild(previewCard);
  rightPanel.appendChild(chatCard);
  rightPanel.appendChild(botCard);`;

content = content.replace(appendTarget, botCardHTML);

// 2. Add bot logic inside setTimeout
const eventTarget = `// 실시간 채팅 수신 리스너`;

const botLogic = `// --- 채팅 봇 로직 ---
    const botListEl = document.getElementById('bot-chat-list');
    const botIntervalEl = document.getElementById('bot-interval');
    const btnToggleBot = document.getElementById('btn-toggle-bot');
    
    // 로컬 스토리지 불러오기
    let botConfig = { list: "", interval: 5 };
    try {
      const stored = localStorage.getItem('ryzin_chatbot_config');
      if (stored) {
        botConfig = JSON.parse(stored);
        botListEl.value = botConfig.list;
        botIntervalEl.value = botConfig.interval;
      }
    } catch(e){}

    const saveBotConfig = () => {
      botConfig.list = botListEl.value;
      botConfig.interval = parseInt(botIntervalEl.value) || 5;
      localStorage.setItem('ryzin_chatbot_config', JSON.stringify(botConfig));
    };

    botListEl.addEventListener('input', saveBotConfig);
    botIntervalEl.addEventListener('input', saveBotConfig);

    let botIntervalId = null;
    let botActive = false;

    btnToggleBot.addEventListener('click', () => {
      botActive = !botActive;
      if (botActive) {
        const lines = botListEl.value.split('\\n').map(l => l.trim()).filter(l => l && l.includes('|'));
        if (lines.length === 0) {
          alert("형식에 맞는 채팅 리스트(닉네임|내용)를 1줄 이상 입력해주세요.");
          botActive = false;
          return;
        }
        btnToggleBot.textContent = '채팅 봇 중지 (실행 중...)';
        btnToggleBot.style.background = '#ef4444';
        btnToggleBot.style.boxShadow = '0 2px 4px rgba(239,68,68,0.3)';
        
        const sec = parseInt(botIntervalEl.value) || 5;
        botIntervalId = setInterval(async () => {
          const randLine = lines[Math.floor(Math.random() * lines.length)];
          const [name, ...msgParts] = randLine.split('|');
          const text = msgParts.join('|');
          
          if (!name || !text) return;

          const newChat = { id: Date.now(), name: name.trim(), text: text.trim(), isAdmin: false };
          
          // 낙관적 렌더링
          const chatList = document.getElementById('admin-chat-list');
          const div = document.createElement('div');
          div.style.marginBottom = '8px';
          div.innerHTML = \`<span style="font-weight:bold; color:#666; margin-right:4px;">\${newChat.name}:</span> \${newChat.text}\`;
          chatList.appendChild(div);
          chatList.scrollTop = chatList.scrollHeight;

          // 실제 전송
          try {
            await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브채팅')}\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ data: [{ '시간': newChat.id.toString(), '닉네임': newChat.name, '내용': newChat.text }] })
            });
          } catch(e) { console.warn('Bot chat sync failed', e); }

        }, sec * 1000);
      } else {
        btnToggleBot.textContent = '채팅 봇 시작';
        btnToggleBot.style.background = '#3b82f6';
        btnToggleBot.style.boxShadow = '0 2px 4px rgba(59,130,246,0.3)';
        if (botIntervalId) clearInterval(botIntervalId);
      }
    });

    // 실시간 채팅 수신 리스너`;

content = content.replace(eventTarget, botLogic);

fs.writeFileSync('admin_src/src/pages/live_stream.js', content);

