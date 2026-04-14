// =====================================================
// ربط البوت بالموقع – إرسال إشعارات من الموقع
// =====================================================

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN';
const bot = new TelegramBot(TOKEN);

app.use(express.json());

// استقبال إشعارات من الموقع
app.post('/api/telegram/notify', (req, res) => {
    const { userId, message, type } = req.body;
    
    if (userId) {
        bot.sendMessage(userId, message, { parse_mode: 'Markdown' });
    }
    
    res.json({ success: true });
});

// إرسال إشعار لجميع المستخدمين
app.post('/api/telegram/broadcast', (req, res) => {
    const { message, users } = req.body;
    
    users.forEach(userId => {
        bot.sendMessage(userId, message, { parse_mode: 'Markdown' });
    });
    
    res.json({ success: true, sent: users.length });
});

// إرسال إشارة جديدة لجميع المشتركين
app.post('/api/telegram/signal', (req, res) => {
    const { signal, pair, entry, sl, tp } = req.body;
    
    const message = `
📊 *إشارة ${pair} – جديدة!*

🎯 *نقطة دخول:* ${entry}
🛑 *وقف خسارة:* ${sl}
✅ *هدف أول:* ${tp}

⚠️ *نسبة المخاطرة:* 1-2%

🔐 *للمزيد:* /subscribe
`;
    
    // هنا يمكن إرسال للمستخدمين المحددين
    res.json({ success: true });
});

app.listen(3001, () => {
    console.log('🚀 Telegram Webhook running on port 3001');
});
