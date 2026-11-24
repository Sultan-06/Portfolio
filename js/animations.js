/**
 * animations.js — Scroll reveal, counter animation, stagger
 * File: js/animations.js
 */

(function () {
  'use strict';

  /* ---- Intersection Observer: scroll reveal ---- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
  });

  /* ---- Animated number counter ---- */
  function animateCounter(el) {
    const raw      = el.dataset.target || el.textContent.trim();
    const target   = parseFloat(raw);
    const isFloat  = raw.includes('.');
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = isFloat
        ? (eased * target).toFixed(2)
        : Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-counter]').forEach(animateCounter);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('[data-counters]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ---- Skill bar fill on scroll ---- */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-row__fill').forEach(fill => {
            const pct = fill.dataset.width || '0%';
            // slight stagger
            setTimeout(() => { fill.style.width = pct; }, 100);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.skills__grid').forEach(el => {
    skillObserver.observe(el);
  });

  /* ---- Stagger children inside a parent ---- */
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const baseDelay = parseInt(parent.dataset.stagger) || 80;
    Array.from(parent.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * baseDelay}ms`;
    });
  });

})();
