// ===== 상태 뱃지 컴포넌트 =====
import { BROADCAST_STATUSES, SETTLE_STATUSES, DESIGN_STATUSES, PRODUCT_STATUSES } from '../data/models.js';

export function renderBroadcastBadge(statusKey) {
  const status = BROADCAST_STATUSES.find(s => s.key === statusKey);
  if (!status) return `<span class="badge badge-default">${statusKey}</span>`;

  let bgColor = 'var(--bg-tertiary)';
  let textColor = 'var(--text-secondary)';

  switch (status.color) {
    case 'blue': bgColor = '#EFF6FF'; textColor = '#2563EB'; break;
    case 'indigo': bgColor = '#EEF2FF'; textColor = '#4F46E5'; break;
    case 'purple': bgColor = '#FAF5FF'; textColor = '#9333EA'; break;
    case 'pink': bgColor = '#FDF2F8'; textColor = '#DB2777'; break;
    case 'rose': bgColor = '#FFF1F2'; textColor = '#E11D48'; break;
    case 'orange': bgColor = '#FFF7ED'; textColor = '#EA580C'; break;
    case 'yellow': bgColor = '#FEFCE8'; textColor = '#CA8A04'; break;
    case 'teal': bgColor = '#F0FDFA'; textColor = '#0D9488'; break;
    case 'red': bgColor = '#FEF2F2'; textColor = '#DC2626'; break;
    case 'green': bgColor = '#ECFDF5'; textColor = '#059669'; break;
    case 'gray': bgColor = '#F3F4F6'; textColor = '#4B5563'; break;
  }

  return `<span class="badge" style="background:${bgColor}; color:${textColor};">${status.label}</span>`;
}

export function renderSettleBadge(statusKey) {
  const status = SETTLE_STATUSES.find(s => s.key === statusKey);
  if (!status) return `<span class="badge badge-default">${statusKey}</span>`;

  let bgColor = 'var(--bg-tertiary)';
  let textColor = 'var(--text-secondary)';

  switch (status.color) {
    case 'orange': bgColor = '#FFF7ED'; textColor = '#EA580C'; break;
    case 'green': bgColor = '#ECFDF5'; textColor = '#059669'; break;
  }

  return `<span class="badge" style="background:${bgColor}; color:${textColor};">${status.label}</span>`;
}

// 이전 호환성 유지용 (혹시 남아있을 사용처 대비)
export function renderStatusBadge(statusKey) {
  return renderBroadcastBadge(statusKey);
}

export function renderDesignBadge(statusKey) {
  const status = DESIGN_STATUSES.find(s => s.key === statusKey);
  if (!status) return `<span class="badge badge-default">${statusKey}</span>`;

  const styles = {
    requested: 'badge-default',
    working: 'badge-warning',
    reviewing: 'badge-warning',
    done: 'badge-success',
  };

  return `<span class="badge ${styles[statusKey] || 'badge-default'}">${status.label}</span>`;
}

export function renderProductBadge(statusKey) {
  const status = PRODUCT_STATUSES.find(s => s.key === statusKey);
  if (!status) return `<span class="badge badge-default">${statusKey}</span>`;

  const styles = {
    active: 'badge-success',
    inactive: 'badge-default',
    discontinued: 'badge-error',
  };

  return `<span class="badge ${styles[statusKey] || 'badge-default'}">${status.label}</span>`;
}
