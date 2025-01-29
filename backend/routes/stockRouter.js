import { MongoClient } from 'mongodb';
import yahooFinance from 'yahoo-finance2';
import express from 'express';

const router = express.Router();

const symbols = ["IBM"];
router.get('/fetch-stocks', async (req, res) => {
  const client = new MongoClient("mongodb+srv://khushimis03:4U7ssoJl9DHjI9ol@cluster0.dhmw7.mongodb.net");
  const db = client.db("stockVista");
  const stockCollection = db.collection("stocks");

  const stock_data = await Promise.all(
    symbols.map(async (symbol) => {
      const data = await stockCollection.find({symbol: symbol }).sort({ date: -1 }).limit(30).toArray();

        const seenDates = new Set();
        const filteredData = data.filter(item => {
        const date = new Date(item.date).toISOString().split('T')[0]; 
          if (seenDates.has(date)) {
            return false; 
          } else {
            seenDates.add(date); 
            return true;
          }
        });
      return filteredData; 
    })
  );

  console.log(stock_data[0].length);
  res.json(stock_data[0]);
});




const uri = "mongodb+srv://khushimis03:4U7ssoJl9DHjI9ol@cluster0.dhmw7.mongodb.net";
router.get('/fetch-store-stocks', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("stockVista");
    const stockCollection = db.collection("stocks");

    // Create unique index for symbol and date if not already created (only once, on startup)
    await stockCollection.createIndex({ symbol: 1, date: 1 }, { unique: true });

    console.log("Fetching and storing stock data...");

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 300);

    // Fetch and upsert stock data for each symbol
    const promises = symbols.map(async (symbol) => {
      try {
        const historicalData = await yahooFinance.historical(symbol, {
          period1: startDate.toISOString().split("T")[0],
        });

        for (const day of historicalData) {
          const stockDocument = {
            symbol,
            date: new Date(day.date).setMilliseconds(0),
            open: day.open,
            high: day.high,
            low: day.low,
            close: day.close,
            volume: day.volume,
          };

          console.log(`Upserting data for ${symbol} on ${day.date}`);

          try {
            // Attempt to upsert the data into the collection
            await stockCollection.updateOne(
              { symbol, date: stockDocument.date },
              { $set: stockDocument },
              { upsert: true }
            );
          } catch (error) {
            if (error.code === 11000) {
              // Duplicate key error (index violation), handle gracefully
              console.log(`Duplicate found for ${symbol} on ${day.date}. Skipping.`);
            } else {
              console.error(`Error upserting data for ${symbol} on ${day.date}:`, error.message);
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error.message);
      }
    });

    await Promise.all(promises);
    console.log("Stock data saved successfully.");
  } catch (error) {
    console.error("Error fetching or saving stock data:", error.message);
    res.status(500).send(`Error fetching or saving stock data: ${error.message}`);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
});

export default router;
