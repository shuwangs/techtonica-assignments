import express from 'express';
import cors from 'cors';
import weatherRoute from "./routes/weatherRoute.js";
import authRoute from "./routes/authRoute.js";
import favoriteRoute from "./routes/favoriteRoute.js";
import userRoute from "./routes/userRoute.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// midware
app.use(cors());
app.use(express.json())

app.use('/api/weather', weatherRoute);
app.use('/api/continue', authRoute);
app.use('/api/favorites', favoriteRoute);
app.use('/api/users', userRoute);

export default app;


