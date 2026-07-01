const fs = require('fs');
const file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/pages/dashboard.js';
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

// Original lines calculating progress:
// const projectTasks = tasks.filter(t => t.liveId === project.id);
// const totalTasks = projectTasks.length;
// const doneTasks = projectTasks.filter(t => t.done).length;
// const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

content = content.replace(/const projectTasks = tasks\.filter\(t => t\.liveId === project\.id\);\n\s*const totalTasks = projectTasks\.length;\n\s*const doneTasks = projectTasks\.filter\(t => t\.done\)\.length;\n\s*const progress = totalTasks > 0 \? Math\.round\(\(doneTasks \/ totalTasks\) \* 100\) : 0;/, progressReplacement);

fs.writeFileSync(file, content);
