function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div style={{ marginTop: "24px" }}>
      <h3 style={{ marginBottom: "12px" }}>7-Day Forecast</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "16px",
        }}
      >
        {forecast.map((day) => (
          <div
            key={day.date}
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "14px", marginBottom: "6px" }}>
              {new Date(day.date).toDateString().slice(0, 10)}
            </div>

            <img
              src={`https:${day.icon}`}
              alt={day.condition}
              style={{ width: "48px" }}
            />

            <div style={{ fontSize: "13px", margin: "6px 0" }}>
              {day.condition}
            </div>

            <div style={{ fontSize: "14px", fontWeight: "bold" }}>
              {day.maxTemp}° / {day.minTemp}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
