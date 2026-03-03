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

// Copy heading anchor link to clipboard on click
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    document.querySelectorAll('a.anchor-heading').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var hash = anchor.getAttribute('href');
        history.pushState(null, '', hash);
        var url = window.location.href;
        navigator.clipboard.writeText(url).then(function () {
          var tooltip = document.createElement('span');
          tooltip.textContent = 'Link copied!';
          tooltip.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;background:#333;color:#fff;padding:0.4rem 0.8rem;border-radius:4px;font-size:0.8rem;z-index:9999;opacity:1;transition:opacity 0.4s ease;';
          document.body.appendChild(tooltip);
          setTimeout(function () {
            tooltip.style.opacity = '0';
            setTimeout(function () { tooltip.remove(); }, 400);
          }, 1500);
        });
      });
    });
  });
})();
