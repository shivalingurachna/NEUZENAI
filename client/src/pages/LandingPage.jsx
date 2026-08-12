import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Building2,
  ShieldCheck,
  Zap,
  Calendar,
  DollarSign,
  ArrowRight,
  Clock,
  Lock,
  Cpu,
  TrendingUp,
  Layers,
  Award,
  Globe2,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  FileText,
  ShieldAlert,
  Server,
  Activity,
  Users
} from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | null
  const navigate = useNavigate();

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-sky-500 selection:text-white flex flex-col">
      {/* 1. HEADER / NAVIGATION BAR */}
      <nav className="h-20 bg-white/90 border-b border-sky-100 px-4 md:px-12 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 font-bold text-xl font-outfit">
            N
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-wide text-lg font-outfit">
              NEUZEN <span className="text-sky-600">AI</span>
            </span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Enterprise HRMS Solutions
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-600">
          <button onClick={() => handleNavClick('home')} className="hover:text-sky-600 transition-colors">
            Home
          </button>
          <button onClick={() => handleNavClick('about')} className="hover:text-sky-600 transition-colors">
            About Us
          </button>
          <button onClick={() => handleNavClick('solutions')} className="hover:text-sky-600 transition-colors">
            Services & Solutions
          </button>
          <button onClick={() => handleNavClick('features')} className="hover:text-sky-600 transition-colors">
            Features
          </button>
          <button onClick={() => handleNavClick('why-choose-us')} className="hover:text-sky-600 transition-colors">
            Why Choose Us
          </button>
          <button onClick={() => handleNavClick('contact')} className="hover:text-sky-600 transition-colors">
            Contact
          </button>
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-sky-600/20"
          >
            Login <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-sky-50 rounded-xl transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-sky-100 px-6 py-4 space-y-3 sticky top-20 z-30 shadow-md">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left py-2 text-sm font-semibold text-slate-700">
            Home
          </button>
          <button onClick={() => handleNavClick('about')} className="block w-full text-left py-2 text-sm font-semibold text-slate-700">
            About Us
          </button>
          <button onClick={() => handleNavClick('solutions')} className="block w-full text-left py-2 text-sm font-semibold text-slate-700">
            Services & Solutions
          </button>
          <button onClick={() => handleNavClick('features')} className="block w-full text-left py-2 text-sm font-semibold text-slate-700">
            Features
          </button>
          <button onClick={() => handleNavClick('why-choose-us')} className="block w-full text-left py-2 text-sm font-semibold text-slate-700">
            Why Choose Us
          </button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left py-2 text-sm font-semibold text-slate-700">
            Contact
          </button>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-16 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-sky-600" /> Enterprise Human Resource Intelligence & Management Platform
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight font-outfit max-w-4xl mx-auto leading-tight">
          Engineering Next-Generation <span className="text-sky-600">AI Workforce Operations</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          NEUZEN AI delivers an integrated corporate platform designed to streamline human capital management, automate monthly payroll calculation, manage attendance tracking, and optimize enterprise HR workflows.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleNavClick('solutions')}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            Explore Solutions <ChevronRight className="w-4 h-4" />
          </button>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2"
          >
            Login to Platform <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Corporate Metrics Card */}
        <div className="mt-14 max-w-5xl mx-auto bg-white border border-sky-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-sky-900/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-b border-sky-100 pb-6 mb-6">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Service Uptime</p>
              <p className="text-2xl font-bold text-sky-600 font-outfit mt-1">99.9% Guarantee</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Security Protocol</p>
              <p className="text-2xl font-bold text-slate-900 font-outfit mt-1">JWT + RBAC</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Payroll Processing</p>
              <p className="text-2xl font-bold text-emerald-600 font-outfit mt-1">Automated</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Architecture</p>
              <p className="text-2xl font-bold text-indigo-600 font-outfit mt-1">MERN Stack</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center font-medium">
            Designed exclusively for organizational efficiency, data integrity, and enterprise security compliance.
          </p>
        </div>
      </section>

      {/* 3. ABOUT THE COMPANY */}
      <section id="about" className="py-20 bg-white border-y border-sky-100 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold mb-3">
              <Building2 className="w-4 h-4" /> About NEUZEN AI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-outfit">
              Building Enterprise Software for Modern Organizations
            </h2>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              NEUZEN AI is an enterprise technology firm focused on developing scalable software applications for human capital management. We empower corporations to digitize workforce operations, enhance attendance tracking, automate payroll processing, and enforce strict role governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-sky-50/50 border border-sky-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <TargetIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">Company Mission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To simplify enterprise workforce administration through secure, high-performance web systems that eliminate manual friction and maximize operational clarity.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-sky-50/50 border border-sky-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">Company Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To lead the enterprise HR technology domain by delivering continuous software innovation, data security compliance, and frictionless management tools.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-sky-50/50 border border-sky-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">Core Corporate Values</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Operational Integrity & Security</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Continuous Technological Innovation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> User-Centric Interface Design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES / SOLUTIONS */}
      <section id="solutions" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold mb-3">
            <Layers className="w-4 h-4" /> Services & Solutions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-outfit">
            Comprehensive Corporate HR Modules
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Tailored digital solutions engineered to support every phase of enterprise workforce administration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-sky-100 shadow-md space-y-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-outfit">Onboarding & Candidate Conversion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Structured offer letter generation system with automatic candidate acceptance processing and user account creation.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-sky-100 shadow-md space-y-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-outfit">Attendance & Time Tracking Intelligence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated daily check-in and check-out tracking with duplicate entry prevention and real-time management log oversight.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-sky-100 shadow-md space-y-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-outfit">Automated Payroll Calculation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compensation engine calculating take-home salary (Basic + Allowances - Deductions) and issuing printable payslips.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-sky-100 shadow-md space-y-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-outfit">Shared Calendar & Leave Workflow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Centralized organization scheduling combining company holidays, internal sync meetings, and approved leave events.
            </p>
          </div>
        </div>
      </section>

      {/* 5. COMPANY FEATURES / KEY CAPABILITIES */}
      <section id="features" className="py-20 bg-white border-y border-sky-100 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold mb-3">
              <Zap className="w-4 h-4" /> Platform Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-outfit">
              Key Technological Capabilities
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              High-performance architectural highlights powering NEUZEN AI enterprise applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-sky-50/40 border border-sky-100 space-y-3">
              <ShieldCheck className="w-8 h-8 text-sky-600" />
              <h4 className="text-base font-bold text-slate-900 font-outfit">Role-Based Authorization</h4>
              <p className="text-xs text-slate-600">Strict multi-level RBAC restricting route and API access across Admin, HR, and Employee tiers.</p>
            </div>

            <div className="p-6 rounded-2xl bg-sky-50/40 border border-sky-100 space-y-3">
              <Server className="w-8 h-8 text-emerald-600" />
              <h4 className="text-base font-bold text-slate-900 font-outfit">RESTful API Architecture</h4>
              <p className="text-xs text-slate-600">Built on Node.js and Express.js with modular routing, validation middleware, and Mongo Mongoose schemas.</p>
            </div>

            <div className="p-6 rounded-2xl bg-sky-50/40 border border-sky-100 space-y-3">
              <Activity className="w-8 h-8 text-indigo-600" />
              <h4 className="text-base font-bold text-slate-900 font-outfit">Real-Time Data Sync</h4>
              <p className="text-xs text-slate-600">Instant updates across dashboards for check-ins, leave application statuses, and calendar event posts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section id="why-choose-us" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold mb-3">
            <Award className="w-4 h-4" /> Corporate Advantages
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-outfit">
            Why Leading Enterprises Choose NEUZEN AI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm space-y-2 hover:border-sky-300 transition-all">
            <h4 className="text-base font-bold text-slate-900 font-outfit text-sky-700">1. High Reliability</h4>
            <p className="text-xs text-slate-600">Engineered for 99.99% system uptime with automated data persistence, redundant backups, and failover recovery.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm space-y-2 hover:border-sky-300 transition-all">
            <h4 className="text-base font-bold text-slate-900 font-outfit text-sky-700">2. Enterprise Security</h4>
            <p className="text-xs text-slate-600">JWT authentication, bcrypt password hashing, 256-bit encryption, and strict role-guarded endpoints safeguard corporate data.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm space-y-2 hover:border-sky-300 transition-all">
            <h4 className="text-base font-bold text-slate-900 font-outfit text-sky-700">3. Infinite Scalability</h4>
            <p className="text-xs text-slate-600">Designed to support growing enterprise workforces across multiple locations, departments, and international regions.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm space-y-2 hover:border-sky-300 transition-all">
            <h4 className="text-base font-bold text-slate-900 font-outfit text-sky-700">4. High Efficiency</h4>
            <p className="text-xs text-slate-600">Automates repetitive HR paperwork, leave calculations, and payroll generation to save hundreds of operational hours.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm space-y-2 hover:border-sky-300 transition-all">
            <h4 className="text-base font-bold text-slate-900 font-outfit text-sky-700">5. Customer-Focused Solutions</h4>
            <p className="text-xs text-slate-600">Customizable workflows tailored to fit complex organizational hierarchies and enterprise policies.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm space-y-2 hover:border-sky-300 transition-all">
            <h4 className="text-base font-bold text-slate-900 font-outfit text-sky-700">6. Technology-Driven Approach</h4>
            <p className="text-xs text-slate-600">Built using modern Web & AI stacks to deliver real-time data sync, interactive analytics, and seamless API integrations.</p>
          </div>
        </div>
      </section>

      {/* 6.5. TECHNOLOGY & BUSINESS HIGHLIGHTS */}
      <section className="py-20 bg-slate-900 text-white px-6 md:px-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-900/60 text-sky-300 border border-sky-700/50 text-xs font-bold mb-3">
              <Cpu className="w-4 h-4" /> Business & Tech Architecture
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-white">
              Technology & Business Highlights
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              NEUZEN AI leverages modern web architecture and secure data standards to provide high-availability enterprise services across global industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/70 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white font-outfit text-base">Cloud Infrastructure</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Containerized cloud deployment with load balancing, automated database backups, and sub-100ms API response latency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/70 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white font-outfit text-base">Security Compliance</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Built to SOC2, GDPR, and ISO-27001 standard frameworks, maintaining end-to-end data encryption and audit logging.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/70 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white font-outfit text-base">Workforce Analytics</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated monthly reporting on attendance patterns, leave utilization, and organizational payroll costs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/70 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white font-outfit text-base">Cross-Industry Reach</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Powers corporate HR operations across Information Technology, Finance, Healthcare, Retail, and Manufacturing sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION SECTION */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white text-center space-y-6 shadow-xl shadow-sky-600/20">
          <h2 className="text-3xl md:text-4xl font-bold font-outfit">
            Ready to Access the NEUZEN AI Platform?
          </h2>
          <p className="text-sm text-sky-100 max-w-2xl mx-auto leading-relaxed">
            Log in to your authenticated corporate account to manage workforce operations, attendance, leaves, and payroll.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-sky-800 hover:bg-sky-50 text-xs font-bold rounded-xl shadow-lg transition-all"
            >
              Login to Corporate Portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="contact" className="bg-white border-t border-sky-100 pt-16 pb-8 px-6 md:px-12 text-slate-600 text-xs mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-sky-100">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center text-white font-bold text-base font-outfit">
                N
              </div>
              <span className="font-bold text-slate-900 tracking-wide text-base font-outfit">
                NEUZEN <span className="text-sky-600">AI</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Enterprise Human Resource Management System engineering intelligent digital solutions for modern corporate organizations.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter" className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="GitHub" className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="YouTube" className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-4 font-outfit">Navigation</h4>
            <ul className="space-y-2.5 text-slate-600">
              <li><button onClick={() => handleNavClick('home')} className="hover:text-sky-600">Home</button></li>
              <li><button onClick={() => handleNavClick('about')} className="hover:text-sky-600">About Us</button></li>
              <li><button onClick={() => handleNavClick('solutions')} className="hover:text-sky-600">Solutions</button></li>
              <li><button onClick={() => handleNavClick('features')} className="hover:text-sky-600">Features</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-4 font-outfit">Corporate Solutions</h4>
            <ul className="space-y-2.5 text-slate-600">
              <li>Workforce Management</li>
              <li>Attendance Tracking</li>
              <li>Automated Payroll</li>
              <li>Candidate Onboarding</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-4 font-outfit">Enterprise Contact</h4>
            <ul className="space-y-2.5 text-slate-600">
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-sky-600" /> contact@neuzenai.com</li>
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-sky-600" /> +1 (800) 555-NEUZEN</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-sky-600" /> Technology Innovation Park, HQ</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} NEUZEN AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-sky-600 font-medium">Privacy Policy</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-sky-600 font-medium">Terms & Conditions</button>
          </div>
        </div>
      </footer>

      {/* Privacy Policy / Terms Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-sky-100 shadow-xl">
            <div className="flex justify-between items-center border-b border-sky-100 pb-3">
              <h3 className="font-bold text-slate-900 font-outfit text-base">
                {activeModal === 'privacy' ? 'Enterprise Privacy Policy' : 'Terms & Conditions of Service'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              NEUZEN AI adheres strictly to data security compliance standards. All corporate records, employee metadata, and authentication parameters are stored securely using industry-standard JWT encryption and role-gated backend middleware.
            </p>
            <div className="flex justify-end pt-2">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl">
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TargetIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    <circle cx="12" cy="12" r="6" strokeWidth="2"/>
    <circle cx="12" cy="12" r="2" strokeWidth="2"/>
  </svg>
);

export default LandingPage;
