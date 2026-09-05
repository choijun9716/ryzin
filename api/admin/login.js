// api/admin/login.js
// 어드민 로그인 API: service_role 키로 users 조회 후 비밀번호 검증 및 JWT 발급
// 절대로 클라이언트 번들에 포함되지 않으며, Vercel Serverless Function으로만 실행됩니다.

const crypto = require('crypto');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'ryzin_admin_jwt_secret_change_this_in_vercel';

// SHA256 해시 (crypto-js 없이 Node.js 내장 모듈 사용)
function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

// 간단한 JWT 생성 (HS256)
function createJWT(payload, secret) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

// JWT 검증 (다른 API에서 공용으로 사용)
function verifyJWT(token, secret) {
  try {
    const [header, body, signature] = token.split('.');
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

module.exports = { verifyJWT, ADMIN_JWT_SECRET };

module.exports.default = async function handler(req, res) {
  // CORS 허용 (어드민 도메인에서만)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // service_role 키 없으면 서버 설정 오류
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[Admin Login] SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.');
    return res.status(500).json({ error: '서버 설정 오류입니다. 관리자에게 문의하세요.' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: '잘못된 요청 형식입니다.' });
  }

  const { id, password } = body || {};

  if (!id || !password) {
    return res.status(400).json({ error: '아이디와 비밀번호를 입력하세요.' });
  }

  try {
    // service_role 키로 users 테이블 조회 (RLS 우회)
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/users?id=eq.${encodeURIComponent(id)}&select=id,name,role,password,otp_secret`,
      {
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        }
      }
    );

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('[Admin Login] Supabase 조회 실패:', errText);
      return res.status(500).json({ error: '서버 인증 처리 중 오류가 발생했습니다.' });
    }

    const users = await resp.json();

    if (!users || users.length === 0) {
      return res.status(401).json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    const user = users[0];

    // 비밀번호 검증 (SHA256 해시 비교)
    const hashedInput = sha256(password);
    if (user.password !== hashedInput) {
      return res.status(401).json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    // JWT 발급 (24시간 유효)
    const token = createJWT(
      {
        sub: user.id,
        name: user.name,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400,
      },
      ADMIN_JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        otpSecret: user.otp_secret || ''
      }
    });

  } catch (err) {
    console.error('[Admin Login] 예상치 못한 오류:', err);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
};
