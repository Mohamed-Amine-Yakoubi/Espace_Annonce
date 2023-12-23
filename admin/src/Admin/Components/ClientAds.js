import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "../Scss/DataTable.scss";
import { MdDelete } from "react-icons/md";
export const ClientAds = () => {
  const [ads, setAds] = useState([]);

  const [cookies] = useCookies(["access_token"]);
  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/project_announcement/Get_spec_ProductByIdUser/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
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
  }, [id, cookies.access_token]);

  /***************** */
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

      setAds((prevads) => prevads.filter((user) => user._id !== adsId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <table className="table">
        <thead style={{ backgroundColor: "dark", color: "white" }}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title </th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {ads.map((e, i) => (
            <tr>
              <th scope="row"> {i + 1} </th>
              <td> {e.Product_Name} </td>
              <td> {e.Product_Description} </td>
              <td> {e.Product_Price} </td>
              <td> {e.category} </td>
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
