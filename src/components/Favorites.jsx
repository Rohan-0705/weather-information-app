function Favorites({ favorites, onSelect, onRemove }) {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      {favorites.map((city) => (
        <div
          key={city}
          onClick={() => onSelect(city)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "999px",
            background: "#ffffffcc",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <span>⭐</span>
          <span>{city}</span>

          <span
            onClick={(e) => {
              e.stopPropagation();
              onRemove(city);
            }}
            style={{
              marginLeft: "6px",
              cursor: "pointer",
              opacity: 0.6,
            }}
          >
            ✕
          </span>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
