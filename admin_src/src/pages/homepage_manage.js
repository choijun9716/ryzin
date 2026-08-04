// ===== 홈페이지 관리 페이지 (Supabase DB 실시간 동기화) =====
import { store } from '../data/store.js';
import { showSuccess, showError } from '../components/toast.js';
import { confirmDialog, openModal, closeModal } from '../components/modal.js';

const SUPABASE_URL = 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';
const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates'
};

export function renderHomepageManage() {
  const container = document.createElement('div');
  let activeTab = 'hero';

  const fetchHpSetting = async (key, fallback) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/homepage_settings?key=eq.${key}&select=*`, { headers }).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data && data[0] && data[0].value !== undefined) {
          let val = data[0].value;
          if (typeof val === 'string') {
            try { val = JSON.parse(val); } catch(e) {}
          }
          if (val) {
            try { localStorage.setItem(`ryzin_hp_${key}`, JSON.stringify(val)); } catch(e) {}
            return val;
          }
        }
      }
    } catch (e) {}

    try {
      const v = localStorage.getItem(`ryzin_hp_${key}`);
      if (v) return JSON.parse(v);
    } catch (e) {}
    return fallback;
  };

  const saveHpSetting = async (key, val) => {
    try {
      localStorage.setItem(`ryzin_hp_${key}`, JSON.stringify(val));
    } catch (e) {}

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/homepage_settings?on_conflict=key`, {
        method: 'POST',
        headers: {
          ...headers,
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({ key, value: val, updated_at: new Date().toISOString() })
      });
      if (!res.ok) {
        console.warn('Supabase save response error:', await res.text());
      }
    } catch (e) {
      console.error('Supabase save error:', e);
    }
  };

  // 데이터 상태
  let heroData = null;
  let portfolioData = null;
  let packagesData = null;
  let heroTextData = null;
  let storiesData = null;
  let logosData = null;

  const defaultHeroText = {
    eyebrow: "브랜드를 가장 생생하게 만나는 순간",
    prefix: "우리는",
    suffix: "만듭니다.",
    phrases: [
      "브랜드를 라이브",
      "브랜드의 매출을",
      "구매하는 순간을"
    ]
  };

  async function loadAllData() {
    // 0. 메인 히어로 헤더 텍스트 문구 로드
    heroTextData = await fetchHpSetting('hero_text', null);
    if (!heroTextData || !heroTextData.phrases) {
      heroTextData = defaultHeroText;
    }

    // 1. 메인 히어로 갤러리 로드
    let rawHero = await fetchHpSetting('hero', null);
    if (!rawHero) {
      try {
        const res = await fetch('/hero.json');
        if (res.ok) {
          rawHero = await res.json();
        }
      } catch (e) {}
    }

    if (rawHero && typeof rawHero === 'object' && !Array.isArray(rawHero)) {
      heroData = [];
      ['col1', 'col2', 'col3', 'col4'].forEach(col => {
        if (rawHero[col]) {
          rawHero[col].forEach(img => {
            if (img && !heroData.includes(img)) heroData.push(img);
          });
        }
      });
    } else if (Array.isArray(rawHero)) {
      heroData = rawHero;
    } else {
      heroData = [];
    }

    // 2. 포트폴리오 로드
    portfolioData = await fetchHpSetting('portfolio', null);
    if (!portfolioData) {
      try {
        const res = await fetch('/portfolio.json');
        if (res.ok) {
          portfolioData = await res.json();
          await saveHpSetting('portfolio', portfolioData);
        }
      } catch (e) {}
    }
    if (!portfolioData) {
      portfolioData = [
        { title: "만나강정", category: "food", image: "./assets/1783519975524_KakaoTalk_Photo_2026-07-08-23-07-21.png", link: "#" },
        { title: "트루쿡", category: "life", image: "./assets/1782397523767_123.png", link: "#" }
      ];
    }

    // 3. 제작 패키지 로드
    packagesData = await fetchHpSetting('packages', null);
    if (!packagesData) {
      try {
        const res = await fetch('/packages.json');
        if (res.ok) {
          packagesData = await res.json();
          await saveHpSetting('packages', packagesData);
        }
      } catch (e) {}
    }
    if (!packagesData) {
      packagesData = [
        { name: "STANDARD LIGHT", price: "990,000원", features: "1인 진행" }
      ];
    }

    // 4. 브랜드 스토리 로드
    storiesData = await fetchHpSetting('stories', null);
    if (!storiesData) {
      try {
        const res = await fetch('/stories.json');
        if (res.ok) {
          storiesData = await res.json();
          await saveHpSetting('stories', storiesData);
        }
      } catch (e) {}
    }
    if (!storiesData) {
      storiesData = [
        { brand: "강릉은정한과", quote: "매출액 300% 상승 달성!" }
      ];
    }

    // 5. 파트너 로고 로드
    logosData = await fetchHpSetting('logos', null);
    if (!logosData) {
      try {
        const res = await fetch('/logos.json');
        if (res.ok) {
          logosData = await res.json();
          await saveHpSetting('logos', logosData);
        }
      } catch (e) {}
    }
    if (!logosData) {
      logosData = [];
    }
  }

  async function render() {
    if (!heroData) await loadAllData();

    container.innerHTML = `
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">홈페이지 관리 (Supabase 동기화)</h1>
            <p class="page-description">공식 웹사이트 메인 비주얼, 포트폴리오, 제작 패키지, 후기 및 파트너 로고 실시간 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <button class="btn btn-secondary" id="btn-force-sync" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            기존 홈페이지 파일에서 동기화 가져오기
          </button>
        </div>
      </div>

      <div class="page-body">
        <!-- 상단 서브 탭 5개 -->
        <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); margin-bottom: 24px; padding-bottom: 8px; flex-wrap: wrap;">
          <button class="btn ${activeTab === 'hero' ? 'btn-primary' : 'btn-secondary'}" data-tab="hero">메인 히어로 갤러리</button>
          <button class="btn ${activeTab === 'portfolio' ? 'btn-primary' : 'btn-secondary'}" data-tab="portfolio">포트폴리오 레퍼런스</button>
          <button class="btn ${activeTab === 'packages' ? 'btn-primary' : 'btn-secondary'}" data-tab="packages">제작 패키지</button>
          <button class="btn ${activeTab === 'stories' ? 'btn-primary' : 'btn-secondary'}" data-tab="stories">브랜드사 이야기</button>
          <button class="btn ${activeTab === 'logos' ? 'btn-primary' : 'btn-secondary'}" data-tab="logos">파트너 로고</button>
        </div>

        <div id="hp-tab-content">
          ${renderTabContent()}
        </div>
      </div>
    `;

    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeTab = e.target.dataset.tab;
        render();
      });
    });

    bindTabEvents();
  }

  function renderTabContent() {
    if (activeTab === 'hero') {
      return `
        <!-- 1. 히어로 상단 헤더 텍스트 문구 설정 카드 -->
        <div class="card" style="margin-bottom:24px;">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="font-weight:800; font-size:16px;">메인 히어로 상단 텍스트 문구 관리</h3>
              <p style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                메인 화면 상단의 소제목, 고정 접두사/접미사, 슬롯 롤링 문구 3가지를 직접 변경할 수 있습니다.
              </p>
            </div>
            <button class="btn btn-success btn-sm" id="btn-save-hero-text">텍스트 문구 Supabase DB 저장</button>
          </div>
          <div class="card-body">
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
              <div style="display:flex; flex-direction:column; gap:6px;">
                <label style="font-size:12px; font-weight:700; color:var(--text-primary);">상단 소제목 (Eyebrow)</label>
                <input type="text" class="input" id="input-hero-eyebrow" value="${heroTextData.eyebrow || ''}" placeholder="예: 브랜드를 가장 생생하게 만나는 순간" style="font-size:13px;">
              </div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                <label style="font-size:12px; font-weight:700; color:var(--text-primary);">메인 타이틀 고정 접두사 (Prefix)</label>
                <input type="text" class="input" id="input-hero-prefix" value="${heroTextData.prefix || ''}" placeholder="예: 우리는" style="font-size:13px;">
              </div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                <label style="font-size:12px; font-weight:700; color:var(--text-primary);">메인 타이틀 고정 접미사 (Suffix)</label>
                <input type="text" class="input" id="input-hero-suffix" value="${heroTextData.suffix || ''}" placeholder="예: 만듭니다." style="font-size:13px;">
              </div>
            </div>

            <div style="margin-top:16px; border-top:1px solid var(--border-light); padding-top:16px;">
              <label style="font-size:12px; font-weight:700; color:var(--text-primary); display:block; margin-bottom:8px;">
                슬롯 롤링 핵심 키워드 목록 (3가지 순환 문구)
              </label>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:12px;">
                <div style="display:flex; flex-direction:column; gap:4px;">
                  <span style="font-size:11px; color:var(--text-secondary);">롤링 문구 1</span>
                  <input type="text" class="input input-hero-phrase" data-idx="0" value="${(heroTextData.phrases && heroTextData.phrases[0]) || ''}" placeholder="예: 브랜드를 라이브" style="font-size:13px;">
                </div>
                <div style="display:flex; flex-direction:column; gap:4px;">
                  <span style="font-size:11px; color:var(--text-secondary);">롤링 문구 2</span>
                  <input type="text" class="input input-hero-phrase" data-idx="1" value="${(heroTextData.phrases && heroTextData.phrases[1]) || ''}" placeholder="예: 브랜드의 매출을" style="font-size:13px;">
                </div>
                <div style="display:flex; flex-direction:column; gap:4px;">
                  <span style="font-size:11px; color:var(--text-secondary);">롤링 문구 3</span>
                  <input type="text" class="input input-hero-phrase" data-idx="2" value="${(heroTextData.phrases && heroTextData.phrases[2]) || ''}" placeholder="예: 구매하는 순간을" style="font-size:13px;">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. 메인 히어로 3D 슬라이더 카드 관리 카드 -->
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="font-weight:800; font-size:16px;">메인 히어로 3D 슬라이더 카드 관리</h3>
              <p style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                등록된 순서대로 메인 3D 커버플로우 무대에 노출됩니다. 컴퓨터 사진 선택 시 Supabase 원본 스토리지로 실시간 저장됩니다.
              </p>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm" id="btn-clear-all-hero" style="color:#ef4444; border-color:rgba(239,68,68,0.3);">기존 카드 전체 비우기</button>
              <button class="btn btn-primary btn-sm" id="btn-add-hero-card">+ 새 히어로 카드 추가</button>
              <button class="btn btn-success btn-sm" id="btn-save-hero">Supabase DB 실시간 저장</button>
            </div>
          </div>
          <div class="card-body">
            ${heroData.length === 0 ? `
              <div style="text-align:center; padding: 48px 20px; border:2px dashed var(--border-color); border-radius:12px; background:var(--bg-secondary);">
                <p style="font-size:15px; font-weight:700; color:var(--text-primary); margin-bottom:8px;">등록된 히어로 카드가 없습니다.</p>
                <p style="font-size:13px; color:var(--text-secondary); margin-bottom:16px;">상단의 <strong>[ + 새 히어로 카드 추가 ]</strong> 버튼을 눌러 고화질 사진이나 동영상 파일을 직접 등록해 보세요.</p>
                <button class="btn btn-primary btn-sm" id="btn-add-hero-card-empty">+ 첫 번째 히어로 카드 등록하기</button>
              </div>
            ` : `
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px;">
                ${heroData.map((img, idx) => {
                  const imgSrc = (img.startsWith('http://') || img.startsWith('https://')) ? img : `./assets/${img}`;
                  return `
                    <div class="hero-item-card" style="background:var(--bg-secondary); border:1px solid var(--border-light); border-radius:12px; padding:14px; display:flex; flex-direction:column; gap:10px; position:relative;">
                      <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="badge badge-primary" style="font-size:11px;">카드 NO. ${idx + 1}</span>
                        <div style="display:flex; gap:4px;">
                          ${idx > 0 ? `<button class="btn btn-xs btn-secondary btn-move-hero" data-idx="${idx}" data-dir="-1" title="위로">위로</button>` : ''}
                          ${idx < heroData.length - 1 ? `<button class="btn btn-xs btn-secondary btn-move-hero" data-idx="${idx}" data-dir="1" title="아래로">아래로</button>` : ''}
                          <button class="btn btn-xs btn-danger btn-del-hero-card" data-idx="${idx}" title="삭제">삭제</button>
                        </div>
                      </div>
                      <div style="width:100%; height:200px; border-radius:8px; overflow:hidden; background:#000; display:flex; align-items:center; justify-content:center; border:1px solid rgba(255,255,255,0.1); position:relative;">
                        ${img ? (img.endsWith('.mp4') || img.endsWith('.webm') ? 
                          `<video src="${imgSrc}" style="width:100%; height:100%; object-fit:cover;" autoplay loop muted playsinline></video>` :
                          `<img src="${imgSrc}" alt="Hero Image" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='./assets/001.jpg'">`
                        ) : `<span style="font-size:12px; color:var(--text-tertiary);">사진을 선택해주세요</span>`}
                      </div>
                      <div style="display:flex; flex-direction:column; gap:4px;">
                        <label style="font-size:11px; font-weight:700; color:var(--text-secondary);">이미지 경로 / Supabase URL</label>
                        <div style="display:flex; gap:4px;">
                          <input type="text" class="input input-hero-path" data-idx="${idx}" value="${img}" placeholder="./assets/파일명.jpg 또는 URL" style="font-size:11px; flex:1;">
                          <input type="file" class="hero-card-file-input" id="hero-card-file-${idx}" data-idx="${idx}" accept="image/*,video/*" style="display:none;">
                          <button class="btn btn-xs btn-secondary btn-upload-hero-card" data-idx="${idx}" style="font-size:11px; white-space:nowrap;">사진 선택</button>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>
        </div>
      `;
    }

    if (activeTab === 'portfolio') {
      return `
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3>포트폴리오 레퍼런스 목록</h3>
              <span class="badge badge-secondary">${portfolioData.length}개 항목</span>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-add-pf">+ 새 포트폴리오 추가</button>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:60px;">번호</th>
                  <th>브랜드/제목</th>
                  <th>카테고리</th>
                  <th>대표 이미지</th>
                  <th>방송/영상 링크</th>
                  <th class="text-center" style="width:120px;">관리</th>
                </tr>
              </thead>
              <tbody>
                ${portfolioData.map((item, idx) => `
                  <tr>
                    <td style="font-weight:600; color:var(--text-tertiary);">${idx + 1}</td>
                    <td style="font-weight:700;">${item.title}</td>
                    <td><span class="badge badge-primary">${item.category}</span></td>
                    <td style="font-size:12px; color:var(--text-secondary); max-width:180px; overflow:hidden; text-overflow:ellipsis;">${item.image}</td>
                    <td style="font-size:12px; color:var(--status-info);">${item.link || '#'}</td>
                    <td class="text-center">
                      <button class="btn btn-xs btn-danger btn-del-pf" data-idx="${idx}">삭제</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (activeTab === 'packages') {
      return `
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>제작 패키지 구성</h3>
            <button class="btn btn-primary btn-sm" id="btn-add-pkg">+ 패키지 추가</button>
          </div>
          <div class="card-body">
            <div style="display:flex; flex-direction:column; gap:16px;">
              ${packagesData.map((pkg, idx) => `
                <div style="padding:16px; background:var(--bg-secondary); border-radius:var(--radius-md); border:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <h4 style="font-size:16px; font-weight:700;">${pkg.name} <span style="color:var(--primary); font-size:14px; margin-left:8px;">${pkg.price}</span></h4>
                    <p style="font-size:13px; color:var(--text-secondary); margin-top:4px;">${Array.isArray(pkg.features) ? pkg.features.join(', ') : (pkg.features || '')}</p>
                  </div>
                  <button class="btn btn-xs btn-danger btn-del-pkg" data-idx="${idx}">삭제</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    if (activeTab === 'stories') {
      return `
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>브랜드사 후기 & 스토리</h3>
            <button class="btn btn-primary btn-sm" id="btn-add-story">+ 스토리 추가</button>
          </div>
          <div class="card-body">
            <div style="display:flex; flex-direction:column; gap:12px;">
              ${storiesData.map((st, idx) => `
                <div style="padding:16px; background:var(--bg-secondary); border-radius:var(--radius-md); border:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <strong style="font-size:15px; color:var(--text-primary);">${st.brand || st.company || ''}</strong>
                    <p style="font-size:14px; color:var(--text-secondary); margin-top:4px;">"${st.quote}"</p>
                    <span style="font-size:12px; color:var(--text-tertiary);">${st.author || st.authorRole || ''}</span>
                  </div>
                  <button class="btn btn-xs btn-danger btn-del-story" data-idx="${idx}">삭제</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    if (activeTab === 'logos') {
      return `
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>파트너 브랜드 로고</h3>
            <button class="btn btn-primary btn-sm" id="btn-add-logo">+ 로고 추가</button>
          </div>
          <div class="card-body">
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px;">
              ${logosData.map((lg, idx) => `
                <div style="padding:16px; background:var(--bg-secondary); border-radius:var(--radius-md); border:1px solid var(--border-light); text-align:center;">
                  <strong style="font-size:14px; display:block; margin-bottom:8px;">${lg.name}</strong>
                  <div style="font-size:12px; color:var(--text-tertiary); overflow:hidden; text-overflow:ellipsis;">${lg.logo}</div>
                  <button class="btn btn-xs btn-danger btn-del-logo" data-idx="${idx}" style="margin-top:12px;">삭제</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    return '';
  }

  function bindTabEvents() {
    // 기존 홈페이지 파일 강제 동기화 가져오기 버튼 이벤트
    container.querySelector('#btn-force-sync')?.addEventListener('click', () => {
      confirmDialog('기존 홈페이지의 JSON 파일들로부터 모든 데이터(포트폴리오, 히어로 등)를 강제로 가져와 Supabase DB에 엎어쓰시겠습니까?', async () => {
        try {
          // 1. 히어로 로드 및 저장
          const resHero = await fetch('/hero.json').catch(() => null);
          if (resHero && resHero.ok) {
            const data = await resHero.json();
            heroData = data;
            await saveHpSetting('hero', heroData);
          }

          // 2. 포트폴리오 로드 및 저장
          const resPf = await fetch('/portfolio.json').catch(() => null);
          if (resPf && resPf.ok) {
            const data = await resPf.json();
            portfolioData = data;
            await saveHpSetting('portfolio', portfolioData);
          }

          // 3. 패키지 로드 및 저장
          const resPkg = await fetch('/packages.json').catch(() => null);
          if (resPkg && resPkg.ok) {
            const data = await resPkg.json();
            packagesData = data;
            await saveHpSetting('packages', packagesData);
          }

          // 4. 스토리 로드 및 저장
          const resSt = await fetch('/stories.json').catch(() => null);
          if (resSt && resSt.ok) {
            const data = await resSt.json();
            storiesData = data;
            await saveHpSetting('stories', storiesData);
          }

          // 5. 로고 로드 및 저장
          const resLg = await fetch('/logos.json').catch(() => null);
          if (resLg && resLg.ok) {
            const data = await resLg.json();
            logosData = data;
            await saveHpSetting('logos', logosData);
          }

          showSuccess('기존 홈페이지 실데이터 전체가 성공적으로 Supabase DB와 동기화 마이그레이션되었습니다!');
          render();
        } catch (err) {
          showError('기존 데이터 가져오기 중 오류가 발생했습니다.');
        }
      });
    });

    // --------------------------------------------------------
    // 히어로 카드 관리 이벤트 바인딩
    // --------------------------------------------------------
    if (activeTab === 'hero') {
      // 0) 히어로 텍스트 문구 저장
      container.querySelector('#btn-save-hero-text')?.addEventListener('click', async () => {
        const eyebrow = container.querySelector('#input-hero-eyebrow')?.value.trim() || '';
        const prefix = container.querySelector('#input-hero-prefix')?.value.trim() || '';
        const suffix = container.querySelector('#input-hero-suffix')?.value.trim() || '';
        const phrases = [];
        container.querySelectorAll('.input-hero-phrase').forEach(inp => {
          if (inp.value.trim()) phrases.push(inp.value.trim());
        });

        heroTextData = { eyebrow, prefix, suffix, phrases };
        await saveHpSetting('hero_text', heroTextData);
        showSuccess('메인 히어로 상단 텍스트 문구가 Supabase DB에 실시간 저장되었습니다.');
      });

      // 1) 전체 삭제 / 초기화
      container.querySelector('#btn-clear-all-hero')?.addEventListener('click', async () => {
        if (confirm('기존 등록된 모든 히어로 카드를 삭제하고 초기화하시겠습니까?\n(새로 직접 등록하실 수 있도록 전부 비워집니다.)')) {
          heroData = [];
          await saveHpSetting('hero', heroData);
          showSuccess('히어로 카드가 전체 삭제되었습니다. 새 카드를 직접 추가해 보세요.');
          render();
        }
      });

      // 2) 카드 추가 버튼
      const handleAddCard = async () => {
        heroData.push('');
        render();
      };
      container.querySelector('#btn-add-hero-card')?.addEventListener('click', handleAddCard);
      container.querySelector('#btn-add-hero-card-empty')?.addEventListener('click', handleAddCard);

      // 3) 카드 순서 이동 (위로/아래로)
      container.querySelectorAll('.btn-move-hero').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const idx = parseInt(e.currentTarget.dataset.idx);
          const dir = parseInt(e.currentTarget.dataset.dir);
          const targetIdx = idx + dir;

          if (targetIdx >= 0 && targetIdx < heroData.length) {
            const temp = heroData[idx];
            heroData[idx] = heroData[targetIdx];
            heroData[targetIdx] = temp;
            await saveHpSetting('hero', heroData);
            render();
          }
        });
      });

      // 4) 카드 개별 삭제
      container.querySelectorAll('.btn-del-hero-card').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const idx = parseInt(e.currentTarget.dataset.idx);
          heroData.splice(idx, 1);
          await saveHpSetting('hero', heroData);
          showSuccess('카드가 삭제되었습니다.');
          render();
        });
      });

      // 5) 경로 직접 입력 반영
      container.querySelectorAll('.input-hero-path').forEach(inp => {
        inp.addEventListener('change', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          heroData[idx] = e.target.value.trim();
        });
      });

      // 6) 파일 직접 선택 및 Supabase 스토리지 업로드
      container.querySelectorAll('.btn-upload-hero-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = e.currentTarget.dataset.idx;
          const fileInput = document.getElementById(`hero-card-file-${idx}`);
          if (fileInput) fileInput.click();
        });
      });

      container.querySelectorAll('.hero-card-file-input').forEach(input => {
        input.addEventListener('change', async (e) => {
          const idx = parseInt(e.target.dataset.idx);
          let file = e.target.files[0];
          if (!file) return;

          const triggerBtn = container.querySelector(`.btn-upload-hero-card[data-idx="${idx}"]`);
          if (triggerBtn) {
            triggerBtn.disabled = true;
            triggerBtn.textContent = '⏳ 업로드 중...';
          }

          try {
            // 화질 깨짐 없는 고품질(0.88) 용량 최적화
            if (file.type.startsWith('image/')) {
              file = await new Promise((resolve) => {
                const img = new Image();
                const reader = new FileReader();
                reader.onload = (ev) => {
                  img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const MAX_WIDTH = 1920;
                    if (width > MAX_WIDTH) {
                      height = Math.round((height * MAX_WIDTH) / width);
                      width = MAX_WIDTH;
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                      if (!blob) { resolve(file); return; }
                      const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                      });
                      resolve(newFile);
                    }, 'image/jpeg', 0.88);
                  };
                  img.src = ev.target.result;
                };
                reader.readAsDataURL(file);
              });
            }

            const supabase = window.supabaseClient;
            if (!supabase) {
              alert('Supabase 연동 클라이언트를 찾을 수 없습니다.');
              return;
            }

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
            const filePath = `hero/${fileName}`;

            let { data, error } = await supabase.storage
              .from('news_images')
              .upload(filePath, file, { cacheControl: '3600', upsert: true });

            if (error) {
              const res = await supabase.storage
                .from('hp_assets')
                .upload(filePath, file, { cacheControl: '3600', upsert: true });
              data = res.data;
              error = res.error;
            }

            if (error) {
              console.error('Storage Upload Error:', error);
              alert('파일 업로드 실패: ' + error.message);
              return;
            }

            const { data: publicUrlData } = supabase.storage
              .from('news_images')
              .getPublicUrl(filePath);

            const publicUrl = publicUrlData.publicUrl;
            heroData[idx] = publicUrl;
            await saveHpSetting('hero', heroData);
            showSuccess('사진이 Supabase 고화질 스토리지로 성공적으로 업로드되었습니다!');
            render();
          } catch (err) {
            console.error(err);
            alert('업로드 처리 중 오류 발생: ' + err.message);
          } finally {
            if (triggerBtn) {
              triggerBtn.disabled = false;
              triggerBtn.textContent = '사진 선택';
            }
          }
        });
      });
    }


    // 포트폴리오
    container.querySelector('#btn-add-pf')?.addEventListener('click', async () => {
      const title = prompt('포트폴리오 브랜드명/제목:');
      if (!title) return;
      const image = prompt('이미지 경로:', './assets/001.jpg') || './assets/001.jpg';
      const link = prompt('방송/영상 URL 링크:', '#') || '#';
      portfolioData.unshift({ title, category: 'beauty', image, link });
      await saveHpSetting('portfolio', portfolioData);
      showSuccess('포트폴리오가 Supabase DB에 동기화되었습니다.');
      render();
    });

    container.querySelectorAll('.btn-del-pf').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const idx = parseInt(e.target.dataset.idx);
        portfolioData.splice(idx, 1);
        await saveHpSetting('portfolio', portfolioData);
        showSuccess('포트폴리오 항목이 삭제되었습니다.');
        render();
      });
    });

    // 패키지
    container.querySelector('#btn-add-pkg')?.addEventListener('click', async () => {
      const name = prompt('패키지 명칭:');
      if (!name) return;
      const price = prompt('가격:', '1,500,000원') || '1,500,000원';
      const features = prompt('구성 내용:', '4K 촬영, 메인 쇼호스트') || '';
      packagesData.push({ name, price, features });
      await saveHpSetting('packages', packagesData);
      showSuccess('패키지가 Supabase DB에 동기화되었습니다.');
      render();
    });

    container.querySelectorAll('.btn-del-pkg').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const idx = parseInt(e.target.dataset.idx);
        packagesData.splice(idx, 1);
        await saveHpSetting('packages', packagesData);
        render();
      });
    });

    // 스토리
    container.querySelector('#btn-add-story')?.addEventListener('click', async () => {
      const brand = prompt('브랜드명:');
      if (!brand) return;
      const quote = prompt('후기/스토리 한줄 문구:') || '';
      storiesData.push({ brand, quote, author: '브랜드 담당자' });
      await saveHpSetting('stories', storiesData);
      showSuccess('브랜드 스토리가 Supabase DB에 동기화되었습니다.');
      render();
    });

    container.querySelectorAll('.btn-del-story').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const idx = parseInt(e.target.dataset.idx);
        storiesData.splice(idx, 1);
        await saveHpSetting('stories', storiesData);
        render();
      });
    });

    // 로고
    container.querySelector('#btn-add-logo')?.addEventListener('click', async () => {
      const name = prompt('파트너 브랜드명:');
      if (!name) return;
      const logo = prompt('로고 이미지 경로:', './assets/logo.png') || './assets/logo.png';
      logosData.push({ name, logo });
      await saveHpSetting('logos', logosData);
      showSuccess('파트너 로고가 Supabase DB에 동기화되었습니다.');
      render();
    });

    container.querySelectorAll('.btn-del-logo').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const idx = parseInt(e.target.dataset.idx);
        logosData.splice(idx, 1);
        await saveHpSetting('logos', logosData);
        render();
      });
    });
  }

  render();
  return container;
}
