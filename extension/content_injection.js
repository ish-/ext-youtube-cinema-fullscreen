var frameDepth = (function getDepth(w) {
  return w.parent === w ? 0 : 1 + getDepth(w.parent);
})(window);

let $player;

handleLocationChange();

window.addEventListener('popstate', handleLocationChange);
window.addEventListener('load', handleLocationChange);

console.log('yt-fullview/content_injection.js', 'loaded!');

function toggle (bool = true) {
  console.log('yt-fullview/content_injection.js', 'toggle()', bool);
  document.documentElement.classList.toggle('Ω', bool);
}

function handleLocationChange () {
  console.log('yt-fullview/content_injection.js', 'handleLocationChange()');
  toggle();
  if (/watch/.test(location.href)) {
    bindControls();
  }
}

let playerHover = true;
function bindControls () {
  const _$player = document.querySelector('.html5-video-player');
  if (_$player === $player)
    return;
  $player = _$player;

  $player.addEventListener('pointermove', e => { playerHover = true });
  $player.addEventListener('pointerleave', e => { playerHover = false });

  window.addEventListener('keydown', e => {
    if (playerHover) {
      if (e.code === 'ArrowUp'
       || e.code === 'ArrowDown'
       || e.code === 'ArrowLeft'
       || e.code === 'ArrowRight'
      ) {
        $player.focus();
      }
    }
  });

  const $progress = document.querySelector('.ytp-progress-bar');
  $progress.addEventListener('keydown', refocusPlayer);
  const $volume = document.querySelector('.ytp-volume-panel');
  $volume.addEventListener('keydown', refocusPlayer);

  function refocusPlayer (e) {
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      e.stopImmediatePropagation();
      e.stopPropagation();

      $player.focus();
    }
  };
}

// const $style = document.createElement('style');
// $style.innerHTML = `
// `;
// document.head.appendChild($style);