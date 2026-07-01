const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/settings.js';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `      <!-- SaaS 데모 (구독 관리) -->`;
const endStr = `      <!-- 데이터 관리 -->`;

const startIndex = content.indexOf(targetStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `      <!-- SaaS 데모 모드 스위치 -->
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
      \` : ''}

`;

  content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
}

// Add event listener binding
const eventTarget = `// 동기화 버튼`;
const eventReplace = `// 데모 모드 토글
    const demoToggle = container.querySelector('#toggle-demo-mode');
    if (demoToggle) {
      demoToggle.addEventListener('change', (e) => {
        const enable = e.target.checked;
        if (enable) {
          confirmDialog({
            title: '데모 모드 진입',
            message: '데모 모드를 켜시겠습니까?\\n실제 운영 데이터가 보이지 않게 되며, 텅 빈 초기 상태에서 시연용 데이터를 안전하게 조작할 수 있습니다.',
            confirmText: '데모 켜기',
            onConfirm: () => store.toggleDemoMode(true),
            onCancel: () => { demoToggle.checked = false; }
          });
        } else {
          confirmDialog({
            title: '운영 모드 복귀',
            message: '운영 모드로 돌아가시겠습니까?\\n다시 원래의 실제 운영 데이터를 불러옵니다.',
            confirmText: '복귀하기',
            onConfirm: () => store.toggleDemoMode(false),
            onCancel: () => { demoToggle.checked = true; }
          });
        }
      });
    }

    // 동기화 버튼`;

content = content.replace(eventTarget, eventReplace);

fs.writeFileSync(file, content);
