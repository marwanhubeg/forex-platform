// =====================================================
// النسخة الاحترافية v2.0 – تحسينات متقدمة
// =====================================================

// ========== 1. شريط التقدم للقراءة ==========
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-container';
    progressBar.innerHTML = '<div class="progress-bar"></div>';
    document.body.insertBefore(progressBar, document.body.firstChild);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector('.progress-bar').style.width = scrolled + '%';
    });
}

// ========== 2. زر العودة للأعلى ==========
function initScrollTop() {
    const scrollBtn = document.createElement('div');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '⬆️';
    scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}

// ========== 3. تحميل الكسول (Lazy Loading) ==========
function initLazyLoading() {
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

// ========== 4. إحصائيات متقدمة ==========
function initAdvancedStats() {
    // تتبع وقت البقاء في الصفحة
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        localStorage.setItem('last_session_duration', timeSpent);
        
        // إرسال إلى Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'session_duration', {
                'event_category': 'engagement',
                'value': timeSpent
            });
        }
    });
    
    // تتبع عمق التمرير
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            localStorage.setItem('max_scroll_depth', maxScroll);
        }
    });
}

// ========== 5. إشعارات منبثقة ذكية ==========
function initSmartNotifications() {
    // عرض إشعار VIP بعد 30 ثانية (للمستخدمين الجدد فقط)
    const hasSeenNotification = localStorage.getItem('vip_notification_seen');
    const visitCount = parseInt(localStorage.getItem('visit_count') || '0');
    
    if (!hasSeenNotification && visitCount < 3) {
        setTimeout(() => {
            showNotificationModal();
        }, 30000);
    }
    
    // تحديث عدد الزيارات
    localStorage.setItem('visit_count', visitCount + 1);
}

function showNotificationModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--bg-card); padding: 30px; border-radius: 20px; max-width: 400px; text-align: center;">
            <h2 style="color: var(--primary);">🔥 عرض خاص!</h2>
            <p>اشترك في باقة VIP واحصل على:</p>
            <ul style="text-align: right; margin: 20px;">
                <li>✅ إشارات يومية بدقة 85%</li>
                <li>✅ دعم VIP 24/7</li>
                <li>✅ تحليلات حصرية</li>
            </ul>
            <a href="payment.html" style="background: var(--primary); color: white; padding: 10px 20px; border-radius: 50px; text-decoration: none;">🚀 اعرف أكثر</a>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: var(--text-muted); margin-top: 15px; cursor: pointer;">إغلاق</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    localStorage.setItem('vip_notification_seen', 'true');
}

// ========== 6. حفظ تفضيلات المستخدم ==========
function saveUserPreferences() {
    // حفظ الوضع (مظلم/فاتح)
    const theme = localStorage.getItem('forex_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    
    // حفظ حجم الخط
    const fontSize = localStorage.getItem('font_size') || 'medium';
    applyFontSize(fontSize);
}

function applyFontSize(size) {
    const sizes = { small: '14px', medium: '16px', large: '18px' };
    document.body.style.fontSize = sizes[size];
}

// ========== 7. تحسين سرعة التحميل ==========
function optimizePerformance() {
    // تأجيل تحميل الفيديوهات
    document.querySelectorAll('video[data-src]').forEach(video => {
        video.src = video.dataset.src;
    });
    
    // استخدام Intersection Observer للأنيميشن
    const animatedElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    animatedElements.forEach(el => observer.observe(el));
}

// ========== 8. تحسين SEO تلقائي ==========
function autoSeoOptimization() {
    // إضافة breadcrumbs تلقائية
    if (!document.querySelector('.breadcrumbs')) {
        const breadcrumbs = document.createElement('div');
        breadcrumbs.className = 'breadcrumbs container';
        const path = window.location.pathname;
        const paths = path.split('/').filter(p => p && !p.includes('.html'));
        
        let html = '<a href="/">الرئيسية</a>';
        paths.forEach(p => {
            const name = p === 'content' ? '' : p.replace(/-/g, ' ');
            if (name) html += ` / <span>${name}</span>`;
        });
        
        breadcrumbs.innerHTML = html;
        const nav = document.querySelector('nav');
        if (nav) nav.insertAdjacentElement('afterend', breadcrumbs);
    }
}

// ========== تشغيل جميع الوظائف ==========
document.addEventListener('DOMContentLoaded', () => {
    initReadingProgress();
    initScrollTop();
    initLazyLoading();
    initAdvancedStats();
    initSmartNotifications();
    saveUserPreferences();
    optimizePerformance();
    autoSeoOptimization();
    
    console.log('🚀 النسخة الاحترافية v2.0 – تم التحميل بنجاح');
});
