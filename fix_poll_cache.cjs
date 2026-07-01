const fs = require('fs');

// 1. Update live.js fetch
let liveJsContent = fs.readFileSync('live/live.js', 'utf8');

// Replace pollConfig fetch
const targetPoll = `const res = await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브관제')}&t=\${Date.now()}\`);`;
const replacePoll = `const res = await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브관제')}&t=\${Date.now()}\`, { cache: 'no-store' });`;
liveJsContent = liveJsContent.replace(targetPoll, replacePoll);

// Replace pollChat fetch
const targetChat = `const chatRes = await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브채팅')}&t=\${Date.now()}\`);`;
const replaceChat = `const chatRes = await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브채팅')}&t=\${Date.now()}\`, { cache: 'no-store' });`;
liveJsContent = liveJsContent.replace(targetChat, replaceChat);

fs.writeFileSync('live/live.js', liveJsContent);

// 2. Update admin_src syncAllToSheetDB to support force sync and fix alert blocking
let adminContent = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

const targetSync = `const syncAllToSheetDB = () => {
    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(() => {`;

const replaceSync = `const syncAllToSheetDB = (force = false) => {
    if (syncTimeout) clearTimeout(syncTimeout);
    const doSync = () => {`;

adminContent = adminContent.replace(targetSync, replaceSync);

const targetSyncEnd = `      }).catch(e => console.warn('SheetDB 연동 실패', e));
    }, 1000); // 1초 디바운스로 여러번 변경 시 1번만 전송
  };`;

const replaceSyncEnd = `      }).catch(e => console.warn('SheetDB 연동 실패', e));
    };
    if (force) doSync();
    else syncTimeout = setTimeout(doSync, 1000); // 1초 디바운스로 여러번 변경 시 1번만 전송
  };`;

adminContent = adminContent.replace(targetSyncEnd, replaceSyncEnd);

// Replace sync calls for deals
adminContent = adminContent.replace(/syncAllToSheetDB\(\);/g, 'syncAllToSheetDB();'); // Just to be safe, find the specific deal one:

const targetDealSync = `bindProductEvents();
            syncAllToSheetDB();
            alert(\`\${min}분 깜짝딜이 시작되었습니다.\`);`;

const replaceDealSync = `bindProductEvents();
            syncAllToSheetDB(true);
            setTimeout(() => alert(\`\${min}분 깜짝딜이 시작되었습니다.\`), 10);`;

adminContent = adminContent.replace(targetDealSync, replaceDealSync);

const targetDealCancel = `bindProductEvents();
          syncAllToSheetDB();
        });`;

const replaceDealCancel = `bindProductEvents();
          syncAllToSheetDB(true);
        });`;

adminContent = adminContent.replace(targetDealCancel, replaceDealCancel);

fs.writeFileSync('admin_src/src/pages/live_stream.js', adminContent);

