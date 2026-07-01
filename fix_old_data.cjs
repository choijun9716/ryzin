const fs = require('fs');

// 1. live.js: fix .0K jumping
let fileLive = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let contentLive = fs.readFileSync(fileLive, 'utf8');

contentLive = contentLive.replace(
  "likeCountEl.textContent = (likeCount / 1000).toFixed(1) + 'K';",
  "likeCountEl.textContent = (likeCount / 1000).toFixed(1).replace(/\\.0$/, '') + 'K';"
);
contentLive = contentLive.replace(
  "likeCountEl.textContent = (likeCount / 1000).toFixed(1) + 'K';",
  "likeCountEl.textContent = (likeCount / 1000).toFixed(1).replace(/\\.0$/, '') + 'K';"
);

fs.writeFileSync(fileLive, contentLive);

// 2. index.html: Remove hardcoded text
let fileHtml = '/Users/chaeijun/Downloads/ryzin-main 2/live/index.html';
let contentHtml = fs.readFileSync(fileHtml, 'utf8');

contentHtml = contentHtml.replace('<span id="view-count">1,204명 시청중</span>', '<span id="view-count"></span>');
contentHtml = contentHtml.replace('<h1 class="brand-name">Ryzin Corp</h1>', '<h1 class="brand-name"></h1>');
contentHtml = contentHtml.replace('<p class="broadcast-title">단독 특가 라이브 방송 중!</p>', '<p class="broadcast-title"></p>');
contentHtml = contentHtml.replace('<span class="label" id="like-count">12K</span>', '<span class="label" id="like-count"></span>');

// Cache bust
contentHtml = contentHtml.replace(/live\.js\?v=\d+/, 'live.js?v=' + Date.now());

fs.writeFileSync(fileHtml, contentHtml);

