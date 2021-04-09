import React, { useContext } from "react";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Input } from "react-rainbow-components";
import { FaSearch } from "react-icons/fa";

function GlobalSearchInput() {
  const {
    globalSearch,
    setGlobalSearch,
    showGlobalSearch,
    setShowGlobalSearch,
  } = useContext(ApplicationContext);

  function handleChange(e) {
    let value = e.target.value;
    setGlobalSearch(value);
  }

  const inputStyles = {
    width: "40%",
    marginRight: "19px",
  };

  return (
    <>
      {showGlobalSearch ? (
        <Input
          style={inputStyles}
          value={globalSearch}
          onChange={handleChange}
          hideLabel
          placeholder="Faça uma busca"
          iconPosition="right"
          icon={<FaSearch />}
        />
      ) : null}
    </>
  );
}

export default GlobalSearchInput;
