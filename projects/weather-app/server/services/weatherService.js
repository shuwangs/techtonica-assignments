import { getCachedValue, setCachedValue } from "./cacheService.js";
import { buildWeatherParams, buildCacheKey, formatWeatherData } from "../utils/weatherHelpers.js";

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`

export const getWeather = async ({ cityName, lat, lon, apiKey }) => {
    const cacheKey = buildCacheKey({ cityName, lat, lon });

    const cachedData = await getCachedValue(cacheKey);

    if (cachedData) {
        return { ...cachedData, fromCache: true };
    }

    const params = buildWeatherParams({ cityName, lat, lon, apiKey });
    const url = `${BASE_URL}?${params}`;

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("City not found.");
        }
        throw new Error("Failed to fetch weather data.");
    }

    const data = await response.json();
    const formatedData = formatWeatherData(data);

    return formatedData;
}