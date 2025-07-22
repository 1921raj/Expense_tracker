Expense Tracker Application
Welcome to the Expense Tracker Application, a web-based tool designed to manage expenses for employees and administrators. This project includes features for expense creation, status updates, CSV exports, receipt uploads, and audit logging, all containerized with Docker and deployable to cloud platforms.
Table of Contents

Features
Prerequisites
Installation
Usage
Development
Testing
Deployment
API Endpoints
Contributing
License

Features

User authentication (admin and employee roles)
Create, view, and update expense records
Export expenses to CSV
Upload receipts for expenses
Audit trail logging
Dockerized setup for local development
Basic unit tests for backend and frontend
Deployable to Render or Railway

Prerequisites

Node.js (v18 or later)
Docker and Docker Compose
Git
PostgreSQL (managed via Docker in this setup)
A code editor (e.g., VS Code)

Installation
Clone the Repository
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

Configure Environment Variables
Create a .env file in the root directory with the following content:
DB_USER=postgres
DB_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret_key

Replace your_secure_password and your_jwt_secret_key with secure values.
Build and Run with Docker

Ensure Docker and Docker Compose are installed and running.
Build the containers:docker-compose up --build


The application will be available at:
Frontend: http://localhost:3000
Backend: http://localhost:5000
Database: localhost:5432 (accessible to backend)



Usage

Register/Login: Access http://localhost:3000/login to register or log in as an admin (admin@example.com, admin123) or employee (employee@example.com, employee123).
Admin Dashboard: Navigate to http://localhost:3000/admin to manage expenses, export CSV, and upload receipts.
Employee View: Default route (/) allows employees to view and submit expenses.

Development

Backend: Located in backend/. Use Node.js with Express. Install dependencies with npm install.
Frontend: Located in frontend/. Use React. Install dependencies with npm install and build with npm run build.
Modifying Code: Changes in backend/ or frontend/ are reflected live due to Docker volume mounts.
Add Features: Extend expenses.js for new endpoints or Admin.js for UI enhancements.

Testing
Run unit tests for both backend and frontend:

Backend:cd backend
npm test


Frontend:cd frontend
npm test


Tests cover expense creation, CSV export, and receipt upload functionality.

Deployment
Render

Push the repository to GitHub.
Sign up at render.com.
Create a Web Service for backend and frontend, using the Dockerfile and setting environment variables from .env.
Deploy and access the provided URL.

Railway

Push the repository to GitHub.
Sign up at railway.app.
Create a project, add a PostgreSQL service, and deploy using the Dockerfile.
Configure environment variables in the Railway dashboard.

API Endpoints

POST /api/expenses: Create a new expense (requires token).
GET /api/expenses: Fetch expenses (admin sees all, employee sees own).
PUT /api/expenses/:id/status: Update expense status (admin only).
GET /api/expenses/export: Export all expenses to CSV (admin only).
POST /api/expenses/upload-receipt/:expenseId: Upload a receipt (requires token).

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature-name).
Commit changes (git commit -m "Add feature").
Push to the branch (git push origin feature-name).
Open a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
