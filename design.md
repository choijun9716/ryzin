# RYZIN Live Production - Design System & UI Guide

이 문서는 라이진(RYZIN) 브랜드 웹사이트에 적용된 디자인 시스템, 컬러 팔레트, 타이포그래피 및 레이아웃 시스템을 설명합니다.

## 1. Color Palette
라이진의 디자인 테마는 어두운 배경(Dark Mode)을 기반으로 한 프리미엄 감도의 미니멀리즘을 지향합니다.

### Base Colors
- **Main Background (`--bg-main`)**: `#000000` (Pure Black)
- **Text Pure (`--text-pure`)**: `#ffffff` (Pure White)
- **Text Primary (`--text-primary`)**: `#e2e2e2` (Soft Light Gray)
- **Text Muted (`--text-muted`)**: `#888888` (Dark Gray)

### Accent & Effect Colors
- **Point Orange Color**: `#ff8730` (브랜드 주요 강조 포인트 - 닷, 필터 뱃지 등)
- **Glow Background Top**: Radial-gradient with Blue (`#3b82f6`)
- **Glow Background Bottom**: Radial-gradient with Purple (`#8b5cf6`)
- **Borders (`--border-light`)**: `rgba(255, 255, 255, 0.1)`

## 2. Typography
사용자 경험과 심미성을 극대화하기 위해 다국어 폰트 시스템을 적용하였습니다.
- **Korean (Default)**: `Pretendard`, sans-serif (가독성 및 렌더링 효율 극대화)
- **English / Numbers**: `Outfit`, sans-serif (헤드라인 및 기하학적 형태의 서체 사용)
- **Font Weights**: Regular (400), Medium (500), Semi-Bold (600), Bold (700), Extra-Bold (800)

## 3. UI/UX Elements & Micro-interactions
- **Custom Cursor**: 데스크톱 환경(`min-width: 1025px`)에서 마우스 커서를 숨기고 브라우저 좌표를 추적하는 미니멀한 커스텀 마우스 포인터 적용. 특정 인터랙티브 요소 호버 시 커서가 커지고 블러 필터가 들어가는 액션 수행.
- **Sticky Scroll Reveal**: 회사 소개 섹션 등에서 스크롤 흐름에 따라 텍스트의 불투명도가 하나씩 100%로 활성화되는 인터랙티브 효과.
- **Glassmorphism**: 네비게이션 바 및 모달 영역에 `backdrop-filter: blur(16px)`를 사용하여 미려한 유리 질감 연출.
- **Slide & Marquee Grid**: 포트폴리오 숏클립 슬라이더와 파트너사 로고 무한 루프 애니메이션 구성.
