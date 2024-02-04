const BRO = globalThis.browser || globalThis.chrome;

BRO.runtime.onMessage.addListener((msg, sender) => {
  const fn = msgs[msg.name];
  if (fn)
    fn(msg, sender);
});

const msgs = {
  'content:init' ({ frameId }, sender) {
    const { tab } = sender;

    //console.log('content:init', frameId);

    inject({ tabId: tab.id });
  },
};


async function inject ({ tabId }) {
  const script = new Promise(rslv => {
    BRO.scripting.executeScript({
      target: { tabId },
      files: ['content_injection.js'],
    }, rslv);
  });

  const style = new Promise(rslv => {
    BRO.scripting.insertCSS({
      target: { tabId },
      files: ['style_injection.css'],
    }, rslv);
  });

  let { cssVars: userStyle } = await BRO.storage.local.get(['cssVars']);
  if (userStyle)
    userStyle = new Promise(rslv => {
      BRO.scripting.insertCSS({
        target: { tabId },
        css: `.Ω { ${ userStyle } }`,
      }, rslv);
    });

  return Promise.all([script, style, userStyle]);
}
