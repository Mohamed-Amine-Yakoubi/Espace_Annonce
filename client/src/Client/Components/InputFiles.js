import React, { useState } from "react";
import "./Scss/FileInput.scss";
import { AiFillPicture } from "react-icons/ai";
export const InputFiles = ({ onChange, label }) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const handleFileChange = (e) => {
    const file = e.target.files;
    setSelectedFile(Array.from(file));
    onChange(file);
  };
  return (
    <div className="custom-file-input">
      <div className="d-flex justify-content-center align-items-center">
      
        <div className="file-input-container">
          <input type="file" multiple onChange={handleFileChange} />
          <div className="file-input-icon">
            <AiFillPicture />
          </div>
        </div>
        <label>{label}</label>
      </div>
      <div className="image-previews">
        {selectedFile.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Selected File ${index + 1}`}
            className="image-preview"
          />
        ))}
      </div>
    </div>
  );
};
