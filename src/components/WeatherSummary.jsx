function WeatherSummary({ summary }) {
  if (!summary) return null;

  return (
    <div
      style={{
        background: "#dff1ff",
        padding: "10px 14px",
        borderRadius: "8px",
        fontSize: "14px",
        marginBottom: "16px",
      }}
    >
      <strong>Weather Summary:</strong> {summary}
    </div>
  );
}

export default WeatherSummary;
