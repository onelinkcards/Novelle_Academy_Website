# Edit Guide (No Design Break)

Use these files for safe edits without touching generated Framer markup:

- `assets/js/site-config.js`
  - `routing.origin`: original website base.
  - `routing.allowed`: exported internal pages list.
  - `branding.wordmark`: main logo image path.
  - `branding.logomark`: icon image path used in buttons.
  - `assets.faviconLight`, `assets.faviconDark`, `assets.appleTouchIcon`.
  - `assets.ogImage`, `assets.twitterImage`.
- `assets/js/link-routing.js`
  - Internal/external link behavior for static export.
- `assets/js/video-polyfill.js`
  - Video autoplay/hover optimization behavior.
- `assets/js/brand-overrides.js`
  - Removes Framer "Get it for FREE" badge.
  - Applies configured wordmark/logomark to UI.

## Recommended workflow

1. Change values in `assets/js/site-config.js` first.
2. Only if needed, adjust behavior scripts in `assets/js/*.js`.
3. Avoid editing long generated CSS/HTML blocks in `index.html`.
4. Test at `http://localhost:5500` with hard refresh.
