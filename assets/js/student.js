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
