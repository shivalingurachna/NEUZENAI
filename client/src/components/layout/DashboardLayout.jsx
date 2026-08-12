import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F9FF] text-slate-700 selection:bg-sky-500 selection:text-white">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
