// ===== 쇼핑몰 관리 페이지 (Supabase 연동) =====
import { bannerDB, sectionDB, menuDB, productDB, liveDB } from '../utils/shopDB.js';

// ── 유틸 ──
function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function toast(msg, isErr = false) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
    background:${isErr ? '#ef4444' : '#1e293b'};color:#fff;padding:12px 24px;
    border-radius:40px;font-size:13px;font-weight:600;z-index:9999;
    box-shadow:0 8px 24px rgba(0,0,0,0.3);`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}
function cardBox(inner) {
  return `<div style="background:var(--bg-secondary);border-radius:12px;padding:20px;margin-bottom:14px;border:1px solid var(--border-color);">${inner}</div>`;
}
function inputRow(label, cls, val, type = 'text', full = false) {
  return `<div${full ? ' style="grid-column:span 2;"' : ''}>
    <label style="font-size:11px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">${esc(label)}</label>
    <input class="${cls}" type="${type}" value="${esc(val)}" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-primary);font-size:13px;">
  </div>`;
}
function imgRow(label, cls, val) {
  return `<div style="grid-column:span 2;">
    <label style="font-size:11px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">${esc(label)}</label>
    <div style="display:flex;gap:8px;">
      <input class="${cls}" value="${esc(val)}" style="flex:1;padding:8px 10px;border-radius:8px;border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-primary);font-size:12px;">
      <button class="${cls}-preview" style="padding:8px 12px;border-radius:8px;border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-secondary);font-size:12px;cursor:pointer;white-space:nowrap;">미리보기</button>
    </div>
  </div>`;
}

// ── 탭 상태 ──
let _tab = 'banners';
let _sections = []; // 섹션 캐시 (퀵메뉴·상품 탭에서 공유)

// ─────────────────────────────────────
export function renderShopManage() {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding:24px;max-width:960px;';

  wrap.innerHTML = `
    <div style="margin-bottom:24px;">
      <h1 style="font-size:22px;font-weight:800;color:var(--text-primary);margin-bottom:4px;">쇼핑몰 관리</h1>
      <p style="color:var(--text-secondary);font-size:14px;">홈 화면 전체 콘텐츠를 실시간으로 편집합니다.</p>
    </div>

    <div id="sm-tabs" style="display:flex;gap:4px;margin-bottom:28px;border-bottom:2px solid var(--border-color);">
      ${['banners','lives','sections','menus'].map(k => {
        const labels = {banners:'상단 배너',lives:'라이브',sections:'상품 섹션',menus:'퀵메뉴'};
        return `<button class="sm-tab${k===_tab?' active':''}" data-tab="${k}"
          style="padding:10px 18px;border:none;background:none;font-size:13px;font-weight:${k===_tab?'700':'600'};
          color:${k===_tab?'var(--primary)':'var(--text-secondary)'};cursor:pointer;
          border-bottom:2px solid ${k===_tab?'var(--primary)':'transparent'};margin-bottom:-2px;transition:all .15s;">
          ${labels[k]}
        </button>`;
      }).join('')}
    </div>

    <div id="sm-loading" style="text-align:center;padding:40px;color:var(--text-secondary);font-size:14px;">
      ⏳ 데이터 불러오는 중...
    </div>
    <div id="sm-panel"></div>
  `;

  // 탭 이벤트
  wrap.querySelectorAll('.sm-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      _tab = btn.dataset.tab;
      wrap.querySelectorAll('.sm-tab').forEach(b => {
        const active = b.dataset.tab === _tab;
        b.style.color = active ? 'var(--primary)' : 'var(--text-secondary)';
        b.style.fontWeight = active ? '700' : '600';
        b.style.borderBottom = `2px solid ${active ? 'var(--primary)' : 'transparent'}`;
        b.classList.toggle('active', active);
      });
      loadPanel(wrap);
    });
  });

  // DOM 삽입 후 비동기 초기화 (라우터가 동기 HTMLElement 반환을 요구하므로)
  setTimeout(async () => {
    try {
      _sections = await sectionDB.getAll();
    } catch(e) {
      _sections = [];
    }
    await loadPanel(wrap);
  }, 0);

  return wrap; // 즉시 반환 → 라우터가 DOM에 붙임
}

async function loadPanel(wrap) {
  const loading = wrap.querySelector('#sm-loading');
  const panel = wrap.querySelector('#sm-panel');
  loading.style.display = 'block';
  panel.innerHTML = '';

  try {
    if (_tab === 'banners') await renderBannersPanel(panel);
    else if (_tab === 'lives') await renderLivesPanel(panel);
    else if (_tab === 'sections') await renderSectionsPanel(panel, wrap);
    else if (_tab === 'menus') await renderMenusPanel(panel);
  } catch(e) {
    panel.innerHTML = `<div style="color:var(--status-error);padding:20px;">오류: ${e.message}<br>Supabase SQL 스크립트를 먼저 실행해 주세요.</div>`;
  }
  loading.style.display = 'none';
}

// ─────────────────────────────────────
// ① 배너 탭
async function renderBannersPanel(panel) {
  const banners = await bannerDB.getAll();
  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h2 style="font-size:16px;font-weight:700;color:var(--text-primary);">홈 상단 슬라이드 배너</h2>
      <button id="add-banner" class="btn btn-primary btn-sm">+ 추가</button>
    </div>
    <div id="banner-list"></div>
  `;
  panel.querySelector('#add-banner').addEventListener('click', async () => {
    await bannerDB.insert({ sort_order: 99, title:'새 배너', desc:'', label:'', time_text:'', img_url:'', link_url:'/shop/live_teaser.html' });
    toast('배너 추가됨');
    await renderBannersPanel(panel);
  });
  renderBannerCards(panel.querySelector('#banner-list'), banners, panel);
}

