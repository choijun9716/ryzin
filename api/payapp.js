const https = require('https');
const querystring = require('querystring');

const PAYAPP_USERID = process.env.PAYAPP_USERID || 'choijun';
const PAYAPP_LINKKEY = process.env.PAYAPP_LINKKEY || 'HKLGmqloJDacD/xSfNFAp+1DPJnCCRVaOgT+oqg6zaM=';
const PAYAPP_LINKVAL = process.env.PAYAPP_LINKVAL || 'HKLGmqloJDacD/xSfNFApxwEhfqPpIdErCc7aBp4klk=';

function requestPayApp(params) {
  const postData = querystring.stringify(params);
  const options = {
    hostname: 'api.payapp.kr',
    path: '/oapi/apiLoad.html',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const apiReq = https.request(options, (apiRes) => {
      let body = '';
      apiRes.on('data', chunk => body += chunk);
      apiRes.on('end', () => {
        const parsed = querystring.parse(body);
        resolve(parsed);
      });
    });

    apiReq.on('error', (err) => reject(err));
    apiReq.write(postData);
    apiReq.end();
  });
}

function parsePayAppStatus(info) {
  if (!info || info.state !== '1') {
    return { status: 'unknown', raw: info };
  }

  const usingstate = String(info.usingstate || '');
  const usingstatestr = String(info.usingstatestr || info.usingstate_str || '');
  const canceldate = String(info.canceldate || '');

  // 취소 조건: usingstate가 64(결제승인취소) 또는 canceldate가 있거나 문자열에 취소가 포함된 경우
  if (usingstate === '64' || canceldate || usingstatestr.includes('취소')) {
    return {
      status: 'cancelled',
      usingstate,
      usingstatestr: usingstatestr || '결제취소',
      canceldate,
      paydate: info.paydate || '',
      price: info.goodprice || 0
    };
  }

  // 결제완료 조건
  if (usingstate === '4' || usingstatestr.includes('결제완료')) {
    return {
      status: 'paid',
      usingstate,
      usingstatestr: '결제완료',
      paydate: info.paydate || '',
      price: info.goodprice || 0
    };
  }

  // 결제요청/대기
  return {
    status: 'payapp_requested',
    usingstate,
    usingstatestr: usingstatestr || '결제요청',
    price: info.goodprice || 0
  };
}

export default async function handler(req, res) {
  // CORS 헤더 허용
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = req.body || {};
    const cmd = body.cmd;

    // ── 1. 일괄/단일 주문 상태 확인 및 취소 동기화 (check_orders or payinfo) ──
    if (cmd === 'check_orders' || cmd === 'payinfo') {
      const mul_nos = Array.isArray(body.mul_nos) ? body.mul_nos : (body.mul_no ? [String(body.mul_no)] : []);
      if (mul_nos.length === 0) {
        return res.status(400).json({ success: false, message: 'mul_no 또는 mul_nos 목록이 필요합니다.' });
      }

      const results = {};
      await Promise.all(mul_nos.map(async (no) => {
        try {
          const info = await requestPayApp({
            cmd: 'payinfo',
            userid: PAYAPP_USERID,
            linkkey: PAYAPP_LINKKEY,
            mul_no: String(no)
          });
          results[no] = parsePayAppStatus(info);
        } catch (e) {
          results[no] = { status: 'error', message: e.message };
        }
      }));

      return res.status(200).json({ success: true, results });
    }

    // ── 2. 결제 취소 / 부분 취소 요청 (paycancel / cancel) ──
    if (cmd === 'paycancel' || cmd === 'cancel') {
      const mul_no = String(body.mul_no || '');
      if (!mul_no) {
        return res.status(400).json({ success: false, message: '취소할 mul_no(결제번호)가 필요합니다.' });
      }

      const cancelmemo = body.cancelmemo || '관리자 주문 취소 처리';
      const cancelParams = {
        cmd: 'paycancel',
        userid: PAYAPP_USERID,
        linkkey: PAYAPP_LINKKEY,
        mul_no: mul_no,
        cancelmemo: cancelmemo
      };

      // 부분 취소 금액 지원
      if (body.cancelprice && Number(body.cancelprice) > 0) {
        cancelParams.cancelprice = String(body.cancelprice);
      }

      const cancelRes = await requestPayApp(cancelParams);

      if (cancelRes.state === '1') {
        return res.status(200).json({
          success: true,
          message: body.cancelprice ? `부분 취소(${Number(body.cancelprice).toLocaleString()}원)가 완료되었습니다.` : '결제가 정상적으로 취소되었습니다.',
          raw: cancelRes
        });
      } else {
        return res.status(400).json({
          success: false,
          message: cancelRes.errorMessage || '결제 취소에 실패했습니다. (이미 취소되었거나 취소 불가 상태)',
          raw: cancelRes
        });
      }
    }

    // ── 3. 기존 결제 요청 (payrequest) ──
    const {
      goodname,
      price,
      recvphone,
      buyerName,
      address,
      returnurl,
      var1,
      var2
    } = body;

    const cleanPrice = parseInt(String(price).replace(/[^0-9]/g, ''), 10) || 0;
    if (cleanPrice <= 0) {
      return res.status(400).json({ success: false, message: '유효한 결제 금액을 입력해주세요.' });
    }

    const cleanPhone = String(recvphone || '').replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      return res.status(400).json({ success: false, message: '구매자 연락처가 필요합니다.' });
    }

    const memo = `수령인: ${buyerName || '고객'} / 주소: ${address || '미입력'}`;

    const postParams = {
      cmd: 'payrequest',
      userid: PAYAPP_USERID,
      linkkey: PAYAPP_LINKKEY,
      goodname: goodname || '라이브 상품 주문',
      price: cleanPrice,
      recvphone: cleanPhone,
      memo: memo,
      reqaddr: '0',
      smsuse: 'n',
      returnurl: returnurl || '',
      redirecturl: returnurl || '',
      skip_cstpage: 'y',
      var1: var1 || '',
      var2: var2 || '',
      checkretry: 'y'
    };

    const payappResponse = await requestPayApp(postParams);

    if (payappResponse.state === '1') {
      return res.status(200).json({
        success: true,
        mul_no: payappResponse.mul_no,
        payurl: payappResponse.payurl,
        qrurl: payappResponse.qrurl
      });
    } else {
      return res.status(400).json({
        success: false,
        message: payappResponse.errorMessage || '페이앱 결제 요청에 실패했습니다.',
        errno: payappResponse.errno
      });
    }

  } catch (error) {
    console.error('PayApp Error:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다: ' + error.message
    });
  }
}
