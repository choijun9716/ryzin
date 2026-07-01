const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `  // === localStorage 연동 로직 (어드민 제어) ===
  function loadLiveConfig() {
    try {
      const c = JSON.parse(localStorage.getItem('ryzin_live_config'));
      if(c) {
        if(c.streamUrl && window.__lastStreamUrl !== c.streamUrl) {`;

const newStr = `  // === SheetDB 및 localStorage 연동 로직 (어드민 제어) ===
  const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';
  
  async function pollSheetDB() {
    try {
      const res = await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브관제')}\`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const latest = data[data.length - 1]; // 가장 마지막 업데이트 내역
          
          // 파싱 후 로컬스토리지 최신화 (다른 탭 호환 및 구조 유지)
          const config = {
            brandName: latest['제목'] || 'Ryzin Corp',
            title: latest['부제목'] || '단독 특가 라이브 방송 중!',
            logoUrl: latest['프로필이미지'] || 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
            streamUrl: latest['URL'] || '',
            showViewers: true // SheetDB에 없으므로 기본 true, 필요 시 추후 연동
          };
          
          const stats = {
            viewers: parseInt(latest['시청자수']) || 0,
            hearts: parseInt(latest['하트수']) || 0
          };
          
          localStorage.setItem('ryzin_live_config', JSON.stringify(config));
          localStorage.setItem('ryzin_live_stats', JSON.stringify(stats));
          
          loadLiveConfig();
          loadLiveStats();
        }
      }
    } catch (e) {
      console.warn("SheetDB polling failed:", e);
    }
  }

  // 3초마다 어드민(SheetDB) 변경사항 폴링
  setInterval(pollSheetDB, 3000);
  // 초기 1회 즉시 실행
  setTimeout(pollSheetDB, 500);

  function loadLiveConfig() {
    try {
      const c = JSON.parse(localStorage.getItem('ryzin_live_config'));
      if(c) {
        if(c.streamUrl && window.__lastStreamUrl !== c.streamUrl) {`;

if (content.includes('function loadLiveConfig() {')) {
  content = content.replace(targetStr, newStr);
  fs.writeFileSync(file, content);
}
