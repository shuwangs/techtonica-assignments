import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
console.log("Node runtime:", process.version);

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

const app = express();


// midware
app.use(cors());
app.use(express.json())

// creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My template ExpressJS' });
  });

// creates an endpoint for the route /api/weather
app.get('/weather', async (req, res) => {
    const city = req.query.cityName; 
    const params = new URLSearchParams({
        q: city,
        appid: API_KEY,
        units: "imperial",
    })
    const url = `https://api.openweathermap.org/data/2.5/weather?${params}`
    console.log(url)
    try{
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error ("Fetch API error");
        }
        const data = await response.json();


        const formatedData = {
            "city": data.name,
            "country": data.sys.country,
            "generatedAt": data.dt,
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
        console.log(formatedData);
        res.json(data)

    } catch (error){
        console.error("Fetch Failed", error)
        res.status(500).json({ error: error.message});    }
});




app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})
