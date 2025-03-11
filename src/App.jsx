import React from "react";
import WeatherApp from "./components/WeatherApp";
import Forecast from "./components/Forecast";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Weather</h1>
      <p className="text-lg mb-6 text-gray-300">Get real-time weather updates with detailed forecasts!</p>
      <WeatherApp />
      <Forecast />
      <footer className="mt-6 text-gray-400 text-sm">
        | SK | 
      </footer>
    </div>
  );
}
