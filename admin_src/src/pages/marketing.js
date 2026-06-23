// ===== 마케팅 메시지 페이지 =====
import { store } from '../data/store.js';
import { showSuccess, showError } from '../components/toast.js';
import { sendKakaoMessage, getTemplates } from '../utils/popbill.js';

export function renderMarketing() {
  const container = document.createElement('div');
  
  // 상태 변수
  let templates = [];
  let selectedTemplate = null;
  let customVariables = []; // 사용자가 입력해야 하는 공통 변수명
  let variableValues = {}; // 사용자 입력값 저장
  let receivers = [];

  function render() {
    const hosts = store.getAll('hosts') || [];
    const projects = store.getAll('projects') || [];
    const brandsSet = new Set(projects.map(p => p.brand).filter(b => !!b));
    const brands = Array.from(brandsSet).map(b => ({ id: 'brand_' + b, name: b }));

    container.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <div>
            <h1 class="page-title">마케팅 메시지</h1>
            <p class="page-description">쇼호스트, 브랜드 및 고객에게 팝빌 카카오톡(알림톡/친구톡) 메시지를 발송합니다.</p>
          </div>
        </div>
      </div>
      
      <div class="page-body">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6);">
          
          <!-- 좌측: 메시지 작성부 -->
          <div class="card">
            <div class="card-header">
              <h3>메시지 작성</h3>
            </div>
            <div class="card-body">
              <div class="form-grid" style="grid-template-columns: 1fr;">
                <div class="input-group">
                  <label>발송 유형</label>
                  <select class="input" id="msg-type">
                    <option value="alimtalk">알림톡 (승인된 템플릿 기반)</option>
                    <option value="friendtalk">친구톡 (자유 양식, 광고성 포함)</option>
                    <option value="sms">SMS/LMS (대체 문자)</option>
                  </select>
                </div>
                
                <!-- 알림톡 템플릿 선택 영역 -->
                <div class="input-group" id="alimtalk-template-section">
                  <label>알림톡 템플릿</label>
                  <select class="input" id="template-select">
                    <option value="">템플릿을 선택하세요</option>
                  </select>
                </div>

                <!-- 알림톡 변수 입력 영역 -->
                <div id="alimtalk-variables-section" style="display: none; padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-md); margin-bottom: var(--space-4);">
                  <h4 style="font-size: 13px; color: var(--text-secondary); margin-bottom: var(--space-3);">공통 변수 입력 (모든 수신자 동일)</h4>
                  <div class="form-grid" style="grid-template-columns: 1fr;" id="variable-inputs">
                    <!-- 변수 인풋 동적 생성 -->
                  </div>
                  <p style="font-size: 12px; color: var(--text-tertiary); margin-top: var(--space-2);">* #{이름}, #{고객명} 변수는 수신자 이름으로 자동 변환됩니다.</p>
                </div>
                
                <div class="input-group">
                  <label class="required" id="msg-content-label">메시지 내용 (미리보기)</label>
                  <textarea class="input" id="msg-content" rows="10" placeholder="발송할 메시지 내용을 입력하세요." readonly style="background: var(--bg-tertiary);"></textarea>
                  <p class="help-text" style="display:flex; justify-content:flex-end;">
                    <span id="msg-length">0</span> / 1000 자
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 우측: 수신자 선택부 -->
          <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
              <h3>수신자 선택</h3>
              <span class="badge badge-primary" id="receiver-count">0 명</span>
            </div>
            <div class="card-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
              
              <div style="display: flex; gap: var(--space-2);">
                <select class="input" id="receiver-group" style="flex: 1;">
                  <option value="">-- 그룹 선택하여 일괄 추가 --</option>
                  <option value="all_hosts">전체 쇼호스트</option>
                  <option value="all_brands">전체 브랜드</option>
                </select>
                <button class="btn btn-secondary" id="btn-add-group">추가</button>
              </div>

              <div style="display: flex; gap: var(--space-2);">
                <input type="text" class="input" id="manual-name" placeholder="이름 입력" style="flex: 1;">
                <input type="text" class="input" id="manual-phone" placeholder="연락처 (010-0000-0000)" style="flex: 2;">
                <button class="btn btn-secondary" id="btn-add-manual">추가</button>
              </div>

              <div class="table-scroll" style="height: 300px; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                <table class="data-table" style="margin: 0; box-shadow: none;">
                  <thead>
                    <tr>
                      <th>이름/소속</th>
                      <th>연락처</th>
                      <th class="text-right">삭제</th>
                    </tr>
                  </thead>
                  <tbody id="receiver-list">
                    <tr><td colspan="3" class="text-center" style="color: var(--text-tertiary); padding: 2rem 0;">수신자를 추가해주세요.</td></tr>
                  </tbody>
                </table>
              </div>
              
              <div style="margin-top: auto; padding-top: var(--space-4);">
                <button class="btn btn-primary" id="btn-send-message" style="width: 100%; height: 48px; font-size: 16px;">메시지 발송하기</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    `;

    const typeSelect = container.querySelector('#msg-type');
    const tplSection = container.querySelector('#alimtalk-template-section');
    const tplSelect = container.querySelector('#template-select');
    const varSection = container.querySelector('#alimtalk-variables-section');
    const varInputsBox = container.querySelector('#variable-inputs');
    const contentInput = container.querySelector('#msg-content');
    const contentLabel = container.querySelector('#msg-content-label');

    // 수신자 리스트 업데이트
    const updateReceiverList = () => {
      const tbody = container.querySelector('#receiver-list');
      const countEl = container.querySelector('#receiver-count');
      countEl.textContent = `${receivers.length} 명`;
      
      if (receivers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="text-center" style="color: var(--text-tertiary); padding: 2rem 0;">수신자를 추가해주세요.</td></tr>';
        return;
      }
      
      tbody.innerHTML = receivers.map((r, idx) => `
        <tr>
          <td>${r.name}</td>
          <td>${r.phone}</td>
          <td class="text-right">
            <button class="btn btn-ghost btn-sm btn-del-receiver" data-idx="${idx}" style="color: var(--status-error);">삭제</button>
          </td>
        </tr>
      `).join('');
      
      tbody.querySelectorAll('.btn-del-receiver').forEach(btn => {
        btn.addEventListener('click', (e) => {
          receivers.splice(e.target.dataset.idx, 1);
          updateReceiverList();
        });
      });
    };

    // 알림톡 메시지 미리보기 업데이트
    const updateTemplatePreview = () => {
      if (!selectedTemplate) return;
      let text = selectedTemplate.content;
      
      // 자동 매핑 변수 처리
      text = text.replace(/#\{이름\}/g, '(수신자명)');
      text = text.replace(/#\{고객명\}/g, '(수신자명)');

      // 공통 변수 처리
      customVariables.forEach(v => {
        const val = variableValues[v] || `[${v} 입력]`;
        const regex = new RegExp(`#\\{${v}\\}`, 'g');
        text = text.replace(regex, val);
      });
      
      contentInput.value = text;
      container.querySelector('#msg-length').textContent = text.length;
    };

    // 템플릿 변수 폼 생성
    const buildVariableInputs = () => {
      if (!selectedTemplate) return;
      
      // #{변수명} 추출
      const matches = selectedTemplate.content.match(/#\{([^}]+)\}/g) || [];
      const allVars = [...new Set(matches.map(m => m.replace('#{', '').replace('}', '')))];
      
      // 이름, 고객명은 자동 매핑이므로 입력에서 제외
      customVariables = allVars.filter(v => v !== '이름' && v !== '고객명');
      variableValues = {};
      
      if (customVariables.length > 0) {
        varSection.style.display = 'block';
        varInputsBox.innerHTML = customVariables.map(v => `
          <div class="input-group" style="margin-bottom: 8px;">
            <label style="font-size: 12px;">#{${v}}</label>
            <input type="text" class="input var-input" data-var="${v}" placeholder="${v} 입력" style="padding: 4px 8px; font-size: 13px;">
          </div>
        `).join('');

        varInputsBox.querySelectorAll('.var-input').forEach(inp => {
          inp.addEventListener('input', (e) => {
            variableValues[e.target.dataset.var] = e.target.value;
            updateTemplatePreview();
          });
        });
      } else {
        varSection.style.display = 'none';
        varInputsBox.innerHTML = '';
      }
      
      updateTemplatePreview();
    };

    // 타입 변경 처리
    typeSelect.addEventListener('change', (e) => {
      const isAlim = e.target.value === 'alimtalk';
      if (isAlim) {
        tplSection.style.display = 'block';
        contentInput.readOnly = true;
        contentInput.style.background = 'var(--bg-tertiary)';
        contentLabel.textContent = '메시지 내용 (미리보기)';
        
        if (!selectedTemplate && templates.length > 0) {
          tplSelect.value = templates[0].templateCode;
          selectedTemplate = templates[0];
          buildVariableInputs();
        } else if (selectedTemplate) {
          buildVariableInputs();
        } else {
          varSection.style.display = 'none';
          contentInput.value = '';
        }
      } else {
        tplSection.style.display = 'none';
        varSection.style.display = 'none';
        contentInput.readOnly = false;
        contentInput.style.background = 'var(--bg-card)';
        contentLabel.textContent = '메시지 내용';
        contentInput.value = '';
        container.querySelector('#msg-length').textContent = '0';
      }
    });

    // 템플릿 변경 처리
    tplSelect.addEventListener('change', (e) => {
      const code = e.target.value;
      selectedTemplate = templates.find(t => t.templateCode === code);
      buildVariableInputs();
    });

    contentInput.addEventListener('input', (e) => {
      container.querySelector('#msg-length').textContent = e.target.value.length;
    });

    // 초기 데이터 로드 (템플릿)
    getTemplates().then(res => {
      templates = res;
      if (templates.length > 0) {
        tplSelect.innerHTML = '<option value="">템플릿을 선택하세요</option>' + 
          templates.map(t => `<option value="${t.templateCode}">${t.templateName}</option>`).join('');
      }
    });

    // 수신자 추가 버튼
    container.querySelector('#btn-add-group')?.addEventListener('click', () => {
      const groupVal = container.querySelector('#receiver-group').value;
      if (groupVal === 'all_hosts') {
        hosts.forEach(h => {
          if (!receivers.find(r => r.phone === h.phone)) {
            receivers.push({ name: h.name, phone: h.phone || '010-0000-0000' });
          }
        });
        showSuccess(`쇼호스트 ${hosts.length}명을 추가했습니다.`);
      } else if (groupVal === 'all_brands') {
        brands.forEach(b => {
          if (!receivers.find(r => r.name === b.name)) {
            receivers.push({ name: b.name, phone: '010-0000-0000' });
          }
        });
        showSuccess(`브랜드 ${brands.length}개를 추가했습니다.`);
      }
      updateReceiverList();
    });

    container.querySelector('#btn-add-manual')?.addEventListener('click', () => {
      const nameEl = container.querySelector('#manual-name');
      const phoneEl = container.querySelector('#manual-phone');
      const name = nameEl.value.trim();
      const phone = phoneEl.value.trim();
      
      if (!name || !phone) {
        showError('이름과 연락처를 모두 입력해주세요.');
        return;
      }
      if (receivers.find(r => r.phone === phone)) {
        showError('이미 추가된 연락처입니다.');
        return;
      }
      
      receivers.push({ name, phone });
      nameEl.value = '';
      phoneEl.value = '';
      updateReceiverList();
    });

    // 발송
    container.querySelector('#btn-send-message')?.addEventListener('click', async () => {
      const msgType = typeSelect.value;
      
      if (msgType === 'alimtalk') {
        if (!selectedTemplate) {
          showError('알림톡 템플릿을 선택해주세요.');
          return;
        }
        const missingVars = customVariables.filter(v => !variableValues[v]);
        if (missingVars.length > 0) {
          showError(`변수 값을 입력해주세요: ${missingVars.join(', ')}`);
          return;
        }
      } else {
        if (!contentInput.value.trim()) {
          showError('메시지 내용을 입력해주세요.');
          return;
        }
      }

      if (receivers.length === 0) {
        showError('수신자를 최소 1명 이상 추가해주세요.');
        return;
      }

      const btn = container.querySelector('#btn-send-message');
      btn.textContent = '발송 중...';
      btn.disabled = true;

      try {
        // 전송 페이로드 생성
        let payload = {
          msgType: msgType,
          receivers: []
        };

        if (msgType === 'alimtalk') {
          payload.templateCode = selectedTemplate.templateCode;
          // 수신자별로 개별 매핑된 최종 텍스트 생성 (API 스펙에 따라 다름)
          payload.receivers = receivers.map(r => {
            let msg = selectedTemplate.content;
            msg = msg.replace(/#\{이름\}/g, r.name).replace(/#\{고객명\}/g, r.name);
            customVariables.forEach(v => {
              const regex = new RegExp(`#\\{${v}\\}`, 'g');
              msg = msg.replace(regex, variableValues[v]);
            });
            return { name: r.name, number: r.phone, content: msg };
          });
        } else {
          payload.content = contentInput.value.trim();
          payload.receivers = receivers.map(r => ({ name: r.name, number: r.phone }));
        }

        const result = await sendKakaoMessage(payload);

        if (result.success) {
          showSuccess(result.message);
          // 폼 초기화 (수신자만)
          receivers = [];
          updateReceiverList();
        }
      } catch (err) {
        showError(err.message);
      } finally {
        btn.textContent = '메시지 발송하기';
        btn.disabled = false;
      }
    });

    // 초기 상태 강제
    typeSelect.dispatchEvent(new Event('change'));
  }

  render();
  return container;
}
