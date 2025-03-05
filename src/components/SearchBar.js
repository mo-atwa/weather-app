// SearchBar.js
import React, { useContext } from "react";
import Search from "./Search";
import { weather_api_url, weather_api_key } from "./api";
import { WeatherContext } from "./WeatherContext";

export default function SearchBar() {
  const { updateCurrentWeather, updateLocation } = useContext(WeatherContext);

  const fetchWeatherData = (city) => {
    fetch(
      `${weather_api_url}/weather?q=${city}&appid=${weather_api_key}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        updateCurrentWeather(data); // Update the context state
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  };

  const handleOnSearchChange = (search) => {
    const [city, country] = search.label.split(",");
    const newLocation = `${city.trim()}, ${country.trim()}`;
    updateLocation(newLocation); // Update location in the context
    fetchWeatherData(city.trim());
  };

  return (
    <div>
      <div className="search-bar">
        <Search onSearchChange={handleOnSearchChange} />
      </div>
    </div>
  );
}