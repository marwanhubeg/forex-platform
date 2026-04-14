// =====================================================
// إعدادات PayPal – الاشتراك الشهري
// =====================================================

// PayPal Client ID (من حساب PayPal Developer)
// استبدل هذا بـ Client ID الحقيقي الخاص بك
const PAYPAL_CLIENT_ID = 'YOUR_PAYPAL_CLIENT_ID';

// تحميل PayPal SDK
function loadPayPalSDK() {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.onload = () => {
        console.log('✅ PayPal SDK loaded');
    };
    document.body.appendChild(script);
}

// إنشاء زر PayPal
function renderPayPalButton(containerId, amount, plan) {
    if (!window.paypal) {
        console.error('PayPal SDK not loaded');
        return;
    }
    
    window.paypal.Buttons({
        style: {
            layout: 'horizontal',
            color: 'blue',
            shape: 'rect',
            label: 'subscribe'
        },
        
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: amount,
                        currency_code: 'USD'
                    },
                    description: `VIP Subscription - ${plan}`,
                    custom_id: plan
                }],
                application_context: {
                    shipping_preference: 'NO_SHIPPING'
                }
            });
        },
        
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // حفظ بيانات الدفع
                localStorage.setItem('payment_status', 'completed');
                localStorage.setItem('payment_amount', amount);
                localStorage.setItem('payment_plan', plan);
                
                // توجيه إلى صفحة النجاح
                window.location.href = '/checkout-success.html';
            });
        },
        
        onError: function(err) {
            console.error('PayPal Error:', err);
            alert('حدث خطأ في الدفع. يرجى المحاولة مرة أخرى.');
        }
        
    }).render(containerId);
}

// تصدير
window.paypalConfig = {
    loadPayPalSDK,
    renderPayPalButton
};
