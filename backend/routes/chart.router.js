import express from 'express';
import { StockData, EmaData } from '../models/StockData.js';
import { generateEmaData } from '../utils/generateEmaData.js';

const router = express.Router();

// backend/routes/chart.router.js
router.get('/', async (req, res) => {
    const { symbol, period } = req.query;

    if (!symbol || !period) {
        return res.status(400).json({ error: 'Symbol and period are required' });
    }

    console.log(`Fetching data for symbol: ${symbol} with EMA period: ${period}`);

    try {
        // Fetch stock data
        const stockData = await StockData.find({ symbol }).sort({ date: 1 }).exec();
        console.log('Stock Data:', stockData); // Log stock data

        // Check if stock data is available
        if (!stockData.length) {
            return res.status(404).json({ error: `No stock data found for symbol: ${symbol}` });
        }

        // Fetch EMA data
        let emaData = await EmaData.find({ symbol }).sort({ date: 1 }).exec();
        console.log('EMA Data:', emaData); // Log EMA data

        // If EMA data is not found, generate it
        if (emaData.length === 0) {
            console.log('EMA data not found. Generating new EMA data...');
            await generateEmaData(symbol, period);  // Generate EMA if missing
            emaData = await EmaData.find({ symbol }).sort({ date: 1 }).exec();
            console.log('Generated EMA Data:', emaData);
        }

        // Check if EMA data exists after generation
        if (!emaData.length) {
            return res.status(404).json({ error: `No EMA data available for symbol: ${symbol}` });
        }

        // Format stock data to match the required structure
        const filteredStockData = stockData.map(data => ({
            date: data.date,
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
        }));

        // Send the response with both stock and EMA data
        res.status(200).json({
            stockData: filteredStockData,
            emaData,
        });

    } catch (error) {
        console.error('Error fetching chart data:', error.message);
        res.status(500).json({ error: 'Error fetching chart data' });
    }
});

export default router;
