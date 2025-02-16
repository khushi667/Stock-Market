import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApexChart from './dashboard/stockData';

// DashboardPage component
function DashboardPage() {
  return <h1>Welcome to the Dashboard</h1>;
}

// HomePage component
function HomePage() {
  return <h1>Home Page</h1>;
}

// App component
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<ApexChart />} /> 
      </Routes>
    </Router>
  );
}

export default App;
