import React from "react";

function WeatherCard({ weather, unit }) {
  if (!weather) return null;

  // Function to convert temperature
  const convertTemp = (tempC) =>
    unit === "C"
      ? `${Math.round(tempC)}°C`
      : `${Math.round((tempC * 9) / 5 + 32)}°F`;

  // Convert wind speed to km/h or mph
  const convertWind = (speedMps) =>
    unit === "C"
      ? `${Math.round(speedMps * 3.6)} km/h`
      : `${Math.round(speedMps * 2.237)} mph`;

  // Convert visibility to km or miles
  const convertVisibility = (meters) =>
    unit === "C"
      ? `${(meters / 1000).toFixed(1)} km`
      : `${(meters / 1609).toFixed(1)} mi`;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white/70 backdrop-blur-xl shadow-2xl border border-white/20 p-4 sm:p-6 rounded-xl w-full max-w-md mx-auto text-center">
      {/* City Name */}
      <h2 className="text-xl sm:text-2xl font-bold mb-2">{weather.name}</h2>

      {/* Weather Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        className="mx-auto w-20 sm:w-24"
      />

      {/* Temperature */}
      <p className="text-3xl sm:text-4xl font-semibold">
        {convertTemp(weather.main.temp)}
      </p>

      <p className="text-gray-600 capitalize mb-2">
        {weather.weather[0].description}
      </p>

      {/* Min/Max & Feels Like */}
      <p className="text-sm sm:text-base text-gray-600">
        Feels like: {convertTemp(weather.main.feels_like)}
      </p>
      <p className="text-sm sm:text-base text-gray-600">
        Min: {convertTemp(weather.main.temp_min)} | Max:{" "}
        {convertTemp(weather.main.temp_max)}
      </p>

      {/* Divider */}
      <div className="border-t border-white/30 my-3"></div>

      {/* Extra Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm sm:text-base text-gray-700">
        <div>
          <p className="font-semibold">Humidity</p>
          <p>{weather.main.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">Wind</p>
          <p>{convertWind(weather.wind.speed)}</p>
        </div>
        <div>
          <p className="font-semibold">Pressure</p>
          <p>{weather.main.pressure} hPa</p>
        </div>
        <div>
          <p className="font-semibold">Visibility</p>
          <p>{convertVisibility(weather.visibility)}</p>
        </div>
        <div>
          <p className="font-semibold">Sunrise</p>
          <p>{sunrise}</p>
        </div>
        <div>
          <p className="font-semibold">Sunset</p>
          <p>{sunset}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
