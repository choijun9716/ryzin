import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const liveId = url.searchParams.get("id") || "live01";

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Supabase live_control 테이블에서 해당 liveId의 공유 설정 정보 조회
  const { data, error } = await supabase
    .from("live_control")
    .select("*")
    .eq("live_id", liveId)
    .maybeSingle();

  if (error) {
    console.error("Supabase fetch error:", error);
  }

  const shareTitle = data?.share_title || data?.title || "RYZIN 라이브";
  const shareDesc = data?.share_desc || data?.subtitle || "실시간 라이브 특가 방송 진행 중!";
  const shareImage = data?.share_image || data?.thumbnail_url || "https://via.placeholder.com/600x315";
  
  // 사용자의 라이브 시청 주소 (GitHub Pages 본진 도메인)
  const targetUrl = `https://choijun9716.github.io/ryzin/live/?id=${liveId}`;

  // 1. User-Agent 판별을 통해 크롤러 봇인지 실제 사람 브라우저인지 감지
  const ua = req.headers.get("user-agent") || "";
  const isBot = /bot|crawl|spider|facebook|kakao|naver|slack|twitter|scrap/i.test(ua);

  if (!isBot) {
    // 2. 실제 사용자는 Deno 단에서 즉각 302 Found 리다이렉션으로 진짜 시청 주소로 워프시킴
    return new Response(null, {
      status: 302,
      headers: {
        "location": targetUrl,
        "access-control-allow-origin": "*"
      }
    });
  }

  // 3. 카카오톡/페이스북/슬랙 등 메타 데이터 수집 봇은 이 HTML 태그를 파싱해 썸네일 카드를 생성함
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${shareTitle}</title>
    <!-- Open Graph / KakaoTalk / Slack Link Previews -->
    <meta property="og:title" content="${shareTitle}">
    <meta property="og:description" content="${shareDesc}">
    <meta property="og:image" content="${shareImage}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${targetUrl}">
    
    <!-- Twitter Link Previews -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${shareTitle}">
    <meta name="twitter:description" content="${shareDesc}">
    <meta name="twitter:image" content="${shareImage}">
  </head>
  <body>
    <p>Crawling index data...</p>
  </body>
</html>`;

  return new Response(html, {
    headers: { 
      "content-type": "text/html; charset=UTF-8",
      "access-control-allow-origin": "*"
    },
  });
})
