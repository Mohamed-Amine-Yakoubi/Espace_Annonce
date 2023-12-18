import React, { useState } from "react";
import { FormInput } from "../../Components/FormInput";
import "../ScreensScss/AddAnnonce.scss";
import { Costumdroplist } from "../../Components/Costumdroplist";
import { CostumButton } from "../../Components/CostumButton";
import axios from "axios";
import { useCookies } from "react-cookie";

export const AddAnnonce = () => {
  const id_user = localStorage.getItem("userID");
  const [cookies] = useCookies(["access_token"]);
 

  const [error, setError] = useState("");
  const apiUrl = "http://localhost:3000/project_announcement/getAllCategories";

  const [product, setProduct] = useState({
    Product_Name: "",
    Product_Description: "",
    Product_Price: "",
    Product_Category: "",
    Product_Picture: "",
    createdBy: id_user,
  });
  /************************************** */
 

 
  const handleSelectedCategoryId = (selectedCategoryId) => {
    setProduct({ ...product, Product_Category: selectedCategoryId || "" });
  };
  const handleGetFiles = (e) => {
    setProduct(prevProduct => ({ ...prevProduct, Product_Picture: e.target.files[0] }));
  };
  
  const handlechangevalue = (e) => {
    setProduct(prevProduct => ({ ...prevProduct, [e.target.name]: e.target.value }));
  };
  

  const handleAddAnnonce = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/project_announcement/AddProducts", product, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      })
      .catch((error) => {
        console.error("Error adding announcement:", error);

        setError(error.response?.data?.message || "An error occurred");
      });
  };

  /********************************** */
  return (
    <div className="container ">
      <div className="AddAnnonce    ">
        <h1>Create an ad</h1>
        {error ? (
          <p className="alert alert-danger text-center">{error}</p>
        ) : null}

        <form onSubmit={handleAddAnnonce}>
          <div className="inputfield">
            <label className="label  ">What is the title of your ad?*</label>
            <FormInput
              className="Forminput  "
              type="text"
              placeholder="Enter the title"
              name="Product_Name"
              onChange={handlechangevalue}
            />
          </div>
          <div className="inputfield">
            <label className="label  ">Category*</label>

            <Costumdroplist
              apiUrl={apiUrl}
              labelKey="Cat_Name"
              idKey="_id"
              valueKey="_id"
              onSelect={handleSelectedCategoryId}
            />
          </div>
          <div className="inputfield">
            <label className="label  ">Description ad *</label>
            <FormInput
              className="Forminput  "
              type="text"
              name="Product_Description"
              placeholder="Describe your product or service in detail"
              onChange={handlechangevalue}
            />
          </div>
          <div className="inputfield">
            <label className="label  ">What is your price? *</label>
            <FormInput
              className="Forminput  "
              type="text"
              name="Product_Price"
              placeholder="Enter the price in dinars"
              onChange={handlechangevalue}
            />
          </div>
          <div className="inputfield">
            <label className="label  ">Picture *</label>
            <FormInput
              className="Forminput  "
              type="file"
              name="Product_Picture"
              placeholder="Enter picture"
              onChange={handleGetFiles}
            />
          </div>
          <CostumButton className="ButtonSubmit" type="submit">
            Publish
          </CostumButton>
        </form>
      </div>
    </div>
  );
};
