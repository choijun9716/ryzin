import { showSuccess, showError } from '../components/toast.js';
import QRCode from 'qrcode';
// ============================================================
//  RYZIN LIVE STREAM ADMIN — 멀티 라이브 관리 시스템
//  - 라이브 목록 관리 (live01, live02 ...)
//  - 각 라이브 독립 SheetDB 데이터 (live_id 컬럼으로 구분)
//  - 시청자 URL: /live?id=live01
// ============================================================

import { store } from '../data/store.js';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';

// ─── 공통 유틸 ───────────────────────────────────────────────
// ─── 안전한 유틸리티 ───────────────────────────────────────────
const safeJsonParse = (str, fallback) => {
  try {
    if (!str) return fallback;
    return JSON.parse(str);
  } catch (e) {
    console.warn('safeJsonParse error:', e);
    return fallback;
  }
};

const getLives = () => safeJsonParse(localStorage.getItem('ryzin_lives'), []);
const saveLives = (list) => localStorage.setItem('ryzin_lives', JSON.stringify(list));

const getLiveConfig = (liveId) => safeJsonParse(localStorage.getItem(`ryzin_config_${liveId}`), null);
const saveLiveConfig = (liveId, data) => {
  localStorage.setItem(`ryzin_config_${liveId}`, JSON.stringify(data));
  localStorage.setItem(`ryzin_live_config_${liveId}`, JSON.stringify(data));
};

const getLiveStats = (liveId) => safeJsonParse(localStorage.getItem(`ryzin_stats_${liveId}`), { viewers: 0, hearts: 0, cumViewers: 0 });
const saveLiveStats = (liveId, data) => {
  localStorage.setItem(`ryzin_stats_${liveId}`, JSON.stringify(data));
  localStorage.setItem(`ryzin_live_stats_${liveId}`, JSON.stringify(data));
};

const getLiveTimeline = (liveId) => safeJsonParse(localStorage.getItem(`ryzin_stats_timeline_${liveId}`), []);
const saveLiveTimeline = (liveId, list) => {
  localStorage.setItem(`ryzin_stats_timeline_${liveId}`, JSON.stringify(list));
  localStorage.setItem(`ryzin_live_stats_timeline_${liveId}`, JSON.stringify(list));
};

const getLiveProducts = (liveId) => safeJsonParse(localStorage.getItem(`ryzin_products_${liveId}`), []);
const saveLiveProductsLocal = (liveId, data) => {
  localStorage.setItem(`ryzin_products_${liveId}`, JSON.stringify(data));
  localStorage.setItem(`ryzin_live_products_${liveId}`, JSON.stringify(data));
};

const getBotConfig = (liveId) => safeJsonParse(localStorage.getItem(`ryzin_bot_${liveId}`), { list: '', interval: 10, autoReplyRules: [], autoReplyActive: true });
const saveBotConfig = (liveId, data) => localStorage.setItem(`ryzin_bot_${liveId}`, JSON.stringify(data));

// 비동기 안전 Supabase 클라이언트 획득 함수 (타이밍 이슈 100% 방어)
const getSupabaseClient = async (timeoutMs = 3000) => {
  if (window.supabaseClient) return window.supabaseClient;
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    if (window.supabaseClient) return window.supabaseClient;
    await new Promise(r => setTimeout(r, 50));
  }
  return window.supabaseClient || null;
};

function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|watch\?.+&v=))([\w-]{11})/);
  return m ? m[1] : null;
}

