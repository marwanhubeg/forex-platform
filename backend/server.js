// =====================================================
// خادم Backend – منصة التحليل التعليمي للفوركس
// =====================================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { testConnection } = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// مسارات API
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// مسار جلب التحليلات اليومية
app.get('/api/analysis/daily', async (req, res) => {
    try {
        const { query } = require('./config/database');
        const analyses = await query(`
            SELECT * FROM analysis 
            WHERE analysis_type = 'daily' AND analysis_date = CURDATE()
            ORDER BY symbol
        `);
        res.json({ success: true, data: analyses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// مسار جلب مستخدم (تجريبي)
app.get('/api/users', async (req, res) => {
    try {
        const { query } = require('./config/database');
        const users = await query('SELECT id, username, email, full_name, role FROM users');
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// تشغيل الخادم
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    
    // اختبار اتصال قاعدة البيانات
    const dbConnected = await testConnection();
    if (dbConnected) {
        console.log('✅ Database connected successfully');
    } else {
        console.log('❌ Database connection failed');
    }
});
