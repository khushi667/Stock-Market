import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [state, setState] = useState({
    series: [{
      name: "IBM Stock Price",   
      data: [],
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
      },
      title: {
        text: 'IBM Real-Time Stock Price',
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Date'
        },
        type: 'datetime', // Use datetime format for the x-axis
      },
      yaxis: {
        title: {
          text: 'Stock Price'
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        }
      }
    },
  });

  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await fetch('http://localhost:5000/api/fetch-stocks');
      const data = await res.json();

      const newData = [];
      const categories = [];
      for (let i = 0; i < data.length; i++) {
        const formattedDate = new Date(data[i].date).getTime();  // Convert to timestamp
        categories.push(formattedDate);  // Store date as a timestamp
        newData.push(parseFloat(data[i].close).toFixed(2));  // Round close value to 2 decimals
      }

      // Update chart options with the fetched data
      setState(prevState => ({
        ...prevState,
        series: [{
          name: "IBM Stock Price",
          data: newData,
        }],
        options: {
          ...prevState.options,
          xaxis: {
            categories: categories,  // Use the timestamps for the x-axis
          }
        }
      }));
    };

    fetchChartData();
  }, []);  // Empty dependency array, runs only once when the component mounts

  return (
    <div>
      <div id="chart">
        <ReactApexChart 
          options={state.options} 
          series={state.series} 
          type="line" 
          height={350} 
        />
      </div>
    </div>
  );
};

export default ApexChart;
