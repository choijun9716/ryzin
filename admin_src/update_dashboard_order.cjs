const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/dashboard.js';
let content = fs.readFileSync(file, 'utf8');

// The block we want to move
const pdTasksBlock = `
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
      </div>`;

// The block for live projects
const projectsBlock = `
      <div class="section-header">
        <div>
          <h2 class="section-title">라이브 프로젝트</h2>
          <p class="section-subtitle">상태별 프로젝트 모아보기</p>
        </div>
        <div style="display: flex; gap: var(--space-3); align-items: center;">
          <select id="dashboard-filter" class="input" style="padding: 6px 12px; width: auto; font-size: 14px;">
            <option value="in_progress" \${currentProjectFilter === 'in_progress' ? 'selected' : ''}>진행 중 (기본)</option>
            <option value="ended" \${currentProjectFilter === 'ended' ? 'selected' : ''}>방송 종료</option>
            <option value="all" \${currentProjectFilter === 'all' ? 'selected' : ''}>전체 보기</option>
          </select>
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
        </div>
      </div>

      <div class="project-grid" id="project-grid">
        \${filteredProjects.length > 0
          ? filteredProjects
              .sort((a, b) => (a.broadcastDate || '').localeCompare(b.broadcastDate || ''))
              .map(p => renderProjectCard(p)).join('')
          : renderEmptyState()
        }
      </div>`;

const newPdTasksBlock = pdTasksBlock.replace('PD 해야 할 업무 (마감 임박)', '우선 처리 업무').replace('margin-bottom: var(--space-6);', '');

// Swap them in the string
// Right now they are positioned as pdTasksBlock + projectsBlock.
const originalString = pdTasksBlock + "\n\n" + projectsBlock;
const newString = projectsBlock + "\n\n" + newPdTasksBlock;

content = content.replace(originalString, newString);

fs.writeFileSync(file, content);
