import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import GridLight from 'highcharts/themes/grid-light';

GridLight(Highcharts);

const HighchartsStockEnhanced = () => {
    const [stockData, setStockData] = useState([]);
    const [emaData, setEmaData] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
    const [selectedPeriod, setSelectedPeriod] = useState(20);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Fallback URL
                console.log('API URL:', apiUrl); // Log the URL to check if it's being set correctly
                const url = `${apiUrl}/api/charts?symbol=${selectedSymbol}&period=${selectedPeriod}`;

                console.log('Fetching data from:', url);
                
                const response = await axios.get(url);
                
                // Check if the response contains valid data
                if (!response.data.stockData || !response.data.emaData) {
                    setError('Incomplete data received from API');
                    return;
                }

                setStockData(response.data.stockData);
                setEmaData(response.data.emaData);
            } catch (err) {
                console.error('Error fetching chart data:', err);
                setError('Error fetching chart data');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [selectedSymbol, selectedPeriod]);

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-center text-lg text-red-500">{error}</div>;

    const options = {
        chart: {
            type: 'line',
            animation: {
                duration: 1000,
            },
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            backgroundColor: '#f7f8fa',
        },
        title: {
            text: `Stock Price for ${selectedSymbol}`,
            style: {
                fontSize: '22px',
                color: '#333',
            },
        },
        credits: {
            enabled: false,
        },
        rangeSelector: {
            selected: 1,
        },
        tooltip: {
            shared: true,
            valueDecimals: 2,
            backgroundColor: '#333',
            borderColor: '#333',
            style: {
                color: '#fff',
            },
        },
        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#666',
                },
            },
        },
        yAxis: {
            title: {
                text: 'Price (USD)',
            },
            labels: {
                format: '${value}',
                style: {
                    color: '#666',
                },
            },
            gridLineDashStyle: 'ShortDot',
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: true,
                    radius: 3,
                },
                lineWidth: 2,
                animation: true,
            },
            series: {
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce',
                },
            },
        },
        series: [
            {
                name: `${selectedSymbol} Stock Price`,
                data: stockData.map((point) => [new Date(point.date).getTime(), point.close]),
                color: '#1E90FF',
                tooltip: {
                    valuePrefix: '$',
                },
                marker: {
                    enabled: true,
                    radius: 4,
                    fillColor: '#1E90FF',
                },
            },
            {
                name: `EMA ${selectedPeriod}`,
                data: emaData.map((point) => [new Date(point.date).getTime(), point[`ema${selectedPeriod}`]]),
                color: '#FF6347',
                dashStyle: 'ShortDot',
                marker: {
                    enabled: true,
                    radius: 4,
                    fillColor: '#FF6347',
                },
                tooltip: {
                    valuePrefix: '$',
                },
            },
        ],
    };

    return (
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Stock Chart</h1>
            <div className="flex justify-center mb-4">
                <label className="mr-2 font-semibold text-gray-700">Select Symbol:</label>
                <select
                    value={selectedSymbol}
                    onChange={(e) => setSelectedSymbol(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
                >
                    <option value="AAPL">AAPL</option>
                    <option value="GOOGL">GOOGL</option>
                    <option value="MSFT">MSFT</option>
                </select>

                <label className="ml-4 mr-2 font-semibold text-gray-700">Select EMA Period:</label>
                <input
                    type="number"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                    min="1"
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
                />
            </div>
            <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
        </div>
    );
};

export default HighchartsStockEnhanced;
