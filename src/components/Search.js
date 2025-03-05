//Search.js
import React, { useState, useEffect } from "react";
import { weather_api_url, weather_api_key } from "./api";
import { GeoOptions, GEO_API_url } from "./api";
import { AsyncPaginate } from "react-select-async-paginate";

export default function Search({ onSearchChange }) {
  const [location] = useState("London, UK");
  const fetchWeatherData = (city) => {
    const currentWeatherFetch = fetch(
      `${weather_api_url}/weather?q=${city}&appid=${weather_api_key}&units=metric`
    );

    const forecastFetch = fetch(
      `${weather_api_url}/forecast?q=${city}&appid=${weather_api_key}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(([weatherData, forecastData]) => {})
      .catch((error) => console.error("Error fetching weather data:", error));
  };

  useEffect(() => {
    const [city] = location.split(",");
    fetchWeatherData(city.trim());
  }, [location]);

  return (
    <div>
      <AsyncPaginate
        debounceTimeout={600}
        type="text"
        placeholder="Search city"
        onChange={(value) => {
          onSearchChange(value);
        }}
        loadOptions={async (search) => {
          const url = `${GEO_API_url}/cities?namePrefix=${search}`;

          try {
            const response = await fetch(url, GeoOptions);
            const result = await response.json();
            return {
              options: result.data.map((city) => ({
                label: `${city.name}, ${city.country}`,
                value: `${city.latitude}, ${city.longitude}`,
              })),
            };
          } catch (error) {
            console.error(error);
            return {
              options: [],
            };
          }
        }}
      />
      <div>{}</div>
    </div>
  );
}
