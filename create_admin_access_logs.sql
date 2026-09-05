-- ==============================================================================
-- 어드민 로그인 접속 및 보안 감사 로그 테이블 (admin_access_logs)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS admin_access_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name TEXT,
  ip TEXT,
  user_agent TEXT,
  status TEXT NOT NULL, -- 'SUCCESS', 'FAILED_PASSWORD', 'FAILED_OTP', 'LOCKED'
  fail_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성 (성능 및 5회 연속 실패 조회 최적화)
CREATE INDEX IF NOT EXISTS idx_admin_access_logs_user_created ON admin_access_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_access_logs_ip_created ON admin_access_logs(ip, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_access_logs_status_created ON admin_access_logs(status, created_at DESC);

-- RLS 활성화
ALTER TABLE admin_access_logs ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 후 service_role 전용 정책 적용
DROP POLICY IF EXISTS "service_role_all_admin_access_logs" ON admin_access_logs;
CREATE POLICY "service_role_all_admin_access_logs" ON admin_access_logs 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);
