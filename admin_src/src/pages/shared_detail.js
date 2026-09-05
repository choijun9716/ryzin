// ===== Shared Detail Page for Brand Partners =====
const getDb = () => window.supabaseClient || null;

export function renderSharedDetail(params) {
  const container = document.createElement('div');
  container.style.cssText = 'min-height:100vh; background:#f8fafc; padding:32px 20px 100px; max-width:960px; margin:0 auto; font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; box-sizing:border-box;';

  const liveId = params.id;
  let liveData = null;
  let products = [];
  let isSaving = false;

  const showToast = (msg) => {
    let t = document.getElementById('shared-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'shared-toast';
      t.style.cssText = 'position:fixed; bottom:30px; right:30px; background:#0f172a; color:#ffffff; padding:12px 20px; border-radius:10px; font-size:13.5px; font-weight:700; z-index:99999; box-shadow:0 10px 25px rgba(0,0,0,0.25); transition:opacity 0.2s;';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t.timer);
    t.timer = setTimeout(() => { t.style.opacity = '0'; }, 2400);
  };

  // Cloudinary 직접 서명 업로드 함수
  const uploadToCloudinaryDirect = async (fileObj) => {
    const CLOUD_NAME = 'dcschlkqy';
    const API_KEY = '164668247829219';
    const API_SECRET = '3viWG82ApYRVKmovy--32tNhsCw';
    const folder = 'ryzin_products';
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
  };

  // 1. Supabase에서 라이브 정보 및 상품 로드
  async function loadData() {
    container.innerHTML = `
      <div style="text-align:center; padding:120px 20px;">
        <div style="font-size:16px; font-weight:700; color:#475569; margin-bottom:8px;">데이터를 불러오는 중입니다...</div>
        <div style="font-size:13px; color:#94a3b8;">잠시만 기다려 주세요.</div>
      </div>
    `;

    try {
      let row = null;
      const db = getDb();
      if (db) {
        const { data, error } = await db
          .from('live_control')
          .select('*')
          .eq('live_id', liveId)
          .maybeSingle();
        if (error) throw error;
        row = data;
      }

      // Supabase에 데이터가 없을 경우 localStorage 폴백
      if (!row) {
        const localCfg = JSON.parse(localStorage.getItem(`ryzin_config_${liveId}`) || '{}');
        const localProds = JSON.parse(localStorage.getItem(`ryzin_products_${liveId}`) || '[]');
        row = {
          live_id: liveId,
          title: localCfg.brandName || '라이브 방송',
          subtitle: localCfg.title || '',
          products: localProds
        };
      }

      liveData = row || {};
      let prodList = row.products;
      if (typeof prodList === 'string') {
        try { prodList = JSON.parse(prodList); } catch (e) { prodList = []; }
      }
      products = Array.isArray(prodList) ? prodList : [];

      renderUI();
    } catch (err) {
      console.error('Shared detail load error:', err);
      container.innerHTML = `
        <div style="text-align:center; padding:100px 20px; background:#ffffff; border-radius:16px; border:1px solid #e2e8f0;">
          <h2 style="font-size:18px; font-weight:800; color:#ef4444; margin-bottom:8px;">정보를 불러오지 못했습니다</h2>
          <p style="font-size:13.5px; color:#64748b; margin-bottom:20px;">존재하지 않는 라이브 ID이거나 네트워크 오류입니다.</p>
          <button id="btn-retry-load" style="padding:10px 24px; background:#0f172a; color:#ffffff; border:none; border-radius:10px; font-weight:700; cursor:pointer;">다시 시도</button>
        </div>
      `;
      container.querySelector('#btn-retry-load')?.addEventListener('click', loadData);
    }
  }

  // 2. 메인 UI 렌더링
  function renderUI() {
    const brandName = liveData.title || liveData.brandName || '라이브 방송';
    const liveSubtitle = liveData.subtitle || '상품 상세페이지 등록';

    container.innerHTML = `
      <!-- 상단 프리미엄 헤더 -->
      <div style="background:#0f172a; color:#ffffff; border-radius:16px; padding:28px 32px; margin-bottom:24px; box-shadow:0 4px 20px rgba(0,0,0,0.08); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <span style="display:inline-block; font-size:11px; font-weight:800; color:#38bdf8; background:rgba(56,189,248,0.12); padding:3px 10px; border-radius:6px; margin-bottom:8px; letter-spacing:0.04em;">브랜드사 전용 상세페이지 기재 링크</span>
          <h1 style="font-size:22px; font-weight:800; margin:0 0 6px; letter-spacing:-0.4px;">[${brandName}] ${liveSubtitle}</h1>
          <p style="font-size:13px; color:#94a3b8; margin:0;">각 상품별 상세페이지 이미지 및 애니메이션 GIF를 직접 여러 장 업로드하고 순서를 지정할 수 있습니다.</p>
        </div>
        <div style="text-align:right;">
          <span style="display:inline-block; font-size:12px; font-weight:700; color:#cbd5e1; background:rgba(255,255,255,0.08); padding:6px 14px; border-radius:8px; border:1px solid rgba(255,255,255,0.12);">
            등록 상품: ${products.length}개
          </span>
        </div>
      </div>

      <!-- 상품 목록 컨테이너 -->
      <div id="shared-products-list" style="display:flex; flex-direction:column; gap:16px;">
        ${renderProductCards()}
      </div>

      <!-- 하단 고정 플로팅 액션 바 -->
      <div style="position:fixed; bottom:0; left:0; width:100%; background:#ffffff; border-top:1.5px solid #e2e8f0; padding:14px 24px; display:flex; justify-content:center; box-shadow:0 -6px 20px rgba(0,0,0,0.06); z-index:9999;">
        <div style="max-width:960px; width:100%; display:flex; justify-content:space-between; align-items:center; gap:16px;">
          <span style="font-size:13px; color:#64748b; font-weight:600;">작업 완료 후 반드시 우측 [상세페이지 저장 및 반영] 버튼을 눌러주세요.</span>
          <button type="button" id="btn-shared-save" style="padding:12px 36px; background:#0f172a; color:#ffffff; border:none; border-radius:10px; font-size:14.5px; font-weight:800; cursor:pointer; box-shadow:0 4px 14px rgba(15,23,42,0.25); transition:transform 0.15s ease, background 0.2s;">
            상세페이지 저장 및 반영
          </button>
        </div>
      </div>
    `;

    bindEvents();
  }

  // 3. 상품 카드 HTML 렌더링
  function renderProductCards() {
    if (products.length === 0) {
      return `
        <div style="background:#ffffff; border-radius:14px; padding:60px 20px; text-align:center; border:1.5px solid #e2e8f0;">
          <div style="font-size:16px; font-weight:700; color:#475569; margin-bottom:6px;">등록된 상품이 없습니다</div>
          <div style="font-size:13px; color:#94a3b8;">관리자가 방송에 상품을 먼저 등록해야 상세페이지를 추가할 수 있습니다.</div>
        </div>
      `;
    }

    return products.map((p, idx) => {
      const detailImages = p.detailImage ? String(p.detailImage).split(',').map(s => s.trim()).filter(Boolean) : [];
      const priceFormatted = p.price ? Number(p.price.toString().replace(/[^0-9]/g, '')).toLocaleString() + '원' : '가격 미정';

      return `
        <div class="shared-prod-card" style="background:#ffffff; border-radius:14px; border:1.5px solid #e2e8f0; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
          <!-- 상품 헤더 정보 -->
          <div style="display:flex; align-items:center; gap:14px; padding-bottom:14px; border-bottom:1px solid #f1f5f9;">
            <div style="width:60px; height:60px; border-radius:10px; overflow:hidden; background:#f1f5f9; border:1px solid #e2e8f0; flex-shrink:0;">
              <img src="${p.image || 'https://via.placeholder.com/60'}" style="width:100%; height:100%; object-fit:cover; display:block;">
            </div>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                <span style="font-size:11px; font-weight:800; background:#f1f5f9; color:#475569; padding:2px 7px; border-radius:4px;">상품 #${idx + 1}</span>
                <span style="font-size:14px; font-weight:800; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.name || '무명 상품'}</span>
              </div>
              <div style="font-size:13px; font-weight:700; color:#2563eb;">
                ${priceFormatted}
                ${p.normalPrice ? `<span style="font-size:11.5px; color:#94a3b8; text-decoration:line-through; font-weight:500; margin-left:6px;">${Number(p.normalPrice.toString().replace(/[^0-9]/g, '')).toLocaleString()}원</span>` : ''}
              </div>
            </div>
          </div>

          <!-- 상세 이미지 / GIF 관리 영역 -->
          <div style="display:flex; flex-direction:column; gap:10px; margin-top:14px; background:#f8fafc; padding:14px; border-radius:12px; border:1px solid #e2e8f0;">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:12.5px; font-weight:800; color:#0f172a;">상세 이미지 / GIF (순서대로 렌더링)</span>
                <span style="font-size:11px; font-weight:700; color:#475569; background:#e2e8f0; padding:2px 8px; border-radius:6px;">총 ${detailImages.length}장</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px;">
                <input type="file" id="shared-upload-${idx}" accept="image/*,.gif" multiple style="display:none;" data-idx="${idx}" class="shared-detail-upload">
                <button type="button" id="btn-shared-upload-${idx}" class="btn-trigger-upload" data-idx="${idx}" style="padding:6px 14px; font-size:12px; font-weight:700; background:#0f172a; color:#ffffff; border:none; border-radius:8px; cursor:pointer; white-space:nowrap;">
                  + 이미지/GIF 다중 추가
                </button>
                ${detailImages.length > 0 ? `
                  <button type="button" class="btn-shared-del-all" data-idx="${idx}" style="background:#fee2e2; border:1px solid #fecaca; color:#ef4444; font-size:11.5px; font-weight:700; cursor:pointer; padding:5px 10px; border-radius:6px;">전체 삭제</button>
                ` : ''}
              </div>
            </div>

            ${detailImages.length > 0 ? `
              <div style="display:flex; gap:10px; overflow-x:auto; padding:6px 0; -webkit-overflow-scrolling:touch;">
                ${detailImages.map((imgUrl, imgIdx) => `
                  <div style="position:relative; width:94px; flex-shrink:0; background:#ffffff; border:1.5px solid #cbd5e1; border-radius:10px; padding:6px; display:flex; flex-direction:column; gap:6px; box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                    <div style="position:relative; width:100%; aspect-ratio:1/1; border-radius:6px; overflow:hidden; background:#f1f5f9; border:1px solid #e2e8f0;">
                      <span style="position:absolute; top:2px; left:2px; background:rgba(15,23,42,0.85); color:#ffffff; font-size:10px; font-weight:800; padding:1px 5px; border-radius:4px; z-index:2;">${imgIdx + 1}</span>
                      <a href="${imgUrl}" target="_blank" title="클릭하여 원본 보기">
                        <img src="${imgUrl}" style="width:100%; height:100%; object-fit:cover; display:block;">
                      </a>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-between; gap:2px;">
                      <button type="button" class="btn-shared-move-left" data-prod-idx="${idx}" data-img-idx="${imgIdx}" style="flex:1; padding:3px 0; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:4px; font-size:11px; cursor:pointer;" ${imgIdx === 0 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''} title="앞으로 이동">◀</button>
                      <button type="button" class="btn-shared-move-right" data-prod-idx="${idx}" data-img-idx="${imgIdx}" style="flex:1; padding:3px 0; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:4px; font-size:11px; cursor:pointer;" ${imgIdx === detailImages.length - 1 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''} title="뒤로 이동">▶</button>
                      <button type="button" class="btn-shared-del-single" data-prod-idx="${idx}" data-img-idx="${imgIdx}" style="flex:1; padding:3px 0; background:#fee2e2; border:1px solid #fca5a5; color:#ef4444; border-radius:4px; font-size:11px; font-weight:800; cursor:pointer;" title="이 이미지 삭제">✕</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div style="font-size:12px; color:#94a3b8; padding:10px; text-align:center; background:#ffffff; border:1px dashed #cbd5e1; border-radius:8px;">
                등록된 상세페이지 이미지가 없습니다. [+ 이미지/GIF 다중 추가]를 눌러 순서대로 올릴 파일들을 선택하세요.
              </div>
            `}

            <input type="text" class="shared-url-input" style="width:100%; padding:8px 12px; border:1.5px solid #e2e8f0; border-radius:8px; font-size:12px; outline:none; background:#ffffff; box-sizing:border-box;" value="${p.detailImage || ''}" data-idx="${idx}" placeholder="이미지 URL 직접 편집 (쉼표로 구분하여 여러 장 순서대로 지정 가능)">
          </div>
        </div>
      `;
    }).join('');
  }

  // 4. 이벤트 바인딩
  function bindEvents() {
    const listEl = container.querySelector('#shared-products-list');
    if (!listEl) return;

    // 파일 선택 트리거
    listEl.querySelectorAll('.btn-trigger-upload').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.idx;
        const fileInput = document.getElementById(`shared-upload-${idx}`);
        if (fileInput) fileInput.click();
      });
    });

    // 다중 파일 업로드 처리
    listEl.querySelectorAll('.shared-detail-upload').forEach(input => {
      input.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        const idx = parseInt(e.target.dataset.idx, 10);
        const uploadBtn = document.getElementById(`btn-shared-upload-${idx}`);
        const origText = uploadBtn ? uploadBtn.textContent : '+ 이미지/GIF 다중 추가';
        if (uploadBtn) {
          uploadBtn.disabled = true;
          uploadBtn.style.opacity = '0.7';
        }

        try {
          const uploadedUrls = [];
          const total = files.length;

          for (let i = 0; i < total; i++) {
            const file = files[i];
            if (uploadBtn) uploadBtn.textContent = `업로드 중 (${i + 1}/${total})...`;

            let fileUrl = null;
            try {
              fileUrl = await uploadToCloudinaryDirect(file);
            } catch (errDirect) {
              console.warn(`[Cloudinary Direct Fail] 파일 ${i + 1} 폴백 시도:`, errDirect);
            }

            if (!fileUrl) {
              const reader = new FileReader();
              const dataUrl = await new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              });

              const endpoints = ['/api/upload-cloudinary', 'https://ryzincorp.com/api/upload-cloudinary'];
              for (const ep of endpoints) {
                try {
                  const res = await fetch(ep, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: dataUrl })
                  });
                  if (res.ok) {
                    const data = await res.json();
                    if (data && data.url) {
                      fileUrl = data.url;
                      break;
                    }
                  }
                } catch (epErr) { }
              }
            }

            if (fileUrl) {
              uploadedUrls.push(fileUrl);
            }
          }

          if (uploadedUrls.length === 0) {
            throw new Error('이미지 업로드에 실패했습니다. 파일 형식과 용량을 확인해 주세요.');
          }

          const current = products[idx].detailImage ? String(products[idx].detailImage).trim() : '';
          const existingList = current ? current.split(',').map(s => s.trim()).filter(Boolean) : [];
          products[idx].detailImage = [...existingList, ...uploadedUrls].join(', ');

          listEl.innerHTML = renderProductCards();
          bindEvents();
          showToast(`${uploadedUrls.length}장의 이미지가 순서대로 추가되었습니다.`);
        } catch (err) {
          console.error('Shared detail upload error:', err);
          alert('업로드 실패: ' + err.message);
        } finally {
          if (uploadBtn) {
            uploadBtn.disabled = false;
            uploadBtn.textContent = origText;
            uploadBtn.style.opacity = '1';
          }
        }
      });
    });

    // 좌측(앞) 이동
    listEl.querySelectorAll('.btn-shared-move-left').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodIdx = parseInt(e.currentTarget.dataset.prodIdx, 10);
        const imgIdx = parseInt(e.currentTarget.dataset.imgIdx, 10);
        if (!products[prodIdx]) return;
        const current = products[prodIdx].detailImage ? String(products[prodIdx].detailImage).split(',').map(s => s.trim()).filter(Boolean) : [];
        if (imgIdx > 0 && imgIdx < current.length) {
          const temp = current[imgIdx - 1];
          current[imgIdx - 1] = current[imgIdx];
          current[imgIdx] = temp;
          products[prodIdx].detailImage = current.join(', ');
          listEl.innerHTML = renderProductCards();
          bindEvents();
          showToast('이미지 순서가 변경되었습니다.');
        }
      });
    });

    // 우측(뒤) 이동
    listEl.querySelectorAll('.btn-shared-move-right').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodIdx = parseInt(e.currentTarget.dataset.prodIdx, 10);
        const imgIdx = parseInt(e.currentTarget.dataset.imgIdx, 10);
        if (!products[prodIdx]) return;
        const current = products[prodIdx].detailImage ? String(products[prodIdx].detailImage).split(',').map(s => s.trim()).filter(Boolean) : [];
        if (imgIdx >= 0 && imgIdx < current.length - 1) {
          const temp = current[imgIdx + 1];
          current[imgIdx + 1] = current[imgIdx];
          current[imgIdx] = temp;
          products[prodIdx].detailImage = current.join(', ');
          listEl.innerHTML = renderProductCards();
          bindEvents();
          showToast('이미지 순서가 변경되었습니다.');
        }
      });
    });

    // 단일 삭제
    listEl.querySelectorAll('.btn-shared-del-single').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodIdx = parseInt(e.currentTarget.dataset.prodIdx, 10);
        const imgIdx = parseInt(e.currentTarget.dataset.imgIdx, 10);
        if (!products[prodIdx]) return;
        const current = products[prodIdx].detailImage ? String(products[prodIdx].detailImage).split(',').map(s => s.trim()).filter(Boolean) : [];
        if (imgIdx >= 0 && imgIdx < current.length) {
          current.splice(imgIdx, 1);
          products[prodIdx].detailImage = current.join(', ');
          listEl.innerHTML = renderProductCards();
          bindEvents();
          showToast('선택한 이미지가 삭제되었습니다.');
        }
      });
    });

    // 전체 삭제
    listEl.querySelectorAll('.btn-shared-del-all').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodIdx = parseInt(e.currentTarget.dataset.idx, 10);
        if (!products[prodIdx]) return;
        if (confirm('등록된 모든 상세페이지 이미지를 삭제하시겠습니까?')) {
          products[prodIdx].detailImage = '';
          listEl.innerHTML = renderProductCards();
          bindEvents();
          showToast('상세 이미지가 전체 삭제되었습니다.');
        }
      });
    });

    // URL 직접 입력 필드
    listEl.querySelectorAll('.shared-url-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        if (products[idx]) {
          products[idx].detailImage = e.target.value.trim();
          listEl.innerHTML = renderProductCards();
          bindEvents();
        }
      });
    });

    // 하단 저장 버튼
    const saveBtn = container.querySelector('#btn-shared-save');
    if (saveBtn) {
      saveBtn.onclick = async () => {
        if (isSaving) return;
        isSaving = true;
        saveBtn.disabled = true;
        saveBtn.textContent = '저장 중...';
        saveBtn.style.opacity = '0.7';

        try {
          // 1. localStorage 저장
          localStorage.setItem(`ryzin_products_${liveId}`, JSON.stringify(products));

          // 2. Supabase live_control 업데이트
          const db = getDb();
          if (db) {
            const { error } = await db
              .from('live_control')
              .update({
                products: products,
                updated_at: new Date().toISOString()
              })
              .eq('live_id', liveId);
            if (error) throw error;
          }

          showToast('상세페이지가 성공적으로 저장 및 방송에 반영되었습니다.');
          setTimeout(() => alert('상세페이지가 저장되었습니다. 라이브 화면에 즉시 반영됩니다.'), 50);
        } catch (err) {
          console.error('Save failed:', err);
          alert('저장 처리 중 오류가 발생했습니다: ' + err.message);
        } finally {
          isSaving = false;
          saveBtn.disabled = false;
          saveBtn.textContent = '상세페이지 저장 및 반영';
          saveBtn.style.opacity = '1';
        }
      };
    }
  }

  loadData();
  return container;
}
