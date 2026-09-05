const crypto = require('crypto');

module.exports.config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb'
    }
  }
};

const CLOUD_NAME = 'dcschlkqy';
const API_KEY = '164668247829219';
const API_SECRET = '3viWG82ApYRVKmovy--32tNhsCw';

module.exports = async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { image, folder = 'ryzin_products' } = req.body || {};

    if (!image) {
      return res.status(400).json({ error: '이미지 데이터(base64 또는 URL)가 필요합니다.' });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);

    // Cloudinary SHA1 서명 생성
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
    const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

    const formData = new URLSearchParams();
    formData.append('file', image);
    formData.append('api_key', API_KEY);
    formData.append('timestamp', timestamp.toString());
    formData.append('folder', folder);
    formData.append('signature', signature);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      console.error('Cloudinary API Error:', result.error);
      return res.status(500).json({ error: result.error?.message || 'Cloudinary 업로드 실패' });
    }

    return res.status(200).json({
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    });
  } catch (err) {
    console.error('Server Upload Error:', err);
    return res.status(500).json({ error: err.message || '서버 업로드 처리 중 오류 발생' });
  }
};
