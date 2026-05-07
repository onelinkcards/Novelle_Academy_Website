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

  function overrideCourseTexts() {
    var textMap = {
      'acne & skin health': 'Beauty Therapy Diplomas',
      'personalized dermatology care for acne, pigmentation, and long-term skin maintenance.': 'CIBTAC-accredited Level 1 to Level 3 pathways covering beauty therapy, skin science, client care, and professional practice.',
      'botox & fillers': 'Laser & Aesthetics',
      'subtle enhancements that refresh your features without changing who you are.': 'Advanced training in laser hair removal, chemical peels, microdermabrasion, electrolysis, and clinical skin science.',
      'laser treatments': 'Semi-Permanent & Skin',
      'advanced laser solutions for hair removal, pigmentation, texture, and scars clinical laser solutions.': 'Specialist education in semi-permanent makeup, pigment science, cosmeceutical skincare, consultation, and aftercare.',
      'anti-aging solutions': 'Body Treatments',
      'target lines, volume loss, dullness, and tired skin with safe, proven treatments.': 'Professional body treatment training including LPG Endermologie, EMS therapy, lymphatic drainage, and anatomy for aesthetic practitioners.',
      'view detail': 'Explore Courses',
      'explore coursess': 'Explore Courses',
      'explore course': 'Explore Courses',
      'aesthetic treatments': 'Courses'
    };

    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a').forEach(function(node) {
      if (!node.childNodes || node.childNodes.length === 0) return;
      
      // Only process elements whose direct text content matches (to avoid replacing parent elements' innerHTML entirely)
      for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if (child.nodeType === Node.TEXT_NODE) {
          var text = (child.nodeValue || '').trim().toLowerCase();
          // Normalize whitespace
          text = text.replace(/\s+/g, ' ');
          
          if (textMap[text] && child.nodeValue !== textMap[text]) {
            child.nodeValue = textMap[text];
          }
        }
      }
    });
  }

  function overrideCourseLinks() {
    document.querySelectorAll('a').forEach(function(a) {
      var text = (a.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      var href = a.getAttribute('href') || '';
      
      // If the link text contains our target buttons, or if it's a CMS link, redirect to courses.html
      if (
        text.indexOf('explore courses') !== -1 || 
        text.indexOf('view detail') !== -1 || 
        text.indexOf('explore coursess') !== -1 ||
        text.indexOf('enrol now') !== -1 ||
        href.indexOf('/service/') !== -1 || 
        href.indexOf('/treatments/') !== -1
      ) {
        // Only override if it isn't already courses.html to prevent infinite loops
        if (href !== './courses.html' && href !== 'courses.html') {
          a.setAttribute('href', './courses.html');
          // Some React/Framer routers might need this to force a hard navigation
          a.setAttribute('target', '_self');
        }
      }

      // Redirect "discover the academy" to about.html
      if (text.indexOf('discover the academy') !== -1 || text.indexOf('our approach') !== -1) {
        if (href !== './about.html' && href !== 'about.html') {
          a.setAttribute('href', './about.html');
          a.setAttribute('target', '_self');
        }
      }
    });
  }

  function disableProgrammesAccordion() {
    var accordions = document.querySelectorAll('.framer-1m85ul5'); // "Our Programmes" Accordian container
    accordions.forEach(function(acc) {
      // Find all the individual cards inside the accordion
      var cards = acc.querySelectorAll('.framer-ux5tec');
      cards.forEach(function(card) {
         if (card.dataset.accordionDisabled) return; // Only process once
         card.dataset.accordionDisabled = 'true';

         // Stop click events on the card to prevent accordion from expanding
         card.addEventListener('click', function(e) {
            // Allow the click if it's on an anchor tag (like the 'Explore Courses' button)
            var anchor = e.target.closest('a');
            if (anchor) {
                return; // Let the link work!
            }
            // Stop the accordion from expanding
            e.stopPropagation();
            e.preventDefault();
         }, true); // Use capture phase
         
         // Find and hide the plus icon.
         // In these cards, there are 2 SVGs: the left icon and the plus icon on the right.
         var svgs = card.querySelectorAll('svg');
         if (svgs.length >= 2) {
             // Keep the first SVG (left icon), hide the second one (plus icon)
             var plusSvg = svgs[svgs.length - 1];
             if (plusSvg) {
                 plusSvg.style.display = 'none';
                 // Often the SVG is inside a circle wrapper (width ~30-50px)
                 if (plusSvg.parentElement && plusSvg.parentElement.tagName === 'DIV') {
                     plusSvg.parentElement.style.opacity = '0';
                     plusSvg.parentElement.style.pointerEvents = 'none';
                 }
             }
         }
      });
    });
  }

  function injectGlobalStyles() {
    var styleId = 'novelle-global-overrides';
    if (document.getElementById(styleId)) return;

    var css = `
      /* Reduce padding for Our Approach section */
      .framer-1k8s1rt {
        padding-top: 80px !important;
        padding-bottom: 80px !important;
      }
      
      /* Bento Grid Card Styling - Targeted for the 'WHY STUDENTS CHOOSE' section */
      /* These classes match the card containers in the Bento section */
      .framer-cl45yp .framer-14j678y,
      .framer-cl45yp .framer-1395ubc,
      .framer-cl45yp .framer-bxb16n,
      .framer-cl45yp .framer-147i9cv,
      .framer-cl45yp .framer-ec5ouy,
      .framer-cl45yp .framer-an5fhm,
      .framer-cl45yp .framer-1pp0deq {
        /* Use transparent background for cards that have nested images/videos */
        background: transparent !important; 
        border: 1px solid rgba(212, 175, 55, 0.15) !important;
        box-shadow: 0 4px 20px rgba(99, 59, 44, 0.04) !important;
        transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        border-radius: 24px !important;
        overflow: hidden !important;
      }
      
      /* Specific fix for cards that were looking 'broken' due to solid background */
      .framer-cl45yp .framer-14j678y, 
      .framer-cl45yp .framer-bxb16n,
      .framer-cl45yp .framer-1pp0deq {
        background: rgba(255, 253, 249, 0.1) !important; /* Semi-transparent cream */
        backdrop-filter: blur(5px);
      }

      /* Re-styling the review/programmes ticker container to be visible */
      .framer-cl45yp .framer-1pp0deq {
        /* Keep layout as is for tickers */
      }

      .framer-cl45yp div[data-framer-name="01"]:hover,
      .framer-cl45yp div[data-framer-name="02"]:hover,
      .framer-cl45yp div[data-framer-name="Right"] > div > div:hover {
        transform: translateY(-4px) !important;
        box-shadow: 0 8px 30px rgba(99, 59, 44, 0.08) !important;
      }

      /* Fix for 2nd image box mentioned by user */
      .framer-cl45yp .framer-1395ubc {
        background: var(--token-1aa7b087-662a-4429-8851-f3e43b7c8356, rgb(255, 253, 249)) !important;
        max-height: 480px !important;
      }
    `;

    var style = document.createElement('style');
    style.id = styleId;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function runAll() {
    injectGlobalStyles();
    swapMainWordmark();
    swapButtonIcons();
    forceReplaceFramerIconsInButtons();
    fixExploreTreatmentsCenterIcon();
    removeFreeBadge();
    removeTreatmentSectionSideWordmarks();
    removeExplicitWordmarkBadges();
    removeResidualPromoElements();
    overrideCourseTexts();
    overrideCourseLinks();
    disableProgrammesAccordion();
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
