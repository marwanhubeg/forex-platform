// =====================================================
// منصة التحليل التعليمي للفوركس – الوظائف الرئيسية
// الإصدار الاحترافي 2.0
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ منصة التحليل التعليمي للفوركس – جاهزة | الإصدار 2.0');
    
    // تفعيل الرابط النشط
    activateCurrentNav();
    
    // إضافة سنة حقوق النشر
    updateFooterYear();
    
    // إعداد الروابط الخارجية
    setupExternalLinks();
    
    // إضافة تأثير fade-in للعناصر
    addFadeInAnimation();
    
    // تحسين الأداء (lazy loading)
    setupLazyLoading();
    
    // إضافة smooth scroll
    setupSmoothScroll();
});

// تفعيل الرابط النشط
function activateCurrentNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'index.html' && currentPath === '/') {
            link.classList.add('active');
        } else if (href && currentPath.includes(href.replace('./', '')) && href !== 'index.html') {
            link.classList.add('active');
        }
    });
}

// تحديث سنة حقوق النشر
function updateFooterYear() {
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `© ${currentYear} منصة التحليل التعليمي للفوركس – جميع الحقوق محفوظة`;
    }
}

// إعداد الروابط الخارجية
function setupExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="marwanhubeg.github.io"])');
    
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        
        if (link.href.includes('exness') || link.href.includes('one.exnessonelink')) {
            link.setAttribute('rel', 'sponsored nofollow noopener noreferrer');
        }
    });
}

// إضافة تأثير fade-in
function addFadeInAnimation() {
    const elements = document.querySelectorAll('.feature-card, .article-item, .tool-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Lazy loading للصور
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Smooth scroll للروابط الداخلية
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// تصدير للاستخدام العام
window.forexPlatform = {
    version: '2.0',
    updateFooterYear,
    setupExternalLinks
};
