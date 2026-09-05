// api/shared_scheme.js
// 브랜드사/파트너사용 라이브 스킴 공유 전용 API (비로그인 접근 허용)
// 특정 라이브 ID의 스킴(기획안/상품/이벤트)만 안전하게 조회 및 저장합니다.

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: '라이브 ID가 필요합니다.' });
  }

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: '서버 설정 오류입니다.' });
  }

  try {
    // 1. GET: 스킴 조회
    if (req.method === 'GET') {
      const resp = await fetch(
        `${SUPABASE_URL}/rest/v1/live_broadcasts?id=eq.${encodeURIComponent(id)}&select=id,brand_name,category,broadcast_date,broadcast_time,platform,pd,designer,host_a,host_b,live_url,scheme`,
        {
          headers: {
            'apikey': SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          }
        }
      );

      if (!resp.ok) {
        return res.status(500).json({ error: '데이터 조회 실패' });
      }

      const rows = await resp.json();
      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: '해당 프로젝트를 찾을 수 없습니다.' });
      }

      const row = rows[0];
      let parsedScheme = null;
      if (row.scheme) {
        try {
          parsedScheme = typeof row.scheme === 'string' ? JSON.parse(row.scheme) : row.scheme;
        } catch {
          parsedScheme = null;
        }
      }

      return res.status(200).json({
        id: row.id,
        brandName: row.brand_name || '',
        category: row.category || '',
        broadcastDate: row.broadcast_date || '',
        broadcastTime: row.broadcast_time || '',
        platform: row.platform || '',
        pd: row.pd || '',
        designer: row.designer || '',
        hostNames: [row.host_a, row.host_b].filter(Boolean).join(', ') || '-',
        liveUrl: row.live_url || '',
        scheme: parsedScheme || {},
      });
    }

    // 2. POST: 스킴 저장 (브랜드사가 작성한 내용 업데이트)
    if (req.method === 'POST') {
      let body;
      try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      } catch {
        return res.status(400).json({ error: '잘못된 요청 형식입니다.' });
      }

      const { scheme } = body || {};
      const schemeStr = typeof scheme === 'string' ? scheme : JSON.stringify(scheme || {});

      const patchResp = await fetch(
        `${SUPABASE_URL}/rest/v1/live_broadcasts?id=eq.${encodeURIComponent(id)}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ scheme: schemeStr })
        }
      );

      if (!patchResp.ok) {
        const errText = await patchResp.text();
        console.error('[Shared Scheme Save Error]:', errText);
        return res.status(500).json({ error: '스킴 저장 중 오류가 발생했습니다.' });
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[Shared Scheme API Error]:', err);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}

module.exports = handler;
module.exports.default = handler;
