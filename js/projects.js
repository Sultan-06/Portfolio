/**
 * projects.js — Filter buttons for projects section
 * File: js/projects.js
 */

(function () {
  'use strict';

  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.proj-card:not(.proj-card--placeholder)');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);

        if (show) {
          card.classList.remove('hidden');
          // Re-trigger entrance animation
          card.style.animation = 'none';
          void card.offsetWidth; // force reflow
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---- Tilt effect on mouse move ---- */
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-7px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
      // Update CSS custom property for radial gradient spotlight
      card.style.setProperty('--mx', (e.clientX - rect.left) / rect.width * 100 + '%');
      card.style.setProperty('--my', (e.clientY - rect.top)  / rect.height * 100 + '%');
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

})();
