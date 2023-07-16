function toggle (bool = true) {
  console.log('yt-fullview/content_injection.js', 'toggle()', bool);
  document.documentElement.classList.toggle('Ω', bool);
}

function handleLocationChange () {
  console.log('yt-fullview/content_injection.js', 'handleLocationChange()');
  if (/watch/.test(location.href)) {
    toggle();
    const $progress = document.querySelector('.ytp-progress-bar');
    const $volume = document.querySelector('.ytp-volume-panel');
    $progress.addEventListener('keydown', refocusPlayer);
    $volume.addEventListener('keydown', refocusPlayer);

    function refocusPlayer (e) {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.stopImmediatePropagation();
        e.stopPropagation();

        const $player = document.querySelector('.html5-video-player');
        $player.focus();
      }
    };
  }
}

handleLocationChange();

window.addEventListener('popstate', () => {
  handleLocationChange();
});
window.addEventListener('load', handleLocationChange);

console.log('yt-fullview/content_injection.js', 'loaded!');

// const $style = document.createElement('style');
// $style.innerHTML = `
// `;
// document.head.appendChild($style);