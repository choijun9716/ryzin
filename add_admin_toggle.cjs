const fs = require('fs');
let content = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

// 1. Add "방송상태" to sync payload
content = content.replace(`        '시작일시': config.liveStartTime || ''
      };`, `        '시작일시': config.liveStartTime || '',
        '방송상태': config.isLive ? 'ON' : 'OFF'
      };`);

// 2. Add toggle UI button
const targetUI = `    <div style="margin-top:16px; margin-bottom:24px;">
      <button id="btn-save-config" class="btn btn-primary" style="width:100%; padding:10px; font-weight:bold;">라이브 설정 일괄 적용 (저장)</button>
    </div>`;

const newUI = `    <div style="margin-top:16px; margin-bottom:12px;">
      <button id="btn-toggle-live" class="btn" style="width:100%; padding:14px; font-weight:bold; color:white; background:\${config.isLive ? '#6b7280' : '#10b981'}; border:none; font-size:16px;">
        \${config.isLive ? '라이브 종료하기' : '라이브 시작하기'}
      </button>
    </div>
    <div style="margin-bottom:24px;">
      <button id="btn-save-config" class="btn btn-primary" style="width:100%; padding:10px; font-weight:bold;">라이브 설정 일괄 적용 (저장)</button>
    </div>`;
content = content.replace(targetUI, newUI);

// 3. Add event listener for the toggle button
const targetEvent = `    document.getElementById('btn-save-config').addEventListener('click', () => {`;
const newEvent = `    document.getElementById('btn-toggle-live').addEventListener('click', (e) => {
      config.isLive = !config.isLive;
      e.target.textContent = config.isLive ? '라이브 종료하기' : '라이브 시작하기';
      e.target.style.background = config.isLive ? '#6b7280' : '#10b981';
      saveConfig();
      // 방송 상태는 즉시 DB 반영
      alert(config.isLive ? '라이브가 시작되었습니다! 모바일 시청자들에게 영상이 송출됩니다.' : '라이브가 종료되었습니다. 시청자들에게 썸네일이 노출됩니다.');
    });

    document.getElementById('btn-save-config').addEventListener('click', () => {`;
content = content.replace(targetEvent, newEvent);

fs.writeFileSync('admin_src/src/pages/live_stream.js', content);
