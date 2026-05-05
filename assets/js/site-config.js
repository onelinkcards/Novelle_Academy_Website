/**
 * Central editable config for the static site export.
 * Change values here instead of editing multiple scripts.
 */
(function() {
  window.NOVELLE_SITE_CONFIG = {
    routing: {
      origin: "https://dermato-wbs.framer.website",
      allowed: ["https://dermato-wbs.framer.website/"],
      currentPath: "/",
      relativeRoot: "./"
    },
    branding: {
      wordmark: "./Logo%20Novelle/pngs/wordmark%20_%20gradient@4x.png",
      logomark: "./Logo%20Novelle/pngs/gradient_logomark@4x.png",
      buttonLogomark: "./Logo%20Novelle/pngs/gradient_logomark@4x.png",
      buttonIconScale: 1
    },
    assets: {
      faviconLight: "./Logo%20Novelle/pngs/gradient_logomark@4x.png",
      faviconDark: "./Logo%20Novelle/pngs/gradient_logomark@4x.png",
      appleTouchIcon: "./Logo%20Novelle/pngs/gradient_logomark@4x.png",
      ogImage: "./Logo%20Novelle/pngs/wordmark%20_%20gradient@4x.png",
      twitterImage: "./Logo%20Novelle/pngs/wordmark%20_%20gradient@4x.png"
    }
  };

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
