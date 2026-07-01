const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/brands.js';
let content = fs.readFileSync(file, 'utf8');

// Replace store.getProjectResult(p.id) with store.getAll('results').find(r => r.liveId === p.id)
content = content.replace(/store\.getProjectResult\(p\.id\)/g, "store.getAll('results').find(r => r.liveId === p.id)");
content = content.replace(/renderStatusBadge\(p\.status\)/g, "renderStatusBadge(p.broadcastStatus)");

fs.writeFileSync(file, content);
