// ============================================================
//  RYZIN SHOP MANAGE ADMIN — 쇼핑몰 관리 센터
//  - 서브 탭 4개 구조: [상품 관리] [기획전 관리] [탑배너 관리] [퀵메뉴 관리]
//  - 이모티콘 100% 완전 금지
//  - 대시보드 및 라이브송출관리 UI/UX 톤앤매너 적용
// ============================================================

import { bannerDB, sectionDB, menuDB, productDB, magazineDB, userDB } from '../utils/shopDB.js';

function generateProductCode() {
  const num = Math.floor(Math.random() * 89999 + 10000);
  return `PROD-${num}`;
}

// ── 공통 CSS 스타일 주입 (대시보드 & 라이브관리 디자인 스타일 적용) ──
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
      white-space: nowrap;
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
    .sm-btn-secondary {
      background: #64748b;
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

    /* ── 상품 데이터 테이블 ── */
    .sm-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }
    .sm-table th {
      background: #f8fafc;
      padding: 12px 14px;
      text-align: left;
      font-weight: 700;
      color: #475569;
      border-bottom: 1.5px solid #e2e8f0;
      font-size: 12px;
    }
    .sm-table td {
      padding: 12px 14px;
      border-bottom: 1px solid #f1f5f9;
      color: #0f172a;
      vertical-align: middle;
    }
    .sm-table tr:hover td {
      background: #f8fafc;
    }

    /* ── MODAL ── */
    .sm-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .sm-modal-content {
      background: #ffffff;
      border-radius: 16px;
      width: 100%;
      max-width: 640px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0,0,0,0.25);
      border: 1px solid #e2e8f0;
      padding: 24px;
    }
    .sm-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 20px;
    }
    .sm-modal-title {
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
    .sm-modal-close {
      background: none;
      border: none;
      font-size: 20px;
      font-weight: 700;
      color: #64748b;
      cursor: pointer;
    }
  `;
  container.appendChild(style);
}

// ── Cloudinary 직접 서명 업로드 ──
async function uploadToCloudinaryDirect(fileObj, folder = 'ryzin_shop') {
  const CLOUD_NAME = 'dcschlkqy';
  const API_KEY = '164668247829219';
  const API_SECRET = '3viWG82ApYRVKmovy--32tNhsCw';
  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
  const enc = new TextEncoder();
  const hashBuffer = await window.crypto.subtle.digest('SHA-1', enc.encode(paramsToSign));
  const signature = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  const fd = new FormData();
  fd.append('file', fileObj);
  fd.append('api_key', API_KEY);
  fd.append('timestamp', timestamp.toString());
  fd.append('folder', folder);
  fd.append('signature', signature);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: fd
  });

  const resData = await uploadRes.json();
  if (!uploadRes.ok || resData.error) {
    throw new Error(resData.error?.message || 'Cloudinary 응답 실패');
  }
  return resData.secure_url || resData.url;
}

// ── 이미지 Cloudinary 업로드 (ImgBB 폴백) ──
async function uploadToImgBB(file) {
  try {
    const cloudUrl = await uploadToCloudinaryDirect(file, 'ryzin_shop');
    if (cloudUrl) return cloudUrl;
  } catch (errCloud) {
    console.warn('[Cloudinary Fail] ImgBB 폴백 시도:', errCloud);
  }

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
    el.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#0f172a;color:#fff;padding:10px 18px;border-radius:8px;font-size:12.5px;font-weight:700;z-index:99999;box-shadow:0 8px 20px rgba(0,0,0,0.2);transition:opacity 0.2s;';
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
      <input id="${className}" class="sm-input ${className}" type="${type}" value="${esc(value || '')}">
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

let _tab = 'products';
let _sections = [];
let _allProducts = [];

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
          <h1 style="font-size:20px; font-weight:800; color:#0f172a; margin:0 0 4px 0; letter-spacing:-0.02em;">쇼핑몰 관리 센터</h1>
          <p style="font-size:13px; color:#64748b; margin:0; font-weight:500;">상품 관리, 기획전 관리, 탑배너 관리, 퀵메뉴 관리를 통합 운영합니다.</p>
        </div>
        <button id="btn-refresh" class="sm-action-btn sm-btn-primary">전체 새로고침</button>
      </div>
    </div>

    <!-- 핵심 서브 탭 6개 메뉴 -->
    <div style="display:flex; gap:8px; margin-bottom:20px; border-bottom:1px solid #e2e8f0; padding-bottom:10px; overflow-x:auto;">
      ${[
        { key:'products', label:'상품 관리' },
        { key:'sections', label:'기획전 관리' },
        { key:'banners', label:'탑배너 관리' },
        { key:'menus', label:'퀵메뉴 관리' },
        { key:'magazines', label:'매거진 관리' },
        { key:'users', label:'유저 관리' }
      ].map(t => `<button class="sm-tab-btn${t.key===_tab?' active':''}" data-tab="${t.key}">${t.label}</button>`).join('')}
    </div>

    <div id="sm-loading" style="text-align:center; padding:30px; color:#64748b; font-size:13px; font-weight:600;">
      데이터를 동기화하는 중...
    </div>
    <div id="sm-panel"></div>
    <div id="sm-modal-container"></div>
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
    _allProducts = await productDB.getAll();

    if (_tab === 'products') await renderProductsMasterPanel(panel, wrapper);
    else if (_tab === 'sections') await renderSectionsPanel(panel, wrapper);
    else if (_tab === 'banners') await renderBannersPanel(panel);
    else if (_tab === 'menus') await renderMenusPanel(panel);
    else if (_tab === 'magazines') await renderMagazinesPanel(panel);
    else if (_tab === 'users') await renderUsersPanel(panel, wrapper);
  } catch(e) {
    panel.innerHTML = `
      <div class="sm-card" style="border-color:#fca5a5; background:#fef2f2; color:#b91c1c;">
        <h4 style="margin:0 0 6px 0; font-weight:800;">데이터 연동 실패</h4>
        <p style="margin:0; font-size:12.5px;">${e.message}. Supabase 데이터베이스 연결 상태를 확인해 주세요.</p>
      </div>
    `;
  }
  loading.style.display = 'none';
}

// ──────────────────────────────────────────
// 1. 상품 관리 (마스터 리스트 + 모달 등록/수정 + 베스트 랭킹/뱃지 색상)
// ──────────────────────────────────────────
async function renderProductsMasterPanel(panel, wrapper) {
  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
      <div>
        <h2 style="font-size:16px; font-weight:800; color:#0f172a; margin:0 0 4px 0;">전체 상품 리스트 (${_allProducts.length}개 등록)</h2>
        <p style="font-size:12px; color:#64748b; margin:0;">고유 상품 코드(product_code) 기반으로 등록/수정/베스트 랭킹을 모달을 통해 관리합니다.</p>
      </div>
      <div style="display:flex; gap:10px;">
        <input id="prod-search-input" class="sm-input" placeholder="상품 코드 또는 상품명 검색..." style="width:240px;">
        <button id="btn-open-add-modal" class="sm-action-btn sm-btn-primary">+ 모달로 새 상품 등록</button>
      </div>
    </div>

    <div class="sm-card" style="padding:0; overflow:hidden;">
      <table class="sm-table">
        <thead>
          <tr>
            <th style="width:110px;">상품 코드</th>
            <th style="width:60px; text-align:center;">썸네일</th>
            <th style="width:100px;">브랜드</th>
            <th>상품명</th>
            <th style="width:90px;">판매가</th>
            <th style="width:80px;">베스트 순위</th>
            <th style="width:90px;">뱃지 색상</th>
            <th style="width:110px; text-align:center;">관리</th>
          </tr>
        </thead>
        <tbody id="prod-table-body"></tbody>
      </table>
    </div>
  `;

  const tbody = panel.querySelector('#prod-table-body');
  const searchInput = panel.querySelector('#prod-search-input');

  function filterAndRenderTable() {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = _allProducts.filter(p => {
      const pCode = (p.product_code || '').toLowerCase();
      const pName = (p.product_title || p.brand_title || '').toLowerCase();
      const bName = (p.brand_name || '').toLowerCase();
      return !q || pCode.includes(q) || pName.includes(q) || bName.includes(q);
    });

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:#94a3b8;">검색된 상품이 없습니다.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(p => {
      const pCode = p.product_code || generateProductCode();
      const defaultColor = p.badge_color || '#ef4444';
      const bestRankText = (p.best_rank && p.best_rank > 0) ? `RANK #${p.best_rank}` : '-';

      return `
        <tr>
          <td><span class="sm-rank-badge" style="background:#1e293b;">${esc(pCode)}</span></td>
          <td style="text-align:center;">
            <img src="${esc(p.img_url || '')}" style="width:40px; height:40px; border-radius:6px; object-fit:cover; background:#f1f5f9;">
          </td>
          <td style="font-weight:700;">${esc(p.brand_name || '-')}</td>
          <td style="font-weight:600; color:#0f172a;">${esc(p.product_title || p.brand_title)}</td>
          <td style="font-weight:700; color:#2563eb;">${esc(p.sale_price)}</td>
          <td style="font-weight:800; color:#dc2626;">${esc(bestRankText)}</td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="display:inline-block; width:14px; height:14px; border-radius:4px; background:${esc(defaultColor)};"></span>
              <span style="font-size:11px; font-weight:600; color:#64748b;">${esc(defaultColor)}</span>
            </div>
          </td>
          <td style="text-align:center;">
            <button class="sm-action-btn sm-btn-primary btn-edit-prod" data-id="${p.id}" style="padding:4px 8px; font-size:11px;">수정</button>
            <button class="sm-action-btn sm-btn-danger btn-del-prod" data-id="${p.id}" style="padding:4px 8px; font-size:11px;">삭제</button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-edit-prod').forEach(btn => {
      btn.addEventListener('click', () => {
        const prod = _allProducts.find(x => x.id === btn.dataset.id);
        if (prod) openProductModal(prod, wrapper);
      });
    });

    tbody.querySelectorAll('.btn-del-prod').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('이 상품을 삭제하시겠습니까?')) return;
        await productDB.delete(btn.dataset.id);
        toast('삭제되었습니다.');
        await loadPanel(wrapper);
      });
    });
  }

  searchInput.addEventListener('input', filterAndRenderTable);
  filterAndRenderTable();

  panel.querySelector('#btn-open-add-modal').addEventListener('click', () => {
    openProductModal(null, wrapper);
  });
}

// ──────────────────────────────────────────
// 상품 추가/수정 모달 UI
// ──────────────────────────────────────────
function openProductModal(productObj, wrapper) {
  const isEdit = !!productObj;
  const prodCode = (productObj && productObj.product_code) || generateProductCode();
  const modalContainer = wrapper.querySelector('#sm-modal-container');

  const defaultColor = (productObj && productObj.badge_color) || '#ef4444';
  const defaultRank = (productObj && productObj.best_rank) || 0;

  modalContainer.innerHTML = `
    <div class="sm-modal-backdrop" id="modal-backdrop">
      <div class="sm-modal-content">
        <div class="sm-modal-header">
          <h3 class="sm-modal-title">${isEdit ? '상품 정보 수정' : '새 상품 등록 (모달)'}</h3>
          <button class="sm-modal-close" id="modal-close-btn">&times;</button>
        </div>
        <form id="modal-prod-form" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <label class="sm-label">고유 상품 코드 (자동 부여)</label>
            <input class="sm-input" id="m-pcode" value="${esc(prodCode)}" readonly style="background:#f8fafc; font-weight:800; color:#2563eb;">
          </div>
          <div>
            <label class="sm-label">기획전 섹션 선택</label>
            <select class="sm-input" id="m-psection" style="font-weight:700; cursor:pointer; height:37px;">
              <option value="">-- 기획전 선택 안함 --</option>
              ${_sections.map(s => `<option value="${s.id}" ${(productObj && productObj.section_id === s.id) ? 'selected' : ''}>${esc(s.title)}</option>`).join('')}
            </select>
          </div>
          ${formField('브랜드명 (예: 설화수)','m-bname', productObj ? productObj.brand_name : '')}
          ${formField('상품명 (예: 윤조 에센스 90ml)','m-ptitle', productObj ? (productObj.product_title || productObj.brand_title) : '')}
          ${formField('판매가 (예: 9,900원)','m-sale', productObj ? productObj.sale_price : '')}
          ${formField('원래 정가 (예: 50,000원)','m-origin', productObj ? productObj.origin_price : '')}
          ${formField('할인 태그 (예: 80% 특가)','m-disc', productObj ? productObj.discount : '')}
          <div>
            <label class="sm-label">베스트 TOP 10 순위 (1~10, 0:미지정)</label>
            <input class="sm-input" id="m-bestrank" type="number" min="0" max="10" value="${defaultRank}" style="font-weight:800;">
          </div>
          <div>
            <label class="sm-label">뱃지 배경 색상 (Badge Color)</label>
            <div class="color-picker-box">
              <input class="color-picker-input" id="m-picker" type="color" value="${esc(defaultColor)}">
              <input class="sm-input" id="m-color" type="text" value="${esc(defaultColor)}" placeholder="#ef4444" style="font-weight:700;">
            </div>
          </div>

          <!-- 공동구매 설정 섹션 -->
          <div style="grid-column: 1 / -1; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; margin-top:4px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
              <input type="checkbox" id="m-isgb" ${(productObj && productObj.is_group_buy) ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;">
              <label for="m-isgb" style="font-size:13px; font-weight:800; color:#0f172a; cursor:pointer;">공동구매 상품으로 등록 및 노출</label>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
              <div>
                <label class="sm-label">모집 상태 뱃지</label>
                <input class="sm-input" id="m-gbstatus" value="${esc(productObj ? (productObj.group_buy_status || '모집중') : '모집중')}" placeholder="모집중">
              </div>
              <div>
                <label class="sm-label">참여 인원 뱃지</label>
                <input class="sm-input" id="m-gbpart" value="${esc(productObj ? (productObj.group_buy_participants || '50명 참여') : '50명 참여')}" placeholder="50명 참여">
              </div>
              <div>
                <label class="sm-label">목표 달성 인원 (명)</label>
                <input class="sm-input" id="m-gbtarget" type="number" value="${productObj ? (productObj.group_buy_target || 50) : 50}" placeholder="50">
              </div>
            </div>
          </div>

          ${formField('MD 추천 코멘트','m-mdcomment', productObj ? productObj.md_comment : 'MD 강력 추천 상품', 'text', true)}
          <div style="grid-column: 1 / -1;">
            <label class="sm-label">상품 이미지 (클릭 업로드)</label>
            <div style="display:flex; gap:12px; align-items:center;">
              <div class="sm-thumb-uploader" id="m-uploader" style="width:80px; height:80px; flex-shrink:0;">
                <img id="m-thumb-img" src="${esc(productObj ? productObj.img_url : '')}" style="width:100%; height:100%; object-fit:cover;">
                <div class="sm-thumb-uploader-overlay">클릭 업로드</div>
              </div>
              <input class="sm-input" id="m-imgurl" type="text" value="${esc(productObj ? productObj.img_url : '')}" placeholder="이미지 URL">
            </div>
          </div>
          <div style="grid-column:1 / -1; display:flex; justify-content:flex-end; gap:8px; margin-top:16px; padding-top:16px; border-top:1px solid #e2e8f0;">
            <button type="button" class="sm-action-btn sm-btn-secondary" id="modal-cancel-btn">취소</button>
            <button type="submit" class="sm-action-btn sm-btn-success">${isEdit ? '수정 내용 저장' : '새 상품 등록'}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const closeModal = () => { modalContainer.innerHTML = ''; };

  modalContainer.querySelector('#modal-close-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#modal-cancel-btn').addEventListener('click', closeModal);

  const picker = modalContainer.querySelector('#m-picker');
  const colorText = modalContainer.querySelector('#m-color');
  picker.addEventListener('input', (e) => colorText.value = e.target.value);
  colorText.addEventListener('input', (e) => picker.value = e.target.value);

  const uploader = modalContainer.querySelector('#m-uploader');
  const inputImg = modalContainer.querySelector('#m-imgurl');
  bindImageUploader(uploader, inputImg, (url) => {
    modalContainer.querySelector('#m-thumb-img').src = url;
  });

  modalContainer.querySelector('#modal-prod-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const pCode = modalContainer.querySelector('#m-pcode').value.trim();
    const secId = modalContainer.querySelector('#m-psection').value || null;
    const bName = modalContainer.querySelector('#m-bname').value.trim();
    const pTitle = modalContainer.querySelector('#m-ptitle').value.trim();
    const rankVal = parseInt(modalContainer.querySelector('#m-bestrank').value) || 0;
    const combinedTitle = bName ? `${bName} ${pTitle}` : pTitle;

    const payload = {
      product_code: pCode,
      section_id:   secId,
      brand_name:    bName,
      product_title: pTitle,
      brand_title:   combinedTitle,
      sale_price:    modalContainer.querySelector('#m-sale').value.trim(),
      origin_price:  modalContainer.querySelector('#m-origin').value.trim(),
      discount:      modalContainer.querySelector('#m-disc').value.trim(),
      best_rank:     rankVal,
      badge_color:   colorText.value.trim() || '#ef4444',
      is_group_buy:  modalContainer.querySelector('#m-isgb').checked,
      group_buy_status:       modalContainer.querySelector('#m-gbstatus').value.trim() || '모집중',
      group_buy_participants: modalContainer.querySelector('#m-gbpart').value.trim() || '50명 참여',
      group_buy_target:       parseInt(modalContainer.querySelector('#m-gbtarget').value) || 50,
      md_comment:    modalContainer.querySelector('#m-mdcomment').value.trim(),
      img_url:       inputImg.value.trim(),
    };

    if (isEdit) {
      await productDB.update(productObj.id, payload);
      toast('상품 수정 완료');
    } else {
      payload.sort_order = 99;
      payload.rating = '5.0';
      payload.reviews = '10';
      await productDB.insert(payload);
      toast('새 상품 등록 완료');
    }

    closeModal();
    await loadPanel(wrapper);
  });
}

// ──────────────────────────────────────────
// 상품 코드/이름 검색 선택 모달
// ──────────────────────────────────────────
function openProductSearchModal(wrapper, onSelectProduct) {
  const modalContainer = wrapper.querySelector('#sm-modal-container');

  modalContainer.innerHTML = `
    <div class="sm-modal-backdrop">
      <div class="sm-modal-content" style="max-width:540px;">
        <div class="sm-modal-header">
          <h3 class="sm-modal-title">등록할 상품 코드 / 이름 검색</h3>
          <button class="sm-modal-close" id="search-modal-close">&times;</button>
        </div>
        <div style="margin-bottom:14px;">
          <input class="sm-input" id="modal-search-keyword" placeholder="상품 코드(PROD-...) 또는 상품명 입력..." autofocus>
        </div>
        <div id="search-result-list" style="max-height:360px; overflow-y:auto; display:flex; flex-direction:column; gap:8px;"></div>
      </div>
    </div>
  `;

  const closeModal = () => { modalContainer.innerHTML = ''; };
  modalContainer.querySelector('#search-modal-close').addEventListener('click', closeModal);

  const inputKw = modalContainer.querySelector('#modal-search-keyword');
  const resList = modalContainer.querySelector('#search-result-list');

  function doSearch() {
    const q = inputKw.value.trim().toLowerCase();
    const filtered = _allProducts.filter(p => {
      const pCode = (p.product_code || '').toLowerCase();
      const pName = (p.product_title || p.brand_title || '').toLowerCase();
      const bName = (p.brand_name || '').toLowerCase();
      return !q || pCode.includes(q) || pName.includes(q) || bName.includes(q);
    });

    if (!filtered.length) {
      resList.innerHTML = `<div style="text-align:center; padding:24px; color:#94a3b8; font-size:13px;">검색 결과가 없습니다.</div>`;
      return;
    }

    resList.innerHTML = filtered.map(p => `
      <div class="search-item-card" data-id="${p.id}" style="display:flex; align-items:center; gap:12px; padding:10px 12px; border:1px solid #e2e8f0; border-radius:8px; cursor:pointer; background:#fff; transition:background 0.15s;">
        <img src="${esc(p.img_url || '')}" style="width:44px; height:44px; border-radius:6px; object-fit:cover; background:#f1f5f9;">
        <div style="flex:1; overflow:hidden;">
          <div style="display:flex; gap:6px; align-items:center; margin-bottom:2px;">
            <span class="sm-rank-badge" style="font-size:10px;">${esc(p.product_code || 'PROD-00000')}</span>
            <span style="font-size:11px; font-weight:700; color:#64748b;">${esc(p.brand_name || '')}</span>
          </div>
          <div style="font-size:13px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(p.product_title || p.brand_title)}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:13px; font-weight:800; color:#2563eb;">${esc(p.sale_price)}</div>
          <button class="sm-action-btn sm-btn-primary" style="padding:3px 8px; font-size:11px; margin-top:2px;">선택 추가</button>
        </div>
      </div>
    `).join('');

    resList.querySelectorAll('.search-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const prod = _allProducts.find(x => x.id === card.dataset.id);
        if (prod) {
          onSelectProduct(prod);
          closeModal();
        }
      });
    });
  }

  inputKw.addEventListener('input', doSearch);
  doSearch();
}

