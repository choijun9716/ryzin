-- =======================================================
-- [보안 최종 강화] brands 및 민감 테이블 완전 잠금 SQL
-- Supabase 대시보드 -> SQL Editor 에서 전체 복사 후 [Run]을 눌러주세요.
-- =======================================================

-- 1. brands 테이블 RLS 강제 활성화 및 기존 공개 정책 삭제
ALTER TABLE IF EXISTS public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.brands FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to brands" ON public.brands;
DROP POLICY IF EXISTS "Allow anon select brands" ON public.brands;
DROP POLICY IF EXISTS "Allow all users to select brands" ON public.brands;
DROP POLICY IF EXISTS "Allow all to brands" ON public.brands;

-- 2. live_orders 테이블 RLS 및 무단 조회 차단 (신규 주문 INSERT만 허용)
ALTER TABLE IF EXISTS public.live_orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select filtered orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow all users to select orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow anon select orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow all select orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow anon delete orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow anon update orders" ON public.live_orders;

DROP POLICY IF EXISTS "Allow anon insert orders" ON public.live_orders;
CREATE POLICY "Allow anon insert orders" ON public.live_orders
    FOR INSERT TO public
    WITH CHECK (true);

-- 3. 관리자 계정 및 CRM, 강사/쇼호스트 테이블 최종 강제 잠금 재확인
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.users FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to users" ON public.users;
DROP POLICY IF EXISTS "Allow admin select users" ON public.users;

ALTER TABLE IF EXISTS public.hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.hosts FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to hosts" ON public.hosts;

ALTER TABLE IF EXISTS public.crm_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.crm_clients FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to crm_clients" ON public.crm_clients;

ALTER TABLE IF EXISTS public.crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.crm_activities FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to crm_activities" ON public.crm_activities;

-- ※ 위 테이블들은 외부 anon 키의 무단 조회가 100% 원천 차단됩니다.
-- 관리자 시스템(/admin)은 Vercel 백엔드의 service_role 키를 통해 정상 작동합니다.
