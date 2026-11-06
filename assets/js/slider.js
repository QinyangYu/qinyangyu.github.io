/*
 * Image slider used on the Talks, Teaching and Personal pages.
 *
 * Markup:
 *   <div class="mini-slider" aria-label="...">
 *     <h3 class="slider-title">Optional title</h3>
 *     <div class="track">
 *       <img src="..." alt="...">
 *       <img src="..." alt="..." loading="lazy">
 *       <button class="nav prev" aria-label="Previous image">‹</button>
 *       <button class="nav next" aria-label="Next image">›</button>
 *     </div>
 *     <div class="dots"></div>
 *   </div>
 */
(function () {
  function setup(slider) {
    var track = slider.querySelector('.track');
    if (!track) return;
    var imgs = Array.prototype.slice.call(track.querySelectorAll('img'));
    if (!imgs.length) return;

    var dotsWrap = slider.querySelector('.dots');
    var prev = slider.querySelector('.prev');
    var next = slider.querySelector('.next');
    var current = 0;
    var pending = 0;

    if (imgs.length < 2) {
      if (prev) prev.hidden = true;
      if (next) next.hidden = true;
    }

    var dots = imgs.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show image ' + (i + 1) + ' of ' + imgs.length);
      b.addEventListener('click', function () { show(i); });
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    function activate(i) {
      imgs.forEach(function (img, k) {
        img.classList.toggle('active', k === i);
        img.setAttribute('aria-hidden', k === i ? 'false' : 'true');
      });
      dots.forEach(function (b, k) {
        b.classList.toggle('active', k === i);
        if (k === i) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
      current = i;
      warm((i + 1) % imgs.length);
    }

    // Switch only once the target image has loaded, so the frame never goes blank.
    function show(target) {
      var i = (target + imgs.length) % imgs.length;
      var img = imgs[i];
      pending = i;
      if (img.complete && img.naturalWidth) { activate(i); return; }
      img.loading = 'eager';
      img.addEventListener('load', function () { if (pending === i) activate(i); }, { once: true });
    }

    function warm(i) {
      var img = imgs[i];
      if (img && !img.complete) img.loading = 'eager';
    }

    if (prev) prev.addEventListener('click', function () { show(current - 1); });
    if (next) next.addEventListener('click', function () { show(current + 1); });

    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    });

    // Swipe on touch screens
    var startX = null;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });

    activate(0);
    slider.classList.add('ready');
  }

  document.querySelectorAll('.mini-slider').forEach(setup);
})();
