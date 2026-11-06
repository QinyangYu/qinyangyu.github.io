/*
 * "Mind and machine" — homepage intro illustration.
 * A human head in profile (left) whose brain is a web of glowing ideas, a robot head (right) with circuit
 * traces, and threads of ideas flowing between them. Ideas change colour as they travel (amber = human
 * belief, cyan = AI). Hover brightens nearby ideas; click sends a burst of ideas across.
 */
(function () {
  // draws into a .mind-banner if the page has one (e.g. the Research page), otherwise into the homepage intro
  // (a theme can set --mind-target: banner to draw only in banners, never on the homepage)
  var bannerOnly = getComputedStyle(document.documentElement).getPropertyValue('--mind-target').trim() === 'banner';
  var host = document.querySelector('.mind-banner') || (bannerOnly ? null : document.querySelector('.hero'));
  if (!host) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // palette and glow come from CSS custom properties, so the same drawing works on dark or white
  var rootStyle = getComputedStyle(document.documentElement);
  function cssVar(n, f) { var v = rootStyle.getPropertyValue(n).trim(); return v || f; }
  function hex(h) { h = h.replace('#', ''); return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; }
  var AMBER = hex(cssVar('--mind-human', '#ffb65c'));     // human belief
  var CYAN = hex(cssVar('--mind-ai', '#46d6f0'));         // AI
  var INK = hex(cssVar('--mind-ink', '#ecf4f8'));         // neutral lines
  var WHITE = hex(cssVar('--mind-highlight', '#ecf4f8')); // what lit-up things shift toward
  var GLOW = parseFloat(cssVar('--mind-glow', '1'));      // 1 = full neon glow, lower on white
  if (isNaN(GLOW)) GLOW = 1;
  var LINE = GLOW < 1 ? 1.6 : 1;                           // lines need a little more ink on white
  function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function css(c, a) { return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + Math.max(0, Math.min(1, a)) + ')'; }
  function ease(t) { return 0.5 - 0.5 * Math.cos(Math.PI * t); }

  // seeded random so the drawing looks the same on every visit
  var seed = 11;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  // ---------- shapes in a 300 x 340 local box ----------
  var HUMAN = 'M70 340 C70 300 60 280 55 255 C30 225 20 180 25 140 C30 70 90 20 165 20 C230 20 270 60 275 115 ' +
    'C278 135 276 145 282 160 C290 175 300 190 302 200 C303 207 296 210 288 211 C292 218 292 224 287 228 ' +
    'C291 233 290 240 284 244 C284 252 286 262 278 270 C268 280 245 282 225 280 C210 300 205 320 205 340 Z';
  var ROBOT = 'M94 60 L231 60 Q255 60 255 84 L255 216 Q255 240 231 240 L186 240 L186 272 Q226 290 236 340 ' +
    'L100 340 Q108 292 140 272 L140 240 L98 240 Q72 240 66 214 L60 172 L50 158 L50 104 L62 92 Q70 60 94 60 Z';
  var humanPath = new Path2D(HUMAN), robotPath = new Path2D(ROBOT);
  var probe = document.createElement('canvas').getContext('2d');

  // brain: ideas scattered inside the upper skull, each linked to its nearest neighbours
  var brain = [], tries = 0;
  while (brain.length < 46 && tries++ < 6000) {
    var x = 38 + rnd() * 228, y = 34 + rnd() * 146;
    if (!probe.isPointInPath(humanPath, x, y)) continue;
    if (brain.some(function (p) { return (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y) < 17 * 17; })) continue;
    brain.push({ x: x, y: y, ph: rnd() * 6.28, r: 1.2 + rnd() * 1.6, glow: 0 });
  }
  var brainLinks = [];
  brain.forEach(function (p, i) {
    brain.map(function (q, j) { return { j: j, d: Math.hypot(p.x - q.x, p.y - q.y) }; })
      .filter(function (o) { return o.j !== i && o.d < 58; })
      .sort(function (a, b) { return a.d - b.d; }).slice(0, 3)
      .forEach(function (o) { if (i < o.j || !brainLinks.some(function (l) { return l[0] === o.j && l[1] === i; })) brainLinks.push([i, o.j]); });
  });

  // circuit: chips on a grid inside the robot head, joined by right-angled traces
  var chips = [];
  for (var gx = 118; gx <= 238; gx += 20) {
    for (var gy = 80; gy <= 224; gy += 18) {
      if (Math.hypot(gx - 205, gy - 150) < 34) continue;
      if (rnd() < 0.42) chips.push({ x: gx, y: gy, glow: 0 });
    }
  }
  var traces = [];
  chips.forEach(function (c, i) {
    var near = chips.map(function (o, j) { return { j: j, d: Math.abs(o.x - c.x) + Math.abs(o.y - c.y) }; })
      .filter(function (o) { return o.j > i && o.d <= 60; }).sort(function (a, b) { return a.d - b.d; }).slice(0, 2);
    near.forEach(function (o) {
      var d = chips[o.j];
      var pts = c.x === d.x || c.y === d.y ? [c, d] : [c, { x: d.x, y: c.y }, d];
      traces.push({ a: i, b: o.j, pts: pts });
    });
  });

  // ---------- canvas ----------
  var canvas = document.createElement('canvas');
  canvas.className = 'net-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  host.insertBefore(canvas, host.firstChild);
  var ctx = canvas.getContext('2d');
  var still = document.createElement('canvas'), sctx = still.getContext('2d');
  var W = 0, H = 0, dpr = 1, human = null, robot = null, threads = [], ideas = [], ideaLinks = [];
  var particles = [], pulses = [], mouse = { x: -1e4, y: -1e4 }, visible = true;
  var now = 0, nextIdea = 0, nextFire = 0, nextChip = 0;

  function place(h, lx, ly) { return { x: h.x0 + lx * h.s, y: h.y0 + ly * h.s }; }

  function layout() {
    var r = canvas.getBoundingClientRect(), hr = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    var scrollbar = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    var left = hr.left - r.left, right = W - scrollbar - (hr.right - r.left);
    var room = Math.min(left, right);
    // theme options (CSS custom properties):
    //   --mind-layout: strip  -> always draw the scene as a figure below the text, never behind it
    //   --mind-strip: 175px   -> height of that figure
    //   --mind-threads: 2|4   -> number of idea threads;  --mind-lattice: 0 -> no mesh between threads
    var st = getComputedStyle(document.documentElement);
    var forceStrip = st.getPropertyValue('--mind-layout').trim() === 'strip';
    var strip = parseFloat(st.getPropertyValue('--mind-strip')) || 175;
    var few = st.getPropertyValue('--mind-threads').trim() === '2';
    var lattice = st.getPropertyValue('--mind-lattice').trim() !== '0';

    var wide = !forceStrip && room >= 230;
    // otherwise draw a smaller scene as a strip along the bottom of the band
    var wasStrip = host.classList.contains('mind-strip');
    host.classList.toggle('mind-strip', !wide);
    if (wasStrip === wide) { r = canvas.getBoundingClientRect(); H = r.height; canvas.height = Math.round(H * dpr); }
    var s = wide ? Math.min((H * 0.86) / 340, (room * 0.92) / 310) : (strip * 0.9) / 340;
    var hw = 300 * s;
    human = { s: s, y0: H - 340 * s, x0: wide ? left / 2 - hw / 2 - 10 * s : Math.max(4, left - 18 * s), alpha: 1 };
    robot = { s: s, y0: H - 340 * s, x0: wide ? W - scrollbar - right / 2 - hw / 2 : Math.min(W - scrollbar - hw - 4, W - scrollbar - right - hw + 18 * s), alpha: 1 };

    // threads of ideas between the brain and the robot
    var A = place(human, 236, 92), B = place(robot, 96, 112), dx = B.x - A.x;
    var lifts = wide ? [-0.05, 0.13, 0.9, 1.12].map(function (c) { return H * c; })
                     : (few ? [-0.08, 1.12] : [-0.15, 0.2, 0.95, 1.2]).map(function (c) { return H - strip + strip * c; });
    threads = lifts.map(function (cy, k) {
      var j = (k % 2 ? 1 : -1) * 0.06;
      return [A, { x: A.x + dx * (0.28 + j), y: cy }, { x: A.x + dx * (0.72 - j), y: cy }, B];
    });
    ideas = []; ideaLinks = [];
    threads.forEach(function (th, k) {
      (few ? [0.3, 0.5, 0.7] : [0.18, 0.34, 0.5, 0.66, 0.82]).forEach(function (t, m, list) {
        var p = bez(th, t);
        ideas.push({ th: k, m: few ? m + 1 : m, x: p.x, y: p.y, ph: rnd() * 6.28, glow: 0, r: 1.6 + rnd() * 1.4 });
      });
    });
    if (lattice) {
      ideas.forEach(function (a, i) {
        ideas.forEach(function (b, j) {
          if (j > i && b.th === a.th + 1 && Math.abs(b.m - a.m) <= 1) ideaLinks.push([i, j]);
        });
      });
    }
    drawStill();
  }

  function bez(c, t) {
    var u = 1 - t;
    return {
      x: u * u * u * c[0].x + 3 * u * u * t * c[1].x + 3 * u * t * t * c[2].x + t * t * t * c[3].x,
      y: u * u * u * c[0].y + 3 * u * u * t * c[1].y + 3 * u * t * t * c[2].y + t * t * t * c[3].y
    };
  }

  // ---------- the parts that do not move: outlines and robot details ----------
  function drawStill() {
    still.width = canvas.width; still.height = canvas.height;
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.clearRect(0, 0, still.width, still.height);
    head(human, humanPath, AMBER, function () {});
    head(robot, robotPath, CYAN, function (c) {
      c.lineWidth = 1.1 / robot.s;
      c.strokeStyle = css(CYAN, 0.55);
      c.beginPath(); c.moveTo(168, 60); c.lineTo(168, 32); c.stroke();                        // antenna
      c.beginPath(); c.arc(205, 150, 26, 0, 6.283); c.stroke();                               // ear
      c.beginPath(); c.arc(205, 150, 12, 0, 6.283); c.stroke();
      [192, 201, 210].forEach(function (y) { c.beginPath(); c.moveTo(72, y); c.lineTo(108, y); c.stroke(); }); // grille
      c.setLineDash([3, 5]); c.beginPath(); c.moveTo(150, 68); c.lineTo(150, 232); c.stroke(); c.setLineDash([]);
      c.beginPath(); c.moveTo(140, 288); c.lineTo(190, 288); c.moveTo(130, 308); c.lineTo(200, 308); c.stroke(); // neck
      [[82, 76], [238, 76], [238, 224]].forEach(function (p) { c.beginPath(); c.arc(p[0], p[1], 2.4, 0, 6.283); c.stroke(); });
      // circuit traces
      c.strokeStyle = css(CYAN, 0.22 * LINE); c.lineWidth = 1 / robot.s;
      traces.forEach(function (tr) { c.beginPath(); c.moveTo(tr.pts[0].x, tr.pts[0].y); for (var i = 1; i < tr.pts.length; i++) c.lineTo(tr.pts[i].x, tr.pts[i].y); c.stroke(); });
    });
  }

  function head(h, path, col, details) {
    sctx.save();
    sctx.globalAlpha = h.alpha;
    sctx.setTransform(dpr * h.s, 0, 0, dpr * h.s, dpr * h.x0, dpr * h.y0);
    // soft fill inside the silhouette
    var g = sctx.createRadialGradient(165, 120, 10, 165, 150, 220);
    g.addColorStop(0, css(col, 0.10)); g.addColorStop(1, css(col, 0.01));
    sctx.fillStyle = g; sctx.fill(path);
    // glowing outline
    sctx.shadowColor = css(col, 0.9); sctx.shadowBlur = 16 * dpr * GLOW;
    sctx.strokeStyle = css(col, 0.85); sctx.lineWidth = 1.5 / h.s; sctx.stroke(path);
    sctx.shadowBlur = 0;
    details(sctx);
    sctx.restore();
  }

  // ---------- animation ----------
  function spawnIdea(dir, th) {
    particles.push({ th: th == null ? (Math.random() * threads.length) | 0 : th, dir: dir, t: 0, dur: 3600 + Math.random() * 1800 });
  }
  function fireBrain(fromAnchor) {
    var i = fromAnchor ? closest(brain, 236, 92) : (Math.random() * brainLinks.length) | 0;
    var links = fromAnchor ? brainLinks.filter(function (l) { return l[0] === i || l[1] === i; }) : [brainLinks[i]];
    links.forEach(function (l) {
      var a = fromAnchor && l[1] === i ? l[1] : l[0], b = a === l[0] ? l[1] : l[0];
      pulses.push({ kind: 'brain', a: a, b: b, t: 0, dur: 650 });
    });
  }
  function fireChip(fromAnchor) {
    var list = fromAnchor ? traces.filter(function (tr) { return chips[tr.a].x < 160 || chips[tr.b].x < 160; }) : traces;
    for (var n = 0; n < (fromAnchor ? 5 : 1) && list.length; n++) {
      var tr = list[(Math.random() * list.length) | 0];
      pulses.push({ kind: 'chip', tr: tr, rev: Math.random() < 0.5, t: 0, dur: 520 });
    }
  }
  function closest(list, x, y) {
    var best = 0, bd = Infinity;
    list.forEach(function (p, i) { var d = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y); if (d < bd) { bd = d; best = i; } });
    return best;
  }

  function update(dt) {
    now += dt;
    var overHuman = human && mouse.x < human.x0 + 300 * human.s && mouse.x > human.x0;
    var overRobot = robot && mouse.x > robot.x0 && mouse.x < robot.x0 + 300 * robot.s;
    if (now > nextIdea) { spawnIdea(Math.random() < 0.55 ? 1 : -1); nextIdea = now + 700 + Math.random() * 700; }
    if (now > nextFire) { fireBrain(false); nextFire = now + (overHuman ? 70 : 190); }
    if (now > nextChip) { fireChip(false); nextChip = now + (overRobot ? 60 : 170); }

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.t += dt / p.dur;
      if (p.t >= 1) {
        if (p.dir > 0) fireChip(true); else fireBrain(true);
        particles.splice(i, 1);
      }
    }
    for (i = pulses.length - 1; i >= 0; i--) {
      var q = pulses[i];
      q.t += dt / q.dur;
      if (q.t >= 1) {
        if (q.kind === 'brain') brain[q.b].glow = 1;
        else chips[q.rev ? q.tr.a : q.tr.b].glow = 1;
        pulses.splice(i, 1);
      }
    }
    brain.forEach(function (b) { b.glow = Math.max(0, b.glow - dt / 700); });
    chips.forEach(function (c) { c.glow = Math.max(0, c.glow - dt / 600); });
    ideas.forEach(function (d) { d.glow = Math.max(0, d.glow - dt / 900); });
  }

  function particlePos(p, back) {
    var u = ease(Math.max(0, Math.min(1, p.t - (back || 0))));
    if (p.dir < 0) u = 1 - u;
    return { pt: bez(threads[p.th], u), u: u };
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var time = now / 1000, i;

    // threads
    threads.forEach(function (th) {
      var g = ctx.createLinearGradient(th[0].x, 0, th[3].x, 0);
      g.addColorStop(0, css(AMBER, 0.22 * LINE)); g.addColorStop(1, css(CYAN, 0.22 * LINE));
      ctx.strokeStyle = g; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(th[0].x, th[0].y); ctx.bezierCurveTo(th[1].x, th[1].y, th[2].x, th[2].y, th[3].x, th[3].y); ctx.stroke();
    });
    // the loose constellation of ideas between the threads
    ctx.lineWidth = 0.8;
    ideaLinks.forEach(function (l) {
      var a = ideas[l[0]], b = ideas[l[1]];
      ctx.strokeStyle = css(INK, (0.06 + 0.25 * Math.max(a.glow, b.glow)) * LINE);
      ctx.beginPath(); ctx.moveTo(a.x, a.y + Math.sin(time + a.ph) * 3); ctx.lineTo(b.x, b.y + Math.sin(time + b.ph) * 3); ctx.stroke();
    });

    // heads (outlines and fixed details)
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(still, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // brain: links, firing pulses, ideas
    if (human) {
      ctx.globalAlpha = human.alpha;
      var bp = brain.map(function (b) {
        var p = place(human, b.x + Math.sin(time * 0.7 + b.ph) * 1.8, b.y + Math.cos(time * 0.6 + b.ph) * 1.8);
        return p;
      });
      ctx.lineWidth = 0.9;
      brainLinks.forEach(function (l) {
        ctx.strokeStyle = css(AMBER, (0.18 + 0.4 * Math.max(brain[l[0]].glow, brain[l[1]].glow)) * LINE);
        ctx.beginPath(); ctx.moveTo(bp[l[0]].x, bp[l[0]].y); ctx.lineTo(bp[l[1]].x, bp[l[1]].y); ctx.stroke();
      });
      pulses.forEach(function (q) {
        if (q.kind !== 'brain') return;
        var a = bp[q.a], b = bp[q.b], x = a.x + (b.x - a.x) * q.t, y = a.y + (b.y - a.y) * q.t;
        glowDot(x, y, 1.8, AMBER, 1);
      });
      brain.forEach(function (b, k) {
        var p = bp[k], att = attention(p);
        glowDot(p.x, p.y, (b.r + b.glow * 1.6) * Math.max(0.8, human.s), mix(AMBER, WHITE, b.glow * 0.6), 0.55 + 0.45 * Math.max(b.glow, att));
      });
      ctx.globalAlpha = 1;
    }

    // robot: eye, antenna light, circuit pulses, chips
    if (robot) {
      ctx.globalAlpha = robot.alpha;
      var blink = 0.55 + 0.35 * Math.sin(time * 2.2);
      var e0 = place(robot, 56, 116), e1 = place(robot, 112, 134);
      ctx.shadowColor = css(CYAN, 1); ctx.shadowBlur = 18 * GLOW;
      ctx.fillStyle = css(CYAN, blink);
      roundRect(e0.x, e0.y, e1.x - e0.x, e1.y - e0.y, 8 * robot.s); ctx.fill();
      var ant = place(robot, 168, 26);
      ctx.fillStyle = css(CYAN, 0.35 + 0.65 * (Math.sin(time * 1.3) > 0.6 ? 1 : 0.25));
      ctx.beginPath(); ctx.arc(ant.x, ant.y, 5.5 * robot.s, 0, 6.283); ctx.fill();
      ctx.shadowBlur = 0;
      pulses.forEach(function (q) {
        if (q.kind !== 'chip') return;
        var pts = q.tr.pts.map(function (o) { return place(robot, o.x, o.y); });
        if (q.rev) pts = pts.slice().reverse();
        var p = alongPolyline(pts, q.t);
        glowDot(p.x, p.y, 1.7, CYAN, 1);
      });
      chips.forEach(function (c) {
        var p = place(robot, c.x, c.y), att = attention(p), sz = (2.2 + c.glow * 1.4) * Math.max(0.8, robot.s);
        ctx.fillStyle = css(mix(CYAN, WHITE, c.glow * 0.6), 0.45 + 0.55 * Math.max(c.glow, att));
        ctx.fillRect(p.x - sz, p.y - sz, sz * 2, sz * 2);
      });
      ctx.globalAlpha = 1;
    }

    // ideas sitting on the threads light up as particles pass
    particles.forEach(function (p) {
      var pos = particlePos(p).pt;
      ideas.forEach(function (d) {
        if (d.th === p.th && Math.abs(d.x - pos.x) < 30 && Math.abs(d.y - pos.y) < 30) d.glow = 1;
      });
    });
    ideas.forEach(function (d) {
      var y = d.y + Math.sin(time + d.ph) * 3, att = attention({ x: d.x, y: y });
      var col = mix(AMBER, CYAN, (d.m + 0.5) / 5);
      glowDot(d.x, y, d.r + d.glow * 1.5, mix(col, WHITE, d.glow * 0.5), 0.35 + 0.65 * Math.max(d.glow, att));
    });

    // travelling ideas with soft tails
    particles.forEach(function (p) {
      for (var k = 9; k >= 0; k--) {
        var s = particlePos(p, k * 0.012);
        var col = mix(AMBER, CYAN, s.u);
        if (k === 0) glowDot(s.pt.x, s.pt.y, 2.6, col, 1, 14);
        else { ctx.fillStyle = css(col, 0.5 * (1 - k / 10)); ctx.beginPath(); ctx.arc(s.pt.x, s.pt.y, 2.2 * (1 - k / 12), 0, 6.283); ctx.fill(); }
      }
    });

    // attention: faint lines from the cursor to nearby ideas
    if (mouse.x > -1e3) {
      ctx.lineWidth = 0.8;
      ideas.forEach(function (d) {
        var dd = Math.hypot(d.x - mouse.x, d.y - mouse.y);
        if (dd < 150) { ctx.strokeStyle = css(INK, (1 - dd / 150) * 0.35 * LINE); ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(d.x, d.y + Math.sin(time + d.ph) * 3); ctx.stroke(); }
      });
    }
  }

  function attention(p) {
    var d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
    return d < 140 ? (1 - d / 140) * 0.8 : 0;
  }
  function glowDot(x, y, r, col, a, blur) {
    ctx.shadowColor = css(col, a); ctx.shadowBlur = (blur || 8) * GLOW;
    ctx.fillStyle = css(col, a);
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
    ctx.shadowBlur = 0;
  }
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }
  function alongPolyline(pts, t) {
    var lens = [], total = 0;
    for (var i = 1; i < pts.length; i++) { var l = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); lens.push(l); total += l; }
    var d = t * total;
    for (i = 0; i < lens.length; i++) {
      if (d <= lens[i] || i === lens.length - 1) {
        var f = lens[i] ? Math.min(1, d / lens[i]) : 0;
        return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * f, y: pts[i].y + (pts[i + 1].y - pts[i].y) * f };
      }
      d -= lens[i];
    }
    return pts[pts.length - 1];
  }

  // ---------- input ----------
  window.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect();
    var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    mouse.x = inside ? e.clientX - r.left : -1e4; mouse.y = inside ? e.clientY - r.top : -1e4;
  }, { passive: true });
  window.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('a, button, input, video, .hero-text')) return;
    var r = canvas.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
    var dir = e.clientX - r.left < W / 2 ? 1 : -1;
    for (var k = 0; k < 6; k++) (function (k) { setTimeout(function () { spawnIdea(dir, k % threads.length); }, k * 120); })(k);
    if (dir > 0) fireBrain(true); else fireChip(true);
  });

  // ---------- run ----------
  var last = 0;
  function loop(ts) {
    var dt = last ? Math.min(50, ts - last) : 16;
    last = ts;
    if (visible && !document.hidden) { update(dt); draw(); }
    requestAnimationFrame(loop);
  }
  function relayout() { layout(); if (reduce) { for (var i = 0; i < 240; i++) update(16); draw(); } }

  canvas.summary = function () {
    return { width: Math.round(W), height: Math.round(H), headScale: human && +human.s.toFixed(2), headsInMargins: human && human.alpha === 1,
      brainIdeas: brain.length, brainLinks: brainLinks.length, chips: chips.length, traces: traces.length,
      threads: threads.length, ideasInFlight: particles.length, pulses: pulses.length, elapsed: Math.round(now) };
  };

  if ('ResizeObserver' in window) new ResizeObserver(relayout).observe(host);
  else window.addEventListener('resize', relayout);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(host);
  relayout();
  if (!reduce) requestAnimationFrame(loop);
})();
