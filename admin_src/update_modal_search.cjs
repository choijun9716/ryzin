const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/projects.js';
let content = fs.readFileSync(file, 'utf8');

const oldModalContent = `      <div class="input-group">
        <label class="required">쇼호스트</label>
        <select class="input" id="match-host">
          <option value="">선택</option>
          \${hosts.map(h => \`<option value="\${h.id}" \${match.hostId === h.id ? 'selected' : ''}>\${h.name}</option>\`).join('')}
        </select>
      </div>`;

const newModalContent = `      <div class="input-group" style="position: relative;">
        <label class="required">쇼호스트</label>
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
          <input type="text" id="match-host-search" class="input" placeholder="이름 검색..." style="flex: 1; padding: 4px 8px; font-size: 12px;">
        </div>
        <select class="input" id="match-host" size="5" style="height: auto; min-height: 120px;">
          <option value="">선택</option>
          \${hosts.map(h => \`<option value="\${h.id}" data-name="\${h.name}" \${match.hostId === h.id ? 'selected' : ''}>\${h.name}</option>\`).join('')}
        </select>
      </div>`;

content = content.replace(oldModalContent, newModalContent);

// Add event listener logic after openModal call
const oldOpenModal = `  openModal({ title: isEdit ? '쇼호스트 매칭 수정' : '쇼호스트 추가', size: 'md', content, footer });`;
const newOpenModal = `  openModal({ title: isEdit ? '쇼호스트 매칭 수정' : '쇼호스트 추가', size: 'md', content, footer });

  setTimeout(() => {
    const searchInput = document.getElementById('match-host-search');
    const selectEl = document.getElementById('match-host');
    if (searchInput && selectEl) {
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        Array.from(selectEl.options).forEach(opt => {
          if (opt.value === '') return;
          const name = opt.getAttribute('data-name').toLowerCase();
          opt.style.display = name.includes(term) ? '' : 'none';
        });
      });
    }
  }, 0);`;

content = content.replace(oldOpenModal, newOpenModal);

fs.writeFileSync(file, content);
