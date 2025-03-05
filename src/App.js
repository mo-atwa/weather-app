// App.js
import React from "react";
import "./App.css";
import { WeatherProvider } from "./components/WeatherContext";
import SearchBar from "./components/SearchBar";
import AnotherComponent from "./components/CurrentWeather";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <WeatherProvider>
        <div className="container">
          <Header />
          <SearchBar />
          <AnotherComponent />
        </div>
      </WeatherProvider>
    </div>
  );
}

export default App;
