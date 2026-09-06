// api/admin/data.js
// 어드민 데이터 조회 프록시: JWT 검증 후 service_role 키로 Supabase 조회
// anon 키 없이 서버에서만 민감 데이터에 접근합니다.

const crypto = require('crypto');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'ryzin_admin_jwt_secret_change_this_in_vercel';

// 허용된 테이블 목록 (화이트리스트)
const ALLOWED_TABLES = {
  users: 'users?select=id,name,role,otp_secret',
  hosts: 'hosts?select=*',
  brands: 'brands?select=*',
  live_broadcasts: 'live_broadcasts?select=*',
  crm_clients: 'crm_clients?select=*',
  crm_activities: 'crm_activities?select=*',
  ryzin_class_applications: 'ryzin_class_applications?select=*',
  ryzin_class_survey_questions: 'ryzin_class_survey_questions?select=*',
  ryzin_class_settings: 'ryzin_class_settings?select=*',
  live_orders: 'live_orders?select=*&order=created_at.desc',
  admin_access_logs: 'admin_access_logs?select=*&order=created_at.desc&limit=300',
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

// CORS Origin 화이트리스트 검증 헬퍼
function setCorsHeaders(req, res, allowedMethods = 'GET, OPTIONS') {
  const origin = req.headers.origin;
  const isAllowedOrigin = (orig) => {
    if (!orig) return false;
    if (/^https:\/\/(www\.)?ryzincorp\.com$/.test(orig)) return true;
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(orig)) return true;
    if (/^https:\/\/[a-zA-Z0-9_\-]+\.vercel\.app$/.test(orig)) return true;
    if (orig === 'capacitor://localhost' || orig === 'ionic://localhost') return true;
    return false;
  };

  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  } else if (!origin) {
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', allowedMethods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

async function handler(req, res) {
  setCorsHeaders(req, res, 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[Admin Data] SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.');
    return res.status(500).json({ error: '서버 설정 오류입니다.' });
  }

  // JWT 토큰 검증
  const authHeader = req.headers['x-admin-token'] || req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return res.status(401).json({ error: '인증 토큰이 필요합니다.' });
  }

  const payload = verifyJWT(token, ADMIN_JWT_SECRET);
  if (!payload) {
    return res.status(401).json({ error: '유효하지 않은 토큰입니다. 다시 로그인해주세요.' });
  }

  // 테이블 파라미터 검증
  const { table } = req.query;

  if (!table || !ALLOWED_TABLES[table]) {
    return res.status(400).json({ error: `허용되지 않은 테이블입니다: ${table}` });
  }

  try {
    let endpoint = ALLOWED_TABLES[table];
    if (table === 'live_orders' && req.query.live_id) {
      endpoint = `live_orders?select=*&live_id=eq.${encodeURIComponent(req.query.live_id)}&order=created_at.desc`;
    }
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      }
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error(`[Admin Data] Supabase 조회 실패 (${table}):`, errText);
      return res.status(500).json({ error: '데이터 조회 중 오류가 발생했습니다.' });
    }

    let data = await resp.json();

    // 개인정보보호법: hosts 테이블 조회 시 권한별 주민등록번호 복호화/마스킹 처리
    if (table === 'hosts' && Array.isArray(data)) {
      const { decryptSSN, maskSSN } = require('./crypto_util.js');
      const isAdmin = payload.role === 'admin';

      data = data.map(item => {
        if (item && item.ssn) {
          if (isAdmin) {
            item.ssn = decryptSSN(item.ssn, ADMIN_JWT_SECRET);
          } else {
            const dec = decryptSSN(item.ssn, ADMIN_JWT_SECRET);
            item.ssn = maskSSN(dec);
          }
        }
        return item;
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('[Admin Data] 예상치 못한 오류:', err);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}

module.exports = handler;
module.exports.default = handler;
