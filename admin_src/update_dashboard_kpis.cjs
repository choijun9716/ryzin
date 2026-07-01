const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/dashboard.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /\$\{renderKPI\('오늘 예정 방송'[\s\S]*?\$\{renderKPI\('정산 대기'[^}]*\}\)/;

const newHTML = `\${renderKPI('이번주 방송', formatNumber(kpi.thisWeekBroadcasts) + '건')}
        \${renderKPI('이번달 방송', formatNumber(kpi.monthBroadcasts) + '건')}
        \${renderKPI('이번달 매출', formatCurrencyShort(kpi.monthRevenue))}
        \${renderKPI('정산 대기', formatCurrencyShort(kpi.settleWaitAmount))}`;

content = content.replace(regex, newHTML);

fs.writeFileSync(file, content);
