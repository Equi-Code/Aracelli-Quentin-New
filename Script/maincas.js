
// ── NAV HAMBURGER ──
function toggleNav() {
  const toggle  = document.getElementById('nav-toggle');
  const drawer  = document.getElementById('nav-drawer');
  const overlay = document.getElementById('nav-overlay');
  const open = drawer.classList.toggle('open');
  toggle.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeNav() {
  document.getElementById('nav-toggle').classList.remove('open');
  document.getElementById('nav-drawer').classList.remove('open');
  document.getElementById('nav-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── LANG ──
// let currentLang = 'es';
// function setLang(lang) {
//   currentLang = lang;
//   document.querySelectorAll('[data-lang]').forEach(el => {
//     el.classList.toggle('active', el.dataset.lang === lang);
//   });
//   document.querySelectorAll('.lang-btn').forEach(btn => {
//     btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
//   });
//   document.documentElement.lang = lang;
//   closeNav();
//   // Switch iframe src
//   const iframe = document.getElementById('google-form-iframe');
//   if (iframe) {
//     const url = iframe.dataset['src' + lang.charAt(0).toUpperCase() + lang.slice(1)];
//     if (url && !url.includes('PEGAR')) iframe.src = url;
//   }
// }

// ── LANG ──
let currentLang = 'es';
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
  });
  document.documentElement.lang = lang;
  closeNav();
  // Switch RSVP direct button URL based on language
  const rsvpBtn = document.getElementById('rsvp-btn');
  if (rsvpBtn) {
    const urlEs = 'https://docs.google.com/forms/d/e/1FAIpQLSdATgeY3Qr8Zw4-WAM2NY3GhG-tIvoZIYyUzRNrLvsIjxuWKw/viewform?usp=header';
    const urlFr = 'https://docs.google.com/forms/d/e/1FAIpQLSexAZZwyqaH6lUEGDIhoIgKUyu-4uOkMLlwlTyOpHz0KdSojw/viewform?usp=header';
    rsvpBtn.href = lang === 'fr' ? urlFr : urlEs;
  }
  // Switch iframe src
  const iframe = document.getElementById('google-form-iframe');
  if (iframe) {
    const url = iframe.dataset['src' + lang.charAt(0).toUpperCase() + lang.slice(1)];
    if (url && !url.includes('PEGAR')) iframe.src = url;
  }
}

// ── COUNTDOWN ──
const weddingDate = new Date('2026-08-22T16:00:00');
function updateCountdown() {
  const diff = weddingDate - new Date();
  if (diff <= 0) return;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent  = String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-min').textContent   = String(m).padStart(2,'0');
  document.getElementById('cd-sec').textContent   = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── IFRAME PLACEHOLDER ──
(function() {
  const iframe = document.getElementById('google-form-iframe');
  const placeholder = document.getElementById('form-placeholder');
  if (iframe && placeholder) {
    const hasRealUrl = iframe.src && !iframe.src.includes('PEGAR');
    if (hasRealUrl) {
      placeholder.classList.add('hidden');
    } else {
      iframe.style.display = 'none';
    }
  }
})();