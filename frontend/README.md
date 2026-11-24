# St. Jude's Academy - Institutional Frontend

This directory contains the standard, semantic HTML5, CSS3, and vanilla JavaScript client-side interface for the St. Jude's Academy institutional portal.

## Structure

```
frontend/
├── assets/             # Brand logos, crests, and graphical assets
├── css/
│   └── style.css       # Institutional design system & responsive styling
├── js/
│   └── main.js         # API integration, session handling, and UI interactivity
├── index.html          # Campus homepage & principal's address
├── about.html          # Institutional heritage, values, & milestones
├── academics.html      # Senior secondary streams & examination scheme
├── facilities.html     # Laboratories, library, & sports complex
├── notices.html        # Real-time circulars & search
├── contact.html        # Campus office details & enquiry submission
├── login.html          # Scholar credential authentication
└── dashboard.html      # Student performance transcript & attendance meter
```

## Running the Application

Because this frontend is built entirely on standard Web standards (HTML5/CSS3/ES6+), it requires no package manager or build step.

### Quick Start
1. Ensure the Python Flask backend is running on `http://localhost:5000`:
   ```bash
   cd ../backend
   python app.py
   ```
2. Serve the frontend with any static web server:
   ```bash
   python -m http.server 8000
   ```
   Or open `index.html` directly in any modern browser.
