import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client =redis.createClient(REDIS_PORT);

client.connect().then(() => {
    console.log("Connected to Redis! ");
}).catch(err => {
    console.error("Redis Connection Error", err);
});

export default client;