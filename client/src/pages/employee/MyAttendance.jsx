import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ErrorState from '../../components/common/ErrorState';
import { UserCheck, LogOut, CheckCircle2, Clock } from 'lucide-react';

const MyAttendance = () => {
  const [data, setData] = useState({ todayRecord: null, history: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const [remarks, setRemarks] = useState('');

  const fetchMyAttendance = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosClient.get('/attendance/my');
      if (res.data.success) {
        setData({
          todayRecord: res.data.todayRecord,
          history: res.data.history || [],
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch personal attendance history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAttendance();
  }, []);

  const handleCheckIn = async () => {
    setChecking(true);
    try {
      const res = await axiosClient.post('/attendance/check-in', { remarks });
      if (res.data.success) {
        setRemarks('');
        fetchMyAttendance();
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
      const res = await axiosClient.put('/attendance/check-out', { remarks });
      if (res.data.success) {
        setRemarks('');
        fetchMyAttendance();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Check-out failed');
    } finally {
      setChecking(false);
    }
  };

  const columns = [
    {
      header: 'Date',
      cell: (row) => <span className="font-bold text-slate-900">{row.date}</span>,
    },
    {
      header: 'Check-In Time',
      cell: (row) => (
        <span className="text-emerald-700 font-mono font-bold text-xs">
          {new Date(row.checkIn).toLocaleTimeString()}
        </span>
      ),
    },
    {
      header: 'Check-Out Time',
      cell: (row) => (
        <span className="text-amber-700 font-mono font-bold text-xs">
          {row.checkOut ? new Date(row.checkOut).toLocaleTimeString() : 'In Progress'}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Remarks',
      cell: (row) => row.remarks || '--',
    },
  ];

  if (error) return <ErrorState message={error} onRetry={fetchMyAttendance} />;

  const today = data.todayRecord;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-outfit">My Attendance Portal</h1>
          <p className="text-sm text-slate-500">Mark daily check-in / check-out and view your attendance log history</p>
        </div>
      </div>

      {/* Interactive Check-In Panel */}
      <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-xs uppercase font-bold text-slate-500">Today's Attendance Status</p>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-600" />
            <h3 className="text-lg font-bold text-slate-900">
              {!today
                ? 'Ready for Check-In'
                : !today.checkOut
                ? `Checked In @ ${new Date(today.checkIn).toLocaleTimeString()}`
                : `Day Completed (Check-Out @ ${new Date(today.checkOut).toLocaleTimeString()})`}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Optional check-in remark..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            disabled={today && today.checkOut}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500 flex-1 md:w-64"
          />

          {!today ? (
            <button
              onClick={handleCheckIn}
              disabled={checking}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20 whitespace-nowrap"
            >
              <UserCheck className="w-4 h-4" /> {checking ? 'Recording...' : 'Check In'}
            </button>
          ) : !today.checkOut ? (
            <button
              onClick={handleCheckOut}
              disabled={checking}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-amber-600/20 whitespace-nowrap"
            >
              <LogOut className="w-4 h-4" /> {checking ? 'Recording...' : 'Check Out'}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" /> Day Log Completed
            </span>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data.history}
        isLoading={loading}
        emptyTitle="No Attendance History"
        emptyDescription="Your check-in records will appear here as you log attendance."
      />
    </div>
  );
};

export default MyAttendance;
