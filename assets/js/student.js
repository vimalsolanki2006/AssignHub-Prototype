// Student Module Specific Logic

document.addEventListener('DOMContentLoaded', () => {
    // Assignment Detail Initialization
    if (window.location.pathname.includes('assignment-detail.html')) {
        initAssignmentDetail();
    }
});

function initAssignmentDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status === 'submitted') {
        showSubmittedView();
    } else if (status === 'evaluated') {
        showEvaluatedView();
    }
}

function showUploadForm() {
    safeToggle('upload-form-container', true);
    safeToggle('submitted-view', false);
    safeToggle('evaluated-view', false);
}

function showSubmittedView() {
    safeToggle('upload-form-container', false);
    safeToggle('submitted-view', true);
    safeToggle('evaluated-view', false);
}

function showEvaluatedView() {
    safeToggle('upload-form-container', false);
    safeToggle('submitted-view', false);
    safeToggle('evaluated-view', true);
}

function safeToggle(id, show) {
    const el = document.getElementById(id);
    if (el) {
        if (show) el.classList.remove('hidden');
        else el.classList.add('hidden');
    }
}

function handleFileSelect(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const emptyState = document.getElementById('upload-empty');
        const selectedState = document.getElementById('upload-selected');
        const submitBtn = document.getElementById('submit-btn');
        const filenameDisplay = document.getElementById('filename-display');

        if (emptyState) emptyState.classList.add('hidden');
        if (selectedState) {
            selectedState.classList.remove('hidden');
            selectedState.classList.add('flex');
        }
        if (filenameDisplay) filenameDisplay.innerText = file.name;
        if (submitBtn) submitBtn.disabled = false;
    }
}

function clearFile() {
    const fileInput = document.getElementById('file-input');
    const emptyState = document.getElementById('upload-empty');
    const selectedState = document.getElementById('upload-selected');
    const submitBtn = document.getElementById('submit-btn');

    if (fileInput) fileInput.value = '';
    if (emptyState) emptyState.classList.remove('hidden');
    if (selectedState) {
        selectedState.classList.add('hidden');
        selectedState.classList.remove('flex');
    }
    if (submitBtn) submitBtn.disabled = true;
}

function submitAssignment() {
    // Use global Toast
    if (typeof Toast !== 'undefined') {
        Toast.show('Assignment submitted successfully!', 'success');
    } else {
        alert('Assignment submitted successfully!');
    }

    setTimeout(() => {
        // Simulate reload to submitted state (if we had a real backend)
        // For prototype, we just switch view if possible
        showSubmittedView();
    }, 1000);
}

function toggleEdit() {
    const editBtn = document.getElementById('edit-btn');
    const saveCancelBtns = document.getElementById('save-cancel-btns');
    const inputs = document.querySelectorAll('.profile-input');

    if (editBtn && !editBtn.classList.contains('hidden')) {
        // Switch to Edit Mode
        inputs.forEach(input => {
            input.disabled = false;
            input.classList.remove('bg-slate-50', 'text-slate-500');
            input.classList.add('bg-white', 'text-slate-900', 'focus:outline-none', 'focus:border-teal-500');
        });
        editBtn.classList.add('hidden');
        if (saveCancelBtns) {
            saveCancelBtns.classList.remove('hidden');
            saveCancelBtns.classList.add('flex');
        }
    } else {
        // Switch to View Mode
        inputs.forEach(input => {
            input.disabled = true;
            input.classList.add('bg-slate-50', 'text-slate-500');
            input.classList.remove('bg-white', 'text-slate-900', 'focus:outline-none', 'focus:border-teal-500');
        });
        if (editBtn) editBtn.classList.remove('hidden');
        if (saveCancelBtns) {
            saveCancelBtns.classList.add('hidden');
            saveCancelBtns.classList.remove('flex');
        }
    }
}

// Assignment Filtering Logic
document.addEventListener('DOMContentLoaded', () => {
    // Only run if on assignments page and elements exist
    const searchInput = document.getElementById('assignment-search');
    const courseFilter = document.getElementById('course-filter');
    const statusFilters = document.getElementById('status-filters');
    const assignmentsList = document.getElementById('assignments-list');

    if (searchInput && courseFilter && statusFilters && assignmentsList) {
        const urlParams = new URLSearchParams(window.location.search);
        let currentSearch = '';
        let currentCourse = 'all';
        let currentStatus = urlParams.get('filter') || 'all';

        // Set initial active state for status buttons
        if (currentStatus !== 'all') {
            statusFilters.querySelectorAll('.filter-btn').forEach(btn => {
                if (btn.getAttribute('data-status') === currentStatus) {
                    btn.classList.add('active', 'text-teal-600', 'border-b-2', 'border-teal-500');
                    btn.classList.remove('text-slate-500', 'hover:text-slate-700');
                } else {
                    btn.classList.remove('active', 'text-teal-600', 'border-b-2', 'border-teal-500');
                    btn.classList.add('text-slate-500', 'hover:text-slate-700');
                }
            });
        }

        function filterAssignments() {
            const cards = assignmentsList.querySelectorAll('.assignment-card');
            let visibleCount = 0;

            cards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                const course = card.getAttribute('data-course');
                const status = card.getAttribute('data-status');

                const matchesSearch = title.includes(currentSearch);
                const matchesCourse = currentCourse === 'all' || course === currentCourse;
                const matchesStatus = currentStatus === 'all' || status === currentStatus;

                if (matchesSearch && matchesCourse && matchesStatus) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            // Show empty state if no matches (optional enhancement)
            // const emptyState = document.getElementById('no-assignments-message');
            // if (visibleCount === 0 && emptyState) emptyState.classList.remove('hidden');
            // else if (emptyState) emptyState.classList.add('hidden');
        }

        // Initial Filter Run
        filterAssignments();

        // Search Input Listener
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            filterAssignments();
        });

        // Course Filter Listener
        courseFilter.addEventListener('change', (e) => {
            currentCourse = e.target.value;
            filterAssignments();
        });

        // Status Filter Buttons
        statusFilters.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Update UI
                statusFilters.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active', 'text-teal-600', 'border-b-2', 'border-teal-500');
                    b.classList.add('text-slate-500', 'hover:text-slate-700');
                });
                btn.classList.add('active', 'text-teal-600', 'border-b-2', 'border-teal-500');
                btn.classList.remove('text-slate-500', 'hover:text-slate-700');

                // Update Filter
                currentStatus = btn.getAttribute('data-status');
                filterAssignments();
            });
        });
    }
});
