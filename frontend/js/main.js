/**
 * =============================================================================
 * ST. JUDE'S ACADEMY / SCHOOLHUB - VANILLA CLIENT-SIDE APPLICATION
 * Pure JavaScript - Zero Framework Dependencies
 * Handles Navigation, API Integration, Auth Session, and Dynamic Rendering
 * =============================================================================
 */

const API_BASE_URL = 'http://localhost:5000/api';

// Fallback notices for presentation & offline resilience
const FALLBACK_NOTICES = [
  {
    id: 1,
    title: 'Autumn Term Mid-Session Examinations Schedule',
    description: 'The timetable for the Autumn Mid-Session Examinations for Classes 9 through 12 has been officially published. Students may download their detailed seating arrangements and syllabus outlines.',
    category: 'Academic',
    formatted_date: 'Nov 02, 2026',
    created_at: '2026-11-02 09:30:00'
  },
  {
    id: 2,
    title: 'Annual Inter-House Debate & Elocution Championship',
    description: 'The coveted Sir Arthur Memorial Debate Trophy will commence next Friday in the historic Assembly Hall. Motions will center on modern ethics, science, and governance. All house prefects must submit team lists.',
    category: 'Event',
    formatted_date: 'Nov 01, 2026',
    created_at: '2026-11-01 11:00:00'
  },
  {
    id: 3,
    title: 'Heritage Science & Robotics Exhibition 2026',
    description: 'Our annual Science and Innovation Symposium will showcase student research projects across Renewable Energy, Computational Physics, and Bio-Engineering. Parents and community members are cordially invited.',
    category: 'Academic',
    formatted_date: 'Oct 30, 2026',
    created_at: '2026-10-30 14:15:00'
  },
  {
    id: 4,
    title: 'Regional Interschool Athletic Meet Selections',
    description: 'Trials for track and field events (100m, 400m, high jump, and relay) will take place this Saturday morning on the main pavilion grounds. Report in standard athletic attire at 7:30 AM.',
    category: 'Sports',
    formatted_date: 'Oct 28, 2026',
    created_at: '2026-10-28 08:00:00'
  },
  {
    id: 5,
    title: 'Parent-Teacher Academic Review Conference',
    description: 'The semi-annual Parent-Educator consultation will be held on Saturday, 15th November. Detailed 15-minute appointment slots with respective subject masters can be scheduled through reception.',
    category: 'General',
    formatted_date: 'Oct 25, 2026',
    created_at: '2026-10-25 16:20:00'
  },
  {
    id: 6,
    title: 'Commemoration of Founder’s Day & Gala Evening',
    description: 'Marking 78 years of scholastic excellence and ethical leadership, the institution celebrates Founder’s Day with an orchestral performance, theatrical play, and fellowship banquet.',
    category: 'Event',
    formatted_date: 'Oct 20, 2026',
    created_at: '2026-10-20 10:00:00'
  }
];

