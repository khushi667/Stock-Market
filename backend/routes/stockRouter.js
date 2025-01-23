import { MongoClient } from 'mongodb';
import yahooFinance from 'yahoo-finance2';
import express from 'express';

const router = express.Router();

const symbols = [
  "IBM", "TCS.NS"
];

const uri = "mongodb+srv://khushimis03:4U7ssoJl9DHjI9ol@cluster0.dhmw7.mongodb.net";

// Route to fetch stock data, store it, and then provide it to frontend
router.get('/fetch-stocks', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("stockVista");
    const stockCollection = db.collection("stocks");

    console.log("Fetching and storing stock data...");

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 15); // Fetch the last 15 days of stock data

    // Fetch stock data for each symbol
    const promises = symbols.map(async (symbol) => {
      try {
        const historicalData = await yahooFinance.historical(symbol, {
          period1: startDate.toISOString().split("T")[0],
        });

        // Store each day's stock data in the database
        for (const day of historicalData) {
          const stockDocument = {
            symbol,
            date: new Date(day.date),
            open: day.open,
            high: day.high,
            low: day.low,
            close: day.close,
            volume: day.volume,
          };

          console.log(`Upserting data for ${symbol} on ${day.date}`);
          await stockCollection.updateOne(
            { symbol, date: stockDocument.date },
            { $set: stockDocument },
            { upsert: true }
          );
        }
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error.message);
      }
    });

    // Wait for all data fetch and upsert operations to complete
    await Promise.all(promises);
    console.log("Stock data saved successfully.");

    // Fetch today's stock data from the database
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const todayStocks = await stockCollection.find({
      date: { $gte: new Date(`${today}T00:00:00Z`) }
    }).toArray();

    res.status(200).json(todayStocks); // Return today's stock data

  } catch (error) {
    console.error("Error fetching or saving stock data:", error.message);
    res.status(500).send(`Error fetching or saving stock data: ${error.message}`);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
});

export default router;
