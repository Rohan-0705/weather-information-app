function TravelSuitability({ weather, city }) {
  if (!weather) return null;

  const { temp_c, humidity, wind_kph, condition } = weather.current;

  let status = "GOOD FOR TRAVEL";
  let color = "#22c55e"; // green
  let emoji = "🟢";
  let reason = "Comfortable weather conditions";

  if (
    condition.toLowerCase().includes("rain") ||
    humidity > 80 ||
    wind_kph > 30
  ) {
    status = "NOT RECOMMENDED";
    color = "#ef4444"; // red
    emoji = "🔴";
    reason = "Rain or harsh weather conditions";
  } else if (temp_c > 32 || humidity > 65) {
    status = "ACCEPTABLE";
    color = "#f59e0b"; // amber
    emoji = "🟡";
    reason = "Warm or slightly humid weather";
  }

  return (
    <div
      style={{
        marginTop: "16px",
        marginBottom: "22px",
        padding: "18px",
        borderRadius: "16px",
        background: color,
        color: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          fontSize: "18px",
          fontWeight: 700,
          letterSpacing: "0.4px",
          marginBottom: "4px",
        }}
      >
        {emoji} {status}
      </div>

      <div style={{ fontSize: "14px", opacity: 0.95 }}>
        {reason}
      </div>
    </div>
  );
}

export default TravelSuitability;
