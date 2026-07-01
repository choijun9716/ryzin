const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const targetLogic = `    // 다이내믹 하트 이펙트 (색상 랜덤, 곡선 이동)
    const colors = ['#e50914', '#ff4081', '#ffca28', '#29b6f6', '#66bb6a'];
    const heartColor = colors[Math.floor(Math.random() * colors.length)];
    
    const heart = document.createElement('div');
    heart.innerHTML = \`<svg width="24" height="24" viewBox="0 0 24 24" fill="\${heartColor}" stroke="\${heartColor}" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>\`;
    heart.style.position = 'absolute';`;

const newLogic = `    // 하트 / RYZIN 텍스트 번갈아 띄우기
    window._heartToggle = !window._heartToggle; // 번갈아가며 나타나도록 전역 변수 사용 (또는 클로저)
    
    const colors = ['#e50914', '#ff4081', '#ffca28', '#29b6f6', '#66bb6a'];
    const heartColor = colors[Math.floor(Math.random() * colors.length)];
    
    const heart = document.createElement('div');
    if (window._heartToggle) {
      heart.innerHTML = \`<svg width="24" height="24" viewBox="0 0 24 24" fill="\${heartColor}" stroke="\${heartColor}" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>\`;
    } else {
      heart.innerHTML = \`<span style="font-size: 14px; font-weight: 800; color: \${heartColor}; font-style: italic; text-shadow: 0 1px 3px rgba(0,0,0,0.5);">RYZIN</span>\`;
    }
    heart.style.position = 'absolute';`;

content = content.replace(targetLogic, newLogic);
fs.writeFileSync(file, content);
