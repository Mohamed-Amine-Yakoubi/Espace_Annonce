import React, { useState } from "react";
import { FormInput } from "../../Components/FormInput";
import "../ScreensScss/AddAnnonce.scss";
import { Costumdroplist } from "../../Components/Costumdroplist";
import { CostumButton } from "../../Components/CostumButton";
import axios from "axios";
import { useCookies } from "react-cookie";
import { InputFiles } from "../../Components/InputFiles";

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

  const handlechangevalue = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFileChange = (file) => {
  setProduct((prevProduct) => ({ ...prevProduct, Product_Picture: file[0] }));

  };

  const handleAddAnnonce = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Product_Name", product.Product_Name);
    formData.append("Product_Description", product.Product_Description);
    formData.append("Product_Price", product.Product_Price);
    formData.append("Product_Category", product.Product_Category);
    formData.append("Product_Picture", product.Product_Picture);
    formData.append("createdBy", product.createdBy);

    try {
      const response = await axios.post(
        "http://localhost:3000/project_announcement/AddProducts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      console.log("Announcement added successfully:", response.data);
      // Clear form or redirect to another page on success
    } catch (error) {
      console.error("Error adding announcement:", error);
      setError(error.response?.data?.message || "An error occurred");
    }
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
            <InputFiles
              className="Forminput  "
              label="click here or upload an image"
              onChange={handleFileChange}
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
