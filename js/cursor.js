/**
 * cursor.js — Custom cursor + mouse glow effect (desktop only)
 * File: js/cursor.js
 */

(function () {
  'use strict';

  // Skip on touch / small screens
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.innerWidth < 768) return;

  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX  = -100, ringY  = -100;
  let raf;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function moveCursor() {
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';

    ringX = lerp(ringX, mouseX, 0.14);
    ringY = lerp(ringY, mouseY, 0.14);
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    raf = requestAnimationFrame(moveCursor);
  }

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  moveCursor();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll(
    'a, button, .btn, .proj-card, .skill-card, .edu-item__card, .contact__detail, [data-tip]'
  );

  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

})();
