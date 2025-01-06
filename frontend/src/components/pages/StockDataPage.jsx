import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { storeStockData, getStockData, clearStockData } from '../../utils/storageUtils';


const StockDataPage = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if stock data is already in local storage
        const storedStockData = getStockData();
        if (storedStockData) {
          // If data exists in local storage, use it
          setStockData(storedStockData);
          setLoading(false);
          return;
        }

        // Fetch data from API if not found in local storage
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/api/stocks/data`);

        // Store the fetched data in local storage
        storeStockData(response.data);
        
        // Update state with the fetched data
        setStockData(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Error fetching stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Symbol</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Open</th>
              <th className="py-2 px-4 border-b">High</th>
              <th className="py-2 px-4 border-b">Low</th>
              <th className="py-2 px-4 border-b">Close</th>
              <th className="py-2 px-4 border-b">Volume</th>
            </tr>
          </thead>
          <tbody>
            {stockData.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center">No stock data available</td>
              </tr>
            ) : (
              stockData.map(sdata => (
                <tr key={sdata['stock']['_id']}>
                  <td className="py-2 px-4 border-b text-center">{sdata.symbol}</td>
                  <td className="py-2 px-4 border-b text-center">{new Date(sdata['stock']['date']).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b text-center">{sdata['stock']['open'].toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-center">{sdata['stock']['high'].toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-center">{sdata['stock']['low'].toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-center">{sdata['stock']['close'].toFixed(2)}</td>
                  <td className="py-2 px-4 border-b text-center">{sdata['stock']['volume'].toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h1 className="text-2xl font-bold mb-4 mt-10">Stock Rs/Rsi Data</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">Symbol</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">RS</th>
                            <th className="py-2 px-4 border-b">RSI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.length === 0 ? (
                            <tr>
                                <td colSpan="10" className="py-4 text-center">No stock data available</td>
                            </tr>
                        ) : (
                            stockData.map(sdata => (
                                <tr key={sdata['stock']['_id']}>
                                    <td className="py-2 px-4 border-b text-center">{sdata.symbol}</td>
                                    <td className="py-2 px-4 border-b text-center">{new Date(sdata['stock']['date']).toLocaleDateString()}</td>
                        
                                    <td className="py-2 px-4 border-b text-center">{sdata['rsi']['rs'].toFixed(2) || 'N/A'}</td>
                                    <td className="py-2 px-4 border-b text-center">{sdata['rsi']['rsi'].toFixed(2) || 'N/A'}</td>
                                    
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                
            </div>
    </div>
  );
};

export default StockDataPage;
