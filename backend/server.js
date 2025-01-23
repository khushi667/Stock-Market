import express from 'express';
import cors from 'cors';
import stockRouter from './routes/stockRouter.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Configure CORS to allow credentials
const corsOptions = {
  origin: 'http://localhost:5173',  // Frontend URL
  credentials: true,               // Allow cookies and credentials
};

app.use(cors(corsOptions));

// Use the stockRouter for routes starting with /api/stocks
app.use('/api', stockRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
