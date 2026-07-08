const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';

const db = createClient(SUPABASE_URL, SUPABASE_KEY);

async function check() {
  try {
    const { data, error } = await db
      .from('live_control')
      .select('*')
      .eq('live_id', 'live02')
      .maybeSingle();

    console.log('--- DB QUERY RESULT ---');
    if (error) {
      console.error('ERROR:', error);
    } else {
      console.log(data);
    }
  } catch (err) {
    console.error('CATCH:', err);
  }
}

check();
