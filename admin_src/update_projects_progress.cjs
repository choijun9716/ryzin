const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/projects.js';
let content = fs.readFileSync(file, 'utf8');

const progressReplacement = `
    let progress = 0;
    if (project.broadcastStatus === 'scheduled') progress = 20;
    else if (project.broadcastStatus === 'host_cast') progress = 40;
    else if (project.broadcastStatus === 'tech_request') progress = 60;
    else if (project.broadcastStatus === 'design') progress = 80;
    else if (project.broadcastStatus === 'cue_sheet') progress = 90;
    else if (project.broadcastStatus === 'done') progress = 100;
`;

// Replace in renderInfoTab
content = content.replace(/const progress = tasks\.length > 0 \? Math\.round\(\(doneTasks \/ tasks\.length\) \* 100\) : 0;/, progressReplacement);

fs.writeFileSync(file, content);
