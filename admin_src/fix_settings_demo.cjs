const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/settings.js';
let content = fs.readFileSync(file, 'utf8');

const saasBox = `
      <!-- SaaS 데모 (구독 관리) -->
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

`;

content = content.replace("<!-- SaaS 데모 모드 스위치 -->", saasBox + "      <!-- SaaS 데모 모드 스위치 -->");

fs.writeFileSync(file, content);
