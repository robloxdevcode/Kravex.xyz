document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('nav-open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Referral path detection: show a custom banner when visiting /ref/star
  (function handleReferral() {
    try {
      const path = window.location.pathname.replace(/\/+$/,'');
      const target = '/ref/star';
      if (path === target) {
        const key = 'referral_star_dismissed';
        if (localStorage.getItem(key)) return; // don't show if dismissed

        const banner = document.createElement('div');
        banner.className = 'referral-banner';
        banner.innerHTML = `<div class="referral-inner"><p>🎉 10% discount activated</p><button class="referral-dismiss" aria-label="Dismiss">✕</button></div>`;
        document.body.prepend(banner);

        const btn = banner.querySelector('.referral-dismiss');
        btn.addEventListener('click', () => {
          try { localStorage.setItem(key, '1'); } catch (e) {}
          banner.remove();
        });
      }
    } catch (e) {
      // fail silently
    }
  })();
});
