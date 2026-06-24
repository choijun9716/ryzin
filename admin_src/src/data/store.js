// ===== 중앙 데이터 스토어 (Observer 패턴 + LocalStorage + SheetDB) =====
import { getBroadcastStatus, getSettleStatus, getBroadcastStatusLabel, getSettleStatusLabel } from './models.js';
import CryptoJS from 'crypto-js';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';
const SECRET_SALT = 'ryzin_super_secret_salt_2026';

class DataStore {
  constructor() {
    this.isDemoMode = localStorage.getItem('ryzin_is_demo_mode') === 'true';
    this.STORAGE_KEY = this.isDemoMode ? 'livecommerce_erp_demo_data' : 'livecommerce_erp_data';

    this._data = {
      users: [], currentUser: null,
      hosts: [], brands: [], projects: [], tasks: [], liveHosts: [], contracts: [],
      products: [], designs: [], results: [], finances: [], currentRole: 'admin',
    };
    this._listeners = {};
    this._sheetDBReady = false;
    this._load();
  }

  _load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        this._data = { ...this._data, ...JSON.parse(raw) };
      }
    } catch (e) {
      console.warn('데이터 로드 실패:', e);
    }
  }

  _save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._data));
    } catch (e) {
      console.warn('데이터 저장 실패:', e);
    }
  }

  // --- SheetDB 초기 로딩 ---
  async init() {
    if (this.isDemoMode) {
      if (this._data.users.length === 0) {
        this._data.users = [{ id: 'admin', name: '최고관리자 (데모)', password: CryptoJS.SHA256('1234').toString(), role: 'admin' }];
        this._save();
      }
      return true; // 데모 모드일 경우 시트 동기화 스킵
    }
    try {
      const userEnc = encodeURIComponent('사용자');
      const shEnc = encodeURIComponent('쇼호스트');
      const brEnc = encodeURIComponent('브랜드');
      const liveEnc = encodeURIComponent('라이브방송');
      const [userRes, shRes, brRes, liveRes] = await Promise.all([
        fetch(`${SHEETDB_URL}?sheet=${userEnc}`).catch(() => null),
        fetch(`${SHEETDB_URL}?sheet=${shEnc}`).catch(() => null),
        fetch(`${SHEETDB_URL}?sheet=${brEnc}`).catch(() => null),
        fetch(`${SHEETDB_URL}?sheet=${liveEnc}`).catch(() => null)
      ]);
      
      const userData = userRes && userRes.ok ? await userRes.json() : [];
      const shData = shRes && shRes.ok ? await shRes.json() : [];
      const brData = brRes && brRes.ok ? await brRes.json() : [];
      const liveData = liveRes && liveRes.ok ? await liveRes.json() : [];

      if (userData.length || shData.length || brData.length || liveData.length) {
        this._parseSheetData(userData, shData, brData, liveData);
        this._sheetDBReady = true;
      }
      return true;
    } catch (e) {
      console.error('SheetDB 연동 실패:', e);
      return false;
    }
  }

  _parseNum(str) {
    if (!str) return 0;
    return parseInt(str.toString().replace(/,/g, ''), 10) || 0;
  }

  _parseSheetData(userData, shData, brData, liveData) {
    const users = [];
    const hosts = [];
    const brands = [];
    const projects = [];
    const liveHosts = [];
    const results = [];
    const finances = [];
    let lhCounter = 1;

    // 배열인지 확인 (SheetDB 에러 응답 방어)
    const validUserData = Array.isArray(userData) ? userData : [];
    const validShData = Array.isArray(shData) ? shData : [];
    const validBrData = Array.isArray(brData) ? brData : [];
    const validLiveData = Array.isArray(liveData) ? liveData : [];

    // 사용자 파싱
    validUserData.forEach(row => {
      if (!row['아이디']) return;
      users.push({
        id: row['아이디'],
        password: row['비밀번호'] || '',
        name: row['이름'] || '',
        role: row['권한'] || 'pd',
        otpSecret: row['OTP키'] || ''
      });
    });

    // 쇼호스트 파싱
    validShData.forEach(row => {
      if (!row['이름']) return;
      hosts.push({
        id: 'h_' + row['이름'],
        name: row['이름'],
        phone: row['전화번호'] || '',
        ssn: row['주민번호'] || '',
        bank: row['은행명'] || '',
        account: row['계좌번호'] || '',
        accountHolder: row['예금주'] || '',
        address: row['주소'] || '',
        memo: { features: row['메모'] || '', strengths: '', weaknesses: '', style: '', brandPreference: '', caution: '', comment: '' },
        createdAt: '2025-01-01'
      });
    });

    validBrData.forEach(row => {
      if (!row['브랜드명']) return;
      brands.push({
        id: 'b_' + row['브랜드명'],
        name: row['브랜드명'],
        companyName: row['사업자명'] || '',
        category: row['카테고리'] || '',
        taxInvoice: row['세금계산서여부'] === 'O' || row['세금계산서'] === '완료',
        manager: row['담당자명'] || '',
        phone: row['연락처'] || '',
        email: row['이메일'] || '',
        businessNo: row['사업자번호'] || '',
        address: row['주소'] || '',
        memo: row['메모'] || '',
        createdAt: '2025-01-01'
      });
    });

    validLiveData.forEach(row => {
      if (!row['방송ID']) return;
      const pId = row['방송ID'];
      const brandId = 'b_' + row['브랜드명'];

      projects.push({
        id: pId,
        brandId,
        brandName: row['브랜드명'] || '',
        category: row['카테고리'] || '',
        broadcastMonth: row['진행월'] || '',
        broadcastDate: row['방송일'] || '',
        broadcastTime: row['방송시간'] || '',
        platform: row['플랫폼'] || '',
        liveUrl: row['라이브URL'] || '',
        pd: row['담당PD'] || '',
        designer: row['담당디자이너'] || '',
        broadcastStatus: getBroadcastStatus(row['진행상태']),
        settleStatus: getSettleStatus(row['정산상태']),
        note: row['집행결과'] || '',
        createdAt: row['방송일'] || '2025-01-01'
      });

      if (row['쇼호스트A']) {
        liveHosts.push({
          id: 'lh' + lhCounter++, liveId: pId, hostId: 'h_' + row['쇼호스트A'], role: 'main',
          fee: this._parseNum(row['진행금액A']), settleStatus: getSettleStatus(row['정산상태']), memo: ''
        });
      }
      if (row['쇼호스트B']) {
        liveHosts.push({
          id: 'lh' + lhCounter++, liveId: pId, hostId: 'h_' + row['쇼호스트B'], role: 'guest',
          fee: this._parseNum(row['진행금액B']), settleStatus: getSettleStatus(row['정산상태']), memo: ''
        });
      }

      const liveRevenue = this._parseNum(row['라이브매출']);
      const totalCost = this._parseNum(row['광고비']) + this._parseNum(row['제작비']) + this._parseNum(row['진행금액A']) + this._parseNum(row['진행금액B']);
      const roi = totalCost > 0 ? (liveRevenue / totalCost) : 0;

      results.push({
        id: pId, liveId: pId, views: this._parseNum(row['시청뷰']), likes: 0, orders: 0,
        liveRevenue, roi
      });

      finances.push({
        id: pId, liveId: pId, adCost: this._parseNum(row['광고비']), productionCost: this._parseNum(row['제작비']),
        hostCost: this._parseNum(row['진행금액A']) + this._parseNum(row['진행금액B']), otherCost: 0,
        salesRevenue: this._parseNum(row['영업매출액']), operatingProfit: this._parseNum(row['영업이익']),
        vat: this._parseNum(row['부가세']), netMargin: this._parseNum(row['순마진'])
      });
    });

    this._data.users = users;
    this._data.hosts = hosts;
    this._data.brands = brands;
    this._data.projects = projects;
    this._data.liveHosts = liveHosts;
    this._data.results = results;
    this._data.finances = finances;
    this._save();
  }

  // --- SheetDB 비동기 백그라운드 동기화 ---
  async _syncToSheetDB(collection, action, item) {
    if (!this._sheetDBReady) return;
    try {
      let endpoint = '';
      let payload = null;
      let method = 'POST';

      const userEnc = encodeURIComponent('사용자');
      if (collection === 'users') {
        const row = { '아이디': item.id, '비밀번호': item.password, '이름': item.name, '권한': item.role, 'OTP키': item.otpSecret || '' };
        endpoint = `?sheet=${userEnc}`;
        if (action === 'update') { method = 'PUT'; endpoint = `/아이디/${item.id}?sheet=${userEnc}`; }
        if (action === 'delete') { method = 'DELETE'; endpoint = `/아이디/${item.id}?sheet=${userEnc}`; }
        payload = { data: [row] };
      }
      else if (collection === 'hosts') {
        const shEnc = encodeURIComponent('쇼호스트');
        const row = { '이름': item.name, '전화번호': item.phone, '주민번호': item.ssn, '은행명': item.bank, '계좌번호': item.account, '예금주': item.accountHolder, '주소': item.address, '메모': item.memo.features };
        endpoint = `?sheet=${shEnc}`;
        if (action === 'update') { method = 'PUT'; endpoint = `/이름/${item.name}?sheet=${shEnc}`; }
        if (action === 'delete') { method = 'DELETE'; endpoint = `/이름/${item.name}?sheet=${shEnc}`; }
        payload = { data: [row] };
      } 
      else if (collection === 'brands') {
        const brEnc = encodeURIComponent('브랜드');
        const row = { '브랜드명': item.name, '카테고리': item.category, '세금계산서': item.taxInvoice ? '완료' : '', '담당자명': item.manager, '연락처': item.phone, '이메일': item.email, '사업자번호': item.businessNo, '주소': item.address, '메모': item.memo };
        endpoint = `?sheet=${brEnc}`;
        if (action === 'update') { method = 'PUT'; endpoint = `/브랜드명/${item.name}?sheet=${brEnc}`; }
        if (action === 'delete') { method = 'DELETE'; endpoint = `/브랜드명/${item.name}?sheet=${brEnc}`; }
        payload = { data: [row] };
      }
      else if (['projects', 'results', 'finances', 'liveHosts'].includes(collection)) {
        const liveEnc = encodeURIComponent('라이브방송');
        const liveId = item.liveId || item.id;
        const p = this.getById('projects', liveId);
        if (!p && action !== 'delete') return;

        const b = p ? this.getById('brands', p.brandId) : null;
        const r = this.getById('results', liveId) || {};
        const f = this.getById('finances', liveId) || {};
        const m = this.query('liveHosts', lh => lh.liveId === liveId);
        
        const hostA = m[0] ? this.getById('hosts', m[0].hostId) : null;
        const hostB = m[1] ? this.getById('hosts', m[1].hostId) : null;

        const bStatus = p ? p.broadcastStatus : 'new';
        const sStatus = p ? p.settleStatus : 'wait';
        
        const bLabel = getBroadcastStatusLabel(bStatus);
        const sLabel = getSettleStatusLabel(sStatus);

        const row = {
          '방송ID': liveId,
          '진행상태': bLabel,
          '브랜드명': p ? (p.brandName || (b ? b.name : '')) : '',
          '카테고리': p ? p.category : '',
          '진행월': p ? p.broadcastMonth : '',
          '방송일': p ? p.broadcastDate : '',
          '방송시간': p ? p.broadcastTime : '',
          '플랫폼': p ? p.platform : '',
          '라이브URL': p ? p.liveUrl : '',
          '담당PD': p ? p.pd : '',
          '담당디자이너': p ? p.designer : '',
          '시청뷰': r.views || 0,
          '라이브매출': r.liveRevenue || 0,
          '쇼호스트A': hostA ? hostA.name : '',
          '진행금액A': m[0] ? m[0].fee || 0 : 0,
          '쇼호스트B': hostB ? hostB.name : '',
          '진행금액B': m[1] ? m[1].fee || 0 : 0,
          '정산상태': sLabel,
          '광고비': f.adCost || 0,
          '제작비': f.productionCost || 0,
          '영업매출액': f.salesRevenue || 0,
          '영업이익': f.operatingProfit || 0,
          '순마진': f.netMargin || 0,
          '집행결과': p ? p.note : ''
        };

        if (action === 'delete' && collection === 'projects') {
          method = 'DELETE'; endpoint = `/방송ID/${liveId}?sheet=${liveEnc}`;
          payload = null;
        } else {
          const putRes = await fetch(`${SHEETDB_URL}/방송ID/${liveId}?sheet=${liveEnc}`, {
            method: 'PUT', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ data: [row] })
          });
          if (putRes.ok) {
            const result = await putRes.json();
            if (result.updated > 0) return; // Success!
          }
          method = 'POST'; endpoint = `?sheet=${liveEnc}`;
          payload = { data: [row] };
        }
      }

      if (payload) {
        await fetch(`${SHEETDB_URL}${endpoint}`, {
          method: method,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
      } else if (method === 'DELETE') {
        await fetch(`${SHEETDB_URL}${endpoint}`, { method: 'DELETE', headers: {'Accept': 'application/json'} });
      }
    } catch (e) {
      console.error('SheetDB 동기화 에러:', e);
    }
  }

  // --- 이벤트 및 CRUD ---
  on(event, callback) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(callback);
    return () => { this._listeners[event] = this._listeners[event].filter(cb => cb !== callback); };
  }

  _emit(event, data) {
    if (this._listeners[event]) this._listeners[event].forEach(cb => cb(data));
    if (this._listeners['change']) this._listeners['change'].forEach(cb => cb({ event, data }));
  }

  getAll(collection) { return [...(this._data[collection] || [])]; }
  getById(collection, id) { return (this._data[collection] || []).find(item => item.id === id) || null; }
  query(collection, filterFn) { return (this._data[collection] || []).filter(filterFn); }

  create(collection, item) {
    if (!this._data[collection]) this._data[collection] = [];
    this._data[collection].push(item);
    this._save();
    this._emit(`${collection}:created`, item);
    this._emit(`${collection}:changed`);
    this._syncToSheetDB(collection, 'create', item); // 비동기 백그라운드 호출
    return item;
  }

  update(collection, id, updates) {
    const arr = this._data[collection] || [];
    const idx = arr.findIndex(item => item.id === id);
    if (idx === -1) return null;
    arr[idx] = { ...arr[idx], ...updates, updatedAt: new Date().toISOString() };
    this._save();
    this._emit(`${collection}:updated`, arr[idx]);
    this._emit(`${collection}:changed`);
    this._syncToSheetDB(collection, 'update', arr[idx]);
    return arr[idx];
  }

  delete(collection, id) {
    const arr = this._data[collection] || [];
    const idx = arr.findIndex(item => item.id === id);
    if (idx === -1) return false;
    const removed = arr.splice(idx, 1)[0];
    this._save();
    this._emit(`${collection}:deleted`, removed);
    this._emit(`${collection}:changed`);
    this._syncToSheetDB(collection, 'delete', removed);
    return true;
  }

  // === 통계 함수 ===
  getHostStats(hostId) {
    const matchings = this.query('liveHosts', m => m.hostId === hostId);
    const projectIds = matchings.map(m => m.liveId);
    const projects = this.getAll('projects').filter(p => projectIds.includes(p.id));
    const results = this.getAll('results').filter(r => projectIds.includes(r.liveId));

    const totalBroadcasts = projects.length;
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const monthBroadcasts = projects.filter(p => p.broadcastMonth === thisMonth).length;

    const totalSettlement = matchings.filter(m => m.settleStatus === 'done').reduce((sum, m) => sum + (m.fee || 0), 0);
    const totalRevenue = results.reduce((sum, r) => sum + (r.liveRevenue || 0), 0);
    const avgRevenue = totalBroadcasts > 0 ? totalRevenue / totalBroadcasts : 0;

    const finances = this.getAll('finances').filter(f => projectIds.includes(f.liveId));
    const totalCost = finances.reduce((sum, f) => sum + (f.adCost || 0) + (f.productionCost || 0) + (f.hostCost || 0) + (f.otherCost || 0), 0);
    const avgROI = totalCost > 0 ? totalRevenue / totalCost : 0;

    const lastBroadcast = projects.filter(p => p.broadcastDate).sort((a, b) => b.broadcastDate.localeCompare(a.broadcastDate))[0];
    return { totalBroadcasts, monthBroadcasts, totalSettlement, avgRevenue, avgROI, lastBroadcastDate: lastBroadcast ? lastBroadcast.broadcastDate : null };
  }

  getBrandStats(brandId) {
    const brand = this.getById('brands', brandId);
    const projects = this.query('projects', p => p.brandId === brandId || (brand && p.brandName === brand.name));
    const projectIds = projects.map(p => p.id);
    const results = this.getAll('results').filter(r => projectIds.includes(r.liveId));
    const finances = this.getAll('finances').filter(f => projectIds.includes(f.liveId));

    const totalRevenue = results.reduce((sum, r) => sum + (r.liveRevenue || 0), 0);
    const totalCost = finances.reduce((sum, f) => sum + (f.adCost || 0) + (f.productionCost || 0) + (f.hostCost || 0) + (f.otherCost || 0), 0);
    const avgROI = totalCost > 0 ? totalRevenue / totalCost : 0;

    const lastBroadcast = projects.filter(p => p.broadcastDate).sort((a, b) => b.broadcastDate.localeCompare(a.broadcastDate))[0];
    return { totalBroadcasts: projects.length, totalRevenue, avgROI, lastBroadcastDate: lastBroadcast ? lastBroadcast.broadcastDate : null };
  }

  getDashboardKPI() {
    const projects = this.getAll('projects');
    const results = this.getAll('results');
    const finances = this.getAll('finances');
    
    const now = new Date();
    const currentMonthNum = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    
    // 이번주 날짜 계산
    const dayOfWeek = now.getDay(); // 0(일) ~ 6(토)
    const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); 
    const monday = new Date(now.setDate(diffToMonday));
    monday.setHours(0,0,0,0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23,59,59,999);

    // 복구 (now 객체 변조 방지)
    const trueNow = new Date();

    let thisWeekBroadcasts = 0;
    let monthProjectIds = [];

    projects.forEach(p => {
      if (!p.broadcastDate) return;
      const bDate = new Date(p.broadcastDate.replace(/\./g, '-'));
      if (isNaN(bDate.getTime())) return;
      
      // 이번달 방송 체크
      if (bDate.getFullYear() === currentYear && (bDate.getMonth() + 1) === currentMonthNum) {
        monthProjectIds.push(p.id);
      }
      
      // 이번주 방송 체크
      if (bDate >= monday && bDate <= sunday) {
        thisWeekBroadcasts++;
      }
    });

    const monthBroadcasts = monthProjectIds.length;

    // 이번달 매출
    const monthResults = results.filter(r => monthProjectIds.includes(r.liveId));
    const monthRevenue = monthResults.reduce((sum, r) => sum + (parseInt(r.liveRevenue) || 0), 0);

    // 정산대기 (settleStatus === 'wait' or 'processing')
    // 또는 프로젝트의 상태에 따라.
    const settleWaitIds = projects.filter(p => p.settleStatus === 'pending' || p.settleStatus === 'wait').map(p => p.id);
    const settleWaitAmount = finances.filter(f => settleWaitIds.includes(f.liveId)).reduce((sum, f) => sum + (parseInt(f.salesRevenue) || 0), 0);

    return {
      thisWeekBroadcasts,
      monthBroadcasts,
      monthRevenue,
      settleWaitAmount
    };
  }

  calcProjectFinance(liveId) {
    const matchings = this.query('liveHosts', m => m.liveId === liveId);
    const hostCost = matchings.reduce((sum, m) => sum + (m.brandPays ? 0 : (m.fee || 0)), 0);
    const finance = this.getById('finances', liveId) || {};
    const adCost = finance.adCost || 0;
    const productionCost = finance.productionCost || 0;
    const otherCost = finance.otherCost || 0;
    const salesRevenue = finance.salesRevenue || 0;

    const operatingProfit = salesRevenue - adCost - productionCost - hostCost - otherCost;
    const vat = salesRevenue * 0.1;
    const netMargin = operatingProfit - vat;

    return { hostCost, adCost, productionCost, otherCost, salesRevenue, operatingProfit, vat, netMargin };
  }

  hasSeedData() { return this._data.projects && this._data.projects.length > 0; }
  
  // 로그인 및 세션
  getCurrentUser() {
    const user = this._data.currentUser;
    const sig = this._data.authSignature;
    if (user && sig) {
      // 로컬 스토리지 데이터 임의 변조(Spoofing) 방지 서명 검증
      const expectedSig = CryptoJS.SHA256(user.id + SECRET_SALT).toString();
      if (sig === expectedSig) {
        return user;
      }
    }
    return null;
  }
  
  getCurrentRole() { return this._data.currentRole || 'admin'; }
  setCurrentRole(role) { this._data.currentRole = role; this._save(); this._emit('role:changed', role); }
  
  login(id, password) {
    const user = this.verifyPassword(id, password);
    if (user) {
      this.completeLogin(user);
      return true;
    }
    return false;
  }

  verifyPassword(id, password) {
    // 비밀번호 해싱 후 비교
    const hashedInput = CryptoJS.SHA256(password).toString();
    return (this._data.users || []).find(u => u.id === id && u.password === hashedInput) || null;
  }

  completeLogin(user) {
    this._data.currentUser = user;
    this._data.currentRole = user.role;
    // 세션 서명 생성 및 저장
    this._data.authSignature = CryptoJS.SHA256(user.id + SECRET_SALT).toString();
    this._save();
    this._emit('auth:login', user);
  }

  logout() {
    this._data.currentUser = null;
    this._data.currentRole = 'admin'; // 안전을 위해 초기화하지만, 어차피 로그인 튕김
    this._data.authSignature = null;
    this._save();
    this._emit('auth:logout');
    localStorage.removeItem(this.STORAGE_KEY);
  }

  updateUser(user) {
    const idx = (this._data.users || []).findIndex(u => u.id === user.id);
    if (idx !== -1) {
      this._data.users[idx] = user;
      this._save();
      this._syncToSheetDB('users', 'update', user);
    }
  }

  // 시드 리셋 (이제 사용 안 할 수 있음)
  loginAsDemo() {
    localStorage.setItem('ryzin_is_demo_mode', 'true');
    let targetData = JSON.parse(localStorage.getItem('livecommerce_erp_demo_data') || 'null');
    if (!targetData) {
      targetData = {
        users: [
          { id: 'admin', name: '최고관리자 (데모)', password: CryptoJS.SHA256('1234').toString(), role: 'admin' },
          { id: 'demo', name: '데모 시연 계정', password: CryptoJS.SHA256('demo').toString(), role: 'admin' }
        ], 
        currentUser: null, hosts: [], brands: [], projects: [], tasks: [], liveHosts: [], contracts: [],
        products: [], designs: [], results: [], finances: [], currentRole: 'admin'
      };
    }
    const demoUser = targetData.users.find(u => u.id === 'admin');
    targetData.currentUser = demoUser;
    targetData.authSignature = CryptoJS.SHA256(demoUser.id + SECRET_SALT).toString();
    targetData.currentRole = 'admin';
    localStorage.setItem('livecommerce_erp_demo_data', JSON.stringify(targetData));
    window.location.reload();
  }

  toggleDemoMode(enable) {
    const currentSession = this.getCurrentUser();
    const currentSig = this._data.authSignature;
    const currentRole = this._data.currentRole;

    localStorage.setItem('ryzin_is_demo_mode', enable ? 'true' : 'false');
    
    const targetKey = enable ? 'livecommerce_erp_demo_data' : 'livecommerce_erp_data';
    let targetData = JSON.parse(localStorage.getItem(targetKey) || 'null');
    
    if (!targetData) {
      targetData = {
        users: [
          { id: 'admin', name: '최고관리자 (데모)', password: CryptoJS.SHA256('1234').toString(), role: 'admin' },
          { id: 'demo', name: '데모 시연 계정', password: CryptoJS.SHA256('demo').toString(), role: 'admin' }
        ], 
        currentUser: null, hosts: [], brands: [], projects: [], tasks: [], liveHosts: [], contracts: [],
        products: [], designs: [], results: [], finances: [], currentRole: 'admin'
      };
    }

    if (currentSession) {
      targetData.currentUser = currentSession;
      targetData.authSignature = currentSig;
      targetData.currentRole = currentRole;
      
      const userExists = targetData.users.find(u => u.id === currentSession.id);
      if (!userExists) {
        targetData.users.push(currentSession);
      }
    }

    localStorage.setItem(targetKey, JSON.stringify(targetData));
    
    window.location.reload();
  }

  resetAll() {
    localStorage.removeItem(this.STORAGE_KEY);
    this._data = { users: [], currentUser: null, hosts: [], brands: [], projects: [], tasks: [], liveHosts: [], products: [], designs: [], results: [], finances: [], currentRole: 'admin' };
    this._emit('data:reset');
    this.init(); // 다시 패치 시도
  }
}

export const store = new DataStore();
