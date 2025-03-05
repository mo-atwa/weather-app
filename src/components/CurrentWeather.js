// CurrentWeather.js
import React, { useContext } from "react";
import { WeatherContext } from "./WeatherContext";
import WeatherWeek from "./WeatherWeek";

const CurrentWeather = () => {
  const { currentWeather, location } = useContext(WeatherContext);

  return (
    <div className="current-weather">
      <p>{location}</p>
      {currentWeather && (
        <div className="weather-info">
          <div className="weather-degrees">
            <h2>{currentWeather.main.temp}</h2>
            <span>°C</span>
            <p>
              <img
                src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
                alt="weather-icon"
              />
              {currentWeather.weather[0].description}
            </p>
          </div>
          <div className="weather-description">
            <div className="feels-like">
              <p className="head-name">Feels like</p>
              <p className="number">{currentWeather.main.feels_like}</p>
            </div>
            <div className="wind">
              <p className="head-name">Wind</p>
              <p className="number">{currentWeather.wind.speed} km/h</p>
            </div>
            <div className="humidity">
              <p className="head-name">Humidity</p>
              <p className="number">{currentWeather.main.humidity} %</p>
            </div>
          </div>

          {/* Weekly forecast */}
          <WeatherWeek />
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
