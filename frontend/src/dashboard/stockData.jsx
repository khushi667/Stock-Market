import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function ApexChart() {
    const [stockSymbol, setStockSymbol] = useState("IBM"); // Default stock
    const [series, setSeries] = useState([]);
    
    const options = {
        chart: { height: 550, type: 'line', animations: { enabled: true, easing: 'easeinout', speed: 2000 }, background: '#f4f5f7' },
        title: { text: `${stockSymbol} Stock Price`, style: { fontSize: '22px', fontWeight: 'bold', color: '#333' } },
        tooltip: { enabled: true, shared: true, theme: 'light' },
        grid: { borderColor: '#E1E4E8', row: { colors: ['#f5f7f9'], opacity: 0.5 } },
        xaxis: { type: 'datetime', labels: { style: { color: '#666', fontSize: '12px' } }, axisBorder: { show: true, color: '#D6D8DC' } },
        yaxis: { title: { text: 'Price', style: { fontSize: '14px', fontWeight: 'bold', color: '#333' } }, labels: { style: { color: '#666', fontSize: '12px' } } },
    };

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/fetch-chart/${stockSymbol}`);
                if (!res.ok) throw new Error("Failed to fetch data");
                const data = await res.json();
                
                const formattedData = data.map(entry => ({
                    x: new Date(entry.date).getTime(),
                    y: parseFloat(entry.close.toFixed(2))
                }));

                setSeries([{ name: `${stockSymbol} Stock Price`, data: formattedData }]);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStockData();
    }, [stockSymbol]);

    return (
        <div style={{ textAlign: 'center' }}>
            <select value={stockSymbol} onChange={(e) => setStockSymbol(e.target.value)} style={{ padding: '8px', fontSize: '16px', marginBottom: '20px' }}>
                <option value="" disabled>Choose stock here:</option>
                <option value="IBM">IBM</option>
                <option value="TCS.NS">TCS</option>
            </select>
            <ReactApexChart options={options} series={series} type="line" height={550} />
        </div>
    );
}

export default ApexChart;
