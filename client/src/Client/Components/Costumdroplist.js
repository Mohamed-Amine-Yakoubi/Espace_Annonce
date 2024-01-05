// Costumdroplist.js
import React, { useEffect, useState } from "react";
import "./Scss/Costumdroplist.scss";
import axios from "axios";

export const Costumdroplist = ({
  apiUrl,
  labelKey,
  idKey,
  valueKey,
  onSelect,
  imgKey
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        setOptions(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [apiUrl]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(
      (option) => option[valueKey] === selectedValue
    );

    onSelect(selectedOption ? selectedOption[idKey] : null);
  };

  return (
    <div className="costumdroplist">
      <div className="select-container">
        <select onChange={handleSelectChange} >
        <option disabled value=""  selected>
            Category
          </option>
          {options.map((option) => (
     
            <option key={option[idKey]} value={option[valueKey]}>
                
              {option[labelKey]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
