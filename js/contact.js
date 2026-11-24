/**
 * contact.js — Contact form handling with validation & feedback
 * File: js/contact.js
 */

(function () {
  'use strict';

  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submit = form ? form.querySelector('.form-submit') : null;

  if (!form || !submit) return;

  /* ---- Live validation ---- */
  const fields = form.querySelectorAll('input[required], textarea[required]');

  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      field.style.borderColor = '';
      field.style.boxShadow   = '';
    });
  });

  function validateField(field) {
    const val = field.value.trim();
    let valid = true;

    if (!val) {
      valid = false;
    } else if (field.type === 'email') {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }

    if (!valid) {
      field.style.borderColor = 'rgba(239,68,68,0.6)';
      field.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.1)';
    } else {
      field.style.borderColor = 'rgba(16,185,129,0.5)';
      field.style.boxShadow   = '0 0 0 3px rgba(16,185,129,0.08)';
    }
    return valid;
  }

  /* ---- Submit ---- */
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Validate all fields
    let allValid = true;
    fields.forEach(f => { if (!validateField(f)) allValid = false; });
    if (!allValid) {
      showStatus('error', '⚠️ Please fill in all required fields correctly.');
      return;
    }

    // Loading state
    const originalHTML = submit.innerHTML;
    submit.disabled    = true;
    submit.innerHTML   = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    // Simulate async send (plug in EmailJS / Formspree here)
    setTimeout(() => {
      showStatus(
        'success',
        '✅ Message sent! I\'ll get back to you within 24 hours.'
      );
      form.reset();
      fields.forEach(f => {
        f.style.borderColor = '';
        f.style.boxShadow   = '';
      });
      submit.disabled  = false;
      submit.innerHTML = originalHTML;

      setTimeout(hideStatus, 6000);
    }, 2000);
  });

  function showStatus(type, msg) {
    status.textContent  = msg;
    status.className    = `form-status show ${type}`;
  }
  function hideStatus() {
    status.className = 'form-status';
    status.textContent = '';
  }

})();
