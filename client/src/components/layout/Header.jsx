import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, UserCheck, Clock, CheckCircle2, Menu, Sparkles, Heart } from 'lucide-react';
import axiosClient from '../../api/axiosClient';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [checking, setChecking] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      try {
        const res = await axiosClient.get('/attendance/my');
        if (res.data.success) {
          setTodayAttendance(res.data.todayRecord);
        }
      } catch (err) {
        // Ignore non-employee accounts
      }
    };

    fetchTodayAttendance();
  }, []);

  const handleQuickCheckIn = async () => {
    setChecking(true);
    try {
      const res = await axiosClient.post('/attendance/check-in');
      if (res.data.success) {
        setTodayAttendance(res.data.attendance);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Check-in failed');
    } finally {
      setChecking(false);
    }
  };

  const handleQuickCheckOut = async () => {
    setChecking(true);
    try {
      const res = await axiosClient.put('/attendance/check-out');
      if (res.data.success) {
        setTodayAttendance(res.data.attendance);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Check-out failed');
    } finally {
      setChecking(false);
    }
  };

  const firstName = user?.name?.split(' ')[0] || 'Team Member';
  const roleName = user?.role === 'admin' ? 'Administrator' : user?.role === 'hr' ? 'HR Manager' : 'Team Member';

  return (
    <div className="sticky top-0 z-30">
      {/* Sweet Welcome Toast Banner */}
      {showWelcome && (
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white text-xs px-4 py-2 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <Sparkles className="w-4 h-4 text-sky-200 animate-bounce" />
            <span>
              <strong>Welcome back, {firstName}!</strong> Wishing you a wonderful, productive, and joyful day ahead at NEUZEN AI! ✨
            </span>
          </div>
          <button
            onClick={() => setShowWelcome(false)}
            className="text-sky-200 hover:text-white font-bold text-xs ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Header Bar */}
      <header className="h-16 bg-white/90 border-b border-sky-100 px-4 md:px-8 flex items-center justify-between backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-sky-50 rounded-xl transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {user?.name}
            </h2>
            <p className="text-[11px] text-sky-600 font-semibold">{roleName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Attendance Widget for Employee */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50/80 border border-sky-100">
            {!todayAttendance ? (
              <button
                onClick={handleQuickCheckIn}
                disabled={checking}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                {checking ? 'Processing...' : 'Check In Today'}
              </button>
            ) : !todayAttendance.checkOut ? (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In @ {new Date(todayAttendance.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button
                  onClick={handleQuickCheckOut}
                  disabled={checking}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors border-l border-sky-200 pl-3"
                >
                  {checking ? '...' : 'Check Out'}
                </button>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-sky-600" /> Attendance Completed
              </span>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
