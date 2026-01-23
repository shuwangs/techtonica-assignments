import { useState, useEffect} from 'react'
import WeatherForm from './components/WeatherForm.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE);

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [error, setError] = useState("");
  const isDay = weather ? weather.current.icon.includes('d') : true;

  const fetchWeather = async (cityFromInput) =>{
    if(!cityFromInput) {
      // setError("Please enter a city");
      return;
    }
    setCity(cityFromInput);
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/weather?cityName=${city}`);
      if(!response.ok) {
        throw new Error("Requested failed");
      }
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally{
      setLoading(false);
    }
  }
   
  const fetchWeatherByLoc = async (lat, lon) => {

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/weather?lat=${lat}&lon=${lon}`);
      if(!response.ok) {
        throw new Error("Location based Requested failed");
      }
      const data = await response.json();
      console.log(data);
      setWeather(data);
      // setCity(data.city);
      setLat(lat);
      setLon(lon);
      
    } catch (error) {
      setError(error.message);
    } finally{
      setLoading(false);
    }

  }
  
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  useEffect(() => {
    fetchWeatherByLoc(lat,lon);
  }, [lat,lon]);

  return (
    <div className={`app-container ${isDay? 'day-mode' :'night-mode'}` }>

      <div style={{ padding: 40 }}>
        <h1><span className="techtonica-name">Techtonica</span>  Weather App</h1>
        <WeatherForm 
          onCitySubmit={fetchWeather} 
          onLocationSubmit={fetchWeatherByLoc}
          />

        {loading && <p>Loading...</p>}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weather && (
  
          <div className='dashboard-container'>

            <div className='main-display'> 
              <WeatherCard data={weather} isDay={isDay}/>
            </div>
            {/* <div className='insight'>
              {weather && insights.map((item) =>{
                return (
                  <InsightCard title={item.title}
                    status={item.status}
                    suggestion={item.desc}
                  />
                )
              })}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
  
}

export default App
