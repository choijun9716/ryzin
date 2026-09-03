const https = require('https');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';

function fetchLiveControl(id) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SUPABASE_URL,
      path: `/rest/v1/live_control?select=*&live_id=eq.${id}`,
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
  // vercel.json에서 /live/:id 로 넘어온 쿼리
  // 혹은 /api/live?id=live02 
  let id = req.query.id;
  
  if (!id) {
    // URL 매칭 fallback
    const match = req.url.match(/\/live\/([^\/?]+)/);
    if (match) id = match[1];
  }

  // 기본 OG 설정
  let title = "RYZIN LIVE";
  let description = "라이브 커머스 방송에 참여하세요!";
  let thumbnail = "https://i.ibb.co/tT2mTsLZ/58242e266681.jpg";

  if (id) {
    const data = await fetchLiveControl(id);
    if (data) {
      if (data.share_title) title = data.share_title;
      if (data.share_desc) description = data.share_desc;
      if (data.share_image) thumbnail = data.share_image;
    }
  }

  // 읽어올 템플릿 파일
  const templatePath = path.join(process.cwd(), 'live', 'index.html');
  let html = '';
  
  try {
    html = fs.readFileSync(templatePath, 'utf8');
  } catch(e) {
    return res.status(500).send('Template not found');
  }

  // OG 태그 치환
  // 기존 index.html에 있는 <meta property="og:title" ...> 등을 치환합니다.
  
  // 클라이언트 측 JS(live.js)가 URL 쿼리스트링 없이도 현재 라이브 ID를 알 수 있도록 전역 변수 주입
  if (id) {
    const liveTargetUrl = `https://ryzincorp.com/live/${id}`;
    html = html.replace('<head>', `<head>\n  <script>window.INJECTED_LIVE_ID = "${id}";</script>\n  <meta name="apple-mobile-web-app-title" content="${title}">\n  <link rel="apple-touch-icon" href="${thumbnail}">\n  <link rel="canonical" href="${liveTargetUrl}">`);
  }
  
  // 정규식으로 meta 속성 교체
  html = html.replace(/<meta property="og:title" content="[^"]*">/g, `<meta property="og:title" content="${title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/g, `<meta property="og:description" content="${description}">`);
  html = html.replace(/<meta property="og:image" content="[^"]*">/g, `<meta property="og:image" content="${thumbnail}">`);
  
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/g, `<meta name="twitter:title" content="${title}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/g, `<meta name="twitter:description" content="${description}">`);
  html = html.replace(/<meta name="twitter:image" content="[^"]*">/g, `<meta name="twitter:image" content="${thumbnail}">`);
  
  // JS 리다이렉터 스크립트에 라이브 아이디 주입 (선택 사항, index.html은 window.location.search로 id를 받음)
  // 기존 index.html에는 if (!/bot.../) { window.location.replace('./?id=live01'); } 과 같이 하드코딩된 부분이 있을 수 있습니다.
  // 안전하게 클라이언트 측 렌더링이 ?id=... 를 물고 가도록 변환:
  html = html.replace(/window\.location\.replace\('\.\/\?id=[^']+'\)/g, `window.location.replace('./?id=${id || ''}')`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  res.status(200).send(html);
}
