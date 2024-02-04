const BRO = globalThis.browser || globalThis.chrome;
//console.log('ext-youtube-cinema-fullscreen/content.js', 'loaded!');

const frameId = Date.now();

BRO.runtime.sendMessage({
  name: 'content:init',
  frameId,
});
