# NEUZEN AI HRMS - Enterprise Human Resource Management System

A production-ready, full-stack **Human Resource Management System (HRMS)** built on the **MERN stack** (MongoDB, Express.js, React + Vite + Tailwind CSS, Node.js).

---

## 🌟 Key Features

1. **Role-Based Access Control (RBAC)**:
   - **Admin**: System-wide user directory, employee account provisioning, high-level workforce analytics.
   - **HR Manager**: Candidate onboarding & offer letter generation, leave request reviews, attendance logs, monthly payroll processing.
   - **Employee**: One-click check-in/out, leave applications, personal payslip statements, team shared calendar.
2. **Candidate Onboarding & Offer Letters**:
   - Dynamic offer letter generator with salary structure breakdowns.
   - Printable/exportable HTML offer letters with native browser PDF export.
   - One-click workflow to accept candidates and convert them into active Employee and User accounts.
3. **Attendance Tracking**:
   - One-click daily attendance marking with check-in and check-out timestamps.
   - Compound unique index on `(employee, date)` to strictly prevent duplicate daily attendance records.
4. **Leave Management & Approval**:
   - Leave applications with leave types, date ranges, and reasons.
   - HR approval/rejection with remarks.
   - Approved leave requests automatically sync as events on the shared company calendar.
5. **Payroll & Payslip Generation**:
   - Monthly payroll processing (`netSalary = basicSalary + allowances - deductions`).
   - Immutable snapshot storage so historic payslips remain unchanged if current employee salary rates change.
   - Printable/exportable HTML payslips for employees.
6. **Shared Company Calendar**:
   - Interactive calendar with holidays, approved leave dates, onboarding events, and team meetings.
7. **UX & Responsive Design**:
   - Modern dark-mode aesthetic with glassmorphism panels, indigo/violet accent gradients, loading spinners, empty states, and error handling.

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Recharts, Lucide Icons, React Big Calendar |
| **Backend** | Node.js, Express.js, Mongoose, JWT, bcryptjs, Helmet, Morgan, Express Validator |
| **Database** | MongoDB Atlas / Local MongoDB |
| **Authentication** | JSON Web Tokens (JWT) + bcrypt password hashing |

---

## 🔑 Pre-Seeded Assessment Accounts

| Role | Email | Password | Primary Capabilities |
|---|---|---|---|
| **Admin** | `admin@neuzenai.com` | `Admin@123` | User directory, employee management, system analytics |
| **HR** | `hr@neuzenai.com` | `HR@123` | Onboarding, leave approvals, attendance oversight, payroll |
| **Employee** | `employee@neuzenai.com` | `Employee@123` | Check-in/out, apply for leave, view payslips, shared calendar |

---

## 🚀 Local Installation & Setup

### Prerequisites
- Node.js LTS (v18+)
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Clone & Setup Backend
```bash
cd server
npm install
```

Create a `server/.env` file:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/neuzenai_hrms
JWT_SECRET=neuzenai_hrms_super_secret_jwt_key_2026
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 2. Seed Database
To populate test accounts and sample records:
```bash
npm run seed
```

### 3. Start Backend Server
```bash
npm run dev
# Server will run at http://localhost:5000
```

### 4. Setup Frontend
```bash
cd ../client
npm install
```

Start the Vite development server:
```bash
npm run dev
# Frontend will run at http://localhost:5173
```

---

## 📡 Key API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication & JWT generation
- `GET  /api/auth/me` - Fetch authenticated user details
- `POST /api/auth/logout` - Clear user session

### Employees
- `GET    /api/employees` - List all employees (HR/Admin)
- `POST   /api/employees` - Create new employee & user account (HR/Admin)
- `GET    /api/employees/:id` - Get employee profile details
- `PUT    /api/employees/:id` - Update employee details
- `DELETE /api/employees/:id` - Deactivate employee account

### Attendance
- `POST /api/attendance/check-in` - Mark today's check-in
- `PUT  /api/attendance/check-out` - Mark today's check-out
- `GET  /api/attendance/my` - Fetch personal attendance history
- `GET  /api/attendance` - Fetch company-wide attendance logs (HR/Admin)

### Leaves
- `POST /api/leaves` - Submit leave application
- `GET  /api/leaves/my` - View personal leave applications
- `GET  /api/leaves` - View all leave requests (HR/Admin)
- `PUT  /api/leaves/:id/approve` - Approve leave & sync to calendar (HR/Admin)
- `PUT  /api/leaves/:id/reject` - Reject leave with comment (HR/Admin)

### Onboarding
- `GET  /api/onboarding` - View candidate offer letters (HR/Admin)
- `POST /api/onboarding/offer-letter` - Generate new offer letter (HR/Admin)
- `PUT  /api/onboarding/offer-letter/:id` - Update offer status / convert to employee

### Payroll
- `GET  /api/payroll/my` - View personal payslips
- `GET  /api/payroll` - View all processed payrolls (HR/Admin)
- `POST /api/payroll/process` - Run monthly payroll calculation (HR/Admin)

### Shared Calendar
- `GET  /api/calendar/events` - Fetch all calendar events
- `POST /api/calendar/events` - Post new event (HR/Admin)

---

## 🌐 Deployment Plan

### Backend (Render Web Service)
1. Push `server/` codebase to GitHub repository.
2. Create a new **Web Service** on [Render](https://render.com).
3. Connect repository and configure environment variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`).
4. Set Build Command: `npm install` and Start Command: `npm start`.

### Frontend (Vercel / Cloudflare Pages)
1. Import `client/` codebase into Vercel or Cloudflare Pages.
2. Set build settings: Framework `Vite`, Output Directory `dist`.
3. Set environment variable: `VITE_API_URL=https://your-backend-url.onrender.com/api`.
