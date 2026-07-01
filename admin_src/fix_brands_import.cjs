const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/brands.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/import { formatCurrency, formatNumber, formatDate, formatROI } from '\.\.\/utils\/format\.js';/, "import { formatCurrency, formatNumber, formatDate, formatROI, formatCurrencyShort } from '../utils/format.js';");

fs.writeFileSync(file, content);
