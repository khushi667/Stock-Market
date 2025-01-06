import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Index from "./components/pages/landingpage/index";
import Charts from "./components/pages/landingpage/Charts";
import Graph from "./components/pages/landingpage/Graph";
import Features from "./components/pages/landingpage/Features";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/loginpage/Login";
import SignUp from './components/pages/signuppage/SignUp';
import StockDataPage from './components/pages/StockDataPage';
import StockChart from './components/pages/StockChart';
import ForgetPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import DashboardLayout from './dashboard/layout/DashboardLayout';

// Import dashboard pages
import HomePage from './dashboard/pages/HomePage';
import StocksPage from './dashboard/pages/StocksPage';
import ChartPage from './dashboard/pages/ChartPage';
import AnalysisPage from './dashboard/pages/AnalysisPage';
import ProfilePage from './dashboard/pages/ProfilePage';
import HelpPage from './dashboard/pages/HelpPage';
import AboutPage from './dashboard/pages/AboutPage';
import LogoutPage from './dashboard/pages/LogoutPage';
import AlertPage from './dashboard/pages/AlertPage';
import SectorPage from './dashboard/pages/SectorPage';

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes with Navbar */}
        <Route path="/" element={<MainLayout><Index /><Charts /><Graph /><Features /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/forgot-password" element={<MainLayout><ForgetPasswordPage /></MainLayout>} />
        <Route path="/reset-password/:token" element={<MainLayout><ResetPasswordPage /></MainLayout>} />
        <Route path="/signup" element={<MainLayout><SignUp /></MainLayout>} />
        <Route path="/stock-data" element={<MainLayout><StockDataPage /></MainLayout>} />
        <Route path="/stock-chart" element={<MainLayout><StockChart /></MainLayout>} />
        
        {/* Dashboard Routes without Navbar */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="stocks" element={<StocksPage />} />
          <Route path="chart" element={<ChartPage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="sector" element={<SectorPage />} />
          <Route path="alert" element={<AlertPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="logout" element={<LogoutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;