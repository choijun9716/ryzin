const fs = require('fs');
let content = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

const badBlock = `
        const json = await res.json();
        if (json.status === 'success') {
          // tmpfiles.org/ URL을 tmpfiles.org/dl/ 로 변경해야 직접 이미지가 보입니다
          const url = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
          config.logoUrl = url;
          document.getElementById('logo-preview').src = url;
          saveConfig();
        } else {
          alert('이미지 업로드 실패');
        }
      } catch(e) { console.error(e); alert('이미지 업로드 에러'); }
      finally { btn.disabled = false; document.getElementById('logo-preview').style.opacity = '1'; }
    });`;

content = content.replace(badBlock, "");
fs.writeFileSync('admin_src/src/pages/live_stream.js', content);
