function SkeletonBlock({ height, width = "100%" }) {
  return (
    <div
      style={{
        height,
        width,
        background:
          "linear-gradient(90deg, #f0f0f0 25%, #e6e6e6 37%, #f0f0f0 63%)",
        backgroundSize: "400% 100%",
        animation: "shimmer 1.4s ease infinite",
        borderRadius: "8px",
      }}
    />
  );
}

function WeatherSkeleton() {
  return (
    <div
      style={{
        background: "#ffffffcc",
        backdropFilter: "blur(10px)",
        padding: "28px",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
      }}
    >
      {/* Travel suitability strip */}
      <SkeletonBlock height="56px" />

      <div style={{ marginTop: "24px" }}>
        {/* Forecast cards */}
        <div style={{ display: "flex", gap: "16px" }}>
          <SkeletonBlock height="110px" width="100px" />
          <SkeletonBlock height="110px" width="100px" />
          <SkeletonBlock height="110px" width="100px" />
        </div>

        {/* City + temp */}
        <div style={{ marginTop: "24px" }}>
          <SkeletonBlock height="36px" width="60%" />
          <SkeletonBlock height="18px" width="30%" style={{ marginTop: 8 }} />
        </div>

        {/* Humidity / wind */}
        <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <SkeletonBlock height="18px" width="120px" />
          <SkeletonBlock height="18px" width="120px" />
        </div>

        {/* Trip planner */}
        <div style={{ marginTop: "28px" }}>
          <SkeletonBlock height="44px" />
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeleton;
