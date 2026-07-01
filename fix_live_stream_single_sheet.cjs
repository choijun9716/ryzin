const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/live_stream.js';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `  const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';

  const syncToSheetDB = (sheetName, data) => {
    // 백그라운드 시트DB 연동
    fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent(sheetName)}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [data] })
    }).catch(e => console.warn('SheetDB 연동 실패 (시트가 없을 수 있습니다)', e));
  };

  const saveConfig = () => {
    localStorage.setItem('ryzin_live_config', JSON.stringify(config));
    window.dispatchEvent(new Event('storage')); 
    syncToSheetDB('라이브설정', { '업데이트시간': new Date().toISOString(), '제목': config.title, 'URL': config.streamUrl });
  };
  const saveStats = () => {
    localStorage.setItem('ryzin_live_stats', JSON.stringify(stats));
    syncToSheetDB('라이브통계', { '업데이트시간': new Date().toISOString(), '시청자수': stats.viewers, '하트수': stats.hearts });
  };
  const saveProducts = () => {
    localStorage.setItem('ryzin_live_products', JSON.stringify(products));
    // 상품 변경 시 전체 리스트를 전송하려면 복잡하므로 로그 형태로 남김
    if (products.length > 0) {
      syncToSheetDB('라이브상품', { '업데이트시간': new Date().toISOString(), '상품수': products.length, '첫상품명': products[0].name });
    }
  };`;

const newStr = `  const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';

  let syncTimeout = null;
  const syncAllToSheetDB = () => {
    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(() => {
      const data = {
        '업데이트시간': new Date().toISOString(),
        '제목': config.title,
        'URL': config.streamUrl,
        '시청자수': stats.viewers,
        '하트수': stats.hearts,
        '상품수': products.length,
        '첫상품명': products.length > 0 ? products[0].name : ''
      };
      fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브관제')}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [data] })
      }).catch(e => console.warn('SheetDB 연동 실패', e));
    }, 1000); // 1초 디바운스로 여러번 변경 시 1번만 전송
  };

  const saveConfig = () => {
    localStorage.setItem('ryzin_live_config', JSON.stringify(config));
    window.dispatchEvent(new Event('storage')); 
    syncAllToSheetDB();
  };
  const saveStats = () => {
    localStorage.setItem('ryzin_live_stats', JSON.stringify(stats));
    syncAllToSheetDB();
  };
  const saveProducts = () => {
    localStorage.setItem('ryzin_live_products', JSON.stringify(products));
    syncAllToSheetDB();
  };`;

if(content.includes('syncToSheetDB(')) {
  content = content.replace(targetStr, newStr);
  fs.writeFileSync(file, content);
}
