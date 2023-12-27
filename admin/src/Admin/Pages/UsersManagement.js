import React, { useEffect, useState } from "react";
import "../Scss/DataTable.scss";
import axios from "axios";
import {Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
export const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies(["access_token"]);

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
      } catch (error) {
        console.error(error);
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
  
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      <table className="table container">
      <thead   >
          <tr>
            <td>id</td>
            <td>Name</td>
            <td>Firstname</td>
            <td>Email</td>
            <td>Phone</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {users.map((e, i) => (
            
            <tr key={i+1}>
              <td>{i}</td>
              <td>{e.User_name}</td>
              <td>{e.User_firstname}</td>
              <td>{e.User_email}</td>
              <td>{e.User_phone}</td>
              <td className="d-flex justify-content-center">
                <button className="btn btn-danger mx-2">
                  <MdDelete onClick={()=>handleDelete(e._id)} />
                </button>
                <Link className="btn btn-success" to= {`clientAds/${e._id}`}>
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
