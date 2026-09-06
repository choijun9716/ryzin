// api/admin/login.js
// 어드민 로그인 API: 사내메일(네이버웍스 SMTP) 2단계 보안 인증(OTP) 지원
// 절대로 클라이언트 번들에 포함되지 않으며, Vercel Serverless Function으로만 실행됩니다.

const crypto = require('crypto');
const nodemailer = require('nodemailer');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'ryzin_admin_jwt_secret_change_this_in_vercel';

// SHA256 해시
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

// 이메일 마스킹 (예: choijun@ryzincorp.com -> cho***@ryzincorp.com)
function maskEmail(email) {
  if (!email || !email.includes('@')) return email || '';
  const [local, domain] = email.split('@');
  if (local.length <= 3) {
    return `${local}***@${domain}`;
  }
  return `${local.slice(0, 3)}***@${domain}`;
}

// 사용자별 인증메일 수신 주소 결정
function getRecipientEmail(user) {
  if (user.email && user.email.includes('@')) return user.email;
  if (user.id === 'choijun') return 'choijun@ryzincorp.com';
  return 'choijun@ryzincorp.com'; // 기본 사내 보안 담당자 메일로 전달
}

// 서버 사이드 OTP 중복 발송 방지 (30초 쿨다운 메모리 맵)
const activeOtpSessions = new Map(); // key: userId, value: { timestamp, sessionToken, email }

// 네이버웍스 SMTP 발송 함수
async function sendEmailOtp(toEmail, code) {
  const host = process.env.SMTP_HOST || 'smtp.worksmobile.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || 'choijun@ryzincorp.com';
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    throw new Error('SMTP_PASS 환경변수가 설정되지 않았습니다.');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const mailOptions = {
    from: `"라이진 보안센터" <${user}>`,
    to: toEmail,
    subject: `[라이진 어드민] 로그인 인증번호: [${code}]`,
    html: `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>[라이진 어드민] 로그인 인증번호</title>
      </head>
      <body style="margin: 0; padding: 40px 16px; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #09090b; -webkit-font-smoothing: antialiased;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 460px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 36px 36px 20px 36px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="font-size: 20px; font-weight: 900; letter-spacing: 2px; color: #09090b;">RYZIN</div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.5px; color: #64748b; background-color: #f1f5f9; padding: 4px 10px; border-radius: 9999px;">라이진 보안센터</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="padding: 0 36px;">
              <div style="height: 1px; background-color: #f1f5f9; width: 100%;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 28px 36px 24px 36px;">
              <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #09090b; letter-spacing: -0.02em;">보안 인증번호</h1>
              <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 1.5; color: #64748b;">
                라이진 관리자 시스템 로그인을 위한 일회용 인증코드입니다. 아래 번호를 로그인 창에 입력해 주세요.
              </p>

              <!-- OTP Box -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px 16px; text-align: center; margin-bottom: 24px;">
                <div style="font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace; font-size: 38px; font-weight: 800; letter-spacing: 12px; color: #09090b; padding-left: 12px; line-height: 1;">
                  ${code}
                </div>
                <div style="margin-top: 14px;">
                  <span style="display: inline-block; font-size: 11px; font-weight: 600; color: #e11d48; background-color: #ffe4e6; padding: 3px 10px; border-radius: 9999px;">
                    유효시간 5분
                  </span>
                </div>
              </div>

              <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #94a3b8;">
                * 본인이 요청하지 않은 경우 타인의 접속 시도일 수 있으니 사내 보안 담당자에게 즉시 문의해 주세요.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px 28px 36px; background-color: #fafafa; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8; font-weight: 500;">
                © 2026 RYZIN Corp. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  return await transporter.sendMail(mailOptions);
}

// 클라이언트 IP 추출
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || req.connection?.remoteAddress || 'unknown';
}

// 접속 감사 로그 기록 (admin_access_logs)
async function recordAccessLog({ userId, userName, ip, userAgent, status, failReason }) {
  if (!SUPABASE_SERVICE_ROLE_KEY) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/admin_access_logs`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: String(userId || 'unknown'),
        user_name: userName || null,
        ip: String(ip || 'unknown'),
        user_agent: String(userAgent || 'unknown'),
        status: String(status),
        fail_reason: failReason || null,
      }),
    });
  } catch (err) {
    console.warn('[Admin Access Log] 로그 저장 실패 (무시됨):', err.message);
  }
}

