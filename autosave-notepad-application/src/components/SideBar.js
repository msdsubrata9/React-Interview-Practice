export default function SideBar({
  handleAddNote,
  switchNote,
  activeNoteId,
  notes,
}) {
  return (
    <div className="sidebar">
      <button onClick={handleAddNote}>+ New Note</button>
      <div className="notes-title">
        {Object.entries(notes).map(([id, note]) => {
          return (
            <button
              key={id}
              onClick={() => switchNote(Number(id))}
              className={`note-title-btn ${
                activeNoteId === Number(id) && "active"
              }`}
            >
              {note.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
