import PinNoteButton from "./PinNoteButton.jsx";
import DeleteNoteButton from "./DeleteNoteButton.jsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditNote from "./EditNote.jsx";
import { useState } from "react";

const fetchNotes = async () => {
  const res = await axios.get("http://localhost:3000/notes");
  return res.data;
};

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const [pinnedNotes, setPinnedNotes] = useState({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const togglePinNote = (noteId) => {
    setPinnedNotes((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  const sortedNotes = notes
    ? [...notes].sort((a, b) => {
        const aPinnedNote = pinnedNotes[a.id] || false;
        const bPinnedNote = pinnedNotes[b.id] || false;
        return bPinnedNote - aPinnedNote;
      })
    : [];

  return (
    <>
      {sortedNotes.map((note) => (
        <div key={note.id}>
          <div className="card mb-2">
            <div className="card-body d-flex flex-row align-items-center justify-content-between col-12">
              <div className="col d-flex flex-column gap-2 justify-content-between">
                <div className="fw-bold">{note.title}</div>
                <div style={{ whiteSpace: "pre-line" }}>{note.content}</div>
              </div>
              <div className="col d-flex flex-column gap-2 align-items-end">
                <div>
                  <PinNoteButton
                    noteId={note.id}
                    isPinned={!!pinnedNotes[note.id]}
                    onTogglePin={togglePinNote}
                  />
                </div>
                <div>
                  <DeleteNoteButton noteId={note.id} />
                </div>
              </div>
            </div>
          </div>
          <EditNote note={note} />
        </div>
      ))}
    </>
  );
};

export default NotesList;
