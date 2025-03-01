import "./Home.css";
import React, { useState } from "react";

const API_KEY = "91cf3362333bc9739718919de3fe8cc7"; // Replace with your OpenWeather API key

function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🌤 Weather App - <span>BY Rajnish Singh</span></h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          required
        />
        <button type="submit">🔍 Search</button>
      </form>

      {isLoading && <p className="loading">⏳ Fetching weather...</p>}
      {error && <p className="error">❌ {error}</p>}

      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.name}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <p className="temp">{weatherData.main.temp}°C</p>
          <p className="condition">{weatherData.weather[0].description}</p>
          <p>🌡 Humidity: {weatherData.main.humidity}%</p>
          <p>💨 Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}

      {!weatherData && !isLoading && !error && (
        <p className="info">🔎 Search for a city to get weather details.</p>
      )}
    </div>
  );
}

export default Home;
