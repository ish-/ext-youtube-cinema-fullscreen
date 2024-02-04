//console.log('ext-youtube-cinema-fullscreen/content.js', 'loaded!');

const frameId = Date.now();

chrome.runtime.sendMessage({
  name: 'content:init',
  frameId,
});