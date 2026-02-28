import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import SearchBar from "./Components/SearchBar";
import WeatherCard from "./Components/WeatherCard";
import ForecastCard from "./Components/ForecastCard";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import LocationButton from "./Components/LocationButton";
import WeatherBackground from "./Components/WeatherBackground";
import {
  fetchWeather,
  fetchWeatherByCoords,
  fetchForecast,
} from "./Services/WeatherApi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("current");
  const [tabAnimation, setTabAnimation] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [unit, setUnit] = useState("C"); // Celsius by default

  // Automatic night detection
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    setIsNight(hours < 6 || hours >= 18);
  }, [weather]);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);

    const result = await fetchWeather(city);
    const forecastResult = await fetchForecast(city);

    if (result.error) {
      setError(result.error);
    } else {
      setWeather(result.data);
      setForecast(forecastResult.data);
      setActiveTab("current");
      setTabAnimation(true);
      setTimeout(() => setTabAnimation(false), 300);
    }
    setLoading(false);
  };

  const handleLocationSearch = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const result = await fetchWeatherByCoords(latitude, longitude);

        if (result.error) {
          setError(result.error);
          setLoading(false);
          return;
        }

        const cityName = result.data.name;
        const forecastResult = await fetchForecast(cityName);

        setWeather(result.data);
        setForecast(forecastResult.data);
        setCity(cityName);
        setActiveTab("current");
        setTabAnimation(true);
        setTimeout(() => setTabAnimation(false), 300);
        setLoading(false);
      },
      () => {
        setError("Unable to retrieve your location");
        setLoading(false);
      },
    );
  };

  const getBackground = () => {
    if (!weather) return "from-blue-400 to-indigo-600";

    const main = weather.weather[0].main.toLowerCase();

    if (main.includes("cloud")) return "from-gray-400 to-blue-500";
    if (main.includes("rain") || main.includes("drizzle"))
      return "from-slate-500 to-gray-700";
    if (main.includes("clear")) return "from-yellow-400 to-orange-500";
    if (main.includes("snow")) return "from-blue-200 to-white";
    if (
      main.includes("mist") ||
      main.includes("fog") ||
      main.includes("haze") ||
      main.includes("smoke")
    )
      return "from-gray-300 to-gray-500";
    if (main.includes("thunderstorm")) return "from-gray-700 to-gray-900";

    return "from-blue-400 to-indigo-600";
  };

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setTabAnimation(true);
      setActiveTab(tab);
      setTimeout(() => setTabAnimation(false), 300);
    }
  };

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeTab === "current") handleTabClick("forecast");
    },
    onSwipedRight: () => {
      if (activeTab === "forecast") handleTabClick("current");
    },
    trackMouse: true,
  });

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getBackground()} flex items-center justify-center p-4 relative overflow-hidden`}
    >
      {/* Animated Weather Background */}
      <WeatherBackground
        condition={weather?.weather[0].main}
        isNight={isNight}
      />

      <div className="bg-white/20 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-lg relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Weather App 🌦
        </h1>

        {/* °C / °F Toggle */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              unit === "C" ? "bg-white text-gray-800" : "bg-white/30 text-white"
            }`}
            onClick={() => setUnit("C")}
          >
            °C
          </button>
          <button
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              unit === "F" ? "bg-white text-gray-800" : "bg-white/30 text-white"
            }`}
            onClick={() => setUnit("F")}
          >
            °F
          </button>
        </div>

        <LocationButton onLocationSearch={handleLocationSearch} />
        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {(weather || forecast) && (
          <>
            {/* Tabs */}
            <div className="relative flex justify-center gap-4 mt-4 mb-2 flex-wrap">
              <button
                onClick={() => handleTabClick("current")}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  activeTab === "current"
                    ? "bg-white text-gray-800"
                    : "bg-white/40 text-white"
                }`}
              >
                Current
              </button>

              <button
                onClick={() => handleTabClick("forecast")}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  activeTab === "forecast"
                    ? "bg-white text-gray-800"
                    : "bg-white/40 text-white"
                }`}
              >
                5-Day Forecast
              </button>
            </div>

            {/* Tab Content with swipe + animation */}
            <div
              {...swipeHandlers}
              className={`transition-all duration-300 transform ${
                tabAnimation
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {activeTab === "current" && weather && (
                <WeatherCard weather={weather} unit={unit} />
              )}

              {activeTab === "forecast" && forecast && (
                <ForecastCard forecast={forecast} unit={unit} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
