function WeatherSummary({ summary }) {
  if (!summary) return null;

  return (
    <div
      style={{
        background: "#e3f2fd",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "6px",
      }}
    >
      <strong>Weather Summary:</strong> {summary}
    </div>
  );
}

export default WeatherSummary;
