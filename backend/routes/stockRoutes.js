import express from 'express';
import { saveStockData } from '../controllers/stockController.js';

const router = express.Router();

router.get('/fetch-stock-data', saveStockData);

export default router;
