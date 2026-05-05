/**
 * Framer Interactive Video Polyfill
 * Manages video playback states in static exports where massive grids of autoplaying
 * videos would otherwise cause iOS Safari to crash or drain memory.
 * Pauses off-screen videos, and mimics hover-to-play functionality for gallery videos.
 */
(function() {
    window.addEventListener('DOMContentLoaded', function() {
        var videos = document.querySelectorAll('video');
        if (videos.length === 0) return;

        // 1. Memory Management: Pause videos when they are fully off-screen
        if (window.IntersectionObserver) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    var vid = entry.target;
                    // Ignore explicitly paused videos waiting for hover
                    if (vid.dataset.nceHoverInit === 'true') return;

                    if (entry.isIntersecting) {
                        try {
                            if (vid.paused && vid.hasAttribute('autoplay')) vid.play();
                        } catch (e) {} // Handle play() promise rejections
                    } else {
                        try {
                            if (!vid.paused) vid.pause();
                        } catch (e) {}
                    }
                });
            }, {
                // Pad margin so they start playing slightly before entering frame
                rootMargin: '100px 0px'
            });

            videos.forEach(function(v) { observer.observe(v); });
        }

        // 2. Hover Interactions: Identify videos that likely demand user-interaction
        videos.forEach(function(vid) {
            // Check if the video is wrapped in an interactive anchor or component named "hover"
            var container = vid.closest('a') || vid.closest('[data-framer-name*="Hover"]') || vid.closest('[data-framer-component-type="Hover"]');

            if (container) {
                // If it's deemed a hover-video, explicitly strip autoplay and set baseline to paused
                vid.dataset.nceHoverInit = 'true';
                vid.removeAttribute('autoplay');
                vid.pause();

                container.addEventListener('mouseenter', function() {
                    try { vid.play(); } catch (e) {}
                });

                container.addEventListener('mouseleave', function() {
                    try {
                        vid.pause();
                        vid.currentTime = 0; // Reset to frame 1 common for grid scrubbers
                    } catch (e) {}
                });
            }
        });
    });
})();
