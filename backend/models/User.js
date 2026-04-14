// =====================================================
// نموذج المستخدم (User Model)
// =====================================================

const { query } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    // إنشاء مستخدم جديد
    static async create(userData) {
        const { username, email, password, full_name } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const sql = `
            INSERT INTO users (username, email, password_hash, full_name)
            VALUES (?, ?, ?, ?)
        `;
        
        const result = await query(sql, [username, email, hashedPassword, full_name]);
        return result.insertId;
    }
    
    // البحث عن مستخدم بالبريد الإلكتروني
    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const rows = await query(sql, [email]);
        return rows[0];
    }
    
    // البحث عن مستخدم بالمعرف
    static async findById(id) {
        const sql = 'SELECT id, username, email, full_name, role, created_at FROM users WHERE id = ?';
        const rows = await query(sql, [id]);
        return rows[0];
    }
    
    // التحقق من كلمة المرور
    static async verifyPassword(email, password) {
        const user = await this.findByEmail(email);
        if (!user) return null;
        
        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) return null;
        
        return user;
    }
    
    // تحديث آخر تسجيل دخول
    static async updateLastLogin(id) {
        const sql = 'UPDATE users SET last_login = NOW() WHERE id = ?';
        await query(sql, [id]);
    }
    
    // الحصول على جميع المستخدمين (للمشرف)
    static async getAll() {
        const sql = 'SELECT id, username, email, full_name, role, created_at, last_login FROM users';
        return await query(sql);
    }
}

module.exports = User;
