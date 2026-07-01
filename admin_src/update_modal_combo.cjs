const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/projects.js';
let content = fs.readFileSync(file, 'utf8');

// Replace HTML part
const htmlTarget = `<div class="input-group" style="position: relative;">
        <label class="required">쇼호스트</label>
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
          <input type="text" id="match-host-search" class="input" placeholder="이름 검색..." style="flex: 1; padding: 4px 8px; font-size: 12px;">
        </div>
        <select class="input" id="match-host" size="5" style="height: auto; min-height: 120px;">
          <option value="">선택</option>
          \${hosts.map(h => \`<option value="\${h.id}" data-name="\${h.name}" \${match.hostId === h.id ? 'selected' : ''}>\${h.name}</option>\`).join('')}
        </select>
      </div>`;

const htmlReplace = `<div class="input-group" style="position: relative;">
        <label class="required">쇼호스트</label>
        <input type="hidden" id="match-host" value="\${match.hostId || ''}">
        <input type="text" class="input" id="match-host-search" placeholder="쇼호스트 이름 검색 및 선택..." autocomplete="off" value="\${match.hostId ? (hosts.find(h=>h.id===match.hostId)?.name || '') : ''}">
        <div id="match-host-dropdown" style="display:none; position:absolute; top:calc(100% + 4px); left:0; right:0; max-height:200px; overflow-y:auto; background:var(--bg-primary); border:1px solid var(--border-default); border-radius:var(--radius-md); box-shadow:var(--shadow-md); z-index:1000;">
        </div>
      </div>`;

content = content.replace(htmlTarget, htmlReplace);

// Replace JS part
const jsTargetRegex = /setTimeout\(\(\) => \{\n\s*const searchInput = document\.getElementById\('match-host-search'\);\n\s*const selectEl = document\.getElementById\('match-host'\);\n\s*if \(searchInput && selectEl\) \{\n\s*searchInput\.addEventListener\('input', \(e\) => \{\n\s*const term = e\.target\.value\.toLowerCase\(\);\n\s*const filtered = hosts\.filter\(h => h\.name\.toLowerCase\(\)\.includes\(term\)\);\n\s*selectEl\.innerHTML = '<option value="">선택<\/option>' \+\s*\n\s*filtered\.map\(h => `<option value="\$\{h\.id\}" data-name="\$\{h\.name\}" \$\{match\.hostId === h\.id \? 'selected' : ''\}>\$\{h\.name\}<\/option>`\)\.join\(''\);\n\s*\}\);\n\s*\}\n\s*\}, 0\);/m;

const jsReplace = `setTimeout(() => {
    const searchInput = document.getElementById('match-host-search');
    const hiddenInput = document.getElementById('match-host');
    const dropdown = document.getElementById('match-host-dropdown');
    
    const renderOptions = (term) => {
      const filtered = hosts.filter(h => h.name.toLowerCase().includes(term));
      if(filtered.length === 0) {
        dropdown.innerHTML = '<div style="padding: 8px 12px; color: var(--text-tertiary); font-size: var(--text-sm);">검색 결과가 없습니다.</div>';
        return;
      }
      dropdown.innerHTML = filtered.map(h => 
        \`<div class="dropdown-item" data-id="\${h.id}" data-name="\${h.name}" style="padding: 8px 12px; cursor: pointer; font-size: var(--text-sm); border-bottom: 1px solid var(--border-light); transition: background var(--transition-fast);">
          \${h.name}
        </div>\`
      ).join('');
      
      dropdown.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
          searchInput.value = item.getAttribute('data-name');
          hiddenInput.value = item.getAttribute('data-id');
          dropdown.style.display = 'none';
        });
        item.addEventListener('mouseenter', () => item.style.background = 'var(--bg-hover)');
        item.addEventListener('mouseleave', () => item.style.background = 'transparent');
      });
    };

    if (searchInput && dropdown) {
      searchInput.addEventListener('focus', () => {
        dropdown.style.display = 'block';
        renderOptions(searchInput.value.toLowerCase());
      });

      searchInput.addEventListener('input', (e) => {
        dropdown.style.display = 'block';
        hiddenInput.value = ''; 
        renderOptions(e.target.value.toLowerCase());
      });

      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.style.display = 'none';
          if(!hiddenInput.value) searchInput.value = '';
        }
      });
    }
  }, 0);`;

content = content.replace(jsTargetRegex, jsReplace);

fs.writeFileSync(file, content);
