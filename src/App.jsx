import { useState } from "react";
import API from "./api";

import SearchCity from "./components/SearchCity";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import WeatherSummary from "./components/WeatherSummary";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    try {
      setError("");
      setLoading(true);

      // 1️⃣ Get location (city → lat/lon)
      const locationRes = await API.get(`/location?city=${city}`);
      const { lat, lon } = locationRes.data;

      // 2️⃣ Get current weather
      const weatherRes = await API.get(
        `/weather/current?lat=${lat}&lon=${lon}`
      );

      // 3️⃣ Get forecast
      const forecastRes = await API.get(
        `/weather/forecast?lat=${lat}&lon=${lon}`
      );

      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      setError("City not found or weather service unavailable");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "700px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      }}
    >
      <h1>🌦️ Weather Information App</h1>

      <SearchCity onSearch={handleSearch} />

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <WeatherSummary summary={weather?.summary} />
      <CurrentWeather data={weather} />
      <Forecast forecast={forecast} />
    </div>
  </div>
);


}

export default App;
