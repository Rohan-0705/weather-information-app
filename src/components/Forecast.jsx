function Forecast({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div style={{ marginBottom: "22px" }}>
      <h3
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
        }}
      >
        📅 Forecast
      </h3>

     <div
  className="forecast-scroll"
  style={{
    display: "flex",
    gap: "14px",
    overflowX: "auto",
    paddingBottom: "8px",
  }}
>

        {data.slice(0, 7).map((day, i) => {
          const isRisky =
            day.day.condition.text.toLowerCase().includes("rain") ||
            day.day.maxtemp_c > 35;

          return (
            <div
              key={i}
              style={{
                minWidth: "110px",
                background: isRisky ? "#fff4e5" : "#ffffff",
                borderRadius: "14px",
                padding: "12px",
                textAlign: "center",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontWeight: "600", marginBottom: "6px" }}>
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </div>

              <img
                src={day.day.condition.icon}
                alt=""
                style={{ width: "42px", marginBottom: "6px" }}
              />
              

              <div style={{ fontSize: "14px" }}>
                {Math.round(day.day.mintemp_c)}° /{" "}
                <strong>{Math.round(day.day.maxtemp_c)}°</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
