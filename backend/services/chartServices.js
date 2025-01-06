import axios from 'axios';

const fetchChartData = async (symbol, apiKey) => {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol,
                apikey: apiKey,
            },
        });

        const data = response.data['Time Series (Daily)'];
        return data || null;
    } catch (error) {
        console.error(`Error fetching chart data for ${symbol}:`, error.message);
        return null;
    }
};

export default fetchChartData;
