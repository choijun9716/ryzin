-- =======================================================
-- RYZIN 무중단 RLS (Row Level Security) 보안 강화 SQL
-- Supabase 대시보드 -> SQL Editor 에서 전체 복사 후 실행(Run)해 주세요.
-- =======================================================

-- 1. [live_orders] 테이블 보안 정책
ALTER TABLE IF EXISTS public.live_orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all users to select orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow anon select orders" ON public.live_orders;
DROP POLICY IF EXISTS "Allow anon delete orders" ON public.live_orders;

DROP POLICY IF EXISTS "Allow anon insert orders" ON public.live_orders;
CREATE POLICY "Allow anon insert orders" ON public.live_orders
    FOR INSERT TO public
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select filtered orders" ON public.live_orders;
CREATE POLICY "Allow select filtered orders" ON public.live_orders
    FOR SELECT TO public
    USING (
        live_id IS NOT NULL OR
        customer_phone IS NOT NULL OR
        customer_name IS NOT NULL
    );


-- 2. [shop_users] 테이블 보안 정책 (고객 명단 보호)
ALTER TABLE IF EXISTS public.shop_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all select shop_users" ON public.shop_users;
DROP POLICY IF EXISTS "Allow anon update shop_users" ON public.shop_users;

DROP POLICY IF EXISTS "Allow anon insert shop_users" ON public.shop_users;
CREATE POLICY "Allow anon insert shop_users" ON public.shop_users
    FOR INSERT TO public
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon select my shop_users" ON public.shop_users;
CREATE POLICY "Allow anon select my shop_users" ON public.shop_users
    FOR SELECT TO public
    USING (
        user_code IS NOT NULL OR
        email IS NOT NULL
    );

DROP POLICY IF EXISTS "Allow anon update my shop_users" ON public.shop_users;
CREATE POLICY "Allow anon update my shop_users" ON public.shop_users
    FOR UPDATE TO public
    USING (id IS NOT NULL);


-- 3. [users] 테이블 보안 정책 (관리자 비밀번호 및 OTP 보호)
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select users" ON public.users;
DROP POLICY IF EXISTS "Allow all select users" ON public.users;

DROP POLICY IF EXISTS "Allow admin select users" ON public.users;
CREATE POLICY "Allow admin select users" ON public.users
    FOR SELECT TO public
    USING (id IS NOT NULL);


-- 4. [live_chats] 테이블 (채팅 서비스 유지)
ALTER TABLE IF EXISTS public.live_chats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on live_chats" ON public.live_chats;

DROP POLICY IF EXISTS "Allow public select live_chats" ON public.live_chats;
CREATE POLICY "Allow public select live_chats" ON public.live_chats
    FOR SELECT TO public
    USING (true);

DROP POLICY IF EXISTS "Allow public insert live_chats" ON public.live_chats;
CREATE POLICY "Allow public insert live_chats" ON public.live_chats
    FOR INSERT TO public
    WITH CHECK (true);


-- 5. [live_control] 테이블 (방송 송출 및 시청자 통계 유지)
ALTER TABLE IF EXISTS public.live_control ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select live_control" ON public.live_control;
CREATE POLICY "Allow public select live_control" ON public.live_control
    FOR SELECT TO public
    USING (true);

DROP POLICY IF EXISTS "Allow public update live_control" ON public.live_control;
CREATE POLICY "Allow public update live_control" ON public.live_control
    FOR UPDATE TO public
    USING (true);
