# St. Jude's Heritage Collegiate - Web Portal

Official academic portal and management system for St. Jude's Heritage Collegiate.

---

## Repository Structure

```
WebDev-Project-1043-1048-/
├── backend/                  # Flask backend & database
│   ├── database.py           # Database connection & models
│   └── init_db.py            # Database initialization script
│
├── frontend/                 # React + Vite Single Page Application
│   ├── public/               # Static assets served at root
│   │   ├── favicon.svg
│   │   ├── hero.png
│   │   ├── icons.svg
│   │   ├── logo.svg
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/           # Bundled assets (logos, images)
│   │   │   └── react.svg
│   │   ├── components/       # Shared reusable UI components
│   │   │   ├── FacilityCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── NoticeCard.jsx
│   │   ├── pages/            # Top-level route views
│   │   │   ├── About.jsx
│   │   │   ├── Academics.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Facilities.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Notices.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── StudentLogin.jsx
│   │   ├── services/         # API integration services
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx           # Main routing & layout component
│   │   ├── index.css         # Global design system & theme styling
│   │   └── main.jsx          # React DOM entry point
│   ├── Dockerfile            # Container build configuration
│   ├── index.html            # Vite HTML template
│   ├── nginx.conf            # Nginx deployment reverse-proxy config
│   ├── oxlintrc.json         # Oxlint linter rules
│   ├── package.json          # Frontend dependencies & scripts
│   └── vite.config.js        # Vite configuration
│
└── README.md                 # Project root documentation
```

---

## Getting Started

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

python init_db.py
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

To build for production:
```bash
npm run build
```
