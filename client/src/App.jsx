import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleGuard from './routes/RoleGuard';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import CompanyPortalHome from './pages/CompanyPortalHome';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import EmployeeManagement from './pages/admin/EmployeeManagement';
import HRDashboard from './pages/hr/HRDashboard';
import Onboarding from './pages/hr/Onboarding';
import AttendanceManagement from './pages/hr/AttendanceManagement';
import LeaveManagement from './pages/hr/LeaveManagement';
import PayrollManagement from './pages/hr/PayrollManagement';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import MyAttendance from './pages/employee/MyAttendance';
import MyLeaves from './pages/employee/MyLeaves';
import MyPayroll from './pages/employee/MyPayroll';
import SharedCalendarPage from './pages/SharedCalendarPage';
import ProjectPlanPage from './pages/ProjectPlanPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default Website Route -> ALWAYS Shows Company Landing Page First */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />

          {/* Dedicated Login Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Authenticated Corporate Portal Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/company" element={<CompanyPortalHome />} />
              <Route path="/project-plan" element={<ProjectPlanPage />} />
              <Route path="/calendar" element={<SharedCalendarPage />} />

              {/* Admin Dashboard & Management Routes */}
              <Route element={<RoleGuard allowedRoles={['admin']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/employees" element={<EmployeeManagement />} />
              </Route>

              {/* HR Dashboard & Operational Routes */}
              <Route element={<RoleGuard allowedRoles={['hr', 'admin']} />}>
                <Route path="/hr/dashboard" element={<HRDashboard />} />
                <Route path="/hr/onboarding" element={<Onboarding />} />
                <Route path="/hr/attendance" element={<AttendanceManagement />} />
                <Route path="/hr/leaves" element={<LeaveManagement />} />
                <Route path="/hr/payroll" element={<PayrollManagement />} />
              </Route>

              {/* Employee Dashboard & Self-Service Routes */}
              <Route element={<RoleGuard allowedRoles={['employee', 'hr', 'admin']} />}>
                <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                <Route path="/employee/attendance" element={<MyAttendance />} />
                <Route path="/employee/leaves" element={<MyLeaves />} />
                <Route path="/employee/payroll" element={<MyPayroll />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
