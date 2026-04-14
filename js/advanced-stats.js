// =====================================================
// نظام إحصائيات متقدم – Real-time Analytics
// =====================================================

class AdvancedStats {
    constructor() {
        this.visitors = 0;
        this.onlineUsers = 0;
        this.startTime = Date.now();
        this.init();
    }
    
    init() {
        this.updateVisitorCount();
        this.trackUserBehavior();
        this.startHeartbeat();
    }
    
    updateVisitorCount() {
        // تحديث عدد الزوار
        let visits = localStorage.getItem('total_visits') || 0;
        visits = parseInt(visits) + 1;
        localStorage.setItem('total_visits', visits);
        
        // عرض في لوحة التحكم
        const statsElement = document.querySelector('.live-stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="stat-item">
                    <span class="stat-icon">👁️</span>
                    <span class="stat-value">${this.formatNumber(visits)}</span>
                    <span class="stat-label">زيارة</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">🟢</span>
                    <span class="stat-value">${this.onlineUsers}</span>
                    <span class="stat-label">متصل الآن</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">⏱️</span>
                    <span class="stat-value">${this.getOnlineTime()}</span>
                    <span class="stat-label">وقت البقاء</span>
                </div>
            `;
        }
    }
    
    trackUserBehavior() {
        // تتبع سلوك المستخدم
        const startScroll = 0;
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                localStorage.setItem('max_scroll_depth', maxScroll);
            }
        });
        
        // تتبع الوقت على الصفحة
        setInterval(() => {
            const timeOnPage = Math.floor((Date.now() - this.startTime) / 1000);
            localStorage.setItem('time_on_page', timeOnPage);
        }, 10000);
    }
    
    startHeartbeat() {
        // نبض حي للمستخدمين المتصلين
        setInterval(() => {
            // محاكاة عدد المستخدمين المتصلين
            this.onlineUsers = Math.floor(Math.random() * 50) + 10;
            this.updateVisitorCount();
        }, 30000);
    }
    
    getOnlineTime() {
        const seconds = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(seconds / 60);
        if (minutes < 1) return `${seconds} ثانية`;
        if (minutes < 60) return `${minutes} دقيقة`;
        return `${Math.floor(minutes / 60)} ساعة`;
    }
    
    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }
}

// تشغيل النظام
const stats = new AdvancedStats();
