const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Add parsing logic for crmClients and crmActivities
const parseLiveRowStr = `validLiveData.forEach(row => {`;
const parseCrmStr = `
    validCrmClientData.forEach(row => {
      if (!row['아이디']) return;
      crmClients.push({
        id: row['아이디'],
        companyName: row['회사명'] || '',
        contactName: row['담당자명'] || '',
        phone: row['연락처'] || '',
        email: row['이메일'] || '',
        status: row['상태'] || '',
        category: row['고객분류'] || '',
        interestedService: row['관심서비스'] || '',
        source: row['유입경로'] || '',
        memo: row['메모'] || '',
        lastContactDate: row['마지막연락일'] || '',
        createdAt: row['생성일'] || ''
      });
    });

    validCrmActData.forEach(row => {
      if (!row['아이디']) return;
      crmActivities.push({
        id: row['아이디'],
        clientId: row['고객아이디'] || '',
        date: row['날짜'] || '',
        type: row['유형'] || '',
        content: row['내용'] || '',
        followUpDate: row['팔로업예정일'] || '',
        createdAt: row['생성일'] || ''
      });
    });

    validLiveData.forEach(row => {`;
content = content.replace(parseLiveRowStr, parseCrmStr);

// 2. Assign parsed data to this._data
const assignStr = `this._data.finances = finances;`;
const newAssignStr = `this._data.finances = finances;
    this._data.crmClients = crmClients;
    this._data.crmActivities = crmActivities;`;
content = content.replace(assignStr, newAssignStr);

// 3. Update _syncWithSheet
const syncSheetNameStr = `else if (collection === 'projects' || collection === 'finances' || collection === 'liveHosts') sheetName = '라이브방송';`;
const newSyncSheetNameStr = `else if (collection === 'projects' || collection === 'finances' || collection === 'liveHosts') sheetName = '라이브방송';
      else if (collection === 'crmClients') sheetName = 'CRM고객';
      else if (collection === 'crmActivities') sheetName = 'CRM활동';`;
content = content.replace(syncSheetNameStr, newSyncSheetNameStr);

// 4. Update payload
const payloadStr = `} else if (collection === 'projects') {`;
const newPayloadStr = `} else if (collection === 'crmClients') {
        payload = {
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
        };
      } else if (collection === 'crmActivities') {
        payload = {
          '아이디': data.id || '',
          '고객아이디': data.clientId || '',
          '날짜': data.date || '',
          '유형': data.type || '',
          '내용': data.content || '',
          '팔로업예정일': data.followUpDate || '',
          '생성일': data.createdAt || ''
        };
      } else if (collection === 'projects') {`;
content = content.replace(payloadStr, newPayloadStr);

fs.writeFileSync(file, content);
