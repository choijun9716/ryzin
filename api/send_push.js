const webpush = require('web-push');
const https = require('https');

const VAPID_PUBLIC_KEY = 'BBM6fCUu5FI8wW3tOH3nzyOanT45GBcCEd9TrrDgIim0xnz_i4piPm46cyJNZx86YAiVuBwCkkTf5OTcMJ0ZyOA';
const VAPID_PRIVATE_KEY = '8J1KuVZZCvg0_MtxO7vOF1KcYltwMUU1ppWzn3nwWV4';

webpush.setVapidDetails(
  'mailto:contact@ryzincorp.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

const SUPABASE_URL = 'vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FxH6HGkUaKfcJD9by_TLFQ_0PJk80J9';

function fetchSubscriptions(liveId) {
  return new Promise((resolve) => {
    let path = `/rest/v1/live_leads?select=id,live_id,phone&name=eq.__WEB_PUSH__`;
    if (liveId) {
      path += `&live_id=eq.${encodeURIComponent(liveId)}`;
    }

    const options = {
      hostname: SUPABASE_URL,
      path: path,
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
          const list = JSON.parse(data);
          resolve(Array.isArray(list) ? list : []);
        } catch (e) {
          resolve([]);
        }
      });
    });
    req.on('error', () => resolve([]));
    req.end();
  });
}

function deleteSubscription(id) {
  return new Promise((resolve) => {
    const options = {
      hostname: SUPABASE_URL,
      path: `/rest/v1/live_leads?id=eq.${encodeURIComponent(id)}`,
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    };
    const req = https.request(options, () => resolve());
    req.on('error', () => resolve());
    req.end();
  });
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // 현재 구독자 수 조회
    const liveId = req.query.liveId;
    const list = await fetchSubscriptions(liveId);
    return res.status(200).json({ count: list.length, liveId: liveId || 'all' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { liveId, title, body, url, icon } = req.body || {};

  const payload = JSON.stringify({
    title: title || 'RYZIN STUDIO LIVE',
    body: body || '라이브 방송이 시작되었습니다!',
    url: url || (liveId ? `https://ryzincorp.com/live/${liveId}` : 'https://ryzincorp.com/live/'),
    icon: icon || 'https://i.ibb.co/GQN2NXgR/image.jpg'
  });

  const subsList = await fetchSubscriptions(liveId);

  if (subsList.length === 0) {
    return res.status(200).json({ success: true, sentCount: 0, message: '알림 신청 구독자가 없습니다.' });
  }

  let successCount = 0;
  let failCount = 0;

  await Promise.all(subsList.map(async (row) => {
    try {
      const sub = JSON.parse(row.phone);
      if (sub && sub.endpoint) {
        await webpush.sendNotification(sub, payload);
        successCount++;
      }
    } catch (err) {
      failCount++;
      // 구독 만료/해제된 경우 정리
      if (err.statusCode === 410 || err.statusCode === 404) {
        await deleteSubscription(row.id);
      }
    }
  }));

  return res.status(200).json({
    success: true,
    total: subsList.length,
    sentCount: successCount,
    failedCount: failCount
  });
}
