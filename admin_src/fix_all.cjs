const fs = require('fs');

// --- 1. store.js 수정 ---
let storePath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let storeContent = fs.readFileSync(storePath, 'utf8');

// Fix init() to always ensure demo/admin users exist in Demo Mode
const initTarget = `  async init() {
    if (this.isDemoMode) {
      if (this._data.users.length === 0) {
        this._data.users = [
          { id: 'admin', name: '최고관리자 (데모)', password: CryptoJS.SHA256('admin').toString(), role: 'admin' },
          { id: 'demo', name: '데모 시연 계정', password: CryptoJS.SHA256('demo').toString(), role: 'admin' }
        ];
        this._save();
      }
      return true; // 데모 모드일 경우 시트 동기화 스킵
    }`;
const initReplace = `  async init() {
    if (this.isDemoMode) {
      // 강제로 데모/어드민 계정 보장
      const hasAdmin = this._data.users.find(u => u.id === 'admin');
      const hasDemo = this._data.users.find(u => u.id === 'demo');
      let changed = false;
      if (!hasAdmin) {
        this._data.users.push({ id: 'admin', name: '최고관리자 (데모)', password: CryptoJS.SHA256('admin').toString(), role: 'admin' });
        changed = true;
      }
      if (!hasDemo) {
        this._data.users.push({ id: 'demo', name: '데모 시연 계정', password: CryptoJS.SHA256('demo').toString(), role: 'admin' });
        changed = true;
      }
      if (changed) this._save();
      return true; // 데모 모드일 경우 시트 동기화 스킵
    }`;
storeContent = storeContent.replace(initTarget, initReplace);

fs.writeFileSync(storePath, storeContent);


// --- 2. login.js 수정 (데모 모드 OTP 패스) ---
let loginPath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/login.js';
let loginContent = fs.readFileSync(loginPath, 'utf8');

const loginTarget = `        if (user) {
          const isTrusted = localStorage.getItem(\`ryzin_otp_trusted_\${user.id}\`) === 'true';
          if (isTrusted) {
            store.completeLogin(user);
            showSuccess('환영합니다.');
            router.navigate('/');
            return;
          }
          pendingUser = user;`;

const loginReplace = `        if (user) {
          if (store.isDemoMode) {
            // 데모 모드에서는 OTP 생략
            store.completeLogin(user);
            showSuccess('데모 모드로 접속되었습니다.');
            router.navigate('/');
            return;
          }
          const isTrusted = localStorage.getItem(\`ryzin_otp_trusted_\${user.id}\`) === 'true';
          if (isTrusted) {
            store.completeLogin(user);
            showSuccess('환영합니다.');
            router.navigate('/');
            return;
          }
          pendingUser = user;`;
loginContent = loginContent.replace(loginTarget, loginReplace);

fs.writeFileSync(loginPath, loginContent);


// --- 3. settings.js 수정 (데모모드 박스 제거 및 토글을 SaaS 박스로 이동) ---
let settingsPath = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/settings.js';
let settingsContent = fs.readFileSync(settingsPath, 'utf8');

// The original big block of SaaS
const saasAndDemoTarget = `      <!-- SaaS 데모 (구독 관리) -->
      \${currentRole === 'admin' ? \`
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
              <div style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">\${store.getAll('users').length}명 <span style="font-size: var(--text-sm); font-weight: 400; color: var(--text-tertiary);">/ 무제한</span></div>
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
      \` : ''}

      <!-- SaaS 데모 모드 스위치 -->
      \${currentRole === 'admin' ? \`
      <div class="card" style="margin-bottom: var(--space-5); border: 2px solid \${store.isDemoMode ? 'var(--status-error)' : 'var(--primary-color)'};">
        <div class="card-header" style="background: \${store.isDemoMode ? 'rgba(239,68,68,0.1)' : 'var(--bg-secondary)'}; border-bottom: 1px solid \${store.isDemoMode ? 'var(--status-error)' : 'var(--border-light)'};">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="display: flex; align-items: center; gap: 8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="\${store.isDemoMode ? 'var(--status-error)' : 'var(--primary-color)'}" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              세일즈 데모 모드 설정
            </h3>
            <span class="badge" style="background: \${store.isDemoMode ? 'var(--status-error)' : 'var(--text-tertiary)'}; color: white;">
              \${store.isDemoMode ? '데모 모드 활성' : '운영 모드'}
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
              <input type="checkbox" id="toggle-demo-mode" \${store.isDemoMode ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      \` : ''}`;

// The replacement merges the toggle into the bottom of the SaaS card
const newSaasBlock = `      <!-- SaaS 데모 (구독 관리) -->
      \${currentRole === 'admin' ? \`
      <div class="card" style="margin-bottom: var(--space-5); \${store.isDemoMode ? 'border: 2px solid var(--status-error);' : ''}">
        <div class="card-header" style="\${store.isDemoMode ? 'background: rgba(239,68,68,0.1); border-bottom: 1px solid var(--status-error);' : 'background: var(--bg-secondary); border-bottom: 1px solid var(--border-light);'}">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="display: flex; align-items: center; gap: 8px;">
              SaaS 구독 관리 (데모)
            </h3>
            <span class="badge" style="background: \${store.isDemoMode ? 'var(--status-error)' : 'var(--text-tertiary)'}; color: white;">\${store.isDemoMode ? '데모 모드 활성' : '운영 모드'}</span>
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
              <div style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">\${store.getAll('users').length}명 <span style="font-size: var(--text-sm); font-weight: 400; color: var(--text-tertiary);">/ 무제한</span></div>
              <div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-2);">추가 과금 없음</div>
            </div>
            <div style="padding: var(--space-4); background: var(--bg-primary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-2);">다음 결제일</div>
              <div style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">2026.12.31</div>
              <div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-2);">자동 결제 설정됨</div>
            </div>
          </div>
          
          <div style="display: flex; gap: var(--space-3); justify-content: space-between; align-items: center; padding-top: var(--space-4); border-top: 1px solid var(--border-color);">
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: var(--text-md); margin-bottom: 4px;">데모 모드 활성화 상태</div>
              <div style="font-size: var(--text-xs); color: var(--text-tertiary);">토글 시 화면이 새로고침 되며 실제 데이터와 격리된 데모용 데이터베이스로 전환됩니다.</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="toggle-demo-mode" \${store.isDemoMode ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      \` : ''}`;

settingsContent = settingsContent.replace(saasAndDemoTarget, newSaasBlock);

fs.writeFileSync(settingsPath, settingsContent);

