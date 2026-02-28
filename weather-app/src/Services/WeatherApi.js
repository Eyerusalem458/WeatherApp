const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// 🌆 Fetch weather by city name
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

// 📍 Fetch weather by GPS coordinates
export const fetchWeatherByCoords = async (lat, lon) => {
  if (!lat || !lon) return { error: "Invalid location" };

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );

    if (!res.ok) {
      return { error: "Location weather not found" };
    }

    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: err.message };
  }
};

// 📅 Fetch 5-day forecast
export const fetchForecast = async (city) => {
  if (!city) return { error: "Please enter a city name" };

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city,
      )}&appid=${API_KEY}&units=metric`,
    );

    if (!res.ok) {
      return { error: "Forecast not found" };
    }

    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: err.message };
  }
};
