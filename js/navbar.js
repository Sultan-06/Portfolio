/**
 * navbar.js — Navbar scroll behaviour, active links, mobile drawer
 * File: js/navbar.js
 */

(function () {
  'use strict';

  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const drawer     = document.getElementById('nav-drawer');
  const drawerLinks = drawer ? drawer.querySelectorAll('a') : [];
  const sections   = document.querySelectorAll('section[id]');
  const navItems   = document.querySelectorAll('.nav__links a, .nav__drawer a');

  /* ---- Scroll: add .nav--scrolled ---- */
  function onScroll() {
    navbar.classList.toggle('nav--scrolled', window.scrollY > 30);
    updateActiveLink();
  }

  /* ---- Active nav link on scroll ---- */
  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 110) {
        current = sec.id;
      }
    });
    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile hamburger toggle ---- */
  let drawerOpen = false;

  function openDrawer() {
    drawerOpen = true;
    hamburger.classList.add('is-open');
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawerOpen = false;
    hamburger.classList.remove('is-open');
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && drawer) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'nav-drawer');
    hamburger.addEventListener('click', () => {
      drawerOpen ? closeDrawer() : openDrawer();
    });

    // Close on drawer link click
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (drawerOpen && !navbar.contains(e.target) && !drawer.contains(e.target)) {
        closeDrawer();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawerOpen) closeDrawer();
    });
  }

  /* ---- Smooth scroll offset fix ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY
                  - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
