import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true }, 
    date: { type: Date, required: true },   
    open: { type: Number, required: true },  
    high: { type: Number, required: true },  
    low: { type: Number, required: true }, 
    close: { type: Number, required: true }, 
    volume: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

const Sector = mongoose.model("Sector", sectorSchema);

export default Sector;
