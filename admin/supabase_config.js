// === Supabase Configuration ===
// ⚠️ 아래 URL과 Key를 본인의 Supabase 프로젝트 정보로 수정하여 사용하세요.

const SUPABASE_URL = 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';

if (SUPABASE_URL.includes('your-project-id') || SUPABASE_KEY.includes('your-anon-key')) {
  console.warn('⚠️ Supabase 설정이 아직 완료되지 않았습니다. admin_src/public/supabase_config.js 파일에 실제 URL과 API Key를 입력하세요.');
}

// Global Supabase Client 초기화
window.supabaseClient = (window.supabase && typeof window.supabase.createClient === 'function')
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;
