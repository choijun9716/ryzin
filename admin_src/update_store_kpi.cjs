const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/store.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /getDashboardKPI\(\) \{[\s\S]*?return \{[\s\S]*?\};\n\s*\}/;

const newFunc = `getDashboardKPI() {
    const projects = this.getAll('projects');
    const results = this.getAll('results');
    const finances = this.getAll('finances');
    
    const now = new Date();
    const currentMonthNum = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    
    // 이번주 날짜 계산
    const dayOfWeek = now.getDay(); // 0(일) ~ 6(토)
    const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); 
    const monday = new Date(now.setDate(diffToMonday));
    monday.setHours(0,0,0,0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23,59,59,999);

    // 복구 (now 객체 변조 방지)
    const trueNow = new Date();

    let thisWeekBroadcasts = 0;
    let monthProjectIds = [];

    projects.forEach(p => {
      if (!p.broadcastDate) return;
      const bDate = new Date(p.broadcastDate.replace(/\\./g, '-'));
      if (isNaN(bDate.getTime())) return;
      
      // 이번달 방송 체크
      if (bDate.getFullYear() === currentYear && (bDate.getMonth() + 1) === currentMonthNum) {
        monthProjectIds.push(p.id);
      }
      
      // 이번주 방송 체크
      if (bDate >= monday && bDate <= sunday) {
        thisWeekBroadcasts++;
      }
    });

    const monthBroadcasts = monthProjectIds.length;

    // 이번달 매출
    const monthResults = results.filter(r => monthProjectIds.includes(r.liveId));
    const monthRevenue = monthResults.reduce((sum, r) => sum + (parseInt(r.liveRevenue) || 0), 0);

    // 정산대기 (settleStatus === 'wait' or 'processing')
    // 또는 프로젝트의 상태에 따라.
    const settleWaitIds = projects.filter(p => p.settleStatus === 'pending' || p.settleStatus === 'wait').map(p => p.id);
    const settleWaitAmount = finances.filter(f => settleWaitIds.includes(f.liveId)).reduce((sum, f) => sum + (parseInt(f.salesRevenue) || 0), 0);

    return {
      thisWeekBroadcasts,
      monthBroadcasts,
      monthRevenue,
      settleWaitAmount
    };
  }`;

content = content.replace(regex, newFunc);
fs.writeFileSync(file, content);
