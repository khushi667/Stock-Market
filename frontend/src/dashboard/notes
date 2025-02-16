import { MongoClient } from 'mongodb';
import express from 'express';

const router = express.Router();
const symbols = ["IBM", "TCS.NS"];
const uri = "mongodb+srv://khushimis03:4U7ssoJl9DHjI9ol@cluster0.dhmw7.mongodb.net";

router.get('/fetch-stocks', async (req, res) => {
    const client = new MongoClient(uri);
        const db = client.db("stockVista");
        const stockCollection = db.collection("stocks");

        const stock_data = await Promise.all(
            symbols.map(async (symbol) => {
                return await stockCollection.find({ symbol }).sort({ date: -1 }).toArray();
            })
        );
        res.json(stock_data);
});
export default router;
