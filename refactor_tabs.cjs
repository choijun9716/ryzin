const fs = require('fs');

let content = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

// 1. Rewrite configCard HTML
const configStart = `  const configCard = document.createElement('div');
  configCard.className = 'card';
  configCard.style.padding = '24px';
  configCard.style.borderRadius = '12px';
  configCard.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  configCard.style.border = 'none';
  configCard.innerHTML = \`
    <h3 style="margin-top:0; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:24px; font-size:18px; font-weight:700; color:#111;">라이브 기본 설정</h3>
    
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">`;

const newConfigStart = `  const configCard = document.createElement('div');
  configCard.className = 'card';
  configCard.style.padding = '24px';
  configCard.style.borderRadius = '12px';
  configCard.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  configCard.style.border = 'none';
  configCard.innerHTML = \`
    <h3 style="margin-top:0; padding-bottom:0px; margin-bottom:16px; font-size:18px; font-weight:700; color:#111;">라이브 설정</h3>
    
    <div style="display:flex; border-bottom:1px solid #e5e7eb; margin-bottom:24px; gap:24px;">
      <div id="tab-basic" style="padding-bottom:12px; cursor:pointer; font-weight:700; color:#111; border-bottom:2px solid #111;">기본 정보</div>
      <div id="tab-chat" style="padding-bottom:12px; cursor:pointer; font-weight:600; color:#888;">채팅 설정</div>
    </div>
    
    <!-- Tab 1: 기본 정보 -->
    <div id="tab-content-basic">
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">`;

content = content.replace(configStart, newConfigStart);

const configEndTarget = `      <button id="btn-toggle-live" class="btn" style="width:100%; background:\${config.isLive ? '#6b7280' : '#10b981'}; padding:14px; font-size:16px; font-weight:bold; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1); border-radius:8px;">
        \${config.isLive ? '라이브 종료하기' : '라이브 시작하기'}
      </button>
    </div>
  \`;`;

const newConfigEnd = `      <button id="btn-toggle-live" class="btn" style="width:100%; background:\${config.isLive ? '#6b7280' : '#10b981'}; padding:14px; font-size:16px; font-weight:bold; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1); border-radius:8px;">
        \${config.isLive ? '라이브 종료하기' : '라이브 시작하기'}
      </button>
    </div>
    </div> <!-- End of Tab 1 -->

    <!-- Tab 2: 채팅 설정 -->
    <div id="tab-content-chat" style="display:none; flex-direction:column; gap:24px;">
      <!-- 관리자 채팅 -->
      <div>
        <h4 style="margin-top:0; margin-bottom:12px; font-size:15px; color:#111;">💬 관리자 채팅</h4>
        <div id="admin-chat-list" style="height:200px; overflow-y:auto; background:#f9fafb; padding:12px; border-radius:8px; border:1px solid #e5e7eb; margin-bottom:12px; font-size:13px; line-height:1.5;">
          <div style="color:#888; text-align:center; margin-top:80px;">실시간 채팅 내역이 여기에 표시됩니다.</div>
        </div>
        <div style="display:flex; gap:8px;">
          <input type="text" id="admin-chat-input" class="form-control" placeholder="관리자 공지 전송..." style="flex:1;">
          <button id="btn-send-chat" class="btn btn-primary" style="white-space:nowrap;">전송</button>
        </div>
      </div>

      <hr style="border:0; border-top:1px solid #e5e7eb;">

      <!-- 채팅 봇 -->
      <div>
        <h4 style="margin-top:0; margin-bottom:12px; font-size:15px; color:#111;">🤖 채팅 봇 (더미 채팅)</h4>
        <p style="font-size:13px; color:#666; margin-bottom:12px; line-height:1.5;">
          시청자에게 보여질 더미 채팅 리스트입니다.<br>
          <b>닉네임|채팅내용</b> 형식으로 한 줄씩 입력해주세요.
        </p>
        <textarea id="bot-chat-list" class="modern-input" style="width:100%; height:120px; font-family:monospace; margin-bottom:12px; resize:vertical; padding:12px; font-size:13px;" placeholder="구매자1|와 진짜 싸네요!\\n라이브맘|방금 주문했습니다ㅎㅎ"></textarea>
        
        <div style="display:flex; align-items:center; gap:16px; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <label class="modern-label" style="margin-bottom:0;">전송 주기 (초)</label>
            <input type="number" id="bot-interval" class="modern-input" style="width:80px; text-align:center;" value="5" min="1">
          </div>
        </div>
        
        <button id="btn-toggle-bot" class="btn" style="width:100%; background:#3b82f6; border-radius:8px; padding:12px; font-size:15px; font-weight:600; box-shadow:0 2px 4px rgba(59,130,246,0.3); color:white; border:none; cursor:pointer;">채팅 봇 시작</button>
      </div>
    </div> <!-- End of Tab 2 -->

  \`;`;

content = content.replace(configEndTarget, newConfigEnd);

