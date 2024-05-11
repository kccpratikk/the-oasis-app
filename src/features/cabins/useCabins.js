import { useQuery } from "@tanstack/react-query";
import { getCabines } from "../../services/apiCabins";

function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabines,
  });

  return { cabins, isLoading };
}

export default useCabins;
