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

  // Photo gallery lightbox. Only runs on the gallery page.
  var lb = document.querySelector('#lightbox');
  var tiles = [].slice.call(document.querySelectorAll('.gallery .tile'));
  if (lb && tiles.length) {
    var lbImg = lb.querySelector('#lb-img');
    var lbCap = lb.querySelector('#lb-caption');
    var current = 0;
    var lastFocused = null;

    function show(i) {
      current = (i + tiles.length) % tiles.length;
      var t = tiles[current];
      lbImg.src = t.getAttribute('data-full');
      lbImg.alt = t.getAttribute('data-caption');
      lbCap.textContent = t.getAttribute('data-caption');
    }

    function open(i) {
      lastFocused = document.activeElement;
      show(i);
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lb-close').focus();
    }

    function close() {
      lb.hidden = true;
      lbImg.src = '';
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    tiles.forEach(function (t, i) {
      t.addEventListener('click', function () { open(i); });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });
  }
})();
