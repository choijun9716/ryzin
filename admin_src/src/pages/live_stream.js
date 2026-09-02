// ============================================================
//  RYZIN LIVE STREAM ADMIN — 멀티 라이브 관리 시스템
//  - 라이브 목록 관리 (live01, live02 ...)
//  - 각 라이브 독립 SheetDB 데이터 (live_id 컬럼으로 구분)
//  - 시청자 URL: /live?id=live01
// ============================================================

import { store } from '../data/store.js';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';

// ─── 공통 유틸 ───────────────────────────────────────────────
const getLives = () => JSON.parse(localStorage.getItem('ryzin_lives') || '[]');
const saveLives = (list) => localStorage.setItem('ryzin_lives', JSON.stringify(list));

const getLiveConfig = (liveId) => JSON.parse(localStorage.getItem(`ryzin_config_${liveId}`) || 'null');
const saveLiveConfig = (liveId, data) => localStorage.setItem(`ryzin_config_${liveId}`, JSON.stringify(data));

const getLiveStats = (liveId) => JSON.parse(localStorage.getItem(`ryzin_stats_${liveId}`) || JSON.stringify({ viewers: 0, hearts: 0, cumViewers: 0 }));
const saveLiveStats = (liveId, data) => localStorage.setItem(`ryzin_stats_${liveId}`, JSON.stringify(data));

const getLiveProducts = (liveId) => JSON.parse(localStorage.getItem(`ryzin_products_${liveId}`) || '[]');
const saveLiveProductsLocal = (liveId, data) => {
  localStorage.setItem(`ryzin_products_${liveId}`, JSON.stringify(data));
  localStorage.setItem(`ryzin_live_products_${liveId}`, JSON.stringify(data));
};

