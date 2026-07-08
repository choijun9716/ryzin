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
  
  // ✅ 실제 서비스 도메인으로 수정
  const targetUrl = `https://ryzincorp.com/live/?id=${liveId}`;

  const ua = req.headers.get("user-agent") || "";
  const sec = req.headers.get("sec-fetch-dest") || "";
  const fetchMode = req.headers.get("sec-fetch-mode") || "";

  // iframe, embed, script 요청이거나 일반 브라우저는 무조건 실제 URL로 리다이렉트
  const isEmbedOrBrowser =
    sec === "iframe" ||
    sec === "embed" ||
    sec === "frame" ||
    fetchMode === "navigate" ||
    /mozilla|chrome|safari|webkit|gecko/i.test(ua);

  // 카카오/네이버/슬랙 등 SNS 크롤러 봇 판별 (브라우저 UA가 없는 경우)
  const isSnsBot = !isEmbedOrBrowser && /bot|crawl|spider|facebook|kakao|naver|slack|twitter|scrap|preview/i.test(ua);

  if (!isSnsBot) {
    // 일반 사용자 및 iframe → 실제 시청 주소로 302 리다이렉트
    return new Response(null, {
      status: 302,
      headers: {
        "location": targetUrl,
        "access-control-allow-origin": "*",
        "x-frame-options": "ALLOWALL"
      }
    });
  }

  // SNS 크롤러 봇에게만 OG 메타 태그 HTML 응답
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

    <!-- 봇이 아닌 경우 자동 이동 -->
    <meta http-equiv="refresh" content="0;url=${targetUrl}">
  </head>
  <body>
    <p>잠시 후 라이브 방송 페이지로 이동합니다...</p>
  </body>
</html>`;

  return new Response(html, {
    headers: { 
      "content-type": "text/html; charset=UTF-8",
      "access-control-allow-origin": "*",
      "x-frame-options": "ALLOWALL"
    },
  });
})

