import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const DeleteNoteButton = ({ noteId }) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: async () => {
      return await axios.delete(`http://localhost:3000/notes/${noteId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      toast.success("Note successfully deleted");
    },
    onError: () => toast.error("There was an error deleting the note"),
  });

  return (
    <>
      <button
        type="button"
        className="btn bg-danger"
        disabled={deleteNoteMutation.isPending}
        title={deleteNoteMutation.isPending ? "Deleting note" : "Delete note"}
        onClick={(e) => {
          e.stopPropagation();
          deleteNoteMutation.mutate();
        }}
      >
        {deleteNoteMutation.isPending ? "Deleting note" : <BsTrash />}
      </button>
    </>
  );
};

export default DeleteNoteButton;
