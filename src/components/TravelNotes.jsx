import { useState, useEffect } from "react";

function TravelNotes({ city }) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // Load notes for city
  useEffect(() => {
    if (!city) return;
    const saved = JSON.parse(
      localStorage.getItem(`notes-${city}`) || "[]"
    );
    setNotes(saved);
  }, [city]);

  const addNote = () => {
    if (!note.trim()) return;

    const updated = [...notes, note];
    setNotes(updated);
    setNote("");

    localStorage.setItem(
      `notes-${city}`,
      JSON.stringify(updated)
    );
  };

  return (
    <div style={{ marginTop: "28px" }}>
      <h3>📝 Travel Notes</h3>

      <textarea
        rows="3"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note for this city..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          marginTop: "8px",
        }}
      />

      <button
        onClick={addNote}
        style={{ marginTop: "8px" }}
      >
        Add Note
      </button>

      {/* Notes List */}
      {notes.length > 0 && (
        <ul style={{ marginTop: "12px" }}>
          {notes.map((n, i) => (
            <li key={i} style={{ marginBottom: "6px" }}>
              • {n}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TravelNotes;
