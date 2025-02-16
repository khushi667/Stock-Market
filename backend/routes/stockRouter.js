import { MongoClient } from 'mongodb';
import express from 'express';

const router = express.Router();
const uri = "mongodb+srv://khushimis03:4U7ssoJl9DHjI9ol@cluster0.dhmw7.mongodb.net";

router.get('/fetch-chart/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("stockVista");
        const stockCollection = db.collection("stocks");

        const stockData = await stockCollection.find({ symbol }).sort({ date: -1 }).toArray();

        res.json(stockData);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await client.close();
    }
});

export default router;
