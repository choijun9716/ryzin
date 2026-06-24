// ===== RBAC 권한 관리 =====
import { store } from '../data/store.js';
import { ROLES } from '../data/models.js';

// 현재 사용자의 역할
export function getCurrentRole() {
  return store.getCurrentRole();
}

// 역할 변경
export function setCurrentRole(role) {
  store.setCurrentRole(role);
}

// 특정 권한 보유 여부 확인
export function hasPermission(permission) {
  const role = getCurrentRole();
  const roleConfig = ROLES[role];
  if (!roleConfig) return false;

  // 대표는 전체 권한
  if (roleConfig.permissions.includes('*')) return true;

  // 점 표기법 매칭: 'projects'는 'projects.design'도 포함
  return roleConfig.permissions.some(p => {
    if (p === permission) return true;
    if (permission.startsWith(p + '.')) return true;
    if (p.startsWith(permission + '.')) return false;
    return false;
  });
}

// 메뉴 접근 가능 여부
export function canAccessMenu(menuKey) {
  return hasPermission(menuKey);
}

// 수정 권한 (대표만)
export function canEdit() {
  const role = getCurrentRole();
  return role === 'admin';
}

// 삭제 권한 (대표만)
export function canDelete() {
  const role = getCurrentRole();
  return role === 'admin';
}

// 정산 권한 (대표, 회계)
export function canManageFinance() {
  const role = getCurrentRole();
  return role === 'admin' || role === 'accountant';
}

// 설정 권한 (대표만)
export function canManageSettings() {
  const role = getCurrentRole();
  return role === 'admin';
}

// 역할별 접근 가능 메뉴 목록
export function getAccessibleMenus() {
  const role = getCurrentRole();
  const allMenus = [
    { key: 'dashboard', label: '대시보드' },
    { key: 'projects', label: '라이브 관리' },
    { key: 'hosts', label: '쇼호스트 관리' },
    { key: 'brands', label: '브랜드 관리' },
    { key: 'finance', label: '매출/손익' },
    { key: 'settlement', label: '정산 관리' },
    { key: 'contracts', label: '계약 관리' },
    { key: 'marketing', label: '마케팅 메시지' },
    { key: 'crm', label: '영업 CRM' },
    { key: 'settings', label: '설정' },
  ];

  if (role === 'admin') return allMenus;

  const roleConfig = ROLES[role];
  if (!roleConfig) return [];

  return allMenus.filter(menu => {
    return roleConfig.permissions.some(p => {
      if (p === menu.key) return true;
      if (p.startsWith(menu.key + '.')) return true;
      return false;
    });
  });
}
