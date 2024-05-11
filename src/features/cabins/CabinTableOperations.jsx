import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "discount",
            label: "with discount",
          },
          {
            value: "no-discount",
            label: "no discount",
          },
        ]}
      />
      <SortBy
        options={[
          {
            value: "name-asc",
            label: "Sort by Name (A-Z)",
          },
          {
            value: "name-dsc",
            label: "Sort by Name (Z-A)",
          },
          {
            value: "regularPrice-asc",
            label: "Sort by price (A-Z)",
          },
          {
            value: "regularPrice-dsc",
            label: "Sort by price (Z-A)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by capacity (A-Z)",
          },
          {
            value: "maxCapacity-dsc",
            label: "Sort by capacity (Z-A)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
