export default async function handler(req, res) {
  const { url, live_id, clean } = req.query;

  if (!url) {
    return res.status(400).send('URL 파라미터가 필요합니다. 예: /api/proxy?url=https://example.com&live_id=PAZIW92');
  }

  const targetLiveId = live_id || 'PAZIW92';
  const isClean = clean === 'true' || clean === '1';

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

    // 2. 방송중 상세보기(clean=true)인 경우:
    // 상단 라이진 커넥트 안내 문구, 방송보기 위젯, 도입 문의 버튼 및 모달을 100% 숨김 처리
    if (isClean) {
      const cleanOverrideStyle = `
        <style id="ryzin-clean-override">
          .ryzin-demo-top-notice,
          .ryzin-widget-container,
          .ryzin-demo-lead-btn,
          .ryzin-lead-modal-overlay,
          [class*="ryzin-demo-top"],
          [class*="ryzin-widget"],
          [class*="ryzin-demo-lead"],
          [class*="ryzin-lead-modal"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
          body {
            padding-top: 0 !important;
            margin-top: 0 !important;
          }
        </style>
      `;
      if (html.includes('</head>')) {
        html = html.replace('</head>', `${cleanOverrideStyle}</head>`);
      } else {
        html = cleanOverrideStyle + html;
      }
    } else {
      // 일반 외부 데모 시연일 때만 플로팅 위젯 주입
      const widgetScript = `
        <script src="https://ryzincorp.com/widget.js" data-live-id="${targetLiveId}" data-demo="true"></script>
      `;
      if (html.includes('</body>')) {
        html = html.replace('</body>', `${widgetScript}</body>`);
      } else {
        html = html + widgetScript;
      }
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (err) {
    console.error('Proxy Error:', err);
    return res.status(500).send(`사이트를 불러오는 중 오류가 발생했습니다: ${err.message}`);
  }
}