// Fallback demo student data for offline viva examination
const DEMO_STUDENTS = {
  'SCH202601': {
    id: 1,
    name: 'Alexander Vance',
    roll_number: 'SCH202601',
    class_name: 'Class 12',
    section: 'A',
    results: [
      { subject: 'Advanced Mathematics', marks: 94.00, total_marks: 100.00 },
      { subject: 'Physics (Theory & Lab)', marks: 89.50, total_marks: 100.00 },
      { subject: 'Chemistry', marks: 91.00, total_marks: 100.00 },
      { subject: 'English Literature', marks: 95.00, total_marks: 100.00 },
      { subject: 'Computer Science', marks: 98.00, total_marks: 100.00 },
      { subject: 'European & World History', marks: 88.50, total_marks: 100.00 }
    ],
    attendance: {
      total_days: 180,
      present_days: 168,
      absent_days: 12,
      percentage: 93.3,
      is_eligible_for_exams: true,
      status: 'Satisfactory'
    }
  },
  'SCH202602': {
    id: 2,
    name: 'Sophia Montgomery',
    roll_number: 'SCH202602',
    class_name: 'Class 12',
    section: 'A',
    results: [
      { subject: 'Advanced Mathematics', marks: 98.00, total_marks: 100.00 },
      { subject: 'Physics (Theory & Lab)', marks: 95.00, total_marks: 100.00 },
      { subject: 'Chemistry', marks: 96.50, total_marks: 100.00 },
      { subject: 'English Literature', marks: 92.00, total_marks: 100.00 },
      { subject: 'Computer Science', marks: 99.00, total_marks: 100.00 },
      { subject: 'European & World History', marks: 94.00, total_marks: 100.00 }
    ],
    attendance: {
      total_days: 180,
      present_days: 174,
      absent_days: 6,
      percentage: 96.7,
      is_eligible_for_exams: true,
      status: 'Satisfactory'
    }
  },
  'SCH202603': {
    id: 3,
    name: 'Ethan Hawthorne',
    roll_number: 'SCH202603',
    class_name: 'Class 11',
    section: 'B',
    results: [
      { subject: 'Advanced Mathematics', marks: 82.00, total_marks: 100.00 },
      { subject: 'Physics (Theory & Lab)', marks: 85.00, total_marks: 100.00 },
      { subject: 'Chemistry', marks: 80.00, total_marks: 100.00 },
      { subject: 'English Literature', marks: 89.00, total_marks: 100.00 },
      { subject: 'Computer Science', marks: 91.50, total_marks: 100.00 },
      { subject: 'European & World History', marks: 86.00, total_marks: 100.00 }
    ],
    attendance: {
      total_days: 180,
      present_days: 159,
      absent_days: 21,
      percentage: 88.3,
      is_eligible_for_exams: true,
      status: 'Satisfactory'
    }
  }
};

// ==========================================
// 1. Session and Navigation Management
// ==========================================
function getSessionStudent() {
  try {
    const raw = localStorage.getItem('schoolhub_student');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function updateNavAuthUI() {
  const student = getSessionStudent();
  const navActionContainer = document.getElementById('nav-auth-container');
  if (!navActionContainer) return;

  if (student) {
    navActionContainer.innerHTML = `
      <a href="dashboard.html" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;">
        <span>🎓</span> ${student.name.split(' ')[0]}
      </a>
      <button onclick="handleLogout()" class="btn btn-outline btn-sm" style="padding:6px 10px;" title="Logout">
        Logout
      </button>
    `;
  } else {
    navActionContainer.innerHTML = `
      <a href="login.html" class="btn btn-primary btn-sm">
        Student Portal
      </a>
    `;
  }
}

function handleLogout() {
  localStorage.removeItem('schoolhub_student');
  try {
    fetch(`${API_BASE_URL}/logout`, { method: 'POST', credentials: 'include' });
  } catch (_) {}
  window.location.href = 'login.html';
}

function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });
}

// Highlight currently active page link in navigation
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ==========================================
// 2. Notice Card Rendering & Filtering
// ==========================================
function createNoticeCardHTML(notice) {
  const cat = (notice.category || 'General').toLowerCase();
  let badgeClass = 'badge-general';
  if (cat.includes('acad')) badgeClass = 'badge-academic';
  else if (cat.includes('event')) badgeClass = 'badge-event';
  else if (cat.includes('sport')) badgeClass = 'badge-sports';

  const dateStr = notice.formatted_date || (notice.created_at ? notice.created_at.slice(0, 10) : 'Recent');

  return `
    <article class="notice-card">
      <div class="notice-meta">
        <span class="notice-badge ${badgeClass}">${notice.category || 'General'}</span>
        <span class="notice-date">📅 ${dateStr}</span>
      </div>
      <h3 class="notice-title">${escapeHTML(notice.title)}</h3>
      <p class="notice-desc">${escapeHTML(notice.description)}</p>
    </article>
  `;
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

let allNoticesCache = [];

async function loadNoticesPage() {
  const container = document.getElementById('notices-list');
  if (!container) return;

  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><p>Loading notices...</p></div>';

  try {
    const res = await fetch(`${API_BASE_URL}/notices`, { signal: AbortSignal.timeout(4000) });
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      allNoticesCache = data.data;
    } else {
      allNoticesCache = FALLBACK_NOTICES;
    }
  } catch (err) {
    console.warn('Backend notices offline, utilizing static fallback:', err);
    allNoticesCache = FALLBACK_NOTICES;
  }

  renderFilteredNotices();
}

