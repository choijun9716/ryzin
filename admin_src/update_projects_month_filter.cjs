const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/projects.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Add logic to extract available months right before rendering the filter bar
const availableMonthsLogic = `
    const availableMonths = [...new Set(projects.map(p => {
      if (p.broadcastDate) {
        const d = new Date(p.broadcastDate.replace(/\\./g, '-'));
        if (!isNaN(d.getTime())) return \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}\`;
      }
      if (p.broadcastMonth) {
        let m = String(p.broadcastMonth);
        if (!m.includes('-') && m.length <= 2) m = \`2026-\${m.padStart(2, '0')}\`;
        return m;
      }
      return null;
    }).filter(Boolean))].sort().reverse();

    let bodyHtml = '';`;

content = content.replace(/let bodyHtml = '';/, availableMonthsLogic);


// 2. Add the select dropdown to the HTML
const filterHtmlTarget = `<select class="filter-select \${filters.status ? 'active' : ''}" id="filter-status">`;
const filterHtmlReplace = `<select class="filter-select \${filters.month ? 'active' : ''}" id="filter-month">
            <option value="">전체 월</option>
            \${availableMonths.map(m => \`<option value="\${m}" \${filters.month === m ? 'selected' : ''}>\${m}</option>\`).join('')}
          </select>
          <select class="filter-select \${filters.status ? 'active' : ''}" id="filter-status">`;

content = content.replace(filterHtmlTarget, filterHtmlReplace);

fs.writeFileSync(file, content);
