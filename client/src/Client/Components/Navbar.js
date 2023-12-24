import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../images/logo192.png";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../Components/Scss/Navbar.scss";
import { SearchBar } from "./SearchBar";

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
              <img className="logo-navbar" src={logo} alt={logo} tabIndex="0" />
            </Link>
          </div>
          <div>
            <SearchBar />
          </div>
          <div>
            <ul className="navbar-nav  ">
              <li className="nav-item  ">
                <Link to="/Shoppingcart" className="nav-link">
                  <i className="bi bi-cart3"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AddAnnonce" className="nav-link">
                  <i className="bi bi-plus-circle"></i>
                </Link>
              </li>
              <li className="nav-item">
                {cookies.access_token ? (
                  <Link className="nav-link" onClick={removeCookies}>
                    <i className="bi bi-box-arrow-right"></i>
                  </Link>
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
