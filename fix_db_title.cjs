const fs = require('fs');

let fileAdmin = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/live_stream.js';
let contentAdmin = fs.readFileSync(fileAdmin, 'utf8');

const targetData = `      const data = {
        '방이름': '기본방송', // TODO: 추후 멀티룸 지원시 동적 할당
        '브랜드명': config.brandName,
        '프로필이미지': config.logoUrl,
        'URL': config.streamUrl,`;

const newData = `      const data = {
        '방이름': '기본방송',
        '제목': config.brandName,
        '부제목': config.title,
        '프로필이미지': config.logoUrl,
        'URL': config.streamUrl,`;

contentAdmin = contentAdmin.replace(targetData, newData);
fs.writeFileSync(fileAdmin, contentAdmin);

