import express from 'express';
import cors from 'cors';
import stockRouter from './routes/stockRouter.js';

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

app.use(cors());

// Use the stockRouter for routes starting with /api
app.use('/api', stockRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port :${PORT}`);
});
