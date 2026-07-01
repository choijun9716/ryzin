const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/index.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('src="live.js"', 'src="live.js?v=' + Date.now() + '"');
content = content.replace('href="live.css"', 'href="live.css?v=' + Date.now() + '"');

fs.writeFileSync(file, content);
