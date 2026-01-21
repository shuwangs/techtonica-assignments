import { useState, useEffect} from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE);

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) =>{
    if(!city) {
      setError("Please enter a city");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/weather?cityName=${city}`);
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
    fetchWeather("Boston");
  }, []);


  return (
    <div style={{ padding: 40 }}>
      <h1>Weather App</h1>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <p>Today's weather {weather.city}</p>
      )}

    </div>
  );
  
}

export default App
