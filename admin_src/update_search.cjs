const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/projects.js';
let content = fs.readFileSync(file, 'utf8');

// Replace placeholder
content = content.replace(/placeholder="방송제목 \(자연어\) 검색\.\.\."/, 'placeholder="검색"');

// Update search filter logic
const oldSearchFilter = `    // 검색
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      projects = projects.filter(p => {
        const brand = store.getById('brands', p.brandId);
        return (brand && brand.name.toLowerCase().includes(term)) ||
          (p.pd && p.pd.toLowerCase().includes(term));
      });
    }`;

const newSearchFilter = `    // 검색
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      projects = projects.filter(p => {
        const brand = store.getById('brands', p.brandId);
        
        // Get showhosts for this project
        const mappedHosts = store.query('liveHosts', lh => lh.liveId === p.id);
        const hasHostMatch = mappedHosts.some(lh => {
           const host = store.getById('hosts', lh.hostId);
           return host && host.name.toLowerCase().includes(term);
        });

        return (brand && brand.name.toLowerCase().includes(term)) || hasHostMatch;
      });
    }`;

content = content.replace(oldSearchFilter, newSearchFilter);

fs.writeFileSync(file, content);
