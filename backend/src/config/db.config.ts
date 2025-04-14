import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const conn = async () => {
    if (!process.env.MONGO_URI) {
        console.error('MongoDB URI is not defined in .env file.');
        return;
    }
    
    try {
        const db = await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Database connected!');
        return db;
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default conn;
