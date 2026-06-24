// ===== 설정 페이지 =====
import { store } from '../data/store.js';
import { ROLES } from '../data/models.js';
import { showSuccess, showError } from '../components/toast.js';
import { confirmDialog, openModal, closeModal } from '../components/modal.js';

export function renderSettings() {
  const container = document.createElement('div');
  const currentRole = store.getCurrentRole();

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <h1 class="page-title">설정</h1>
          <p class="page-description">시스템 설정 및 권한 관리</p>
        </div>
      </div>
    </div>
    <div class="page-body">
      
      
      <!-- SaaS 데모 (구독 관리) -->
      ${currentRole === 'admin' ? `
      <div class="card" style="margin-bottom: var(--space-5);">
        <div class="card-header" style="background: var(--bg-secondary); border-bottom: 1px solid var(--border-light);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="display: flex; align-items: center; gap: 8px;">
              SaaS 구독 관리 (데모)
            </h3>
            <span class="badge" style="background: var(--text-tertiary); color: white;">Premium Plan</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin-bottom: var(--space-5);">
            <div style="padding: var(--space-4); background: var(--bg-primary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-2);">이용 중인 플랜</div>
              <div style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">Enterprise (무제한)</div>
              <div style="font-size: var(--text-xs); color: var(--status-success); margin-top: var(--space-2);">활성 상태</div>
            </div>
            <div style="padding: var(--space-4); background: var(--bg-primary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-2);">등록된 사용자 계정</div>
              <div style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">${store.getAll('users').length}명 <span style="font-size: var(--text-sm); font-weight: 400; color: var(--text-tertiary);">/ 무제한</span></div>
              <div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-2);">추가 과금 없음</div>
            </div>
            <div style="padding: var(--space-4); background: var(--bg-primary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-2);">다음 결제일</div>
              <div style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">2026.12.31</div>
              <div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-2);">자동 결제 설정됨</div>
            </div>
          </div>
          
          <div style="display: flex; gap: var(--space-3); justify-content: space-between;">
            <div>
              <button class="btn btn-primary" onclick="alert('데모: 결제 수단 변경 창이 뜹니다.')">결제 수단 관리</button>
              <button class="btn btn-secondary" onclick="alert('데모: 청구서 및 결제 내역 화면으로 이동합니다.')">청구서 내역</button>
            </div>
            <button class="btn btn-secondary" style="color: var(--status-error);" onclick="alert('데모: 구독 해지 확인 창이 뜹니다.')">구독 해지</button>
          </div>
        </div>
      </div>
      ` : ''}

      <!-- SaaS 데모 모드 스위치 -->
      ${currentRole === 'admin' ? `
      <div class="card" style="margin-bottom: var(--space-5); border: 2px solid ${store.isDemoMode ? 'var(--status-error)' : 'var(--primary-color)'};">
        <div class="card-header" style="background: ${store.isDemoMode ? 'rgba(239,68,68,0.1)' : 'var(--bg-secondary)'}; border-bottom: 1px solid ${store.isDemoMode ? 'var(--status-error)' : 'var(--border-light)'};">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="display: flex; align-items: center; gap: 8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${store.isDemoMode ? 'var(--status-error)' : 'var(--primary-color)'}" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              세일즈 데모 모드 설정
            </h3>
            <span class="badge" style="background: ${store.isDemoMode ? 'var(--status-error)' : 'var(--text-tertiary)'}; color: white;">
              ${store.isDemoMode ? '데모 모드 활성' : '운영 모드'}
            </span>
          </div>
        </div>
        <div class="card-body">
          <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.5;">
            솔루션 시연(세일즈)을 위해 <strong>실제 운영 데이터와 완전히 분리된 샌드박스 환경</strong>으로 진입합니다.<br>
            데모 모드를 켜면 텅 빈 데이터에서 시작하며, 이곳에서 입력한 내용은 실제 구글 시트나 운영 DB에 동기화되지 않습니다.
          </p>
          <div style="display: flex; gap: var(--space-3); align-items: center; background: var(--bg-primary); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: var(--text-md); margin-bottom: 4px;">데모 모드 활성화 상태</div>
              <div style="font-size: var(--text-xs); color: var(--text-tertiary);">토글 시 화면이 새로고침 되며 데이터 베이스가 전환됩니다.</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="toggle-demo-mode" ${store.isDemoMode ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      ` : ''}

      <!-- 데이터 관리 -->
      <div class="card" style="margin-bottom: var(--space-5);">
        <div class="card-header"><h3>데이터 동기화</h3></div>
        <div class="card-body">
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-4);">
            구글 시트에 수동으로 입력된 최신 데이터를 강제로 다시 불러옵니다.
          </p>
          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn-primary" id="btn-sync-data">구글 시트 동기화</button>
          </div>
        </div>
      </div>

      <!-- 외부 API 연동 설정 -->
      ${currentRole === 'admin' ? `
      <div class="card" style="margin-bottom: var(--space-5);">
        <div class="card-header"><h3>외부 API 연동 설정</h3></div>
        <div class="card-body">
          <div class="form-grid" style="grid-template-columns: 1fr;">
            <!-- 팝빌 -->
            <div class="input-group">
              <label style="font-weight:bold; color:#FFCD00;">팝빌(Popbill) 카카오 알림톡 API</label>
              <input type="text" class="input" id="setting-popbill-linkid" placeholder="팝빌 LinkID">
              <input type="password" class="input" id="setting-popbill-secret" placeholder="팝빌 SecretKey" style="margin-top:8px;">
              <input type="text" class="input" id="setting-popbill-sender" placeholder="발신번호 (예: 010-0000-0000)" style="margin-top:8px;">
              <p class="help-text">모의(Mock) 동작을 원하실 경우 비워두세요.</p>
            </div>

            <div>
              <button class="btn btn-primary btn-sm" id="btn-save-api-settings">설정 저장</button>
            </div>
          </div>
        </div>
      </div>
      ` : ''}

      <!-- 사용자 관리 (대표 전용) -->
      ${currentRole === 'admin' ? `
      <div class="card" style="margin-bottom: var(--space-5);">
        <div class="card-header">
          <h3>사용자 관리</h3>
          <button class="btn btn-primary btn-sm" id="btn-create-user">계정 추가</button>
        </div>
        <div class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>비밀번호</th>
                <th>권한</th>
                <th class="text-right">관리</th>
              </tr>
            </thead>
            <tbody id="user-list-tbody">
              <!-- Users will be populated here -->
            </tbody>
          </table>
        </div>
      </div>
      ` : ''}

      <!-- 권한 매트릭스 -->
      <div class="card" style="margin-bottom: var(--space-5);">
        <div class="card-header"><h3>권한 매트릭스</h3></div>
        <div class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>메뉴</th>
                <th class="text-center">대표 (admin)</th>
                <th class="text-center">PD (pd)</th>
                <th class="text-center">디자이너 (designer)</th>
                <th class="text-center">회계 (accountant)</th>
              </tr>
            </thead>
            <tbody>
              ${[
                { menu: '대시보드', admin: true, pd: true, designer: true, accountant: true },
                { menu: '라이브 관리', admin: true, pd: true, designer: false, accountant: false },
                { menu: '쇼호스트 관리', admin: true, pd: true, designer: false, accountant: false },
                { menu: '브랜드 관리', admin: true, pd: true, designer: false, accountant: false },
                { menu: '매출/손익', admin: true, pd: false, designer: false, accountant: true },
                { menu: '설정', admin: true, pd: false, designer: false, accountant: false },
              ].map(row => `
                <tr>
                  <td style="font-weight: var(--weight-medium);">${row.menu}</td>
                  <td class="text-center">${row.admin ? checkSvg() : dashSvg()}</td>
                  <td class="text-center">${row.pd ? checkSvg() : dashSvg()}</td>
                  <td class="text-center">${row.designer ? checkSvg() : dashSvg()}</td>
                  <td class="text-center">${row.accountant ? checkSvg() : dashSvg()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    // 데모 모드 토글
    const demoToggle = container.querySelector('#toggle-demo-mode');
    if (demoToggle) {
      demoToggle.addEventListener('change', (e) => {
        const enable = e.target.checked;
        if (enable) {
          confirmDialog({
            title: '데모 모드 진입',
            message: '데모 모드를 켜시겠습니까?\n실제 운영 데이터가 보이지 않게 되며, 텅 빈 초기 상태에서 시연용 데이터를 안전하게 조작할 수 있습니다.',
            confirmText: '데모 켜기',
            onConfirm: () => store.toggleDemoMode(true),
            onCancel: () => { demoToggle.checked = false; }
          });
        } else {
          confirmDialog({
            title: '운영 모드 복귀',
            message: '운영 모드로 돌아가시겠습니까?\n다시 원래의 실제 운영 데이터를 불러옵니다.',
            confirmText: '복귀하기',
            onConfirm: () => store.toggleDemoMode(false),
            onCancel: () => { demoToggle.checked = true; }
          });
        }
      });
    }

    // 동기화 버튼
    container.querySelector('#btn-sync-data')?.addEventListener('click', async () => {
      const btn = container.querySelector('#btn-sync-data');
      btn.textContent = '동기화 중...';
      btn.disabled = true;
      try {
        const success = await store.init();
        if (success) {
          showSuccess('데이터 동기화가 완료되었습니다.');
          const pageContent = document.getElementById('page-content');
          if (pageContent) {
            pageContent.innerHTML = '';
            pageContent.appendChild(renderSettings());
          }
        } else {
          showError('동기화에 실패했습니다.');
        }
      } catch (e) {
        showError('초기화 실패');
      } finally {
        btn.disabled = false;
        btn.textContent = '구글 시트 동기화';
      }
    });

    // 외부 API 설정 로드 및 저장
    if (currentRole === 'admin') {
      const savedData = JSON.parse(localStorage.getItem('ryzin_live_data') || '{}');
      const settings = savedData.settings || {};
      
      const popbillLinkInput = container.querySelector('#setting-popbill-linkid');
      const popbillSecretInput = container.querySelector('#setting-popbill-secret');
      const popbillSenderInput = container.querySelector('#setting-popbill-sender');
      
      if (popbillLinkInput) popbillLinkInput.value = settings.popbillLinkId || '';
      if (popbillSecretInput) popbillSecretInput.value = settings.popbillSecretKey || '';
      if (popbillSenderInput) popbillSenderInput.value = settings.popbillSenderNumber || '';

      container.querySelector('#btn-save-api-settings')?.addEventListener('click', () => {
        if (!savedData.settings) savedData.settings = {};
        savedData.settings.popbillLinkId = popbillLinkInput.value.trim();
        savedData.settings.popbillSecretKey = popbillSecretInput.value.trim();
        savedData.settings.popbillSenderNumber = popbillSenderInput.value.trim();
        
        localStorage.setItem('ryzin_live_data', JSON.stringify(savedData));
        showSuccess('API 연동 설정이 저장되었습니다.');
      });
    }

    // 사용자 관리 로직
    if (currentRole === 'admin') {
      renderUserList(container);

      // 계정 추가 버튼
      container.querySelector('#btn-create-user')?.addEventListener('click', () => {
        openUserModal();
      });
    }
  }, 0);

  return container;
}

function renderUserList(container) {
  const tbody = container.querySelector('#user-list-tbody');
  if (!tbody) return;

  const users = store.getAll('users');
  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 사용자가 없습니다.</td></tr>';
    return;
  }

  tbody.innerHTML = users.map(u => `
    <tr>
      <td style="font-weight: var(--weight-medium);">${u.id}</td>
      <td>${u.name}</td>
      <td><span style="color:var(--text-tertiary);">***</span></td>
      <td><span class="badge badge-default">${ROLES[u.role]?.label || u.role}</span></td>
      <td class="text-right">
        <div style="display: flex; gap: var(--space-2); justify-content: flex-end;">
          <button class="btn btn-secondary btn-sm edit-user-btn" data-id="${u.id}">수정</button>
          <button class="btn btn-danger btn-sm delete-user-btn" data-id="${u.id}">삭제</button>
        </div>
      </td>
    </tr>
  `).join('');

  // 수정 버튼
  tbody.querySelectorAll('.edit-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const u = store.getById('users', btn.getAttribute('data-id'));
      if (u) openUserModal(u);
    });
  });

  // 삭제 버튼
  tbody.querySelectorAll('.delete-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const uId = btn.getAttribute('data-id');
      confirmDialog({
        title: '사용자 삭제',
        message: '해당 사용자를 삭제하시겠습니까?',
        confirmText: '삭제',
        danger: true,
        onConfirm: () => {
          store.delete('users', uId);
          showSuccess('사용자가 삭제되었습니다.');
          renderUserList(container);
        }
      });
    });
  });
}

function openUserModal(existingUser = null) {
  const content = document.createElement('div');
  content.className = 'form-grid';
  content.innerHTML = `
    <div class="input-group">
      <label class="required">아이디</label>
      <input class="input" id="user-id" value="${existingUser ? existingUser.id : ''}" ${existingUser ? 'disabled' : ''}>
    </div>
    <div class="input-group">
      <label class="required">비밀번호</label>
      <input class="input" type="password" id="user-pw" value="${existingUser ? existingUser.password : ''}">
    </div>
    <div class="input-group">
      <label class="required">이름</label>
      <input class="input" id="user-name" value="${existingUser ? existingUser.name : ''}">
    </div>
    <div class="input-group">
      <label class="required">권한</label>
      <select class="input" id="user-role">
        ${Object.entries(ROLES).map(([k, v]) => `<option value="${k}" ${existingUser && existingUser.role === k ? 'selected' : ''}>${v.label} (${k})</option>`).join('')}
      </select>
    </div>
  `;

  const footer = document.createElement('div');
  footer.style.cssText = 'display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;';
  
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn btn-secondary';
  cancelBtn.textContent = '취소';
  cancelBtn.addEventListener('click', closeModal);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-primary';
  saveBtn.textContent = '저장';
  saveBtn.addEventListener('click', () => {
    const id = document.getElementById('user-id').value.trim();
    const pw = document.getElementById('user-pw').value.trim();
    const name = document.getElementById('user-name').value.trim();
    const role = document.getElementById('user-role').value;

    if (!id || !pw || !name) {
      showError('모든 항목을 입력해주세요.');
      return;
    }

    if (existingUser) {
      store.update('users', id, { password: pw, name, role });
      showSuccess('사용자 정보가 수정되었습니다.');
    } else {
      if (store.getById('users', id)) {
        showError('이미 존재하는 아이디입니다.');
        return;
      }
      store.create('users', { id, password: pw, name, role });
      showSuccess('새로운 사용자가 등록되었습니다.');
    }
    
    closeModal();
    // 렌더 갱신
    const pageContent = document.getElementById('page-content');
    if (pageContent) {
      pageContent.innerHTML = '';
      pageContent.appendChild(renderSettings());
    }
  });

  footer.appendChild(cancelBtn);
  footer.appendChild(saveBtn);

  openModal({ title: existingUser ? '사용자 수정' : '사용자 추가', content, footer });
}

function checkSvg() {
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--status-success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
}

function dashSvg() {
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-disabled)" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>';
}
