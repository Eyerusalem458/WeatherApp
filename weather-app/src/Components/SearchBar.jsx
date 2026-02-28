import React from "react";

function SearchBar({ city, setCity, onSearch }) {
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
