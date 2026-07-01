const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/finance.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import { formatCurrency, formatCurrencyShort } from '../utils.js';", "import { formatCurrency, formatCurrencyShort } from '../utils/format.js';");

fs.writeFileSync(file, content);
