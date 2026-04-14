// =====================================================
// نظام معالجة الدفع – PayPal + Stripe
// =====================================================

// هذا ملف Backend – يتطلب تشغيل Node.js

const express = require('express');
const app = express();

// PayPal SDK
const paypal = require('@paypal/checkout-server-sdk');

// Stripe SDK
const stripe = require('stripe')('sk_live_your_secret_key_here');

app.use(express.json());

// ========== PayPal Webhook ==========
app.post('/api/webhook/paypal', async (req, res) => {
    const event = req.body;
    
    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
        const payment = event.resource;
        const email = payment.payer.email_address;
        const amount = payment.amount.value;
        const plan = payment.custom_id; // monthly, quarterly, yearly
        
        // إضافة المستخدم إلى قاعدة البيانات
        await addUserToVIP(email, plan, amount);
        
        // إرسال بريد ترحيبي
        await sendWelcomeEmail(email, plan);
        
        // إضافة إلى مجموعة التلغرام (عبر API)
        await addToTelegramGroup(email);
        
        console.log(`✅ تم دفع $${amount} من ${email} – خطة: ${plan}`);
    }
    
    res.json({ received: true });
});

// ========== Stripe Webhook ==========
app.post('/api/webhook/stripe', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const email = session.customer_email;
        const amount = session.amount_total / 100;
        const plan = session.metadata.plan;
        
        // إضافة المستخدم إلى قاعدة البيانات
        await addUserToVIP(email, plan, amount);
        
        // إرسال بريد ترحيبي
        await sendWelcomeEmail(email, plan);
        
        // إضافة إلى مجموعة التلغرام
        await addToTelegramGroup(email);
        
        console.log(`✅ Stripe: تم دفع $${amount} من ${email}`);
    }
    
    res.json({ received: true });
});

// دوال مساعدة
async function addUserToVIP(email, plan, amount) {
    // حفظ في قاعدة البيانات
    // هذا مثال – تحتاج قاعدة بيانات حقيقية (PostgreSQL/MongoDB)
    console.log(`📝 إضافة ${email} إلى VIP – الخطة: ${plan}`);
}

async function sendWelcomeEmail(email, plan) {
    // إرسال بريد إلكتروني ترحيبي
    console.log(`📧 إرسال بريد ترحيبي إلى ${email}`);
}

async function addToTelegramGroup(email) {
    // إضافة إلى مجموعة التلغرام عبر API
    console.log(`📱 إضافة ${email} إلى مجموعة التلغرام`);
}

app.listen(3000, () => {
    console.log('🚀 Webhook server running on port 3000');
});
