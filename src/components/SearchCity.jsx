import { useState } from "react";

function SearchCity({ onSearch, loading }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
  };

  const clearInput = () => {
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "12px",
        padding: "0 12px",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: "#fff",
          borderRadius: "14px",
          padding: "10px 14px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* 📍 icon */}
        <span style={{ marginRight: "10px", opacity: 0.6 }}>📍</span>

        {/* Input */}
        <input
          type="text"
          placeholder="Search city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "16px",
            background: "transparent",
          }}
        />

        {/* ✕ Clear */}
        {city && (
          <button
            type="button"
            onClick={clearInput}
            aria-label="Clear"
            style={{
              position: "absolute",
              right: "14px",
              border: "none",
              background: "transparent",
              fontSize: "18px",
              cursor: "pointer",
              opacity: 0.6,
            }}
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchCity;
