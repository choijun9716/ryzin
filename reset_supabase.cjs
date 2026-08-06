const SUPABASE_URL = 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';

async function resetSupabaseStatus() {
  console.log('1. Supabase live_control 테이블 현재 레코드 조회 중...');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/live_control?select=*`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });

  const rows = await res.json();
  console.log('현재 DB 레코드 개수:', rows.length);
  rows.forEach(r => {
    console.log(`[ID: ${r.live_id}] status: ${r.status}, start_time: ${r.start_time}, title: ${r.title}`);
  });

  console.log('\n2. 모든 live_control 레코드의 status를 "OFF" (송출 대기)로 초기화 중...');
  for (const r of rows) {
    const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/live_control?live_id=eq.${r.live_id}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        status: 'OFF',
        updated_at: new Date().toISOString()
      })
    });
    console.log(`[ID: ${r.live_id}] status "OFF" 리셋 완료 (HTTP Status: ${updateRes.status})`);
  }
}

resetSupabaseStatus().catch(err => console.error('에러:', err));
