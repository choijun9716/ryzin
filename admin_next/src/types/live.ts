export interface ProductItem {
  id: number | string;
  name: string;
  price: string | number;
  normalPrice?: string | number;
  discountRate?: number;
  stock?: string | number;
  maxPerUser?: string | number;
  image?: string;
  url?: string;
  clicks?: number;
  isFeatured?: boolean; // 지금소개중
  hideByDefault?: boolean; // 평소숨김
  isLeadForm?: boolean; // 상담문의
  isFreeGiveaway?: boolean; // 선착순 무료나눔 설정
  isGiveawayActive?: boolean; // 무료나눔 활성화
  giveawayStock?: number;
  giveawayClaimed?: number;
  giveawayStartedAt?: number;
  isAuction?: boolean; // 실시간 경매 설정
  dealText?: string; // 깜짝딜 텍스트
  dealEndTime?: number; // 깜짝딜 종료 타임스탬프
  detailImage?: string; // 상세페이지 다중 이미지 (쉼표 구분)
}

export interface LiveStats {
  viewers: number;
  cumViewers: number;
  hearts: number;
}

export interface LiveConfig {
  liveId: string;
  brandName: string;
  title: string;
  logoUrl: string;
  streamUrl: string;
  thumbnailUrl: string;
  isLive: boolean;
  liveStartTime: string;
  showViewers: boolean;
  showSplash?: boolean;
  shareTitle?: string;
  shareDesc?: string;
  shareImageUrl?: string;
  likeImageUrl?: string;
  bannedWords?: string;
  bannedUsers?: string;
  winner_name?: string | null;
  winner_timestamp?: number | null;
  widgetText?: string;
  widgetPosition?: string;
  widgetImageUrl?: string;
  showOnMain?: boolean;
  standbyImageUrl?: string;
  useStandbyImage?: boolean;
  showNoticeNote?: boolean;
  noticeNoteTitle?: string;
  noticeNoteContent?: string;
}

export interface ChatMessage {
  id?: string;
  live_id: string;
  nickname: string;
  content: string;
  created_at: string;
}
