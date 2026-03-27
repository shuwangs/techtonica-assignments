import React, { useEffect } from "react";
import { getWeatherByCity } from "../api/weatherApi";
import { useWeather } from "../context/WeatherContext";
import "./CityList.css";

const CityList = ({ cities, onCitySubmit }) => {
	const { removeCity, favCities, setFavCities } = useWeather();

	useEffect(() => {
		console.log(favCities);
	}, [favCities]);
	return (
		<div className="city-list">
			{favCities.map((city) => (
				<div key={city.id} className="city-ctn">
					<button className="city-item" onClick={() => onCitySubmit(city.city)}>
						{city.city}
					</button>
					<button
						className="delete-btn"
						onClick={() => removeCity(Number(city.id))}
					>
						×
					</button>
				</div>
			))}
		</div>
	);
};

export default CityList;
