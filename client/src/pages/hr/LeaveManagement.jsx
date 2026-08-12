import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import FormInput from '../../components/common/FormInput';
import ErrorState from '../../components/common/ErrorState';
import { useAuth } from '../../context/AuthContext';
import { Check, X, ShieldCheck, UserCheck, Clock, Calendar } from 'lucide-react';

const LeaveManagement = () => {
  const { user } = useAuth();
  const role = user?.role || 'employee';

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Review Modal State
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [actionType, setActionType] = useState('approve');

  const fetchLeaves = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosClient.get('/leaves', {
        params: { status: statusFilter },
      });
      if (res.data.success) {
        setLeaves(res.data.leaves);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch leave requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [statusFilter]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLeave) return;
    setSubmitting(true);

    try {
      const url = `/leaves/${selectedLeave._id}/${actionType}`;
      const defaultRemark = role === 'admin' ? `Approved by System Admin (${user.name})` : `Approved by HR Manager (${user.name})`;
      const res = await axiosClient.put(url, { comment: comment || defaultRemark });
      if (res.data.success) {
        setIsReviewOpen(false);
        setComment('');
        fetchLeaves();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    } finally {
      setSubmitting(false);
    }
  };

  const openReviewModal = (leave, type) => {
    setSelectedLeave(leave);
    setActionType(type);
    setComment(type === 'approve' ? (role === 'admin' ? 'Approved by Admin CTO' : 'Approved by HR Lead') : 'Rejected');
    setIsReviewOpen(true);
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
      header: 'Department',
      cell: (row) => <span className="font-semibold text-slate-700 text-xs">{row.employee?.department || 'General'}</span>,
    },
    {
      header: 'Leave Type',
      cell: (row) => (
        <span className="capitalize font-bold text-sky-700 text-xs bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
          {row.leaveType}
        </span>
      ),
    },
    {
      header: 'Duration Range',
      cell: (row) => (
        <div className="text-xs font-medium text-slate-700">
          {new Date(row.startDate).toLocaleDateString()} to {new Date(row.endDate).toLocaleDateString()}
        </div>
      ),
    },
    {
      header: 'Reason',
      cell: (row) => <span className="text-xs text-slate-600 max-w-xs truncate block">{row.reason}</span>,
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions & Audit Log',
      cell: (row) => (
        <div>
          {row.status === 'pending' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openReviewModal(row, 'approve')}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl border border-emerald-200 transition-all"
              >
                <Check className="w-3.5 h-3.5" /> Approve
              </button>
              <button
                onClick={() => openReviewModal(row, 'reject')}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition-all"
              >
                <X className="w-3.5 h-3.5" /> Reject
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-600 space-y-0.5">
              <p className="font-semibold text-slate-800">"{row.reviewComment || 'Processed'}"</p>
              {role === 'admin' && row.reviewedAt && (
                <p className="text-[10px] text-slate-400">Reviewed: {new Date(row.reviewedAt).toLocaleDateString()}</p>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  if (error) return <ErrorState message={error} onRetry={fetchLeaves} />;

  return (
    <div className="space-y-6">
      {/* Header with Role Badge */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 font-outfit">Leave Application Portal</h1>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
              role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-sky-100 text-sky-700 border border-sky-200'
            }`}>
              {role === 'admin' ? 'System CTO Audit Control' : 'HR Management Review'}
            </span>
          </div>
          <p className="text-sm text-slate-500">Review employee leave applications & synchronize approved requests to calendar</p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 bg-white border border-sky-100 rounded-xl text-sm text-slate-700 focus:outline-none shadow-xs"
        >
          <option value="">All Leave Statuses</option>
          <option value="pending">Pending Review</option>
          <option value="approved">Approved Requests</option>
          <option value="rejected">Rejected Requests</option>
        </select>
      </div>

      {/* Role-Specific Overview Banners */}
      {role === 'admin' && (
        <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-between text-xs text-purple-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-700" />
            <span><strong>Admin Executive Control:</strong> You have system-wide override authority to audit, approve, or re-evaluate leave requests across all 9 company departments.</span>
          </div>
        </div>
      )}

      {role === 'hr' && (
        <div className="p-4 bg-sky-50 border border-sky-100 rounded-2xl flex items-center justify-between text-xs text-sky-900">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-sky-700" />
            <span><strong>HR Operational Review:</strong> Approving a leave application automatically posts a shared event to the company team calendar.</span>
          </div>
        </div>
      )}

      <DataTable columns={columns} data={leaves} isLoading={loading} emptyTitle="No Leave Applications" />

      {/* Review Modal */}
      <Modal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        title={actionType === 'approve' ? `Approve Leave Request (${role.toUpperCase()})` : `Reject Leave Request (${role.toUpperCase()})`}
      >
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100 text-xs space-y-1">
            <p className="font-bold text-slate-900">
              {selectedLeave?.employee?.firstName} {selectedLeave?.employee?.lastName} ({selectedLeave?.employee?.department})
            </p>
            <p className="text-slate-600">Reason: {selectedLeave?.reason}</p>
            <p className="text-slate-500 font-mono">
              Dates: {new Date(selectedLeave?.startDate).toLocaleDateString()} to {new Date(selectedLeave?.endDate).toLocaleDateString()}
            </p>
          </div>

          <FormInput
            label="Review Remarks / Feedback Comment"
            name="comment"
            type="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Add ${role} review details...`}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={() => setIsReviewOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-500">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-5 py-2 text-white text-xs font-semibold rounded-xl shadow-md ${
                actionType === 'approve' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20' : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/20'
              }`}
            >
              {submitting ? 'Saving...' : actionType === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LeaveManagement;
