// ============================================================
//  RYZIN LIVE STREAM ADMIN — 멀티 라이브 관리 시스템
//  - 라이브 목록 관리 (live01, live02 ...)
//  - 각 라이브 독립 SheetDB 데이터 (live_id 컬럼으로 구분)
//  - 시청자 URL: /live?id=live01
// ============================================================

const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';

// ─── 공통 유틸 ───────────────────────────────────────────────
const getLives = () => JSON.parse(localStorage.getItem('ryzin_lives') || '[]');
const saveLives = (list) => localStorage.setItem('ryzin_lives', JSON.stringify(list));

const getLiveConfig = (liveId) => JSON.parse(localStorage.getItem(`ryzin_config_${liveId}`) || 'null');
const saveLiveConfig = (liveId, data) => localStorage.setItem(`ryzin_config_${liveId}`, JSON.stringify(data));

const getLiveStats = (liveId) => JSON.parse(localStorage.getItem(`ryzin_stats_${liveId}`) || JSON.stringify({ viewers: 0, hearts: 0, cumViewers: 0 }));
const saveLiveStats = (liveId, data) => localStorage.setItem(`ryzin_stats_${liveId}`, JSON.stringify(data));

const getLiveProducts = (liveId) => JSON.parse(localStorage.getItem(`ryzin_products_${liveId}`) || '[]');
const saveLiveProductsLocal = (liveId, data) => localStorage.setItem(`ryzin_products_${liveId}`, JSON.stringify(data));

const getBotConfig = (liveId) => JSON.parse(localStorage.getItem(`ryzin_bot_${liveId}`) || JSON.stringify({ list: '', interval: 10 }));
const saveBotConfig = (liveId, data) => localStorage.setItem(`ryzin_bot_${liveId}`, JSON.stringify(data));

function nextLiveId() {
  const lives = getLives();
  if (lives.length === 0) return 'live01';
  const nums = lives.map(l => parseInt(l.id.replace('live', '')) || 0);
  const max = Math.max(...nums);
  return `live${String(max + 1).padStart(2, '0')}`;
}

// ─── SheetDB 동기화 ─────────────────────────────────────────
let syncTimers = {};

const db = window.supabaseClient;

function syncToSheetDB(liveId, config, stats, products, force = false) {
  if (syncTimers[liveId]) clearTimeout(syncTimers[liveId]);
  const doSync = async () => {
    if (!db) return;
    const data = {
      live_id: liveId,
      title: config.brandName,
      subtitle: config.title,
      profile_image: config.logoUrl || '',
      stream_url: config.streamUrl || '',
      viewers: parseInt(stats.viewers) || 0,
      hearts: parseInt(stats.hearts) || 0,
      products: products, // JSON 형태
      show_viewers: config.showViewers !== false,
      thumbnail_url: config.thumbnailUrl || '',
      start_time: config.liveStartTime || '',
      status: config.isLive ? 'ON' : 'OFF',
      cum_viewers: parseInt(stats.cumViewers) || 0,
      updated_at: new Date().toISOString()
    };
    try {
      const { error } = await db.from('live_control').upsert(data);
      if (error) throw error;
    } catch (e) {
      console.warn(`[${liveId}] Supabase sync failed`, e);
    }
  };
  if (force) doSync();
  else syncTimers[liveId] = setTimeout(doSync, 1200);
}

// ─── 공통 CSS 스타일 ─────────────────────────────────────────
function injectGlobalStyles(container) {
  const style = document.createElement('style');
  style.innerHTML = `
    .modern-input { width:100%; padding:10px 14px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:14px; outline:none; transition:all 0.2s; background:#fff; box-sizing:border-box; color:#0f172a; }
    .modern-input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.12); }
    .modern-input[readonly] { background:#f8fafc; cursor:not-allowed; color:#94a3b8; }
    .modern-label { display:block; font-size:12px; font-weight:700; color:#64748b; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.04em; }
    .file-upload-wrapper { display:flex; align-items:center; gap:14px; }
    .file-upload-btn { display:inline-flex; align-items:center; justify-content:center; padding:8px 16px; background:#fff; border:1.5px solid #e2e8f0; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; transition:all 0.2s; color:#374151; }
    .file-upload-btn:hover { background:#f1f5f9; border-color:#94a3b8; }
    .product-row { display:flex; gap:16px; align-items:flex-start; background:#fff; padding:20px; border-radius:14px; margin-bottom:12px; border:1.5px solid #e2e8f0; box-shadow:0 2px 8px rgba(0,0,0,0.04); transition:box-shadow 0.2s; }
    .product-row:hover { box-shadow:0 4px 16px rgba(0,0,0,0.08); }
    .product-img-box { position:relative; width:72px; height:72px; flex-shrink:0; border-radius:10px; overflow:hidden; border:1.5px solid #e2e8f0; cursor:pointer; }
    .product-img-box img { width:100%; height:100%; object-fit:cover; transition:opacity 0.2s; }
    .product-img-box:hover img { opacity:0.8; }
    .product-inputs { flex:1; display:flex; flex-direction:column; gap:8px; }
    .product-prices { display:flex; gap:8px; align-items:center; }
    .live-card { display:flex; align-items:center; gap:16px; background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; padding:20px 24px; margin-bottom:12px; cursor:pointer; transition:all 0.2s; box-shadow:0 2px 8px rgba(0,0,0,0.04); }
    .live-card:hover { border-color:#3b82f6; box-shadow:0 4px 16px rgba(59,130,246,0.12); transform:translateY(-1px); }
    .live-badge { padding:4px 10px; border-radius:20px; font-size:11px; font-weight:700; letter-spacing:0.05em; }
    .badge-live { background:#dcfce7; color:#16a34a; }
    .badge-ready { background:#fef9c3; color:#ca8a04; }
    .badge-ended { background:#f1f5f9; color:#64748b; }
    .tab-btn { padding:10px 20px; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; border:none; transition:all 0.18s; background:transparent; color:#64748b; }
    .tab-btn.active { background:#0f172a; color:#fff; }
    .tab-btn:hover:not(.active) { background:#f1f5f9; color:#0f172a; }
    .section-card { background:#fff; border:1.5px solid #e2e8f0; border-radius:16px; padding:28px; box-shadow:0 4px 16px rgba(0,0,0,0.04); margin-bottom:20px; }
    .section-card h3 { margin:0 0 20px 0; font-size:17px; font-weight:700; color:#0f172a; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; }
    .action-btn { display:inline-flex; align-items:center; gap:6px; padding:10px 20px; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; border:none; transition:all 0.18s; }
    .action-btn:hover { opacity:0.9; transform:translateY(-1px); }
    .btn-primary-solid { background:linear-gradient(135deg, #3b82f6, #2563eb); color:#fff; box-shadow:0 4px 12px rgba(37,99,235,0.25); }
    .btn-danger-solid { background:linear-gradient(135deg, #ef4444, #dc2626); color:#fff; box-shadow:0 4px 12px rgba(220,38,38,0.25); }
    .btn-success-solid { background:linear-gradient(135deg, #10b981, #059669); color:#fff; box-shadow:0 4px 12px rgba(5,150,105,0.25); }
    .btn-neutral { background:#f1f5f9; color:#374151; border:1.5px solid #e2e8f0; }
    .btn-neutral:hover { background:#e2e8f0; }
  `;
  container.appendChild(style);
}

