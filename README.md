# Internship Application Portal

## 📌 Objective

A full-stack, web-based portal that streamlines internship applications and management. This platform serves two primary user roles:

- **Applicants**: Sign up, create a profile, view job listings, submit internship applications, and track application status.
- **Admins**: Create a profile, manage internship listings, review submitted applications, update their status, and trigger notifications.

---

## 🚀 Features

### ✅ General
- Landing page with role selection (Applicant / Admin)
- Separate login/signup flows for both roles
- JWT-based role authentication
- Role-specific dashboards
- Secure password handling and session management

### 👤 Applicant Functionality

#### 🔐 Authentication
- **Login/Signup pages for applicants**
- JWT-based role authentication
- Role-based access

#### 👤 Profile
- Create and manage a user profile with:
  - First Name
  - Last Name
  - Date of Birth
  - Major
  - Phone Number
  - Email Address
  - University

#### 📄 Application Form
- View available internship job listings
- Select a listing and apply
- Application form will **autofill** data from the user profile
- Additional fields required in the form:
  - GPA
  - Graduation Date
  - Work/Project Experience
  - Resume Upload (PDF)

#### 📊 Application Status
- View application status (Pending / Accepted / Rejected)
- Receive email notifications when status changes

---

### 🛠️ Admin Functionality

#### 🔐 Authentication
- **Login/Signup pages for admins**
- JWT-based role authentication
- Role-based access

#### 👤 Admin Profile
- Create and manage an admin profile with:
  - First Name
  - Last Name
  - Date of Birth
  - Position
  - Email
  - Phone Number

#### 📋 Admin Dashboard
- View a dashboard listing all submitted applications
- View full details of individual applications
- Accept or Reject applications
- Trigger email notifications to applicants on decision

#### 📢 Internship Listing Management
- Create new internship job listings
- Edit/update existing listings
- Delete outdated or filled internship listings
- All listings are visible to applicants on their dashboard

---

## ✉️ Email Notifications

- On application submission
- When an admin updates application status

---

## 🧰 Tech Stack

| Layer        | Tools / Libraries                      |
|--------------|-----------------------------------------|
| **Frontend** | React, Axios, React Router, Bootstrap or Tailwind CSS |
| **Backend**  | FastAPI, SQLAlchemy, Python             |
| **Database** | PostgreSQL                              |
| **Auth**     | JWT Tokens (Role-based Auth)            |
| **Email**    | SMTP or SendGrid/Mailgun integration    |
| **File Uploads** | AWS S3 or local server storage      |
| **Deployment** | Vercel (Frontend), AWS / Render (Backend & DB) |

---

## 🧑‍💻 Project Roles

| Team Member | Role               | Responsibilities                                     |
|-------------|--------------------|------------------------------------------------------|
| Takoma      | Database Manager   | Design DB schema, set up PostgreSQL, manage queries |
| Shelly      | Frontend Developer | Build UI with React, handle routing & API calls     |
| Faizol      | Backend Developer  | Set up FastAPI endpoints, JWT auth, email triggers  |

---
