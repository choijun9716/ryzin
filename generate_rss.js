const fs = require('fs');
const path = require('path');

// news.json 파일 읽기
const newsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'news.json'), 'utf8'));

// YYYY.MM.DD 형식을 RSS 규격인 RFC 822 날짜 포맷으로 변환하는 함수
function parseDateToRFC822(dateStr) {
  const parts = dateStr.split('.');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(Date.UTC(year, month, day, 0, 0, 0));
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getUTCDay()]}, ${String(date.getUTCDate()).padStart(2, '0')} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} 00:00:00 +0900`;
  }
  return new Date().toUTCString();
}

let itemsXml = '';
newsData.forEach(item => {
  const rfcDate = parseDateToRFC822(item.date);
  // 외부 뉴스 링크가 있으면 그 주소로, 없으면 뉴스룸 상세 앵커로 처리
  const link = item.url.startsWith('http') ? item.url : `https://ryzincorp.com/${item.url}`;
  
  itemsXml += `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${item.summary}]]></description>
      <pubDate>${rfcDate}</pubDate>
      <guid>${link}</guid>
      <author>RYZIN Corp.</author>
    </item>\n`;
});

// 전체 XML 구조 정의
const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>라이진 뉴스룸</title>
    <link>https://ryzincorp.com/news.html</link>
    <description>라이진 스튜디오(RYZIN)의 최신 언론 보도 및 보도자료를 만나보세요.</description>
    <language>ko</language>
    <pubDate>${parseDateToRFC822(newsData[0]?.date || '2026.08.03')}</pubDate>
    <generator>RYZIN RSS Generator</generator>
\n${itemsXml}  </channel>
</rss>`;

// rss.xml 저장
fs.writeFileSync(path.join(__dirname, 'rss.xml'), rssXml, 'utf8');
console.log('Successfully generated rss.xml!');
