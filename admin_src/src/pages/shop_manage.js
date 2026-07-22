// ===== 쇼핑몰 관리 페이지 (Supabase 연동 + 라이브 관리 톤앤매너 리뉴얼) =====
import { bannerDB, sectionDB, menuDB, productDB, liveDB } from '../utils/shopDB.js';

// ── 공통 CSS 스타일 주입 ──
function injectShopManageStyles(container) {
  const style = document.createElement('style');
  style.innerHTML = `
    .sm-input { 
      width: 100%; 
      padding: 10px 14px; 
      border: 1.5px solid #e2e8f0; 
      border-radius: 10px; 
      font-size: 14px; 
      outline: none; 
      transition: all 0.2s; 
      background: #fff; 
      box-sizing: border-box; 
      color: #0f172a; 
    }
    .sm-input:focus { 
      border-color: #3b82f6; 
      box-shadow: 0 0 0 3px rgba(59,130,246,0.12); 
    }
    .sm-label { 
      display: block; 
      font-size: 11px; 
      font-weight: 700; 
      color: #64748b; 
      margin-bottom: 6px; 
      text-transform: uppercase; 
      letter-spacing: 0.04em; 
    }
    .sm-tab-btn { 
      padding: 10px 20px; 
      border-radius: 8px; 
      font-size: 14px; 
      font-weight: 600; 
      cursor: pointer; 
      border: none; 
      transition: all 0.18s; 
      background: transparent; 
      color: #64748b; 
    }
    .sm-tab-btn.active { 
      background: #0f172a; 
      color: #fff; 
    }
    .sm-tab-btn:hover:not(.active) { 
      background: #e2e8f0; 
      color: #0f172a; 
    }
    .sm-card { 
      background: #fff; 
      border: 1.5px solid #e2e8f0; 
      border-radius: 16px; 
      padding: 24px; 
      box-shadow: 0 4px 16px rgba(0,0,0,0.03); 
      margin-bottom: 20px; 
    }
    .sm-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 14px;
      border-bottom: 1.5px solid #f1f5f9;
    }
    .sm-card-title {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
    .sm-action-btn { 
      display: inline-flex; 
      align-items: center; 
      justify-content: center;
      gap: 6px; 
      padding: 8px 16px; 
      border-radius: 8px; 
      font-size: 13px; 
      font-weight: 600; 
      cursor: pointer; 
      border: none; 
      transition: all 0.18s; 
    }
    .sm-action-btn:hover { 
      opacity: 0.9; 
      transform: translateY(-1px); 
    }
    .sm-btn-primary { 
      background: linear-gradient(135deg, #3b82f6, #2563eb); 
      color: #fff; 
      box-shadow: 0 4px 12px rgba(37,99,235,0.2); 
    }
    .sm-btn-danger { 
      background: linear-gradient(135deg, #ef4444, #dc2626); 
      color: #fff; 
      box-shadow: 0 4px 12px rgba(220,38,38,0.2); 
    }
    .sm-btn-neutral { 
      background: #fff; 
      color: #374151; 
      border: 1.5px solid #e2e8f0; 
    }
    .sm-btn-neutral:hover { 
      background: #f8fafc; 
    }
    .sm-btn-success {
      background: linear-gradient(135deg, #10b981, #059669); 
      color: #fff; 
      box-shadow: 0 4px 12px rgba(5,150,105,0.2);
    }
    .sm-thumb-uploader {
      position: relative;
      cursor: pointer;
      overflow: hidden;
      border-radius: 10px;
      border: 1.5px solid #e2e8f0;
      background: #f1f5f9;
      transition: all 0.2s;
    }
    .sm-thumb-uploader:hover {
      border-color: #3b82f6;
      opacity: 0.9;
    }
    .sm-thumb-uploader-overlay {
      position: absolute;
      inset: 0;
      background: rgba(15, 23, 42, 0.65);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      opacity: 0;
      transition: opacity 0.2s;
      text-align: center;
      padding: 4px;
      box-sizing: border-box;
    }
    .sm-thumb-uploader:hover .sm-thumb-uploader-overlay {
      opacity: 1;
    }
    .sm-thumb-uploader img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  `;
  container.appendChild(style);
}

