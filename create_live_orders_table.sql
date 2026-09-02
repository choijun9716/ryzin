-- =======================================================
-- 라이브 주문 관리 전용 테이블 생성 SQL
-- Supabase 대시보드 -> SQL Editor 에서 복사 후 실행(Run)해 주세요!
-- =======================================================

CREATE TABLE IF NOT EXISTS public.live_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    live_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    items JSONB NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'payapp_requested',
    pg_provider TEXT,
    pg_receipt_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (보안 정책) 활성화
ALTER TABLE public.live_orders ENABLE ROW LEVEL SECURITY;

-- 시청자 주문 입력 허용 정책
DROP POLICY IF EXISTS "Allow all users to insert orders" ON public.live_orders;
CREATE POLICY "Allow all users to insert orders" ON public.live_orders FOR INSERT WITH CHECK (true);

-- 어드민 주문 조회 허용 정책
DROP POLICY IF EXISTS "Allow all users to select orders" ON public.live_orders;
CREATE POLICY "Allow all users to select orders" ON public.live_orders FOR SELECT USING (true);
