import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StockPage() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch stock data from the backend API (only once)
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fetch-stocks');
        console.log("Fetched stocks data:", response.data); // Log the fetched data

        // Create a map to store the most recent data for each symbol
        const uniqueStocks = new Map();

        response.data.forEach(stock => {
          if (
            !uniqueStocks.has(stock.symbol) || 
            new Date(stock.date) > new Date(uniqueStocks.get(stock.symbol).date)
          ) {
            uniqueStocks.set(stock.symbol, stock);
          }
        });

        // Convert the Map back to an array
        const filteredStocks = Array.from(uniqueStocks.values());

        setStocks(filteredStocks);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []); // Empty dependency array to run the effect only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (stocks.length === 0) {
    return <div>No stock data available</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Data</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Symbol</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Open</th>
            <th className="border border-gray-300 px-4 py-2">High</th>
            <th className="border border-gray-300 px-4 py-2">Low</th>
            <th className="border border-gray-300 px-4 py-2">Close</th>
            <th className="border border-gray-300 px-4 py-2">Volume</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{stock.symbol}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(stock.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{stock.open.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.high.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.low.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.close.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockPage;
