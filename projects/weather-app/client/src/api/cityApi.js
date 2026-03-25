const API_BASE = import.meta.env.VITE_API_BASE_URL;
export const getFavCitiesById = async (userId) => {
	const result = await fetch(`${API_BASE}/api/favorites/${userId}`);

	if (!result.ok) {
		throw new Error("Request failed");
	}
	const data = await result.json();
	return data.data;
};

export const addToFavCities = async (userId, city) => {
	const response = await fetch(`${API_BASE}/api/favorites/${userId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ city })
	});

	if (!response.ok) {
		throw new Error("Add City to favorite list failed");
	}

	return response.json();
};

export const deleteFavCity = async (cityID) => {
	const response = await fetch(`${API_BASE}/api/favorites/${cityID}`, {
		method: "DELETE"
	});

	if (!response.ok) {
		throw new Error("Add City to favorite list failed");
	}

	return response.json();
};