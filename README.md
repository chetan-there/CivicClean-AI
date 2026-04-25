# 🌍 Smart Waste Management System

A full-stack web application that enables citizens to report waste through
images and location tracking, while allowing municipal authorities to
manage and resolve complaints efficiently using AI-powered classification.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![Java](https://img.shields.io/badge/Java-17-orange)
![React](https://img.shields.io/badge/React-18-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)

---

## 🎯 Project Overview

The Smart Waste Management System bridges the gap between citizens and
municipal authorities by providing a digital platform for waste reporting,
tracking, and resolution. Citizens can upload images of waste, get
AI-powered classification, and track their complaint status in real-time
while earning reward points for active participation.

---

## ✨ Key Features

### 👤 Citizen Module
- ✅ Secure Register & Login
- ✅ Report waste with image upload
- ✅ Auto GPS location detection
- ✅ AI-powered waste classification
- ✅ Real-time complaint tracking
- ✅ Reward points system
- ✅ Complaint history dashboard

### 🏢 Admin/Municipality Module
- ✅ Live statistics dashboard
- ✅ Manage all complaints
- ✅ Advanced search & filters
- ✅ Update complaint status
- ✅ Assign cleanup teams
- ✅ Admin notes on complaints

### 🤖 AI Module
- ✅ Auto waste type detection
- ✅ Severity level estimation
- ✅ Cleanup suggestions
- ✅ Works with/without Gemini API
- ✅ Color-based fallback classifier

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 | User Interface |
| Routing | React Router v6 | Navigation |
| HTTP Client | Axios | API Calls |
| Backend | Java Spring Boot 3.2 | REST API |
| Security | Spring Security | Auth & CORS |
| ORM | Spring Data JPA | Database |
| Database | MySQL 8 | Data Storage |
| AI Module | Python Flask | Image Classification |
| AI Vision | Google Gemini API | Waste Detection |
| Image Processing | PIL/Pillow | Image Handling |

---

## 🗂️ Project Structure

waste-management-system/
│
├── frontend/                      # React Application
│   └── src/
│       ├── components/
│       │   └── common/
│       │       └── ProtectedRoute.jsx
│       ├── context/
│       │   └── AuthContext.js     # Global Auth State
│       ├── pages/
│       │   ├── User/
│       │   │   ├── Login.jsx
│       │   │   ├── Register.jsx
│       │   │   ├── UserDashboard.jsx
│       │   │   ├── ReportWaste.jsx
│       │   │   └── ComplaintStatus.jsx
│       │   ├── Admin/
│       │   │   ├── AdminDashboard.jsx
│       │   │   └── ManageComplaints.jsx
│       │   └── NotFound.jsx
│       ├── services/
│       │   ├── api.js             # Axios Base Config
│       │   ├── authService.js     # Auth API Calls
│       │   ├── complaintService.js
│       │   ├── userService.js
│       │   ├── teamService.js
│       │   └── aiService.js
│       └── App.js
│
├── backend/                       # Spring Boot Application
│   └── src/main/java/
│       └── com/waste/management/
│           ├── controller/        # REST Controllers
│           │   ├── AuthController.java
│           │   ├── ComplaintController.java
│           │   ├── UserController.java
│           │   └── CleanupTeamController.java
│           ├── service/           # Business Logic
│           │   ├── UserService.java
│           │   ├── ComplaintService.java
│           │   ├── RewardService.java
│           │   └── CleanupTeamService.java
│           ├── repository/        # Database Layer
│           ├── model/             # Entity Classes
│           │   ├── User.java
│           │   ├── Complaint.java
│           │   ├── Reward.java
│           │   └── CleanupTeam.java
│           ├── dto/               # Data Transfer Objects
│           ├── config/            # Security Config
│           └── exception/         # Global Exception Handler
│
├── ai-module/                     # Python Flask AI Service
│   ├── app.py                     # Flask API Server
│   ├── classifier.py              # Waste Classifier
│   ├── requirements.txt
│   └── .env
│
└── README.md

| Layer | Module | Purpose |
|---|---|---|
| Frontend | React (src/components, pages, services) | User Interface & Client-side Logic |
| Frontend Auth | AuthContext & ProtectedRoute | Authentication & Route Protection |
| Frontend API | Axios Services (api.js, services) | Communication with Backend APIs |
| User Features | User Pages (Login, Register, Dashboard, Report Waste) | User Interaction & Complaint Reporting |
| Admin Panel | Admin Pages (Dashboard, Manage Complaints) | Complaint Management & Monitoring |
| Backend API | Spring Boot Controllers | REST API Endpoints |
| Business Logic | Service Layer (UserService, ComplaintService, etc.) | Core Application Logic |
| Data Access | Repository Layer (Spring Data JPA) | Database Operations |
| Data Models | Entity Classes (User, Complaint, Reward, CleanupTeam) | Database Structure |
| Security | Spring Security Config | Authentication, Authorization, CORS |
| Exception Handling | Global Exception Handler | Error Handling & API Responses |
| Database | MySQL 8 | Persistent Data Storage |
| AI Service | Python Flask (app.py) | AI Microservice API |
| AI Logic | classifier.py | Waste Image Classification |
| AI Integration | Google Gemini API | Waste Detection & Analysis |
| Image Processing | PIL/Pillow | Image Preprocessing |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 18+
- Java JDK 17+
- MySQL 8+
- Python 3.8+
- Maven 3.6+

### 1️⃣ Clone Repository
```bash
git clone https://github.com/chetan-there/waste-management-system.git
cd waste-management-system
```

### 2️⃣ Database Setup
Open MySQL and run:
```sql
CREATE DATABASE waste_management_db;
```

### 3️⃣ Backend Setup
```bash
cd backend
```
Update `src/main/resources/application.properties`:
```properties
spring.datasource.password=your_mysql_password
```
Run the backend:
```bash
mvn spring-boot:run
```
Backend runs on `http://localhost:8080`

### 4️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on `http://localhost:3000`

### 5️⃣ AI Module Setup
```bash
cd ai-module
pip install -r requirements.txt
```
Optional — Add Gemini API key in `.env`:

### Step by step workflow 👇

<img width="1920" height="1080" alt="Screenshot 2026-04-25 132526" src="https://github.com/user-attachments/assets/a5891657-e1af-439a-aef8-9a23c0ffea51" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 132544" src="https://github.com/user-attachments/assets/57a05db7-3133-476e-a3ef-ac46c0c194b1" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 132602" src="https://github.com/user-attachments/assets/8ffa81ab-9638-4bfa-ba93-1aec5f2412d1" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 132631" src="https://github.com/user-attachments/assets/87965ec6-eaf6-4885-a4ad-27e5f4e4b47e" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 132647" src="https://github.com/user-attachments/assets/6e3325c5-b253-4043-9089-4a8df9224237" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 132718" src="https://github.com/user-attachments/assets/fb3779c3-c3a2-4b8d-938d-a94005f8590a" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 132731" src="https://github.com/user-attachments/assets/70aec976-5594-46a6-bd44-f53972aa0283" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 132759" src="https://github.com/user-attachments/assets/4f44b601-ac8e-4010-a1d1-b983f4285e41" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 132815" src="https://github.com/user-attachments/assets/aab05009-edfc-4971-b5d4-2f7f9a40a279" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 132842" src="https://github.com/user-attachments/assets/489c9cd9-c975-4366-809a-4df78179eca4" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 133247" src="https://github.com/user-attachments/assets/37552bbc-b0fe-48a6-ab13-7d2c3e4bc8df" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 133512" src="https://github.com/user-attachments/assets/b8aa2448-550a-4e1e-903e-ea95f9a86150" />
<img width="1920" height="1080" alt="Screenshot 2026-04-25 133446" src="https://github.com/user-attachments/assets/bac8962f-4d8b-436b-ab0a-90faecfa2f1f" />


