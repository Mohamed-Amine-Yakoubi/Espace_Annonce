import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { LuPackageOpen } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import "../Scss/SideBar.scss";

import axios from "axios";

/*********************************** */
export const SideBar = (onSelect) => {
  const [, setCookie, removeCookie] = useCookies("access_token");
  const [user, setUser] = useState([]);
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    if (userID) {
      axios
        .get(`http://localhost:3000/project_announcement/GetUserById/${userID}`)
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [userID]);
  const handleLogout = () => {
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userRole");
    setCookie("access_token", "", { path: "/" });

    removeCookie("access_token");
 
    window.location.reload(false);
  };

  return (
    <div className=" sidebar d-flex flex-column justify-content-space-between   p-4 vh-100 ">
      <ul className="nav nav-pills flex-column p-0 m-0">
        <li className="nav-item mb-2 mt-5">
          <Link className="nav-link text-secondary">
            {user.map((item) => (
              <h5 key={item._id}>
                {item.User_name} {item.User_firstname}
              </h5>
            ))}
          </Link>
        </li>
        <li className="nav-item mb-2  ">
          <Link
            to="/AdminApp/UsersManagement"
            className="nav-link text-secondary"
          >
            <FaUser />
            <span className="">Users Management</span>
          </Link>
        </li>

        <li className="nav-item mb-2 ">
          <Link
            className="nav-link text-secondary"
            to="/AdminApp/ProductsManagement"
          >
            <LuPackageOpen />
            <span className="">Products Management</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            className="nav-link text-secondary"
            to="/AdminApp/CategoryManagement"
          >
            <MdCategory />
            <span className="">Categories Management</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <button className="nav-link text-secondary" onClick={handleLogout}>
            <BiLogOut /> <span className="">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
