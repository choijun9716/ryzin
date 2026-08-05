export default async function handler(req, res) {
  const { url, live_id } = req.query;

  if (!url) {
    return res.status(400).send('URL 파라미터가 필요합니다. 예: /api/proxy?url=https://example.com&live_id=PAZIW92');
  }

  const targetLiveId = live_id || 'PAZIW92';

  try {
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    const parsedUrl = new URL(targetUrl);
    const origin = parsedUrl.origin;

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    let html = await response.text();

    // 1. <base> 태그 추가하여 상대경로 자원 깨짐 방지
    const baseTag = `<base href="${origin}/">`;
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>${baseTag}`);
    } else {
      html = baseTag + html;
    }

    // 2. 초기 캡슐 뱃지 스타일 (더 큼직한 프리미엄 크기)
    const widgetScript = `
      <script src="https://ryzincorp.com/widget.js" data-live-id="${targetLiveId}"></script>
    `;

    if (html.includes('</body>')) {
      html = html.replace('</body>', `${widgetScript}</body>`);
    } else {
      html = html + widgetScript;
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (err) {
    console.error('Proxy Error:', err);
    return res.status(500).send(`사이트를 불러오는 중 오류가 발생했습니다: ${err.message}`);
  }
}
