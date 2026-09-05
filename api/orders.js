// api/orders.js
// 일반 고객 주문 조회 엔드포인트: 2-Factor (주문/영수증 식별자 + 전화번호) 검증
// Vercel Serverless Function 환경에서 service_role 키로 안전하게 실행됩니다.

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vybrnhyaeugfwezbygdt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function cleanPhone(phone) {
  return String(phone || '').replace(/[^0-9]/g, '');
}

async function handler(req, res) {
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
    console.error('[Orders API] SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.');
    return res.status(500).json({ error: '서버 설정 오류입니다.' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: '잘못된 요청 형식입니다.' });
  }

  const { phone, order_ids, receipt_ids } = body || {};
  const normalizedPhone = cleanPhone(phone);

  const validOrderIds = Array.isArray(order_ids) ? order_ids.filter(Boolean) : [];
  const validReceiptIds = Array.isArray(receipt_ids) ? receipt_ids.filter(Boolean) : [];

  // [보안 핵심 검증]
  // 1. 전화번호가 없거나, 주문번호/영수증번호 식별자 목록이 전혀 없는 경우
  // 전화번호만으로 타인의 주문을 무차별 전수 조회(스크래핑)하는 행위를 403으로 차단합니다.
  if (!normalizedPhone || (validOrderIds.length === 0 && validReceiptIds.length === 0)) {
    return res.status(403).json({
      error: '주문 조회를 위한 식별 정보가 부족하거나 유효하지 않습니다.',
      details: '전화번호와 함께 본인의 주문번호 또는 결제영수증번호가 필요합니다.'
    });
  }

  try {
    // 2. 전달된 식별자 목록으로 조건절 생성 (최대 50건)
    const filterClauses = [];
    if (validOrderIds.length > 0) {
      const idsStr = validOrderIds.slice(0, 50).map(id => `"${id}"`).join(',');
      filterClauses.push(`id.in.(${idsStr})`);
    }
    if (validReceiptIds.length > 0) {
      const recsStr = validReceiptIds.slice(0, 50).map(r => `"${r}"`).join(',');
      filterClauses.push(`pg_receipt_id.in.(${recsStr})`);
    }

    const orQuery = filterClauses.join(',');
    const endpoint = `${SUPABASE_URL}/rest/v1/live_orders?or=(${encodeURIComponent(orQuery)})&select=*&order=created_at.desc`;

    const resp = await fetch(endpoint, {
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      }
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('[Orders API] Supabase 조회 실패:', errText);
      return res.status(500).json({ error: '주문 조회 처리 중 오류가 발생했습니다.' });
    }

    const rows = await resp.json();

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(404).json({ error: '일치하는 주문 내역을 찾을 수 없습니다.' });
    }

    // 3. 주문자 전화번호 일치 여부 2차 엄격 검증
    // 조회된 주문 중 요청자의 전화번호와 일치하는 건만 필터링
    const verifiedOrders = rows.filter(order => {
      const orderPhone = cleanPhone(order.customer_phone || order.buyer_phone || order.phone);
      return orderPhone === normalizedPhone;
    });

    // 요청한 식별자의 주문은 있으나 전화번호가 다른 경우 (타인 주문 탈취 시도) -> 403 Forbidden 차단!
    if (verifiedOrders.length === 0) {
      return res.status(403).json({
        error: '주문자 정보가 일치하지 않아 조회가 거부되었습니다.'
      });
    }

    return res.status(200).json({
      success: true,
      orders: verifiedOrders
    });

  } catch (err) {
    console.error('[Orders API] 예상치 못한 에러:', err);
    return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
}

module.exports = handler;
module.exports.default = handler;
