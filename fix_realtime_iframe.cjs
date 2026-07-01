const fs = require('fs');

// 1. live_stream.js 업데이트
let fileAdmin = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/live_stream.js';
let contentAdmin = fs.readFileSync(fileAdmin, 'utf8');

const targetSaveConfig = `  const saveConfig = () => {
    localStorage.setItem('ryzin_live_config', JSON.stringify(config));
    window.dispatchEvent(new Event('storage')); 
    syncAllToSheetDB();
  };`;

const newSaveConfig = `  const syncToIframe = () => {
    const iframe = document.getElementById('live-preview-iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'sync_preview', config, stats, products }, '*');
    }
  };

  const saveConfig = () => {
    localStorage.setItem('ryzin_live_config', JSON.stringify(config));
    window.dispatchEvent(new Event('storage')); 
    syncToIframe();
    syncAllToSheetDB();
  };`;

contentAdmin = contentAdmin.replace(targetSaveConfig, newSaveConfig);

const targetSaveStats = `  const saveStats = () => {
    localStorage.setItem('ryzin_live_stats', JSON.stringify(stats));
    syncAllToSheetDB();
  };`;
const newSaveStats = `  const saveStats = () => {
    localStorage.setItem('ryzin_live_stats', JSON.stringify(stats));
    syncToIframe();
    syncAllToSheetDB();
  };`;
contentAdmin = contentAdmin.replace(targetSaveStats, newSaveStats);

const targetSaveProducts = `  const saveProducts = () => {
    localStorage.setItem('ryzin_live_products', JSON.stringify(products));
    syncAllToSheetDB();
  };`;
const newSaveProducts = `  const saveProducts = () => {
    localStorage.setItem('ryzin_live_products', JSON.stringify(products));
    syncToIframe();
    syncAllToSheetDB();
  };`;
contentAdmin = contentAdmin.replace(targetSaveProducts, newSaveProducts);

fs.writeFileSync(fileAdmin, contentAdmin);

// 2. live.js 업데이트
let fileLive = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let contentLive = fs.readFileSync(fileLive, 'utf8');

const targetStorage = `  window.addEventListener('storage', (e) => {
    if(e.key === 'ryzin_live_config') loadLiveConfig();`;

const newStorage = `  // 어드민 iframe에서 postMessage로 실시간 데이터 쏘는 것 수신
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'sync_preview') {
      if (e.data.config) localStorage.setItem('ryzin_live_config', JSON.stringify(e.data.config));
      if (e.data.stats) localStorage.setItem('ryzin_live_stats', JSON.stringify(e.data.stats));
      if (e.data.products) localStorage.setItem('ryzin_live_products', JSON.stringify(e.data.products));
      loadLiveConfig();
      loadLiveStats();
      loadLiveProducts();
    }
  });

  window.addEventListener('storage', (e) => {
    if(e.key === 'ryzin_live_config') loadLiveConfig();`;

if (contentLive.includes("window.addEventListener('storage'")) {
  contentLive = contentLive.replace(targetStorage, newStorage);
  fs.writeFileSync(fileLive, contentLive);
}

