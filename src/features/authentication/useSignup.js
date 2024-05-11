import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupAPI({ email, password, fullName }),

    mutationKey: ["user"],
    onSuccess: () => {
      toast.success("you have successfully signed up");
      navigate("/dashboard");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isLoading };
}

export default useSignup;
