import { createContext, useContext } from "react";
import { useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (context === undefined)
    throw new Error("Context is used outside of the  provider");

  return context;
};

export { useSearchContext, SearchProvider };
