// src/dashboard/pages/HomePage.jsx
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns'; // For date formatting in Chart.js

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Dummy data for charts
const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Stock Price',
      data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 85, 90],
      borderColor: '#4A90E2',
      backgroundColor: 'rgba(74, 144, 226, 0.2)',
      fill: true,
    },
    {
      label: 'Market Average',
      data: [70, 65, 75, 78, 60, 58, 43, 50, 65, 72, 88, 92],
      borderColor: '#E94E77',
      backgroundColor: 'rgba(233, 78, 119, 0.2)',
      fill: true,
    },
  ],
};

const barChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 30000, 50000],
      backgroundColor: '#50E3C2',
      borderColor: '#50E3C2',
      borderWidth: 1,
    },
    {
      label: 'Expenses',
      data: [8000, 12000, 20000, 30000],
      backgroundColor: '#F5A623',
      borderColor: '#F5A623',
      borderWidth: 1,
    },
  ],
};

const HomePage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Stock Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">AAPL</h2>
          <p className="text-gray-600">Apple Inc.</p>
          <p className="text-2xl font-bold text-green-600">$174.30</p>
          <p className="text-sm text-gray-500">+1.55% today</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">GOOGL</h2>
          <p className="text-gray-600">Alphabet Inc.</p>
          <p className="text-2xl font-bold text-red-600">$2729.89</p>
          <p className="text-sm text-gray-500">-0.73% today</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">MSFT</h2>
          <p className="text-gray-600">Microsoft Inc.</p>
          <p className="text-2xl font-bold text-green-600">$3332.88</p>
          <p className="text-sm text-gray-500">+2.31% today</p>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Stock Price Trend</h3>
          <Line data={lineChartData} options={{
            responsive: true,
            plugins: {
              legend: { display: true },
              tooltip: { callbacks: { label: (context) => `${context.dataset.label}: $${context.raw}` } },
            },
            scales: {
              x: {
                title: { display: true, text: 'Month' },
              },
              y: {
                title: { display: true, text: 'Price (USD)' },
                beginAtZero: true,
              },
            },
          }} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Revenue by Quarter</h3>
          <Bar data={barChartData} options={{
            responsive: true,
            plugins: {
              legend: { display: true },
              tooltip: { callbacks: { label: (context) => `${context.dataset.label}: $${context.raw}` } },
            },
            scales: {
              x: {
                title: { display: true, text: 'Quarter' },
              },
              y: {
                title: { display: true, text: 'Revenue (USD)' },
                beginAtZero: true,
              },
            },
          }} />
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;