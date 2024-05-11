import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      toast.success("User has logged in successfully");
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message);
    },
  });

  return { login, isLoading };
}

export default useLogin;
