// ============================================================
//  RYZIN SHOP MANAGE ADMIN — 쇼핑몰 커머스 통합 관리 센터
//  - 이모티콘 100% 완전 금지
//  - 베스트 TOP 10 랭킹 & 뱃지 커스텀 색상(Color Picker) 어드민 설정 기능 지원
//  - live_stream.js 슬림 UI/UX 톤앤매너 적용
// ============================================================

import { bannerDB, sectionDB, menuDB, productDB, liveDB } from '../utils/shopDB.js';

// ── 공통 CSS 스타일 주입 (live_stream.js 톤앤매너 슬림 스타일) ──
function injectShopManageStyles(container) {
  const style = document.createElement('style');
  style.innerHTML = `
    .sm-input { 
      width: 100%; 
      padding: 8px 12px; 
      border: 1.5px solid #e2e8f0; 
      border-radius: 8px; 
      font-size: 13px; 
      font-weight: 500;
      outline: none; 
      transition: all 0.15s ease; 
      background: #ffffff; 
      box-sizing: border-box; 
      color: #0f172a; 
    }
    .sm-input:focus { 
      border-color: #2563eb; 
      box-shadow: 0 0 0 3px rgba(37,99,235,0.12); 
    }
    .sm-label { 
      display: block; 
      font-size: 11px; 
      font-weight: 700; 
      color: #64748b; 
      margin-bottom: 5px; 
      letter-spacing: -0.01em; 
    }
    .sm-tab-btn { 
      padding: 9px 18px; 
      border-radius: 8px; 
      font-size: 13px; 
      font-weight: 700; 
      cursor: pointer; 
      border: 1px solid #e2e8f0; 
      transition: all 0.15s ease; 
      background: #ffffff; 
      color: #64748b; 
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sm-tab-btn.active { 
      background: #0f172a; 
      color: #ffffff; 
      border-color: #0f172a;
    }
    .sm-tab-btn:hover:not(.active) { 
      background: #f1f5f9; 
      color: #0f172a; 
    }
    .sm-card { 
      background: #ffffff; 
      border: 1.5px solid #e2e8f0; 
      border-radius: 12px; 
      padding: 18px 20px; 
      margin-bottom: 16px; 
      transition: border-color 0.15s ease;
    }
    .sm-card:hover {
      border-color: #cbd5e1;
    }
    .sm-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f1f5f9;
    }
    .sm-card-title {
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sm-action-btn { 
      display: inline-flex; 
      align-items: center; 
      justify-content: center;
      gap: 5px; 
      padding: 7px 14px; 
      border-radius: 6px; 
      font-size: 12px; 
      font-weight: 700; 
      cursor: pointer; 
      border: none; 
      transition: all 0.15s ease; 
    }
    .sm-action-btn:hover { 
      opacity: 0.92; 
    }
    .sm-btn-primary { 
      background: #2563eb; 
      color: #ffffff; 
    }
    .sm-btn-success { 
      background: #059669; 
      color: #ffffff; 
    }
    .sm-btn-danger { 
      background: #dc2626; 
      color: #ffffff; 
    }
    .sm-thumb-uploader {
      border: 1.5px dashed #cbd5e1;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      background: #f8fafc;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sm-thumb-uploader:hover {
      border-color: #2563eb;
      background: #eff6ff;
    }
    .sm-thumb-uploader-overlay {
      position: absolute;
      inset: 0;
      background: rgba(15,23,42,0.65);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.15s ease;
    }
    .sm-thumb-uploader:hover .sm-thumb-uploader-overlay {
      opacity: 1;
    }
    .sm-rank-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #334155;
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .sm-rank-badge.top3 {
      background: #ef4444;
    }
    .color-picker-box {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .color-picker-input {
      width: 34px;
      height: 34px;
      padding: 0;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      cursor: pointer;
      background: none;
    }
  `;
  container.appendChild(style);
}

// ── 이미지 압축 & ImgBB 업로드 헬퍼 ──
async function uploadToImgBB(file) {
  const apiKey = localStorage.getItem('ryzin_imgbb_key') || '4ad44d673bfba8d88df109c0df1e2cae';
  const compressedBase64 = await compressImageFile(file, 1024, 0.85);
  const formData = new FormData();
  formData.append('image', compressedBase64.split(',')[1]);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  if (data && data.success) {
    return data.data.url;
  } else {
    throw new Error((data.error && data.error.message) || '이미지 업로드 실패');
  }
}

