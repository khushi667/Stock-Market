// src/dashboard/layout/DashboardLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Ensure this import is correct
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar setIsSidebarCollapsed={setIsSidebarCollapsed} />
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-48'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
