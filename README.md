# 🌿 CivicClean AI

A full-stack web application that enables citizens to report waste through images and location tracking, while allowing municipal authorities to manage and resolve complaints efficiently using AI-powered classification.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![Java](https://img.shields.io/badge/Java-17-orange)
![React](https://img.shields.io/badge/React-18-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)

---

## 🎯 Project Overview

CivicClean AI bridges the gap between citizens and municipal authorities by providing a digital platform for waste reporting, tracking, and resolution. Citizens can upload images of waste, get AI-powered classification, and track their complaint status in real time while earning reward points for active participation.

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
- ✅ Automatic waste type detection
- ✅ Severity level estimation
- ✅ Cleanup suggestions
- ✅ Works with or without the Gemini API
- ✅ Color-based fallback classifier

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 | User Interface |
| Routing | React Router v6 | Navigation |
| HTTP Client | Axios | API Calls |
| Backend | Java Spring Boot 3.2 | REST API |
| Security | Spring Security | Authentication & CORS |
| ORM | Spring Data JPA | Database Operations |
| Database | MySQL 8 | Data Storage |
| AI Module | Python Flask | Image Classification |
| AI Vision | Google Gemini API | Waste Detection |
| Image Processing | PIL/Pillow | Image Handling |

---

## 🗂️ Project Structure

| Layer | Module | Purpose |
|---|---|---|
| Frontend | React (`src/components`, `pages`, `services`) | User Interface & Client-side Logic |
| Frontend Auth | AuthContext & ProtectedRoute | Authentication & Route Protection |
| Frontend API | Axios Services (`api.js`, services) | Communication with Backend APIs |
| User Features | Login, Register, Dashboard, Report Waste | User Interaction & Complaint Reporting |
| Admin Panel | Dashboard, Manage Complaints | Complaint Management & Monitoring |
| Backend API | Spring Boot Controllers | REST API Endpoints |
| Business Logic | Service Layer | Core Application Logic |
| Data Access | Spring Data JPA Repositories | Database Operations |
| Data Models | User, Complaint, Reward, CleanupTeam | Database Structure |
| Security | Spring Security Configuration | Authentication, Authorization & CORS |
| Exception Handling | Global Exception Handler | Error Handling & API Responses |
| Database | MySQL 8 | Persistent Data Storage |
| AI Service | Python Flask (`app.py`) | AI Microservice API |
| AI Logic | `classifier.py` | Waste Image Classification |
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

Open MySQL and execute:

```sql
CREATE DATABASE waste_management_db;
```

### 3️⃣ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Update `src/main/resources/application.properties` with your MySQL credentials:

```properties
spring.datasource.password=your_mysql_password
```

Start the backend:

```bash
mvn spring-boot:run
```

Backend URL: `http://localhost:8080`

### 4️⃣ Frontend Setup

Open a terminal in the frontend directory:

```bash
cd frontend
npm install
npm start
```

Frontend URL: `http://localhost:3000`

### 5️⃣ AI Module Setup

Open a terminal in the AI module directory:

```bash
cd ai-module
pip install -r requirements.txt
```

To enable Gemini-powered waste detection, configure your Gemini API key in the appropriate environment variable or `.env` file used by the application.

---

## 📸 Application Screenshots

### Step-by-Step Workflow

<img width="1920" height="1080" alt="Application Screenshot 1" src="https://github.com/user-attachments/assets/a5891657-e1af-439a-aef8-9a23c0ffea51" />

<img width="1920" height="1080" alt="Application Screenshot 2" src="https://github.com/user-attachments/assets/57a05db7-3133-476e-a3ef-ac46c0c194b1" />

<img width="1920" height="1080" alt="Application Screenshot 3" src="https://github.com/user-attachments/assets/8ffa81ab-9638-4bfa-ba93-1aec5f2412d1" />

<img width="1920" height="1080" alt="Application Screenshot 4" src="https://github.com/user-attachments/assets/87965ec6-eaf6-4885-a4ad-27e5f4e4b47e" />

<img width="1920" height="1080" alt="Application Screenshot 5" src="https://github.com/user-attachments/assets/6e3325c5-b253-4043-9089-4a8df9224237" />

<img width="1920" height="1080" alt="Application Screenshot 6" src="https://github.com/user-attachments/assets/fb3779c3-c3a2-4b8d-938d-a94005f8590a" />

<img width="1920" height="1080" alt="Application Screenshot 7" src="https://github.com/user-attachments/assets/70aec976-5594-46a6-bd44-f53972aa0283" />

<img width="1920" height="1080" alt="Application Screenshot 8" src="https://github.com/user-attachments/assets/4f44b601-ac8e-4010-a1d1-b983f4285e41" />

<img width="1920" height="1080" alt="Application Screenshot 9" src="https://github.com/user-attachments/assets/aab05009-edfc-4971-b5d4-2f7f9a40a279" />

<img width="1920" height="1080" alt="Application Screenshot 10" src="https://github.com/user-attachments/assets/489c9cd9-c975-4366-809a-4df78179eca4" />

<img width="1920" height="1080" alt="Application Screenshot 11" src="https://github.com/user-attachments/assets/37552bbc-b0fe-48a6-ab13-7d2c3e4bc8df" />

<img width="1920" height="1080" alt="Application Screenshot 12" src="https://github.com/user-attachments/assets/b8aa2448-550a-4e1e-903e-ea95f9a86150" />

<img width="1920" height="1080" alt="Application Screenshot 13" src="https://github.com/user-attachments/assets/bac8962f-4d8b-436b-ab0a-90faecfa2f1f" />

---

## 🌱 Project Goal

CivicClean AI aims to make waste reporting more accessible, improve coordination between citizens and municipal authorities, and support cleaner communities through AI-assisted waste classification and digital complaint management.
