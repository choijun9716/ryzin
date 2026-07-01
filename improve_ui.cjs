const fs = require('fs');

let content = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

const oldChatCardStart = `  const chatCard = document.createElement('div');
  chatCard.className = 'card';
  chatCard.style.flex = '1';
  chatCard.style.display = 'flex';
  chatCard.style.flexDirection = 'column';
  chatCard.innerHTML = \`
    <h3 style="margin-top:0; margin-bottom:12px; font-size:16px; font-weight:600; color:#333;">관리자 채팅 발송</h3>
    <div id="admin-chat-list" style="flex:1; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:12px; overflow-y:auto; margin-bottom:12px; min-height:150px; font-size:13px;">
      <div style="color:#666; text-align:center; padding-top:40px;">실시간 채팅 내역이 여기에 표시됩니다.</div>
    </div>
    <div style="display:flex; gap:8px;">
      <input type="text" id="admin-chat-input" class="form-control" placeholder="관리자 공지 전송...">
      <button id="btn-send-chat" class="btn btn-primary">전송</button>
    </div>
  \`;`;

const newChatCard = `  const chatCard = document.createElement('div');
  chatCard.className = 'card';
  chatCard.style.flex = '1';
  chatCard.style.display = 'flex';
  chatCard.style.flexDirection = 'column';
  chatCard.style.padding = '24px';
  chatCard.style.borderRadius = '16px';
  chatCard.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
  chatCard.style.border = '1px solid #f3f4f6';
  chatCard.style.background = '#fff';
  chatCard.innerHTML = \`
    <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px;">
      <span style="font-size:20px;">💬</span>
      <h3 style="margin:0; font-size:18px; font-weight:700; color:#111;">관리자 채팅 발송</h3>
    </div>
    <div id="admin-chat-list" style="flex:1; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; overflow-y:auto; margin-bottom:16px; min-height:180px; font-size:14px; box-shadow:inset 0 2px 4px rgba(0,0,0,0.02);">
      <div style="color:#94a3b8; text-align:center; padding-top:60px; font-weight:500;">
        <span style="display:block; font-size:24px; margin-bottom:8px;">💭</span>
        실시간 채팅 내역이 여기에 표시됩니다.
      </div>
    </div>
    <div style="display:flex; gap:12px;">
      <input type="text" id="admin-chat-input" class="modern-input" placeholder="시청자들에게 보낼 관리자 공지를 입력하세요..." style="flex:1; border-radius:10px; padding:12px 16px;">
      <button id="btn-send-chat" class="btn btn-primary" style="border-radius:10px; padding:0 24px; font-weight:600; box-shadow:0 4px 6px rgba(59,130,246,0.25); transition:all 0.2s;">전송</button>
    </div>
  \`;`;

content = content.replace(oldChatCardStart, newChatCard);

const oldBotCardStart = `  // --- NEW CHAT BOT CARD ---
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
  \`;`;

const newBotCard = `  // --- NEW CHAT BOT CARD ---
  const botCard = document.createElement('div');
  botCard.className = 'card';
  botCard.style.padding = '24px';
  botCard.style.borderRadius = '16px';
  botCard.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
  botCard.style.border = '1px solid #f3f4f6';
  botCard.style.background = '#fff';
  botCard.style.marginTop = '24px';
  botCard.innerHTML = \`
    <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
      <span style="font-size:20px;">🤖</span>
      <h3 style="margin:0; font-size:18px; font-weight:700; color:#111;">채팅 봇 (더미 채팅)</h3>
    </div>
    <p style="font-size:13px; color:#64748b; margin-bottom:20px; line-height:1.6;">
      시청자에게 자연스럽게 보여질 가상의 채팅 리스트입니다.<br>
      <b style="color:#0f172a; background:#f1f5f9; padding:2px 6px; border-radius:4px;">닉네임 | 채팅내용</b> 형식으로 한 줄씩 자유롭게 입력해주세요.
    </p>
    <textarea id="bot-chat-list" class="modern-input" style="width:100%; height:140px; font-family:'Menlo', monospace; margin-bottom:20px; resize:vertical; padding:16px; font-size:14px; border-radius:12px; background:#f8fafc; border:1px solid #e2e8f0; line-height:1.6;" placeholder="구매자1 | 와 진짜 너무 싸네요!\\n라이브맘 | 방금 두 개 주문 완료했습니다ㅎㅎ\\n뷰티러버 | 이거 배송 얼마나 걸리나요?"></textarea>
    
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; background:#f1f5f9; padding:12px 16px; border-radius:10px;">
      <label style="margin-bottom:0; font-size:14px; font-weight:600; color:#334155;">자동 전송 주기</label>
      <div style="display:flex; align-items:center; gap:8px;">
        <input type="number" id="bot-interval" class="modern-input" style="width:80px; text-align:center; border-radius:8px; padding:8px; font-weight:bold; color:#0f172a;" value="5" min="1">
        <span style="font-size:13px; color:#64748b; font-weight:500;">초마다 1개씩</span>
      </div>
    </div>
    
    <button id="btn-toggle-bot" class="btn" style="width:100%; background:linear-gradient(135deg, #3b82f6, #2563eb); border-radius:10px; padding:14px; font-size:16px; font-weight:bold; box-shadow:0 4px 12px rgba(37,99,235,0.3); color:white; border:none; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:8px;">
      <span id="bot-btn-icon" style="font-size:18px;">▶</span> <span id="bot-btn-text">채팅 봇 가동 시작</span>
    </button>
  \`;`;

content = content.replace(oldBotCardStart, newBotCard);

// Fix button toggle text in the event listener
const oldToggleLogic = `        btnToggleBot.textContent = '채팅 봇 중지 (실행 중...)';
        btnToggleBot.style.background = '#ef4444';
        btnToggleBot.style.boxShadow = '0 2px 4px rgba(239,68,68,0.3)';`;

const newToggleLogic = `        document.getElementById('bot-btn-icon').textContent = '⏸';
        document.getElementById('bot-btn-text').textContent = '채팅 봇 가동 중지';
        btnToggleBot.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        btnToggleBot.style.boxShadow = '0 4px 12px rgba(220,38,38,0.3)';`;

content = content.replace(oldToggleLogic, newToggleLogic);

const oldToggleLogic2 = `        btnToggleBot.textContent = '채팅 봇 시작';
        btnToggleBot.style.background = '#3b82f6';
        btnToggleBot.style.boxShadow = '0 2px 4px rgba(59,130,246,0.3)';`;

const newToggleLogic2 = `        document.getElementById('bot-btn-icon').textContent = '▶';
        document.getElementById('bot-btn-text').textContent = '채팅 봇 가동 시작';
        btnToggleBot.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        btnToggleBot.style.boxShadow = '0 4px 12px rgba(37,99,235,0.3)';`;

content = content.replace(oldToggleLogic2, newToggleLogic2);

fs.writeFileSync('admin_src/src/pages/live_stream.js', content);

