import React from "react";

function ForecastCard({ forecast, unit }) {
  if (!forecast) return null;

  const daily = forecast.list.filter((item, index) => index % 8 === 0);

  const convertTemp = (tempC) =>
    unit === "C"
      ? `${Math.round(tempC)}°C`
      : `${Math.round((tempC * 9) / 5 + 32)}°F`;

  const convertWind = (speedMps) =>
    unit === "C"
      ? `${Math.round(speedMps * 3.6)} km/h`
      : `${Math.round(speedMps * 2.237)} mph`;

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {daily.slice(0, 5).map((day, i) => (
        <div
          key={i}
          className="
            bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-4 
            text-center w-40 sm:w-44 md:w-48 flex flex-col items-center
            transition-transform duration-300 hover:scale-105 hover:shadow-xl
          "
        >
          {/* Date */}
          <p className="text-sm font-semibold mb-1">
            {new Date(day.dt_txt).toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>

          {/* Weather Icon */}
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
            className="w-16 sm:w-20 mx-auto"
          />

          {/* Temperature */}
          <p className="text-xl font-bold mt-1">{convertTemp(day.main.temp)}</p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-600 mt-1 capitalize">
            {day.weather[0].description}
          </p>

          {/* Extra Details Grid */}
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs sm:text-sm text-gray-700 w-full">
            <div>
              <p className="font-semibold">Min</p>
              <p>{convertTemp(day.main.temp_min)}</p>
            </div>
            <div>
              <p className="font-semibold">Max</p>
              <p>{convertTemp(day.main.temp_max)}</p>
            </div>
            <div>
              <p className="font-semibold">Humidity</p>
              <p>{day.main.humidity}%</p>
            </div>
            <div>
              <p className="font-semibold">Wind</p>
              <p>{convertWind(day.wind.speed)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ForecastCard;
