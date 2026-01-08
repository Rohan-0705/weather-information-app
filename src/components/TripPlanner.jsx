import { useState } from "react";

function TripPlanner() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState([]);

  // Summary logic
  const safeDays = days.filter((d) => d.risk === "safe").length;
  const riskyDays = days.filter((d) => d.risk === "risky").length;

  let summary = "";
  if (days.length > 0) {
    if (safeDays > riskyDays) {
      summary = "✅ This trip looks good overall. Mostly safe days.";
    } else if (safeDays === riskyDays) {
      summary = "⚠️ Mixed weather. Plan carefully.";
    } else {
      summary = "❌ High risk trip. Consider rescheduling.";
    }
  }

  const handleCheck = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const result = [];
    const current = new Date(start);

    while (current <= end) {
      const day = current.getDay(); // 0 = Sun, 6 = Sat

      const risk = day === 0 || day === 6 ? "risky" : "safe";

      result.push({
        date: current.toDateString(),
        risk,
      });

      current.setDate(current.getDate() + 1);
    }

    setDays(result);
  };

  return (
    <div style={{ marginTop: "28px" }}>
      <h3 style={{ marginBottom: "12px" }}>🧳 Trip Planner</h3>

      {/* Date pickers */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleCheck}>Check Weather</button>
      </div>

      {/* Results */}
      {days.length > 0 && (
        <div style={{ marginTop: "12px" }}>
          {days.map((d, index) => (
            <div
              key={index}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                marginBottom: "6px",
                background:
                  d.risk === "safe" ? "#e7f8ee" : "#fff4e5",
              }}
            >
              {d.date} — {d.risk === "safe" ? "🟢 Safe" : "🟡 Risky"}
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {days.length > 0 && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            borderRadius: "8px",
            background: "#eef6ff",
            fontWeight: "500",
          }}
        >
          {summary}
        </div>
      )}
    </div>
  );
}

export default TripPlanner;
