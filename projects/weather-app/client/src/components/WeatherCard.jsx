import React from 'react';
import WeatherApiIcon from '../assets/openweather.png';
import { DiRedis } from "react-icons/di";

import './WeatherCard.css'
const WeatherCard = ({ data , isDay}) => {
    if (!data) return null;
    const iconUrl = `https://openweathermap.org/img/wn/${data.current.icon}@4x.png`;
    const mode = isDay? "day" : "night";
    const isCached = data.fromCache

    return(
        <div className={`main-weather-card ${mode}`}>

            <div className='card-hearder'>
                <h2 className="city-name">{data.city}, {data.country}</h2>
                <p className='weather-desc'>{data.current.description.toUpperCase()}</p>
            </div>

            <div className="temp-container">
                <div className="main-temp">
                    {Math.round(data.current.temp)}
                    <span className="unit">°F</span>
                </div>
                <div className="weather-icon-wrapper">
                    <img src={iconUrl} alt={data.current.description} className="weather-icon" />
                </div>
            </div>



            <div className='card-footer'>
                <div className="footer-item">
                    <span className="label">FEELS LIKE: </span>
                    <span className="value">{Math.round(data.current.feelsLike)}°F</span>
                </div>
                <div className="footer-item">
                    <span className="label">HUMIDITY: </span>
                    <span className="value">{Math.round(data.current.humidity)}</span>
                </div>

                <div className="footer-item cache-icon">
                    {isCached ? <DiRedis /> :
                    <img className="weather-icon-img" src={WeatherApiIcon} alt="Data from Open Weather" /> }

                </div>
            </div>

        </div>

    );
}

export default WeatherCard;