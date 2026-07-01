const fs = require('fs');

let fileAdmin = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/live_stream.js';
let contentAdmin = fs.readFileSync(fileAdmin, 'utf8');

// 1. 이모티콘 제거 및 UI 다듬기
contentAdmin = contentAdmin.replace('📺 라이브 기본 설정', '라이브 기본 설정');
contentAdmin = contentAdmin.replace('🛍️ 상품 관리', '상품 관리');
contentAdmin = contentAdmin.replace('📱 모바일 미리보기', '모바일 미리보기');
contentAdmin = contentAdmin.replace('💬 관리자 채팅 발송', '관리자 채팅 발송');

// 2. 우측 패널 레이아웃 및 9:16 비율 조정
// 기존: rightPanel.style.width = '400px';
contentAdmin = contentAdmin.replace("rightPanel.style.width = '400px';", "rightPanel.style.width = '380px';");

// 기존 previewCard 크기
const targetPreviewCard = `  previewCard.style.height = '600px';
  previewCard.style.display = 'flex';
  previewCard.style.flexDirection = 'column';
  previewCard.innerHTML = \`
    <div style="background:#111; color:#fff; padding:12px; font-weight:bold; display:flex; justify-content:space-between; align-items:center;">
      <span>모바일 미리보기</span>
      <button class="btn btn-primary btn-sm" id="btn-refresh-preview" style="padding:4px 8px;">새로고침</button>
    </div>
    <iframe id="live-preview-iframe" src="\${previewUrl}" style="width:100%; flex:1; border:none; background:#000;"></iframe>
  \`;`;

const newPreviewCard = `  // 9:16 모바일 비율 유지 (예: 360x640)
  previewCard.style.width = '360px';
  previewCard.style.height = '640px'; 
  previewCard.style.margin = '0 auto';
  previewCard.style.display = 'flex';
  previewCard.style.flexDirection = 'column';
  previewCard.style.borderRadius = '16px';
  previewCard.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
  previewCard.innerHTML = \`
    <div style="background:#2c3e50; color:#fff; padding:12px 16px; font-weight:bold; font-size:14px; display:flex; justify-content:space-between; align-items:center;">
      <span>모바일 미리보기</span>
      <button class="btn btn-primary btn-sm" id="btn-refresh-preview" style="padding:4px 10px; font-size:12px; border-radius:4px;">새로고침</button>
    </div>
    <iframe id="live-preview-iframe" src="\${previewUrl}" style="width:100%; flex:1; border:none; background:#000;"></iframe>
  \`;`;

if(contentAdmin.includes("previewCard.style.height = '600px';")) {
  contentAdmin = contentAdmin.replace(targetPreviewCard, newPreviewCard);
}

// 왼쪽 패널 카드 헤더 폰트 사이즈 조금 더 고급스럽게 조정
const targetHeader1 = `<h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:16px;">라이브 기본 설정</h3>`;
const newHeader1 = `<h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:16px; font-size:16px; font-weight:600; color:#333;">라이브 기본 설정</h3>`;
contentAdmin = contentAdmin.replace(targetHeader1, newHeader1);

const targetHeader2 = `<h3 style="margin:0;">상품 관리</h3>`;
const newHeader2 = `<h3 style="margin:0; font-size:16px; font-weight:600; color:#333;">상품 관리</h3>`;
contentAdmin = contentAdmin.replace(targetHeader2, newHeader2);

const targetHeader3 = `<h3 style="margin-top:0; margin-bottom:12px;">관리자 채팅 발송</h3>`;
const newHeader3 = `<h3 style="margin-top:0; margin-bottom:12px; font-size:16px; font-weight:600; color:#333;">관리자 채팅 발송</h3>`;
contentAdmin = contentAdmin.replace(targetHeader3, newHeader3);

fs.writeFileSync(fileAdmin, contentAdmin);
