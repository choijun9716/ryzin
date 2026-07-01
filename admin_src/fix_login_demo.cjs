const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/login.js';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `            <div class="login-subtitle">라이브커머스 운영 관리 시스템</div>`;
const replacementStr = `            <div class="login-subtitle">라이브커머스 운영 관리 시스템</div>
            \${store.isDemoMode ? \`
            <div style="background: rgba(239,68,68,0.1); color: var(--status-error); padding: 12px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; text-align: center; border: 1px solid rgba(239,68,68,0.2);">
              <strong>데모 모드 접속 안내</strong><br>
              아이디: <strong>demo</strong> / 비밀번호: <strong>demo</strong>
            </div>
            \` : ''}`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync(file, content);
