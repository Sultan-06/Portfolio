/**
 * typewriter.js — Animated typewriter for hero role text
 * File: js/typewriter.js
 */

(function () {
  'use strict';

  const el = document.getElementById('hero-typewriter');
  if (!el) return;

  const phrases = [
    'Web Developer',
    'Python Programmer',
    'C / C++ Coder',
    'Database Engineer',
    'CS Student @ VTU',
    'Problem Solver',
    'Tech Enthusiast',
  ];

  const TYPING_SPEED   = 85;   // ms per char while typing
  const DELETING_SPEED = 42;   // ms per char while deleting
  const PAUSE_END      = 1600; // ms pause after full phrase typed
  const PAUSE_START    = 320;  // ms pause before next phrase

  let pIdx = 0;
  let cIdx = 0;
  let deleting = false;

  function tick() {
    const phrase = phrases[pIdx];

    if (!deleting) {
      // Type forward
      el.textContent = phrase.slice(0, cIdx + 1);
      cIdx++;
      if (cIdx === phrase.length) {
        // Full phrase typed — pause then start deleting
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      // Delete backward
      el.textContent = phrase.slice(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        // All deleted — move to next phrase
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, DELETING_SPEED);
    }
  }

  // Small initial delay so it starts after page load animation
  setTimeout(tick, 800);

})();
