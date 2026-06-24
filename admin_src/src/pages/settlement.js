// ===== 정산 관리 페이지 =====
import { store } from '../data/store.js';
import { formatCurrency, formatCurrencyShort, formatDate } from '../utils/format.js';
import { showSuccess } from '../components/toast.js';

export function renderSettlement() {
  const container = document.createElement('div');

  function render() {
    const projects = store.getAll('projects');
    const finances = store.getAll('finances');
    const liveHosts = store.getAll('liveHosts');
    const brands = store.getAll('brands');
    const hosts = store.getAll('hosts');

  // 1. 브랜드 미수금 집계 (프로젝트 settleStatus !== 'done')
  const brandReceivablesMap = {};
  projects.filter(p => p.settleStatus !== 'done').forEach(p => {
    const brandName = p.brandName || (store.getById('brands', p.brandId)?.name || '알 수 없음');
    const brandId = p.brandId || brandName;
    if (!brandReceivablesMap[brandId]) {
      brandReceivablesMap[brandId] = { brandName, count: 0, amount: 0, projects: [] };
    }
    const finance = finances.find(f => f.liveId === p.id);
    const salesRev = finance ? (finance.salesRevenue || 0) : 0;
    const revenue = salesRev + Math.round(salesRev * 0.1); // 영업매출액 + 부가세(10%)
    
    brandReceivablesMap[brandId].count++;
    brandReceivablesMap[brandId].amount += revenue;
    brandReceivablesMap[brandId].projects.push({ ...p, revenue });
  });
  const brandReceivables = Object.values(brandReceivablesMap).sort((a, b) => b.amount - a.amount);

  // 2. 쇼호스트 정산금 집계 (매칭 settleStatus !== 'done')
  const hostSettlementMap = {};
  liveHosts.filter(m => m.settleStatus !== 'done').forEach(m => {
    const host = store.getById('hosts', m.hostId);
    if (!host) return;
    if (!hostSettlementMap[host.id]) {
      hostSettlementMap[host.id] = { hostName: host.name, hostId: host.id, count: 0, amount: 0, matchings: [] };
    }
    
    hostSettlementMap[host.id].count++;
    hostSettlementMap[host.id].amount += (m.fee || 0);
    hostSettlementMap[host.id].matchings.push(m);
  });
  const hostSettlements = Object.values(hostSettlementMap).sort((a, b) => b.amount - a.amount);

  const totalReceivable = brandReceivables.reduce((sum, b) => sum + b.amount, 0);
  const totalPayable = hostSettlements.reduce((sum, h) => sum + h.amount, 0);

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <div>
          <h1 class="page-title">정산 관리</h1>
          <p class="page-description">브랜드 미수금 및 쇼호스트 정산 대기 현황</p>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="stats-grid" style="margin-bottom: var(--space-6);">
        <div class="stat-card">
          <div class="stat-label">총 브랜드 미수금</div>
          <div class="stat-value" style="color: var(--status-error);">${formatCurrency(totalReceivable)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">총 쇼호스트 지급대기</div>
          <div class="stat-value" style="color: var(--status-warning);">${formatCurrency(totalPayable)}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5);">
        <!-- 브랜드 미수금 현황 -->
        <div class="card">
          <div class="card-header">
            <h3>브랜드 미수금 현황</h3>
            <span class="badge badge-error">${brandReceivables.length}곳</span>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>브랜드</th>
                  <th class="text-right">미수 건수</th>
                  <th class="text-right">미수 금액</th>
                  <th class="text-center">처리</th>
                </tr>
              </thead>
              <tbody>
                ${brandReceivables.length > 0 ? brandReceivables.map(b => `
                  <tr>
                    <td style="font-weight: var(--weight-medium);">${b.brandName}</td>
                    <td class="text-right">${b.count}건</td>
                    <td class="text-right" style="color: var(--status-error); font-weight: bold;">${formatCurrency(b.amount)}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-secondary btn-brand-settle" data-brandid="${b.projects[0]?.brandId}" data-brandname="${b.brandName}">정산완료</button>
                    </td>
                  </tr>
                `).join('') : '<tr><td colspan="4" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">미수금이 없습니다.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 쇼호스트 정산금 현황 -->
        <div class="card">
          <div class="card-header">
            <h3>쇼호스트 정산 현황</h3>
            <span class="badge badge-warning">${hostSettlements.length}명</span>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>쇼호스트</th>
                  <th class="text-right">대기 건수</th>
                  <th class="text-right">정산 대기금액</th>
                  <th class="text-center">처리</th>
                </tr>
              </thead>
              <tbody>
                ${hostSettlements.length > 0 ? hostSettlements.map(h => `
                  <tr>
                    <td style="font-weight: var(--weight-medium);">${h.hostName}</td>
                    <td class="text-right">${h.count}건</td>
                    <td class="text-right" style="color: var(--status-warning); font-weight: bold;">${formatCurrency(h.amount)}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-secondary btn-host-settle" data-hostid="${h.hostId}">지급완료</button>
                    </td>
                  </tr>
                `).join('') : '<tr><td colspan="4" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">정산 대기중인 쇼호스트가 없습니다.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  // 이벤트 바인딩
  container.querySelectorAll('.btn-brand-settle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const brandId = e.target.dataset.brandid;
      const brandName = e.target.dataset.brandname;
      if (confirm(`'${brandName}'의 미수금 ${e.target.closest('tr').querySelector('td:nth-child(3)').innerText}을 모두 정산 완료 처리하시겠습니까?`)) {
        const pendingProjects = projects.filter(p => p.settleStatus !== 'done' && (p.brandId === brandId || p.brandName === brandName));
        pendingProjects.forEach(p => {
          store.update('projects', p.id, { settleStatus: 'done' });
        });
        showSuccess(`${brandName} 정산 처리 완료`);
      }
    });
  });

  // 쇼호스트 정산 일괄 완료 처리
  container.querySelectorAll('.btn-host-settle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const hostId = e.target.dataset.hostid;
      const hostName = e.target.closest('tr').querySelector('td:nth-child(1)').innerText;
      if (confirm(`'${hostName}' 쇼호스트의 정산 대기금액 ${e.target.closest('tr').querySelector('td:nth-child(3)').innerText}을 모두 지급 완료 처리하시겠습니까?`)) {
        const pendingMatchings = liveHosts.filter(m => m.settleStatus !== 'done' && m.hostId === hostId);
        pendingMatchings.forEach(m => {
          store.update('liveHosts', m.id, { settleStatus: 'done' });
        });
        showSuccess(`${hostName} 지급 처리 완료`);
      }
    });
  });
  }

  render();
  store.on('projects:changed', render);
  store.on('liveHosts:changed', render);

  return container;
}
