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
                height: 350,
                type: 'line',
            },
            title: {
                text: 'IBM & TCS Stock Price (10 Days Ago)',
            },
            xaxis: {
                categories: [], // Will be updated dynamically
                title: {
                    text: 'Date',
                },
            },
            yaxis: {
                title: {
                    text: 'Stock Price (USD)',
                },
            },
            tooltip: {
                x: {
                    format: 'yyyy-MM-dd',
                },
            },
        },
    });

    useEffect(() => {
        const fetchStockData = async () => {

                const res = await fetch('http://localhost:5000/api/fetch-stocks');
                const data = await res.json();
                // console.log(data);

                const ibmData = [];
                const tcsData = [];
                const categories = [];

                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                const tenDaysAgoFormatted = tenDaysAgo.toISOString().split('T')[0];

                data.forEach(item => {
                    const formattedDate = item[0].date;

                    if (formattedDate === tenDaysAgoFormatted) {
                        categories.push(formattedDate);


                        if (item[0]['symbol'] === 'IBM') {
                            ibmData.push(parseFloat(item.close).toFixed(2));
                        }

                        if (item[1]['symbol'] === 'TCS.NS') {
                            tcsData.push(parseFloat(item.close).toFixed(2));
                        }
                    }
                });

                console.log('IBM Data:', ibmData);
                console.log('TCS Data:', tcsData);
                console.log('Categories:', categories);

                setState(prevState => ({
                    ...prevState,
                    series: [
                        {
                            name: "IBM Stock Price",
                            data: ibmData,
                        },
                        {
                            name: "TCS Stock Price",
                            data: tcsData,
                        },
                    ],
                    options: {
                        ...prevState.options,
                        xaxis: {
                            categories: categories, 
                        },
                    },
                }));

        };

        fetchStockData();
    }, []);

    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
        </div>
    );
}

export default ApexChart;
