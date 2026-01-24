# 🌦️ Weather App – Full Stack

A full-stack weather application that allows users to search weather information by city name or geolocation. The app features a React frontend, a Node.js backend, optional Redis-based caching, and a dynamic UI that adapts to day/night conditions.

---

## ✨ Features
- Search real-time weather data by city name

- Support geolocation-based weather lookup (with browser permission)
    
- Backend service fetches data from the OpenWeather API
    
- Optional Redis caching layer to reduce repeated API calls
    
- Dynamic dashboard background based on day/night status
    
- Clear UI indicators for cached vs live data

--- 

## 🧱 Tech Stack
**Frontend**

- React,  Vite, JavaScript,  CSS

**Backend**
- Node.js, Express, OpenWeather API

**Caching (Optional)**

- Redis (local or managed)
  
--- 

##  Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/shuwangs/techtonica-assignments
cd projects/weather-app
```
### 2. Start the backend server
```bash
	cd server 
	npm install 
	npm run dev
```

Create a `.env` file in `server/`:
`OPENWEATHER_API_KEY=your_api_key_here`

---

### 3. Start the frontend client
```bash
	cd client
	npm install
	npm run dev
```
Create a `.env` file in `client/`:
`VITE_API_BASE_URL=http://localhost:3000`

---

##  How to Test

### City-based search

- Enter a city name and submit
- Weather data should be displayed in the dashboard
### Geolocation-based search

- Allow browser location access when prompted
- Weather data for the current location should be displayed

### Without Redis (default)

- Do not start Redis
- App should still function normally
- UI indicates data is fetched from the API

### With Redis enabled (optional)

- Start Redis locally
- Restart backend server
- Search the same city multiple times
- Cached responses should be returned

