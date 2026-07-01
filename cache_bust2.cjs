const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/live/index.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/src="live\.js\?v=\d+"/g, 'src="live.js?v=' + Date.now() + '"');

fs.writeFileSync(file, content);
