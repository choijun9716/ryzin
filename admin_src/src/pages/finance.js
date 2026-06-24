import { store } from '../data/store.js';
import { formatCurrency, formatCurrencyShort } from '../utils/format.js';

export function renderFinance() {
  const container = document.createElement('div');
  let selectedMonth = '';

  function render() {
    let projects = store.getAll('projects');
    const finances = store.getAll('finances');
    const results = store.getAll('results');

    // Extract available months for the dropdown
    const availableMonths = [...new Set(projects.map(p => {
      let m = p.broadcastMonth;
      if (p.broadcastDate) {
        const bDate = new Date(p.broadcastDate.replace(/\./g, '-'));
        if (!isNaN(bDate.getTime())) m = `${bDate.getFullYear()}-${String(bDate.getMonth() + 1).padStart(2, '0')}`;
      }
      if (m && !m.includes('-') && m.length <= 2) m = `2026-${String(m).padStart(2, '0')}`;
      return m;
    }).filter(Boolean))].sort().reverse();

    // If selectedMonth is set, filter projects and finances
    let filteredProjects = projects;
    let filteredFinances = finances;
    let filteredResults = results;
    
    if (selectedMonth) {
      filteredProjects = projects.filter(p => {
        let m = p.broadcastMonth;
        if (p.broadcastDate) {
          const bDate = new Date(p.broadcastDate.replace(/\./g, '-'));
          if (!isNaN(bDate.getTime())) m = `${bDate.getFullYear()}-${String(bDate.getMonth() + 1).padStart(2, '0')}`;
        }
        if (m && !m.includes('-') && m.length <= 2) m = `2026-${String(m).padStart(2, '0')}`;
        return m === selectedMonth;
      });
      const fpIds = filteredProjects.map(p => p.id);
      filteredFinances = finances.filter(f => fpIds.includes(f.liveId));
      filteredResults = results.filter(r => fpIds.includes(r.liveId));
    }

    // 월별 집계 (항상 전체 데이터로 보여줄지, 필터된 데이터로 보여줄지? 월별 집계는 월 필터 시 해당 월만 나옴)
    const monthlyMap = {};
    filteredProjects.forEach(p => {
      let m = p.broadcastMonth;
      if (p.broadcastDate) {
        const bDate = new Date(p.broadcastDate.replace(/\./g, '-'));
        if (!isNaN(bDate.getTime())) {
          m = `${bDate.getFullYear()}-${String(bDate.getMonth() + 1).padStart(2, '0')}`;
        }
      }
      if (!m) return;
      
      if (!m.includes('-') && m.length <= 2) {
        m = `2026-${String(m).padStart(2, '0')}`; 
      }
      
      if (!monthlyMap[m]) monthlyMap[m] = { month: m, revenue: 0, profit: 0, margin: 0, count: 0 };
      monthlyMap[m].count++;
      const f = filteredFinances.find(fi => fi.liveId === p.id);
      if (f) {
        monthlyMap[m].revenue += parseInt(f.salesRevenue) || 0;
        monthlyMap[m].profit += parseInt(f.operatingProfit) || 0;
        monthlyMap[m].margin += parseInt(f.netMargin) || 0;
      }
    });
    const monthlyData = Object.values(monthlyMap).sort((a, b) => b.month.localeCompare(a.month));

    // 전체 합계
    const totalRevenue = filteredFinances.reduce((s, f) => s + (parseInt(f.salesRevenue) || 0), 0);
    const totalProfit = filteredFinances.reduce((s, f) => s + (parseInt(f.operatingProfit) || 0), 0);
    const totalMargin = filteredFinances.reduce((s, f) => s + (parseInt(f.netMargin) || 0), 0);
    const totalAdCost = filteredFinances.reduce((s, f) => s + (parseInt(f.adCost) || 0), 0);
    const totalProdCost = filteredFinances.reduce((s, f) => s + (parseInt(f.productionCost) || 0), 0);
    const totalHostCost = filteredFinances.reduce((s, f) => s + (parseInt(f.hostCost) || 0), 0);

    // 브랜드별 매출 순위
    const brandRevenue = {};
    filteredProjects.forEach(p => {
      const brand = store.getById('brands', p.brandId);
      if (!brand) return;
      if (!brandRevenue[brand.id]) brandRevenue[brand.id] = { name: brand.name, revenue: 0, count: 0 };
      brandRevenue[brand.id].count++;
      const r = filteredResults.find(res => res.liveId === p.id);
      if (r) brandRevenue[brand.id].revenue += parseInt(r.liveRevenue) || 0;
    });
    const brandRanking = Object.values(brandRevenue).sort((a, b) => b.revenue - a.revenue);

    // 쇼호스트별 매출 순위
    const hostRevenue = {};
    store.getAll('liveHosts').forEach(m => {
      if (selectedMonth && !filteredProjects.some(p => p.id === m.liveId)) return;
      const host = store.getById('hosts', m.hostId);
      if (!host) return;
      if (!hostRevenue[host.id]) hostRevenue[host.id] = { name: host.name, revenue: 0, count: 0, fee: 0 };
      hostRevenue[host.id].count++;
      hostRevenue[host.id].fee += parseInt(m.fee) || 0;
      const r = filteredResults.find(res => res.liveId === m.liveId);
      if (r) hostRevenue[host.id].revenue += parseInt(r.liveRevenue) || 0;
    });
    const hostRanking = Object.values(hostRevenue).sort((a, b) => b.revenue - a.revenue);

    // 정산 현황
    const settleWait = filteredProjects.filter(p => p.status === 'settle_wait').length;
    const settleDone = filteredProjects.filter(p => p.status === 'settle_done').length;

    container.innerHTML = `
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">매출/손익</h1>
            <p class="page-description">전체 매출 및 손익 현황</p>
          </div>
        </div>
        <div class="page-header-right">
          <select class="filter-select" id="finance-month-filter" style="padding: 8px 16px; border-radius: 6px; border: 1px solid var(--border-color);">
            <option value="">전체 월</option>
            ${availableMonths.map(m => `<option value="${m}" ${selectedMonth === m ? 'selected' : ''}>${m}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="page-body">
        <!-- 핵심 KPI -->
        <div class="stats-grid" style="margin-bottom: var(--space-6);">
          <div class="stat-card"><div class="stat-label">총 영업매출</div><div class="stat-value">${formatCurrencyShort(totalRevenue)}</div></div>
          <div class="stat-card"><div class="stat-label">총 영업이익</div><div class="stat-value" style="color: ${totalProfit >= 0 ? 'var(--status-success)' : 'var(--status-error)'};">${formatCurrencyShort(totalProfit)}</div></div>
          <div class="stat-card"><div class="stat-label">총 순마진</div><div class="stat-value" style="color: ${totalMargin >= 0 ? 'var(--status-success)' : 'var(--status-error)'};">${formatCurrencyShort(totalMargin)}</div></div>
          <div class="stat-card"><div class="stat-label">총 광고비</div><div class="stat-value">${formatCurrencyShort(totalAdCost)}</div></div>
          <div class="stat-card"><div class="stat-label">총 제작비</div><div class="stat-value">${formatCurrencyShort(totalProdCost)}</div></div>
          <div class="stat-card"><div class="stat-label">총 쇼호스트비</div><div class="stat-value">${formatCurrencyShort(totalHostCost)}</div></div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-6);">
          <!-- 월별 손익 -->
          <div class="card">
            <div class="card-header"><h3>월별 손익</h3></div>
            <div class="table-scroll">
              <table class="data-table">
                <thead><tr><th>월</th><th class="text-right">방송수</th><th class="text-right">영업매출</th><th class="text-right">영업이익</th><th class="text-right">순마진</th></tr></thead>
                <tbody>
                  ${monthlyData.length > 0 ? monthlyData.map(m => `
                    <tr>
                      <td style="font-weight: var(--weight-medium);">${m.month}</td>
                      <td class="text-right">${m.count}건</td>
                      <td class="text-right">${formatCurrencyShort(m.revenue)}</td>
                      <td class="text-right" style="color: ${m.profit >= 0 ? 'var(--status-success)' : 'var(--status-error)'};">${formatCurrencyShort(m.profit)}</td>
                      <td class="text-right" style="color: ${m.margin >= 0 ? 'var(--status-success)' : 'var(--status-error)'};">${formatCurrencyShort(m.margin)}</td>
                    </tr>
                  `).join('') : '<tr><td colspan="5" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">데이터가 없습니다.</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>

          <!-- 정산 현황 -->
          <div>
            <div class="card" style="margin-bottom: var(--space-5);">
              <div class="card-header"><h3>정산 현황</h3></div>
              <div class="card-body">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
                  <div class="stat-card"><div class="stat-label">정산 대기</div><div class="stat-value">${settleWait}건</div></div>
                  <div class="stat-card"><div class="stat-label">정산 완료</div><div class="stat-value">${settleDone}건</div></div>
                </div>
              </div>
            </div>
            <!-- 브랜드별 매출 -->
            <div class="card">
              <div class="card-header"><h3>브랜드별 라이브매출 순위</h3></div>
              <div class="table-scroll">
                <table class="data-table">
                  <thead><tr><th>브랜드</th><th class="text-right">방송수</th><th class="text-right">라이브매출</th></tr></thead>
                  <tbody>
                    ${brandRanking.map((b, i) => `
                      <tr><td><span style="color: var(--text-tertiary); margin-right: var(--space-2);">${i+1}</span> ${b.name}</td><td class="text-right">${b.count}회</td><td class="text-right">${formatCurrencyShort(b.revenue)}</td></tr>
                    `).join('') || '<tr><td colspan="3" class="text-center" style="padding: var(--space-6); color: var(--text-tertiary);">데이터 없음</td></tr>'}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- 쇼호스트별 실적 -->
        <div class="card">
          <div class="card-header"><h3>쇼호스트별 실적</h3></div>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>쇼호스트</th><th class="text-right">방송횟수</th><th class="text-right">누적 라이브매출</th><th class="text-right">누적 정산금액</th></tr></thead>
              <tbody>
                ${hostRanking.map((h, i) => `
                  <tr><td><span style="color: var(--text-tertiary); margin-right: var(--space-2);">${i+1}</span> ${h.name}</td><td class="text-right">${h.count}회</td><td class="text-right">${formatCurrencyShort(h.revenue)}</td><td class="text-right">${formatCurrency(h.fee)}</td></tr>
                `).join('') || '<tr><td colspan="4" class="text-center" style="padding: var(--space-6); color: var(--text-tertiary);">데이터 없음</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Event binding
    const monthSelect = container.querySelector('#finance-month-filter');
    if (monthSelect) {
      monthSelect.addEventListener('change', (e) => {
        selectedMonth = e.target.value;
        render();
      });
    }
  }

  // Initial render
  render();

  return container;
}
