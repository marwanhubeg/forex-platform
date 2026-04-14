document.addEventListener('DOMContentLoaded', function() {
    const exnessLink = document.querySelector('a[href*="exness"]');
    if (exnessLink) {
        exnessLink.addEventListener('click', function() {
            let clicks = localStorage.getItem('exness_clicks') || 0;
            clicks = parseInt(clicks) + 1;
            localStorage.setItem('exness_clicks', clicks);
            console.log(`📊 Exness clicks: ${clicks}`);
        });
    }
});
