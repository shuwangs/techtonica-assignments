const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getWeatherByCity = async (city) => {
	const response = await fetch(
		`${API_BASE}/api/weather?cityName=${encodeURIComponent(city)}`,
	);

	if (!response.ok) {
		throw new Error("Request failed");
	}

	return response.json();
};

export const getWeatherByLocation = async (lat, lon) => {
	const response = await fetch(`${API_BASE}/api/weather?lat=${lat}&lon=${lon}`);

	if (!response.ok) {
		throw new Error("Location-based request failed");
	}

	return response.json();
};

