import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../images/logo192.png";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../Components/Scss/Navbar.scss";
import { SearchBar } from "./SearchBar";
import Dropdown from "react-bootstrap/Dropdown";
import { MdAccountCircle } from "react-icons/md";
import { BiSolidPackage } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCog } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
export const Navbar = () => {
  const [cookies, setCookies] = useCookies("access_token");

  const removeCookies = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userRole");
    window.location.reload(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link
          className="navbar-toggler"
          type="Link"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Link>

        <div className="container-fluid d-flex justify-content-between ">
          <div>
            <Link to="/Home">
              <img className="logo-navbar" src={logo} alt={logo} />
            </Link>
          </div>
          <div>
            <SearchBar />
          </div>
          <div>
            <ul className="navbar-nav  ">
              <li className="nav-item">
                <Link to="/AddAnnonce" className="nav-link">
                  <IoMdAddCircleOutline className="icon" />
                </Link>
              </li>
              <li className="nav-item">
                {cookies.access_token ? (
                  <div>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        <MdAccountCircle className="icon" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link className="nav-link" to="/ClientInformation">
                          <FaUserCog className="icon " />
                            <span className="mx-2">My information</span>
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link className="nav-link" to="/ClientAnnonce">
                            <BiSolidPackage className="icon " />
                            <span className="mx-2">My ads</span>
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link className="nav-link" to="/ClientContact">
                          <TiMessages className="icon " />
                            <span className="mx-2">My messages</span>
                          </Link>
                        </Dropdown.Item>
                        <hr className="m-0"/>
                        <Dropdown.Item>
                          <Link className="nav-link" onClick={removeCookies}>
                            <IoMdLogOut className="icon " />
                            <span className="mx-2">Logout</span>
                          </Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ) : (
                  <Link to="/SignIn" className="nav-link">
                    <i className="bi bi-person"></i>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
