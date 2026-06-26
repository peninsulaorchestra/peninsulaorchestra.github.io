// Mobile nav toggle
(function () {
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
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = encodeURIComponent(form.name.value || '');
      var email = encodeURIComponent(form.email.value || '');
      var message = encodeURIComponent(form.message.value || '');
      var body = 'From: ' + decodeURIComponent(name) +
        ' (' + decodeURIComponent(email) + ')\n\n' + decodeURIComponent(message);
      window.location.href = 'mailto:info@peninsula-orchestra.com' +
        '?subject=' + encodeURIComponent('Website enquiry from ' + form.name.value) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();
