function WeatherSummary({ summary }) {
  if (!summary) return null;

  // summary can be object or string
  const text =
    typeof summary === "string"
      ? summary
      : summary.text;

  return (
    <p style={{ fontSize: "18px", opacity: 0.8 }}>
      ☁️ {text}
    </p>
  );
}

export default WeatherSummary;
