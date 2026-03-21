import { createContext, useContext, useEffect, useState } from "react";
import { getWeatherByCity, getWeatherByLocation } from "../api/weatherApi";
import { getFavCitiesById } from "../api/cityApi";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
	const [city, setCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(false);
	const [favCities, setFavCities] = useState([]);
	const [error, setError] = useState("");
	const [activeTab, setActiveTab] = useState("search");

	const fetchWeather = async (cityFromInput) => {
		if (!cityFromInput?.trim()) return;

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
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchFavCities = async (userId) => {
		const currentId = Number(userId);

		if (isNaN(currentId)) {
			setError("userId is invalid");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const data = await getFavCitiesById(currentId);
			setFavCities(data);
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

	useEffect(() => {
		fetchFavCities(1);
	}, []);

	return (
		<WeatherContext.Provider
			value={{
				city,
				weather,
				loading,
				error,
				favCities,
				activeTab,
				setActiveTab,
				handleCitySubmit,
				fetchWeatherByLoc,
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
};

export const useWeather = () => {
	const context = useContext(WeatherContext);
	if (!context) {
		throw new Error("useWeather must be used within a WeatherProvider");
	}
	return context;
};
