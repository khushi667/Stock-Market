import axios from 'axios';

// API key from environment variables
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

const stockServices = async (symbol) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
    return response.data['Time Series (Daily)'];
  } catch (error) {
    throw new Error('Error fetching data from Alpha Vantage');
  }
};

export default stockServices;
