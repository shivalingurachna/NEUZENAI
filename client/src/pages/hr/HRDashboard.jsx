import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { FileCheck, CalendarDays, Clock, DollarSign, ArrowRight, UserPlus } from 'lucide-react';

const HRDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHRStats = async () => {
    setLoading(true);
    setError('');
    try {
      const [leavesRes, offersRes, attRes, payrollRes] = await Promise.all([
        axiosClient.get('/leaves'),
        axiosClient.get('/onboarding'),
        axiosClient.get('/attendance'),
        axiosClient.get('/payroll'),
      ]);

      const leaves = leavesRes.data.leaves || [];
      const offers = offersRes.data.offerLetters || [];
      const attendance = attRes.data.records || [];
      const payrolls = payrollRes.data.payslips || [];

      setStats({
        pendingLeaves: leaves.filter((l) => l.status === 'pending'),
        sentOffers: offers.filter((o) => o.status === 'sent'),
        todayAttendanceCount: attendance.filter((a) => a.status === 'present').length,
        processedPayrollsCount: payrolls.length,
        allOffers: offers.slice(0, 5),
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch HR dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHRStats();
  }, []);

  if (loading) return <LoadingSpinner text="Loading HR operations summary..." />;
  if (error) return <ErrorState message={error} onRetry={fetchHRStats} />;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white shadow-lg shadow-sky-600/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-outfit">HR Operations Hub</h1>
          <p className="text-sm text-sky-100 mt-1">Manage onboarding, attendance oversight, leave approvals, & payroll processing</p>
        </div>
        <Link
          to="/hr/onboarding"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-sky-800 hover:bg-sky-50 text-xs font-bold rounded-xl shadow-md transition-all"
        >
          <UserPlus className="w-4 h-4" /> Create Offer Letter
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/hr/leaves" className="p-6 rounded-2xl glass-card bg-white border border-sky-100 block">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Leave Requests</span>
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">{stats.pendingLeaves.length}</p>
          <p className="text-xs text-amber-700 font-semibold mt-2 flex items-center gap-1">
            Requires Approval <ArrowRight className="w-3 h-3" />
          </p>
        </Link>

        <Link to="/hr/onboarding" className="p-6 rounded-2xl glass-card bg-white border border-sky-100 block">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Offer Letters</span>
            <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">{stats.sentOffers.length}</p>
          <p className="text-xs text-slate-500 mt-2">Sent to candidates</p>
        </Link>

        <Link to="/hr/attendance" className="p-6 rounded-2xl glass-card bg-white border border-sky-100 block">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today's Check-ins</span>
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">{stats.todayAttendanceCount}</p>
          <p className="text-xs text-emerald-700 font-semibold mt-2">Present Today</p>
        </Link>

        <Link to="/hr/payroll" className="p-6 rounded-2xl glass-card bg-white border border-sky-100 block">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Processed Payslips</span>
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-4 font-outfit">{stats.processedPayrollsCount}</p>
          <p className="text-xs text-slate-500 mt-2">Verified records</p>
        </Link>
      </div>

      {/* Actionable Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Leave Approvals Preview */}
        <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-900">Action Required: Leave Applications</h3>
            <Link to="/hr/leaves" className="text-xs font-bold text-sky-700 hover:text-sky-800">
              View All
            </Link>
          </div>

          {stats.pendingLeaves.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No pending leave requests at present.</p>
          ) : (
            <div className="space-y-3">
              {stats.pendingLeaves.slice(0, 4).map((leave) => (
                <div key={leave._id} className="p-3 bg-sky-50/50 rounded-xl border border-sky-100 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {leave.employee?.firstName} {leave.employee?.lastName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {leave.leaveType} leave ({new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()})
                    </p>
                  </div>
                  <Link
                    to="/hr/leaves"
                    className="px-3 py-1.5 bg-sky-100 text-sky-800 text-xs font-bold rounded-lg hover:bg-sky-200 border border-sky-200"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Candidate Onboarding Offers */}
        <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-900">Recent Candidate Offer Letters</h3>
            <Link to="/hr/onboarding" className="text-xs font-bold text-sky-700 hover:text-sky-800">
              Manage Onboarding
            </Link>
          </div>

          {stats.allOffers.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No candidate offer letters created yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.allOffers.map((offer) => (
                <div key={offer._id} className="p-3 bg-sky-50/50 rounded-xl border border-sky-100 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{offer.candidateName}</p>
                    <p className="text-xs text-slate-500">{offer.designation} • {offer.department}</p>
                  </div>
                  <span className="text-xs font-bold capitalize text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded border border-sky-200">
                    {offer.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
