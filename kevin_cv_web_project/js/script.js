// js/script.js

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initSmoothAnchorScroll();
  initRevealOnScroll();
  initCursorFX();
  initMagneticFX();
  initParallaxFX();
  initTimelineInteraction();
  initStatsHoverGlow();
  initHeroFloat();

  // ── NUEVAS FUNCIONALIDADES ──
  initTextSplitAnimation();
  initCounterAnimation();
  initTiltCards();
  initRippleEffect();
  initScrollProgressBar();
  initTypewriter();
  initGlitchEffect();
  initNoiseBackground();
  initMouseTrailDots();
  initSectionHighlight();
  initHeroParticlesBurst();
  initImageHoverDistortion();
  initScrollVelocityTilt();
  initStaggeredWordReveal();
  initPulseOnHover();
  initNavActiveHighlight();
  initTooltipFX();
  initCursorTextFollow();
  initGradientShiftOnMove();
  initScrollSnapIndicator();
});

/* =========================
   HEADER REACTIVO
========================= */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const updateHeader = () => {
    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

/* =========================
   MENÚ MÓVIL
========================= */
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("is-active");
    mainNav.classList.toggle("is-open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("is-active");
      mainNav.classList.remove("is-open");
    });
  });
}

/* =========================
   SCROLL SUAVE
========================= */
function initSmoothAnchorScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

