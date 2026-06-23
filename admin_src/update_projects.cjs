const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/projects.js';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Replace container.innerHTML to handle both views and add toggle buttons
const oldHtmlStart = `    container.innerHTML = \`
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">라이브 관리</h1>
            <p class="page-description">전체 라이브 방송 프로젝트 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
        </div>
      </div>
      <div class="page-body">
        <!-- 필터바 -->`;

const newHtmlStart = `
    function renderCalendarView(enriched) {
      const year = calendarDate.getFullYear();
      const month = calendarDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = new Date();
      const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
      
      let daysHtml = '';
      for (let i = 0; i < firstDay; i++) {
        daysHtml += \`<div class="calendar-day empty"></div>\`;
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = \`\${year}-\${String(month + 1).padStart(2, '0')}-\${String(d).padStart(2, '0')}\`;
        const dayProjects = enriched.filter(p => p.broadcastDate === dateStr);
        const isToday = isCurrentMonth && today.getDate() === d;
        
        const projectsHtml = dayProjects.map(p => {
          let badgeColor = '#e2e8f0'; let textColor = '#475569';
          if (p.broadcastStatus === 'ready') { badgeColor = '#dbeafe'; textColor = '#2563eb'; }
          else if (p.broadcastStatus === 'live') { badgeColor = '#fee2e2'; textColor = '#dc2626'; }
          else if (p.broadcastStatus === 'done') { badgeColor = '#dcfce3'; textColor = '#16a34a'; }
          else if (p.broadcastStatus === 'cancel') { badgeColor = '#f1f5f9'; textColor = '#64748b'; }
          return \`
            <div class="calendar-project-block clickable" data-id="\${p.id}" style="background-color: \${badgeColor}; color: \${textColor}; border-left: 3px solid \${textColor};">
              <div class="cp-time">\${p.broadcastTime || '-'}</div>
              <div class="cp-brand">\${p.brandName || (p.brand ? p.brand.name : '-')}</div>
            </div>\`;
        }).join('');
        daysHtml += \`
          <div class="calendar-day \${isToday ? 'today' : ''}">
            <div class="calendar-date">\${d}</div>
            <div class="calendar-projects">\${projectsHtml}</div>
          </div>\`;
      }
      return \`
        <style>
          .calendar-wrapper { background: #fff; border-radius: var(--radius-lg); border: 1px solid var(--border-color); overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          .calendar-header { display: flex; justify-content: space-between; align-items: center; padding: var(--space-4) var(--space-5); border-bottom: 1px solid var(--border-color); background: #f8fafc; }
          .calendar-title { font-size: 18px; font-weight: bold; color: var(--text-primary); }
          .calendar-nav { display: flex; gap: var(--space-2); }
          .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
          .calendar-dow { text-align: center; font-weight: bold; padding: var(--space-3) 0; border-bottom: 1px solid var(--border-color); font-size: 13px; color: var(--text-secondary); background: #fff; }
          .calendar-day { min-height: 120px; padding: var(--space-2); border-bottom: 1px solid var(--border-color); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; gap: var(--space-1); background: #fff; }
          .calendar-day:nth-child(7n) { border-right: none; }
          .calendar-day.empty { background: #f8fafc; }
          .calendar-date { font-size: 14px; font-weight: 500; color: var(--text-secondary); padding: 2px 6px; align-self: flex-start; border-radius: 4px; }
          .calendar-day.today .calendar-date { background: #3b82f6; color: white; }
          .calendar-projects { display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto; }
          .calendar-project-block { padding: 4px 6px; border-radius: 4px; font-size: 11px; cursor: pointer; transition: transform 0.2s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: flex; flex-direction: column; gap: 2px; }
          .calendar-project-block:hover { transform: translateY(-1px); filter: brightness(0.95); }
          .cp-time { font-weight: bold; opacity: 0.8; font-size: 10px; }
          .cp-brand { font-weight: bold; overflow: hidden; text-overflow: ellipsis; }
        </style>
        <div class="calendar-wrapper">
          <div class="calendar-header">
            <button class="btn btn-secondary btn-icon" id="btn-prev-month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div class="calendar-title">\${year}년 \${month + 1}월</div>
            <button class="btn btn-secondary btn-icon" id="btn-next-month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
          <div class="calendar-grid">
            <div class="calendar-dow" style="color: #ef4444;">일</div>
            <div class="calendar-dow">월</div>
            <div class="calendar-dow">화</div>
            <div class="calendar-dow">수</div>
            <div class="calendar-dow">목</div>
            <div class="calendar-dow">금</div>
            <div class="calendar-dow" style="color: #3b82f6;">토</div>
            \${daysHtml}
          </div>
        </div>
      \`;
    }

    const headerHtml = \`
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">라이브 관리</h1>
            <p class="page-description">전체 라이브 방송 프로젝트 관리</p>
          </div>
        </div>
        <div class="page-header-right">
          <div style="display: flex; gap: 8px; margin-right: 16px;">
            <button class="btn btn-sm \${currentView === 'list' ? 'btn-primary' : 'btn-secondary'}" id="btn-view-list">리스트</button>
            <button class="btn btn-sm \${currentView === 'calendar' ? 'btn-primary' : 'btn-secondary'}" id="btn-view-calendar">캘린더</button>
          </div>
          <button class="btn btn-primary" id="btn-new-project">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            신규 등록
          </button>
        </div>
      </div>\`;

    let bodyHtml = '';
    if (currentView === 'list') {
      bodyHtml = \`
        <!-- 필터바 -->`;

content = content.replace(oldHtmlStart, newHtmlStart);

// Step 2: Ensure the closing tag of the view condition is placed correctly
const oldHtmlEnd = `              </tbody>
            </table>
          </div>
        </div>
      </div>
    \`;`;

const newHtmlEnd = `              </tbody>
            </table>
          </div>
        </div>
      \`;
    } else {
      bodyHtml = renderCalendarView(enriched);
    }
    
    container.innerHTML = headerHtml + '<div class="page-body">' + bodyHtml + '</div>';
`;
content = content.replace(oldHtmlEnd, newHtmlEnd);

// Step 3: Add event listeners for new buttons
const oldListeners = `    setTimeout(() => {
      container.querySelector('#project-search')?.addEventListener('input', (e) => {`;

const newListeners = `    setTimeout(() => {
      container.querySelector('#btn-view-list')?.addEventListener('click', () => {
        if (currentView !== 'list') { currentView = 'list'; render(); }
      });
      container.querySelector('#btn-view-calendar')?.addEventListener('click', () => {
        if (currentView !== 'calendar') { currentView = 'calendar'; render(); }
      });
      container.querySelector('#btn-prev-month')?.addEventListener('click', () => {
        calendarDate.setMonth(calendarDate.getMonth() - 1); render();
      });
      container.querySelector('#btn-next-month')?.addEventListener('click', () => {
        calendarDate.setMonth(calendarDate.getMonth() + 1); render();
      });
      container.querySelectorAll('.calendar-project-block').forEach(el => {
        el.addEventListener('click', () => {
          router.navigate(\`/projects/\${el.getAttribute('data-id')}\`);
        });
      });
      container.querySelector('#project-search')?.addEventListener('input', (e) => {`;

content = content.replace(oldListeners, newListeners);

fs.writeFileSync(file, content, 'utf8');
console.log('Update complete.');
