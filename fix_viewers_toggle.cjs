const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `        const titleEl = document.querySelector('.broadcast-title');
        if(titleEl) titleEl.textContent = c.title;
        const brandLogo = document.querySelector('.brand-logo');
        if(brandLogo && c.logoUrl) brandLogo.src = c.logoUrl;`;

const newStr = `        const titleEl = document.querySelector('.broadcast-title');
        if(titleEl) titleEl.textContent = c.title;
        const brandLogo = document.querySelector('.brand-logo');
        if(brandLogo && c.logoUrl) brandLogo.src = c.logoUrl;
        const viewCountWrapper = document.querySelector('.view-count');
        if(viewCountWrapper) {
          viewCountWrapper.style.display = (c.showViewers === false) ? 'none' : 'block';
        }`;

if(content.includes(targetStr)) {
  content = content.replace(targetStr, newStr);
  fs.writeFileSync(file, content);
}
