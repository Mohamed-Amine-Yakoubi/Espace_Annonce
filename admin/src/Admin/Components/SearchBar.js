import React, { useState } from "react";

export const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchText(searchTerm);
    onSearch(searchTerm);
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
