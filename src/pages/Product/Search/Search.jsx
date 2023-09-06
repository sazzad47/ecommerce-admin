import { Input, List } from "antd";
import React, { useState, createContext } from "react";
import { ProductHooks } from "../../../Features";
import { Oval } from "react-loader-spinner";
import RenderedItem from "./RenderedItem";
import UpdateForm from "./Update/UpdateForm";
export const productSearchContext = createContext();

const Search = () => {
  const { useSearchProducts } = ProductHooks;

  const [timeoutId, setTimeoutId] = useState(null);
  const [selected, setSelected] = useState(null);

  const { Search, SearchData, SearchSuccess, query, setQuery, SearchLoading } =
    useSearchProducts();

  // debounce technique
  const handleSearch = (value) => {
    setQuery(value);

    // Clear the previous timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    const newTimeoutId = setTimeout(() => {
      Search();
    }, 500);

    // Store the new timeout ID
    setTimeoutId(newTimeoutId);
  };

  return (
    <productSearchContext.Provider
      value={{
        selected,
        select: (id) => {
          setQuery("");
          setSelected(id);
        },
      }}
    >
      <Input.Search
        placeholder="Search for products"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {SearchLoading && <Oval color="black" height={30} width={30} />}

      {!SearchLoading && SearchSuccess && (
        <List
          dataSource={SearchData?.data.products}
          renderItem={(item) => <RenderedItem item={item} key={item.id} />}
        />
      )}

      {selected && <UpdateForm />}
    </productSearchContext.Provider>
  );
};

export default Search;
