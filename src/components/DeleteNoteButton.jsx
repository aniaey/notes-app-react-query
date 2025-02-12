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
      toast.success("Note deleted");
    },
  });

  return (
    <>
      <button
        type="button"
        className="btn bg-danger"
        onClick={() => deleteNoteMutation.mutate()}
      >
        <BsTrash />
      </button>
    </>
  );
};

export default DeleteNoteButton;
