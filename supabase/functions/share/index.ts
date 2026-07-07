import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

serve(async (req) => {
  const url = new URL(req.url);
  const liveId = url.searchParams.get("id") || "live01";

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Supabase live_control 테이블에서 해당 liveId의 공유 설정 정보 조회
  const { data, error } = await supabase
    .from("live_control")
    .select("title, subtitle, thumbnail_url, share_title, share_desc, share_image")
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

  // 카카오톡 봇 등 스크레이퍼 봇과 일반 브라우저 유저에 모두 대응하는 리다이렉션 HTML 템플릿
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
    <meta property="og:url" content="${url.href}">
    
    <!-- Twitter Link Previews -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${shareTitle}">
    <meta name="twitter:description" content="${shareDesc}">
    <meta name="twitter:image" content="${shareImage}">

    <script>
      // 봇이 아닌 브라우저 사용자일 경우 즉시 진짜 라이브 시청 주소로 리다이렉트
      window.location.replace("${targetUrl}");
    </script>
  </head>
  <body>
    <p style="font-family:-apple-system,sans-serif; text-align:center; padding-top:40px; color:#64748b;">
      라이브 스트리밍 페이지로 안전하게 이동 중입니다...
    </p>
  </body>
</html>`;

  return new Response(html, {
    headers: { 
      "Content-Type": "text/html; charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    },
  });
})
