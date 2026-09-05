// ===== 설정 페이지 (보안 감사 로그, 사용자 관리, 시스템 설정) =====
import { store } from '../data/store.js';
import { ROLES } from '../data/models.js';
import { showSuccess, showError } from '../components/toast.js';
import { confirmDialog, openModal, closeModal } from '../components/modal.js';
import CryptoJS from 'crypto-js';

// User Agent 파싱 헬퍼
function parseUserAgent(ua) {
  if (!ua || ua === 'unknown') return '알 수 없음';
  let browser = '기타';
  if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('Chrome/')) browser = 'Chrome';
  else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Safari';
  else if (ua.includes('Firefox/')) browser = 'Firefox';

  let os = '기타 OS';
  if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('Linux')) os = 'Linux';

  return `${browser} (${os})`;
}

// 접속 상태 뱃지 헬퍼 (이모티콘 일체 금지)
function getStatusBadge(status) {
  switch (status) {
    case 'SUCCESS':
      return `<span class="badge" style="background: rgba(34,197,94,0.12); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); font-weight: 600;">성공</span>`;
    case 'FAILED_PASSWORD':
      return `<span class="badge" style="background: rgba(239,68,68,0.12); color: #ef4444; border: 1px solid rgba(239,68,68,0.25); font-weight: 600;">비밀번호 실패</span>`;
    case 'FAILED_OTP':
      return `<span class="badge" style="background: rgba(249,115,22,0.12); color: #f97316; border: 1px solid rgba(249,115,22,0.25); font-weight: 600;">OTP 실패</span>`;
    case 'LOCKED':
      return `<span class="badge" style="background: rgba(225,29,72,0.18); color: #f43f5e; border: 1px solid rgba(225,29,72,0.35); font-weight: 700;">계정 잠금 (5회 실패)</span>`;
    default:
      return `<span class="badge badge-default">${status || '-'}</span>`;
  }
}

// 접속 감사 로그 데이터 로드
async function fetchAccessLogs() {
  const token = sessionStorage.getItem('ryzin_admin_token') || localStorage.getItem('ryzin_admin_token');
  try {
    const resp = await fetch('/api/admin/data', {
      headers: { 'X-Admin-Token': token || '' }
    });
    if (resp.ok) {
      const data = await resp.json();
      return data.admin_access_logs || [];
    }
  } catch (e) {
    console.warn('[Audit Logs] 로드 실패:', e);
  }
  return store.getAll('admin_access_logs') || [];
}

