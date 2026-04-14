// =====================================================
// تحسينات SEO إضافية
// =====================================================

// إضافة breadcrumbs تلقائية
function addBreadcrumbs() {
    const path = window.location.pathname;
    const breadcrumbContainer = document.querySelector('.breadcrumbs');
    
    if (!breadcrumbContainer && !path.includes('index.html') && path !== '/') {
        const nav = document.querySelector('nav');
        if (nav) {
            const breadDiv = document.createElement('div');
            breadDiv.className = 'breadcrumbs container';
            breadDiv.style.cssText = 'padding: 10px 20px; font-size: 0.8rem; color: var(--text-muted);';
            
            const paths = path.split('/').filter(p => p && !p.includes('.html'));
            let breadHtml = '<a href="/" style="color: var(--primary);">الرئيسية</a>';
            let currentPath = '';
            
            paths.forEach((p, i) => {
                currentPath += '/' + p;
                const name = p === 'content' ? 'المحتوى' : 
                            p === 'pages' ? 'الصفحات' :
                            p === 'articles' ? 'المقالات' :
                            p === 'analysis' ? 'تحليلات' : p;
                breadHtml += ` / <span>${name}</span>`;
            });
            
            breadDiv.innerHTML = breadHtml;
            nav.insertAdjacentElement('afterend', breadDiv);
        }
    }
}

// إضافة canonical link تلقائي
function addCanonicalLink() {
    if (!document.querySelector('link[rel="canonical"]')) {
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = window.location.href.split('?')[0];
        document.head.appendChild(canonical);
    }
}

// تحسين الروابط الداخلية
function optimizeInternalLinks() {
    document.querySelectorAll('a[href^="/"]:not([href*="http"])').forEach(link => {
        if (!link.getAttribute('title')) {
            const text = link.textContent.trim();
            link.setAttribute('title', `انتقال إلى ${text}`);
        }
    });
}

// تشغيل عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    addBreadcrumbs();
    addCanonicalLink();
    optimizeInternalLinks();
});
