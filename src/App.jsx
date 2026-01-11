import { useState, useEffect } from "react";
import API from "./api";

import SearchCity from "./components/SearchCity";
import CurrentWeather from "./components/CurrentWeather";
import WeatherSummary from "./components/WeatherSummary";
import TravelSuitability from "./components/TravelSuitability";
import Forecast from "./components/Forecast";
import TripPlanner from "./components/TripPlanner";
import TravelNotes from "./components/TravelNotes";
import WeatherSkeleton from "./components/WeatherSkeleton";
import Favorites from "./components/Favorites";
import { Toaster, toast } from "react-hot-toast";



function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");
  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // ---------------- SEARCH ----------------
  const handleSearch = async (cityName) => {
    try {
      setCity(cityName);
      localStorage.setItem("lastCity", cityName);

      setLoading(true);
      setError("");
      setHasSearched(true);

      const [weatherRes, forecastRes] = await Promise.all([
        API.get(`/weather/current?city=${cityName}`),
        API.get(`/weather/forecast?city=${cityName}`),
      ]);

      setWeather(weatherRes.data);
      setForecast(forecastRes.data.forecast.forecastday || []);
    } catch {
      setWeather(null);
      setForecast([]);
      setError("Invalid city name or service unavailable.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOAD FAVORITES ----------------
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      handleSearch(lastCity);
      return;
    }

    if (!navigator.geolocation) {
      handleSearch("Ujjain");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await API.get(
            `/location/reverse?lat=${latitude}&lon=${longitude}`
          );
          handleSearch(res.data.city);
        } catch {
          handleSearch("Ujjain");
        }
      },
      () => handleSearch("Ujjain")
    );
  }, []);

  // ---------------- FAVORITES ----------------
  const addFavorite = () => {
    if (!city || favorites.includes(city)) return;
    const updated = [...favorites, city];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

 const removeFavorite = (cityName) => {
  toast((t) => (
    <span>
      Remove <b>{cityName}</b> from favorites?
      <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
        <button
          onClick={() => {
            const updated = favorites.filter((c) => c !== cityName);
            setFavorites(updated);
            localStorage.setItem("favorites", JSON.stringify(updated));
            toast.dismiss(t.id);
          }}
          style={{
            padding: "6px 10px",
            background: "#ef4444",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Yes
        </button>

        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            padding: "6px 10px",
            background: "#e5e7eb",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </span>
  ), {
    duration: 5000,
  });
};


  const selectFavorite = (cityName) => {
    handleSearch(cityName);
  };

  // ---------------- UI ----------------
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #74ebd5, #acb6e5)",
        padding: "16px",
      }}
    >
      <Toaster
  position="bottom-center"
  toastOptions={{
    style: {
      borderRadius: "12px",
      background: "#333",
      color: "#fff",
    },
  }}
/>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>🌦️ Weather Information App</h1>

        <SearchCity onSearch={handleSearch} loading={loading} />

        {favorites.length > 0 && (
          <Favorites
            favorites={favorites}
            onSelect={selectFavorite}
            onRemove={removeFavorite}
          />
        )}

        {loading && <WeatherSkeleton />}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {!hasSearched && !loading && (
          <p style={{ textAlign: "center" }}>
            Search a city to start planning your trip
          </p>
        )}

        {weather && (
  <div className="weather-card">
    <CurrentWeather
      data={weather}
      city={city}
      favorites={favorites}
      onAdd={addFavorite}
      onRemove={removeFavorite}
    />

    <TravelSuitability weather={weather} city={city} />

    <Forecast data={forecast} />

    <TripPlanner
      forecast={forecast}
      city={city}
      weatherAvailable={!!weather}
    />

    <TravelNotes city={city} />
  </div>
)}

      </div>
    </div>
  );
}

export default App;
