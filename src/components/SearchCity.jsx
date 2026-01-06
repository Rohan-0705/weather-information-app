import { useState } from "react";

function SearchCity({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ width: "260px" }}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default SearchCity;
