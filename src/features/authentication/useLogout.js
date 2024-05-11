import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  console.log("inside uselogout");

  const { mutate: logout, isLoading: isLogingout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Logout successfully");
      navigate("/login");
      queryClient.removeQueries();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout, isLogingout };
}

export default useLogout;
