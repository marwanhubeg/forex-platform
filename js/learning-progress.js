// =====================================================
// نظام تقدم تعليمي – تتبع تقدم المستخدم
// =====================================================

class LearningProgress {
    constructor() {
        this.progress = this.loadProgress();
        this.init();
    }
    
    init() {
        this.trackLessonCompletion();
        this.updateProgressBar();
        this.addCertificateButton();
    }
    
    loadProgress() {
        return JSON.parse(localStorage.getItem('learning_progress')) || {
            completed: [],
            total: 0,
            lastLesson: null,
            startDate: new Date().toISOString()
        };
    }
    
    trackLessonCompletion() {
        const currentLesson = window.location.pathname;
        const lessonId = currentLesson.split('/').pop();
        
        if (!this.progress.completed.includes(lessonId)) {
            // حساب وقت القراءة
            let timeSpent = 0;
            const interval = setInterval(() => {
                timeSpent++;
            }, 1000);
            
            window.addEventListener('beforeunload', () => {
                if (timeSpent > 60) { // إذا قرأ أكثر من دقيقة
                    this.progress.completed.push(lessonId);
                    this.progress.total++;
                    this.progress.lastLesson = lessonId;
                    this.saveProgress();
                    this.showCompletionMessage();
                }
                clearInterval(interval);
            });
        }
    }
    
    updateProgressBar() {
        const totalLessons = document.querySelectorAll('.lesson-card').length;
        const percent = (this.progress.completed.length / totalLessons) * 100;
        
        const progressBar = document.querySelector('.learning-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${percent}%`;
            progressBar.textContent = `${Math.floor(percent)}%`;
        }
        
        // إضافة لوحة التقدم
        this.addProgressPanel(percent, totalLessons);
    }
    
    addProgressPanel(percent, total) {
        const panel = document.createElement('div');
        panel.className = 'progress-panel';
        panel.innerHTML = `
            <div class="progress-header">
                <span>📚 تقدمك التعليمي</span>
                <span>${this.progress.completed.length}/${total} درس</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-fill" style="width: ${percent}%"></div>
            </div>
            <div class="progress-stats">
                <span>🎯 ${Math.floor(percent)}% مكتمل</span>
                <span>⭐ ${this.calculateLevel(percent)}</span>
            </div>
        `;
        
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.insertBefore(panel, sidebar.firstChild);
        }
    }
    
    calculateLevel(percent) {
        if (percent >= 80) return 'متقدم 🔥';
        if (percent >= 50) return 'متوسط 📈';
        if (percent >= 20) return 'مبتدئ 📚';
        return 'بداية 🌱';
    }
    
    showCompletionMessage() {
        const message = document.createElement('div');
        message.className = 'completion-toast';
        message.innerHTML = '🎉 أتقنت هذا الدرس! +10 نقاط';
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }
    
    addCertificateButton() {
        if (this.progress.completed.length >= 10) {
            const btn = document.createElement('button');
            btn.className = 'certificate-btn';
            btn.innerHTML = '🎓 احصل على شهادتك';
            btn.onclick = () => this.generateCertificate();
            document.querySelector('.progress-panel')?.appendChild(btn);
        }
    }
    
    generateCertificate() {
        const certificate = `
            <div class="certificate">
                <h1>🎓 شهادة إتمام</h1>
                <p>هذه الشهادة تمنح إلى</p>
                <h2>${localStorage.getItem('user_name') || 'المتعلم المتميز'}</h2>
                <p>لإكمال ${this.progress.completed.length} درساً في منصة التحليل التعليمي للفوركس</p>
                <p>التاريخ: ${new Date().toLocaleDateString('ar')}</p>
            </div>
        `;
        
        const win = window.open();
        win.document.write(certificate);
        win.print();
    }
    
    saveProgress() {
        localStorage.setItem('learning_progress', JSON.stringify(this.progress));
    }
}

// تشغيل
const progress = new LearningProgress();
