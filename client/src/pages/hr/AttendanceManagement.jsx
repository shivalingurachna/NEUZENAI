import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ErrorState from '../../components/common/ErrorState';
import { Calendar } from 'lucide-react';

const AttendanceManagement = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchAttendance = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosClient.get('/attendance', {
        params: { date: selectedDate },
      });
      if (res.data.success) {
        setAttendanceRecords(res.data.records);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch attendance records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  const columns = [
    {
      header: 'Employee Code',
      cell: (row) => (
        <span className="font-mono font-bold text-sky-700">
          {row.employee?.employeeCode || 'N/A'}
        </span>
      ),
    },
    {
      header: 'Employee Name',
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-900">
            {row.employee?.firstName} {row.employee?.lastName}
          </p>
          <p className="text-xs text-slate-500">{row.employee?.designation}</p>
        </div>
      ),
    },
    {
      header: 'Department',
      cell: (row) => row.employee?.department || 'General',
    },
    {
      header: 'Date',
      cell: (row) => row.date,
    },
    {
      header: 'Check-In Time',
      cell: (row) => (
        <span className="text-emerald-700 font-mono font-bold text-xs">
          {row.checkIn ? new Date(row.checkIn).toLocaleTimeString() : '--'}
        </span>
      ),
    },
    {
      header: 'Check-Out Time',
      cell: (row) => (
        <span className="text-amber-700 font-mono font-bold text-xs">
          {row.checkOut ? new Date(row.checkOut).toLocaleTimeString() : 'Active (In)'}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ];

  if (error) return <ErrorState message={error} onRetry={fetchAttendance} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-outfit">Company Attendance Logs</h1>
          <p className="text-sm text-slate-500">Monitor employee check-in & check-out records across departments</p>
        </div>

        <div className="flex items-center gap-2 p-2 bg-white border border-sky-100 rounded-xl shadow-xs">
          <Calendar className="w-4 h-4 text-sky-600 ml-1" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-sm text-slate-800 focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={attendanceRecords}
        isLoading={loading}
        emptyTitle="No Attendance Recorded"
        emptyDescription={`No check-in entries logged for date: ${selectedDate}`}
      />
    </div>
  );
};

export default AttendanceManagement;
