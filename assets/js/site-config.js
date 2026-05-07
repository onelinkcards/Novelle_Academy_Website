/**
 * Central editable config for the static site export.
 * Change values here instead of editing multiple scripts.
 */
(function() {
  // Auto-detect relative root
  var path = window.location.pathname;
  var root = './';
  if (path.indexOf('/courses/') !== -1) root = '../';
  
  window.NOVELLE_SITE_CONFIG = {
    routing: {
      origin: "https://dermato-wbs.framer.website",
      allowed: ["https://dermato-wbs.framer.website/"],
      currentPath: path,
      relativeRoot: root
    },
    branding: {
      wordmark: root + "Logo%20Novelle/pngs/wordmark%20_%20gradient@4x.png",
      logomark: root + "Logo%20Novelle/pngs/gradient_logomark@4x.png",
      buttonLogomark: root + "Logo%20Novelle/pngs/gradient_logomark@4x.png",
      buttonIconScale: 1
    },
    assets: {
      faviconLight: root + "Logo%20Novelle/pngs/gradient_logomark@4x.png",
      faviconDark: root + "Logo%20Novelle/pngs/gradient_logomark@4x.png",
      appleTouchIcon: root + "Logo%20Novelle/pngs/gradient_logomark@4x.png",
      ogImage: root + "Logo%20Novelle/pngs/wordmark%20_%20gradient@4x.png",
      twitterImage: root + "Logo%20Novelle/pngs/wordmark%20_%20gradient@4x.png"
    }
  };

  // Helper to get absolute path from relative site root
  function getAssetPath(relPath) {
    var root = window.NOVELLE_SITE_CONFIG.routing.relativeRoot || './';
    return root + relPath;
  }

  // Update branding paths to use the helper
  var b = window.NOVELLE_SITE_CONFIG.branding;
  b.wordmark = getAssetPath(b.wordmark);
  b.logomark = getAssetPath(b.logomark);
  b.buttonLogomark = getAssetPath(b.buttonLogomark);

  var a = window.NOVELLE_SITE_CONFIG.assets;
  for (var key in a) {
    a[key] = getAssetPath(a[key]);
  }

  function setAttr(selector, attr, value) {
    if (!value) return;
    var node = document.querySelector(selector);
    if (node) node.setAttribute(attr, value);
  }

  function applyHeadAssets() {
    var assets = window.NOVELLE_SITE_CONFIG && window.NOVELLE_SITE_CONFIG.assets;
    if (!assets) return;

    setAttr('link[rel="icon"][media*="light"]', "href", assets.faviconLight);
    setAttr('link[rel="icon"][media*="dark"]', "href", assets.faviconDark);
    setAttr('link[rel="apple-touch-icon"]', "href", assets.appleTouchIcon);
    setAttr('meta[property="og:image"]', "content", assets.ogImage);
    setAttr('meta[name="twitter:image"]', "content", assets.twitterImage);
  }

  applyHeadAssets();
})();
