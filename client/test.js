import React from "react";
import "./Scss/Costumdroplist.scss";

export const Costumdroplist = ({ category, name, onChange }) => {
  const handleChange = (event) => {
    const selectedId = event.target.value;
    onChange(selectedId);
  };

  return (
    <div className="costumdroplist">
      <div className="select-container">
        <select onChange={handleChange}>
          <option value="" disabled>
            Select a category
          </option>

          {Array.isArray(category) ? (
            category.map((e) => (
              <option key={e._id} value={e._id}>
                {e.Cat_Name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Loading categories...
            </option>
          )}
        </select>
      </div>
    </div>
  );
};
