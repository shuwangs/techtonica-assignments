import { useState, useEffect} from 'react'
import WeatherForm from './components/WeatherForm.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import InsightCard from './components/InsightCard.jsx';
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE);

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // hard coded examples
  const insights = [
      { 
        id: "clothes", 
        title: "CLOTHES ", 
        status: "Cold", 
        desc: "Wear jacts.", 
        score: 10 
      },
         { 
        id: "running", 
        title: "OUTDOOR ACTIVITY", 
        status: "LOW RISK", 
        desc: "Not suggested.", 
        score: 3 
      },
    ]

  const fetchWeather = async (cityFromInput) =>{
    if(!cityFromInput) {
      setError("Please enter a city");
      return;
    }
    setCity(cityFromInput);
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/weather?cityName=${cityFromInput}`);
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
   
  
  useEffect(() => {
    fetchWeather(city);
  }, []);


  return (
    <div style={{ padding: 40 }}>
      <h1><span className="techtonica-name">Techtonica</span>  Weather App</h1>
      <WeatherForm onCitySubmit={fetchWeather} />

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}


      {weather && (
        <div className='dashboard-container'>

          <div className='main-display'> 
            <WeatherCard data={weather} />
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
  );
  
}

export default App
