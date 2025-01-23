import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockPage from './dashboard/stockPage';

// DashboardPage component
function DashboardPage() {
  return <h1>Welcome to the Dashboard</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Define a route for the home page */}
        <Route path="/" element={<h1>Home Page</h1>} />  {/* Home page route */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/stocks" element={<StockPage />} />
      </Routes>
    </Router>
  );
}

export default App;
