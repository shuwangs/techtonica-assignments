# Weather Decision Service

## MVP
Build an API-first weather decison service that converts raw weather data into actionable daily-life insights, with a lightweight React client for demonstration.

## Core MVP Features

### 1. Weather Insights API (Backend)

- Accepts a **city name** as input
- Fetches **current weather data** from the OpenWeather API
- Normalizes third-party data into a clean internal format

**Normalized weather fields**
- Temperature (Celsius)
- Humidity
- Wind speed
- Weather condition icon



### 2. Decision-Oriented Insights (Server-side)

- **Car Wash Index**
  - Indicates whether current conditions are suitable for washing a car

- **Parking Risk Assessment**
  - Flags potential parking risks based on rain or freezing temperatures

- **Walk Comfort Indicator**
  - Evaluates walking comfort based on temperature and wind conditions
