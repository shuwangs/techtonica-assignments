import { useState, useEffect } from "react";
import WeatherForm from "./components/WeatherForm.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import { getWeatherByCity, getWeatherByLocation } from "./api/weatherApi";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE);

function App() {
	const [city, setCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(false);
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	const [error, setError] = useState("");
	const [activeTab, setActiveTab] = useState("search");

	const isDay = weather ? weather.current.icon.includes("d") : true;

	const fetchWeather = async (cityFromInput) => {
		if (!cityFromInput.trim()) return;

		setLoading(true);
		setError("");

		try {
			const data = await getWeatherByCity(cityFromInput);
			setWeather(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchWeatherByLoc = async (lat, lon) => {
		setLoading(true);
		setError("");

		try {
			const data = await getWeatherByLocation(lat, lon);
			setWeather(data);
			setLat(lat);
			setLon(lon);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};
	const handleCitySubmit = (cityFromInput) => {
		const queryCity = cityFromInput?.trim();
		if (!queryCity) return;
		setCity(queryCity);
	};

	useEffect(() => {
		fetchWeather(city);
	}, [city]);

	return (
		<div className={`app-container ${isDay ? "day-mode" : "starry-bg"}`}>
			<div className="brand-wrap">
				<div className="brand-icon">☀️</div>
				<span className="brand-name">WeatherApp</span>
			</div>

			<h1 className="hero-title">Welcome back, bobo</h1>
			<p className="hero-subtitle">
				Search a city or pick one from your favorites
			</p>

			<div className="tab-switcher">
				<button
					className={activeTab === "search" ? "tab-btn active" : "tab-btn"}
					onClick={() => setActiveTab("search")}
				>
					Search
				</button>
				<button
					className={activeTab === "favorites" ? "tab-btn active" : "tab-btn"}
					onClick={() => setActiveTab("favorites")}
				>
					Favorites
				</button>
			</div>
			{/* search Panel */}
			<div style={{ padding: 40 }}>
				<WeatherForm
					onCitySubmit={handleCitySubmit}
					onLocationSubmit={fetchWeatherByLoc}
				/>

				{loading && <p>Loading...</p>}

				{error && <p style={{ color: "red" }}>{city} is not found.</p>}

				{error === "" && weather && (
					<div className="dashboard-container">
						<div className="main-display">
							<WeatherCard data={weather} isDay={isDay} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
