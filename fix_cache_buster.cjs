const fs = require('fs');

let fileLive = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let contentLive = fs.readFileSync(fileLive, 'utf8');

const targetFetch = `const res = await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브관제')}\`);`;
const newFetch = `const res = await fetch(\`\${SHEETDB_URL}?sheet=\${encodeURIComponent('라이브관제')}&t=\${Date.now()}\`);`;

if (contentLive.includes(targetFetch)) {
  contentLive = contentLive.replace(targetFetch, newFetch);
  fs.writeFileSync(fileLive, contentLive);
}

let fileIndex = '/Users/chaeijun/Downloads/ryzin-main 2/live/index.html';
let contentIndex = fs.readFileSync(fileIndex, 'utf8');

contentIndex = contentIndex.replace(/live\.js\?v=\d+/, 'live.js?v=' + Date.now());
contentIndex = contentIndex.replace(/live\.css\?v=\d+/, 'live.css?v=' + Date.now());
fs.writeFileSync(fileIndex, contentIndex);

