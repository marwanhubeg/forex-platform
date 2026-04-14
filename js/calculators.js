function calculateLeverage() {
    const capital = parseFloat(document.getElementById('capital')?.value);
    const riskPercent = parseFloat(document.getElementById('risk-percent')?.value);
    const stopLossPips = parseFloat(document.getElementById('stop-loss-pips')?.value);
    const pipValue = parseFloat(document.getElementById('pip-value')?.value);
    
    if (!capital || !riskPercent || !stopLossPips || !pipValue) {
        const resultDiv = document.getElementById('leverage-result');
        if (resultDiv) resultDiv.innerHTML = '⚠️ الرجاء إدخال جميع القيم';
        return;
    }
    
    const riskAmount = capital * (riskPercent / 100);
    const positionSize = riskAmount / (stopLossPips * pipValue);
    
    const resultDiv = document.getElementById('leverage-result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <strong>النتائج:</strong><br>
            📊 المبلغ المعرض للخطر: $${riskAmount.toFixed(2)}<br>
            📈 حجم العقد: ${positionSize.toFixed(2)} لوت
        `;
    }
}

function calculatePositionSize() {
    const capital = parseFloat(document.getElementById('position-capital')?.value);
    const riskPercent = parseFloat(document.getElementById('position-risk')?.value);
    const stopLoss = parseFloat(document.getElementById('position-sl')?.value);
    const pipValue = parseFloat(document.getElementById('position-pip')?.value);
    
    if (!capital || !riskPercent || !stopLoss || !pipValue) {
        const resultDiv = document.getElementById('position-result');
        if (resultDiv) resultDiv.innerHTML = '⚠️ الرجاء إدخال جميع القيم';
        return;
    }
    
    const riskAmount = capital * (riskPercent / 100);
    const positionSize = riskAmount / (stopLoss * pipValue);
    
    const resultDiv = document.getElementById('position-result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <strong>النتائج:</strong><br>
            💰 المخاطرة: $${riskAmount.toFixed(2)}<br>
            ⚖️ حجم العقد: ${positionSize.toFixed(2)} لوت
        `;
    }
}

function calculateRiskManagement() {
    const capital = parseFloat(document.getElementById('risk-capital')?.value);
    const riskPerTrade = parseFloat(document.getElementById('risk-per-trade')?.value);
    const consecutiveLosses = parseFloat(document.getElementById('consecutive-losses')?.value);
    
    if (!capital || !riskPerTrade || !consecutiveLosses) {
        const resultDiv = document.getElementById('risk-result');
        if (resultDiv) resultDiv.innerHTML = '⚠️ الرجاء إدخال جميع القيم';
        return;
    }
    
    const riskAmount = capital * (riskPerTrade / 100);
    const maxLoss = riskAmount * consecutiveLosses;
    
    const resultDiv = document.getElementById('risk-result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <strong>النتائج:</strong><br>
            💰 المخاطرة لكل صفقة: $${riskAmount.toFixed(2)}<br>
            📉 أقصى خسارة: $${maxLoss.toFixed(2)}
        `;
    }
}
