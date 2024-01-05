import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuPackageOpen } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import "../Scss/SideBar.scss";
import { HiOutlineBars3 } from "react-icons/hi2";

export const SideBar = () => {
 const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className={`sidebar  ${isVisible ? "visible" : "hidden"}`}>
 <button onClick={toggleVisibility} className={`toggle-button border-0 btn ${isVisible ? "" : "moved"} `}>
        <HiOutlineBars3 style={{fontSize:"30px"}}/>
      </button>
    {isVisible && (
    <ul className="nav nav-pills flex-column   pt-5">
        <li className="nav-item mb-2">
          <Link to="/UsersManagement" className="nav-link text-secondary">
            <FaUser />
            <span className="">Users Management</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/ProductsManagement" className="nav-link text-secondary">
            <LuPackageOpen />
            <span className="">Products Management</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/CategoryManagement" className="nav-link text-secondary">
            <MdCategory />
            <span className="">Categories Management</span>
          </Link>
        </li>
      </ul>)}
    </div>
  );
};
