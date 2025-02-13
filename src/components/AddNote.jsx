import axios from "axios";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const [error, setError] = useState();

  const addNewNoteMutation = useMutation({
    mutationFn: async (newNote) => {
      return await axios.post("http://localhost:3000/notes", newNote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      toast.success("Note successfully added");
      setTitle("");
      setContent("");
    },
    onError: (error) => {
      toast.error("There was an error adding the note");
      setError(error.response.statusText);
    },
  });

  const handleSubmit = () => {
    if (!title || !content) {
      toast.error("Your note is empty");
      return;
    }

    addNewNoteMutation.mutate({
      title,
      content,
    });
  };

  return (
    <div className="card bg-primary-subtle">
      <form onSubmit={handleSubmit}>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <div className="card-body form-group d-flex flex-column gap-2">
          <input
            className="form-control"
            type="text"
            name="Title"
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
            name={"Content"}
            placeholder="Take a note ..."
            aria-label={"Content"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-outline-dark"
            disabled={addNewNoteMutation.isPending}
          >
            {addNewNoteMutation.isPending ? "Adding note" : "Add note"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
