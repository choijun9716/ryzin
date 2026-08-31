const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/api/sync') {
        let bodyChunks = [];
        req.on('data', chunk => {
            bodyChunks.push(chunk);
        });
        req.on('end', () => {
            try {
                const body = Buffer.concat(bodyChunks).toString('utf8');
                const data = JSON.parse(body);
                // Save to portfolio.json and hero.json if provided
                if (data.portfolio) {
                    fs.writeFileSync(path.join(__dirname, 'portfolio.json'), JSON.stringify(data.portfolio, null, 2), 'utf8');
                }
                if (data.hero) {
                    fs.writeFileSync(path.join(__dirname, 'hero.json'), JSON.stringify(data.hero, null, 2), 'utf8');
                }
                if (data.packages) {
                    fs.writeFileSync(path.join(__dirname, 'packages.json'), JSON.stringify(data.packages, null, 2), 'utf8');
                }
                if (data.stories) {
                    fs.writeFileSync(path.join(__dirname, 'stories.json'), JSON.stringify(data.stories, null, 2), 'utf8');
                }
                if (data.logos) {
                    fs.writeFileSync(path.join(__dirname, 'logos.json'), JSON.stringify(data.logos, null, 2), 'utf8');
                }
                if (data.jobs) {
                    fs.writeFileSync(path.join(__dirname, 'career', 'jobs', 'jobs.json'), JSON.stringify(data.jobs, null, 2), 'utf8');
                }

                // Git commands
                exec('git add portfolio.json hero.json packages.json stories.json logos.json career/jobs/jobs.json && git commit -m "Update site data via Admin" && git push', { cwd: __dirname }, (error, stdout, stderr) => {
                    if (error) {
                        const outStr = (stdout + stderr).toLowerCase();
                        if (outStr.includes('nothing to commit') || outStr.includes('clean') || outStr.includes('커밋할') || outStr.includes('변경 사항 없음')) {
                            console.log('No changes to commit. Push not needed.');
                            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                            res.end(JSON.stringify({ success: true, message: '변경된 내용이 없어 저장이 생략되었습니다.' }));
                            return;
                        }
                        console.error(`Git error: ${error.message}`);
                        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ success: false, error: error.message }));
                        return;
                    }
                    console.log('Successfully committed and pushed changes.');
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: true, message: 'Successfully committed and pushed.' }));
                });
            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    if (req.method === 'POST' && req.url === '/api/sync-live-og') {
        let bodyChunks = [];
        req.on('data', chunk => {
            bodyChunks.push(chunk);
        });
        req.on('end', () => {
            try {
                const body = Buffer.concat(bodyChunks).toString('utf8');
                const data = JSON.parse(body);
                if (!data.liveId) {
                    throw new Error('liveId가 제공되지 않았습니다.');
                }
                const makeRedirectHtml = (title, desc, image, targetUrl) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <!-- Open Graph / Previews -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:image" content="${image}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${targetUrl}">
    <!-- Twitter Previews -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${desc}">
    <meta name="twitter:image" content="${image}">
    <script>
      window.location.replace("${targetUrl}");
    </script>
  </head>
  <body>
    <p style="font-family:-apple-system,sans-serif; text-align:center; padding-top:40px; color:#64748b;">
      라이브 스트리밍 페이지로 이동 중입니다...
    </p>
  </body>
</html>`;

                const shareTitle = data.shareTitle || 'RYZIN 라이브';
                const shareDesc = data.shareDesc || '실시간 라이브 특가 방송 진행 중!';
                const shareImage = data.shareImageUrl || 'https://via.placeholder.com/600x315';
                const targetUrl = `https://ryzincorp.com/live/?id=${data.liveId}`;

                const html = makeRedirectHtml(shareTitle, shareDesc, shareImage, targetUrl);
                const liveDir = path.join(__dirname, 'live');
                if (!fs.existsSync(liveDir)) {
                    fs.mkdirSync(liveDir, { recursive: true });
                }
                fs.writeFileSync(path.join(liveDir, `${data.liveId}.html`), html, 'utf8');

                // Git commands
                const gitCmd = `git add live/${data.liveId}.html && git commit -m "Update OG meta redirect for ${data.liveId}" && git push`;
                exec(gitCmd, { cwd: __dirname }, (error, stdout, stderr) => {
                    if (error) {
                        const outStr = (stdout + stderr).toLowerCase();
                        if (outStr.includes('nothing to commit') || outStr.includes('clean') || outStr.includes('변경 사항 없음')) {
                            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                            res.end(JSON.stringify({ success: true, message: '변경된 내용이 없어 저장이 생략되었습니다.' }));
                            return;
                        }
                        console.error(`Git error: ${error.message}`);
                        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ success: false, error: error.message }));
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: true, message: '공유 링크 파일이 성공적으로 배포되었습니다!' }));
                });
            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    if (req.method === 'POST' && req.url === '/api/upload') {
        let bodyChunks = [];
        req.on('data', chunk => {
            bodyChunks.push(chunk);
        });
        req.on('end', () => {
            try {
                const body = Buffer.concat(bodyChunks).toString('utf8');
                const data = JSON.parse(body);
                if (data.filename && data.imageBase64) {
                    const base64Data = data.imageBase64.replace(/^data:image\/\w+;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    const filePath = path.join(__dirname, 'assets', data.filename);
                    
                    fs.writeFileSync(filePath, buffer);
                    
                    // Add to git so next sync will commit it
                    exec(`git add "assets/${data.filename}"`, { cwd: __dirname }, (error) => {
                        if (error) console.error(`Git add error for image: ${error.message}`);
                    });
                    
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: true, filename: data.filename }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
                }
            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // URL에서 쿼리 스트링 제거 및 디코딩 (공백 %20 및 한글 처리)
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);
    
    if (pathname === '/paystmt.html') {
        const dParam = parsedUrl.searchParams.get('d');
        
        function localDecode(s) {
            if (!s) return null;
            try {
                let b = s.replace(/-/g, '+').replace(/_/g, '/');
                while (b.length % 4) b += '=';
                const buf = Buffer.from(b, 'base64');
                const parsed = JSON.parse(buf.toString('utf8'));
                if (parsed && (parsed.n !== undefined || parsed.i !== undefined)) {
                    const recipientName = parsed.n || '쇼호스트';
                    const paymentDate = parsed.p || '';
                    const items = (parsed.i || []).map(row => {
                        return { date: row[0] || '' };
                    });
                    return { recipientName, paymentDate, items };
                }
                return parsed;
            } catch (e) {
                return null;
            }
        }

        function localGetMonth(dateStr) {
            if (!dateStr) return '';
            const ymdMatch = dateStr.match(/^\d{4}[-/.](\d{1,2})[-/.]/);
            if (ymdMatch) return parseInt(ymdMatch[1], 10);
            const mdMatch = dateStr.match(/^(\d{1,2})[-/.]\d{1,2}/);
            if (mdMatch) {
                const m = parseInt(mdMatch[1], 10);
                if (m >= 1 && m <= 12) return m;
            }
            const koMatch = dateStr.match(/(\d{1,2})\s*월/);
            if (koMatch) return parseInt(koMatch[1], 10);
            return '';
        }

        const decoded = localDecode(dParam);
        let month = '';
        if (decoded && decoded.items && decoded.items.length > 0) {
            month = localGetMonth(decoded.items[0].date);
        }
        if (!month && decoded && decoded.paymentDate) {
            month = localGetMonth(decoded.paymentDate);
        }

        const name = decoded?.recipientName || decoded?.n || '';

        let title = "지급명세서 — RYZIN";
        if (name && month) {
            title = `${name} ${month}월 지급명세서`;
        } else if (month) {
            title = `${month}월 지급명세서 — RYZIN`;
        }

        const templatePath = path.join(__dirname, 'paystmt_template.html');
        fs.readFile(templatePath, 'utf8', (err, html) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Template not found');
                return;
            }
            let resultHtml = html.replace(/<title>지급명세서 — RYZIN<\/title>/g, `<title>${title}</title>`);
            resultHtml = resultHtml.replace(/<meta property="og:title" content="[^"]*">/g, `<meta property="og:title" content="${title}">`);

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(resultHtml, 'utf-8');
        });
        return;
    }
    
    // Static file serving
    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
    
    // 디렉토리 경로 요청 시 내부의 index.html 자동 매칭 (Directory Index)
    try {
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
    } catch (e) {
        // 파일이 존재하지 않는 경우 statSync 에러가 나며, fs.readFile의 에러 핸들러에서 404로 자연스럽게 처리됩니다.
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    console.log(`[Static Serve] req.url: ${req.url} | pathname: ${pathname} | filePath: ${filePath}`);
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n=========================================`);
    console.log(`로컬 서버 구동이 시작되었습니다!`);
    console.log(`관리자 페이지: http://localhost:${PORT}/admin.html`);
    console.log(`메인 홈페이지: http://localhost:${PORT}/`);
    console.log(`=========================================\n`);
});
