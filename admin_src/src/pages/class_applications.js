// ===== 라이진클래스 수강신청 및 설문 빌더 관리 페이지 =====
import { store } from '../data/store.js';
import { openModal, closeModal, confirmDialog } from '../components/modal.js';
import { showSuccess, showError } from '../components/toast.js';

// Supabase 접속 정보 (Storage 업로드용)
const SUPABASE_URL = 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';

export function renderClassApplications() {
  const container = document.createElement('div');
  let activeTab = 'list'; // 'list' (신청 현황), 'survey' (설문 설정)

  // 날짜 포맷 함수
  function formatDate(dateStr) {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const hh = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    } catch (e) {
      return dateStr;
    }
  }

  function render() {
    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">원데이 클래스 관리</h1>
          <p class="page-description">클래스 수강 신청 현황을 확인하고 설문 문항 및 배너 이미지를 실시간으로 편집합니다.</p>
        </div>
        <div class="page-header-right" style="display: flex; gap: var(--space-2);">
          <button class="btn btn-secondary" id="btn-change-banner">상세 이미지 변경</button>
          <input type="file" id="banner-file-input" accept="image/*" style="display: none;">
          <button class="btn btn-secondary" id="btn-refresh-class">새로고침</button>
        </div>
      </div>

      <!-- 탭 메뉴 -->
      <div class="card" style="margin-bottom: var(--space-4); padding: 0;">
        <div style="display: flex; border-bottom: 1px solid var(--border);">
          <button class="tab-btn ${activeTab === 'list' ? 'active' : ''}" data-tab="list" style="flex: 1; padding: 14px; background: none; border: none; font-weight: 700; border-bottom: 2px solid ${activeTab === 'list' ? 'var(--primary)' : 'transparent'}; color: ${activeTab === 'list' ? 'var(--primary)' : 'var(--text-secondary)'}; cursor: pointer; font-size: 14px;">
            신청 현황 목록
          </button>
          <button class="tab-btn ${activeTab === 'survey' ? 'active' : ''}" data-tab="survey" style="flex: 1; padding: 14px; background: none; border: none; font-weight: 700; border-bottom: 2px solid ${activeTab === 'survey' ? 'var(--primary)' : 'transparent'}; color: ${activeTab === 'survey' ? 'var(--primary)' : 'var(--text-secondary)'}; cursor: pointer; font-size: 14px;">
            설문 문항 설정
          </button>
        </div>
      </div>

      <div class="page-body" id="tab-content-area"></div>
    `;

    // 탭 내용 렌더링
    const contentArea = container.querySelector('#tab-content-area');
    if (activeTab === 'list') {
      renderListTab(contentArea);
    } else {
      renderSurveyTab(contentArea);
    }

    bindGlobalEvents();
  }

  // 1. 신청 현황 목록 탭 렌더링
  function renderListTab(targetEl) {
    const list = store.getAll('classApplications') || [];
    
    targetEl.innerHTML = `
      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 80px;">번호</th>
                <th style="width: 140px;">이름</th>
                <th style="width: 80px; text-align: center;">사진</th>
                <th style="width: 150px;">전화번호</th>
                <th>설문 응답 개수</th>
                <th style="width: 180px;">신청일시</th>
                <th style="width: 130px; text-align: center;">관리</th>
              </tr>
            </thead>
            <tbody>
              ${list.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align: center; color: var(--text-tertiary); padding: var(--space-8) 0;">
                    접수된 신청 내역이 없습니다.
                  </td>
                </tr>
              ` : list.map((item, idx) => {
                const answerCount = Object.keys(item.answers || {}).length;
                return `
                  <tr class="application-row" data-id="${item.id}" style="cursor: pointer;">
                    <td>${list.length - idx}</td>
                    <td style="font-weight: 600;">${item.name || ''}</td>
                    <td style="text-align: center;">
                      ${item.photo_url ? `<span class="badge badge-green">첨부됨</span>` : `<span style="color: var(--text-tertiary); font-size: var(--text-xs);">없음</span>`}
                    </td>
                    <td>${item.phone || ''}</td>
                    <td>
                      <span style="font-size: var(--text-xs); color: var(--text-muted);">${answerCount}개 문항 응답</span>
                    </td>
                    <td style="color: var(--text-tertiary); font-size: var(--text-xs);">${formatDate(item.created_at)}</td>
                    <td style="text-align: center;" onclick="event.stopPropagation();">
                      <div style="display: flex; gap: var(--space-2); justify-content: center;">
                        <button class="btn btn-secondary btn-xs btn-detail" data-id="${item.id}">상세</button>
                        <button class="btn btn-danger btn-xs btn-delete" data-id="${item.id}">삭제</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // 상세 보기 바인딩
    targetEl.querySelectorAll('.application-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        openDetailModal(id);
      });
    });

    targetEl.querySelectorAll('.btn-detail').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openDetailModal(id);
      });
    });

    // 삭제 버튼 바인딩
    targetEl.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        handleDeleteApplication(id);
      });
    });
  }

  // 2. 설문 문항 설정 탭 렌더링
  function renderSurveyTab(targetEl) {
    const questions = store.getAll('surveyQuestions') || [];
    // sort_order 기준으로 오름차순 정렬
    const sortedQuestions = [...questions].sort((a, b) => a.sort_order - b.sort_order);

    targetEl.innerHTML = `
      <div style="display: flex; justify-content: flex-end; margin-bottom: var(--space-3);">
        <button class="btn btn-primary btn-sm" id="btn-add-question">설문 문항 추가</button>
      </div>

      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 80px; text-align: center;">순서</th>
                <th style="width: 140px;">입력 타입</th>
                <th>질문 문구 (Label)</th>
                <th>입력 힌트 (Placeholder)</th>
                <th>선택 옵션 (options)</th>
                <th style="width: 100px; text-align: center;">필수여부</th>
                <th style="width: 130px; text-align: center;">관리</th>
              </tr>
            </thead>
            <tbody>
              ${sortedQuestions.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align: center; color: var(--text-tertiary); padding: var(--space-8) 0;">
                    등록된 설문 문항이 없습니다.
                  </td>
                </tr>
              ` : sortedQuestions.map((q) => {
                let typeLabel = '한줄 입력';
                if (q.type === 'textarea') typeLabel = '여러줄 입력';
                else if (q.type === 'select') typeLabel = '선택박스';
                else if (q.type === 'tel') typeLabel = '연락처';
                else if (q.type === 'file') typeLabel = '사진 첨부';

                return `
                  <tr>
                    <td style="text-align: center; font-weight: 700;">${q.sort_order}</td>
                    <td><span class="badge badge-indigo">${typeLabel}</span></td>
                    <td style="font-weight: 600;">${q.label || ''}</td>
                    <td style="color: var(--text-muted);">${q.placeholder || '-'}</td>
                    <td style="max-width: 200px;" class="text-ellipsis">${q.options || '-'}</td>
                    <td style="text-align: center;">
                      ${q.required ? `<span class="badge badge-rose">필수</span>` : `<span class="badge badge-gray">선택</span>`}
                    </td>
                    <td style="text-align: center;">
                      <div style="display: flex; gap: var(--space-2); justify-content: center;">
                        <button class="btn btn-secondary btn-xs btn-edit-question" data-id="${q.id}">수정</button>
                        <button class="btn btn-danger btn-xs btn-delete-question" data-id="${q.id}">삭제</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // 질문 추가 이벤트
    targetEl.querySelector('#btn-add-question').addEventListener('click', () => {
      openQuestionModal();
    });

    // 질문 수정 이벤트
    targetEl.querySelectorAll('.btn-edit-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openQuestionModal(id);
      });
    });

    // 질문 삭제 이벤트
    targetEl.querySelectorAll('.btn-delete-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        handleDeleteQuestion(id);
      });
    });
  }

  // 3. 글로벌 이벤트 바인딩
  function bindGlobalEvents() {
    // 탭 전환
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        render();
      });
    });

    // 새로고침
    container.querySelector('#btn-refresh-class').addEventListener('click', async () => {
      const btn = container.querySelector('#btn-refresh-class');
      btn.disabled = true;
      btn.textContent = '로딩...';
      try {
        await store.init();
        showSuccess('성공적으로 갱신되었습니다.');
      } catch (err) {
        showError('데이터 갱신 실패');
      } finally {
        btn.disabled = false;
        btn.textContent = '새로고침';
        render();
      }
    });

    // 상세 이미지 변경 파일 트리거
    const bannerFileInput = container.querySelector('#banner-file-input');
    const changeBannerBtn = container.querySelector('#btn-change-banner');

    changeBannerBtn.addEventListener('click', () => {
      bannerFileInput.click();
    });

    bannerFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      changeBannerBtn.disabled = true;
      changeBannerBtn.textContent = '업로드 중...';

      try {
        const supabase = window.supabaseClient || window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        
        // 고유 파일명 생성하여 캐시 및 충돌 차단
        const fileExt = file.name.split('.').pop();
        const uniqueFileName = `detail_banner_${Date.now()}.${fileExt}`;

        // 1. Storage 업로드
        const { data, error: uploadError } = await supabase
          .storage
          .from('class_applications')
          .upload(uniqueFileName, file);

        if (uploadError) throw uploadError;

        // 2. Public URL 획득
        const { data: urlData } = supabase
          .storage
          .from('class_applications')
          .getPublicUrl(uniqueFileName);

        const publicUrl = urlData.publicUrl;

        // 3. 설정 테이블(ryzin_class_settings)에 URL upsert 갱신
        const { error: dbError } = await supabase
          .from('ryzin_class_settings')
          .upsert({ key: 'detail_banner_url', value: publicUrl });

        if (dbError) throw dbError;

        showSuccess('상세페이지 배너 이미지가 성공적으로 변경되었습니다.');

      } catch (err) {
        console.error(err);
        showError('배너 이미지 변경 실패: ' + err.message);
      } finally {
        changeBannerBtn.disabled = false;
        changeBannerBtn.textContent = '상세 이미지 변경';
        bannerFileInput.value = '';
      }
    });
  }

  // 4. 수강신청 상세 모달창 오픈
  function openDetailModal(id) {
    const item = store.getById('classApplications', id);
    if (!item) return;

    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.gap = 'var(--space-3)';
    content.style.fontSize = 'var(--text-sm)';

    // 동적 답변 렌더링
    let answersHtml = '';
    const answers = item.answers || {};
    for (const [question, value] of Object.entries(answers)) {
      answersHtml += `
        <div style="display: flex; flex-direction: column; gap: var(--space-1); border-bottom: 1px solid var(--border); padding-bottom: var(--space-2); margin-bottom: var(--space-2);">
          <span style="font-weight: 700; color: var(--text-secondary); font-size: var(--text-xs);">${question}</span>
          <span style="font-size: var(--text-sm); white-space: pre-wrap; line-height: 1.5;">${value || '-'}</span>
        </div>
      `;
    }

    content.innerHTML = `
      <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--space-3); border-bottom: 1px solid var(--border); padding-bottom: var(--space-3);">
        <span style="font-weight: 600; color: var(--text-secondary);">대표 이름</span>
        <span>${item.name || ''}</span>
      </div>
      <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--space-3); border-bottom: 1px solid var(--border); padding-bottom: var(--space-3);">
        <span style="font-weight: 600; color: var(--text-secondary);">대표 연락처</span>
        <span>${item.phone || ''}</span>
      </div>
      <div style="display: grid; grid-template-columns: 100px 1fr; gap: var(--space-3); border-bottom: 1px solid var(--border); padding-bottom: var(--space-3);">
        <span style="font-weight: 600; color: var(--text-secondary);">신청일시</span>
        <span>${formatDate(item.created_at)}</span>
      </div>
      <div style="margin-top: var(--space-4);">
        <h3 style="font-size: 14px; font-weight: 800; margin-bottom: var(--space-3); color: var(--primary);">설문 상세 답변</h3>
        ${answersHtml || '<p style="color:var(--text-tertiary);">답변 내역이 없습니다.</p>'}
      </div>
      ${item.photo_url ? `
      <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-2);">
        <span style="font-weight: 600; color: var(--text-secondary);">첨부 사진</span>
        <div style="text-align: center; background-color: var(--bg); padding: var(--space-2); border-radius: var(--radius-sm); border: 1px solid var(--border);">
          <a href="${item.photo_url}" target="_blank" title="원본 이미지 보기">
            <img src="${item.photo_url}" alt="첨부 사진" style="max-width: 100%; max-height: 200px; object-fit: contain; border-radius: var(--radius-sm);" />
          </a>
        </div>
      </div>
      ` : ''}
    `;

    const footer = document.createElement('div');
    footer.style.display = 'flex';
    footer.style.justifyContent = 'flex-end';
    footer.style.width = '100%';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-secondary';
    closeBtn.textContent = '닫기';
    closeBtn.addEventListener('click', closeModal);
    footer.appendChild(closeBtn);

    openModal({
      title: '수강 신청 상세 응답',
      size: 'md',
      content,
      footer,
      onClose: null
    });
  }

  // 5. 신청서 내역 삭제 처리
  function handleDeleteApplication(id) {
    const item = store.getById('classApplications', id);
    if (!item) return;

    confirmDialog({
      title: '신청 정보 삭제',
      message: `${item.name} 님의 수강신청 내역을 삭제하시겠습니까?`,
      danger: true,
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          store.delete('classApplications', id);
          showSuccess('삭제되었습니다.');
          render();
        } catch (err) {
          showError('삭제 오류 발생');
        }
      }
    });
  }

  // 6. 설문 문항 추가/수정 모달창 오픈
  function openQuestionModal(id = null) {
    const isEdit = !!id;
    const q = isEdit ? store.getById('surveyQuestions', id) : null;

    const content = document.createElement('div');
    content.innerHTML = `
      <div class="form-group">
        <label class="form-label">질문 유형</label>
        <select class="form-select" id="q-type" required>
          <option value="text" ${q && q.type === 'text' ? 'selected' : ''}>한줄 입력 (text)</option>
          <option value="textarea" ${q && q.type === 'textarea' ? 'selected' : ''}>여러줄 입력 (textarea)</option>
          <option value="select" ${q && q.type === 'select' ? 'selected' : ''}>선택박스 (select)</option>
          <option value="tel" ${q && q.type === 'tel' ? 'selected' : ''}>연락처 입력 (tel)</option>
          <option value="file" ${q && q.type === 'file' ? 'selected' : ''}>사진 파일 첨부 (file)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">질문 문구 (Label)</label>
        <input type="text" class="form-input" id="q-label" placeholder="예: 크리에이터가 되고 싶은 이유" value="${q ? q.label : ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">입력 힌트 (Placeholder)</label>
        <input type="text" class="form-input" id="q-placeholder" placeholder="예: 상세하게 작성해 주세요" value="${q ? q.placeholder : ''}">
      </div>
      <div class="form-group" id="options-group" style="display: ${q && q.type === 'select' ? 'block' : 'none'};">
        <label class="form-label">선택 옵션 목록 (콤마로 구분)</label>
        <input type="text" class="form-input" id="q-options" placeholder="예: 1기,2기,3기" value="${q ? q.options : ''}">
        <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">옵션들을 쉼표(,)로 구분하여 입력하세요.</p>
      </div>
      <div class="form-group" style="display: flex; align-items: center; gap: 8px; margin-top: var(--space-4);">
        <input type="checkbox" id="q-required" ${!q || q.required ? 'checked' : ''} style="width: 16px; height: 16px; cursor: pointer;">
        <label for="q-required" style="font-size: 13px; font-weight: 700; cursor: pointer;">필수 입력 문항으로 설정</label>
      </div>
      <div class="form-group" style="margin-top: var(--space-3);">
        <label class="form-label">출력 정렬 순서 (낮을수록 먼저 노출)</label>
        <input type="number" class="form-input" id="q-sort" value="${q ? q.sort_order : '1'}" min="1" required>
      </div>
    `;

    // select 타입일 때만 옵션 입력란 노출
    content.querySelector('#q-type').addEventListener('change', (e) => {
      const optGroup = content.querySelector('#options-group');
      if (e.target.value === 'select') {
        optGroup.style.display = 'block';
      } else {
        optGroup.style.display = 'none';
      }
    });

    const footer = document.createElement('div');
    footer.style.display = 'flex';
    footer.style.justifyContent = 'flex-end';
    footer.style.gap = 'var(--space-3)';
    footer.style.width = '100%';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = '취소';
    cancelBtn.addEventListener('click', closeModal);

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-primary';
    saveBtn.textContent = '저장';
    saveBtn.addEventListener('click', async () => {
      const type = content.querySelector('#q-type').value;
      const label = content.querySelector('#q-label').value.trim();
      const placeholder = content.querySelector('#q-placeholder').value.trim();
      const options = content.querySelector('#q-options').value.trim();
      const required = content.querySelector('#q-required').checked;
      const sort_order = parseInt(content.querySelector('#q-sort').value, 10) || 1;

      if (!label) {
        showError('질문 문구를 입력해 주세요.');
        return;
      }

      if (type === 'select' && !options) {
        showError('선택박스 옵션을 1개 이상 콤마로 구분해 입력해 주세요.');
        return;
      }

      try {
        if (isEdit) {
          store.update('surveyQuestions', id, {
            type, label, placeholder, options, required, sort_order
          });
          showSuccess('문항이 수정되었습니다.');
        } else {
          store.create('surveyQuestions', {
            id: Date.now(),
            type, label, placeholder, options, required, sort_order
          });
          showSuccess('새 문항이 추가되었습니다.');
        }
        closeModal();
        render();
      } catch (err) {
        console.error(err);
        showError('저장 실패: ' + err.message);
      }
    });

    footer.appendChild(cancelBtn);
    footer.appendChild(saveBtn);

    openModal({
      title: isEdit ? '설문 문항 수정' : '새 설문 문항 추가',
      size: 'sm',
      content,
      footer,
      onClose: null
    });
  }

  // 7. 설문 문항 삭제 처리
  function handleDeleteQuestion(id) {
    const q = store.getById('surveyQuestions', id);
    if (!q) return;

    confirmDialog({
      title: '문항 삭제',
      message: `"${q.label}" 문항을 정말 삭제하시겠습니까? 신청 폼에서 즉시 제외됩니다.`,
      danger: true,
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          store.delete('surveyQuestions', id);
          showSuccess('문항이 삭제되었습니다.');
          render();
        } catch (err) {
          showError('삭제 오류');
        }
      }
    });
  }

  // 초기 렌더링 실행
  render();
  return container;
}
