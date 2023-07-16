console.log('yt-fullview/content.js', 'loaded!');

const frameId = Date.now();

chrome.runtime.sendMessage({
  name: 'content:init',
  frameId,
});