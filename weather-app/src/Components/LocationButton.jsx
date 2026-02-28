function LocationButton({ onLocationSearch }) {
  return (
    <button
      onClick={onLocationSearch}
      className="w-full mb-4 sm:mb-6 bg-white/70 text-gray-800 p-2 sm:p-3 rounded-lg shadow hover:bg-white transition text-sm sm:text-base"
    >
      📍 Use My Location
    </button>
  );
}

export default LocationButton;