export function renderSettings() {
  const container = document.createElement('div');
  const currentRole = store.getCurrentRole();
  const isAdmin = currentRole === 'admin';

  let activeTab = 'general'; // 'general', 'users', 'audit'

  function render() {
    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">설정</h1>
            <p class="page-description">시스템 설정, 계정 권한 및 보안 감사 관리</p>
          </div>
        </div>
      </div>

      <!-- 서브 탭 네비게이션 -->
      <div style="display: flex; gap: var(--space-2); border-bottom: 1px solid var(--border-color); margin-bottom: var(--space-5);">
        <button class="btn btn-text subtab-btn ${activeTab === 'general' ? 'active' : ''}" data-tab="general" style="padding: 10px 16px; font-weight: 600; border-radius: 0; border-bottom: 2px solid ${activeTab === 'general' ? 'var(--primary)' : 'transparent'}; color: ${activeTab === 'general' ? 'var(--primary)' : 'var(--text-secondary)'};">
          기본 및 구독
        </button>
        ${isAdmin ? `
        <button class="btn btn-text subtab-btn ${activeTab === 'users' ? 'active' : ''}" data-tab="users" style="padding: 10px 16px; font-weight: 600; border-radius: 0; border-bottom: 2px solid ${activeTab === 'users' ? 'var(--primary)' : 'transparent'}; color: ${activeTab === 'users' ? 'var(--primary)' : 'var(--text-secondary)'};">
          사용자 관리
        </button>
        <button class="btn btn-text subtab-btn ${activeTab === 'audit' ? 'active' : ''}" data-tab="audit" style="padding: 10px 16px; font-weight: 600; border-radius: 0; border-bottom: 2px solid ${activeTab === 'audit' ? 'var(--primary)' : 'transparent'}; color: ${activeTab === 'audit' ? 'var(--primary)' : 'var(--text-secondary)'};">
          접속 감사 로그
        </button>
        ` : ''}
      </div>

      <div class="page-body" id="settings-tab-content">
        <!-- 탭 컨텐츠 렌더링 영역 -->
      </div>
    `;

    // 탭 전환 이벤트
    container.querySelectorAll('.subtab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        render();
      });
    });

    const contentArea = container.querySelector('#settings-tab-content');

    if (activeTab === 'general') {
      renderGeneralTab(contentArea, isAdmin);
    } else if (activeTab === 'users' && isAdmin) {
      renderUsersTab(contentArea);
    } else if (activeTab === 'audit' && isAdmin) {
      renderAuditTab(contentArea);
    }
  }

  render();
  return container;
}

// 1. 기본 및 구독 탭
function renderGeneralTab(contentArea, isAdmin) {
  contentArea.innerHTML = `
    <!-- SaaS 구독 관리 -->
    ${isAdmin ? `
    <div class="card" style="margin-bottom: var(--space-5); ${store.isDemoMode ? 'border: 2px solid var(--status-error);' : ''}">
      <div class="card-header" style="${store.isDemoMode ? 'background: rgba(239,68,68,0.1); border-bottom: 1px solid var(--status-error);' : 'background: var(--bg-secondary); border-bottom: 1px solid var(--border-light);'}">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3>SaaS 구독 관리</h3>
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
      </div>
    </div>
    ` : ''}

    <!-- 외부 API 연동 설정 -->
    ${isAdmin ? `
    <div class="card" style="margin-bottom: var(--space-5);">
      <div class="card-header"><h3>외부 API 연동 설정</h3></div>
      <div class="card-body">
        <div class="form-grid" style="grid-template-columns: 1fr;">
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
  `;

  if (isAdmin) {
    const savedData = JSON.parse(localStorage.getItem('ryzin_live_data') || '{}');
    const settings = savedData.settings || {};
    const popbillLinkInput = contentArea.querySelector('#setting-popbill-linkid');
    const popbillSecretInput = contentArea.querySelector('#setting-popbill-secret');
    const popbillSenderInput = contentArea.querySelector('#setting-popbill-sender');

    if (popbillLinkInput) popbillLinkInput.value = settings.popbillLinkId || '';
    if (popbillSecretInput) popbillSecretInput.value = settings.popbillSecretKey || '';
    if (popbillSenderInput) popbillSenderInput.value = settings.popbillSenderNumber || '';

    contentArea.querySelector('#btn-save-api-settings')?.addEventListener('click', () => {
      if (!savedData.settings) savedData.settings = {};
      savedData.settings.popbillLinkId = popbillLinkInput.value.trim();
      savedData.settings.popbillSecretKey = popbillSecretInput.value.trim();
      savedData.settings.popbillSenderNumber = popbillSenderInput.value.trim();
      localStorage.setItem('ryzin_live_data', JSON.stringify(savedData));
      showSuccess('API 연동 설정이 저장되었습니다.');
    });
  }
}

// 2. 사용자 관리 탭
function renderUsersTab(contentArea) {
  contentArea.innerHTML = `
    <div class="card" style="margin-bottom: var(--space-5);">
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
        <h3>사용자 계정 목록</h3>
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
            <!-- 사용자 목록 -->
          </tbody>
        </table>
      </div>
    </div>
  `;

  renderUserRows(contentArea);

  contentArea.querySelector('#btn-create-user')?.addEventListener('click', () => {
    openUserModal();
  });
}

function renderUserRows(contentArea) {
  const tbody = contentArea.querySelector('#user-list-tbody');
  if (!tbody) return;

  const users = store.getAll('users');
  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 사용자가 없습니다.</td></tr>';
    return;
  }

  tbody.innerHTML = users.map(u => {
    let roleLabel = u.role;
    if (ROLES[u.role]) {
      roleLabel = ROLES[u.role].label;
    } else if (u.role && u.role.startsWith('live_stream:')) {
      roleLabel = `라이브 매니저 (${u.role.split(':')[1]})`;
    } else if (u.role && u.role.startsWith('brand:')) {
      const bId = u.role.split(':')[1];
      const b = store.getById('brands', bId);
      roleLabel = b ? `파트너사 (${b.name})` : `파트너사 (${bId})`;
    }
    return `
      <tr>
        <td style="font-weight: var(--weight-medium);">${u.id}</td>
        <td>${u.name}</td>
        <td><span style="color:var(--text-tertiary);">***</span></td>
        <td><span class="badge badge-default">${roleLabel}</span></td>
        <td class="text-right">
          <div style="display: flex; gap: var(--space-2); justify-content: flex-end;">
            <button class="btn btn-secondary btn-sm edit-user-btn" data-id="${u.id}">수정</button>
            <button class="btn btn-danger btn-sm delete-user-btn" data-id="${u.id}">삭제</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('.edit-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const user = store.getById('users', id);
      if (user) openUserModal(user);
    });
  });

  tbody.querySelectorAll('.delete-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id === 'admin') {
        showError('기본 관리자 계정은 삭제할 수 없습니다.');
        return;
      }
      confirmDialog({
        title: '계정 삭제',
        message: `'${id}' 계정을 영구 삭제하시겠습니까?`,
        confirmText: '삭제',
        danger: true,
        onConfirm: () => {
          store.delete('users', id);
          showSuccess('사용자 계정이 삭제되었습니다.');
          renderUserRows(contentArea);
        }
      });
    });
  });
}

// 3. 접속 감사 로그 탭
function renderAuditTab(contentArea) {
  contentArea.innerHTML = `
    <div class="card" style="margin-bottom: var(--space-5);">
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3);">
        <div>
          <h3 style="margin-bottom: 2px;">관리자 로그인 접속 감사 로그</h3>
          <p style="font-size: 12px; color: var(--text-tertiary); margin: 0;">로그인 성공, 실패, 5회 실패 계정 잠금 및 접속 IP/환경을 실시간으로 감시합니다.</p>
        </div>
        <div style="display: flex; gap: var(--space-2); align-items: center;">
          <button class="btn btn-secondary btn-sm" id="btn-refresh-audit-logs" style="display: flex; align-items: center; gap: 6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            새로고침
          </button>
        </div>
      </div>

      <!-- 필터 바 -->
      <div class="card-body" style="padding: var(--space-4) var(--space-5); border-bottom: 1px solid var(--border-color); background: var(--bg-secondary);">
        <div style="display: flex; gap: var(--space-3); align-items: center; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">사용자:</span>
            <select class="input" id="filter-audit-user" style="width: 140px; padding: 6px 10px; height: 34px; font-size: 13px;">
              <option value="">전체 사용자</option>
            </select>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">결과:</span>
            <select class="input" id="filter-audit-status" style="width: 170px; padding: 6px 10px; height: 34px; font-size: 13px;">
              <option value="">전체 상태</option>
              <option value="SUCCESS">성공 (SUCCESS)</option>
              <option value="FAILED_PASSWORD">비밀번호 실패</option>
              <option value="FAILED_OTP">OTP 실패</option>
              <option value="LOCKED">계정 잠금 (5회 실패)</option>
            </select>
          </div>

          <div style="margin-left: auto; font-size: 12px; color: var(--text-tertiary);" id="audit-log-count">
            조회 중...
          </div>
        </div>
      </div>

      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 160px;">일시</th>
              <th style="width: 130px;">사용자 계정</th>
              <th style="width: 120px;">접속 IP</th>
              <th style="width: 160px;">접속 환경</th>
              <th style="width: 160px;">결과 상태</th>
              <th>상세 사유</th>
            </tr>
          </thead>
          <tbody id="audit-log-tbody">
            <tr>
              <td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">
                로그를 불러오는 중입니다...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  let logsData = [];

  const userSelect = contentArea.querySelector('#filter-audit-user');
  const statusSelect = contentArea.querySelector('#filter-audit-status');
  const countEl = contentArea.querySelector('#audit-log-count');
  const tbody = contentArea.querySelector('#audit-log-tbody');
  const refreshBtn = contentArea.querySelector('#btn-refresh-audit-logs');

  // 등록된 사용자 목록 채우기
  const users = store.getAll('users');
  users.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u.id;
    opt.textContent = `${u.name} (${u.id})`;
    userSelect.appendChild(opt);
  });

  function renderTable() {
    const selectedUser = userSelect.value;
    const selectedStatus = statusSelect.value;

    let filtered = logsData.filter(log => {
      if (selectedUser && log.user_id !== selectedUser) return false;
      if (selectedStatus && log.status !== selectedStatus) return false;
      return true;
    });

    countEl.textContent = `총 ${filtered.length}건 기록`;

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">접속 로그가 없습니다.</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map(log => {
      const dateStr = log.created_at ? new Date(log.created_at).toLocaleString('ko-KR') : '-';
      const uName = log.user_name ? `${log.user_name} (${log.user_id})` : log.user_id;
      const uaParsed = parseUserAgent(log.user_agent);
      const statusBadge = getStatusBadge(log.status);
      const reason = log.fail_reason || '-';

      return `
        <tr>
          <td style="font-family: monospace; font-size: 12px; color: var(--text-secondary);">${dateStr}</td>
          <td style="font-weight: var(--weight-medium);">${uName}</td>
          <td style="font-family: monospace; font-size: 12px;">${log.ip || '-'}</td>
          <td style="font-size: 12px; color: var(--text-secondary);">${uaParsed}</td>
          <td>${statusBadge}</td>
          <td style="font-size: 13px; color: var(--text-secondary);">${reason}</td>
        </tr>
      `;
    }).join('');
  }

  async function loadAndDisplayLogs() {
    refreshBtn.disabled = true;
    tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">접속 로그를 새로고침하는 중...</td></tr>';
    logsData = await fetchAccessLogs();
    refreshBtn.disabled = false;
    renderTable();
  }

  userSelect.addEventListener('change', renderTable);
  statusSelect.addEventListener('change', renderTable);
  refreshBtn.addEventListener('click', loadAndDisplayLogs);

  loadAndDisplayLogs();
}

