import axios from "axios";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const EditNote = ({ note, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    saveNoteMutation.mutate({
      ...note,
      title,
      content,
    });
  };

  const saveNoteMutation = useMutation({
    mutationFn: async (editedNote) => {
      return await axios.put(
        `http://localhost:3000/notes/${note.id}`,
        editedNote,
      );
    },
    onSuccess: () => {
      onSave(note);
      queryClient.invalidateQueries(["notes"]);
      toast.success("Note successfully saved");
    },
    onError: () => {
      toast.error("There was an error saving the note");
    },
  });

  return (
    <div className="card mb-2">
      <form onSubmit={handleSubmit}>
        <div className="card-body d-flex flex-column gap-2">
          <input
            className="form-control"
            type="text"
            aria-label={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            style={{
              height: "80px",
            }}
            className="form-control"
            placeholder="Take a note ..."
            aria-label={"Content"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="button"
            className="btn bg-secondary-subtle"
            onClick={handleSubmit}
            disabled={saveNoteMutation.isPending}
          >
            {saveNoteMutation.isPending ? "Saving ..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
