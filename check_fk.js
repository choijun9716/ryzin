const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://vybrnhyaeugfwezbygdt.supabase.co', 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9');
async function run() {
  const { data, error } = await supabase.from('live_control').select('live_id').limit(1);
  console.log("data:", data, "error:", error);
}
run();
