/**
 * content-injector.js — Applies text from site-content.js to the page
 * 
 * Runs ONCE on DOMContentLoaded. No MutationObserver, no loops, no conflicts.
 * 
 * This script searches the DOM for specific text content and replaces it
 * with the values from NOVELLE_CONTENT config. Only specified text is changed;
 * all design, layout, and animations remain untouched.
 */
(function() {
  'use strict';

  // Wait for config to be available
  var config = window.NOVELLE_CONTENT;
  if (!config) {
    console.warn('[content-injector] NOVELLE_CONTENT not found. Skipping.');
    return;
  }

  /**
   * Replace text content in elements matching a selector or containing specific text.
   * Only replaces the text node, preserving all child elements and styles.
   */
  function replaceText(oldText, newText) {
    if (!oldText || !newText || oldText === newText) return 0;
    
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    var count = 0;
    var node;
    while (node = walker.nextNode()) {
      if (node.nodeValue && node.nodeValue.trim() === oldText.trim()) {
        node.nodeValue = newText;
        count++;
      }
    }
    return count;
  }

  /**
   * Apply footer content
   */
  function applyFooterContent() {
    var f = config.footer;
    if (!f) return;

    // Replace copyright text (e.g., "© 2026 Dermato. All rights reserved")
    if (f.copyright) {
      replaceText('© 2026\u00A0Dermato. All rights reserved', f.copyright);
      replaceText('© 2026 Dermato. All rights reserved', f.copyright);
    }
  }

  /**
   * Apply meta/title content
   */
  function applyMetaContent() {
    var m = config.meta;
    if (!m) return;

    if (m.siteTitle) {
      document.title = m.siteTitle;
    }
  }

  // ─── Run on page load ────────────────────────────────

  function init() {
    applyMetaContent();
    applyFooterContent();
    
    console.log('[content-injector] Content applied from site-content.js');
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
