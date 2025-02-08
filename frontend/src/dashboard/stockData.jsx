import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function ApexChart() {
    const [state, setState] = useState({
        series: [
          {
            name: "IBM Stock Price",
            data: [],
          },
          {
            name: "TCS Stock Price",
            data: [],
          },
        ],
        options: {
          chart: {
            height: 550,
            type: 'line',
            animations: {
              enabled: true,
              easing: 'easeinout', 
              speed: 2000,
            },
            background: '#f4f5f7',
          },
          title: {
            text: 'IBM & TCS Stock Price',
            style: {
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#333',
              fontFamily: 'Roboto, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            },
          },
          tooltip: {
            enabled: true,
            shared: true, 
            theme: 'light',
            style: {
              fontSize: '14px',
              color: '#4A4A4A',
              fontFamily: 'Arial, sans-serif',
            },
          },
          grid: {
            borderColor: '#E1E4E8',
            row: {
              colors: ['#f5f7f9'],
              opacity: 0.5, 
            },
          },
          xaxis: {
            type: 'datetime',
            labels: {
              style: {
                color: '#666',
                fontSize: '12px',
                fontFamily: 'Roboto', 
                fontWeight: 'bold',
              },
            },
            axisBorder: {
              show: true, 
              color: '#D6D8DC',
            },
            axisTicks: {
              show: true,
              color: '#D6D8', 
            },
          },
          yaxis: {
            title: {
              text: 'Price',
              style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                fontFamily: 'Roboto', 
              },
            },
            labels: {
              style: {
                color: '#666',
                fontSize: '12px',
                fontFamily: 'Roboto',
                fontWeight: 'normal',
              },
            },
            axisBorder: {
              show: true,
              color: '#D6D8DC',
            },
            axisTicks: {
              show: true,
              color: '#D6D8',
            },
          },
        },
      });

    useEffect(() => {
        const fetchStockData = async () => {
            const res = await fetch('http://localhost:5000/api/fetch-stocks');
            const data = await res.json();
            // console.log("Raw Data:", data);

            const ibmData = [];
            const tcsData = [];
            const categories = [];

            // Check data structure
            const ibmArray = data[0];
            const tcsArray = data[1];

            // Ensure 10 data points for IBM and TCS
            for (let i = 0; i < ibmArray.length; i++) {
                if (ibmArray[i]) {
                    ibmData.push(parseFloat(ibmArray[i].close).toFixed(2));
                    const formattedDate = new Date(ibmArray[i].date).toISOString().split('T')[0];
                    categories.push(formattedDate);
                }
                if (tcsArray[i]) {
                    tcsData.push(parseFloat(tcsArray[i].close).toFixed(2));
                }
            }

            // console.log("Updating chart with state:");
            // console.log("Categories:", categories);
            // console.log("IBM Data:", ibmData);
            // console.log("TCS Data:", tcsData);

            setState(prevState => ({ 
                series: [
                    { name: "IBM Stock Price", data: ibmData },
                    { name: "TCS Stock Price", data: tcsData },
                ],
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: categories,
                        title: {
                            text: 'Date',
                        },
                    },
                    
                },
            }));
        };

        fetchStockData();
    }, []);

    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="line" height={550} />
        </div>
    );
}

export default ApexChart;