import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get("last") || 7);

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", numDays],
  });

  const confirmStays = stays?.filter((stay) => stay.status !== "unconfirmed");

  return { stays, confirmStays, isLoading, numDays };
}

export default useRecentStays;
