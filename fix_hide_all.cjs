const fs = require('fs');
let fileCSS = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.css';
let contentCSS = fs.readFileSync(fileCSS, 'utf8');

const targetCSS = `.chat-section, .input-section {
  transition: opacity 0.3s ease, transform 0.3s ease;
}`;
const newCSS = `.chat-section, .input-section, .side-actions {
  transition: opacity 0.3s ease, transform 0.3s ease;
}`;
if(contentCSS.includes(targetCSS)) {
  contentCSS = contentCSS.replace(targetCSS, newCSS);
  fs.writeFileSync(fileCSS, contentCSS);
}

let fileJS = '/Users/chaeijun/Downloads/ryzin-main 2/live/live.js';
let contentJS = fs.readFileSync(fileJS, 'utf8');

const targetJS = `  videoWrapper.addEventListener('click', () => {
    chatSection.classList.toggle('chat-hidden');
    inputSection.classList.toggle('chat-hidden');
  });`;
const newJS = `  const sideActions = document.querySelector('.side-actions');
  videoWrapper.addEventListener('click', () => {
    chatSection.classList.toggle('chat-hidden');
    inputSection.classList.toggle('chat-hidden');
    if(sideActions) sideActions.classList.toggle('chat-hidden');
  });`;

if(contentJS.includes(targetJS)) {
  contentJS = contentJS.replace(targetJS, newJS);
  fs.writeFileSync(fileJS, contentJS);
}
