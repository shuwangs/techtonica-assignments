// Simple runner to execute index.html + script.js in Node using jsdom
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const indexPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });

dom.window.document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded in jsdom.');
  // give scripts a moment to run
  setTimeout(() => {
    // inspect some state if available
    try {
      const scoreEl = dom.window.document.querySelector('.score_display h3');
      console.log('Score element text:', scoreEl ? scoreEl.textContent : 'not found');
    } catch (e) {
      console.error('Error reading DOM:', e);
    }
    // exit after a short delay
    process.exit(0);
  }, 300);
});
