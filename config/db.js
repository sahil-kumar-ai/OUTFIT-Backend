import mongoose from 'mongoose';
import dotenv from 'dotenv';

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "E-Commerce",
        });

        console.log('Database Connected')
    } catch(error) {
        console.log("Not Connected")
        console.log(error);
    }
}

export default connectDb;  