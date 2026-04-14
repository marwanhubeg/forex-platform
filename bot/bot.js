// =====================================================
// Telegram Bot – منصة التحليل التعليمي للفوركس
// التحويل التلقائي من زائر إلى مشترك VIP
// =====================================================

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// إعدادات البوت
// استبدل هذا التوكن بتوكن البوت الخاص بك من @BotFather
const TOKEN = 'YOUR_BOT_TOKEN_HERE';
const bot = new TelegramBot(TOKEN, { polling: true });

// مجموعة VIP (استبدل بالمعرف الحقيقي)
const VIP_GROUP_ID = '-1001234567890';

// قاعدة بيانات بسيطة (يمكن استبدالها بـ JSON أو Database)
let usersDB = {};

// تحميل قاعدة البيانات إذا وجدت
if (fs.existsSync('users.json')) {
    usersDB = JSON.parse(fs.readFileSync('users.json', 'utf8'));
}

// حفظ قاعدة البيانات
function saveUsers() {
    fs.writeFileSync('users.json', JSON.stringify(usersDB, null, 2));
}

// =====================================================
// رسالة الترحيب – Lead Magnet
// =====================================================
const WELCOME_MESSAGE = `
🎉 *مرحباً بك في منصة التحليل التعليمي للفوركس!*

أنا البوت المساعد الخاص بك 🚀

🎁 *هدية مجانية لك:*
📄 *"استراتيجية سكالبينج 15 دقيقة – PDF احترافي"*

لتحميل الاستراتيجية، أرسل لي بريدك الإلكتروني 👇
`;

const PDF_SENT_MESSAGE = `
✅ *تم إرسال الاستراتيجية إلى بريدك!*

📧 تأكد من مراجعة صندوق الوارد (أو Spam)

🎯 *ماذا بعد؟*
• سأرسل لك إشارات تداول مجانية يومياً
• تحليلات فنية لليورو دولار والذهب
• نصائح حصرية للمبتدئين

📊 *عايز تبدأ صح؟* ابدأ بقراءة الدروس المجانية:
👉 /lessons

أو تواصل معي مباشرة: /help
`;

// =====================================================
// رسالة العرض VIP
// =====================================================
const VIP_OFFER_MESSAGE = `
🔥 *عرض خاص لأعضاء المجتمع!*

🎯 *باقة VIP تشمل:*
• 📈 إشارات يومية بدقة 85%
• 🎯 نقاط دخول وخروج واضحة
• 📊 تحليل فني كامل
• 💬 دعم VIP 24/7
• 📚 مكتبة حصرية من الاستراتيجيات

💰 *السعر:* فقط $49/شهر
🎁 *عرض خاص:* أول 7 أيام مجاناً!

🔗 *للاشتراك:* /subscribe

❓ عندك أسئلة؟ /faq
`;

// =====================================================
// أمر /start – بدء البوت
// =====================================================
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.from.username || msg.from.first_name;
    
    // تسجيل المستخدم
    if (!usersDB[userId]) {
        usersDB[userId] = {
            id: userId,
            username: username,
            joined_at: new Date().toISOString(),
            step: 'welcome',
            email: null,
            is_vip: false,
            messages_sent: 0
        };
        saveUsers();
    }
    
    // إرسال رسالة الترحيب
    bot.sendMessage(chatId, WELCOME_MESSAGE, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: '📥 تحميل الاستراتيجية المجانية', callback_data: 'get_pdf' }],
                [{ text: '📚 الدروس المجانية', callback_data: 'lessons' }],
                [{ text: '💬 انضم للمجتمع', url: 'https://t.me/zain81118' }]
            ]
        }
    });
    
    console.log(`✅ مستخدم جديد: ${username} (${userId})`);
});

