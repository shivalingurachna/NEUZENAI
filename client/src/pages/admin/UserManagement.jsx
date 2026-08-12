import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ErrorState from '../../components/common/ErrorState';
import { UserX, UserCheck } from 'lucide-react';

const UserManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosClient.get('/employees');
      if (res.data.success) {
        setEmployees(res.data.employees);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user directory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = async (employeeId) => {
    try {
      await axiosClient.delete(`/employees/${employeeId}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    }
  };

  const columns = [
    {
      header: 'Employee Code',
      cell: (row) => <span className="font-mono font-bold text-sky-700">{row.employeeCode}</span>,
    },
    {
      header: 'User Name & Email',
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.firstName} {row.lastName}</p>
          <p className="text-xs text-slate-500">{row.user?.email || 'N/A'}</p>
        </div>
      ),
    },
    {
      header: 'Department',
      accessorKey: 'department',
    },
    {
      header: 'Designation',
      accessorKey: 'designation',
    },
    {
      header: 'Portal Role',
      cell: (row) => (
        <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold uppercase">
          {row.user?.role || 'employee'}
        </span>
      ),
    },
    {
      header: 'Account Status',
      cell: (row) => <StatusBadge status={row.employmentStatus} />,
    },
    {
      header: 'Actions',
      cell: (row) => (
        <button
          onClick={() => toggleUserStatus(row._id)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
            row.employmentStatus === 'active'
              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
          }`}
        >
          {row.employmentStatus === 'active' ? (
            <>
              <UserX className="w-3.5 h-3.5" /> Deactivate
            </>
          ) : (
            <>
              <UserCheck className="w-3.5 h-3.5" /> Activate
            </>
          )}
        </button>
      ),
    },
  ];

  if (error) return <ErrorState message={error} onRetry={fetchUsers} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-outfit">User & Access Management</h1>
          <p className="text-sm text-slate-500">Control system user permissions, roles, and status</p>
        </div>
      </div>

      <DataTable columns={columns} data={employees} isLoading={loading} emptyTitle="No Users Configured" />
    </div>
  );
};

export default UserManagement;
