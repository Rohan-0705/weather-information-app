function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

 return (
  <div className="flex justify-center mb-8">
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border border-gray-300 rounded-2xl px-5 py-4 text-lg w-full
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg
                   hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  </div>
);

}

export default Forecast;
