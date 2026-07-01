const fs = require('fs');
let content = fs.readFileSync('live/live.js', 'utf8');

// 1. In pollConfig, handle thumbnailUrl and liveStartTime
const targetConfigParse = `        const brandNameEl = document.querySelector('.brand-name');`;
const replacementConfigParse = `        const brandNameEl = document.querySelector('.brand-name');
        
        // 썸네일 및 시작 시간 적용
        const thumbImg = document.getElementById('thumbnail-img');
        const startText = document.getElementById('live-start-text');
        
        if (c.thumbnailUrl && thumbImg) {
          thumbImg.src = c.thumbnailUrl;
          thumbImg.style.display = 'block';
        } else if (thumbImg) {
          thumbImg.style.display = 'none';
        }
        
        if (c.liveStartTime && startText) {
          startText.textContent = c.liveStartTime;
        } else if (startText) {
          startText.textContent = '';
        }
`;
content = content.replace(targetConfigParse, replacementConfigParse);

// 2. Remove autoplay from HLS setup, and add start live button listener
// Let's find HLS logic.
const targetHlsPlay = `        hls.loadSource(c.streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          video.play().catch(e => console.warn('자동재생 실패:', e));
        });`;
const replacementHlsPlay = `        
        // 썸네일 모드일 때는 스트리밍 소스 로드를 대기합니다.
        // 기존: 무조건 로드하고 재생
        // 변경: 썸네일 오버레이가 안 숨겨졌다면, 플레이 버튼 클릭 시 로드
        
        const overlay = document.getElementById('thumbnail-overlay');
        const btnStart = document.getElementById('btn-start-live');
        
        const startStream = () => {
          overlay.classList.add('hidden');
          hls.loadSource(c.streamUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play().catch(e => console.warn('재생 실패:', e));
          });
        };

        if (overlay && !overlay.classList.contains('hidden')) {
          if (btnStart) {
            btnStart.onclick = startStream;
          }
        } else {
          // 이미 플레이 중인 상태에서 url만 변경되었다면
          startStream();
        }`;
content = content.replace(targetHlsPlay, replacementHlsPlay);

fs.writeFileSync('live/live.js', content);