const getBotConfig = (liveId) => JSON.parse(localStorage.getItem(`ryzin_bot_${liveId}`) || JSON.stringify({ list: '', interval: 10, autoReplyRules: [], autoReplyActive: true }));
const saveBotConfig = (liveId, data) => localStorage.setItem(`ryzin_bot_${liveId}`, JSON.stringify(data));

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
                     `#useStandbyImage=${config.useStandbyImage === true}`,
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

  const renderList = async () => {
    if (db) {
      try {
        const { data, error } = await db.from('live_control').select('live_id, updated_at, status, title, subtitle');
        if (!error && data && Array.isArray(data)) {
          const localLives = getLives();
          const deletedLives = JSON.parse(localStorage.getItem('ryzin_deleted_lives') || '[]');
          data.forEach(row => {
            if (row.live_id && !deletedLives.includes(row.live_id)) {
              if (!localLives.some(l => l.id === row.live_id)) {
                localLives.push({ id: row.live_id, createdAt: new Date(row.updated_at).getTime() });
              }
              // DB의 개별 라이브 status('ON'/'OFF')를 해당 live_id localConfig에 정확히 반영
              const cfg = getLiveConfig(row.live_id) || {};
              cfg.isLive = (row.status === 'ON');
              if (row.title) cfg.brandName = row.title;
              if (row.subtitle) cfg.title = row.subtitle;
              saveLiveConfig(row.live_id, cfg);
            }
          });
          saveLives(localLives);
        }
      } catch (e) { console.warn('Failed to load remote lives', e); }
    }

    let lives = getLives();
    // 특정 라이브 전용 로그인 상태인 경우, 해당 라이브 ID만 필터링
    if (isLiveStreamOnly && targetLiveId) {
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

    // 생성된 시간(createdAt) 순으로 정렬
    lives.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
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

    lives.forEach((live, idx) => {
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
      listContainer.appendChild(card);
    });

    listContainer.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        showView(btn.dataset.id);
      });
    });
    listContainer.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
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

          const deleted = JSON.parse(localStorage.getItem('ryzin_deleted_lives') || '[]');
          if (!deleted.includes(id)) {
            deleted.push(id);
            localStorage.setItem('ryzin_deleted_lives', JSON.stringify(deleted));
          }
          
          if (db) {
            try {
              await db.from('live_chats').delete().eq('live_id', id);
              await db.from('live_control').delete().eq('live_id', id);
            } catch(err) {
              console.warn('Supabase delete failed', err);
            }
          }

          renderList();
        }
      });
    });

    listContainer.querySelectorAll('.live-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
        const id = card.querySelector('.btn-edit').dataset.id;
        showView(id);
      });
    });
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
  const isRestricted = isLiveStreamOnly || isBrandPartner;

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
            if (Array.isArray(pData)) {
              if (!products || products.length === 0) {
                // 로컬에 데이터 없으면 DB 데이터를 그대로 사용
                products.length = 0;
                products.push(...pData);
              } else {
                // 로컬에 데이터 있으면 DB에서 price, normalPrice, discountRate, clicks, image 동기화
                products.forEach(localProd => {
                  const dbProd = pData.find(d => d.id === localProd.id || d.name === localProd.name);
                  if (dbProd) {
                    // price/normalPrice는 DB 값이 최신이므로 동기화
                    if (dbProd.price !== undefined) localProd.price = dbProd.price;
                    if (dbProd.normalPrice !== undefined) localProd.normalPrice = dbProd.normalPrice;
                    if (dbProd.discountRate !== undefined) localProd.discountRate = dbProd.discountRate;
                    localProd.clicks = parseInt(dbProd.clicks) || 0;
                    if (!localProd.image && dbProd.image) localProd.image = dbProd.image;
                  }
                });
              }
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

  const saveConfig = () => {
    saveLiveConfig(liveId, config);
    syncToSheetDB(liveId, config, stats, products);
  };
  const saveStats = () => {
    saveLiveStats(liveId, stats);
    syncToSheetDB(liveId, config, stats, products);
  };
  const saveProducts = (force = true) => {
    saveLiveProductsLocal(liveId, products);
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
    ? `<button class="tab-btn active" data-tab="chat" style="flex:1; text-align:center; padding:6px 12px; font-size:13px; border-radius:8px;">채팅 / 봇 관리</button>`
    : `
      <button class="tab-btn active" data-tab="config" style="flex:1; text-align:center; padding:6px 10px; font-size:13px; border-radius:8px;">라이브 기본설정</button>
      <button class="tab-btn" data-tab="chat" style="flex:1; text-align:center; padding:6px 10px; font-size:13px; border-radius:8px;">채팅 / 봇 관리</button>
      <button class="tab-btn" data-tab="product" style="flex:1; text-align:center; padding:6px 10px; font-size:13px; border-radius:8px;">상품 관리</button>
      <button class="tab-btn" data-tab="orders" style="flex:1; text-align:center; padding:6px 10px; font-size:13px; border-radius:8px;">주문 관리</button>
      <button class="tab-btn" data-tab="leads" style="flex:1; text-align:center; padding:6px 10px; font-size:13px; border-radius:8px;">상담 DB</button>
    `;

  topBar.innerHTML = `
    <button id="btn-back" class="action-btn btn-neutral" style="padding:8px 14px; font-size:13px; display:flex; align-items:center; gap:4px;"><span style="font-size:14px; line-height:1;">←</span> 목록</button>
    <div style="display:flex; align-items:center; gap:10px; min-width: 180px; max-width: 480px; flex-shrink:0;">
      <span style="font-size:12px; font-weight:700; color:#64748b; background:#f1f5f9; padding:4px 10px; border-radius:6px; font-family:monospace; line-height:1; flex-shrink:0;">${liveId}</span>
      <span style="font-size:15px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:240px; line-height:1.2;" title="${config.brandName || ''}">${config.brandName || ''}</span>
      ${statusBadge}
    </div>
    <div style="display:flex; gap:4px; background:#f1f5f9; padding:4px; border-radius:10px; flex:1; justify-content:center; max-width:540px; margin:0 auto;">
      ${tabBtnsHtml}
    </div>
    <div style="display:flex; align-items:center; gap:8px; padding:6px 0; flex-shrink:0;">
      <span style="font-size:12px; color:#475569; font-weight:700; white-space:nowrap;">시청자 URL</span>
      <span style="font-size:12px; color:#0f172a; font-family:monospace; font-weight:600; white-space:nowrap; margin-right:4px;">ryzincorp.com/live/${liveId}</span>
      <button id="btn-copy-live-url" class="action-btn btn-neutral" style="padding:4px 10px; font-size:11px; height:28px; line-height:1; border-radius:6px; border:1px solid #cbd5e1; background:#fff; cursor:pointer; font-weight:700; white-space:nowrap;">복사</button>
    </div>
  `;
  leftPanel.appendChild(topBar);

  // URL 복사 이벤트 리스너 추가
  setTimeout(() => {
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
  const previewUrl = `${previewBase}?id=${liveId}&v=202608121330`;

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
              <img id="standby-image-preview" src="${config.standbyImageUrl || ''}" style="width:100%; height:100%; object-fit:cover; display:${config.standbyImageUrl ? 'block' : 'none'};">
              <span id="standby-image-placeholder" style="font-size:11px; font-weight:700; color:#94a3b8; display:${config.standbyImageUrl ? 'none' : 'block'};">예비</span>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                <label class="modern-label" style="margin:0;">예비 썸네일</label>
                <input type="checkbox" id="cfg-useStandbyImage" style="width:15px; height:15px; accent-color:#3b82f6; cursor:pointer;" ${config.useStandbyImage ? 'checked' : ''} title="예비 썸네일 송출 ON/OFF">
                <span id="cfg-useStandbyImage-label" style="font-size:11px; font-weight:700; color:${config.useStandbyImage ? '#2563eb' : '#94a3b8'};">${config.useStandbyImage ? 'ON' : 'OFF'}</span>
              </div>
              <div style="display:flex; gap:4px;">
                <label class="file-upload-btn" style="margin:0; padding:6px 12px; font-size:12px;" for="cfg-standbyImageFile">업로드</label>
                <button id="btn-clear-standby-image" class="action-btn btn-neutral" style="padding:4px 6px; font-size:11px; height:28px; border-color:#fee2e2; background:#fff5f5; color:#ef4444; display:${config.standbyImageUrl ? 'block' : 'none'};">삭제</button>
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
          <button id="btn-reset-stats" class="action-btn btn-danger-solid" style="padding:8px 14px; font-size:13px;">통계 초기화</button>
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
      saveConfig();
      saveStats();
      syncToSheetDB(liveId, config, stats, products, true);
      topBar.querySelector('span[style*="font-weight:700; color:#0f172a"]').textContent = config.brandName;

      saveBtn.disabled = false;
      saveBtn.textContent = '설정 저장';
      alert('✅ 설정 저장 완료!');
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
        <button class="chat-sub-tab-btn" data-subtab="bot" style="flex:1; padding:8px 0; font-size:13px; font-weight:600; border:none; background:transparent; color:#64748b; border-radius:8px; cursor:pointer;">채팅 봇 관리</button>
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
        
        <!-- 관리자 닉네임 / 컬러 설정 영역 -->
        <div style="display:flex; gap:16px; margin-bottom:16px; background:#f8fafc; padding:12px 16px; border-radius:10px; border:1px solid #e2e8f0; align-items:flex-end;">
          <div style="flex:1;">
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
    botListEl.addEventListener('input', () => { botCfg.list = botListEl.value; saveBotCfg(); });
    botIntervalEl.addEventListener('input', () => { botCfg.interval = parseInt(botIntervalEl.value) || 10; saveBotCfg(); });

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

    document.getElementById('btn-toggle-bot').addEventListener('click', () => {
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

    const addAdminChatItem = (name, text, isHistory = false) => {
      if (chatList.innerHTML.includes('실시간 채팅 내역이 여기에')) chatList.innerHTML = '';
      const div = document.createElement('div');
      div.style.cssText = 'margin-bottom:8px; padding:6px 0; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;' + (isHistory ? 'opacity:0.72;' : '');
      const nameColor = name === '관리자' || name.includes('|') ? '#3b82f6' : '#64748b';
      
      let cleanName = name;
      let isAdmin = false;
      if (name.includes('|')) {
        cleanName = name.split('|')[0];
        isAdmin = true;
      } else if (name === '관리자') {
        isAdmin = true;
      }

      const banBtnHtml = (!isAdmin && cleanName !== '?') 
        ? `<button class="btn-ban-user" data-nickname="${cleanName}" style="background:#ef4444; color:#fff; border:none; border-radius:4px; padding:2px 8px; font-size:11px; font-weight:700; cursor:pointer; margin-left:8px; line-height:1.4; flex-shrink:0;">차단</button>` 
        : '';

      div.innerHTML = `
        <div style="flex:1; min-width:0; word-break:break-all; font-size:13px;">
          <span style="font-weight:700; color:${nameColor};">${cleanName}:</span> ${text}
        </div>
        ${banBtnHtml}
      `;

      const banBtn = div.querySelector('.btn-ban-user');
      if (banBtn) {
        banBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetNick = banBtn.dataset.nickname;
          if (confirm(`📡 [${targetNick}] 시청자를 차단하시겠습니까?\n차단 이후에는 이 시청자의 채팅 전송이 제한됩니다.`)) {
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
    return `
    <div class="product-row">
      <div class="product-img-box" onclick="document.getElementById('upload-prod-${idx}').click()" title="클릭하여 이미지 변경">
        <img src="${p.image || 'https://via.placeholder.com/72'}" id="img-prev-${idx}">
        <input type="file" id="upload-prod-${idx}" accept="image/*" style="display:none;" data-idx="${idx}" class="prod-img-upload">
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
            <span style="font-size:12px; color:#10b981; font-weight:700; background:#ecfdf5; padding:6px 12px; border-radius:8px; border:1px solid #a7f3d0;">실시간 자동 반영</span>
            <button id="btn-add-product" class="action-btn btn-primary-solid" style="padding:8px 16px; font-size:13px;">+ 상품 추가</button>
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

      // 실시간 숫자 콤마 포맷팅 + blur 시 즉시 저장
      plc.querySelectorAll('.price-input').forEach(input => {
        input.addEventListener('input', (e) => {
          let val = e.target.value.replace(/[^0-9]/g, '');
          e.target.value = val ? Number(val).toLocaleString() : '';
        });
        // blur 이벤트: 포커스 이탈 시 change와 동일하게 저장 처리
        input.addEventListener('blur', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          const field = e.target.dataset.field;
          if (field === 'price' || field === 'normalPrice') {
            const cleaned = e.target.value.replace(/[^0-9]/g, '');
            products[idx][field] = cleaned;
            const n = Number((products[idx].normalPrice || '').toString().replace(/[^0-9]/g, ''));
            const p = Number((products[idx].price || '').toString().replace(/[^0-9]/g, ''));
            if (n > 0 && n >= p) {
              products[idx].discountRate = Math.floor(((n - p) / n) * 100);
              const ri = plc.querySelector(`input[data-idx="${idx}"][data-field="discountRate"]`);
              if (ri) ri.value = products[idx].discountRate;
            } else {
              products[idx].discountRate = 0;
              const ri = plc.querySelector(`input[data-idx="${idx}"][data-field="discountRate"]`);
              if (ri) ri.value = 0;
            }
            saveProducts();
          }
        });
      });

      plc.querySelectorAll('input[data-field]').forEach(input => {
        const handleAutoSave = (e) => {
          const idx = parseInt(e.target.dataset.idx);
          const field = e.target.dataset.field;
          if (e.target.type === 'checkbox') {
            products[idx][field] = e.target.checked;
            if (field === 'isFreeGiveaway') {
              if (e.target.checked) {
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
              if (e.target.checked) {
                products[idx].url = '__LEAD_FORM__';
              } else if (products[idx].url === '__LEAD_FORM__') {
                products[idx].url = '';
              }
              saveProducts(true);
              plc.innerHTML = renderProductList();
              bindProductEvents();
              return;
            }
          } else {
            if (field === 'price' || field === 'normalPrice') {
              products[idx][field] = e.target.value.replace(/[^0-9]/g, '');
            } else {
              products[idx][field] = e.target.value;
            }
          }
          if (field === 'price' || field === 'normalPrice') {
            const n = Number((products[idx].normalPrice || '').toString().replace(/[^0-9]/g, ''));
            const p = Number((products[idx].price || '').toString().replace(/[^0-9]/g, ''));
            if (n > 0 && n >= p) {
              products[idx].discountRate = Math.floor(((n - p) / n) * 100);
              const ri = plc.querySelector(`input[data-idx="${idx}"][data-field="discountRate"]`);
              if (ri) ri.value = products[idx].discountRate;
            } else {
              products[idx].discountRate = 0;
              const ri = plc.querySelector(`input[data-idx="${idx}"][data-field="discountRate"]`);
              if (ri) ri.value = 0;
            }
          }
          saveProducts(true);
        };
        input.addEventListener('change', handleAutoSave);
        input.addEventListener('blur', handleAutoSave);
      });
      plc.querySelectorAll('.prod-img-upload').forEach(input => {
        input.addEventListener('change', async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const idx = parseInt(e.target.dataset.idx);
          const preview = document.getElementById(`img-prev-${idx}`);
          if (preview) preview.style.opacity = '0.5';
          try {
            const base64 = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result.split(',')[1]);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });

            const url = await uploadToImgBB(base64);
            if (!url) throw new Error('서버로부터 다운로드 URL을 받지 못했습니다.');

            products[idx].image = url;
            if (preview) preview.src = url;
            saveProducts();
            plc.innerHTML = renderProductList();
            bindProductEvents();
            alert('🎉 상품 이미지 변경 성공!');
          } catch (err) {
            console.error(err);
            alert('❌ 상품 이미지 업로드 에러:\n' + err.message);
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

    document.getElementById('btn-add-product').addEventListener('click', () => {
      products.push({ id: Date.now(), name: '새 상품', price: '', normalPrice: '', discountRate: 0, image: 'https://via.placeholder.com/72', url: '#' });
      saveProducts(true);
      document.getElementById('product-list-container').innerHTML = renderProductList();
      bindProductEvents();
    });
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
          const hideByDefault = row.querySelector('input[data-field="hideByDefault"]');
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
        currentLeads = (list || []).filter(lead => !lead.name || !lead.name.startsWith('[도입문의]'));
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

  // ── 주문 관리 (결제 내역) 탭 렌더링 ──────────────────────────────────
  const renderOrdersTab = () => {
    contentArea.innerHTML = `
      <div class="section-card">
        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:16px; border-bottom:1.5px solid #f1f5f9; margin-bottom:20px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <h2 style="font-size:16px; font-weight:800; color:#0f172a; margin:0;">
              주문 관리 (결제 내역)
            </h2>
            <span id="orders-count-badge" style="font-size:12px; font-weight:700; color:#2563eb; background:#eff6ff; padding:2px 8px; border-radius:12px; border:1px solid #dbeafe;">0건</span>
          </div>
          <div style="display:flex; gap:8px;">
            <button id="btn-download-csv-orders" class="action-btn btn-primary-solid" style="padding:8px 16px; font-size:13px; display:none;">CSV 다운로드</button>
            <button id="btn-refresh-orders" class="action-btn btn-neutral" style="padding:8px 16px; font-size:13px;">새로고침</button>
          </div>
        </div>

        <!-- 핵심 요약 카드 -->
        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:16px; margin-bottom:20px;">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px 20px;">
            <div style="font-size:12px; font-weight:600; color:#64748b; margin-bottom:4px;">총 주문 건수</div>
            <div id="stat-orders-count" style="font-size:22px; font-weight:800; color:#0f172a;">0건</div>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px 20px;">
            <div style="font-size:12px; font-weight:600; color:#64748b; margin-bottom:4px;">총 결제 금액</div>
            <div id="stat-orders-total" style="font-size:22px; font-weight:800; color:#0f172a;">0원</div>
          </div>
        </div>

        <!-- 검색 필터 -->
        <div style="margin-bottom:16px; display:flex; gap:10px; align-items:center;">
          <input type="text" id="order-search-input" placeholder="주문자명, 전화번호, 상품명 검색" class="modern-input" style="max-width:320px; font-size:13px; padding:8px 12px;">
        </div>

        <div id="orders-list-container">
          <div style="text-align:center; padding:20px; color:#64748b; font-size:13px;">주문 내역을 불러오는 중...</div>
        </div>
      </div>
    `;

    let currentOrders = [];

    const loadOrders = async () => {
      try {
        let dbList = [];
        if (db) {
          try {
            // 1. live_orders 전용 테이블 조회
            const { data: ordData } = await db.from('live_orders')
              .select('*')
              .eq('live_id', liveId)
              .order('created_at', { ascending: false });
            if (Array.isArray(ordData)) {
              dbList.push(...ordData);
            }
          } catch(e) {}

          try {
            // 2. live_winners 백업 저장소 조회 및 주문 변환
            const { data: winData } = await db.from('live_winners')
              .select('*')
              .eq('live_id', liveId)
              .order('created_at', { ascending: false });
            if (Array.isArray(winData)) {
              winData.forEach(w => {
                if (w.nickname && (w.nickname.startsWith('{"type":"order"') || w.nickname.startsWith('{"type": "order"'))) {
                  try {
                    const meta = JSON.parse(w.nickname);
                    dbList.push({
                      id: w.id,
                      live_id: w.live_id,
                      customer_name: w.name,
                      customer_phone: w.phone,
                      customer_address: w.address,
                      total_amount: meta.total || 0,
                      items: meta.items || [{ name: meta.goodname || '상품', price: meta.total || 0 }],
                      payment_status: meta.status || 'payapp_requested',
                      pg_provider: meta.pg_provider || 'payapp',
                      pg_receipt_id: meta.mul_no || '',
                      created_at: w.created_at
                    });
                  } catch(err) {}
                }
              });
            }
          } catch(e) {}
        }

        // 3. 로컬 스토리지 캐시 병합
        let localList = [];
        try {
          localList = JSON.parse(localStorage.getItem(`ryzin_live_orders_${liveId}`) || '[]');
        } catch(e) {}

        // 중복 제거 및 병합 (취소/환불 상태가 나중에 업데이트된 경우 덮어쓰기)
        const mergedMap = new Map();
        [...dbList, ...localList].forEach(ord => {
          const key = (ord.pg_receipt_id && ord.pg_receipt_id !== 'undefined' ? ord.pg_receipt_id : null) || ord.id || (ord.created_at + '_' + ord.customer_phone);
          const cancelStatuses = ['cancelled', 'canceled', 'payapp_cancelled', 'refunded', 'cancel'];
          const existing = mergedMap.get(key);
          if (!existing) {
            mergedMap.set(key, ord);
          } else {
            const incomingIsCancelled = cancelStatuses.includes((ord.payment_status || '').toLowerCase());
            const existingIsCancelled = cancelStatuses.includes((existing.payment_status || '').toLowerCase());
            if (incomingIsCancelled && !existingIsCancelled) {
              mergedMap.set(key, ord);
            }
          }
        });

        currentOrders = Array.from(mergedMap.values()).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

        // 1차 렌더링
        renderOrdersTable();

        // 4. 페이앱(PayApp) 본사 서버와 실시간 결제/취소 상태 동기화
        const receiptIds = currentOrders
          .map(ord => ord.pg_receipt_id)
          .filter(id => id && id !== 'undefined' && id !== '-');

        if (receiptIds.length > 0) {
          try {
            const syncRes = await fetch('/api/payapp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                cmd: 'check_orders',
                mul_nos: receiptIds
              })
            });
            if (syncRes.ok) {
              const syncData = await syncRes.json();
              if (syncData.success && syncData.results) {
                let hasChanged = false;
                currentOrders.forEach(ord => {
                  const info = syncData.results[ord.pg_receipt_id];
                  if (info && info.status && info.status !== 'unknown') {
                    if (ord.payment_status !== info.status || ord.status_detail !== info.usingstatestr) {
                      ord.payment_status = info.status;
                      ord.status_detail = info.usingstatestr;
                      hasChanged = true;
                    }
                  }
                });

                if (hasChanged) {
                  try {
                    localStorage.setItem(`ryzin_live_orders_${liveId}`, JSON.stringify(currentOrders));
                  } catch(e) {}
                  renderOrdersTable();
                }
              }
            }
          } catch(syncErr) {
            console.warn('PayApp 실시간 상태 동기화 중 오류 (일반 조회 계속 유지):', syncErr);
          }
        }
      } catch (err) {
        console.warn('Failed to load orders', err);
        const container = document.getElementById('orders-list-container');
        if (container) container.innerHTML = `<div style="text-align:center; padding:20px; color:#ef4444; font-size:13px;">주문 내역을 불러오는 데 실패했습니다.</div>`;
      }
    };

    const cancelStatuses = ['cancelled', 'canceled', 'payapp_cancelled', 'refunded', 'cancel'];

    // ── 결제요청(미결제)은 완전히 제외하고 결제완료(paid) 및 취소(cancelled) 건만 반환 ──
    const getPaidAndCancelledOrders = () => {
      return currentOrders.filter(ord => {
        const isPaid = (ord.payment_status || '').toLowerCase() === 'paid';
        const isCancelled = cancelStatuses.includes((ord.payment_status || '').toLowerCase());
        return isPaid || isCancelled;
      });
    };

    const renderOrdersTable = () => {
      const container = document.getElementById('orders-list-container');
      const btnCsv = document.getElementById('btn-download-csv-orders');
      const countBadge = document.getElementById('orders-count-badge');
      const statCount = document.getElementById('stat-orders-count');
      const statTotal = document.getElementById('stat-orders-total');
      const searchInput = document.getElementById('order-search-input');
      const keyword = (searchInput ? searchInput.value : '').trim().toLowerCase();

      // 결제요청은 제외하고 '결제완료' 및 '취소' 건만 필터
      const targetOrders = getPaidAndCancelledOrders();

      let filtered = targetOrders;
      if (keyword) {
        filtered = targetOrders.filter(ord => {
          const nameMatch = (ord.customer_name || '').toLowerCase().includes(keyword);
          const phoneMatch = (ord.customer_phone || '').includes(keyword);
          const addrMatch = (ord.customer_address || '').toLowerCase().includes(keyword);
          let itemsStr = '';
          if (Array.isArray(ord.items)) {
            itemsStr = ord.items.map(i => i.name).join(' ');
          } else if (typeof ord.items === 'string') {
            itemsStr = ord.items;
          }
          const itemMatch = itemsStr.toLowerCase().includes(keyword);
          return nameMatch || phoneMatch || addrMatch || itemMatch;
        });
      }

      // 통계 계산: 순수 결제완료 건의 금액만 합산 (취소 건은 금액 제외)
      const paidOrders = targetOrders.filter(ord => (ord.payment_status || '').toLowerCase() === 'paid');
      const cancelledOrders = targetOrders.filter(ord => cancelStatuses.includes((ord.payment_status || '').toLowerCase()));
      const totalAmountSum = paidOrders.reduce((sum, ord) => sum + (Number(ord.total_amount) || 0), 0);

      if (statCount) {
        if (cancelledOrders.length > 0) {
          statCount.innerHTML = `${targetOrders.length.toLocaleString()}건 <span style="font-size:12px; color:#64748b; font-weight:600;">(완료 ${paidOrders.length} / 취소 ${cancelledOrders.length})</span>`;
        } else {
          statCount.textContent = `${targetOrders.length.toLocaleString()}건`;
        }
      }
      if (statTotal) statTotal.textContent = `${totalAmountSum.toLocaleString()}원`;
      if (countBadge) countBadge.textContent = `${filtered.length}건`;

      if (btnCsv) {
        btnCsv.style.display = targetOrders.length > 0 ? 'block' : 'none';
      }

      if (!container) return;

      if (filtered.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:40px; color:#94a3b8; font-size:14px; background:#f8fafc; border-radius:12px;">결제 완료 또는 취소된 주문 내역이 없습니다.</div>`;
        return;
      }

      let html = `
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:13px; min-width:800px;">
            <thead style="background:#f1f5f9; color:#475569;">
              <tr>
                <th style="padding:10px 12px; font-weight:700;">주문일시</th>
                <th style="padding:10px 12px; font-weight:700;">주문 상품</th>
                <th style="padding:10px 12px; font-weight:700; text-align:right;">결제금액</th>
                <th style="padding:10px 12px; font-weight:700;">주문자</th>
                <th style="padding:10px 12px; font-weight:700;">연락처</th>
                <th style="padding:10px 12px; font-weight:700;">배송지 주소</th>
                <th style="padding:10px 12px; font-weight:700; text-align:center;">상태</th>
                <th style="padding:10px 12px; font-weight:700; text-align:center;">결제번호</th>
              </tr>
            </thead>
            <tbody>
      `;

      filtered.forEach(ord => {
        const dateStr = ord.created_at ? new Date(ord.created_at).toLocaleString('ko-KR') : '-';
        let itemsSummary = '상품 정보 없음';
        if (Array.isArray(ord.items) && ord.items.length > 0) {
          itemsSummary = ord.items.length > 1 ? `${ord.items[0].name} 외 ${ord.items.length - 1}건` : ord.items[0].name;
        } else if (typeof ord.items === 'string') {
          try {
            const parsed = JSON.parse(ord.items);
            if (Array.isArray(parsed) && parsed.length > 0) {
              itemsSummary = parsed.length > 1 ? `${parsed[0].name} 외 ${parsed.length - 1}건` : parsed[0].name;
            }
          } catch(e) {
            itemsSummary = ord.items;
          }
        }

        const price = Number(ord.total_amount) || 0;
        const isCancelled = cancelStatuses.includes((ord.payment_status || '').toLowerCase());
        const statusText = isCancelled ? (ord.status_detail || '결제승인취소') : '결제완료';

        const statusBadge = isCancelled
          ? `<span style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:6px; background:#fef2f2; color:#dc2626; border:1px solid #fecaca;">${statusText}</span>`
          : `<span style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:6px; background:#f0fdf4; color:#16a34a; border:1px solid #bbf7d0;">${statusText}</span>`;

        const priceStyle = isCancelled
          ? 'padding:12px; font-weight:700; color:#94a3b8; text-align:right; font-family:monospace; text-decoration:line-through;'
          : 'padding:12px; font-weight:800; color:#0f172a; text-align:right; font-family:monospace;';

        html += `
          <tr style="border-bottom:1px solid #e2e8f0; ${isCancelled ? 'background:#fafafa;' : ''} transition:background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='${isCancelled ? '#fafafa' : 'transparent'}'">
            <td style="padding:12px; color:#64748b; white-space:nowrap; font-size:12px;">${dateStr}</td>
            <td style="padding:12px; font-weight:700; color:#0f172a; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${itemsSummary}">${itemsSummary}</td>
            <td style="${priceStyle}">${price.toLocaleString()}원</td>
            <td style="padding:12px; font-weight:700; color:#0f172a;">${ord.customer_name || '-'}</td>
            <td style="padding:12px; font-family:monospace; color:#3b82f6;">${ord.customer_phone || '-'}</td>
            <td style="padding:12px; color:#475569; max-width:240px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${ord.customer_address || ''}">${ord.customer_address || '-'}</td>
            <td style="padding:12px; text-align:center;">${statusBadge}</td>
            <td style="padding:12px; font-family:monospace; font-size:11px; color:#64748b; text-align:center;">${ord.pg_receipt_id || '-'}</td>
          </tr>
        `;
      });

      html += `</tbody></table></div>`;
      container.innerHTML = html;
    };

    const downloadCsv = () => {
      const targetOrders = getPaidAndCancelledOrders();
      if (targetOrders.length === 0) return;
      let csv = '주문일시,대표상품명,결제금액,주문자이름,연락처,배송지주소,결제상태,결제요청번호\n';
      targetOrders.forEach(ord => {
        const dateStr = ord.created_at ? new Date(ord.created_at).toLocaleString('ko-KR').replace(/,/g, '') : '';
        let itemsSummary = '';
        if (Array.isArray(ord.items) && ord.items.length > 0) {
          itemsSummary = ord.items.length > 1 ? `${ord.items[0].name} 외 ${ord.items.length - 1}건` : ord.items[0].name;
        } else if (typeof ord.items === 'string') {
          itemsSummary = ord.items;
        }
        itemsSummary = itemsSummary.replace(/,/g, ' ');
        const amount = Number(ord.total_amount) || 0;
        const name = (ord.customer_name || '').replace(/,/g, ' ');
        const phone = (ord.customer_phone || '').replace(/,/g, ' ');
        const addr = (ord.customer_address || '').replace(/,/g, ' ');
        const isCancelled = cancelStatuses.includes((ord.payment_status || '').toLowerCase());
        const status = isCancelled ? (ord.status_detail || '결제취소') : '결제완료';
        const receipt = ord.pg_receipt_id || '';

        csv += `${dateStr},${itemsSummary},${amount},${name},${phone},${addr},${status},${receipt}\n`;
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

    loadOrders();
    document.getElementById('btn-refresh-orders').addEventListener('click', loadOrders);
    document.getElementById('btn-download-csv-orders').addEventListener('click', downloadCsv);
    const searchInput = document.getElementById('order-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', renderOrdersTable);
    }
  };

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
          }
        });

        config.showSplash = !logoStr.includes('#nosplash');
        config.logoUrl = cleanLogoUrl;
        config.widgetText = widgetText;
        config.widgetPosition = widgetPosition;
        config.widgetImageUrl = widgetImageUrl;
        config.showOnMain = showOnMain;
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

  // ── 전역 실시간 통계 폴링 (어느 탭에 있든 통계 수치 2.5초 주기 실시간 자동 갱신) ──
  let globalStatsPollingInterval = null;
  const startGlobalStatsPolling = () => {
    if (!db) return;
    globalStatsPollingInterval = setInterval(async () => {
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
          saveLiveStats(liveId, stats);
          if (typeof window.updateAdminViewersDisplay === 'function') {
            window.updateAdminViewersDisplay();
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