// ── 유틸 ──
function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function toast(msg, isErr = false) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
    background:${isErr ? '#ef4444' : '#0f172a'};color:#fff;padding:12px 24px;
    border-radius:40px;font-size:13px;font-weight:600;z-index:9999;
    box-shadow:0 8px 24px rgba(0,0,0,0.3);`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// ── ImgBB 업로드 유틸리티 ──
const base64ToBlob = (base64Data, contentType = '') => {
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);
    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters.charCodeAt(offset);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
};

const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.85) => {
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

const uploadToImgBB = async (base64Data, fileType = 'image/png') => {
  const blob = base64ToBlob(base64Data, fileType);
  let ext = 'png';
  if (blob.type && blob.type.includes('/')) {
    ext = blob.type.split('/')[1] || 'png';
  }

  const userKey = localStorage.getItem('ryzin_imgbb_key') || '';
  const IMGBB_KEYS = [];
  if (userKey) IMGBB_KEYS.push(userKey);
  IMGBB_KEYS.push(
    '117dfb947bc9e0045774b193d1eef7b6',
    'd2b512c9bf10e4a3bfec604be1218579',
    '6049a4f479f67a26eb3ccb8823b1eef7'
  );

  let lastError = null;
  const errors = [];

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
      errors.push(`Key (${maskedKey}): ${err.message}`);
      lastError = err;
    }
  }
  throw lastError || new Error('업로드 실패');
};

// ── 파일 업로드 바인딩 헬퍼 ──
function bindImageUploader(uploaderEl, inputEl, onUploaded) {
  if (!uploaderEl) return;
  uploaderEl.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const overlay = uploaderEl.querySelector('.sm-thumb-uploader-overlay');
      const originalText = overlay ? overlay.textContent : '';
      if (overlay) {
        overlay.textContent = '업로드 중...';
        overlay.style.opacity = '1';
      }

      try {
        const base64 = await compressImage(file);
        const url = await uploadToImgBB(base64, file.type);
        if (inputEl) {
          inputEl.value = url;
          // input 이벤트를 강제 발생시켜 변경을 알림
          inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const img = uploaderEl.querySelector('img');
        if (img) img.src = url;
        toast('이미지가 업로드되었습니다.');
        if (onUploaded) onUploaded(url);
      } catch (err) {
        toast('이미지 업로드에 실패했습니다.', true);
        console.error(err);
      } finally {
        if (overlay) {
          overlay.textContent = originalText;
          overlay.style.opacity = '';
        }
      }
    };
    fileInput.click();
  });
}

// ── 폼 생성 헬퍼 ──
function formField(label, cls, val, type = 'text', full = false) {
  return `<div${full ? ' style="grid-column:span 2;"' : ''}>
    <label class="sm-label">${esc(label)}</label>
    <input class="sm-input ${cls}" type="${type}" value="${esc(val)}">
  </div>`;
}

function imgUploadField(label, cls, val) {
  return `<div style="grid-column:span 2;">
    <label class="sm-label">${esc(label)}</label>
    <div style="display:flex;gap:8px;">
      <input class="sm-input ${cls}" value="${esc(val)}">
      <button class="sm-action-btn sm-btn-neutral ${cls}-preview" type="button">새로고침</button>
    </div>
  </div>`;
}

// ── 상태 ──
let _tab = 'banners';
let _sections = [];

// ─────────────────────────────────────
export function renderShopManage() {
  const container = document.createElement('div');
  container.style.cssText = 'display:flex; flex-direction:column; height:calc(100vh - 48px); background:#f8fafc; overflow:hidden;';
  injectShopManageStyles(container);

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'max-width:960px; margin:0 auto; padding:40px 24px; width:100%; overflow-y:auto; height:100%; box-sizing:border-box;';

  wrapper.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:32px;">
      <div>
        <h1 style="margin:0; font-size:26px; font-weight:800; color:#0f172a;">쇼핑몰 관리</h1>
        <p style="margin:6px 0 0; font-size:14px; color:#64748b;">홈 화면 배너, 퀵메뉴, 라이브 및 상품 섹션을 Supabase 실시간 연동으로 편집합니다.</p>
      </div>
    </div>

    <div id="sm-tabs" style="display:flex; gap:8px; margin-bottom:28px; border-bottom:1.5px solid #e2e8f0; padding-bottom:12px;">
      ${['banners','lives','sections','menus'].map(k => {
        const labels = {banners:'상단 배너',lives:'라이브 NOW',sections:'상품 섹션',menus:'퀵메뉴'};
        return `<button class="sm-tab-btn${k===_tab?' active':''}" data-tab="${k}">${labels[k]}</button>`;
      }).join('')}
    </div>

    <div id="sm-loading" style="text-align:center;padding:40px;color:#64748b;font-size:14px;font-weight:600;">
      데이터를 동기화하는 중...
    </div>
    <div id="sm-panel"></div>
  `;

  // 탭 클릭 이벤트
  wrapper.querySelectorAll('.sm-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _tab = btn.dataset.tab;
      wrapper.querySelectorAll('.sm-tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === _tab);
      });
      loadPanel(wrapper);
    });
  });

  container.appendChild(wrapper);

  // 로드 연동
  setTimeout(async () => {
    try {
      _sections = await sectionDB.getAll();
    } catch(e) {
      _sections = [];
    }
    await loadPanel(wrapper);
  }, 0);

  return container;
}

