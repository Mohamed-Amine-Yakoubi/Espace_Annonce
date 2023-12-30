import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaEye,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "../Scss/DataTable.scss";
import { MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { SearchBar } from "./SearchBar";
export const ClientAds = () => {
  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
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
  /*****************************/
  const itemsPerPage = 5; // Number of items to display per page

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;

  const filteredData = ads.filter(
    (ads) =>
      ads.Product_Name.toLowerCase().includes(filter.toLowerCase()) ||
      ads.Product_Price.toLowerCase().includes(filter.toLowerCase()) ||
      ads.Product_Category.toLowerCase().includes(filter.toLowerCase())
  );

  // Paginate the filtered data
  const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
  const handleSearch = (searchTerm) => {
    setFilter(searchTerm);
  };
  return (
    <div>
      <table className="table container">
        <thead style={{ backgroundColor: "dark", color: "white" }}>
          <tr>
            <td colSpan={6}>
              <div className="d-flex justify-content-between">
                <div className="mt-2">Clients</div>
                <div>
                  <SearchBar onSearch={handleSearch} />
                </div>
              </div>
            </td>
          </tr>
        </thead>
        <tr className="tabletitle">
          <td>#</td>
          <td>Pictures </td>
          <td>Title </td>

          <td>Price</td>
          <td>category</td>
          <td></td>
        </tr>
        <tbody>
          {" "}
          {paginatedData.length === 0 ? (
            <tr className="tabletitle">
              <td colSpan={6} className="text-center">This customer has no ads</td>
            </tr>
          ) : (
            paginatedData.map((e, i) => (
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
                <td> {e.Product_Name} </td>

                <td> {e.Product_Price} </td>
                <td> {e.category} </td>
                <td className="d-flex justify-content-center ">
                  <button className="btn btn-danger mx-2">
                    <MdDelete onClick={() => handleDelete(e._id)} />
                  </button>
                  <Link className="btn btn-success" to={`/AdsDetails/${e._id}`}>
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {ads.length>5 ?(
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
      />):null}
    </div>
  );
};
