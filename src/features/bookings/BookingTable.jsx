import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useSearchContext } from "../../context/SearchContext";
import { useEffect } from "react";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  const { query } = useSearchContext();

  console.log(bookings);

  if (isLoading) return <Spinner />;
  if (bookings.length === 0) return <Empty resource="booking" />;

  const filterData = bookings?.filter((booking) => {
    const str = booking.guests.fullName;

    if (str.toUpperCase().startsWith(query.toUpperCase())) return true;
    return false;
  });

  console.log(filterData);

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filterData}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
