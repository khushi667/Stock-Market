import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const StockChart = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/api/stocks/data`);
        console.log('Fetched stock data:', response.data);  // Log the data for debugging
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Extract and format the data for Highcharts
  const aaplStockData = [];
  const ema50Data = [];
  const ema200Data = [];

  stockData.forEach((sdata) => {
    if (sdata.symbol === 'AAPL') {
      // Check if `sdata.stock` is an array
      if (Array.isArray(sdata.stock)) {
        // Extract and format stock data
        sdata.stock.forEach((item) => {
          aaplStockData.push([
            new Date(item.date).getTime(), // Convert date to timestamp
            item.close, // Use the closing price
          ]);
        });
      } else {
        console.warn('sdata.stock is not an array:', sdata.stock); // Log if not an array
      }

      // Check if `sdata.ema` is an array
      if (Array.isArray(sdata.ema)) {
        // Extract and format EMA data
        sdata.ema.forEach((item) => {
          ema50Data.push([
            new Date(item.date).getTime(),
            item.ema50,
          ]);
          ema200Data.push([
            new Date(item.date).getTime(),
            item.ema200,
          ]);
        });
      } else {
        console.warn('sdata.ema is not an array:', sdata.ema); // Log if not an array
      }
    }
  });

  const options = {
    title: {
      text: 'AAPL Stock Price with EMA',
    },
    rangeSelector: {
      selected: 1,
    },
    tooltip: {
      split: true,
    },
    series: [
      {
        name: 'AAPL Stock Price',
        data: aaplStockData,
        tooltip: {
          valueDecimals: 2,
        },
      },
      {
        name: 'EMA 50',
        data: ema50Data,
        tooltip: {
          valueDecimals: 2,
        },
        color: 'blue',
        dashStyle: 'ShortDash',
      },
      {
        name: 'EMA 200',
        data: ema200Data,
        tooltip: {
          valueDecimals: 2,
        },
        color: 'red',
        dashStyle: 'ShortDot',
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  );
};

export default StockChart;
