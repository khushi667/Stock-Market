// src/dashboard/layout/Sidebar.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  FaHome, FaChartLine, FaFolder, FaChartPie,
  FaBriefcase, FaQuestionCircle, FaInfoCircle, FaSignOutAlt, FaChevronLeft, FaChevronRight,
  FaBell, FaIndustry, FaCog
} from 'react-icons/fa';

const Sidebar = ({ setIsSidebarCollapsed }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation(); // Get current location

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    setIsSidebarCollapsed(newState); // Pass the new state to DashboardLayout
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white ${isCollapsed ? 'w-16' : 'w-48'} transition-width duration-300 flex flex-col`}
      aria-label="Sidebar"
    >
      {/* Toggle Button */}
      <div className="p-4 flex justify-between items-center">
        <Link to="/dashboard" className={`flex items-center space-x-2 ${isCollapsed ? 'hidden' : 'block'}`}>
          <h1 className="text-lg font-semibold">StockVista</h1>
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-white p-2 hover:bg-gray-700 rounded focus:outline-none"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="flex flex-col space-y-4 px-2 mt-6">
        <SidebarLink to="/dashboard" icon={<FaHome />} label="Home" isCollapsed={isCollapsed} location={location} />
        <SidebarLink to="/dashboard/stocks" icon={<FaFolder />} label="Stocks" isCollapsed={isCollapsed} location={location} />
        <SidebarLink to="/dashboard/chart" icon={<FaChartLine />} label="Charts" isCollapsed={isCollapsed} location={location} />
        <SidebarLink to="/dashboard/analysis" icon={<FaChartPie />} label="Analysis" isCollapsed={isCollapsed} location={location} />
        <SidebarLink to="/dashboard/profile" icon={<FaBriefcase />} label="Profile" isCollapsed={isCollapsed} location={location} />
        <SidebarLink to="/dashboard/sector" icon={<FaIndustry />} label="Sector" isCollapsed={isCollapsed} location={location} />
        <SidebarLink to="/dashboard/alert" icon={<FaBell />} label="Alert" isCollapsed={isCollapsed} location={location} />
        <SidebarLink to="/dashboard/help" icon={<FaQuestionCircle />} label="Help" isCollapsed={isCollapsed} location={location} />
        <SidebarLink to="/dashboard/about" icon={<FaInfoCircle />} label="About Us" isCollapsed={isCollapsed} location={location} />
        <SidebarLink to="/dashboard/settings" icon={<FaCog />} label="Settings" isCollapsed={isCollapsed} location={location} />
        <SidebarLink to="/dashboard/logout" icon={<FaSignOutAlt />} label="Logout" isCollapsed={isCollapsed} location={location} />
      </ul>
    </div>
  );
};

// Reusable component for sidebar links
const SidebarLink = ({ to, icon, label, isCollapsed, location }) => {
  const isActive = location.pathname === to; // Check if the link is active
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center space-x-2 text-gray-300 hover:bg-gray-700 rounded p-2 transition-colors duration-200 ${isActive ? 'bg-gray-700' : ''}`}
        aria-label={label}
      >
        {React.cloneElement(icon, { size: 20 })}
        {!isCollapsed && <span className={`text-base ${isActive ? 'font-semibold text-white' : ''}`}>{label}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;
