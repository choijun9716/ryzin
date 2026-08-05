// ===== 데모 시연 관리 페이지 =====

const db = window.supabaseClient;

const getDemoList = () => JSON.parse(localStorage.getItem('ryzin_demo_list') || '[]');
const saveDemoList = (list) => localStorage.setItem('ryzin_demo_list', JSON.stringify(list));

export function renderDemoManagePage(container) {
  container.innerHTML = `
    <div style="padding: 28px; max-width: 1200px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <!-- 헤더 -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0;">데모 시연 관리</h1>
          <p style="font-size: 13px; color: #64748b; margin: 0;">권한이 없는 타사 웹사이트 주소를 등록하여, 상단바 없이 100% 깔끔한 라이브 위젯 데모 링크를 생성하고 공유합니다.</p>
        </div>
      </div>

      <!-- 신규 데모 생성 카드 -->
      <div style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 24px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0;">신규 데모 시연 생성</h3>
        <div style="display: grid; grid-template-columns: 1.2fr 2fr 1fr; gap: 16px; align-items: flex-end;">
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 6px; text-transform: uppercase;">데모명 (구분용)</label>
            <input type="text" id="demo-name-input" placeholder="예: 올리브영 메인 시연" style="width: 100%; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none;">
          </div>
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 6px; text-transform: uppercase;">타겟 웹사이트 URL</label>
            <input type="text" id="demo-url-input" placeholder="예: https://oliveyoung.co.kr 또는 musinsa.com" style="width: 100%; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none;">
          </div>
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 6px; text-transform: uppercase;">연동 라이브 선택</label>
            <select id="demo-live-select" style="width: 100%; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; background: #fff;">
              <option value="PAZIW92">PAZIW92 (쏘랩)</option>
              <option value="HRNCB9K">HRNCB9K (기억의문화)</option>
              <option value="live02">live02 (하나스톤)</option>
            </select>
          </div>
        </div>
        <div style="margin-top: 18px; display: flex; justify-content: flex-end;">
          <button id="btn-create-demo" style="background: #2563eb; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer;">
            데모 링크 생성 및 등록
          </button>
        </div>
      </div>

      <!-- 데모 목록 리스트 -->
      <div style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="padding: 18px 24px; border-bottom: 1.5px solid #e2e8f0; background: #f8fafc; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0;">등록된 데모 시연 목록</h3>
          <span id="demo-count-badge" style="font-size: 12px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 4px 10px; border-radius: 20px; border: 1px solid #bfdbfe;">0개</span>
        </div>
        <div id="demo-list-table-container">
          <!-- 테이블 영역 -->
        </div>
      </div>
    </div>
  `;

  // DB 및 로컬에서 라이브 목록 동기화
  const loadLiveOptions = async () => {
    const select = container.querySelector('#demo-live-select');
    if (!select || !db) return;
    try {
      const { data, error } = await db.from('live_control').select('live_id, title');
      if (!error && data && data.length > 0) {
        select.innerHTML = data.map(item => `
          <option value="${item.live_id}">${item.live_id} (${item.title || '라이브'})</option>
        `).join('');
      }
    } catch (e) {}
  };
  loadLiveOptions();

  // 목록 렌더링
  const renderList = () => {
    const listContainer = container.querySelector('#demo-list-table-container');
    const countBadge = container.querySelector('#demo-count-badge');
    const demos = getDemoList();

    if (countBadge) countBadge.textContent = `${demos.length}개`;

    if (demos.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #94a3b8; font-size: 14px;">
          등록된 데모 시연이 없습니다. 위에서 새로운 데모를 생성해보세요.
        </div>
      `;
      return;
    }

    listContainer.innerHTML = `
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b; font-weight: 700;">
            <th style="padding: 14px 20px;">데모명</th>
            <th style="padding: 14px 20px;">타겟 URL</th>
            <th style="padding: 14px 20px;">연동 라이브</th>
            <th style="padding: 14px 20px;">시연 링크 (상단바 없음)</th>
            <th style="padding: 14px 20px; text-align: right;">작업</th>
          </tr>
        </thead>
        <tbody>
          ${demos.map((d, index) => {
            let cleanUrl = d.url;
            if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
              cleanUrl = 'https://' + cleanUrl;
            }
            const cleanShareUrl = `${window.location.origin}/demo.html?url=${encodeURIComponent(cleanUrl)}&live_id=${d.liveId}&clean=true`;
            return `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 16px 20px; font-weight: 700; color: #0f172a;">${d.name}</td>
                <td style="padding: 16px 20px; color: #3b82f6;"><a href="${cleanUrl}" target="_blank" style="color:#2563eb; text-decoration:none;">${d.url}</a></td>
                <td style="padding: 16px 20px; font-weight: 600; color: #475569;">${d.liveId}</td>
                <td style="padding: 16px 20px;">
                  <input type="text" readonly value="${cleanShareUrl}" style="width: 280px; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 11px; background: #f8fafc; font-family: monospace;">
                </td>
                <td style="padding: 16px 20px; text-align: right;">
                  <button class="btn-copy-clean-link" data-url="${cleanShareUrl}" style="background: #2563eb; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; margin-right: 6px;">
                    순수 링크 복사
                  </button>
                  <button class="btn-preview-demo" data-url="${cleanShareUrl}" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; margin-right: 6px;">
                    미리보기
                  </button>
                  <button class="btn-delete-demo" data-index="${index}" style="background: #fff1f2; color: #e11d48; border: 1px solid #fecdd3; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">
                    삭제
                  </button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    // 이벤트 리스너 바인딩
    listContainer.querySelectorAll('.btn-copy-clean-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const url = e.target.dataset.url;
        navigator.clipboard.writeText(url).then(() => {
          const originalText = e.target.textContent;
          e.target.textContent = '복사 완료!';
          e.target.style.background = '#16a34a';
          setTimeout(() => {
            e.target.textContent = originalText;
            e.target.style.background = '#2563eb';
          }, 2000);
        });
      });
    });

    listContainer.querySelectorAll('.btn-preview-demo').forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.open(e.target.dataset.url, '_blank');
      });
    });

    listContainer.querySelectorAll('.btn-delete-demo').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        const current = getDemoList();
        current.splice(idx, 1);
        saveDemoList(current);
        renderList();
      });
    });
  };

  // 데모 생성 버튼 이벤트
  const btnCreate = container.querySelector('#btn-create-demo');
  if (btnCreate) {
    btnCreate.addEventListener('click', () => {
      const name = container.querySelector('#demo-name-input').value.trim();
      const url = container.querySelector('#demo-url-input').value.trim();
      const liveId = container.querySelector('#demo-live-select').value;

      if (!name || !url) {
        alert('데모명과 타겟 사이트 URL을 모두 입력해주세요.');
        return;
      }

      const list = getDemoList();
      list.unshift({
        name: name,
        url: url,
        liveId: liveId,
        createdAt: new Date().toISOString()
      });

      saveDemoList(list);

      container.querySelector('#demo-name-input').value = '';
      container.querySelector('#demo-url-input').value = '';

      renderList();
      alert('✅ 데모 링크가 성공적으로 등록되었습니다!');
    });
  }

  renderList();
}
