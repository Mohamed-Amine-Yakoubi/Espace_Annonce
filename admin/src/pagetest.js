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
  const [,  setCookie, removeCookie] = useCookies("access_token");
  const [user, setUser] = useState([]);
  const handleLogout = () => {
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userRole");
    setCookie("access_token", "", { path: "/" });
 
    removeCookie("access_token");
    window.location.reload(false);
  };
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
  return (
    <div className="SideBar col-md-3 col sidebar-offcanvas pl-0">
      <ul className="nav flex-column sticky-top pl-0 pt-5 mt-3">
        <li className="nav-item mb-2 mt-3">
          <Link className="nav-link text-secondary">
            {user.map((item) => (
              <h5 key={item._id}>
                {item.User_name} {item.User_firstname}
              </h5>
            ))}
          </Link>
        </li>
        <li className="nav-item mb-2  ">
          <Link to="/AdminApp/UsersManagement" className="nav-link text-secondary">
            <FaUser />
            <span className="">Users Management</span>
          </Link>
        </li>

        <li className="nav-item mb-2 ">
          <Link className="nav-link text-secondary" to="/AdminApp/ProductsManagement">
            <LuPackageOpen />
            <span className="">Products Management</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-secondary" to="/AdminApp/CategoryManagement">
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
/************************** */
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AdminApp } from "./Admin/AdminApp.js";
import { ProtectedRoute } from "./Admin/Components/ProtectedRoute.js";
import { SideBar } from "./Admin/Components/SideBar.js";
import { SignIn } from "./Admin/Pages/SignIn.js";
import { NavbarAdmin } from "./Admin/Components/NavbarAdmin.js";
import { UsersManagement } from "./Admin/Pages/UsersManagement.js";
import { ProductsManagement } from "./Admin/Pages/ProductsManagement.js";
import { CategoryManagement } from "./Admin/Pages/CategoryManagement.js";
export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const checkAuthentication = () => {
      setIsAuthenticated(!!cookies.access_token); // Simplified to a boolean value
    };

    checkAuthentication();
  }, [cookies.access_token]);
  return (
    <Router>
      
      {isAuthenticated && <NavbarAdmin />}
      {isAuthenticated && <SideBar />}

      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        {isAuthenticated ? (
          <Route path="*" element={<AdminApp />} />
        ) : (
          <Route path="*" element={<SignIn />} />
        )}
        <Route path="/SignIn" element={<SignIn />} />
        {isAuthenticated ? (
          <Route path="/" element={<AdminApp />} />
        ) : (
          <Route path="/" element={<SignIn />} />
        )}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/AdminApp" element={<AdminApp />} />
          <Route
            path="/AdminApp/UsersManagement"
            element={<UsersManagement />}
          />
          <Route
            path="/AdminApp/ProductsManagement"
            element={<ProductsManagement />}
          />
          <Route
            path="/AdminApp/CategoryManagement"
            element={<CategoryManagement />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
