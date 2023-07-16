function toggle (bool = true) {
  console.log('yt-fullview/content_injection.js', 'toggle()', bool);
  document.documentElement.classList.toggle('Ω', bool);
}

function checkLocation () {
  console.log('yt-fullview/content_injection.js', 'checkLocation()');
  toggle(/watch/.test(location.href));
}

checkLocation();

window.addEventListener('popstate', () => {
  checkLocation();
});
window.addEventListener('load', checkLocation);

console.log('yt-fullview/content_injection.js', 'loaded!');

// const $style = document.createElement('style');
// $style.innerHTML = `
// `;
// document.head.appendChild($style);