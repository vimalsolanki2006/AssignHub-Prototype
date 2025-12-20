// Faculty Module specific logic

// Assignments Dropdown
function toggleDropdown(id) {
    const menu = document.getElementById(id);
    const allMenus = document.querySelectorAll('[id^="action-menu-"]');

    allMenus.forEach(m => {
        if (m.id !== id) m.classList.add('hidden');
    });

    if (menu) menu.classList.toggle('hidden');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('button[onclick^="toggleDropdown"]') && !e.target.closest('[id^="action-menu-"]')) {
        document.querySelectorAll('[id^="action-menu-"]').forEach(menu => {
            menu.classList.add('hidden');
        });
    }
});

// Create Assignment Mock
function createAssignment() {
    Toast.show('Assignment created successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'assignments.html';
    }, 1000);
}

// Evaluate Submission Marks Update
function updateMarks(val) {
    const display = document.getElementById('marks-display');
    if (display) display.innerText = val;
}

// Submit Evaluation Mock
function submitEvaluation() {
    Toast.show('Evaluation saved successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'submissions.html';
    }, 1000);
}

// Mock CSV Export
function downloadMockCSV() {
    Toast.show('Submissions exported to CSV', 'info'); // Using info for export
}

// Profile Edit Toggle
function toggleEdit() {
    const editBtn = document.getElementById('edit-btn');
    const saveCancelBtns = document.getElementById('save-cancel-btns');
    const inputs = document.querySelectorAll('.profile-input');

    if (editBtn && !editBtn.classList.contains('hidden')) {
        // Switch to Edit Mode
        inputs.forEach(input => {
            input.disabled = false;
            input.classList.remove('bg-slate-50', 'text-slate-500');
            input.classList.add('bg-white', 'text-slate-900', 'focus:outline-none', 'focus:border-blue-500');
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
            input.classList.remove('bg-white', 'text-slate-900', 'focus:outline-none', 'focus:border-blue-500');
        });
        if (editBtn) editBtn.classList.remove('hidden');
        if (saveCancelBtns) {
            saveCancelBtns.classList.add('hidden');
            saveCancelBtns.classList.remove('flex');
        }
    }
}
