import mongoose from 'mongoose';

const ChartDataSchema = new mongoose.Schema({
    symbol: String,
    date: Date,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
});

const ChartData = mongoose.model('ChartData', ChartDataSchema);
export default ChartData;
