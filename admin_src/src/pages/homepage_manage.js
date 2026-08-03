// ===== 홈페이지 관리 페이지 (히어로, 포트폴리오, 패키지, 브랜드 이야기, 로고, 이미지 자산) =====
import { store } from '../data/store.js';
import { showSuccess, showError } from '../components/toast.js';
import { confirmDialog, openModal, closeModal } from '../components/modal.js';

export function renderHomepageManage() {
  const container = document.createElement('div');
  let activeTab = 'hero'; // 'hero' | 'portfolio' | 'packages' | 'stories' | 'logos' | 'assets'

  // 로컬스토리지 & DB 캐시 데이터 헬퍼
  const getCache = (key, fallback) => {
    try {
      const v = localStorage.getItem(`ryzin_hp_${key}`);
      if (v) return JSON.parse(v);
    } catch (e) {}
    return fallback;
  };

  const setCache = (key, val) => {
    localStorage.setItem(`ryzin_hp_${key}`, JSON.stringify(val));
  };

  // 초기 상태
  let heroData = getCache('hero', {
    col1: ["everyhabit_enzyme.jpg", "baegayul.jpg", "Screenshot 2026-05-01 19-46-03.png"],
    col2: ["1779278961975_Screenshot_2026-05-20_17-33-25.png", "gangneung.jpg", "miyabis.jpg"],
    col3: ["1783519975524_KakaoTalk_Photo_2026-07-08-23-07-21.png", "003.jpg", "yadah.jpg"],
    col4: ["001.png", "002.jpg"]
  });

  let portfolioData = getCache('portfolio', [
    { title: "만나강정", category: "food", image: "./assets/1783519975524_KakaoTalk_Photo_2026-07-08-23-07-21.png", link: "#" },
    { title: "트루쿡", category: "life", image: "./assets/1782397523767_123.png", link: "#" },
    { title: "쏘랩 (SOLAB)", category: "beauty", image: "./assets/1779278961975_Screenshot_2026-05-20_17-33-25.png", link: "#" },
    { title: "강릉은정한과", category: "food", image: "./assets/001.jpg", link: "https://view.shoppinglive.naver.com/replays/1836196" }
  ]);

  let packagesData = getCache('packages', [
    { name: "STANDARD LIGHT", price: "990,000원", features: "1인 단독 진행, 기본 조명/음향, 1시간 방송" },
    { name: "DELUXE PREMIUM", price: "1,990,000원", features: "2인 메인 쇼호스트, 4K 시네마틱 카메밍, 커스텀 세트 연출" }
  ]);

  let storiesData = getCache('stories', [
    { brand: "강릉은정한과", quote: "방송 1회 만에 매출액 300% 상승 달성!", author: "대표 채이준" }
  ]);

  let logosData = getCache('logos', [
    { name: "네이버 쇼핑라이브", logo: "./assets/logo.png" }
  ]);

  function render() {
    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">홈페이지 관리</h1>
            <p class="page-description">공식 웹사이트 메인 비주얼, 포트폴리오, 제작 패키지, 후기 및 브랜드 파트너 관리</p>
          </div>
        </div>
      </div>

      <div class="page-body">
        <!-- 상단 서브 탭 6개 -->
        <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); margin-bottom: 24px; padding-bottom: 8px; flex-wrap: wrap;">
          <button class="btn ${activeTab === 'hero' ? 'btn-primary' : 'btn-secondary'}" data-tab="hero">메인 히어로 갤러리</button>
          <button class="btn ${activeTab === 'portfolio' ? 'btn-primary' : 'btn-secondary'}" data-tab="portfolio">포트폴리오 레퍼런스</button>
          <button class="btn ${activeTab === 'packages' ? 'btn-primary' : 'btn-secondary'}" data-tab="packages">제작 패키지</button>
          <button class="btn ${activeTab === 'stories' ? 'btn-primary' : 'btn-secondary'}" data-tab="stories">브랜드사 이야기</button>
          <button class="btn ${activeTab === 'logos' ? 'btn-primary' : 'btn-secondary'}" data-tab="logos">파트너 로고</button>
        </div>

        <!-- Tab Body -->
        <div id="hp-tab-content">
          ${renderTabContent()}
        </div>
      </div>
    `;

    // 탭 이벤트 바인딩
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
            <button class="btn btn-primary btn-sm" id="btn-save-hero">변경사항 저장</button>
          </div>
          <div class="card-body">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
              ${['col1', 'col2', 'col3', 'col4'].map((colKey, idx) => `
                <div style="background: var(--bg-secondary); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                  <h4 style="font-weight:700; margin-bottom:12px; font-size:14px;">컬럼 ${idx + 1}</h4>
                  <div style="display:flex; flex-direction:column; gap:8px;">
                    ${(heroData[colKey] || []).map((img, i) => `
                      <div style="display:flex; gap:6px; align-items:center;">
                        <input type="text" class="input input-hero-img" data-col="${colKey}" data-idx="${i}" value="${img}" style="font-size:12px; flex:1;">
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
    // 히어로 이미지 저장
    container.querySelector('#btn-save-hero')?.addEventListener('click', () => {
      const inputs = container.querySelectorAll('.input-hero-img');
      const newHero = { col1: [], col2: [], col3: [], col4: [] };
      inputs.forEach(inp => {
        const col = inp.dataset.col;
        if (inp.value.trim()) newHero[col].push(inp.value.trim());
      });
      heroData = newHero;
      setCache('hero', heroData);
      showSuccess('메인 히어로 이미지 갤러리가 저장되었습니다.');
    });

    container.querySelectorAll('.btn-del-hero-img').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const col = e.target.dataset.col;
        const idx = parseInt(e.target.dataset.idx);
        heroData[col].splice(idx, 1);
        setCache('hero', heroData);
        render();
      });
    });

    container.querySelectorAll('.btn-add-hero-img').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const col = e.target.dataset.col;
        if (!heroData[col]) heroData[col] = [];
        heroData[col].push('assets/001.jpg');
        setCache('hero', heroData);
        render();
      });
    });

    // 포트폴리오 추가/삭제
    container.querySelector('#btn-add-pf')?.addEventListener('click', () => {
      const title = prompt('포트폴리오 브랜드명/제목:');
      if (!title) return;
      const image = prompt('이미지 경로 (예: ./assets/001.jpg):', './assets/001.jpg') || './assets/001.jpg';
      const link = prompt('방송/영상 URL 링크:', '#') || '#';
      portfolioData.unshift({ title, category: 'beauty', image, link });
      setCache('portfolio', portfolioData);
      showSuccess('새 포트폴리오가 추가되었습니다.');
      render();
    });

    container.querySelectorAll('.btn-del-pf').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx);
        portfolioData.splice(idx, 1);
        setCache('portfolio', portfolioData);
        showSuccess('포트폴리오 항목이 삭제되었습니다.');
        render();
      });
    });

    // 패키지 추가/삭제
    container.querySelector('#btn-add-pkg')?.addEventListener('click', () => {
      const name = prompt('패키지 명칭:');
      if (!name) return;
      const price = prompt('가격:', '1,500,000원') || '1,500,000원';
      const features = prompt('구성 내용:', '4K 촬영, 메인 쇼호스트') || '';
      packagesData.push({ name, price, features });
      setCache('packages', packagesData);
      showSuccess('새 패키지가 추가되었습니다.');
      render();
    });

    container.querySelectorAll('.btn-del-pkg').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx);
        packagesData.splice(idx, 1);
        setCache('packages', packagesData);
        render();
      });
    });

    // 브랜드 스토리 추가/삭제
    container.querySelector('#btn-add-story')?.addEventListener('click', () => {
      const brand = prompt('브랜드명:');
      if (!brand) return;
      const quote = prompt('후기/스토리 한줄 문구:') || '';
      storiesData.push({ brand, quote, author: '브랜드 담당자' });
      setCache('stories', storiesData);
      showSuccess('브랜드 스토리가 추가되었습니다.');
      render();
    });

    container.querySelectorAll('.btn-del-story').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx);
        storiesData.splice(idx, 1);
        setCache('stories', storiesData);
        render();
      });
    });

    // 로고 추가/삭제
    container.querySelector('#btn-add-logo')?.addEventListener('click', () => {
      const name = prompt('파트너 브랜드명:');
      if (!name) return;
      const logo = prompt('로고 이미지 경로:', './assets/logo.png') || './assets/logo.png';
      logosData.push({ name, logo });
      setCache('logos', logosData);
      showSuccess('파트너 로고가 추가되었습니다.');
      render();
    });

    container.querySelectorAll('.btn-del-logo').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx);
        logosData.splice(idx, 1);
        setCache('logos', logosData);
        render();
      });
    });
  }

  render();
  return container;
}
