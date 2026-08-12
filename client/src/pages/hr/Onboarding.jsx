import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import FormInput from '../../components/common/FormInput';
import OfferLetterModal from '../../components/hrms/OfferLetterModal';
import ErrorState from '../../components/common/ErrorState';
import { Plus, Eye, CheckCircle } from 'lucide-react';

const Onboarding = () => {
  const [offerLetters, setOfferLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    designation: 'Frontend Engineer',
    department: 'Engineering',
    basicSalary: 45000,
    allowances: 5000,
    deductions: 2000,
    joiningDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  // Preview Modal State
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fetchOfferLetters = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosClient.get('/onboarding');
      if (res.data.success) {
        setOfferLetters(res.data.offerLetters);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch offer letters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfferLetters();
  }, []);

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        candidateName: formData.candidateName,
        email: formData.email,
        designation: formData.designation,
        department: formData.department,
        salary: {
          basicSalary: Number(formData.basicSalary),
          allowances: Number(formData.allowances),
          deductions: Number(formData.deductions),
        },
        joiningDate: formData.joiningDate,
      };

      const res = await axiosClient.post('/onboarding/offer-letter', payload);
      if (res.data.success) {
        setIsFormOpen(false);
        fetchOfferLetters();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create offer letter');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (offerId, status, convertToEmployee = false) => {
    try {
      const res = await axiosClient.put(`/onboarding/offer-letter/${offerId}`, {
        status,
        convertToEmployee,
      });

      if (res.data.success) {
        setIsPreviewOpen(false);
        fetchOfferLetters();
        if (convertToEmployee) {
          alert('Candidate accepted offer! Employee and User accounts created successfully.');
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    }
  };

  const columns = [
    {
      header: 'Candidate Name',
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.candidateName}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      ),
    },
    {
      header: 'Position & Department',
      cell: (row) => (
        <div>
          <p className="font-semibold text-slate-800">{row.designation}</p>
          <span className="text-xs text-sky-700 font-bold">{row.department}</span>
        </div>
      ),
    },
    {
      header: 'Offered Compensation',
      cell: (row) => (
        <span className="font-bold text-emerald-700 text-xs">
          ₹{(row.salary?.netSalary || 0).toLocaleString()} / month
        </span>
      ),
    },
    {
      header: 'Joining Date',
      cell: (row) => new Date(row.joiningDate).toLocaleDateString(),
    },
    {
      header: 'Offer Status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedOffer(row);
              setIsPreviewOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl border border-sky-200 transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Preview Letter
          </button>

          {row.status !== 'accepted' && (
            <button
              onClick={() => handleUpdateStatus(row._id, 'accepted', true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-all"
            >
              <CheckCircle className="w-3.5 h-3.5" /> Accept & Convert
            </button>
          )}
        </div>
      ),
    },
  ];

  if (error) return <ErrorState message={error} onRetry={fetchOfferLetters} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-outfit">Candidate Onboarding & Offer Letters</h1>
          <p className="text-sm text-slate-500">Generate structured offer letters and onboard candidates into active workforce</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-sky-600/20"
        >
          <Plus className="w-4 h-4" /> Generate Offer Letter
        </button>
      </div>

      <DataTable columns={columns} data={offerLetters} isLoading={loading} emptyTitle="No Offer Letters Created" />

      {/* Form Modal */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Generate New Offer Letter">
        <form onSubmit={handleCreateOffer} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Candidate Full Name" name="candidateName" value={formData.candidateName} onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })} required />
            <FormInput label="Candidate Email" name="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Designation" name="designation" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} required />
            <FormInput label="Department" name="department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} required />
          </div>

          <div className="grid grid-cols-3 gap-3 p-3 bg-sky-50/50 rounded-xl border border-sky-100">
            <FormInput label="Basic Salary (₹)" name="basicSalary" type="number" value={formData.basicSalary} onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })} required />
            <FormInput label="Allowances (₹)" name="allowances" type="number" value={formData.allowances} onChange={(e) => setFormData({ ...formData, allowances: e.target.value })} />
            <FormInput label="Deductions (₹)" name="deductions" type="number" value={formData.deductions} onChange={(e) => setFormData({ ...formData, deductions: e.target.value })} />
          </div>

          <FormInput label="Target Joining Date" name="joiningDate" type="date" value={formData.joiningDate} onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })} required />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-sky-600/20">
              {submitting ? 'Generating...' : 'Save & Generate Letter'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Offer Letter Preview Modal */}
      <OfferLetterModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        offer={selectedOffer}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default Onboarding;
