const SUPABASE_URL = 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';

async function checkColumns() {
  console.log('Fetching live_control record schema...');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/live_control?select=*&limit=1`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });

  const rows = await res.json();
  if (rows && rows.length > 0) {
    console.log('Available columns in live_control:');
    console.log(Object.keys(rows[0]));
    console.log('Example row:', rows[0]);
  } else {
    console.log('No records found in live_control table.');
  }
}

checkColumns().catch(err => console.error('Error checking columns:', err));
