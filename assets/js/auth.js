// Auth Page Specific Logic

// Animation on load
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('auth-container');
    if (container) {
        setTimeout(() => {
            container.classList.remove('opacity-0', 'translate-x-5');
        }, 100);
    }
    updateVisibility();
});

let isSignup = false;
let selectedRole = 'student';

const roles = {
    student: { color: 'bg-teal-500', text: 'text-teal-700' },
    faculty: { color: 'bg-blue-600', text: 'text-blue-700' },
    admin: { color: 'bg-indigo-600', text: 'text-indigo-700' }
};

function selectRole(role) {
    selectedRole = role;

    // Reset all buttons
    ['student', 'faculty', 'admin'].forEach(r => {
        const btn = document.getElementById(`role-${r}`);
        const iconContainer = btn.querySelector('.icon-container');
        const iconSvg = btn.querySelector('.icon-svg');
        const label = btn.querySelector('.label-text');

        if (r === role) {
            btn.className = `role-btn p-4 rounded-xl border-2 transition-all border-teal-500 bg-teal-50`;
            iconContainer.className = `w-10 h-10 ${roles[role].color} rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors icon-container`;
            iconSvg.classList.remove('text-slate-500');
            iconSvg.classList.add('text-white');
            label.className = `text-sm font-medium ${roles[role].text} label-text`;
        } else {
            btn.className = `role-btn p-4 rounded-xl border-2 transition-all border-slate-200 bg-white hover:border-slate-300`;
            iconContainer.className = `w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors icon-container`;
            iconSvg.classList.remove('text-white');
            iconSvg.classList.add('text-slate-500');
            label.className = `text-sm font-medium text-slate-600 label-text`;
        }
    });

    updateVisibility();
}

function toggleMode() {
    isSignup = !isSignup;

    const title = document.getElementById('form-title');
    const subtitle = document.getElementById('form-subtitle');
    const submitBtn = document.getElementById('submit-btn');
    const toggleText = document.getElementById('toggle-text');
    const toggleBtn = document.getElementById('toggle-btn');
    const forgotPwd = document.getElementById('forgot-password-link');

    if (isSignup) {
        title.innerText = 'Create Account';
        subtitle.innerText = 'Sign up to get started with AssignHub';
        submitBtn.innerText = 'Create Account';
        toggleText.innerText = 'Already have an account?';
        toggleBtn.innerText = 'Sign In';
        forgotPwd.classList.add('hidden');
    } else {
        title.innerText = 'Welcome Back';
        subtitle.innerText = 'Sign in to continue to your dashboard';
        submitBtn.innerText = 'Sign In';
        toggleText.innerText = "Don't have an account?";
        toggleBtn.innerText = 'Sign Up';
        forgotPwd.classList.remove('hidden');
    }

    updateVisibility();
}

function updateVisibility() {
    const signupFields = document.getElementById('signup-fields');
    const studentFields = document.getElementById('student-fields');

    if (!signupFields || !studentFields) return;

    if (isSignup) {
        signupFields.classList.remove('hidden-field');
        if (selectedRole === 'student') {
            studentFields.classList.remove('hidden-field');
        } else {
            studentFields.classList.add('hidden-field');
        }
    } else {
        signupFields.classList.add('hidden-field');
        studentFields.classList.add('hidden-field');
    }
}

function handleAuth(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerText;

    // Simulate Loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin mx-auto"></i>';
    lucide.createIcons();

    setTimeout(() => {
        if (isSignup) {
            Toast.show('Account created successfully! Redirecting...', 'success');
        } else {
            Toast.show('Login successful! Redirecting...', 'success');
        }

        setTimeout(() => {
            // Redirect logic
            if (selectedRole === 'student') {
                window.location.href = 'student/dashboard.html';
            } else if (selectedRole === 'faculty') {
                window.location.href = 'faculty/dashboard.html';
            } else if (selectedRole === 'admin') {
                window.location.href = 'admin/dashboard.html';
            }
        }, 1000); // 1s delay for toast

    }, 1500); // 1.5s delay for loading
}
