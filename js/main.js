// Mobile nav toggle
(function () {
  // The contact address comes from _config.yml, passed in on the <script> tag,
  // so it is defined in exactly one place for the whole site.
  var thisScript = document.currentScript || document.querySelector('script[data-contact-email]');
  var contactEmail = (thisScript && thisScript.getAttribute('data-contact-email')) || '';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Contact form: no backend on GitHub Pages, so hand off to a mailto: link.
  var form = document.querySelector('#contact-form');
  if (form && contactEmail) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var body = 'From: ' + form.name.value + ' (' + form.email.value + ')\n\n' + form.message.value;
      window.location.href = 'mailto:' + contactEmail +
        '?subject=' + encodeURIComponent('Website enquiry from ' + form.name.value) +
        '&body=' + encodeURIComponent(body);
    });
  }

  // Photo gallery: a carousel with a filmstrip, and a lightbox for full size.
  var stage = document.querySelector('#stage');
  if (stage) {
    var track = document.querySelector('#stage-track');
    var slides = [].slice.call(track.querySelectorAll('.stage-slide'));
    var films = [].slice.call(document.querySelectorAll('.filmstrip .film'));
    var counter = document.querySelector('#stage-counter');
    var caption = document.querySelector('#stage-text');
    var lb = document.querySelector('#lightbox');
    var current = 0;

    // Only fetch the full-size images near the one being viewed.
    function hydrate(i) {
      [i - 1, i, i + 1].forEach(function (n) {
        var slide = slides[(n + slides.length) % slides.length];
        var img = slide && slide.querySelector('img');
        if (img && !img.getAttribute('src')) {
          img.setAttribute('src', img.getAttribute('data-src'));
        }
      });
    }

    function show(i) {
      current = (i + slides.length) % slides.length;
      hydrate(current);
      // Centre the active slide in the viewport.
      var slideWidth = slides[0].getBoundingClientRect().width;
      var viewport = track.parentElement.getBoundingClientRect().width;
      var offset = (viewport / 2) - (slideWidth / 2) - (current * slideWidth);
      track.style.transform = 'translateX(' + offset + 'px)';

      slides.forEach(function (s, n) { s.classList.toggle('is-active', n === current); });
      films.forEach(function (f, n) { f.classList.toggle('is-active', n === current); });

      var img = slides[current].querySelector('img');
      caption.textContent = img.getAttribute('alt');
      counter.textContent = (current + 1) + ' / ' + slides.length;

      var film = films[current];
      if (film && film.scrollIntoView) {
        film.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      }
    }

    stage.querySelector('.stage-prev').addEventListener('click', function () { show(current - 1); });
    stage.querySelector('.stage-next').addEventListener('click', function () { show(current + 1); });
    films.forEach(function (f, n) {
      f.addEventListener('click', function () { show(n); });
    });

    // Swipe on touch devices.
    var startX = null;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });

    // Clicking the active photograph opens it full size.
    slides.forEach(function (s, n) {
      s.addEventListener('click', function () {
        if (n !== current) { show(n); return; }
        if (!lb) return;
        openLightbox();
      });
    });

    function openLightbox() {
      var img = slides[current].querySelector('img');
      lb.querySelector('#lb-img').src = img.getAttribute('src') || img.getAttribute('data-src');
      lb.querySelector('#lb-img').alt = img.getAttribute('alt');
      lb.querySelector('#lb-caption').textContent = img.getAttribute('alt');
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lb-close').focus();
    }

    function closeLightbox() {
      lb.hidden = true;
      lb.querySelector('#lb-img').src = '';
      document.body.style.overflow = '';
      slides[current].querySelector('img').focus && slides[current].querySelector('img').focus();
    }

    if (lb) {
      lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
      lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); openLightbox(); });
      lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); openLightbox(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    }

    document.addEventListener('keydown', function (e) {
      var open = lb && !lb.hidden;
      if (e.key === 'Escape' && open) { closeLightbox(); return; }
      if (e.key === 'ArrowLeft') { show(current - 1); if (open) openLightbox(); }
      else if (e.key === 'ArrowRight') { show(current + 1); if (open) openLightbox(); }
    });

    window.addEventListener('resize', function () { show(current); });
    show(0);
  }

  // Cookie notice. The chat widget is third-party and sets cookies, so it is
  // not loaded until someone accepts. Declining loads nothing at all.
  var notice = document.querySelector('#cookie-notice');
  if (notice) {
    var KEY = 'po-cookie-consent';

    function loadChat() {
      var src = notice.getAttribute('data-tawk-src');
      if (!src || window.Tawk_API) return;
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      var s1 = document.createElement('script'), s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = src;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    }

    function remember(value) {
      try { localStorage.setItem(KEY, value); } catch (e) { /* private mode */ }
    }

    var choice = null;
    try { choice = localStorage.getItem(KEY); } catch (e) { /* private mode */ }

    if (choice === 'accepted') {
      loadChat();
    } else if (choice !== 'declined') {
      notice.hidden = false;
    }

    notice.querySelector('[data-cookie-accept]').addEventListener('click', function () {
      remember('accepted');
      notice.hidden = true;
      loadChat();
    });
    notice.querySelector('[data-cookie-decline]').addEventListener('click', function () {
      remember('declined');
      notice.hidden = true;
    });
  }
})();
