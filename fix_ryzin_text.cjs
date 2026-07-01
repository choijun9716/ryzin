const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const targetLogic = `    if (window._heartToggle) {
      heart.innerHTML = \`<svg width="24" height="24" viewBox="0 0 24 24" fill="\${heartColor}" stroke="\${heartColor}" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>\`;
    } else {
      heart.innerHTML = \`<span style="font-size: 14px; font-weight: 800; color: \${heartColor}; font-style: italic; text-shadow: 0 1px 3px rgba(0,0,0,0.5);">RYZIN</span>\`;
    }`;

const newLogic = `    if (window._heartToggle) {
      heart.innerHTML = \`<svg width="24" height="24" viewBox="0 0 24 24" fill="\${heartColor}" stroke="\${heartColor}" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>\`;
    } else {
      heart.innerHTML = \`<span style="font-size: 16px; font-weight: 900; color: #000; font-style: italic; -webkit-text-stroke: 1.5px #fff; paint-order: stroke fill; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">RYZIN</span>\`;
    }`;

content = content.replace(targetLogic, newLogic);
fs.writeFileSync(file, content);