// ═══════════════════════════════════════════════════════════════
//  MAIN EXPORT — renderLiveStream()
// ═══════════════════════════════════════════════════════════════
export function renderLiveStream() {
  const container = document.createElement('div');
  container.style.cssText = 'display:flex; flex-direction:column; height:calc(100vh - 48px); background:#f8fafc; overflow:hidden;';
  injectGlobalStyles(container);

  // 현재 선택된 라이브 ID (null = 목록 화면)
  let currentLiveId = null;

  // 뷰 전환 함수
  const showView = (id) => {
    currentLiveId = id;
    container.innerHTML = '';
    injectGlobalStyles(container);
    if (id === null) {
      renderListView(container, showView);
    } else {
      renderLiveEditView(container, id, showView);
    }
  };

  renderListView(container, showView);
  return container;
}

// ═══════════════════════════════════════════════════════════════
//  LIVE LIST VIEW — 라이브 목록
// ═══════════════════════════════════════════════════════════════
function renderListView(container, showView) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'max-width:720px; margin:0 auto; padding:40px 24px; width:100%; overflow-y:auto;';

  const header = document.createElement('div');
  header.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:32px;';
  header.innerHTML = `
    <div>
      <h1 style="margin:0; font-size:26px; font-weight:800; color:#0f172a;">라이브 목록</h1>
      <p style="margin:6px 0 0; font-size:14px; color:#64748b;">각 라이브는 독립된 URL로 시청자에게 제공됩니다.</p>
    </div>
    <button id="btn-create-live" class="action-btn btn-primary-solid">
      <span style="font-size:18px;">+</span> 새 라이브 생성
    </button>
  `;
  wrapper.appendChild(header);

  const listContainer = document.createElement('div');
  listContainer.id = 'live-list-container';
  wrapper.appendChild(listContainer);

  container.appendChild(wrapper);

  const renderList = () => {
    const lives = getLives();
    listContainer.innerHTML = '';

    if (lives.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding:80px 20px; color:#94a3b8;">
          <div style="font-size:48px; margin-bottom:16px;">📡</div>
          <p style="font-size:16px; font-weight:600; margin:0 0 8px;">아직 생성된 라이브가 없습니다.</p>
          <p style="font-size:14px; margin:0;">"새 라이브 생성" 버튼으로 첫 번째 라이브를 만들어보세요!</p>
        </div>
      `;
      return;
    }

    lives.forEach((live) => {
      const config = getLiveConfig(live.id) || {};
      const badgeClass = config.isLive ? 'badge-live' : 'badge-ready';
      const badgeText = config.isLive ? 'LIVE' : '대기';
      const viewerUrl = `https://ryzincorp.com/live?id=${live.id}`;

      const card = document.createElement('div');
      card.className = 'live-card';
      card.innerHTML = `
        <div style="width:48px; height:48px; background:linear-gradient(135deg,#3b82f6,#2563eb); border-radius:12px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; font-weight:800; flex-shrink:0;">
          ${live.id.replace('live', '')}
        </div>
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
            <span style="font-size:16px; font-weight:700; color:#0f172a;">${config.brandName || live.id}</span>
            <span class="live-badge ${badgeClass}">${badgeText}</span>
          </div>
          <div style="font-size:13px; color:#64748b; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${config.title || '방송 제목 미설정'}</div>
          <div style="margin-top:6px; display:flex; align-items:center; gap:6px;">
            <span style="font-size:11px; font-weight:600; color:#94a3b8; background:#f1f5f9; padding:2px 8px; border-radius:6px; font-family:monospace;">${live.id}</span>
            <a href="${viewerUrl}" target="_blank" style="font-size:11px; color:#3b82f6; text-decoration:none; font-weight:600;">${viewerUrl} ↗</a>
          </div>
        </div>
        <div style="display:flex; gap:8px; flex-shrink:0;">
          <button class="action-btn btn-neutral btn-edit" data-id="${live.id}" style="padding:8px 16px; font-size:13px;">설정 ›</button>
          <button class="action-btn btn-neutral btn-delete" data-id="${live.id}" style="padding:8px 12px; font-size:13px; color:#ef4444; border-color:#fee2e2;">삭제</button>
        </div>
      `;
      listContainer.appendChild(card);
    });

    listContainer.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        showView(btn.dataset.id);
      });
    });
    listContainer.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        if (confirm(`${id} 라이브를 삭제하시겠습니까? 관련 데이터가 모두 삭제됩니다.`)) {
          let lives = getLives();
          lives = lives.filter(l => l.id !== id);
          saveLives(lives);
          localStorage.removeItem(`ryzin_config_${id}`);
          localStorage.removeItem(`ryzin_stats_${id}`);
          localStorage.removeItem(`ryzin_products_${id}`);
          localStorage.removeItem(`ryzin_bot_${id}`);
          renderList();
        }
      });
    });

    // 카드 자체 클릭
    listContainer.querySelectorAll('.live-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
        const id = card.querySelector('.btn-edit').dataset.id;
        showView(id);
      });
    });
  };

  renderList();

  header.querySelector('#btn-create-live').addEventListener('click', () => {
    const id = nextLiveId();
    const lives = getLives();
    lives.push({ id, createdAt: Date.now() });
    saveLives(lives);

    const defaultConfig = {
      brandName: `라이브 ${id}`,
      title: '단독 특가 라이브 방송 중!',
      streamUrl: '',
      logoUrl: '',
      thumbnailUrl: '',
      liveStartTime: '',
      showViewers: true,
      isLive: false,
      botEnabled: false
    };
    saveLiveConfig(id, defaultConfig);
    saveLiveStats(id, { viewers: 0, hearts: 0, cumViewers: 0 });
    saveLiveProductsLocal(id, []);
    
    // Supabase 테이블에 신규 라이브 연동 정보 즉시 생성 (대기 상태로 선제 동기화)
    syncToSheetDB(id, defaultConfig, { viewers: 0, hearts: 0, cumViewers: 0 }, [], true);

    renderList();
    showView(id);
  });
}

