-- =====================================================
-- منصة التحليل التعليمي للفوركس – قاعدة البيانات
-- =====================================================

-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS forex_platform;
USE forex_platform;

-- 1. جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('user', 'vip', 'admin') DEFAULT 'user',
    telegram_id VARCHAR(50),
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. جدول الاشتراكات VIP
CREATE TABLE IF NOT EXISTS subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    plan_type ENUM('monthly', 'quarterly', 'yearly'),
    start_date DATE,
    end_date DATE,
    amount DECIMAL(10,2),
    status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. جدول التحليلات
CREATE TABLE IF NOT EXISTS analysis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    symbol VARCHAR(20) NOT NULL,
    analysis_type ENUM('daily', 'weekly', 'monthly') DEFAULT 'daily',
    analysis_date DATE NOT NULL,
    direction ENUM('up', 'down', 'sideways'),
    entry_min DECIMAL(10,5),
    entry_max DECIMAL(10,5),
    stop_loss DECIMAL(10,5),
    take_profit_1 DECIMAL(10,5),
    take_profit_2 DECIMAL(10,5),
    summary TEXT,
    chart_image VARCHAR(255),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 4. جدول الإشارات
CREATE TABLE IF NOT EXISTS signals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    analysis_id INT,
    signal_time DATETIME,
    entry_price DECIMAL(10,5),
    exit_price DECIMAL(10,5),
    result ENUM('pending', 'win', 'loss') DEFAULT 'pending',
    pips_gain DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (analysis_id) REFERENCES analysis(id) ON DELETE CASCADE
);

-- 5. جدول التعليقات
CREATE TABLE IF NOT EXISTS comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    analysis_id INT,
    content TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (analysis_id) REFERENCES analysis(id) ON DELETE CASCADE
);

-- 6. جدول الإحصائيات
CREATE TABLE IF NOT EXISTS analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE UNIQUE,
    total_visitors INT DEFAULT 0,
    unique_visitors INT DEFAULT 0,
    page_views INT DEFAULT 0,
    analysis_views INT DEFAULT 0,
    vip_clicks INT DEFAULT 0,
    exness_clicks INT DEFAULT 0
);

-- 7. جدول الإشعارات
CREATE TABLE IF NOT EXISTS notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(200),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. جدول جلسات المستخدمين (للـ JWT)
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    token VARCHAR(500),
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- إضافة مستخدم تجريبي (admin) - password: admin123 (bcrypt hash)
INSERT INTO users (username, email, password_hash, full_name, role) 
VALUES ('admin', 'admin@forex.com', '$2b$10$N9qo8uLOickgx2ZMRZoMy.MqrI6J4IqQqKpQqKpQqKpQ', 'مدير النظام', 'admin')
ON DUPLICATE KEY UPDATE id=id;

-- إضافة مستخدم تجريبي عادي
INSERT INTO users (username, email, password_hash, full_name, role) 
VALUES ('user', 'user@forex.com', '$2b$10$N9qo8uLOickgx2ZMRZoMy.MqrI6J4IqQqKpQqKpQqKpQ', 'مستخدم عادي', 'user')
ON DUPLICATE KEY UPDATE id=id;

-- إضافة بعض التحليلات التجريبية
INSERT INTO analysis (symbol, analysis_type, analysis_date, direction, entry_min, entry_max, stop_loss, take_profit_1, take_profit_2, summary)
VALUES 
('EURUSD', 'daily', CURDATE(), 'up', 1.0850, 1.0880, 1.0820, 1.0920, 1.0950, 'اليورو يواصل الصعود بدعم من البيانات الإيجابية'),
('XAUUSD', 'daily', CURDATE(), 'up', 2040.00, 2050.00, 2025.00, 2070.00, 2100.00, 'الذهب مدعوم بضعف الدولار'),
('GBPUSD', 'daily', CURDATE(), 'up', 1.2630, 1.2660, 1.2600, 1.2720, 1.2780, 'الباوند يحقق مكاسب بدعم من البيانات الاقتصادية');

SELECT '✅ Database initialized successfully!' as status;