function compressImageFile(file, maxWidth = 1024, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function bindImageUploader(uploaderEl, inputEl, onUploaded) {
  uploaderEl.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      toast('이미지를 업로드하고 있습니다...');
      try {
        const url = await uploadToImgBB(file);
        inputEl.value = url;
        if (onUploaded) onUploaded(url);
        toast('이미지 업로드 성공');
      } catch (err) {
        alert('업로드 실패: ' + err.message);
      }
    };
    fileInput.click();
  });
}

function toast(msg) {
  let el = document.getElementById('sm-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'sm-toast';
    el.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#0f172a;color:#fff;padding:10px 18px;border-radius:8px;font-size:12.5px;font-weight:700;z-index:9999;box-shadow:0 8px 20px rgba(0,0,0,0.2);transition:opacity 0.2s;';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = '1';
  clearTimeout(el.timer);
  el.timer = setTimeout(() => { el.style.opacity = '0'; }, 2200);
}

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formField(label, className, value, type='text', isFull=false) {
  return `
    <div style="${isFull ? 'grid-column: 1 / -1;' : ''}">
      <label class="sm-label">${label}</label>
      <input class="sm-input ${className}" type="${type}" value="${esc(value || '')}">
    </div>
  `;
}

function imgUploadField(label, className, value) {
  return `
    <div style="grid-column: 1 / -1;">
      <label class="sm-label">${label}</label>
      <div style="display:flex; gap:8px;">
        <input class="sm-input ${className}" type="text" value="${esc(value || '')}">
        <button class="sm-action-btn sm-btn-primary ${className}-preview" style="flex-shrink:0; padding:0 12px;">적용</button>
      </div>
    </div>
  `;
}

let _tab = 'banners';
let _sections = [];

export function renderShopManage() {
  const container = document.createElement('div');
  container.style.cssText = 'min-height:100vh; background:#f8fafc; padding:24px; color:#0f172a; font-family:"Pretendard",sans-serif;';
  injectShopManageStyles(container);

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'max-width:1100px; margin:0 auto;';

  wrapper.innerHTML = `
    <div style="margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <h1 style="font-size:20px; font-weight:800; color:#0f172a; margin:0 0 4px 0; letter-spacing:-0.02em;">쇼핑몰 라이브 & 커머스 관리 센터</h1>
          <p style="font-size:13px; color:#64748b; margin:0; font-weight:500;">상단 배너, 라이브 방송, 베스트 TOP 10 랭킹 및 뱃지 컬러, 퀵메뉴 탭을 통합 설정합니다.</p>
        </div>
        <button id="btn-refresh" class="sm-action-btn sm-btn-primary">전체 새로고침</button>
      </div>
    </div>

    <!-- 슬림 서브 탭 메뉴 (이모티콘 완전 제외) -->
    <div style="display:flex; gap:8px; margin-bottom:20px; border-bottom:1px solid #e2e8f0; padding-bottom:10px; overflow-x:auto;">
      ${[
        { key:'banners', label:'상단 배너' },
        { key:'lives', label:'라이브 NOW / 예정' },
        { key:'best10', label:'베스트 TOP 10 랭킹 설정' },
        { key:'menus', label:'퀵메뉴 탭 설정' },
        { key:'sections', label:'상품 섹션 & MD 추천 관리' }
      ].map(t => `<button class="sm-tab-btn${t.key===_tab?' active':''}" data-tab="${t.key}">${t.label}</button>`).join('')}
    </div>

    <div id="sm-loading" style="text-align:center; padding:30px; color:#64748b; font-size:13px; font-weight:600;">
      데이터를 동기화하는 중...
    </div>
    <div id="sm-panel"></div>
  `;

  wrapper.querySelectorAll('.sm-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _tab = btn.dataset.tab;
      wrapper.querySelectorAll('.sm-tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === _tab);
      });
      loadPanel(wrapper);
    });
  });

  wrapper.querySelector('#btn-refresh').addEventListener('click', () => {
    toast('데이터를 새로고침합니다.');
    loadPanel(wrapper);
  });

  container.appendChild(wrapper);

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
    else if (_tab === 'best10') await renderBest10Panel(panel);
    else if (_tab === 'menus') await renderMenusPanel(panel);
    else if (_tab === 'sections') await renderSectionsPanel(panel, wrapper);
  } catch(e) {
    panel.innerHTML = `
      <div class="sm-card" style="border-color:#fca5a5; background:#fef2f2; color:#b91c1c;">
        <h4 style="margin:0 0 6px 0; font-weight:800;">데이터 연동 실패</h4>
        <p style="margin:0; font-size:12.5px;">${e.message}. Supabase 데이터베이스 설정을 확인해 주세요.</p>
      </div>
    `;
  }
  loading.style.display = 'none';
}

