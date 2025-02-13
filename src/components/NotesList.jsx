import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditNote from "./EditNote.jsx";
import { useEffect, useState } from "react";
import Note from "./Note.jsx";
import AddNote from "./AddNote.jsx";

const fetchNotes = async () => {
  const res = await axios.get("http://localhost:3000/notes");
  return res.data;
};

const NotesList = () => {
  const [selectedNote, setSelectedNote] = useState(null);

  const {
    data: notes,
    isPending,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const [pinnedNotes, setPinnedNotes] = useState(() => {
    const saved = localStorage.getItem("pinnedNotes");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("pinnedNotes", JSON.stringify(pinnedNotes));
  }, [pinnedNotes]);

  const togglePinNote = (noteId) => {
    setPinnedNotes((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  if (isPending) return "Loading...";
  if (error) return <div>An error has occurred: {error.message}</div>;

  const sortedNotes = [...notes].reverse();

  const notesWithPinned = sortedNotes
    ? [...sortedNotes].sort((a, b) => {
        const aPinnedNote = pinnedNotes[a.id] || false;
        const bPinnedNote = pinnedNotes[b.id] || false;
        return bPinnedNote - aPinnedNote;
      })
    : [];

  return (
    <>
      <AddNote />
      <ul className="list-group mt-2">
        {notesWithPinned.map((note) => (
          <li className="list-group" key={note.id}>
            <Note
              note={note}
              isPinned={!!pinnedNotes[note.id]}
              togglePinNote={togglePinNote}
              onClick={() => {
                setSelectedNote((prev) => (prev === note.id ? null : note.id));
              }}
            />
            {selectedNote === note.id && (
              <EditNote note={note} onSave={() => setSelectedNote(null)} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotesList;
