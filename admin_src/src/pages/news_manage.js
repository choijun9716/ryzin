// ===== 뉴스룸 관리 페이지 (보도자료 등록/수정/삭제) =====
import { store } from '../data/store.js';
import { showSuccess, showError } from '../components/toast.js';
import { confirmDialog, openModal, closeModal } from '../components/modal.js';

const SUPABASE_URL = 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';
const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

export function renderNewsManage() {
  const container = document.createElement('div');

  // 로컬스토리지 & Supabase DB 이중 연동
  const getNewsData = async () => {
    try {
      const spRes = await fetch(`${SUPABASE_URL}/rest/v1/news?select=*`, { headers }).catch(() => null);
      if (spRes && spRes.ok) {
        const spData = await spRes.json();
        if (spData && spData.length > 0) return spData;
      }
    } catch (e) {}

    try {
      const cached = localStorage.getItem('ryzin_news_data');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return [
      {
        id: "news-001",
        category: "언론보도",
        categoryEn: "PRESS",
        title: "라이진 스튜디오, 2026 하반기 초고화질 미디어 융합 라이브 솔루션 공식 출시",
        date: "2026.07.28",
        publisher: "파이낸셜뉴스",
        summary: "라이브커머스 전문 미디어 기업 라이진(RYZIN)이 방송 기술과 브랜드 스토리텔링을 결합한 차세대 미디어 융합 솔루션을 공개했습니다.",
        image: "assets/001.jpg",
        url: "https://blog.naver.com/ryzin_live",
        content: "미디어 커머스 기업 라이진 스튜디오(RYZIN Studio)가 브랜드사의 미디어 몰입감을 극대화하는 '2026 초고화질 미디어 융합 라이브 솔루션'을 정식 출시했다고 28일 밝혔다.<br><br>라이진 스튜디오는 단순 상품 판매 방송을 넘어 시네마틱 카메라와 4K 방송용 조명 시스템을 도입하여 감도 높은 비주얼 퍼포먼스를 구축해왔다. 이번 솔루션을 통해 시청 몰입도 40% 증가 및 평균 전환율 2.5배 상승 성과를 거두었다."
      }
    ];
  };

  const saveNewsData = async (newsList, itemToSync = null, action = 'upsert') => {
    localStorage.setItem('ryzin_news_data', JSON.stringify(newsList));
    
    // Supabase DB 비동기 백그라운드 전송
    if (itemToSync) {
      try {
        if (action === 'delete') {
          const res = await fetch(`${SUPABASE_URL}/rest/v1/news?id=eq.${itemToSync.id}`, {
            method: 'DELETE',
            headers
          });
          if (!res.ok) console.warn('Supabase 삭제 응답 상태:', res.status);
        } else {
          const res = await fetch(`${SUPABASE_URL}/rest/v1/news`, {
            method: 'POST',
            headers: { ...headers, 'Prefer': 'resolution=merge-duplicates' },
            body: JSON.stringify(itemToSync)
          });
          if (!res.ok) console.warn('Supabase 저장 응답 상태:', res.status);
        }
      } catch (err) {
        console.warn('Supabase DB 동기화 오류 (테이블 미생성 시 발생 가능):', err);
      }
    }
  };

  let newsList = [];

  async function render() {
    newsList = await getNewsData();
    container.innerHTML = `
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">뉴스룸 관리</h1>
            <p class="page-description">홈페이지 뉴스룸 보도자료 및 소식 등록, 수정, 삭제 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <button class="btn btn-primary" id="btn-add-news" style="display: inline-flex; align-items: center; gap: 6px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            새 보도자료 등록
          </button>
        </div>
      </div>

      <div class="page-body">
        <div class="card">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <h3>보도자료 내역</h3>
              <span class="badge badge-secondary" id="news-count-badge">${newsList.length}개 항목</span>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="text-center" style="width: 60px;">번호</th>
                  <th style="width: 100px;">카테고리</th>
                  <th>제목</th>
                  <th style="width: 120px;">언론사</th>
                  <th class="text-center" style="width: 110px;">등록일자</th>
                  <th class="text-center" style="width: 140px;">관리</th>
                </tr>
              </thead>
              <tbody id="news-tbody">
                ${newsList.length === 0 ? '<tr><td colspan="6" class="text-center" style="padding:40px; color:var(--text-tertiary);">등록된 뉴스룸 보도자료가 없습니다.</td></tr>' : ''}
                ${newsList.map((item, index) => `
                  <tr>
                    <td class="text-center" style="font-weight:600; color:var(--text-tertiary);">${index + 1}</td>
                    <td><span class="badge badge-primary">${item.category || '언론보도'}</span></td>
                    <td style="font-weight: 600; color: var(--text-primary);">${item.title}</td>
                    <td style="color: var(--text-secondary);">${item.publisher || '-'}</td>
                    <td class="text-center" style="color: var(--text-secondary); font-size: 13px;">${item.date || '-'}</td>
                    <td class="text-center">
                      <div style="display:flex; gap: 6px; justify-content: center;">
                        <button class="btn btn-xs btn-secondary btn-edit-news" data-id="${item.id}">수정</button>
                        <button class="btn btn-xs btn-danger btn-delete-news" data-id="${item.id}">삭제</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // 등록 버튼 이벤트
    container.querySelector('#btn-add-news')?.addEventListener('click', () => {
      openNewsModal();
    });

    // 수정 버튼 이벤트
    container.querySelectorAll('.btn-edit-news').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const item = newsList.find(n => n.id === id);
        if (item) openNewsModal(item);
      });
    });

    // 삭제 버튼 이벤트
    container.querySelectorAll('.btn-delete-news').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const targetItem = newsList.find(n => n.id === id);
        confirmDialog('정말 이 보도자료를 삭제하시겠습니까?', async () => {
          newsList = newsList.filter(n => n.id !== id);
          await saveNewsData(newsList, targetItem, 'delete');
          showSuccess('보도자료가 삭제되었습니다.');
          render();
        });
      });
    });
  }

  // 보도자료 작성/수정 모달
  function openNewsModal(item = null) {
    const isEdit = !!item;
    const modalContent = document.createElement('div');
    modalContent.innerHTML = `
      <div style="padding: var(--space-4);">
        <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">
          ${isEdit ? '보도자료 수정' : '새 보도자료 등록'}
        </h2>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="form-group">
            <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">제목 *</label>
            <input type="text" id="news-form-title" class="input" value="${item ? item.title : ''}" placeholder="보도자료 제목을 입력하세요" style="width: 100%;">
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">카테고리</label>
              <select id="news-form-category" class="input" style="width: 100%;">
                <option value="언론보도" ${item && item.category === '언론보도' ? 'selected' : ''}>언론보도</option>
                <option value="트렌드&인사이트" ${item && item.category === '트렌드&인사이트' ? 'selected' : ''}>트렌드&인사이트</option>
                <option value="회사소식" ${item && item.category === '회사소식' ? 'selected' : ''}>회사소식</option>
              </select>
            </div>
            <div class="form-group">
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">언론사/출처</label>
              <input type="text" id="news-form-publisher" class="input" value="${item ? item.publisher || '' : ''}" placeholder="예: 파이낸셜뉴스, RYZIN PR" style="width: 100%;">
            </div>
            <div class="form-group">
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">보도/등록 일자</label>
              <input type="text" id="news-form-date" class="input" value="${item ? item.date || '' : new Date().toISOString().slice(0,10).replace(/-/g,'.')}" placeholder="2026.08.03" style="width: 100%;">
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px; align-items: end;">
            <div class="form-group">
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">대표 이미지 URL / 파일 업로드</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="news-form-image" class="input" value="${item ? item.image || '' : 'assets/001.jpg'}" placeholder="assets/001.jpg 또는 이미지 링크" style="flex: 1;">
                <input type="file" id="news-form-file-input" accept="image/*" style="display: none;">
                <button class="btn btn-secondary btn-sm" id="btn-trigger-news-file" type="button" style="white-space: nowrap;">📁 파일 선택</button>
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">사진 위아래 세밀 조정 (<span id="val-pos">${item && item.imagePosition ? item.imagePosition : '50%'}</span>)</label>
              <div style="display: flex; align-items: center; gap: 8px; height: 38px;">
                <input type="range" id="news-form-image-position" min="0" max="100" value="${item && item.imagePosition ? parseInt(item.imagePosition) : 50}" style="width: 100%; accent-color: var(--primary);">
              </div>
            </div>
          </div>
          <span style="font-size: 11px; color: var(--text-tertiary); margin-top: -6px; display: block;">* 한글 파일명(기사사진.jpg 등)도 영문 안전 파일명으로 자동 변환되어 정상 등록됩니다.</span>
          
          <!-- 실시간 크롭 미리보기 컨테이너 -->
          <div class="form-group">
            <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">구도 미리보기 (실시간 반영)</label>
            <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-color); background: #000; position: relative;">
              <img id="news-form-preview-img" src="${item ? item.image || 'assets/001.jpg' : 'assets/001.jpg'}" style="width: 100%; height: 100%; object-fit: cover; object-position: center ${item && item.imagePosition ? item.imagePosition : '50%'}; transition: none;">
            </div>
          </div>
          <div class="form-group">
            <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">원문 기사 URL (링크)</label>
            <input type="text" id="news-form-url" class="input" value="${item ? item.url || '' : ''}" placeholder="https://..." style="width: 100%;">
          </div>
          <div class="form-group">
            <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">한줄 요약 (서머리)</label>
            <input type="text" id="news-form-summary" class="input" value="${item ? item.summary || '' : ''}" placeholder="기사 카드에 보일 핵심 요약 내용" style="width: 100%;">
          </div>
          <div class="form-group">
            <label style="font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">상세 본문 내용 (HTML/줄바꿈 가능)</label>
            <textarea id="news-form-content" class="input" rows="6" placeholder="기사 상세 본문 내용을 입력하세요." style="width: 100%; font-family: inherit;">${item ? item.content || '' : ''}</textarea>
          </div>
        </div>
      </div>
    `;

    const footer = document.createElement('div');
    footer.style.cssText = 'display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%; margin-top: 16px;';
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = '취소';
    cancelBtn.addEventListener('click', closeModal);

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-primary';
    saveBtn.textContent = '저장';

    saveBtn.addEventListener('click', () => {
      const title = document.getElementById('news-form-title').value.trim();
      const category = document.getElementById('news-form-category').value;
      const publisher = document.getElementById('news-form-publisher').value.trim();
      const date = document.getElementById('news-form-date').value.trim();
      const image = document.getElementById('news-form-image').value.trim();
      const imagePosition = document.getElementById('news-form-image-position').value + '%';
      const url = document.getElementById('news-form-url').value.trim();
      const summary = document.getElementById('news-form-summary').value.trim();
      const content = document.getElementById('news-form-content').value.trim();

      if (!title) {
        showError('보도자료 제목을 입력해주세요.');
        return;
      }

      let targetItem = null;
      if (isEdit) {
        const idx = newsList.findIndex(n => n.id === item.id);
        if (idx !== -1) {
          newsList[idx] = { ...newsList[idx], title, category, publisher, date, image, imagePosition, url, summary, content };
          targetItem = newsList[idx];
        }
      } else {
        targetItem = {
          id: `news-${Date.now()}`,
          title,
          category,
          publisher,
          date,
          image: image || 'assets/001.jpg',
          imagePosition,
          url,
          summary,
          content
        };
        newsList.unshift(targetItem);
      }

      saveNewsData(newsList, targetItem, 'upsert');
      showSuccess(isEdit ? '보도자료가 수정되었습니다.' : '새 보도자료가 등록되었습니다.');
      closeModal();
      render();
    });

    // 파일 선택 버튼 업로드 이벤트 및 한글 파일명 안전 변환
    setTimeout(() => {
      const fileInput = document.getElementById('news-form-file-input');
      const triggerBtn = document.getElementById('btn-trigger-news-file');
      const imgUrlInput = document.getElementById('news-form-image');
      const slider = document.getElementById('news-form-image-position');
      const valLabel = document.getElementById('val-pos');
      const previewImg = document.getElementById('news-form-preview-img');

      // 1. 슬라이더 드래그 시 실시간 크롭 미리보기 업데이트
      if (slider && valLabel && previewImg) {
        slider.addEventListener('input', (e) => {
          const val = e.target.value + '%';
          valLabel.textContent = val;
          previewImg.style.objectPosition = `center ${val}`;
        });
      }

      // 2. 이미지 URL 직접 변경 시 미리보기 이미지 업데이트
      if (imgUrlInput && previewImg) {
        imgUrlInput.addEventListener('input', (e) => {
          previewImg.src = e.target.value || 'assets/001.jpg';
        });
      }

      if (triggerBtn && fileInput) {
        triggerBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          // 한글/NFD 파일명 안전 자동 변환 (e.g. 기사사진.jpg -> news_1785602931_a8f9.jpg)
          const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
          const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
          const safeName = `news_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${ext}`;

          // 버튼 비활성화 및 로딩 표시
          triggerBtn.disabled = true;
          triggerBtn.textContent = '업로드 중...';

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
              imgUrlInput.value = publicUrl;
              showSuccess(`이미지가 안전하게 업로드되어 연동되었습니다!`);
            } else {
              console.warn('Storage Upload Status:', uploadRes.status);
              // Fallback: FileReader Base64로 세팅
              const reader = new FileReader();
              reader.onload = (event) => {
                imgUrlInput.value = event.target.result;
                showSuccess(`'${file.name}' 로컬 변환되어 등록되었습니다.`);
              };
              reader.readAsDataURL(file);
            }
          } catch (err) {
            console.warn('Storage Upload Catch:', err);
            const reader = new FileReader();
            reader.onload = (event) => {
              imgUrlInput.value = event.target.result;
              showSuccess(`'${file.name}' 로컬 변환되어 등록되었습니다.`);
            };
            reader.readAsDataURL(file);
          } finally {
            triggerBtn.disabled = false;
            triggerBtn.textContent = '📁 파일 선택';
          }
        });
      }
    }, 0);

    footer.appendChild(cancelBtn);
    footer.appendChild(saveBtn);

    openModal({
      title: isEdit ? '뉴스룸 보도자료 수정' : '새 보도자료 등록',
      content: modalContent,
      footer
    });
  }

  render();
  return container;
}
