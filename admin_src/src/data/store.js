// ===== 중앙 데이터 스토어 (Observer 패턴 + LocalStorage + SheetDB) =====
import { getBroadcastStatus, getSettleStatus, getBroadcastStatusLabel, getSettleStatusLabel } from './models.js';
import CryptoJS from 'crypto-js';

const SUPABASE_URL = 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';
const SECRET_SALT = 'ryzin_super_secret_salt_2026';

function createDemoInitialData() {
  return {
    users: [
      { id: 'admin', name: '최고관리자 (데모)', password: CryptoJS.SHA256('1234').toString(), role: 'admin' },
      { id: 'demo', name: '데모 시연 계정', password: CryptoJS.SHA256('demo').toString(), role: 'demo' }
    ], 
    currentUser: null,
    hosts: [
      { id: 'h_demo_1', name: '김주호', phone: '010-1234-5678', bank: '신한', account: '110-123-456789', ssn: '920101-1234567', address: '서울시 강남구 테헤란로', createdAt: '2026-07-01', memo: { features: '활발함, 패션/가전 전문', comment: '시연용 쇼호스트 A' } },
      { id: 'h_demo_2', name: '이미소', phone: '010-5555-6666', bank: '국민', account: '4567-02-123456', ssn: '950505-2345678', address: '경기도 성남시 분당구', createdAt: '2026-07-01', memo: { features: '목소리 톤 좋음, 뷰티/리빙 전문', comment: '시연용 쇼호스트 B' } },
      { id: 'h_demo_3', name: '최성우', phone: '010-9999-8888', bank: '우리', account: '1002-123-456789', ssn: '900808-1357924', address: '인천시 부평구', createdAt: '2026-07-01', memo: { features: '신뢰감 있는 진행, 테크/식품 전문', comment: '시연용 쇼호스트 C' } }
    ],
    brands: [
      { id: 'b_demo_1', name: '아우라뷰티', category: '뷰티', manager: '홍길동 팀장', phone: '010-1111-2222', email: 'aura@beauty.com', taxInvoice: true, createdAt: '2026-07-01' },
      { id: 'b_demo_2', name: '헬시푸드코리아', category: '식품', manager: '김철수 과장', phone: '010-3333-4444', email: 'healthy@food.com', taxInvoice: true, createdAt: '2026-07-01' },
      { id: 'b_demo_3', name: '모던테크컴퍼니', category: '가전', manager: '박영희 대리', phone: '010-5555-7777', email: 'modern@tech.com', taxInvoice: false, createdAt: '2026-07-01' }
    ],
    projects: [
      { id: 'p_demo_1', brandId: 'b_demo_1', adName: '아우라뷰티 수분크림 런칭', category: '뷰티', broadcastDate: '2026-07-20', broadcastTime: '20:00', broadcastMonth: '2026-07', platform: 'NAVER', liveUrl: 'https://shoppinglive.naver.com', pd: '강동원 PD', designer: '김태희 디자이너', cuesheetLink: '', note: '신제품 출시 시연 방송', status: 'settle_done', createdAt: '2026-07-10' },
      { id: 'p_demo_2', brandId: 'b_demo_2', adName: '헬시푸드 밀키트 초특가전', category: '식품', broadcastDate: '2026-07-21', broadcastTime: '19:00', broadcastMonth: '2026-07', platform: 'GRIP', liveUrl: 'https://grip.show', pd: '송중기 PD', designer: '', cuesheetLink: '', note: '캠핑 특가 패키지', status: 'settle_done', createdAt: '2026-07-10' },
      { id: 'p_demo_3', brandId: 'b_demo_3', adName: '모던테크 무선청소기 시연', category: '가전', broadcastDate: '2026-07-25', broadcastTime: '21:00', broadcastMonth: '2026-07', platform: 'NAVER', liveUrl: 'https://shoppinglive.naver.com', pd: '강동원 PD', designer: '김태희 디자이너', cuesheetLink: '', note: '흡입력 테스트 시연 방송', status: 'design', createdAt: '2026-07-10' },
      { id: 'p_demo_4', brandId: 'b_demo_1', adName: '뷰티 에센스 2차 앵콜 방송', category: '뷰티', broadcastDate: '2026-07-28', broadcastTime: '11:00', broadcastMonth: '2026-07', platform: 'NAVER', liveUrl: 'https://shoppinglive.naver.com', pd: '송중기 PD', designer: '', cuesheetLink: '', note: '앵콜 요청에 따른 추가 방송', status: 'cue_sheet', createdAt: '2026-07-10' },
      { id: 'p_demo_5', brandId: 'b_demo_2', adName: '헬시푸드 단백질 쉐이크 쇼', category: '식품', broadcastDate: '2026-07-30', broadcastTime: '15:00', broadcastMonth: '2026-07', platform: 'GRIP', liveUrl: 'https://grip.show', pd: '강동원 PD', designer: '', cuesheetLink: '', note: '단백질 보충제 시연', status: 'host_cast', createdAt: '2026-07-10' }
    ],
    tasks: [
      { id: 't_demo_1', projectId: 'p_demo_3', title: '청소기 배너 이미지 디자인', assignee: 'designer', dueDate: '2026-07-22', status: 'pending' },
      { id: 't_demo_2', projectId: 'p_demo_4', title: '에센스 2차 큐시트 작성', assignee: 'pd', dueDate: '2026-07-26', status: 'completed' }
    ],
    liveHosts: [
      { id: 'lh_demo_1', projectId: 'p_demo_1', hostId: 'h_demo_2', fee: 300000, type: 'main' },
      { id: 'lh_demo_2', projectId: 'p_demo_2', hostId: 'h_demo_3', fee: 250000, type: 'main' },
      { id: 'lh_demo_3', projectId: 'p_demo_3', hostId: 'h_demo_1', fee: 400000, type: 'main' }
    ],
    contracts: [
      { id: 'c_demo_1', projectId: 'p_demo_1', hostId: 'h_demo_2', status: 'signed', signDate: '2026-07-11' },
      { id: 'c_demo_2', projectId: 'p_demo_2', hostId: 'h_demo_3', status: 'signed', signDate: '2026-07-11' }
    ],
    products: [
      { id: 'pr_demo_1', projectId: 'p_demo_1', name: '아우라 수분크림 50ml', price: 29000, commission: 15 },
      { id: 'pr_demo_2', projectId: 'p_demo_2', name: '부대찌개 캠핑 밀키트 3인분', price: 18900, commission: 10 }
    ],
    designs: [
      { id: 'd_demo_1', projectId: 'p_demo_3', title: '메인 썸네일', link: 'https://example.com/thumb.jpg', status: 'confirm' }
    ],
    results: [
      { id: 'r_demo_1', projectId: 'p_demo_1', salesAmount: 4500000, viewerCount: 1200, buyerCount: 150 },
      { id: 'r_demo_2', projectId: 'p_demo_2', salesAmount: 3200000, viewerCount: 850, buyerCount: 110 }
    ],
    finances: [
      { id: 'f_demo_1', month: '2026-07', sales: 7700000, cost: 3500000, profit: 4200000 },
      { id: 'f_demo_2', month: '2026-06', sales: 6200000, cost: 2800000, profit: 3400000 }
    ],
    crmClients: [
      { id: 'crm_demo_1', companyName: '(주)데모코스메틱', contactName: '원빈 부장', phone: '010-4444-3333', email: 'wb@democos.com', source: '자사몰 인바운드', interestedService: '라이브 풀패키지', status: 'new', category: 'A', memo: '신규 런칭 브랜드 시연용 데이터', lastContactDate: '2026-07-09', createdAt: '2026-07-09' }
    ],
    crmActivities: [
      { id: 'act_demo_1', clientId: 'crm_demo_1', date: '2026-07-09', type: 'phone', content: '첫 전화 통화 상담 완료. 가상 견적서 송부 요청 받음.', followUpDate: '2026-07-15', createdAt: '2026-07-09' }
    ],
    currentRole: 'admin'
  };
}

