-- 라이브 자체 결제 주문 내역 테이블
CREATE TABLE IF NOT EXISTS public.live_orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    live_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    items JSONB NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'paid', -- 결제 성공 시 'paid'
    pg_provider TEXT,
    pg_receipt_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 활성화 및 권한 설정 (필요시)
ALTER TABLE public.live_orders ENABLE ROW LEVEL SECURITY;

-- 모든 사용자(또는 로그인된 사용자)가 주문 데이터를 생성할 수 있도록 허용
CREATE POLICY "Allow anonymous users to insert orders" ON public.live_orders
    FOR INSERT WITH CHECK (true);

-- 관리자는 모든 주문 데이터를 볼 수 있도록 허용 (인증된 사용자 기준 등)
CREATE POLICY "Allow all users to select orders" ON public.live_orders
    FOR SELECT USING (true);
