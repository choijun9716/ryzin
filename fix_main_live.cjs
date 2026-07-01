const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/main.js';
let content = fs.readFileSync(file, 'utf8');

const targetImport = `import { renderDashboard } from './pages/dashboard.js';`;
const newImport = `import { renderDashboard } from './pages/dashboard.js';
import { renderLiveStream } from './pages/live_stream.js';`;
content = content.replace(targetImport, newImport);

const targetRoute = `  router.register('/', () => renderDashboard());`;
const newRoute = `  router.register('/', () => renderDashboard());
  router.register('/live_stream', () => renderLiveStream());`;
content = content.replace(targetRoute, newRoute);

fs.writeFileSync(file, content);
