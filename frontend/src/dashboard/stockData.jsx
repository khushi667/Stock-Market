import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function ApexChart() {
    const [state, setState] = useState({
        series: [],
        options: {
            chart: {
                height: 550,
                type: 'line',
                animations: { enabled: true, easing: 'easeinout', speed: 2000 },
                background: '#f4f5f7',
            },
            title: {
                text: 'IBM & TCS Stock Price',
                style: { fontSize: '22px', fontWeight: 'bold', color: '#333' },
            },
            tooltip: { enabled: true, shared: true, theme: 'light' },
            grid: { borderColor: '#E1E4E8', row: { colors: ['#f5f7f9'], opacity: 0.5 } },
            xaxis: {
                type: 'datetime',
                labels: { style: { color: '#666', fontSize: '12px' } },
                axisBorder: { show: true, color: '#D6D8DC' },
            },
            yaxis: {
                title: { text: 'Price', style: { fontSize: '14px', fontWeight: 'bold', color: '#333' } },
                labels: { style: { color: '#666', fontSize: '12px' } },
            },
        },
    });

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/fetch-stocks');
                if (!res.ok) throw new Error("Failed to fetch data");
                const data = await res.json();
                if (!Array.isArray(data) || data.length < 2) throw new Error("Unexpected data format");

                const ibmData = data[0].map(entry => ({
                    x: new Date(entry.date).getTime(),
                    y: parseFloat(entry.close.toFixed(2))
                }));
                const tcsData = data[1].map(entry => ({
                    x: new Date(entry.date).getTime(),
                    y: parseFloat(entry.close.toFixed(2))
                }));

                setState(prevState => ({
                    ...prevState,
                    series: [
                        { name: "IBM Stock Price", data: ibmData },
                        { name: "TCS Stock Price", data: tcsData }
                    ],
                }));
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStockData();
    }, []);

    return <ReactApexChart options={state.options} series={state.series} type="line" height={550} />;
}

export default ApexChart;
