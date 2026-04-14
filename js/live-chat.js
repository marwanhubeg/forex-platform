// =====================================================
// شات مباشر – دعم فوري للمستخدمين
// =====================================================

class LiveChat {
    constructor() {
        this.messages = [];
        this.init();
    }
    
    init() {
        this.createChatWidget();
        this.loadMessages();
        this.startPolling();
    }
    
    createChatWidget() {
        const widget = document.createElement('div');
        widget.className = 'chat-widget';
        widget.innerHTML = `
            <div class="chat-button" onclick="chat.toggle()">
                💬 <span class="chat-badge">1</span>
            </div>
            <div class="chat-container" style="display: none;">
                <div class="chat-header">
                    <span>💬 دعم VIP</span>
                    <button onclick="chat.toggle()">✕</button>
                </div>
                <div class="chat-messages" id="chatMessages"></div>
                <div class="chat-input">
                    <input type="text" placeholder="اكتب رسالتك..." id="chatInput">
                    <button onclick="chat.sendMessage()">📤</button>
                </div>
            </div>
        `;
        document.body.appendChild(widget);
        
        // إضافة CSS
        this.addChatStyles();
    }
    
    addChatStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .chat-widget {
                position: fixed;
                bottom: 100px;
                right: 20px;
                z-index: 10000;
            }
            .chat-button {
                background: linear-gradient(135deg, #6366f1, #4f46e5);
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 5px 20px rgba(99,102,241,0.4);
                transition: all 0.3s;
                position: relative;
            }
            .chat-button:hover { transform: scale(1.1); }
            .chat-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ef4444;
                color: white;
                font-size: 0.7rem;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .chat-container {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                background: var(--bg-card);
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                display: flex;
                flex-direction: column;
            }
            .chat-header {
                background: var(--primary);
                padding: 15px;
                display: flex;
                justify-content: space-between;
                color: white;
            }
            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 15px;
            }
            .chat-input {
                display: flex;
                padding: 10px;
                gap: 10px;
                border-top: 1px solid var(--border-color);
            }
            .chat-input input {
                flex: 1;
                padding: 10px;
                border-radius: 20px;
                border: 1px solid var(--border-color);
                background: var(--bg-primary);
                color: white;
            }
            .chat-input button {
                background: var(--primary);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
            }
            .message {
                margin-bottom: 10px;
                padding: 8px 12px;
                border-radius: 15px;
                max-width: 80%;
            }
            .message.user {
                background: var(--primary);
                color: white;
                margin-left: auto;
            }
            .message.support {
                background: var(--bg-secondary);
                color: var(--text-secondary);
            }
        `;
        document.head.appendChild(style);
    }
    
    toggle() {
        const container = document.querySelector('.chat-container');
        container.style.display = container.style.display === 'none' ? 'flex' : 'none';
    }
    
    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // إرسال إلى الخادم
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, userId: localStorage.getItem('user_id') })
        });
        
        const data = await response.json();
        if (data.reply) {
            setTimeout(() => this.addMessage(data.reply, 'support'), 1000);
        }
    }
    
    addMessage(text, type) {
        const container = document.getElementById('chatMessages');
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        container.appendChild(message);
        container.scrollTop = container.scrollHeight;
    }
    
    startPolling() {
        setInterval(async () => {
            const response = await fetch('/api/chat/poll');
            const messages = await response.json();
            messages.forEach(msg => {
                if (!this.messages.includes(msg.id)) {
                    this.addMessage(msg.text, 'support');
                    this.messages.push(msg.id);
                }
            });
        }, 5000);
    }
}

// تشغيل الشات
const chat = new LiveChat();