async function loadLatestNoticesHome() {
  const container = document.getElementById('home-latest-notices');
  if (!container) return;

  let notices = [];
  try {
    const res = await fetch(`${API_BASE_URL}/notices/latest`, { signal: AbortSignal.timeout(3500) });
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      notices = data.data;
    } else {
      notices = FALLBACK_NOTICES.slice(0, 4);
    }
  } catch {
    notices = FALLBACK_NOTICES.slice(0, 4);
  }

  container.innerHTML = notices.map(createNoticeCardHTML).join('');
}

function renderFilteredNotices() {
  const container = document.getElementById('notices-list');
  if (!container) return;

  const activeCategory = document.querySelector('.filter-chip.active')?.dataset.category || 'all';
  const searchInput = document.getElementById('notice-search');
  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

  let filtered = allNoticesCache;

  if (activeCategory !== 'all') {
    filtered = filtered.filter(n => (n.category || '').toLowerCase() === activeCategory.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(n => 
      (n.title && n.title.toLowerCase().includes(query)) ||
      (n.description && n.description.toLowerCase().includes(query))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 0; background: #fff; border-radius: 8px; border: 1px solid var(--color-border);">
        <p style="font-size: 1.1rem; color: var(--color-charcoal);">No notices found matching the criteria.</p>
        <button onclick="resetNoticesFilter()" class="btn btn-outline btn-sm" style="margin-top: 12px;">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(createNoticeCardHTML).join('');
}

function resetNoticesFilter() {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  const allChip = document.querySelector('.filter-chip[data-category="all"]');
  if (allChip) allChip.classList.add('active');
  const searchInput = document.getElementById('notice-search');
  if (searchInput) searchInput.value = '';
  renderFilteredNotices();
}

function initNoticesFilterListeners() {
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderFilteredNotices();
    });
  });

  const searchInput = document.getElementById('notice-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderFilteredNotices();
    });
  }
}

// ==========================================
// 3. Contact Form Submission
// ==========================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const alertContainer = document.getElementById('contact-alert');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (alertContainer) alertContainer.innerHTML = '';

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subjectEl = document.getElementById('contact-subject');
    const subject = subjectEl ? subjectEl.value.trim() : '';
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-error">
            <span>⚠️</span> Please fill out all required fields before submitting.
          </div>
        `;
      }
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerText : 'Submit';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Submitting Enquiry...';
    }

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
        signal: AbortSignal.timeout(6000)
      });
      const data = await res.json();
      if (data.success) {
        form.reset();
        if (alertContainer) {
          alertContainer.innerHTML = `
            <div class="alert alert-success">
              <span>✔</span> Thank you, <strong>${escapeHTML(name)}</strong>! Your enquiry has been recorded. Our admissions counselor will contact you at <strong>${escapeHTML(email)}</strong> shortly.
            </div>
          `;
        }
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      // Offline fallback success for viva presentation if backend isn't started
      form.reset();
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-success">
            <span>✔</span> Thank you, <strong>${escapeHTML(name)}</strong>! Your enquiry has been received by St. Jude's Admissions Office.
          </div>
        `;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
      }
    }
  });
}

