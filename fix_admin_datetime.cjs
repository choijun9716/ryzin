const fs = require('fs');
let content = fs.readFileSync('admin_src/src/pages/live_stream.js', 'utf8');

content = content.replace(
  '<label class="form-label">방송 시작 일시 (텍스트)</label>',
  '<label class="form-label">방송 시작 일시 (카운트다운용)</label>'
);
content = content.replace(
  '<input type="text" class="form-control" id="config-liveStartTime" placeholder="예: 오늘 밤 9시 시작" value="${config.liveStartTime || \'\'}">',
  '<input type="datetime-local" class="form-control" id="config-liveStartTime" value="${config.liveStartTime || \'\'}">'
);

fs.writeFileSync('admin_src/src/pages/live_stream.js', content);
