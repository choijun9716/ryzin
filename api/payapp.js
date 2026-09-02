const https = require('https');
const querystring = require('querystring');

const PAYAPP_USERID = process.env.PAYAPP_USERID || 'choijun';
const PAYAPP_LINKKEY = process.env.PAYAPP_LINKKEY || 'HKLGmqloJDacD/xSfNFAp+1DPJnCCRVaOgT+oqg6zaM=';
const PAYAPP_LINKVAL = process.env.PAYAPP_LINKVAL || 'HKLGmqloJDacD/xSfNFApxwEhfqPpIdErCc7aBp4klk=';

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
    const {
      goodname,
      price,
      recvphone,
      buyerName,
      address,
      returnurl,
      var1,
      var2
    } = req.body || {};

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
      var1: var1 || '',
      var2: var2 || '',
      checkretry: 'y'
    };

    const postData = querystring.stringify(postParams);

    const options = {
      hostname: 'api.payapp.kr',
      path: '/oapi/apiLoad.html',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const payappResponse = await new Promise((resolve, reject) => {
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
