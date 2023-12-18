import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../images/logo192.png";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../Components/Scss/Navbar.scss";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies("access_token");

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("Home");
  };
  const removeCookies = () => {
   
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userRole");
    window.location.reload(false);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="container-fluid d-flex justify-content-between ">
          <div>
            <img
              className="logo-navbar"
              src={logo}
              alt={logo}
              onClick={handleLogoClick}
              tabIndex="0"
            />
          </div>
          <div>
            <SearchBar />
          </div>
          <div>
            <ul className="navbar-nav  ">
              <li className="nav-item  ">
                <button
                  onClick={() => navigate("Shoppingcart")}
                  className="nav-link"
                >
                  {" "}
                  <i className="bi bi-cart3"></i>
                </button>
              </li>
              <li className="nav-item">
            
                  <button
                    onClick={() => navigate("AddAnnonce")}
                    className="nav-link"
                  >
                    <i className="bi bi-plus-circle"></i>
                  </button>
             
                
             
              </li>
              <li className="nav-item">
                {cookies.access_token ? (
                  <button className="nav-link" onClick={removeCookies}>
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("SignIn")}
                    className="nav-link"
                  >
                    <i className="bi bi-person"></i>
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
