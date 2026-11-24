# 🏛️ St. Jude's Academy — Frontend Client

This directory contains the standard, semantic HTML5, CSS3, and vanilla JavaScript client-side application for the St. Jude's Academy institutional portal.

---

## 📂 Directory Structure

```text
frontend/
├── assets/             # Brand logos, crests, and graphical assets
│   ├── logo.svg        # School crest and emblem
│   ├── hero.png        # Campus hero banner image
│   └── favicon.svg     # Browser tab favicon
├── css/
│   └── style.css       # Institutional design system & responsive styling
├── js/
│   └── main.js         # API integration, session handling, and UI interactivity
├── index.html          # Campus homepage & Principal's welcome address
├── about.html          # Institutional heritage, values, & milestones
├── academics.html      # Senior secondary streams & examination scheme
├── facilities.html     # Laboratories, library, & sports complex
├── notices.html        # Real-time circulars with category filters & keyword search
├── contact.html        # Campus office details & live inquiry submission form
├── login.html          # Scholar credential authentication with quick-test accounts
└── dashboard.html      # Live student performance transcript & attendance meter
```

---

## 🎨 Design System & Styling Architecture

The frontend is styled using pure CSS3 with custom properties defined in `css/style.css`:
- **Color Palette**:
  - Warm Ivory Canvas: `#F8F5EE`
  - Deep Forest Green: `#243228`
  - Heritage Burgundy: `#713B37`
  - Academic Gold: `#B68A50`
  - Charcoal Body Text: `#2A2824`
- **Typography**:
  - Headings: Classic Serif (`Playfair Display`, `Georgia`, serif)
  - Body & UI: Clean Sans-Serif (`Inter`, `-apple-system`, `Segoe UI`, sans-serif)
- **Zero Framework Overhead**: No React, Bootstrap, Tailwind, or bundling dependencies. 100% standard web technologies for maximum portability and fast loading.

---

## ⚡ Functional Modules in `js/main.js`

1. **Session & Navigation Management**:
   - Dynamic navigation bar state reflecting login status (`updateNavAuthUI`).
   - Active page navigation link highlighting.
   - Mobile responsive navigation drawer.
2. **Notices Board & Search**:
   - Fetches live notices from `/api/notices` with category filtering (*Academic, Event, Sports, General*).
   - Instant client-side search across titles and descriptions.
3. **Contact & Admissions Inquiry**:
   - Form submission via `POST /api/contact` storing records directly into PostgreSQL `enquiries` table.
4. **Student Authentication**:
   - Authenticates credentials against `POST /api/login`.
   - Stores session securely in browser `localStorage`.
   - Provides one-click quick-fill test credentials for evaluation (`SCH202601`, `SCH202602`, `SCH202603`).
5. **Scholar Dashboard**:
   - Parallel fetching of `/api/student/profile`, `/api/student/results`, and `/api/student/attendance`.
   - Dynamic subject marks breakdown, percentage computation, and scholastic tier badge.
   - Attendance progress bar with Board exam eligibility warning (threshold: 75%).
   - Integrated print transcript utility.
   - Secure sign-out action (`POST /api/logout`).
6. **Academic Stream Switcher**:
   - Accessible tabbed view on `academics.html` switching between Science, Commerce, and Humanities.

---

## 🚀 How to Run the Frontend

1. Ensure the Flask backend is running on `http://localhost:5000`:
   ```bash
   cd ../backend
   python app.py
   ```
2. Serve this `frontend` directory using any static web server:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser.
   *(You can also open `index.html` directly via the file system)*
