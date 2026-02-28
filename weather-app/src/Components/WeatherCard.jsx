import React from "react";

function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-lg text-center w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
      />
      <p className="text-4xl font-semibold">
        {Math.round(weather.main.temp)}°C
      </p>
      <p className="text-gray-600 capitalize">
        {weather.weather[0].description}
      </p>

      <div className="flex justify-between mt-4 text-sm text-gray-700">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} km/h</p>
      </div>
    </div>
  );
}

export default WeatherCard;
