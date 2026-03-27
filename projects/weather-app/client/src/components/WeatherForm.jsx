import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { handleClickLocation } from "../utils/getCurrentLocation.js";
import { addToFavCities } from "../api/cityApi.js";
import "./WeatherCard.css";
import { useWeather } from "../context/WeatherContext.jsx";

function WeatherForm({ onCitySubmit, onLocationSubmit }) {
	const { currentUser, addFav, setFavCities } = useWeather();
	const [city, setCity] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!city.trim()) return;
		onCitySubmit(city);
		setCity(city);
		return;
	};
	const handleAddFav = async () => {
		if (!currentUser || !city.trim()) return;
		await addFav(currentUser, city);
		setCity("");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="city-row">
					<label htmlFor="city">
						City:
						<input
							name="city"
							type="text"
							placeholder="Enter city name"
							value={city}
							onChange={(event) => setCity(event.target.value)}
						/>
					</label>

					<CiLocationOn className="geo-icon" onClick={handleClickLocation} />
				</div>
			</form>
			<button className="add-btn" onClick={handleAddFav}>
				Add To Favorite
			</button>
		</div>
	);
}

export default WeatherForm;
