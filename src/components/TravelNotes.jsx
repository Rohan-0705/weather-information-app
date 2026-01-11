import { useEffect, useState } from "react";

function TravelNotes({ city }) {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  const storageKey = city ? `notes-${city.toLowerCase()}` : null;

  useEffect(() => {
    if (!city) return;

    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? JSON.parse(saved) : [];

    // 🔥 REMOVE EMPTY NOTES (BUG FIX)
    const cleaned = parsed.filter(n => n.text?.trim());
    setNotes(cleaned);
    localStorage.setItem(storageKey, JSON.stringify(cleaned));
  }, [city]);

  const saveNotes = (updated) => {
    setNotes(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const addNote = () => {
    if (!text.trim()) return; // 🔥 prevent empty note

    saveNotes([
      ...notes,
      {
        id: Date.now(),
        text: text.trim(),
      },
    ]);

    setText("");
  };

  const updateNote = (id, value) => {
    saveNotes(
      notes.map((n) =>
        n.id === id ? { ...n, text: value } : n
      )
    );
  };

  const deleteNote = (id) => {
    saveNotes(notes.filter((n) => n.id !== id));
  };

  if (!city) return null;

  return (
    <div style={{ marginTop: "24px" }}>
      <h3>📝 Travel Notes</h3>

      <textarea
        placeholder="Add a note for this city..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid #ccc",
          marginBottom: "10px",
          resize: "none",
        }}
      />

      <button
        onClick={addNote}
        style={{
          padding: "8px 16px",
          borderRadius: "10px",
          border: "none",
          background: "#1976d2",
          color: "#fff",
          fontWeight: "600",
          marginBottom: "12px",
        }}
      >
        Add Note
      </button>

      {/* Notes List */}
     {notes.map((note) => (
  <div
    key={note.id}
    style={{
      background: "#ffffff",
      padding: "14px 16px",
      borderRadius: "14px",
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}
  >
    {/* Note text */}
    <input
      value={note.text}
      onChange={(e) => updateNote(note.id, e.target.value)}
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        fontSize: "15px",
        background: "transparent",
      }}
    />

    {/* Delete button */}
    <button
      onClick={() => deleteNote(note.id)}
      title="Delete note"
      style={{
        border: "none",
        background: "#f1f3f5",
        color: "#333",
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "16px",
        flexShrink: 0,
      }}
    >
      ✕
    </button>
  </div>
))}

    </div>
  );
}

export default TravelNotes;
