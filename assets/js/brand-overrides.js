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
        var alt = (img.getAttribute('alt') || '').toLowerCase();
        if (isLargeMedia || alt.indexOf('about image') !== -1 || alt.indexOf('skin') !== -1) return;

        if ((width <= 40 && height <= 40) || looksLikeFramerIcon || !src) {
          // Skip icons that look like slider arrows (prev/next)
          var alt = (img.getAttribute('alt') || '').toLowerCase();
          if (alt.indexOf('prev') !== -1 || alt.indexOf('next') !== -1 || alt.indexOf('arrow') !== -1) return;

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
      var alt = (img.getAttribute('alt') || '').toLowerCase();
      if (alt.indexOf('about image') !== -1 || alt.indexOf('skin') !== -1) return;
      
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
      'aesthetic treatments': 'Courses',
      'why patients choose us': 'WHY STUDENTS CHOOSE NOVELLE',
      'care that puts your child first': 'Aesthetic Leaders Start Here',
      'step inside the novelle experience': 'Step Inside The Al Novelle Experience',
      '12 weeks': 'Abu Dhabi, UAE',
      'acne treatment': 'Est. 2026',
      'skin analysis': 'Guided by Expert Faculty',
      'expert consultation at no cost': 'Learn through structured guidance from experienced aesthetic and laser educators who bring clinical knowledge, safety protocols, and professional training into every programme.',
      'seamless client experience': 'Mastering The Art Of Aesthetics',
      'al novelle brings together beauty therapy, clinical aesthetics, laser technologies, and international training standards to prepare confident professionals for the modern aesthetics industry.': 'Al Novelle brings together beauty therapy, clinical aesthetics, laser technologies, and international training standards to prepare confident professionals for the modern aesthetics industry.',
      '10+': '2',
      'years of medical excellence': 'International Accreditations',
      '2,000+ procedures': 'CIBTAC UK Certified',
      '50+ treatments': 'NCLC USA Certified',
      '99%': '14+',
      '2k+ global trusted customers': 'Professional Programmes. Across beauty therapy, laser aesthetics, semi-permanent makeup, and body treatment education.',
      'sofia hale': 'International Standards',
      'the doctors really listened to my concerns and explained every step.': 'Programmes are designed around recognised training pathways, safety-led education, and professional development.',
      'olivia chen': 'Career-Focused Learning',
      'i was nervous about aesthetic treatments, but the results look completely natural.': 'Students are supported through practical training, guidance, CPD awareness, and industry-ready skill development.',
      'priya mehta': 'Abu Dhabi Academy',
      'professional, clean clinic with advanced technology. the laser treatment was comfortable, and the results.': 'Located in Al Zahiyah, Al Novelle is built for learners seeking premium aesthetic education in the UAE.',
      'daniel brooks': 'Hands-On Practice',
      'from consultation to follow-up, the care was exceptional. my skin texture and tone have improved noticeably.': 'Students gain extensive hands-on experience in our fully equipped clinic to ensure readiness for professional practice.',
      'actress': 'Curriculum',
      'creative director': 'Support',
      'product manager': 'Campus',
      'entrepreneur': 'Training',
      'request an appointment': 'Speak With Our Admissions Team',
      'fill out the form below, and we’ll contact you shortly.': 'Choose the programme that matches your goals in beauty therapy, laser technologies, clinical aesthetics, or advanced skin education.',
      'therapy*': 'Programme of Interest*',
      'acne care': 'Beauty Therapy',
      'skin consultation': 'Semi-Permanent Makeup',
      'i agree to allow the clinic to contact me regarding my appointment.': 'I agree to allow the academy to contact me regarding enrolment.',
      'book now': 'Enrol Now',
      'services': 'Courses',
      'our services': 'Our Courses',
      'service': 'Course',
      'our service': 'Our Course',
      'aesthetic treatments': 'Courses',
      'explore our services': 'Explore Our Courses'
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
          // Special case for "Courses" title
          if (text === 'aesthetic treatments') {
             child.nodeValue = 'Courses';
          }
        }
      }
    });
  }

  function forceLinkFixes() {
    document.querySelectorAll('a').forEach(function(a) {
      var text = (a.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      var href = a.getAttribute('href') || '';
      
      if (
        text.indexOf('explore course') !== -1 || 
        text.indexOf('view detail') !== -1 || 
        text === 'courses' ||
        text === 'services' ||
        text === 'service' ||
        href.indexOf('/service/') !== -1 || 
        href.indexOf('/treatments/') !== -1 ||
        href.indexOf('javascript:void(0)') !== -1 && text.indexOf('course') !== -1
      ) {
        if (a.getAttribute('href') !== './courses.html' && a.getAttribute('href') !== 'courses.html') {
          a.setAttribute('href', './courses.html');
          a.setAttribute('target', '_self');
          a.onclick = function(e) {
             e.preventDefault();
             e.stopPropagation();
             window.location.href = './courses.html';
             return false;
          };
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
        text.indexOf('explore course') !== -1 ||
        text.indexOf('enrol now') !== -1 ||
        text === 'courses' ||
        text === 'services' ||
        text === 'service' ||
        href.indexOf('/service/') !== -1 || 
        href.indexOf('/treatments/') !== -1
      ) {
        // Only override if it isn't already courses.html to prevent infinite loops
        if (href !== './courses.html' && href !== 'courses.html' && href !== '/courses.html') {
          a.setAttribute('href', './courses.html');
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

  // Global listener to hijack ANY click that looks like it should go to courses
  function setupGlobalLinkHijack() {
    var handler = function(e) {
      var target = e.target.closest('a');
      if (!target) return;

      var text = (target.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      var href = (target.getAttribute('href') || '').toLowerCase();

      if (
        text.indexOf('explore course') !== -1 || 
        text.indexOf('view detail') !== -1 || 
        text === 'courses' ||
        text === 'services' ||
        text === 'service' ||
        href.indexOf('/service/') !== -1 || 
        href.indexOf('/treatments/') !== -1 ||
        (href.indexOf('javascript:void(0)') !== -1 && (text.indexOf('course') !== -1 || text.indexOf('service') !== -1))
      ) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        window.location.href = './courses.html';
        return false;
      }
    };

    // Hijack on mousedown (earliest possible) and click
    window.addEventListener('mousedown', handler, { capture: true });
    window.addEventListener('click', handler, { capture: true });
    
    // Periodically force link fixes for dynamically rendered elements
    setInterval(forceLinkFixes, 1000);
  }

  function updateFooterDetails() {
    var footerReplacements = {
      '123 medical plaza, suite 200 new york, ny 10001': '1001, LAVG Building, Al Zahiyah (16), Abu Dhabi, UAE',
      'al zahiyah, abu dhabi, united arab emirates': '1001, LAVG Building, Al Zahiyah (16), Abu Dhabi, UAE',
      '+1 (555) 123-4567': '050 234 8625 / 050 762 9543',
      'example@gmail.com': 'drsia87@gmail.com'
    };

    document.querySelectorAll('.footer-contact p, .site-footer p, footer p, .framer-1l2ust5 p, span, a').forEach(function(p) {
      var t = (p.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
      for (var key in footerReplacements) {
        if (t.indexOf(key) !== -1) {
          p.textContent = footerReplacements[key];
        }
      }
      
      // Remove "Designed by Repixelx Studio"
      if (t.indexOf('designed by repixelx') !== -1 || t.indexOf('powered by') !== -1) {
        var host = p.closest('div') || p;
        if (t.length < 100) { // Ensure we don't remove a whole paragraph if it's just a small credits line
            p.style.display = 'none';
        }
      }
    });

    // Add Training Hours if not present
    var footerContainer = document.querySelector('.framer-1l2ust5');
    if (footerContainer && !document.getElementById('novelle-training-hours')) {
        var hoursDiv = document.createElement('div');
        hoursDiv.id = 'novelle-training-hours';
        hoursDiv.style.marginTop = '20px';
        hoursDiv.style.color = 'inherit';
        hoursDiv.innerHTML = '<h4 style="margin-bottom: 8px;">Training Hours</h4><p>Sunday - Thursday<br>9:00 am - 6:00 pm</p>';
        
        // Find a good place to insert - maybe after the contact details
        var contactBlock = footerContainer.querySelector('.framer-1lxmr0d') || footerContainer;
        contactBlock.appendChild(hoursDiv);
    }

    // Special handling for the Training Hours block if it exists
    document.querySelectorAll('h4').forEach(function(h4) {
      if (h4.textContent.toLowerCase().indexOf('get in touch') !== -1) {
         // Maybe add training hours below?
      }
    });
  }

  function disableProgrammesAccordion() {
    // Logic removed to restore original accordion behavior as requested
  }

  function injectGlobalStyles() {
    var styleId = 'novelle-global-overrides';
    if (document.getElementById(styleId)) return;

    var css = `
      /* Global fixes */
      img[alt="About Image"] {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      /* Force footer links to brand brown */
      footer a, .site-footer a, [data-framer-name*="Footer"] a, .framer-1l2ust5 a, .framer-1l2ust5 p {
        color: #4A3728 !important;
        text-decoration: none !important;
      }
    `;

    var style = document.createElement('style');
    style.id = styleId;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function fixBentoGridHeights() {
    // Only target the specific "Step Inside" bento card to avoid breaking other sections
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span').forEach(function(node) {
      var t = (node.textContent || '').trim().toLowerCase();
      if (t.indexOf('step inside the al novelle experience') !== -1) {
        var card = node.closest('.framer-14j678y') || node.closest('[data-framer-name="Card"]');
        if (card) {
          card.style.setProperty('height', '491.5px', 'important'); 
          card.style.setProperty('min-height', '491.5px', 'important');
        }
      }
    });
  }

  function restoreHandImages() {
    var leftHandOrig = 'https://framerusercontent.com/images/n8OzbYcYaueWCQCfguvevnR3o.png';
    var rightHandOrig = 'https://framerusercontent.com/images/wvDPYhnwJe8k3MekkKP9OyZlICg.png';
    
    document.querySelectorAll('img').forEach(function(img) {
      var src = img.getAttribute('src') || '';
      var alt = (img.getAttribute('alt') || '').toLowerCase();
      
      if (src.indexOf('unsplash.com') !== -1 || src.indexOf('images.unsplash.com') !== -1) {
        if (alt.indexOf('left hand') !== -1) {
          img.setAttribute('src', leftHandOrig);
          img.setAttribute('srcset', leftHandOrig);
        } else if (alt.indexOf('right hand') !== -1) {
          img.setAttribute('src', rightHandOrig);
          img.setAttribute('srcset', rightHandOrig);
        }
      }
    });
  }

  function fixReviews() {
    var reviewReplacements = [
      { from: /the doctors really listened/i, to: 'Programmes are designed around recognised training pathways, safety-led education, and professional development.' },
      { from: /i was nervous about aesthetic/i, to: 'Students are supported through practical training, guidance, CPD awareness, and industry-ready skill development.' },
      { from: /professional, clean clinic/i, to: 'Located in Al Zahiyah, Al Novelle is built for learners seeking premium aesthetic education in the UAE.' },
      { from: /from consultation to follow-up/i, to: 'Students gain extensive hands-on experience in our fully equipped clinic to ensure readiness for professional practice.' }
    ];

    document.querySelectorAll('p, span').forEach(function(node) {
      if (node.children.length > 0) return;
      var t = (node.textContent || '').trim();
      reviewReplacements.forEach(function(r) {
        if (r.from.test(t)) {
          node.textContent = r.to;
        }
      });
    });
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
    updateFooterDetails();
    fixBentoGridHeights();
    restoreHandImages();
    fixReviews();
    setupGlobalLinkHijack();
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
