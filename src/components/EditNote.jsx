import axios from "axios";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const EditNote = ({ note }) => {
  const [newTitle, setNewTitle] = useState(note.title);
  const [newDescription, setNewDescription] = useState(note.content);

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    saveNoteMutation.mutate({
      title: newTitle,
      content: newDescription,
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
      queryClient.invalidateQueries(["notes"]);
      toast.success("Note edited");
    },
  });

  return (
    <div className="card mb-2">
      <form onSubmit={handleSubmit}>
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
            onClick={handleSubmit}
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
