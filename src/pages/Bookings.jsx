import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Input from "../ui/Input";
import SearchBox from "../ui/SearchBox";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>

        <BookingTableOperations />
      </Row>
      
      <BookingTable />
    </>
  );
}

export default Bookings;
