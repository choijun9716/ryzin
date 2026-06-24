// ===== 영업 CRM 페이지 =====
import { store } from '../data/store.js';
import { CRM_STATUSES, CRM_CATEGORIES, ACTIVITY_TYPES, generateId } from '../data/models.js';
import { formatDate } from '../utils/format.js';
import { openModal, closeModal } from '../components/modal.js';
import { showSuccess, showError } from '../components/toast.js';

export function renderCRM() {
  const container = document.createElement('div');

  function render() {
    const clients = store.getAll('crmClients') || [];
    const activities = store.getAll('crmActivities') || [];
    const projects = store.getAll('projects') || [];

    // 자동 알림 계산 로직
    const now = new Date();
    
    // 1. 마지막 연락 후 7일 경과 (연락 필요)
    const alert7Days = clients.filter(c => {
      if (!c.lastContactDate) return false;
      const diff = (now - new Date(c.lastContactDate)) / (1000 * 60 * 60 * 24);
      return diff >= 7 && c.status !== 'contract' && c.status !== 'hold';
    });

    // 2. 견적 발송 후 3일 경과
    const alertQuote = clients.filter(c => {
      if (c.status !== 'quote') return false;
      // 가장 최근 견적발송 활동 찾기 (없으면 마지막 연락일 기준)
      const quoteActs = activities.filter(a => a.clientId === c.id && a.content.includes('견적')).sort((a,b) => new Date(b.date) - new Date(a.date));
      const refDate = quoteActs.length > 0 ? quoteActs[0].date : c.lastContactDate;
      if (!refDate) return false;
      const diff = (now - new Date(refDate)) / (1000 * 60 * 60 * 24);
      return diff >= 3;
    });

    // 3. 방송 종료 후 30일 경과 (재컨택 대상)
    // 브랜드 리스트 중 최근 방송이 30일 지났고 그 이후 방송이 없는 경우
    const alert30Days = [];
    const completedProjects = projects.filter(p => p.settleStatus === 'done' || p.broadcastStatus === 'done');
    const brandProjectMap = {};
    completedProjects.forEach(p => {
      const brandName = p.brandName || (store.getById('brands', p.brandId)?.name || '알 수 없음');
      if (!brandProjectMap[brandName]) brandProjectMap[brandName] = [];
      brandProjectMap[brandName].push(p);
    });

    for (const [brandName, projs] of Object.entries(brandProjectMap)) {
      // 가장 최근 방송일
      projs.sort((a,b) => new Date(b.broadcastDate || b.createdAt) - new Date(a.broadcastDate || a.createdAt));
      const lastBroadcast = projs[0];
      const refDate = lastBroadcast.broadcastDate || lastBroadcast.createdAt;
      if (refDate) {
        const diff = (now - new Date(refDate)) / (1000 * 60 * 60 * 24);
        if (diff >= 30) {
          alert30Days.push({ brandName, lastBroadcastDate: refDate, diffDays: Math.floor(diff) });
        }
      }
    }

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">영업 CRM</h1>
          <p class="page-description">고객 관리 및 자동 팔로업 알림</p>
        </div>
        <div class="page-header-right">
          <button class="btn btn-primary" id="btn-add-client">고객 등록</button>
        </div>
      </div>

      <div class="page-body">
        <!-- 자동 알림 대시보드 -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin-bottom: var(--space-6);">
          
          <div class="card">
            <div style="padding: var(--space-4);">
              <h3 style="font-size: var(--text-base); margin-bottom: 8px; color: var(--status-error);">마지막 연락 7일 경과</h3>
              <p style="font-size: var(--text-2xl); font-weight: bold; margin-bottom: 8px;">${alert7Days.length}건</p>
              <div style="font-size: var(--text-sm); color: var(--text-tertiary); max-height: 80px; overflow-y: auto;">
                ${alert7Days.length > 0 ? alert7Days.map(c => `<div style="margin-bottom: 4px; cursor:pointer;" class="alert-link" data-id="${c.id}">• ${c.companyName} (${c.contactName})</div>`).join('') : '알림 대상 없음'}
              </div>
            </div>
          </div>

          <div class="card">
            <div style="padding: var(--space-4);">
              <h3 style="font-size: var(--text-base); margin-bottom: 8px; color: var(--status-warning);">견적 발송 3일 경과</h3>
              <p style="font-size: var(--text-2xl); font-weight: bold; margin-bottom: 8px;">${alertQuote.length}건</p>
              <div style="font-size: var(--text-sm); color: var(--text-tertiary); max-height: 80px; overflow-y: auto;">
                ${alertQuote.length > 0 ? alertQuote.map(c => `<div style="margin-bottom: 4px; cursor:pointer;" class="alert-link" data-id="${c.id}">• ${c.companyName} (${c.contactName})</div>`).join('') : '알림 대상 없음'}
              </div>
            </div>
          </div>

          <div class="card">
            <div style="padding: var(--space-4);">
              <h3 style="font-size: var(--text-base); margin-bottom: 8px; color: var(--status-success);">방송 종료 30일 경과 (재컨택)</h3>
              <p style="font-size: var(--text-2xl); font-weight: bold; margin-bottom: 8px;">${alert30Days.length}곳</p>
              <div style="font-size: var(--text-sm); color: var(--text-tertiary); max-height: 80px; overflow-y: auto;">
                ${alert30Days.length > 0 ? alert30Days.map(b => `<div style="margin-bottom: 4px;">• ${b.brandName} (${b.diffDays}일 지남)</div>`).join('') : '알림 대상 없음'}
              </div>
            </div>
          </div>

        </div>

        <!-- 고객 목록 -->
        <div class="card">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; gap: var(--space-3); align-items: center;">
              <h3>전체 고객 관리</h3>
            </div>
            <div style="display: flex; gap: var(--space-2);">
              <select class="input" id="filter-status" style="width: 150px;">
                <option value="all">상태 전체</option>
                ${CRM_STATUSES.map(s => `<option value="${s.key}">${s.label}</option>`).join('')}
              </select>
              <select class="input" id="filter-category" style="width: 150px;">
                <option value="all">분류 전체</option>
                ${CRM_CATEGORIES.map(c => `<option value="${c.key}">${c.label}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>회사명</th>
                  <th>담당자명</th>
                  <th>연락처</th>
                  <th>관심서비스</th>
                  <th>분류</th>
                  <th>상태</th>
                  <th>최근 연락일</th>
                  <th class="text-center">관리</th>
                </tr>
              </thead>
              <tbody id="crm-table-body">
                <!-- 렌더링 영역 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    renderTable(clients);

    // 이벤트 바인딩
    container.querySelector('#btn-add-client').addEventListener('click', () => openClientModal());
    
    container.querySelector('#filter-status').addEventListener('change', (e) => filterTable(e.target.value, container.querySelector('#filter-category').value, clients));
    container.querySelector('#filter-category').addEventListener('change', (e) => filterTable(container.querySelector('#filter-status').value, e.target.value, clients));

    container.querySelectorAll('.alert-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        openClientModal(id);
      });
    });
  }

  function filterTable(status, category, allClients) {
    let filtered = allClients;
    if (status !== 'all') filtered = filtered.filter(c => c.status === status);
    if (category !== 'all') filtered = filtered.filter(c => c.category === category);
    renderTable(filtered);
  }

  function renderTable(filteredClients) {
    const tbody = container.querySelector('#crm-table-body');
    if (!tbody) return;

    if (filteredClients.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="text-center" style="padding: var(--space-8); color: var(--text-tertiary);">등록된 고객이 없습니다.</td></tr>';
      return;
    }

    tbody.innerHTML = filteredClients.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(c => {
      const statusObj = CRM_STATUSES.find(s => s.key === c.status) || CRM_STATUSES[0];
      const catObj = CRM_CATEGORIES.find(cat => cat.key === c.category) || {label: '-'};
      return `
        <tr>
          <td style="font-weight: 500;">${c.companyName}</td>
          <td>${c.contactName}</td>
          <td>${c.phone || '-'}<br><span style="font-size:11px; color:var(--text-tertiary);">${c.email || ''}</span></td>
          <td>${c.interestedService || '-'}</td>
          <td><span class="badge" style="background: var(--bg-secondary);">${catObj.label}</span></td>
          <td><span class="badge" style="background: var(--status-${statusObj.color}); color: white;">${statusObj.label}</span></td>
          <td>${formatDate(c.lastContactDate)}</td>
          <td class="text-center col-actions">
            <button class="btn btn-sm btn-secondary btn-edit-client" data-id="${c.id}">상세/활동</button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-edit-client').forEach(btn => {
      btn.addEventListener('click', (e) => openClientModal(e.target.dataset.id));
    });
  }

  function openClientModal(clientId = null) {
    const isEdit = !!clientId;
    const client = isEdit ? store.getById('crmClients', clientId) : {};
    const activities = isEdit ? store.getAll('crmActivities').filter(a => a.clientId === clientId).sort((a,b) => new Date(b.date) - new Date(a.date)) : [];

    const content = `
      <div style="display: flex; gap: var(--space-6);">
        <!-- 왼쪽: 기본 정보 -->
        <div style="flex: 1; min-width: 300px;">
          <h3 style="margin-bottom: var(--space-4); border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">기본 정보</h3>
          <div class="form-grid">
            <div class="input-group">
              <label class="required">회사명</label>
              <input type="text" class="input" id="c-company" value="${client.companyName || ''}">
            </div>
            <div class="input-group">
              <label class="required">담당자명</label>
              <input type="text" class="input" id="c-contact" value="${client.contactName || ''}">
            </div>
            <div class="input-group">
              <label>연락처</label>
              <input type="text" class="input" id="c-phone" value="${client.phone || ''}">
            </div>
            <div class="input-group">
              <label>이메일</label>
              <input type="text" class="input" id="c-email" value="${client.email || ''}">
            </div>
            <div class="input-group">
              <label>상태</label>
              <select class="input" id="c-status">
                ${CRM_STATUSES.map(s => `<option value="${s.key}" ${client.status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
              </select>
            </div>
            <div class="input-group">
              <label>고객 분류</label>
              <select class="input" id="c-category">
                ${CRM_CATEGORIES.map(c => `<option value="${c.key}" ${client.category === c.key ? 'selected' : ''}>${c.label}</option>`).join('')}
              </select>
            </div>
            <div class="input-group full-width">
              <label>관심서비스</label>
              <input type="text" class="input" id="c-service" value="${client.interestedService || ''}" placeholder="예: 라이브커머스, 숏폼 제작 등">
            </div>
            <div class="input-group full-width">
              <label>유입경로</label>
              <input type="text" class="input" id="c-source" value="${client.source || ''}">
            </div>
            <div class="input-group full-width">
              <label>메모</label>
              <textarea class="input" id="c-memo" style="height: 60px;">${client.memo || ''}</textarea>
            </div>
          </div>
        </div>

        <!-- 오른쪽: 활동 관리 -->
        ${isEdit ? `
        <div style="flex: 1; border-left: 1px solid var(--border-light); padding-left: var(--space-6);">
          <h3 style="margin-bottom: var(--space-4); border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">활동 관리 (Follow-up)</h3>
          
          <!-- 활동 추가 폼 -->
          <div style="background: var(--bg-secondary); padding: var(--space-3); border-radius: var(--radius-md); margin-bottom: var(--space-4);">
            <div style="display: flex; gap: 8px; margin-bottom: 8px;">
              <input type="date" class="input" id="act-date" value="${new Date().toISOString().split('T')[0]}" style="flex: 1;">
              <select class="input" id="act-type" style="flex: 1;">
                ${ACTIVITY_TYPES.map(t => `<option value="${t.key}">${t.icon} ${t.label}</option>`).join('')}
              </select>
            </div>
            <textarea class="input" id="act-content" placeholder="활동 내용 및 특이사항 입력" style="height: 60px; margin-bottom: 8px;"></textarea>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span style="font-size: 12px; color: var(--text-tertiary); white-space: nowrap;">다음 팔로업 예정일</span>
              <input type="date" class="input" id="act-followup" style="flex: 1;">
              <button class="btn btn-primary" id="btn-save-activity">활동 등록</button>
            </div>
          </div>

          <!-- 타임라인 -->
          <div style="max-height: 300px; overflow-y: auto;">
            ${activities.length > 0 ? activities.map(a => {
              const tObj = ACTIVITY_TYPES.find(t => t.key === a.type) || ACTIVITY_TYPES[0];
              return `
              <div style="margin-bottom: var(--space-3); padding-bottom: var(--space-3); border-bottom: 1px dashed var(--border-light);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="font-weight: 500; font-size: 13px;">${tObj.icon} ${tObj.label}</span>
                  <span style="color: var(--text-tertiary); font-size: 12px;">${formatDate(a.date)}</span>
                </div>
                <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 4px;">${a.content}</div>
                ${a.followUpDate ? `<div style="font-size: 11px; color: var(--primary-color);">👉 다음 예정일: ${formatDate(a.followUpDate)}</div>` : ''}
              </div>
              `;
            }).join('') : '<div style="color: var(--text-tertiary); font-size: 13px; text-align: center;">기록된 활동이 없습니다.</div>'}
          </div>
        </div>
        ` : `<div style="flex: 1; display:flex; align-items:center; justify-content:center; color:var(--text-tertiary); background:var(--bg-secondary); border-radius:var(--radius-md);">고객 정보를 먼저 등록한 후 활동 관리를 할 수 있습니다.</div>`}
      </div>
    `;

    const footer = document.createElement('div');
    footer.style.cssText = 'display: flex; gap: var(--space-3); justify-content: flex-end; width: 100%;';
    if (isEdit) {
      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-danger';
      delBtn.textContent = '고객 삭제';
      delBtn.style.marginRight = 'auto';
      delBtn.addEventListener('click', () => {
        if(confirm('이 고객과 모든 활동 기록을 삭제하시겠습니까?')) {
          store.delete('crmClients', clientId);
          closeModal();
          render();
          showSuccess('삭제되었습니다.');
        }
      });
      footer.appendChild(delBtn);
    }
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = '취소';
    cancelBtn.addEventListener('click', closeModal);
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-primary';
    saveBtn.textContent = '고객 정보 저장';
    saveBtn.addEventListener('click', () => {
      const companyName = document.getElementById('c-company').value.trim();
      if(!companyName) return showError('회사명을 입력하세요.');
      
      const data = {
        companyName,
        contactName: document.getElementById('c-contact').value.trim(),
        phone: document.getElementById('c-phone').value.trim(),
        email: document.getElementById('c-email').value.trim(),
        status: document.getElementById('c-status').value,
        category: document.getElementById('c-category').value,
        interestedService: document.getElementById('c-service').value.trim(),
        source: document.getElementById('c-source').value.trim(),
        memo: document.getElementById('c-memo').value.trim(),
      };

      if (isEdit) {
        store.update('crmClients', clientId, data);
        showSuccess('수정되었습니다.');
      } else {
        data.id = generateId('crm');
        data.createdAt = new Date().toISOString();
        data.lastContactDate = new Date().toISOString().split('T')[0];
        store.create('crmClients', data);
        showSuccess('등록되었습니다.');
      }
      closeModal();
      render();
    });

    footer.appendChild(cancelBtn);
    footer.appendChild(saveBtn);

    openModal({ title: isEdit ? '고객 상세 및 활동 관리' : '신규 고객 등록', size: 'lg', content, footer });

    // 활동 추가 이벤트
    if (isEdit) {
      setTimeout(() => {
        document.getElementById('btn-save-activity')?.addEventListener('click', () => {
          const actContent = document.getElementById('act-content').value.trim();
          if(!actContent) return showError('활동 내용을 입력하세요.');
          const actDate = document.getElementById('act-date').value;
          
          const actData = {
            id: generateId('act'),
            clientId,
            date: actDate,
            type: document.getElementById('act-type').value,
            content: actContent,
            followUpDate: document.getElementById('act-followup').value || null,
            createdAt: new Date().toISOString(),
          };
          
          store.create('crmActivities', actData);
          
          // 고객의 마지막 연락일 갱신
          if (new Date(actDate) > new Date(client.lastContactDate || '1970-01-01')) {
            store.update('crmClients', clientId, { lastContactDate: actDate });
          }

          showSuccess('활동이 등록되었습니다.');
          closeModal();
          openClientModal(clientId); // 새로고침
        });
      }, 0);
    }
  }

  render();
  store.on('crmClients:changed', render);
  store.on('crmActivities:changed', render);

  return container;
}
