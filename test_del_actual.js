const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://vybrnhyaeugfwezbygdt.supabase.co', 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9');
async function run() {
  const { data: insertData, error: insertError } = await supabase.from('live_control').upsert({ live_id: 'TEST_DEL_123', status: 'OFF' }).select();
  console.log("Insert Data:", insertData, "Error:", insertError);
  
  const { data: delData, error: delError } = await supabase.from('live_control').delete().eq('live_id', 'TEST_DEL_123').select();
  console.log("Delete Data:", delData, "Error:", delError);
}
run();
