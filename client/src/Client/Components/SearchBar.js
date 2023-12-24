import React, { useState } from "react";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <div className="SearchBar">
      <div className="container input-container">
        <input
          className="searchbar"
          type="text"
          placeholder="Search.."
          value={searchText}
          onChange={handleInputChange}
        />
        <i className="bi bi-search"></i>
      </div>
    </div>
  );
};
