import mongoose from 'mongoose';

// RsiData Schema
const rsiDataSchema = new mongoose.Schema({
    symbol: { type: String, required: true }, // Stock symbol
    date: { type: Date, required: true },     // Date of the RSI calculation
    rs: { type: Number, required: false },    // Relative Strength (Optional)
    rsi: { type: Number, required: false },   // Relative Strength Index (Optional)
});

const RsiData = mongoose.model('RsiData', rsiDataSchema);

export { RsiData };
