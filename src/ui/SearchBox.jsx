import React, { useState } from "react";
import Input from "./Input";
import { useSearchParams } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";

function SearchBox() {
  const { query, setQuery } = useSearchContext();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Type name to search"
        value={query}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

export default SearchBox;