// ① 상단 배너 탭
async function renderBannersPanel(panel) {
  const banners = await bannerDB.getAll();
  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0;">상단 롤링 프로모 배너 (${banners.length}개)</h2>
      <button id="add-banner" class="sm-action-btn sm-btn-primary">+ 새 배너 추가</button>
    </div>
    <div id="banner-list"></div>
  `;

  panel.querySelector('#add-banner').addEventListener('click', async () => {
    await bannerDB.insert({ sort_order: 99, title:'새 기획 배너', desc:'', label:'오늘', time_text:'오후 8시', img_url:'', link_url:'/shop/live_teaser.html' });
    toast('새 배너가 추가되었습니다.');
    await renderBannersPanel(panel);
  });

  const list = panel.querySelector('#banner-list');
  banners.forEach((b) => {
    const card = document.createElement('div');
    card.className = 'sm-card';
    card.innerHTML = `
      <div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
        <div style="width:130px; flex-shrink:0;">
          <label class="sm-label">배너 썸네일 (클릭 업로드)</label>
          <div class="sm-thumb-uploader b-uploader" style="width:100%; height:86px;">
            <img class="b-thumb" src="${esc(b.img_url || '')}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">클릭 업로드</div>
          </div>
        </div>
        <div style="flex:1; min-width:260px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          ${formField('배너 대제목','b-title',b.title)}
          ${formField('서브 설명','b-desc',b.desc)}
          ${formField('라벨 (예: 오늘, 내일)','b-label',b.label)}
          ${formField('시간 문구 (예: 오후 8시)','b-time',b.time_text)}
          ${imgUploadField('이미지 URL','b-img',b.img_url)}
          ${formField('이동 링크 URL','b-link',b.link_url,'text',true)}
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:16px; padding-top:12px; border-top:1px solid #f1f5f9;">
        <button class="sm-action-btn sm-btn-success b-save">저장</button>
        <button class="sm-action-btn sm-btn-danger b-del">삭제</button>
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
        desc: card.querySelector('.b-desc').value.trim(),
        label: card.querySelector('.b-label').value.trim(),
        time_text: card.querySelector('.b-time').value.trim(),
        img_url: card.querySelector('.b-img').value.trim(),
        link_url: card.querySelector('.b-link').value.trim(),
      });
      toast('배너 저장 완료');
    });
    card.querySelector('.b-del').addEventListener('click', async () => {
      if (!confirm('배너를 삭제합니까?')) return;
      await bannerDB.delete(b.id);
      toast('삭제되었습니다.');
      await renderBannersPanel(panel);
    });

    list.appendChild(card);
  });
}

