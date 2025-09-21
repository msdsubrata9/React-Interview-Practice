import { useEffect, useState } from "react";
import Notes from "./components/Notes";
import SideBar from "./components/SideBar";
import "./styles.css";

const MAX_WORDS = 10;
function getSavedNotes() {
  try {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    console.error("Failed to parse notes:", e);
    return [];
  }
}

export default function App() {
  const savedNotes = getSavedNotes();
  const [notes, setNotes] = useState(savedNotes);
  const [activeNoteId, setActiveNoteId] = useState(
    Object.keys(savedNotes).length > 0
      ? Number(Object.keys(savedNotes)[0])
      : null
  );
  const [saveMsg, setSaveMsg] = useState("");

  function handleTextAreaChange(e) {
    const newContent = e.target.value;

    setNotes((prevNotes) => {
      const existingNote = prevNotes[activeNoteId];

      if (!existingNote && newContent.trim() === "") {
        return prevNotes;
      }

      return {
        ...prevNotes,
        [activeNoteId]: {
          content: newContent,
          title: newContent.split(" ")[0] || "Untitled",
        },
      };
    });
  }

  useEffect(() => {
    setSaveMsg("Saving...");
    const t = setTimeout(() => {
      localStorage.setItem("notes", JSON.stringify(notes));
      setSaveMsg("Saved");
    }, 2000);

    return () => clearTimeout(t);
  }, [notes]);

  function handleClearActiveNote() {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [activeNoteId]: { title: "Untitled", content: "" },
    }));
  }

  function handleSaveActiveNote() {
    const note = notes[activeNoteId];
    if (!note || note.content.trim() === "") {
      return;
    }
    setSaveMsg("Saved");
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function handleAddNote() {
    setNotes((prevNotes) => {
      let updated = { ...prevNotes };

      // If current active note is empty, delete it
      const currentNote = prevNotes[activeNoteId];
      if (currentNote && currentNote.content.trim() === "") {
        delete updated[activeNoteId];
      }

      // Now create the new note
      const id = Date.now();
      updated[id] = { title: "Untitled", content: "" };

      // set the new note active
      setActiveNoteId(id);

      return updated;
    });
  }

  function switchNote(newId) {
    setNotes((prevNotes) => {
      const note = prevNotes[activeNoteId];
      if (note && note.content.trim() === "") {
        const updatedNotes = { ...prevNotes };
        delete updatedNotes[activeNoteId];
        return updatedNotes;
      }
      return prevNotes;
    });
    setActiveNoteId(newId);
  }

  const activeNote = notes[activeNoteId] || { title: "", content: "" };
  const textareaValue = activeNote.content;
  const textsArray = textareaValue.trim().split(" ");
  const liveCount = textareaValue === "" ? 0 : textsArray.length;
  const errMsg = liveCount > MAX_WORDS ? "Max Words Exceeds" : "";

  return (
    <div className="App">
      <h1>Notepad</h1>
      <div className="notepad-container">
        <SideBar
          handleAddNote={handleAddNote}
          switchNote={switchNote}
          notes={notes}
          activeNoteId={activeNoteId}
        />
        <div className="notes-container">
          <Notes
            saveMsg={saveMsg}
            textareaValue={textareaValue}
            handleTextAreaChange={handleTextAreaChange}
          />
          <h3>{errMsg ? errMsg : `${liveCount} / ${MAX_WORDS}`}</h3>
          <button onClick={handleSaveActiveNote}>Save Now</button>
          <button onClick={handleClearActiveNote}>Clear</button>
        </div>
      </div>
    </div>
  );
}
