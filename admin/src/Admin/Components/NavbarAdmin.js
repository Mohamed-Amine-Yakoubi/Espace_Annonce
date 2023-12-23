import React from "react";
import { Link } from "react-router-dom";

export const NavbarAdmin = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
      <div className="flex-row d-flex">
        <button
          type="button"
          className="navbar-toggler mr-2 "
          data-toggle="offcanvas"
          title="Toggle responsive left sidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link
          className="navbar-brand"
          href="#"
          title="Free Bootstrap 4 Admin Template"
        >
          Record Book
        </Link>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsingNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="collapsingNavbar">
        <ul className="navbar-nav">
          
          <li className="nav-item">
            <Link className="nav-link waves-effect waves-light text-white">
              <i className="fas fa-align-justify"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