function renderBannerCards(list, banners, panel) {
  list.innerHTML = '';
  banners.forEach((b, i) => {
    const div = document.createElement('div');
    div.innerHTML = cardBox(`
      <div style="display:flex;gap:14px;align-items:flex-start;">
        <img class="b-thumb" src="${esc(b.img_url)}" alt="" style="width:110px;height:74px;object-fit:cover;border-radius:8px;background:#333;flex-shrink:0;">
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          ${inputRow('제목','b-title',b.title)}
          ${inputRow('부제목','b-desc',b.desc)}
          ${inputRow('날짜 라벨','b-label',b.label)}
          ${inputRow('시간','b-time',b.time_text)}
          ${imgRow('이미지 URL','b-img',b.img_url)}
          ${inputRow('링크 URL','b-link',b.link_url,'text',true)}
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:14px;padding-top:14px;border-top:1px solid var(--border-color);">
        <div style="display:flex;gap:8px;">
          <span style="font-size:12px;color:var(--text-secondary);align-self:center;">#${i+1}</span>
          <button class="b-up btn btn-secondary btn-sm" ${i===0?'disabled':''}>▲</button>
          <button class="b-dn btn btn-secondary btn-sm" ${i===banners.length-1?'disabled':''}>▼</button>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="b-save btn btn-primary btn-sm">저장</button>
          <button class="b-del btn btn-danger btn-sm">삭제</button>
        </div>
      </div>
    `);
    const card = div.firstElementChild;

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
      toast('배너 저장됨');
    });
    card.querySelector('.b-del').addEventListener('click', async () => {
      if (!confirm('삭제하시겠습니까?')) return;
      await bannerDB.delete(b.id);
      toast('배너 삭제됨');
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
// ② 라이브 탭
async function renderLivesPanel(panel) {
  const lives = await liveDB.getAll();
  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h2 style="font-size:16px;font-weight:700;color:var(--text-primary);">LIVE NOW 섹션</h2>
      <button id="add-live" class="btn btn-primary btn-sm">+ 추가</button>
    </div>
    <div id="live-list"></div>
  `;
  panel.querySelector('#add-live').addEventListener('click', async () => {
    await liveDB.insert({ sort_order:99, title:'새 라이브', viewers:'', img_url:'', link_url:'' });
    toast('라이브 추가됨');
    await renderLivesPanel(panel);
  });
  const list = panel.querySelector('#live-list');
  lives.forEach((lv, i) => {
    const div = document.createElement('div');
    div.innerHTML = cardBox(`
      <div style="display:flex;gap:14px;align-items:flex-start;">
        <img class="lv-thumb" src="${esc(lv.img_url)}" alt="" style="width:100px;height:68px;object-fit:cover;border-radius:8px;background:#333;flex-shrink:0;">
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          ${inputRow('라이브 제목','lv-title',lv.title,'text',true)}
          ${inputRow('시청자 수 텍스트','lv-viewers',lv.viewers)}
          ${inputRow('링크 URL','lv-link',lv.link_url)}
          ${imgRow('썸네일 이미지 URL','lv-img',lv.img_url)}
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px;padding-top:14px;border-top:1px solid var(--border-color);">
        <button class="lv-save btn btn-primary btn-sm">저장</button>
        <button class="lv-del btn btn-danger btn-sm">삭제</button>
      </div>
    `);
    const card = div.firstElementChild;
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
      toast('라이브 저장됨');
    });
    card.querySelector('.lv-del').addEventListener('click', async () => {
      if (!confirm('삭제하시겠습니까?')) return;
      await liveDB.delete(lv.id);
      toast('삭제됨');
      await renderLivesPanel(panel);
    });
    list.appendChild(card);
  });
}

// ─────────────────────────────────────
// ③ 상품 섹션 탭
async function renderSectionsPanel(panel, wrap) {
  _sections = await sectionDB.getAll();
  const products = await productDB.getAll();
  const prodBySec = {};
  products.forEach(p => {
    if (!prodBySec[p.section_id]) prodBySec[p.section_id] = [];
    prodBySec[p.section_id].push(p);
  });

  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h2 style="font-size:16px;font-weight:700;color:var(--text-primary);">상품 섹션</h2>
      <button id="add-section" class="btn btn-primary btn-sm">+ 섹션 추가</button>
    </div>
    <div id="section-list"></div>
  `;
  panel.querySelector('#add-section').addEventListener('click', async () => {
    await sectionDB.insert({ sort_order:99, title:'새 섹션', subtitle:'', show_timer:false });
    _sections = await sectionDB.getAll();
    toast('섹션 추가됨');
    await renderSectionsPanel(panel, wrap);
  });

  const secList = panel.querySelector('#section-list');
  _sections.forEach((sec, si) => {
    const prods = prodBySec[sec.id] || [];
    const secDiv = document.createElement('div');
    secDiv.style.cssText = 'margin-bottom:24px;';
    secDiv.innerHTML = `
      <div style="background:var(--bg-secondary);border-radius:12px;border:1px solid var(--border-color);overflow:hidden;">
        <!-- 섹션 헤더 -->
        <div style="padding:16px 20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--border-color);background:rgba(0,0,0,0.15);">
          <span style="font-size:12px;color:var(--text-secondary);min-width:20px;">#${si+1}</span>
          <input class="sec-title" value="${esc(sec.title)}" placeholder="섹션 제목"
            style="flex:1;padding:7px 10px;border-radius:8px;border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-primary);font-size:14px;font-weight:700;">
          <input class="sec-sub" value="${esc(sec.subtitle)}" placeholder="부제목"
            style="flex:1;padding:7px 10px;border-radius:8px;border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-primary);font-size:13px;">
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-secondary);cursor:pointer;white-space:nowrap;">
            <input type="checkbox" class="sec-timer" ${sec.show_timer ? 'checked' : ''}>타이머
          </label>
          <button class="sec-save btn btn-primary btn-sm">저장</button>
          <button class="sec-del btn btn-danger btn-sm">섹션삭제</button>
        </div>
        <!-- 상품 목록 -->
        <div style="padding:16px 20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <span style="font-size:13px;font-weight:600;color:var(--text-secondary);">상품 ${prods.length}개</span>
            <button class="add-prod btn btn-secondary btn-sm">+ 상품 추가</button>
          </div>
          <div class="prod-list"></div>
        </div>
      </div>
    `;
    const card = secDiv.firstElementChild;
    card.querySelector('.sec-save').addEventListener('click', async () => {
      await sectionDB.update(sec.id, {
        title: card.querySelector('.sec-title').value.trim(),
        subtitle: card.querySelector('.sec-sub').value.trim(),
        show_timer: card.querySelector('.sec-timer').checked,
      });
      _sections = await sectionDB.getAll();
      toast('섹션 저장됨');
    });
    card.querySelector('.sec-del').addEventListener('click', async () => {
      if (!confirm(`"${sec.title}" 섹션과 모든 상품을 삭제합니까?`)) return;
      await sectionDB.delete(sec.id);
      _sections = await sectionDB.getAll();
      toast('섹션 삭제됨');
      await renderSectionsPanel(panel, wrap);
    });
    card.querySelector('.add-prod').addEventListener('click', async () => {
      await productDB.insert({
        section_id: sec.id, sort_order:99,
        brand_title:'새 상품', sale_price:'', origin_price:'', discount:'',
        unit_price:'', rating:'', reviews:'', img_url:'', chips:'[]',
      });
      toast('상품 추가됨');
      await renderSectionsPanel(panel, wrap);
    });
    renderProductCards(card.querySelector('.prod-list'), prods, panel, wrap);
    secList.appendChild(secDiv);
  });
}

function renderProductCards(list, prods, panel, wrap) {
  list.innerHTML = '';
  if (prods.length === 0) {
    list.innerHTML = '<p style="color:var(--text-secondary);font-size:13px;text-align:center;padding:16px 0;">상품이 없습니다. 추가해주세요.</p>';
    return;
  }
  prods.forEach((p, pi) => {
    const div = document.createElement('div');
    div.innerHTML = `<div style="display:flex;gap:12px;align-items:flex-start;background:var(--bg-primary);border-radius:10px;padding:14px;margin-bottom:10px;border:1px solid var(--border-color);">
      <img class="p-thumb" src="${esc(p.img_url)}" alt="" style="width:80px;height:60px;object-fit:cover;border-radius:6px;background:#333;flex-shrink:0;">
      <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        ${inputRow('상품명','p-name',p.brand_title,'text',true)}
        ${inputRow('할인가','p-sale',p.sale_price)}
        ${inputRow('정가','p-origin',p.origin_price)}
        ${inputRow('할인율 뱃지 (예: 80% 특가)','p-disc',p.discount)}
        ${inputRow('단가 텍스트','p-unit',p.unit_price)}
        ${inputRow('평점','p-rating',p.rating)}
        ${inputRow('리뷰 수','p-reviews',p.reviews)}
        ${imgRow('이미지 URL','p-img',p.img_url)}
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        <button class="p-save btn btn-primary btn-sm">저장</button>
        <button class="p-del btn btn-danger btn-sm">삭제</button>
      </div>
    </div>`;
    const card = div.firstElementChild;
    card.querySelector('.p-img-preview').addEventListener('click', () => {
      card.querySelector('.p-thumb').src = card.querySelector('.p-img').value.trim();
    });
    card.querySelector('.p-save').addEventListener('click', async () => {
      await productDB.update(p.id, {
        brand_title:  card.querySelector('.p-name').value.trim(),
        sale_price:   card.querySelector('.p-sale').value.trim(),
        origin_price: card.querySelector('.p-origin').value.trim(),
        discount:     card.querySelector('.p-disc').value.trim(),
        unit_price:   card.querySelector('.p-unit').value.trim(),
        rating:       card.querySelector('.p-rating').value.trim(),
        reviews:      card.querySelector('.p-reviews').value.trim(),
        img_url:      card.querySelector('.p-img').value.trim(),
      });
      toast('상품 저장됨');
    });
    card.querySelector('.p-del').addEventListener('click', async () => {
      if (!confirm('삭제?')) return;
      await productDB.delete(p.id);
      toast('삭제됨');
      await renderSectionsPanel(panel, wrap);
    });
    list.appendChild(card);
  });
}

// ─────────────────────────────────────
// ④ 퀵메뉴 탭
async function renderMenusPanel(panel) {
  const [menus, sections] = await Promise.all([menuDB.getAll(), sectionDB.getAll()]);
  _sections = sections;

  const secOptions = `<option value="">-- 없음 --</option>` +
    sections.map(s => `<option value="${s.id}">${esc(s.title)}</option>`).join('');

  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h2 style="font-size:16px;font-weight:700;color:var(--text-primary);">배너 하단 퀵메뉴</h2>
      <button id="add-menu" class="btn btn-primary btn-sm">+ 추가</button>
    </div>
    <p style="color:var(--text-secondary);font-size:12px;margin-bottom:16px;">각 메뉴를 클릭했을 때 스크롤될 상품 섹션을 연결할 수 있습니다.</p>
    <div id="menu-list"></div>
  `;
  panel.querySelector('#add-menu').addEventListener('click', async () => {
    await menuDB.insert({ sort_order:99, name:'새 메뉴', section_id: null });
    toast('메뉴 추가됨');
    await renderMenusPanel(panel);
  });
  const list = panel.querySelector('#menu-list');
  menus.forEach((m, i) => {
    const div = document.createElement('div');
    div.innerHTML = `<div style="background:var(--bg-secondary);border-radius:10px;padding:14px 16px;margin-bottom:10px;border:1px solid var(--border-color);display:flex;align-items:center;gap:10px;">
      <span style="font-size:12px;color:var(--text-secondary);min-width:22px;">#${i+1}</span>
      <input class="m-name" value="${esc(m.name)}" placeholder="메뉴명"
        style="flex:1;padding:8px 12px;border-radius:8px;border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-primary);font-size:14px;font-weight:600;">
      <select class="m-sec" style="padding:8px 10px;border-radius:8px;border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-primary);font-size:13px;min-width:160px;">
        ${secOptions.replace(`value="${m.section_id}"`, `value="${m.section_id}" selected`)}
      </select>
      <button class="m-save btn btn-primary btn-sm">저장</button>
      <button class="m-del btn btn-danger btn-sm">삭제</button>
    </div>`;
    const card = div.firstElementChild;
    // select 선택 표시
    const sel = card.querySelector('.m-sec');
    sel.value = m.section_id || '';
    card.querySelector('.m-save').addEventListener('click', async () => {
      await menuDB.update(m.id, {
        name: card.querySelector('.m-name').value.trim(),
        section_id: sel.value || null,
      });
      toast('메뉴 저장됨');
    });
    card.querySelector('.m-del').addEventListener('click', async () => {
      if (!confirm('삭제?')) return;
      await menuDB.delete(m.id);
      toast('삭제됨');
      await renderMenusPanel(panel);
    });
    list.appendChild(card);
  });
}
