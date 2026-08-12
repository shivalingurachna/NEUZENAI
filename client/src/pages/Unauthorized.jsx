import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
  const { user } = useAuth();
  const getHomePath = () => {
    if (user?.role === 'admin') return '/admin/dashboard';
    if (user?.role === 'hr') return '/hr/dashboard';
    return '/employee/dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">403 - Access Denied</h2>
        <p className="text-sm text-slate-400 mt-2">
          Your current account role <span className="text-indigo-400 font-semibold">({user?.role})</span> does not have permission to view this page.
        </p>

        <Link
          to={getHomePath()}
          className="inline-flex items-center gap-2 px-4 py-2.5 mt-6 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Portal Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