// ② 라이브 NOW 탭
async function renderLivesPanel(panel) {
  const lives = await liveDB.getAll();
  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0;">라이브 방송 목록 (${lives.length}개)</h2>
      <button id="add-live" class="sm-action-btn sm-btn-primary">+ 새 라이브 추가</button>
    </div>
    <div id="live-list"></div>
  `;

  panel.querySelector('#add-live').addEventListener('click', async () => {
    await liveDB.insert({ sort_order:99, title:'신규 라이브 방송', viewers:'0명 시청 중', img_url:'', link_url:'', status:'live' });
    toast('새 라이브가 생성되었습니다.');
    await renderLivesPanel(panel);
  });

  const list = panel.querySelector('#live-list');
  lives.forEach((lv) => {
    const card = document.createElement('div');
    card.className = 'sm-card';
    const isUpcoming = lv.status === 'upcoming';
    card.innerHTML = `
      <div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
        <div style="width:130px; flex-shrink:0;">
          <label class="sm-label">방송 썸네일 (클릭 업로드)</label>
          <div class="sm-thumb-uploader lv-uploader" style="width:100%; height:86px;">
            <img class="lv-thumb" src="${esc(lv.img_url || '')}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">클릭 업로드</div>
          </div>
        </div>
        <div style="flex:1; min-width:260px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          ${formField('방송 타이틀','lv-title',lv.title,'text',true)}
          <div>
            <label class="sm-label">진행 상태</label>
            <select class="sm-input lv-status" style="font-weight:700; cursor:pointer;">
              <option value="live" ${!isUpcoming ? 'selected' : ''}>방송 중 (버튼: 지금 시청하기)</option>
              <option value="upcoming" ${isUpcoming ? 'selected' : ''}>방송 예정 (버튼: 라이브 확인하기)</option>
            </select>
          </div>
          ${formField('시청자 수 / 시간 문구','lv-viewers',lv.viewers)}
          ${formField('이동 링크 URL','lv-link',lv.link_url)}
          ${imgUploadField('썸네일 이미지 URL','lv-img',lv.img_url)}
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:16px; padding-top:12px; border-top:1px solid #f1f5f9;">
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
        title:    card.querySelector('.lv-title').value.trim(),
        viewers:  card.querySelector('.lv-viewers').value.trim(),
        link_url: card.querySelector('.lv-link').value.trim(),
        img_url:   card.querySelector('.lv-img').value.trim(),
        status:   card.querySelector('.lv-status').value,
      });
      toast('라이브 정보 저장 완료');
    });
    card.querySelector('.lv-del').addEventListener('click', async () => {
      if (!confirm('라이브를 삭제합니까?')) return;
      await liveDB.delete(lv.id);
      toast('삭제되었습니다.');
      await renderLivesPanel(panel);
    });

    list.appendChild(card);
  });
}

// ③ 베스트 TOP 10 랭킹 & 뱃지 커스텀 색상 전용 관리 탭
async function renderBest10Panel(panel) {
  const products = await productDB.getAll();
  // 베스트 랭킹이 지정되었거나 전체 상품 중 상위 10개
  const bestProducts = products
    .filter(p => (p.best_rank && p.best_rank > 0))
    .sort((a,b) => (a.best_rank || 99) - (b.best_rank || 99))
    .slice(0, 10);

  const displayList = bestProducts.length ? bestProducts : products.slice(0, 10);

  panel.innerHTML = `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px 16px; margin-bottom:20px; color:#334155;">
      <h3 style="font-size:13px; font-weight:800; margin:0 0 4px 0;">
        베스트 TOP 10 랭킹 & 뱃지 커스텀 색상 설정
      </h3>
      <p style="font-size:12px; margin:0; line-height:1.4; color:#64748b;">
        • 쇼핑몰 홈 <strong>[베스트 TOP 10]</strong> 탭 클릭 시 표시될 1위부터 10위까지 순위와 <strong>순위 뱃지 배경 색상(Badge Color)</strong>을 직접 설정할 수 있습니다.
      </p>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0;">베스트 TOP 10 랭킹 등록 상품 목록 (${displayList.length}개)</h2>
    </div>
    <div id="best10-list"></div>
  `;

  const list = panel.querySelector('#best10-list');

  displayList.forEach((p, idx) => {
    const defaultRank = p.best_rank || (idx + 1);
    const defaultColor = p.badge_color || '#ef4444';

    const card = document.createElement('div');
    card.className = 'sm-card';
    card.innerHTML = `
      <div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
        <div style="width:110px; flex-shrink:0;">
          <div style="margin-bottom:6px;">
            <span class="sm-rank-badge top3" style="background:${esc(defaultColor)}">RANK #${defaultRank}</span>
          </div>
          <div class="sm-thumb-uploader b10-uploader" style="width:100%; height:86px;">
            <img class="b10-thumb" src="${esc(p.img_url || '')}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">클릭 업로드</div>
          </div>
        </div>
        <div style="flex:1; min-width:260px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div>
            <label class="sm-label">베스트 TOP 10 순위 (1~10)</label>
            <input class="sm-input b10-rank" type="number" min="1" max="10" value="${defaultRank}" style="font-weight:800;">
          </div>
          <div>
            <label class="sm-label">뱃지 배경 색상 (Badge Color)</label>
            <div class="color-picker-box">
              <input class="color-picker-input b10-picker" type="color" value="${esc(defaultColor)}">
              <input class="sm-input b10-color" type="text" value="${esc(defaultColor)}" placeholder="#ef4444" style="font-weight:700;">
            </div>
          </div>
          ${formField('브랜드명','b10-bname', p.brand_name || '')}
          ${formField('상품명','b10-title', p.product_title || p.brand_title || '')}
          ${formField('판매가','b10-sale', p.sale_price)}
          ${formField('할인 태그 (예: 50% OFF)','b10-disc', p.discount)}
          ${imgUploadField('상품 이미지 URL','b10-img', p.img_url)}
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:16px; padding-top:12px; border-top:1px solid #f1f5f9;">
        <button class="sm-action-btn sm-btn-success b10-save">저장</button>
      </div>
    `;

    const uploader = card.querySelector('.b10-uploader');
    const inputImg = card.querySelector('.b10-img');
    bindImageUploader(uploader, inputImg, (url) => {
      card.querySelector('.b10-thumb').src = url;
    });

    const picker = card.querySelector('.b10-picker');
    const colorText = card.querySelector('.b10-color');

    picker.addEventListener('input', (e) => {
      colorText.value = e.target.value;
      card.querySelector('.sm-rank-badge').style.background = e.target.value;
    });
    colorText.addEventListener('input', (e) => {
      picker.value = e.target.value;
      card.querySelector('.sm-rank-badge').style.background = e.target.value;
    });

    card.querySelector('.b10-save').addEventListener('click', async () => {
      const rankVal = parseInt(card.querySelector('.b10-rank').value) || (idx + 1);
      const colorVal = card.querySelector('.b10-color').value.trim() || '#ef4444';
      const bName = card.querySelector('.b10-bname').value.trim();
      const pTitle = card.querySelector('.b10-title').value.trim();
      const combinedTitle = bName ? `${bName} ${pTitle}` : pTitle;

      await productDB.update(p.id, {
        best_rank: rankVal,
        badge_color: colorVal,
        brand_name: bName,
        product_title: pTitle,
        brand_title: combinedTitle,
        sale_price: card.querySelector('.b10-sale').value.trim(),
        discount: card.querySelector('.b10-disc').value.trim(),
        img_url: card.querySelector('.b10-img').value.trim(),
      });
      toast(`베스트 #${rankVal}위 상품 및 뱃지 색상 저장 완료`);
    });

    list.appendChild(card);
  });
}