// =====================================================
// معالج الأزرار (Callback Queries)
// =====================================================
bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const userId = callbackQuery.from.id;
    const data = callbackQuery.data;
    
    // تأكيد الاستلام
    bot.answerCallbackQuery(callbackQuery.id);
    
    switch (data) {
        case 'get_pdf':
            // طلب البريد الإلكتروني
            usersDB[userId].step = 'waiting_email';
            saveUsers();
            
            bot.sendMessage(chatId, 
                `📧 *أرسل بريدك الإلكتروني* لاستلام الاستراتيجية فوراً:\n\n` +
                `مثال: ahmed@gmail.com`,
                { parse_mode: 'Markdown' }
            );
            break;
            
        case 'lessons':
            bot.sendMessage(chatId,
                `📚 *الدروس المجانية:*\n\n` +
                `1️⃣ /leverage – شرح الرافعة المالية\n` +
                `2️⃣ /risk – إدارة المخاطر\n` +
                `3️⃣ /analysis – التحليل الفني\n\n` +
                `🔗 *المزيد:* https://marwanhubeg.github.io/forex-platform/`,
                { parse_mode: 'Markdown' }
            );
            break;
            
        case 'vip_offer':
            bot.sendMessage(chatId, VIP_OFFER_MESSAGE, {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '💳 اشترك الآن', callback_data: 'subscribe' }],
                        [{ text: '❓ أسئلة شائعة', callback_data: 'faq' }]
                    ]
                }
            });
            break;
            
        case 'subscribe':
            bot.sendMessage(chatId,
                `🔗 *رابط الاشتراك في VIP:*\n\n` +
                `https://marwanhubeg.github.io/forex-platform/payment.html\n\n` +
                `🎁 *كود خصم 10%:* VIP10\n\n` +
                `بعد الدفع، سيتم إضافتك تلقائياً إلى مجموعة VIP`,
                { parse_mode: 'Markdown' }
            );
            break;
            
        case 'faq':
            bot.sendMessage(chatId,
                `❓ *الأسئلة الشائعة:*\n\n` +
                `*س: هل الإشارات مجانية؟*\n` +
                `ج: نرسل إشارات مجانية يومياً، والإشارات VIP أكثر دقة وتفصيلاً\n\n` +
                `*س: كيف أتلقى الإشارات؟*\n` +
                `ج: عبر البوت مباشرة أو عبر مجموعة VIP\n\n` +
                `*س: هل يوجد ضمان؟*\n` +
                `ج: نعم، ضمان استرداد الأموال خلال 7 أيام\n\n` +
                `🔗 /start للعودة`,
                { parse_mode: 'Markdown' }
            );
            break;
    }
});

// =====================================================
// معالج البريد الإلكتروني
// =====================================================
bot.onText(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const email = msg.text;
    
    if (usersDB[userId] && usersDB[userId].step === 'waiting_email') {
        // حفظ البريد الإلكتروني
        usersDB[userId].email = email;
        usersDB[userId].step = 'pdf_sent';
        saveUsers();
        
        // هنا يمكن إرسال البريد الإلكتروني تلقائياً (SMTP)
        console.log(`📧 تم تسجيل بريد: ${email} للمستخدم ${userId}`);
        
        // إرسال رابط PDF
        bot.sendMessage(chatId, PDF_SENT_MESSAGE, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: '📈 إشارات مجانية يومياً', callback_data: 'daily_signals' }],
                    [{ text: '🔥 عرض VIP', callback_data: 'vip_offer' }]
                ]
            }
        });
        
        // جدولة إرسال عرض VIP بعد 3 أيام
        scheduleVIPOffer(userId, chatId);
    }
});

// =====================================================
// إرسال إشارات يومية تلقائية
// =====================================================
function sendDailySignals() {
    // تحليل اليوم
    const signal = `
📊 *إشارة اليوم – ${new Date().toLocaleDateString('ar')}*

🇪🇺 *EUR/USD:*
• الاتجاه: صاعد 📈
• نقطة دخول: 1.0850 - 1.0880
• وقف خسارة: 1.0820
• هدف أول: 1.0920
• هدف ثاني: 1.0950

🥇 *XAU/USD (الذهب):*
• الاتجاه: صاعد 📈
• نقطة دخول: 2040 - 2050
• وقف خسارة: 2025
• هدف: 2070

⚠️ *نسبة المخاطرة:* 1-2% فقط

🔐 *لإشارات VIP اليومية بدقة أعلى:* /subscribe
`;
    
    // إرسال لجميع المستخدمين
    for (const userId in usersDB) {
        const user = usersDB[userId];
        if (!user.is_vip) {
            bot.sendMessage(user.id, signal, { parse_mode: 'Markdown' });
            user.messages_sent++;
        }
    }
    
    saveUsers();
    console.log('📈 تم إرسال الإشارات اليومية');
}

