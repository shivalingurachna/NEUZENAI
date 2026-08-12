import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileCheck,
  Clock,
  CalendarDays,
  DollarSign,
  Briefcase,
  X,
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const role = user?.role || 'employee';

  const adminNav = [
    { label: 'Admin Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'User Directory', path: '/admin/users', icon: Users },
    { label: 'Employee Roster', path: '/admin/employees', icon: Briefcase },
  ];

  const hrNav = [
    { label: 'HR Dashboard', path: '/hr/dashboard', icon: LayoutDashboard },
    { label: 'Onboarding & Offers', path: '/hr/onboarding', icon: FileCheck },
    { label: 'Attendance Log', path: '/hr/attendance', icon: Clock },
    { label: 'Leave Requests', path: '/hr/leaves', icon: CalendarDays },
    { label: 'Payroll Processing', path: '/hr/payroll', icon: DollarSign },
  ];

  const empNav = [
    { label: 'My Dashboard', path: '/employee/dashboard', icon: LayoutDashboard },
    { label: 'Daily Attendance', path: '/employee/attendance', icon: UserCheck },
    { label: 'Leave Portal', path: '/employee/leaves', icon: CalendarDays },
    { label: 'My Payslips', path: '/employee/payroll', icon: DollarSign },
  ];

  const commonNav = [
    { label: 'Team Calendar', path: '/calendar', icon: CalendarDays },
  ];

  let roleItems = [];
  if (role === 'admin') roleItems = adminNav;
  else if (role === 'hr') roleItems = hrNav;
  else roleItems = empNav;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
        ></div>
      )}

      <aside
        className={`w-64 bg-white border-r border-sky-100 flex flex-col fixed md:sticky top-0 h-screen z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } shadow-sm`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-sky-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 font-bold text-lg font-outfit">
              N
            </div>
            <div>
              <h1 className="font-bold text-slate-900 tracking-wide text-base font-outfit">
                NEUZEN <span className="text-sky-600">AI</span>
              </h1>
              <p className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">
                HRMS Enterprise
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="md:hidden p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto custom-scrollbar">
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              {role} Portal
            </p>
            <nav className="space-y-1">
              {roleItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                        isActive
                          ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-600/20'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Tools & Calendar
            </p>
            <nav className="space-y-1">
              {commonNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                        isActive
                          ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-600/20'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Badge */}
        <div className="p-4 border-t border-sky-100 bg-sky-50/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-xs font-bold text-sky-700">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{user?.name}</p>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 border border-sky-200">
                {role}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
