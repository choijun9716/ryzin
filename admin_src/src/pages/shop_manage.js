// ===== 쇼핑몰 관리 페이지 =====

// ─── LocalStorage 키 ───
const LS_BANNERS = 'ryzin_shop_banners';
const LS_MENUS   = 'ryzin_shop_menus';
const LS_LIVES   = 'ryzin_shop_lives';

// ─── 기본 데이터 (shop/index.html 현재 내용과 동일) ───
const DEFAULT_BANNERS = [
  {
    id: 'b1',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
    label: '오늘',
    time: '오후 8시',
    title: '오키나와 힐튼 특집',
    desc: '소인 반값 요금 + 주요 관광지 입장권',
  },
  {
    id: 'b2',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85',
    label: '내일',
    time: '오전 11시',
    title: '설화수 윤조 단독 특가',
    desc: '자음수 리미티드 에디션 80% 혜택',
  },
  {
    id: 'b3',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85',
    label: '07.24 (금)',
    time: '오후 3시',
    title: '에이피뷰티 엠디 세럼 론칭',
    desc: '단 1시간 신제품 단독 할인가',
  },
];

const DEFAULT_MENUS = [
  { id: 'm1', name: '셀러 특가' },
  { id: 'm2', name: '기획전' },
  { id: 'm3', name: '쿠폰 혜택' },
];

const DEFAULT_LIVES = [
  {
    id: 'l1',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=85',
    title: '설화수 X 라이진 — 자음수 리미티드 에디션 단독 특가',
    viewers: '3.2천명 시청 중',
    link: '/live?id=live01',
  },
  {
    id: 'l2',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=85',
    title: '에이피뷰티 에어리 선 세럼 50ml 신제품 론칭',
    viewers: '1.8천명 시청 중',
    link: '/live?id=live02',
  },
];

