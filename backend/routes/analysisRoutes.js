// =====================================================
// مسارات API للتحليلات
// =====================================================

const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// الحصول على تحليل اليوم (عام)
router.get('/daily/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;
        const analysis = await Analysis.getTodayAnalysis(symbol);
        
        if (!analysis) {
            return res.status(404).json({ success: false, message: 'لا يوجد تحليل لهذا اليوم' });
        }
        
        res.json({ success: true, data: analysis });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// الحصول على أحدث التحليلات (عام)
router.get('/latest', async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const analyses = await Analysis.getLatest(limit);
        res.json({ success: true, data: analyses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// إضافة تحليل جديد (للمشرف فقط)
router.post('/', authenticate, isAdmin, async (req, res) => {
    try {
        const analysisId = await Analysis.create(req.body);
        res.json({ success: true, data: { id: analysisId } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
