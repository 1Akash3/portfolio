/* =============================================================================
   main.js — vanilla port of the NOVA motion controller + dynamic rendering.
   No React, no support.js. Renders projects from window.PROJECTS, wires the
   category filter + detail modal, then runs the GSAP/Lenis interactions.
============================================================================= */
(function () {
  "use strict";
  const q = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const el = (sel, root) => (root || document).querySelector(sel);

  const ACCENTS = {
    blue:    { g: "linear-gradient(160deg,#16203a,#080b14)", glow: "rgba(59,91,255,0.55)",  line: "rgba(59,91,255,0.40)",  chip: "#5B7BFF" },
    violet:  { g: "linear-gradient(160deg,#20183a,#0a0814)", glow: "rgba(176,107,255,0.60)", line: "rgba(176,107,255,0.40)", chip: "#B06BFF" },
    lime:    { g: "linear-gradient(160deg,#23280f,#0d0f06)", glow: "rgba(207,255,61,0.42)",  line: "rgba(207,255,61,0.42)",  chip: "#CFFF3D" },
    cyan:    { g: "linear-gradient(160deg,#102a2a,#06100f)", glow: "rgba(72,200,180,0.52)",  line: "rgba(72,200,180,0.42)",  chip: "#54D6C2" },
    magenta: { g: "linear-gradient(160deg,#2a1c34,#120a16)", glow: "rgba(214,120,200,0.52)", line: "rgba(214,120,200,0.42)", chip: "#E084D4" }
  };
  const acc = (name) => ACCENTS[name] || ACCENTS.violet;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const PROJECTS = window.PROJECTS || [];

  /* ---------------------------------------------------------------- render */
  function renderFeatured() {
    const track = el("[data-htrack]");
    if (!track) return;
    const outro = el("[data-htrack-outro]");
    const feat = PROJECTS.filter((p) => p.featured);
    const frag = document.createDocumentFragment();
    feat.forEach((p, i) => {
      const a = acc(p.accent);
      const cover = p.image || ("images/covers/" + p.id + ".svg");
      const panel = document.createElement("div");
      panel.className = "work-panel";
      panel.setAttribute("data-cursor", "");
      panel.setAttribute("data-project", p.id);
      panel.style.cssText =
        "flex:0 0 auto;position:relative;width:62vw;max-width:720px;height:74vh;border-radius:20px;overflow:hidden;cursor:pointer;border:1px solid " +
        a.line + ";background:linear-gradient(to top,rgba(6,6,12,.94) 14%,rgba(6,6,12,.4) 46%,rgba(6,6,12,.05) 72%),url('" + cover + "') center/cover no-repeat," + a.g + ";";
      panel.innerHTML =
        '<span style="position:absolute;top:20px;left:22px;font-family:\'Space Mono\',monospace;font-size:11px;letter-spacing:.06em;color:rgba(255,255,255,.7);">[' +
        String(i + 1).padStart(2, "0") + "] " + esc(p.category.toUpperCase()) + "</span>" +
        '<span style="position:absolute;top:20px;right:22px;font-family:\'Space Mono\',monospace;font-size:11px;color:rgba(255,255,255,.55);">' + esc(p.year) + "</span>" +
        '<div style="position:absolute;left:24px;right:24px;bottom:22px;">' +
        '<h3 style="margin:0 0 8px;font-weight:800;letter-spacing:-.03em;font-size:clamp(2rem,4.6vw,3.8rem);line-height:.95;">' + esc(p.name) + "</h3>" +
        '<p style="margin:0 0 14px;max-width:520px;font-size:14px;line-height:1.55;color:rgba(255,255,255,.82);">' + esc(p.blurb) + "</p>" +
        '<span style="display:inline-flex;align-items:center;gap:8px;font-family:\'Space Mono\',monospace;font-size:11px;letter-spacing:.1em;color:' + a.chip + ';">VIEW CASE →</span>' +
        "</div>";
      frag.appendChild(panel);
    });
    track.insertBefore(frag, outro || null);
  }

  function renderGrid() {
    const grid = el("[data-grid]");
    const tabsWrap = el("[data-filters]");
    if (!grid) return;

    const cats = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
    if (tabsWrap) {
      tabsWrap.innerHTML = cats
        .map((c, i) => '<button class="filter-tab' + (i === 0 ? " is-active" : "") + '" data-cursor data-filter="' + esc(c) + '">' + esc(c) + "</button>")
        .join("");
    }

    grid.innerHTML = PROJECTS.map((p) => {
      const a = acc(p.accent);
      const cover = p.image || ("images/covers/" + p.id + ".svg");
      const tags = (p.tags || []).slice(0, 4).map((t) => '<span class="chip">' + esc(t) + "</span>").join("");
      const hasDemo = p.links && p.links.demo;
      // .io-style display URL — clickable to the real host (demo, else code);
      // stops propagation so it opens the site instead of the case modal.
      const urlTarget = (p.links && (p.links.demo || p.links.code)) || null;
      const io = p.displayUrl
        ? (urlTarget
            ? '<a class="pcard-url" target="_blank" rel="noopener" href="' + esc(urlTarget) + '" onclick="event.stopPropagation()">' + esc(p.displayUrl) + "</a>"
            : '<span class="pcard-url">' + esc(p.displayUrl) + "</span>")
        : "";
      return (
        '<article class="pcard reveal-up" data-cursor data-tilt data-project="' + p.id + '" data-category="' + esc(p.category) + '" style="--line:' + a.line + ';--glow:' + a.glow + ';--chip:' + a.chip + ';">' +
        '<div class="pcard-cover" style="background-image:url(\'' + cover + '\');">' +
        (hasDemo ? '<span class="pcard-live">● LIVE</span>' : "") +
        '<span class="pcard-open">View case →</span>' +
        "</div>" +
        '<div class="pcard-inner">' +
        '<div class="pcard-top"><span class="pcard-cat" style="color:' + a.chip + ';border-color:' + a.line + ';">' + esc(p.category) + '</span><span class="pcard-year">' + esc(p.year) + "</span></div>" +
        '<div class="pcard-mid"><h3 class="pcard-name">' + esc(p.name) + "</h3><p class=\"pcard-blurb\">" + esc(p.blurb) + "</p></div>" +
        '<div class="pcard-tags">' + tags + "</div>" +
        (io ? '<div class="pcard-urlrow">' + io + "</div>" : "") +
        "</div></article>"
      );
    }).join("");
  }

  function filterGrid(cat) {
    q("[data-grid] .pcard").forEach((card) => {
      const show = cat === "All" || card.getAttribute("data-category") === cat;
      card.classList.toggle("is-hidden", !show);
    });
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  /* ----------------------------------------------------------------- modal */
  function buildModal() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.setAttribute("data-modal", "");
    overlay.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true">' +
      '<button class="modal-close" data-cursor aria-label="Close">✕</button>' +
      '<div class="modal-banner" data-m="banner"></div>' +
      '<div class="modal-scroll">' +
      '<span class="modal-cat" data-m="cat"></span>' +
      '<h2 class="modal-title" data-m="title"></h2>' +
      '<p class="modal-summary" data-m="summary"></p>' +
      '<div class="modal-block"><h4>Highlights</h4><ul data-m="features"></ul></div>' +
      '<div class="modal-block"><h4>Tech</h4><div class="modal-tech" data-m="tech"></div></div>' +
      '<div class="modal-actions" data-m="actions"></div>' +
      "</div></div>";
    document.body.appendChild(overlay);

    const close = () => { overlay.classList.remove("is-open"); document.body.style.overflow = ""; if (window.__lenis) window.__lenis.start(); };
    overlay.addEventListener("click", (e) => { if (e.target === overlay || e.target.closest(".modal-close")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    window.__closeModal = close;
    return overlay;
  }

  function openModal(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    const overlay = el("[data-modal]") || buildModal();
    const a = acc(p.accent);
    const cover = p.image || ("images/covers/" + p.id + ".svg");
    el('[data-m="banner"]', overlay).style.backgroundImage = "url('" + cover + "')";
    el('[data-m="cat"]', overlay).textContent = [p.category, p.year, p.role].filter(Boolean).join("  ·  ");
    el('[data-m="cat"]', overlay).style.color = a.chip;
    el('[data-m="title"]', overlay).textContent = p.name;
    el('[data-m="summary"]', overlay).textContent = p.summary || p.blurb;
    el('[data-m="features"]', overlay).innerHTML = (p.features || []).map((f) => "<li>" + esc(f) + "</li>").join("");
    el('[data-m="tech"]', overlay).innerHTML = (p.tech || []).map((t) => '<span class="chip">' + esc(t) + "</span>").join("");
    const acts = [];
    if (p.links && p.links.demo) acts.push('<a class="btn btn-solid" data-cursor data-magnetic target="_blank" rel="noopener" href="' + esc(p.links.demo) + '">' + (p.displayUrl ? esc(p.displayUrl) + " ↗" : "Live demo ↗") + "</a>");
    if (p.links && p.links.code) acts.push('<a class="btn btn-ghost" data-cursor data-magnetic target="_blank" rel="noopener" href="' + esc(p.links.code) + '">View code ↗</a>');
    if (!acts.length) acts.push('<span class="btn btn-ghost is-disabled">Link coming soon</span>');
    el('[data-m="actions"]', overlay).innerHTML = acts.join("");
    const modal = el(".modal", overlay);
    modal.style.setProperty("--line", a.line);
    modal.style.setProperty("--glow", a.glow);
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();
  }

  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-project]");
    if (card && !e.target.closest(".modal")) openModal(card.getAttribute("data-project"));
    const tab = e.target.closest("[data-filter]");
    if (tab) {
      q("[data-filter]").forEach((t) => t.classList.toggle("is-active", t === tab));
      filterGrid(tab.getAttribute("data-filter"));
    }
  });

  /* ------------------------------------------------------- reveal-on-enter */
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    q(".reveal-up, [data-reveal]").forEach((n) => io.observe(n));
  }

  /* ------------------------------------------------------- GSAP interactions */
  function initMotion() {
    const gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap) return;
    if (ST) gsap.registerPlugin(ST);
    if (window.Draggable) gsap.registerPlugin(window.Draggable);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    /* Lenis smooth scroll */
    if (!reduce && window.Lenis) {
      const lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
      window.__lenis = lenis;
      if (ST) lenis.on("scroll", ST.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      q('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
        const id = a.getAttribute("href"); if (id.length < 2) return;
        const t = el(id); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -10 }); }
      }));
    }

    /* custom cursor */
    const ring = el("[data-cursor-ring]"), dot = el("[data-cursor-dot]");
    if (!coarse && ring && dot) {
      document.documentElement.style.cursor = "none";
      const xr = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" }), yr = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });
      const xd = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" }), yd = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
      window.addEventListener("mousemove", (e) => { xr(e.clientX); yr(e.clientY); xd(e.clientX); yd(e.clientY); });
      document.addEventListener("mouseover", (e) => {
        if (e.target.closest("[data-cursor],a,button")) { ring.style.width = "60px"; ring.style.height = "60px"; ring.style.background = "rgba(176,107,255,.18)"; ring.style.borderColor = "rgba(176,107,255,.8)"; }
      });
      document.addEventListener("mouseout", (e) => {
        if (e.target.closest("[data-cursor],a,button")) { ring.style.width = "38px"; ring.style.height = "38px"; ring.style.background = "transparent"; ring.style.borderColor = "rgba(255,255,255,.55)"; }
      });
    } else if (ring && dot) { ring.style.display = "none"; dot.style.display = "none"; }

    /* magnetic buttons */
    if (!coarse) q("[data-magnetic]").forEach((elm) => {
      elm.addEventListener("mousemove", (e) => {
        const r = elm.getBoundingClientRect();
        gsap.to(elm, { x: (e.clientX - (r.left + r.width / 2)) * 0.4, y: (e.clientY - (r.top + r.height / 2)) * 0.4, duration: 0.5, ease: "power3" });
      });
      elm.addEventListener("mouseleave", () => gsap.to(elm, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" }));
    });

    /* hero entrance (CSS-driven so it can't freeze at opacity 0) */
    if (!reduce) {
      q("[data-hero]").forEach((e2, i) => { e2.style.animation = "nv-rise .85s cubic-bezier(.22,1,.36,1) both"; e2.style.animationDelay = (0.1 + i * 0.07) + "s"; });
      const hi = el("[data-hero-img]"); if (hi) hi.style.animation = "nv-zoom 1.3s cubic-bezier(.22,1,.36,1) both";
    }

    /* horizontal project scroll */
    const hsec = el("[data-hscroll]"), htrack = el("[data-htrack]");
    if (hsec && htrack && ST && !reduce) {
      const dist = () => Math.max(0, htrack.scrollWidth - window.innerWidth);
      ST.create({
        id: "nv-hscroll", trigger: hsec, start: "top top", end: () => "+=" + dist(),
        pin: true, scrub: true, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (self) => { htrack.style.transform = "translate3d(" + (-dist() * self.progress) + "px,0,0)"; }
      });
    }

    /* reveal text behind tilt cards */
    const rt = el("[data-revealtext]");
    if (rt && ST && !reduce) gsap.fromTo(rt, { x: "-12%" }, { x: "6%", ease: "none", scrollTrigger: { trigger: rt.closest("section"), start: "top bottom", end: "bottom top", scrub: 1 } });

    /* 3D tilt cards (grid) — tilt when hovered directly */
    if (!coarse) q("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, { rotateY: px * 16, rotateX: -py * 16, duration: 0.5, ease: "power2", transformPerspective: 900, transformOrigin: "center" });
      });
      card.addEventListener("mouseleave", () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1,0.5)" }));
    });

    /* Hero tilt card — driven by cursor anywhere in its section, so it visibly
       reacts even when the pointer isn't directly on the card. */
    const svc = el("#services");
    const heroCard = el("[data-tilt-hero]");
    const heroInner = heroCard && heroCard.querySelector("[data-tilt-inner]");
    if (svc && heroCard && !coarse) {
      svc.addEventListener("mousemove", (e) => {
        const px = (e.clientX / window.innerWidth - 0.5) * 2;   // -1 … 1
        const py = (e.clientY - svc.getBoundingClientRect().top - svc.offsetHeight / 2) / (svc.offsetHeight / 2);
        gsap.to(heroCard, { rotateY: px * 22, rotateX: -py * 18, duration: 0.6, ease: "power2", transformPerspective: 1000, transformOrigin: "center", scale: 1.03 });
        if (heroInner) gsap.to(heroInner, { x: px * 26, y: py * 20, duration: 0.6, ease: "power2" });
      });
      svc.addEventListener("mouseleave", () => {
        gsap.to(heroCard, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.9, ease: "elastic.out(1,0.5)" });
        if (heroInner) gsap.to(heroInner, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.5)" });
      });
    }

    /* draggable scatter */
    if (window.Draggable) q("[data-drag]").forEach((elm) => {
      window.Draggable.create(elm, { type: "x,y", bounds: el("[data-scatter]"), edgeResistance: 0.65,
        onPress() { gsap.to(elm, { scale: 1.06, duration: 0.2 }); this.target.style.zIndex = 50; },
        onRelease() { gsap.to(elm, { scale: 1, duration: 0.4 }); } });
    });

    /* pinned horizontal text reveal */
    const tp = el("[data-textpin]"), tm = el("[data-textmove]");
    if (tp && tm && ST && !reduce) {
      const td = () => (tm.scrollWidth - window.innerWidth + window.innerWidth * 0.2);
      ST.create({ id: "nv-textpin", trigger: tp, start: "top top", end: "+=1400", pin: true, scrub: true, invalidateOnRefresh: true,
        onUpdate: (self) => { tm.style.transform = "translate3d(" + (-td() * self.progress) + "px,0,0)"; } });
    }

    /* particle constellation */
    initParticles(el("[data-particles]"), reduce);
    if (ST) ST.refresh();
  }

  function initParticles(canvas, reduce) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, pts = [], raf, mouse = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect(); w = r.width; h = r.height;
      canvas.width = w * DPR; canvas.height = h * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(120, Math.floor(w * h / 13000));
      pts = new Array(count).fill(0).map(() => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32, r: Math.random() * 1.6 + 0.5 }));
    };
    window.addEventListener("mousemove", (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    canvas.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });
    window.addEventListener("resize", resize); resize();
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, md = Math.hypot(dx, dy);
        if (md < 140) { p.x += (dx / md) * 0.6; p.y += (dy / md) * 0.6; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(200,180,255,0.85)"; ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 116) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = "rgba(122,77,255," + (0.16 * (1 - d / 116)) + ")"; ctx.lineWidth = 1; ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    };
    draw(); if (reduce) cancelAnimationFrame(raf);
  }

  /* -------------------------------------------------------------- boot */
  function initPhone() {
    const c = window.CONTACT || {};
    const phone = (c.phone || "").trim();
    const wa = (c.whatsapp || "").replace(/[^\d]/g, "");
    const pbtn = el("[data-phone]");
    if (pbtn && phone) { pbtn.href = "tel:" + phone.replace(/[^+\d]/g, ""); pbtn.style.display = "inline-block"; }
    const wbtn = el("[data-whatsapp]");
    if (wbtn && wa) { wbtn.href = "https://wa.me/" + wa; wbtn.style.display = "inline-block"; }
  }

  function boot() {
    renderFeatured();
    renderGrid();
    buildModal();
    initReveal();
    initPhone();
    let n = 0;
    (function wait() {
      if (window.gsap && window.ScrollTrigger) return initMotion();
      if (n++ > 120) return initMotion(); // degrade gracefully without libs
      setTimeout(wait, 50);
    })();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
