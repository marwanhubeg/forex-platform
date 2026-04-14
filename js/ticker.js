// =====================================================
// شريط الأسعار المتحرك – تحديث مباشر
// =====================================================

// بيانات الأسعار
const tickerData = [
    { symbol: "EUR/USD", price: 1.08750, change: 0.15, direction: "up" },
    { symbol: "GBP/USD", price: 1.26580, change: 0.08, direction: "up" },
    { symbol: "USD/JPY", price: 148.32, change: -0.12, direction: "down" },
    { symbol: "XAU/USD", price: 2050.50, change: 0.32, direction: "up" },
    { symbol: "BTC/USD", price: 43250, change: 1.25, direction: "up" },
    { symbol: "USD/CHF", price: 0.8750, change: -0.05, direction: "down" },
    { symbol: "AUD/USD", price: 0.6580, change: 0.22, direction: "up" },
    { symbol: "USD/CAD", price: 1.3450, change: -0.18, direction: "down" }
];

// إنشاء محتوى الشريط
function createTicker() {
    const tickerContainer = document.querySelector('.ticker');
    if (!tickerContainer) return;
    
    let html = '';
    // تكرار البيانات مرتين للشريط المتواصل
    for (let i = 0; i < 2; i++) {
        tickerData.forEach(item => {
            const changeClass = item.direction === 'up' ? 'up' : 'down';
            const changeSymbol = item.direction === 'up' ? '▲' : '▼';
            html += `
                <div class="ticker-item">
                    <span class="ticker-symbol">${item.symbol}</span>
                    <span class="ticker-price">${item.price.toFixed(5)}</span>
                    <span class="ticker-change ${changeClass}">${changeSymbol} ${Math.abs(item.change)}%</span>
                </div>
            `;
        });
    }
    
    tickerContainer.innerHTML = html;
}

// تحديث الأسعار عشوائياً (محاكاة)
function updatePrices() {
    tickerData.forEach(item => {
        const change = (Math.random() - 0.5) * 0.002;
        item.price += change;
        item.change = (change / item.price * 100).toFixed(2);
        item.direction = change >= 0 ? 'up' : 'down';
    });
    createTicker();
}

// بدء التحديث التلقائي
function startTickerUpdates() {
    // تحديث كل 5 ثواني
    setInterval(() => {
        updatePrices();
    }, 5000);
}

// إغلاق شريط الإعلانات
function closeAnnouncement() {
    const announcement = document.querySelector('.announcement-bar');
    if (announcement) {
        announcement.style.display = 'none';
        localStorage.setItem('announcement_closed', 'true');
    }
}

// تشغيل عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    createTicker();
    startTickerUpdates();
    
    // التحقق من إغلاق الإعلان
    if (localStorage.getItem('announcement_closed') === 'true') {
        const announcement = document.querySelector('.announcement-bar');
        if (announcement) announcement.style.display = 'none';
    }
});

// تصدير
window.ticker = {
    createTicker,
    updatePrices,
    closeAnnouncement
};
