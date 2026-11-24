/**
 * main.js — Bootstrap / initialisation & misc interactions
 * File: js/main.js
 */

(function () {
  'use strict';

  /* ---- Skills tab switcher (visual only, all visible by default) ---- */
  const tabs = document.querySelectorAll('.skills__tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ---- Navbar CTA glow on hover ---- */
  const navCta = document.querySelector('.nav__cta');
  if (navCta) {
    navCta.addEventListener('mousemove', e => {
      const rect = navCta.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      navCta.style.background =
        `radial-gradient(circle at ${x}% ${y}%, #a78bfa, #7c3aed 40%, #2563eb)`;
    });
    navCta.addEventListener('mouseleave', () => {
      navCta.style.background = '';
    });
  }

  /* ---- Tech badge hover glow ---- */
  document.querySelectorAll('.tech-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.filter = 'brightness(1.2)';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.filter = '';
    });
  });

  /* ---- Copy email on click (contact page) ---- */
  const emailLinks = document.querySelectorAll('[data-copy-email]');
  emailLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const email = link.dataset.copyEmail || 'zakinaik000@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const original = link.innerHTML;
        link.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => { link.innerHTML = original; }, 2000);
      }).catch(() => {
        window.location.href = 'mailto:' + email;
      });
    });
  });

  /* ---- Scroll progress bar ---- */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ---- Console easter egg ---- */
  if (window.console && console.log) {
    console.log(
      '%c⚡ Sultansab T Naikwadi',
      'font-size:22px;font-weight:900;color:#a78bfa;'
    );
    console.log(
      '%c   Portfolio  |  zakinaik000@gmail.com\n   Built with HTML · CSS · JavaScript',
      'font-size:12px;color:#94a3b8;'
    );
  }

  /* ---- Respect reduced motion preference ---- */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--t-normal', '0.01ms');
    document.documentElement.style.setProperty('--t-fast',   '0.01ms');
    document.documentElement.style.setProperty('--t-slow',   '0.01ms');
  }

})();
