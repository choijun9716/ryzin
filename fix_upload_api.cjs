const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/live_stream.js';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `      const formData = new FormData();
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
      } catch (err) {`;

const newStr = `      const formData = new FormData();
      formData.append('file', file);
      
      const btn = e.target;
      btn.disabled = true;
      document.getElementById('logo-preview').style.opacity = '0.5';
      
      try {
        const res = await fetch('https://tmpfiles.org/api/v1/upload', {
          method: 'POST',
          body: formData
        });
        const json = await res.json();
        if (json.status === 'success') {
          // tmpfiles.org/ URL을 tmpfiles.org/dl/ 로 변경해야 직접 이미지가 보입니다
          const url = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
          config.logoUrl = url;
          document.getElementById('logo-preview').src = url;
          saveConfig();
        } else {
          alert('이미지 업로드 실패: ' + JSON.stringify(json));
        }
      } catch (err) {`;

if (content.includes("https://catbox.moe/user/api.php")) {
  content = content.replace(targetStr, newStr);
  fs.writeFileSync(file, content);
}
