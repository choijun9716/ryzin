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

    // 1. <base> 태그 추가하여 상대경로 자원(이미지, CSS 등) 깨짐 방지
    const baseTag = `<base href="${origin}/">`;
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>${baseTag}`);
    } else {
      html = baseTag + html;
    }

    // 2. 라이브 위젯 스크립트 주입 (정교한 ryzin-widget-resize 동적 리사이즈)
    const widgetScript = `
      <iframe id="ryzin-live-iframe" src="https://ryzincorp.com/live/${targetLiveId}?widget=1&v=${Date.now()}" style="position:fixed; bottom:74px; right:12px; width:92px; height:112px; border:none; z-index:999999; background:transparent;" allow="autoplay; fullscreen" allowfullscreen></iframe>
      <script>
        window.addEventListener('message', function(e) {
          var data = e.data;
          if (typeof data === 'string') {
            try { data = JSON.parse(data); } catch(err) {}
          }
          if (data && data.type === 'ryzin-widget-resize') {
            var iframes = document.querySelectorAll('iframe');
            var iframe = null;
            for (var i = 0; i < iframes.length; i++) {
              if (iframes[i].contentWindow === e.source) {
                iframe = iframes[i];
                break;
              }
            }
            if (!iframe) {
              iframe = document.getElementById('ryzin-live-iframe');
            }
            if (iframe) {
              iframe.style.setProperty('width', data.width, 'important');
              iframe.style.setProperty('height', data.height, 'important');
              iframe.style.setProperty('bottom', data.bottom, 'important');
              iframe.style.setProperty('top', 'auto', 'important');
              if (data.expand) {
                iframe.style.setProperty('border-radius', '20px', 'important');
                iframe.style.setProperty('overflow', 'hidden', 'important');
                iframe.style.setProperty('border', 'none', 'important');
                iframe.style.setProperty('box-shadow', '0 12px 40px rgba(0,0,0,0.15)', 'important');
              } else {
                iframe.style.setProperty('border-radius', '50%', 'important');
                iframe.style.setProperty('overflow', 'visible', 'important');
                iframe.style.setProperty('border', 'none', 'important');
                iframe.style.setProperty('box-shadow', 'none', 'important');
              }
              if (data.position === 'left') {
                iframe.style.setProperty('left', '12px', 'important');
                iframe.style.setProperty('right', 'auto', 'important');
              } else {
                iframe.style.setProperty('right', '12px', 'important');
                iframe.style.setProperty('left', 'auto', 'important');
              }
            }
          }
        });
      </script>
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