/* =========================
   REVEAL ON SCROLL
========================= */
function initRevealOnScroll() {
  const elements = document.querySelectorAll(".reveal, .reveal-card, .timeline-item, .impact-card, .cert-card");

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.transitionDelay = `${Math.min(index * 40, 220)}ms`;
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease, box-shadow 0.35s ease, border-color 0.35s ease";
    observer.observe(el);
  });

  const style = document.createElement("style");
  style.textContent = `
    .in-view {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/* =========================
   CURSOR TECNOLÓGICO + ESTELA
========================= */
function initCursorFX() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const cursor = document.createElement("div");
  const cursorRing = document.createElement("div");
  const cursorTrail = document.createElement("canvas");

  cursor.className = "fx-cursor-dot";
  cursorRing.className = "fx-cursor-ring";
  cursorTrail.className = "fx-cursor-trail";

  document.body.appendChild(cursorTrail);
  document.body.appendChild(cursorRing);
  document.body.appendChild(cursor);

  const ctx = cursorTrail.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;

  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    cursorTrail.width = width * DPR;
    cursorTrail.height = height * DPR;
    cursorTrail.style.width = `${width}px`;
    cursorTrail.style.height = `${height}px`;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let mouse = { x: width / 2, y: height / 2 };
  let dot = { x: width / 2, y: height / 2 };
  let ring = { x: width / 2, y: height / 2 };

  const particles = [];

  function spawnParticle(x, y) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 1.6,
      vy: (Math.random() - 0.5) * 1.6,
      life: 1,
      radius: Math.random() * 2.4 + 0.8
    });

    if (particles.length > 80) particles.shift();
  }

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    spawnParticle(mouse.x, mouse.y);
  });

  window.addEventListener("mousedown", () => {
    cursor.classList.add("is-down");
    cursorRing.classList.add("is-down");
  });

  window.addEventListener("mouseup", () => {
    cursor.classList.remove("is-down");
    cursorRing.classList.remove("is-down");
  });

  const hoverTargets = document.querySelectorAll("a, button, .stat-card, .value-card, .impact-card, .timeline-item, .cert-card");

  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("is-hover");
      cursorRing.classList.add("is-hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-hover");
      cursorRing.classList.remove("is-hover");
    });
  });

  function animateCursor() {
    dot.x += (mouse.x - dot.x) * 0.35;
    dot.y += (mouse.y - dot.y) * 0.35;

    ring.x += (mouse.x - ring.x) * 0.14;
    ring.y += (mouse.y - ring.y) * 0.14;

    cursor.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
    cursorRing.style.transform = `translate(${ring.x}px, ${ring.y}px)`;

    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(25, 199, 230, ${p.life * 0.28})`;
      ctx.fill();
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  const style = document.createElement("style");
  style.textContent = `
    body {
      cursor: none;
    }

    .fx-cursor-trail {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9997;
    }

    .fx-cursor-dot,
    .fx-cursor-ring {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      border-radius: 999px;
      transform: translate(-50%, -50%);
      z-index: 9999;
      mix-blend-mode: screen;
    }

    .fx-cursor-dot {
      width: 10px;
      height: 10px;
      background: radial-gradient(circle, rgba(255,255,255,0.95), rgba(25,199,230,0.85));
      box-shadow: 0 0 18px rgba(25,199,230,0.55);
      transition: transform 0.16s ease, opacity 0.2s ease;
    }

    .fx-cursor-ring {
      width: 38px;
      height: 38px;
      border: 1px solid rgba(25,199,230,0.45);
      background: radial-gradient(circle, rgba(25,199,230,0.08), transparent 70%);
      box-shadow: 0 0 26px rgba(25,199,230,0.16);
      transition: width 0.22s ease, height 0.22s ease, border-color 0.22s ease, transform 0.18s ease;
    }

    .fx-cursor-dot.is-hover {
      transform: translate(-50%, -50%) scale(1.4);
    }

    .fx-cursor-ring.is-hover {
      width: 58px;
      height: 58px;
      border-color: rgba(77,168,255,0.65);
    }

    .fx-cursor-dot.is-down {
      transform: translate(-50%, -50%) scale(0.8);
    }

    .fx-cursor-ring.is-down {
      width: 30px;
      height: 30px;
    }

    @media (pointer: coarse) {
      body {
        cursor: auto;
      }
      .fx-cursor-dot,
      .fx-cursor-ring,
      .fx-cursor-trail {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

/* =========================
   EFECTO MAGNÉTICO
========================= */
function initMagneticFX() {
  const targets = document.querySelectorAll(".btn, .stat-card, .value-card, .impact-card, .cert-card, .timeline-content");

  targets.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) * 0.04;
      const moveY = (y - centerY) * 0.04;

      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0, 0)";
    });
  });
}

/* =========================
   PARALLAX FONDO / HERO
========================= */
function initParallaxFX() {
  const glowTop = document.querySelector(".page-glow-top");
  const glowBottom = document.querySelector(".page-glow-bottom");
  const heroImage = document.querySelector(".hero-photo-card");
  const heroTitle = document.querySelector(".hero-title");

  if (!glowTop && !glowBottom && !heroImage && !heroTitle) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateParallax() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    const xRatio = (currentX / window.innerWidth - 0.5);
    const yRatio = (currentY / window.innerHeight - 0.5);

    if (glowTop) {
      glowTop.style.transform = `translate(${xRatio * -30}px, ${yRatio * -18}px)`;
    }

    if (glowBottom) {
      glowBottom.style.transform = `translate(${xRatio * 22}px, ${yRatio * 14}px)`;
    }

    if (heroImage) {
      heroImage.style.transform = `translate(${xRatio * 10}px, ${yRatio * 8}px)`;
    }

    if (heroTitle) {
      heroTitle.style.transform = `translate(${xRatio * -6}px, ${yRatio * -4}px)`;
    }

    requestAnimationFrame(animateParallax);
  }

  animateParallax();
}

/* =========================
   TIMELINE INTERACTIVA
========================= */
function initTimelineInteraction() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  if (!timelineItems.length) return;

  timelineItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      timelineItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });

    item.addEventListener("click", () => {
      timelineItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timelineItems.forEach((i) => i.classList.remove("active"));
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.45
    }
  );

  timelineItems.forEach((item) => observer.observe(item));
}

/* =========================
   GLOW EN STATS
========================= */
function initStatsHoverGlow() {
  const cards = document.querySelectorAll(".stat-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(25,199,230,0.18), rgba(8,20,43,0.72) 48%),
        rgba(8,20,43,0.65)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.background = "rgba(8, 20, 43, 0.65)";
    });
  });
}

/* =========================
   FLOTACIÓN HERO
========================= */
function initHeroFloat() {
  const floaters = document.querySelectorAll(".floating-card");
  if (!floaters.length) return;

  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / 1000;

    floaters.forEach((el, index) => {
      const y = Math.sin(progress * 1.3 + index) * 6;
      const currentTransform = el.style.transform || "";
      const cleaned = currentTransform.replace(/translateY\([^)]*\)/g, "").trim();
      el.style.transform = `${cleaned} translateY(${y}px)`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/* ============================================================
   ██████╗  ██╗   ██╗███████╗██╗   ██╗ █████╗ ███████╗
   ██╔══██╗ ██║   ██║██╔════╝██║   ██║██╔══██╗██╔════╝
   ██████╔╝ ██║   ██║█████╗  ██║   ██║███████║███████╗
   ██╔══██╗ ██║   ██║██╔══╝  ╚██╗ ██╔╝██╔══██║╚════██║
   ██████╔╝ ╚██████╔╝███████╗ ╚████╔╝ ██║  ██║███████║
   ╚═════╝   ╚═════╝ ╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝
   NUEVAS FUNCIONALIDADES — NO REEMPLAZAN NADA
============================================================ */

/* =========================
   1. SPLIT TEXT + ANIMACIÓN LETRA POR LETRA
   Clases: .split-animate, .split-word
========================= */
function initTextSplitAnimation() {
  const targets = document.querySelectorAll(".split-animate, h1, h2, .hero-title, .section-title");
  if (!targets.length) return;

  targets.forEach((el) => {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = "1";

    const text = el.innerText;
    const words = text.split(" ");

    el.innerHTML = words.map((word, wi) =>
      `<span class="split-word" style="display:inline-block; overflow:hidden; vertical-align:bottom;">
        <span class="split-word-inner" style="display:inline-block; transform:translateY(110%); transition: transform 0.65s cubic-bezier(0.22,1,0.36,1) ${wi * 60}ms, opacity 0.55s ease ${wi * 60}ms; opacity:0;">${word}</span>
      </span>${wi < words.length - 1 ? "&nbsp;" : ""}`
    ).join("");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll(".split-word-inner").forEach((span) => {
        span.style.transform = "translateY(0)";
        span.style.opacity = "1";
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  targets.forEach((el) => observer.observe(el));
}

/* =========================
   2. CONTADOR ANIMADO
   Agrega data-count="95" a cualquier elemento numérico
========================= */
function initCounterAnimation() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const duration = parseInt(el.dataset.duration || "1600");
      let start = null;

      function step(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = target * eased;

        el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;

        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => observer.observe(el));
}

/* =========================
   3. TILT 3D EN CARDS
   Agrega clase .tilt-card a cualquier tarjeta
========================= */
function initTiltCards() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const cards = document.querySelectorAll(".tilt-card, .stat-card, .cert-card, .impact-card, .value-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    let animFrame;

    card.addEventListener("mousemove", (e) => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotX = (y - 0.5) * -14;
        const rotY = (x - 0.5) * 14;
        const glowX = x * 100;
        const glowY = y * 100;

        card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = "transform 0.1s ease";
        card.style.setProperty("--glow-x", `${glowX}%`);
        card.style.setProperty("--glow-y", `${glowY}%`);
        card.classList.add("tilt-active");
      });
    });

    card.addEventListener("mouseleave", () => {
      cancelAnimationFrame(animFrame);
      card.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)";
      card.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
      card.classList.remove("tilt-active");
    });
  });

  const style = document.createElement("style");
  style.textContent = `
    .tilt-card, .stat-card, .cert-card, .impact-card, .value-card {
      will-change: transform;
    }
    .tilt-active::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(25,199,230,0.12), transparent 60%);
      pointer-events: none;
      z-index: 1;
    }
  `;
  document.head.appendChild(style);
}

/* =========================
   4. EFECTO RIPPLE EN BOTONES Y TARJETAS
========================= */
function initRippleEffect() {
  const targets = document.querySelectorAll(".btn, button, .impact-card, .cert-card");
  if (!targets.length) return;

  const style = document.createElement("style");
  style.textContent = `
    .ripple-host { position: relative; overflow: hidden; }
    .ripple-wave {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-expand 0.65s linear;
      background: rgba(25, 199, 230, 0.22);
      pointer-events: none;
    }
    @keyframes ripple-expand {
      to { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  targets.forEach((el) => {
    el.classList.add("ripple-host");

    el.addEventListener("click", (e) => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.4;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement("span");
      ripple.className = "ripple-wave";
      ripple.style.cssText = `width:${size}px; height:${size}px; left:${x}px; top:${y}px;`;
      el.appendChild(ripple);

      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}

/* =========================
   5. BARRA DE PROGRESO DE SCROLL
========================= */
function initScrollProgressBar() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress-bar";
  document.body.appendChild(bar);

  const style = document.createElement("style");
  style.textContent = `
    .scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #19c7e6, #4da8ff, #19c7e6);
      background-size: 200% 100%;
      animation: scroll-bar-shimmer 2s linear infinite;
      z-index: 99999;
      transition: width 0.1s linear;
      box-shadow: 0 0 12px rgba(25,199,230,0.7);
    }
    @keyframes scroll-bar-shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
  document.head.appendChild(style);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = Math.min((scrollTop / docHeight) * 100, 100);
    bar.style.width = `${percent}%`;
  }, { passive: true });
}

/* =========================
   6. EFECTO TYPEWRITER
   Agrega data-typewriter="true" y data-words='["palabra1","palabra2"]'
========================= */
function initTypewriter() {
  const els = document.querySelectorAll("[data-typewriter]");
  if (!els.length) return;

  els.forEach((el) => {
    let words;
    try { words = JSON.parse(el.dataset.words || "[]"); } catch { return; }
    if (!words.length) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const speed = parseInt(el.dataset.typeSpeed || "90");
    const pause = parseInt(el.dataset.typePause || "1600");

    const cursor = document.createElement("span");
    cursor.textContent = "|";
    cursor.style.cssText = "animation: tw-blink 0.8s step-end infinite; color: #19c7e6; font-weight:300;";
    el.after(cursor);

    const blinkStyle = document.createElement("style");
    blinkStyle.textContent = `@keyframes tw-blink { 0%,100% { opacity:1 } 50% { opacity:0 } }`;
    document.head.appendChild(blinkStyle);

    function type() {
      const word = words[wordIndex];
      if (deleting) {
        el.textContent = word.substring(0, charIndex--);
        if (charIndex < 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 300);
          return;
        }
      } else {
        el.textContent = word.substring(0, charIndex++);
        if (charIndex > word.length) {
          deleting = true;
          setTimeout(type, pause);
          return;
        }
      }
      setTimeout(type, deleting ? speed / 2 : speed);
    }

    type();
  });
}

/* =========================
   7. GLITCH EFFECT EN HOVER
   Agrega clase .glitch-hover a cualquier título o elemento
========================= */
function initGlitchEffect() {
  const glitchStyle = document.createElement("style");
  glitchStyle.textContent = `
    .glitch-hover { position: relative; }
    .glitch-hover:hover {
      animation: glitch-main 0.4s steps(2, end) infinite;
    }
    .glitch-hover::before,
    .glitch-hover::after {
      content: attr(data-text);
      position: absolute;
      inset: 0;
      opacity: 0;
    }
    .glitch-hover:hover::before {
      animation: glitch-before 0.4s steps(2, end) infinite;
      color: #ff00c8;
      opacity: 0.7;
      clip-path: polygon(0 20%, 100% 20%, 100% 45%, 0 45%);
      left: -2px;
    }
    .glitch-hover:hover::after {
      animation: glitch-after 0.4s steps(2, end) infinite;
      color: #19c7e6;
      opacity: 0.7;
      clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
      left: 2px;
    }
    @keyframes glitch-main {
      0%, 100% { transform: translate(0); }
      33% { transform: translate(-1px, 1px); }
      66% { transform: translate(1px, -1px); }
    }
    @keyframes glitch-before {
      0%, 100% { transform: translate(0); }
      50% { transform: translate(-3px, 0); }
    }
    @keyframes glitch-after {
      0%, 100% { transform: translate(0); }
      50% { transform: translate(3px, 0); }
    }
  `;
  document.head.appendChild(glitchStyle);

  document.querySelectorAll(".glitch-hover").forEach((el) => {
    if (!el.dataset.text) el.dataset.text = el.textContent;
  });
}

/* =========================
   8. TEXTURA NOISE ANIMADA EN FONDO
========================= */
function initNoiseBackground() {
  const canvas = document.createElement("canvas");
  canvas.className = "noise-bg";
  canvas.width = 256;
  canvas.height = 256;
  document.body.prepend(canvas);

  const style = document.createElement("style");
  style.textContent = `
    .noise-bg {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.028;
      mix-blend-mode: overlay;
      animation: noise-drift 0.18s steps(1) infinite;
    }
    @keyframes noise-drift {
      0%   { transform: translate(0, 0); }
      25%  { transform: translate(-4%, -2%); }
      50%  { transform: translate(2%, 4%); }
      75%  { transform: translate(-2%, 2%); }
      100% { transform: translate(4%, -4%); }
    }
  `;
  document.head.appendChild(style);

  const ctx = canvas.getContext("2d");

  function generateNoise() {
    const imageData = ctx.createImageData(256, 256);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255 | 0;
      data[i] = data[i + 1] = data[i + 2] = v;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(generateNoise);
  }

  generateNoise();
}

/* =========================
   9. TRAIL DE PUNTOS EXTRA (SECUNDARIO AL CURSOR)
   Puntos que persisten y se desvanecen con delay escalonado
========================= */
function initMouseTrailDots() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const TRAIL_LENGTH = 18;
  const dots = [];

  const style = document.createElement("style");
  style.textContent = `
    .trail-dot {
      position: fixed;
      top: 0; left: 0;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: rgba(77,168,255,0.55);
      pointer-events: none;
      z-index: 9996;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.25s ease, opacity 0.4s ease;
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < TRAIL_LENGTH; i++) {
    const dot = document.createElement("div");
    dot.className = "trail-dot";
    document.body.appendChild(dot);
    dots.push({ el: dot, x: -100, y: -100 });
  }

  const history = [];

  window.addEventListener("mousemove", (e) => {
    history.push({ x: e.clientX, y: e.clientY });
    if (history.length > TRAIL_LENGTH) history.shift();

    dots.forEach((dot, i) => {
      const pos = history[history.length - 1 - i] || history[0];
      if (!pos) return;
      const scale = 1 - (i / TRAIL_LENGTH);
      const alpha = scale * 0.6;
      dot.el.style.left = `${pos.x}px`;
      dot.el.style.top = `${pos.y}px`;
      dot.el.style.transform = `translate(-50%, -50%) scale(${scale * 0.85})`;
      dot.el.style.opacity = alpha;
    });
  });
}

/* =========================
   10. HIGHLIGHT DE SECCIÓN ACTIVA EN SCROLL
========================= */
function initSectionHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".site-nav a[href^='#'], nav a[href^='#']");
  if (!sections.length || !navLinks.length) return;

  const style = document.createElement("style");
  style.textContent = `
    .nav-link-active {
      color: #19c7e6 !important;
      text-shadow: 0 0 12px rgba(25,199,230,0.55);
      position: relative;
    }
    .nav-link-active::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0; right: 0;
      height: 2px;
      background: #19c7e6;
      border-radius: 2px;
      animation: nav-underline-in 0.3s ease forwards;
    }
    @keyframes nav-underline-in {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("nav-link-active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((sec) => observer.observe(sec));
}

/* =========================
   11. EXPLOSIÓN DE PARTÍCULAS EN HERO AL CARGAR
========================= */
function initHeroParticlesBurst() {
  const hero = document.querySelector(".hero, .hero-section, #hero, [data-hero]");
  if (!hero) return;

  const canvas = document.createElement("canvas");
  canvas.className = "hero-burst-canvas";
  canvas.style.cssText = "position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2;";
  hero.style.position = hero.style.position || "relative";
  hero.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;

  const particles = [];
  const colors = ["#19c7e6", "#4da8ff", "#ffffff", "#a78bfa"];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.8) * 6,
      radius: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      decay: 0.012 + Math.random() * 0.01
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;

    particles.forEach((p) => {
      if (p.life <= 0) return;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.life -= p.decay;
      alive++;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, "0");
      ctx.fill();
    });

    if (alive > 0) requestAnimationFrame(draw);
    else canvas.remove();
  }

  setTimeout(() => requestAnimationFrame(draw), 400);
}

/* =========================
   12. DISTORSIÓN HOVER EN IMÁGENES
========================= */
function initImageHoverDistortion() {
  const images = document.querySelectorAll(".hero-photo-card img, .profile-img, [data-distort]");
  if (!images.length) return;

  const style = document.createElement("style");
  style.textContent = `
    .distort-wrap {
      position: relative;
      display: inline-block;
      overflow: hidden;
    }
    .distort-wrap img {
      transition: transform 0.6s cubic-bezier(0.23,1,0.32,1), filter 0.4s ease;
      display: block;
    }
    .distort-wrap:hover img {
      transform: scale(1.06);
      filter: saturate(1.3) brightness(1.08) contrast(1.05);
    }
    .distort-wrap::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(25,199,230,0.15) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    .distort-wrap:hover::after {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  images.forEach((img) => {
    if (img.parentElement.classList.contains("distort-wrap")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "distort-wrap";
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
  });
}

/* =========================
   13. TILT BASADO EN VELOCIDAD DE SCROLL
========================= */
function initScrollVelocityTilt() {
  const elements = document.querySelectorAll(".reveal-card, .timeline-content, .cert-card");
  if (!elements.length) return;

  let lastScroll = window.scrollY;
  let velocity = 0;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    velocity = current - lastScroll;
    lastScroll = current;

    const tilt = Math.max(-8, Math.min(8, velocity * 0.4));

    elements.forEach((el) => {
      if (el.classList.contains("in-view")) {
        el.style.transform = `perspective(800px) rotateX(${tilt}deg) translateY(0)`;
      }
    });

    clearTimeout(window._scrollTiltTimer);
    window._scrollTiltTimer = setTimeout(() => {
      elements.forEach((el) => {
        if (el.classList.contains("in-view")) {
          el.style.transform = "perspective(800px) rotateX(0deg) translateY(0)";
        }
      });
    }, 120);
  }, { passive: true });
}

/* =========================
   14. REVEAL WORD POR WORD CON STAGGER
   Agrega clase .stagger-words a cualquier párrafo
========================= */
function initStaggeredWordReveal() {
  const targets = document.querySelectorAll(".stagger-words, .hero-subtitle, .section-desc");
  if (!targets.length) return;

  const style = document.createElement("style");
  style.textContent = `
    .stagger-word-unit {
      display: inline-block;
      opacity: 0;
      transform: translateY(14px) rotate(-1.5deg);
      transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1);
    }
    .stagger-word-unit.visible {
      opacity: 1;
      transform: translateY(0) rotate(0);
    }
  `;
  document.head.appendChild(style);

  targets.forEach((el) => {
    if (el.dataset.staggerDone) return;
    el.dataset.staggerDone = "1";

    const words = el.innerText.split(" ");
    el.innerHTML = words.map((w, i) =>
      `<span class="stagger-word-unit" style="transition-delay:${i * 45}ms">${w}</span>`
    ).join(" ");

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(".stagger-word-unit").forEach((span) => {
          span.classList.add("visible");
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    obs.observe(el);
  });
}

/* =========================
   15. PULSO SUTIL EN HOVER (PING)
========================= */
function initPulseOnHover() {
  const pingStyle = document.createElement("style");
  pingStyle.textContent = `
    .ping-on-hover {
      position: relative;
    }
    .ping-on-hover::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: inherit;
      border: 1.5px solid rgba(25,199,230,0.5);
      opacity: 0;
      transform: scale(0.92);
      transition: opacity 0.25s ease, transform 0.25s ease;
      pointer-events: none;
    }
    .ping-on-hover:hover::before {
      opacity: 1;
      transform: scale(1.04);
      animation: ping-pulse 1.4s ease infinite;
    }
    @keyframes ping-pulse {
      0%, 100% { transform: scale(1.04); opacity: 0.7; }
      50% { transform: scale(1.1); opacity: 0.25; }
    }
  `;
  document.head.appendChild(pingStyle);

  document.querySelectorAll(".btn, .stat-card, .cert-card, .value-card").forEach((el) => {
    el.classList.add("ping-on-hover");
  });
}

/* =========================
   16. RESALTADO ACTIVO DE NAV MIENTRAS ESCROLLEA
========================= */
function initNavActiveHighlight() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const style = document.createElement("style");
  style.textContent = `
    .site-header.scrolled-far {
      background: rgba(5,12,30,0.97) !important;
      backdrop-filter: blur(24px);
      box-shadow: 0 1px 40px rgba(25,199,230,0.12);
    }
  `;
  document.head.appendChild(style);

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled-far", window.scrollY > 120);
  }, { passive: true });
}

