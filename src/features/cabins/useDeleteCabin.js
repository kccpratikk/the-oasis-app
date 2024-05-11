import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabines } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteCabines(id),
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, mutate };
}
