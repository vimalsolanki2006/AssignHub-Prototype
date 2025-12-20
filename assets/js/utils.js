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

        // Handle Button Actions
        const button = e.target.closest('button');
        if (button) {
            // Check for Export/Download buttons
            if (button.textContent.trim().includes('Export') || button.textContent.trim().includes('Download')) {
                // Allow meaningful downloads if they have specific logic, else show toast
                if (!button.onclick && !button.hasAttribute('onclick')) {
                    Toast.show('Exporting data... (Demo)', 'success');
                }
            }

            // Check for Notification Bell
            if (button.querySelector('[data-lucide="bell"]')) {
                if (!button.onclick && !button.hasAttribute('onclick')) {
                    Toast.show('No new notifications', 'info');
                }
            }

            // Handle static buttons explicitly marked
            if (button.classList.contains('static-btn')) {
                e.preventDefault();
                Toast.show('This feature is currently under development.', 'info');
            }
        }
    });

    // Handle Search Inputs (Enter key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type === 'text') {
            if (e.target.placeholder && e.target.placeholder.toLowerCase().includes('search')) {
                Toast.show(`Searching for "${e.target.value}"...`, 'info');
            }
        }
    });

    // Handle Filter Changes
    document.addEventListener('change', (e) => {
        if (e.target.tagName === 'SELECT') {
            Toast.show(`Filter applied: ${e.target.options[e.target.selectedIndex].text}`, 'info');
        }
    });
});
