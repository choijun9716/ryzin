// ===== 모달 컴포넌트 =====

let activeModal = null;

export function openModal({ title, size = 'md', content, footer, onClose }) {
  closeModal(); // 기존 모달 닫기

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';

  const sizeClass = `modal-${size}`;

  overlay.innerHTML = `
    <div class="modal ${sizeClass}">
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="modal-close" id="modal-close-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="modal-body" id="modal-body"></div>
      ${footer !== false ? '<div class="modal-footer" id="modal-footer"></div>' : ''}
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // 콘텐츠 삽입
  const bodyEl = overlay.querySelector('#modal-body');
  if (typeof content === 'string') {
    bodyEl.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    bodyEl.appendChild(content);
  } else if (typeof content === 'function') {
    const result = content(bodyEl);
    if (typeof result === 'string') bodyEl.innerHTML = result;
    else if (result instanceof HTMLElement) bodyEl.appendChild(result);
  }

  // 푸터 삽입
  if (footer !== false) {
    const footerEl = overlay.querySelector('#modal-footer');
    if (typeof footer === 'string') {
      footerEl.innerHTML = footer;
    } else if (footer instanceof HTMLElement) {
      footerEl.appendChild(footer);
    } else if (typeof footer === 'function') {
      const result = footer(footerEl);
      if (typeof result === 'string') footerEl.innerHTML = result;
      else if (result instanceof HTMLElement) footerEl.appendChild(result);
    }
  }

  // 닫기 이벤트
  const closeHandler = () => {
    closeModal();
    if (onClose) onClose();
  };

  overlay.querySelector('#modal-close-btn').addEventListener('click', closeHandler);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeHandler();
  });

  // ESC 키 닫기
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeHandler();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  activeModal = { overlay, escHandler };
  return overlay;
}

export function closeModal() {
  if (activeModal) {
    const { overlay, escHandler } = activeModal;
    overlay.classList.add('closing');
    document.removeEventListener('keydown', escHandler);
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 150);
    activeModal = null;
  }
}

// 확인 다이얼로그
export function confirmDialog({ title = '확인', message, onConfirm, confirmText = '확인', cancelText = '취소', danger = false }) {
  const content = document.createElement('div');
  content.innerHTML = `<p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">${message}</p>`;

  const footer = document.createElement('div');
  footer.style.display = 'flex';
  footer.style.gap = 'var(--space-3)';
  footer.style.justifyContent = 'flex-end';
  footer.style.width = '100%';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn btn-secondary';
  cancelBtn.textContent = cancelText;
  cancelBtn.addEventListener('click', closeModal);

  const confirmBtn = document.createElement('button');
  confirmBtn.className = danger ? 'btn btn-danger' : 'btn btn-primary';
  confirmBtn.textContent = confirmText;
  confirmBtn.addEventListener('click', () => {
    closeModal();
    if (onConfirm) onConfirm();
  });

  footer.appendChild(cancelBtn);
  footer.appendChild(confirmBtn);

  openModal({ title, size: 'sm', content, footer, onClose: null });
}
