import React, { useState } from "react";
import "./Scss/SearchBar.scss";
import { FaSearch } from "react-icons/fa";

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
             <FaSearch className="search-icon" />
      </div>
    </div>
  );
};
