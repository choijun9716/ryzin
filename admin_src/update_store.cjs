const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(`finances: [],`, `finances: [],\n      crmClients: [],\n      crmActivities: [],`);
content = content.replace(`this._data.finances = data.finances || [];`, `this._data.finances = data.finances || [];\n      this._data.crmClients = data.crmClients || [];\n      this._data.crmActivities = data.crmActivities || [];`);

fs.writeFileSync(file, content);
