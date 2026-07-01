export function renderLiveStream() {
  const container = document.createElement('div');
  container.className = 'dashboard-container';
  container.style.display = 'flex';
  container.style.gap = '24px';
  container.style.padding = '24px';
  container.style.height = 'calc(100vh - 48px)';
  container.style.overflow = 'hidden';

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
        '첫상품명': products.length > 0 ? products[0].name : '',
        '상품목록': JSON.stringify(products),
        '시청자수노출': config.showViewers ? 'O' : 'X'
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
  configCard.innerHTML = `
    <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:16px; font-size:16px; font-weight:600; color:#333;">라이브 기본 설정</h3>
    <div style="display:flex; gap:12px; margin-bottom:12px;">
      <div class="form-group" style="flex:1;">
        <label class="form-label">제목 (브랜드명)</label>
        <input type="text" class="form-control" id="config-brandName" value="${config.brandName || 'Ryzin Corp'}">
      </div>
      <div class="form-group" style="flex:1;">
        <label class="form-label">부제목 (방송 제목)</label>
        <input type="text" class="form-control" id="config-title" value="${config.title}">
      </div>
    </div>
    <div style="display:flex; gap:12px; margin-bottom:12px; align-items:flex-end;">
      <div class="form-group" style="flex:1;">
        <label class="form-label">프로필 이미지 (파일 선택)</label>
        <input type="file" class="form-control" id="config-logoFile" accept="image/*" style="font-size:12px;">
      </div>
      <div style="width:48px; height:48px; border-radius:50%; overflow:hidden; border:1px solid #eee;">
        <img id="logo-preview" src="${config.logoUrl}" style="width:100%; height:100%; object-fit:cover;">
      </div>
    </div>
    <div class="form-group" style="margin-bottom:12px;">
      <label class="form-label">스트리밍 URL (m3u8)</label>
      <input type="text" class="form-control" id="config-stream" value="${config.streamUrl}">
    </div>
    <div style="display:flex; gap:12px; margin-bottom:12px;">
      <div class="form-group" style="flex:1;">
        <label class="form-label">시청자 수 뻥튀기</label>
        <input type="number" class="form-control" id="stat-viewers" value="${stats.viewers}">
      </div>
      <div class="form-group" style="flex:1;">
        <label class="form-label">하트 수 뻥튀기</label>
        <input type="number" class="form-control" id="stat-hearts" value="${stats.hearts}">
      </div>
    </div>
    <div style="display:flex; align-items:center; gap:16px;">
      <div style="display:flex; align-items:center; gap:8px;">
        <input type="checkbox" id="config-show-viewers" ${config.showViewers !== false ? 'checked' : ''}>
        <label for="config-show-viewers" style="font-size:14px;">시청자 수 노출</label>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <input type="checkbox" id="config-bot" ${config.botEnabled ? 'checked' : ''}>
        <label for="config-bot" style="font-size:14px;">채팅 봇 활성화</label>
      </div>
    </div>
    <div style="margin-top:16px; margin-bottom:24px;">
      <button id="btn-save-config" class="btn btn-primary" style="width:100%; padding:10px; font-weight:bold;">라이브 설정 일괄 적용 (저장)</button>
    </div>
  `;

  // 2. 상품 관리
  const renderProductList = () => {
    return products.map((p, idx) => `
      <div style="display:flex; gap:12px; align-items:center; background:#f9fafb; padding:12px; border-radius:8px; margin-bottom:8px; border:1px solid #e5e7eb;">
        <div style="position:relative; width:48px; height:48px; flex-shrink:0;">
          <img src="${p.image}" id="img-preview-${idx}" style="width:100%; height:100%; border-radius:4px; object-fit:cover; border:1px solid #ccc; cursor:pointer;" onclick="document.getElementById('upload-prod-${idx}').click()" title="클릭하여 이미지 업로드">
          <input type="file" id="upload-prod-${idx}" accept="image/*" style="display:none;" data-idx="${idx}" class="prod-img-upload">
        </div>
        <div style="flex:1;">
          <input type="text" class="form-control" style="font-size:13px; margin-bottom:4px; padding:4px 8px;" value="${p.name}" data-idx="${idx}" data-field="name" placeholder="상품명">
          <input type="text" class="form-control" style="font-size:12px; padding:4px 8px;" value="${p.url}" data-idx="${idx}" data-field="url" placeholder="상품 이동 URL">
        </div>
        <div>
           <input type="text" class="form-control" style="width:80px; font-size:13px; margin-bottom:4px; padding:4px 8px;" value="${p.price}" data-idx="${idx}" data-field="price" placeholder="가격">
           <input type="text" class="form-control" style="width:80px; font-size:13px; margin-bottom:4px; padding:4px 8px;" value="${p.normalPrice || ''}" data-idx="${idx}" data-field="normalPrice" placeholder="정상가">
           <input type="number" min="0" max="100" class="form-control" style="width:70px; font-size:13px; margin-bottom:4px; padding:4px 8px;" value="${p.discountRate || 0}" data-idx="${idx}" data-field="discountRate" placeholder="할인율%">
          <button class="btn btn-danger btn-sm btn-del-product" data-idx="${idx}" style="width:100%; padding:4px;">삭제</button>
        </div>
      </div>
    `).join('');
  };

  const productCard = document.createElement('div');
  productCard.className = 'card';
  productCard.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:16px;">
      <h3 style="margin:0; font-size:16px; font-weight:600; color:#333;">상품 관리</h3>
      <div>
        <button class="btn btn-primary btn-sm" id="btn-add-product" style="margin-right:8px;">+ 상품 추가</button>
        <button class="btn btn-primary btn-sm" id="btn-save-products" style="background:#e50914; border-color:#e50914;">상품 일괄 적용 (저장)</button>
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
    
    document.getElementById('btn-save-config').addEventListener('click', () => {
      config.brandName = document.getElementById('config-brandName').value;
      config.title = document.getElementById('config-title').value;
      config.streamUrl = document.getElementById('config-stream').value;
      saveConfig();
      alert('라이브 기본설정이 저장되었습니다.');
    });

    document.getElementById('config-logoFile').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      // Catbox 무료 서버로 업로드
      const formData = new FormData();
      formData.append('file', file);
      
      const btn = e.target;
      btn.disabled = true;
      document.getElementById('logo-preview').style.opacity = '0.5';
      
      try {
        const res = await fetch('https://tmpfiles.org/api/v1/upload', {
          method: 'POST',
          body: formData
        });
        const json = await res.json();
        if (json.status === 'success') {
          // tmpfiles.org/ URL을 tmpfiles.org/dl/ 로 변경해야 직접 이미지가 보입니다
          const url = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
          config.logoUrl = url;
          document.getElementById('logo-preview').src = url;
          saveConfig();
        } else {
          alert('이미지 업로드 실패: ' + JSON.stringify(json));
        }
      } catch (err) {
        console.error(err);
        alert('이미지 업로드 에러');
      } finally {
        btn.disabled = false;
        document.getElementById('logo-preview').style.opacity = '1';
      }
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
        // 구두점 실시간 자동화
        if (input.dataset.field === 'price' || input.dataset.field === 'normalPrice') {
          input.addEventListener('input', (e) => {
            let val = e.target.value.replace(/[^0-9]/g, '');
            if (val) {
              e.target.value = Number(val).toLocaleString('ko-KR');
            }
          });
        }

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
                const rate = Math.round(((normal - price) / normal) * 100);
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
      products.push({ id: Date.now(), name: "새 상품", price: "0원", normalPrice: "", discountRate: 0, image: "https://via.placeholder.com/200", url: "#" });
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
