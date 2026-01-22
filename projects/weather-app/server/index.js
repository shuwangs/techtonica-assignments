import express from 'express';
import cors from 'cors';
import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();
console.log("Node runtime:", process.version);

const API_KEY = process.env.API_KEY;

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client =redis.createClient(REDIS_PORT);

client.connect().then(() => {
    console.log("Connected to Redis! 🚀");
}).catch(err => {
    console.error("Redis Connection Error", err);
});
const app = express();


// midware
app.use(cors());
app.use(express.json())

// creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My template ExpressJS' });
  });

// creates an endpoint for the route /api/weather
app.get('/api/weather', async (req, res) => {
    const city = req.query.cityName; 
    const params = new URLSearchParams({
        q: city,
        appid: API_KEY,
        units: "imperial",
    })

    const url = `https://api.openweathermap.org/data/2.5/weather?${params}`
    const cacheKey = `weather:${city.toLowerCase().trim()}`;
    try{
        const cachedData = await client.get(cacheKey);
        if(cachedData) {
            console.log("Cache Hit!!!");
            console.log(cachedData);
            return res.json(JSON.parse(cachedData));
        }
        console.log('Cache Miss, Fetcthing from API');
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error ("Fetch API error");
        }
        const data = await response.json();


        const formatedData = {
            "city": data.name,
            "country": data.sys.country,
            "generatedAt": (data.dt + data.timezone) * 1000,
            "current": {
            "condition": data.weather[0].main,
            "description": data.weather[0].description,
            "icon": data.weather[0].icon,
            "temp": data.main.temp,
            "feelsLike": data.main.feels_like,
            "humidity": data.main.humidity,
            "windSpeed": data.wind.speed,
            "cloudCoverage": data.clouds.all
            }
        }

        await client.setEx(cacheKey,3600, JSON.stringify(formatedData));

        res.json(formatedData)

    } catch (error){
        console.error("Fetch Failed", error)
        res.status(500).json({ error: error.message});    }
});




app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})
