import { useState } from "react";

function SearchCity({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        style={{
          padding: "10px",
          width: "240px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <button
        type="submit"
        disabled={!city.trim()}
        style={{
          padding: "10px 18px",
          borderRadius: "6px",
          border: "none",
          cursor: city.trim() ? "pointer" : "not-allowed",
          backgroundColor: city.trim() ? "#0d6efd" : "#ccc",
          color: "#fff",
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchCity;
