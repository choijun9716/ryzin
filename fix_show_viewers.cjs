const fs = require('fs');
let fileStream = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/live_stream.js';
let contentStream = fs.readFileSync(fileStream, 'utf8');

const targetStream = `'첫상품명': products.length > 0 ? products[0].name : ''`;
const newStream = `'첫상품명': products.length > 0 ? products[0].name : '',
        '시청자수노출': config.showViewers ? 'O' : 'X'`;

contentStream = contentStream.replace(targetStream, newStream);
fs.writeFileSync(fileStream, contentStream);

let fileLive = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let contentLive = fs.readFileSync(fileLive, 'utf8');

const targetLive = `showViewers: true // SheetDB에 없으므로 기본 true, 필요 시 추후 연동`;
const newLive = `showViewers: latest['시청자수노출'] !== 'X'`;

contentLive = contentLive.replace(targetLive, newLive);
fs.writeFileSync(fileLive, contentLive);
