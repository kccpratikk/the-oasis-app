import React from "react";
import Stat from "./Stat";
import { HiBriefcase } from "react-icons/hi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmStays }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  console.log(confirmStays);
  const checkins = confirmStays.length;

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={numBookings}
      />
    </>
  );
}

export default Stats;
