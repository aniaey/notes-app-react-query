import axios from "axios";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const addNewNoteMutation = useMutation({
    mutationFn: async (newNote) => {
      return await axios.post("http://localhost:3000/notes", newNote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      toast.success("Notes added successfully.");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmit = () => {
    addNewNoteMutation.mutate({
      title: title,
      content: description,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="card bg-primary-subtle">
      <form onSubmit={handleSubmit}>
        <div className="card-body form-group d-flex flex-column gap-2">
          <input
            className="form-control"
            type="text"
            placeholder={"Title"}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={handleSubmit}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