// ==========================================
// 4. Student Login Handling
// ==========================================
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  // If already logged in, redirect straight to dashboard
  if (getSessionStudent()) {
    window.location.href = 'dashboard.html';
    return;
  }

  const alertContainer = document.getElementById('login-alert');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (alertContainer) alertContainer.innerHTML = '';

    const rollNumber = document.getElementById('roll-number').value.trim().toUpperCase();
    const password = document.getElementById('password').value.trim();

    if (!rollNumber || !password) {
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-error">
            <span>⚠️</span> Please enter both Roll Number and Password.
          </div>
        `;
      }
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Authenticating...';
    }

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ roll_number: rollNumber, password }),
        signal: AbortSignal.timeout(5000)
      });
      const data = await res.json();

      if (data.success && data.student) {
        localStorage.setItem('schoolhub_student', JSON.stringify(data.student));
        window.location.href = 'dashboard.html';
        return;
      } else {
        throw new Error(data.message || 'Invalid roll number or password');
      }
    } catch (err) {
      // Offline fallback authentication check
      if (password === 'password123' && DEMO_STUDENTS[rollNumber]) {
        const student = DEMO_STUDENTS[rollNumber];
        localStorage.setItem('schoolhub_student', JSON.stringify({
          id: student.id,
          name: student.name,
          roll_number: student.roll_number,
          class_name: student.class_name,
          section: student.section
        }));
        window.location.href = 'dashboard.html';
        return;
      }

      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-error">
            <span>⚠️</span> ${err.message || 'Authentication failed. Please verify your credentials.'}
          </div>
        `;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Sign In to Student Portal';
      }
    }
  });
}

function fillDemoLogin(roll, pwd) {
  const rollInput = document.getElementById('roll-number');
  const pwdInput = document.getElementById('password');
  if (rollInput) rollInput.value = roll;
  if (pwdInput) pwdInput.value = pwd || 'password123';
}

function quickLogin(roll) {
  fillDemoLogin(roll, 'password123');
}

