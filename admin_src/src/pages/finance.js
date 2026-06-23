// ===== 매출/손익 관리 페이지 =====
import { store } from '../data/store.js';
import { formatCurrency, formatCurrencyShort, formatNumber, formatDate, formatROI, getCurrentMonth } from '../utils/format.js';
import { renderStatusBadge } from '../components/statusBadge.js';

export function renderFinance() {
  const container = document.createElement('div');

  const projects = store.getAll('projects');
  const results = store.getAll('results');
  const finances = store.getAll('finances');

  // 월별 집계
  const monthlyMap = {};
  projects.forEach(p => {
    const m = p.broadcastMonth;
    if (!m) return;
    if (!monthlyMap[m]) monthlyMap[m] = { month: m, revenue: 0, profit: 0, margin: 0, count: 0 };
    monthlyMap[m].count++;
    const f = finances.find(fi => fi.liveId === p.id);
    if (f) {
      monthlyMap[m].revenue += f.salesRevenue || 0;
      monthlyMap[m].profit += f.operatingProfit || 0;
      monthlyMap[m].margin += f.netMargin || 0;
    }
  });
  const monthlyData = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));

  // 전체 합계
  const totalRevenue = finances.reduce((s, f) => s + (f.salesRevenue || 0), 0);
  const totalProfit = finances.reduce((s, f) => s + (f.operatingProfit || 0), 0);
  const totalMargin = finances.reduce((s, f) => s + (f.netMargin || 0), 0);
  const totalAdCost = finances.reduce((s, f) => s + (f.adCost || 0), 0);
  const totalProdCost = finances.reduce((s, f) => s + (f.productionCost || 0), 0);
  const totalHostCost = finances.reduce((s, f) => s + (f.hostCost || 0), 0);

  // 브랜드별 매출 순위
  const brandRevenue = {};
  projects.forEach(p => {
    const brand = store.getById('brands', p.brandId);
    if (!brand) return;
    if (!brandRevenue[brand.id]) brandRevenue[brand.id] = { name: brand.name, revenue: 0, count: 0 };
    brandRevenue[brand.id].count++;
    const r = results.find(res => res.liveId === p.id);
    if (r) brandRevenue[brand.id].revenue += r.liveRevenue || 0;
  });
  const brandRanking = Object.values(brandRevenue).sort((a, b) => b.revenue - a.revenue);

  // 쇼호스트별 매출 순위
  const hostRevenue = {};
  store.getAll('liveHosts').forEach(m => {
    const host = store.getById('hosts', m.hostId);
    if (!host) return;
    if (!hostRevenue[host.id]) hostRevenue[host.id] = { name: host.name, revenue: 0, count: 0, fee: 0 };
    hostRevenue[host.id].count++;
    hostRevenue[host.id].fee += m.fee || 0;
    const r = results.find(res => res.liveId === m.liveId);
    if (r) hostRevenue[host.id].revenue += r.liveRevenue || 0;
  });
  const hostRanking = Object.values(hostRevenue).sort((a, b) => b.revenue - a.revenue);

  // 정산 현황
  const settleWait = projects.filter(p => p.status === 'settle_wait').length;
  const settleDone = projects.filter(p => p.status === 'settle_done').length;

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <h1 class="page-title">매출/손익</h1>
          <p class="page-description">전체 매출 및 손익 현황</p>
        </div>
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

  return container;
}
