import React, { useEffect, useState } from "react";
import "../Scss/DataTable.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { MdDelete } from "react-icons/md";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaEye,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { SearchBar } from "../Components/SearchBar";
export const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/project_announcement/GetAllUsers",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        );
        setUsers(response.data.data);
        setLoading(false); // Set loading to false once data is fetched

      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false once data is fetched

      }
    };

    fetchData();
  }, [cookies.access_token]);
   
  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:3000/project_announcement/DeleteSpecificUsers/${userId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
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

  const filteredData = users.filter((user) =>
    user.User_name.toLowerCase().includes(filter.toLowerCase())||
    user.User_firstname.toLowerCase().includes(filter.toLowerCase())||
    user.User_email.toLowerCase().includes(filter.toLowerCase())||
    user.User_phone.toLowerCase().includes(filter.toLowerCase())
  );

  // Paginate the filtered data
  const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
  const handleSearch = (searchTerm) => {
    setFilter(searchTerm);
  };
  return (
    <div>
         {loading ? (
        <div>Loading...</div>
      ) : (
      <table className="table container">
        <thead>
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
          <td>id</td>
          <td>Name</td>
          <td>Firstname</td>
          <td>Email</td>
          <td>Phone</td>
          <td></td>
        </tr>
        <tbody>
        {paginatedData.length === 0 ? (
            <tr className="tabletitle">
              <td colSpan={6} className="text-center">This customer has no ads</td>
            </tr>
          ) : (
           paginatedData.map((e, i) => (
            <tr key={e._id}>
              <td>{i + 1 + offset}</td>
              <td>{e.User_name}</td>
              <td>{e.User_firstname}</td>
              <td>{e.User_email}</td>
              <td>{e.User_phone}</td>
              <td className="d-flex justify-content-center">
                <button className="btn btn-danger mx-2">
                  <MdDelete onClick={() => handleDelete(e._id)} />
                </button>
                <Link className="btn btn-success" to={`clientAds/${e._id}`}>
                  <FaEye />
                </Link>
              </td>
            </tr>
          ))
          )}
        </tbody>
      </table>)}
      {users.length>5 ?(
      <ReactPaginate
        previousLabel={<FaArrowAltCircleLeft style={{ color: "#212529" }} />}
        nextLabel={<FaArrowAltCircleRight style={{ color: "#212529" }} />}
        breakLabel={"..."}
        pageCount={Math.ceil(users.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        />):null}
    </div>
  );
};
