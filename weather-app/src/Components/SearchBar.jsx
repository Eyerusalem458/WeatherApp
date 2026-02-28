function SearchBar({ city, setCity, onSearch }) {
  return (
    <div className="flex mb-4 sm:mb-6 bg-white/70 rounded-xl overflow-hidden shadow-md w-full">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        className="w-full p-3 sm:p-4 bg-transparent focus:outline-none text-sm sm:text-base"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 px-4 sm:px-6 text-white hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
