// src/services/weatherApi.js
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (city) => {
  if (!city) return { error: "Please enter a city name" };

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city,
      )}&appid=${API_KEY}&units=metric`,
    );

    if (!res.ok) {
      if (res.status === 404) {
        return { error: "City not found" };
      } else {
        return { error: "API Error: " + res.status };
      }
    }

    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: err.message };
  }
};
