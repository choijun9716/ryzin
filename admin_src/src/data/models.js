// ===== 데이터 모델 정의 =====

export const BROADCAST_STATUSES = [
  { key: 'scheduled', label: '일정부킹', color: 'indigo' },
  { key: 'host_cast', label: '쇼호스트 선정', color: 'rose' },
  { key: 'tech_request', label: '기술서요청', color: 'purple' },
  { key: 'design', label: '디자인진행', color: 'orange' },
  { key: 'cue_sheet', label: '큐시트작성', color: 'yellow' },
  { key: 'done', label: '방송종료', color: 'gray' }
];

export const SETTLE_STATUSES = [
  { key: 'wait', label: '대기', color: 'orange' },
  { key: 'done', label: '완료', color: 'green' },
];

export const PLATFORMS = ['네이버', '쿠팡', '카카오', '11번가', '롯데ON', '그립', 'SSG', '기타'];

export const CATEGORIES = ['뷰티', '패션', '식품', '가전', '생활', '건강', '유아', '반려동물', '기타'];

export const HOST_ROLES = [
  { key: 'main', label: '메인 쇼호스트' },
  { key: 'sub', label: '서브 쇼호스트' },
  { key: 'guest', label: '게스트' },
];

export const DESIGN_STATUSES = [
  { key: 'requested', label: '요청' },
  { key: 'working', label: '작업중' },
  { key: 'reviewing', label: '검수중' },
  { key: 'done', label: '완료' },
];

export const PRODUCT_STATUSES = [
  { key: 'active', label: '활성' },
  { key: 'inactive', label: '비활성' },
  { key: 'discontinued', label: '단종' },
];

export const CHECKLIST_ITEMS = [
  '일정 부킹',
  'PD 배정',
  '상품 등록',
  '쇼호스트 섭외',
  '디자인 요청',
  '배너 제작',
  '큐시트 작성',
  '리허설',
  '방송 진행',
  '매출 입력',
  '정산 완료',
];

export const ROLES = {
  admin: { label: '대표', permissions: ['*'] },
  pd: { label: 'PD', permissions: ['dashboard', 'projects', 'products', 'hosts', 'brands', 'marketing'] },
  designer: { label: '디자이너', permissions: ['dashboard', 'projects.design'] },
  accountant: { label: '회계', permissions: ['dashboard', 'finance', 'settlement', 'projects.finance'] },
};

export const BANKS = [
  '국민은행', '신한은행', '우리은행', '하나은행', 'IBK기업은행',
  'NH농협은행', '카카오뱅크', '토스뱅크', 'SC제일은행', '대구은행',
  '부산은행', '광주은행', '전북은행', '경남은행', '제주은행',
  '수협은행', '새마을금고', '신협', '우체국',
];

// ID 생성
export function generateId(prefix = '') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return prefix ? `${prefix}_${timestamp}${random}` : `${timestamp}${random}`;
}

// 프로젝트 진행률 계산
export function calcProgress(tasks) {
  if (!tasks || tasks.length === 0) return 0;
  const done = tasks.filter(t => t.done).length;
  return Math.round((done / tasks.length) * 100);
}

// 상태 라벨 헬퍼 함수
export function getBroadcastStatusLabel(key) {
  const s = BROADCAST_STATUSES.find(x => x.key === key);
  return s ? s.label : key;
}

export function getSettleStatusLabel(key) {
  const s = SETTLE_STATUSES.find(x => x.key === key);
  return s ? s.label : key;
}

export function getBroadcastStatusColor(key) {
  const s = BROADCAST_STATUSES.find(x => x.key === key);
  return s ? s.color : 'gray';
}

export function getSettleStatusColor(key) {
  const s = SETTLE_STATUSES.find(x => x.key === key);
  return s ? s.color : 'gray';
}

export function getBroadcastStatus(label) {
  const s = BROADCAST_STATUSES.find(x => x.label === label);
  return s ? s.key : 'done';
}

export function getSettleStatus(label) {
  const s = SETTLE_STATUSES.find(x => x.label === label);
  return s ? s.key : 'wait';
}
