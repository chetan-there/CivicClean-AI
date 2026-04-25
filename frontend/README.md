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

| Layer            | Technology           | Purpose              |
| ---------------- | -------------------- | -------------------- |
| Frontend         | React 18             | User Interface       |
| Routing          | React Router v6      | Navigation           |
| HTTP Client      | Axios                | API Calls            |
| Backend          | Java Spring Boot 3.2 | REST API             |
| Security         | Spring Security      | Auth & CORS          |
| ORM              | Spring Data JPA      | Database             |
| Database         | MySQL 8              | Data Storage         |
| AI Module        | Python Flask         | Image Classification |
| AI Vision        | Google Gemini API    | Waste Detection      |
| Image Processing | PIL/Pillow           | Image Handling       |

---

## 🗂️ Project Structure

waste-management-system/
│
├── frontend/ # React Application
│ └── src/
│ ├── components/
│ │ └── common/
│ │ └── ProtectedRoute.jsx
│ │
│ ├── context/
│ │ └── AuthContext.js
│ │
│ ├── pages/
│ │ ├── User/
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── UserDashboard.jsx
│ │ │ ├── ReportWaste.jsx
│ │ │ └── ComplaintStatus.jsx
│ │ │
│ │ ├── Admin/
│ │ │ ├── AdminDashboard.jsx
│ │ │ └── ManageComplaints.jsx
│ │ │
│ │ └── NotFound.jsx
│ │
│ ├── services/
│ │ ├── api.js
│ │ ├── authService.js
│ │ ├── complaintService.js
│ │ ├── userService.js
│ │ ├── teamService.js
│ │ └── aiService.js
│ │
│ └── App.js
│
├── backend/ # Spring Boot
│ └── src/main/java/com/waste/management/
│ ├── controller/
│ ├── service/
│ ├── repository/
│ ├── model/
│ ├── dto/
│ ├── config/
│ └── exception/
│
├── ai-module/ # Flask AI Service
│ ├── app.py
│ ├── classifier.py
│ ├── requirements.txt
│ └── .env
│
└── README.md

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

Run AI module:

```bash
python app.py
```

AI Module runs on `http://localhost:5000`

---

## 🔗 API Reference

### 🔐 Auth Endpoints

| Method | Endpoint           | Description       | Auth   |
| ------ | ------------------ | ----------------- | ------ |
| POST   | /api/auth/register | Register new user | Public |
| POST   | /api/auth/login    | Login user        | Public |

### 📋 Complaint Endpoints

| Method | Endpoint                    | Description         | Auth  |
| ------ | --------------------------- | ------------------- | ----- |
| POST   | /api/complaints             | Submit complaint    | User  |
| GET    | /api/complaints             | Get all complaints  | Admin |
| GET    | /api/complaints/user/{id}   | Get user complaints | User  |
| GET    | /api/complaints/{id}        | Get by ID           | User  |
| GET    | /api/complaints/code/{code} | Get by code         | User  |
| PUT    | /api/complaints/{id}/status | Update status       | Admin |
| DELETE | /api/complaints/{id}        | Delete complaint    | Admin |
| GET    | /api/complaints/search      | Search complaints   | Admin |
| GET    | /api/complaints/stats       | Get statistics      | Admin |

### 👥 User Endpoints

| Method | Endpoint                   | Description      | Auth  |
| ------ | -------------------------- | ---------------- | ----- |
| GET    | /api/users                 | Get all users    | Admin |
| GET    | /api/users/{id}            | Get user by ID   | Admin |
| GET    | /api/users/citizens        | Get all citizens | Admin |
| PUT    | /api/users/{id}/deactivate | Deactivate user  | Admin |

### 🤖 AI Endpoints

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| POST   | /classify | Classify waste image |
| GET    | /health   | Health check         |

---

## 🌐 Running Services

