const fs = require('fs');
let fileHtml = '/Users/chaeijun/Downloads/ryzin-main 2/live/index.html';
let contentHtml = fs.readFileSync(fileHtml, 'utf8');
contentHtml = contentHtml.replace(/live\.js\?v=\d+/, 'live.js?v=' + Date.now());
fs.writeFileSync(fileHtml, contentHtml);
