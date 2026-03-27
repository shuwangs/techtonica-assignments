
export function validateWeatherQuery(query) {
  const { cityName, lat, lon } = query;

  const hasCity = Boolean(cityName?.trim());
  const hasCoords = lat && lon;

  if (!hasCity && !hasCoords) {
    throw new Error("Please provide either cityName or both lat and lon.");
  }

  return { cityName, lat, lon };
}

export const buildWeatherParams = ({ cityName, lat, lon, apiKey }) => {
  if (lat && lon) {
    return new URLSearchParams({
      lat: String(lat),
      lon: String(lon),
      appid: apiKey,
      units: "imperial",
    });
  }

  return new URLSearchParams({
    q: cityName.trim(),
    appid: apiKey,
    units: "imperial",
  });
}

export const buildCacheKey = ({ cityName, lat, lon }) => {
  if (lat && lon) {
    return `weather:coord:${lat}:${lon}`;
  }

  return `weather:${cityName.toLowerCase().trim()}`;
}

export const formatWeatherData = (data) => {
  const formatedData = {
    "city": data.name,
    "country": data.sys.country,
    "generatedAt": (data.dt + data.timezone) * 1000,
    "current": {
      "condition": data.weather[0].main,
      "description": data.weather[0].description,
      "icon": data.weather[0].icon,
      "temp": data.main.temp,
      "feelsLike": data.main.feels_like,
      "humidity": data.main.humidity,
      "windSpeed": data.wind.speed,
      "cloudCoverage": data.clouds.all,
    },
    "fromCache": false
  }
  return formatedData;
}


