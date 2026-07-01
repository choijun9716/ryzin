const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `        const titleEl = document.querySelector('.broadcast-title');
        if(titleEl) titleEl.textContent = c.title;`;

const newStr = `        const titleEl = document.querySelector('.broadcast-title');
        if(titleEl) titleEl.textContent = c.title;
        const brandNameEl = document.querySelector('.brand-name');
        if(brandNameEl && c.brandName) brandNameEl.textContent = c.brandName;`;

if(content.includes(targetStr)) {
  content = content.replace(targetStr, newStr);
  fs.writeFileSync(file, content);
}
