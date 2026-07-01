const fs = require('fs');
let content = fs.readFileSync('live/index.html', 'utf8');

// 1. Remove from video-overlay
const overlayStart = `<div class="video-overlay">
        <!-- 깜짝딜 타이머 배너 -->
        <div id="surprise-deal-timer" style="display:none; background:rgba(225,29,72,0.95); color:white; padding:8px 16px; border-radius:24px; font-weight:bold; font-size:14px; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(225,29,72,0.4); animation: pulse 2s infinite;">
          <span style="font-size:16px;">⏰</span>
          <span id="surprise-deal-text">깜짝딜 종료까지 00:00</span>
        </div>
        <div class="live-badge">LIVE</div>`;

const newOverlay = `<div class="video-overlay">
        <div class="live-badge">LIVE</div>`;

content = content.replace(overlayStart, newOverlay);

// 2. Insert below header
const headerEnd = `      </div>

      <!-- 상품 모달 (숨김 상태) -->`;

const newHeaderEnd = `      </div>

      <!-- 깜짝딜 타이머 배너 (제목 아래 가운데 배치) -->
      <div style="display:flex; justify-content:center; width:100%; pointer-events:none; padding-top:4px;">
        <div id="surprise-deal-timer" style="display:none; background:rgba(225,29,72,0.95); color:white; padding:8px 16px; border-radius:24px; font-weight:bold; font-size:14px; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(225,29,72,0.4); animation: pulse 2s infinite; pointer-events:auto;">
          <span style="font-size:16px;">⏰</span>
          <span id="surprise-deal-text">깜짝딜 종료까지 00:00</span>
        </div>
      </div>

      <!-- 상품 모달 (숨김 상태) -->`;

content = content.replace(headerEnd, newHeaderEnd);

fs.writeFileSync('live/index.html', content);
