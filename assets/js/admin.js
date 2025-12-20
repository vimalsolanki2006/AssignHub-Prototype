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
    const activeBtn = document.querySelector(`.tab-btn[onclick="switchTab('${tabId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.borderBottomColor = '#4f46e5'; // indigo-600
        activeBtn.style.color = '#4f46e5';
    }
}


// Filtering Logic
function setupFilters(config) {
    const { itemSelector, filters } = config;
    const filterElements = {};

    // Cache filter inputs
    for (const [id, setting] of Object.entries(filters)) {
        const el = document.getElementById(id);
        if (el) {
            filterElements[id] = { el, ...setting };
            el.addEventListener(setting.type === 'search' ? 'input' : 'change', applyFilters);
        }
    }

    function applyFilters() {
        const items = document.querySelectorAll(itemSelector);

        items.forEach(item => {
            let isVisible = true;

            for (const [id, setting] of Object.entries(filterElements)) {
                const { el, type, attr } = setting;
                const value = el.value.toLowerCase();

                // Skip if 'all' or empty search
                if (value === 'all' || value === '') continue;

                const itemValue = (item.getAttribute(attr) || '').toLowerCase();

                if (type === 'search') {
                    if (!itemValue.includes(value)) {
                        isVisible = false;
                        break;
                    }
                } else {
                    if (itemValue !== value) {
                        isVisible = false;
                        break;
                    }
                }
            }

            if (isVisible) {
                item.classList.remove('hidden');
                // Ensure layout doesn't break for grids if 'hidden' is just display:none
                item.style.display = '';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none'; // Explicitly hide
            }
        });
    }
}

// Initialize Filters
document.addEventListener('DOMContentLoaded', () => {
    // Users Page
    if (document.getElementById('user-search')) {
        setupFilters({
            itemSelector: 'tbody tr[data-role]', // Target rows with data attributes
            filters: {
                'user-search': { type: 'search', attr: 'data-search-terms' },
                'role-filter': { type: 'select', attr: 'data-role' },
                'status-filter': { type: 'select', attr: 'data-status' }
            }
        });
    }

    // Courses Page
    if (document.getElementById('course-search')) {
        setupFilters({
            itemSelector: 'tbody tr[data-semester]',
            filters: {
                'course-search': { type: 'search', attr: 'data-search-terms' },
                'semester-filter': { type: 'select', attr: 'data-semester' },
                'dept-filter': { type: 'select', attr: 'data-department' }
            }
        });
    }

    // Batches Page
    if (document.getElementById('year-filter')) {
        setupFilters({
            itemSelector: 'div[data-year]', // Batch Cards
            filters: {
                'year-filter': { type: 'select', attr: 'data-year' },
                'semester-filter': { type: 'select', attr: 'data-semester' }
            }
        });
    }

    // Logs Page
    if (document.getElementById('log-search')) {
        setupFilters({
            itemSelector: 'tbody tr[data-action]',
            filters: {
                'log-search': { type: 'search', attr: 'data-search-terms' },
                'action-filter': { type: 'select', attr: 'data-action' },
                'role-filter': { type: 'select', attr: 'data-role' }
            }
        });
    }
});