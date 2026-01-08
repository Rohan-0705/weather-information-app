function TravelSuitability({ weather }) {
  if (!weather) return null;

  const { temperature, condition } = weather;

  let status = "Good for travel";
  let message = "Pleasant weather conditions.";
  let color = "#22c55e"; // green

  const conditionText = condition.toLowerCase();

  // ❄️ Cold
  if (temperature < 5) {
    status = "Not recommended";
    message = "Very cold weather. Travel may be uncomfortable.";
    color = "#ef4444"; // red
  }

  // 🔥 Very hot
  else if (temperature > 35) {
    status = "Not recommended";
    message = "Extreme heat. Avoid outdoor travel.";
    color = "#ef4444";
  }

  // 🌧️ Rain / Storm
  else if (
    conditionText.includes("rain") ||
    conditionText.includes("storm") ||
    conditionText.includes("thunder")
  ) {
    status = "Acceptable";
    message = "Rain expected. Plan with caution.";
    color = "#f59e0b"; // yellow
  }

  // 🌥️ Cloudy
  else if (
  conditionText.includes("cloud") ||
  conditionText.includes("overcast")
) {
  status = "Acceptable";
  message = "Cloudy or overcast weather, generally okay for travel.";
  color = "#f59e0b";
}


  return (
    <div
      style={{
        borderLeft: `6px solid ${color}`,
        background: "#fff",
        padding: "14px 16px",
        borderRadius: "10px",
        margin: "16px 0",
      }}
    >
      <strong>{status}</strong>
      <div style={{ fontSize: "14px", marginTop: "4px", opacity: 0.85 }}>
        {message}
      </div>
    </div>
  );
}

export default TravelSuitability;
