import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import {
  Sparkles,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  DollarSign,
  FileCheck,
  ArrowRight,
  ListTodo,
  AlertCircle
} from 'lucide-react';

const CompanyPortalHome = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    events: [],
    todayAttendance: null,
    pendingLeavesCount: 0,
    employeeCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const fetchOverviewData = async () => {
    setLoading(true);
    setError('');
    try {
      const [eventsRes, attRes] = await Promise.all([
        axiosClient.get('/calendar/events'),
        axiosClient.get('/attendance/my').catch(() => ({ data: { todayRecord: null } })),
      ]);

      let pendingLeaves = 0;
      let empCount = 0;

      if (user?.role === 'admin' || user?.role === 'hr') {
        const [leavesRes, empRes] = await Promise.all([
          axiosClient.get('/leaves', { params: { status: 'pending' } }),
          axiosClient.get('/employees'),
        ]);
        pendingLeaves = leavesRes.data.leaves?.length || 0;
        empCount = empRes.data.employees?.length || 0;
      }

      setData({
        events: eventsRes.data.events || [],
        todayAttendance: attRes.data.todayRecord,
        pendingLeavesCount: pendingLeaves,
        employeeCount: empCount,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load company portal home');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, [user]);

  const handleCheckIn = async () => {
    setChecking(true);
    try {
      const res = await axiosClient.post('/attendance/check-in');
      if (res.data.success) fetchOverviewData();
    } catch (err) {
      alert(err.response?.data?.message || 'Check-in failed');
    } finally {
      setChecking(false);
    }
  };

  const handleCheckOut = async () => {
    setChecking(true);
    try {
      const res = await axiosClient.put('/attendance/check-out');
      if (res.data.success) fetchOverviewData();
    } catch (err) {
      alert(err.response?.data?.message || 'Check-out failed');
    } finally {
      setChecking(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading Company Portal..." />;
  if (error) return <ErrorState message={error} onRetry={fetchOverviewData} />;

  const firstName = user?.name?.split(' ')[0] || 'Team Member';
  const roleTitle = user?.role === 'admin' ? 'Administrator' : user?.role === 'hr' ? 'HR Manager' : 'Employee';

  // Filter Monthly & Today's Events
  const todayStr = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const todayEvents = data.events.filter((e) => {
    const sDate = new Date(e.startDate).toISOString().split('T')[0];
    const eDate = new Date(e.endDate).toISOString().split('T')[0];
    return todayStr >= sDate && todayStr <= eDate;
  });

  const monthlyEvents = data.events.filter((e) => {
    const d = new Date(e.startDate);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  // Calculate Today's Tasks
  const todayTasks = [
    {
      id: 'att',
      title: 'Daily Attendance Check-In',
      description: !data.todayAttendance
        ? 'Log your official arrival time for today'
        : !data.todayAttendance.checkOut
        ? `Checked in @ ${new Date(data.todayAttendance.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Remember to check out before leaving.`
        : 'Attendance completed for today.',
      status: !data.todayAttendance ? 'pending' : !data.todayAttendance.checkOut ? 'in-progress' : 'completed',
      action: !data.todayAttendance ? (
        <button onClick={handleCheckIn} disabled={checking} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm">
          {checking ? '...' : 'Check In'}
        </button>
      ) : !data.todayAttendance.checkOut ? (
        <button onClick={handleCheckOut} disabled={checking} className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-sm">
          {checking ? '...' : 'Check Out'}
        </button>
      ) : (
        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" /> Done
        </span>
      ),
    },
  ];

  if (user?.role === 'admin' || user?.role === 'hr') {
    todayTasks.push({
      id: 'leaves',
      title: 'Review Pending Leave Applications',
      description: data.pendingLeavesCount > 0
        ? `There are ${data.pendingLeavesCount} leave request(s) awaiting your review.`
        : 'All leave requests processed.',
      status: data.pendingLeavesCount > 0 ? 'pending' : 'completed',
      action: (
        <Link to="/hr/leaves" className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-sm">
          Review Requests
        </Link>
      ),
    });

    todayTasks.push({
      id: 'payroll',
      title: 'Monthly Payroll Status Check',
      description: 'Ensure monthly compensation payouts and payslips are updated for active workforce.',
      status: 'info',
      action: (
        <Link to="/hr/payroll" className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-sm">
          Manage Payroll
        </Link>
      ),
    });
  } else {
    todayTasks.push({
      id: 'payslip',
      title: 'View Monthly Payslips',
      description: 'Access and download your issued monthly compensation statements.',
      status: 'info',
      action: (
        <Link to="/employee/payroll" className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-sm">
          View Payslips
        </Link>
      ),
    });
  }

  return (
    <div className="space-y-8">
      {/* Main Hero Company Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white shadow-xl shadow-sky-600/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sky-100 text-xs font-bold">
            <Building2 className="w-4 h-4 text-sky-200" /> Welcome to NEUZEN AI Enterprise Portal
          </div>
          <h1 className="text-3xl font-extrabold font-outfit">
            Hello, {firstName}! ✨
          </h1>
          <p className="text-sm text-sky-100 max-w-xl leading-relaxed">
            Welcome to the official NEUZEN AI company portal. Review today's active tasks, monthly calendar events, and manage your workforce operations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {user?.role === 'admin' && (
            <Link
              to="/admin/dashboard"
              className="px-5 py-3 bg-white text-sky-800 hover:bg-sky-50 text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              Admin Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          {user?.role === 'hr' && (
            <Link
              to="/hr/dashboard"
              className="px-5 py-3 bg-white text-sky-800 hover:bg-sky-50 text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              HR Management Portal <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          {user?.role === 'employee' && (
            <Link
              to="/employee/dashboard"
              className="px-5 py-3 bg-white text-sky-800 hover:bg-sky-50 text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              My Employee Portal <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Grid: Today's Tasks & Today's Calendar Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Tasks Checklist */}
        <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-sky-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <ListTodo className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-outfit">Today's Action Tasks</h3>
                <p className="text-xs text-slate-500">Tasks to complete for today: {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-sky-600" />
                    )}
                    <h4 className="text-sm font-bold text-slate-900">{task.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600">{task.description}</p>
                </div>
                <div className="self-end sm:self-center">{task.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Calendar Schedule */}
        <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-sky-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-outfit">Today's Scheduled Events</h3>
                <p className="text-xs text-slate-500">Meetings, holidays & team events scheduled today</p>
              </div>
            </div>
            <Link to="/calendar" className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1">
              Full Calendar <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {todayEvents.length === 0 ? (
            <div className="py-8 text-center bg-sky-50/30 rounded-2xl border border-dashed border-sky-100">
              <p className="text-xs text-slate-500 font-medium">No special events scheduled for today.</p>
              <p className="text-[11px] text-slate-400 mt-1">Enjoy a smooth, productive workday!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayEvents.map((evt) => (
                <div key={evt._id} className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{evt.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{evt.description || 'Company event'}</p>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] uppercase font-bold rounded-lg bg-sky-100 text-sky-700 border border-sky-200">
                    {evt.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Monthly Events Showcase */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-sky-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-outfit">
              Monthly Events Calendar ({new Date().toLocaleString('default', { month: 'long', year: 'numeric' })})
            </h3>
            <p className="text-xs text-slate-500">Upcoming company holidays, team syncs, and approved leaves for this month</p>
          </div>
          <Link
            to="/calendar"
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
          >
            Manage Shared Calendar <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {monthlyEvents.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No events posted for this month yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monthlyEvents.map((evt) => (
              <div key={evt._id} className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 text-[10px] uppercase font-bold rounded-lg bg-sky-100 text-sky-700 border border-sky-200">
                    {evt.type}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {new Date(evt.startDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{evt.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{evt.description || 'Official company calendar event'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* HRMS Implementation Project Plan Showcase Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-sky-600" /> Architecture & Implementation Blueprint
          </div>
          <h3 className="text-xl font-bold font-outfit text-slate-900">
            HRMS Implementation Project Plan
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Explore the full project documentation including MERN stack architecture, database schemas, 5 interconnected role workflows, 23 active employee profiles, and verification testing strategies.
          </p>
        </div>
        <Link
          to="/project-plan"
          className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          View Full Project Plan <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* About Company Mission Footer Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-outfit text-sky-400">About NEUZEN AI Platform</h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            NEUZEN AI empowers enterprise organizations with intelligent HR software. Built to unify candidate onboarding, attendance tracking, leave approvals, and automated payroll into a single seamless experience.
          </p>
        </div>
        <Link
          to="/landing"
          className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-sky-600/30 whitespace-nowrap"
        >
          View Company Landing Page
        </Link>
      </div>
    </div>
  );
};

export default CompanyPortalHome;
