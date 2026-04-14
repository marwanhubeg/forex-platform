// =====================================================
// وضع القراءة – تجربة قراءة مريحة
// =====================================================

class ReadingMode {
    constructor() {
        this.isActive = false;
        this.init();
    }
    
    init() {
        this.addReadingButton();
        this.loadPreferences();
    }
    
    addReadingButton() {
        const button = document.createElement('button');
        button.className = 'reading-mode-btn';
        button.innerHTML = '📖 وضع القراءة';
        button.onclick = () => this.toggle();
        document.querySelector('.article-content')?.appendChild(button);
        
        // CSS للزر
        const style = document.createElement('style');
        style.textContent = `
            .reading-mode-btn {
                position: fixed;
                bottom: 30px;
                right: 100px;
                background: var(--primary);
                color: white;
                padding: 10px 20px;
                border-radius: 50px;
                border: none;
                cursor: pointer;
                z-index: 1000;
                font-weight: bold;
            }
            .reading-mode {
                background: #f5f5dc !important;
                color: #333 !important;
            }
            .reading-mode * {
                max-width: 800px !important;
                margin-left: auto !important;
                margin-right: auto !important;
                font-size: 18px !important;
                line-height: 1.8 !important;
            }
            .reading-mode .reading-mode-btn {
                background: #333;
                color: white;
            }
        `;
        document.head.appendChild(style);
    }
    
    toggle() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            document.body.classList.add('reading-mode');
            localStorage.setItem('reading_mode', 'true');
        } else {
            document.body.classList.remove('reading-mode');
            localStorage.setItem('reading_mode', 'false');
        }
    }
    
    loadPreferences() {
        const saved = localStorage.getItem('reading_mode');
        if (saved === 'true') {
            this.isActive = true;
            document.body.classList.add('reading-mode');
        }
    }
}

// تشغيل
const readingMode = new ReadingMode();
