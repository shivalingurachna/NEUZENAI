import React from 'react';
import Modal from '../common/Modal';
import { Printer, Download, CheckCircle, Mail } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const OfferLetterModal = ({ isOpen, onClose, offer, onUpdateStatus }) => {
  if (!offer) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Candidate Offer Letter Preview" maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex items-center justify-between no-print p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Status:</span>
            <StatusBadge status={offer.status} />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all border border-slate-700 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>

            {offer.status !== 'accepted' && (
              <button
                onClick={() => onUpdateStatus(offer._id, 'accepted', true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all shadow-lg shadow-emerald-600/20"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Accept & Create Employee Account
              </button>
            )}
          </div>
        </div>

        {/* Printable Offer Document */}
        <div
          id="printable-content"
          className="p-8 bg-white text-slate-900 rounded-xl shadow-lg font-sans border border-slate-200"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-indigo-950 tracking-wide font-outfit">NEUZEN AI</h1>
              <p className="text-xs text-slate-500 font-medium">Human Resource Department</p>
              <p className="text-xs text-slate-500">100 Tech Park, Suite 500</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full border border-indigo-100 uppercase tracking-wider">
                Official Offer Letter
              </span>
              <p className="text-xs text-slate-500 mt-2">
                Date: {new Date(offer.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Recipient info */}
          <div className="mb-6">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Prepared For:</p>
            <h2 className="text-lg font-bold text-slate-900">{offer.candidateName}</h2>
            <p className="text-sm text-slate-600">{offer.email}</p>
          </div>

          {/* Body Content */}
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <p>Dear <strong>{offer.candidateName}</strong>,</p>

            <p>
              Following our recent interviews and evaluations, we are delighted to offer you the position of{' '}
              <strong className="text-indigo-900">{offer.designation}</strong> in the{' '}
              <strong className="text-indigo-900">{offer.department}</strong> department at NEUZEN AI.
            </p>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 my-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-600">Expected Joining Date:</span>
                <span className="font-bold text-slate-900">{new Date(offer.joiningDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-600">Basic Monthly Compensation:</span>
                <span className="font-bold text-slate-900">₹{(offer.salary?.basicSalary || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-600">Allowances & Benefits:</span>
                <span className="font-bold text-slate-900">₹{(offer.salary?.allowances || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-600">Standard Deductions:</span>
                <span className="font-bold text-slate-900">₹{(offer.salary?.deductions || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 pt-2 text-sm font-bold text-indigo-900">
                <span>Total Net Monthly Remuneration:</span>
                <span>₹{(offer.salary?.netSalary || 0).toLocaleString()}</span>
              </div>
            </div>

            <p>
              We look forward to having you join our team and contribute to NEUZEN AI's continued success and innovation.
            </p>
          </div>

          {/* Signatures */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="h-12 flex items-end">
                <span className="font-outfit text-base italic text-indigo-900 font-semibold">Sarah Jenkins</span>
              </div>
              <p className="font-bold text-slate-900 pt-1 border-t border-slate-300">Authorized HR Representative</p>
              <p className="text-slate-500">NEUZEN AI Human Resources</p>
            </div>
            <div>
              <div className="h-12"></div>
              <p className="font-bold text-slate-900 pt-1 border-t border-slate-300">Candidate Acceptance Signature</p>
              <p className="text-slate-500">{offer.candidateName}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OfferLetterModal;
