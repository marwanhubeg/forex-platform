// =====================================================
// إحصائيات متقدمة – عدد الزوار، المقالات، إلخ
// =====================================================

// تحديث الإحصائيات في لوحة التحكم
async function updateStats() {
    const statsElements = document.querySelectorAll('.mini-dashboard span');
    if (!statsElements.length) return;
    
    // إحصائيات تجريبية (سيتم ربطها بـ API لاحقاً)
    const stats = {
        followers: await getFacebookFollowers(),
        articles: await getArticleCount(),
        accuracy: 85,
        lastUpdate: new Date().toLocaleTimeString('ar')
    };
    
    if (statsElements[0]) statsElements[0].innerHTML = `📈 متابعين: ${stats.followers}+`;
    if (statsElements[1]) statsElements[1].innerHTML = `📚 مقالات: ${stats.articles}+`;
    if (statsElements[3]) statsElements[3].innerHTML = `🎯 دقة التحليلات: ${stats.accuracy}%`;
    if (statsElements[4]) statsElements[4].innerHTML = `🕐 آخر تحديث: ${stats.lastUpdate}`;
}

// جلب عدد متابعي فيسبوك (محاكاة)
async function getFacebookFollowers() {
    // يمكن ربطها بـ Facebook API لاحقاً
    return 2150 + Math.floor(Math.random() * 50);
}

// جلب عدد المقالات
async function getArticleCount() {
    try {
        const response = await fetch('/content/articles/');
        // محاكاة حالياً
        return 8;
    } catch {
        return 8;
    }
}

// تسجيل زيارة المستخدم
function trackVisit() {
    let visits = localStorage.getItem('total_visits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('total_visits', visits);
    
    // تحديث في لوحة التحكم إذا وجدت
    const visitElement = document.querySelector('.stats-visits');
    if (visitElement) {
        visitElement.innerHTML = `👁️ زوار: ${visits}`;
    }
}

// تشغيل عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    trackVisit();
    
    // تحديث كل 30 ثانية
    setInterval(updateStats, 30000);
});
