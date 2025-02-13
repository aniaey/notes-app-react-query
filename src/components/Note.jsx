import PinNoteButton from "./PinNoteButton.jsx";
import DeleteNoteButton from "./DeleteNoteButton.jsx";

const Note = ({ note, isPinned, togglePinNote, onClick }) => {
  return (
    <div className="card mb-2" style={{ cursor: "pointer" }} onClick={onClick}>
      <div className="card-body d-flex flex-row align-items-center justify-content-between col-12">
        <div className="flex-grow-1 d-flex flex-column gap-2 justify-content-between">
          <h3>{note.title}</h3>
          <div style={{ whiteSpace: "pre-line" }}>{note.content}</div>
        </div>
        <div className="col d-flex flex-column gap-2 align-items-end">
          <div>
            <PinNoteButton
              noteId={note.id}
              isPinned={isPinned}
              onTogglePin={togglePinNote}
            />
          </div>
          <div>
            <DeleteNoteButton noteId={note.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
