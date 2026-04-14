# 🤖 دليل إعداد بوت التلغرام

## الخطوة 1: إنشاء البوت من @BotFather

1. افتح تلغرام وابحث عن `@BotFather`
2. أرسل `/newbot`
3. اختر اسم للبوت (مثال: `Forex Analysis Bot`)
4. اختر username للبوت (مثال: `@forex_analysis_bot`)
5. احفظ الـ Token الذي سترسله @BotFather

## الخطوة 2: إعداد البوت

```bash
# انتقل إلى مجلد البوت
cd bot

# تثبيت dependencies
npm install

# أنشئ ملف .env
cp .env.example .env

# حرر ملف .env وضع التوكن الخاص بك
nano .env
