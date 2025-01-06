// backend/utils/generateEmaData.js
import { ema } from 'technicalindicators';
import { StockData, EmaData } from '../models/StockData.js'; // Adjust according to your model paths

// Function to generate and insert missing EMA data
export const generateEmaData = async (symbol, period = 20) => {
    try {
        const stockData = await StockData.find({ symbol }).sort({ date: 1 }).exec();

        if (stockData.length < period) {
            console.log('Not enough stock data to calculate EMA');
            return;
        }

        const closingPrices = stockData.map(data => data.close);
        const emaValues = ema({ period, values: closingPrices });

        const emaDataToInsert = stockData.slice(period - 1).map((data, index) => ({
            symbol,
            date: data.date,
            [`ema${period}`]: emaValues[index],
        }));

        await EmaData.insertMany(emaDataToInsert);

        console.log(`EMA data for ${symbol} (period ${period}) inserted successfully!`);
    } catch (error) {
        console.error('Error generating or inserting EMA data:', error.message);
    }
};