async function loadPanel(wrapper) {
  const loading = wrapper.querySelector('#sm-loading');
  const panel = wrapper.querySelector('#sm-panel');
  loading.style.display = 'block';
  panel.innerHTML = '';

  try {
    if (_tab === 'banners') await renderBannersPanel(panel);
    else if (_tab === 'lives') await renderLivesPanel(panel);
    else if (_tab === 'sections') await renderSectionsPanel(panel, wrapper);
    else if (_tab === 'menus') await renderMenusPanel(panel);
  } catch(e) {
    panel.innerHTML = `
      <div class="sm-card" style="border-color:#fca5a5; background:#fef2f2; color:#b91c1c;">
        <h4 style="margin:0 0 8px 0; font-weight:700;">데이터 연동 실패</h4>
        <p style="margin:0; font-size:13px;">${e.message}. Supabase SQL 쿼리 설치 및 RLS 정책을 확인해주세요.</p>
      </div>
    `;
  }
  loading.style.display = 'none';
}

// ─────────────────────────────────────
// ① 상단 배너 탭
async function renderBannersPanel(panel) {
  const banners = await bannerDB.getAll();
  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
      <h2 style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">상단 롤링 프로모 배너 (${banners.length}개)</h2>
      <button id="add-banner" class="sm-action-btn sm-btn-primary">+ 새 배너 추가</button>
    </div>
    <div id="banner-list"></div>
  `;

  panel.querySelector('#add-banner').addEventListener('click', async () => {
    await bannerDB.insert({ sort_order: 99, title:'새 특집 배너', desc:'', label:'오늘', time_text:'오후 8시', img_url:'', link_url:'/shop/live_teaser.html' });
    toast('새 배너가 생성되었습니다.');
    await renderBannersPanel(panel);
  });

  const list = panel.querySelector('#banner-list');
  banners.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'sm-card';
    card.innerHTML = `
      <div style="display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap;">
        <div style="width:140px; flex-shrink:0;">
          <label class="sm-label">배너 프리뷰 (클릭 업로드)</label>
          <div class="sm-thumb-uploader b-uploader" style="width:100%; height:94px;">
            <img class="b-thumb" src="${esc(b.img_url || '')}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">클릭하여 업로드</div>
          </div>
        </div>
        <div style="flex:1; min-width:280px; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          ${formField('배너 대제목 (타이틀)','b-title',b.title)}
          ${formField('소제목 (서브 타이틀)','b-desc',b.desc)}
          ${formField('라벨 뱃지 (예: 오늘, 내일)','b-label',b.label)}
          ${formField('시간 문구 (예: 오후 8시)','b-time',b.time_text)}
          ${imgUploadField('배너 이미지 URL','b-img',b.img_url)}
          ${formField('클릭 시 이동할 링크 URL','b-link',b.link_url,'text',true)}
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; margin-top:20px; padding-top:16px; border-top:1.5px solid #f1f5f9; align-items:center;">
        <div style="display:flex; gap:6px; align-items:center;">
          <span style="font-size:12px; font-weight:700; color:#94a3b8; margin-right:6px;">순서 #${i+1}</span>
          <button class="sm-action-btn sm-btn-neutral b-up" ${i===0?'disabled':''}>▲ 위로</button>
          <button class="sm-action-btn sm-btn-neutral b-dn" ${i===banners.length-1?'disabled':''}>▼ 아래로</button>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="sm-action-btn sm-btn-success b-save">저장</button>
          <button class="sm-action-btn sm-btn-danger b-del">삭제</button>
        </div>
      </div>
    `;

    const uploader = card.querySelector('.b-uploader');
    const input = card.querySelector('.b-img');
    bindImageUploader(uploader, input, (url) => {
      card.querySelector('.b-thumb').src = url;
    });

    card.querySelector('.b-img-preview').addEventListener('click', () => {
      card.querySelector('.b-thumb').src = card.querySelector('.b-img').value.trim();
    });
    card.querySelector('.b-save').addEventListener('click', async () => {
      await bannerDB.update(b.id, {
        title: card.querySelector('.b-title').value.trim(),
        desc:  card.querySelector('.b-desc').value.trim(),
        label: card.querySelector('.b-label').value.trim(),
        time_text: card.querySelector('.b-time').value.trim(),
        img_url: card.querySelector('.b-img').value.trim(),
        link_url: card.querySelector('.b-link').value.trim(),
      });
      toast('배너 정보가 동기화되었습니다.');
    });
    card.querySelector('.b-del').addEventListener('click', async () => {
      if (!confirm('배너를 삭제하시겠습니까?')) return;
      await bannerDB.delete(b.id);
      toast('배너가 제거되었습니다.');
      await renderBannersPanel(panel);
    });
    card.querySelector('.b-up').addEventListener('click', async () => {
      if (i === 0) return;
      await bannerDB.update(banners[i-1].id, { sort_order: i });
      await bannerDB.update(b.id, { sort_order: i-1 });
      await renderBannersPanel(panel);
    });
    card.querySelector('.b-dn').addEventListener('click', async () => {
      if (i === banners.length-1) return;
      await bannerDB.update(banners[i+1].id, { sort_order: i });
      await bannerDB.update(b.id, { sort_order: i+1 });
      await renderBannersPanel(panel);
    });

    list.appendChild(card);
  });
}

// ─────────────────────────────────────
// ② 라이브 NOW 탭
async function renderLivesPanel(panel) {
  const lives = await liveDB.getAll();
  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
      <h2 style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">라이브 큐레이션 관리 (${lives.length}개)</h2>
      <button id="add-live" class="sm-action-btn sm-btn-primary">+ 새 라이브 추가</button>
    </div>
    <div id="live-list"></div>
  `;

  panel.querySelector('#add-live').addEventListener('click', async () => {
    await liveDB.insert({ sort_order:99, title:'새로운 라이브 방송', viewers:'0명 시청 중', img_url:'', link_url:'' });
    toast('새 라이브가 생성되었습니다.');
    await renderLivesPanel(panel);
  });

  const list = panel.querySelector('#live-list');
  lives.forEach((lv, i) => {
    const card = document.createElement('div');
    card.className = 'sm-card';
    card.innerHTML = `
      <div style="display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap;">
        <div style="width:140px; flex-shrink:0;">
          <label class="sm-label">방송 썸네일 (클릭 업로드)</label>
          <div class="sm-thumb-uploader lv-uploader" style="width:100%; height:94px;">
            <img class="lv-thumb" src="${esc(lv.img_url || '')}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">클릭하여 업로드</div>
          </div>
        </div>
        <div style="flex:1; min-width:280px; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          ${formField('방송 타이틀','lv-title',lv.title,'text',true)}
          ${formField('시청자 수 문구','lv-viewers',lv.viewers)}
          ${formField('이동 링크 URL','lv-link',lv.link_url)}
          ${imgUploadField('썸네일 이미지 URL','lv-img',lv.img_url)}
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:20px; padding-top:16px; border-top:1.5px solid #f1f5f9;">
        <button class="sm-action-btn sm-btn-success lv-save">저장</button>
        <button class="sm-action-btn sm-btn-danger lv-del">삭제</button>
      </div>
    `;

    const uploader = card.querySelector('.lv-uploader');
    const input = card.querySelector('.lv-img');
    bindImageUploader(uploader, input, (url) => {
      card.querySelector('.lv-thumb').src = url;
    });

    card.querySelector('.lv-img-preview').addEventListener('click', () => {
      card.querySelector('.lv-thumb').src = card.querySelector('.lv-img').value.trim();
    });
    card.querySelector('.lv-save').addEventListener('click', async () => {
      await liveDB.update(lv.id, {
        title:   card.querySelector('.lv-title').value.trim(),
        viewers: card.querySelector('.lv-viewers').value.trim(),
        link_url: card.querySelector('.lv-link').value.trim(),
        img_url:  card.querySelector('.lv-img').value.trim(),
      });
      toast('라이브 제어 카드 저장 완료');
    });
    card.querySelector('.lv-del').addEventListener('click', async () => {
      if (!confirm('라이브 정보를 삭제합니까?')) return;
      await liveDB.delete(lv.id);
      toast('제거되었습니다.');
      await renderLivesPanel(panel);
    });

    list.appendChild(card);
  });
}