// ④ 퀵메뉴 탭 설정
async function renderMenusPanel(panel) {
  const [menus, sections] = await Promise.all([menuDB.getAll(), sectionDB.getAll()]);
  _sections = sections;

  const secOptions = `<option value="">-- 상품 섹션 연결 안함 --</option>` +
    sections.map(s => `<option value="${s.id}">${esc(s.title)}</option>`).join('');

  panel.innerHTML = `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px 16px; margin-bottom:20px; color:#334155;">
      <h3 style="font-size:13px; font-weight:800; margin:0 0 4px 0;">
        퀵메뉴 탭 & 베스트 랭킹 안내
      </h3>
      <p style="font-size:12px; margin:0; line-height:1.4; color:#64748b;">
        쇼핑몰 홈 상단 퀵탭에는 [전체] 및 [베스트 TOP 10] 탭이 자동 생성되며, 아래 추가한 탭 클릭 시 매핑된 상품 섹션이 표출됩니다.
      </p>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0;">가로 퀵메뉴 탭 설정 (${menus.length}개)</h2>
      <button id="add-menu" class="sm-action-btn sm-btn-primary">+ 새 탭 메뉴 추가</button>
    </div>
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
    card.style.cssText = 'padding:14px 16px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:10px;';

    card.innerHTML = `
      <span class="sm-rank-badge">TAB #${i+1}</span>
      <div style="flex:1; min-width:180px;">
        <label class="sm-label" style="margin-bottom:3px;">탭 메뉴 이름</label>
        <input class="sm-input m-name" value="${esc(m.name)}" placeholder="예: 셀러 특가" style="font-weight:700;">
      </div>
      <div style="width:240px;">
        <label class="sm-label" style="margin-bottom:3px;">연동 상품 섹션</label>
        <select class="sm-input m-sec" style="font-weight:700; cursor:pointer; height:37px; padding:0 10px;">
          ${secOptions}
        </select>
      </div>
      <div style="display:flex; gap:6px;">
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
      toast('탭 저장 완료');
    });

    card.querySelector('.m-del').addEventListener('click', async () => {
      if (!confirm('이 탭 메뉴를 삭제합니까?')) return;
      await menuDB.delete(m.id);
      toast('삭제되었습니다.');
      await renderMenusPanel(panel);
    });

    list.appendChild(card);
  });
}

