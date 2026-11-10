<div align="center">

# ðŸ›ï¸ SchoolHub â€” School Information & Management Portal

[![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Python%20%7C%20Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Status](https://img.shields.io/badge/Build-Passing-2EA44F?style=for-the-badge)](https://github.com/AyushSrivastava1818/WebDev-Project-1043-1048-)

**A clean, full-stack school website and student portal developed for B.Tech Web Development Lab.**  
*Combines an institutional public website with a secure student attendance and examination marks portal.*

---

</div>

## ðŸ“Œ Table of Contents
- [Simple Project Architecture](#-simple-project-architecture)
- [How Data Flows](#-how-data-flows)
- [Database Schema](#-database-schema)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Quick Start & Setup](#-quick-start--setup)
- [API Endpoints](#-api-endpoints)
- [Project Team & Work Distribution](#-project-team--work-distribution)

---

## ðŸ—ï¸ Simple Project Architecture

The application uses a standard 3-tier web architecture:

```mermaid
flowchart LR
    A["Frontend (React 18 + Vite)<br/>â€¢ Responsive Pages & Drawer<br/>â€¢ Student Portal Dashboard"] <--> |"HTTP / REST API (JSON)"| B["Backend (Python Flask)<br/>â€¢ REST API Endpoints<br/>â€¢ Werkzeug Password Hashing"]
    B <--> |"SQL Queries (psycopg2)"| C["Database (PostgreSQL)<br/>â€¢ Students, Marks, Attendance<br/>â€¢ Notices & Enquiries"]
```

---

## ðŸ”„ How Data Flows

A simple step-by-step lifecycle of how information moves through the system:

```mermaid
sequenceDiagram
    autonumber
    actor User as Student / Visitor
    participant React as React Frontend (Port 5173)
    participant Flask as Flask Server (Port 5000)
    participant DB as PostgreSQL (Port 5432)

    User->>React: Interacts with UI (e.g. Logs in or views Notices)
    React->>Flask: Sends fetch request with JSON payload
    Flask->>DB: Executes parameterized SQL query
    DB-->>Flask: Returns query results / rows
    Flask-->>React: Returns JSON response
    React-->>User: Updates page dynamically without reloading
```

---

## ðŸ—ƒï¸ Database Schema

The database consists of 5 simple, related tables in PostgreSQL:

```mermaid
erDiagram
    STUDENTS ||--o{ RESULTS : has
    STUDENTS ||--o{ ATTENDANCE : has
    
    STUDENTS {
        int id PK
        string name
        string roll_number
        string class_name
        string section
        string password_hash
    }

    RESULTS {
        int id PK
        int student_id FK
        string subject
        numeric marks
        numeric total_marks
    }

    ATTENDANCE {
        int id PK
        int student_id FK
        int total_days
        int present_days
    }

    NOTICES {
        int id PK
        string title
        string description
        string category
        timestamp created_at
    }

    ENQUIRIES {
        int id PK
        string name
        string email
        string message
        timestamp created_at
    }
```

---

## ðŸŒŸ Key Features

### 1. Public School Website
- **Always-Accessible Menu**: A collapsible side navigation drawer that opens smoothly on all screens (desktop, tablet, and mobile) with an overlay backdrop and keyboard `Escape` support.
- **Home Page**: Hero banner, Principal's welcome note, school highlights, facilities overview, latest announcements, and upcoming events.
- **About Us**: School founding history (established 1948), vision, mission, and major achievements.
- **Academics**: Interactive stream switcher (**Science**, **Commerce**, and **Humanities**) with subject combinations and career pathways.
- **Campus Facilities**: Showcases the School Library, Science Laboratories, Computer Center, Sports Grounds, and Smart Classrooms.
- **Notice Board**: Displays live notices filtered by category (*Academic, Event, Sports, General*) with a live keyword search bar.
- **Contact & Admissions**: Campus address, phone, email, visiting hours, map, and a functional admission enquiry form.

### 2. Student Portal
- **Login**: Authenticates roll number and password using secure Werkzeug scrypt hashing.
- **Quick Demo Fill**: One-click demo credential buttons for evaluation.
- **Student Dashboard**:
  - Profile card with Name, Roll Number, Class, and Section.
  - Attendance tracker with visual progress bar and exam eligibility status.
  - Term examination marks table with subject breakdown and overall grade.
  - Recent school circulars feed.
  - Secure sign-out action.

---

## ðŸ’» Technology Stack

- **Frontend**: React 18, Vite, React Router DOM, Lucide Icons, Vanilla CSS.
- **Backend**: Python 3, Flask, Flask-CORS, Werkzeug Security, psycopg2.
- **Database**: PostgreSQL 14+.
- **Design Colors**: Warm Ivory (`#F8F5EE`), Deep Burgundy (`#713B37`), Forest Green (`#35483A`), Antique Gold (`#B68A50`), Charcoal (`#2A2824`).

---

## ðŸš€ Quick Start & Setup

### Step 1: Database Setup
Make sure PostgreSQL is running on port `5432`, then run:
```bash
cd backend
python init_db.py
```
*This creates the `schoolhub` database, tables from `schema.sql`, and sample records from `seed.sql`.*

### Step 2: Start Flask Backend
```bash
cd backend
python app.py
```
*Backend runs on `http://localhost:5000`.*

### Step 3: Start React Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## ðŸ“¡ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health and database connectivity |
| `GET` | `/api/notices` | All notices (optional filter: `?category=Academic`) |
| `GET` | `/api/notices/latest` | Latest 4 notices for the homepage |
| `POST` | `/api/contact` | Submits enquiry into `enquiries` table |
| `POST` | `/api/login` | Authenticates student roll number & password |
| `GET` | `/api/student/profile` | Student profile info (`?student_id=1`) |
| `GET` | `/api/student/results` | Subject marks, percentage & grade (`?student_id=1`) |
| `GET` | `/api/student/attendance` | Attendance count, percentage & eligibility |

### Demo Student Login Accounts
- **Alexander Vance**: Roll `SCH202601` | Password `password123` *(Class 12-A, 93.3% Attendance)*
- **Sophia Montgomery**: Roll `SCH202602` | Password `password123` *(Class 12-A, 96.7% Attendance)*
- **Ethan Hawthorne**: Roll `SCH202603` | Password `password123` *(Class 11-B, 88.3% Attendance)*

---

## ðŸ‘¥ Project Team & Work Distribution

| Team Member | Module Focus | Contributions & Implemented Features |
|:---|:---|:---|
| **Avnish Yadav** | **UI Design & Core Layout (Frontend)** | â€¢ Heritage CSS Design System & typography<br>â€¢ Responsive Navbar with collapsible side navigation drawer<br>â€¢ Homepage (`Home.jsx`) layout, hero banner, and Principal's section<br>â€¢ School crest branding and SVG assets |
| **Rahul Singh** | **Pages & Student Portal UI (Frontend)** | â€¢ Informational pages (`About.jsx`, `Academics.jsx`, `Facilities.jsx`)<br>â€¢ Interactive stream switcher (Science, Commerce, Humanities)<br>â€¢ Notices filtering & search UI (`Notices.jsx`)<br>â€¢ Student Portal UI (`StudentLogin.jsx`, `StudentDashboard.jsx`)<br>â€¢ Contact page & enquiry form (`Contact.jsx`) and `Footer.jsx` |
| **Ayush Srivastava** | **API Core & Authentication (Backend)** | â€¢ Flask server core architecture (`app.py`)<br>â€¢ Werkzeug scrypt password hashing and verification<br>â€¢ REST API authentication endpoints (`POST /api/login`)<br>â€¢ Frontend-Backend fetch service layer (`api.js`) with fallback caching |
| **Ishan Bisht** | **Results & Attendance Services (Backend)** | â€¢ Student portal API endpoints (`/api/student/profile`, `/api/student/results`)<br>â€¢ Dynamic marks calculation, percentage, and grade mapping<br>â€¢ Student attendance statistics computation & eligibility logic<br>â€¢ Server-side input validation and error handling |
| **Shivansh** | **Notices & Communication API (Backend)** | â€¢ Notice board endpoints (`/api/notices`, `/api/notices/latest`)<br>â€¢ Category-based notice filtering logic<br>â€¢ Contact form submission endpoint (`POST /api/contact`)<br>â€¢ Flask-CORS cross-origin configuration and route documentation |
| **Rohan** | **Database Schema & Management (Database)** | â€¢ PostgreSQL database schema design (`schema.sql`)<br>â€¢ Primary key / foreign key relationships with cascade rules<br>â€¢ Database connection manager (`database.py`) using `psycopg2`<br>â€¢ Automated database initializer script (`init_db.py`)<br>â€¢ Realistic sample academic seed data (`seed.sql`) |
| **Everyone** | **Documentation & Testing** | â€¢ Project architecture documentation, testing, and presentation prep |