// ═══════════════════════════════════════════════════════════════
//  LIVE EDIT VIEW — 개별 라이브 설정
// ═══════════════════════════════════════════════════════════════
function renderLiveEditView(container, liveId, showView) {
  let config = getLiveConfig(liveId) || {};
  let stats = getLiveStats(liveId);
  let products = getLiveProducts(liveId);
  let botCfg = getBotConfig(liveId);

  const saveConfig = () => {
    saveLiveConfig(liveId, config);
    syncToSheetDB(liveId, config, stats, products);
  };
  const saveStats = () => {
    saveLiveStats(liveId, stats);
    syncToSheetDB(liveId, config, stats, products);
  };
  const saveProducts = () => {
    saveLiveProductsLocal(liveId, products);
  };
  const saveBotCfg = () => saveBotConfig(liveId, botCfg);

  // ── 레이아웃 ──────────────────────────────────────────────
  const layout = document.createElement('div');
  layout.style.cssText = 'display:flex; gap:0; height:100%; overflow:hidden;';

  // 좌측 (컨트롤)
  const leftPanel = document.createElement('div');
  leftPanel.style.cssText = 'flex:1; display:flex; flex-direction:column; overflow:hidden;';

  // 탑바
  const topBar = document.createElement('div');
  topBar.style.cssText = 'display:flex; align-items:center; gap:16px; padding:16px 28px; background:#fff; border-bottom:1.5px solid #e2e8f0; flex-shrink:0;';
  topBar.innerHTML = `
    <button id="btn-back" class="action-btn btn-neutral" style="padding:8px 14px; font-size:13px;">← 목록</button>
    <div style="display:flex; align-items:center; gap:10px; flex:1;">
      <span style="font-size:13px; font-weight:700; color:#64748b; background:#f1f5f9; padding:4px 12px; border-radius:8px; font-family:monospace;">${liveId}</span>
      <span style="font-size:16px; font-weight:700; color:#0f172a;">${config.brandName || ''}</span>
    </div>
    <div style="display:flex; gap:4px; background:#f1f5f9; padding:4px; border-radius:10px;">
      <button class="tab-btn active" data-tab="config">라이브 기본설정</button>
      <button class="tab-btn" data-tab="chat">채팅 / 봇 관리</button>
      <button class="tab-btn" data-tab="product">상품 관리</button>
    </div>
    <div style="display:flex; align-items:center; gap:8px; margin-left:8px;">
      <span style="font-size:12px; color:#64748b; font-weight:600;">시청자 URL</span>
      <a href="https://ryzincorp.com/live?id=${liveId}" target="_blank" style="font-size:12px; color:#3b82f6; font-weight:600; font-family:monospace;">ryzincorp.com/live?id=${liveId} ↗</a>
    </div>
  `;
  leftPanel.appendChild(topBar);

  // 탭 컨텐츠 영역
  const contentArea = document.createElement('div');
  contentArea.style.cssText = 'flex:1; overflow-y:auto; padding:28px;';
  leftPanel.appendChild(contentArea);

  layout.appendChild(leftPanel);

  // 우측 (미리보기)
  const rightPanel = document.createElement('div');
  rightPanel.style.cssText = 'width:340px; flex-shrink:0; display:flex; flex-direction:column; align-items:center; padding:24px 20px; background:#fff; border-left:1.5px solid #e2e8f0; gap:16px; overflow-y:auto;';

  const isLocal = window.location.origin.includes('localhost:5173');
  const previewBase = isLocal ? 'http://localhost:8080/live/' : '/live/';
  const previewUrl = `${previewBase}?id=${liveId}`;

  const viewerUrl = `https://ryzincorp.com/live/?id=${liveId}`;
  const embedCodeMobile = `<iframe src="${viewerUrl}" width="390" height="693" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="border-radius:20px; overflow:hidden;"></iframe>`;
  const embedCodeWide = `<iframe src="${viewerUrl}" width="100%" height="600" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="border:none;"></iframe>`;

  rightPanel.innerHTML = `
    <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em; align-self:flex-start;">모바일 미리보기</div>
    <div style="width:300px; height:535px; border-radius:20px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,0.15); border:1.5px solid #e2e8f0; flex-shrink:0;">
      <iframe id="live-preview-iframe" src="${previewUrl}" style="width:100%; height:100%; border:none; background:#000;"></iframe>
    </div>
    <button id="btn-refresh-preview" class="action-btn btn-neutral" style="width:100%; justify-content:center;">새로고침</button>

    <div style="width:100%; border-top:1.5px solid #e2e8f0; padding-top:16px; margin-top:4px;">
      <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em; margin-bottom:12px;">임베드 코드 (다른 사이트 삽입용)</div>

      <div style="margin-bottom:10px;">
        <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.05em;">모바일 세로형 (390×693)</div>
        <div style="position:relative;">
          <textarea id="embed-code-mobile" readonly style="width:100%; height:68px; font-size:10px; font-family:monospace; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px; resize:none; color:#334155; line-height:1.5;">${embedCodeMobile}</textarea>
          <button id="btn-copy-embed-mobile" style="position:absolute; top:6px; right:6px; background:#3b82f6; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">복사</button>
        </div>
      </div>

      <div>
        <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.05em;">와이드형 (전체너비×600)</div>
        <div style="position:relative;">
          <textarea id="embed-code-wide" readonly style="width:100%; height:68px; font-size:10px; font-family:monospace; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px; resize:none; color:#334155; line-height:1.5;">${embedCodeWide}</textarea>
          <button id="btn-copy-embed-wide" style="position:absolute; top:6px; right:6px; background:#3b82f6; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">복사</button>
        </div>
      </div>
    </div>
  `;
  layout.appendChild(rightPanel);

  container.appendChild(layout);

  // 복사 버튼 이벤트 (container에 layout이 추가된 이후에 등록)
  const copyEmbed = (id, btnId) => {
    const el = document.getElementById(id);
    const btn = document.getElementById(btnId);
    if (!el || !btn) return;
    navigator.clipboard.writeText(el.value).then(() => {
      btn.textContent = '복사됨!';
      btn.style.background = '#22c55e';
      setTimeout(() => { btn.textContent = '복사'; btn.style.background = '#3b82f6'; }, 2000);
    }).catch(() => {
      el.select();
      document.execCommand('copy');
      btn.textContent = '복사됨!';
      btn.style.background = '#22c55e';
      setTimeout(() => { btn.textContent = '복사'; btn.style.background = '#3b82f6'; }, 2000);
    });
  };
  document.getElementById('btn-copy-embed-mobile').addEventListener('click', () => copyEmbed('embed-code-mobile', 'btn-copy-embed-mobile'));
  document.getElementById('btn-copy-embed-wide').addEventListener('click', () => copyEmbed('embed-code-wide', 'btn-copy-embed-wide'));

  // ── 탭 패널 렌더 함수들 ───────────────────────────────────
  const renderConfigTab = () => {
    contentArea.innerHTML = `
      <div class="section-card">
        <h3>기본 정보</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:18px;">
          <div>
            <label class="modern-label">브랜드명 (제목)</label>
            <input type="text" class="modern-input" id="cfg-brandName" value="${config.brandName || ''}">
          </div>
          <div>
            <label class="modern-label">방송 부제목</label>
            <input type="text" class="modern-input" id="cfg-title" value="${config.title || ''}">
          </div>
        </div>
        <div style="margin-bottom:18px;">
          <label class="modern-label">방송 시작 예정 일시 (카운트다운용)</label>
          <input type="datetime-local" class="modern-input" id="cfg-liveStartTime" value="${config.liveStartTime || ''}">
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:18px;">
          <div class="file-upload-wrapper">
            <div style="width:56px; height:56px; border-radius:50%; overflow:hidden; border:2px solid #e2e8f0; flex-shrink:0;">
              <img id="logo-preview" src="${config.logoUrl || ''}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div>
              <label class="modern-label">프로필 이미지</label>
              <label class="file-upload-btn" for="cfg-logoFile">이미지 업로드</label>
              <input type="file" id="cfg-logoFile" accept="image/*" style="display:none;">
            </div>
          </div>
          <div class="file-upload-wrapper">
            <div style="width:40px; height:71px; border-radius:8px; overflow:hidden; border:2px solid #e2e8f0; flex-shrink:0;">
              <img id="thumbnail-preview" src="${config.thumbnailUrl || ''}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div>
              <label class="modern-label">썸네일 (9:16)</label>
              <label class="file-upload-btn" for="cfg-thumbnailFile">이미지 업로드</label>
              <input type="file" id="cfg-thumbnailFile" accept="image/*" style="display:none;">
            </div>
          </div>
        </div>
        <div>
          <label class="modern-label">스트리밍 URL (m3u8)</label>
          <input type="text" class="modern-input" id="cfg-stream" value="${config.streamUrl || ''}">
        </div>
      </div>

      <div class="section-card">
        <h3>통계 (실시간 조회 데이터)</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:18px;">
          <div>
            <label class="modern-label">실시간 시청자 수 (현재값)</label>
            <div style="display:flex; gap:6px; align-items:center;">
              <div class="modern-input" id="cfg-viewers-display" style="background:#f1f5f9; font-weight:700; color:#0f172a; flex:1; display:flex; align-items:center;">${stats.viewers.toLocaleString()}명</div>
            </div>
            <div style="display:flex; gap:6px; margin-top:6px; align-items:center;">
              <input type="number" class="modern-input" id="cfg-viewers-add" placeholder="+추가할 수" style="flex:1; padding:8px 10px; font-size:13px;">
              <button id="btn-add-viewers" class="action-btn btn-primary-solid" style="white-space:nowrap; padding:8px 12px; font-size:13px;">+추가</button>
            </div>
          </div>
          <div>
            <label class="modern-label">누적 시청자 수</label>
            <input type="number" class="modern-input" id="cfg-cumViewers" value="${stats.cumViewers || 0}" readonly style="background:#f1f5f9; color:#64748b; cursor:not-allowed;">
            <div style="margin-top:4px; font-size:11px; color:#94a3b8;">페이지 로드마다 자동 누적</div>
          </div>
          <div>
            <label class="modern-label">하트 수 (수정 가능)</label>
            <input type="number" class="modern-input" id="cfg-hearts" value="${stats.hearts}">
          </div>
          <div>
            <label class="modern-label">총 상품 조회수 (클릭수)</label>
            <div class="modern-input" id="cfg-total-clicks" style="background:#f1f5f9; display:flex; align-items:center; font-weight:bold; color:#0f172a;">
              ${(products || []).reduce((acc, curr) => acc + (parseInt(curr.clicks) || 0), 0).toLocaleString()}회
            </div>
          </div>
        </div>
        <div style="margin-top:18px; display:flex; align-items:center; gap:8px;">
          <input type="checkbox" id="cfg-showViewers" style="width:18px; height:18px; accent-color:#3b82f6;" ${config.showViewers ? 'checked' : ''}>
          <label for="cfg-showViewers" style="font-size:14px; font-weight:600; color:#374151; cursor:pointer;">시청자 수 화면에 노출</label>
        </div>
      </div>

      <div style="display:flex; gap:12px;">
        <button id="btn-save-config" class="action-btn btn-primary-solid" style="flex:1; justify-content:center; padding:14px; font-size:15px;">설정 저장</button>
        <button id="btn-toggle-live" class="action-btn ${config.isLive ? 'btn-danger-solid' : 'btn-success-solid'}" style="flex:1; justify-content:center; padding:14px; font-size:15px;">
          ${config.isLive ? '라이브 종료' : '라이브 시작'}
        </button>
      </div>
    `;

    // 이벤트
    document.getElementById('btn-save-config').addEventListener('click', () => {
      config.brandName = document.getElementById('cfg-brandName').value;
      config.title = document.getElementById('cfg-title').value;
      config.streamUrl = document.getElementById('cfg-stream').value;
      config.liveStartTime = document.getElementById('cfg-liveStartTime').value;
      // 시청자 수는 +추가 버튼으로 별도 처리 (stats.viewers는 별도 유지)
      stats.cumViewers = parseInt(document.getElementById('cfg-cumViewers').value) || 0;
      stats.hearts = parseInt(document.getElementById('cfg-hearts').value) || 0;
      config.showViewers = document.getElementById('cfg-showViewers').checked;
      saveConfig();
      saveStats();
      // topbar 브랜드명 업데이트
      topBar.querySelector('span[style*="font-weight:700; color:#0f172a"]').textContent = config.brandName;
      alert('설정이 저장되었습니다!');
    });

    // +추가 버튼: Supabase에서 현재 시청자수를 조회 후 입력값만큼 더해서 UPDATE
    document.getElementById('btn-add-viewers').addEventListener('click', async () => {
      const addVal = parseInt(document.getElementById('cfg-viewers-add').value) || 0;
      if (addVal === 0) {
        alert('추가할 시청자 수를 입력해주세요.');
        return;
      }
      const btn = document.getElementById('btn-add-viewers');
      btn.disabled = true;
      btn.textContent = '처리중...';
      try {
        if (!db) return;
        // 최신 데이터 조회
        const { data, error } = await db
          .from('live_control')
          .select('viewers')
          .eq('live_id', liveId)
          .maybeSingle();

        if (error) throw error;
        const currentViewers = data ? (parseInt(data.viewers) || 0) : stats.viewers;
        const newViewers = currentViewers + addVal;

        await db
          .from('live_control')
          .update({ viewers: newViewers })
          .eq('live_id', liveId);

        stats.viewers = newViewers;
        saveStats();
        document.getElementById('cfg-viewers-display').textContent = newViewers.toLocaleString() + '명';
        document.getElementById('cfg-viewers-add').value = '';
        alert(`시청자 수가 ${newViewers.toLocaleString()}명으로 업데이트되었습니다.`);
      } catch (err) {
        alert('시청자 수 업데이트 실패: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.textContent = '+추가';
      }
    });

    document.getElementById('btn-toggle-live').addEventListener('click', (e) => {
      // 라이브 시작 전 스트리밍 URL 필수 확인
      const currentStreamUrl = document.getElementById('cfg-stream').value.trim();
      if (!config.isLive && !currentStreamUrl) {
        alert('⚠️ 스트리밍 URL을 먼저 입력해주세요.\n설정을 저장한 후 라이브를 시작할 수 있습니다.');
        document.getElementById('cfg-stream').focus();
        document.getElementById('cfg-stream').style.borderColor = '#ef4444';
        document.getElementById('cfg-stream').style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
        setTimeout(() => {
          document.getElementById('cfg-stream').style.borderColor = '';
          document.getElementById('cfg-stream').style.boxShadow = '';
        }, 3000);
        return;
      }
      config.isLive = !config.isLive;
      e.target.textContent = config.isLive ? '라이브 종료' : '라이브 시작';
      e.target.className = `action-btn ${config.isLive ? 'btn-danger-solid' : 'btn-success-solid'}`;
      e.target.style.cssText = 'flex:1; justify-content:center; padding:14px; font-size:15px;';
      saveConfig();
      syncToSheetDB(liveId, config, stats, products, true);
    });

    const IMGBB_API_KEY = '117dfb947bc9e0045774b193d1eef7b6';
    const uploadImage = async (file, previewId, configKey) => {
      if (!file) return;
      document.getElementById(previewId).style.opacity = '0.5';
      try {
        // 파일을 Base64로 변환
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]); // data:...;base64, 제거
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        const fd = new FormData();
        fd.append('key', IMGBB_API_KEY);
        fd.append('image', base64);
        const res = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: fd });
        const json = await res.json();
        if (json.success) {
          const url = json.data.url;
          config[configKey] = url;
          document.getElementById(previewId).src = url;
          saveConfig();
        } else {
          console.error('ImgBB 업로드 실패:', json);
        }
      } catch (err) { console.error('이미지 업로드 오류:', err); }
      finally { document.getElementById(previewId).style.opacity = '1'; }
    };

    document.getElementById('cfg-logoFile').addEventListener('change', (e) => uploadImage(e.target.files[0], 'logo-preview', 'logoUrl'));
    document.getElementById('cfg-thumbnailFile').addEventListener('change', (e) => uploadImage(e.target.files[0], 'thumbnail-preview', 'thumbnailUrl'));

    // 라이브관제에서 실시간 통계 정보 패치 후 노출
    if (db) {
      db.from('live_control')
        .select('*')
        .eq('live_id', liveId)
        .maybeSingle()
        .then(({ data: row, error }) => {
          if (error) throw error;
          if (row) {
            const remoteCumViewers = parseInt(row.cum_viewers) || 0;
            const remoteViewers = parseInt(row.viewers) || 0;
            const remoteHearts = parseInt(row.hearts) || 0;

            // 어드민 UI에 실시간 수치 반영 (사용자는 시청자수, 하트수 필드를 수정해서 가라 입력 가능)
            const cumEl = document.getElementById('cfg-cumViewers');
            if (cumEl) cumEl.value = remoteCumViewers;

            const viewersEl = document.getElementById('cfg-viewers');
            if (viewersEl && !viewersEl.matches(':focus')) viewersEl.value = remoteViewers;

            const heartsEl = document.getElementById('cfg-hearts');
            if (heartsEl && !heartsEl.matches(':focus')) heartsEl.value = remoteHearts;

            // stats 로컬 객체 동기화
            stats.cumViewers = remoteCumViewers;
            stats.viewers = remoteViewers;
            stats.hearts = remoteHearts;
            saveStats();
          }
        })
        .catch(err => console.warn('Failed to fetch stats from Supabase', err));
    }
  };

  const renderChatTab = () => {
    contentArea.innerHTML = `
      <div class="section-card">
        <h3>관리자 채팅 발송</h3>
        <div id="admin-chat-list" style="height:200px; overflow-y:auto; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:16px; margin-bottom:16px; font-size:14px;">
          <div style="color:#94a3b8; text-align:center; padding-top:70px; font-weight:500;">
            <div style="font-size:24px; margin-bottom:8px;">💭</div>
            실시간 채팅 내역이 여기에 표시됩니다.
          </div>
        </div>
        <div style="display:flex; gap:10px;">
          <input type="text" id="admin-chat-input" class="modern-input" placeholder="시청자에게 공지할 내용을 입력하세요..." style="flex:1;">
          <button id="btn-send-chat" class="action-btn btn-primary-solid" style="white-space:nowrap;">전송</button>
        </div>
      </div>

      <div class="section-card">
        <h3>채팅 봇</h3>
        <p style="font-size:13px; color:#64748b; margin:0 0 16px; line-height:1.6;">
          시청자에게 보여질 가상 채팅입니다.<br>
          <code style="background:#f1f5f9; padding:2px 8px; border-radius:6px; font-size:12px; font-weight:700;">닉네임 | 채팅내용</code> 형식으로 한 줄씩 입력하세요.
        </p>
        <textarea id="bot-chat-list" class="modern-input" style="height:140px; font-family:monospace; resize:vertical; font-size:13px; line-height:1.7; margin-bottom:16px;" placeholder="뷰티러버 | 이 제품 민감성 피부도 사용 가능한가요?&#10;예쁜하루 | 오늘 할인율이 몇 %인가요?&#10;맘스타그램 | 임산부도 사용해도 되나요?">${botCfg.list}</textarea>
        <div style="display:flex; align-items:center; justify-content:space-between; background:#f8fafc; padding:14px 18px; border-radius:10px; border:1.5px solid #e2e8f0; margin-bottom:16px;">
          <label style="font-size:14px; font-weight:700; color:#374151;">자동 전송 주기</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="number" id="bot-interval" class="modern-input" value="${botCfg.interval}" min="1" style="width:72px; text-align:center; font-weight:700;">
            <span style="font-size:13px; color:#64748b; font-weight:600;">초마다 1개</span>
          </div>
        </div>
        <button id="btn-toggle-bot" class="action-btn btn-primary-solid" style="width:100%; justify-content:center; padding:14px; font-size:15px; gap:8px;">
          <span id="bot-icon">▶</span> <span id="bot-text">채팅 봇 시작</span>
        </button>
      </div>
    `;

    // 관리자 채팅 전송
    const chatInput = document.getElementById('admin-chat-input');
    const chatList = document.getElementById('admin-chat-list');
    let isSending = false;
    const sendAdminChat = async () => {
      const text = chatInput.value.trim();
      if (!text || isSending) return;
      isSending = true;
      const msgId = Date.now();
      const div = document.createElement('div');
      div.style.cssText = 'margin-bottom:8px; padding:6px 0; border-bottom:1px solid #f1f5f9;';
      div.innerHTML = `<span style="font-weight:700; color:#3b82f6;">관리자:</span> ${text}`;
      if (chatList.innerHTML.includes('실시간 채팅')) chatList.innerHTML = '';
      chatList.appendChild(div);
      chatList.scrollTop = chatList.scrollHeight;
      chatInput.value = '';
      try {
        if (!db) return;
        await db.from('live_chats').insert([{
          live_id: liveId,
          created_at: msgId,
          nickname: '관리자',
          content: text
        }]);
      } catch (e) { console.warn('Admin chat send failed', e); }
      finally { isSending = false; }
    };
    document.getElementById('btn-send-chat').addEventListener('click', sendAdminChat);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendAdminChat(); });

    // 채팅 봇
    const botListEl = document.getElementById('bot-chat-list');
    const botIntervalEl = document.getElementById('bot-interval');
    botListEl.addEventListener('input', () => { botCfg.list = botListEl.value; saveBotCfg(); });
    botIntervalEl.addEventListener('input', () => { botCfg.interval = parseInt(botIntervalEl.value) || 10; saveBotCfg(); });

    let botTimer = null;
    let botActive = false;
    document.getElementById('btn-toggle-bot').addEventListener('click', () => {
      botActive = !botActive;
      const icon = document.getElementById('bot-icon');
      const text = document.getElementById('bot-text');
      const btn = document.getElementById('btn-toggle-bot');
      if (botActive) {
        const lines = botListEl.value.split('\n').map(l => l.trim()).filter(l => l.includes('|'));
        if (lines.length === 0) { alert('닉네임|내용 형식으로 1줄 이상 입력해주세요.'); botActive = false; return; }
        icon.textContent = '⏸';
        text.textContent = '채팅 봇 중지';
        btn.className = 'action-btn btn-danger-solid';
        btn.style.cssText = 'width:100%; justify-content:center; padding:14px; font-size:15px; gap:8px;';
        const sec = parseInt(botIntervalEl.value) || 10;
        botTimer = setInterval(async () => {
          const line = lines[Math.floor(Math.random() * lines.length)];
          const [name, ...parts] = line.split('|');
          const msgText = parts.join('|').trim();
          if (!name || !msgText) return;
          const msgId = Date.now();
          // UI 반영
          const div = document.createElement('div');
          div.style.cssText = 'margin-bottom:8px; padding:6px 0; border-bottom:1px solid #f1f5f9;';
          div.innerHTML = `<span style="font-weight:700; color:#64748b;">${name.trim()}:</span> ${msgText}`;
          if (chatList.innerHTML.includes('실시간 채팅')) chatList.innerHTML = '';
          chatList.appendChild(div);
          chatList.scrollTop = chatList.scrollHeight;
          // Supabase 전송
          try {
            if (!db) return;
            await db.from('live_chats').insert([{
              live_id: liveId,
              created_at: msgId,
              nickname: name.trim(),
              content: msgText
            }]);
          } catch (e) { console.warn('Bot chat failed', e); }
        }, sec * 1000);
      } else {
        if (botTimer) clearInterval(botTimer);
        icon.textContent = '▶';
        text.textContent = '채팅 봇 시작';
        btn.className = 'action-btn btn-primary-solid';
        btn.style.cssText = 'width:100%; justify-content:center; padding:14px; font-size:15px; gap:8px;';
      }
    });

    // === 어드민 채팅 실시간 감지 (이력 로드 및 Realtime 구독) ===
    let adminLastChatTime = 0;
    let adminChatLoaded = false;
    let chatChannel = null;

    const addAdminChatItem = (name, text, isHistory = false) => {
      if (chatList.innerHTML.includes('실시간 채팅 내역이 여기에')) chatList.innerHTML = '';
      const div = document.createElement('div');
      div.style.cssText = 'margin-bottom:8px; padding:6px 0; border-bottom:1px solid #f1f5f9;' + (isHistory ? 'opacity:0.72;' : '');
      const nameColor = name === '관리자' ? '#3b82f6' : '#64748b';
      div.innerHTML = `<span style="font-weight:700; color:${nameColor};">${name}:</span> ${text}`;
      chatList.appendChild(div);
      if (!isHistory) chatList.scrollTop = chatList.scrollHeight;
    };

    // 1. 최초 이력 로드
    const loadAdminChatHistory = async () => {
      if (!db) return;
      try {
        const { data: chats, error } = await db
          .from('live_chats')
          .select('*')
          .eq('live_id', liveId)
          .order('created_at', { ascending: true })
          .limit(100);

        if (error) throw error;
        if (chats && Array.isArray(chats)) {
          chats.forEach(c => {
            addAdminChatItem(c.nickname || '?', c.content || '', true);
            adminLastChatTime = parseInt(c.created_at) || 0;
          });
          adminChatLoaded = true;
          setTimeout(() => { chatList.scrollTop = chatList.scrollHeight; }, 100);
        }
      } catch (e) {
        console.warn('Failed to load chat history', e);
      }
    };

    // 2. 실시간 구독
    const subscribeAdminChat = () => {
      if (!db) return;
      chatChannel = db.channel(`admin-chat-channel-${liveId}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'live_chats', filter: `live_id=eq.${liveId}` }, payload => {
          const c = payload.new;
          if (c && parseInt(c.created_at) > adminLastChatTime) {
            addAdminChatItem(c.nickname || '?', c.content || '', false);
            adminLastChatTime = parseInt(c.created_at);
          }
        })
        .subscribe();
    };

    loadAdminChatHistory();
    subscribeAdminChat();

    // 탭 이동 시 구독 해제 및 봇 정리
    contentArea.addEventListener('adminTabLeave', () => {
      if (chatChannel) {
        db.removeChannel(chatChannel);
      }
      if (botTimer) {
        clearInterval(botTimer);
      }
    });
  };

  const renderProductList = () => products.map((p, idx) => {
    const clickCount = p.clicks || 0;
    return `
    <div class="product-row">
      <div class="product-img-box" onclick="document.getElementById('upload-prod-${idx}').click()" title="클릭하여 이미지 변경">
        <img src="${p.image || 'https://via.placeholder.com/72'}" id="img-prev-${idx}">
        <input type="file" id="upload-prod-${idx}" accept="image/*" style="display:none;" data-idx="${idx}" class="prod-img-upload">
      </div>
      <div class="product-inputs">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <input type="text" class="modern-input" style="flex:1;" value="${p.name || ''}" data-idx="${idx}" data-field="name" placeholder="상품명">
          <span style="margin-left:12px; font-size:12px; font-weight:700; color:#3b82f6; background:#eff6ff; padding:4px 10px; border-radius:12px; white-space:nowrap;">
            조회수 (클릭수): ${clickCount.toLocaleString()}회
          </span>
        </div>
        <input type="text" class="modern-input" value="${p.url || ''}" data-idx="${idx}" data-field="url" placeholder="구매 링크 URL">
        <div class="product-prices">
          <input type="number" class="modern-input" value="${(p.price || '').toString().replace(/[^0-9]/g, '')}" data-idx="${idx}" data-field="price" placeholder="라이브가">
          <input type="number" class="modern-input" value="${(p.normalPrice || '').toString().replace(/[^0-9]/g, '')}" data-idx="${idx}" data-field="normalPrice" placeholder="정상가">
          <input type="number" class="modern-input" value="${p.discountRate || 0}" data-idx="${idx}" data-field="discountRate" placeholder="%" readonly style="max-width:72px; text-align:center;">
          <button class="action-btn btn-danger-solid btn-del-product" data-idx="${idx}" style="padding:8px 14px; font-size:13px; white-space:nowrap; flex-shrink:0;">삭제</button>
        </div>
        <div style="display:flex; gap:8px; align-items:center; background:#fff1f2; padding:10px 14px; border-radius:10px; border:1px solid #fecdd3;">
          <span style="font-size:12px; font-weight:700; color:#e11d48;">⚡ 깜짝딜</span>
          <input type="text" class="modern-input" style="flex:1; padding:6px 10px; font-size:12px;" id="deal-text-${idx}" placeholder="배너 문구" value="${p.dealText || '깜짝딜 종료까지'}">
          <input type="number" class="modern-input" style="width:64px; padding:6px; font-size:12px;" id="deal-min-${idx}" placeholder="분">
          <button class="btn-deal-start" data-idx="${idx}" style="padding:6px 12px; background:#e11d48; color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap;">시작</button>
          <button class="btn-deal-cancel" data-idx="${idx}" style="padding:6px 12px; background:#f1f5f9; color:#374151; border:1.5px solid #e2e8f0; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; white-space:nowrap;">종료</button>
          ${p.dealEndTime && p.dealEndTime > Date.now() ? `<span style="font-size:11px; font-weight:700; color:#e11d48;">진행중</span>` : ''}
        </div>
      </div>
    </div>
    `;
  }).join('');

  const renderProductTab = () => {
    contentArea.innerHTML = `
      <div class="section-card">
        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; margin-bottom:20px;">
          <h3 style="margin:0; border:none; padding:0;">상품 관리</h3>
          <div style="display:flex; gap:8px;">
            <button id="btn-add-product" class="action-btn btn-neutral" style="padding:8px 16px; font-size:13px;">+ 상품 추가</button>
            <button id="btn-save-products" class="action-btn btn-primary-solid" style="padding:8px 16px; font-size:13px;">적용</button>
          </div>
        </div>
        <div id="product-list-container">${renderProductList()}</div>
      </div>
    `;

    // Supabase 라이브관제 테이블에서 최신 상품목록 JSON을 불러와 조회수(클릭수)를 동기화
    if (db) {
      db.from('live_control')
        .select('products')
        .eq('live_id', liveId)
        .maybeSingle()
        .then(({ data: row, error }) => {
          if (error) throw error;
          if (row && row.products) {
            try {
              const remoteProducts = typeof row.products === 'string' ? JSON.parse(row.products) : row.products;
              if (Array.isArray(remoteProducts)) {
                // 원격 데이터에서 클릭수 정보를 현재 products 리스트에 매핑
                products.forEach(p => {
                  const match = remoteProducts.find(rp => rp.name === p.name);
                  if (match) {
                    p.clicks = parseInt(match.clicks) || 0;
                  }
                });
                saveProducts();
                const listContainer = document.getElementById('product-list-container');
                if (listContainer) {
                  listContainer.innerHTML = renderProductList();
                  bindProductEvents();
                }
              }
            } catch (e) { }
          }
        })
        .catch(err => console.warn('Failed to load product clicks from Supabase', err));
    }

    const bindProductEvents = () => {
      const plc = document.getElementById('product-list-container');
      plc.querySelectorAll('input[data-field]').forEach(input => {
        input.addEventListener('change', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          const field = e.target.dataset.field;
          products[idx][field] = e.target.value;
          if (field === 'price' || field === 'normalPrice') {
            const n = Number((products[idx].normalPrice || '').toString().replace(/[^0-9]/g, ''));
            const p = Number((products[idx].price || '').toString().replace(/[^0-9]/g, ''));
            if (n > 0 && n >= p) {
              products[idx].discountRate = Math.floor(((n - p) / n) * 100);
              const ri = plc.querySelector(`input[data-idx="${idx}"][data-field="discountRate"]`);
              if (ri) ri.value = products[idx].discountRate;
            }
          }
          saveProducts();
        });
      });
      plc.querySelectorAll('.prod-img-upload').forEach(input => {
        input.addEventListener('change', async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const idx = parseInt(e.target.dataset.idx);
          const preview = document.getElementById(`img-prev-${idx}`);
          preview.style.opacity = '0.5';
          const fd = new FormData(); fd.append('file', file);
          try {
            const res = await fetch('https://tmpfiles.org/api/v1/upload', { method: 'POST', body: fd });
            const json = await res.json();
            if (json.status === 'success') {
              const url = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
              products[idx].image = url;
              preview.src = url;
              saveProducts();
            }
          } catch (e) { console.error(e); }
          finally { preview.style.opacity = '1'; }
        });
      });
      plc.querySelectorAll('.btn-deal-start').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          const min = parseInt(document.getElementById(`deal-min-${idx}`).value);
          if (min > 0) {
            products[idx].dealText = document.getElementById(`deal-text-${idx}`).value || '깜짝딜 종료까지';
            products[idx].dealEndTime = Date.now() + min * 60 * 1000;
            saveProducts();
            plc.innerHTML = renderProductList();
            bindProductEvents();
            syncToSheetDB(liveId, config, stats, products, true);
            setTimeout(() => alert(`${min}분 깜짝딜이 시작되었습니다!`), 10);
          }
        });
      });
      plc.querySelectorAll('.btn-deal-cancel').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          products[idx].dealEndTime = 0;
          saveProducts();
          plc.innerHTML = renderProductList();
          bindProductEvents();
          syncToSheetDB(liveId, config, stats, products, true);
        });
      });
      plc.querySelectorAll('.btn-del-product').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          products.splice(idx, 1);
          saveProducts();
          plc.innerHTML = renderProductList();
          bindProductEvents();
        });
      });
    };
    bindProductEvents();

    document.getElementById('btn-add-product').addEventListener('click', () => {
      products.push({ id: Date.now(), name: '새 상품', price: '', normalPrice: '', discountRate: 0, image: 'https://via.placeholder.com/72', url: '#' });
      saveProducts();
      document.getElementById('product-list-container').innerHTML = renderProductList();
      bindProductEvents();
    });
    document.getElementById('btn-save-products').addEventListener('click', () => {
      syncToSheetDB(liveId, config, stats, products, true);
      alert('상품 목록이 적용되었습니다!');
    });
  };

  // ── 탭 전환 로직 ──────────────────────────────────────────
  setTimeout(() => {
    document.getElementById('btn-back').addEventListener('click', () => showView(null));
    document.getElementById('btn-refresh-preview').addEventListener('click', () => {
      document.getElementById('live-preview-iframe').src = previewUrl;
    });

    const tabBtns = topBar.querySelectorAll('.tab-btn');
    const switchTab = (tabName) => {
      tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
      if (tabName === 'config') renderConfigTab();
      else if (tabName === 'chat') renderChatTab();
      else if (tabName === 'product') renderProductTab();
    };

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // 기본: 기본설정 탭
    renderConfigTab();
  }, 0);
}
