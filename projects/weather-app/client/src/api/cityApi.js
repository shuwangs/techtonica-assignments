const API_BASE = import.meta.env.VITE_API_BASE_URL;
export const getFavCitiesById = async (userId) => {
	const result = await fetch(`${API_BASE}/api/favorites/${userId}`);

	if (!result.ok) {
		throw new Error("Request failed");
	}
	const data = await result.json();
	return data.data;
};
