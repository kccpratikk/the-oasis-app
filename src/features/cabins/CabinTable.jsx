import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  if (cabins.length === 0) return <Empty resource="cabins" />;

  const filter = searchParams.get("discount") || "all";

  //Filter

  let fileredCabins;
  if (filter === "all") fileredCabins = cabins;

  if (filter === "discount") {
    fileredCabins = cabins.filter((cabin) => cabin.discount !== 0);
  }

  if (filter === "no-discount") {
    fileredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  //sort

  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = fileredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  console.log(sortedCabins);
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
