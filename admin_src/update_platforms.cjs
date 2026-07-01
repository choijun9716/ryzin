const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/models.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/export const PLATFORMS = \[.*\];/, "export const PLATFORMS = ['네이버', '카카오', '쿠팡', '그립', '자사몰', '유튜브', '틱톡'];");

fs.writeFileSync(file, content);
