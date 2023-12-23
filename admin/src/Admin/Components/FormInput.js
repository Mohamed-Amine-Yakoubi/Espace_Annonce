import React   from "react";
import "../Scss/FormInput.scss";
export const FormInput = (props) => {
  return (
    <div className="FormInput">
      <div className="input-container">
        <input {...props}   />
      </div>
    </div>
  );
};
