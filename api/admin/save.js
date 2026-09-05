// api/admin/save.js
// 어드민 데이터 쓰기 프록시: JWT 검증 후 service_role 키로 Supabase CRUD 처리
// POST=생성/업서트, PATCH=수정, DELETE=삭제

const crypto = require('crypto');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'ryzin_admin_jwt_secret_change_this_in_vercel';

// 허용된 테이블 및 ID 컬럼 매핑
const ALLOWED_WRITE_TABLES = {
  users: { idCol: 'id' },
  hosts: { idCol: 'id' },
  brands: { idCol: 'id' },
  live_broadcasts: { idCol: 'id' },
  crm_clients: { idCol: 'id' },
  crm_activities: { idCol: 'id' },
  ryzin_class_applications: { idCol: 'id' },
  ryzin_class_survey_questions: { idCol: 'id' },
  ryzin_class_settings: { idCol: 'key' },
  live_orders: { idCol: 'id' },
};

function verifyJWT(token, secret) {
  try {
    const [header, body, signature] = token.split('.');
    if (!header || !body || !signature) return null;
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${body}`)
      .digest('base64url');
    if (signature !== expectedSig) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token, Prefer');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!['POST', 'PATCH', 'DELETE'].includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[Admin Save] SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.');
    return res.status(500).json({ error: '서버 설정 오류입니다.' });
  }

  // JWT 검증
  const authHeader = req.headers['x-admin-token'] || req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return res.status(401).json({ error: '인증 토큰이 필요합니다.' });
  }

  const jwtPayload = verifyJWT(token, ADMIN_JWT_SECRET);
  if (!jwtPayload) {
    return res.status(401).json({ error: '유효하지 않은 토큰입니다. 다시 로그인해주세요.' });
  }

  // 요청 파라미터
  const { table, id } = req.query;

  if (!table || !ALLOWED_WRITE_TABLES[table]) {
    return res.status(400).json({ error: `허용되지 않은 테이블입니다: ${table}` });
  }

  const { idCol } = ALLOWED_WRITE_TABLES[table];

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    body = null;
  }

  try {
    let endpoint = `/rest/v1/${table}`;
    let method = req.method;
    const headers = {
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    };

    // PATCH/DELETE: ID 필터 적용
    if ((method === 'PATCH' || method === 'DELETE') && id) {
      endpoint += `?${idCol}=eq.${encodeURIComponent(id)}`;
    }

    // POST (upsert): Prefer 헤더 추가
    if (method === 'POST') {
      headers['Prefer'] = 'resolution=merge-duplicates';
    }

    const fetchOptions = {
      method,
      headers,
    };

    if (body && method !== 'DELETE') {
      fetchOptions.body = JSON.stringify(body);
    }

    const resp = await fetch(`${SUPABASE_URL}${endpoint}`, fetchOptions);

    if (!resp.ok) {
      const errText = await resp.text();
      console.error(`[Admin Save] Supabase 쓰기 실패 (${method} ${table}):`, errText);
      return res.status(500).json({ error: '데이터 저장 중 오류가 발생했습니다.', detail: errText });
    }

    // DELETE/PATCH는 보통 204 No Content 반환
    if (resp.status === 204) {
      return res.status(200).json({ success: true });
    }

    const result = await resp.json();
    return res.status(200).json(result);

  } catch (err) {
    console.error('[Admin Save] 예상치 못한 오류:', err);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}
