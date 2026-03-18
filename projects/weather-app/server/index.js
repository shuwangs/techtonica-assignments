import express from 'express';
import cors from 'cors';
import weatherRoute from "./routes/weatherRoute.js";

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// midware
app.use(cors());
app.use(express.json())

app.use('/api/weather', weatherRoute);

export default app;


