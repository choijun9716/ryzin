const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/live_stream.js';
let content = fs.readFileSync(file, 'utf8');

const targetConfig = `  const defaultConfig = {
    title: '단독 특가 라이브 방송 중!',
    streamUrl: 'https://ib3fjwlmgu0bwksrq8ao15010.edge.naverncp.com/live/video/ls-20260701130603-WkL1g/1080p-16-9/playlist.m3u8',
    logoUrl: 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
    botEnabled: true,
    showViewers: true
  };`;

const newConfig = `  const defaultConfig = {
    brandName: 'Ryzin Corp',
    title: '단독 특가 라이브 방송 중!',
    streamUrl: 'https://ib3fjwlmgu0bwksrq8ao15010.edge.naverncp.com/live/video/ls-20260701130603-WkL1g/1080p-16-9/playlist.m3u8',
    logoUrl: 'https://ui-avatars.com/api/?name=R&background=0D8ABC&color=fff',
    botEnabled: true,
    showViewers: true
  };`;

content = content.replace(targetConfig, newConfig);

const targetHTML = `    <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:16px;">📺 라이브 기본 설정</h3>
    <div class="form-group" style="margin-bottom:12px;">
      <label class="form-label">방송 제목</label>
      <input type="text" class="form-control" id="config-title" value="\${config.title}">
    </div>
    <div class="form-group" style="margin-bottom:12px;">
      <label class="form-label">스트리밍 URL (m3u8)</label>
      <input type="text" class="form-control" id="config-stream" value="\${config.streamUrl}">
    </div>`;

const newHTML = `    <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:16px;">📺 라이브 기본 설정</h3>
    <div style="display:flex; gap:12px; margin-bottom:12px;">
      <div class="form-group" style="flex:1;">
        <label class="form-label">제목 (브랜드명)</label>
        <input type="text" class="form-control" id="config-brandName" value="\${config.brandName || 'Ryzin Corp'}">
      </div>
      <div class="form-group" style="flex:1;">
        <label class="form-label">부제목 (방송 제목)</label>
        <input type="text" class="form-control" id="config-title" value="\${config.title}">
      </div>
    </div>
    <div style="display:flex; gap:12px; margin-bottom:12px; align-items:flex-end;">
      <div class="form-group" style="flex:1;">
        <label class="form-label">프로필 이미지 (파일 선택)</label>
        <input type="file" class="form-control" id="config-logoFile" accept="image/*" style="font-size:12px;">
      </div>
      <div style="width:48px; height:48px; border-radius:50%; overflow:hidden; border:1px solid #eee;">
        <img id="logo-preview" src="\${config.logoUrl}" style="width:100%; height:100%; object-fit:cover;">
      </div>
    </div>
    <div class="form-group" style="margin-bottom:12px;">
      <label class="form-label">스트리밍 URL (m3u8)</label>
      <input type="text" class="form-control" id="config-stream" value="\${config.streamUrl}">
    </div>`;

content = content.replace(targetHTML, newHTML);

const targetEvents = `    bindConfigInput('config-title', 'title');
    bindConfigInput('config-stream', 'streamUrl');`;

const newEvents = `    bindConfigInput('config-brandName', 'brandName');
    bindConfigInput('config-title', 'title');
    bindConfigInput('config-stream', 'streamUrl');

    document.getElementById('config-logoFile').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      // Catbox 무료 서버로 업로드
      const formData = new FormData();
      formData.append('reqtype', 'fileupload');
      formData.append('fileToUpload', file);
      
      const btn = e.target;
      btn.disabled = true;
      document.getElementById('logo-preview').style.opacity = '0.5';
      
      try {
        const res = await fetch('https://catbox.moe/user/api.php', {
          method: 'POST',
          body: formData
        });
        const url = await res.text();
        if (url && url.startsWith('http')) {
          config.logoUrl = url;
          document.getElementById('logo-preview').src = url;
          saveConfig();
        } else {
          alert('이미지 업로드 실패: ' + url);
        }
      } catch (err) {
        console.error(err);
        alert('이미지 업로드 에러');
      } finally {
        btn.disabled = false;
        document.getElementById('logo-preview').style.opacity = '1';
      }
    });`;

content = content.replace(targetEvents, newEvents);

const targetSync = `        '업데이트시간': new Date().toISOString(),
        '제목': config.title,
        'URL': config.streamUrl,`;

const newSync = `        '업데이트시간': new Date().toISOString(),
        '제목': config.brandName,
        '부제목': config.title,
        '프로필이미지': config.logoUrl,
        'URL': config.streamUrl,`;

content = content.replace(targetSync, newSync);

fs.writeFileSync(file, content);
