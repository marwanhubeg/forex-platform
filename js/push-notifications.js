// =====================================================
// نظام إشعارات Push – إشعارات فورية
// =====================================================

class PushNotifications {
    constructor() {
        this.init();
    }
    
    async init() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                this.registerServiceWorker();
            }
        }
    }
    
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.register('/sw.js');
            this.registration = registration;
            this.subscribeToPush();
        }
    }
    
    async subscribeToPush() {
        const subscription = await this.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY')
        });
        
        // إرسال الاشتراك إلى الخادم
        await fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    sendNotification(title, body, icon = '📊') {
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: '/favicon.svg',
                badge: '/favicon.svg',
                tag: 'forex-signal',
                vibrate: [200, 100, 200]
            });
        }
    }
    
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}

// إشعارات الإشارات
const notifier = new PushNotifications();

// إرسال إشعار عند إشارة جديدة
function sendSignalNotification(pair, action, price) {
    notifier.sendNotification(
        `📈 إشارة ${pair}`,
        `${action} من ${price} - هدف أول ${(price * 1.005).toFixed(4)}`
    );
}
