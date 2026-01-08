function CurrentWeather({ data }) {
  if (!data) return null;

  return (
    <div style={{ marginTop: "24px" }}>
      {/* Temperature */}
      <div
        style={{
          fontSize: "56px",
          fontWeight: "700",
          lineHeight: "1",
        }}
      >
        {data.temperature}°C
      </div>

      {/* Condition */}
      <div
        style={{
          fontSize: "18px",
          marginTop: "8px",
          marginBottom: "16px",
          opacity: 0.9,
        }}
      >
        ☁️ {data.condition}
      </div>

      {/* Meta info */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          fontSize: "15px",
          opacity: 0.85,
        }}
      >
        <span>💧 {data.humidity}% humidity</span>
        <span>💨 {data.windSpeed} km/h wind</span>
      </div>
    </div>
  );
}

export default CurrentWeather;
