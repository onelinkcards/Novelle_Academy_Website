/**
 * Brand overrides:
 * - Removes Framer "Get it for FREE" badge
 * - Replaces site wordmark and button icons with configured brand assets
 */
(function() {
  var cfg = window.NOVELLE_SITE_CONFIG || {};
  var branding = cfg.branding || {};
  var wordmark = branding.wordmark;
  var logomark = branding.logomark;
  var buttonLogomark = branding.buttonLogomark || logomark;
  var buttonIconScale = typeof branding.buttonIconScale === 'number' ? branding.buttonIconScale : 1.1;
  var knownWordmarkSources = [
    'lYzB9UOrA0jSGK5Bjz1ao7IsH60.svg',
    'sCtHsVXTYzYfLElkCb3pemCxWfc.svg',
    'WTmTjOpsuX2YnTdKMYJEoXSISk.svg'
  ];

  function isKnownWordmarkSrc(src) {
    return knownWordmarkSources.some(function(token) {
      return src.indexOf(token) !== -1;
    });
  }

  function isConfiguredWordmarkSrc(src) {
    if (!wordmark || !src) return false;
    var normalized = String(wordmark).split('/').pop();
    return src.indexOf(normalized) !== -1 || src.indexOf('wordmark%20_%20gradient@4x.png') !== -1 || src.indexOf('wordmark _ gradient@4x.png') !== -1;
  }

  function isInExploreTreatmentsBlock(el) {
    var cur = el;
    while (cur && cur !== document.body) {
      var t = (cur.textContent || '').toLowerCase();
      if (t.indexOf('explore our treatments') !== -1) return true;
      cur = cur.parentElement;
    }
    return false;
  }

  function swapMainWordmark() {
    if (!wordmark) return;

    document.querySelectorAll('img').forEach(function(img) {
      var src = img.getAttribute('src') || '';
      if (!src) return;
      if (isKnownWordmarkSrc(src)) {
        img.setAttribute('src', wordmark);
      }
    });
  }

  function swapButtonIcons() {
    if (!buttonLogomark) return;
    document.querySelectorAll('a, button, [role="button"]').forEach(function(host) {
      host.querySelectorAll('img').forEach(function(img) {
        var rect = img.getBoundingClientRect ? img.getBoundingClientRect() : null;
        var width = rect ? rect.width : (parseFloat(img.getAttribute('width')) || 0);
        var height = rect ? rect.height : (parseFloat(img.getAttribute('height')) || 0);
        var src = img.getAttribute('src') || '';
        var looksLikeFramerIcon = src.indexOf('framerusercontent.com/images/') !== -1;

        // Replace icon-like assets in clickable elements.
        // Skip clearly large media images.
        var isLargeMedia = width > 80 || height > 80;
        if (isLargeMedia) return;

        if ((width <= 40 && height <= 40) || looksLikeFramerIcon || !src) {
          img.setAttribute('src', buttonLogomark);
          img.setAttribute('data-novelle-button-icon', 'true');
          img.style.objectFit = 'contain';
          img.style.transformOrigin = 'center center';
          img.style.transform = 'scale(' + buttonIconScale + ')';
          img.style.maxWidth = 'none';
          img.style.maxHeight = 'none';

          var wrapper = img.closest('[data-framer-background-image-wrapper]');
          if (wrapper) wrapper.style.overflow = 'visible';
          if (img.parentElement) img.parentElement.style.overflow = 'visible';
        }
      });
    });
  }

  function forceReplaceFramerIconsInButtons() {
    if (!buttonLogomark) return;
    document.querySelectorAll('a img[src*="framerusercontent.com/images/"], button img[src*="framerusercontent.com/images/"], [role="button"] img[src*="framerusercontent.com/images/"]').forEach(function(img) {
      img.setAttribute('src', buttonLogomark);
      img.setAttribute('data-novelle-button-icon', 'true');
      img.style.objectFit = 'contain';
      img.style.transformOrigin = 'center center';
      img.style.transform = 'scale(' + buttonIconScale + ')';
    });
  }

  function fixExploreTreatmentsCenterIcon() {
    if (!logomark) return;

    document.querySelectorAll('img').forEach(function(img) {
      if (!isInExploreTreatmentsBlock(img)) return;

      var alt = (img.getAttribute('alt') || '').toLowerCase();
      var rect = img.getBoundingClientRect ? img.getBoundingClientRect() : null;
      var width = rect ? rect.width : (parseFloat(img.getAttribute('width')) || 0);
      var height = rect ? rect.height : (parseFloat(img.getAttribute('height')) || 0);

      // Target the small center icon in this block.
      if (!(alt.indexOf('icon') !== -1 || (width > 20 && width <= 40 && height > 20 && height <= 40))) {
        return;
      }

      img.setAttribute('src', logomark);
      img.style.objectFit = 'contain';
      img.style.objectPosition = 'center center';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.transformOrigin = 'center center';
      img.style.transform = 'scale(1)';
      img.style.position = 'relative';
      img.style.zIndex = '2';

      var wrapper = img.closest('[data-framer-background-image-wrapper]');
      if (wrapper) {
        wrapper.style.overflow = 'visible';
        wrapper.style.zIndex = '2';
      }
      if (img.parentElement) {
        img.parentElement.style.overflow = 'visible';
        img.parentElement.style.zIndex = '2';
      }
    });
  }

  function removeFreeBadge() {
    var selectors = [
      '[data-framer-badge]',
      'a[href*="framer.com"]',
      'a[href*="framer.website"]',
      'div[style*="position: fixed"]',
      'a[style*="position: fixed"]'
    ];

    selectors.forEach(function(selector) {
      document.querySelectorAll(selector).forEach(function(node) {
        var text = (node.textContent || '').trim().toLowerCase();
        var aria = (node.getAttribute('aria-label') || '').trim().toLowerCase();
        var combined = text + ' ' + aria;
        if (
          combined.indexOf('get it for free') !== -1 ||
          combined.indexOf('framer') !== -1
        ) {
          node.remove();
        }
      });
    });

    // Hard remove exact "Get it for FREE" badge even if it has no Framer markers.
    document.querySelectorAll('a, button, div, span, p').forEach(function(node) {
      var text = (node.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (text !== 'get it for free') return;

      var badge =
        node.closest('a,button,[role="button"],[data-framer-name],[style*="position: fixed"],[style*="position:fixed"]') ||
        node.parentElement;
      if (badge) {
        badge.remove();
      } else {
        node.remove();
      }
    });
  }

  function removeTreatmentSectionSideWordmarks() {
    // Remove only side decorative wordmarks near "Explore our treatments".
    document.querySelectorAll('img').forEach(function(img) {
      if (!isInExploreTreatmentsBlock(img)) return;
      if (img.closest('a,button')) return;

      var src = img.getAttribute('src') || '';
      if (!(isKnownWordmarkSrc(src) || isConfiguredWordmarkSrc(src))) return;

      var wrapper = img.closest('[data-framer-background-image-wrapper]');
      if (wrapper) {
        wrapper.style.display = 'none';
      } else {
        img.style.display = 'none';
      }
    });
  }

  function removeExplicitWordmarkBadges() {
    // Remove decorative wordmark images (the two side logos user requested).
    document.querySelectorAll('img[src*="wordmark%20_%20gradient@4x.png"], img[src*="wordmark _ gradient@4x.png"]').forEach(function(img) {
      var widthAttr = parseFloat(img.getAttribute('width') || '0');
      var heightAttr = parseFloat(img.getAttribute('height') || '0');

      // Target the small decorative pair without touching other large brand usage.
      if (Math.round(widthAttr) === 97 && Math.round(heightAttr) === 49) {
        if (img.closest('a,button')) return;
        var wrapper = img.closest('[data-framer-background-image-wrapper]');
        if (wrapper) {
          // Keep spacing intact; hide only the visual.
          wrapper.style.visibility = 'hidden';
          wrapper.style.opacity = '0';
          wrapper.style.pointerEvents = 'none';
        } else {
          img.style.visibility = 'hidden';
          img.style.opacity = '0';
          img.style.pointerEvents = 'none';
        }
      }
    });
  }

  function removeResidualPromoElements() {
    // Hard-target leftover Framer promo badge/link variants.
    var selectors = [
      'a.framer-1x1xh',
      '[class*="framer-1x1xh"]',
      'a[aria-label="Icon"]',
      'a[href*="framer.com"]',
      'a[href*="framer.website"]'
    ];

    selectors.forEach(function(selector) {
      document.querySelectorAll(selector).forEach(function(node) {
        var text = (node.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
        var href = (node.getAttribute('href') || '').toLowerCase();
        var cls = (node.className || '').toString().toLowerCase();
        var isPromo =
          text.indexOf('get it for free') !== -1 ||
          text.indexOf('framer') !== -1 ||
          href.indexOf('framer.com') !== -1 ||
          href.indexOf('framer.website') !== -1 ||
          cls.indexOf('framer-1x1xh') !== -1;

        if (!isPromo) return;

        var fixedHost = node.closest('[style*="position: fixed"], [style*="position:fixed"]');
        if (fixedHost) fixedHost.remove();
        else node.remove();
      });
    });
  }

  function runAll() {
    swapMainWordmark();
    swapButtonIcons();
    forceReplaceFramerIconsInButtons();
    fixExploreTreatmentsCenterIcon();
    removeFreeBadge();
    removeTreatmentSectionSideWordmarks();
    removeExplicitWordmarkBadges();
    removeResidualPromoElements();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll, { once: true });
  } else {
    runAll();
  }

  // Keep enforcing for runtime-injected elements.
  var observer = new MutationObserver(function() {
    runAll();
  });
  if (document.documentElement) {
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
