// =====================================================
// نظام الوضع المظلم / الفاتح
// =====================================================

// تهيئة الوضع
function initTheme() {
    // قراءة الوضع المحفوظ
    const savedTheme = localStorage.getItem('forex_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme = savedTheme;
    if (!theme) {
        theme = prefersDark ? 'dark' : 'light';
    }
    
    applyTheme(theme);
}

// تطبيق الوضع
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('forex_theme', theme);
    
    // تحديث أيقونة الزر
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
        toggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
        toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع المظلم');
    }
}

// تبديل الوضع
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// إضافة زر التبديل
function addThemeToggleButton() {
    const button = document.createElement('button');
    button.id = 'themeToggle';
    button.className = 'theme-toggle';
    button.onclick = toggleTheme;
    button.setAttribute('aria-label', 'تبديل الوضع');
    document.body.appendChild(button);
    
    // تعيين الأيقونة المناسبة
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    button.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    addThemeToggleButton();
});

// مراقبة تغيير تفضيلات النظام
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('forex_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});