function nextLiveId() {
  const lives = getLives();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let newId;
  let isDuplicate = true;
  while (isDuplicate) {
    newId = '';
    for (let i = 0; i < 7; i++) {
      newId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    isDuplicate = lives.some(l => l.id === newId);
  }
  return newId;
}

// ─── SheetDB 동기화 ─────────────────────────────────────────
let syncTimers = {};

const db = window.supabaseClient;
const getSupabase = () => db || window.supabaseClient;

function syncToSheetDB(liveId, config, stats, products, force = false) {
  // 데이터 로드가 완료되지 않았다면 임시 데이터로 원격 DB를 덮어쓰는 사고 방지
  if (window[`live_loaded_${liveId}`] === false) {
    console.log(`[${liveId}] Skip sync: data not loaded yet.`);
    return;
  }
  if (syncTimers[liveId]) clearTimeout(syncTimers[liveId]);
  const doSync = async () => {
    if (!db) return;
    const data = {
      live_id: liveId,
      title: config.brandName,
      subtitle: config.title,
      profile_image: (config.logoUrl || '') + 
                     (config.showSplash === false ? '#nosplash' : '') +
                     `#widgetText=${encodeURIComponent(config.widgetText || '라이브 보기')}` +
                     `#widgetPosition=${config.widgetPosition || 'right'}` +
                     `#widgetImageUrl=${config.widgetImageUrl || ''}` +
                     `#showOnMain=${config.showOnMain === true}` +
                     `#standbyImageUrl=${encodeURIComponent(config.standbyImageUrl || '')}` +
                     `#useStandbyImage=${config.useStandbyImage === true}` +
                     `#showNoticeNote=${config.showNoticeNote !== false}` +
                     `#noticeNoteTitle=${encodeURIComponent(config.noticeNoteTitle || '')}` +
                     `#noticeNoteContent=${encodeURIComponent(config.noticeNoteContent || '')}`,
      stream_url: config.streamUrl || '',
      viewers: parseInt(stats.viewers) || 0,
      hearts: parseInt(stats.hearts) || 0,
      products: products, // JSON 형태
      show_viewers: config.showViewers !== false,
      thumbnail_url: config.thumbnailUrl || '',
      start_time: config.liveStartTime || '',
      status: config.isLive ? 'ON' : 'OFF',
      cum_viewers: parseInt(stats.cumViewers) || 0,
      share_title: config.shareTitle || '',
      share_desc: config.shareDesc || '',
      share_image: config.shareImageUrl || '',
      like_image_url: config.likeImageUrl || '',
      banned_words: config.bannedWords || '',
      banned_users: config.bannedUsers || '',
      updated_at: new Date().toISOString()
    };
    try {
      const { error } = await db.from('live_control').upsert(data);
      // 우측 미리보기 iframe에 실시간 메시지 전송
      try {
        const previewIframe = document.querySelector('iframe');
        if (previewIframe && previewIframe.contentWindow) {
          previewIframe.contentWindow.postMessage({
            type: 'sync_preview',
            config: config,
            stats: stats,
            products: products
          }, '*');
        }
      } catch(e) {}
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
  const role = store.getCurrentRole();
  const isLiveStreamOnly = role && role.startsWith('live_stream:');
  const targetLiveId = isLiveStreamOnly ? role.split(':')[1] : null;
  const isBrandPartner = role && role.startsWith('brand:');
  const targetBrandId = isBrandPartner ? role.split(':')[1] : null;
  const isRestricted = isLiveStreamOnly || isBrandPartner;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'max-width:720px; margin:0 auto; padding:40px 24px; width:100%; overflow-y:auto;';

  const header = document.createElement('div');
  header.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:32px;';
  header.innerHTML = `
    <div>
      <h1 style="margin:0; font-size:26px; font-weight:800; color:#0f172a;">라이브 목록</h1>
      <p style="margin:6px 0 0; font-size:14px; color:#64748b;">각 라이브는 독립된 URL로 시청자에게 제공됩니다.</p>
    </div>
    ${isRestricted ? '' : `
    <button id="btn-create-live" class="action-btn btn-primary-solid">
      <span style="font-size:18px;">+</span> 새 라이브 생성
    </button>
    `}
  `;
  wrapper.appendChild(header);

  const listContainer = document.createElement('div');
  listContainer.id = 'live-list-container';
  wrapper.appendChild(listContainer);

  container.appendChild(wrapper);

  // UI 즉시 그리기 함수 (DOM 안전 참조)
  const drawCards = (livesToDraw) => {
    const targetContainer = document.getElementById('live-list-container') || listContainer;
    if (!targetContainer) return;
    targetContainer.innerHTML = '';

    if (!livesToDraw || livesToDraw.length === 0) {
      targetContainer.innerHTML = `
        <div style="text-align:center; padding:80px 20px; color:#94a3b8;">
          <div style="font-size:48px; margin-bottom:16px;">📡</div>
          <p style="font-size:16px; font-weight:600; margin:0 0 8px;">아직 생성된 라이브가 없습니다.</p>
          <p style="font-size:14px; margin:0;">"새 라이브 생성" 버튼으로 첫 번째 라이브를 만들어보세요!</p>
        </div>
      `;
      return;
    }

    livesToDraw.forEach((live, idx) => {
      const config = getLiveConfig(live.id) || {};
      const badgeClass = config.isLive ? 'badge-live' : 'badge-ready';
      const badgeText = config.isLive ? 'LIVE' : '대기';
      const viewerUrl = `https://ryzincorp.com/live/${live.id}`;
      const displayIndex = idx + 1;

      const card = document.createElement('div');
      card.className = 'live-card';
      card.innerHTML = `
        <div style="width:48px; height:48px; background:linear-gradient(135deg,#3b82f6,#2563eb); border-radius:12px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; font-weight:800; flex-shrink:0;">
          ${displayIndex}
        </div>
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
            <span style="font-size:16px; font-weight:700; color:#0f172a;">${config.brandName && !config.brandName.startsWith('라이브 ') ? config.brandName : `라이브 ${displayIndex}`}</span>
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
          ${isRestricted ? '' : `
          <button class="action-btn btn-neutral btn-delete" data-id="${live.id}" style="padding:8px 12px; font-size:13px; color:#ef4444; border-color:#fee2e2;">삭제</button>
          `}
        </div>
      `;

      card.querySelector('.btn-edit').addEventListener('click', (e) => {
        e.stopPropagation();
        showView(live.id);
      });

      if (!isRestricted) {
        const btnDel = card.querySelector('.btn-delete');
        if (btnDel) {
          btnDel.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (!confirm(`라이브 ${live.id}를 정말 삭제하시겠습니까?\n시청자 페이지도 접근이 차단됩니다.`)) return;
            let currentLives = getLives().filter(l => l.id !== live.id);
            saveLives(currentLives);
            const deleted = safeJsonParse(localStorage.getItem('ryzin_deleted_lives'), []);
            if (!deleted.includes(live.id)) {
              deleted.push(live.id);
              localStorage.setItem('ryzin_deleted_lives', JSON.stringify(deleted));
            }
            const sClient = await getSupabaseClient();
            if (sClient) {
              try { await sClient.from('live_control').delete().eq('live_id', live.id); } catch(err) {}
            }
            renderList();
          });
        }
      }

      card.addEventListener('click', () => showView(live.id));
      targetContainer.appendChild(card);
    });
  };

  const getFilteredLives = (rawLives) => {
    let lives = [...rawLives];
    if (isLiveStreamOnly && targetLiveId) {
      if (!lives.some(l => l.id === targetLiveId)) {
        lives.push({ id: targetLiveId, createdAt: Date.now() });
      }
      lives = lives.filter(l => l.id === targetLiveId);
    } else if (isBrandPartner && targetBrandId) {
      const brand = store.getById('brands', targetBrandId);
      const targetBrandName = brand ? brand.name : '';
      if (targetBrandName) {
        lives = lives.filter(l => {
          const cfg = getLiveConfig(l.id) || {};
          return cfg.brandName === targetBrandName;
        });
      } else {
        lives = [];
      }
    }
    lives.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    return lives;
  };

  const renderList = async () => {
    // 1단계: 캐시된 로컬 데이터로 0.01초 즉시 렌더링 (하얀 화면 방지)
    let initialLives = getFilteredLives(getLives());
    if (initialLives.length > 0) {
      drawCards(initialLives);
    } else {
      const targetContainer = document.getElementById('live-list-container') || listContainer;
      if (targetContainer) {
        targetContainer.innerHTML = `
          <div style="text-align:center; padding:60px 20px; color:#64748b;">
            <div style="display:inline-block; width:36px; height:36px; border:3px solid #e2e8f0; border-top-color:#3b82f6; border-radius:50%; animation:spin 0.8s linear infinite; margin-bottom:14px;"></div>
            <p style="font-size:14px; font-weight:600; margin:0;">라이브 목록을 불러오는 중입니다...</p>
          </div>
        `;
      }
    }

    // 2단계: 비동기로 Supabase DB에서 최신 데이터 조회 후 2차 갱신
    try {
      const sClient = await getSupabaseClient();
      if (sClient) {
        const { data, error } = await sClient.from('live_control').select('live_id, updated_at, status, title, subtitle');
        if (!error && data && Array.isArray(data)) {
          const localLives = getLives();
          const deletedLives = safeJsonParse(localStorage.getItem('ryzin_deleted_lives'), []);
          data.forEach(row => {
            if (row.live_id) {
              // 매니저 계정의 targetLiveId는 절대 deletedLives에 걸러지지 않음
              const isExcluded = deletedLives.includes(row.live_id) && row.live_id !== targetLiveId;
              if (!isExcluded) {
                if (!localLives.some(l => l.id === row.live_id)) {
                  localLives.push({ id: row.live_id, createdAt: new Date(row.updated_at).getTime() });
                }
                const cfg = getLiveConfig(row.live_id) || {};
                cfg.isLive = (row.status === 'ON');
                if (row.title) cfg.brandName = row.title;
                if (row.subtitle) cfg.title = row.subtitle;
                saveLiveConfig(row.live_id, cfg);
              }
            }
          });
          saveLives(localLives);
        }
      }
    } catch (e) {
      console.warn('Failed to load remote lives from Supabase', e);
    }

    // 최종 최신 데이터로 화면 갱신
    const finalLives = getFilteredLives(getLives());
    drawCards(finalLives);
  };

  renderList();

  const btnCreateLive = header.querySelector('#btn-create-live');
  if (btnCreateLive) {
    btnCreateLive.addEventListener('click', () => {
    const id = nextLiveId();
    const lives = getLives();
    lives.push({ id, createdAt: Date.now() });
    saveLives(lives);

    // 신규 생성하는 ID는 삭제 목록에서 제거
    let deleted = JSON.parse(localStorage.getItem('ryzin_deleted_lives') || '[]');
    if (deleted.includes(id)) {
      deleted = deleted.filter(d => d !== id);
      localStorage.setItem('ryzin_deleted_lives', JSON.stringify(deleted));
    }

    const defaultConfig = {
      brandName: `라이브 ${lives.length}`,
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
}

// ═══════════════════════════════════════════════════════════════
//  LIVE EDIT VIEW — 개별 라이브 설정
// ═══════════════════════════════════════════════════════════════
function renderLiveEditView(container, liveId, showView) {
  const role = store.getCurrentRole();
  const isLiveStreamOnly = role && role.startsWith('live_stream:');
  const isBrandPartner = role && role.startsWith('brand:');
  const isRestricted = isBrandPartner;

  const base64ToBlob = (base64Data) => {
    let contentType = 'image/png';
    let base64 = base64Data;
    
    if (base64Data.includes(';base64,')) {
      const parts = base64Data.split(';base64,');
      contentType = parts[0].split(':')[1] || 'image/png';
      base64 = parts[1];
    } else {
      // 순수 base64 문자열의 시작 패턴 기반으로 MIME 타입 추정
      if (base64.startsWith('/9j/')) {
        contentType = 'image/jpeg';
      } else if (base64.startsWith('R0lG')) {
        contentType = 'image/gif';
      } else if (base64.startsWith('iVBOR')) {
        contentType = 'image/png';
      } else if (base64.startsWith('UklGR')) {
        contentType = 'image/webp';
      }
    }
    
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  };

  const uploadToImgBB = async (base64Data) => {
    // 0. 전송할 Blob 및 확장자 획득
    const blob = base64ToBlob(base64Data);
    let ext = 'jpg';
    if (blob.type && blob.type.includes('/')) {
      ext = blob.type.split('/')[1] || 'jpg';
    }

    const errors = [];

    // 1. ImgBB 멀티 API 키 시도
    const userKey = localStorage.getItem('ryzin_imgbb_key') || '';
    const IMGBB_KEYS = [];
    if (userKey) IMGBB_KEYS.push(userKey);
    IMGBB_KEYS.push(
      '117dfb947bc9e0045774b193d1eef7b6',
      'd2b512c9bf10e4a3bfec604be1218579',
      '6049a4f479f67a26eb3ccb8823b1eef7'
    );

    for (const key of IMGBB_KEYS) {
      try {
        const fd = new FormData();
        fd.append('key', key);
        fd.append('image', blob, `image.${ext}`);
        const res = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: fd });
        const json = await res.json();
        if (json.success && json.data && json.data.url) {
          return json.data.url;
        } else {
          throw new Error(json.error ? json.error.message : 'API 응답 실패');
        }
      } catch (err) {
        const maskedKey = key ? `${key.substring(0, 4)}...` : 'none';
        errors.push(`[ImgBB] Key (${maskedKey}): ${err.message}`);
      }
    }

    // 2. FreeImageHost 무료 호스팅 폴백 시도
    try {
      const fd = new FormData();
      fd.append('key', '6d207e02198a847aa98d0a2a901485a5');
      fd.append('action', 'upload');
      fd.append('source', blob, `image.${ext}`);
      fd.append('format', 'json');
      const res = await fetch('https://freeimage.host/api/1/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (json.status_code === 200 && json.image && json.image.url) {
        console.log('⚡ FreeImageHost 폴백 업로드 성공!');
        return json.image.url;
      }
    } catch (err) {
      errors.push(`[FreeImageHost]: ${err.message}`);
    }

    // 3. Supabase Storage 버킷 폴백 시도
    if (db && db.storage) {
      try {
        const fileName = `uploads/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
        const { data, error } = await db.storage.from('live_images').upload(fileName, blob, {
          cacheControl: '3600',
          upsert: true
        });
        if (!error && data) {
          const { data: pubData } = db.storage.from('live_images').getPublicUrl(fileName);
          if (pubData && pubData.publicUrl) {
            console.log('⚡ Supabase Storage 폴백 업로드 성공!');
            return pubData.publicUrl;
          }
        }
      } catch (err) {
        errors.push(`[SupabaseStorage]: ${err.message}`);
      }
    }

    // 4. 최종 안전망 무적 폴백 (압축 Base64 Data URL)
    console.warn('⚠️ 외부 이미지 호스팅 전송 중 오류로 인해 인라인 Data URL 폴백으로 저장합니다.\n' + errors.join('\n'));
    if (base64Data.startsWith('data:image')) {
      return base64Data;
    }
    return `data:image/${ext};base64,${base64Data}`;
  };

  const compressImage = (file, maxWidth, maxHeight, quality = 0.82) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        URL.revokeObjectURL(img.src);
        resolve(dataUrl.split(',')[1]);
      };
      img.onerror = (e) => {
        URL.revokeObjectURL(img.src);
        reject(e);
      };
    });
  };

  if (window[`live_loaded_${liveId}`] === undefined) {
    window[`live_loaded_${liveId}`] = false;
  }

  let config = getLiveConfig(liveId) || {};
  let stats = getLiveStats(liveId);
  let products = getLiveProducts(liveId);
  if (!Array.isArray(products)) products = [];
  let botCfg = getBotConfig(liveId);

  // ── 채팅 봇 전역(라이브 편집기 레벨) 상태 ──
  let botTimer = null;
  let botActive = false;
  let botLineIndex = 0;
  let botLines = [];

  // Supabase로부터 설정 정보 무조건 1순위 역동기화
  if (db && !window[`live_loaded_${liveId}`]) {
    db.from('live_control')
      .select('*')
      .eq('live_id', liveId)
      .maybeSingle()
      .then(({ data, error }) => {
        window[`live_loaded_${liveId}`] = true;
        if (!error && data) {
          const lives = getLives();
          const liveIndex = lives.findIndex(l => l.id === liveId);
          const displayIdx = liveIndex !== -1 ? (liveIndex + 1) : 1;
          config.brandName = data.title || `라이브 ${displayIdx}`;
          config.title = data.subtitle || '단독 특가 라이브 방송 중!';
          config.streamUrl = data.stream_url || '';
          const rawLogoUrl = data.profile_image || '';
          let widgetText = '라이브 보기';
          let widgetPosition = 'right';
          let widgetImageUrl = '';
          let showOnMain = false;
          let standbyImageUrl = '';
          let useStandbyImage = false;
          let showNoticeNote = true;
          let noticeNoteTitle = '';
          let noticeNoteContent = '';

          const hashParts = rawLogoUrl.split('#');
          let cleanLogoUrl = hashParts[0];

          hashParts.slice(1).forEach(part => {
            if (part === 'nosplash') {
              // nosplash flag
            } else if (part.startsWith('widgetText=')) {
              widgetText = decodeURIComponent(part.replace('widgetText=', ''));
            } else if (part.startsWith('widgetPosition=')) {
              widgetPosition = part.replace('widgetPosition=', '');
            } else if (part.startsWith('widgetImageUrl=')) {
              widgetImageUrl = part.replace('widgetImageUrl=', '');
            } else if (part.startsWith('showOnMain=')) {
              showOnMain = part.replace('showOnMain=', '') === 'true';
            } else if (part.startsWith('standbyImageUrl=')) {
              standbyImageUrl = decodeURIComponent(part.replace('standbyImageUrl=', ''));
            } else if (part.startsWith('useStandbyImage=')) {
              useStandbyImage = part.replace('useStandbyImage=', '') === 'true';
            } else if (part.startsWith('showNoticeNote=')) {
              showNoticeNote = part.replace('showNoticeNote=', '') !== 'false';
            } else if (part.startsWith('noticeNoteTitle=')) {
              noticeNoteTitle = decodeURIComponent(part.replace('noticeNoteTitle=', ''));
            } else if (part.startsWith('noticeNoteContent=')) {
              noticeNoteContent = decodeURIComponent(part.replace('noticeNoteContent=', ''));
            }
          });

          config.logoUrl = cleanLogoUrl;
          config.showSplash = !rawLogoUrl.includes('#nosplash');
          config.widgetText = widgetText;
          config.widgetPosition = widgetPosition;
          config.widgetImageUrl = widgetImageUrl;
          config.showOnMain = showOnMain;
          config.standbyImageUrl = standbyImageUrl;
          config.useStandbyImage = useStandbyImage;
          config.showNoticeNote = showNoticeNote;
          config.noticeNoteTitle = noticeNoteTitle;
          config.noticeNoteContent = noticeNoteContent;
          config.thumbnailUrl = data.thumbnail_url || '';
          config.liveStartTime = data.start_time || '';
          config.showViewers = data.show_viewers !== false;
          config.isLive = data.status === 'ON';
          config.shareTitle = data.share_title || '';
          config.shareDesc = data.share_desc || '';
          config.shareImageUrl = data.share_image || '';
          config.likeImageUrl = data.like_image_url || '';

          stats.viewers = data.viewers || 0;
          stats.hearts = data.hearts || 0;
          stats.cumViewers = data.cum_viewers || 0;

          if (data.products) {
            let pData = typeof data.products === 'string' ? JSON.parse(data.products) : data.products;
            if (Array.isArray(pData) && pData.length > 0) {
              // DB에 상품 데이터가 있으면 새로고침 시 무조건 100% DB 원본 데이터로 복원
              products.length = 0;
              products.push(...pData);
            }
          }
          saveLiveConfig(liveId, config);
          saveLiveStats(liveId, stats);
          saveLiveProductsLocal(liveId, products);

          // UI 요소 안전한 인플레이스 갱신 (화면 전체 덮어쓰기/재호출 금지!)
          const safeUpdate = (id, val) => {
            const el = layout.querySelector('#' + id) || document.getElementById(id);
            if (el && document.activeElement !== el) {
              if (el.type === 'checkbox') el.checked = Boolean(val);
              else el.value = val;
            }
          };
          safeUpdate('cfg-brandName', config.brandName);
          safeUpdate('cfg-title', config.title);
          safeUpdate('cfg-stream', config.streamUrl);
          safeUpdate('cfg-showViewers', config.showViewers);
          safeUpdate('cfg-liveStartTime', config.liveStartTime);
          safeUpdate('cfg-shareTitle', config.shareTitle);
          safeUpdate('cfg-shareDesc', config.shareDesc);

          const logoPreview = layout.querySelector('#logo-preview') || document.getElementById('logo-preview');
          if (logoPreview) logoPreview.src = config.logoUrl;
          const thumbPreview = layout.querySelector('#thumbnail-preview') || document.getElementById('thumbnail-preview');
          if (thumbPreview) thumbPreview.src = config.thumbnailUrl;
          const likePreview = layout.querySelector('#like-preview') || document.getElementById('like-preview');
          if (likePreview) {
            likePreview.src = config.likeImageUrl;
            likePreview.style.display = config.likeImageUrl ? 'block' : 'none';
          }
          const liveToggleBtn = layout.querySelector('#btn-toggle-live') || document.getElementById('btn-toggle-live');
          if (liveToggleBtn && document.activeElement !== liveToggleBtn) {
            liveToggleBtn.textContent = config.isLive ? '라이브 종료' : '라이브 시작';
            liveToggleBtn.className = `action-btn ${config.isLive ? 'btn-danger-solid' : 'btn-success-solid'}`;
          }
        }
      })
      .catch((e) => {
        window[`live_loaded_${liveId}`] = true;
        console.warn('Initial Supabase load failed', e);
      });
  } else {
    window[`live_loaded_${liveId}`] = true;
  }

  const postMessageToPreview = () => {
    try {
      const iframe = layout.querySelector('#live-preview-iframe') || document.getElementById('live-preview-iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'sync_preview',
          config: config,
          stats: stats,
          products: products
        }, '*');
      }
    } catch(e) {}
  };

  const saveConfig = () => {
    saveLiveConfig(liveId, config);
    postMessageToPreview();
    syncToSheetDB(liveId, config, stats, products, true);
  };
  const saveStats = () => {
    saveLiveStats(liveId, stats);
    postMessageToPreview();
    syncToSheetDB(liveId, config, stats, products, true);
  };
  const saveProducts = (force = true) => {
    saveLiveProductsLocal(liveId, products);
    postMessageToPreview();
    syncToSheetDB(liveId, config, stats, products, force);
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
  topBar.style.cssText = 'display:flex; align-items:center; gap:18px; padding:18px 28px; background:#fff; border-bottom:1.5px solid #e2e8f0; flex-shrink:0;';
  
  const statusBadge = config.isLive 
    ? '<span style="font-size:10px; font-weight:800; color:#ef4444; background:#fee2e2; border:1px solid #fecaca; padding:2px 6px; border-radius:4px; white-space:nowrap; height:16px; display:inline-flex; align-items:center; gap:4px;"><span style="width:5px; height:5px; background:#ef4444; border-radius:50%; display:inline-block;"></span>라이브 중</span>'
    : '<span style="font-size:10px; font-weight:800; color:#64748b; background:#f1f5f9; border:1px solid #e2e8f0; padding:2px 6px; border-radius:4px; white-space:nowrap; height:16px; display:inline-flex; align-items:center;">송출 대기</span>';

  const onAirTimerHtml = config.isLive
    ? `<div id="onair-timer-wrapper" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:#ef4444; background:#fef2f2; padding:4px 10px; border-radius:6px; border:1px solid #fecaca; white-space:nowrap;"> <div style="width:6px; height:6px; background:#ef4444; border-radius:50%; box-shadow:0 0 0 2px #fee2e2;"></div> 방송 중 <span id="onair-timer-text" style="font-family:monospace; margin-left:2px; letter-spacing:0.02em;">00:00:00</span> </div>`
    : '';

  const tabBtnsHtml = isRestricted
    ? `<button class="tab-btn active" data-tab="chat" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">채팅관리</button>`
    : `
      <button class="tab-btn active" data-tab="config" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">기본설정</button>
      <button class="tab-btn" data-tab="chat" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">채팅관리</button>
      <button class="tab-btn" data-tab="product" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">상품관리</button>
      <button class="tab-btn" data-tab="orders" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">주문 통계</button>
      <button class="tab-btn" data-tab="leads" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">상담 DB</button>
    `;

  topBar.innerHTML = `
    <button id="btn-back" class="action-btn btn-neutral" style="padding:8px 14px; font-size:13px; display:flex; align-items:center; gap:4px;"><span style="font-size:14px; line-height:1;">←</span> 목록</button>
    <div style="display:flex; align-items:center; gap:10px; min-width: 180px; max-width: 480px; flex-shrink:0;">
      <span style="font-size:12px; font-weight:700; color:#64748b; background:#f1f5f9; padding:4px 10px; border-radius:6px; font-family:monospace; line-height:1; flex-shrink:0;">${liveId}</span>
      <span style="font-size:15px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:240px; line-height:1.2;" title="${config.brandName || ''}">${config.brandName || ''}</span>
      ${statusBadge}
    </div>
    <div style="display:flex; gap:4px; background:#f1f5f9; padding:4px; border-radius:10px; flex:1; justify-content:center; max-width:560px; margin:0 auto;">
      ${tabBtnsHtml}
    </div>
    <div style="display:flex; align-items:center; gap:8px; padding:6px 0; flex-shrink:0;">
      <span style="font-size:12px; color:#475569; font-weight:700; white-space:nowrap;">시청자 URL</span>
      <span style="font-size:12px; color:#0f172a; font-family:monospace; font-weight:600; white-space:nowrap; margin-right:4px;">ryzincorp.com/live/${liveId}</span>
      <button id="btn-copy-live-url" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; height:28px; line-height:1; border-radius:6px; border:1px solid #cbd5e1; background:#fff; cursor:pointer; font-weight:700; white-space:nowrap;">복사</button>
      <button id="btn-view-live-qr" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; height:28px; line-height:1; border-radius:6px; border:1px solid #cbd5e1; background:#fff; cursor:pointer; font-weight:700; white-space:nowrap;">QR코드</button>
    </div>
  `;
  leftPanel.appendChild(topBar);

  // URL 복사 및 QR코드 이벤트 리스너 추가
  setTimeout(() => {
    const btnViewQr = document.getElementById('btn-view-live-qr');
    if (btnViewQr) {
      btnViewQr.addEventListener('click', async () => {
        const liveUrl = `https://ryzincorp.com/live/${liveId}`;
        try {
          const qrDataUrl = await QRCode.toDataURL(liveUrl, {
            width: 320,
            margin: 2,
            color: { dark: '#000000', light: '#ffffff' }
          });

          // 모달 생성
          let qrModal = document.getElementById('admin-live-qr-modal');
          if (!qrModal) {
            qrModal = document.createElement('div');
            qrModal.id = 'admin-live-qr-modal';
            qrModal.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); z-index:999999; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(4px);';
            document.body.appendChild(qrModal);
          }

          qrModal.innerHTML = `
            <div style="background:#fff; border-radius:20px; padding:28px; max-width:360px; width:100%; text-align:center; box-shadow:0 25px 50px rgba(0,0,0,0.25); border:1px solid #e2e8f0;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <div style="font-size:16px; font-weight:800; color:#0f172a;">라이브 바로가기 QR</div>
                <button id="btn-close-qr-modal" style="background:transparent; border:none; font-size:20px; color:#94a3b8; cursor:pointer; padding:0; line-height:1;">&times;</button>
              </div>

              <div style="background:#f8fafc; padding:16px; border-radius:14px; border:1px solid #e2e8f0; display:inline-block; margin-bottom:16px;">
                <img src="${qrDataUrl}" alt="Live QR" style="width:240px; height:240px; display:block; border-radius:8px;">
              </div>

              <div style="font-size:12px; font-family:monospace; color:#64748b; margin-bottom:20px; word-break:break-all; background:#f1f5f9; padding:8px 12px; border-radius:8px;">
                ${liveUrl}
              </div>

              <div style="display:flex; gap:8px;">
                <a href="${qrDataUrl}" download="qr_${liveId}.png" class="action-btn btn-primary-solid" style="flex:1; padding:10px; font-size:13px; font-weight:700; text-decoration:none; display:flex; align-items:center; justify-content:center; border-radius:10px;">
                  이미지 다운로드
                </a>
                <button id="btn-close-qr-modal-bottom" class="action-btn btn-neutral" style="padding:10px 16px; font-size:13px; font-weight:700; border-radius:10px;">
                  닫기
                </button>
              </div>
            </div>
          `;
          qrModal.style.display = 'flex';

          const closeModal = () => { qrModal.style.display = 'none'; };
          qrModal.querySelector('#btn-close-qr-modal').onclick = closeModal;
          qrModal.querySelector('#btn-close-qr-modal-bottom').onclick = closeModal;
          qrModal.onclick = (e) => { if (e.target === qrModal) closeModal(); };

        } catch(err) {
          console.error(err);
          alert('QR 코드 생성 오류: ' + err.message);
        }
      });
    }

    const btnCopyUrl = document.getElementById('btn-copy-live-url');
    if (btnCopyUrl) {
      btnCopyUrl.addEventListener('click', async () => {
        const urlToCopy = `https://ryzincorp.com/live/${liveId}`;
        try {
          await navigator.clipboard.writeText(urlToCopy);
          btnCopyUrl.textContent = '복사 완료!';
          btnCopyUrl.style.color = '#10b981';
          btnCopyUrl.style.borderColor = '#a7f3d0';
          btnCopyUrl.style.backgroundColor = '#ecfdf5';
          setTimeout(() => {
            btnCopyUrl.textContent = '복사';
            btnCopyUrl.style.color = '';
            btnCopyUrl.style.borderColor = '';
            btnCopyUrl.style.backgroundColor = '';
          }, 2000);
        } catch (err) {
          console.warn('URL 복사 오류:', err);
        }
      });
    }
  }, 100);

  // 온에어 타이머 구동
  let onAirTimerInterval = null;
  if (config.isLive) {
    setTimeout(() => {
      const timerText = document.getElementById('onair-timer-text');
      if (timerText) {
        let baseTime = config.liveStartTime ? new Date(config.liveStartTime).getTime() : 0;
        const now = Date.now();
        if (!baseTime || baseTime > now) {
          baseTime = now;
        }

        const updateOnAirTimer = () => {
          const elapsed = Date.now() - baseTime;
          const h = Math.floor(elapsed / 3600000);
          const m = Math.floor((elapsed % 3600000) / 60000);
          const s = Math.floor((elapsed % 60000) / 1000);
          timerText.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        };

        updateOnAirTimer();
        onAirTimerInterval = setInterval(updateOnAirTimer, 1000);
      }
    }, 100);
  }

  // 뒤로 가기 리스너 및 타이머 클린업 연동
  const cleanUpOnAirTimer = () => {
    if (onAirTimerInterval) {
      clearInterval(onAirTimerInterval);
      onAirTimerInterval = null;
    }
  };

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
  const previewUrl = `${previewBase}?id=${liveId}&admin=1&v=202609032348`;

  const viewerUrl = `https://ryzincorp.com/live/${liveId}`;
  const embedUrlWithParam = `${viewerUrl}?embed=1&v=202608121330`;
  const widgetUrlWithParam = `${viewerUrl}?widget=1&v=202608121330`;

  const embedCodeMobile = `<iframe src="${embedUrlWithParam}" width="390" height="693" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="border-radius:20px; overflow:hidden; border:none;"></iframe>`;
  const embedCodeWide = `<iframe src="${embedUrlWithParam}" width="100%" height="600" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="border:none; border-radius:12px; overflow:hidden;"></iframe>`;

  const widgetCode = `<iframe id="ryzin-live-iframe" src="${widgetUrlWithParam}" style="position:fixed; bottom:56px; right:12px; width:220px; height:90px; border:none; z-index:999999; background:transparent;" allow="autoplay; fullscreen" allowfullscreen></iframe>
<script>
  window.addEventListener('message', function(e) {
    var data = e.data;
    if (typeof data === 'string') {
      try { data = JSON.parse(data); } catch(err) {}
    }
    if (data && data.type === 'ryzin-widget-resize') {
      var iframes = document.querySelectorAll('iframe');
      var iframe = null;
      for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].contentWindow === e.source) {
          iframe = iframes[i];
          break;
        }
      }
      if (!iframe) {
        iframe = document.getElementById('ryzin-live-iframe');
      }
      if (iframe) {
        iframe.style.setProperty('width', data.width, 'important');
        iframe.style.setProperty('height', data.height, 'important');
        iframe.style.setProperty('bottom', data.bottom, 'important');
        iframe.style.setProperty('top', 'auto', 'important');
        
        if (data.expand) {
          iframe.style.setProperty('border-radius', '20px', 'important');
          iframe.style.setProperty('overflow', 'hidden', 'important');
          iframe.style.setProperty('border', 'none', 'important');
          iframe.style.setProperty('box-shadow', '0 12px 40px rgba(0,0,0,0.15)', 'important');
        } else {
          iframe.style.setProperty('border-radius', '0px', 'important');
          iframe.style.setProperty('overflow', 'visible', 'important');
          iframe.style.setProperty('border', 'none', 'important');
          iframe.style.setProperty('box-shadow', 'none', 'important');
        }

        if (data.position === 'left') {
          iframe.style.setProperty('left', '12px', 'important');
          iframe.style.setProperty('right', 'auto', 'important');
        } else {
          iframe.style.setProperty('right', '12px', 'important');
          iframe.style.setProperty('left', 'auto', 'important');
        }
      }
    }
  });
</script>`;

  const shareGatewayUrl = `https://ryzincorp.com/live/${liveId}`;

  rightPanel.innerHTML = `
    <div style="width:100%; display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
      <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em;">모바일 미리보기</div>
      ${onAirTimerHtml}
    </div>
    <div style="width:300px; height:535px; border-radius:20px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,0.15); border:1.5px solid #e2e8f0; flex-shrink:0;">
      <iframe id="live-preview-iframe" src="${previewUrl}" style="width:100%; height:100%; border:none; background:#000;"></iframe>
    </div>
    <button id="btn-refresh-preview" class="action-btn btn-neutral" style="width:100%; justify-content:center;">새로고침</button>

    <div style="width:100%; border-top:1.5px solid #e2e8f0; padding-top:16px; margin-top:4px;">
      <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em; margin-bottom:12px;">공유 및 임베드 설정</div>

      <div style="margin-bottom:10px;">
        <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.05em;">모바일 세로형 임베드 코드 (390×693)</div>
        <div style="position:relative;">
          <input type="text" id="embed-url-mobile" readonly style="width:100%; font-size:10px; font-family:monospace; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 64px 8px 8px; color:#334155; line-height:1.5; box-sizing:border-box; outline:none;" value="${embedCodeMobile.replace(/"/g, '&quot;')}">
          <button id="btn-copy-embed-mobile" style="position:absolute; top:6px; right:6px; background:#3b82f6; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">복사</button>
        </div>
        <div style="font-size:10px; color:#94a3b8; margin-top:4px;">라이브 화면이 바로 플레이어로 삽입되는 코드입니다</div>
      </div>

      <div style="margin-bottom:10px;">
        <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.05em;">와이드형 임베드 코드 (전체너비×600)</div>
        <div style="position:relative;">
          <input type="text" id="embed-url-wide" readonly style="width:100%; font-size:10px; font-family:monospace; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 64px 8px 8px; color:#334155; line-height:1.5; box-sizing:border-box; outline:none;" value="${embedCodeWide.replace(/"/g, '&quot;')}">
          <button id="btn-copy-embed-wide" style="position:absolute; top:6px; right:6px; background:#3b82f6; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">복사</button>
        </div>
        <div style="font-size:10px; color:#94a3b8; margin-top:4px;">라이브 화면이 바로 플레이어로 삽입되는 코드입니다</div>
      </div>

      <div style="margin-bottom:10px;">
        <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.05em;">라이브 플로팅 위젯 코드 (전체화면형)</div>
        <div style="position:relative;">
          <input type="text" id="widget-url-code" readonly style="width:100%; font-size:10px; font-family:monospace; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 64px 8px 8px; color:#334155; line-height:1.5; box-sizing:border-box; outline:none;" value="${widgetCode.replace(/"/g, '&quot;')}">
          <button id="btn-copy-widget-code" style="position:absolute; top:6px; right:6px; background:#3b82f6; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">복사</button>
        </div>
        <div style="font-size:10px; color:#94a3b8; margin-top:4px;">둥근 버튼 위젯이 화면 구석에 생성되고 클릭 시 열리는 코드입니다</div>
      </div>

      <div style="width:100%; border-top:1.5px solid #e2e8f0; padding-top:16px; margin-top:16px;">
        <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em; margin-bottom:12px;">라이브 위젯 설정</div>
        
        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">위젯 문구</label>
          <input type="text" id="cfg-widgetText" class="modern-input" style="padding:6px 10px; font-size:12px; height:32px;" value="${config.widgetText || '라이브 보기'}">
        </div>

        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">위젯 노출 위치</label>
          <select id="cfg-widgetPosition" class="modern-input" style="padding:4px 10px; font-size:12px; height:32px;">
            <option value="right" ${config.widgetPosition !== 'left' ? 'selected' : ''}>우측 끝 밀착</option>
            <option value="left" ${config.widgetPosition === 'left' ? 'selected' : ''}>좌측 끝 밀착</option>
          </select>
        </div>

        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">위젯 단색/커스텀 이미지</label>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:44px; height:44px; border-radius:50%; border:1.5px solid #e2e8f0; overflow:hidden; background:#fff; flex-shrink:0; display:flex; align-items:center; justify-content:center;">
              <img id="widget-image-preview" src="${config.widgetImageUrl || ''}" style="width:100%; height:100%; object-fit:cover; display:${config.widgetImageUrl ? 'block' : 'none'};">
              <span id="widget-image-placeholder" style="font-size:10px; color:#cbd5e1; display:${config.widgetImageUrl ? 'none' : 'block'};">단색</span>
            </div>
            <div style="flex:1; display:flex; flex-direction:column; gap:4px;">
              <input type="file" id="cfg-widgetImageFile" accept="image/*" style="display:none;">
              <button id="btn-upload-widget-img" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; font-weight:700; justify-content:center;">이미지 업로드</button>
              <button id="btn-reset-widget-img" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; font-weight:700; justify-content:center; color:#ef4444; border-color:#fee2e2;">단색 화이트 리셋</button>
            </div>
          </div>
        </div>

        <div style="margin-bottom:10px; display:flex; align-items:center; gap:8px;">
          <input type="checkbox" id="cfg-showOnMain" style="width:16px; height:16px; cursor:pointer;" ${config.showOnMain === true ? 'checked' : ''}>
          <label for="cfg-showOnMain" style="font-size:11px; font-weight:700; color:#94a3b8; letter-spacing:0.05em; cursor:pointer; user-select:none;">라이진 메인에 위젯 노출</label>
        </div>
      </div>

      <!-- 웹 푸시 알림 발송 설정 (위젯 설정 톤앤매너 일치) -->
      <div style="width:100%; border-top:1.5px solid #e2e8f0; padding-top:16px; margin-top:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div style="font-size:13px; font-weight:700; color:#64748b; letter-spacing:0.05em;">웹 푸시 알림 설정</div>
          <div id="push-subscriber-badge" style="font-size:11px; font-weight:700; color:#64748b; background:#f1f5f9; padding:2px 8px; border-radius:6px; font-family:monospace; line-height:1.3;">
            신청자 0명
          </div>
        </div>

        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">알림 제목</label>
          <input type="text" id="push-title-input" class="modern-input" style="padding:6px 10px; font-size:12px; height:32px;" value="${config.brandName || 'RYZIN'} 라이브 방송이 시작되었습니다!" placeholder="알림 제목">
        </div>

        <div style="margin-bottom:10px;">
          <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px; letter-spacing:0.05em;">알림 내용</label>
          <textarea id="push-body-input" class="modern-input" rows="2" style="padding:6px 10px; font-size:12px; resize:vertical; line-height:1.5;" placeholder="알림 내용">지금 접속하셔서 라이브 단독 특가 혜택을 놓치지 마세요!</textarea>
        </div>

        <div style="display:flex; gap:6px; align-items:center;">
          <button id="btn-send-push-now" class="action-btn btn-primary-solid" style="flex:1; padding:6px 10px; font-size:12px; font-weight:700; height:32px; justify-content:center;">
            방송 알림 전체 발송
          </button>
          <button id="btn-refresh-push-sub" class="action-btn btn-neutral" style="padding:6px 10px; font-size:11px; font-weight:700; height:32px; justify-content:center;">새로고침</button>
        </div>
        <div id="push-status-text" style="font-size:10px; color:#94a3b8; margin-top:6px; min-height:14px; word-break:break-all;"></div>
      </div>
    </div>
  `;
  layout.appendChild(rightPanel);

  container.appendChild(layout);

  // 복사 버튼 이벤트
  const copyEmbed = (id, btnId) => {
    const el = layout.querySelector('#' + id);
    const btn = layout.querySelector('#' + btnId);
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

  const btnCopyMobile = layout.querySelector('#btn-copy-embed-mobile');
  if (btnCopyMobile) btnCopyMobile.addEventListener('click', () => copyEmbed('embed-url-mobile', 'btn-copy-embed-mobile'));

  const btnCopyWide = layout.querySelector('#btn-copy-embed-wide');
  if (btnCopyWide) btnCopyWide.addEventListener('click', () => copyEmbed('embed-url-wide', 'btn-copy-embed-wide'));

  const btnCopyWidget = layout.querySelector('#btn-copy-widget-code');
  if (btnCopyWidget) btnCopyWidget.addEventListener('click', () => copyEmbed('widget-url-code', 'btn-copy-widget-code'));

  // [NEW] 웹 푸시 알림 이벤트 바인딩
  const pushBadge = layout.querySelector('#push-subscriber-badge');
  const pushStatusText = layout.querySelector('#push-status-text');
  const btnSendPush = layout.querySelector('#btn-send-push-now');
  const btnRefreshPush = layout.querySelector('#btn-refresh-push-sub');

  const updatePushSubCount = async () => {
    try {
      if (!db) return;
      const { count, error } = await db.from('live_leads')
        .select('id', { count: 'exact', head: true })
        .eq('live_id', liveId)
        .eq('name', '__WEB_PUSH__');
      if (!error && pushBadge) {
        pushBadge.textContent = `신청자 ${count || 0}명`;
      }
    } catch (e) {
      if (pushBadge) pushBadge.textContent = '신청자 0명';
    }
  };

  updatePushSubCount();

  if (btnRefreshPush) {
    btnRefreshPush.addEventListener('click', () => {
      updatePushSubCount();
      showSuccess('신청자 수를 갱신했습니다.');
    });
  }

  if (btnSendPush) {
    btnSendPush.addEventListener('click', async () => {
      const titleInput = layout.querySelector('#push-title-input');
      const bodyInput = layout.querySelector('#push-body-input');
      const title = titleInput ? titleInput.value.trim() : '';
      const body = bodyInput ? bodyInput.value.trim() : '';
      const url = `https://ryzincorp.com/live/${liveId}`;

      if (!title || !body) {
        showError('푸시 알림 제목과 내용을 모두 입력해주세요.');
        return;
      }

      if (!confirm(`알림을 신청한 모든 시청자에게 웹 푸시를 발송하시겠습니까?\n\n제목: ${title}`)) {
        return;
      }

      btnSendPush.disabled = true;
      btnSendPush.style.opacity = '0.6';
      if (pushStatusText) pushStatusText.textContent = '푸시 발송 중...';

      try {
        const res = await fetch('/api/send_push', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ liveId, title, body, url })
        });
        const result = await res.json();

        if (result.success) {
          showSuccess(`웹 푸시 발송 완료! (성공: ${result.sentCount}건 / 대상: ${result.total || 0}명)`);
          if (pushStatusText) {
            pushStatusText.textContent = `최근 발송: ${new Date().toLocaleTimeString()} (성공 ${result.sentCount}건)`;
          }
          updatePushSubCount();
        } else {
          showError('푸시 발송 실패: ' + (result.message || '오류 발생'));
          if (pushStatusText) pushStatusText.textContent = '발송 실패';
        }
      } catch (err) {
        console.error(err);
        showError('푸시 발송 중 네트워크 오류가 발생했습니다.');
        if (pushStatusText) pushStatusText.textContent = '발송 실패';
      } finally {
        btnSendPush.disabled = false;
        btnSendPush.style.opacity = '1';
      }
    });
  }

  // [NEW] 위젯 관련 설정 이벤트 바인딩
  const inputWidgetText = layout.querySelector('#cfg-widgetText');
  if (inputWidgetText) {
    inputWidgetText.addEventListener('input', (e) => {
      config.widgetText = e.target.value;
      saveLiveConfig(liveId, config);
      syncToSheetDB(liveId, config, stats, products);
    });
  }

  const selectWidgetPosition = layout.querySelector('#cfg-widgetPosition');
  if (selectWidgetPosition) {
    selectWidgetPosition.addEventListener('change', (e) => {
      config.widgetPosition = e.target.value;
      saveLiveConfig(liveId, config);
      syncToSheetDB(liveId, config, stats, products);
    });
  }

  const checkboxShowOnMain = layout.querySelector('#cfg-showOnMain');
  if (checkboxShowOnMain) {
    checkboxShowOnMain.addEventListener('change', async (e) => {
      config.showOnMain = e.target.checked;
      saveLiveConfig(liveId, config);
      
      const profileImageVal = (config.logoUrl || '') + 
                             (config.showSplash === false ? '#nosplash' : '') +
                             `#widgetText=${encodeURIComponent(config.widgetText || '라이브 보기')}` +
                             `#widgetPosition=${config.widgetPosition || 'right'}` +
                             `#widgetImageUrl=${config.widgetImageUrl || ''}` +
                             `#showOnMain=${config.showOnMain === true}`;
      
      if (db) {
        try {
          await db.from('live_control')
            .update({ profile_image: profileImageVal, updated_at: new Date().toISOString() })
            .eq('live_id', liveId);
        } catch(err) {
          console.warn("Direct showOnMain update failed:", err);
        }
      }
      
      syncToSheetDB(liveId, config, stats, products, true);
    });
  }

  const btnUploadWidgetImg = layout.querySelector('#btn-upload-widget-img');
  const fileWidgetImg = layout.querySelector('#cfg-widgetImageFile');
  if (btnUploadWidgetImg && fileWidgetImg) {
    btnUploadWidgetImg.addEventListener('click', () => fileWidgetImg.click());
    fileWidgetImg.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      btnUploadWidgetImg.disabled = true;
      btnUploadWidgetImg.textContent = '업로드 중...';
      try {
        const isLogo = false;
        const maxWidth = 256;
        const maxHeight = 256;
        const quality = 0.88;
        const base64 = await compressImage(file, maxWidth, maxHeight, quality);

        const url = await uploadToImgBB(base64);
        config.widgetImageUrl = url;
        saveLiveConfig(liveId, config);
        
        const imgPreview = layout.querySelector('#widget-image-preview') || document.getElementById('widget-image-preview');
        const placeholder = layout.querySelector('#widget-image-placeholder') || document.getElementById('widget-image-placeholder');
        if (imgPreview && placeholder) {
          imgPreview.src = url;
          imgPreview.style.display = 'block';
          placeholder.style.display = 'none';
        }
        
        syncToSheetDB(liveId, config, stats, products, true);
      } catch (err) {
        console.error('이미지 업로드 오류:', err);
        alert('이미지 업로드 실패: ' + err.message);
      } finally {
        btnUploadWidgetImg.disabled = false;
        btnUploadWidgetImg.textContent = '이미지 업로드';
      }
    });
  }

  const btnResetWidgetImg = layout.querySelector('#btn-reset-widget-img');
  if (btnResetWidgetImg) {
    btnResetWidgetImg.addEventListener('click', () => {
      config.widgetImageUrl = '';
      saveLiveConfig(liveId, config);
      
      const imgPreview = layout.querySelector('#widget-image-preview') || document.getElementById('widget-image-preview');
      const placeholder = layout.querySelector('#widget-image-placeholder') || document.getElementById('widget-image-placeholder');
      if (imgPreview && placeholder) {
        imgPreview.src = '';
        imgPreview.style.display = 'none';
        placeholder.style.display = 'block';
      }
      
      syncToSheetDB(liveId, config, stats, products, true);
    });
  }

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
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:18px; margin-bottom:18px;">
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
          <div class="file-upload-wrapper">
            <div style="width:40px; height:71px; border-radius:8px; overflow:hidden; border:2px solid #e2e8f0; flex-shrink:0; position:relative; background:#f8fafc; display:flex; align-items:center; justify-content:center;">
              <img id="standby-image-preview" src="${(() => {
                const ytId = extractYouTubeId(config.standbyImageUrl || '');
                return ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : (config.standbyImageUrl || '');
              })()}" style="width:100%; height:100%; object-fit:cover; display:${config.standbyImageUrl ? 'block' : 'none'};">
              <span id="standby-image-placeholder" style="font-size:11px; font-weight:700; color:#94a3b8; display:${config.standbyImageUrl ? 'none' : 'block'};">예비</span>
              <span id="standby-yt-badge" style="position:absolute; bottom:3px; left:3px; background:#ef4444; color:#fff; font-size:8px; font-weight:800; padding:1px 3px; border-radius:3px; display:${extractYouTubeId(config.standbyImageUrl || '') ? 'block' : 'none'};">YT</span>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                <label class="modern-label" style="margin:0;">예비 썸네일 (반복영상/이미지)</label>
                <input type="checkbox" id="cfg-useStandbyImage" style="width:15px; height:15px; accent-color:#3b82f6; cursor:pointer;" ${config.useStandbyImage ? 'checked' : ''} title="예비 썸네일 송출 ON/OFF">
                <span id="cfg-useStandbyImage-label" style="font-size:11px; font-weight:700; color:${config.useStandbyImage ? '#2563eb' : '#94a3b8'};">${config.useStandbyImage ? 'ON' : 'OFF'}</span>
              </div>
              <div style="display:flex; gap:4px; flex-wrap:wrap;">
                <label class="file-upload-btn" style="margin:0; padding:5px 9px; font-size:11px;" for="cfg-standbyImageFile">이미지</label>
                <button type="button" id="btn-standby-youtube" class="action-btn btn-neutral" style="padding:4px 8px; font-size:11px; height:28px; border-color:#e2e8f0; background:#fff; color:#2563eb; font-weight:700;">유튜브 URL</button>
                <button type="button" id="btn-clear-standby-image" class="action-btn btn-neutral" style="padding:4px 6px; font-size:11px; height:28px; border-color:#fee2e2; background:#fff5f5; color:#ef4444; display:${config.standbyImageUrl ? 'block' : 'none'};">삭제</button>
              </div>
              <input type="file" id="cfg-standbyImageFile" accept="image/*" style="display:none;">
            </div>
          </div>
          <div class="file-upload-wrapper">
            <div style="width:56px; height:56px; border-radius:8px; overflow:hidden; border:2px solid #e2e8f0; flex-shrink:0; position:relative; background:#f8fafc; display:flex; align-items:center; justify-content:center;">
              <img id="like-preview" src="${config.likeImageUrl || ''}" style="width:100%; height:100%; object-fit:contain; display:${config.likeImageUrl ? 'block' : 'none'};">
              <span id="like-preview-placeholder" style="font-size:24px; display:${config.likeImageUrl ? 'none' : 'block'};">❤️</span>
            </div>
            <div>
              <label class="modern-label">응원콘 (GIF/PNG)</label>
              <div style="display:flex; gap:6px;">
                <label class="file-upload-btn" style="margin:0;" for="cfg-likeFile">업로드</label>
                <button id="btn-clear-like-icon" class="action-btn btn-neutral" style="padding:4px 8px; font-size:11px; height:28px; border-color:#fee2e2; background:#fff5f5; color:#ef4444; display:${config.likeImageUrl ? 'block' : 'none'};">삭제</button>
              </div>
              <input type="file" id="cfg-likeFile" accept="image/gif, image/png, image/jpeg, image/webp" style="display:none;">
            </div>
          </div>
        </div>
        <div>
          <label class="modern-label">스트리밍 URL (m3u8)</label>
          <input type="text" class="modern-input" id="cfg-stream" value="${config.streamUrl || ''}">
        </div>
      </div>

      <div class="section-card">
        <h3>통계</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:18px;">
          <div>
            <label class="modern-label">총 시청자 수 (사용자 화면 노출 기준)</label>
            <div style="display:flex; gap:6px; align-items:center;">
              <div class="modern-input" id="cfg-viewers-display" style="background:#f1f5f9; font-weight:700; color:#0f172a; flex:1; display:flex; align-items:center;">${(stats.viewers + (stats.cumViewers || 0)).toLocaleString()}명 <span style="font-size:11px; font-weight:normal; color:#64748b; margin-left:4px;">(방송+수동: ${stats.viewers.toLocaleString()}, 누적: ${(stats.cumViewers || 0).toLocaleString()})</span></div>
            </div>
            ${isLiveStreamOnly ? '' : `
            <div style="display:flex; gap:6px; margin-top:6px; align-items:center;">
              <input type="number" class="modern-input" id="cfg-viewers-add" placeholder="+추가할 수" style="flex:1; padding:8px 10px; font-size:13px;">
              <button id="btn-add-viewers" class="action-btn btn-primary-solid" style="white-space:nowrap; padding:8px 12px; font-size:13px;">+추가</button>
            </div>
            `}
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
              ${(Array.isArray(products) ? products : []).reduce((acc, curr) => acc + (parseInt(curr.clicks) || 0), 0).toLocaleString()}회
            </div>
          </div>
        </div>
        <div style="margin-top:18px; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" id="cfg-showViewers" style="width:18px; height:18px; accent-color:#3b82f6;" ${config.showViewers ? 'checked' : ''}>
            <label for="cfg-showViewers" style="font-size:14px; font-weight:600; color:#374151; cursor:pointer;">시청자 수 노출</label>
          </div>
          <div style="display:flex; align-items:center; gap:8px; margin-left:16px;">
            <input type="checkbox" id="cfg-showSplash" style="width:18px; height:18px; accent-color:#3b82f6;" ${config.showSplash !== false ? 'checked' : ''}>
            <label for="cfg-showSplash" style="font-size:14px; font-weight:600; color:#374151; cursor:pointer;">스플래시 화면 켜기</label>
          </div>
          <div style="flex:1;"></div>
          ${isLiveStreamOnly ? '' : `
          <button id="btn-reset-stats" class="action-btn btn-danger-solid" style="padding:8px 14px; font-size:13px;">통계 초기화</button>
          `}
        </div>
      </div>

      <div class="section-card" id="notice-memo-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="margin:0; border:none; padding:0;">포스트잇 공지 메모장 설정</h3>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" id="cfg-showNoticeNote" style="width:16px; height:16px; accent-color:#3b82f6; cursor:pointer;" ${config.showNoticeNote !== false ? 'checked' : ''}>
            <label for="cfg-showNoticeNote" style="font-size:13px; font-weight:700; color:#0f172a; cursor:pointer;">메모장 노출 (ON)</label>
          </div>
        </div>
        <p style="margin:0 0 16px 0; font-size:12px; color:#64748b; line-height:1.5;">라이브 시청 화면에 노란색 포스트잇(메모장) 형태로 공지사항을 노출합니다. 시청자가 클릭하면 부드럽게 커지면서 긴 공지 내용도 스크롤하여 확인할 수 있습니다.</p>
        
        <div style="display:grid; grid-template-columns: 240px 1fr; gap:16px;">
          <div>
            <label class="modern-label">메모장 제목 (요약 문구)</label>
            <input type="text" class="modern-input" id="cfg-noticeNoteTitle" value="${config.noticeNoteTitle || 'Show Notes'}" placeholder="예: Show Notes 또는 방송 공지">
            <div style="font-size:11px; color:#94a3b8; margin-top:4px;">축소 상태 및 상단에 노출되는 제목입니다.</div>
          </div>
          <div>
            <label class="modern-label">공지 내용 (펼침 시 스크롤 표시)</label>
            <textarea class="modern-input" id="cfg-noticeNoteContent" style="height:90px; resize:vertical; padding:10px 14px; font-size:13px; line-height:1.5;" placeholder="방송 중 안내할 공지사항이나 이벤트 참여 방법, 배송 일정 등을 입력하세요.">${config.noticeNoteContent || '방송 공지사항\n\n* 방송 중 특가 혜택이 적용됩니다.\n* 실시간 채팅 및 라이브 이벤트에 참여해보세요!\n* 공지 내용은 관리자 페이지에서 실시간으로 수정하실 수 있습니다.'}</textarea>
          </div>
        </div>
      </div>

      <div class="section-card" id="share-og-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <h3 style="margin:0; border:none; padding:0;">임베드 관리</h3>
          <div style="display:flex; gap:8px;">
            <button id="btn-preview-og" class="action-btn btn-neutral" style="padding:6px 12px; font-size:11px; font-weight:700;">링크 테스트</button>
            <button id="btn-kakao-cache" class="action-btn btn-neutral" style="padding:6px 12px; font-size:11px; font-weight:700;">카카오 캐시 초기화</button>
          </div>
        </div>
        <p style="margin:0 0 20px 0; font-size:12px; color:#64748b; line-height:1.5;">카카오톡·슬랙·라인 등 SNS에서 링크를 공유할 때 나타나는 미리보기 카드를 커스텀합니다. 설정 후 반드시 <strong>[설정 저장]</strong>을 눌러주세요.</p>

        <div style="display:flex; gap:24px; align-items:flex-start;">
          <!-- 입력 영역 -->
          <div style="flex:1; display:flex; flex-direction:column; gap:14px;">
            <div>
              <label class="modern-label">공유 제목 (Title)</label>
              <input type="text" class="modern-input" id="cfg-shareTitle" value="${config.shareTitle || ''}" placeholder="예: 🔴 지금 라이브 중! 단하루 특가">
            </div>
            <div>
              <label class="modern-label">공유 설명 (Description)</label>
              <textarea class="modern-input" id="cfg-shareDesc" style="height:60px; resize:none; padding:10px 14px;" placeholder="예: 지금 입장하면 추가 5% 할인! 재고 소진 임박">${config.shareDesc || ''}</textarea>
            </div>
            <div>
              <label class="modern-label">공유 대표 이미지 (1200×630 권장)</label>
              <div style="display:flex; align-items:center; gap:12px;">
                <div id="og-img-wrap" style="width:80px; height:56px; border-radius:8px; overflow:hidden; border:1.5px solid #e2e8f0; flex-shrink:0; background:#f8fafc; cursor:pointer; position:relative;" onclick="document.getElementById('cfg-shareImageFile').click()">
                  <img id="share-image-preview" src="${config.shareImageUrl || ''}" style="width:100%; height:100%; object-fit:cover; display:${config.shareImageUrl ? 'block' : 'none'};">
                  <div id="og-img-placeholder" style="display:${config.shareImageUrl ? 'none' : 'flex'}; align-items:center; justify-content:center; height:100%; font-size:22px; color:#cbd5e1;">🖼</div>
                </div>
                <div>
                  <label class="file-upload-btn" for="cfg-shareImageFile" style="display:inline-flex; margin-bottom:6px;">이미지 업로드</label>
                  <input type="file" id="cfg-shareImageFile" accept="image/*" style="display:none;">
                  <div style="font-size:10px; color:#94a3b8;">JPG/PNG, 최소 200×200px<br>미등록 시 방송 썸네일 자동 사용</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 카카오톡 스타일 미리보기 카드 -->
          <div style="width:220px; flex-shrink:0;">
            <div style="font-size:10px; font-weight:700; color:#94a3b8; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:8px;">미리보기</div>
            <div style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.1); border:1px solid #e2e8f0;">
              <div id="og-preview-img-wrap" style="width:100%; height:116px; background:#f1f5f9; overflow:hidden; position:relative;">
                <img id="og-preview-img" src="${config.shareImageUrl || ''}" style="width:100%; height:100%; object-fit:cover; display:${config.shareImageUrl ? 'block' : 'none'};">
                <div id="og-preview-img-placeholder" style="display:${config.shareImageUrl ? 'none' : 'flex'}; align-items:center; justify-content:center; height:100%; font-size:32px; color:#cbd5e1;">🖼</div>
              </div>
              <div style="padding:10px 12px;">
                <div id="og-preview-title" style="font-size:13px; font-weight:700; color:#0f172a; line-height:1.3; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${config.shareTitle || '공유 제목을 입력하세요'}</div>
                <div id="og-preview-desc" style="font-size:11px; color:#64748b; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${config.shareDesc || '공유 설명을 입력하세요'}</div>
                <div style="font-size:10px; color:#94a3b8; margin-top:6px;">ryzincorp.com</div>
              </div>
            </div>
            <div style="margin-top:8px; padding:8px; background:#fefce8; border:1px solid #fde68a; border-radius:8px; font-size:10px; color:#713f12; line-height:1.5;">
              💡 <strong>이미지 변경 후</strong> 카카오가 이전 이미지를 계속 보여주면 <strong>[카카오 캐시 초기화]</strong> 버튼을 눌러주세요.
        </div>
          </div>
        </div>
      </div>

      <!-- ImgBB API Key 설정 -->
      <div style="background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:14px 16px; display:flex; align-items:center; gap:10px; margin-top: 10px;">
        <span style="font-size:18px;">🖼️</span>
        <div style="flex:1;">
          <div style="font-size:12px; font-weight:700; color:#374151; margin-bottom:4px;">ImgBB API Key (이미지 업로드용)</div>
          <div style="font-size:10px; color:#94a3b8;"><a href="https://api.imgbb.com/" target="_blank" style="color:#2563eb; text-decoration:underline; font-weight: 600;">여기</a>에서 무료로 발급받아 입력하시면 안정적인 이미지 업로드가 가능합니다.</div>
        </div>
        <input type="password" id="cfg-imgbb-key" placeholder="API Key 입력" value="${localStorage.getItem('ryzin_imgbb_key') || ''}" style="width:180px; padding:8px 10px; border:1.5px solid #e2e8f0; border-radius:8px; font-size:12px; font-family:monospace; outline:none; background:#fff;">
      </div>


      <div style="display:flex; gap:12px;">
        <button id="btn-save-config" class="action-btn btn-primary-solid" style="flex:1; justify-content:center; padding:14px; font-size:15px;">설정 저장</button>
        <button id="btn-toggle-live" class="action-btn ${config.isLive ? 'btn-danger-solid' : 'btn-success-solid'}" style="flex:1; justify-content:center; padding:14px; font-size:15px;">
          ${config.isLive ? '라이브 종료' : '라이브 시작'}
        </button>
      </div>
    `;


    // 코드 복사 버튼 이벤트
    const btnCopyCode = document.getElementById('btn-copy-widget-code');
    if (btnCopyCode) {
      btnCopyCode.addEventListener('click', () => {
        const codeInput = document.getElementById('cfg-widget-code');
        if (codeInput) {
          navigator.clipboard.writeText(codeInput.value).then(() => {
            const orig = btnCopyCode.textContent;
            btnCopyCode.textContent = '복사 완료!';
            btnCopyCode.style.background = '#16a34a';
            setTimeout(() => {
              btnCopyCode.textContent = orig;
              btnCopyCode.style.background = '#2563eb';
            }, 2000);
          });
        }
      });
    }

    // 이벤트
    document.getElementById('btn-save-config').addEventListener('click', async () => {
      const saveBtn = document.getElementById('btn-save-config');
      saveBtn.disabled = true;
      saveBtn.textContent = '저장 중...';

      
      // ImgBB API Key 저장
      const imgbbKey = document.getElementById('cfg-imgbb-key').value.trim();
      localStorage.setItem('ryzin_imgbb_key', imgbbKey);

      config.brandName = document.getElementById('cfg-brandName').value;
      config.title = document.getElementById('cfg-title').value;
      config.streamUrl = document.getElementById('cfg-stream').value;
      config.liveStartTime = document.getElementById('cfg-liveStartTime').value;
      stats.cumViewers = parseInt(document.getElementById('cfg-cumViewers').value) || 0;
      stats.hearts = parseInt(document.getElementById('cfg-hearts').value) || 0;
      config.showViewers = document.getElementById('cfg-showViewers').checked;
      config.showSplash = document.getElementById('cfg-showSplash').checked;
      const useStandbyCb = document.getElementById('cfg-useStandbyImage');
      if (useStandbyCb) {
        config.useStandbyImage = useStandbyCb.checked;
      }
      config.shareTitle = document.getElementById('cfg-shareTitle').value;
      config.shareDesc = document.getElementById('cfg-shareDesc').value;

      const noticeNoteCb = document.getElementById('cfg-showNoticeNote');
      if (noticeNoteCb) {
        config.showNoticeNote = noticeNoteCb.checked;
      }
      const noticeNoteTitleInput = document.getElementById('cfg-noticeNoteTitle');
      if (noticeNoteTitleInput) {
        config.noticeNoteTitle = noticeNoteTitleInput.value;
      }
      const noticeNoteContentInput = document.getElementById('cfg-noticeNoteContent');
      if (noticeNoteContentInput) {
        config.noticeNoteContent = noticeNoteContentInput.value;
      }

      saveConfig();
      saveStats();
      syncToSheetDB(liveId, config, stats, products, true);
      topBar.querySelector('span[style*="font-weight:700; color:#0f172a"]').textContent = config.brandName;

      saveBtn.disabled = false;
      saveBtn.textContent = '설정 저장';
      alert('설정 저장 완료');
    });


    // ── OG 미리보기 실시간 업데이트 ──
    const ogPreviewTitle = document.getElementById('og-preview-title');
    const ogPreviewDesc = document.getElementById('og-preview-desc');
    const ogPreviewImg = document.getElementById('og-preview-img');
    const ogPreviewImgPh = document.getElementById('og-preview-img-placeholder');
    const shareTitleInput = document.getElementById('cfg-shareTitle');
    const shareDescInput = document.getElementById('cfg-shareDesc');

    if (shareTitleInput && ogPreviewTitle) {
      shareTitleInput.addEventListener('input', () => {
        ogPreviewTitle.textContent = shareTitleInput.value || '공유 제목을 입력하세요';
      });
    }
    if (shareDescInput && ogPreviewDesc) {
      shareDescInput.addEventListener('input', () => {
        ogPreviewDesc.textContent = shareDescInput.value || '공유 설명을 입력하세요';
      });
    }

    // ── 카카오 캐시 초기화 버튼 ──
    const kakaoShareUrl = `https://ryzincorp.com/live/${liveId}`;
    const kakaoCacheBtn = document.getElementById('btn-kakao-cache');
    if (kakaoCacheBtn) {
      kakaoCacheBtn.addEventListener('click', () => {
        // 카카오 공유 링크 미리보기 캐시 초기화 도구
        const cacheUrl = `https://developers.kakao.com/tool/clear/og?url=${encodeURIComponent(kakaoShareUrl)}`;
        window.open(cacheUrl, '_blank');
      });
    }

    // ── 링크 테스트 버튼 ──
    const previewOgBtn = document.getElementById('btn-preview-og');
    if (previewOgBtn) {
      previewOgBtn.addEventListener('click', () => {
        const testUrl = `https://ryzincorp.com/live/${liveId}`;
        window.open(testUrl, '_blank');
      });
    }

    // +추가 버튼: Supabase에서 현재 시청자수를 조회 후 입력값만큼 더해서 UPDATE
    document.getElementById('btn-add-viewers')?.addEventListener('click', async () => {
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
        if (typeof window.updateAdminViewersDisplay === 'function') window.updateAdminViewersDisplay();
        document.getElementById('cfg-viewers-add').value = '';
        alert(`시청자 수가 ${newViewers.toLocaleString()}명으로 업데이트되었습니다.`);
      } catch (err) {
        alert('시청자 수 업데이트 실패: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.textContent = '+추가';
      }
    });

    // ── 통계 초기화 버튼 이벤트 리스너 ──
    const resetStatsBtn = document.getElementById('btn-reset-stats');
    if (resetStatsBtn) {
      resetStatsBtn.addEventListener('click', async () => {
        if (!confirm('현재 라이브의 모든 통계 데이터(실시간 시청자 수, 누적 시청자 수, 하트 수, 상품 클릭 수)를 초기화하시겠습니까?')) {
          return;
        }

        resetStatsBtn.disabled = true;
        resetStatsBtn.textContent = '초기화 중...';

        try {
          // 1. 로컬 데이터 초기화
          stats.viewers = 0;
          stats.hearts = 0;
          stats.cumViewers = 0;
          
          if (Array.isArray(products)) {
            products.forEach(p => {
              p.clicks = 0;
            });
          }

          saveStats();
          saveProducts();

          // 2. Supabase DB 업데이트
          if (db) {
            const { error } = await db
              .from('live_control')
              .update({
                viewers: 0,
                hearts: 0,
                cum_viewers: 0,
                products: products,
                updated_at: new Date().toISOString()
              })
              .eq('live_id', liveId);

            if (error) throw error;
          }

          // 3. UI 업데이트
          if (typeof window.updateAdminViewersDisplay === 'function') window.updateAdminViewersDisplay();

          const cumViewersInput = document.getElementById('cfg-cumViewers');
          if (cumViewersInput) cumViewersInput.value = 0;

          const heartsInput = document.getElementById('cfg-hearts');
          if (heartsInput) heartsInput.value = 0;

          const totalClicksDisplay = document.getElementById('cfg-total-clicks');
          if (totalClicksDisplay) totalClicksDisplay.textContent = '0회';

          alert('✅ 통계 데이터가 성공적으로 초기화되었습니다.');
        } catch (err) {
          console.error('통계 초기화 오류:', err);
          alert('❌ 통계 초기화에 실패했습니다: ' + err.message);
        } finally {
          resetStatsBtn.disabled = false;
          resetStatsBtn.textContent = '통계 초기화';
        }
      });
    }

    document.getElementById('btn-toggle-live').addEventListener('click', (e) => {
      const btn = e.currentTarget;
      // 라이브 시작 전 스트리밍 URL 필수 확인
      const currentStreamUrl = document.getElementById('cfg-stream').value.trim();
      if (!config.isLive && !currentStreamUrl) {
        alert('스트리밍 URL을 먼저 입력해주세요.\n설정을 저장한 후 라이브를 시작할 수 있습니다.');
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
      if (config.isLive) {
        // 실제 라이브 시작 버튼을 누른 바로 그 시점의 타임스탬프를 DB에 영구 고정 저장
        config.liveStartTime = new Date().toISOString();
        const startTextEl = document.getElementById('cfg-liveStartTime');
        if (startTextEl) {
          const localISO = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
          startTextEl.value = localISO;
        }
      }
      btn.textContent = config.isLive ? '라이브 종료' : '라이브 시작';
      btn.className = `action-btn ${config.isLive ? 'btn-danger-solid' : 'btn-success-solid'}`;
      btn.style.cssText = 'flex:1; justify-content:center; padding:14px; font-size:15px;';

      // 헤더 상태 배지 업데이트
      const badgeContainer = topBar.querySelector('div:nth-child(2)');
      if (badgeContainer) {
        const oldBadge = badgeContainer.querySelector('span:last-child');
        if (oldBadge && (oldBadge.textContent.includes('라이브 중') || oldBadge.textContent.includes('송출 대기'))) {
          if (config.isLive) {
            oldBadge.innerHTML = '<span style="width:5px; height:5px; background:#ef4444; border-radius:50%; display:inline-block;"></span>라이브 중';
            oldBadge.style.cssText = 'font-size:10px; font-weight:800; color:#ef4444; background:#fee2e2; border:1px solid #fecaca; padding:2px 6px; border-radius:4px; white-space:nowrap; height:16px; display:inline-flex; align-items:center; gap:4px;';
          } else {
            oldBadge.innerHTML = '송출 대기';
            oldBadge.style.cssText = 'font-size:10px; font-weight:800; color:#64748b; background:#f1f5f9; border:1px solid #e2e8f0; padding:2px 6px; border-radius:4px; white-space:nowrap; height:16px; display:inline-flex; align-items:center;';
          }
        }
      }

      // ON AIR 타이머 시작/정지
      if (config.isLive) {
        // 타이머 시작
        const timerWrapper = document.getElementById('onair-timer-wrapper');
        if (!timerWrapper) {
          // 타이머 요소가 없으면 topBar에 추가
          const timerDiv = document.createElement('div');
          timerDiv.id = 'onair-timer-wrapper';
          timerDiv.style.cssText = 'display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:#ef4444; background:#fef2f2; padding:4px 10px; border-radius:6px; border:1px solid #fecaca; white-space:nowrap;';
          timerDiv.innerHTML = '<div style="width:6px; height:6px; background:#ef4444; border-radius:50%; box-shadow:0 0 0 2px #fee2e2;"></div> 방송 중 <span id="onair-timer-text" style="font-family:monospace; margin-left:2px; letter-spacing:0.02em;">00:00:00</span>';
          topBar.appendChild(timerDiv);
        }
        const baseTime = new Date(config.liveStartTime).getTime();
        cleanUpOnAirTimer();
        const timerText = document.getElementById('onair-timer-text');
        if (timerText) {
          const updateTimer = () => {
            const elapsed = Date.now() - baseTime;
            const h = Math.floor(elapsed / 3600000);
            const m = Math.floor((elapsed % 3600000) / 60000);
            const s = Math.floor((elapsed % 60000) / 1000);
            timerText.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
          };
          updateTimer();
          onAirTimerInterval = setInterval(updateTimer, 1000);
        }
      } else {
        // 타이머 정지 및 제거
        cleanUpOnAirTimer();
        const timerWrapper = document.getElementById('onair-timer-wrapper');
        if (timerWrapper) timerWrapper.remove();
      }

      saveConfig();
      syncToSheetDB(liveId, config, stats, products, true);
    });

    const uploadImage = async (file, previewId, configKey) => {
      if (!file) return;
      document.getElementById(previewId).style.opacity = '0.5';
      try {
        const isLogo = configKey === 'logoUrl';
        const maxWidth = isLogo ? 256 : 1080;
        const maxHeight = isLogo ? 256 : 1920;
        const quality = isLogo ? 0.88 : 0.82;
        const base64 = await compressImage(file, maxWidth, maxHeight, quality);

        const url = await uploadToImgBB(base64);
        config[configKey] = url;
        const prevEl = document.getElementById(previewId);
        prevEl.src = url;
        prevEl.style.display = 'block';

        // 공유 이미지 업로드 시 OG 미리보기 카드도 즉시 반영
        if (configKey === 'shareImageUrl') {
          const ogImg = document.getElementById('og-preview-img');
          const ogImgPh = document.getElementById('og-preview-img-placeholder');
          const ogThumb = document.getElementById('og-img-placeholder');
          if (ogImg) { ogImg.src = url; ogImg.style.display = 'block'; }
          if (ogImgPh) ogImgPh.style.display = 'none';
          if (ogThumb) ogThumb.style.display = 'none';
        } else if (configKey === 'standbyImageUrl') {
          config.useStandbyImage = true;
          const useCb = document.getElementById('cfg-useStandbyImage');
          if (useCb) useCb.checked = true;
          const lbl = document.getElementById('cfg-useStandbyImage-label');
          if (lbl) {
            lbl.textContent = 'ON';
            lbl.style.color = '#2563eb';
          }
          const ph = document.getElementById('standby-image-placeholder');
          if (ph) ph.style.display = 'none';
          const clearBtn = document.getElementById('btn-clear-standby-image');
          if (clearBtn) clearBtn.style.display = 'block';
        }
        saveConfig();
        syncToSheetDB(liveId, config, stats, products, true);
      } catch (err) {
        console.error('이미지 업로드 오류:', err);
        alert('이미지 업로드 실패: ' + err.message);
      } finally {
        document.getElementById(previewId).style.opacity = '1';
      }
    };

    const uploadLikeImage = async (file) => {
      if (!file) return;
      const preview = document.getElementById('like-preview');
      const placeholder = document.getElementById('like-preview-placeholder');
      const clearBtn = document.getElementById('btn-clear-like-icon');
      
      preview.style.opacity = '0.5';
      try {
        let base64 = '';
        if (file.size < 1.2 * 1024 * 1024) {
          base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result.split(',')[1]);
            reader.readAsDataURL(file);
          });
        } else {
          base64 = await compressImage(file, 512, 512, 0.9);
        }

        const url = await uploadToImgBB(base64);
        config.likeImageUrl = url;
        preview.src = url;
        preview.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
        if (clearBtn) clearBtn.style.display = 'block';
        saveConfig();
      } catch (err) {
        console.error('응원 이미지 업로드 오류:', err);
        alert('응원 이미지 업로드 실패: ' + err.message);
      } finally {
        preview.style.opacity = '1';
      }
    };

    document.getElementById('cfg-logoFile').addEventListener('change', (e) => uploadImage(e.target.files[0], 'logo-preview', 'logoUrl'));
    document.getElementById('cfg-thumbnailFile').addEventListener('change', (e) => uploadImage(e.target.files[0], 'thumbnail-preview', 'thumbnailUrl'));
    document.getElementById('cfg-shareImageFile').addEventListener('change', (e) => uploadImage(e.target.files[0], 'share-image-preview', 'shareImageUrl'));
    document.getElementById('cfg-likeFile').addEventListener('change', (e) => uploadLikeImage(e.target.files[0]));
    document.getElementById('cfg-standbyImageFile').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      await uploadImage(file, 'standby-image-preview', 'standbyImageUrl');
      config.useStandbyImage = true;
      saveConfig();
      const useCb = document.getElementById('cfg-useStandbyImage');
      if (useCb) useCb.checked = true;
      const lbl = document.getElementById('cfg-useStandbyImage-label');
      if (lbl) {
        lbl.textContent = 'ON';
        lbl.style.color = '#2563eb';
      }
      const ph = document.getElementById('standby-image-placeholder');
      if (ph) ph.style.display = 'none';
      const clearBtn = document.getElementById('btn-clear-standby-image');
      if (clearBtn) clearBtn.style.display = 'block';
    });

    const btnStandbyYt = document.getElementById('btn-standby-youtube');
    if (btnStandbyYt) {
      btnStandbyYt.addEventListener('click', () => {
        const curYt = extractYouTubeId(config.standbyImageUrl || '') ? config.standbyImageUrl : '';
        const url = prompt('예비 썸네일로 무한 반복 재생할 유튜브 주소를 입력해주세요:\n(예: https://youtu.be/... 또는 https://www.youtube.com/watch?v=...)', curYt);
        if (url === null) return;
        const trimmed = url.trim();
        if (!trimmed) {
          alert('유튜브 영상 주소를 입력해주세요.');
          return;
        }
        const ytId = extractYouTubeId(trimmed);
        if (!ytId) {
          alert('올바른 유튜브 주소 형식이 아닙니다.\n(예: https://youtu.be/xxxx 또는 https://www.youtube.com/watch?v=xxxx)');
          return;
        }
        config.standbyImageUrl = trimmed;
        config.useStandbyImage = true;
        saveConfig();
        syncToSheetDB(liveId, config, stats, products, true);
        renderConfigTab();
        alert('유튜브 영상이 예비 썸네일(컨트롤러 숨김/반복재생)로 등록되었습니다.');
      });
    }

    const btnClearStandby = document.getElementById('btn-clear-standby-image');
    if (btnClearStandby) {
      btnClearStandby.addEventListener('click', () => {
        config.standbyImageUrl = '';
        config.useStandbyImage = false;
        saveConfig();
        renderConfigTab();
      });
    }

    const useStandbyCheckbox = document.getElementById('cfg-useStandbyImage');
    if (useStandbyCheckbox) {
      useStandbyCheckbox.addEventListener('change', (e) => {
        config.useStandbyImage = e.target.checked;
        saveConfig();
        const lbl = document.getElementById('cfg-useStandbyImage-label');
        if (lbl) {
          lbl.textContent = config.useStandbyImage ? 'ON' : 'OFF';
          lbl.style.color = config.useStandbyImage ? '#2563eb' : '#94a3b8';
        }
        const prevIframe = document.getElementById('live-preview-iframe');
        if (prevIframe) prevIframe.src = previewUrl + '?t=' + Date.now();
      });
    }

    // 응원 이미지 삭제 버튼 바인딩
    document.getElementById('btn-clear-like-icon').addEventListener('click', () => {
      config.likeImageUrl = '';
      const preview = document.getElementById('like-preview');
      const placeholder = document.getElementById('like-preview-placeholder');
      const clearBtn = document.getElementById('btn-clear-like-icon');
      
      if (preview) {
        preview.src = '';
        preview.style.display = 'none';
      }
      if (placeholder) placeholder.style.display = 'block';
      if (clearBtn) clearBtn.style.display = 'none';
      saveConfig();
    });

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
      <!-- 서브 탭 네비게이션 -->
      <div style="display:flex; gap:8px; margin-bottom:16px; background:#f1f5f9; padding:4px; border-radius:10px;">
        <button class="chat-sub-tab-btn active" data-subtab="admin" style="flex:1; padding:8px 0; font-size:13px; font-weight:700; border:none; background:#fff; color:#0f172a; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">관리자 채팅 & 정책</button>
        ${isLiveStreamOnly ? '' : `
        <button class="chat-sub-tab-btn" data-subtab="bot" style="flex:1; padding:8px 0; font-size:13px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:8px; cursor:pointer;">채팅 봇 관리</button>
        `}
        <button class="chat-sub-tab-btn" data-subtab="event" style="flex:1; padding:8px 0; font-size:13px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:8px; cursor:pointer;">이벤트 관리</button>
      </div>

      <!-- 관리자 채팅 & 정책 뷰 -->
      <div id="chat-sub-admin" class="chat-sub-view">
        <div class="section-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9;">
          <h3 style="margin:0; border:none; padding:0;">관리자 채팅 발송</h3>
          <div style="display:flex; gap:8px;">
            <button id="btn-download-chats" class="action-btn btn-neutral" style="padding:6px 12px; font-size:12px;">채팅 다운로드</button>
            <button id="btn-clear-chats" class="action-btn btn-neutral" style="padding:6px 12px; font-size:12px; color:#ef4444; border-color:#fee2e2; background:#fff5f5;">채팅 내역 초기화</button>
          </div>
        </div>
        
        <!-- 관리자 닉네임 / 컬러 및 고객 전송용 입금 계좌 설정 영역 -->
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px; background:#f8fafc; padding:12px 16px; border-radius:10px; border:1px solid #e2e8f0;">
          <div style="display:flex; gap:16px; align-items:flex-end; flex-wrap:wrap;">
            <div style="flex:1; min-width:180px;">
              <label style="font-size:11px; font-weight:700; color:#64748b; display:block; margin-bottom:4px;">관리자 닉네임</label>
              <input type="text" id="admin-nickname-input" class="modern-input" value="${localStorage.getItem('ryzin_admin_nickname') || '관리자'}" placeholder="관리자 닉네임..." style="padding:8px 12px; font-size:13px; height:36px; box-sizing:border-box;">
            </div>
            <div style="width:110px;">
              <label style="font-size:11px; font-weight:700; color:#64748b; display:block; margin-bottom:4px;">닉네임 컬러</label>
              <div style="display:flex; align-items:center; gap:6px;">
                <input type="color" id="admin-color-input" value="${localStorage.getItem('ryzin_admin_color') || '#ffca28'}" style="width:36px; height:36px; border:1px solid #cbd5e1; border-radius:6px; cursor:pointer; padding:0; background:none; box-sizing:border-box; flex-shrink:0;">
                <span id="admin-color-code" style="font-size:11px; font-family:monospace; font-weight:700; color:#475569;">${localStorage.getItem('ryzin_admin_color') || '#ffca28'}</span>
              </div>
            </div>
            <div style="width:110px;">
              <label style="font-size:11px; font-weight:700; color:#64748b; display:block; margin-bottom:4px;">말풍선 배경색</label>
              <div style="display:flex; align-items:center; gap:6px;">
                <input type="color" id="admin-bg-color-input" value="${localStorage.getItem('ryzin_admin_bg_color') || '#e50914'}" style="width:36px; height:36px; border:1px solid #cbd5e1; border-radius:6px; cursor:pointer; padding:0; background:none; box-sizing:border-box; flex-shrink:0;">
                <span id="admin-bg-color-code" style="font-size:11px; font-family:monospace; font-weight:700; color:#475569;">${localStorage.getItem('ryzin_admin_bg_color') || '#e50914'}</span>
              </div>
            </div>
          </div>
          <!-- 고객 전송용 입금 계좌번호 -->
          <div>
            <label style="font-size:11px; font-weight:700; color:#64748b; display:flex; justify-content:space-between; margin-bottom:4px;">
              <span>고객 전송용 입금 계좌번호 (채팅창에서 고객 클릭 시 전송)</span>
              <span style="font-weight:500; color:#94a3b8;">라이브 화면에 장바구니 주문서와 함께 알림</span>
            </label>
            <input type="text" id="admin-deposit-account-input" class="modern-input" value="${localStorage.getItem('ryzin_deposit_account') || '기업은행 010-3018-9716 (채이준)'}" placeholder="예: 기업은행 010-3018-9716 (채이준)" style="padding:8px 12px; font-size:13px; height:36px; box-sizing:border-box; width:100%;">
          </div>
        </div>

        <div id="admin-chat-list" style="height:200px; overflow-y:auto; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:16px; margin-bottom:16px; font-size:14px;">
          <div style="color:#94a3b8; text-align:center; padding-top:70px; font-weight:500;">
            <div style="font-size:24px; margin-bottom:8px;"></div>
            실시간 채팅 내역이 여기에 표시됩니다.
          </div>
        </div>
        <div style="display:flex; gap:10px;">
          <input type="text" id="admin-chat-input" class="modern-input" placeholder="시청자에게 공지할 내용을 입력하세요..." style="flex:1;">
          <button id="btn-send-chat" class="action-btn btn-primary-solid" style="white-space:nowrap;">전송</button>
        </div>
      </div>
        
        <!-- 채팅 정책 설정 (금칙어 및 차단) -->
        <div class="section-card" style="margin-top: 18px;">
          <h3 style="margin:0 0 4px 0; border:none; padding:0;">채팅 정책 설정</h3>
          <p style="margin:0 0 16px 0; font-size:12px; color:#64748b; line-height:1.5;">방송 중 채팅 금칙어를 설정하고, 차단된 사용자 목록을 관리할 수 있습니다. (입력 시 자동 저장)</p>
          
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:18px;">
            <div>
              <label class="modern-label">채팅 금칙어 (쉼표로 구분)</label>
              <textarea class="modern-input" id="cfg-bannedWords" style="height:80px; resize:none; padding:10px 14px; font-size:13px;" placeholder="예: 욕설,바보,비속어,광고">${config.bannedWords || ''}</textarea>
              <div style="font-size:10px; color:#94a3b8; margin-top:4px;">쉼표(,)로 구분해 입력해 주세요. 시청자가 전송 시 차단됩니다.</div>
            </div>
            <div>
              <label class="modern-label">차단된 시청자 닉네임 목록 (쉼표로 구분)</label>
              <textarea class="modern-input" id="cfg-bannedUsers" style="height:80px; resize:none; padding:10px 14px; font-size:13px;" placeholder="차단된 사용자가 없습니다.">${config.bannedUsers || ''}</textarea>
              <div style="font-size:10px; color:#94a3b8; margin-top:4px;">쉼표(,)로 구분하여 직접 추가하거나, 채팅방에서 바로 차단할 수 있습니다.</div>
            </div>
          </div>
        </div>

        <!-- 타사 사이트용 1줄 임베드 스크립트 복사 영역 (고정 사이즈 제약 없음) -->
        <div style="margin-top:20px; padding:14px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label style="font-size:12px; font-weight:700; color:#334155;">타사 웹사이트 외부 임베드 코드 (반응형 1줄 스크립트)</label>
            <button id="btn-copy-widget-code" class="action-btn btn-primary-solid" style="padding:4px 10px; font-size:11px; font-weight:700;">코드 복사</button>
          </div>
          <input type="text" readonly id="cfg-widget-code" value='<script src="https://ryzincorp.com/widget.js" data-live-id="${liveId}"></script>' style="width:100%; padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; font-size:11px; background:#fff; font-family:monospace; color:#0f172a; box-sizing:border-box;">
          <div style="font-size:10px; color:#64748b; margin-top:6px;">하드코딩 고정 사이즈 제약이 없는 자율 반응형 라이브 위젯 스크립트입니다. 타사 웹사이트 HTML 문서 하단에 붙여넣으시면 됩니다.</div>
        </div>
      </div>

      <!-- 채팅 봇 관리 뷰 -->
      ${isLiveStreamOnly ? '' : `
      <div id="chat-sub-bot" class="chat-sub-view" style="display:none;">
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
        
        <div class="section-card" style="margin-top:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9;">
            <h3 style="margin:0; border:none; padding:0;">키워드 자동응답 봇</h3>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:13px; font-weight:700;">
              <input type="checkbox" id="auto-reply-active" ${botCfg.autoReplyActive ? 'checked' : ''} style="width:16px; height:16px; accent-color:#3b82f6;"> 자동응답 활성화
            </label>
          </div>
          <p style="font-size:12px; color:#64748b; margin:0 0 16px 0; line-height:1.5;">시청자가 특정 키워드를 입력하면 '자동응답봇'이 설정된 답변을 실시간으로 즉시 발송합니다.</p>
          
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:16px;">
            <div style="display:flex; gap:10px; margin-bottom:10px;">
              <input type="text" id="ar-title" class="modern-input" placeholder="질문 (예: 얼마예요?)" style="flex:1; font-size:13px;">
              <input type="text" id="ar-keywords" class="modern-input" placeholder="감지 키워드 (쉼표 구분, 예: 가격,얼마,비용)" style="flex:2; font-size:13px;">
            </div>
            <div style="display:flex; gap:10px;">
              <input type="text" id="ar-answer" class="modern-input" placeholder="답변 내용 (예: 오늘 특가 39,900원입니다.)" style="flex:1; font-size:13px;">
              <button id="btn-add-ar" class="action-btn btn-primary-solid" style="white-space:nowrap;">추가하기</button>
            </div>
          </div>

          <div id="ar-list-container" style="display:flex; flex-direction:column; gap:8px;">
            <!-- 자동응답 규칙 목록 렌더링 -->
          </div>
        </div>
      </div>
      `}

      <!-- 이벤트 관리 뷰 -->
      <div id="chat-sub-event" class="chat-sub-view" style="display:none;">
      <!-- 소통왕/구매인증 당첨 배너 제어 (깜짝딜 방식) -->
      <div class="section-card">
        <h3 style="margin:0 0 8px 0; border:none; padding:0; display:flex; align-items:center; gap:6px;">
          <span>당첨 알림 배너 제어 (소통왕/구매인증)</span>
          ${config.winner_timestamp && Number(config.winner_timestamp) > Date.now() ? `<span style="font-size:11px; font-weight:700; background:#3b82f6; color:#fff; padding:2px 8px; border-radius:12px;">노출 진행중</span>` : ''}
        </h3>
        <p style="font-size:12px; color:#64748b; margin:0 0 14px 0; line-height:1.4;">
          당첨 종류(유형)를 선택하고 닉네임을 적은 뒤 노출 시간(분)을 입력하고 시작을 누르면 배너가 활성화됩니다.
        </p>
        
        <!-- 당첨 유형 세그먼트 스위치 그룹 -->
        <div style="display:flex; gap:10px; margin-bottom:14px; align-items:center;">
          <span style="font-size:13px; font-weight:700; color:#495057;">당첨 유형:</span>
          <div id="winner-type-segmented" style="display:inline-flex; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:10px; padding:3px; overflow:hidden; box-shadow:inset 0 2px 4px rgba(0,0,0,0.05);">
            <button type="button" class="type-segment-btn ${!config.winner_name || !config.winner_name.startsWith('구매인증') ? 'active' : ''}" data-type="소통왕" style="padding:6px 16px; border:none; border-radius:7px; font-size:12px; font-weight:700; cursor:pointer; outline:none; transition:all 0.15s; background:${!config.winner_name || !config.winner_name.startsWith('구매인증') ? '#3b82f6' : 'transparent'}; color:${!config.winner_name || !config.winner_name.startsWith('구매인증') ? '#fff' : '#64748b'};">소통왕</button>
            <button type="button" class="type-segment-btn ${config.winner_name && config.winner_name.startsWith('구매인증') ? 'active' : ''}" data-type="구매인증" style="padding:6px 16px; border:none; border-radius:7px; font-size:12px; font-weight:700; cursor:pointer; outline:none; transition:all 0.15s; background:${config.winner_name && config.winner_name.startsWith('구매인증') ? '#3b82f6' : 'transparent'}; color:${config.winner_name && config.winner_name.startsWith('구매인증') ? '#fff' : '#64748b'};">구매인증</button>
          </div>
        </div>

        <div style="display:flex; gap:8px; align-items:center;">
          <input type="text" class="modern-input" style="flex:2; padding:8px 12px; font-size:13px;" id="winner-announce-text" placeholder="당첨자 닉네임 입력 (예: 라이진)" value="${config.winner_name && config.winner_name.includes('|') ? config.winner_name.split('|')[1] : config.winner_name || ''}">
          <input type="number" class="modern-input" style="width:54px; padding:8px; font-size:13px;" id="winner-announce-min" placeholder="분" value="1">
          <button id="btn-winner-start" style="padding:8px 16px; background:#3b82f6; color:#fff; border:none; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer; white-space:nowrap;">시작</button>
          <button id="btn-winner-cancel" style="padding:8px 16px; background:#f1f5f9; color:#374151; border:1.5px solid #e2e8f0; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap;">종료</button>
        </div>
      </div>

      <!-- 실시간 당첨 정보 수집 현황판 -->
      <div class="section-card" style="margin-top: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid #f1f5f9; padding-bottom:12px; margin-bottom:16px;">
          <h3 style="margin:0; border:none; padding:0; display:flex; align-items:center; gap:6px;">
            <span>당첨 경품 배송 정보 현황판</span>
          </h3>
          <button id="btn-refresh-winners" class="action-btn btn-neutral" style="padding:6px 12px; font-size:12px; font-weight:700;">새로고침</button>
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:13px; text-align:left;">
            <thead>
              <tr style="border-bottom:2px solid #e2e8f0; color:#475569; font-weight:700;">
                <th style="padding:10px 12px;">닉네임</th>
                <th style="padding:10px 12px;">수령인</th>
                <th style="padding:10px 12px;">연락처</th>
                <th style="padding:10px 12px;">상세 배송 주소</th>
                <th style="padding:10px 12px; text-align:right;">제출시간</th>
              </tr>
            </thead>
            <tbody id="winner-table-body">
              <tr>
                <td colspan="5" style="text-align:center; padding:30px; color:#94a3b8; font-weight:500;">
                  당첨자 제출 목록을 불러오는 중...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    `;

    // ── 서브 탭 전환 이벤트 ──
    const subTabBtns = contentArea.querySelectorAll('.chat-sub-tab-btn');
    const subViews = contentArea.querySelectorAll('.chat-sub-view');
    subTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 버튼 스타일 초기화
        subTabBtns.forEach(b => {
          b.classList.remove('active');
          b.style.background = 'transparent';
          b.style.color = '#64748b';
          b.style.fontWeight = '600';
          b.style.boxShadow = 'none';
        });
        // 활성화 스타일
        btn.classList.add('active');
        btn.style.background = '#fff';
        btn.style.color = '#0f172a';
        btn.style.fontWeight = '700';
        btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

        // 뷰 전환
        subViews.forEach(v => v.style.display = 'none');
        const targetView = document.getElementById(`chat-sub-${btn.dataset.subtab}`);
        if (targetView) targetView.style.display = 'block';
      });
    });

    // ── 채팅 정책 설정 자동 저장 ──
    const bannedWordsInput = document.getElementById('cfg-bannedWords');
    const bannedUsersInput = document.getElementById('cfg-bannedUsers');
    const savePolicy = () => {
      config.bannedWords = bannedWordsInput.value.trim();
      config.bannedUsers = bannedUsersInput.value.trim();
      saveConfig();
    };
    if (bannedWordsInput) bannedWordsInput.addEventListener('change', savePolicy);
    if (bannedUsersInput) bannedUsersInput.addEventListener('change', savePolicy);

    // 관리자 채팅 전송
    const chatInput = document.getElementById('admin-chat-input');
    const chatList = document.getElementById('admin-chat-list');
    const nickInput = document.getElementById('admin-nickname-input');
    const colorInput = document.getElementById('admin-color-input');
    const colorCode = document.getElementById('admin-color-code');
    const bgColorInput = document.getElementById('admin-bg-color-input');
    const bgColorCode = document.getElementById('admin-bg-color-code');



    // 당첨자 경품 배송 주소 데이터 조회
    const fetchWinnersList = async () => {
      const tableBody = document.getElementById('winner-table-body');
      if (!tableBody) return;

      try {
        if (!db) return;
        const { data: list, error } = await db.from('live_winners')
          .select('*')
          .eq('live_id', liveId)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const filteredWinners = (list || []).filter(item => {
          if (!item.nickname) return true;
          return !item.nickname.startsWith('{"type":"order"') && !item.nickname.startsWith('{"type": "order"');
        });

        if (filteredWinners.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:#94a3b8;">당첨자 제출 목록이 없습니다.</td></tr>`;
          return;
        }

        tableBody.innerHTML = filteredWinners.map(item => {
          const dateStr = new Date(item.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          return `
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:10px 12px; font-weight:700; color:#0f172a;">${item.nickname}</td>
              <td style="padding:10px 12px; font-weight:600; color:#374151;">${item.name || '-'}</td>
              <td style="padding:10px 12px; font-family:monospace; color:#374151;">${item.phone || '-'}</td>
              <td style="padding:10px 12px; color:#475569; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${item.address || ''}">${item.address || ''}</td>
              <td style="padding:10px 12px; text-align:right; color:#94a3b8; font-size:11px;">${dateStr}</td>
            </tr>
          `;
        }).join('');
      } catch (err) {
        console.warn('Failed to fetch winners', err);
      }
    };

    document.getElementById('btn-refresh-winners')?.addEventListener('click', fetchWinnersList);
    fetchWinnersList();
    const winnersPollingInterval = setInterval(fetchWinnersList, 10000);

    if (nickInput) {
      nickInput.addEventListener('input', () => {
        localStorage.setItem('ryzin_admin_nickname', nickInput.value.trim());
      });
    }
    if (colorInput) {
      colorInput.addEventListener('input', () => {
        localStorage.setItem('ryzin_admin_color', colorInput.value);
        if (colorCode) colorCode.textContent = colorInput.value;
      });
    }
    if (bgColorInput) {
      bgColorInput.addEventListener('input', () => {
        localStorage.setItem('ryzin_admin_bg_color', bgColorInput.value);
        if (bgColorCode) bgColorCode.textContent = bgColorInput.value;
      });
    }
    const depositAccountInput = document.getElementById('admin-deposit-account-input');
    if (depositAccountInput) {
      depositAccountInput.addEventListener('input', () => {
        localStorage.setItem('ryzin_deposit_account', depositAccountInput.value.trim());
      });
    }

    let isSending = false;
    const sendAdminChat = async () => {
      const text = chatInput.value.trim();
      if (!text || isSending) return;
      isSending = true;

      const adminNick = (nickInput ? nickInput.value.trim() : '') || '관리자';
      const adminColor = colorInput ? colorInput.value : '#ffca28';
      const adminBg = bgColorInput ? bgColorInput.value : '#e50914';
      const dbNickname = `${adminNick}|${adminColor}|${adminBg}`;

      const msgId = Date.now();
      const div = document.createElement('div');
      div.style.cssText = `margin-bottom:8px; padding:8px 12px; border-radius:10px; background:${adminBg}22; border-left:4px solid ${adminColor}; display:flex; flex-direction:column; gap:2px;`;
      div.innerHTML = `<span style="font-weight:700; color:${adminColor}; font-size:12px;">${adminNick}</span><span style="font-size:13px; color:#1e293b;">${text}</span>`;
      
      if (chatList.innerHTML.includes('실시간 채팅')) chatList.innerHTML = '';
      chatList.appendChild(div);
      chatList.scrollTop = chatList.scrollHeight;
      chatInput.value = '';
      try {
        if (!db) return;
        await db.from('live_chats').insert([{
          live_id: liveId,
          created_at: msgId,
          nickname: dbNickname,
          content: text
        }]);
      } catch (e) { console.warn('Admin chat send failed', e); }
      finally { isSending = false; }
    };
    document.getElementById('btn-send-chat').addEventListener('click', sendAdminChat);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendAdminChat(); });

    // 채팅 다운로드
    const btnDownloadChats = document.getElementById('btn-download-chats');
    if (btnDownloadChats) {
      btnDownloadChats.addEventListener('click', async () => {
        if (!db) {
          alert('DB 연결이 유효하지 않습니다.');
          return;
        }
        const originalText = btnDownloadChats.textContent;
        btnDownloadChats.disabled = true;
        btnDownloadChats.textContent = '다운로드 중...';
        try {
          const { data: chats, error } = await db.from('live_chats')
            .select('*')
            .eq('live_id', liveId)
            .order('created_at', { ascending: true });
          
          if (error) throw error;
          if (!chats || chats.length === 0) {
            alert('백업할 채팅 내역이 없습니다.');
            return;
          }

          // CSV 변환 (BOM 추가로 엑셀 한글 깨짐 방지)
          const csvContent = '\uFEFF' + [
            ['작성시간', '닉네임', '내용'].join(','),
            ...chats.map(c => {
              const time = new Date(parseInt(c.created_at) || Date.now()).toLocaleString('ko-KR');
              let nickname = c.nickname || '';
              if (nickname.includes('|')) {
                nickname = nickname.split('|')[0];
              }
              const escapeCsv = (str) => `"${str.replace(/"/g, '""')}"`;
              return [
                escapeCsv(time),
                escapeCsv(nickname),
                escapeCsv(c.content || '')
              ].join(',');
            })
          ].join('\n');

          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          
          const now = new Date();
          const dateStr = now.getFullYear() + 
            String(now.getMonth() + 1).padStart(2, '0') + 
            String(now.getDate()).padStart(2, '0') + '_' +
            String(now.getHours()).padStart(2, '0') + 
            String(now.getMinutes()).padStart(2, '0') + 
            String(now.getSeconds()).padStart(2, '0');

          link.href = url;
          link.setAttribute('download', `ryzin_chats_${liveId}_${dateStr}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } catch (err) {
          console.error('채팅 다운로드 실패:', err);
          alert('채팅 다운로드에 실패했습니다: ' + err.message);
        } finally {
          btnDownloadChats.disabled = false;
          btnDownloadChats.textContent = originalText;
        }
      });
    }

    // 채팅 내역 초기화
    document.getElementById('btn-clear-chats').addEventListener('click', async () => {
      if (confirm('📡 이 라이브 방송의 모든 실시간 채팅 내역을 초기화(영구 삭제)하시겠습니까?\n이 작업은 복구할 수 없습니다.')) {
        const btn = document.getElementById('btn-clear-chats');
        btn.disabled = true;
        btn.textContent = '초기화 중...';
        try {
          if (!db) throw new Error('Supabase client가 로드되지 않았습니다.');
          const { error } = await db
            .from('live_chats')
            .delete()
            .eq('live_id', liveId);
          if (error) throw error;
          alert('채팅 내역이 성공적으로 초기화되었습니다!');
          chatList.innerHTML = `<div style="color:#94a3b8; text-align:center; padding-top:70px; font-weight:500;">
            <div style="font-size:24px; margin-bottom:8px;">💭</div>
            실시간 채팅 내역이 여기에 표시됩니다.
          </div>`;
        } catch (err) {
          alert('채팅 내역 초기화 실패: ' + err.message);
        } finally {
          btn.disabled = false;
          btn.textContent = '채팅 내역 초기화';
        }
      }
    });

    // 채팅 봇
    const botListEl = document.getElementById('bot-chat-list');
    const botIntervalEl = document.getElementById('bot-interval');
    botListEl?.addEventListener('input', () => { botCfg.list = botListEl.value; saveBotCfg(); });
    botIntervalEl?.addEventListener('input', () => { botCfg.interval = parseInt(botIntervalEl.value) || 10; saveBotCfg(); });

    // 초기 버튼 렌더링 상태 동기화
    const syncBotBtnState = () => {
      const icon = document.getElementById('bot-icon');
      const text = document.getElementById('bot-text');
      const btn = document.getElementById('btn-toggle-bot');
      if (!btn) return;
      if (botActive) {
        icon.textContent = '⏸';
        text.textContent = '채팅 봇 중지';
        btn.className = 'action-btn btn-danger-solid';
        btn.style.cssText = 'width:100%; justify-content:center; padding:14px; font-size:15px; gap:8px;';
      } else {
        icon.textContent = '▶';
        text.textContent = '채팅 봇 시작';
        btn.className = 'action-btn btn-primary-solid';
        btn.style.cssText = 'width:100%; justify-content:center; padding:14px; font-size:15px; gap:8px;';
      }
    };
    syncBotBtnState();

    document.getElementById('btn-toggle-bot')?.addEventListener('click', () => {
      botActive = !botActive;
      if (botActive) {
        botLines = botListEl.value.split('\n').map(l => l.trim()).filter(l => l.includes('|'));
        if (botLines.length === 0) { alert('닉네임|내용 형식으로 1줄 이상 입력해주세요.'); botActive = false; return; }
        
        // 일시정지 후 재시작 시, 마지막 위치부터 이어서 송출
        if (botLineIndex >= botLines.length) {
          botLineIndex = 0;
        }
        
        syncBotBtnState();
        
        const sec = parseInt(botIntervalEl.value) || 10;
        if (botTimer) clearInterval(botTimer);
        botTimer = setInterval(async () => {
          if (botLineIndex >= botLines.length) {
            clearInterval(botTimer);
            botTimer = null;
            botActive = false;
            syncBotBtnState();
            return;
          }
          const line = botLines[botLineIndex++];
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
        botTimer = null;
        syncBotBtnState();
      }
    });

    // ── 자동응답 봇 로직 ──
    const arActiveCheckbox = document.getElementById('auto-reply-active');
    const btnAddAr = document.getElementById('btn-add-ar');
    const arTitleInput = document.getElementById('ar-title');
    const arKeywordsInput = document.getElementById('ar-keywords');
    const arAnswerInput = document.getElementById('ar-answer');
    const arListContainer = document.getElementById('ar-list-container');

    const renderArRules = () => {
      if (!arListContainer) return;
      if (!botCfg.autoReplyRules || botCfg.autoReplyRules.length === 0) {
        arListContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#94a3b8; font-size:13px; font-weight:500;">등록된 자동응답 규칙이 없습니다.</div>';
        return;
      }
      arListContainer.innerHTML = botCfg.autoReplyRules.map((r, i) => `
        <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; padding:12px 14px; border:1px solid #cbd5e1; border-radius:8px; box-shadow:0 1px 2px rgba(0,0,0,0.02);">
          <div style="flex:1; overflow:hidden;">
            <div style="font-weight:700; font-size:14px; color:#0f172a; margin-bottom:6px;">${r.title || '규칙 ' + (i+1)}</div>
            <div style="font-size:12px; color:#64748b; margin-bottom:4px; line-height:1.4;"><span style="font-weight:700; color:#3b82f6;">키워드:</span> ${r.keywords}</div>
            <div style="font-size:12px; color:#475569; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; line-height:1.4;"><span style="font-weight:700; color:#10b981;">답변:</span> ${r.answer}</div>
          </div>
          <button class="btn-del-ar action-btn" data-index="${i}" style="background:#fef2f2; color:#ef4444; border:1px solid #fecaca; padding:6px 12px; font-size:12px; margin-left:12px; flex-shrink:0;">삭제</button>
        </div>
      `).join('');

      arListContainer.querySelectorAll('.btn-del-ar').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.index);
          botCfg.autoReplyRules.splice(idx, 1);
          saveBotCfg();
          renderArRules();
        });
      });
    };

    if (arActiveCheckbox) {
      arActiveCheckbox.addEventListener('change', (e) => {
        botCfg.autoReplyActive = e.target.checked;
        saveBotCfg();
      });
    }

    if (btnAddAr) {
      btnAddAr.addEventListener('click', () => {
        const title = arTitleInput.value.trim();
        const keywords = arKeywordsInput.value.trim();
        const answer = arAnswerInput.value.trim();
        if (!keywords || !answer) {
          alert('키워드와 답변 내용을 모두 입력해주세요.');
          return;
        }
        if (!botCfg.autoReplyRules) botCfg.autoReplyRules = [];
        botCfg.autoReplyRules.push({ title, keywords, answer });
        saveBotCfg();
        
        arTitleInput.value = '';
        arKeywordsInput.value = '';
        arAnswerInput.value = '';
        renderArRules();
      });
    }
    renderArRules();

    // === 어드민 채팅 실시간 감지 (이력 로드 및 Realtime 구독) ===
    let adminLastChatTime = 0;
    let adminChatLoaded = false;
    let chatChannel = null;

    // ── 고객 라이브 화면으로 주문서 및 입금 계좌 알림 전송 함수 ──
    const sendDirectOrderRequestToCustomer = async (targetNick) => {
      const accInput = document.getElementById('admin-deposit-account-input');
      const depositAccount = (accInput ? accInput.value.trim() : '') || localStorage.getItem('ryzin_deposit_account') || '기업은행 010-3018-9716 (채이준)';

      if (!confirm(`[${targetNick}] 고객님의 라이브 화면에\n담아놓은 장바구니 주문서와 입금 계좌를 띄우시겠습니까?\n\n입금 계좌: ${depositAccount}`)) {
        return;
      }

      const payload = {
        type: 'direct_order_request',
        targetNickname: targetNick,
        depositAccount: depositAccount,
        adminName: (document.getElementById('admin-nickname-input')?.value || '관리자').trim(),
        timestamp: Date.now()
      };

      try {
        // 1. live_chats 테이블에 시스템 전송 메시지 저장 (실시간 감지 트리거)
        if (db) {
          await db.from('live_chats').insert([{
            live_id: liveId,
            created_at: Date.now(),
            nickname: 'SYSTEM_DIRECT_ORDER_REQUEST',
            content: JSON.stringify(payload)
          }]);
        }

        // 2. Realtime Broadcast도 병행 송신
        if (chatChannel) {
          chatChannel.send({
            type: 'broadcast',
            event: 'direct_order_request',
            payload: payload
          });
        }

        // 3. 관리자 채팅창에 안내 메시지 표기
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = 'margin:6px 0; padding:6px 12px; background:#eff6ff; border-radius:6px; font-size:12px; color:#1d4ed8; font-weight:600; text-align:center; border:1px solid #bfdbfe;';
        infoDiv.textContent = `[${targetNick}] 고객님 라이브 화면에 주문서 & 입금 계좌 알림을 전송했습니다.`;
        chatList.appendChild(infoDiv);
        chatList.scrollTop = chatList.scrollHeight;

        alert(`[${targetNick}] 고객님의 라이브 화면으로 주문서 및 입금 계좌 알림을 성공적으로 전송했습니다!`);
      } catch (err) {
        alert('전송 중 오류가 발생했습니다: ' + err.message);
      }
    };

    const addAdminChatItem = (name, text, isHistory = false) => {
      // 시스템 주문서 요청 메시지는 일반 채팅 목록에 노출하지 않음
      if (!name || name === 'SYSTEM_DIRECT_ORDER_REQUEST' || name.startsWith('SYSTEM_') || (typeof text === 'string' && (text.startsWith('{"type":"direct_order_request"') || text.startsWith('{"type": "direct_order_request"')))) return;

      if (chatList.innerHTML.includes('실시간 채팅 내역이 여기에')) chatList.innerHTML = '';
      const div = document.createElement('div');
      div.style.cssText = 'margin-bottom:8px; padding:6px 0; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;' + (isHistory ? 'opacity:0.72;' : '');
      const nameColor = name === '관리자' || name.includes('|') ? '#3b82f6' : '#0f172a';
      
      let cleanName = name;
      let isAdmin = false;
      if (name.includes('|')) {
        cleanName = name.split('|')[0];
        isAdmin = true;
      } else if (name === '관리자') {
        isAdmin = true;
      }

      const isCustomer = (!isAdmin && cleanName !== '?' && cleanName !== 'SYSTEM');

      const actionBtnsHtml = isCustomer ? `
        <div style="display:inline-flex; align-items:center; gap:4px; margin-left:8px; flex-shrink:0;">
          <button class="btn-send-order-alert" data-nickname="${cleanName}" style="background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe; border-radius:5px; padding:3px 8px; font-size:11px; font-weight:700; cursor:pointer; line-height:1.4; transition:all 0.12s;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='#eff6ff'" title="클릭 시 [${cleanName}] 고객 화면에 주문서 & 계좌 팝업 알럿 전송">
            주문서&계좌 전송
          </button>
          <button class="btn-ban-user" data-nickname="${cleanName}" style="background:#fff5f5; color:#ef4444; border:1px solid #fee2e2; border-radius:5px; padding:3px 6px; font-size:11px; font-weight:600; cursor:pointer; line-height:1.4;">
            차단
          </button>
        </div>
      ` : '';

      div.innerHTML = `
        <div style="flex:1; min-width:0; word-break:break-all; font-size:13px; display:flex; align-items:baseline; flex-wrap:wrap; gap:4px;">
          ${isCustomer ? `
            <button type="button" class="btn-customer-name-click" data-nickname="${cleanName}" style="background:none; border:none; padding:0; font-weight:700; color:#0f172a; cursor:pointer; text-decoration:underline; text-decoration-color:#cbd5e1; text-underline-offset:2px; font-size:13px; transition:color 0.12s;" onmouseover="this.style.color='#2563eb'" onmouseout="this.style.color='#0f172a'" title="클릭 시 [${cleanName}] 고객 화면에 주문서 & 계좌 팝업 알럿 전송">
              ${cleanName}
            </button>:
          ` : `
            <span style="font-weight:700; color:${nameColor};">${cleanName}:</span>
          `}
          <span style="color:#1e293b;">${text}</span>
        </div>
        ${actionBtnsHtml}
      `;

      // 고객 닉네임 클릭 및 전송 버튼 이벤트 바인딩
      div.querySelectorAll('.btn-customer-name-click, .btn-send-order-alert').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetNick = btn.dataset.nickname;
          if (targetNick) sendDirectOrderRequestToCustomer(targetNick);
        });
      });

      const banBtn = div.querySelector('.btn-ban-user');
      if (banBtn) {
        banBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetNick = banBtn.dataset.nickname;
          if (confirm(`[${targetNick}] 시청자를 차단하시겠습니까?\n차단 이후에는 이 시청자의 채팅 전송이 제한됩니다.`)) {
            let bans = config.bannedUsers ? config.bannedUsers.split(',').map(u => u.trim()).filter(u => u) : [];
            if (!bans.includes(targetNick)) {
              bans.push(targetNick);
              config.bannedUsers = bans.join(',');
              saveConfig();
              syncToSheetDB(liveId, config, stats, products, true);
              alert(`[${targetNick}] 님이 정상 차단되었습니다.`);
              renderChatTab();
            }
          }
        });
      }

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
          .order('created_at', { ascending: false })
          .limit(300);

        if (error) throw error;
        if (chats && Array.isArray(chats)) {
          chats.reverse().forEach(c => {
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

    window.updateAdminViewersDisplay = () => {
      const viewerDisplayEl = document.getElementById('cfg-viewers-display');
      if (viewerDisplayEl) {
        viewerDisplayEl.innerHTML = `${(stats.viewers + (stats.cumViewers || 0)).toLocaleString()}명 <span style="font-size:11px; font-weight:normal; color:#64748b; margin-left:4px;">(방송+수동: ${stats.viewers.toLocaleString()}, 누적: ${(stats.cumViewers || 0).toLocaleString()})</span>`;
      }
      const cumViewersInput = document.getElementById('cfg-cumViewers');
      if (cumViewersInput) {
        cumViewersInput.value = stats.cumViewers || 0;
      }
      const heartsInput = document.getElementById('cfg-hearts');
      if (heartsInput) {
        heartsInput.value = stats.hearts || 0;
      }
    };

    let statsPollingInterval = null;
    const startStatsPolling = () => {
      if (!db) return;
      statsPollingInterval = setInterval(async () => {
        try {
          const { data, error } = await db
            .from('live_control')
            .select('viewers, cum_viewers, hearts')
            .eq('live_id', liveId)
            .maybeSingle();
          if (data && !error) {
            stats.viewers = parseInt(data.viewers) || 0;
            stats.cumViewers = parseInt(data.cum_viewers) || 0;
            stats.hearts = parseInt(data.hearts) || 0;
            if (typeof window.updateAdminViewersDisplay === 'function') window.updateAdminViewersDisplay();
          }
        } catch (e) {}
      }, 3000);
    };

    // 2. 실시간 채팅 구독
    // UI 전용 채팅 구독 (탭이 열릴 때만 호출)
    const subscribeAdminChatUI = () => {
      if (!db) return;
      chatChannel = db.channel(`admin-chat-ui-channel-${liveId}`)
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
    subscribeAdminChatUI();
    startStatsPolling();

    // 탭 이동 시 구독 해제 및 봇 정리
    contentArea.addEventListener('adminTabLeave', () => {
      if (chatChannel) {
        db.removeChannel(chatChannel);
      }
      if (statsPollingInterval) {
        clearInterval(statsPollingInterval);
      }
      if (winnersPollingInterval) {
        clearInterval(winnersPollingInterval);
      }
    });

    // 소통왕/구매인증 당첨 배너 제어 바인딩
    const btnWStart = document.getElementById('btn-winner-start');
    const btnWCancel = document.getElementById('btn-winner-cancel');
    
    let selectedType = (config.winner_name && config.winner_name.startsWith('구매인증') ? '구매인증' : '소통왕');

    // 세그먼트 버튼 클릭 이벤트 바인딩
    const segmentBtns = contentArea.querySelectorAll('.type-segment-btn');
    segmentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        segmentBtns.forEach(b => {
          b.classList.remove('active');
          b.style.background = 'transparent';
          b.style.color = '#64748b';
        });
        btn.classList.add('active');
        btn.style.background = '#3b82f6';
        btn.style.color = '#fff';
        selectedType = btn.dataset.type;
      });
    });

    if (btnWStart) {
      btnWStart.addEventListener('click', async () => {
        const nameVal = document.getElementById('winner-announce-text').value.trim();
        const minVal = parseInt(document.getElementById('winner-announce-min').value) || 1;
        if (!nameVal) {
          alert('당첨자 닉네임을 입력해 주세요.');
          return;
        }
        btnWStart.disabled = true;
        btnWStart.textContent = '적용 중...';
        
        const compositeName = `${selectedType}|${nameVal}`;
        const endTS = Date.now() + minVal * 60 * 1000;
        
        try {
          if (!db) return;
          const { error } = await db.from('live_control').update({
            winner_name: compositeName,
            winner_timestamp: endTS,
            updated_at: new Date().toISOString()
          }).eq('live_id', liveId);
          if (error) throw error;
          config.winner_name = compositeName;
          config.winner_timestamp = endTS;
          renderChatTab();
        } catch (err) {
          alert('시작 처리에 실패했습니다.');
        } finally {
          btnWStart.disabled = false;
          btnWStart.textContent = '시작';
        }
      });
    }

    if (btnWCancel) {
      btnWCancel.addEventListener('click', async () => {
        btnWCancel.disabled = true;
        btnWCancel.textContent = '종료 중...';
        try {
          if (!db) return;
          const { error } = await db.from('live_control').update({
            winner_timestamp: 0,
            updated_at: new Date().toISOString()
          }).eq('live_id', liveId);
          if (error) throw error;
          config.winner_timestamp = 0;
          renderChatTab();
        } catch (err) {
          alert('종료 처리에 실패했습니다.');
        } finally {
          btnWCancel.disabled = false;
          btnWCancel.textContent = '종료';
        }
      });
    }
  };

  const renderProductList = () => products.map((p, idx) => {
    const clickCount = p.clicks || 0;
    const isFeatured = p.isFeatured === true || p.isFeatured === 'true';
    return `
    <div class="product-row" style="${isFeatured ? 'border: 2px solid #2563eb; background: #f8faff; box-shadow:0 4px 12px rgba(37,99,235,0.08);' : ''}">
      <div class="product-img-box" onclick="document.getElementById('upload-prod-${idx}').click()" title="클릭하여 이미지 변경" style="position:relative;">
        <img src="${p.image || 'https://via.placeholder.com/72'}" id="img-prev-${idx}">
        <input type="file" id="upload-prod-${idx}" accept="image/*" style="display:none;" data-idx="${idx}" class="prod-img-upload">
        ${isFeatured ? `<span style="position:absolute; bottom:2px; left:2px; right:2px; background:#2563eb; color:#ffffff; font-size:10px; font-weight:800; text-align:center; border-radius:4px; padding:1px 0;">소개중</span>` : ''}
      </div>
      <div class="product-inputs">
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="text" class="modern-input" style="flex:2;" value="${p.name || ''}" data-idx="${idx}" data-field="name" placeholder="상품명">
          <input type="text" class="modern-input price-input" style="flex:1;" value="${p.normalPrice ? Number(p.normalPrice.toString().replace(/[^0-9]/g, '')).toLocaleString() : ''}" data-idx="${idx}" data-field="normalPrice" placeholder="정상가">
          <input type="text" class="modern-input price-input" style="flex:1;" value="${p.price ? Number(p.price.toString().replace(/[^0-9]/g, '')).toLocaleString() : ''}" data-idx="${idx}" data-field="price" placeholder="라이브가">
          <input type="number" class="modern-input" value="${p.discountRate || 0}" data-idx="${idx}" data-field="discountRate" placeholder="%" readonly style="width:50px; text-align:center;">
        </div>
        <div style="display:flex; align-items:center; gap:8px; margin-top:8px;">
          <input type="text" class="modern-input" style="flex:1;" value="${p.url || ''}" data-idx="${idx}" data-field="url" placeholder="구매 링크 URL" ${p.isLeadForm ? 'disabled' : ''}>
          <label style="font-size:12px; color:${isFeatured ? '#1d4ed8' : '#334155'}; font-weight:800; display:flex; align-items:center; gap:5px; cursor:pointer; user-select:none; white-space:nowrap; background:${isFeatured ? '#eff6ff' : '#f8fafc'}; padding:8px 12px; border:${isFeatured ? '1.5px solid #2563eb' : '1px solid #cbd5e1'}; border-radius:8px; transition:all 0.15s;">
            <input type="checkbox" data-idx="${idx}" data-field="isFeatured" class="chk-featured-product" ${isFeatured ? 'checked' : ''} style="width:14px; height:14px; accent-color:#2563eb; cursor:pointer;">
            지금소개중
          </label>
          <label style="font-size:12px; color:#475569; font-weight:700; display:flex; align-items:center; gap:5px; cursor:pointer; user-select:none; white-space:nowrap; background:#f8fafc; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px;">
            <input type="checkbox" data-idx="${idx}" data-field="isLeadForm" ${p.isLeadForm === true || p.isLeadForm === 'true' ? 'checked' : ''} style="width:14px; height:14px; accent-color:#3b82f6;">
            상담문의
          </label>
          <label style="font-size:12px; color:#475569; font-weight:700; display:flex; align-items:center; gap:5px; cursor:pointer; user-select:none; white-space:nowrap; background:#f8fafc; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px;">
            <input type="checkbox" data-idx="${idx}" data-field="hideByDefault" ${p.hideByDefault === true || p.hideByDefault === 'true' ? 'checked' : ''} style="width:14px; height:14px; accent-color:#16a34a;">
            평소숨김
          </label>
          <label style="font-size:12px; color:#dc2626; font-weight:800; display:flex; align-items:center; gap:5px; cursor:pointer; user-select:none; white-space:nowrap; background:#fef2f2; padding:8px 12px; border:1.5px solid #fca5a5; border-radius:8px;">
            <input type="checkbox" data-idx="${idx}" data-field="isFreeGiveaway" ${p.isFreeGiveaway === true || p.isFreeGiveaway === 'true' ? 'checked' : ''} style="width:14px; height:14px; accent-color:#ef4444;" class="chk-giveaway">
            선착순 무료나눔
          </label>
          ${(p.isFreeGiveaway === true || p.isFreeGiveaway === 'true') ? `
            <div style="display:flex; align-items:center; gap:6px; background:#fff1f2; padding:4px 8px; border-radius:8px; border:1px solid #fecdd3; white-space:nowrap;">
              <span style="font-size:11.5px; font-weight:700; color:#dc2626;">수량:</span>
              <input type="number" class="modern-input" style="width:50px; padding:4px 6px; font-size:12px; font-weight:700; text-align:center;" data-idx="${idx}" data-field="giveawayStock" value="${p.giveawayStock || 3}">
              <button class="btn-giveaway-start" data-idx="${idx}" style="padding:4px 9px; background:#dc2626; color:#fff; border:none; border-radius:6px; font-size:11.5px; font-weight:700; cursor:pointer; white-space:nowrap;">시작</button>
              <button class="btn-giveaway-stop" data-idx="${idx}" style="padding:4px 9px; background:#f1f5f9; color:#475569; border:1px solid #cbd5e1; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; white-space:nowrap;">종료</button>
              ${p.isGiveawayActive ? `<span style="font-size:11px; font-weight:800; color:#16a34a; background:#dcfce7; padding:2px 6px; border-radius:4px;">송출중</span>` : `<span style="font-size:11px; font-weight:600; color:#94a3b8;">대기</span>`}
            </div>
          ` : ''}
          <span style="font-size:12px; font-weight:700; color:#3b82f6; background:#eff6ff; padding:8px 10px; border-radius:8px; white-space:nowrap;">조회: ${clickCount.toLocaleString()}</span>
          <button class="action-btn btn-neutral btn-move-up" data-idx="${idx}" style="padding:8px 10px; font-size:13px; flex-shrink:0; cursor:pointer;" ${idx === 0 ? 'disabled' : ''}>▲</button>
          <button class="action-btn btn-neutral btn-move-down" data-idx="${idx}" style="padding:8px 10px; font-size:13px; flex-shrink:0; cursor:pointer;" ${idx === products.length - 1 ? 'disabled' : ''}>▼</button>
          <button class="action-btn btn-danger-solid btn-del-product" data-idx="${idx}" style="padding:8px 14px; font-size:13px; white-space:nowrap; flex-shrink:0;">삭제</button>
        </div>
        ${isLiveStreamOnly ? '' : `
        <details style="margin-top:10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px;">
          <summary style="padding:10px 14px; font-size:13px; font-weight:600; color:#475569; cursor:pointer; user-select:none;">고급 설정 (깜짝딜 / 좋아요 조건)</summary>
          <div style="padding:10px 14px; border-top:1px solid #e2e8f0; display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; gap:8px; align-items:center; background:#fff1f2; padding:10px 14px; border-radius:8px; border:1px solid #fecdd3;">
              <span style="font-size:12px; font-weight:700; color:#e11d48;">깜짝딜</span>
              <input type="text" class="modern-input" style="flex:1; padding:6px 10px; font-size:12px;" id="deal-text-${idx}" placeholder="배너 문구" value="${p.dealText || '깜짝딜 종료까지'}">
              <input type="number" class="modern-input" style="width:64px; padding:6px; font-size:12px;" id="deal-min-${idx}" placeholder="분">
              <button class="btn-deal-start" data-idx="${idx}" style="padding:6px 12px; background:#e11d48; color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap;">시작</button>
              <button class="btn-deal-cancel" data-idx="${idx}" style="padding:6px 12px; background:#f1f5f9; color:#374151; border:1.5px solid #e2e8f0; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; white-space:nowrap;">종료</button>
              ${p.dealEndTime && p.dealEndTime > Date.now() ? `<span style="font-size:11px; font-weight:700; color:#e11d48;">진행중</span>` : ''}
            </div>
            <div style="display:flex; gap:8px; align-items:center; background:#f0fdf4; padding:10px 14px; border-radius:8px; border:1px solid #bbf7d0;">
              <span style="font-size:12px; font-weight:700; color:#16a34a;">좋아요 달성</span>
              <input type="number" class="modern-input" style="width:90px; padding:6px 10px; font-size:12px;" data-idx="${idx}" data-field="targetLikes" placeholder="목표 좋아요" value="${p.targetLikes || ''}">
              <span style="font-size:12px; color:#16a34a; font-weight:600;">개 달성 시</span>
              <input type="number" class="modern-input" style="width:60px; padding:6px 10px; font-size:12px;" data-idx="${idx}" data-field="targetDealMin" placeholder="시간(분)" value="${p.targetDealMin || ''}">
              <span style="font-size:12px; color:#16a34a; font-weight:600;">분 자동 오픈</span>
            </div>
            <div style="display:flex; gap:8px; align-items:center; background:#fef2f2; padding:10px 14px; border-radius:8px; border:1px solid #fecdd3;">
              <span style="font-size:12px; font-weight:800; color:#dc2626;">화면 중앙 무료나눔 드롭</span>
              <span style="font-size:12px; color:#475569; font-weight:600;">한정 수량:</span>
              <input type="number" class="modern-input" style="width:65px; padding:6px 8px; font-size:12px;" data-idx="${idx}" data-field="giveawayStock" placeholder="수량" value="${p.giveawayStock || 3}">
              <span style="font-size:12px; color:#475569;">개</span>
              <button class="btn-giveaway-start" data-idx="${idx}" style="padding:6px 12px; background:#dc2626; color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap;">화면 송출 시작</button>
              <button class="btn-giveaway-stop" data-idx="${idx}" style="padding:6px 12px; background:#f1f5f9; color:#374151; border:1.5px solid #e2e8f0; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; white-space:nowrap;">종료</button>
              ${p.isGiveawayActive ? `<span style="font-size:11.5px; font-weight:800; color:#dc2626; background:#fee2e2; padding:3px 8px; border-radius:6px;">화면 송출중 (잔여: ${Math.max(0, (parseInt(p.giveawayStock) || 0) - (parseInt(p.giveawayClaimed) || 0))}개)</span>` : ''}
            </div>
          </div>
        </details>
        `}
      </div>
    </div>
    `;
  }).join('');

  const renderProductTab = () => {
    contentArea.innerHTML = `
      <div class="section-card">
        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; margin-bottom:20px;">
          <h3 style="margin:0; border:none; padding:0;">상품 관리</h3>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:12px; color:#10b981; font-weight:700; background:#ecfdf5; padding:6px 12px; border-radius:8px; border:1px solid #a7f3d0; display:flex; align-items:center; gap:5px;">
              <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10b981;"></span>
              실시간 자동 반영
            </span>
            <button id="btn-add-product" class="action-btn btn-primary-solid" style="padding:8px 16px; font-size:13px;">+ 상품 추가</button>
            <button id="btn-save-products-manual" class="action-btn" style="padding:8px 20px; font-size:13px; font-weight:700; background:#0f172a; color:#ffffff; border:none; border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(15,23,42,0.15); transition:all 0.15s;" onmouseover="this.style.background='#1e293b'" onmouseout="this.style.background='#0f172a'">
              저장
            </button>
          </div>
        </div>
        <div id="product-list-container">${renderProductList()}</div>
        <div style="display:flex; justify-content:flex-end; align-items:center; gap:10px; margin-top:16px; padding-top:16px; border-top:1px solid #f1f5f9;">
          <button id="btn-add-product-bottom" class="action-btn btn-secondary" style="padding:8px 16px; font-size:13px;">+ 상품 추가</button>
          <button id="btn-save-products-bottom" class="action-btn" style="padding:8px 20px; font-size:13px; font-weight:700; background:#0f172a; color:#ffffff; border:none; border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(15,23,42,0.15);">
            저장
          </button>
        </div>
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
              let remoteProducts = typeof row.products === 'string' ? JSON.parse(row.products) : row.products;
              if (!Array.isArray(remoteProducts)) remoteProducts = [];
              if (Array.isArray(remoteProducts)) {
                if (!products || products.length === 0) {
                  // 변수 재할당 대신 배열 mutation (이벤트 핸들러 참조 유지)
                  products.length = 0;
                  products.push(...remoteProducts);
                } else {
                  // DB에서 price, normalPrice, discountRate, clicks, image 동기화
                  products.forEach(p => {
                    const match = remoteProducts.find(rp => rp.id === p.id || rp.name === p.name);
                    if (match) {
                      // 가격 정보는 DB가 최신 기준
                      if (match.price !== undefined) p.price = match.price;
                      if (match.normalPrice !== undefined) p.normalPrice = match.normalPrice;
                      if (match.discountRate !== undefined) p.discountRate = match.discountRate;
                      p.clicks = parseInt(match.clicks) || 0;
                      if (!p.image && match.image) p.image = match.image;
                    }
                  });
                }
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
      if (!plc) return;

      let typingTimer = null;
      const triggerRealtimeSave = () => {
        if (typingTimer) clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          saveProducts(true);
        }, 250);
      };

      plc.querySelectorAll('input[data-field]').forEach(input => {
        const onFieldUpdate = (e) => {
          const idx = parseInt(input.dataset.idx, 10);
          const field = input.dataset.field;
          if (!products[idx]) return;

          if (input.type === 'checkbox') {
            if (field === 'isFeatured') {
              const isChecked = input.checked;
              products.forEach((prod, pIdx) => {
                prod.isFeatured = (pIdx === idx && isChecked);
              });
              saveProducts(true);
              plc.innerHTML = renderProductList();
              bindProductEvents();
              return;
            }
            products[idx][field] = input.checked;
            if (field === 'isFreeGiveaway') {
              if (input.checked) {
                products[idx].price = '0';
                products[idx].hideByDefault = true;
                products[idx].isGiveawayActive = true;
                if (!products[idx].giveawayStock) products[idx].giveawayStock = 3;
                if (products[idx].giveawayClaimed === undefined) products[idx].giveawayClaimed = 0;
              } else {
                products[idx].isGiveawayActive = false;
              }
              saveProducts(true);
              plc.innerHTML = renderProductList();
              bindProductEvents();
              return;
            }
            if (field === 'isLeadForm') {
              if (input.checked) {
                products[idx].url = '__LEAD_FORM__';
              } else if (products[idx].url === '__LEAD_FORM__') {
                products[idx].url = '';
              }
              saveProducts(true);
              plc.innerHTML = renderProductList();
              bindProductEvents();
              return;
            }
            saveProducts(true);
            return;
          }

          if (field === 'price' || field === 'normalPrice') {
            const rawDigits = input.value.replace(/[^0-9]/g, '');
            products[idx][field] = rawDigits;
            // 콤마 포맷팅
            input.value = rawDigits ? Number(rawDigits).toLocaleString() : '';

            // 할인율 자동 계산
            const n = Number(products[idx].normalPrice || 0);
            const p = Number(products[idx].price || 0);
            if (n > 0 && n >= p && p > 0) {
              products[idx].discountRate = Math.floor(((n - p) / n) * 100);
            } else {
              products[idx].discountRate = 0;
            }
            const rateEl = plc.querySelector(`input[data-idx="${idx}"][data-field="discountRate"]`);
            if (rateEl) rateEl.value = products[idx].discountRate;
          } else if (field === 'name') {
            products[idx].name = input.value;
          } else if (field === 'url') {
            products[idx].url = input.value.trim();
          } else if (field === 'giveawayStock') {
            products[idx].giveawayStock = parseInt(input.value, 10) || 3;
          }

          triggerRealtimeSave();
        };

        input.addEventListener('input', onFieldUpdate);
        input.addEventListener('change', onFieldUpdate);
        input.addEventListener('blur', () => saveProducts(true));
      });
      plc.querySelectorAll('.prod-img-upload').forEach(input => {
        input.addEventListener('change', async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const idx = parseInt(e.target.dataset.idx);
          const preview = document.getElementById(`img-prev-${idx}`);
          if (preview) preview.style.opacity = '0.5';
          try {
            // 외부 호스팅 API 장애/만료에 구애받지 않도록 최적화 압축(250x250, 0.8) Data URL로 직접 영구 저장
            const base64Data = await compressImage(file, 250, 250, 0.8);
            const dataUrl = base64Data.startsWith('data:') ? base64Data : `data:image/jpeg;base64,${base64Data}`;

            products[idx].image = dataUrl;
            if (preview) preview.src = dataUrl;
            saveProducts(true);
            syncToSheetDB(liveId, config, stats, products, true);
            plc.innerHTML = renderProductList();
            bindProductEvents();
          } catch (err) {
            console.error('상품 이미지 등록 에러:', err);
            alert('상품 이미지 등록 에러: ' + err.message);
          } finally {
            if (preview) preview.style.opacity = '1';
          }
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
      // 선착순 무료나눔 시작 (관리자 최우선 시작 타임스탬프)
      plc.querySelectorAll('.btn-giveaway-start').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          const p = products[idx];
          if (!p) return;
          const stock = parseInt(p.giveawayStock) || 3;
          p.isFreeGiveaway = true;
          p.price = '0';
          p.hideByDefault = true;
          p.giveawayStock = stock;
          p.giveawayClaimed = 0;
          p.isGiveawayActive = true;
          p.giveawayStartedAt = Date.now(); // 최신 시작 시점 (시청자 닫기 무력화)
          saveProducts(true);
          plc.innerHTML = renderProductList();
          bindProductEvents();
          syncToSheetDB(liveId, config, stats, products, true);
          alert(`선착순 ${stock}개 무료나눔이 라이브 화면에 시작되었습니다!`);
        });
      });
      // 선착순 무료나눔 종료
      plc.querySelectorAll('.btn-giveaway-stop').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          const p = products[idx];
          if (!p) return;
          p.isGiveawayActive = false;
          p.giveawayStartedAt = 0;
          saveProducts(true);
          plc.innerHTML = renderProductList();
          bindProductEvents();
          syncToSheetDB(liveId, config, stats, products, true);
          alert('무료나눔 화면 송출이 종료되었습니다.');
        });
      });
      plc.querySelectorAll('.btn-del-product').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.idx);
          const prodName = products[idx]?.name || '이 상품';
          if (confirm(`정말 "${prodName}" 상품을 삭제하시겠습니까?`)) {
            products.splice(idx, 1);
            saveProducts(true);
            plc.innerHTML = renderProductList();
            bindProductEvents();
          }
        });
      });
      plc.querySelectorAll('.btn-move-up').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.idx);
          if (idx > 0) {
            const temp = products[idx - 1];
            products[idx - 1] = products[idx];
            products[idx] = temp;
            saveProducts(true);
            plc.innerHTML = renderProductList();
            bindProductEvents();
          }
        });
      });
      plc.querySelectorAll('.btn-move-down').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.idx);
          if (idx < products.length - 1) {
            const temp = products[idx + 1];
            products[idx + 1] = products[idx];
            products[idx] = temp;
            saveProducts(true);
            plc.innerHTML = renderProductList();
            bindProductEvents();
          }
        });
      });
    };
    bindProductEvents();

    const handleAddProduct = () => {
      products.push({ id: Date.now(), name: '새 상품', price: '', normalPrice: '', discountRate: 0, image: 'https://via.placeholder.com/72', url: '#' });
      saveProducts(true);
      document.getElementById('product-list-container').innerHTML = renderProductList();
      bindProductEvents();
    };

    document.getElementById('btn-add-product')?.addEventListener('click', handleAddProduct);
    document.getElementById('btn-add-product-bottom')?.addEventListener('click', handleAddProduct);

    // [NEW] 관리자 수동 [저장] 버튼 동작 (자동반영 + 명시적 확정 저장)
    const handleManualProductSave = async (btn) => {
      if (!btn) return;
      btn.disabled = true;
      const originalText = btn.textContent;
      btn.textContent = '저장 중...';

      if (typeof autoSaveAllProducts === 'function') {
        autoSaveAllProducts();
      } else {
        saveProducts(true);
      }

      try {
        if (typeof syncToSheetDB === 'function') {
          await syncToSheetDB(liveId, config, stats, products, true);
        }
      } catch(e) {}

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = '저장 완료';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1500);
      }, 250);
    };

    document.getElementById('btn-save-products-manual')?.addEventListener('click', (e) => handleManualProductSave(e.currentTarget));
    document.getElementById('btn-save-products-bottom')?.addEventListener('click', (e) => handleManualProductSave(e.currentTarget));
    // 모든 상품 변경사항 실시간 자동 저장 및 Supabase 즉시 반영 함수
    const autoSaveAllProducts = () => {
      const plc = document.getElementById('product-list-container');
      if (plc) {
        const rows = plc.querySelectorAll('.product-row');
        rows.forEach((row, idx) => {
          if (!products[idx]) return;
          const nameInput = row.querySelector('input[data-field="name"]');
          const priceInput = row.querySelector('input[data-field="price"]');
          const normalPriceInput = row.querySelector('input[data-field="normalPrice"]');
          const urlInput = row.querySelector('input[data-field="url"]');
          const isLeadForm = row.querySelector('input[data-field="isLeadForm"]');
          const isFeatured = row.querySelector('input[data-field="isFeatured"]');
          const hideByDefault = row.querySelector('input[data-field="hideByDefault"]');
          if (isFeatured) products[idx].isFeatured = isFeatured.checked;
          const isFreeGiveaway = row.querySelector('input[data-field="isFreeGiveaway"]');
          const giveawayStockInput = row.querySelector('input[data-field="giveawayStock"]');

          if (nameInput) products[idx].name = nameInput.value.trim();
          if (normalPriceInput) products[idx].normalPrice = normalPriceInput.value.replace(/[^0-9]/g, '');
          if (priceInput) products[idx].price = priceInput.value.replace(/[^0-9]/g, '');
          if (urlInput) products[idx].url = urlInput.value.trim();
          if (isLeadForm) products[idx].isLeadForm = isLeadForm.checked;
          if (hideByDefault) products[idx].hideByDefault = hideByDefault.checked;
          
          if (isFreeGiveaway && isFreeGiveaway.checked) {
            products[idx].isFreeGiveaway = true;
            products[idx].price = '0';
            products[idx].hideByDefault = true;
            if (products[idx].isGiveawayActive === undefined) products[idx].isGiveawayActive = true;
            const stock = giveawayStockInput ? parseInt(giveawayStockInput.value) : (parseInt(products[idx].giveawayStock) || 3);
            products[idx].giveawayStock = stock > 0 ? stock : 3;
            if (products[idx].giveawayClaimed === undefined) products[idx].giveawayClaimed = 0;
          } else if (isFreeGiveaway && !isFreeGiveaway.checked) {
            products[idx].isFreeGiveaway = false;
            products[idx].isGiveawayActive = false;
          }
        });
      }
      saveProducts(true);
    };
    window.__autoSaveAllProducts = autoSaveAllProducts;


  };


  const renderLeadsTab = () => {
    contentArea.innerHTML = `
      <div class="section-card">
        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; margin-bottom:20px;">
          <h2 style="font-size:16px; font-weight:800; color:#0f172a; margin:0; display:flex; align-items:center; gap:6px;">
            상담 DB (리드)
          </h2>
          <div style="display:flex; gap:8px;">
            <button id="btn-download-csv-leads" class="action-btn btn-primary-solid" style="padding:8px 16px; font-size:13px; display:none;">CSV 다운로드</button>
            <button id="btn-refresh-leads" class="action-btn btn-neutral" style="padding:8px 16px; font-size:13px;">새로고침</button>
          </div>
        </div>
        <div id="leads-list-container">
          <div style="text-align:center; padding:20px; color:#64748b; font-size:13px;">불러오는 중...</div>
        </div>
      </div>
    `;

    let currentLeads = [];

    const loadLeads = async () => {
      try {
        if (!db) throw new Error('Supabase 미연동');
        const { data: list, error } = await db.from('live_leads')
          .select('*')
          .eq('live_id', liveId)
          .order('created_at', { ascending: false });
        if (error) throw error;

        // 도입문의 식별자로 시작하지 않는 순수 시청자 상담건만 필터링 분리
        currentLeads = (list || []).filter(lead => !lead.name || (!lead.name.startsWith('[도입문의]') && lead.name !== '__WEB_PUSH__'));
        const container = document.getElementById('leads-list-container');
        const btnCsv = document.getElementById('btn-download-csv-leads');
        
        if (btnCsv) {
          btnCsv.style.display = currentLeads.length > 0 ? 'block' : 'none';
        }

        if (!container) return;

        if (currentLeads.length === 0) {
          container.innerHTML = `<div style="text-align:center; padding:40px; color:#94a3b8; font-size:14px; background:#f8fafc; border-radius:12px;">아직 접수된 상담문의가 없습니다.</div>`;
          return;
        }

        let html = `
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:13px;">
            <thead style="background:#f1f5f9; color:#475569;">
              <tr>
                <th style="padding:10px; font-weight:700;">접수일시</th>
                <th style="padding:10px; font-weight:700;">이름</th>
                <th style="padding:10px; font-weight:700;">전화번호</th>
              </tr>
            </thead>
            <tbody>
        `;
        currentLeads.forEach(lead => {
          const dateStr = new Date(lead.created_at).toLocaleString('ko-KR');
          html += `
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:10px; color:#64748b;">${dateStr}</td>
              <td style="padding:10px; font-weight:700; color:#0f172a;">${lead.name}</td>
              <td style="padding:10px; font-family:monospace; color:#3b82f6;">${lead.phone}</td>
            </tr>
          `;
        });
        html += `</tbody></table>`;
        container.innerHTML = html;
      } catch (err) {
        console.warn('Failed to load leads', err);
        const container = document.getElementById('leads-list-container');
        if (container) container.innerHTML = `<div style="text-align:center; padding:20px; color:#ef4444; font-size:13px;">데이터를 불러오는 데 실패했습니다. (테이블 생성 여부를 확인하세요)</div>`;
      }
    };

    const downloadCsv = () => {
      if (currentLeads.length === 0) return;
      let csv = '접수일시,이름,전화번호\n';
      currentLeads.forEach(lead => {
        const dateStr = new Date(lead.created_at).toLocaleString('ko-KR').replace(/,/g, '');
        const name = (lead.name || '').replace(/,/g, ' ');
        const phone = (lead.phone || '').replace(/,/g, ' ');
        csv += `${dateStr},${name},${phone}\n`;
      });
      const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `상담DB_${liveId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    loadLeads();
    document.getElementById('btn-refresh-leads').addEventListener('click', loadLeads);
    document.getElementById('btn-download-csv-leads').addEventListener('click', downloadCsv);
  };

    // ── 주문 통계 (주문 관리 / 판매 순위 랭킹 / 1분 단위 시청자 통계) 탭 ────────
  const renderOrdersTab = (initialSubTab = 'orders') => {
    let currentSubTab = initialSubTab; // 'orders' | 'ranking' | 'timeline'
    let currentOrders = [];
    let rankingSortBy = 'qty'; // 'qty' | 'amount'
    let selectedProductFilter = 'all';
    let searchQuery = '';
    let statsTimer = null;

    contentArea.innerHTML = `
      <!-- 서브 탭 네비게이션 (채팅관리 탭 표준 디자인) -->
      <div style="display:flex; gap:8px; margin-bottom:16px; background:#f1f5f9; padding:4px; border-radius:10px;">
        <button class="order-sub-tab-btn active" data-subtab="orders" style="flex:1; padding:8px 0; font-size:13px; font-weight:700; border:none; background:#fff; color:#0f172a; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1); cursor:pointer;">주문 관리</button>
        <button class="order-sub-tab-btn" data-subtab="ranking" style="flex:1; padding:8px 0; font-size:13px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:8px; cursor:pointer;">판매 순위 랭킹</button>
        <button class="order-sub-tab-btn" data-subtab="timeline" style="flex:1; padding:8px 0; font-size:13px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:8px; cursor:pointer;">1분 단위 시청자 통계</button>
      </div>

      <!-- 1. 주문 관리 뷰 -->
      <div id="order-sub-orders" class="order-sub-view">
        <div class="section-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <h3 style="margin:0; border:none; padding:0;">실시간 주문 내역</h3>
              <span id="orders-status-badge" style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:12px; background:#f1f5f9; color:#64748b;">집계 중</span>
            </div>
            <div style="display:flex; gap:8px;">
              <button id="btn-download-orders-csv" class="action-btn btn-primary-solid" style="padding:6px 14px; font-size:12px; display:flex; align-items:center; gap:5px;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>주문내역 CSV</span>
              </button>
              <button id="btn-refresh-orders" class="action-btn btn-neutral" style="padding:6px 12px; font-size:12px;">새로고침</button>
            </div>
          </div>

          <!-- 4대 메트릭 요약 카드 -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:20px;">
            <div style="background:#f8fafc; padding:14px 18px; border-radius:10px; border:1px solid #e2e8f0;">
              <div style="font-size:11.5px; font-weight:700; color:#64748b; margin-bottom:4px;">총 결제 금액 (실매출)</div>
              <div id="kpi-total-sales" style="font-size:22px; font-weight:800; color:#0f172a;">0원</div>
              <div id="kpi-orders-count" style="font-size:11.5px; color:#64748b; margin-top:3px;">결제완료 0건</div>
            </div>
            <div style="background:#f8fafc; padding:14px 18px; border-radius:10px; border:1px solid #e2e8f0;">
              <div style="font-size:11.5px; font-weight:700; color:#64748b; margin-bottom:4px;">총 판매 수량</div>
              <div id="kpi-total-qty" style="font-size:22px; font-weight:800; color:#0f172a;">0개</div>
              <div id="kpi-product-types" style="font-size:11.5px; color:#64748b; margin-top:3px;">0종 품목</div>
            </div>
            <div style="background:#f8fafc; padding:14px 18px; border-radius:10px; border:1px solid #e2e8f0;">
              <div style="font-size:11.5px; font-weight:700; color:#64748b; margin-bottom:4px;">최고 시청자 (Peak)</div>
              <div id="kpi-peak-viewers" style="font-size:22px; font-weight:800; color:#ef4444;">0명</div>
              <div id="kpi-peak-time" style="font-size:11.5px; color:#64748b; margin-top:3px;">기록 없음</div>
            </div>
            <div style="background:#f8fafc; padding:14px 18px; border-radius:10px; border:1px solid #e2e8f0;">
              <div style="font-size:11.5px; font-weight:700; color:#64748b; margin-bottom:4px;">평균 시청자</div>
              <div id="kpi-avg-viewers" style="font-size:22px; font-weight:800; color:#2563eb;">0명</div>
              <div id="kpi-cum-viewers" style="font-size:11.5px; color:#64748b; margin-top:3px;">누적 0명</div>
            </div>
          </div>

          <!-- 검색 & 제품 필터 바 (미니멀 툴바 스타일) -->
          <div style="display:flex; justify-content:space-between; align-items:center; background:#ffffff; padding:12px 14px; border-radius:10px; border:1px solid #e2e8f0; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; gap:10px; align-items:center;">
              <select id="subtab-product-filter" style="height:35px; padding:0 12px; font-size:12.5px; font-weight:500; background:#ffffff; border:1px solid #cbd5e1; border-radius:7px; color:#0f172a; outline:none; cursor:pointer;">
                <option value="all">전체 제품 보기</option>
              </select>
              <span id="orders-count-badge" style="font-size:12px; color:#64748b; font-weight:500;">총 0건</span>
            </div>
            <div style="display:flex; gap:8px;">
              <div style="position:relative; display:flex; align-items:center;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:absolute; left:11px; pointer-events:none;">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" id="subtab-order-search" placeholder="주문자, 주문번호, 상품명 검색" style="height:35px; width:230px; padding:0 12px 0 32px; border:1px solid #cbd5e1; border-radius:7px; font-size:12px; outline:none; background:#ffffff; color:#0f172a;">
              </div>
            </div>
          </div>

          <!-- 주문 테이블 컨테이너 -->
          <div id="orders-table-container" style="border:1.5px solid #e2e8f0; border-radius:12px; overflow:hidden; background:#fff;">
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:50px 20px;">
              <div style="width:30px; height:30px; border:3px solid #e2e8f0; border-top-color:#2563eb; border-radius:50%; animation:ordersSpin 0.75s linear infinite; margin-bottom:12px;"></div>
              <div style="font-size:13px; font-weight:600; color:#475569;">주문 내역을 불러오는 중입니다...</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 판매 순위 랭킹 뷰 -->
      <div id="order-sub-ranking" class="order-sub-view" style="display:none;">
        <div class="section-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="margin:0 0 4px 0; border:none; padding:0;">상품 판매 순위 랭킹</h3>
              <p style="margin:0; font-size:12px; color:#64748b;">실제 결제 완료된 데이터를 바탕으로 어떤 상품이 가장 많이 팔렸는지 순위별로 집계합니다.</p>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
              <div style="display:flex; background:#f1f5f9; padding:2px; border-radius:8px; gap:2px;">
                <button id="rank-sort-qty" type="button" style="padding:6px 14px; font-size:12px; font-weight:700; border:none; background:#fff; color:#0f172a; border-radius:6px; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.06);">판매 수량순</button>
                <button id="rank-sort-amount" type="button" style="padding:6px 14px; font-size:12px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:6px; cursor:pointer;">결제 금액순</button>
              </div>
              <button id="btn-download-ranking-csv" class="action-btn btn-primary-solid" style="padding:6px 14px; font-size:12px;">순위 CSV</button>
            </div>
          </div>

          <!-- 판매 랭킹 테이블 컨테이너 -->
          <div id="ranking-table-container" style="border:1.5px solid #e2e8f0; border-radius:12px; overflow:hidden; background:#fff;">
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:50px 20px;">
              <div style="width:30px; height:30px; border:3px solid #e2e8f0; border-top-color:#0f172a; border-radius:50%; animation:ordersSpin 0.75s linear infinite; margin-bottom:12px;"></div>
              <div style="font-size:13px; font-weight:600; color:#64748b;">판매 순위를 분석 중입니다...</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 1분 단위 시청자 통계 뷰 -->
      <div id="order-sub-timeline" class="order-sub-view" style="display:none;">
        <div class="section-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="margin:0 0 4px 0; border:none; padding:0;">방송 시작 후 1분 단위 시청자 수 추이</h3>
              <p style="margin:0; font-size:12px; color:#64748b;">방송 시작 후 1분마다 실시간 시청자 수를 정밀하게 체크하여 기록한 통계입니다.</p>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
              <span id="timeline-duration-badge" style="font-size:12px; font-weight:700; color:#475569; background:#f1f5f9; padding:5px 12px; border-radius:6px; font-family:monospace;">측정 기록: 0분</span>
              <button id="btn-download-timeline-csv" class="action-btn btn-primary-solid" style="padding:6px 14px; font-size:12px;">시청자 기록 CSV</button>
            </div>
          </div>

          <!-- 인터랙티브 SVG 시청자 그래프 -->
          <div style="background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:20px 16px 14px 16px; margin-bottom:18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <span style="font-size:12px; font-weight:700; color:#475569;">1분 단위 시계열 그래프</span>
              <span id="timeline-chart-info" style="font-size:11.5px; color:#94a3b8;">총 0분 측정</span>
            </div>
            <div id="timeline-chart-content" style="width:100%; height:150px;">
              <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:13px;">그래프 데이터를 불러오는 중...</div>
            </div>
          </div>

          <!-- 1분 단위 상세 시청자 로그 테이블 -->
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <span style="font-size:13px; font-weight:700; color:#334155;">1분 단위 상세 시청자 로그</span>
              <span id="timeline-log-count-badge" style="font-size:11.5px; font-weight:600; color:#64748b;">총 0개 기록</span>
            </div>
            <div id="timeline-table-container" style="border:1.5px solid #e2e8f0; border-radius:12px; overflow:hidden; max-height:280px; overflow-y:auto; background:#fff;">
              <div style="text-align:center; padding:30px; color:#94a3b8; font-size:13px;">시청자 로그 기록을 불러오는 중...</div>
            </div>
          </div>
        </div>
      </div>
      <style>
        @keyframes ordersSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes orderModalIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
      </style>
    `;

    // ── 주문 아이템 품목 파싱 헬퍼 ──
    const parseItems = (ord) => {
      let list = [];
      if (Array.isArray(ord.items) && ord.items.length > 0) list = ord.items;
      else if (typeof ord.items === 'string') {
        try {
          const p = JSON.parse(ord.items);
          if (Array.isArray(p)) list = p;
        } catch(e) {
          list = [{ name: ord.items, price: ord.total_amount || 0, quantity: 1 }];
        }
      }
      if (list.length === 0) {
        list = [{ name: ord.goodname || ord.item_name || '라이브 상품', price: ord.total_amount || 0, quantity: 1 }];
      }
      return list;
    };

    const cancelStatuses = ['cancelled', 'canceled', 'payapp_cancelled', 'refunded', 'cancel'];

    // ── 1. 데이터 로드 및 실제 결제 상태 동기화 ──
    const loadData = async () => {
      const statusBadge = document.getElementById('orders-status-badge');
      if (statusBadge) {
        if (config.isLive) {
          statusBadge.textContent = '실시간 방송 중';
          statusBadge.style.background = '#fef2f2';
          statusBadge.style.color = '#ef4444';
        } else {
          statusBadge.textContent = '방송 대기 / 종료';
          statusBadge.style.background = '#f1f5f9';
          statusBadge.style.color = '#64748b';
        }
      }

      try {
        let rawOrders = [];

        // 1-1. Supabase live_orders 테이블 조회 (실제 라이브 주문)
        if (db) {
          try {
            const { data: ordData, error: ordErr } = await db.from('live_orders')
              .select('*')
              .eq('live_id', liveId)
              .order('created_at', { ascending: false });
            if (Array.isArray(ordData) && !ordErr) {
              ordData.forEach(o => {
                rawOrders.push({
                  id: o.id,
                  live_id: o.live_id,
                  customer_name: o.customer_name || o.buyer_name || o.name || '',
                  customer_phone: o.customer_phone || o.buyer_phone || o.phone || '',
                  customer_address: o.customer_address || o.shipping_address || o.address || '',
                  total_amount: Number(o.total_amount) || 0,
                  items: o.items,
                  payment_status: (o.payment_status || 'payapp_requested').toLowerCase(),
                  pg_provider: o.pg_provider || 'payapp',
                  pg_receipt_id: o.pg_receipt_id || o.receipt_id || '',
                  created_at: o.created_at
                });
              });
            }
          } catch(e) {}

          // 1-2. live_winners 중 오직 type: 'order'인 레거시 주문 데이터만 추출 (추첨 당첨자는 제외!)
          try {
            const { data: winData, error: winErr } = await db.from('live_winners')
              .select('*')
              .eq('live_id', liveId)
              .order('created_at', { ascending: false });
            if (Array.isArray(winData) && !winErr) {
              winData.forEach(w => {
                if (w.nickname && (w.nickname.startsWith('{"type":"order"') || w.nickname.startsWith('{"type": "order"'))) {
                  try {
                    const parsed = JSON.parse(w.nickname);
                    rawOrders.push({
                      id: w.id,
                      live_id: w.live_id,
                      customer_name: w.name || '',
                      customer_phone: w.phone || '',
                      customer_address: w.address || '',
                      total_amount: Number(parsed.total) || 0,
                      items: parsed.items || [{ name: parsed.goodname || '상품', price: Number(parsed.total) || 0 }],
                      payment_status: (parsed.status || 'payapp_requested').toLowerCase(),
                      pg_provider: parsed.pg_provider || 'payapp',
                      pg_receipt_id: String(parsed.mul_no || ''),
                      created_at: w.created_at
                    });
                  } catch(e) {}
                }
              });
            }
          } catch(e) {}
        }

        // 1-3. 로컬스토리지 캐시 백업 주문 병합
        try {
          const loc = JSON.parse(localStorage.getItem(`ryzin_live_orders_${liveId}`) || '[]');
          if (Array.isArray(loc)) {
            loc.forEach(l => {
              rawOrders.push({
                id: l.id,
                live_id: l.live_id || liveId,
                customer_name: l.customer_name || l.buyer_name || l.name || '',
                customer_phone: l.customer_phone || l.buyer_phone || l.phone || '',
                customer_address: l.customer_address || l.shipping_address || l.address || '',
                total_amount: Number(l.total_amount) || 0,
                items: l.items,
                payment_status: (l.payment_status || 'payapp_requested').toLowerCase(),
                pg_provider: l.pg_provider || 'payapp',
                pg_receipt_id: l.pg_receipt_id || l.receipt_id || '',
                created_at: l.created_at
              });
            });
          }
        } catch(e) {}

        // 1-4. 중복 제거 (pg_receipt_id or id or created_at+phone 기준)
        const orderMap = new Map();
        rawOrders.forEach(o => {
          const key = (o.pg_receipt_id && o.pg_receipt_id !== 'undefined' && o.pg_receipt_id !== '-' ? o.pg_receipt_id : null) || o.id || `${o.created_at}_${o.customer_phone}`;
          const existing = orderMap.get(key);
          if (!existing) {
            orderMap.set(key, o);
          } else {
            if (o.payment_status === 'paid' && existing.payment_status !== 'paid') {
              orderMap.set(key, o);
            }
          }
        });

        currentOrders = Array.from(orderMap.values()).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

        // 1-5. PayApp 실시간 결제 상태 조회 동기화
        const mulNos = currentOrders.map(o => o.pg_receipt_id).filter(m => m && m !== 'undefined' && m !== '-');
        if (mulNos.length > 0) {
          try {
            const payRes = await fetch('/api/payapp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ cmd: 'check_orders', mul_nos: mulNos })
            });
            if (payRes.ok) {
              const resData = await payRes.json();
              if (resData.success && resData.results) {
                let updated = false;
                currentOrders.forEach(o => {
                  const info = resData.results[o.pg_receipt_id];
                  if (info && info.status && info.status !== 'unknown') {
                    if (o.payment_status !== info.status) {
                      o.payment_status = info.status;
                      updated = true;
                    }
                  }
                });
                if (updated) {
                  try {
                    localStorage.setItem(`ryzin_live_orders_${liveId}`, JSON.stringify(currentOrders));
                  } catch(e) {}
                }
              }
            }
          } catch(e) {
            console.warn('PayApp status check failed:', e);
          }
        }
      } catch (err) {
        console.warn('Order loading error:', err);
        currentOrders = [];
      }

      updateKpis();
      renderOrdersView();
      renderRankingView();
      renderTimelineView();
    };

    // ── KPI 계산 및 반영 (실제 결제 완료된 데이터만 매출 및 판매량에 집계!) ──
    const updateKpis = () => {
      const paidOrders = currentOrders.filter(o => (o.payment_status || '').toLowerCase() === 'paid');
      const pendingOrders = currentOrders.filter(o => (o.payment_status || '').toLowerCase() === 'payapp_requested');
      const cancelledOrders = currentOrders.filter(o => cancelStatuses.includes((o.payment_status || '').toLowerCase()));

      let totalSales = 0;
      let totalQty = 0;
      const productTypesSet = new Set();

      paidOrders.forEach(ord => {
        const items = parseItems(ord);
        items.forEach(it => {
          const qty = parseInt(it.quantity || it.qty || 1) || 1;
          const price = parseInt(it.price || 0) || Math.round((parseInt(ord.total_amount) || 0) / Math.max(1, items.length));
          totalSales += price * qty;
          totalQty += qty;
          const pName = (it.name || it.goodname || '').trim();
          if (pName) productTypesSet.add(pName);
        });
      });

      const timeline = getLiveTimeline(liveId);
      let peakViewers = 0;
      let peakTime = '기록 없음';
      let sumViewers = 0;

      timeline.forEach(t => {
        const v = parseInt(t.viewers) || 0;
        sumViewers += v;
        if (v >= peakViewers) {
          peakViewers = v;
          peakTime = `방송 ${t.minute}분 후`;
        }
      });
      const avgViewers = timeline.length > 0 ? Math.round(sumViewers / timeline.length) : ((stats.viewers || 0) + (stats.cumViewers || 0));

      const elTotalSales = document.getElementById('kpi-total-sales');
      const elOrdersCount = document.getElementById('kpi-orders-count');
      const elTotalQty = document.getElementById('kpi-total-qty');
      const elProductTypes = document.getElementById('kpi-product-types');
      const elPeakViewers = document.getElementById('kpi-peak-viewers');
      const elPeakTime = document.getElementById('kpi-peak-time');
      const elAvgViewers = document.getElementById('kpi-avg-viewers');
      const elCumViewers = document.getElementById('kpi-cum-viewers');

      if (elTotalSales) elTotalSales.textContent = `${totalSales.toLocaleString()}원`;
      if (elOrdersCount) {
        if (paidOrders.length === 0 && pendingOrders.length > 0) {
          elOrdersCount.innerHTML = `결제 0건 <span style="font-size:11px; color:#f59e0b; font-weight:600;">(대기 ${pendingOrders.length}건)</span>`;
        } else {
          elOrdersCount.textContent = `결제완료 ${paidOrders.length}건${cancelledOrders.length > 0 ? ` (취소 ${cancelledOrders.length})` : ''}`;
        }
      }
      if (elTotalQty) elTotalQty.textContent = `${totalQty.toLocaleString()}개`;
      if (elProductTypes) elProductTypes.textContent = `${productTypesSet.size}종 품목`;
      if (elPeakViewers) elPeakViewers.textContent = `${peakViewers.toLocaleString()}명`;
      if (elPeakTime) elPeakTime.textContent = peakTime;
      if (elAvgViewers) elAvgViewers.textContent = `${avgViewers.toLocaleString()}명`;
      if (elCumViewers) elCumViewers.textContent = `누적 ${(stats.cumViewers || 0).toLocaleString()}명`;
    };

    // ── [서브 뷰 1] 주문 내역 렌더링 ──
    const renderOrdersView = () => {
      const container = document.getElementById('orders-table-container');
      if (!container) return;

      const allProductNames = new Set();
      currentOrders.forEach(ord => {
        parseItems(ord).forEach(it => {
          const n = (it.name || it.goodname || '').trim();
          if (n) allProductNames.add(n);
        });
      });

      let filtered = currentOrders;
      if (selectedProductFilter !== 'all') {
        filtered = filtered.filter(ord => parseItems(ord).some(it => (it.name || it.goodname || '').trim() === selectedProductFilter));
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        filtered = filtered.filter(ord => {
          const name = (ord.customer_name || ord.buyer_name || '').toLowerCase();
          const phone = (ord.customer_phone || ord.buyer_phone || '').toLowerCase();
          const items = JSON.stringify(ord.items || '').toLowerCase();
          return name.includes(q) || phone.includes(q) || items.includes(q);
        });
      }

      const countBadge = document.getElementById('orders-count-badge');
      if (countBadge) countBadge.textContent = `총 ${filtered.length}건`;

      const filterSelect = document.getElementById('subtab-product-filter');
      if (filterSelect && filterSelect.options.length <= 1) {
        let optionsHtml = '<option value="all">전체 제품 보기</option>';
        allProductNames.forEach(name => {
          optionsHtml += `<option value="${name}" ${selectedProductFilter === name ? 'selected' : ''}>${name}</option>`;
        });
        filterSelect.innerHTML = optionsHtml;
      }

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:50px 20px; color:#94a3b8; font-size:13.5px;">
            조회된 주문 내역이 없습니다.
          </div>
        `;
        return;
      }

      let rowsHtml = '';
      filtered.forEach((ord, idx) => {
        const pStatus = (ord.payment_status || 'payapp_requested').toLowerCase();
        const isPaid = pStatus === 'paid';
        const isCancel = cancelStatuses.includes(pStatus);

        // 세련된 소프트 닷 뱃지 (절대 줄바꿈 방지 white-space: nowrap)
        let statusBadge = '';
        if (isPaid) {
          statusBadge = '<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#ecfdf5; color:#059669; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#10b981; flex-shrink:0;"></span>결제완료</span>';
        } else if (isCancel) {
          statusBadge = '<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#fef2f2; color:#dc2626; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#ef4444; flex-shrink:0;"></span>결제취소</span>';
        } else {
          statusBadge = '<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#fffbeb; color:#b45309; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#f59e0b; flex-shrink:0;"></span>결제대기</span>';
        }

        // 자연스러운 날짜/시간 분리 포맷
        let datePart = '-';
        let timePart = '';
        if (ord.created_at) {
          let d = new Date(ord.created_at);
          if (isNaN(d.getTime())) {
            const num = Number(ord.created_at);
            if (!isNaN(num)) d = new Date(num);
          }
          if (!isNaN(d.getTime())) {
            const Y = d.getFullYear();
            const M = String(d.getMonth() + 1).padStart(2, '0');
            const D = String(d.getDate()).padStart(2, '0');
            const h = String(d.getHours()).padStart(2, '0');
            const m = String(d.getMinutes()).padStart(2, '0');
            datePart = `${Y}.${M}.${D}`;
            timePart = `${h}:${m}`;
          } else {
            datePart = String(ord.created_at);
          }
        }

        const items = parseItems(ord);
        const itemsSummary = items.map(it => {
          const qty = it.quantity || 1;
          return `${it.name || it.goodname || '상품'}${qty > 1 ? ` (${qty}개)` : ''}`;
        }).join(', ');
        const customerName = ord.customer_name || ord.buyer_name || '(미입력)';

        rowsHtml += `
          <tr style="border-bottom:1px solid #f1f5f9; font-size:13px; transition:background 0.1s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
            <!-- 1. 상태 -->
            <td style="padding:13px 8px; text-align:center; white-space:nowrap;">${statusBadge}</td>
            <!-- 2. 주문번호 -->
            <td style="padding:13px 14px; color:#64748b; font-size:12px; font-variant-numeric:tabular-nums;">${ord.pg_receipt_id || ord.receipt_id || ord.order_number || '-'}</td>
            <!-- 3. 주문일시 (자연스러운 날짜와 시간) -->
            <td style="padding:13px 14px; color:#334155; font-size:12.5px; font-variant-numeric:tabular-nums; white-space:nowrap;">
              <span style="font-weight:500;">${datePart}</span>
              ${timePart ? `<span style="color:#94a3b8; font-size:11.5px; margin-left:5px;">${timePart}</span>` : ''}
            </td>
            <!-- 4. 주문자 (우아한 텍스트 링크) -->
            <td style="padding:13px 14px;">
              <button type="button" class="btn-customer-detail" data-order-idx="${idx}"
                style="background:transparent; border:none; padding:0; font-size:13px; font-weight:600; color:#0f172a; cursor:pointer; text-decoration:underline; text-decoration-color:#cbd5e1; text-underline-offset:3px; transition:all 0.15s;"
                onmouseover="this.style.color='#2563eb'; this.style.textDecorationColor='#2563eb';"
                onmouseout="this.style.color='#0f172a'; this.style.textDecorationColor='#cbd5e1';">
                ${customerName}
              </button>
            </td>
            <!-- 5. 주문 상품 (자연스러운 폰트 + 말줄임표) -->
            <td style="padding:13px 14px; max-width:320px;">
              <div style="color:#1e293b; font-weight:500; font-size:13px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; line-height:1.4;" title="${itemsSummary.replace(/"/g, '&quot;')}">
                ${itemsSummary}
              </div>
            </td>
            <!-- 6. 결제금액 -->
            <td style="padding:13px 20px 13px 14px; text-align:right; font-variant-numeric:tabular-nums;">
              ${isCancel ? `
                <div style="display:inline-flex; flex-direction:column; align-items:flex-end;">
                  <span style="color:#94a3b8; font-size:13px; text-decoration:line-through; font-weight:500;">${(parseInt(ord.total_amount) || 0).toLocaleString()}원</span>
                  <span style="color:#dc2626; font-size:11px; font-weight:600; margin-top:2px;">취소완료</span>
                </div>
              ` : `
                <span style="font-weight:700; font-size:13.5px; color:#0f172a;">${(parseInt(ord.total_amount) || 0).toLocaleString()}원</span>
              `}
            </td>
          </tr>
        `;
      });

      container.innerHTML = `
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead>
              <tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; font-size:12px; color:#64748b;">
                <th style="padding:11px 8px; font-weight:600; width:105px; min-width:105px; text-align:center;">상태</th>
                <th style="padding:11px 14px; font-weight:600; width:120px;">주문번호</th>
                <th style="padding:11px 14px; font-weight:600; width:140px;">주문일시</th>
                <th style="padding:11px 14px; font-weight:600; width:100px;">주문자</th>
                <th style="padding:11px 14px; font-weight:600;">주문 상품</th>
                <th style="padding:11px 20px 11px 14px; font-weight:600; width:120px; text-align:right;">결제금액</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      `;

      // 고객 이름 클릭 시 상세 모달 오픈
      container.querySelectorAll('.btn-customer-detail').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.orderIdx);
          if (filtered[idx]) {
            showCustomerModal(filtered[idx]);
          }
        });
      });
    };

    // ── 고객 상세 정보 팝업 모달 (이름, 전화번호, 주소 및 결제 취소/부분취소 기능) ──
    const showCustomerModal = (ord) => {
      document.getElementById('customer-detail-modal')?.remove();

      const customerName = ord.customer_name || ord.buyer_name || '(미입력)';
      const customerPhone = ord.customer_phone || ord.buyer_phone || '(미입력)';
      const customerAddress = ord.customer_address || ord.shipping_address || '(미입력)';
      const pStatus = (ord.payment_status || 'payapp_requested').toLowerCase();
      const isPaid = pStatus === 'paid';
      const isCancel = cancelStatuses.includes(pStatus);

      // 세련된 소프트 닷 뱃지
      let statusBadge = '';
      if (isPaid) {
        statusBadge = '<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#ecfdf5; color:#059669; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#10b981; flex-shrink:0;"></span>결제완료</span>';
      } else if (isCancel) {
        statusBadge = '<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#fef2f2; color:#dc2626; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#ef4444; flex-shrink:0;"></span>결제취소</span>';
      } else {
        statusBadge = '<span style="display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:4px 9px; border-radius:6px; font-size:11.5px; font-weight:600; background:#fffbeb; color:#b45309; white-space:nowrap; line-height:1;"><span style="width:5px; height:5px; border-radius:50%; background:#f59e0b; flex-shrink:0;"></span>결제대기</span>';
      }

      const items = parseItems(ord);
      const itemsText = items.map(it => {
        const qty = it.quantity || 1;
        return `${it.name || it.goodname || '상품'}${qty > 1 ? ` (${qty}개)` : ''}`;
      }).join(', ');
      
      let dateStr = '-';
      if (ord.created_at) {
        let d = new Date(ord.created_at);
        if (isNaN(d.getTime())) {
          const num = Number(ord.created_at);
          if (!isNaN(num)) d = new Date(num);
        }
        if (!isNaN(d.getTime())) {
          const Y = d.getFullYear();
          const M = String(d.getMonth() + 1).padStart(2, '0');
          const D = String(d.getDate()).padStart(2, '0');
          const h = String(d.getHours()).padStart(2, '0');
          const m = String(d.getMinutes()).padStart(2, '0');
          dateStr = `${Y}.${M}.${D} ${h}:${m}`;
        } else {
          dateStr = String(ord.created_at);
        }
      }

      const currentAmount = parseInt(ord.total_amount) || 0;
      const receiptNo = ord.pg_receipt_id || ord.receipt_id || ord.order_number || '';

      const modalEl = document.createElement('div');
      modalEl.id = 'customer-detail-modal';
      modalEl.style.cssText = 'position:fixed; inset:0; background:rgba(15,23,42,0.6); z-index:10000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(3px); padding:16px;';

      modalEl.innerHTML = `
        <div style="background:#ffffff; border-radius:14px; width:450px; max-width:100%; box-shadow:0 20px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1); overflow:hidden; border:1px solid #e2e8f0; animation:orderModalIn 0.16s ease-out;">
          <!-- 모달 헤더 -->
          <div style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid #f1f5f9; background:#ffffff;">
            <div style="display:flex; align-items:center; gap:8px;">
              <h4 style="margin:0; font-size:15px; font-weight:700; color:#0f172a;">고객 주문 및 배송 정보</h4>
              ${statusBadge}
            </div>
            <button type="button" id="btn-close-customer-modal" style="background:none; border:none; color:#94a3b8; font-size:20px; line-height:1; cursor:pointer; padding:4px; border-radius:6px; transition:color 0.12s;" onmouseover="this.style.color='#0f172a'" onmouseout="this.style.color='#94a3b8'">✕</button>
          </div>

          <!-- 모달 바디 -->
          <div style="padding:20px; background:#ffffff; max-height:80vh; overflow-y:auto;">
            <!-- 1. 고객 개인정보 카드 (보안보호적용 문구 삭제 완료) -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:14px;">
              <div style="font-size:12px; font-weight:700; color:#475569; margin-bottom:12px;">고객 개인정보</div>

              <!-- 고객 이름 -->
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid #edf2f7;">
                <span style="font-size:12.5px; color:#64748b; font-weight:500; width:70px;">이름</span>
                <span style="font-size:14px; font-weight:700; color:#0f172a; flex:1; text-align:right;">${customerName}</span>
              </div>

              <!-- 전화번호 -->
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid #edf2f7;">
                <span style="font-size:12.5px; color:#64748b; font-weight:500; width:70px;">전화번호</span>
                <div style="display:flex; align-items:center; gap:6px;">
                  <span style="font-size:13.5px; font-weight:600; color:#0f172a; font-variant-numeric:tabular-nums;">${customerPhone}</span>
                  ${customerPhone !== '(미입력)' ? `<button type="button" class="btn-copy-field" data-copy="${customerPhone}" style="padding:3px 8px; font-size:11px; font-weight:600; border:1px solid #cbd5e1; border-radius:5px; background:#ffffff; color:#475569; cursor:pointer;">복사</button>` : ''}
                </div>
              </div>

              <!-- 배송지 주소 -->
              <div style="display:flex; flex-direction:column; gap:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:12.5px; color:#64748b; font-weight:500;">배송지 주소</span>
                  ${customerAddress !== '(미입력)' ? `<button type="button" class="btn-copy-field" data-copy="${customerAddress}" style="padding:3px 8px; font-size:11px; font-weight:600; border:1px solid #cbd5e1; border-radius:5px; background:#ffffff; color:#475569; cursor:pointer;">주소 복사</button>` : ''}
                </div>
                <div style="font-size:13px; color:#1e293b; font-weight:500; line-height:1.55; word-break:break-all; background:#ffffff; padding:10px 12px; border-radius:7px; border:1px solid #e2e8f0;">
                  ${customerAddress}
                </div>
              </div>
            </div>

            <!-- 2. 주문 및 결제 내역 요약 -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:14px;">
              <div style="font-size:12px; font-weight:700; color:#475569; margin-bottom:12px;">주문 결제 정보</div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12.5px;">
                <span style="color:#64748b;">주문 상품</span>
                <span style="font-weight:600; color:#0f172a; text-align:right; max-width:280px; line-height:1.4;">${itemsText}</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12.5px;">
                <span style="color:#64748b;">결제 금액</span>
                <span style="font-weight:700; color:#0f172a; font-size:14px; font-variant-numeric:tabular-nums;">${currentAmount.toLocaleString()}원</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:12.5px;">
                <span style="color:#64748b;">주문번호</span>
                <span style="color:#475569; font-variant-numeric:tabular-nums;">${receiptNo || '-'}</span>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:12.5px;">
                <span style="color:#64748b;">주문 일시</span>
                <span style="color:#475569; font-variant-numeric:tabular-nums;">${dateStr}</span>
              </div>
            </div>

            <!-- 3. 결제 취소 / 부분 취소 제어 카드 -->
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:16px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span style="font-size:12px; font-weight:700; color:#334155;">결제 취소 관리</span>
                <span style="font-size:11px; color:#94a3b8;">PG사 실시간 취소 연동</span>
              </div>

              ${isCancel ? `
                <div style="text-align:center; padding:12px; background:#fef2f2; border:1px solid #fee2e2; border-radius:8px; color:#dc2626; font-size:12.5px; font-weight:600;">
                  이미 결제 취소(환불) 처리가 완료된 주문건입니다.
                </div>
              ` : `
                <div style="display:flex; gap:8px;">
                  <button type="button" id="btn-modal-cancel-all" style="flex:1; padding:9px 12px; font-size:12px; font-weight:700; border:1px solid #fecaca; background:#fff5f5; color:#dc2626; border-radius:7px; cursor:pointer; transition:all 0.12s;" onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='#fff5f5'">
                    결제 전체 취소
                  </button>
                  <button type="button" id="btn-modal-cancel-partial" style="flex:1; padding:9px 12px; font-size:12px; font-weight:700; border:1px solid #fed7aa; background:#fffbeb; color:#b45309; border-radius:7px; cursor:pointer; transition:all 0.12s;" onmouseover="this.style.background='#fef3c7'" onmouseout="this.style.background='#fffbeb'">
                    부분 취소
                  </button>
                </div>

                <!-- 부분 취소 인라인 입력 폼 -->
                <div id="modal-partial-form" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed #e2e8f0;">
                  <div style="margin-bottom:8px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                      <label style="font-size:11.5px; font-weight:600; color:#475569;">부분 취소 금액 (원)</label>
                      <span style="font-size:11px; color:#94a3b8;">최대 ${currentAmount.toLocaleString()}원</span>
                    </div>
                    <input type="number" id="partial-cancel-amount" placeholder="취소할 금액 입력 (예: 10000)" max="${currentAmount}" style="width:100%; box-sizing:border-box; padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; font-size:13px; outline:none; font-weight:700; color:#0f172a;">
                  </div>
                  <div style="margin-bottom:10px;">
                    <label style="display:block; font-size:11.5px; font-weight:600; color:#475569; margin-bottom:4px;">취소 사유</label>
                    <input type="text" id="partial-cancel-memo" value="고객 요청 부분 취소" style="width:100%; box-sizing:border-box; padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; font-size:12px; outline:none; color:#334155;">
                  </div>
                  <div style="display:flex; justify-content:flex-end; gap:6px;">
                    <button type="button" id="btn-close-partial-form" style="padding:6px 12px; font-size:11.5px; font-weight:600; border:1px solid #e2e8f0; background:#ffffff; color:#64748b; border-radius:6px; cursor:pointer;">접기</button>
                    <button type="button" id="btn-submit-partial-cancel" style="padding:6px 14px; font-size:11.5px; font-weight:700; border:none; background:#d97706; color:#ffffff; border-radius:6px; cursor:pointer;">부분 취소 실행</button>
                  </div>
                </div>
              `}
            </div>
          </div>

          <!-- 모달 푸터 -->
          <div style="display:flex; justify-content:flex-end; padding:12px 20px; background:#f8fafc; border-top:1px solid #e2e8f0;">
            <button type="button" id="btn-confirm-customer-modal" class="action-btn btn-primary-solid" style="padding:7px 20px; font-size:12.5px;">확인</button>
          </div>
        </div>
      `;

      document.body.appendChild(modalEl);

      const closeModal = () => modalEl.remove();
      modalEl.querySelector('#btn-close-customer-modal')?.addEventListener('click', closeModal);
      modalEl.querySelector('#btn-confirm-customer-modal')?.addEventListener('click', closeModal);
      modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) closeModal();
      });

      // 복사 버튼 기능
      modalEl.querySelectorAll('.btn-copy-field').forEach(btn => {
        btn.addEventListener('click', () => {
          const text = btn.dataset.copy;
          if (text) {
            navigator.clipboard.writeText(text).then(() => {
              const original = btn.textContent;
              btn.textContent = '복사완료';
              btn.style.color = '#059669';
              btn.style.borderColor = '#059669';
              setTimeout(() => {
                btn.textContent = original;
                btn.style.color = '#475569';
                btn.style.borderColor = '#cbd5e1';
              }, 1200);
            });
          }
        });
      });

      // 부분 취소 폼 토글
      const partialForm = modalEl.querySelector('#modal-partial-form');
      const btnPartialToggle = modalEl.querySelector('#btn-modal-cancel-partial');
      const btnPartialClose = modalEl.querySelector('#btn-close-partial-form');

      if (btnPartialToggle && partialForm) {
        btnPartialToggle.addEventListener('click', () => {
          partialForm.style.display = partialForm.style.display === 'none' ? 'block' : 'none';
        });
      }
      if (btnPartialClose && partialForm) {
        btnPartialClose.addEventListener('click', () => {
          partialForm.style.display = 'none';
        });
      }

      // ── 전체 결제 취소 실행 핸들러 ──
      modalEl.querySelector('#btn-modal-cancel-all')?.addEventListener('click', async () => {
        if (!confirm(`정말로 이 주문(총 ${currentAmount.toLocaleString()}원)의 결제를 전체 취소하시겠습니까?\n이 작업은 PG사(페이앱) 승인 취소와 함께 연동됩니다.`)) {
          return;
        }

        const btnCancelAll = modalEl.querySelector('#btn-modal-cancel-all');
        if (btnCancelAll) {
          btnCancelAll.disabled = true;
          btnCancelAll.textContent = '취소 처리 중...';
        }

        try {
          // 1. PayApp 결제 취소 API 요청
          if (receiptNo && receiptNo !== '-' && receiptNo !== 'undefined') {
            try {
              const cancelRes = await fetch('/api/payapp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  cmd: 'paycancel',
                  mul_no: receiptNo,
                  cancelmemo: '관리자 주문 전체 취소'
                })
              });
              const cancelData = await cancelRes.json();
              if (!cancelData.success) {
                console.warn('PayApp API cancel notice:', cancelData.message);
              }
            } catch (err) {
              console.warn('PayApp cancellation request failed:', err);
            }
          }

          // 2. Supabase live_orders 테이블 상태를 'cancelled'로 업데이트
          if (db) {
            try {
              if (ord.id) {
                await db.from('live_orders').update({ payment_status: 'cancelled' }).eq('id', ord.id);
              } else if (receiptNo) {
                await db.from('live_orders').update({ payment_status: 'cancelled' }).eq('pg_receipt_id', receiptNo);
              }
            } catch (e) {
              console.warn('DB order update failed:', e);
            }
          }

          // 3. 로컬 캐시 스토리지 업데이트
          try {
            const loc = JSON.parse(localStorage.getItem(`ryzin_live_orders_${liveId}`) || '[]');
            const target = loc.find(l => (l.id && l.id === ord.id) || (l.pg_receipt_id && l.pg_receipt_id === receiptNo));
            if (target) {
              target.payment_status = 'cancelled';
              localStorage.setItem(`ryzin_live_orders_${liveId}`, JSON.stringify(loc));
            }
          } catch (e) {}

          alert('결제가 정상적으로 전체 취소 처리되었습니다.');
          closeModal();
          loadData();
        } catch (err) {
          alert('취소 처리 중 오류가 발생했습니다: ' + err.message);
          if (btnCancelAll) {
            btnCancelAll.disabled = false;
            btnCancelAll.textContent = '결제 전체 취소';
          }
        }
      });

      // ── 부분 취소 실행 핸들러 ──
      modalEl.querySelector('#btn-submit-partial-cancel')?.addEventListener('click', async () => {
        const amountInput = modalEl.querySelector('#partial-cancel-amount');
        const memoInput = modalEl.querySelector('#partial-cancel-memo');
        const cancelPrice = parseInt(amountInput?.value || 0, 10);
        const cancelMemo = memoInput?.value?.trim() || '관리자 부분 취소 처리';

        if (isNaN(cancelPrice) || cancelPrice <= 0) {
          alert('유효한 부분 취소 금액을 입력해주세요.');
          amountInput?.focus();
          return;
        }

        if (cancelPrice > currentAmount) {
          alert(`부분 취소 금액은 현재 결제 금액(${currentAmount.toLocaleString()}원)을 초과할 수 없습니다.`);
          amountInput?.focus();
          return;
        }

        if (!confirm(`${cancelPrice.toLocaleString()}원을 부분 취소하시겠습니까?\n남은 결제 금액: ${(currentAmount - cancelPrice).toLocaleString()}원`)) {
          return;
        }

        const submitBtn = modalEl.querySelector('#btn-submit-partial-cancel');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = '처리 중...';
        }

        try {
          // 1. PayApp 부분 취소 API 요청
          if (receiptNo && receiptNo !== '-' && receiptNo !== 'undefined') {
            try {
              const cancelRes = await fetch('/api/payapp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  cmd: 'paycancel',
                  mul_no: receiptNo,
                  cancelprice: cancelPrice,
                  cancelmemo: cancelMemo
                })
              });
              const cancelData = await cancelRes.json();
              if (!cancelData.success) {
                console.warn('PayApp partial cancel notice:', cancelData.message);
              }
            } catch (err) {
              console.warn('PayApp partial cancel request failed:', err);
            }
          }

          const remainingAmount = Math.max(0, currentAmount - cancelPrice);
          const nextStatus = remainingAmount === 0 ? 'cancelled' : 'paid';

          // 2. Supabase live_orders 테이블 업데이트
          if (db) {
            try {
              const updatePayload = {
                total_amount: remainingAmount,
                payment_status: nextStatus
              };
              if (ord.id) {
                await db.from('live_orders').update(updatePayload).eq('id', ord.id);
              } else if (receiptNo) {
                await db.from('live_orders').update(updatePayload).eq('pg_receipt_id', receiptNo);
              }
            } catch (e) {
              console.warn('DB partial cancel update failed:', e);
            }
          }

          // 3. 로컬 캐시 스토리지 업데이트
          try {
            const loc = JSON.parse(localStorage.getItem(`ryzin_live_orders_${liveId}`) || '[]');
            const target = loc.find(l => (l.id && l.id === ord.id) || (l.pg_receipt_id && l.pg_receipt_id === receiptNo));
            if (target) {
              target.total_amount = remainingAmount;
              target.payment_status = nextStatus;
              localStorage.setItem(`ryzin_live_orders_${liveId}`, JSON.stringify(loc));
            }
          } catch (e) {}

          alert(`${cancelPrice.toLocaleString()}원이 정상적으로 부분 취소되었습니다.`);
          closeModal();
          loadData();
        } catch (err) {
          alert('부분 취소 처리 중 오류가 발생했습니다: ' + err.message);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '부분 취소 실행';
          }
        }
      });
    };

    // ── [서브 뷰 2] 판매 순위 랭킹 렌더링 ──
    const renderRankingView = () => {
      const container = document.getElementById('ranking-table-container');
      if (!container) return;

      const paidOrders = currentOrders.filter(o => (o.payment_status || '').toLowerCase() === 'paid');

      const pMap = {};
      let grandTotalSales = 0;

      paidOrders.forEach(ord => {
        parseItems(ord).forEach(it => {
          const name = (it.name || it.goodname || '상품').trim();
          const qty = parseInt(it.quantity || it.qty || 1) || 1;
          const price = parseInt(it.price || 0) || Math.round((parseInt(ord.total_amount) || 0) / Math.max(1, parseItems(ord).length));
          const lineTotal = price * qty;
          grandTotalSales += lineTotal;

          if (!pMap[name]) {
            pMap[name] = { name, code: it.product_code || it.code || '-', unitPrice: price, totalQty: 0, totalAmount: 0, orderCount: 0 };
          }
          pMap[name].totalQty += qty;
          pMap[name].totalAmount += lineTotal;
          pMap[name].orderCount += 1;
        });
      });

      const list = Object.values(pMap);
      if (rankingSortBy === 'qty') {
        list.sort((a, b) => b.totalQty - a.totalQty || b.totalAmount - a.totalAmount);
      } else {
        list.sort((a, b) => b.totalAmount - a.totalAmount || b.totalQty - a.totalQty);
      }

      if (list.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:50px 20px; color:#94a3b8; font-size:13.5px;">
            실제 결제 완료된 판매 데이터가 아직 없습니다.
          </div>
        `;
        return;
      }

      let rowsHtml = '';
      list.forEach((it, idx) => {
        const rank = idx + 1;
        let rankBadge = `<span style="display:inline-block; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:700; background:#f1f5f9; color:#64748b;">${rank}위</span>`;
        if (rank === 1) {
          rankBadge = `<span style="display:inline-block; padding:3px 9px; border-radius:6px; font-size:11px; font-weight:800; background:#0f172a; color:#ffffff;">1위 TOP</span>`;
        } else if (rank === 2) {
          rankBadge = `<span style="display:inline-block; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:800; background:#e2e8f0; color:#1e293b;">2위</span>`;
        } else if (rank === 3) {
          rankBadge = `<span style="display:inline-block; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:700; background:#f8fafc; color:#334155; border:1px solid #e2e8f0;">3위</span>`;
        }

        const share = grandTotalSales > 0 ? ((it.totalAmount / grandTotalSales) * 100).toFixed(1) : 0;

        rowsHtml += `
          <tr style="border-bottom:1px solid #f1f5f9; font-size:13px; transition:background 0.12s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
            <td style="padding:12px 14px; text-align:center;">${rankBadge}</td>
            <td style="padding:12px 14px;">
              <span style="font-weight:700; color:#0f172a;">${it.name}</span>
              ${it.code && it.code !== '-' ? `<span style="font-size:11px; color:#94a3b8; margin-left:6px; font-family:monospace;">${it.code}</span>` : ''}
            </td>
            <td style="padding:12px 14px; text-align:right; color:#475569;">${it.unitPrice.toLocaleString()}원</td>
            <td style="padding:12px 14px; text-align:right; font-weight:800; color:#0f172a; font-size:14px;">${it.totalQty.toLocaleString()}개</td>
            <td style="padding:12px 14px; text-align:right; font-weight:800; color:#2563eb; font-size:14px;">${it.totalAmount.toLocaleString()}원</td>
            <td style="padding:12px 14px; width:170px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <div style="flex:1; height:6px; background:#e2e8f0; border-radius:3px; overflow:hidden;">
                  <div style="width:${share}%; height:100%; background:#2563eb; border-radius:3px;"></div>
                </div>
                <span style="font-size:11.5px; font-weight:700; color:#64748b; width:40px; text-align:right;">${share}%</span>
              </div>
            </td>
          </tr>
        `;
      });

      container.innerHTML = `
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead>
              <tr style="background:#f8fafc; border-bottom:1.5px solid #e2e8f0; font-size:12px; color:#64748b;">
                <th style="padding:11px 14px; font-weight:700; width:75px; text-align:center;">순위</th>
                <th style="padding:11px 14px; font-weight:700;">상품명</th>
                <th style="padding:11px 14px; font-weight:700; width:110px; text-align:right;">판매단가</th>
                <th style="padding:11px 14px; font-weight:700; width:100px; text-align:right;">판매수량</th>
                <th style="padding:11px 14px; font-weight:700; width:130px; text-align:right;">총 결제금액</th>
                <th style="padding:11px 14px; font-weight:700; width:170px;">매출 점유율</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      `;
    };

    // ── [서브 뷰 3] 1분 단위 시청자 통계 렌더링 ──
    const renderTimelineView = () => {
      let timeline = getLiveTimeline(liveId);
      const currentTotal = (stats.viewers || 0) + (stats.cumViewers || 0);

      if (!Array.isArray(timeline) || timeline.length === 0) {
        const nowStr = new Date().toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        timeline = [{ minute: 0, time: nowStr, viewers: currentTotal }];
        saveLiveTimeline(liveId, timeline);
      }

      let peakViewers = 0;
      timeline.forEach(t => {
        const v = parseInt(t.viewers) || 0;
        if (v > peakViewers) peakViewers = v;
      });

      const durEl = document.getElementById('timeline-duration-badge');
      if (durEl) {
        const lastMin = timeline.length > 0 ? timeline[timeline.length - 1].minute : 0;
        durEl.textContent = `측정 기록: 총 ${lastMin}분 (${timeline.length}회)`;
      }
      const infoEl = document.getElementById('timeline-chart-info');
      if (infoEl) infoEl.textContent = `총 ${timeline.length}분 측정 (최고 ${peakViewers.toLocaleString()}명)`;
      const countEl = document.getElementById('timeline-log-count-badge');
      if (countEl) countEl.textContent = `총 ${timeline.length}개 기록`;

      // 차트 렌더링
      const chartWrapper = document.getElementById('timeline-chart-content');
      if (chartWrapper) {
        const width = 800;
        const height = 150;
        const padLeft = 45;
        const padRight = 30;
        const padTop = 20;
        const padBottom = 26;

        const pW = width - padLeft - padRight;
        const pH = height - padTop - padBottom;
        const maxVal = Math.max(10, Math.ceil(peakViewers * 1.15));

        const getX = (idx) => timeline.length <= 1 ? padLeft + pW / 2 : padLeft + (idx / (timeline.length - 1)) * pW;
        const getY = (v) => padTop + pH - (v / maxVal) * pH;

        let pathD = '';
        let areaD = `M ${getX(0)} ${padTop + pH}`;
        let dotsSvg = '';

        timeline.forEach((pt, idx) => {
          const x = getX(idx);
          const y = getY(parseInt(pt.viewers) || 0);
          if (idx === 0) {
            pathD += `M ${x} ${y}`;
            areaD += ` L ${x} ${y}`;
          } else {
            pathD += ` L ${x} ${y}`;
            areaD += ` L ${x} ${y}`;
          }

          const isPeak = parseInt(pt.viewers) === peakViewers && peakViewers > 0;
          dotsSvg += `
            <circle cx="${x}" cy="${y}" r="${isPeak ? 5 : 3}" fill="${isPeak ? '#ef4444' : '#2563eb'}" stroke="#ffffff" stroke-width="1.5">
              <title>방송 ${pt.minute}분 후 (${pt.time}): ${pt.viewers}명 시청</title>
            </circle>
          `;
        });
        areaD += ` L ${getX(timeline.length - 1)} ${padTop + pH} Z`;

        chartWrapper.innerHTML = `
          <svg viewBox="0 0 ${width} ${height}" style="width:100%; height:100%; display:block; overflow:visible;">
            <defs>
              <linearGradient id="chatTimelineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#2563eb" stop-opacity="0.18"/>
                <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <line x1="${padLeft}" y1="${padTop + pH}" x2="${width - padRight}" y2="${padTop + pH}" stroke="#e2e8f0" stroke-width="1"/>
            <line x1="${padLeft}" y1="${padTop}" x2="${width - padRight}" y2="${padTop}" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2 2"/>
            <path d="${areaD}" fill="url(#chatTimelineGrad)"/>
            <path d="${pathD}" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            ${dotsSvg}
          </svg>
        `;
      }

      // 테이블 렌더링
      const tableContainer = document.getElementById('timeline-table-container');
      if (tableContainer) {
        let rowsHtml = '';
        const reversed = [...timeline].reverse();
        reversed.forEach(it => {
          const origIdx = timeline.findIndex(t => t.minute === it.minute);
          let diffStr = '<span style="color:#94a3b8;">-</span>';
          if (origIdx > 0) {
            const diff = (parseInt(it.viewers) || 0) - (parseInt(timeline[origIdx - 1].viewers) || 0);
            if (diff > 0) diffStr = `<span style="color:#ef4444; font-weight:700;">+${diff}명 ▲</span>`;
            else if (diff < 0) diffStr = `<span style="color:#2563eb; font-weight:700;">${diff}명 ▼</span>`;
            else diffStr = '<span style="color:#64748b;">0명</span>';
          }

          rowsHtml += `
            <tr style="border-bottom:1px solid #f1f5f9; font-size:12.5px;">
              <td style="padding:10px 14px; font-weight:700; color:#0f172a; font-family:monospace;">${it.minute === 0 ? '방송 시작 (0분)' : `방송 ${it.minute}분 후`}</td>
              <td style="padding:10px 14px; color:#64748b; font-family:monospace;">${it.time}</td>
              <td style="padding:10px 14px; text-align:right; font-weight:800; color:#0f172a;">${(parseInt(it.viewers) || 0).toLocaleString()}명</td>
              <td style="padding:10px 14px; text-align:right;">${diffStr}</td>
            </tr>
          `;
        });

        tableContainer.innerHTML = `
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead style="background:#f8fafc; border-bottom:1.5px solid #e2e8f0; font-size:12px; color:#64748b; position:sticky; top:0;">
              <tr>
                <th style="padding:10px 14px; font-weight:700;">방송 경과</th>
                <th style="padding:10px 14px; font-weight:700;">측정 시각</th>
                <th style="padding:10px 14px; font-weight:700; text-align:right;">시청자 수</th>
                <th style="padding:10px 14px; font-weight:700; text-align:right;">직전 1분 대비</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        `;
      }
    };

    // ── CSV 다운로드 핸들러 ──
    const downloadOrdersCsv = () => {
      let csv = '주문일시,주문상품목록,결제금액,주문자명,연락처,결제상태,주문번호\n';
      currentOrders.forEach(ord => {
        const dateStr = ord.created_at ? new Date(ord.created_at).toLocaleString() : '';
        const itemsSummary = `"${parseItems(ord).map(it => `${it.name}(${it.quantity}개)`).join(', ')}"`;
        const amount = ord.total_amount || 0;
        const name = `"${ord.customer_name || ord.buyer_name || ''}"`;
        const phone = `"${ord.customer_phone || ord.buyer_phone || ''}"`;
        const pStatus = (ord.payment_status || 'payapp_requested').toLowerCase();
        const statusStr = pStatus === 'paid' ? '결제완료' : cancelStatuses.includes(pStatus) ? '취소/환불' : '결제대기';
        const receipt = `"${ord.pg_receipt_id || ord.receipt_id || ord.order_number || ''}"`;
        csv += `${dateStr},${itemsSummary},${amount},${name},${phone},${statusStr},${receipt}\n`;
      });
      const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `주문내역_${liveId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const downloadRankingCsv = () => {
      const paidOrders = currentOrders.filter(o => (o.payment_status || '').toLowerCase() === 'paid');
      const pMap = {};
      paidOrders.forEach(ord => {
        parseItems(ord).forEach(it => {
          const name = (it.name || it.goodname || '상품').trim();
          const qty = parseInt(it.quantity || it.qty || 1) || 1;
          const price = parseInt(it.price || 0) || Math.round((parseInt(ord.total_amount) || 0) / Math.max(1, parseItems(ord).length));
          if (!pMap[name]) pMap[name] = { name, price, qty: 0, amount: 0 };
          pMap[name].qty += qty;
          pMap[name].amount += price * qty;
        });
      });
      const list = Object.values(pMap).sort((a, b) => b.qty - a.qty);
      let csv = '순위,상품명,판매단가,총판매수량,총결제금액\n';
      list.forEach((it, idx) => {
        csv += `${idx + 1},"${it.name.replace(/"/g, '""')}",${it.price},${it.qty},${it.amount}\n`;
      });
      const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `상품판매순위_${liveId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const downloadTimelineCsv = () => {
      const timeline = getLiveTimeline(liveId);
      let csv = '방송경과(분),기록시각,실시간시청자수(명)\n';
      timeline.forEach(t => {
        csv += `${t.minute},${t.time},${t.viewers}\n`;
      });
      const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `시청자_1분단위_로그_${liveId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    // ── 이벤트 바인딩 ──
    loadData();

    document.getElementById('btn-refresh-orders')?.addEventListener('click', loadData);
    document.getElementById('btn-download-orders-csv')?.addEventListener('click', downloadOrdersCsv);
    document.getElementById('btn-download-ranking-csv')?.addEventListener('click', downloadRankingCsv);
    document.getElementById('btn-download-timeline-csv')?.addEventListener('click', downloadTimelineCsv);

    document.getElementById('subtab-product-filter')?.addEventListener('change', (e) => {
      selectedProductFilter = e.target.value;
      renderOrdersView();
    });
    document.getElementById('subtab-order-search')?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderOrdersView();
    });

    const btnSortQty = document.getElementById('rank-sort-qty');
    const btnSortAmt = document.getElementById('rank-sort-amount');
    if (btnSortQty && btnSortAmt) {
      btnSortQty.addEventListener('click', () => {
        rankingSortBy = 'qty';
        btnSortQty.style.background = '#fff';
        btnSortQty.style.color = '#0f172a';
        btnSortQty.style.fontWeight = '700';
        btnSortQty.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
        btnSortAmt.style.background = 'transparent';
        btnSortAmt.style.color = '#64748b';
        btnSortAmt.style.fontWeight = '600';
        btnSortAmt.style.boxShadow = 'none';
        renderRankingView();
      });
      btnSortAmt.addEventListener('click', () => {
        rankingSortBy = 'amount';
        btnSortAmt.style.background = '#fff';
        btnSortAmt.style.color = '#0f172a';
        btnSortAmt.style.fontWeight = '700';
        btnSortAmt.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
        btnSortQty.style.background = 'transparent';
        btnSortQty.style.color = '#64748b';
        btnSortQty.style.fontWeight = '600';
        btnSortQty.style.boxShadow = 'none';
        renderRankingView();
      });
    }

    // ── 서브 탭 전환 이벤트 (채팅관리 탭 표준 로직) ──
    const subTabBtns = contentArea.querySelectorAll('.order-sub-tab-btn');
    const subViews = contentArea.querySelectorAll('.order-sub-view');
    subTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        subTabBtns.forEach(b => {
          b.classList.remove('active');
          b.style.background = 'transparent';
          b.style.color = '#64748b';
          b.style.fontWeight = '600';
          b.style.boxShadow = 'none';
        });
        btn.classList.add('active');
        btn.style.background = '#fff';
        btn.style.color = '#0f172a';
        btn.style.fontWeight = '700';
        btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

        subViews.forEach(v => v.style.display = 'none');
        const targetView = document.getElementById(`order-sub-${btn.dataset.subtab}`);
        if (targetView) targetView.style.display = 'block';

        if (btn.dataset.subtab === 'timeline') renderTimelineView();
      });
    });

    if (initialSubTab && initialSubTab !== 'orders') {
      const initBtn = contentArea.querySelector(`.order-sub-tab-btn[data-subtab="${initialSubTab}"]`);
      if (initBtn) initBtn.click();
    }

    statsTimer = setInterval(() => {
      updateKpis();
      renderTimelineView();
    }, 30000);

    contentArea.addEventListener('adminTabLeave', () => {
      if (statsTimer) clearInterval(statsTimer);
    }, { once: true });
  };

  const renderStatsTab = () => renderOrdersTab('ranking');


  // ── 탭 전환 로직 ──────────────────────────────────────────
  const btnBack = layout.querySelector('#btn-back');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      contentArea.dispatchEvent(new Event('adminTabLeave'));
      cleanUpOnAirTimer();
      if (botTimer) clearInterval(botTimer);
      if (adminSyncChannel) db.removeChannel(adminSyncChannel);
      if (botChatChannel) db.removeChannel(botChatChannel);
      showView(null);
    });
  }

  const btnRefresh = layout.querySelector('#btn-refresh-preview');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      const iframe = layout.querySelector('#live-preview-iframe');
      if (iframe) iframe.src = previewUrl;
    });
  }

  // ── 실시간 봇 자동응답 구독 (탭 무관 백그라운드) ──
  let botChatChannel = null;
  const subscribeBotSync = () => {
    if (!db) return;
    botChatChannel = db.channel(`bot-sync-${liveId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'live_chats', filter: `live_id=eq.${liveId}` }, payload => {
        const c = payload.new;
        if (!c) return;
        if (botCfg.autoReplyActive && botCfg.autoReplyRules && botCfg.autoReplyRules.length > 0) {
          const sender = c.nickname || '';
          if (!sender.includes('|') && sender !== '관리자' && sender !== '자동응답봇') {
            const msg = (c.content || '').toLowerCase();
            for (const rule of botCfg.autoReplyRules) {
              const keywords = rule.keywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
              if (keywords.some(k => msg.includes(k))) {
                setTimeout(async () => {
                  try {
                    if (!db) return;
                    await db.from('live_chats').insert([{
                      live_id: liveId,
                      nickname: '자동응답봇',
                      content: rule.answer,
                      created_at: Date.now().toString()
                    }]);
                  } catch (e) {
                    console.warn('Auto-reply failed', e);
                  }
                }, 600);
                break;
              }
            }
          }
        }
      })
      .subscribe();
  };
  subscribeBotSync();

  // ── 실시간 어드민 동기화 (다중 접속 처리) ──
  let adminSyncChannel = null;
  const subscribeAdminSync = () => {
    if (!db) return;
    adminSyncChannel = db.channel(`admin-sync-${liveId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'live_control', filter: `live_id=eq.${liveId}` }, payload => {
        const newData = payload.new;
        if (!newData) return;

        // 로컬 config 갱신
        config.brandName = newData.title || '';
        config.title = newData.subtitle || '';
        const logoStr = newData.profile_image || '';
        let widgetText = '라이브 보기';
        let widgetPosition = 'right';
        let widgetImageUrl = '';
        let showOnMain = false;
        let showNoticeNote = true;
        let noticeNoteTitle = '';
        let noticeNoteContent = '';

        const hashParts = logoStr.split('#');
        let cleanLogoUrl = hashParts[0];

        hashParts.slice(1).forEach(part => {
          if (part === 'nosplash') {
            // nosplash flag
          } else if (part.startsWith('widgetText=')) {
            widgetText = decodeURIComponent(part.replace('widgetText=', ''));
          } else if (part.startsWith('widgetPosition=')) {
            widgetPosition = part.replace('widgetPosition=', '');
          } else if (part.startsWith('widgetImageUrl=')) {
            widgetImageUrl = part.replace('widgetImageUrl=', '');
          } else if (part.startsWith('showOnMain=')) {
            showOnMain = part.replace('showOnMain=', '') === 'true';
          } else if (part.startsWith('showNoticeNote=')) {
            showNoticeNote = part.replace('showNoticeNote=', '') !== 'false';
          } else if (part.startsWith('noticeNoteTitle=')) {
            noticeNoteTitle = decodeURIComponent(part.replace('noticeNoteTitle=', ''));
          } else if (part.startsWith('noticeNoteContent=')) {
            noticeNoteContent = decodeURIComponent(part.replace('noticeNoteContent=', ''));
          }
        });

        config.showSplash = !logoStr.includes('#nosplash');
        config.logoUrl = cleanLogoUrl;
        config.widgetText = widgetText;
        config.widgetPosition = widgetPosition;
        config.widgetImageUrl = widgetImageUrl;
        config.showOnMain = showOnMain;
        config.showNoticeNote = showNoticeNote;
        config.noticeNoteTitle = noticeNoteTitle;
        config.noticeNoteContent = noticeNoteContent;
        config.streamUrl = newData.stream_url || '';
        config.showViewers = newData.show_viewers !== false;
        config.thumbnailUrl = newData.thumbnail_url || '';
        config.liveStartTime = newData.start_time || '';
        config.isLive = newData.status === 'ON';
        config.shareTitle = newData.share_title || '';
        config.shareDesc = newData.share_desc || '';
        config.shareImageUrl = newData.share_image || '';
        config.likeImageUrl = newData.like_image_url || '';
        config.bannedWords = newData.banned_words || '';
        config.bannedUsers = newData.banned_users || '';
        if (newData.winner_name !== undefined) config.winner_name = newData.winner_name;
        if (newData.winner_timestamp !== undefined) config.winner_timestamp = newData.winner_timestamp;
        if (newData.viewers !== undefined) stats.viewers = parseInt(newData.viewers) || 0;
        if (newData.cum_viewers !== undefined) stats.cumViewers = parseInt(newData.cum_viewers) || 0;
        if (newData.hearts !== undefined) stats.hearts = parseInt(newData.hearts) || 0;
        saveLiveConfig(liveId, config);
        saveLiveStats(liveId, stats);

        if (typeof window.updateAdminViewersDisplay === 'function') {
          window.updateAdminViewersDisplay();
        }

        // 입력 중인 엘리먼트는 제외하고 UI 갱신 (타이핑 증발 방지)
        const safeUpdate = (id, val) => {
          const el = layout.querySelector('#' + id) || document.getElementById(id);
          if (el && document.activeElement !== el) {
            if (el.type === 'checkbox') el.checked = Boolean(val);
            else el.value = val;
          }
        };

        safeUpdate('cfg-brandName', config.brandName);
        safeUpdate('cfg-title', config.title);
        safeUpdate('cfg-stream', config.streamUrl);
        safeUpdate('cfg-showViewers', config.showViewers);
        safeUpdate('cfg-liveStartTime', config.liveStartTime);
        safeUpdate('cfg-shareTitle', config.shareTitle);
        safeUpdate('cfg-shareDesc', config.shareDesc);
        safeUpdate('cfg-bannedWords', config.bannedWords);
        safeUpdate('cfg-bannedUsers', config.bannedUsers);

        // 이미지 갱신
        const logoPreview = layout.querySelector('#logo-preview') || document.getElementById('logo-preview');
        if (logoPreview) logoPreview.src = config.logoUrl;
        const thumbPreview = layout.querySelector('#thumbnail-preview') || document.getElementById('thumbnail-preview');
        if (thumbPreview) thumbPreview.src = config.thumbnailUrl;
        const likePreview = layout.querySelector('#like-preview') || document.getElementById('like-preview');
        if (likePreview) {
          likePreview.src = config.likeImageUrl;
          likePreview.style.display = config.likeImageUrl ? 'block' : 'none';
        }
        const likePlaceholder = layout.querySelector('#like-preview-placeholder') || document.getElementById('like-preview-placeholder');
        if (likePlaceholder) likePlaceholder.style.display = config.likeImageUrl ? 'none' : 'block';
        const btnClearLike = layout.querySelector('#btn-clear-like-icon') || document.getElementById('btn-clear-like-icon');
        if (btnClearLike) btnClearLike.style.display = config.likeImageUrl ? 'block' : 'none';

        // 상태 토글 버튼 갱신
        const liveToggleBtn = layout.querySelector('#btn-toggle-live') || document.getElementById('btn-toggle-live');
        if (liveToggleBtn && document.activeElement !== liveToggleBtn) {
          liveToggleBtn.textContent = config.isLive ? '라이브 종료' : '라이브 시작';
          liveToggleBtn.className = `action-btn ${config.isLive ? 'btn-danger-solid' : 'btn-success-solid'}`;
        }

        // 상품 목록 갱신 (포커스 방해 없을 때만)
        if (newData.products && Array.isArray(newData.products)) {
          const newProductsStr = JSON.stringify(newData.products);
          if (JSON.stringify(products) !== newProductsStr) {
            if (!Array.isArray(products)) products = [];
            products.length = 0;
            products.push(...newData.products);
            saveLiveProductsLocal(liveId, products);
            const plc = layout.querySelector('#product-list-container') || document.getElementById('product-list-container');
            if (plc && !plc.contains(document.activeElement)) {
              if (typeof renderProductList === 'function') {
                plc.innerHTML = renderProductList();
              }
            }
          }
        }
      })
      .subscribe();
  };
  subscribeAdminSync();

  // ── 전역 실시간 통계 및 1분 단위 시청자 타임라인 자동 로깅 ──
  let globalStatsPollingInterval = null;
  let lastTimelineMinuteLogged = -1;

  const startGlobalStatsPolling = () => {
    if (!db) return;
    globalStatsPollingInterval = setInterval(async () => {
      try {
        const { data, error } = await db
          .from('live_control')
          .select('viewers, cum_viewers, hearts, status')
          .eq('live_id', liveId)
          .maybeSingle();
        if (data && !error) {
          stats.viewers = parseInt(data.viewers) || 0;
          stats.cumViewers = parseInt(data.cum_viewers) || 0;
          stats.hearts = parseInt(data.hearts) || 0;
          saveLiveStats(liveId, stats);
          if (typeof window.updateAdminViewersDisplay === 'function') {
            window.updateAdminViewersDisplay();
          }

          // 방송 중일 때 1분마다 시청자 타임라인 자동 로깅 (정확도 높은 시계열 기록)
          if (config.isLive || data.status === 'ON') {
            const startedAt = config.liveStartedAt ? new Date(config.liveStartedAt).getTime() : Date.now();
            const elapsedMin = Math.max(0, Math.floor((Date.now() - startedAt) / 60000));

            if (elapsedMin !== lastTimelineMinuteLogged) {
              lastTimelineMinuteLogged = elapsedMin;
              const timeline = getLiveTimeline(liveId);
              const nowStr = new Date().toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
              const currentTotal = stats.viewers + (stats.cumViewers || 0);

              const existingIdx = timeline.findIndex(t => t.minute === elapsedMin);
              if (existingIdx >= 0) {
                timeline[existingIdx].viewers = Math.max(timeline[existingIdx].viewers, currentTotal);
                timeline[existingIdx].time = nowStr;
              } else {
                timeline.push({ minute: elapsedMin, time: nowStr, viewers: currentTotal });
              }
              saveLiveTimeline(liveId, timeline);
            }
          }
        }
      } catch (e) {}
    }, 2500);
  };
  startGlobalStatsPolling();

  const tabBtns = topBar.querySelectorAll('.tab-btn');
  const switchTab = (tabName) => {
    contentArea.dispatchEvent(new Event('adminTabLeave'));
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
    if (tabName === 'config') renderConfigTab();
    else if (tabName === 'chat') renderChatTab();
    else if (tabName === 'product') renderProductTab();
    else if (tabName === 'orders') renderOrdersTab();
    else if (tabName === 'stats') renderStatsTab();
    else if (tabName === 'leads') renderLeadsTab();
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // 기본 탭 렌더링 분기
  if (isRestricted) {
    renderChatTab();
  } else {
    renderConfigTab();
  }
}
