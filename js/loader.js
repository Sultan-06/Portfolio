/**
 * loader.js — Page loader & initial entrance
 * File: js/loader.js
 */

(function () {
  'use strict';

  const loader = document.getElementById('page-loader');
  if (!loader) return;

  function hideLoader() {
    loader.classList.add('loaded');
    // Trigger hero entrance after loader
    setTimeout(() => {
      document.querySelectorAll('.hero__content > *').forEach((el, i) => {
        el.style.transitionDelay = `${i * 80}ms`;
        el.classList.add('revealed');
      });
    }, 100);
  }

  // Hide after resources load OR at most 2.2s
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 400);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 400));
    setTimeout(hideLoader, 2200);
  }

})();
