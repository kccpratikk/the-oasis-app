import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited succesfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { editCabin, isEditing };
}

export default useEditCabin;
