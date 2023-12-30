import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Scss/CategoryManagement.scss";
import "../Scss/DataTable.scss";
import { SearchBar } from "../Components/SearchBar.js";
import { useCookies } from "react-cookie";
import { FormInput } from "../Components/FormInput";
import { CostumButton } from "../Components/CostumButton";
import { InputFiles } from "../Components/InputFiles";
import { MdDelete } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import ReactPaginate from "react-paginate";

import toast, { Toaster } from "react-hot-toast";
export const CategoryManagement = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const id_user = localStorage.getItem("userID");
  const [cookies] = useCookies(["access_token"]);
  const [rescategory, setRescategory] = useState([]);

  const [category, setCategory] = useState({
    Cat_Name: "",
    Cat_Picture: [],
    createdBy: id_user,
  });
  /************************************** */

  const handlechangevalue = (e) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFileChange = (files) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      Cat_Picture: files,
    }));
  };

  const handleAddAnnonce = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Cat_Name", category.Cat_Name);

    for (let i = 0; i < category.Cat_Picture.length; i++) {
      formData.append("Cat_Picture", category.Cat_Picture[i]);
    }

    formData.append("createdBy", category.createdBy);

    try {
      const res = await axios.post(
        "http://localhost:3000/project_announcement/addCategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );

      if (res) {
        toast.success("Category added successfully!");

        // Update the state to include the newly added category
        setRescategory((prevCategories) => [...prevCategories, res.data.data]);

        // Clear the input fields by resetting the state for the category
        setCategory({
          Cat_Name: "",
          Cat_Picture: [],
          createdBy: id_user,
        });
      }
    } catch (error) {
      toast.error("The category has not been added");
    }
  };

  /******************************** */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/project_announcement/getAllCategories",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        );

        setRescategory(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [cookies.access_token]);
  /************************************************** */
  const handleDelete = async (CategoryId) => {
    try {
      await axios.delete(
        `http://localhost:3000/project_announcement/deletecategory/${CategoryId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );

      setRescategory((prevCategory) =>
        prevCategory.filter((Category) => Category._id !== CategoryId)
      );
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

  const filteredData = rescategory.filter((category) =>
    category.Cat_Name.toLowerCase().includes(filter.toLowerCase())
  );

  // Paginate the filtered data
  const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
  const handleSearch = (searchTerm) => {
    setFilter(searchTerm);
  };
  return (
    <div className="container ">
      <div className="AddAnnonce    ">
        {/* ... (your existing code) */}
        <Toaster />

        <h4>Add a new category</h4>

        <form onSubmit={handleAddAnnonce}>
          <div className="inputfield">
            <FormInput
              className="Forminput  "
              type="text"
              placeholder="Enter the title"
              name="Cat_Name"
              onChange={handlechangevalue}
            />
          </div>

          <div className="inputfield">
            <InputFiles
              className="Forminput "
              label="click here or upload an image"
              onChange={handleFileChange}
            />
          </div>
          <CostumButton className="ButtonSubmit" type="submit">
            Publish
          </CostumButton>
        </form>
      </div>
      <table className="table container">
        <thead>
          <tr>
            <td colSpan={4} >
              <div className="d-flex justify-content-between">
                <div className="mt-2">Categories</div>
                <div>
                <SearchBar onSearch={handleSearch} />
                </div>
              </div>
            </td>
          </tr>
        </thead>
        <tr className="tabletitle">
          <td>#</td>
          <td>Picture</td>
          <td>Category</td>

          <td></td>
        </tr>
        <tbody>
        {paginatedData.length === 0 ? (
            <tr className="tabletitle">
              <td colSpan={6} className="text-center">there are no categories</td>
            </tr>
          ) : (
         paginatedData.map((e, i) => (
            <tr key={i + 1}>
              <td>{i}</td>
              <td>
                {e.Cat_Picture && (
                  <img
                    src={`http://localhost:3000/${e.Cat_Picture[0]}`}
                    alt={e.Cat_Picture[0]}
                  />
                )}
              </td>
              <td>{e.Cat_Name}</td>
              <td className="d-flex justify-content-center pt-3" >
                <button className="btn btn-danger">
                  <MdDelete onClick={() => handleDelete(e._id)} />
                </button>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
      {rescategory.length>5 ?(
    
    
      <ReactPaginate
        previousLabel={<FaArrowAltCircleLeft style={{ color: "#212529" }} />}
        nextLabel={<FaArrowAltCircleRight style={{ color: "#212529" }} />}
        breakLabel={"..."}
        pageCount={Math.ceil(rescategory.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        />):null}
    </div>
  );
};
