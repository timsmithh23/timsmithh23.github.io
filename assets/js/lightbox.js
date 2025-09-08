// Simple site-wide lightbox for article images
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // Inject overlay container once
  var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
  overlay.setAttribute('tabindex', '-1');
  overlay.innerHTML = '\n      <div class="close-area" aria-label="Close"></div>\n      <img alt="Expanded image" />\n    ';
    document.body.appendChild(overlay);

    var overlayImg = overlay.querySelector('img');
    var closeArea = overlay.querySelector('.close-area');

    function open(src, alt) {
      overlayImg.src = src;
      overlayImg.alt = alt || 'Expanded image';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      overlay.focus({ preventScroll: true });
    }

    function close() {
      overlay.classList.remove('open');
      overlayImg.src = '';
      document.body.style.overflow = '';
    }

    closeArea.addEventListener('click', close);
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
    overlayImg.addEventListener('click', close);

    // Target images inside article content
    var contentSelectors = [
      'main img',
      '.page-content img',
      '.main-content img',
      '.post-content img',
      '.content img'
    ];
    var imgs = document.querySelectorAll(contentSelectors.join(','));
    imgs.forEach(function (img) {
      // Skip images that should not be lightboxed
      if (img.dataset.noLightbox === 'true') return;
      img.classList.add('lightbox-img');
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.addEventListener('click', function () {
        // Prefer high-res from data-full or parent link, else src
        var src = img.getAttribute('data-full') || img.src;
        var alt = img.alt || '';
        open(src, alt);
      });
    });
  });
})();
