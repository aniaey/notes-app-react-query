import { BsPin } from "react-icons/bs";
import { BsPinFill } from "react-icons/bs";

const PinNoteButton = ({ noteId, isPinned, onTogglePin }) => {
  return (
    <>
      {isPinned ? (
        <button
          type="button"
          className="btn bg-dark text-white"
          title={"Unpin note"}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(noteId);
          }}
        >
          <BsPinFill />
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-dark"
          title={"Pin note"}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(noteId);
          }}
        >
          <BsPin />
        </button>
      )}
    </>
  );
};

export default PinNoteButton;
