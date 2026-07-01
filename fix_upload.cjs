const fs = require('fs');
let content = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

// The incorrect blocks are around line 276
const badBlock = `    // 프로필 이미지 파일 업로드
    document.getElementById('config-logoFile').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          config.logoUrl = evt.target.result;
          document.getElementById('logo-preview').src = config.logoUrl;
          saveConfig();
        };
        reader.readAsDataURL(file);
      }
    });

    // 썸네일 파일 업로드
    document.getElementById('config-thumbnailFile').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          config.thumbnailUrl = evt.target.result;
          document.getElementById('thumbnail-preview').src = config.thumbnailUrl;
          saveConfig();
        };
        reader.readAsDataURL(file);
      }
    });`;

const goodBlock = `    // 이미지 업로드 공통 함수 (Catbox/tmpfiles 무료 서버)
    const uploadImage = async (file, previewId, configKey) => {
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      
      const preview = document.getElementById(previewId);
      preview.style.opacity = '0.5';
      
      try {
        const res = await fetch('https://tmpfiles.org/api/v1/upload', {
          method: 'POST',
          body: formData
        });
        const json = await res.json();
        if (json.status === 'success') {
          const url = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
          config[configKey] = url;
          preview.src = url;
          saveConfig();
        } else {
          alert('이미지 업로드 실패');
        }
      } catch (err) {
        console.error(err);
        alert('이미지 업로드 에러');
      } finally {
        preview.style.opacity = '1';
      }
    };

    document.getElementById('config-logoFile').addEventListener('change', (e) => {
      uploadImage(e.target.files[0], 'logo-preview', 'logoUrl');
    });

    document.getElementById('config-thumbnailFile').addEventListener('change', (e) => {
      uploadImage(e.target.files[0], 'thumbnail-preview', 'thumbnailUrl');
    });`;

content = content.replace(badBlock, goodBlock);
fs.writeFileSync('admin_src/src/pages/live_stream.js', content);
