import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings updated succesfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateSetting, isUpdating };
}

export default useUpdateSetting;