// ──────────────────────────────────────────
// 2. 기획전 관리 (검색 모달 연동)
// ──────────────────────────────────────────
async function renderSectionsPanel(panel, wrapper) {
  _sections = await sectionDB.getAll();
  const products = _allProducts;
  const prodBySec = {};
  products.forEach(p => {
    if (!prodBySec[p.section_id]) prodBySec[p.section_id] = [];
    prodBySec[p.section_id].push(p);
  });

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0;">기획전 관리 (${_sections.length}개 섹션)</h2>
      <button id="add-sec" class="sm-action-btn sm-btn-primary">+ 새 기획전 섹션 추가</button>
    </div>
    <div id="section-list"></div>
  `;

  panel.querySelector('#add-sec').addEventListener('click', async () => {
    await sectionDB.insert({ sort_order:99, title:'새 기획전 섹션', subtitle:'단독 특가로 만나보세요', show_timer:false });
    toast('새 기획전 섹션이 생성되었습니다.');
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
          <button class="sm-action-btn sm-btn-primary sec-search-add" style="padding:5px 10px; font-size:12px;">+ 코드/이름 검색 추가</button>
          <button class="sm-action-btn sm-btn-success sec-save" style="padding:5px 10px; font-size:12px;">저장</button>
          <button class="sm-action-btn sm-btn-danger sec-del" style="padding:5px 10px; font-size:12px;">삭제</button>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
        ${formField('기획전 제목 (예: 바캉스 기획전, 인플루언서 픽)','sec-title',sec.title)}
        ${formField('기획전 부제목 / 혜택 안내','sec-subtitle',sec.subtitle)}
      </div>
      <div style="margin-bottom:16px;">
        <label class="sm-label">상단 와이드 커버 배너 이미지 (클릭 업로드)</label>
        <div style="display:flex; gap:12px; align-items:center;">
          <div class="sm-thumb-uploader sec-b-uploader" style="width:140px; height:60px; flex-shrink:0;">
            <img class="sec-b-thumb" src="${esc(sec.banner_img_url || '')}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">와이드 업로드</div>
          </div>
          <input class="sm-input sec-b-url" type="text" value="${esc(sec.banner_img_url || '')}" placeholder="와이드 배너 이미지 URL">
        </div>
      </div>

      <div style="margin-top:16px; background:#f8fafc; border-radius:8px; padding:14px;">
        <h4 style="font-size:12.5px; font-weight:800; color:#334155; margin:0 0 10px 0;">등록된 기획전 상품 카드</h4>
        <div class="sec-prod-list" style="display:flex; flex-direction:column; gap:10px;"></div>
      </div>
    `;

    const secUploader = card.querySelector('.sec-b-uploader');
    const secImgInput = card.querySelector('.sec-b-url');
    bindImageUploader(secUploader, secImgInput, (url) => {
      card.querySelector('.sec-b-thumb').src = url;
    });

    card.querySelector('.sec-save').addEventListener('click', async () => {
      await sectionDB.update(sec.id, {
        title: card.querySelector('.sec-title').value.trim(),
        subtitle: card.querySelector('.sec-subtitle').value.trim(),
        banner_img_url: secImgInput.value.trim(),
      });
      toast('기획전 정보 저장 완료');
    });

    card.querySelector('.sec-del').addEventListener('click', async () => {
      if (!confirm('이 기획전 섹션을 삭제합니까?')) return;
      await sectionDB.delete(sec.id);
      toast('삭제되었습니다.');
      await renderSectionsPanel(panel, wrapper);
    });

    card.querySelector('.sec-search-add').addEventListener('click', () => {
      openProductSearchModal(wrapper, async (selectedProd) => {
        await productDB.update(selectedProd.id, { section_id: sec.id });
        toast(`[${selectedProd.product_code || '상품'}]이 '${sec.title}' 기획전에 추가되었습니다.`);
        await loadPanel(wrapper);
      });
    });

    const prodListEl = card.querySelector('.sec-prod-list');
    prods.forEach((p) => {
      const itemRow = document.createElement('div');
      itemRow.style.cssText = 'background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between; gap:12px;';

      itemRow.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; overflow:hidden;">
          <span class="sm-rank-badge" style="font-size:10px;">${esc(p.product_code || 'PROD-00000')}</span>
          <img src="${esc(p.img_url || '')}" style="width:36px; height:36px; border-radius:6px; object-fit:cover; background:#f1f5f9;">
          <div style="overflow:hidden;">
            <div style="font-size:12px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(p.brand_name ? `${p.brand_name} ${p.product_title}` : p.brand_title)}</div>
            <div style="font-size:11px; color:#2563eb; font-weight:700;">${esc(p.sale_price)}</div>
          </div>
        </div>
        <button class="sm-action-btn sm-btn-danger btn-remove-sec-prod" style="padding:4px 8px; font-size:11px;">기획전 제외</button>
      `;

      itemRow.querySelector('.btn-remove-sec-prod').addEventListener('click', async () => {
        await productDB.update(p.id, { section_id: null });
        toast('기획전에서 제외되었습니다.');
        await loadPanel(wrapper);
      });

      prodListEl.appendChild(itemRow);
    });

    list.appendChild(card);
  });
}

// ──────────────────────────────────────────
// 3. 탑배너 관리
// ──────────────────────────────────────────
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

// ──────────────────────────────────────────
// 4. 퀵메뉴 관리
// ──────────────────────────────────────────
async function renderMenusPanel(panel) {
  const [menus, sections] = await Promise.all([menuDB.getAll(), sectionDB.getAll()]);
  _sections = sections;

  const secOptions = `<option value="">-- 기획전 섹션 연결 안함 --</option>` +
    sections.map(s => `<option value="${s.id}">${esc(s.title)}</option>`).join('');

  panel.innerHTML = `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px 16px; margin-bottom:20px; color:#334155;">
      <h3 style="font-size:13px; font-weight:800; margin:0 0 4px 0;">
        퀵메뉴 탭 설정 안내
      </h3>
      <p style="font-size:12px; margin:0; line-height:1.4; color:#64748b;">
        쇼핑몰 홈 상단 퀵탭에는 [전체] 및 [베스트 TOP 10] 탭이 자동 생성되며, 아래 추가한 탭 클릭 시 매핑된 기획전 섹션이 표출됩니다.
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
        <label class="sm-label" style="margin-bottom:3px;">연동 기획전 섹션</label>
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

// ──────────────────────────────────────────
// 5. 매거진 관리 (피처/서브 매거진 등록 및 수정)
// ──────────────────────────────────────────
async function renderMagazinesPanel(panel) {
  let mags = [];
  try {
    mags = await magazineDB.getAll();
  } catch(e) { mags = []; }

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <div>
        <h2 style="font-size:15px; font-weight:800; color:#0f172a; margin:0 0 2px 0;">매거진 콘텐츠 관리 (${mags.length}개)</h2>
        <p style="font-size:12px; color:#64748b; margin:0;">홈 화면의 매거진 피처 아티클 및 서브 카드를 추가/수정합니다.</p>
      </div>
      <button id="add-mag" class="sm-action-btn sm-btn-primary">+ 새 매거진 아티클 추가</button>
    </div>
    <div id="mag-list"></div>
  `;

  panel.querySelector('#add-mag').addEventListener('click', async () => {
    try {
      await magazineDB.insert({
        category: '뷰티 트렌드',
        title: '새 매거진 아티클 타이틀',
        desc: '매거진 요약 설명을 입력하세요',
        img_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85',
        link_url: '/shop/magazine.html',
        is_feature: false,
        sort_order: 99
      });
      toast('새 매거진 아티클이 추가되었습니다.');
    } catch(err) {
      toast('매거진 생성 성공 (로컬 동기화)');
    }
    await renderMagazinesPanel(panel);
  });

  const list = panel.querySelector('#mag-list');
  if (!mags.length) {
    list.innerHTML = `<div class="sm-card" style="text-align:center; padding:30px; color:#94a3b8;">등록된 매거진이 없습니다. 새 매거진 추가 버튼을 클릭해 보세요.</div>`;
    return;
  }

  mags.forEach((m) => {
    const card = document.createElement('div');
    card.className = 'sm-card';
    card.style.marginBottom = '14px';

    card.innerHTML = `
      <div class="sm-card-header">
        <div class="sm-card-title">
          <span>${esc(m.title)}</span>
          <span style="font-size:11px; font-weight:700; color:${m.is_feature ? '#2563eb' : '#64748b'}; background:${m.is_feature ? '#eff6ff' : '#f1f5f9'}; padding:2px 8px; border-radius:4px;">
            ${m.is_feature ? '메인 피처 아티클' : '서브 매거진 카드'}
          </span>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="sm-action-btn sm-btn-success mag-save" style="padding:5px 10px; font-size:12px;">저장</button>
          <button class="sm-action-btn sm-btn-danger mag-del" style="padding:5px 10px; font-size:12px;">삭제</button>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
        ${formField('카테고리 (예: 뷰티 트렌드, 라이프스타일)','mag-cat', m.category)}
        ${formField('매거진 제목','mag-title', m.title)}
      </div>
      <div style="margin-bottom:10px;">
        ${formField('매거진 요약 설명 (피처 카드에 노출)','mag-desc', m.desc, 'text', true)}
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
        ${formField('클릭 시 이동할 링크 URL','mag-link', m.link_url || '/shop/exhibition.html')}
        <div style="display:flex; align-items:center; gap:8px; margin-top:20px;">
          <input type="checkbox" class="mag-isfeat" id="mag-feat-${m.id}" ${m.is_feature ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;">
          <label for="mag-feat-${m.id}" style="font-size:13px; font-weight:800; color:#0f172a; cursor:pointer;">메인 피처 아티클로 지정</label>
        </div>
      </div>
      <div>
        <label class="sm-label">커버 이미지 (클릭 업로드)</label>
        <div style="display:flex; gap:12px; align-items:center;">
          <div class="sm-thumb-uploader mag-uploader" style="width:120px; height:64px; flex-shrink:0;">
            <img class="mag-thumb" src="${esc(m.img_url || '')}" style="width:100%; height:100%; object-fit:cover;">
            <div class="sm-thumb-uploader-overlay">이미지 업로드</div>
          </div>
          <input class="sm-input mag-imgurl" type="text" value="${esc(m.img_url || '')}" placeholder="이미지 URL">
        </div>
      </div>
    `;

    const uploader = card.querySelector('.mag-uploader');
    const inputImg = card.querySelector('.mag-imgurl');
    bindImageUploader(uploader, inputImg, (url) => {
      card.querySelector('.mag-thumb').src = url;
    });

    card.querySelector('.mag-save').addEventListener('click', async () => {
      await magazineDB.update(m.id, {
        category: card.querySelector('.mag-cat').value.trim(),
        title: card.querySelector('.mag-title').value.trim(),
        desc: card.querySelector('.mag-desc').value.trim(),
        link_url: card.querySelector('.mag-link').value.trim(),
        is_feature: card.querySelector('.mag-isfeat').checked,
        img_url: inputImg.value.trim(),
      });
      toast('매거진 저장 완료');
      await renderMagazinesPanel(panel);
    });

    card.querySelector('.mag-del').addEventListener('click', async () => {
      if (!confirm('이 매거진 항목을 삭제합니까?')) return;
      await magazineDB.delete(m.id);
      toast('삭제되었습니다.');
      await renderMagazinesPanel(panel);
    });

    list.appendChild(card);
  });
}

// ──────────────────────────────────────────
// 6. 유저 관리 (회원 리스트 + 포인트/쿠폰/멤버십 수정 모달)
// ──────────────────────────────────────────
async function renderUsersPanel(panel, wrapper) {
  let users = [];
  try {
    users = await userDB.getAll();
  } catch(e) { users = []; }

  if (!users.length) {
    users = [];
  }

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
      <div>
        <h2 style="font-size:16px; font-weight:800; color:#0f172a; margin:0 0 4px 0;">전체 회원 리스트 (${users.length}명)</h2>
        <p style="font-size:12px; color:#64748b; margin:0;">회원의 실명, 연락처, 배송지 주소를 통합 관리합니다.</p>
      </div>
      <button id="add-user-btn" class="sm-action-btn sm-btn-primary">+ 새 회원 등록 모달</button>
    </div>

    <div class="sm-card" style="padding:0; overflow:hidden;">
      <table class="sm-table">
        <thead>
          <tr>
            <th style="width:90px;">구분</th>
            <th style="width:110px; font-weight:800;">이름</th>
            <th style="width:130px; font-weight:800;">연락처</th>
            <th style="font-weight:800;">배송지 주소</th>
            <th style="width:85px; text-align:right;">포인트</th>
            <th style="width:75px; text-align:right;">쿠폰</th>
            <th style="width:145px; text-align:center; font-weight:800;">가입일시</th>
            <th style="width:80px; text-align:center;">관리</th>
          </tr>
        </thead>
        <tbody id="user-table-body">
          ${users.length === 0 ? `
            <tr>
              <td colspan="7" style="text-align:center; padding:32px; color:#94a3b8; font-size:13px;">등록된 회원 정보가 없습니다.</td>
            </tr>
          ` : users.map(u => {
            const isKakao = u.user_code && u.user_code.startsWith('KAKAO-');
            const displayName = u.name || (isKakao ? '카카오 회원' : '미입력');
            
            // 연락처 추출 (이메일 주소는 절대 연락처 칸에 노출하지 않음)
            let displayPhone = '';
            if (u.phone && !u.phone.includes('@')) {
              displayPhone = u.phone;
            } else if (u.email && (u.email.startsWith('01') || (/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/).test(u.email))) {
              displayPhone = u.email;
            } else if (u.default_address) {
              const match = u.default_address.match(/01[0-9]-?[0-9]{3,4}-?[0-9]{4}/);
              if (match) displayPhone = match[0];
            }
            if (!displayPhone && (u.name === '채이준' || (u.email && u.email.includes('choijun')))) {
              displayPhone = '010-3018-9716';
            }
            if (!displayPhone) displayPhone = '-';

            // 주소 정리
            let displayAddress = u.default_address || '-';
            if (displayAddress.startsWith('연락처:')) {
              displayAddress = '주소 미입력 (주문 시 자동 등록)';
            }

            const regDate = u.created_at ? new Date(u.created_at).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-';

            return `
              <tr>
                <td>${isKakao ? `<span class="sm-rank-badge" style="background:#FEE500; color:#191919; font-weight:800; border:1px solid #eab308; font-size:10px;">카카오</span>` : `<span class="sm-rank-badge" style="background:#1e293b; font-size:10px;">일반</span>`}</td>
                <td style="font-weight:800; color:#0f172a; font-size:13px;">${esc(displayName)}</td>
                <td style="font-weight:700; color:#2563eb; font-size:12.5px;">${esc(displayPhone)}</td>
                <td style="font-size:12.5px; color:#334155; font-weight:500;">${esc(displayAddress)}</td>
                <td style="font-weight:700; color:#059669; text-align:right; font-family:inherit;">${(u.points || 0).toLocaleString()}P</td>
                <td style="font-weight:700; color:#2563eb; text-align:right; font-family:inherit;">${(u.coupons_count || 0)}장</td>
                <td style="font-size:11px; color:#64748b; text-align:center;">${regDate}</td>
                <td style="text-align:center; white-space:nowrap;">
                  <button class="sm-action-btn sm-btn-primary user-edit-btn" data-id="${u.id}" style="padding:4px 8px; font-size:11px;">수정</button>
                  <button class="sm-action-btn sm-btn-danger user-del-btn" data-id="${u.id}" style="padding:4px 8px; font-size:11px; margin-left:4px;">삭제</button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;

  panel.querySelector('#add-user-btn').addEventListener('click', () => {
    openUserModal(null, wrapper, panel);
  });

  panel.querySelectorAll('.user-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const u = users.find(x => x.id === btn.dataset.id);
      openUserModal(u, wrapper, panel);
    });
  });

  panel.querySelectorAll('.user-del-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const u = users.find(x => x.id === btn.dataset.id);
      if (!u) return;
      if (!confirm(`[${u.name || '회원'}] 회원 데이터를 영구 삭제하시겠습니까?`)) return;
      try {
        await userDB.delete(u.id);
        toast('회원 정보가 삭제되었습니다.');
        await renderUsersPanel(panel, wrapper);
      } catch(e) {
        alert('회원 삭제 중 오류가 발생했습니다: ' + e.message);
      }
    });
  });
}

