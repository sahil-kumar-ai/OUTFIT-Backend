import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import {createClient} from 'redis';

dotenv.config();

await connectDb();

const redisUrl = process.env.REDIS_URL

if(!redisUrl) {
console.log("Missing Redis Url");
process.exit(1);
}

export const redisClient = createClient({
    url: redisUrl,
});

redisClient.connect().then(() => console.log("Connected To Redis")).catch(console.error);

const app = express();

// Middlewares
app.use(express.json());

// Importing Routes
import userRoutes from './routes/user.js';

// Using Routes
app.use("/api/v1", userRoutes);

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});