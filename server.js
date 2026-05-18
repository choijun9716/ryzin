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
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                // Save to portfolio.json and hero.json if provided
                if (data.portfolio) {
                    fs.writeFileSync(path.join(__dirname, 'portfolio.json'), JSON.stringify(data.portfolio, null, 2), 'utf8');
                }
                if (data.hero) {
                    fs.writeFileSync(path.join(__dirname, 'hero.json'), JSON.stringify(data.hero, null, 2), 'utf8');
                }

                // Git commands
                exec('git add portfolio.json hero.json && git commit -m "Update site data via Admin" && git push', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Git error: ${error.message}`);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: false, error: error.message }));
                        return;
                    }
                    console.log('Successfully committed and pushed changes.');
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, message: 'Successfully committed and pushed.' }));
                });
            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    if (req.method === 'POST' && req.url === '/api/upload') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                if (data.filename && data.imageBase64) {
                    const base64Data = data.imageBase64.replace(/^data:image\/\w+;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    const filePath = path.join(__dirname, 'assets', data.filename);
                    
                    fs.writeFileSync(filePath, buffer);
                    
                    // Add to git so next sync will commit it
                    exec(`git add "assets/${data.filename}"`, (error) => {
                        if (error) console.error(`Git add error for image: ${error.message}`);
                    });
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, filename: data.filename }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
                }
            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // URL에서 쿼리 스트링 제거 및 디코딩 (공백 %20 및 한글 처리)
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);
    
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
