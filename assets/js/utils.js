// Toast Notification System
const Toast = {
    container: null,

    init() {
        if (!document.getElementById('toast-container')) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.getElementById('toast-container');
        }
    },

    show(message, type = 'info') {
        if (!this.container) this.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const iconName = type === 'success' ? 'check' : type === 'error' ? 'alert-circle' : 'info';
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i data-lucide="${iconName}" class="w-5 h-5"></i>
            </div>
            <div class="flex-1">
                <p class="text-sm font-medium text-slate-900">${message}</p>
            </div>
        `;

        this.container.appendChild(toast);
        lucide.createIcons();

        // Trigger animation
        requestAnimationFrame(() => toast.classList.add('show'));

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Global Handler for Static Links
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Toast
    Toast.init();

    // Handle empty links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href === '#' || href === '') {
                e.preventDefault();
                Toast.show('This feature is currently under development.', 'info');
            }
        }
        
        // Handle static buttons (if they don't have specific handlers)
        // We can add a class 'static-btn' to buttons that should show this message
        const staticBtn = e.target.closest('.static-btn');
        if (staticBtn) {
           e.preventDefault();
           Toast.show('This feature is currently under development.', 'info'); 
        }
    });
});
