// =====================================================
// شارتات تداول تفاعلية – TradingView Widget
// =====================================================

class TradingCharts {
    constructor() {
        this.loadTradingViewScript();
    }
    
    loadTradingViewScript() {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.onload = () => this.initCharts();
        document.body.appendChild(script);
    }
    
    initCharts() {
        // شارت EUR/USD
        if (document.getElementById('tradingview-chart')) {
            new TradingView.widget({
                "width": "100%",
                "height": 400,
                "symbol": "FX:EURUSD",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "ar",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "hide_top_toolbar": true,
                "hide_legend": true,
                "save_image": false,
                "container_id": "tradingview-chart"
            });
        }
        
        // شارت الذهب
        if (document.getElementById('tradingview-gold')) {
            new TradingView.widget({
                "width": "100%",
                "height": 400,
                "symbol": "FX:XAUUSD",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "ar",
                "container_id": "tradingview-gold"
            });
        }
    }
}

// تشغيل
const charts = new TradingCharts();