// 사용자 추가/수정 모달
function openUserModal(existingUser = null) {
  const content = document.createElement('div');
  const brands = store.getAll('brands');
  const lives = store.getAll('live_broadcasts');

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
        ${lives.map(l => `<option value="live_stream:${l.id}" ${existingUser && existingUser.role === `live_stream:${l.id}` ? 'selected' : ''}>라이브 매니저 - ${l.title ? l.title + ' ' : ''}(${l.id})</option>`).join('')}
        ${brands.map(b => `<option value="brand:${b.id}" ${existingUser && existingUser.role === `brand:${b.id}` ? 'selected' : ''}>파트너사 - ${b.name} (${b.id})</option>`).join('')}
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

    let finalPw = pw;
    if (existingUser) {
      if (pw !== existingUser.password) {
        finalPw = CryptoJS.SHA256(pw).toString();
      }
      store.update('users', id, { password: finalPw, name, role });
      showSuccess('사용자 정보가 수정되었습니다.');
    } else {
      if (store.getById('users', id)) {
        showError('이미 존재하는 아이디입니다.');
        return;
      }
      finalPw = CryptoJS.SHA256(pw).toString();
      store.create('users', { id, password: finalPw, name, role });
      showSuccess('새로운 사용자가 등록되었습니다.');
    }
    
    closeModal();
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
