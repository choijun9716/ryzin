const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://vybrnhyaeugfwezbygdt.supabase.co', 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9');
async function run() {
  const { data, error } = await supabase.from('live_control').select('*').limit(1);
  if (data && data.length > 0) {
    console.log(Object.keys(data[0]));
  } else {
    console.log("Error or no data:", error);
  }
}
run();
