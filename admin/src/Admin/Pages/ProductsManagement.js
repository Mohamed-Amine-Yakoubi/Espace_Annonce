import React, { useEffect, useState } from "react";
import "../Scss/DataTable.scss";
import axios from "axios";
import { Link } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaEye } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { SearchBar } from "../Components/SearchBar";
import ReactPaginate from "react-paginate";

export const ProductsManagement = () => {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState("");
  const [cookies] = useCookies(["access_token"]);
  const [currentPage, setCurrentPage] = useState(0);
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
        return {
          category: "Unknown Category",
        };
      }
    };

    fetchData();
  }, []);

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
  /****************************** */
  const itemsPerPage = 5;
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const offset = currentPage * itemsPerPage;

  const filteredData = ads.filter((ads) =>
  ads.Product_Name.toLowerCase().includes(filter.toLowerCase())||
  ads.category.toLowerCase().includes(filter.toLowerCase())
  ||
  ads.Product_Price.toLowerCase().includes(filter.toLowerCase())
  
  );

  // Paginate the filtered data
  const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
const handleSearch=(searchTerm)=>{
setFilter(searchTerm)
}
  return (
    <div>
      <table className="table container">
      <thead>
          <tr>
            <td colSpan={6} >
              <div className="d-flex justify-content-between">
                <div className="mt-2">client Ads</div>
                <div>
                <SearchBar onSearch={handleSearch} />
                </div>
              </div>
            </td>
          </tr>
        </thead>
        <tr className="tabletitle">
            <td>id</td>
            <td>Picture</td>
            <td>Product Title</td>

            <td>Product category</td>
            <td>Product Price</td>
            <td></td>
          </tr>
        <tbody>
        

        {paginatedData.map((e, i) => (
            <tr key={i + 1}>
              <td>{i}</td>
              <td>
                {e.Product_Picture.length >= 1 && (
                  <img
                    src={`http://localhost:3000/${e.Product_Picture[0]}`}
                    alt={e.Product_Picture[0]}
                  />
                )}
              </td>
              <td>{e.Product_Name}</td>

              <td>{e.category}</td>
              <td>{e.Product_Price}</td>

              <td className=" d-flex  ">
                <button className="btn btn-danger  mx-1 ">
                  <MdDelete onClick={() => handleDelete(e._id)} />
                </button>
                <Link
                  className="btn btn-success mx-1 "
                  to={`AdsDetails/${e._id}`}
                >
                  <FaEye />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={<FaArrowAltCircleLeft style={{ color: "#212529" }} />}
        nextLabel={<FaArrowAltCircleRight style={{ color: "#212529" }} />}
        breakLabel={"..."}
        pageCount={Math.ceil(ads.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};
