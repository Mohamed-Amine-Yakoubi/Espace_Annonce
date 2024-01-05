import React, { useEffect, useState } from "react";
import { FormInput } from "../Components/FormInput";
import { Costumdroplist } from "../Components/Costumdroplist";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import axios from "axios";
import { CostumButton } from "../Components/CostumButton";
import { InputFiles } from "../Components/InputFiles";
import { useNavigate, useParams } from "react-router-dom";

export const ProductUpdate = () => {
  const { id } = useParams();

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
  });
  /************************************** */

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/project_announcement/get_specProductById/${id}`
      )
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error.response);
      });
  }, [id]);

  /************************************ */
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
  
    // Append fields excluding Product_Picture
    formData.append("Product_Name", product.Product_Name);
    formData.append("Product_Description", product.Product_Description);
    formData.append("Product_Price", product.Product_Price);
    formData.append("Product_Category", product.Product_Category);
    formData.append("Product_Location", product.Product_Location);
    formData.append("createdBy", product.createdBy);
  
    
      
      for (let i = 0; i < product.Product_Picture.length; i++) {
        formData.append("Product_Picture", product.Product_Picture[i]);
      }
  
  
    try {
      await axios.put(
        `http://localhost:3000/project_announcement/UpdateProduct/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      toast.success("Your ad has been successfully updated");
  
      setTimeout(() => {
        navigate(`/AdsDetails/${id}`);
      }, 2000);
    } catch (error) {
      toast.error("Ads failed to update");
    }
  };
  
  
  /********************************** */
  return (
    <div>
      <div className="container ">
 
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
                value={product.Product_Name}
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
                value={product.Product_Description}
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
                value={product.Product_Price}
                onChange={handlechangevalue}
              />
            </div>
            <div className="inputfield">
              <label className="label  ">Location? *</label>
              <FormInput
                className="Forminput  "
                type="text"
                name="Product_Location"
                placeholder="Enter your Location"
                value={product.Product_Location}
                onChange={handlechangevalue}
              />
            </div>
            <div className="inputfield">
              <label className="label  ">Picture *</label>
              <InputFiles
                className="Forminput  img"
                label="click here or upload an image"
                value={product.Product_Picture}
                onChange={handleFileChange}
              />
              {Array.isArray(product.Product_Picture)&& product.Product_Picture.map((e, i) => (
                <img
                  key={i}
                  value={product.Product_Picture}
                  src={`http://localhost:3000/${e}`}
                  alt="Selected Product"
                  className="image-preview mx-4 mt-2 mb-2"
                  style={{ width: "90px", height: "90px",objectFit:"cover" }}
                />
              ))}
            </div>

            <CostumButton className="ButtonSubmit" type="submit">
              Publish
            </CostumButton>
          </form>
        </div>
      </div>
    </div>
  );
};