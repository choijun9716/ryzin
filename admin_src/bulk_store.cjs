const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let content = fs.readFileSync(file, 'utf8');

const targetMethod = `  create(collection, item) {`;
const bulkMethods = `
  createBulk(collection, items) {
    if (!this._data[collection]) return false;
    this._data[collection].push(...items);
    this._save();
    this._emit(collection + ':changed');
    
    // 비동기로 시트디비 연동
    if (!this.isDemoMode) {
      this._syncBulkToSheetDB(collection, items).catch(e => console.error('SheetDB 대량 연동 실패:', e));
    }
    return true;
  }

  async _syncBulkToSheetDB(collection, items) {
    if (!this._sheetDBReady || items.length === 0) return;
    try {
      let sheetName = '';
      let payloadData = [];
      
      if (collection === 'crmClients') {
        sheetName = 'CRM고객';
        payloadData = items.map(data => ({
          '아이디': data.id || '',
          '회사명': data.companyName || '',
          '담당자명': data.contactName || '',
          '연락처': data.phone || '',
          '이메일': data.email || '',
          '상태': data.status || '',
          '고객분류': data.category || '',
          '관심서비스': data.interestedService || '',
          '유입경로': data.source || '',
          '메모': data.memo || '',
          '마지막연락일': data.lastContactDate || '',
          '생성일': data.createdAt || ''
        }));
      }

      if (!sheetName) return;

      const encSheet = encodeURIComponent(sheetName);
      const url = \`\${SHEETDB_URL}?sheet=\${encSheet}\`;
      
      const payload = { data: payloadData };
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        throw new Error('SheetDB Bulk Error');
      }
    } catch (e) {
      console.error('대량 저장 오류:', e);
    }
  }

  create(collection, item) {`;

content = content.replace(targetMethod, bulkMethods);
fs.writeFileSync(file, content);
