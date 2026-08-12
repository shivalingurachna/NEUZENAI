import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import PayslipModal from '../../components/hrms/PayslipModal';
import ErrorState from '../../components/common/ErrorState';
import { Play, Eye } from 'lucide-react';

const PayrollManagement = () => {
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // Modal State
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Payslip Preview State
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fetchPayrolls = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosClient.get('/payroll', {
        params: { month, year },
      });
      if (res.data.success) {
        setPayslips(res.data.payslips);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch payroll records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, [month, year]);

  const handleProcessPayroll = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const res = await axiosClient.post('/payroll/process', { month, year });
      if (res.data.success) {
        setIsProcessOpen(false);
        fetchPayrolls();
        alert(res.data.message || 'Payroll processed successfully');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Payroll calculation failed');
    } finally {
      setProcessing(false);
    }
  };

  const columns = [
    {
      header: 'Employee Name & Code',
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-900">
            {row.employee?.firstName} {row.employee?.lastName}
          </p>
          <span className="font-mono text-xs text-sky-700 font-bold">{row.employee?.employeeCode}</span>
        </div>
      ),
    },
    {
      header: 'Period',
      cell: (row) => `${row.month}/${row.year}`,
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
          <Eye className="w-3.5 h-3.5" /> View Payslip
        </button>
      ),
    },
  ];

  if (error) return <ErrorState message={error} onRetry={fetchPayrolls} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-outfit">Payroll & Payslip Management</h1>
          <p className="text-sm text-slate-500">Process monthly salary distributions and issue immutable employee payslips</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-1.5 bg-white border border-sky-100 rounded-xl text-xs shadow-xs">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-transparent text-slate-800 focus:outline-none px-2 py-1 font-medium"
            >
              {[1,2,3,4,5,6,7,8,9,10,11,12].map((m) => (
                <option key={m} value={m}>Month {m}</option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-transparent text-slate-800 focus:outline-none px-2 py-1 font-medium"
            >
              <option value={2026}>2026</option>
              <option value={2025}>2025</option>
            </select>
          </div>

          <button
            onClick={() => setIsProcessOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-sky-600/20"
          >
            <Play className="w-4 h-4 fill-current" /> Process Month Payroll
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={payslips} isLoading={loading} emptyTitle="No Payroll Records Processed" />

      {/* Confirmation Modal */}
      <Modal isOpen={isProcessOpen} onClose={() => setIsProcessOpen(false)} title="Confirm Monthly Payroll Processing">
        <form onSubmit={handleProcessPayroll} className="space-y-4">
          <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100 text-sm">
            <p className="font-bold text-slate-900">Target Period: Month {month}, {year}</p>
            <p className="text-slate-600 text-xs mt-1">
              Executing this action will calculate take-home salary (<span className="text-sky-700 font-semibold">Net = Basic + Allowances - Deductions</span>) for all active employees and generate immutable payslips.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={() => setIsProcessOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-500">
              Cancel
            </button>
            <button type="submit" disabled={processing} className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-sky-600/20">
              {processing ? 'Processing Calculations...' : 'Run Payroll Calculation'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Payslip View Modal */}
      <PayslipModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} payroll={selectedPayroll} />
    </div>
  );
};

export default PayrollManagement;
