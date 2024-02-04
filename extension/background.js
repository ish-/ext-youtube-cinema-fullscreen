chrome.runtime.onMessage.addListener((msg, sender) => {
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


function inject ({ tabId }) {
  const script = new Promise(rslv => {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ['content_injection.js'],
    }, rslv);
  });

  const style = new Promise(rslv => {
    chrome.scripting.insertCSS({
      target: { tabId },
      files: ['style_injection.css'],
    }, rslv);
  });

  return Promise.all([script, style]);
}