// ⑤ 상품 섹션 & MD 추천 코멘트 및 뱃지 컬러 관리
async function renderSectionsPanel(panel, wrapper) {
  _sections = await sectionDB.getAll();
  const products = await productDB.getAll();
  const prodBySec = {};
  products.forEach(p => {
    if (!prodBySec[p.section_id]) prodBySec[p.section_id] = [];
    prodBySec[p.section_id].push(p);
  });

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0;">상품 섹션 & MD 추천 관리 (${_sections.length}개 섹션)</h2>
      <button id="add-sec" class="sm-action-btn sm-btn-primary">+ 새 상품 섹션 추가</button>
    </div>
    <div id="section-list"></div>
  `;

  panel.querySelector('#add-sec').addEventListener('click', async () => {
    await sectionDB.insert({ sort_order:99, title:'새 기획전 섹션', subtitle:'단독 특가로 만나보세요', show_timer:false });
    toast('새 섹션이 생성되었습니다.');
    await renderSectionsPanel(panel, wrapper);
  });

  const list = panel.querySelector('#section-list');
  _sections.forEach((sec) => {
    const prods = prodBySec[sec.id] || [];
    const card = document.createElement('div');
    card.className = 'sm-card';

    card.innerHTML = `
      <div class="sm-card-header">
        <div class="sm-card-title">
          <span>${esc(sec.title)}</span>
          <span style="font-size:11px; font-weight:600; color:#64748b; background:#f1f5f9; padding:2px 6px; border-radius:4px;">(${prods.length}개 상품)</span>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="sm-action-btn sm-btn-primary sec-add-prod" style="padding:5px 10px; font-size:12px;">+ 상품 추가</button>
          <button class="sm-action-btn sm-btn-success sec-save" style="padding:5px 10px; font-size:12px;">섹션 저장</button>
          <button class="sm-action-btn sm-btn-danger sec-del" style="padding:5px 10px; font-size:12px;">섹션 삭제</button>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px;">
        ${formField('섹션 제목 (예: 바캉스 기획전, 인플루언서 픽)','sec-title',sec.title)}
        ${formField('섹션 부제목 / 혜택 안내','sec-subtitle',sec.subtitle)}
      </div>

      <div style="margin-top:16px; background:#f8fafc; border-radius:8px; padding:14px;">
        <h4 style="font-size:12.5px; font-weight:800; color:#334155; margin:0 0 10px 0;">등록 상품 리스트</h4>
        <div class="sec-prod-list" style="display:flex; flex-direction:column; gap:12px;"></div>
      </div>
    `;

    card.querySelector('.sec-save').addEventListener('click', async () => {
      await sectionDB.update(sec.id, {
        title: card.querySelector('.sec-title').value.trim(),
        subtitle: card.querySelector('.sec-subtitle').value.trim(),
      });
      toast('섹션 정보가 저장되었습니다.');
    });

    card.querySelector('.sec-del').addEventListener('click', async () => {
      if (!confirm('이 섹션과 포함된 상품들을 모두 삭제합니까?')) return;
      await sectionDB.delete(sec.id);
      toast('섹션이 삭제되었습니다.');
      await renderSectionsPanel(panel, wrapper);
    });

    card.querySelector('.sec-add-prod').addEventListener('click', async () => {
      await productDB.insert({
        section_id: sec.id,
        sort_order: 99,
        brand_name: '브랜드',
        product_title: '신규 상품',
        brand_title: '브랜드 신규 상품',
        sale_price: '10,000원',
        origin_price: '20,000원',
        discount: '50% OFF',
        unit_price: '',
        rating: '5.0',
        reviews: '10',
        md_comment: 'MD 강력 추천 상품',
        badge_color: '#ef4444',
        best_rank: 0,
        img_url: '',
        chips: []
      });
      toast('새 상품 카드가 추가되었습니다.');
      await renderSectionsPanel(panel, wrapper);
    });

    // 상품 카드 슬림 폼 리스트
    const prodListEl = card.querySelector('.sec-prod-list');
    prods.forEach((p, idx) => {
      const itemRow = document.createElement('div');
      itemRow.style.cssText = 'background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; gap:14px; align-items:flex-start; flex-wrap:wrap;';

      let bNameVal = p.brand_name || '';
      let pTitleVal = p.product_title || '';
      if (!bNameVal && p.brand_title) {
        const parts = p.brand_title.split(' ');
        if (parts.length > 1) {
          bNameVal = parts[0];
          pTitleVal = parts.slice(1).join(' ');
        } else {
          pTitleVal = p.brand_title;
        }
      }

      const defaultColor = p.badge_color || '#ef4444';

      itemRow.innerHTML = `
        <div style="width:100px; flex-shrink:0;">
          <div style="margin-bottom:4px;">
            <span class="sm-rank-badge ${idx < 3 ? 'top3' : ''}" style="background:${esc(defaultColor)}">ITEM #${idx + 1}</span>
          </div>
          <div class="sm-thumb-uploader p-uploader" style="width:100%; height:80px;">
            <img class="p-thumb" src="${esc(p.img_url || '')}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">클릭 업로드</div>
          </div>
        </div>
        <div style="flex:1; min-width:240px; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          ${formField('브랜드명 (예: 설화수)','p-bname', bNameVal)}
          ${formField('상품명 (예: 윤조 에센스 90ml)','p-ptitle', pTitleVal)}
          ${formField('판매가 (예: 9,900원)','p-sale',p.sale_price)}
          ${formField('원래 정가 (예: 50,000원)','p-origin',p.origin_price)}
          ${formField('할인 태그 (예: 80% 특가)','p-disc',p.discount)}
          <div>
            <label class="sm-label">뱃지 배경 색상 (Badge Color)</label>
            <div class="color-picker-box">
              <input class="color-picker-input p-picker" type="color" value="${esc(defaultColor)}">
              <input class="sm-input p-color" type="text" value="${esc(defaultColor)}" placeholder="#ef4444" style="font-weight:700;">
            </div>
          </div>
          ${formField('MD 추천 코멘트','p-md', p.md_comment || 'MD 강력 추천')}
          ${imgUploadField('상품 이미지 URL','p-img',p.img_url)}
        </div>
        <div style="display:flex; flex-direction:column; gap:6px; margin-top:16px;">
          <button class="sm-action-btn sm-btn-success p-save" style="padding:5px 10px; font-size:11.5px;">저장</button>
          <button class="sm-action-btn sm-btn-danger p-del" style="padding:5px 10px; font-size:11.5px;">삭제</button>
        </div>
      `;

      const uploader = itemRow.querySelector('.p-uploader');
      const input = itemRow.querySelector('.p-img');
      bindImageUploader(uploader, input, (url) => {
        itemRow.querySelector('.p-thumb').src = url;
      });

      const picker = itemRow.querySelector('.p-picker');
      const colorText = itemRow.querySelector('.p-color');

      picker.addEventListener('input', (e) => {
        colorText.value = e.target.value;
        itemRow.querySelector('.sm-rank-badge').style.background = e.target.value;
      });
      colorText.addEventListener('input', (e) => {
        picker.value = e.target.value;
        itemRow.querySelector('.sm-rank-badge').style.background = e.target.value;
      });

      itemRow.querySelector('.p-img-preview').addEventListener('click', () => {
        itemRow.querySelector('.p-thumb').src = itemRow.querySelector('.p-img').value.trim();
      });

      itemRow.querySelector('.p-save').addEventListener('click', async () => {
        const bName = itemRow.querySelector('.p-bname').value.trim();
        const pTitle = itemRow.querySelector('.p-ptitle').value.trim();
        const combinedTitle = bName ? `${bName} ${pTitle}` : pTitle;

        await productDB.update(p.id, {
          brand_name:    bName,
          product_title: pTitle,
          brand_title:   combinedTitle,
          sale_price:    itemRow.querySelector('.p-sale').value.trim(),
          origin_price:  itemRow.querySelector('.p-origin').value.trim(),
          discount:      itemRow.querySelector('.p-disc').value.trim(),
          badge_color:   itemRow.querySelector('.p-color').value.trim() || '#ef4444',
          md_comment:    itemRow.querySelector('.p-md').value.trim(),
          img_url:       itemRow.querySelector('.p-img').value.trim(),
        });
        toast('상품 정보 및 뱃지 색상 저장 완료');
      });

      itemRow.querySelector('.p-del').addEventListener('click', async () => {
        if (!confirm('상품을 삭제하시겠습니까?')) return;
        await productDB.delete(p.id);
        toast('삭제되었습니다.');
        await renderSectionsPanel(panel, wrapper);
      });

      prodListEl.appendChild(itemRow);
    });

    list.appendChild(card);
  });
}
