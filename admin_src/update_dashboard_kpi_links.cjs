const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/dashboard.js';
let content = fs.readFileSync(file, 'utf8');

// Modify renderKPI to accept a route
const renderKpiRegex = /function renderKPI\(label, value\) \{[\s\S]*?return `[\s\S]*?<div class="kpi-card">[\s\S]*?<\/div>[\s\S]*?`;\n\}/;
const newRenderKpi = `function renderKPI(label, value, route = null) {
  return \`
    <div class="kpi-card" \${route ? \`data-route="\${route}" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'"\` : ''}>
      <div class="kpi-label">\${label}</div>
      <div class="kpi-value">\${value}</div>
    </div>
  \`;
}`;

content = content.replace(renderKpiRegex, newRenderKpi);

// Update calls to renderKPI
const callsRegex = /<div class="dashboard-kpi-grid" id="kpi-grid">\s*\$\{renderKPI\('이번주 방송', formatNumber\(kpi.thisWeekBroadcasts\) \+ '건'\)\}\s*\$\{renderKPI\('이번달 방송', formatNumber\(kpi.monthBroadcasts\) \+ '건'\)\}\s*\$\{renderKPI\('이번달 매출', formatCurrencyShort\(kpi.monthRevenue\)\)\}\s*\$\{renderKPI\('정산 대기', formatCurrencyShort\(kpi.settleWaitAmount\)\)\}\s*<\/div>/;

const newCalls = `<div class="dashboard-kpi-grid" id="kpi-grid">
        \${renderKPI('이번주 방송', formatNumber(kpi.thisWeekBroadcasts) + '건', '/projects')}
        \${renderKPI('이번달 방송', formatNumber(kpi.monthBroadcasts) + '건', '/projects')}
        \${renderKPI('이번달 매출', formatCurrencyShort(kpi.monthRevenue), '/finance')}
        \${renderKPI('정산 대기', formatCurrencyShort(kpi.settleWaitAmount), '/settlement')}
      </div>`;

content = content.replace(callsRegex, newCalls);

// Add event listener binding inside renderDashboard setTimeout
const bindRegex = /\/\/ 프로젝트 카드 클릭/;
const newBind = `// KPI 카드 클릭
    container.querySelectorAll('.kpi-card[data-route]').forEach(card => {
      card.addEventListener('click', () => {
        router.navigate(card.getAttribute('data-route'));
      });
    });

    // 프로젝트 카드 클릭`;

content = content.replace(bindRegex, newBind);

fs.writeFileSync(file, content);
