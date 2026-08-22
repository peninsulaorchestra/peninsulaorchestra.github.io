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
})();
