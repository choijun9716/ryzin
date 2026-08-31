const fs = require('fs');
const path = require('path');

function decode(s) {
  if (!s) return null;
  try {
    let b = s.replace(/-/g, '+').replace(/_/g, '/');
    while (b.length % 4) b += '=';
    const buf = Buffer.from(b, 'base64');
    const parsed = JSON.parse(buf.toString('utf8'));

    // 단축 스키마 처리 (n: recipientName, b: birthDate, ph: phone, p: paymentDate, i: [[date, detail, amount], ...])
    if (parsed && (parsed.n !== undefined || parsed.i !== undefined)) {
      const recipientName = parsed.n || '쇼호스트';
      const paymentDate = parsed.p || '';
      const items = (parsed.i || []).map(row => {
        const date = row[0] || '';
        return { date };
      });
      return { recipientName, paymentDate, items };
    }

    return parsed;
  } catch (e) {
    return null;
  }
}

function getMonthFromDate(dateStr) {
  if (!dateStr) return '';
  // 1. YYYY-MM-DD 또는 YYYY/MM/DD 형식 검사
  const ymdMatch = dateStr.match(/^\d{4}[-/.](\d{1,2})[-/.]/);
  if (ymdMatch) {
    return parseInt(ymdMatch[1], 10);
  }
  // 2. MM-DD 또는 MM/DD 형식 검사
  const mdMatch = dateStr.match(/^(\d{1,2})[-/.]\d{1,2}/);
  if (mdMatch) {
    const m = parseInt(mdMatch[1], 10);
    if (m >= 1 && m <= 12) return m;
  }
  // 3. 한글 'X월 Y일' 형식 검사
  const koMatch = dateStr.match(/(\d{1,2})\s*월/);
  if (koMatch) {
    return parseInt(koMatch[1], 10);
  }
  return '';
}

export default function handler(req, res) {
  const dParam = req.query.d;
  const decoded = decode(dParam);

  let month = '';
  if (decoded && decoded.items && decoded.items.length > 0) {
    month = getMonthFromDate(decoded.items[0].date);
  }
  // 백업용으로 paymentDate(지급일) 파싱 시도
  if (!month && decoded && decoded.paymentDate) {
    month = getMonthFromDate(decoded.paymentDate);
  }

  const name = decoded?.recipientName || decoded?.n || '';

  let title = "지급명세서 — RYZIN";
  if (name && month) {
    title = `${name}님 ${month}월 지급명세서 안내`;
  } else if (month) {
    title = `${month}월 지급명세서 — RYZIN`;
  }

  const templatePath = path.join(process.cwd(), 'paystmt_template.html');
  let html = '';
  try {
    html = fs.readFileSync(templatePath, 'utf8');
  } catch (e) {
    return res.status(500).send('Template file not found');
  }

  // <title> 치환
  html = html.replace(/<title>지급명세서 — RYZIN<\/title>/g, `<title>${title}</title>`);
  
  // og:title 치환
  html = html.replace(/<meta property="og:title" content="[^"]*">/g, `<meta property="og:title" content="${title}">`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  res.status(200).send(html);
}
