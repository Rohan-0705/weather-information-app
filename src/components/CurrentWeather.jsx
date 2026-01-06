function CurrentWeather({ data }) {
  if (!data) return null;

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h2>Current Weather</h2>
      <p>🌡 Temperature: {data.temperature} °C</p>
      <p>☁️ Condition: {data.condition}</p>
      <p>💧 Humidity: {data.humidity}%</p>
      <p>🌬 Wind Speed: {data.windSpeed} km/h</p>
    </div>
  );
}

export default CurrentWeather;
