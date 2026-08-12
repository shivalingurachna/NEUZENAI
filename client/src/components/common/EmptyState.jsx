import React from 'react';
import { FolderOpen } from 'lucide-react';

const EmptyState = ({
  icon: Icon = FolderOpen,
  title = 'No Records Found',
  description = 'There are no items to display at this time.',
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 my-6 text-center border border-dashed rounded-2xl border-sky-200 bg-sky-50/40">
      <div className="p-4 mb-4 rounded-full bg-sky-100 text-sky-600">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="max-w-sm mt-1 text-sm text-slate-500">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 mt-5 text-sm font-semibold text-white transition-all bg-sky-600 rounded-xl hover:bg-sky-500 shadow-md shadow-sky-600/20"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
