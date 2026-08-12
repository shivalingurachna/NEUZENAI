import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { Users, Briefcase, Clock, CalendarDays, TrendingUp, ShieldCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAdminStats = async () => {
    setLoading(true);
    setError('');
    try {
      const [empRes, attRes, leaveRes] = await Promise.all([
        axiosClient.get('/employees'),
        axiosClient.get('/attendance'),
        axiosClient.get('/leaves'),
      ]);

      const employees = empRes.data.employees || [];
      const attendance = attRes.data.records || [];
      const leaves = leaveRes.data.leaves || [];

      // Department distribution
      const deptCounts = {};
      employees.forEach((emp) => {
        const d = emp.department || 'General';
        deptCounts[d] = (deptCounts[d] || 0) + 1;
      });

      const deptData = Object.keys(deptCounts).map((key) => ({
        name: key,
        value: deptCounts[key],
      }));

      setStats({
        totalEmployees: employees.length,
        activeEmployees: employees.filter((e) => e.employmentStatus === 'active').length,
        todayPresent: attendance.filter((a) => a.status === 'present').length,
        pendingLeaves: leaves.filter((l) => l.status === 'pending').length,
        deptData,
        employees,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

  if (loading) return <LoadingSpinner text="Compiling organization analytics..." />;
  if (error) return <ErrorState message={error} onRetry={fetchAdminStats} />;

  const COLORS = ['#0284c7', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white shadow-lg shadow-sky-600/15">
        <div>
          <h1 className="text-2xl font-bold font-outfit">Admin System Dashboard</h1>
          <p className="text-sm text-sky-100 mt-1">High-level enterprise workforce analytics & system status</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/30">
          <ShieldCheck className="w-4 h-4" /> System Healthy & Active
        </span>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl glass-card bg-white border border-sky-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Workforce</span>
            <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">{stats.totalEmployees}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> {stats.activeEmployees} Active Members
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-card bg-white border border-sky-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today's Attendance</span>
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">{stats.todayPresent}</p>
          <p className="text-xs text-slate-500 mt-2">Check-in logs logged today</p>
        </div>

        <div className="p-6 rounded-2xl glass-card bg-white border border-sky-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Leaves</span>
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">{stats.pendingLeaves}</p>
          <p className="text-xs text-amber-700 font-semibold mt-2">Awaiting HR Review</p>
        </div>

        <div className="p-6 rounded-2xl glass-card bg-white border border-sky-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Departments</span>
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">{stats.deptData.length}</p>
          <p className="text-xs text-slate-500 mt-2">Active business units</p>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Breakdown */}
        <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4">Department Workforce Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.deptData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {stats.deptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Employee Joining Overview */}
        <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4">Team Headcount by Department</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.deptData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }} />
                <Bar dataKey="value" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
