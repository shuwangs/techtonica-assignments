import React, { useEffect } from "react";
import { getWeatherByCity } from "../api/weatherApi";
const CityList = ({ cities, onCitySubmit }) => {
	useEffect(() => {
		console.log(cities);
	}, [cities]);
	return (
		<div className="city-list">
			{cities.map((city) => (
				<button
					key={city.id}
					className="city-item"
					onClick={() => onCitySubmit(city.city)}
				>
					{city.city}
				</button>
			))}
		</div>
	);
};

export default CityList;
