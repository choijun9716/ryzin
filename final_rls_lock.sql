-- ========================================================
-- 2단계: Supabase RLS 최종 잠금 SQL
-- ========================================================
-- 실행 전 필수 확인사항:
-- 1. api/admin/login.js, api/admin/data.js, api/admin/save.js 가 Vercel에 배포되어 있어야 합니다.
-- 2. Vercel 환경변수에 SUPABASE_SERVICE_ROLE_KEY, ADMIN_JWT_SECRET 이 설정되어 있어야 합니다.
-- 3. 어드민 ERP 로그인 및 전체 기능이 정상 동작함을 확인한 후 실행하세요.
-- 4. 라이브 방송 (주문, 채팅, 장바구니) 기능이 정상 동작함을 확인한 후 실행하세요.
-- ========================================================

-- --------------------------------------------------------
-- [users 테이블] anon 키 SELECT 완전 차단
-- 어드민은 이제 /api/admin/data (service_role) 로만 접근합니다.
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Allow anon read users" ON users;
DROP POLICY IF EXISTS "Allow select users" ON users;
DROP POLICY IF EXISTS "Allow anon select users" ON users;
DROP POLICY IF EXISTS "Public users are viewable by everyone" ON users;

-- anon 사용자의 users 테이블 SELECT 정책을 생성하지 않음 (= 완전 차단)
-- service_role은 RLS를 우회하므로 서버 함수는 정상 동작합니다.

-- --------------------------------------------------------
-- [hosts 테이블] anon 키 SELECT 완전 차단
-- 쇼호스트 주민등록번호, 계좌정보 보호
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Allow anon read hosts" ON hosts;
DROP POLICY IF EXISTS "Allow select hosts" ON hosts;
DROP POLICY IF EXISTS "Allow anon select hosts" ON hosts;
DROP POLICY IF EXISTS "Public hosts are viewable by everyone" ON hosts;

-- anon 사용자의 hosts 테이블 SELECT 정책을 생성하지 않음 (= 완전 차단)

-- --------------------------------------------------------
-- [crm_clients 테이블] anon 키 SELECT 완전 차단
-- CRM 고객 정보 보호
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Allow anon read crm_clients" ON crm_clients;
DROP POLICY IF EXISTS "Allow select crm_clients" ON crm_clients;
DROP POLICY IF EXISTS "Allow anon select crm_clients" ON crm_clients;

-- --------------------------------------------------------
-- [crm_activities 테이블] anon 키 SELECT 완전 차단
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Allow anon read crm_activities" ON crm_activities;
DROP POLICY IF EXISTS "Allow select crm_activities" ON crm_activities;
DROP POLICY IF EXISTS "Allow anon select crm_activities" ON crm_activities;

-- --------------------------------------------------------
-- [ryzin_class_applications 테이블] anon 키 SELECT 차단
-- 수강신청 개인정보 보호
-- --------------------------------------------------------
DROP POLICY IF EXISTS "Allow anon read ryzin_class_applications" ON ryzin_class_applications;
DROP POLICY IF EXISTS "Allow select ryzin_class_applications" ON ryzin_class_applications;
DROP POLICY IF EXISTS "Allow anon select ryzin_class_applications" ON ryzin_class_applications;

-- --------------------------------------------------------
-- [기존 정책 유지] 라이브 서비스 정상 동작 보장
-- 아래 정책들은 변경하지 않습니다:
-- - live_orders: 시청자 주문 INSERT, 본인 주문 SELECT (기존 RLS 유지)
-- - shop_users: 본인 정보 단건 조회/수정 (기존 RLS 유지)
-- - live_chats: 채팅 INSERT/SELECT (기존 RLS 유지)
-- - live_control: 방송 상태 조회 (기존 RLS 유지)
-- - brands, live_broadcasts: 어드민 전용 (기존 RLS 유지)
-- --------------------------------------------------------

-- ========================================================
-- 실행 완료 후 검증 방법:
-- 브라우저 개발자도구 콘솔에서 아래 명령 실행 시 빈 배열 또는 오류 반환 확인:
-- fetch('https://vybrnhyaeugfwezbygdt.supabase.co/rest/v1/hosts?select=*', {
--   headers: { 'apikey': 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9' }
-- }).then(r => r.json()).then(console.log)
-- => [] 또는 {"code":"42501","message":"..."} 반환 = 차단 성공
-- ========================================================
