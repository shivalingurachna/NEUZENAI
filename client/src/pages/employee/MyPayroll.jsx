import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import PayslipModal from '../../components/hrms/PayslipModal';
import ErrorState from '../../components/common/ErrorState';
import { Eye } from 'lucide-react';

const MyPayroll = () => {
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fetchMyPayroll = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosClient.get('/payroll/my');
      if (res.data.success) {
        setPayslips(res.data.payslips);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch payslips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPayroll();
  }, []);

  const columns = [
    {
      header: 'Pay Period',
      cell: (row) => <span className="font-bold text-slate-900">Month {row.month}, {row.year}</span>,
    },
    {
      header: 'Basic Salary',
      cell: (row) => `₹${(row.basicSalary || 0).toLocaleString()}`,
    },
    {
      header: 'Allowances',
      cell: (row) => <span className="text-emerald-700 font-semibold">+₹{(row.allowances || 0).toLocaleString()}</span>,
    },
    {
      header: 'Deductions',
      cell: (row) => <span className="text-rose-700 font-semibold">-₹{(row.deductions || 0).toLocaleString()}</span>,
    },
    {
      header: 'Net Take-Home Salary',
      cell: (row) => (
        <span className="font-bold text-slate-900 text-sm">
          ₹{(row.netSalary || 0).toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.paymentStatus} />,
    },
    {
      header: 'Payslip',
      cell: (row) => (
        <button
          onClick={() => {
            setSelectedPayroll(row);
            setIsPreviewOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl border border-sky-200 transition-all"
        >
          <Eye className="w-3.5 h-3.5" /> View & Print
        </button>
      ),
    },
  ];

  if (error) return <ErrorState message={error} onRetry={fetchMyPayroll} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-outfit">My Payslip Statements</h1>
          <p className="text-sm text-slate-500">View and download your monthly compensation breakdowns</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={payslips}
        isLoading={loading}
        emptyTitle="No Payslips Available"
        emptyDescription="Processed payslips issued by HR will appear here."
      />

      <PayslipModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} payroll={selectedPayroll} />
    </div>
  );
};

export default MyPayroll;
