# RYZIN Live Production - Technical Specifications & Skill Stack

이 문서는 라이진(RYZIN) 브랜드 웹사이트 프로젝트에 적용된 기술 스택, 시스템 구성 및 API/플러그인 명세를 다룹니다.

## 1. Frontend Technology Stack
- **HTML5**: 시맨틱 웹 마크업 및 검색엔진 최적화(SEO) 반영.
- **Vanilla CSS (CSS3)**: 
  - 커스텀 변수(`:root`)를 활용한 디자인 토큰 관리
  - 3D 가속 및 GPU 성능을 극대화한 애니메이션 (`scroll-reveal`, `marquee` 배너 등)
  - 데스크톱용 프리미엄 커스텀 마우스 포인터 (`.cursor`, `.cursor-follower`)
  - 미디어 쿼리를 활용한 모바일/태블릿 반응형 레이아웃 설계
- **JavaScript (ES6+)**:
  - `script.js` 내에 데이터 바인딩 및 동적 컴포넌트 렌더링 구현
  - 비동기 데이터 fetch 및 DOM 제어
  - 개인정보처리방침 및 회사소개서 다운로드 모달 제어 로직

## 2. Backend & API Services
- **Node.js (Native Modules)**:
  - `http`, `fs`, `path`, `child_process` 등의 내장 모듈을 사용하여 의존성을 최소화한 파일 서버 (`server.js`) 구축.
  - JSON 기반 파일 관리 시스템: `/api/sync` API를 통해 관리자 페이지에서 수정된 데이터를 `portfolio.json`, `hero.json` 등에 자동 동기화.
- **Git Auto Integration**:
  - 서버 단에서 데이터가 업데이트될 시 `child_process.exec`를 통해 Git Stage(`git add`), Commit 및 Push를 자동으로 실행하는 워크플로우 내장.

## 3. Third-party Libraries & Tools
- **Feather Icons**: 미니멀한 UI를 위해 CDN 기반으로 Feather 아이콘 렌더링.
- **Naver Analytics**: 네이버 로그분석 스크립트(`wcslog.js`)를 통합하여 웹사이트 유입 및 사용자 행동 분석 추적.
- **Channel IO**: 실시간 문의 및 고객 관리를 위한 채널톡 SDK 연동 (`script.js` 내부).
