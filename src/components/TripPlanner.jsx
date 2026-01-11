import { useState } from "react";
import API from "../api";
import { toast } from "react-hot-toast";


function TripPlanner({ forecast, city, weatherAvailable }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState([]);

  const handleCheck = async () => {
    if (!startDate || !endDate || !city) {
      toast.error("Please search a city and select both dates");

      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // FREE PLAN → 3 DAY FORECAST
    const maxForecastDate = new Date(today);
    maxForecastDate.setDate(today.getDate() + 6); // today + next 2 days

    const result = [];
    let current = new Date(start);

    while (current <= end) {
      const dateStr = current.toISOString().split("T")[0];

      // 🔹 PAST → HISTORY
      if (current < today) {
        try {
          const res = await API.get(
            `/weather/history?city=${city}&date=${dateStr}`
          );

          const isRisky =
            res.data.condition.toLowerCase().includes("rain") ||
            res.data.maxTemp > 35;

          result.push({
            date: new Date(dateStr).toDateString(),
            risk: isRisky ? "risky" : "safe",
          });
        } catch {
          result.push({
            date: new Date(dateStr).toDateString(),
            risk: "unknown",
          });
        }
      }

      // 🔹 TODAY + NEXT 2 DAYS → FORECAST (REAL)
      else if (current <= maxForecastDate) {
        const forecastDay = forecast.find(
          (f) => f.date === dateStr
        );

        if (forecastDay) {
          const isRisky =
            forecastDay.day.condition.text
              .toLowerCase()
              .includes("rain") ||
            forecastDay.day.maxtemp_c > 35;

          result.push({
            date: new Date(dateStr).toDateString(),
            risk: isRisky ? "risky" : "safe",
          });
        } else {
          result.push({
            date: new Date(dateStr).toDateString(),
            risk: "forecast-unavailable",
          });
        }
      }

      // 🔹 BEYOND 3 DAYS → UNAVAILABLE
      else {
        result.push({
          date: new Date(dateStr).toDateString(),
          risk: "forecast-unavailable",
        });
      }

      current.setDate(current.getDate() + 1);
    }

    setDays(result);
  };

  return (
    <div style={{ marginTop: "20px", opacity: weatherAvailable ? 1 : 0.5 }}>
      <h3
  style={{
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "8px",
    opacity: 0.85,
  }}
>
  Trip planner
</h3>


      {!weatherAvailable && (
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
          Search a city to plan your trip
        </p>
      )}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
          flexWrap: "wrap",        // ✅ allow wrapping on mobile
        }}
      >

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ flex: "1 1 140px" }}   // ✅ responsive
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ flex: "1 1 140px" }}   // ✅ responsive
        />


        <button
  onClick={handleCheck}
  disabled={!weatherAvailable}
  style={{
    flex: "1 1 100%",                // ✅ full width on mobile
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: weatherAvailable ? "#1976d2" : "#cfd8dc",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: weatherAvailable ? "pointer" : "not-allowed",
    opacity: weatherAvailable ? 1 : 0.7,
  }}
>
  Check Weather
</button>

      </div>

      {weatherAvailable && (
        <p style={{ fontSize: "13px", opacity: 0.7 }}>
          Forecast available for next 3 days (free plan)
        </p>
      )}

      {days.map((d, i) => (
        <div key={i} style={{ marginTop: "8px" }}>
          {d.date} —{" "}
          {d.risk === "safe" && "🟢 Safe"}
          {d.risk === "risky" && "🟡 Risky"}
          {d.risk === "unknown" && "⚠️ No data"}
          {d.risk === "forecast-unavailable" && (
            <span style={{ color: "#6c757d" }}>
              ℹ️ Weather data not available
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default TripPlanner;
