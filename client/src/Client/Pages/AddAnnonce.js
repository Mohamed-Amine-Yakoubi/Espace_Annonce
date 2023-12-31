import React, { useState } from "react";
import { FormInput } from "../Components/FormInput.js";
import "../Scss/AddAnnonce.scss";
import { Costumdroplist } from "../Components/Costumdroplist";
import { CostumButton } from "../Components/CostumButton";
import axios from "axios";
import TunisiaRegions from "./TunisiaRegions.js";
import { useCookies } from "react-cookie";
import { InputFiles } from "../Components/InputFiles";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const AddAnnonce = () => {
  const id_user = localStorage.getItem("userID");
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const apiUrl = "http://localhost:3000/project_announcement/getAllCategories";

  const [product, setProduct] = useState({
    Product_Name: "",
    Product_Description: "",
    Product_Price: "",
    Product_Location: "",
    Product_Category: "",
    Product_Picture: [],
    createdBy: id_user,
  });
  /************************************** */
  const handleSelectedRegion = (selectedRegion) => {
    setProduct({ ...product, Product_Location: selectedRegion || "" });
  };
  const handleSelectedCategoryId = (selectedCategoryId) => {
    setProduct({ ...product, Product_Category: selectedCategoryId || "" });
  };

  const handlechangevalue = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFileChange = (files) => {
    setProduct((prevProduct) => ({ ...prevProduct, Product_Picture: files }));
  };

  const handleAddAnnonce = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Product_Name", product.Product_Name);
    formData.append("Product_Description", product.Product_Description);
    formData.append("Product_Price", product.Product_Price);
    formData.append("Product_Category", product.Product_Category);
    for (let i = 0; i < product.Product_Picture.length; i++) {
      formData.append("Product_Picture", product.Product_Picture[i]);
    }
    formData.append("Product_Location", product.Product_Location);
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
      if (response) {
        toast.success("your ads added successfully!\nAd generation may take up to 24 hours.");
 
      }
    } catch (error) {
      toast.error("ads failed to add ");
    }
    setTimeout(() => {
      navigate("/ClientAnnonce");
    }, 1500)
 
  };

  /********************************** */
  return (
    <div className="container ">
      <Toaster />
      <div className="AddAnnonce    ">
        <h1>Create an ad</h1>

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
            <label className="label   ">Description ad *</label>
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

          <div className="costumdroplist">
            <div className="inputfield select-container ">
              <label className="label">Location? *</label>
              <select
                value={product.Product_Location} // Set the value attribute to the selected region
                onChange={(e) => handleSelectedRegion(e.target.value)}
              >
                <option disabled value="" selected>
                  region
                </option>
                {TunisiaRegions.map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="inputfield">
            <label className="label  ">Picture *</label>
            <InputFiles
              className="Forminput  img"
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
