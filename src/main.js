import "./styles.css";
import { initSpaceScene } from "./spaceScene.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="space-layer" data-space-layer aria-hidden="true"></div>
  <div class="hud-grid" aria-hidden="true"></div>
  <div class="grain-overlay" aria-hidden="true"></div>
  <div class="reticle reticle--dot" data-reticle-dot></div>
  <div class="reticle reticle--ring" data-reticle-ring></div>

  <header class="topbar" data-topbar>
    <a class="brand" href="#top" aria-label="Back to top">
      <span class="brand__code">VC-09</span>
      <span class="brand__line">Void Cartography Interface</span>
    </a>
    <nav class="topbar__nav" aria-label="Primary navigation">
      <a href="#atlas">Atlas</a>
      <a href="#projects">Dossiers</a>
      <a href="#systems">Deck</a>
      <a href="#contact">Signal</a>
    </nav>
  </header>

  <aside class="approach-meter" aria-hidden="true">
    <span class="approach-meter__label">Approach</span>
    <div class="approach-meter__track">
      <i class="approach-meter__fill" data-scroll-indicator></i>
    </div>
    <span class="approach-meter__value" data-scroll-value>00.0</span>
  </aside>

  <main class="shell">
    <section class="hero section reveal" id="top">
      <div class="hero__frame">
        <div class="hero__copy">
          <p class="section-tag">Celestial Atlas // Frontend Portfolio</p>
          <h1 class="hero__title">
            <span data-decode="VOID">VOID</span>
            <span data-decode="CARTOGRAPHER">CARTOGRAPHER</span>
          </h1>
          <p class="hero__lede">
            I build interfaces that move like instruments: atmospheric, precise,
            and impossible to confuse for anything ordinary. The portfolio becomes
            the navigation deck.
          </p>
          <div class="hero__actions">
            <a class="button button--primary" href="#projects">Open Dossiers</a>
            <a class="button button--ghost" href="#contact">Lock Signal</a>
          </div>
          <div class="hero__telemetry">
            <article class="telemetry-card">
              <span>Approach Vector</span>
              <strong>Delta-42.7</strong>
              <p>Scroll propels the camera into the mapped void.</p>
            </article>
            <article class="telemetry-card">
              <span>Atlas State</span>
              <strong>LIVE CONSTELLATIONS</strong>
              <p>Star nodes rotate in layered depth with persistent data streams.</p>
            </article>
            <article class="telemetry-card">
              <span>Interaction Model</span>
              <strong>PARALLAX LOCK</strong>
              <p>Mouse input tilts the universe and wakes dormant coordinates.</p>
            </article>
          </div>
        </div>

        <aside class="hero__panel dossier">
          <div class="dossier__stamp">CLASSIFICATION // ASTRAL</div>
          <div class="dossier__row">
            <span>Role</span>
            <strong>Product + Frontend Systems</strong>
          </div>
          <div class="dossier__row">
            <span>Focus</span>
            <strong>Immersive UI, Motion, Interactive Worlds</strong>
          </div>
          <div class="dossier__row">
            <span>Signal</span>
            <strong>Available for ambitious product missions</strong>
          </div>
          <div class="dossier__trace">
            <div><span>Node 01</span><em>Singularity field stable</em></div>
            <div><span>Node 02</span><em>Depth layers aligned</em></div>
            <div><span>Node 03</span><em>Decoded content synchronized</em></div>
            <div><span>Node 04</span><em>Navigation deck online</em></div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section reveal" id="atlas">
      <div class="section-heading">
        <p class="section-tag">Atlas Notes // 01</p>
        <h2 data-decode="Mapping the unmappable.">
          Mapping the unmappable.
        </h2>
      </div>

      <div class="atlas-grid">
        <article class="story-card">
          <h3>Design like a navigation system.</h3>
          <p>
            The best interfaces do more than organize content. They orient people,
            create momentum, and make complexity feel steerable. I design products
            that act like instruments under pressure.
          </p>
        </article>
        <article class="story-card">
          <h3>Motion with gravity.</h3>
          <p>
            Every hover, reveal, and transition should carry weight. I use motion
            to teach hierarchy, reward curiosity, and make digital spaces feel
            inhabited instead of assembled.
          </p>
        </article>
        <article class="story-card story-card--coordinates">
          <div class="story-card__label">Coordinate Broadcast</div>
          <ul class="coordinate-list">
            <li><span>Vector</span><strong>XI-18 / 244</strong></li>
            <li><span>Transit</span><strong>Forward drift engaged</strong></li>
            <li><span>Observation</span><strong>Depth-reactive star atlas</strong></li>
            <li><span>Output</span><strong>Interfaces with cinematic intent</strong></li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section reveal" id="projects">
      <div class="section-heading">
        <p class="section-tag">Mission Dossiers // 02</p>
        <h2 data-decode="Selected transmissions from the edge of the map.">
          Selected transmissions from the edge of the map.
        </h2>
      </div>

      <div class="project-grid">
        <article class="project-card">
          <div class="project-card__meta">
            <span>Coord // 18.442 / -07.118</span>
            <strong>C-IV</strong>
          </div>
          <div class="project-card__stamp">Decoded</div>
          <h3>Event Horizon Commerce</h3>
          <p>
            A premium commerce experience built around cinematic product motion,
            modular merchandising blocks, and faster decision loops for launch
            campaigns.
          </p>
          <ul class="project-card__details">
            <li>Launch architecture designed for narrative browsing.</li>
            <li>Checkout experience tuned around confidence and velocity.</li>
            <li>Design system patterns translated into reusable frontend modules.</li>
          </ul>
        </article>

        <article class="project-card">
          <div class="project-card__meta">
            <span>Coord // 77.203 / 12.904</span>
            <strong>S-II</strong>
          </div>
          <div class="project-card__stamp">Encrypted</div>
          <h3>Singularity Analytics Deck</h3>
          <p>
            A dashboard environment for live telemetry, anomaly tracking, and
            narrative reporting, designed to make dense data feel steerable in
            real time.
          </p>
          <ul class="project-card__details">
            <li>Deep visual hierarchy without flattening critical signals.</li>
            <li>Custom chart states and handoff patterns for operations teams.</li>
            <li>Motion behavior built to reinforce state changes and urgency.</li>
          </ul>
        </article>

        <article class="project-card">
          <div class="project-card__meta">
            <span>Coord // 09.115 / 88.670</span>
            <strong>R-IX</strong>
          </div>
          <div class="project-card__stamp">Live Feed</div>
          <h3>Relay System Interface</h3>
          <p>
            A multi-surface product shell for internal tools, command panels, and
            knowledge routing, unified by a single navigation language and reusable
            interaction kit.
          </p>
          <ul class="project-card__details">
            <li>Role-aware surfaces with responsive layout behavior.</li>
            <li>Operational workflows translated into tactile UI sequences.</li>
            <li>Component primitives robust enough for scale and speed.</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section reveal" id="systems">
      <div class="section-heading">
        <p class="section-tag">Navigation Deck // 03</p>
        <h2 data-decode="Built for teams that want products to feel alive.">
          Built for teams that want products to feel alive.
        </h2>
      </div>

      <div class="systems-grid">
        <article class="system-card">
          <span class="system-card__index">01</span>
          <h3>Interface Direction</h3>
          <p>
            Concept-led design with sharp visual systems, expressive motion, and
            UI language that carries a clear point of view.
          </p>
        </article>
        <article class="system-card">
          <span class="system-card__index">02</span>
          <h3>Frontend Execution</h3>
          <p>
            Production-grade implementation with attention to interaction quality,
            responsive behavior, and architectural clarity.
          </p>
        </article>
        <article class="system-card">
          <span class="system-card__index">03</span>
          <h3>System Thinking</h3>
          <p>
            Design systems, reusable components, and motion rules that help teams
            keep shipping without losing the original spark.
          </p>
        </article>
      </div>

      <div class="signal-band">
        <span>Navigation Stack</span>
        <p>
          JavaScript, TypeScript, React, Next.js, Three.js, animation systems,
          design systems, prototype strategy, product storytelling.
        </p>
      </div>
    </section>

    <section class="section reveal" id="contact">
      <div class="section-heading">
        <p class="section-tag">Signal Lock // 04</p>
        <h2 data-decode="Ready to chart something impossible?">
          Ready to chart something impossible?
        </h2>
      </div>

      <div class="contact-panel">
        <div class="contact-panel__copy">
          <p>
            If the mission needs a product experience with atmosphere, precision,
            and a point of view, I’m open to collaboration.
          </p>
          <div class="contact-panel__actions">
            <a class="button button--primary" href="mailto:hello@yourdomain.com">
              Transmit Primary Signal
            </a>
            <a class="button button--ghost" href="#top">Return to Bridge</a>
          </div>
        </div>
        <div class="contact-panel__terminal">
          <div class="terminal-line">
            <span>$ status</span>
            <strong>accepting selected mission briefs</strong>
          </div>
          <div class="terminal-line">
            <span>$ uplink</span>
            <strong>hello@yourdomain.com</strong>
          </div>
          <div class="terminal-line">
            <span>$ response_time</span>
            <strong>24-48 hours</strong>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <span>Void Cartographer Interface</span>
    <span data-year></span>
  </footer>