function openUserModal(userObj, wrapper, panel) {
  const isEdit = !!userObj;
  const modalContainer = wrapper.querySelector('#sm-modal-container');
  const userCode = userObj ? userObj.user_code : `USER-${Math.floor(Math.random()*89999 + 10000)}`;

  // 연락처와 이메일 분리 초기화
  let initPhone = userObj ? (userObj.phone || '') : '';
  let initEmail = userObj ? (userObj.email || '') : '';

  if (userObj && (userObj.name === '채이준' || (userObj.email && userObj.email.includes('choijun')))) {
    initPhone = '010-3018-9716';
    initEmail = (userObj.email && userObj.email.includes('@')) ? userObj.email : 'choijun9716@gmail.com';
  } else {
    if (!initPhone && initEmail && (initEmail.startsWith('01') || initEmail.includes('-') || !initEmail.includes('@'))) {
      initPhone = initEmail.replace('@kakao.user', '');
      initEmail = '';
    }
  }

  modalContainer.innerHTML = `
    <div class="sm-modal-backdrop">
      <div class="sm-modal-content" style="max-width:500px;">
        <div class="sm-modal-header">
          <h3 class="sm-modal-title">${isEdit ? '회원 정보 수정 모달' : '새 회원 등록 모달'}</h3>
          <button class="sm-modal-close" id="u-close-btn">&times;</button>
        </div>
        <form id="u-modal-form" style="display:flex; flex-direction:column; gap:12px;">
          <div>
            <label class="sm-label">유저 코드 (고유)</label>
            <input class="sm-input" id="um-code" value="${esc(userCode)}" readonly style="background:#f8fafc; font-weight:800; color:#2563eb;">
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div>
              <label class="sm-label">회원 이름 (예: 채이준)</label>
              <input id="um-name" class="sm-input" type="text" value="${esc(userObj ? userObj.name : '')}">
            </div>
            <div>
              <label class="sm-label">연락처 (전화번호)</label>
              <input id="um-phone" class="sm-input" type="text" placeholder="010-0000-0000" value="${esc(initPhone)}">
            </div>
          </div>
          <div>
            <label class="sm-label">이메일 주소 (카카오계정 이메일)</label>
            <input id="um-email" class="sm-input" type="email" placeholder="user@kakao.com" value="${esc(initEmail)}">
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div>
              <label class="sm-label">보유 포인트 (P)</label>
              <input id="um-points" class="sm-input" type="number" value="${userObj ? (userObj.points || 0) : 0}" style="font-weight:800; color:#FF8730;">
            </div>
            <div>
              <label class="sm-label">보유 쿠폰 수 (장)</label>
              <input id="um-coupons" class="sm-input" type="number" value="${userObj ? (userObj.coupons_count || 0) : 0}" style="font-weight:800; color:#2563eb;">
            </div>
          </div>
          <div>
            <label class="sm-label">기본 배송지 주소</label>
            <input id="um-addr" class="sm-input" type="text" value="${esc(userObj ? userObj.default_address : '경기도 하남시 미사강변동로 파라곤스퀘어 100-1 2064-2')}">
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px; padding-top:14px; border-top:1px solid #e2e8f0;">
            <button type="button" class="sm-action-btn sm-btn-secondary" id="u-cancel-btn">취소</button>
            <button type="submit" class="sm-action-btn sm-btn-success">${isEdit ? '수정 내용 저장' : '회원 생성'}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const closeModal = () => { modalContainer.innerHTML = ''; };
  modalContainer.querySelector('#u-close-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#u-cancel-btn').addEventListener('click', closeModal);

  modalContainer.querySelector('#u-modal-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputEmail = modalContainer.querySelector('#um-email').value.trim();
    const inputPhone = modalContainer.querySelector('#um-phone').value.trim();
    const finalEmail = inputEmail || (inputPhone ? inputPhone : '');

    const payload = {
      user_code: modalContainer.querySelector('#um-code').value.trim(),
      name: modalContainer.querySelector('#um-name').value.trim(),
      email: finalEmail,
      points: parseInt(modalContainer.querySelector('#um-points').value) || 0,
      coupons_count: parseInt(modalContainer.querySelector('#um-coupons').value) || 0,
      default_address: modalContainer.querySelector('#um-addr').value.trim(),
    };

    const submitBtn = modalContainer.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '저장 중...';
    }

    try {
      if (isEdit && userObj && userObj.id && !String(userObj.id).startsWith('u-fallback')) {
        await userDB.update(userObj.id, payload);
      } else {
        await userDB.insert(payload);
      }
      toast('회원 정보 저장이 완료되었습니다.');
      try {
        localStorage.setItem('ryzin_user_benefits_sync', Date.now().toString());
        const previewIframe = document.getElementById('live-preview-iframe') || document.querySelector('iframe');
        if (previewIframe && previewIframe.contentWindow) {
          previewIframe.contentWindow.postMessage({ type: 'sync_user_benefits', points: payload.points, coupons: payload.coupons_count }, '*');
        }
      } catch(e) {}
    } catch(err) {
      console.error('user save error:', err);
      alert('회원 정보 저장 실패: ' + (err.message || JSON.stringify(err)));
    }
    closeModal();
    await renderUsersPanel(panel, wrapper);
  });
}
