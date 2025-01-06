import mongoose from 'mongoose';

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectToMongoDb;