// 5회 연속 실패 시 1분간 잠금 확인
async function checkAccountLockout(userId, ip) {
  if (!SUPABASE_SERVICE_ROLE_KEY || !userId) return { locked: false };
  try {
    const oneMinAgo = new Date(Date.now() - 60 * 1000).toISOString();
    const query = `user_id=eq.${encodeURIComponent(userId)}&created_at=gte.${encodeURIComponent(oneMinAgo)}&order=created_at.desc&limit=10`;
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/admin_access_logs?${query}`, {
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });

    if (!resp.ok) return { locked: false };
    const logs = await resp.json();
    if (!Array.isArray(logs) || logs.length === 0) return { locked: false };

    let consecutiveFails = 0;
    let mostRecentFailTime = 0;
    for (const log of logs) {
      if (log.status === 'SUCCESS') {
        break; // 최근 성공이 있으면 그 이전 실패는 카운트 제외
      }
      if (log.status === 'FAILED_PASSWORD' || log.status === 'FAILED_OTP' || log.status === 'LOCKED') {
        consecutiveFails++;
        if (!mostRecentFailTime) {
          mostRecentFailTime = new Date(log.created_at).getTime();
        }
      }
    }

    if (consecutiveFails >= 5) {
      const elapsed = Math.floor((Date.now() - mostRecentFailTime) / 1000);
      const remainingSec = Math.max(1, 60 - elapsed);
      return {
        locked: true,
        remainingSec,
        consecutiveFails,
      };
    }

    return { locked: false };
  } catch (err) {
    console.warn('[Admin Lockout Check] 잠금 확인 오류:', err);
    return { locked: false };
  }
}

module.exports = { verifyJWT, ADMIN_JWT_SECRET };

module.exports.default = async function handler(req, res) {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[Admin Login] SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.');
    return res.status(500).json({ error: '서버 설정 오류입니다. 관리자에게 문의하세요.' });
  }

  const clientIp = getClientIp(req);
  const userAgent = req.headers['user-agent'] || 'unknown';

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: '잘못된 요청 형식입니다.' });
  }

  const { action, id, password, sessionToken, code } = body || {};

  try {
    // ==========================================
    // 1. 인증번호 검증 (Step 2)
    // ==========================================
    if (action === 'verify_otp') {
      if (!sessionToken || !code) {
        return res.status(400).json({ error: '인증 세션 정보 또는 인증번호가 누락되었습니다.' });
      }

      let sessionData;
      try {
        const decoded = Buffer.from(sessionToken, 'base64url').toString();
        sessionData = JSON.parse(decoded);
      } catch {
        return res.status(400).json({ error: '유효하지 않은 인증 세션입니다.' });
      }

      const { u: userId, exp, sig } = sessionData || {};
      if (!userId || !exp || !sig) {
        return res.status(400).json({ error: '잘못된 세션 데이터입니다.' });
      }

      // 유효시간(5분) 검사
      if (Date.now() > exp) {
        await recordAccessLog({
          userId,
          ip: clientIp,
          userAgent,
          status: 'FAILED_OTP',
          failReason: '인증번호 유효시간(5분) 만료'
        });
        return res.status(401).json({ error: '인증번호 유효시간(5분)이 만료되었습니다. 다시 로그인해 주세요.' });
      }

      // 서명 검증 (클라이언트가 보낸 6자리 code와 서버 비밀키로 검증)
      const cleanCode = code.toString().trim();
      const expectedSig = crypto
        .createHmac('sha256', ADMIN_JWT_SECRET)
        .update(`${userId}:${cleanCode}:${exp}`)
        .digest('hex');

      if (sig !== expectedSig) {
        await recordAccessLog({
          userId,
          ip: clientIp,
          userAgent,
          status: 'FAILED_OTP',
          failReason: '인증번호 불일치'
        });
        return res.status(401).json({ error: '인증번호가 일치하지 않습니다. 다시 확인해 주세요.' });
      }

      // 검증 완료 -> DB에서 최신 사용자 정보 조회
      const resp = await fetch(
        `${SUPABASE_URL}/rest/v1/users?id=eq.${encodeURIComponent(userId)}&select=id,name,role,created_at`,
        {
          headers: {
            'apikey': SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          }
        }
      );

      if (!resp.ok) {
        return res.status(500).json({ error: '사용자 정보를 불러올 수 없습니다.' });
      }

      const users = await resp.json();
      if (!users || users.length === 0) {
        return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
      }

      const user = users[0];

      // 정식 관리자 JWT 발급 (24시간 유효)
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

      // 최종 로그인 성공 감사 로그 기록
      await recordAccessLog({
        userId: user.id,
        userName: user.name,
        ip: clientIp,
        userAgent,
        status: 'SUCCESS',
        failReason: null,
      });

      // 성공 시 활성 OTP 세션 정리
      activeOtpSessions.delete(userId);

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        }
      });
    }

    // ==========================================
    // 2. 인증번호 재발송 (Resend OTP)
    // ==========================================
    if (action === 'resend_otp') {
      if (!sessionToken) {
        return res.status(400).json({ error: '세션 정보가 누락되었습니다.' });
      }

      let sessionData;
      try {
        const decoded = Buffer.from(sessionToken, 'base64url').toString();
        sessionData = JSON.parse(decoded);
      } catch {
        return res.status(400).json({ error: '유효하지 않은 인증 세션입니다.' });
      }

      const { u: userId } = sessionData || {};
      if (!userId) {
        return res.status(400).json({ error: '잘못된 세션 정보입니다.' });
      }

      const resp = await fetch(
        `${SUPABASE_URL}/rest/v1/users?id=eq.${encodeURIComponent(userId)}&select=id,name,role`,
        {
          headers: {
            'apikey': SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          }
        }
      );

      if (!resp.ok) {
        return res.status(500).json({ error: '사용자 조회 실패' });
      }
      const users = await resp.json();
      if (!users || users.length === 0) {
        return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
      }

      const user = users[0];
      const targetEmail = getRecipientEmail(user);

      // 재발송 20초 쿨다운 검사
      const now = Date.now();
      const existingSession = activeOtpSessions.get(userId);
      if (existingSession && (now - existingSession.timestamp) < 20 * 1000) {
        const remainingSec = Math.ceil((20000 - (now - existingSession.timestamp)) / 1000);
        return res.status(429).json({
          error: `인증번호는 ${remainingSec}초 후에 다시 발송할 수 있습니다.`,
        });
      }

      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      const newExp = Date.now() + 5 * 60 * 1000;
      const newSig = crypto
        .createHmac('sha256', ADMIN_JWT_SECRET)
        .update(`${user.id}:${newCode}:${newExp}`)
        .digest('hex');

      const newSessionToken = Buffer.from(
        JSON.stringify({ u: user.id, exp: newExp, sig: newSig })
      ).toString('base64url');

      await sendEmailOtp(targetEmail, newCode);

      activeOtpSessions.set(userId, {
        timestamp: Date.now(),
        sessionToken: newSessionToken,
        email: targetEmail,
      });

      return res.status(200).json({
        success: true,
        sessionToken: newSessionToken,
        email: maskEmail(targetEmail),
        message: '새 인증번호가 사내 메일로 발송되었습니다.',
      });
    }

    // ==========================================
    // 3. 아이디/비밀번호 1차 검증 (Step 1)
    // ==========================================
    if (!id || !password) {
      return res.status(400).json({ error: '아이디와 비밀번호를 입력하세요.' });
    }

    // 5회 연속 실패 시 1분간 잠금 확인 (Account Lockout)
    const lockout = await checkAccountLockout(id, clientIp);
    if (lockout.locked) {
      await recordAccessLog({
        userId: id,
        ip: clientIp,
        userAgent,
        status: 'LOCKED',
        failReason: `5회 연속 로그인 실패로 1분간 차단 (남은 시간: ${lockout.remainingSec}초)`
      });
      return res.status(429).json({
        error: `5회 연속 로그인 실패로 1분 동안 로그인이 제한됩니다. (남은 시간: ${lockout.remainingSec}초)`,
        remainingSec: lockout.remainingSec,
      });
    }

    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/users?id=eq.${encodeURIComponent(id)}&select=id,name,role,password`,
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
      if (resp.status === 402 || errText.includes('exceed_egress_quota')) {
        return res.status(500).json({
          error: '데이터베이스(Supabase)의 무료 트래픽 한도가 초과되었습니다. Supabase 대시보드에서 Pro 플랜으로 업그레이드해 주세요.'
        });
      }
      return res.status(500).json({ error: '서버 인증 처리 중 오류가 발생했습니다.' });
    }

    const users = await resp.json();

    if (!users || users.length === 0) {
      await recordAccessLog({
        userId: id,
        ip: clientIp,
        userAgent,
        status: 'FAILED_PASSWORD',
        failReason: '존재하지 않는 아이디'
      });
      return res.status(401).json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    const user = users[0];

    // 비밀번호 검증 (SHA256 해시 비교)
    const hashedInput = sha256(password);
    if (user.password !== hashedInput) {
      await recordAccessLog({
        userId: user.id,
        userName: user.name,
        ip: clientIp,
        userAgent,
        status: 'FAILED_PASSWORD',
        failReason: '비밀번호 불일치'
      });
      return res.status(401).json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    // SMTP 설정 확인
    const hasSmtp = Boolean(process.env.SMTP_PASS);

    if (!hasSmtp) {
      // SMTP 미설정 시 fallback (긴급 접속용)
      console.warn('[Admin Login] SMTP 미설정으로 OTP 건너뜀');
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

      await recordAccessLog({
        userId: user.id,
        userName: user.name,
        ip: clientIp,
        userAgent,
        status: 'SUCCESS',
        failReason: 'SMTP 미설정으로 OTP 건너뜀 (직접 로그인)',
      });

      return res.status(200).json({
        success: true,
        token,
        user: { id: user.id, name: user.name, role: user.role }
      });
    }

    // 중복 발송 방지: 30초 이내에 이미 발송된 활성 세션이 있다면 새 이메일을 보내지 않고 기존 세션 반환
    const now = Date.now();
    const existingOtp = activeOtpSessions.get(user.id);
    if (existingOtp && (now - existingOtp.timestamp) < 30 * 1000) {
      return res.status(200).json({
        success: true,
        step: 'otp_required',
        userId: user.id,
        email: maskEmail(existingOtp.email),
        sessionToken: existingOtp.sessionToken,
        message: '이미 인증번호가 발송되었습니다. 수신된 메일함을 확인해주세요.',
      });
    }

    // 6자리 일회용 보안코드 생성
    const codeGen = Math.floor(100000 + Math.random() * 900000).toString();
    const exp = Date.now() + 5 * 60 * 1000; // 5분 유효
    const sig = crypto
      .createHmac('sha256', ADMIN_JWT_SECRET)
      .update(`${user.id}:${codeGen}:${exp}`)
      .digest('hex');

    const sessionTokenPayload = Buffer.from(
      JSON.stringify({ u: user.id, exp, sig })
    ).toString('base64url');

    const targetEmail = getRecipientEmail(user);

    // 네이버웍스 SMTP로 이메일 발송
    try {
      await sendEmailOtp(targetEmail, codeGen);
      activeOtpSessions.set(user.id, {
        timestamp: Date.now(),
        sessionToken: sessionTokenPayload,
        email: targetEmail,
      });
    } catch (mailErr) {
      console.error('[Admin Login] 이메일 발송 실패:', mailErr);
      return res.status(500).json({
        error: '사내메일 인증번호 발송에 실패했습니다. 관리자에게 문의하세요.',
        details: mailErr.message
      });
    }

    return res.status(200).json({
      success: true,
      step: 'otp_required',
      userId: user.id,
      email: maskEmail(targetEmail),
      sessionToken: sessionTokenPayload,
    });

  } catch (err) {
    console.error('[Admin Login] 예상치 못한 오류:', err);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
};
