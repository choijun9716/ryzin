const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/dashboard.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Inject pdTasks calculation before container.innerHTML
const pdTasksLogic = `
  const pdTasks = [];
  projects.filter(p => p.broadcastStatus !== 'done').forEach(p => {
    let offset = 0;
    if (p.broadcastStatus === 'design') offset = -4;
    else if (p.broadcastStatus === 'cue_sheet') offset = -5;
    else if (p.broadcastStatus === 'host_cast') offset = -7;
    
    if (offset !== 0 && p.broadcastDate) {
      const bDate = new Date(p.broadcastDate.replace(/\\./g, '-'));
      if (!isNaN(bDate.getTime())) {
        const dDate = new Date(bDate);
        dDate.setDate(dDate.getDate() + offset);
        
        const today = new Date();
        today.setHours(0,0,0,0);
        const diffDays = Math.ceil((dDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        const brand = store.getById('brands', p.brandId);
        
        pdTasks.push({
          project: p,
          brandName: p.brandName || (brand ? brand.name : '-'),
          diffDays,
          ddayText: diffDays === 0 ? 'D-Day' : (diffDays > 0 ? \`D-\${diffDays}\` : \`D+\${Math.abs(diffDays)}\`)
        });
      }
    }
  });
  pdTasks.sort((a, b) => a.diffDays - b.diffDays);

  container.innerHTML = \``;

content = content.replace("container.innerHTML = `", pdTasksLogic);

// 2. Inject the UI right before 라이브 프로젝트 section header
const uiTarget = `<div class="section-header">
        <div>
          <h2 class="section-title">라이브 프로젝트</h2>`;

const pdTasksUI = `
      <div class="section-header" style="margin-top: var(--space-6);">
        <div>
          <h2 class="section-title">PD 해야 할 업무 (마감 임박)</h2>
          <p class="section-subtitle">현재 단계의 마감 기한이 얼마 남지 않은 프로젝트</p>
        </div>
      </div>
      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="table-scroll">
          <table class="data-table">
            <thead><tr><th>브랜드</th><th>방송일</th><th>업무 단계</th><th class="text-right">남은 기한</th></tr></thead>
            <tbody>
              \${pdTasks.length > 0 ? pdTasks.map(t => \`
                <tr style="cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--surface-hover)'" onmouseout="this.style.background=''" class="pd-task-row" data-id="\${t.project.id}">
                  <td><span style="font-weight: var(--weight-medium);">\${t.brandName}</span></td>
                  <td>\${t.project.broadcastDate}</td>
                  <td>\${renderBroadcastBadge(t.project.broadcastStatus)}</td>
                  <td class="text-right"><span style="color: \${t.diffDays <= 1 ? 'var(--status-error)' : 'var(--text-secondary)'}; font-weight: 600;">\${t.ddayText}</span></td>
                </tr>
              \`).join('') : '<tr><td colspan="4" class="text-center" style="padding: var(--space-6); color: var(--text-tertiary);">현재 마감 기한이 있는 업무가 없습니다.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <div class="section-header">
        <div>
          <h2 class="section-title">라이브 프로젝트</h2>`;

content = content.replace(uiTarget, pdTasksUI);

// 3. Bind click events for pd-task-row
const eventTarget = `// 신규 등록 버튼`;
const eventReplace = `// PD 업무 행 클릭 -> 모달 열기
    container.querySelectorAll('.pd-task-row').forEach(row => {
      row.addEventListener('click', () => {
        const projectId = row.getAttribute('data-id');
        openStatusModal(projectId);
      });
    });

    // 신규 등록 버튼`;

content = content.replace(eventTarget, eventReplace);

fs.writeFileSync(file, content);
