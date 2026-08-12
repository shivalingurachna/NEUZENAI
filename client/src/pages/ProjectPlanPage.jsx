import React, { useState } from 'react';
import {
  FileText,
  Layers,
  Server,
  Database,
  Users,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Clock,
  DollarSign,
  Calendar,
  Sparkles,
  ArrowRight,
  Workflow,
  Code2,
  Terminal,
  Building2,
  Briefcase
} from 'lucide-react';

const ProjectPlanPage = () => {
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'workflows' | 'models' | 'roster' | 'testing'

  const employeesRoster = [
    { name: 'System Admin', email: 'admin@neuzenai.com', role: 'Admin (CTO)', dept: 'Executive' },
    { name: 'Sarah Jenkins', email: 'hr@neuzenai.com', role: 'HR Lead', dept: 'Human Resources' },
    { name: 'Alex Johnson', email: 'employee@neuzenai.com', role: 'Senior Frontend Dev', dept: 'Engineering' },
    { name: 'Maya Patel', email: 'maya.patel@neuzenai.com', role: 'ML Research Engineer', dept: 'AI & Data Science' },
    { name: 'Michael Brown', email: 'michael.brown@neuzenai.com', role: 'DevOps Lead', dept: 'Engineering' },
    { name: 'Priya Sharma', email: 'priya.sharma@neuzenai.com', role: 'UI/UX Product Designer', dept: 'Design' },
    { name: 'Carlos Mendez', email: 'carlos.mendez@neuzenai.com', role: 'Full Stack Engineer', dept: 'Engineering' },
    { name: 'Emily Watson', email: 'emily.watson@neuzenai.com', role: 'HR Specialist', dept: 'Human Resources' },
    { name: 'David Kim', email: 'david.kim@neuzenai.com', role: 'Financial Analyst', dept: 'Finance' },
    { name: 'Jessica Taylor', email: 'jessica.taylor@neuzenai.com', role: 'Marketing Director', dept: 'Marketing' },
    { name: 'Daniel Martinez', email: 'daniel.martinez@neuzenai.com', role: 'Backend Developer', dept: 'Engineering' },
    { name: 'Sophia Chen', email: 'sophia.chen@neuzenai.com', role: 'Lead Product Manager', dept: 'Product' },
    { name: 'James Wilson', email: 'james.wilson@neuzenai.com', role: 'Cybersecurity Specialist', dept: 'Engineering' },
    { name: 'Olivia Garcia', email: 'olivia.garcia@neuzenai.com', role: 'QA Automation Engineer', dept: 'Engineering' },
    { name: 'Robert Taylor', email: 'robert.taylor@neuzenai.com', role: 'Systems Architect', dept: 'Engineering' },
    { name: 'Ava Thomas', email: 'ava.thomas@neuzenai.com', role: 'Content Strategist', dept: 'Marketing' },
    { name: 'William Jackson', email: 'william.jackson@neuzenai.com', role: 'Data Engineer', dept: 'AI & Data Science' },
    { name: 'Isabella White', email: 'isabella.white@neuzenai.com', role: 'Operations Manager', dept: 'Operations' },
    { name: 'Ethan Harris', email: 'ethan.harris@neuzenai.com', role: 'Cloud Infrastructure Engineer', dept: 'Engineering' },
    { name: 'Mia Martin', email: 'mia.martin@neuzenai.com', role: 'HR Associate', dept: 'Human Resources' },
    { name: 'Alexander Clark', email: 'alexander.clark@neuzenai.com', role: 'AI Ethics Researcher', dept: 'AI & Data Science' },
    { name: 'Charlotte Lewis', email: 'charlotte.lewis@neuzenai.com', role: 'Business Analyst', dept: 'Product' },
    { name: 'Benjamin Robinson', email: 'benjamin.robinson@neuzenai.com', role: 'Frontend Architect', dept: 'Engineering' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white shadow-xl shadow-sky-600/15 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-sky-100 text-xs font-bold">
          <FileText className="w-4 h-4 text-sky-200" /> Technical Implementation & Architecture Blueprint
        </div>
        <h1 className="text-3xl font-extrabold font-outfit">
          NEUZEN AI HRMS - Implementation Project Plan
        </h1>
        <p className="text-sm text-sky-100 max-w-3xl leading-relaxed">
          Comprehensive project specification detailing MERN stack architecture, 5 interconnected role workflows, 23 active employee profiles, database models, and end-to-end verification strategies.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-sky-100 pb-2">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'architecture'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-white text-slate-600 hover:bg-sky-50 border border-sky-100'
          }`}
        >
          <Cpu className="w-4 h-4" /> 1. System Architecture
        </button>

        <button
          onClick={() => setActiveTab('workflows')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'workflows'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-white text-slate-600 hover:bg-sky-50 border border-sky-100'
          }`}
        >
          <Workflow className="w-4 h-4" /> 2. Inter-Connected Workflows
        </button>

        <button
          onClick={() => setActiveTab('models')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'models'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-white text-slate-600 hover:bg-sky-50 border border-sky-100'
          }`}
        >
          <Database className="w-4 h-4" /> 3. Database Schema Models
        </button>

        <button
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'roster'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-white text-slate-600 hover:bg-sky-50 border border-sky-100'
          }`}
        >
          <Users className="w-4 h-4" /> 4. 23 Employee Profiles
        </button>

        <button
          onClick={() => setActiveTab('testing')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'testing'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-white text-slate-600 hover:bg-sky-50 border border-sky-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> 5. Verification & Testing Plan
        </button>
      </div>

      {/* TAB 1: ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sky-600" /> Full-Stack MERN Architecture Overview
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              NEUZEN AI HRMS is engineered on the modern MERN stack with strict tier separation, JWT stateless authentication, role-guarded Express middleware, and MongoDB document schemas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">React + Vite Frontend</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> React 18 SPA with React Router v6</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> Tailwind CSS UI design system</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> Recharts & Big Calendar widgets</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Express.js API Node Backend</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> JWT Bearer Token Middleware</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Helmet & Express-Validator security</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Modular controller architecture</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">MongoDB Database Tier</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Mongoose ORM models & validation</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Automatic MongoMemoryServer fallback</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Compound unique index constraints</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
            <h4 className="text-base font-bold text-sky-400 font-outfit">System Architecture Diagram</h4>
            <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-4 bg-slate-950 rounded-2xl border border-slate-800 leading-relaxed">
{`                       ┌──────────────────────────────────────────┐
                       │          React + Vite Frontend           │
                       │   (Tailwind CSS, React Router, Recharts)  │
                       └────────────────────┬─────────────────────┘
                                            │ REST APIs / JWT Auth
                                            v
                       ┌──────────────────────────────────────────┐
                       │          Express.js Node Backend         │
                       │    (Helmet, Express-Validator, CORS)     │
                       └────────────────────┬─────────────────────┘
                                            │ Mongoose ORM
                                            v
                       ┌──────────────────────────────────────────┐
                       │         MongoDB Database Tier            │
                       │  (Users, Employees, Attendance, Leaves,  │
                       │    Payrolls, Offers, Calendar Events)    │
                       └──────────────────────────────────────────┘`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: WORKFLOWS */}
      {activeTab === 'workflows' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
              <Workflow className="w-5 h-5 text-sky-600" /> 5 Inter-Connected Role Workflows
            </h3>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h4 className="text-sm font-bold text-slate-900">Candidate Onboarding to Employee Account Conversion</h4>
                </div>
                <p className="text-xs text-slate-600 pl-8">
                  HR creates formal offer letter with salary breakdown → Candidate accepts offer → HR clicks "Convert to Employee" → Express backend generates User & Employee records → Employee logs in using newly minted credentials.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h4 className="text-sm font-bold text-slate-900">Leave Application → HR Approval → Calendar Auto-Sync</h4>
                </div>
                <p className="text-xs text-slate-600 pl-8">
                  Employee submits leave request with date range & reason → HR reviews request in HR Dashboard → Upon approval, backend automatically generates a shared `CalendarEvent` entry visible across the company.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h4 className="text-sm font-bold text-slate-900">Daily Attendance Tracking & Live Log Monitoring</h4>
                </div>
                <p className="text-xs text-slate-600 pl-8">
                  Employee logs Check-In / Check-Out from portal → Compound index prevents duplicate daily records → HR & Admin monitor real-time company attendance logs & present counts.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">4</span>
                  <h4 className="text-sm font-bold text-slate-900">Monthly Payroll Processing & Printable Payslips</h4>
                </div>
                <p className="text-xs text-slate-600 pl-8">
                  HR processes monthly payroll (`netSalary = basic + allowances - deductions`) → Stores immutable snapshot in MongoDB → Employee accesses, views, and prints official HTML payslip statements.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">5</span>
                  <h4 className="text-sm font-bold text-slate-900">Admin Access Control & Role Governance</h4>
                </div>
                <p className="text-xs text-slate-600 pl-8">
                  System CTO/Admin manages all 23 workforce accounts, modifies assigned access roles (Admin/HR/Employee), activates or deactivates users, and audits system-wide operational metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MODELS */}
      {activeTab === 'models' && (
        <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
            <Database className="w-5 h-5 text-sky-600" /> Database Collection Schemas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider">1. User Schema</h4>
              <p className="text-xs font-mono text-slate-600 leading-relaxed">
                name, email (unique), password (bcrypt), role (admin|hr|employee), employeeId (ref: Employee), isActive (Boolean).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider">2. Employee Schema</h4>
              <p className="text-xs font-mono text-slate-600 leading-relaxed">
                user (ref: User), employeeCode (unique), firstName, lastName, phone, department, designation, salary (basic, allowances, deductions), bankDetails.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider">3. Attendance Schema</h4>
              <p className="text-xs font-mono text-slate-600 leading-relaxed">
                employee (ref: Employee), date (YYYY-MM-DD), checkIn, checkOut, status (present|absent|leave). Index: Compound unique on (employee, date).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider">4. LeaveRequest Schema</h4>
              <p className="text-xs font-mono text-slate-600 leading-relaxed">
                employee (ref: Employee), leaveType (casual|sick|earned), startDate, endDate, reason, status (pending|approved|rejected), reviewComment.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider">5. OfferLetter Schema</h4>
              <p className="text-xs font-mono text-slate-600 leading-relaxed">
                candidateName, email, designation, department, salary breakdown, joiningDate, status (draft|sent|accepted|converted).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider">6. Payroll & Calendar Schemas</h4>
              <p className="text-xs font-mono text-slate-600 leading-relaxed">
                Payroll: employee, month, year, netSalary, paymentStatus. Index: (employee, month, year).<br />
                CalendarEvent: title, type, startDate, endDate, visibility.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ROSTER */}
      {activeTab === 'roster' && (
        <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-sky-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-600" /> Active 23 Employee Profiles Roster
              </h3>
              <p className="text-xs text-slate-500">Seeded employee directory across 9 corporate departments</p>
            </div>
            <span className="px-3 py-1 bg-sky-100 text-sky-800 font-bold text-xs rounded-full border border-sky-200">
              23 Active Accounts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50/60 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-sky-100">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Work Email</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Designation / Role</th>
                  <th className="py-3 px-4">Passcode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-100">
                {employeesRoster.map((emp, i) => (
                  <tr key={i} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">{emp.name}</td>
                    <td className="py-3 px-4 text-sky-600 font-mono">{emp.email}</td>
                    <td className="py-3 px-4 text-slate-600">{emp.dept}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        emp.role.includes('Admin') ? 'bg-purple-100 text-purple-700' :
                        emp.role.includes('HR') ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'
                      }`}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">
                      {emp.role.includes('Admin') ? 'Admin@123' : emp.role.includes('HR Lead') ? 'HR@123' : 'Employee@123'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: TESTING */}
      {activeTab === 'testing' && (
        <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-600" /> Verification & Testing Protocol
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-600" /> Automated & API Tests
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Server health check GET `/api/health` returns status healthy.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> MongoMemoryServer automatically seeds 23 accounts inline.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Compound index rejects duplicate daily attendance check-ins.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> RBAC middleware blocks employee access to HR payroll endpoints.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Manual Workflow Verification
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-role authentication & dashboard routing verified.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Offer letter creation, acceptance & account conversion tested.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Approved leave requests automatically sync to shared calendar.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Monthly payroll calculation and printable payslip statements verified.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPlanPage;