`;

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const spaceScene = initSpaceScene(
  document.querySelector("[data-space-layer]"),
  reducedMotionQuery.matches,
);

document.querySelector("[data-year]").textContent = new Date().getFullYear();

setupRevealAnimations();
setupTopbarState();
setupScrollTelemetry(spaceScene);
setupReticle();

window.addEventListener("beforeunload", () => {
  spaceScene.destroy();
});

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    spaceScene.destroy();
  });
}

function setupRevealAnimations() {
  const reveals = [...document.querySelectorAll(".reveal")];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        entry.target
          .querySelectorAll("[data-decode]")
          .forEach((element, index) =>
            window.setTimeout(
              () => decodeText(element, element.dataset.decode),
              index * 90,
            ),
          );
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.28,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  reveals.forEach((section, index) => {
    section.style.setProperty("--reveal-delay", `${Math.min(index * 90, 260)}ms`);

    if (index === 0) {
      window.setTimeout(() => {
        section.classList.add("is-visible");
        section
          .querySelectorAll("[data-decode]")
          .forEach((element, decodeIndex) =>
            window.setTimeout(
              () => decodeText(element, element.dataset.decode),
              120 + decodeIndex * 140,
            ),
          );
      }, 120);
      return;
    }

    observer.observe(section);
  });
}

function setupTopbarState() {
  const syncTopbar = () => {
    document.body.classList.toggle("is-scrolled", window.scrollY > 40);
  };

  syncTopbar();
  window.addEventListener("scroll", syncTopbar, { passive: true });
}

function setupScrollTelemetry(scene) {
  const fill = document.querySelector("[data-scroll-indicator]");
  const value = document.querySelector("[data-scroll-value]");

  const sync = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const percentage = (progress * 100).toFixed(1).padStart(4, "0");

    fill.style.transform = `scaleY(${Math.max(progress, 0.03)})`;
    value.textContent = percentage;
    document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
    scene.setScrollProgress(progress);
  };

  sync();
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
}

function setupReticle() {
  if (window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  const dot = document.querySelector("[data-reticle-dot]");
  const ring = document.querySelector("[data-reticle-ring]");
  const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
  const trailing = { ...pointer };

  const setPosition = (element, x, y) => {
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  };

  const animate = () => {
    trailing.x += (pointer.x - trailing.x) * 0.18;
    trailing.y += (pointer.y - trailing.y) * 0.18;
    setPosition(ring, trailing.x, trailing.y);
    window.requestAnimationFrame(animate);
  };

  const syncHoverState = (event) => {
    document.body.classList.toggle(
      "reticle-hover",
      Boolean(event.target.closest("a, button, .project-card, .system-card, .story-card")),
    );
  };

  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    setPosition(dot, pointer.x, pointer.y);
    document.body.classList.add("reticle-active");
  });
  window.addEventListener("pointerleave", () => {
    document.body.classList.remove("reticle-active");
  });
  window.addEventListener("pointerdown", () => {
    document.body.classList.add("reticle-pressed");
  });
  window.addEventListener("pointerup", () => {
    document.body.classList.remove("reticle-pressed");
  });
  document.addEventListener("mouseover", syncHoverState);

  setPosition(dot, pointer.x, pointer.y);
  setPosition(ring, trailing.x, trailing.y);
  animate();
}

function decodeText(element, finalText) {
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/*";
  let frame = 0;

  window.clearInterval(element.decodeTimer);
  element.decodeTimer = window.setInterval(() => {
    const nextText = finalText
      .split("")
      .map((character, index) => {
        if (character === " ") {
          return " ";
        }

        return index < frame
          ? finalText[index]
          : glyphs[Math.floor(Math.random() * glyphs.length)];
      })
      .join("");

    element.textContent = nextText;
    frame += 0.45;

    if (frame >= finalText.length) {
      window.clearInterval(element.decodeTimer);
      element.textContent = finalText;
    }
  }, 28);
}
