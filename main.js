/* ==========================================================================
   Mapa Architects
   Motion + interaction. Mirrors the Nordå teardown (TEARDOWN-norda.md).
   ========================================================================== */

// Paste the Apps Script URL here after running Skill 03
const ENDPOINT = '';

// Counter direction. true = the number drops down from behind the rule
// (what the inspo site's markup implies). Flip to false to make it rise
// from below instead.
const COUNTER_DROPS_FROM_ABOVE = true;

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  // Below 810px the inspo site drops its scroll choreography. So do we.
  const bigScreen = window.matchMedia('(min-width: 810px)').matches;

  /* ------------------------------------------------------------------------
     1. Smooth scroll (Lenis, with a safe fallback if the CDN is blocked)
     ------------------------------------------------------------------------ */

  let lenis = null;

  if (!reduced && typeof window.Lenis === 'function') {
    // lerp gives continuous inertia, which reads smoother than a fixed duration
    lenis = new window.Lenis({
      lerp: 0.055,
      wheelMultiplier: 0.85,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.4
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  } else {
    document.documentElement.style.scrollBehavior = reduced ? 'auto' : 'smooth';
  }

  const scrollTo = (target) => {
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
    } else if (target) {
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  // Anchor links go through the smooth scroller
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      scrollTo(el);
    });
  });

  const toTop = document.getElementById('to-top');
  if (toTop) toTop.addEventListener('click', () => scrollTo(0));

  /* ------------------------------------------------------------------------
     2. Letter-roll links
     ------------------------------------------------------------------------ */

  const buildRoll = (el, text) => {
    el.textContent = '';
    el.classList.add('roll');
    [...text].forEach((ch, i) => {
      const wrap = document.createElement('span');
      wrap.className = 'roll__char';
      const inner = document.createElement('span');
      inner.className = 'roll__inner';
      const a = document.createElement('span');
      const b = document.createElement('span');
      a.className = 'roll__a';
      b.className = 'roll__b';
      a.textContent = ch === ' ' ? ' ' : ch;
      b.textContent = a.textContent;
      a.style.setProperty('--i', i);
      b.style.setProperty('--i', i);
      inner.append(a, b);
      wrap.append(inner);
      el.append(wrap);
    });
  };

  document.querySelectorAll('[data-roll]').forEach((el) => {
    buildRoll(el, el.textContent.trim());
  });

  // Rebuild the whole roll so labels of different lengths swap cleanly
  const setRollText = (el, text) => buildRoll(el, text);

  /* ------------------------------------------------------------------------
     3. Menu overlay
     ------------------------------------------------------------------------ */

  const menu = document.getElementById('menu');
  const menuToggle = document.getElementById('menu-toggle');
  let menuOpen = false;

  function openMenu() {
    if (!menu) return;
    menuOpen = true;
    menu.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    const roll = menuToggle.querySelector('[data-roll], .roll');
    if (roll) setRollText(roll, 'Zatvori');
    if (lenis) lenis.stop();
    document.documentElement.classList.add('lenis-stopped');
  }

  function closeMenu() {
    if (!menu || !menuOpen) return;
    menuOpen = false;
    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    const roll = menuToggle.querySelector('[data-roll], .roll');
    if (roll) setRollText(roll, 'Meni');
    if (lenis) lenis.start();
    document.documentElement.classList.remove('lenis-stopped');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ------------------------------------------------------------------------
     4. Custom cursor
     ------------------------------------------------------------------------ */

  const cursor = document.querySelector('.cursor');
  if (cursor && fine && !reduced) {
    const dot = cursor.querySelector('.cursor__dot');
    const label = cursor.querySelector('.cursor__label');
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;

    window.addEventListener('mousemove', (e) => {
      x = e.clientX;
      y = e.clientY;
      cursor.classList.add('is-ready');
    }, { passive: true });

    const preview = document.querySelector('.preview');
    const previewImg = preview ? preview.querySelector('img') : null;
    let px = x;
    let py = y;

    const tick = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (preview) {
        // Trails a little behind the cursor so it feels weighted
        px += (x - px) * 0.09;
        py += (y - py) * 0.09;
        preview.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    if (preview && previewImg) {
      document.querySelectorAll('[data-preview]').forEach((row) => {
        row.addEventListener('mouseenter', () => {
          const src = row.getAttribute('data-preview');
          if (previewImg.getAttribute('src') !== src) previewImg.setAttribute('src', src);
          previewImg.setAttribute('alt', '');
          preview.classList.add('is-on');
        });
        row.addEventListener('mouseleave', () => preview.classList.remove('is-on'));
      });
    }

    const HOVERABLE = 'a, button, [data-cursor], .choice, .acc__btn';
    const TEXTUAL = 'input, textarea';

    const reset = () => {
      cursor.classList.remove('is-active', 'is-hover', 'is-text');
      label.textContent = '';
    };

    document.addEventListener('mouseover', (e) => {
      const text = e.target.closest(TEXTUAL);
      if (text) {
        reset();
        cursor.classList.add('is-text');
        return;
      }
      const t = e.target.closest(HOVERABLE);
      if (!t) {
        reset();
        return;
      }
      const holder = e.target.closest('[data-cursor]');
      const caption = holder ? holder.getAttribute('data-cursor') : '';
      reset();
      if (caption) {
        label.textContent = caption;
        cursor.classList.add('is-active');
      } else {
        cursor.classList.add('is-hover');
      }
    });
  } else {
    document.body.classList.remove('cursor-none');
  }

  /* ------------------------------------------------------------------------
     5. Split text (desktop only, matching the inspo site)
     ------------------------------------------------------------------------ */

  const desktop = window.matchMedia('(min-width: 1200px)').matches;

  if (desktop && !reduced) {
    document.querySelectorAll('[data-split]').forEach((el) => {
      const words = el.textContent.split(' ');
      el.textContent = '';
      let i = 0;
      words.forEach((word, w) => {
        const ws = document.createElement('span');
        ws.className = 'word';
        [...word].forEach((ch) => {
          const cs = document.createElement('span');
          cs.className = 'char';
          cs.textContent = ch;
          cs.style.setProperty('--i', i++);
          ws.append(cs);
        });
        el.append(ws);
        if (w < words.length - 1) el.append(document.createTextNode(' '));
      });
      el.classList.add('split');
    });
  }

  /* ------------------------------------------------------------------------
     6. Reveal on scroll
     ------------------------------------------------------------------------ */

  const revealTargets = document.querySelectorAll('.fade-up, .split, .wipe, .hero');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-in'));
  }

  /* ------------------------------------------------------------------------
     6b. Hero: intro panels, then full-bleed project slideshow
     ------------------------------------------------------------------------ */

  const hero = document.querySelector('[data-hero]');
  if (hero) {
    const frames = hero.querySelectorAll('.hero__frame');
    const holder = hero.querySelector('[data-heroimg]');
    const heroImg = holder ? holder.querySelector('img') : null;
    const slides = [...hero.querySelectorAll('[data-slide]')];
    const numEl = hero.querySelector('[data-slidenum]');
    const totalEl = hero.querySelector('[data-slidetotal]');
    const nameEl = hero.querySelector('[data-slidename]');
    const pad = (n) => String(n + 1).padStart(2, '0');

    if (totalEl) totalEl.textContent = pad(slides.length - 1);

    // Preload so swaps never flash
    slides.forEach((sl) => {
      const im = new Image();
      im.src = sl.getAttribute('data-src');
    });

    const openHero = () => hero.classList.add('is-full');

    if (reduced) {
      frames.forEach((f) => f.classList.add('is-in'));
      openHero();
    } else {
      // Timers, not rAF: a throttled tab must never leave the hero half open
      setTimeout(() => {
        hero.classList.add('is-in');
        frames.forEach((f) => f.classList.add('is-in'));
      }, 80);
      setTimeout(openHero, 1750);
    }

    let index = 0;
    let busy = false;
    let current = heroImg;

    // Same move as the intro: the next photo slides up from below and
    // covers the one before it. No crossfade.
    const show = (next) => {
      if (busy || !current || slides.length < 2) return;
      busy = true;
      index = (next + slides.length) % slides.length;
      const sl = slides[index];

      const incoming = document.createElement('img');
      incoming.src = sl.getAttribute('data-src');
      incoming.alt = sl.getAttribute('data-alt') || '';
      incoming.width = 1600;
      incoming.height = 1067;
      incoming.style.transform = 'translateY(100%)';
      incoming.style.zIndex = '2';
      holder.appendChild(incoming);

      const outgoing = current;
      current = incoming;

      requestAnimationFrame(() => requestAnimationFrame(() => {
        incoming.style.transition = 'transform 1.05s cubic-bezier(0.44, 0, 0.56, 1)';
        incoming.style.transform = 'translateY(0)';
      }));

      if (nameEl) {
        hero.classList.add('is-swapping');
        setTimeout(() => {
          nameEl.textContent = sl.getAttribute('data-name') || '';
          if (numEl) numEl.textContent = pad(index);
          hero.classList.remove('is-swapping');
        }, 420);
      }

      setTimeout(() => {
        if (outgoing && outgoing.parentNode) outgoing.remove();
        incoming.style.zIndex = '';
        busy = false;
      }, 1150);
    };

    const prev = hero.querySelector('[data-prev]');
    const next = hero.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', () => show(index - 1));
    if (next) next.addEventListener('click', () => show(index + 1));

    // Auto-advance, paused while the hero is off screen or the tab is hidden
    if (!reduced && slides.length > 1) {
      let timer = null;
      const startAuto = () => {
        if (timer) return;
        timer = setInterval(() => {
          if (!document.hidden) show(index + 1);
        }, 6000);
      };
      const stopAuto = () => {
        clearInterval(timer);
        timer = null;
      };
      if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
          entries[0].isIntersecting ? startAuto() : stopAuto();
        }, { threshold: 0.4 }).observe(hero);
      } else {
        startAuto();
      }
    }
  }

  /* ------------------------------------------------------------------------
     7. Counters
     ------------------------------------------------------------------------ */

  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        cio.unobserve(el);
        const end = parseInt(el.getAttribute('data-count'), 10) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        if (reduced) {
          el.textContent = end + suffix;
          return;
        }
        const dur = 1500;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased) + (p === 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((c) => {
      c.textContent = c.getAttribute('data-count') + (c.getAttribute('data-suffix') || '');
    });
  }

  /* ------------------------------------------------------------------------
     7b. Scroll-linked motion: counter roll + image parallax
     Both run off one shared rAF-throttled scroll pass.
     ------------------------------------------------------------------------ */

  const rolls = [...document.querySelectorAll('[data-roll-y]')];
  const parallax = [...document.querySelectorAll('.wipe img')];
  const footerMark = document.querySelector('[data-footermark]');
  const footerEl = document.querySelector('.site-footer');

  if ((rolls.length || parallax.length || footerMark) && !reduced && bigScreen) {
    // 0 when the element's top hits the bottom of the viewport,
    // 1 when its bottom leaves the top.
    const progress = (el) => {
      const r = el.getBoundingClientRect();
      const span = window.innerHeight + r.height;
      return Math.min(Math.max((window.innerHeight - r.top) / span, 0), 1);
    };

    let queued = false;

    const paintScroll = () => {
      queued = false;

      // The inspo site ships translateY(-202px) inside a 220px window at scroll
      // progress 0, so the number sits hidden ABOVE the rule and drops down
      // into place. It settles at 0 and stays there.
      rolls.forEach((el) => {
        const win = el.parentElement;
        const r = win.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the row enters the bottom of the screen, 1 by the time it is
        // a quarter up the screen: the drop is quick and lands early.
        const p = Math.min(Math.max((vh - r.top) / (vh * 0.75), 0), 1);
        const start = (COUNTER_DROPS_FROM_ABOVE ? -1 : 1) * win.offsetHeight * 0.92;
        el.style.transform = `translate3d(0, ${(start * (1 - p)).toFixed(1)}px, 0)`;
      });

      if (footerMark && footerEl) {
        const fr = footerEl.getBoundingClientRect();
        const span = window.innerHeight + fr.height * 0.5;
        const fp = Math.min(Math.max((window.innerHeight - fr.top) / span, 0), 1);
        const e = Math.min(fp / 0.55, 1);
        footerMark.style.opacity = (0.12 + e * 0.78).toFixed(3);
        footerMark.style.filter = `blur(${((1 - e) * 10).toFixed(1)}px)`;
        footerMark.style.transform = `translate3d(0, ${((1 - e) * 40).toFixed(1)}px, 0)`;
      }

      parallax.forEach((img) => {
        const frame = img.parentElement;
        const p = progress(frame);
        // The image is 128% tall, so it has 28% of slack to drift through
        const range = frame.offsetHeight * 0.14;
        img.style.transform = `translate3d(0, ${((p - 0.5) * 2 * range).toFixed(1)}px, 0)`;
      });
    };

    const queue = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(paintScroll);
    };

    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    paintScroll();
  }

  /* ------------------------------------------------------------------------
     8. Sticky feature: scroll-linked zoom
     ------------------------------------------------------------------------ */

  const zoomWrap = document.querySelector('[data-zoom]');
  const zoomMark = document.querySelector('[data-mark]');
  const feature = document.querySelector('.feature');
  const quote = document.querySelector('[data-quote]');

  if (feature && zoomWrap && !reduced && bigScreen) {
    const inner = zoomWrap.querySelector('img, video');
    const quoteText = quote ? quote.firstElementChild : null;
    let ticking = false;

    // Start the quote fully below the fold, measured from its real height,
    // so not a single line peeks while the frame is still growing.
    let quoteTravel = 0;
    const measure = () => {
      const h = quoteText ? quoteText.offsetHeight : 0;
      quoteTravel = (window.innerHeight + h) / 2 + 24;
    };
    measure();
    window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

    const update = () => {
      ticking = false;
      const rect = feature.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(Math.max(-rect.top / total, 0), 1);

      // Phase 1 (0 to 35%): the frame grows until it fills the whole screen.
      const z = Math.min(p / 0.28, 1);
      zoomWrap.style.transform = `scale(${(0.66 + z * 0.34).toFixed(4)})`;
      if (inner) inner.style.transform = `scale(${(1.15 - z * 0.15).toFixed(4)})`;
      if (zoomMark) zoomMark.style.opacity = String(Math.max(0, 1 - z * 1.7));

      // Phase 2 (36% to 70%): only now does the quote rise, and it stops dead
      // when it lands. Phase 3: it holds while the white section covers it.
      if (quote) {
        const q = Math.min(Math.max((p - 0.30) / 0.25, 0), 1);
        quote.style.transform = `translate3d(0, ${(quoteTravel * (1 - q)).toFixed(1)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* ------------------------------------------------------------------------
     9. Accordion
     ------------------------------------------------------------------------ */

  document.querySelectorAll('[data-acc]').forEach((acc) => {
    const items = acc.querySelectorAll('.acc__item');
    items.forEach((item) => {
      const btn = item.querySelector('.acc__btn');
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach((other) => {
          other.classList.remove('is-open');
          other.querySelector('.acc__btn').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     10. Wizard form
     ------------------------------------------------------------------------ */

  const wizard = document.querySelector('[data-wizard]');
  if (!wizard) return;

  const form = wizard.querySelector('form');
  const steps = [...wizard.querySelectorAll('.step')];
  const segs = [...wizard.querySelectorAll('.wizard__seg')];
  const done = wizard.querySelector('.wizard__done');
  const backBtn = wizard.querySelector('.btn-back');
  const sendBtn = wizard.querySelector('.btn-send');
  const answers = {};
  let current = 0;

  const paint = () => {
    steps.forEach((s, i) => s.classList.toggle('is-active', i === current));
    segs.forEach((s, i) => s.classList.toggle('is-done', i <= current));
    backBtn.style.visibility = current === 0 ? 'hidden' : 'visible';
    const first = steps[current].querySelector('input, textarea, button');
    if (first && current > 0) {
      // Only move focus once the step has finished animating in
      setTimeout(() => first.focus({ preventScroll: true }), 400);
    }
  };

  const go = (i) => {
    current = Math.min(Math.max(i, 0), steps.length - 1);
    paint();
  };

  backBtn.addEventListener('click', () => go(current - 1));

  wizard.querySelectorAll('.choice').forEach((choice) => {
    choice.addEventListener('click', () => {
      const step = choice.closest('.step');
      const key = step.getAttribute('data-key');
      step.querySelectorAll('.choice').forEach((c) => c.classList.remove('is-selected'));
      choice.classList.add('is-selected');
      answers[key] = choice.getAttribute('data-value') || choice.textContent.trim();
      setTimeout(() => go(current + 1), 260);
    });
  });

  const validate = () => {
    let ok = true;
    steps[current].querySelectorAll('[required]').forEach((input) => {
      const field = input.closest('.field');
      const value = input.value.trim();
      let valid = value.length > 0;
      if (valid && input.type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      if (valid && input.type === 'tel') valid = value.replace(/\D/g, '').length >= 6;
      field.classList.toggle('has-error', !valid);
      if (!valid && ok) input.focus({ preventScroll: true });
      if (!valid) ok = false;
    });
    return ok;
  };

  wizard.querySelectorAll('.field input, .field textarea').forEach((input) => {
    input.addEventListener('input', () => input.closest('.field').classList.remove('has-error'));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Honeypot: if a bot filled any of these, drop the request silently
    const trapped = [...form.querySelectorAll('.honeypot input')].some((i) => i.value !== '');
    if (trapped) return;

    const data = Object.assign({}, answers);
    new FormData(form).forEach((value, key) => {
      if (key.startsWith('_')) return;
      data[key] = value;
    });
    data.page = window.location.href;
    data.submittedAt = new Date().toISOString();

    sendBtn.setAttribute('disabled', 'disabled');

    try {
      if (ENDPOINT) {
        await fetch(ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(data)
        });
      } else {
        console.warn('ENDPOINT is empty. Run Skill 03 to generate the Apps Script URL.');
      }
      steps.forEach((s) => s.classList.remove('is-active'));
      wizard.querySelector('.wizard__nav').style.display = 'none';
      segs.forEach((s) => s.classList.add('is-done'));
      done.classList.add('is-active');
    } catch (err) {
      console.error(err);
      sendBtn.removeAttribute('disabled');
      const box = wizard.querySelector('[data-formerror]');
      if (box) box.hidden = false;
    }
  });

  paint();
})();
