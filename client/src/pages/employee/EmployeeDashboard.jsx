import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import StatusBadge from '../../components/common/StatusBadge';
import { Clock, Calendar, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';

const EmployeeDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const fetchEmployeeSummary = async () => {
    setLoading(true);
    setError('');
    try {
      const [attRes, leaveRes, payRes] = await Promise.all([
        axiosClient.get('/attendance/my'),
        axiosClient.get('/leaves/my'),
        axiosClient.get('/payroll/my'),
      ]);

      setData({
        todayAttendance: attRes.data.todayRecord,
        attendanceHistory: attRes.data.history || [],
        myLeaves: leaveRes.data.leaves || [],
        myPayslips: payRes.data.payslips || [],
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load employee dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeSummary();
  }, []);

  const handleCheckIn = async () => {
    setChecking(true);
    try {
      const res = await axiosClient.post('/attendance/check-in');
      if (res.data.success) {
        fetchEmployeeSummary();
      }
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
      if (res.data.success) {
        fetchEmployeeSummary();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Check-out failed');
    } finally {
      setChecking(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading personal portal..." />;
  if (error) return <ErrorState message={error} onRetry={fetchEmployeeSummary} />;

  const today = data.todayAttendance;
  const approvedLeaves = data.myLeaves.filter((l) => l.status === 'approved').length;
  const pendingLeaves = data.myLeaves.filter((l) => l.status === 'pending').length;
  const latestPayslip = data.myPayslips[0];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white shadow-lg shadow-sky-600/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-outfit">Employee Self-Service Portal</h1>
          <p className="text-sm text-sky-100 mt-1">Manage your daily attendance, leave applications, and view monthly payslips</p>
        </div>

        {/* Check-In Action Widget */}
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center gap-4 text-white">
          <div>
            <p className="text-[10px] uppercase font-bold text-sky-100">Today's Status</p>
            <p className="text-xs font-bold text-white mt-0.5">
              {!today ? 'Not Checked In' : !today.checkOut ? 'Present (Active)' : 'Day Completed'}
            </p>
          </div>

          {!today ? (
            <button
              onClick={handleCheckIn}
              disabled={checking}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold rounded-lg shadow-md transition-all"
            >
              {checking ? 'Processing...' : 'Check In Now'}
            </button>
          ) : !today.checkOut ? (
            <button
              onClick={handleCheckOut}
              disabled={checking}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold rounded-lg shadow-md transition-all"
            >
              {checking ? 'Processing...' : 'Check Out'}
            </button>
          ) : (
            <span className="p-2 text-white bg-white/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
            </span>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/employee/attendance" className="p-6 rounded-2xl glass-card bg-white border border-sky-100 block">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Logged Attendance</span>
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">{data.attendanceHistory.length}</p>
          <p className="text-xs text-slate-500 mt-2">Days recorded</p>
        </Link>

        <Link to="/employee/leaves" className="p-6 rounded-2xl glass-card bg-white border border-sky-100 block">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Approved Leaves</span>
            <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">{approvedLeaves}</p>
          <p className="text-xs text-sky-700 font-semibold mt-2">{pendingLeaves} Pending Request(s)</p>
        </Link>

        <Link to="/employee/payroll" className="p-6 rounded-2xl glass-card bg-white border border-sky-100 block">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Latest Take-Home</span>
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">
            ₹{latestPayslip ? (latestPayslip.netSalary || 0).toLocaleString() : '0'}
          </p>
          <p className="text-xs text-slate-500 mt-2">Monthly net salary</p>
        </Link>

        <Link to="/calendar" className="p-6 rounded-2xl glass-card bg-white border border-sky-100 block">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Shared Calendar</span>
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">Holidays</p>
          <p className="text-xs text-amber-700 font-semibold mt-2 flex items-center gap-1">
            View Schedule <ArrowRight className="w-3 h-3" />
          </p>
        </Link>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Attendance Logs */}
        <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-900">Recent Attendance Logs</h3>
            <Link to="/employee/attendance" className="text-xs font-bold text-sky-700 hover:text-sky-800">
              View History
            </Link>
          </div>

          <div className="space-y-3">
            {data.attendanceHistory.slice(0, 4).map((att) => (
              <div key={att._id} className="p-3 bg-sky-50/50 rounded-xl border border-sky-100 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900">{att.date}</p>
                  <p className="text-slate-500">Check In: {new Date(att.checkIn).toLocaleTimeString()}</p>
                </div>
                <StatusBadge status={att.status} />
              </div>
            ))}
          </div>
        </div>

        {/* My Leave Applications */}
        <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-900">My Leave Requests</h3>
            <Link to="/employee/leaves" className="text-xs font-bold text-sky-700 hover:text-sky-800">
              Apply for Leave
            </Link>
          </div>

          {data.myLeaves.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No leave applications submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {data.myLeaves.slice(0, 4).map((leave) => (
                <div key={leave._id} className="p-3 bg-sky-50/50 rounded-xl border border-sky-100 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-900 capitalize">{leave.leaveType} Leave</p>
                    <p className="text-slate-500">{new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}</p>
                  </div>
                  <StatusBadge status={leave.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
