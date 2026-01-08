import { useState, useEffect } from "react";
import API from "./api";

import SearchCity from "./components/SearchCity";
import CurrentWeather from "./components/CurrentWeather";
import WeatherSummary from "./components/WeatherSummary";
import TravelSuitability from "./components/TravelSuitability";
import Forecast from "./components/Forecast";
import TripPlanner from "./components/TripPlanner";
import TravelNotes from "./components/TravelNotes";




function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [forecast, setForecast] = useState([]);



  const handleSearch = async (city) => {
  try {
    setError("");
    setLoading(true);
    setWeather(null);
    setForecast([]);
    setHasSearched(true);

    


    const [weatherRes, forecastRes] = await Promise.all([
      API.get(`/weather/current?city=${city}`),
      API.get(`/weather/forecast?city=${city}`),
    ]);

    setWeather(weatherRes.data);
    setForecast(forecastRes.data);

  } catch (err) {
    setWeather(null);
    setForecast([]);

    if (err.response?.status === 404) {
      setError("Invalid city name. Please try again.");
    } else {
      setError("Weather service unavailable.");
    }
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const lastCity = localStorage.getItem("lastCity");

  if (lastCity) {
    handleSearch(lastCity);
  }
}, []);



  // Returning user
  // useEffect(() => {
  //   const lastCity = localStorage.getItem("lastCity");
  //   if (lastCity) {
  //     handleSearch(lastCity);
  //   }
  // }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #74ebd5, #acb6e5)",
        padding: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          🌦️ Weather Information App
        </h1>

        <SearchCity onSearch={handleSearch} loading={loading} />


        {loading && (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "40px",
      gap: "12px",
    }}
  >
    <div
      style={{
        width: "46px",
        height: "46px",
        border: "5px solid #e0e0e0",
        borderTop: "5px solid #0d6efd",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
    <p style={{ fontSize: "16px", opacity: 0.8 }}>
      Fetching weather data...
    </p>
  </div>
)}


        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            {error}
          </p>
        )}

        {/* FIRST TIME USER EMPTY STATE */}
       {!hasSearched && !loading && !error && !weather && (
          <div style={{ textAlign: "center", marginTop: "40px", opacity: 0.85 }}>
            <h2>Search a city to start planning your trip</h2>
            <p>Get weather insights and travel recommendations instantly.</p>
          </div>
        )}

        {/* WEATHER DATA */}
        {weather && (
  <div
    style={{
      background: "#e9f6ff",
      padding: "24px",
      borderRadius: "14px",
    }}
  >
    <WeatherSummary summary={weather.condition} />
<TravelSuitability weather={weather} />

{/* ✅ FORECAST GOES HERE */}
<Forecast data={forecast} />

<CurrentWeather data={weather} />
<TripPlanner />
<TravelNotes city={weather.city} />

  </div>
)}


      </div>
    </div>
  );
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

const fadeStyle = document.createElement("style");
fadeStyle.innerHTML = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;
document.head.appendChild(fadeStyle);



export default App;
