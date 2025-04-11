import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const conn = async()=>{
    try{
        const db = await mongoose.connect(process.env.MONGO_URI as string);
        return db;
    }catch(error){
        console.log(error);
    }
}

export default conn;