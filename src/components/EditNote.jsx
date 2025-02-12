import axios from "axios";
import { useState } from "react";

const EditNote = ({ note }) => {
  const [newTitle, setNewTitle] = useState(note.title);
  const [newDescription, setNewDescription] = useState(note.content);

  const saveNote = async () => {
    return await axios.put(`http://localhost:3000/notes/${note.id}`, {
      title: newTitle,
      content: newDescription,
    });
  };

  return (
    <div className="card mb-2">
      <form onSubmit={saveNote}>
        <div className="card-body d-flex flex-column gap-2">
          <input
            className="form-control"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            style={{
              height: "80px",
            }}
            className="form-control"
            placeholder="Comments"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button
            type="button"
            className="btn bg-secondary-subtle"
            onClick={saveNote}
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
