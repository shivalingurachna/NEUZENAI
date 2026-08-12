import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import FormInput from '../../components/common/FormInput';
import ErrorState from '../../components/common/ErrorState';
import { Plus } from 'lucide-react';

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: 'casual',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reason: '',
  });

  const fetchMyLeaves = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosClient.get('/leaves/my');
      if (res.data.success) {
        setLeaves(res.data.leaves);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch personal leave applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axiosClient.post('/leaves', formData);
      if (res.data.success) {
        setIsOpen(false);
        setFormData({
          leaveType: 'casual',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
          reason: '',
        });
        fetchMyLeaves();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit leave application');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Leave Type',
      cell: (row) => (
        <span className="capitalize font-bold text-sky-700 text-xs">
          {row.leaveType}
        </span>
      ),
    },
    {
      header: 'Start Date',
      cell: (row) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      header: 'End Date',
      cell: (row) => new Date(row.endDate).toLocaleDateString(),
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
      header: 'Review Remark',
      cell: (row) => row.reviewComment || '--',
    },
  ];

  if (error) return <ErrorState message={error} onRetry={fetchMyLeaves} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-outfit">My Leave Applications</h1>
          <p className="text-sm text-slate-500">Apply for time off and track application status</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-sky-600/20"
        >
          <Plus className="w-4 h-4" /> Apply for Leave
        </button>
      </div>

      <DataTable
        columns={columns}
        data={leaves}
        isLoading={loading}
        emptyTitle="No Leave Applications Submitted"
        emptyDescription="Your submitted leave requests will be tracked here."
      />

      {/* Leave Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="New Leave Application">
        <form onSubmit={handleApplyLeave} className="space-y-4">
          <FormInput
            label="Leave Type"
            name="leaveType"
            type="select"
            value={formData.leaveType}
            onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
            options={[
              { value: 'casual', label: 'Casual Leave' },
              { value: 'sick', label: 'Sick Leave' },
              { value: 'earned', label: 'Earned Leave' },
              { value: 'unpaid', label: 'Unpaid Leave' },
            ]}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
            <FormInput
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>

          <FormInput
            label="Reason for Leave"
            name="reason"
            type="textarea"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Provide brief details for your leave request..."
            required
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-500">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-sky-600/20"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyLeaves;
