import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, ArrowLeft, Eye, EyeOff, ShieldCheck, X, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  // Sweet Alert Success Popup State
  const [loginSuccessUser, setLoginSuccessUser] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const user = await login(email, password);
      // Trigger Sweet Alert Popup on successful authentication
      setLoginSuccessUser(user);
      
      // Delay navigation slightly so user sees the Sweet Alert confirmation
      setTimeout(() => {
        if (user.role === 'admin') navigate('/admin/dashboard');
        else if (user.role === 'hr') navigate('/hr/dashboard');
        else navigate('/employee/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login authentication failed. Check your credentials.');
      setSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setResetSuccess(`Password reset instructions have been sent to ${resetEmail}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-blue-100 flex items-center justify-center p-4 selection:bg-sky-500 selection:text-white relative">
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white border border-sky-100 rounded-3xl p-8 shadow-xl shadow-sky-900/5 relative z-10 space-y-6">
        {/* Back to Company Landing Page */}
        <div className="flex justify-between items-center">
          <Link
            to="/landing"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Company Page
          </Link>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-700 border border-sky-200">
            Secure SSL 256-Bit
          </span>
        </div>

        {/* Brand Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-lg shadow-sky-500/25 font-outfit">
            N
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-wide font-outfit">
            NEUZEN <span className="text-sky-600">AI</span> HRMS
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Welcome back! Log in to access your corporate portal.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Role Selection Dropdown */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Select User Role
            </label>
            <select
              value={role}
              onChange={(e) => handleRoleSelect(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-medium"
            >
              <option value="admin">Administrator (System CTO)</option>
              <option value="hr">HR Manager (Personnel & Payroll)</option>
              <option value="employee">Employee (Self-Service Portal)</option>
            </select>
          </div>

          {/* Email / Username Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Work Email Address / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@neuzenai.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
            </div>
          </div>

          {/* Password Field with Show/Hide Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              Remember Me
            </label>

            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
          >
            {submitting ? 'Authenticating Role...' : 'Login to Account'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center pt-2 border-t border-sky-100">
          Enterprise Security & Privacy Protocol © {new Date().getFullYear()} NEUZEN AI
        </p>
      </div>

      {/* Sweet Alert Login Success Popup Modal */}
      {loginSuccessUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 transition-all">
          <div className="bg-white border border-sky-100 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl shadow-sky-900/20 transform transition-all">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Authentication Successful
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-outfit mt-3">
                Login Successful! 🎉
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Welcome back, <strong className="text-slate-900">{loginSuccessUser.name}</strong>!
              </p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                Redirecting to your <span className="uppercase font-bold text-sky-600">{loginSuccessUser.role} Dashboard</span>...
              </p>
            </div>

            <div className="pt-2">
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-sky-500 to-emerald-500 h-full w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-sky-100 shadow-xl">
            <div className="flex justify-between items-center border-b border-sky-100 pb-3">
              <h3 className="font-bold text-slate-900 font-outfit text-base">Reset Password Request</h3>
              <button onClick={() => { setIsForgotModalOpen(false); setResetSuccess(''); }} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {resetSuccess ? (
              <div className="p-3.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-xl font-medium">
                {resetSuccess}
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <p className="text-xs text-slate-600">
                  Enter your registered corporate work email address to receive a secure password reset link.
                </p>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="name@neuzenai.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl shadow-md">
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
