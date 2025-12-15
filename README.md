# AssignHub

**AssignHub** is a comprehensive assignment management system designed to streamline the workflow between Administrators, Faculty, and Students. It provides a centralized platform for managing courses, users, assignments, submissions, and evaluations.

![AssignHub Dashboard](AssignHub_Dashboard.png)

## 🚀 Features

### 👑 Admin Module
*   **Dashboard**: Overview of system statistics (users, active courses) and recent activity logs.
*   **User Management**: create, view, edit, deactivate, and reset passwords for students, faculty, and other admins.
*   **Course Management**: Create, edit, archive, and manage students within courses.
*   **Batch Management**: Manage student batches and coordinate assignments.
*   **System Settings**: Configure academic years, maintenance modes, and access data archiving options.
*   **Activity Logs**: Track system-wide events for security and auditing.

### 🎓 Faculty Module
*   **Dashboard**: Track active assignments, pending evaluations, and recent submissions.
*   **Assignment Creation**: Create assignments with detailed configurations:
    *   Allowed file types and size limits.
    *   Deadlines and late submission policies (Strict vs. Penalty).
    *   Reference material uploads.
*   **Assignment Management**: Edit details, extend deadlines, publish/unpublish, and delete assignments.
*   **Evaluation**: Grade submissions, provide rich text feedback, and upload corrected/annotated files for students.
*   **My Courses**: View assigned courses and manage specific course activities.

### 🎒 Student Module
*   **Dashboard**: View pending assignments, recent grades, and notifications.
*   **Assignment Submission**:
    *   Upload assignments (drag & drop support).
    *   Add comments for faculty.
*   **Submission Management**:
    *   **Revision**: Replace files before the deadline.
    *   **History**: View submission timestamps and status.
*   **Results**: View detailed scorecards, faculty feedback, and download corrected files.
*   **Profile**: Manage personal details and change passwords.

## 🛠️ Technology Stack
*   **Core**: HTML5, JavaScript (Vanilla)
*   **Styling**: Tailwind CSS (via CDN), Custom CSS
*   **Icons**: Lucide Icons
*   **Fonts**: Inter (Google Fonts)

## 📂 Project Structure
```
AssignHub/
├── index.html              # Landing Page
├── auth.html               # Authentication (Login/Signup)
├── admin/                  # Admin Module
│   ├── dashboard.html
│   ├── users.html
│   ├── courses.html
│   ├── batches.html
│   ├── logs.html
│   └── settings.html
├── faculty/                # Faculty Module
│   ├── dashboard.html
│   ├── create-assignment.html
│   ├── assignments.html
│   ├── submissions.html
│   ├── evaluate.html
│   ├── courses.html
│   ├── students.html
│   └── profile.html
└── student/                # Student Module
    ├── dashboard.html
    ├── assignments.html
    ├── assignment-detail.html
    ├── courses.html
    ├── notifications.html
    └── profile.html
```

## 🚀 Getting Started
1.  Open `index.html` in your web browser.
2.  Navigate to `Login`.
3.  Choose your role (Student, Faculty, or Admin) to access the respective dashboard.
    *   *Note: This is a static prototype. Authentication is simulated.*

## 🎨 UI/UX Design
The project follows a modern, consistent **Teal/Blue** color scheme across all modules to ensure a professional and cohesive user experience. It features responsive sidebars, modal interactions, and smooth transitions.
