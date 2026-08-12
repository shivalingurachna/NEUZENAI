import React from 'react';

const StatusBadge = ({ status }) => {
  const normalized = String(status || '').toLowerCase();

  const badgeStyles = {
    // Attendance / Employment Status
    present: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    absent: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    'half-day': 'bg-amber-500/10 text-amber-400 border-amber-500/30',

    // Leave & Offer Statuses
    approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    accepted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    draft: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    sent: 'bg-blue-500/10 text-blue-400 border-blue-500/30',

    // Payroll Statuses
    processed: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    terminated: 'bg-red-500/10 text-red-400 border-red-500/30',
  };

  const currentStyle = badgeStyles[normalized] || 'bg-slate-500/10 text-slate-400 border-slate-500/30';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${currentStyle}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75"></span>
      {status}
    </span>
  );
};

export default StatusBadge;
