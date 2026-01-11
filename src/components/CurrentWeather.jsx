function CurrentWeather({ data, city, favorites, onAdd, onRemove }) {
  const isFavorite = favorites.includes(city);

  return (
    <div style={{ marginTop: "24px" }}>
      {/* City row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 700 }}>
          {city} — {data.current.temp_c}°C
        </h2>

        <button
          onClick={() => (isFavorite ? onRemove(city) : onAdd())}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "26px",
            cursor: "pointer",
            color: isFavorite ? "#f5c518" : "#999",
          }}
          aria-label="toggle favorite"
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <p style={{ margin: "8px 0", opacity: 0.8 }}>
        {data.current.condition}
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        <span>💧 {data.current.humidity}%</span>
        <span>💨 {data.current.wind_kph} km/h</span>
      </div>
    </div>
  );
}

export default CurrentWeather;
