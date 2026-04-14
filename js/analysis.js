function updateLivePrices() {
    const priceElement = document.getElementById('eurusd-price');
    if (priceElement) {
        // عرض سعر تجريبي (سيتم ربطه بـ API لاحقاً)
        priceElement.textContent = (1.08750 + (Math.random() - 0.5) * 0.001).toFixed(5);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateLivePrices();
    // تحديث كل 10 ثواني
    setInterval(updateLivePrices, 10000);
});
