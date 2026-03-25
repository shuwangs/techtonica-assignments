import { useState, useEffect } from "react";
import WeatherForm from "./components/WeatherForm.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
// import { getWeatherByCity, getWeatherByLocation } from "./api/weatherApi";
import { getFavCitiesById } from "./api/cityApi.js";
import CityList from "./components/CityList.jsx";
import "./App.css";
import { useWeather } from "./context/WeatherContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE);

function App() {
	const {
		currentUser,
		city,
		weather,
		loading,
		error,
		favCities,
		activeTab,
		setActiveTab,
		handleCitySubmit,
		fetchWeatherByLoc,
	} = useWeather();

	const isDay = weather ? weather.current.icon.includes("d") : true;

	return (
		<div className={`app-container ${isDay ? "day-mode" : "starry-bg"}`}>
			<div className="brand-wrap">
				<div className="brand-icon">☀️</div>
				<span className="brand-name">WeatherApp</span>
			</div>

			<h1 className="hero-title">Welcome back, {currentUser}</h1>
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
				{activeTab == "search" && (
					<WeatherForm
						onCitySubmit={handleCitySubmit}
						onLocationSubmit={fetchWeatherByLoc}
					/>
				)}
				{/* Favorite Cities */}
				{activeTab == "favorites" && (
					<CityList cities={favCities} onCitySubmit={handleCitySubmit} />
				)}

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
