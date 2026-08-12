import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorState = ({
  title = 'Unable to Load Data',
  message = 'An unexpected error occurred while fetching information.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 my-6 text-center border rounded-xl border-red-500/20 bg-red-950/20">
      <div className="p-3 mb-3 text-red-400 rounded-full bg-red-900/30">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-red-200">{title}</h3>
      <p className="max-w-md mt-1 text-sm text-red-300/80">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-white transition-all rounded-lg bg-red-600/80 hover:bg-red-500"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Request
        </button>
      )}
    </div>
  );
};

export default ErrorState;
