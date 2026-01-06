function CurrentWeather({ data }) {
  if (!data) return null;

  return (
    <div className="bg-gray-100 rounded-2xl p-5 mb-6 flex items-center gap-4">
      <img
        src={data.icon}
        alt="weather icon"
        className="w-20 h-20"
      />

      <div>
        <p className="text-4xl font-bold">{data.temperature}°C</p>
        <p className="capitalize text-gray-600">{data.condition}</p>

        <div className="mt-2 text-sm text-gray-600">
          <p>💧 Humidity: {data.humidity}%</p>
          <p>💨 Wind: {data.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