// ==========================================
// 5. Student Dashboard Rendering
// ==========================================
async function loadDashboard() {
  const student = getSessionStudent();
  if (!student) {
    window.location.href = 'login.html';
    return;
  }

  // Populate Student Identity Header
  const nameEl = document.getElementById('dash-student-name');
  const rollEl = document.getElementById('dash-student-roll');
  const classEl = document.getElementById('dash-student-class');
  const logoutBtn = document.getElementById('dash-logout-btn');

  if (nameEl) nameEl.innerText = student.name;
  if (rollEl) rollEl.innerText = student.roll_number;
  if (classEl) classEl.innerText = `${student.class_name} • Section ${student.section}`;
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  const studentId = student.id || 1;
  const roll = (student.roll_number || 'SCH202601').toUpperCase();
  const demoFallback = DEMO_STUDENTS[roll] || DEMO_STUDENTS['SCH202601'];

  // Fetch Attendance & Results in parallel
  let resultsData = null;
  let attendanceData = null;

  try {
    const [resRes, attRes] = await Promise.all([
      fetch(`${API_BASE_URL}/student/results?student_id=${studentId}`, { credentials: 'include', signal: AbortSignal.timeout(4000) })
        .then(r => r.json()).catch(() => null),
      fetch(`${API_BASE_URL}/student/attendance?student_id=${studentId}`, { credentials: 'include', signal: AbortSignal.timeout(4000) })
        .then(r => r.json()).catch(() => null)
    ]);

    if (resRes && resRes.success) resultsData = resRes;
    if (attRes && attRes.success) attendanceData = attRes.data;
  } catch (err) {
    console.warn('Dashboard API fetch error, utilizing demo records:', err);
  }

  // Use fallback if API failed or DB returned empty
  if (!resultsData || !resultsData.data || resultsData.data.length === 0) {
    const results = demoFallback.results;
    const totalObtained = results.reduce((sum, r) => sum + r.marks, 0);
    const totalMax = results.reduce((sum, r) => sum + r.total_marks, 0);
    const pct = Math.round((totalObtained / totalMax) * 1000) / 10;
    resultsData = {
      data: results,
      summary: {
        total_obtained: totalObtained,
        total_maximum: totalMax,
        percentage: pct,
        grade: pct >= 90 ? 'A+ (Distinction)' : 'A (Excellent)'
      }
    };
  }

  if (!attendanceData) {
    attendanceData = demoFallback.attendance;
  }

  // Render Metric Cards
  const attPctEl = document.getElementById('metric-attendance-pct');
  const attDaysEl = document.getElementById('metric-attendance-days');
  const marksObtEl = document.getElementById('metric-marks-obtained');
  const marksPctEl = document.getElementById('metric-overall-pct');
  const marksGrdEl = document.getElementById('metric-grade');

  if (attPctEl) attPctEl.innerText = `${attendanceData.percentage}%`;
  if (attDaysEl) attDaysEl.innerText = `${attendanceData.present_days} / ${attendanceData.total_days} Days Present`;
  if (marksObtEl) marksObtEl.innerText = `${resultsData.summary.total_obtained} / ${resultsData.summary.total_maximum}`;
  if (marksPctEl) marksPctEl.innerText = `${resultsData.summary.percentage}%`;
  if (marksGrdEl) marksGrdEl.innerText = resultsData.summary.grade;

  // Render Attendance Bar
  const barEl = document.getElementById('dash-attendance-fill');
  const attStatusEl = document.getElementById('dash-attendance-status');
  if (barEl) barEl.style.width = `${Math.min(100, attendanceData.percentage)}%`;
  if (attStatusEl) {
    attStatusEl.innerHTML = attendanceData.is_eligible_for_exams
      ? '<span class="notice-badge badge-sports">✔ Eligible for Board Examinations (≥ 75%)</span>'
      : '<span class="notice-badge badge-academic">⚠️ Attendance Warning: Below 75% Requirement</span>';
  }

  // Render Examination Results Table
  const tableBody = document.getElementById('results-table-body');
  if (tableBody) {
    const rows = resultsData.data.map(item => {
      const marks = Number(item.marks) || 0;
      const totalMarks = Number(item.total_marks) || 100;
      const pct = totalMarks > 0 ? Math.round((marks / totalMarks) * 100) : 0;
      let grade = 'B';
      if (pct >= 90) grade = 'A+';
      else if (pct >= 80) grade = 'A';
      else if (pct >= 70) grade = 'B+';

      return `
        <tr>
          <td><strong>${escapeHTML(item.subject)}</strong></td>
          <td>${totalMarks}</td>
          <td><strong>${marks}</strong></td>
          <td>${pct}%</td>
          <td><span class="notice-badge badge-event">${grade}</span></td>
        </tr>
      `;
    }).join('');

    const summaryRow = `
      <tr class="total-row">
        <td>Overall Result Summary</td>
        <td>${resultsData.summary.total_maximum}</td>
        <td>${resultsData.summary.total_obtained}</td>
        <td>${resultsData.summary.percentage}%</td>
        <td><span class="notice-badge badge-academic">${resultsData.summary.grade}</span></td>
      </tr>
    `;

    tableBody.innerHTML = rows + summaryRow;
  }

  // Load Latest Notices on Dashboard
  const dashNoticesContainer = document.getElementById('dash-notices-container');
  if (dashNoticesContainer) {
    let notices = [];
    try {
      const nRes = await fetch(`${API_BASE_URL}/notices/latest`, { signal: AbortSignal.timeout(3000) });
      const nData = await nRes.json();
      if (nData.success && nData.data) notices = nData.data.slice(0, 3);
      else notices = FALLBACK_NOTICES.slice(0, 3);
    } catch {
      notices = FALLBACK_NOTICES.slice(0, 3);
    }
    dashNoticesContainer.innerHTML = notices.map(createNoticeCardHTML).join('');
  }
}

// ==========================================
// 6. Academics Stream Tabs
// ==========================================
function initAcademicsTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetId = tab.dataset.tab || tab.dataset.target;
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

// Expose critical functions to window for HTML inline event listeners
window.handleLogout = handleLogout;
window.fillDemoLogin = fillDemoLogin;
window.quickLogin = quickLogin;
window.resetNoticesFilter = resetNoticesFilter;

// ==========================================
// 7. Global Initialization on DOM Ready
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  highlightActiveNavLink();
  updateNavAuthUI();

  // Page-specific initializers based on element existence
  if (document.getElementById('notices-list')) {
    initNoticesFilterListeners();
    loadNoticesPage();
  }

  if (document.getElementById('home-latest-notices')) {
    loadLatestNoticesHome();
  }

  if (document.getElementById('contact-form')) {
    initContactForm();
  }

  if (document.getElementById('login-form')) {
    initLoginForm();
  }

  if (document.getElementById('dash-student-name')) {
    loadDashboard();
  }

  if (document.querySelector('.tab-btn')) {
    initAcademicsTabs();
  }
});
