-- =======================================================
-- [live_orders] 테이블 무중단 보안 강화 SQL
-- Supabase 대시보드 -> SQL Editor 에서 실행(Run)해 주세요.
-- =======================================================

-- 1. RLS 활성화 확인
ALTER TABLE IF EXISTS public.live_orders ENABLE ROW LEVEL SECURITY;

-- 2. 기존의 취약한 공개 조회 정책 삭제 (외부 anon 키 직접 조회 차단)
DROP POLICY IF EXISTS "Allow select filtered orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow all users to select orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow anon select orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow all select orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow anon delete orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow anon update orders" ON public.live_orders;

-- 3. 고객 신규 결제/주문 생성용 INSERT 권한만 유지
DROP POLICY IF EXISTS "Allow anon insert orders" ON public.live_orders;
CREATE POLICY "Allow anon insert orders" ON public.live_orders
    FOR INSERT TO public
    WITH CHECK (true);

-- ※ SELECT, UPDATE, DELETE 에 대해 public 정책을 부여하지 않음으로써,
-- 외부 브라우저에서 anon 키를 이용한 타인 주문 무단 조회 및 스크래핑을 원천 차단합니다.
-- 본인 주문 조회(/api/orders) 및 관리자 조회/취소(/api/admin/data, /api/admin/save)는
-- 백엔드 서버(Vercel)의 service_role 키를 통해 100% 안전하게 정상 처리됩니다.