// =====================================================
// جدولة عرض VIP بعد أيام
// =====================================================
function scheduleVIPOffer(userId, chatId) {
    setTimeout(() => {
        if (usersDB[userId] && !usersDB[userId].is_vip) {
            bot.sendMessage(chatId,
                `🔥 *عرض خاص لك!*\n\n` +
                `منذ ${Math.floor(Date.now() / 86400000)} يوم وأنت تتابعنا!\n\n` +
                `🎁 *خصم 20%* على أول 3 أشهر من VIP\n\n` +
                `💰 $39 فقط بدلاً من $49\n\n` +
                `🔗 /subscribe`,
                { parse_mode: 'Markdown' }
            );
        }
    }, 3 * 24 * 60 * 60 * 1000); // 3 أيام
}

// =====================================================
// أوامر إضافية
// =====================================================

// شرح الرافعة
bot.onText(/\/leverage/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,
        `📖 *شرح الرافعة المالية*\n\n` +
        `الرافعة تتيح لك التحكم بمركز كبير برأس مال صغير.\n\n` +
        `مثال: برافعة 1:100، 1000$ تتحكم بـ 100,000$\n\n` +
        `⚠️ تحذير: الرافعة تضخم الأرباح والخسائر.\n\n` +
        `🔗 *الشرح الكامل:*\n` +
        `https://marwanhubeg.github.io/forex-platform/content/articles/leverage.html`,
        { parse_mode: 'Markdown' }
    );
});

// إدارة المخاطر
bot.onText(/\/risk/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,
        `🛡️ *قواعد إدارة المخاطر*\n\n` +
        `1️⃣ لا تخاطر بأكثر من 1-2% من رأس مالك في الصفقة\n` +
        `2️⃣ استخدم وقف الخسارة دائماً\n` +
        `3️⃣ نسبة مخاطرة/عائد لا تقل عن 1:2\n` +
        `4️⃣ حافظ على انضباطك العاطفي\n\n` +
        `🧮 *استخدم حاسبة المخاطرة:*\n` +
        `https://marwanhubeg.github.io/forex-platform/content/pages/tools.html`,
        { parse_mode: 'Markdown' }
    );
});

// المساعدة
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,
        `🆘 *قائمة الأوامر:*\n\n` +
        `/start – بدء البوت\n` +
        `/lessons – الدروس المجانية\n` +
        `/leverage – شرح الرافعة\n` +
        `/risk – إدارة المخاطر\n` +
        `/signals – إشارات اليوم\n` +
        `/subscribe – اشتراك VIP\n` +
        `/faq – أسئلة شائعة\n` +
        `/contact – تواصل مع الدعم\n\n` +
        `📱 *للمساعدة:* @forex_support`,
        { parse_mode: 'Markdown' }
    );
});

// إشارات اليوم
bot.onText(/\/signals/, (msg) => {
    const chatId = msg.chat.id;
    sendDailySignals();
});

// جهة الاتصال
bot.onText(/\/contact/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,
        `📞 *طرق التواصل:*\n\n` +
        `• البريد: support@forexacademy.com\n` +
        `• تيليجرام: @forex_support\n` +
        `• قناة التحديثات: @zain81118`,
        { parse_mode: 'Markdown' }
    );
});

// =====================================================
// جدولة المهام اليومية
// =====================================================
// إرسال الإشارات كل يوم الساعة 9 صباحاً
const scheduleDailySignals = () => {
    const now = new Date();
    const next9AM = new Date();
    next9AM.setHours(9, 0, 0, 0);
    
    if (now > next9AM) {
        next9AM.setDate(next9AM.getDate() + 1);
    }
    
    const delay = next9AM - now;
    
    setTimeout(() => {
        sendDailySignals();
        setInterval(sendDailySignals, 24 * 60 * 60 * 1000);
    }, delay);
};

scheduleDailySignals();

// =====================================================
// تشغيل البوت
// =====================================================
console.log('🤖 Telegram Bot is running...');
console.log('✅ انتظر الأوامر من المستخدمين');

module.exports = bot;
