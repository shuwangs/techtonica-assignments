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


## Weather App Phase 2 features
- [X] add db with 2 tables 
  - [X] users
  - [X] favorites
- [ ] fakeAuth page
  - enter username, userEmail, click contitue to dashboard
- [ ] dashboard page 
  - [ ] search button (already have) add save to fav button
  - [X] favorite section
  - [X] favorite cities tab
    - [X] Display favorite city list
    - [X] Click a favorite city to fetch and display weather
    - [ ] Delete a favorite city
    - [ ] Prevent duplicate cities in favorites

