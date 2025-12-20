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

// Global Form Handler for Admin Pages
document.addEventListener('DOMContentLoaded', () => {
    // Handle all forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get submit button to show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerText : '';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin mx-auto"></i>';
                lucide.createIcons();
            }

            // Simulate API call
            setTimeout(() => {
                Toast.show('Changes saved successfully!', 'success');

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                }

                // If form is in a modal, close it
                const modal = form.closest('[id$="-modal"]') || form.closest('.fixed');
                if (modal) {
                    toggleModal(modal.id);
                }
            }, 1000);
        });
    });
    // Admin Filter Logic
    const userSearch = document.getElementById('user-search');
    const roleFilter = document.getElementById('role-filter');
    const statusFilter = document.getElementById('status-filter');
    const usersTableBody = document.getElementById('users-table-body');

    if (userSearch && usersTableBody) {
        function filterUsers() {
            const rows = usersTableBody.querySelectorAll('tr');
            const term = userSearch.value.toLowerCase();
            const role = roleFilter ? roleFilter.value : 'all';
            const status = statusFilter ? statusFilter.value : 'all';

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                const matchesSearch = text.includes(term);
                const matchesRole = role === 'all' || text.includes(role);
                const matchesStatus = status === 'all' || text.includes(status);

                if (matchesSearch && matchesRole && matchesStatus) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        userSearch.addEventListener('input', filterUsers);
        if (roleFilter) roleFilter.addEventListener('change', filterUsers);
        if (statusFilter) statusFilter.addEventListener('change', filterUsers);
    }
});