class DataStore {
  constructor() {
    this.isDemoMode = localStorage.getItem('ryzin_is_demo_mode') === 'true';
    this.STORAGE_KEY = this.isDemoMode ? 'livecommerce_erp_demo_data' : 'livecommerce_erp_data';

    this._data = {
      users: [], currentUser: null,
      hosts: [], brands: [], projects: [], tasks: [], liveHosts: [], contracts: [],
      products: [], designs: [], results: [], finances: [],
      crmClients: [],
      crmActivities: [], currentRole: 'admin',
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

  // --- Supabase 초기 로딩 ---
  // --- Supabase 초기 로딩 ---
  async init() {
    if (this.isDemoMode) {
      if (this._data.users.length === 0) {
        const seedData = createDemoInitialData();
        this._data = { ...this._data, ...seedData };
        this._save();
      }
      return true; // 데모 모드일 경우 시트 동기화 스킵
    }
    try {
      const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      };
      
      let [userRes, shRes, brRes, liveRes, crmClientRes, crmActRes] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/users?select=*`, { headers }).catch(() => null),
        fetch(`${SUPABASE_URL}/rest/v1/hosts?select=*`, { headers }).catch(() => null),
        fetch(`${SUPABASE_URL}/rest/v1/brands?select=*`, { headers }).catch(() => null),
        fetch(`${SUPABASE_URL}/rest/v1/live_broadcasts?select=*`, { headers }).catch(() => null),
        fetch(`${SUPABASE_URL}/rest/v1/crm_clients?select=*`, { headers }).catch(() => null),
        fetch(`${SUPABASE_URL}/rest/v1/crm_activities?select=*`, { headers }).catch(() => null)
      ]);
      
      let userData = userRes && userRes.ok ? await userRes.json() : [];
      let shData = shRes && shRes.ok ? await shRes.json() : [];
      let brData = brRes && brRes.ok ? await brRes.json() : [];
      let liveData = liveRes && liveRes.ok ? await liveRes.json() : [];
      let crmClientData = crmClientRes && crmClientRes.ok ? await crmClientRes.json() : [];
      let crmActData = crmActRes && crmActRes.ok ? await crmActRes.json() : [];

      // Supabase 데이터가 비어있고, 기존 로컬 캐시 데이터가 존재하면 자동 1회성 마이그레이션 실행
      const isSupabaseEmpty = userData.length === 0 && shData.length === 0 && brData.length === 0 && liveData.length === 0;
      const hasLocalData = (this._data.brands && this._data.brands.length > 0) || 
                            (this._data.hosts && this._data.hosts.length > 0) || 
                            (this._data.projects && this._data.projects.length > 0);

      if (isSupabaseEmpty && hasLocalData) {
        console.log('🔄 Supabase가 비어있어 로컬 캐시 데이터 마이그레이션을 시작합니다...');
        await this._migrateLocalToSupabase();
        
        // 마이그레이션 후 다시 조회
        [userRes, shRes, brRes, liveRes, crmClientRes, crmActRes] = await Promise.all([
          fetch(`${SUPABASE_URL}/rest/v1/users?select=*`, { headers }).catch(() => null),
          fetch(`${SUPABASE_URL}/rest/v1/hosts?select=*`, { headers }).catch(() => null),
          fetch(`${SUPABASE_URL}/rest/v1/brands?select=*`, { headers }).catch(() => null),
          fetch(`${SUPABASE_URL}/rest/v1/live_broadcasts?select=*`, { headers }).catch(() => null),
          fetch(`${SUPABASE_URL}/rest/v1/crm_clients?select=*`, { headers }).catch(() => null),
          fetch(`${SUPABASE_URL}/rest/v1/crm_activities?select=*`, { headers }).catch(() => null)
        ]);
        
        userData = userRes && userRes.ok ? await userRes.json() : [];
        shData = shRes && shRes.ok ? await shRes.json() : [];
        brData = brRes && brRes.ok ? await brRes.json() : [];
        liveData = liveRes && liveRes.ok ? await liveRes.json() : [];
        crmClientData = crmClientRes && crmClientRes.ok ? await crmClientRes.json() : [];
        crmActData = crmActRes && crmActRes.ok ? await crmActRes.json() : [];
      }

      this._parseSheetData(userData, shData, brData, liveData, crmClientData, crmActData);
      this._sheetDBReady = true;
      return true;
    } catch (e) {
      console.error('Supabase 연동 실패:', e);
      return false;
    }
  }

  async _migrateLocalToSupabase() {
    const headers = {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    };

    try {
      if (this._data.users && this._data.users.length > 0) {
        const payload = this._data.users.map(u => ({
          id: u.id, password: u.password, name: u.name, role: u.role, otp_secret: u.otpSecret || ''
        }));
        await fetch(`${SUPABASE_URL}/rest/v1/users`, { method: 'POST', headers, body: JSON.stringify(payload) }).catch(() => null);
      }
      
      if (this._data.hosts && this._data.hosts.length > 0) {
        const payload = this._data.hosts.map(h => ({
          id: h.id, name: h.name, phone: h.phone, ssn: h.ssn, bank: h.bank, account: h.account, account_holder: h.accountHolder, address: h.address, memo: h.memo ? h.memo.features : ''
        }));
        await fetch(`${SUPABASE_URL}/rest/v1/hosts`, { method: 'POST', headers, body: JSON.stringify(payload) }).catch(() => null);
      }

      if (this._data.brands && this._data.brands.length > 0) {
        const payload = this._data.brands.map(b => ({
          id: b.id, name: b.name, company_name: b.companyName, category: b.category, tax_invoice: b.taxInvoice === true, manager: b.manager, phone: b.phone, email: b.email, business_no: b.businessNo, address: b.address, memo: b.memo
        }));
        await fetch(`${SUPABASE_URL}/rest/v1/brands`, { method: 'POST', headers, body: JSON.stringify(payload) }).catch(() => null);
      }

      if (this._data.crmClients && this._data.crmClients.length > 0) {
        const payload = this._data.crmClients.map(c => ({
          id: c.id, company_name: c.companyName, contact_name: c.contactName, phone: c.phone, email: c.email, status: c.status, category: c.category, interested_service: c.interestedService, source: c.source, memo: c.memo, last_contact_date: c.lastContactDate, created_at: c.createdAt
        }));
        await fetch(`${SUPABASE_URL}/rest/v1/crm_clients`, { method: 'POST', headers, body: JSON.stringify(payload) }).catch(() => null);
      }

      if (this._data.crmActivities && this._data.crmActivities.length > 0) {
        const payload = this._data.crmActivities.map(a => ({
          id: a.id, client_id: a.clientId, date: a.date, type: a.type, content: a.content, follow_up_date: a.followUpDate, created_at: a.createdAt
        }));
        await fetch(`${SUPABASE_URL}/rest/v1/crm_activities`, { method: 'POST', headers, body: JSON.stringify(payload) }).catch(() => null);
      }

      if (this._data.projects && this._data.projects.length > 0) {
        const payload = this._data.projects.map(p => {
          const liveId = p.id;
          const r = this.getById('results', liveId) || {};
          const f = this.getById('finances', liveId) || {};
          const m = this.query('liveHosts', lh => lh.liveId === liveId);
          
          const hostA = m[0] ? this.getById('hosts', m[0].hostId) : null;
          const hostB = m[1] ? this.getById('hosts', m[1].hostId) : null;

          const bLabel = getBroadcastStatusLabel(p.broadcastStatus);
          const sLabel = getSettleStatusLabel(p.settleStatus);

          return {
            id: liveId,
            status: bLabel,
            brand_name: p.brandName || '',
            category: p.category || '',
            broadcast_month: p.broadcastMonth || '',
            broadcast_date: p.broadcastDate || '',
            broadcast_time: p.broadcastTime || '',
            platform: p.platform || '',
            live_url: p.liveUrl || '',
            pd: p.pd || '',
            designer: p.designer || '',
            views: r.views || 0,
            live_revenue: r.liveRevenue || 0,
            host_a: hostA ? hostA.name : '',
            fee_a: m[0] ? m[0].fee || 0 : 0,
            host_b: hostB ? hostB.name : '',
            fee_b: m[1] ? m[1].fee || 0 : 0,
            settle_status: sLabel,
            ad_cost: f.adCost || 0,
            production_cost: f.productionCost || 0,
            sales_revenue: f.salesRevenue || 0,
            operating_profit: f.operatingProfit || 0,
            net_margin: f.netMargin || 0,
            note: p.note || ''
          };
        });
        await fetch(`${SUPABASE_URL}/rest/v1/live_broadcasts`, { method: 'POST', headers, body: JSON.stringify(payload) }).catch(() => null);
      }
      console.log('✅ 로컬 캐시 데이터 Supabase 마이그레이션 완료!');
    } catch (e) {
      console.warn('로컬 데이터 마이그레이션 실패:', e);
    }
  }

  _parseNum(str) {
    if (!str) return 0;
    return parseInt(str.toString().replace(/,/g, ''), 10) || 0;
  }

  _parseSheetData(userData, shData, brData, liveData, crmClientData, crmActData) {
    const users = [];
    const hosts = [];
    const brands = [];
    const projects = [];
    const liveHosts = [];
    const results = [];
    const finances = [];
    const crmClients = [];
    const crmActivities = [];
    let lhCounter = 1;

    const validUserData = Array.isArray(userData) ? userData : [];
    const validShData = Array.isArray(shData) ? shData : [];
    const validBrData = Array.isArray(brData) ? brData : [];
    const validLiveData = Array.isArray(liveData) ? liveData : [];
    const validCrmClientData = Array.isArray(crmClientData) ? crmClientData : [];
    const validCrmActData = Array.isArray(crmActData) ? crmActData : [];

    // 사용자 파싱
    validUserData.forEach(row => {
      if (!row.id) return;
      users.push({
        id: row.id,
        password: row.password || '',
        name: row.name || '',
        role: row.role || 'pd',
        otpSecret: row.otp_secret || ''
      });
    });

    // 쇼호스트 파싱
    validShData.forEach(row => {
      if (!row.name) return;
      hosts.push({
        id: row.id || ('h_' + row.name),
        name: row.name,
        phone: row.phone || '',
        ssn: row.ssn || '',
        bank: row.bank || '',
        account: row.account || '',
        accountHolder: row.account_holder || '',
        address: row.address || '',
        memo: { features: row.memo || '', strengths: '', weaknesses: '', style: '', brandPreference: '', caution: '', comment: '' },
        createdAt: '2025-01-01'
      });
    });

    // 브랜드 파싱
    validBrData.forEach(row => {
      if (!row.name) return;
      brands.push({
        id: row.id || ('b_' + row.name),
        name: row.name,
        companyName: row.company_name || '',
        category: row.category || '',
        taxInvoice: row.tax_invoice === true,
        manager: row.manager || '',
        phone: row.phone || '',
        email: row.email || '',
        businessNo: row.business_no || '',
        address: row.address || '',
        memo: row.memo || '',
        createdAt: '2025-01-01'
      });
    });

    // CRM 고객 파싱
    validCrmClientData.forEach(row => {
      if (!row.id) return;
      crmClients.push({
        id: row.id,
        companyName: row.company_name || '',
        contactName: row.contact_name || '',
        phone: row.phone || '',
        email: row.email || '',
        status: row.status || '',
        category: row.category || '',
        interestedService: row.interested_service || '',
        source: row.source || '',
        memo: row.memo || '',
        lastContactDate: row.last_contact_date || '',
        createdAt: row.created_at || ''
      });
    });

    // CRM 활동 파싱
    validCrmActData.forEach(row => {
      if (!row.id) return;
      crmActivities.push({
        id: row.id,
        clientId: row.client_id || '',
        date: row.date || '',
        type: row.type || '',
        content: row.content || '',
        followUpDate: row.follow_up_date || '',
        createdAt: row.created_at || ''
      });
    });

    // 라이브방송 파싱
    validLiveData.forEach(row => {
      if (!row.id) return;
      const pId = row.id;
      const brandId = 'b_' + row.brand_name;

      projects.push({
        id: pId,
        brandId,
        brandName: row.brand_name || '',
        category: row.category || '',
        broadcastMonth: row.broadcast_month || '',
        broadcastDate: row.broadcast_date || '',
        broadcastTime: row.broadcast_time || '',
        platform: row.platform || '',
        liveUrl: row.live_url || '',
        pd: row.pd || '',
        designer: row.designer || '',
        broadcastStatus: getBroadcastStatus(row.status),
        settleStatus: getSettleStatus(row.settle_status),
        note: row.note || '',
        createdAt: row.broadcast_date || '2025-01-01'
      });

      if (row.host_a) {
        liveHosts.push({
          id: 'lh' + lhCounter++, liveId: pId, hostId: 'h_' + row.host_a, role: 'main',
          fee: this._parseNum(row.fee_a), settleStatus: getSettleStatus(row.settle_status), memo: ''
        });
      }
      if (row.host_b) {
        liveHosts.push({
          id: 'lh' + lhCounter++, liveId: pId, hostId: 'h_' + row.host_b, role: 'guest',
          fee: this._parseNum(row.fee_b), settleStatus: getSettleStatus(row.settle_status), memo: ''
        });
      }

      const liveRevenue = this._parseNum(row.live_revenue);
      const totalCost = this._parseNum(row.ad_cost) + this._parseNum(row.production_cost) + this._parseNum(row.fee_a) + this._parseNum(row.fee_b);
      const roi = totalCost > 0 ? (liveRevenue / totalCost) : 0;

      results.push({
        id: pId, liveId: pId, views: this._parseNum(row.views), likes: 0, orders: 0,
        liveRevenue, roi
      });

      finances.push({
        id: pId, liveId: pId, adCost: this._parseNum(row.ad_cost), productionCost: this._parseNum(row.production_cost),
        hostCost: this._parseNum(row.fee_a) + this._parseNum(row.fee_b), otherCost: 0,
        salesRevenue: this._parseNum(row.sales_revenue), operatingProfit: this._parseNum(row.operating_profit),
        vat: 0,
        netMargin: this._parseNum(row.net_margin)
      });
    });

    if (users.length > 0) {
      this._data.users = users;
    }
    this._data.hosts = hosts;
    this._data.brands = brands;
    this._data.projects = projects;
    this._data.liveHosts = liveHosts;
    this._data.results = results;
    this._data.finances = finances;
    this._data.crmClients = crmClients;
    this._data.crmActivities = crmActivities;
    this._save();
  }

  // --- Supabase 비동기 백그라운드 동기화 ---
  async _syncToSheetDB(collection, action, item) {
    if (!this._sheetDBReady) return;
    try {
      let endpoint = '';
      let payload = null;
      let method = 'POST';

      if (collection === 'users') {
        endpoint = '/rest/v1/users';
        if (action === 'update') { method = 'PATCH'; endpoint = `/rest/v1/users?id=eq.${item.id}`; }
        if (action === 'delete') { method = 'DELETE'; endpoint = `/rest/v1/users?id=eq.${item.id}`; }
        payload = { id: item.id, password: item.password, name: item.name, role: item.role, otp_secret: item.otpSecret || '' };
      }
      else if (collection === 'hosts') {
        endpoint = '/rest/v1/hosts';
        if (action === 'update') { method = 'PATCH'; endpoint = `/rest/v1/hosts?id=eq.${item.id}`; }
        if (action === 'delete') { method = 'DELETE'; endpoint = `/rest/v1/hosts?id=eq.${item.id}`; }
        payload = { id: item.id, name: item.name, phone: item.phone, ssn: item.ssn, bank: item.bank, account: item.account, account_holder: item.accountHolder, address: item.address, memo: item.memo.features };
      } 
      else if (collection === 'brands') {
        endpoint = '/rest/v1/brands';
        if (action === 'update') { method = 'PATCH'; endpoint = `/rest/v1/brands?id=eq.${item.id}`; }
        if (action === 'delete') { method = 'DELETE'; endpoint = `/rest/v1/brands?id=eq.${item.id}`; }
        payload = { id: item.id, name: item.name, company_name: item.companyName, category: item.category, tax_invoice: item.taxInvoice === true, manager: item.manager, phone: item.phone, email: item.email, business_no: item.businessNo, address: item.address, memo: item.memo };
      }
      else if (collection === 'crmClients') {
        endpoint = '/rest/v1/crm_clients';
        if (action === 'update') { method = 'PATCH'; endpoint = `/rest/v1/crm_clients?id=eq.${item.id}`; }
        if (action === 'delete') { method = 'DELETE'; endpoint = `/rest/v1/crm_clients?id=eq.${item.id}`; }
        payload = { id: item.id, company_name: item.companyName, contact_name: item.contactName, phone: item.phone, email: item.email, status: item.status, category: item.category, interested_service: item.interestedService, source: item.source, memo: item.memo, last_contact_date: item.lastContactDate, created_at: item.createdAt };
      }
      else if (collection === 'crmActivities') {
        endpoint = '/rest/v1/crm_activities';
        if (action === 'update') { method = 'PATCH'; endpoint = `/rest/v1/crm_activities?id=eq.${item.id}`; }
        if (action === 'delete') { method = 'DELETE'; endpoint = `/rest/v1/crm_activities?id=eq.${item.id}`; }
        payload = { id: item.id, client_id: item.clientId, date: item.date, type: item.type, content: item.content, follow_up_date: item.followUpDate, created_at: item.createdAt };
      }
      else if (['projects', 'results', 'finances', 'liveHosts'].includes(collection)) {
        const liveId = item.liveId || item.id;
        endpoint = '/rest/v1/live_broadcasts';
        
        if (action === 'delete' && collection === 'projects') {
          method = 'DELETE';
          endpoint = `/rest/v1/live_broadcasts?id=eq.${liveId}`;
          payload = null;
        } else {
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

          payload = {
            id: liveId,
            status: bLabel,
            brand_name: p ? (p.brandName || (b ? b.name : '')) : '',
            category: p ? p.category : '',
            broadcast_month: p ? p.broadcastMonth : '',
            broadcast_date: p ? p.broadcastDate : '',
            broadcast_time: p ? p.broadcastTime : '',
            platform: p ? p.platform : '',
            live_url: p ? p.liveUrl : '',
            pd: p ? p.pd : '',
            designer: p ? p.designer : '',
            views: r.views || 0,
            live_revenue: r.liveRevenue || 0,
            host_a: hostA ? hostA.name : '',
            fee_a: m[0] ? m[0].fee || 0 : 0,
            host_b: hostB ? hostB.name : '',
            fee_b: m[1] ? m[1].fee || 0 : 0,
            settle_status: sLabel,
            ad_cost: f.adCost || 0,
            production_cost: f.productionCost || 0,
            sales_revenue: f.salesRevenue || 0,
            operating_profit: f.operatingProfit || 0,
            net_margin: f.netMargin || 0,
            note: p ? p.note : ''
          };
          method = 'POST';
        }
      }

      const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      };

      if (method === 'POST' && ['live_broadcasts', 'users', 'hosts', 'brands', 'crm_clients', 'crm_activities'].some(t => endpoint.includes(t))) {
        headers['Prefer'] = 'resolution=merge-duplicates';
      }

      if (payload) {
        await fetch(`${SUPABASE_URL}${endpoint}`, {
          method: method,
          headers: headers,
          body: JSON.stringify(payload)
        });
      } else if (method === 'DELETE') {
        await fetch(`${SUPABASE_URL}${endpoint}`, {
          method: 'DELETE',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
      }
    } catch (e) {
      console.error('Supabase 동기화 에러:', e);
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
      let endpoint = '';
      let payload = [];
      
      if (collection === 'crmClients') {
        endpoint = '/rest/v1/crm_clients';
        payload = items.map(data => ({
          id: data.id || '',
          company_name: data.companyName || '',
          contact_name: data.contactName || '',
          phone: data.phone || '',
          email: data.email || '',
          status: data.status || '',
          category: data.category || '',
          interested_service: data.interestedService || '',
          source: data.source || '',
          memo: data.memo || '',
          last_contact_date: data.lastContactDate || '',
          created_at: data.createdAt || ''
        }));
      }

      if (!endpoint) return;

      const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      };

      await fetch(`${SUPABASE_URL}${endpoint}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.error('대량 저장 오류:', e);
    }
  }

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
      targetData = createDemoInitialData();
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
      targetData = createDemoInitialData();
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