// 2. Remove old chatCard and botCard
const removeCardsTarget = `  // 3. 우측 패널 (미리보기 및 채팅)
  const rightPanel = document.createElement('div');
  rightPanel.style.flex = '0 0 360px';
  rightPanel.style.display = 'flex';
  rightPanel.style.flexDirection = 'column';
  rightPanel.style.gap = '24px';
  rightPanel.style.height = '100%';
  rightPanel.style.overflowY = 'auto';

  const previewCard = document.createElement('div');
  previewCard.className = 'card';
  previewCard.style.padding = '24px';
  previewCard.style.borderRadius = '12px';
  previewCard.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  previewCard.style.border = 'none';
  previewCard.style.position = 'sticky';
  previewCard.style.top = '0';
  previewCard.innerHTML = \`
    <h3 style="margin-top:0; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:24px; font-size:18px; font-weight:700; color:#111;">방송 미리보기</h3>
    <div style="background:#000; border-radius:8px; overflow:hidden; aspect-ratio:9/16; position:relative; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);">
      <iframe id="live-preview-iframe" src="/live/index.html" style="width:100%; height:100%; border:none; display:block;"></iframe>
      <div style="position:absolute; top:12px; left:12px; background:rgba(0,0,0,0.6); color:white; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold;">PREVIEW</div>
    </div>
  \`;

  const chatCard = document.createElement('div');
  chatCard.className = 'card';
  chatCard.style.padding = '24px';
  chatCard.style.borderRadius = '12px';
  chatCard.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  chatCard.style.border = 'none';
  chatCard.innerHTML = \`
    <h3 style="margin-top:0; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:16px; font-size:18px; font-weight:700; color:#111;">실시간 채팅 관제</h3>
    <div id="admin-chat-list" style="height:300px; overflow-y:auto; background:#f9fafb; padding:16px; border-radius:8px; border:1px solid #e5e7eb; margin-bottom:16px; font-size:14px; line-height:1.5;">
      <div style="color:#888; text-align:center; margin-top:120px;">실시간 채팅 내역이 여기에 표시됩니다.</div>
    </div>
    <div style="display:flex; gap:8px;">
      <input type="text" id="admin-chat-input" class="form-control" placeholder="관리자 공지 전송...">
      <button id="btn-send-chat" class="btn btn-primary">전송</button>
    </div>
  \`;

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

const newRightPanel = `  // 3. 우측 패널 (미리보기)
  const rightPanel = document.createElement('div');
  rightPanel.style.flex = '0 0 360px';
  rightPanel.style.display = 'flex';
  rightPanel.style.flexDirection = 'column';
  rightPanel.style.gap = '24px';
  rightPanel.style.height = '100%';
  rightPanel.style.overflowY = 'auto';

  const previewCard = document.createElement('div');
  previewCard.className = 'card';
  previewCard.style.padding = '24px';
  previewCard.style.borderRadius = '12px';
  previewCard.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  previewCard.style.border = 'none';
  previewCard.style.position = 'sticky';
  previewCard.style.top = '0';
  previewCard.innerHTML = \`
    <h3 style="margin-top:0; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:24px; font-size:18px; font-weight:700; color:#111;">방송 미리보기</h3>
    <div style="background:#000; border-radius:8px; overflow:hidden; aspect-ratio:9/16; position:relative; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);">
      <iframe id="live-preview-iframe" src="/live/index.html" style="width:100%; height:100%; border:none; display:block;"></iframe>
      <div style="position:absolute; top:12px; left:12px; background:rgba(0,0,0,0.6); color:white; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold;">PREVIEW</div>
    </div>
  \`;

  rightPanel.appendChild(previewCard);`;

content = content.replace(removeCardsTarget, newRightPanel);

// 3. Add tab switching logic inside setTimeout
const eventBindStart = `  // 이벤트 바인딩
  setTimeout(() => {`;
const eventBindWithTabs = `  // 이벤트 바인딩
  setTimeout(() => {
    // 탭 전환 로직
    const tabBasic = document.getElementById('tab-basic');
    const tabChat = document.getElementById('tab-chat');
    const contentBasic = document.getElementById('tab-content-basic');
    const contentChat = document.getElementById('tab-content-chat');

    tabBasic.addEventListener('click', () => {
      tabBasic.style.fontWeight = '700';
      tabBasic.style.color = '#111';
      tabBasic.style.borderBottom = '2px solid #111';
      tabChat.style.fontWeight = '600';
      tabChat.style.color = '#888';
      tabChat.style.borderBottom = 'none';
      contentBasic.style.display = 'block';
      contentChat.style.display = 'none';
    });

    tabChat.addEventListener('click', () => {
      tabChat.style.fontWeight = '700';
      tabChat.style.color = '#111';
      tabChat.style.borderBottom = '2px solid #111';
      tabBasic.style.fontWeight = '600';
      tabBasic.style.color = '#888';
      tabBasic.style.borderBottom = 'none';
      contentBasic.style.display = 'none';
      contentChat.style.display = 'flex';
    });
`;

content = content.replace(eventBindStart, eventBindWithTabs);

fs.writeFileSync('admin_src/src/pages/live_stream.js', content);

