import React, { useEffect, useState } from "react";
import "../Scss/DataTable.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useCookies } from "react-cookie";

export const ProductsManagement = () => {
  const [ads, setAds] = useState([]);

  const [cookies] = useCookies(["access_token"]);

  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/project_announcement/GetAllProducts`
        );
        const result = await Promise.all(
          res.data.data.map(async (product) => {
            const categoryRes = await axios.get(
              `http://localhost:3000/project_announcement/getcategory/${product.Product_Category}`
            );

            const category = categoryRes.data.data;

            return {
              ...product,
              category: category.Cat_Name,
            };
          })
        );

        setAds(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async (adsId) => {
    try {
      await axios.delete(
        `http://localhost:3000/project_announcement/DeleteProduct/${adsId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );

      setAds((prevAds) => prevAds.filter((e) => e._id !== adsId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <table className="table container">
        <thead>
          <tr>
            <th>id</th>
            <th>Picture</th>
            <th>Product Title</th>
            <th>Product Description</th>
            <th>Product category</th>
            <th>Product Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ads.map((e, i) => (
            <tr key={i + 1}>
              <td>{i}</td>
              <td>
           
                <img src={e.Product_Picture} alt={e.Product_Picture} /> 
              </td>
              <td>{e.Product_Name}</td>
              <td>{e.Product_Description}</td>
              <td>{e.category}</td>
              <td>{e.Product_Price}</td>

              <td className="d-flex justify-content-center">
                <button className="btn btn-danger mx-2">
                  <MdDelete onClick={() => handleDelete(e._id)} />
                </button>
                <Link className="btn btn-success" to={`clientAds/${e._id}`}>
                  <FaEye />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
