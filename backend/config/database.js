// =====================================================
// اتصال قاعدة البيانات (MariaDB/MySQL)
// =====================================================

const mysql = require('mysql2/promise');

// إعدادات الاتصال
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',  // تركها فارغة إذا لم تضع كلمة مرور
    database: 'forex_platform',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// إنشاء مجمع الاتصالات
const pool = mysql.createPool(dbConfig);

// اختبار الاتصال
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error.message);
        return false;
    }
}

// تنفيذ الاستعلامات
async function query(sql, params) {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('خطأ في الاستعلام:', error);
        throw error;
    }
}

module.exports = { pool, query, testConnection };
