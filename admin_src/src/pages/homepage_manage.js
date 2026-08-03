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
        if (data && data[0] && data[0].value) return data[0].value;
      }
    } catch (e) {}

    try {
      const v = localStorage.getItem(`ryzin_hp_${key}`);
      if (v) return JSON.parse(v);
    } catch (e) {}
    return fallback;
  };

  const saveHpSetting = async (key, val) => {
    localStorage.setItem(`ryzin_hp_${key}`, JSON.stringify(val));
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/homepage_settings`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ key, value: val, updated_at: new Date().toISOString() })
      }).catch(() => null);
    } catch (e) {}
  };

  // 데이터 상태
  let heroData = null;
  let portfolioData = null;
  let packagesData = null;
  let storiesData = null;
  let logosData = null;

  async function loadAllData() {
    heroData = await fetchHpSetting('hero', {
      col1: ["everyhabit_enzyme.jpg", "baegayul.jpg", "Screenshot 2026-05-01 19-46-03.png"],
      col2: ["1779278961975_Screenshot_2026-05-20_17-33-25.png", "gangneung.jpg", "miyabis.jpg"],
      col3: ["1783519975524_KakaoTalk_Photo_2026-07-08-23-07-21.png", "003.jpg", "yadah.jpg"],
      col4: ["001.png", "002.jpg"]
    });

    portfolioData = await fetchHpSetting('portfolio', [
      { title: "만나강정", category: "food", image: "./assets/1783519975524_KakaoTalk_Photo_2026-07-08-23-07-21.png", link: "#" },
      { title: "트루쿡", category: "life", image: "./assets/1782397523767_123.png", link: "#" },
      { title: "쏘랩 (SOLAB)", category: "beauty", image: "./assets/1779278961975_Screenshot_2026-05-20_17-33-25.png", link: "#" },
      { title: "강릉은정한과", category: "food", image: "./assets/001.jpg", link: "https://view.shoppinglive.naver.com/replays/1836196" }
    ]);

    packagesData = await fetchHpSetting('packages', [
      { name: "STANDARD LIGHT", price: "990,000원", features: "1인 단독 진행, 기본 조명/음향, 1시간 방송" },
      { name: "DELUXE PREMIUM", price: "1,990,000원", features: "2인 메인 쇼호스트, 4K 시네마틱 카메밍, 커스텀 세트 연출" }
    ]);

    storiesData = await fetchHpSetting('stories', [
      { brand: "강릉은정한과", quote: "방송 1회 만에 매출액 300% 상승 달성!", author: "대표 채이준" }
    ]);

    logosData = await fetchHpSetting('logos', [
      { name: "네이버 쇼핑라이브", logo: "./assets/logo.png" }
    ]);
  }

  async function render() {
    if (!heroData) await loadAllData();

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">홈페이지 관리 (Supabase 동기화)</h1>
            <p class="page-description">공식 웹사이트 메인 비주얼, 포트폴리오, 제작 패키지, 후기 및 파트너 로고 실시간 관리</p>
          </div>
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
        <div class="card">
          <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
            <h3>메인 히어로 이미지 갤러리 (4컬럼 수직 스크롤)</h3>
            <button class="btn btn-primary btn-sm" id="btn-save-hero">Supabase DB 실시간 저장</button>
          </div>
          <div class="card-body">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
              ${['col1', 'col2', 'col3', 'col4'].map((colKey, idx) => `
                <div style="background: var(--bg-secondary); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                  <h4 style="font-weight:700; margin-bottom:12px; font-size:14px;">컬럼 ${idx + 1}</h4>
                  <div style="display:flex; flex-direction:column; gap:8px;">
                    ${(heroData[colKey] || []).map((img, i) => `
                      <div style="display:flex; gap:6px; align-items:center;">
                        <input type="text" class="input input-hero-img" id="hero-img-${colKey}-${i}" data-col="${colKey}" data-idx="${i}" value="${img}" style="font-size:12px; flex:1;">
                        <input type="file" class="hero-file-input" id="hero-file-${colKey}-${i}" data-col="${colKey}" data-idx="${i}" accept="image/*" style="display:none;">
                        <button class="btn btn-xs btn-secondary btn-trigger-hero-upload" data-col="${colKey}" data-idx="${i}" title="컴퓨터에서 사진 업로드">📁</button>
                        <button class="btn btn-xs btn-danger btn-del-hero-img" data-col="${colKey}" data-idx="${i}">X</button>
                      </div>
                    `).join('')}
                    <button class="btn btn-xs btn-secondary btn-add-hero-img" data-col="${colKey}">+ 이미지 추가</button>
                  </div>
                </div>
              `).join('')}
            </div>
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
                    <p style="font-size:13px; color:var(--text-secondary); margin-top:4px;">${pkg.features}</p>
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
                    <strong style="font-size:15px; color:var(--text-primary);">${st.brand}</strong>
                    <p style="font-size:14px; color:var(--text-secondary); margin-top:4px;">"${st.quote}"</p>
                    <span style="font-size:12px; color:var(--text-tertiary);">${st.author || ''}</span>
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
    // 📁 업로드 트리거 및 파일 변경 이벤트 바인딩
    if (activeTab === 'hero') {
      container.querySelectorAll('.btn-trigger-hero-upload').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const col = e.currentTarget.dataset.col;
          const idx = e.currentTarget.dataset.idx;
          const fileInput = container.querySelector(`#hero-file-${col}-${idx}`);
          fileInput?.click();
        });
      });

      container.querySelectorAll('.hero-file-input').forEach(fileInput => {
        fileInput.addEventListener('change', async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const col = e.target.dataset.col;
          const idx = parseInt(e.target.dataset.idx);
          const triggerBtn = container.querySelector(`.btn-trigger-hero-upload[data-col="${col}"][data-idx="${idx}"]`);
          const imgInput = container.querySelector(`#hero-img-${col}-${idx}`);

          // 한글/NFD 파일명 안전 자동 변환
          const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
          const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
          const safeName = `hero_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${ext}`;

          if (triggerBtn) {
            triggerBtn.disabled = true;
            triggerBtn.textContent = '..';
          }

          try {
            const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/news_images/${safeName}`, {
              method: 'POST',
              headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': file.type
              },
              body: file
            });

            if (uploadRes.ok) {
              const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/news_images/${safeName}`;
              if (imgInput) imgInput.value = publicUrl;
              
              // 즉시 로컬 데이터 갱신 및 백그라운드 자동 저장
              heroData[col][idx] = publicUrl;
              await saveHpSetting('hero', heroData);
              showSuccess(`히어로 이미지가 성공적으로 업로드 및 동기화되었습니다!`);
              render();
            } else {
              showError('이미지 업로드에 실패했습니다.');
            }
          } catch (err) {
            showError('업로드 중 네트워크 오류가 발생했습니다.');
          } finally {
            if (triggerBtn) {
              triggerBtn.disabled = false;
              triggerBtn.textContent = '📁';
            }
          }
        });
      });
    }

    // 히어로 저장
    container.querySelector('#btn-save-hero')?.addEventListener('click', async () => {
      const inputs = container.querySelectorAll('.input-hero-img');
      const newHero = { col1: [], col2: [], col3: [], col4: [] };
      inputs.forEach(inp => {
        const col = inp.dataset.col;
        if (inp.value.trim()) newHero[col].push(inp.value.trim());
      });
      heroData = newHero;
      await saveHpSetting('hero', heroData);
      showSuccess('메인 히어로 갤러리가 Supabase DB에 성공적으로 동기화 저장되었습니다.');
    });

    container.querySelectorAll('.btn-del-hero-img').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const col = e.target.dataset.col;
        const idx = parseInt(e.target.dataset.idx);
        heroData[col].splice(idx, 1);
        await saveHpSetting('hero', heroData);
        render();
      });
    });

    container.querySelectorAll('.btn-add-hero-img').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const col = e.target.dataset.col;
        if (!heroData[col]) heroData[col] = [];
        heroData[col].push('assets/001.jpg');
        await saveHpSetting('hero', heroData);
        render();
      });
    });

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