// ─── 로드 / 저장 헬퍼 ───
function load(key, def) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : JSON.parse(JSON.stringify(def));
  } catch {
    return JSON.parse(JSON.stringify(def));
  }
}
function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── 페이지 렌더링 ───
export function renderShopManage() {
  const banners = load(LS_BANNERS, DEFAULT_BANNERS);
  const menus   = load(LS_MENUS,   DEFAULT_MENUS);
  const lives   = load(LS_LIVES,   DEFAULT_LIVES);

  const el = document.createElement('div');
  el.style.cssText = 'padding: 24px; max-width: 900px;';
  el.innerHTML = `
    <div style="margin-bottom: 28px;">
      <h1 style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">쇼핑몰 관리</h1>
      <p style="color: var(--text-secondary); font-size: 14px;">홈 화면 배너·메뉴·라이브 섹션을 편집합니다. 저장하면 쇼핑몰에 즉시 반영됩니다.</p>
    </div>

    <!-- ── 탭 네비게이션 ── -->
    <div id="shop-tabs" style="display: flex; gap: 8px; margin-bottom: 28px; border-bottom: 2px solid var(--border-color); padding-bottom: 0;">
      <button class="shop-tab-btn active" data-tab="banners" style="padding: 10px 20px; border: none; background: none; font-size: 14px; font-weight: 700; color: var(--primary); cursor: pointer; border-bottom: 2px solid var(--primary); margin-bottom: -2px; transition: all 0.15s;">
        상단 배너
      </button>
      <button class="shop-tab-btn" data-tab="menus" style="padding: 10px 20px; border: none; background: none; font-size: 14px; font-weight: 600; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.15s;">
        퀵메뉴
      </button>
      <button class="shop-tab-btn" data-tab="lives" style="padding: 10px 20px; border: none; background: none; font-size: 14px; font-weight: 600; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.15s;">
        라이브 섹션
      </button>
    </div>

    <!-- ── 탭 패널: 배너 ── -->
    <div id="panel-banners" class="shop-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">홈 상단 배너 슬라이드</h2>
        <button id="add-banner-btn" class="btn btn-primary btn-sm">+ 배너 추가</button>
      </div>
      <div id="banner-list"></div>
    </div>

    <!-- ── 탭 패널: 퀵메뉴 ── -->
    <div id="panel-menus" class="shop-panel" style="display:none;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">배너 하단 퀵메뉴</h2>
        <button id="add-menu-btn" class="btn btn-primary btn-sm">+ 메뉴 추가</button>
      </div>
      <div id="menu-list"></div>
    </div>

    <!-- ── 탭 패널: 라이브 ── -->
    <div id="panel-lives" class="shop-panel" style="display:none;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">LIVE NOW 섹션</h2>
        <button id="add-live-btn" class="btn btn-primary btn-sm">+ 라이브 추가</button>
      </div>
      <div id="live-list"></div>
    </div>
  `;

  // ── 탭 전환 ──
  el.querySelectorAll('.shop-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.shop-tab-btn').forEach(b => {
        b.style.color = 'var(--text-secondary)';
        b.style.fontWeight = '600';
        b.style.borderBottom = '2px solid transparent';
        b.classList.remove('active');
      });
      el.querySelectorAll('.shop-panel').forEach(p => p.style.display = 'none');

      btn.style.color = 'var(--primary)';
      btn.style.fontWeight = '700';
      btn.style.borderBottom = '2px solid var(--primary)';
      btn.classList.add('active');
      el.querySelector(`#panel-${btn.dataset.tab}`).style.display = 'block';
    });
  });

  // ── 배너 렌더 ──
  function renderBanners() {
    const list = el.querySelector('#banner-list');
    const bans = load(LS_BANNERS, DEFAULT_BANNERS);
    list.innerHTML = '';
    bans.forEach((b, i) => {
      const card = document.createElement('div');
      card.style.cssText = 'background: var(--bg-secondary); border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid var(--border-color);';
      card.innerHTML = `
        <div style="display: flex; gap: 16px; align-items: flex-start;">
          <img src="${b.img}" alt="" style="width: 120px; height: 80px; object-fit: cover; border-radius: 8px; flex-shrink:0; background:#333;">
          <div style="flex:1; display:flex; flex-direction:column; gap:10px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">제목</label>
                <input class="b-title" value="${escHtml(b.title)}" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary); font-size:13px;">
              </div>
              <div>
                <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">부제목</label>
                <input class="b-desc" value="${escHtml(b.desc)}" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary); font-size:13px;">
              </div>
              <div>
                <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">날짜 라벨 (예: 오늘)</label>
                <input class="b-label" value="${escHtml(b.label)}" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary); font-size:13px;">
              </div>
              <div>
                <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">시간 (예: 오후 8시)</label>
                <input class="b-time" value="${escHtml(b.time)}" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary); font-size:13px;">
              </div>
            </div>
            <div>
              <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">이미지 URL</label>
              <div style="display:flex; gap:8px;">
                <input class="b-img" value="${escHtml(b.img)}" style="flex:1; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary); font-size:12px;">
                <button class="b-preview-btn" style="padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-secondary); font-size:12px; cursor:pointer; white-space:nowrap;">미리보기</button>
              </div>
            </div>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; border-top:1px solid var(--border-color); padding-top:14px;">
          <div style="display:flex; gap:8px;">
            ${i > 0 ? `<button class="b-up-btn" style="padding:6px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-secondary); font-size:12px; cursor:pointer;">▲ 위로</button>` : ''}
            ${i < bans.length - 1 ? `<button class="b-dn-btn" style="padding:6px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-secondary); font-size:12px; cursor:pointer;">▼ 아래로</button>` : ''}
          </div>
          <div style="display:flex; gap:8px;">
            <button class="b-save-btn btn btn-primary btn-sm">저장</button>
            <button class="b-del-btn btn btn-danger btn-sm">삭제</button>
          </div>
        </div>
      `;

      card.querySelector('.b-preview-btn').addEventListener('click', () => {
        const url = card.querySelector('.b-img').value.trim();
        card.querySelector('img').src = url;
      });
      card.querySelector('.b-save-btn').addEventListener('click', () => {
        const bans2 = load(LS_BANNERS, DEFAULT_BANNERS);
        bans2[i] = {
          ...bans2[i],
          title:  card.querySelector('.b-title').value.trim(),
          desc:   card.querySelector('.b-desc').value.trim(),
          label:  card.querySelector('.b-label').value.trim(),
          time:   card.querySelector('.b-time').value.trim(),
          img:    card.querySelector('.b-img').value.trim(),
        };
        save(LS_BANNERS, bans2);
        showToast('배너가 저장되었습니다.');
        renderBanners();
      });
      card.querySelector('.b-del-btn').addEventListener('click', () => {
        if (!confirm('이 배너를 삭제하시겠습니까?')) return;
        const bans2 = load(LS_BANNERS, DEFAULT_BANNERS);
        bans2.splice(i, 1);
        save(LS_BANNERS, bans2);
        renderBanners();
      });
      if (i > 0) card.querySelector('.b-up-btn')?.addEventListener('click', () => {
        const bans2 = load(LS_BANNERS, DEFAULT_BANNERS);
        [bans2[i-1], bans2[i]] = [bans2[i], bans2[i-1]];
        save(LS_BANNERS, bans2);
        renderBanners();
      });
      if (i < bans.length - 1) card.querySelector('.b-dn-btn')?.addEventListener('click', () => {
        const bans2 = load(LS_BANNERS, DEFAULT_BANNERS);
        [bans2[i], bans2[i+1]] = [bans2[i+1], bans2[i]];
        save(LS_BANNERS, bans2);
        renderBanners();
      });

      list.appendChild(card);
    });
  }

  el.querySelector('#add-banner-btn').addEventListener('click', () => {
    const bans = load(LS_BANNERS, DEFAULT_BANNERS);
    bans.push({ id: 'b' + Date.now(), img: '', label: '', time: '', title: '새 배너', desc: '' });
    save(LS_BANNERS, bans);
    renderBanners();
  });

  // ── 퀵메뉴 렌더 ──
  function renderMenus() {
    const list = el.querySelector('#menu-list');
    const menus2 = load(LS_MENUS, DEFAULT_MENUS);
    list.innerHTML = '';
    menus2.forEach((m, i) => {
      const card = document.createElement('div');
      card.style.cssText = 'background: var(--bg-secondary); border-radius: 12px; padding: 16px 20px; margin-bottom: 12px; border: 1px solid var(--border-color); display: flex; align-items: center; gap: 12px;';
      card.innerHTML = `
        <span style="font-size:13px; font-weight:600; color:var(--text-secondary); min-width:28px;">#${i+1}</span>
        <input class="m-name" value="${escHtml(m.name)}" style="flex:1; padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary); font-size:14px; font-weight:600;">
        <button class="m-save-btn btn btn-primary btn-sm">저장</button>
        ${i > 0 ? `<button class="m-up-btn" style="padding:6px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-secondary); font-size:12px; cursor:pointer;">▲</button>` : ''}
        ${i < menus2.length - 1 ? `<button class="m-dn-btn" style="padding:6px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-secondary); font-size:12px; cursor:pointer;">▼</button>` : ''}
        <button class="m-del-btn btn btn-danger btn-sm">삭제</button>
      `;
      card.querySelector('.m-save-btn').addEventListener('click', () => {
        const menus3 = load(LS_MENUS, DEFAULT_MENUS);
        menus3[i].name = card.querySelector('.m-name').value.trim();
        save(LS_MENUS, menus3);
        showToast('메뉴가 저장되었습니다.');
      });
      card.querySelector('.m-del-btn').addEventListener('click', () => {
        const menus3 = load(LS_MENUS, DEFAULT_MENUS);
        menus3.splice(i, 1);
        save(LS_MENUS, menus3);
        renderMenus();
      });
      if (i > 0) card.querySelector('.m-up-btn')?.addEventListener('click', () => {
        const menus3 = load(LS_MENUS, DEFAULT_MENUS);
        [menus3[i-1], menus3[i]] = [menus3[i], menus3[i-1]];
        save(LS_MENUS, menus3);
        renderMenus();
      });
      if (i < menus2.length - 1) card.querySelector('.m-dn-btn')?.addEventListener('click', () => {
        const menus3 = load(LS_MENUS, DEFAULT_MENUS);
        [menus3[i], menus3[i+1]] = [menus3[i+1], menus3[i]];
        save(LS_MENUS, menus3);
        renderMenus();
      });
      list.appendChild(card);
    });
  }

  el.querySelector('#add-menu-btn').addEventListener('click', () => {
    const menus2 = load(LS_MENUS, DEFAULT_MENUS);
    menus2.push({ id: 'm' + Date.now(), name: '새 메뉴' });
    save(LS_MENUS, menus2);
    renderMenus();
  });

  // ── 라이브 섹션 렌더 ──
  function renderLives() {
    const list = el.querySelector('#live-list');
    const lives2 = load(LS_LIVES, DEFAULT_LIVES);
    list.innerHTML = '';
    lives2.forEach((lv, i) => {
      const card = document.createElement('div');
      card.style.cssText = 'background: var(--bg-secondary); border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid var(--border-color);';
      card.innerHTML = `
        <div style="display: flex; gap: 16px; align-items: flex-start;">
          <img src="${lv.img}" alt="" style="width: 100px; height: 70px; object-fit: cover; border-radius: 8px; flex-shrink:0; background:#333;">
          <div style="flex:1; display:flex; flex-direction:column; gap:10px;">
            <div>
              <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">라이브 제목</label>
              <input class="lv-title" value="${escHtml(lv.title)}" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary); font-size:13px;">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">시청자 수 텍스트</label>
                <input class="lv-viewers" value="${escHtml(lv.viewers)}" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary); font-size:13px;">
              </div>
              <div>
                <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">링크 URL</label>
                <input class="lv-link" value="${escHtml(lv.link)}" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary); font-size:12px;">
              </div>
            </div>
            <div>
              <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">썸네일 이미지 URL</label>
              <div style="display:flex; gap:8px;">
                <input class="lv-img" value="${escHtml(lv.img)}" style="flex:1; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary); font-size:12px;">
                <button class="lv-preview-btn" style="padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-secondary); font-size:12px; cursor:pointer; white-space:nowrap;">미리보기</button>
              </div>
            </div>
          </div>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:14px; border-top:1px solid var(--border-color); padding-top:14px;">
          <button class="lv-save-btn btn btn-primary btn-sm">저장</button>
          <button class="lv-del-btn btn btn-danger btn-sm">삭제</button>
        </div>
      `;
      card.querySelector('.lv-preview-btn').addEventListener('click', () => {
        card.querySelector('img').src = card.querySelector('.lv-img').value.trim();
      });
      card.querySelector('.lv-save-btn').addEventListener('click', () => {
        const lives3 = load(LS_LIVES, DEFAULT_LIVES);
        lives3[i] = {
          ...lives3[i],
          title:   card.querySelector('.lv-title').value.trim(),
          viewers: card.querySelector('.lv-viewers').value.trim(),
          link:    card.querySelector('.lv-link').value.trim(),
          img:     card.querySelector('.lv-img').value.trim(),
        };
        save(LS_LIVES, lives3);
        showToast('라이브 정보가 저장되었습니다.');
        renderLives();
      });
      card.querySelector('.lv-del-btn').addEventListener('click', () => {
        if (!confirm('이 라이브 항목을 삭제하시겠습니까?')) return;
        const lives3 = load(LS_LIVES, DEFAULT_LIVES);
        lives3.splice(i, 1);
        save(LS_LIVES, lives3);
        renderLives();
      });
      list.appendChild(card);
    });
  }

  el.querySelector('#add-live-btn').addEventListener('click', () => {
    const lives2 = load(LS_LIVES, DEFAULT_LIVES);
    lives2.push({ id: 'l' + Date.now(), img: '', title: '새 라이브', viewers: '', link: '' });
    save(LS_LIVES, lives2);
    renderLives();
  });

  renderBanners();
  renderMenus();
  renderLives();

  return el;
}

// ─── 유틸 ───
function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: #1e293b; color: #fff; padding: 12px 24px; border-radius: 40px;
    font-size: 13px; font-weight: 600; z-index: 9999;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    animation: fadeInUp 0.25s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}
