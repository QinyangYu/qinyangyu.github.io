/*
 * The small network around the homepage photo, with the photo as one of its nodes.
 * It is still until the mouse comes over it; then
 *  - nodes drift and the whole network sways a little around the photo
 *  - a diffusion process runs (independent cascade): a seed node — often the photo — activates, and
 *    every newly reached node passes the signal on to each neighbour with some probability, so it
 *    spreads through the network until it dies out; then a new round starts from a new seed
 *  - reached nodes pulse and the tie a signal travels on lights up
 *  - nodes ease away from the cursor
 * When the mouse leaves, everything settles back into place and stops.
 * On touch screens a tap plays it for a few seconds. Visitors who prefer reduced motion always see it still.
 */
(function () {
  var svg = document.querySelector('.hero-graph');
  if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var NS = 'http://www.w3.org/2000/svg';
  var PHOTO = -1;               // index used for the photo node
  var C = { x: 130, y: 120 };   // the photo's centre in the drawing
  var area = svg.closest('.hero-visual') || svg;

  var SPREAD = 0.35;            // chance a node passes the signal to each neighbour
  var REST = 3500;              // ms a node ignores new signals after being reached
  var TRAVEL = 1400;            // ms for a signal to cross one tie
  var MAX_SIGNALS = 3;          // at most this many signals on the move at once
  var PAUSE = 1600;             // ms between one round dying out and the next starting

  // ---------- read the drawing ----------
  var nodes = Array.prototype.map.call(svg.querySelectorAll('.nodes circle'), function (el, i) {
    var x = +el.getAttribute('cx'), y = +el.getAttribute('cy');
    return {
      el: el, bx: x, by: y, x: x, y: y, r: +el.getAttribute('r'),
      ox: 0, oy: 0, pulse: 0,
      ph: i * 1.7, sp: 0.7 + (i % 5) * 0.12, amp: 5 + (i % 3) * 2.5
    };
  });
  function find(x, y) {
    for (var i = 0; i < nodes.length; i++) if (Math.abs(nodes[i].bx - x) < 0.5 && Math.abs(nodes[i].by - y) < 0.5) return i;
    return PHOTO;
  }
  var ties = Array.prototype.map.call(svg.querySelectorAll('.edges line'), function (el) {
    return { el: el, a: find(+el.getAttribute('x1'), +el.getAttribute('y1')), b: find(+el.getAttribute('x2'), +el.getAttribute('y2')), busy: 0 };
  });
  var adj = {};
  adj[PHOTO] = [];
  nodes.forEach(function (n, i) { adj[i] = []; });
  ties.forEach(function (t) { adj[t.a].push({ to: t.b, tie: t }); adj[t.b].push({ to: t.a, tie: t }); });

  var layer = document.createElementNS(NS, 'g');
  layer.setAttribute('class', 'signals');
  svg.appendChild(layer);

  // ---------- state ----------
  var signals = [], queue = [], reachedAt = {};
  var mouse = null, hover = false, playUntil = 0, act = 0;
  var running = false, last = 0, nextSeed = 0;

  function pos(i) { return i === PHOTO ? C : nodes[i]; }

  // a node is reached: it lights up, then passes the signal on to some of its neighbours
  function reach(i, from, now) {
    if (now - (reachedAt[i] || -1e9) < REST) return;
    reachedAt[i] = now;
    if (i !== PHOTO) nodes[i].pulse = 1;
    var out = adj[i].filter(function (e) { return e.to !== from; });
    var sent = 0;
    out.forEach(function (e) {
      if (Math.random() < SPREAD) { queue.push({ at: now + 350 + Math.random() * 450, tie: e.tie, from: i, to: e.to }); sent++; }
    });
    if (!sent && from === null && out.length) { // a seed always gets the cascade going
      var e = out[(Math.random() * out.length) | 0];
      queue.push({ at: now + 120, tie: e.tie, from: i, to: e.to });
    }
  }

  function launch(q) {
    var dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('r', '3.2');
    dot.setAttribute('class', 'signal');
    layer.appendChild(dot);
    q.tie.busy++;
    q.tie.el.classList.add('lit');
    signals.push({ el: dot, tie: q.tie, from: q.from, to: q.to, t: 0 });
  }

  // ---------- animation ----------
  function frame(now) {
    var dt = last ? Math.min(50, now - last) : 16; last = now;
    var time = now / 1000;
    var target = hover || now < playUntil ? 1 : 0;
    act += (target - act) * 0.06;
    if (!target) queue.length = 0; // stop spreading once the mouse has left

    var ang = Math.sin(time * 0.3) * 0.3 * act, ca = Math.cos(ang), sa = Math.sin(ang);
    var settled = target === 0 && act < 0.004 && signals.length === 0;

    nodes.forEach(function (n) {
      var dx = n.bx - C.x, dy = n.by - C.y;
      var x = C.x + dx * ca - dy * sa + Math.sin(time * n.sp + n.ph) * n.amp * act;
      var y = C.y + dx * sa + dy * ca + Math.cos(time * n.sp * 0.9 + n.ph) * n.amp * act;
      var tx = 0, ty = 0;
      if (mouse) {
        var mx = x - mouse.x, my = y - mouse.y, d = Math.sqrt(mx * mx + my * my);
        if (d < 70 && d > 0.01) { var f = (1 - d / 70) * 16; tx = mx / d * f; ty = my / d * f; }
      }
      n.ox += (tx - n.ox) * 0.12; n.oy += (ty - n.oy) * 0.12;
      if (Math.abs(n.ox) > 0.05 || Math.abs(n.oy) > 0.05) settled = false;
      n.pulse = Math.max(0, n.pulse - dt / 600);
      if (settled) { n.x = n.bx; n.y = n.by; n.ox = n.oy = 0; n.pulse = 0; }
      else { n.x = x + n.ox; n.y = y + n.oy; }
      n.el.setAttribute('cx', n.x.toFixed(2));
      n.el.setAttribute('cy', n.y.toFixed(2));
      n.el.setAttribute('r', (n.r * (1 + 1.1 * n.pulse)).toFixed(2));
    });

    ties.forEach(function (t) {
      var a = pos(t.a), b = pos(t.b);
      t.el.setAttribute('x1', a.x.toFixed(2)); t.el.setAttribute('y1', a.y.toFixed(2));
      t.el.setAttribute('x2', b.x.toFixed(2)); t.el.setAttribute('y2', b.y.toFixed(2));
    });

    // diffusion: start a new round when the last one has died out
    if (target === 1 && act > 0.5 && !signals.length && !queue.length && now > nextSeed) {
      var seed = Math.random() < 0.45 ? PHOTO : (Math.random() * nodes.length) | 0;
      reachedAt = {};
      reach(seed, null, now);
      nextSeed = now + PAUSE;
    }
    for (var k = queue.length - 1; k >= 0; k--) {
      if (now >= queue[k].at) {
        if (signals.length < MAX_SIGNALS) launch(queue[k]); // over the limit: this hand-off is simply dropped
        queue.splice(k, 1);
      }
    }
    for (var i = signals.length - 1; i >= 0; i--) {
      var s = signals[i];
      s.t += dt / TRAVEL;
      var p = pos(s.from), q = pos(s.to), e = s.t < 1 ? 0.5 - 0.5 * Math.cos(Math.PI * s.t) : 1;
      s.el.setAttribute('cx', (p.x + (q.x - p.x) * e).toFixed(2));
      s.el.setAttribute('cy', (p.y + (q.y - p.y) * e).toFixed(2));
      if (s.t >= 1) {
        if (--s.tie.busy <= 0) { s.tie.busy = 0; s.tie.el.classList.remove('lit'); }
        layer.removeChild(s.el);
        signals.splice(i, 1);
        if (target === 1) reach(s.to, s.from, now);
        else if (s.to !== PHOTO) nodes[s.to].pulse = 1;
        if (!signals.length && !queue.length) nextSeed = now + PAUSE;
      }
    }

    if (settled) { running = false; last = 0; act = 0; return; } // back at rest: stop until the next hover
    requestAnimationFrame(frame);
  }

  function wake() { if (!running) { running = true; nextSeed = performance.now() + 250; requestAnimationFrame(frame); } }

  // ---------- input ----------
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    var r = area.getBoundingClientRect();
    var inside = e.clientX > r.left - 20 && e.clientX < r.right + 20 && e.clientY > r.top - 20 && e.clientY < r.bottom + 20;
    if (inside) {
      var g = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal;
      mouse = { x: vb.x + (e.clientX - g.left) / g.width * vb.width, y: vb.y + (e.clientY - g.top) / g.height * vb.height };
      if (!hover) { hover = true; wake(); }
    } else if (hover) {
      hover = false; mouse = null;
    }
  }, { passive: true });
  document.addEventListener('mouseleave', function () { hover = false; mouse = null; });

  // touch screens: a tap plays it for a few seconds
  area.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'touch') return;
    playUntil = performance.now() + 5000;
    wake();
  });
})();