| Service          | URL                   | Status   |
| ---------------- | --------------------- | -------- |
| React Frontend   | http://localhost:3000 | Required |
| Spring Boot API  | http://localhost:8080 | Required |
| Python AI Module | http://localhost:5000 | Optional |

---

## 🧪 Test Accounts

Register these to test both roles:

| Role       | Email            | Password |
| ---------- | ---------------- | -------- |
| 👤 Citizen | citizen@test.com | 123456   |
| 🏢 Admin   | admin@test.com   | 123456   |

---

## 🔒 Security Features

- Password encryption with BCrypt
- Protected routes (React)
- CORS configuration
- Global exception handling
- Input validation

---

## 📍 Future Enhancements

- [ ] JWT Token Authentication
- [ ] Real-time notifications (WebSocket)
- [ ] Google Maps integration
- [ ] Mobile app (React Native)
- [ ] Heatmap of waste areas
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Multi-language support

---

## 👨‍💻 Author

**Chetan There**

- GitHub: [@chetan-there](https://github.com/chetan-there)

## 📜 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- Google Gemini API for AI classification
- Spring Boot community
- React community

AI Module runs on `http://localhost:5000`

---

## 🔗 API Reference

### 🔐 Auth Endpoints

| Method | Endpoint           | Description       | Auth   |
| ------ | ------------------ | ----------------- | ------ |
| POST   | /api/auth/register | Register new user | Public |
| POST   | /api/auth/login    | Login user        | Public |

### 📋 Complaint Endpoints

| Method | Endpoint                    | Description         | Auth  |
| ------ | --------------------------- | ------------------- | ----- |
| POST   | /api/complaints             | Submit complaint    | User  |
| GET    | /api/complaints             | Get all complaints  | Admin |
| GET    | /api/complaints/user/{id}   | Get user complaints | User  |
| GET    | /api/complaints/{id}        | Get by ID           | User  |
| GET    | /api/complaints/code/{code} | Get by code         | User  |
| PUT    | /api/complaints/{id}/status | Update status       | Admin |
| DELETE | /api/complaints/{id}        | Delete complaint    | Admin |
| GET    | /api/complaints/search      | Search complaints   | Admin |
| GET    | /api/complaints/stats       | Get statistics      | Admin |

### 👥 User Endpoints

| Method | Endpoint                   | Description      | Auth  |
| ------ | -------------------------- | ---------------- | ----- |
| GET    | /api/users                 | Get all users    | Admin |
| GET    | /api/users/{id}            | Get user by ID   | Admin |
| GET    | /api/users/citizens        | Get all citizens | Admin |
| PUT    | /api/users/{id}/deactivate | Deactivate user  | Admin |

### 🤖 AI Endpoints

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| POST   | /classify | Classify waste image |
| GET    | /health   | Health check         |

---

## 🌐 Running Services

| Service          | URL                   | Status   |
| ---------------- | --------------------- | -------- |
| React Frontend   | http://localhost:3000 | Required |
| Spring Boot API  | http://localhost:8080 | Required |
| Python AI Module | http://localhost:5000 | Optional |

---

## 🧪 Test Accounts

Register these to test both roles:

| Role       | Email            | Password |
| ---------- | ---------------- | -------- |
| 👤 Citizen | citizen@test.com | 123456   |
| 🏢 Admin   | admin@test.com   | 123456   |

---

## 🔒 Security Features

- Password encryption with BCrypt
- Protected routes (React)
- CORS configuration
- Global exception handling
- Input validation

---

## 📍 Future Enhancements

- [ ] JWT Token Authentication
- [ ] Real-time notifications (WebSocket)
- [ ] Google Maps integration
- [ ] Mobile app (React Native)
- [ ] Heatmap of waste areas
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Multi-language support

---

## 👨‍💻 Author

**Chetan There**

- GitHub: [@chetan-there](https://github.com/chetan-there)

## 📜 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- Google Gemini API for AI classification
- Spring Boot community
- React community
