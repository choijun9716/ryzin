const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const targetLogic = `    // 하트 이펙트
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = btnLike.getBoundingClientRect().left + 10 + 'px';
    heart.style.top = btnLike.getBoundingClientRect().top - 20 + 'px';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 1s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);`;

const newLogic = `    // 다이내믹 하트 이펙트 (색상 랜덤, 곡선 이동)
    const colors = ['#e50914', '#ff4081', '#ffca28', '#29b6f6', '#66bb6a'];
    const heartColor = colors[Math.floor(Math.random() * colors.length)];
    
    const heart = document.createElement('div');
    heart.innerHTML = \`<svg width="24" height="24" viewBox="0 0 24 24" fill="\${heartColor}" stroke="\${heartColor}" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>\`;
    heart.style.position = 'absolute';
    
    // 버튼 위치를 기준으로 시작 (중앙)
    const rect = btnLike.getBoundingClientRect();
    heart.style.left = rect.left + (rect.width / 2) - 12 + 'px';
    heart.style.top = rect.top + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    
    // 랜덤 이동 경로 계산
    const randomX = (Math.random() - 0.5) * 100; // 좌우 퍼짐 정도
    heart.style.setProperty('--tx', randomX + 'px');
    
    heart.style.animation = 'dynamicFloatUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1500);`;

content = content.replace(targetLogic, newLogic);

const oldKeyframes = `@keyframes floatUp {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
}`;

const newKeyframes = `@keyframes dynamicFloatUp {
  0% { 
    transform: translate(0, 0) scale(0.5); 
    opacity: 0; 
  }
  20% { 
    transform: translate(calc(var(--tx) * 0.2), -30px) scale(1.2); 
    opacity: 1; 
  }
  100% { 
    transform: translate(var(--tx), -200px) scale(1); 
    opacity: 0; 
  }
}`;

content = content.replace(oldKeyframes, newKeyframes);

fs.writeFileSync(file, content);
