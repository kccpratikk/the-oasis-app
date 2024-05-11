import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashborardFilter from "./../features/dashboard/DashboardFilter";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashborardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