// ─────────────────────────────────────
// ③ 상품 섹션 탭
async function renderSectionsPanel(panel, wrapper) {
  _sections = await sectionDB.getAll();
  const products = await productDB.getAll();
  const prodBySec = {};
  products.forEach(p => {
    if (!prodBySec[p.section_id]) prodBySec[p.section_id] = [];
    prodBySec[p.section_id].push(p);
  });

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
      <h2 style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">상설관 및 기획전 상품 섹션 (${_sections.length}개)</h2>
      <button id="add-section" class="sm-action-btn sm-btn-primary">+ 새 상품 섹션 추가</button>
    </div>
    <div id="section-list"></div>
  `;

  panel.querySelector('#add-section').addEventListener('click', async () => {
    await sectionDB.insert({ sort_order:99, title:'새로운 추천 기획전', subtitle:'단독 특별 혜택가 구성', show_timer:false });
    _sections = await sectionDB.getAll();
    toast('새 상품 섹션이 생성되었습니다.');
    await renderSectionsPanel(panel, wrapper);
  });

  const list = panel.querySelector('#section-list');
  _sections.forEach((sec, si) => {
    const prods = prodBySec[sec.id] || [];
    const secDiv = document.createElement('div');
    secDiv.className = 'sm-card';
    secDiv.style.cssText = 'padding:0; overflow:hidden; margin-bottom:28px; border-color:#cbd5e1;';
    
    secDiv.innerHTML = `
      <!-- 섹션 바디 헤더 -->
      <div style="padding:20px 24px; background:#f8fafc; border-bottom:1.5px solid #e2e8f0; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
        <span style="font-size:13px; font-weight:800; color:#94a3b8; min-width:30px;">#${si+1}</span>
        <div style="flex:1; min-width:240px; display:flex; gap:10px;">
          <input class="sm-input sec-title" value="${esc(sec.title)}" placeholder="섹션 주제목" style="font-weight:700;">
          <input class="sm-input sec-sub" value="${esc(sec.subtitle)}" placeholder="섹션 부제목(설명)">
        </div>
        <div style="display:flex; align-items:center; gap:16px; margin:0 8px;">
          <label style="display:flex; align-items:center; gap:6px; font-size:13px; font-weight:600; color:#475569; cursor:pointer;">
            <input type="checkbox" class="sec-timer" ${sec.show_timer ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;"> 타이머 표시
          </label>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="sm-action-btn sm-btn-success sec-save">섹션 저장</button>
          <button class="sm-action-btn sm-btn-danger sec-del">삭제</button>
        </div>
      </div>
      <!-- 내부 상품 영역 -->
      <div style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; padding-bottom:10px; border-bottom:1px solid #f1f5f9;">
          <h4 style="margin:0; font-size:14px; font-weight:700; color:#475569;">등록된 상품 (${prods.length}개)</h4>
          <button class="sm-action-btn sm-btn-neutral add-prod" style="padding:6px 12px; font-size:12px;">+ 상품 추가</button>
        </div>
        <div class="prod-list"></div>
      </div>
    `;

    secDiv.querySelector('.sec-save').addEventListener('click', async () => {
      await sectionDB.update(sec.id, {
        title: secDiv.querySelector('.sec-title').value.trim(),
        subtitle: secDiv.querySelector('.sec-sub').value.trim(),
        show_timer: secDiv.querySelector('.sec-timer').checked,
      });
      _sections = await sectionDB.getAll();
      toast('섹션이 저장되었습니다.');
    });

    secDiv.querySelector('.sec-del').addEventListener('click', async () => {
      if (!confirm(`"${sec.title}" 섹션 및 섹션 내 모든 등록 상품을 삭제하시겠습니까?`)) return;
      await sectionDB.delete(sec.id);
      _sections = await sectionDB.getAll();
      toast('섹션이 삭제되었습니다.');
      await renderSectionsPanel(panel, wrapper);
    });

    secDiv.querySelector('.add-prod').addEventListener('click', async () => {
      await productDB.insert({
        section_id: sec.id, sort_order: 99,
        brand_name: '브랜드명', product_title: '상품명', brand_title: '브랜드명 상품명',
        sale_price: '0원', origin_price: '0원',
        discount: '특가', unit_price: '', rating: '5.0', reviews: '1', img_url: '', chips: '[]'
      });
      toast('새 상품 입력란이 하단에 추가되었습니다.');
      await renderSectionsPanel(panel, wrapper);
    });

    renderProductCards(secDiv.querySelector('.prod-list'), prods, panel, wrapper);
    list.appendChild(secDiv);
  });
}

function renderProductCards(list, prods, panel, wrapper) {
  list.innerHTML = '';
  if (prods.length === 0) {
    list.innerHTML = `<div style="text-align:center; padding:32px 0; color:#94a3b8; font-size:13px;">등록된 특가 상품이 없습니다. 오른쪽의 '상품 추가' 버튼을 눌러주세요.</div>`;
    return;
  }

  prods.forEach((p, pi) => {
    const itemRow = document.createElement('div');
    itemRow.style.cssText = 'display:flex; gap:16px; align-items:flex-start; padding:18px; border-radius:12px; border:1.5px solid #e2e8f0; background:#fafafa; margin-bottom:12px;';
    
    // 브랜드명과 상품명 분리 추동
    const bNameVal = p.brand_name || (p.brand_title ? p.brand_title.split(' ')[0] : '');
    const pTitleVal = p.product_title || (p.brand_title ? p.brand_title.split(' ').slice(1).join(' ') : '');

    itemRow.innerHTML = `
      <div style="width:90px; flex-shrink:0;">
        <label class="sm-label">상품 사진 (클릭 업로드)</label>
        <div class="sm-thumb-uploader p-uploader" style="width:100%; height:74px;">
          <img class="p-thumb" src="${esc(p.img_url || '')}" style="width:100%; height:100%; object-fit:cover;">
          <div class="sm-thumb-uploader-overlay">클릭하여 업로드</div>
        </div>
      </div>
      <div style="flex:1; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        ${formField('브랜드명 (예: 설화수)','p-bname', bNameVal)}
        ${formField('상품명 (예: 윤조 에센스 90ml)','p-ptitle', pTitleVal)}
        ${formField('현재 판매가 (예: 9,900원)','p-sale',p.sale_price)}
        ${formField('원래 정가 (예: 50,000원)','p-origin',p.origin_price)}
        ${formField('할인율 태그 (예: 80% 특가)','p-disc',p.discount)}
        ${formField('단가 정보 (예: 10ml 당 708원)','p-unit',p.unit_price)}
        ${formField('평점 (예: 4.8)','p-rating',p.rating)}
        ${formField('리뷰 수 (예: 124)','p-reviews',p.reviews)}
        ${imgUploadField('상품 이미지 URL','p-img',p.img_url)}
      </div>
      <div style="display:flex; flex-direction:column; gap:6px; margin-top:20px;">
        <button class="sm-action-btn sm-btn-success p-save" style="padding:6px 12px; font-size:12px;">저장</button>
        <button class="sm-action-btn sm-btn-danger p-del" style="padding:6px 12px; font-size:12px;">삭제</button>
      </div>
    `;

    const uploader = itemRow.querySelector('.p-uploader');
    const input = itemRow.querySelector('.p-img');
    bindImageUploader(uploader, input, (url) => {
      itemRow.querySelector('.p-thumb').src = url;
    });

    itemRow.querySelector('.p-img-preview').addEventListener('click', () => {
      itemRow.querySelector('.p-thumb').src = itemRow.querySelector('.p-img').value.trim();
    });

    itemRow.querySelector('.p-save').addEventListener('click', async () => {
      const bName = itemRow.querySelector('.p-bname').value.trim();
      const pTitle = itemRow.querySelector('.p-ptitle').value.trim();
      const combinedTitle = (bName + ' ' + pTitle).trim();

      await productDB.update(p.id, {
        brand_name:    bName,
        product_title: pTitle,
        brand_title:   combinedTitle,
        sale_price:   itemRow.querySelector('.p-sale').value.trim(),
        origin_price: itemRow.querySelector('.p-origin').value.trim(),
        discount:     itemRow.querySelector('.p-disc').value.trim(),
        unit_price:   itemRow.querySelector('.p-unit').value.trim(),
        rating:       itemRow.querySelector('.p-rating').value.trim(),
        reviews:      itemRow.querySelector('.p-reviews').value.trim(),
        img_url:      itemRow.querySelector('.p-img').value.trim(),
      });
      toast('상품 정보 동기화 성공');
    });

    itemRow.querySelector('.p-del').addEventListener('click', async () => {
      if (!confirm('상품을 삭제하시겠습니까?')) return;
      await productDB.delete(p.id);
      toast('제거되었습니다.');
      await renderSectionsPanel(panel, wrapper);
    });

    list.appendChild(itemRow);
  });
}

// ─────────────────────────────────────
// ④ 퀵메뉴 탭
async function renderMenusPanel(panel) {
  const [menus, sections] = await Promise.all([menuDB.getAll(), sectionDB.getAll()]);
  _sections = sections;

  const secOptions = `<option value="">-- 섹션 연결 안함 --</option>` +
    sections.map(s => `<option value="${s.id}">${esc(s.title)}</option>`).join('');

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
      <h2 style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">배너 하단 가로 퀵메뉴 탭 (${menus.length}개)</h2>
      <button id="add-menu" class="sm-action-btn sm-btn-primary">+ 새 메뉴 탭 추가</button>
    </div>
    <p style="color:#64748b; font-size:13px; margin:0 0 20px 0;">탭을 클릭하면 매끄럽게 연결한 상품 섹션(상설관/기획전)으로 이동합니다.</p>
    <div id="menu-list"></div>
  `;

  panel.querySelector('#add-menu').addEventListener('click', async () => {
    await menuDB.insert({ sort_order:99, name:'새 카테고리 탭', section_id: null });
    toast('새 탭이 추가되었습니다.');
    await renderMenusPanel(panel);
  });

  const list = panel.querySelector('#menu-list');
  menus.forEach((m, i) => {
    const card = document.createElement('div');
    card.className = 'sm-card';
    card.style.cssText = 'padding:16px 20px; display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:12px;';

    card.innerHTML = `
      <span style="font-size:13px; font-weight:800; color:#94a3b8; min-width:30px;">#${i+1}</span>
      <div style="flex:1; min-width:200px;">
        <label class="sm-label" style="margin-bottom:4px;">탭 메뉴 텍스트</label>
        <input class="sm-input m-name" value="${esc(m.name)}" placeholder="메뉴 이름" style="font-weight:600;">
      </div>
      <div style="width:240px;">
        <label class="sm-label" style="margin-bottom:4px;">이동 연동할 상품 섹션</label>
        <select class="sm-input m-sec" style="font-weight:600; cursor:pointer; height:41px; padding:0 12px;">
          ${secOptions}
        </select>
      </div>
      <div style="display:flex; gap:8px; margin-top:20px;">
        <button class="sm-action-btn sm-btn-success m-save">저장</button>
        <button class="sm-action-btn sm-btn-danger m-del">삭제</button>
      </div>
    `;

    const sel = card.querySelector('.m-sec');
    sel.value = m.section_id || '';

    card.querySelector('.m-save').addEventListener('click', async () => {
      await menuDB.update(m.id, {
        name: card.querySelector('.m-name').value.trim(),
        section_id: sel.value || null,
      });
      toast('저장 완료');
    });

    card.querySelector('.m-del').addEventListener('click', async () => {
      if (!confirm('이 탭 메뉴를 삭제하시겠습니까?')) return;
      await menuDB.delete(m.id);
      toast('삭제되었습니다.');
      await renderMenusPanel(panel);
    });

    list.appendChild(card);
  });
}
