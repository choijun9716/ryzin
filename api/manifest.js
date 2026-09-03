const https = require('https');

const SUPABASE_URL = 'vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';

function fetchLiveControl(id) {
  return new Promise((resolve) => {
    const options = {
      hostname: SUPABASE_URL,
      path: `/rest/v1/live_control?select=*&live_id=eq.${encodeURIComponent(id)}`,
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json && json.length > 0 ? json[0] : null);
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.end();
  });
}

export default async function handler(req, res) {
  let id = req.query.id || 'N45ZMPL';
  if (id === 'index.html' || id === '') id = 'N45ZMPL';

  const liveData = await fetchLiveControl(id);

  const title = (liveData && (liveData.share_title || liveData.title)) || 'RYZIN STUDIO LIVE';
  const thumbnail = (liveData && (liveData.share_image || liveData.thumbnail_url)) || 'https://i.ibb.co/GQN2NXgR/image.jpg';

  const manifest = {
    name: "RYZIN STUDIO",
    short_name: "RYZIN STUDIO",
    description: "라이브커머스 실시간 방송 및 쇼핑",
    start_url: `/live/${id}`,
    scope: `/live/${id}`,
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/assets/app_icon.png",
        sizes: "192x192 512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  };

  res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).json(manifest);
}
