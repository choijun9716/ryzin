// ===== 계약/견적서 관리 페이지 =====
import { store } from '../data/store.js';
import { formatDate } from '../utils/format.js';
import { showEstimateModal } from './estimate.js';
import { showContractModal } from './contract_pdf.js';

export function renderContracts() {
  const container = document.createElement('div');
  
  function render() {
    let projects = store.getAll('projects') || [];
    
    // 정렬 (방송일 내림차순)
    projects.sort((a, b) => (b.broadcastDate || '').localeCompare(a.broadcastDate || ''));

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">계약/견적서 관리</h1>
            <p class="page-description">라이브 방송의 브랜드 견적서와 쇼호스트 출연 계약서를 PDF로 다운로드합니다.</p>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="card">
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>방송일</th>
                  <th>방송명(프로젝트)</th>
                  <th>브랜드</th>
                  <th>플랫폼</th>
                  <th class="text-center">문서 자동 발급</th>
                </tr>
              </thead>
              <tbody>
                ${projects.length > 0 ? projects.map(p => `
                  <tr>
                    <td style="font-size: 13px;">${formatDate(p.broadcastDate)}</td>
                    <td style="font-weight: var(--weight-medium);">${p.title || '-'}</td>
                    <td>${p.brand || '-'}</td>
                    <td>${p.platform || '-'}</td>
                    <td class="text-center">
                      <div style="display: flex; gap: var(--space-2); justify-content: center;">
                        <button class="btn btn-outline btn-sm btn-brand-estimate" data-id="${p.id}" style="color: var(--primary); border-color: var(--primary);">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                          브랜드 견적서
                        </button>
                        <button class="btn btn-outline btn-sm btn-host-contract" data-id="${p.id}">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                          쇼호스트 계약서
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('') : '<tr><td colspan="5" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 라이브 프로젝트가 없습니다.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // 이벤트 바인딩
    container.querySelectorAll('.btn-brand-estimate').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const project = store.getById('projects', id);
        if (project) {
          const liveHosts = store.query('liveHosts', m => m.liveId === project.id) || [];
          showEstimateModal(project, liveHosts);
        }
      });
    });

    container.querySelectorAll('.btn-host-contract').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const project = store.getById('projects', id);
        if (project) {
          const liveHosts = store.query('liveHosts', m => m.liveId === project.id) || [];
          showContractModal(project, liveHosts);
        }
      });
    });
  }

  render();
  return container;
}
