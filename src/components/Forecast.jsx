import React, { useState } from "react";

export default function Forecast() {
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("London");
  const [error, setError] = useState(null);

  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=320e15cf0a424a0bb51191504251103&q=${city}&days=3&aqi=no&alerts=no`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
        setForecast(null);
      } else {
        setForecast(data.forecast.forecastday);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch forecast data");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 text-gray-900 p-6 transition-all duration-700">
      <div className="w-full max-w-5xl bg-white/40 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center border border-gray-200 transition-transform transform hover:scale-105">
        
        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900 drop-shadow-lg">📅 3-Day Weather Forecast</h1>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-6 items-center w-full">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full sm:w-96 p-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all bg-white shadow-lg placeholder-gray-500"
          />
          <button
            onClick={fetchForecast}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Get Forecast
          </button>
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500 text-lg mt-4">{error}</p>}

        {/* Forecast Display */}
        {forecast && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {forecast.map((day) => (
              <div
                key={day.date}
                className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-center border border-gray-300 transition-transform transform hover:scale-105 hover:bg-white/40"
              >
                <h3 className="text-2xl font-bold">{day.date}</h3>
                <img src={day.day.condition.icon} alt="weather icon" className="mx-auto w-24 h-24 my-2" />
                <p className="text-xl text-gray-800">{day.day.condition.text}</p>
                <p className="text-4xl font-semibold text-gray-900">{day.day.avgtemp_c}°C</p>
                <p className="text-lg mt-2 text-gray-700">Humidity: {day.day.avghumidity}%</p>
                <p className="text-lg text-gray-700">Wind: {day.day.maxwind_kph} km/h</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
