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

// Faculty Filtering Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Courses Page Filtering
    const courseSearch = document.getElementById('course-search');
    const coursesList = document.getElementById('courses-list');

    if (courseSearch && coursesList) {
        courseSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const cards = coursesList.querySelectorAll('.course-card');

            cards.forEach(card => {
                const name = card.getAttribute('data-name');
                const code = card.getAttribute('data-code');
                if (name.includes(term) || code.includes(term)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }

    // 2. Assignments Page Filtering
    const assignmentSearch = document.getElementById('assignment-search');
    const courseFilter = document.getElementById('course-filter');
    const statusFilter = document.getElementById('status-filter');
    const assignmentsList = document.getElementById('assignments-list');

    if (assignmentSearch && courseFilter && statusFilter && assignmentsList) {
        const urlParams = new URLSearchParams(window.location.search);
        let currentSearch = '';
        let currentCourse = urlParams.get('course') ? (urlParams.get('course') === '1' ? 'ce401' : urlParams.get('course') === '2' ? 'ce405' : 'all') : 'all'; // Simple mapping for demo
        let currentStatus = 'all';

        // Pre-select course filter if URL param exists
        if (currentCourse !== 'all') {
            courseFilter.value = currentCourse;
        }

        function filterAssignments() {
            const cards = assignmentsList.querySelectorAll('.assignment-card');

            cards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                const course = card.getAttribute('data-course');
                const status = card.getAttribute('data-status');

                const matchesSearch = title.includes(currentSearch);
                const matchesCourse = currentCourse === 'all' || course === currentCourse;
                const matchesStatus = currentStatus === 'all' || status === currentStatus;

                if (matchesSearch && matchesCourse && matchesStatus) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }

        // Run initial filter (in case of URL params)
        filterAssignments();

        assignmentSearch.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            filterAssignments();
        });

        courseFilter.addEventListener('change', (e) => {
            currentCourse = e.target.value;
            filterAssignments();
        });

        statusFilter.addEventListener('change', (e) => {
            currentStatus = e.target.value;
            filterAssignments();
        });
    }

    // 3. Students Page Filtering
    const studentSearch = document.getElementById('student-search');
    const studentCourseFilter = document.getElementById('course-filter');
    const studentBatchFilter = document.getElementById('batch-filter');
    const studentsTableBody = document.getElementById('students-table-body');

    if (studentsTableBody && (studentSearch || studentCourseFilter || studentBatchFilter)) {
        function filterStudents() {
            const rows = studentsTableBody.querySelectorAll('tr');
            const searchTerm = studentSearch ? studentSearch.value.toLowerCase() : '';
            const courseVal = studentCourseFilter ? studentCourseFilter.value : 'all';
            const batchVal = studentBatchFilter ? studentBatchFilter.value : 'all';

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                const matchesSearch = text.includes(searchTerm);
                const matchesCourse = courseVal === 'all' || text.includes(courseVal);
                const matchesBatch = batchVal === 'all' || text.includes(batchVal);

                if (matchesSearch && matchesCourse && matchesBatch) {
                    row.classList.remove('hidden');
                } else {
                    row.classList.add('hidden');
                }
            });
        }

        if (studentSearch) studentSearch.addEventListener('input', filterStudents);
        if (studentCourseFilter) studentCourseFilter.addEventListener('change', filterStudents);
        if (studentBatchFilter) studentBatchFilter.addEventListener('change', filterStudents);
    }

    // 4. Submissions Page Filtering
    const submissionSearch = document.getElementById('submission-search');
    const submissionAssignmentFilter = document.getElementById('assignment-filter');
    const submissionStatusFilter = document.getElementById('status-filter');
    const submissionsTableBody = document.getElementById('submissions-table-body');

    if (submissionsTableBody && (submissionSearch || submissionAssignmentFilter || submissionStatusFilter)) {
        function filterSubmissions() {
            const rows = submissionsTableBody.querySelectorAll('tr');
            const searchTerm = submissionSearch ? submissionSearch.value.toLowerCase().trim() : '';
            const assignmentVal = submissionAssignmentFilter ? submissionAssignmentFilter.value.toLowerCase() : 'all';
            const statusVal = submissionStatusFilter ? submissionStatusFilter.value.toLowerCase() : 'all';

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                const rowAssignment = row.getAttribute('data-assignment') ? row.getAttribute('data-assignment').toLowerCase() : '';
                const rowStatus = row.getAttribute('data-status') ? row.getAttribute('data-status').toLowerCase() : '';

                const matchesSearch = text.includes(searchTerm);
                const matchesAssignment = assignmentVal === 'all' || (rowAssignment ? rowAssignment === assignmentVal : text.includes(assignmentVal));
                const matchesStatus = statusVal === 'all' || (rowStatus ? rowStatus === statusVal : text.includes(statusVal));

                if (matchesSearch && matchesAssignment && matchesStatus) {
                    row.classList.remove('hidden');
                } else {
                    row.classList.add('hidden');
                }
            });
        }

        if (submissionSearch) submissionSearch.addEventListener('input', filterSubmissions);
        if (submissionAssignmentFilter) submissionAssignmentFilter.addEventListener('change', filterSubmissions);
        if (submissionStatusFilter) submissionStatusFilter.addEventListener('change', filterSubmissions);
    }
});
