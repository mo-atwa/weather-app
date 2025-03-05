// WeatherContext.js
import React, { createContext, useState, useEffect } from "react";
import { weather_api_url, weather_api_key } from "./api";

// Create the context
export const WeatherContext = createContext();

// Create a provider component
export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [location, setLocation] = useState("London, UK"); // Add location state

  // Function to update currentWeather
  const updateCurrentWeather = (weatherData) => {
    setCurrentWeather(weatherData);
  };

  // Function to update location
  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  useEffect(() => {
    const fetchInitialWeatherData = async () => {
      try {
        const response = await fetch(
          `${weather_api_url}/weather?q=London&appid=${weather_api_key}&units=metric`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch initial weather data');
        }
        const data = await response.json();
        updateCurrentWeather(data);
      } catch (error) {
        console.error("Error fetching initial weather data:", error);
      }
    };

    fetchInitialWeatherData();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        updateCurrentWeather,
        location,
        updateLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};