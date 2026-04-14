// =====================================================
// نموذج التحليلات (Analysis Model)
// =====================================================

const { query } = require('../config/database');

class Analysis {
    // إنشاء تحليل جديد
    static async create(analysisData) {
        const { symbol, analysis_type, analysis_date, direction, entry_min, entry_max, stop_loss, take_profit_1, take_profit_2, summary } = analysisData;
        
        const sql = `
            INSERT INTO analysis (symbol, analysis_type, analysis_date, direction, entry_min, entry_max, stop_loss, take_profit_1, take_profit_2, summary)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const result = await query(sql, [symbol, analysis_type, analysis_date, direction, entry_min, entry_max, stop_loss, take_profit_1, take_profit_2, summary]);
        return result.insertId;
    }
    
    // الحصول على تحليل اليوم
    static async getTodayAnalysis(symbol) {
        const sql = `
            SELECT * FROM analysis 
            WHERE symbol = ? AND analysis_type = 'daily' AND analysis_date = CURDATE()
            ORDER BY created_at DESC LIMIT 1
        `;
        const rows = await query(sql, [symbol]);
        return rows[0];
    }
    
    // الحصول على أحدث التحليلات
    static async getLatest(limit = 10) {
        const sql = `
            SELECT * FROM analysis 
            ORDER BY analysis_date DESC, created_at DESC 
            LIMIT ?
        `;
        return await query(sql, [limit]);
    }
    
    // الحصول على تحليلات حسب النوع
    static async getByType(type, limit = 10) {
        const sql = `
            SELECT * FROM analysis 
            WHERE analysis_type = ? 
            ORDER BY analysis_date DESC 
            LIMIT ?
        `;
        return await query(sql, [type, limit]);
    }
    
    // تحديث نتائج التحليل (بعد انتهاء الإشارة)
    static async updateResult(id, result, pips) {
        const sql = 'UPDATE signals SET result = ?, pips_gain = ? WHERE analysis_id = ?';
        await query(sql, [result, pips, id]);
    }
}

module.exports = Analysis;