/* =========================
   17. TOOLTIP ELEGANTE
   Agrega data-tip="texto" a cualquier elemento
========================= */
function initTooltipFX() {
  const style = document.createElement("style");
  style.textContent = `
    .fx-tooltip-bubble {
      position: fixed;
      background: rgba(8,20,43,0.92);
      color: #e0f7ff;
      font-size: 0.78rem;
      letter-spacing: 0.04em;
      padding: 6px 13px;
      border-radius: 8px;
      border: 1px solid rgba(25,199,230,0.3);
      box-shadow: 0 4px 24px rgba(25,199,230,0.18);
      pointer-events: none;
      z-index: 99998;
      white-space: nowrap;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .fx-tooltip-bubble.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const bubble = document.createElement("div");
  bubble.className = "fx-tooltip-bubble";
  document.body.appendChild(bubble);

  document.querySelectorAll("[data-tip]").forEach((el) => {
    el.addEventListener("mouseenter", (e) => {
      bubble.textContent = el.dataset.tip;
      bubble.classList.add("visible");
    });

    el.addEventListener("mousemove", (e) => {
      bubble.style.left = `${e.clientX + 14}px`;
      bubble.style.top = `${e.clientY - 32}px`;
    });

    el.addEventListener("mouseleave", () => {
      bubble.classList.remove("visible");
    });
  });
}

/* =========================
   18. TEXTO QUE SIGUE AL CURSOR (LABEL FLOTANTE)
   Agrega data-cursor-label="texto" al elemento deseado
========================= */
function initCursorTextFollow() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const label = document.createElement("div");
  label.className = "cursor-text-label";
  document.body.appendChild(label);

  const style = document.createElement("style");
  style.textContent = `
    .cursor-text-label {
      position: fixed;
      top: 0; left: 0;
      pointer-events: none;
      z-index: 99998;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #19c7e6;
      background: rgba(8,20,43,0.75);
      border: 1px solid rgba(25,199,230,0.3);
      padding: 4px 10px;
      border-radius: 6px;
      opacity: 0;
      transform: translate(-50%, -200%) scale(0.8);
      transition: opacity 0.22s ease, transform 0.22s ease;
    }
    .cursor-text-label.show {
      opacity: 1;
      transform: translate(-50%, -180%) scale(1);
    }
  `;
  document.head.appendChild(style);

  let mx = 0, my = 0;
  let lx = 0, ly = 0;

  window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

  (function animLabel() {
    lx += (mx - lx) * 0.18;
    ly += (my - ly) * 0.18;
    label.style.left = `${lx}px`;
    label.style.top = `${ly}px`;
    requestAnimationFrame(animLabel);
  })();

  document.querySelectorAll("[data-cursor-label]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      label.textContent = el.dataset.cursorLabel;
      label.classList.add("show");
    });
    el.addEventListener("mouseleave", () => label.classList.remove("show"));
  });
}

/* =========================
   19. GRADIENTE DE FONDO QUE CAMBIA CON EL RATÓN
========================= */
function initGradientShiftOnMove() {
  const bg = document.querySelector("body, .page-bg, main");
  if (!bg) return;

  let mx = 0.5, my = 0.5;
  let cx = 0.5, cy = 0.5;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX / window.innerWidth;
    my = e.clientY / window.innerHeight;
  });

  const GLOW = document.createElement("div");
  GLOW.className = "ambient-glow";
  GLOW.style.cssText = `
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    transition: background 0.12s ease;
    background: radial-gradient(ellipse 70vw 60vh at 50% 40%, rgba(25,199,230,0.04), transparent 70%);
  `;
  document.body.prepend(GLOW);

  (function animGlow() {
    cx += (mx - cx) * 0.04;
    cy += (my - cy) * 0.04;
    const px = (cx * 100).toFixed(1);
    const py = (cy * 100).toFixed(1);
    GLOW.style.background = `radial-gradient(ellipse 70vw 60vh at ${px}% ${py}%, rgba(25,199,230,0.055), transparent 70%)`;
    requestAnimationFrame(animGlow);
  })();
}

/* =========================
   20. INDICADOR DE SECCIÓN SCROLL (DOTS LATERALES)
========================= */
function initScrollSnapIndicator() {
  const sections = document.querySelectorAll("section[id]");
  if (sections.length < 2) return;

  const nav = document.createElement("nav");
  nav.className = "scroll-snap-nav";
  document.body.appendChild(nav);

  const style = document.createElement("style");
  style.textContent = `
    .scroll-snap-nav {
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 9990;
    }
    .scroll-snap-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: rgba(25,199,230,0.28);
      border: 1.5px solid rgba(25,199,230,0.45);
      cursor: pointer;
      transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    }
    .scroll-snap-dot.active {
      background: #19c7e6;
      transform: scale(1.5);
      box-shadow: 0 0 10px rgba(25,199,230,0.6);
    }
    .scroll-snap-dot:hover {
      background: rgba(25,199,230,0.6);
    }
    @media (max-width: 768px) { .scroll-snap-nav { display: none; } }
  `;
  document.head.appendChild(style);

  const dots = [];

  sections.forEach((sec) => {
    const dot = document.createElement("div");
    dot.className = "scroll-snap-dot";
    dot.title = sec.id;
    dot.addEventListener("click", () => {
      sec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    nav.appendChild(dot);
    dots.push(dot);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = Array.from(sections).indexOf(entry.target);
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((sec) => observer.observe(sec));
}