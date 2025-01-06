import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchChartData = async (symbol, period) => {
    const response = await axios.get(`${apiUrl}/api/chart?symbol=${symbol}&period=${period}`);
    return response.data;
};
