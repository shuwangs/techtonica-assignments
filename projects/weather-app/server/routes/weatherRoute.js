import { Router } from 'express';
import { getWeather } from '../services/weatherService.js';
import { validateWeatherQuery } from '../utils/weatherHelpers.js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
// creates an endpoint for the route /api/weather
router.get('/', async (req, res) => {
    try {
        const { cityName, lat, lon } = validateWeatherQuery(req.query);

        const apiKey = process.env.API_KEY;
        const weather = await getWeather({ cityName, lat, lon, apiKey })

        res.json(weather);

    } catch (error) {
        console.error("Weather route error:", error.message);

        const status =
            error.message === "Please provide either cityName or both lat and lon."
                ? 400
                : error.message === "City not found."
                    ? 404
                    : 500;

        res.status(status).json({ error: error.message });
    }

});

export default router;
