import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { LuPackageOpen } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import "./Scss/SideBar.scss";
import axios from "axios";

/*********************************** */
export const SideBar = () => {
  const [, setCookies] = useCookies("access_token");
  const [user, setUser] = useState([]);
  const handleLogout = () => {
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userRole");
    setCookies("access_token", "");
    window.location.reload(false);
  };
  const userID = localStorage.getItem("userID");
 
  useEffect(() => {
    if (userID) {
      axios
        .get(`http://localhost:3000/project_announcement/GetUserById/${userID}`)
        .then((res) => {
          console.log(res );
          setUser(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [userID]);
  return (
    <div className="SideBar col-md-3 col sidebar-offcanvas pl-0" id="sidebar" role="navigation">
      <ul className="nav flex-column sticky-top pl-0 pt-5 mt-3">
        <li className="nav-item mb-2 mt-3">
          <Link className="nav-link text-secondary">
            {user.map((item) => (
              <h5 key={item._id}>{item.User_name} {item.User_firstname}</h5>
            ))}
          </Link>
        </li>
        <li className="nav-item mb-2  ">
          <Link className="nav-link text-secondary" to="/UsersManagement">
            <FaUser />
            <span className="">Users Management</span>
          </Link>
        </li>

        <li className="nav-item mb-2 ">
          <Link className="nav-link text-secondary" to="/UsersManagement">
            <LuPackageOpen />
            <span className="">Products Management</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-secondary">
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
