export function renderLiveStream() {
  const container = document.createElement('div');
  container.className = 'dashboard-container';
  container.style.display = 'flex';
  container.style.gap = '24px';
  container.style.padding = '24px';
  container.style.height = 'calc(100vh - 48px)';
  container.style.overflow = 'hidden';


  const style = document.createElement('style');
  style.innerHTML = `
    .modern-input { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; transition: all 0.2s; background: #fff; box-sizing: border-box; }
    .modern-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
    .modern-input[readonly] { background: #f3f4f6; cursor: not-allowed; }
    .modern-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
    .file-upload-wrapper { display: flex; align-items: center; gap: 12px; }
    .file-upload-btn { display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; background: #fff; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: background 0.2s; color: #374151; }
    .file-upload-btn:hover { background: #f9fafb; }
    .product-row { display: flex; gap: 16px; align-items: center; background: #fff; padding: 16px; border-radius: 12px; margin-bottom: 12px; border: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .product-img-box { position: relative; width: 64px; height: 64px; flex-shrink: 0; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; cursor: pointer; }
    .product-img-box img { width: 100%; height: 100%; object-fit: cover; transition: opacity 0.2s; }
    .product-img-box:hover img { opacity: 0.8; }
    .product-inputs { flex: 1; display: flex; flex-direction: column; gap: 8px; }
    .product-prices { display: flex; gap: 8px; align-items: center; }
  `;
  container.appendChild(style);

  // 기본 상태 (localStorage 연동)
  const defaultConfig = {
    brandName: 'Ryzin Corp',
    title: '단독 특가 라이브 방송 중!',
    streamUrl: 'https://ib3fjwlmgu0bwksrq8ao15010.edge.naverncp.com/live/video/ls-20260701130603-WkL1g/1080p-16-9/playlist.m3u8',
    logoUrl: 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
    botEnabled: true,
    showViewers: true
  };

  const defaultStats = {
    viewers: 1204,
    hearts: 12040
  };

  const defaultProducts = [
    { id: 1, name: "[특가] 트루쿡 인덕션 프라이팬 3종 세트", price: "49,900원", image: "https://images.unsplash.com/photo-1584990347449-a6e81cb8860a?auto=format&fit=crop&q=80&w=200&h=200", url: "#" },
    { id: 2, name: "네티컬 딥 클렌징 앰플 기획세트", price: "24,000원", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200&h=200", url: "#" },
    { id: 3, name: "탐루미 수분폭탄 마스크팩 10매", price: "12,900원", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200&h=200", url: "#" }
  ];

  if (!localStorage.getItem('ryzin_live_config')) localStorage.setItem('ryzin_live_config', JSON.stringify(defaultConfig));
  if (!localStorage.getItem('ryzin_live_stats')) localStorage.setItem('ryzin_live_stats', JSON.stringify(defaultStats));
  if (!localStorage.getItem('ryzin_live_products')) localStorage.setItem('ryzin_live_products', JSON.stringify(defaultProducts));
  if (!localStorage.getItem('ryzin_live_chats')) localStorage.setItem('ryzin_live_chats', JSON.stringify([]));

  let config = JSON.parse(localStorage.getItem('ryzin_live_config'));
  let stats = JSON.parse(localStorage.getItem('ryzin_live_stats'));
  let products = JSON.parse(localStorage.getItem('ryzin_live_products'));

  const SHEETDB_URL = 'https://sheetdb.io/api/v1/3k5vdph36v8ej';

  let syncTimeout = null;
  const syncAllToSheetDB = () => {
    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(() => {
      const data = {
        '업데이트시간': new Date().toISOString(),
        '제목': config.brandName,
        '부제목': config.title,
        '프로필이미지': config.logoUrl,
        'URL': config.streamUrl,
        '시청자수': stats.viewers,
        '하트수': stats.hearts,
        '상품수': products.length,
        '첫상품명': JSON.stringify({
          thumbnailUrl: config.thumbnailUrl || '',
          liveStartTime: config.liveStartTime || '',
          isLive: config.isLive === true
        }),
        '상품목록': JSON.stringify(products),
        '시청자수노출': config.showViewers ? 'O' : 'X',
        '썸네일URL': config.thumbnailUrl || '',
        '시작일시': config.liveStartTime || '',
        '방송상태': config.isLive ? 'ON' : 'OFF'
      };
      fetch(`${SHEETDB_URL}?sheet=${encodeURIComponent('라이브관제')}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [data] })
      }).catch(e => console.warn('SheetDB 연동 실패', e));
    }, 1000); // 1초 디바운스로 여러번 변경 시 1번만 전송
  };

  const syncToIframe = () => {
    const iframe = document.getElementById('live-preview-iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'sync_preview', config, stats, products }, '*');
    }
  };

  const saveConfig = () => {
    localStorage.setItem('ryzin_live_config', JSON.stringify(config));
    window.dispatchEvent(new Event('storage')); 
    syncToIframe();
    syncAllToSheetDB();
  };
  const saveStats = () => {
    localStorage.setItem('ryzin_live_stats', JSON.stringify(stats));
    syncToIframe();
    syncAllToSheetDB();
  };
  const saveProducts = () => {
    localStorage.setItem('ryzin_live_products', JSON.stringify(products));
    syncToIframe();
    // syncAllToSheetDB(); // 수동 저장으로 변경
  };

  // 왼쪽 (컨트롤 패널)
  const leftPanel = document.createElement('div');
  leftPanel.style.flex = '1';
  leftPanel.style.display = 'flex';
  leftPanel.style.flexDirection = 'column';
  leftPanel.style.gap = '24px';
  leftPanel.style.overflowY = 'auto';
  leftPanel.style.paddingRight = '12px';

  // 1. 기본 설정 폼
  const configCard = document.createElement('div');
  configCard.className = 'card';
  configCard.style.padding = '24px';
  configCard.style.borderRadius = '12px';
  configCard.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  configCard.style.border = 'none';
  configCard.innerHTML = `
    <h3 style="margin-top:0; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:24px; font-size:18px; font-weight:700; color:#111;">라이브 기본 설정</h3>
    
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">
      <div>
        <label class="modern-label">제목 (브랜드명)</label>
        <input type="text" class="modern-input" id="config-brandName" value="${config.brandName || 'Ryzin Corp'}">
      </div>
      <div>
        <label class="modern-label">부제목 (방송 제목)</label>
        <input type="text" class="modern-input" id="config-title" value="${config.title || ''}">
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <label class="modern-label">방송 시작 일시 (카운트다운용)</label>
      <input type="datetime-local" class="modern-input" id="config-liveStartTime" value="${config.liveStartTime || ''}">
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:24px;">
      <div class="file-upload-wrapper">
        <div style="width:56px; height:56px; border-radius:50%; overflow:hidden; border:2px solid #e5e7eb; flex-shrink:0;">
          <img id="logo-preview" src="${config.logoUrl || ''}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <label class="modern-label">프로필 이미지</label>
          <label class="file-upload-btn" for="config-logoFile">이미지 업로드</label>
          <input type="file" id="config-logoFile" accept="image/*" style="display:none;">
        </div>
      </div>
      <div class="file-upload-wrapper">
        <div style="width:40px; height:71px; border-radius:6px; overflow:hidden; border:2px solid #e5e7eb; flex-shrink:0;">
          <img id="thumbnail-preview" src="${config.thumbnailUrl || ''}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <label class="modern-label">라이브 썸네일 (9:16 비율)</label>
          <label class="file-upload-btn" for="config-thumbnailFile">이미지 업로드</label>
          <input type="file" id="config-thumbnailFile" accept="image/*" style="display:none;">
        </div>
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <label class="modern-label">스트리밍 URL (m3u8)</label>
      <input type="text" class="modern-input" id="config-stream" value="${config.streamUrl}">
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:24px;">
      <div>
        <label class="modern-label">시청자 수 뻥튀기</label>
        <input type="number" class="modern-input" id="stat-viewers" value="${stats.viewers}">
      </div>
      <div>
        <label class="modern-label">하트 수 뻥튀기</label>
        <input type="number" class="modern-input" id="stat-hearts" value="${stats.hearts}">
      </div>
    </div>

    <div style="display:flex; align-items:center; gap:24px; margin-bottom:32px; background:#f9fafb; padding:16px; border-radius:8px;">
      <label style="display:flex; align-items:center; gap:8px; font-size:14px; font-weight:500; cursor:pointer;">
        <input type="checkbox" id="config-show-viewers" style="width:18px; height:18px; accent-color:#e50914;" ${config.showViewers !== false ? 'checked' : ''}>
        시청자 수 노출
      </label>
      <label style="display:flex; align-items:center; gap:8px; font-size:14px; font-weight:500; cursor:pointer;">
        <input type="checkbox" id="config-bot" style="width:18px; height:18px; accent-color:#e50914;" ${config.botEnabled ? 'checked' : ''}>
        채팅 봇 활성화
      </label>
    </div>

    <div style="display:flex; gap:12px; flex-direction:column;">
      <button id="btn-save-config" class="btn" style="width:100%; padding:14px; font-weight:700; background:#111; color:#fff; border:none; border-radius:8px; font-size:15px; transition:opacity 0.2s;">
        라이브 설정 일괄 적용 (저장)
      </button>
      <button id="btn-toggle-live" class="btn" style="width:100%; padding:14px; font-weight:700; color:white; background:${config.isLive ? '#6b7280' : '#e50914'}; border:none; border-radius:8px; font-size:15px; transition:opacity 0.2s;">
        ${config.isLive ? '라이브 종료하기' : '라이브 시작하기'}
      </button>
    </div>
  `;

  // 2. 상품 관리
  const renderProductList = () => {
    return products.map((p, idx) => `
      <div class="product-row">
        <div class="product-img-box" onclick="document.getElementById('upload-prod-${idx}').click()" title="클릭하여 이미지 업로드">
          <img src="${p.image}" id="img-preview-${idx}">
          <input type="file" id="upload-prod-${idx}" accept="image/*" style="display:none;" data-idx="${idx}" class="prod-img-upload">
        </div>
        <div class="product-inputs">
          <input type="text" class="modern-input" value="${p.name}" data-idx="${idx}" data-field="name" placeholder="상품명">
          <input type="text" class="modern-input" value="${p.url}" data-idx="${idx}" data-field="url" placeholder="상품 구매 링크 URL">
          <div class="product-prices">
            <input type="number" class="modern-input" value="${(p.price||'').toString().replace(/[^0-9]/g, '')}" data-idx="${idx}" data-field="price" placeholder="라이브가(숫자)">
            <input type="number" class="modern-input" value="${(p.normalPrice||'').toString().replace(/[^0-9]/g, '')}" data-idx="${idx}" data-field="normalPrice" placeholder="정상가(숫자)">
            <input type="number" min="0" max="100" class="modern-input" style="max-width:80px; text-align:center;" value="${p.discountRate || 0}" data-idx="${idx}" data-field="discountRate" placeholder="할인율%" readonly>
            <button class="btn btn-danger btn-del-product" data-idx="${idx}" style="padding:10px 16px; font-weight:600; border-radius:8px; border:none; background:#ef4444; color:#fff;">삭제</button>
          </div>
          <div style="display:flex; gap:8px; align-items:center; background:#fff1f2; padding:8px 12px; border-radius:8px; border:1px solid #fecdd3;">
            <span style="font-size:13px; font-weight:600; color:#e11d48;">🎁 깜짝딜</span>
            <input type="text" class="modern-input" style="width:120px; padding:6px 10px;" id="deal-text-${idx}" placeholder="배너 문구" value="${p.dealText || '깜짝딜 종료까지'}">
            <input type="number" class="modern-input" style="width:70px; padding:6px 10px;" id="deal-min-${idx}" placeholder="분">
            <button class="btn btn-deal-start" data-idx="${idx}" style="padding:6px 12px; background:#e11d48; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">시작</button>
            <button class="btn btn-deal-cancel" data-idx="${idx}" style="padding:6px 12px; background:#f3f4f6; color:#374151; border:1px solid #d1d5db; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">종료/취소</button>
            <span id="deal-status-${idx}" style="font-size:12px; font-weight:600; color:#e11d48; margin-left:auto;">${p.dealEndTime && p.dealEndTime > Date.now() ? '진행중 ⏰' : ''}</span>
          </div>
        </div>
      </div>
    `).join('');
  };

  const productCard = document.createElement('div');
  productCard.className = 'card';
  productCard.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f3f4f6; padding-bottom:16px; margin-bottom:20px;">
      <h3 style="margin:0; font-size:18px; font-weight:700; color:#111;">상품 관리</h3>
      <div style="display:flex; gap:8px;">
        <button class="btn" id="btn-add-product" style="padding:8px 16px; background:#f3f4f6; border:1px solid #d1d5db; color:#374151; font-weight:600; border-radius:6px; font-size:14px;">+ 상품 추가</button>
        <button class="btn" id="btn-save-products" style="padding:8px 16px; background:#111; border:none; color:#fff; font-weight:600; border-radius:6px; font-size:14px;">상품 일괄 적용</button>
      </div>
    </div>
    </div>
    <div id="product-list-container">
      ${renderProductList()}
    </div>
  `;

  leftPanel.appendChild(configCard);
  leftPanel.appendChild(productCard);

  // 오른쪽 (모니터링 및 채팅)
  const rightPanel = document.createElement('div');
  rightPanel.style.width = '380px';
  rightPanel.style.display = 'flex';
  rightPanel.style.flexDirection = 'column';
  rightPanel.style.gap = '16px';

  const previewUrl = window.location.origin.includes('localhost:5173') ? 'http://localhost:8080/live/' : '/live/';
  
  const previewCard = document.createElement('div');
  previewCard.className = 'card';
  previewCard.style.padding = '0';
  previewCard.style.overflow = 'hidden';
  // 9:16 모바일 비율 유지 (예: 360x640)
  previewCard.style.width = '360px';
  previewCard.style.height = '640px'; 
  previewCard.style.margin = '0 auto';
  previewCard.style.display = 'flex';
  previewCard.style.flexDirection = 'column';
  previewCard.style.borderRadius = '16px';
  previewCard.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
  previewCard.innerHTML = `
    <div style="background:#2c3e50; color:#fff; padding:12px 16px; font-weight:bold; font-size:14px; display:flex; justify-content:space-between; align-items:center;">
      <span>모바일 미리보기</span>
      <button class="btn btn-primary btn-sm" id="btn-refresh-preview" style="padding:4px 10px; font-size:12px; border-radius:4px;">새로고침</button>
    </div>
    <iframe id="live-preview-iframe" src="${previewUrl}" style="width:100%; flex:1; border:none; background:#000;"></iframe>
  `;

  const chatCard = document.createElement('div');
  chatCard.className = 'card';
  chatCard.style.flex = '1';
  chatCard.style.display = 'flex';
  chatCard.style.flexDirection = 'column';
  chatCard.innerHTML = `
    <h3 style="margin-top:0; margin-bottom:12px; font-size:16px; font-weight:600; color:#333;">관리자 채팅 발송</h3>
    <div id="admin-chat-list" style="flex:1; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:12px; overflow-y:auto; margin-bottom:12px; min-height:150px; font-size:13px;">
      <div style="color:#666; text-align:center; padding-top:40px;">실시간 채팅 내역이 여기에 표시됩니다.</div>
    </div>
    <div style="display:flex; gap:8px;">
      <input type="text" id="admin-chat-input" class="form-control" placeholder="관리자 공지 전송...">
      <button id="btn-send-chat" class="btn btn-primary">전송</button>
    </div>
  `;

  rightPanel.appendChild(previewCard);
  rightPanel.appendChild(chatCard);

  container.appendChild(leftPanel);
  container.appendChild(rightPanel);

  // 이벤트 바인딩
  setTimeout(() => {
    // 설정 변경 이벤트 (통계치만 즉시 반영, 나머지는 수동 저장)
    const bindStatInput = (id, key) => {
      document.getElementById(id).addEventListener('input', (e) => {
        stats[key] = parseInt(e.target.value) || 0;
        saveStats();
      });
    };
    
    document.getElementById('config-brandName').addEventListener('input', (e) => { config.brandName = e.target.value; saveConfig(); });
    document.getElementById('config-title').addEventListener('input', (e) => { config.title = e.target.value; saveConfig(); });
    document.getElementById('config-stream').addEventListener('input', (e) => { config.streamUrl = e.target.value; saveConfig(); });
    document.getElementById('config-liveStartTime').addEventListener('input', (e) => { config.liveStartTime = e.target.value; saveConfig(); });

    // 이미지 업로드 공통 함수 (Catbox/tmpfiles 무료 서버)
    const uploadImage = async (file, previewId, configKey) => {
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      
      const preview = document.getElementById(previewId);
      preview.style.opacity = '0.5';
      
      try {
        const res = await fetch('https://tmpfiles.org/api/v1/upload', {
          method: 'POST',
          body: formData
        });
        const json = await res.json();
        if (json.status === 'success') {
          const url = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
          config[configKey] = url;
          preview.src = url;
          saveConfig();
        } else {
          alert('이미지 업로드 실패');
        }
      } catch (err) {
        console.error(err);
        alert('이미지 업로드 에러');
      } finally {
        preview.style.opacity = '1';
      }
    };

    document.getElementById('config-logoFile').addEventListener('change', (e) => {
      uploadImage(e.target.files[0], 'logo-preview', 'logoUrl');
    });

    document.getElementById('config-thumbnailFile').addEventListener('change', (e) => {
      uploadImage(e.target.files[0], 'thumbnail-preview', 'thumbnailUrl');
    });

    document.getElementById('btn-toggle-live').addEventListener('click', (e) => {
      config.isLive = !config.isLive;
      e.target.textContent = config.isLive ? '라이브 종료하기' : '라이브 시작하기';
      e.target.style.background = config.isLive ? '#6b7280' : '#10b981';
      saveConfig();
      // 방송 상태는 즉시 DB 반영
      alert(config.isLive ? '라이브가 시작되었습니다! 모바일 시청자들에게 영상이 송출됩니다.' : '라이브가 종료되었습니다. 시청자들에게 썸네일이 노출됩니다.');
    });

    document.getElementById('btn-save-config').addEventListener('click', () => {
      config.brandName = document.getElementById('config-brandName').value;
      config.title = document.getElementById('config-title').value;
      config.streamUrl = document.getElementById('config-stream').value;
      config.liveStartTime = document.getElementById('config-liveStartTime').value;
      saveConfig();
      alert('라이브 기본설정이 저장되었습니다.');
    });


    bindStatInput('stat-viewers', 'viewers');
    bindStatInput('stat-hearts', 'hearts');
    
    document.getElementById('config-bot').addEventListener('change', (e) => {
      config.botEnabled = e.target.checked;
      saveConfig();
    });
    document.getElementById('config-show-viewers').addEventListener('change', (e) => {
      config.showViewers = e.target.checked;
      saveConfig();
    });

    // 미리보기 새로고침
    document.getElementById('btn-refresh-preview').addEventListener('click', () => {
      document.getElementById('live-preview-iframe').src = previewUrl;
    });

    // 상품 리스트 이벤트
    const bindProductEvents = () => {
      const container = document.getElementById('product-list-container');
      container.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          const field = e.target.dataset.field;
          products[idx][field] = e.target.value;
          
          // 정상가/할인가 입력 시 할인율 자동계산
          if (field === 'price' || field === 'normalPrice') {
            const normalStr = (products[idx].normalPrice || '').toString().replace(/[^0-9]/g, '');
            const priceStr = (products[idx].price || '').toString().replace(/[^0-9]/g, '');
            if (normalStr && priceStr) {
              const normal = Number(normalStr);
              const price = Number(priceStr);
              if (normal > 0 && normal >= price) {
                const rate = Math.floor(((normal - price) / normal) * 100);
                products[idx].discountRate = rate;
                const rateInput = container.querySelector(`input[data-idx="${idx}"][data-field="discountRate"]`);
                if (rateInput) rateInput.value = rate;
              }
            }
          }
          saveProducts();
        });
      });
      container.querySelectorAll('.prod-img-upload').forEach(input => {
        input.addEventListener('change', async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const idx = parseInt(e.target.dataset.idx);
          
          const formData = new FormData();
          formData.append('file', file);
          
          const previewImg = document.getElementById(`img-preview-${idx}`);
          previewImg.style.opacity = '0.5';
          
          try {
            const res = await fetch('https://tmpfiles.org/api/v1/upload', { method: 'POST', body: formData });
            const json = await res.json();
            if (json.status === 'success') {
              const url = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
              products[idx].image = url;
              previewImg.src = url;
              saveProducts();
            } else {
              alert('상품 이미지 업로드 실패');
            }
          } catch (err) {
            console.error(err);
            alert('상품 이미지 업로드 에러');
          } finally {
            previewImg.style.opacity = '1';
          }
        });
      });
      container.querySelectorAll('.btn-deal-start').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          const minInput = document.getElementById(`deal-min-${idx}`);
          const textInput = document.getElementById(`deal-text-${idx}`);
          const min = parseInt(minInput.value);
          if(min > 0) {
            products[idx].dealText = textInput ? textInput.value : '깜짝딜 종료까지';
            products[idx].dealEndTime = Date.now() + min * 60 * 1000;
            saveProducts();
            document.getElementById('product-list-container').innerHTML = renderProductList();
            bindProductEvents();
            syncAllToSheetDB();
            alert(`${min}분 깜짝딜이 시작되었습니다.`);
          }
        });
      });
      container.querySelectorAll('.btn-deal-cancel').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          products[idx].dealEndTime = 0;
          saveProducts();
          document.getElementById('product-list-container').innerHTML = renderProductList();
          bindProductEvents();
          syncAllToSheetDB();
        });
      });
      container.querySelectorAll('.btn-del-product').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.idx);
          products.splice(idx, 1);
          saveProducts();
          document.getElementById('product-list-container').innerHTML = renderProductList();
          bindProductEvents();
        });
      });
    };
    bindProductEvents();

    document.getElementById('btn-add-product').addEventListener('click', () => {
      products.push({ id: Date.now(), name: "새 상품", price: "", normalPrice: "", discountRate: 0, image: "https://via.placeholder.com/200", url: "#" });
      saveProducts();
      document.getElementById('product-list-container').innerHTML = renderProductList();
      bindProductEvents();
    });

    document.getElementById('btn-save-products').addEventListener('click', () => {
      syncAllToSheetDB();
      alert('상품 목록이 시트 DB에 일괄 적용되었습니다.');
    });

    // 관리자 채팅 전송
    const chatInput = document.getElementById('admin-chat-input');
    let isSending = false;
    const sendChat = async () => {
      const text = chatInput.value.trim();
      if (!text || isSending) return;
      
      isSending = true;
      const newChat = { id: Date.now(), name: '관리자', text: text, isAdmin: true };
      
      // Update local view (optimistic)
      const chatList = document.getElementById('admin-chat-list');
      const div = document.createElement('div');
      div.style.marginBottom = '8px';
      div.innerHTML = `<span style="font-weight:bold; color:var(--primary); margin-right:4px;">${newChat.name}:</span> ${newChat.text}`;
      chatList.appendChild(div);
      chatList.scrollTop = chatList.scrollHeight;
      
      chatInput.value = '';
      
      // SheetDB로 POST
      try {
        await fetch(`${SHEETDB_URL}?sheet=${encodeURIComponent('라이브채팅')}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [{ '시간': newChat.id.toString(), '닉네임': '관리자', '내용': text }] })
        });
      } catch(e) { console.warn('Admin chat sync failed', e); }
      finally { isSending = false; }
    };
    
    document.getElementById('btn-send-chat').addEventListener('click', sendChat);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChat();
    });

    // 실시간 채팅 수신 리스너 (iframe이나 다른 탭에서 유저가 채팅을 치면 localStorage에 저장한다고 가정)
    window.addEventListener('storage', (e) => {
      if (e.key === 'ryzin_user_chat_trigger') {
        const msg = JSON.parse(e.newValue);
        if (!msg) return;
        const chatList = document.getElementById('admin-chat-list');
        // 처음에 안내 메시지가 있으면 제거
        if (chatList.innerHTML.includes('실시간 채팅 내역')) {
          chatList.innerHTML = '';
        }
        const div = document.createElement('div');
        div.style.marginBottom = '8px';
        div.innerHTML = `<span style="font-weight:bold; color:#333; margin-right:4px;">${msg.name}:</span> ${msg.text}`;
        chatList.appendChild(div);
        chatList.scrollTop = chatList.scrollHeight;
      }
    });

  }, 0);

  return container;
}
