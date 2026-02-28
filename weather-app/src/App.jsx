import { useState } from "react";
import SearchBar from "./Components/SearchBar";
import WeatherCard from "./Components/WeatherCard";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import { fetchWeather } from "./Services/WeatherApi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setWeather(null);

    const result = await fetchWeather(city);

    if (result.error) {
      setError(result.error);
    } else {
      setWeather(result.data);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Weather App 🌦
        </h1>

        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
