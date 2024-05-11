import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin added succesfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //  reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createCabin, isCreating };
}

export default useCreateCabin;
