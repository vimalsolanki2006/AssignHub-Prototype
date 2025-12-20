// Admin Module specific logic

// Modal Toggle
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Find content div by ID prefix conventions or generic selector
    let content = modal.querySelector('div[id$="-content"]');
    if (!content) content = modal.firstElementChild;

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
        }, 10);
    } else {
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

// Modal Tab Switching
function switchModalTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.modal-tab-content').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('active');
    });

    // Reset all tab buttons
    document.querySelectorAll('.modal-tab-btn').forEach(el => {
        el.classList.remove('active');
        el.style.borderBottomColor = 'transparent';
        el.style.color = '#475569'; // slate-600
    });

    // Show selected tab content
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');
    }

    // Activate button
    const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.borderBottomColor = '#4f46e5'; // indigo-600
        activeBtn.style.color = '#4f46e5';
    }
}

// Dropdown Toggle
function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    // Close others
    document.querySelectorAll('.dropdown-menu').forEach(d => {
        if (d.id !== id) d.classList.add('hidden');
    });
    if (dropdown) dropdown.classList.toggle('hidden');
}

// Close events
document.addEventListener('click', function (event) {
    // Close dropdowns
    if (!event.target.closest('.dropdown-container')) {
        document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.add('hidden'));
    }
    // Close modal if clicked specific outside area (optional, usually handled by overlay click)
    // if (event.target.id === 'mobile-overlay') { ... } 
});

// General Tab Switching (for pages like Settings)
function switchTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('active');
    });

    // Reset all tab buttons
    document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('active');
        el.style.borderBottomColor = 'transparent';
        el.style.color = '#475569'; // slate-600
    });

    // Show selected tab content
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');
    }

    // Activate button
    const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.borderBottomColor = '#4f46e5'; // indigo-600
        activeBtn.style.color = '#4f46e5';
    }
}
