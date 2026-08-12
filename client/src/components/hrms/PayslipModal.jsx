import React from 'react';
import Modal from '../common/Modal';
import { Printer, CheckCircle2 } from 'lucide-react';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const PayslipModal = ({ isOpen, onClose, payroll }) => {
  if (!payroll) return null;

  const employee = payroll.employee || {};
  const monthName = monthNames[(payroll.month || 1) - 1];

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Employee Salary Payslip" maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Actions */}
        <div className="flex items-center justify-between no-print p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            Payroll Status: Processed & Verified
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-md shadow-indigo-600/20"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF
          </button>
        </div>

        {/* Printable Payslip Document */}
        <div
          id="printable-content"
          className="p-8 bg-white text-slate-900 rounded-xl shadow-lg font-sans border border-slate-200"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-200 pb-6 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-indigo-950 font-outfit">NEUZEN AI</h1>
              <p className="text-xs text-slate-500">Official Monthly Salary Slip</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-900 font-bold text-xs rounded border border-indigo-200 uppercase">
                {monthName} {payroll.year}
              </span>
              <p className="text-xs text-slate-500 mt-1">Generated: {new Date(payroll.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Employee Details Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs mb-6">
            <div>
              <p className="text-slate-500">Employee Name:</p>
              <p className="font-bold text-slate-900 text-sm">
                {employee.firstName} {employee.lastName}
              </p>
            </div>
            <div>
              <p className="text-slate-500">Employee Code:</p>
              <p className="font-bold text-slate-900">{employee.employeeCode || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-500">Department:</p>
              <p className="font-semibold text-slate-800">{employee.department || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-500">Designation:</p>
              <p className="font-semibold text-slate-800">{employee.designation || 'N/A'}</p>
            </div>
            {employee.bankDetails && (
              <>
                <div>
                  <p className="text-slate-500">Bank Account:</p>
                  <p className="font-semibold text-slate-800">{employee.bankDetails.bankName} - {employee.bankDetails.accountNumber}</p>
                </div>
                <div>
                  <p className="text-slate-500">IFSC Code:</p>
                  <p className="font-semibold text-slate-800">{employee.bankDetails.ifscCode}</p>
                </div>
              </>
            )}
          </div>

          {/* Earnings vs Deductions Table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden text-xs mb-6">
            <table className="w-full text-left">
              <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700 uppercase">
                <tr>
                  <th className="p-3 border-r border-slate-200">Earnings Description</th>
                  <th className="p-3 border-r border-slate-200 text-right">Amount (₹)</th>
                  <th className="p-3 border-r border-slate-200">Deductions Description</th>
                  <th className="p-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr>
                  <td className="p-3 border-r border-slate-200">Basic Salary</td>
                  <td className="p-3 border-r border-slate-200 text-right font-medium">₹{payroll.basicSalary?.toLocaleString()}</td>
                  <td className="p-3 border-r border-slate-200">Provident Fund & Taxes</td>
                  <td className="p-3 text-right font-medium">₹{payroll.deductions?.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-slate-200">House & Travel Allowances</td>
                  <td className="p-3 border-r border-slate-200 text-right font-medium">₹{payroll.allowances?.toLocaleString()}</td>
                  <td className="p-3 border-r border-slate-200">Other Deductions</td>
                  <td className="p-3 text-right font-medium">₹0</td>
                </tr>
                <tr className="bg-indigo-50/50 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="p-3 border-r border-slate-200">Gross Earnings</td>
                  <td className="p-3 border-r border-slate-200 text-right">₹{((payroll.basicSalary || 0) + (payroll.allowances || 0)).toLocaleString()}</td>
                  <td className="p-3 border-r border-slate-200">Total Deductions</td>
                  <td className="p-3 text-right">₹{(payroll.deductions || 0).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Net Salary Highlight */}
          <div className="p-4 bg-indigo-900 text-white rounded-lg flex justify-between items-center mb-8 shadow-inner">
            <div>
              <p className="text-xs uppercase tracking-wider text-indigo-200 font-semibold">Net Take-Home Salary</p>
              <p className="text-2xl font-bold font-outfit">₹{payroll.netSalary?.toLocaleString()}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-400/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-400/30">
              Paid via Bank Transfer
            </span>
          </div>

          {/* Footer note */}
          <div className="text-[11px] text-slate-500 text-center border-t border-slate-200 pt-4">
            This is a computer-generated payslip issued by NEUZEN AI HR System and requires no physical signature.
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PayslipModal;
