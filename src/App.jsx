import { useState } from "react";
import API from "./api";

import SearchCity from "./components/SearchCity";
import CurrentWeather from "./components/CurrentWeather";
import WeatherSummary from "./components/WeatherSummary";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
  try {
    setError("");
    setLoading(true);

    const res = await API.get(`/weather/current?city=${city}`);

    setWeather(res.data);
  } catch (err) {
    setError("City not found or weather service unavailable");
    setWeather(null);
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(to right, #74ebd5, #acb6e5)",
      }}
    >
      <h1>🌦️ Weather Information App</h1>

      <SearchCity onSearch={handleSearch} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <WeatherSummary summary={weather?.condition} />
      <CurrentWeather data={weather} />
    </div>
  );
}

export default App;
