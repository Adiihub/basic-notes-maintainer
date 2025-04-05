import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [newNote, setNewNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() === "") {
      alert("Please enter a note!");
      return;
    }

    const noteData = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      content: newNote,
      date: new Date().toLocaleString(),
    };

    setNotes([...notes, noteData]);
    setNewNote("");
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="note-app">
          <div className="search">
            <input                                     
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="type to search"
              className="search-input"
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your note here..."
              className="note-input"
            />
            <button onClick={addNote} className="add-button">
              Add Note
            </button>
          </div>

          <div className="notes-list">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <div key={note.id} className="note-card">
                  <div>
                    <p className="note-text">{note.content}</p>
                    <span className="note-date">{note.date}</span>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="no-notes">No Notes</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
