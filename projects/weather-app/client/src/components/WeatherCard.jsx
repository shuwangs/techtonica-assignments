import React from 'react';
import './WeatherCard.css'
const WeatherCard = ({ data }) => {
    if (!data) return null;
    const iconUrl = `https://openweathermap.org/img/wn/${data.current.icon}@4x.png`;

    return(
        <div className='main-weather-card'>

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

            </div>

        </div>

    );
}

export default WeatherCard;