// Dark tech helpers: glitch text layers, and a terminal-style path above subpage titles.
(function () {
  document.querySelectorAll('.hero-name, .page-title').forEach(function (el) {
    el.setAttribute('data-text', el.textContent.trim());
  });
  var header = document.querySelector('.page-header');
  if (header) {
    var p = location.pathname.replace(/\/$/, '') || '/';
    header.setAttribute('data-path', '~/qinyangyu' + p + ' $');
  }
})();
