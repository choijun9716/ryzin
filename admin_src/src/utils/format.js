// ===== 포맷 유틸리티 =====

// 숫자를 통화 형식으로 (원)
export function formatCurrency(num) {
  if (num === null || num === undefined || isNaN(num)) return '-';
  return new Intl.NumberFormat('ko-KR').format(Math.round(num)) + '원';
}

// 숫자를 축약 통화로 (만원, 억원)
export function formatCurrencyShort(num) {
  if (num === null || num === undefined || isNaN(num)) return '-';
  if (Math.abs(num) >= 100000000) {
    return (num / 100000000).toFixed(1).replace(/\.0$/, '') + '억';
  }
  if (Math.abs(num) >= 10000) {
    return (num / 10000).toFixed(0) + '만';
  }
  return formatCurrency(num);
}

// 숫자를 콤마 형식으로
export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '-';
  return new Intl.NumberFormat('ko-KR').format(num);
}

// 날짜 포맷 (YYYY.MM.DD → YYYY-MM-DD)
export function formatDate(dateStr) {
  if (!dateStr) return '-';
  return dateStr.replace(/\./g, '-');
}

// 날짜 포맷 (YYYY-MM-DD → MM.DD)
export function formatDateShort(dateStr) {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  return `${parts[1]}.${parts[2]}`;
}

// 월 포맷 (YYYY-MM → YYYY년 MM월)
export function formatMonth(monthStr) {
  if (!monthStr) return '-';
  const [y, m] = monthStr.split('-');
  return `${y}년 ${parseInt(m)}월`;
}

// 전화번호 포맷
export function formatPhone(phone) {
  if (!phone) return '-';
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
}

// ROI 포맷
export function formatROI(roi) {
  if (roi === null || roi === undefined || isNaN(roi)) return '-';
  return new Intl.NumberFormat('ko-KR').format(Math.round(roi * 100)) + '%';
}

// 퍼센트 포맷
export function formatPercent(num) {
  if (num === null || num === undefined || isNaN(num)) return '-';
  return `${Math.round(num)}%`;
}

// 주민등록번호 마스킹
export function maskSSN(ssn) {
  if (!ssn) return '-';
  if (ssn.includes('*')) return ssn;
  return ssn.substring(0, 6) + '-*******';
}

// 계좌번호 마스킹
export function maskAccount(account) {
  if (!account) return '-';
  if (account.length <= 4) return account;
  return account.substring(0, account.length - 4).replace(/./g, '*') + account.substring(account.length - 4);
}

// 상대 시간 (몇 일 전)
export function timeAgo(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '어제';
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return `${Math.floor(diffDays / 365)}년 전`;
}

// 현재 월 (YYYY-MM)
export function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// 오늘 날짜 (YYYY-MM-DD)
export function getToday() {
  return new Date().toISOString().split('T')[0];
}
