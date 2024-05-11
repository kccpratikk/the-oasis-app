import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    mutationKey: ["bookings"],
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isDeleting };
}

export default useDeleteBooking;
