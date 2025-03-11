import React, { useState } from "react";
import { Cloud, Sun, CloudRain, Search } from "lucide-react";
import "./WeatherBackground.css"; 

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=320e15cf0a424a0bb51191504251103&q=${city}&aqi=no`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
      setWeather(null);
    }
    setLoading(false);
  };

  const getBackgroundClass = () => {
    if (!weather) return "bg-gradient-to-br from-blue-100 to-gray-200"; // Default Light Theme
    const condition = weather.current.condition.text.toLowerCase();

    if (condition.includes("rain")) return "bg-gradient-to-br from-blue-300 to-gray-500";
    if (condition.includes("cloud")) return "bg-gradient-to-br from-gray-200 to-gray-400";
    if (condition.includes("snow")) return "bg-gradient-to-br from-white to-blue-100";
    return "bg-gradient-to-br from-yellow-100 to-orange-200"; // Sunny
  };

  const getWeatherIcon = (condition) => {
    condition = condition.toLowerCase();
    if (condition.includes("rain")) return <CloudRain className="text-blue-600 drop-shadow-lg" size={80} />;
    if (condition.includes("cloud")) return <Cloud className="text-gray-600 drop-shadow-lg" size={80} />;
    return <Sun className="text-yellow-500 drop-shadow-lg" size={80} />;
  };

  return (
    <div className={`h-screen w-screen flex flex-col items-center justify-center ${getBackgroundClass()} text-gray-900 p-10 transition-all duration-700`}>
      
      {/* Title */}
      <h1 className="text-7xl font-bold mb-8 text-gray-800 drop-shadow-lg text-center">🌤️ Weather App</h1>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-6 items-center w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full sm:w-96 p-5 text-xl rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all bg-white shadow-xl placeholder-gray-500"
        />
        <button
          onClick={fetchWeather}
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl text-xl font-semibold transition-all transform hover:scale-105 shadow-xl"
        >
          <Search size={28} /> Search
        </button>
      </div>

      {/* Loading, Error, and Weather Display */}
      {loading && <p className="text-xl mt-6 animate-pulse">Fetching weather...</p>}
      {error && <p className="text-red-500 text-xl mt-6">{error}</p>}

      {weather && (
        <div className="mt-12 w-full max-w-3xl bg-white/30 backdrop-blur-xl p-12 rounded-3xl shadow-2xl text-center transition-transform transform hover:scale-105 border border-gray-300">
          <h2 className="text-5xl font-bold text-gray-900 drop-shadow-lg">
            {weather.location.name}, {weather.location.country}
          </h2>
          <div className="flex items-center justify-center gap-8 mt-8">
            {getWeatherIcon(weather.current.condition.text)}
            <p className="text-7xl font-bold text-gray-900">{weather.current.temp_c}°C</p>
          </div>
          <p className="text-2xl mt-4 text-gray-800">{weather.current.condition.text}</p>
          <p className="text-lg mt-3 text-gray-700">Humidity: {weather.current.humidity}%</p>
          <p className="text-lg text-gray-700">Wind: {weather.current.wind_kph} km/h</p>
        </div>
      )}
    </div>
  );
}
