// WeatherWeek.js
import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "./WeatherContext";
import { weather_api_url, weather_api_key } from "./api";

const WeatherWeek = () => {
  const { currentWeather } = useContext(WeatherContext);
  const [weeklyForecast, setWeeklyForecast] = useState(null);

  // Fetch weekly forecast data
  const fetchWeeklyForecast = (city) => {
    fetch(
      `${weather_api_url}/forecast?q=${city}&appid=${weather_api_key}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        // Extract daily forecasts
        const dailyForecasts = data.list.filter(
          (item, index) => index % 8 === 0
        ); // Get every 8th item (daily)

        // Start from tomorrow
        const today = new Date();
        const tomorrowTimestamp = today.setDate(today.getDate() + 1); // Tomorrow's timestamp
        const tomorrowForecasts = dailyForecasts.filter(
          (day) => day.dt * 1000 >= tomorrowTimestamp
        );

        setWeeklyForecast(tomorrowForecasts);
      })
      .catch((error) =>
        console.error("Error fetching weekly forecast:", error)
      );
  };


  useEffect(() => {
    if (currentWeather && currentWeather.name) {
      fetchWeeklyForecast(currentWeather.name);
    }
  }, [currentWeather]);

  return (
    <div className="weather-week">
      {weeklyForecast &&
        weeklyForecast.map((day, index) => (
          <div key={index} className="day">
            <p className="day-name">
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <p>{currentWeather.weather[0].description}</p>
            <p className="temperature">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
    </div>
  );
};

export default WeatherWeek;
