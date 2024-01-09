import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUserCog } from "react-icons/fa";
export const NavbarAdmin = () => {
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
    <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-5 d-flex justify-content-between">
      <div className="flex-row d-flex mx-3">
    
      <Link style={{textDecoration:"none",fontWeight:"bold",color:"white"}} to="/UsersManagement">
                <h1 style={{ fontWeight:"bold" ,fontSize:"30px"}}>Big & Sale</h1>
              </Link>
      </div>
      <div className="   mx-5">
        <ul className="d-flex align-items-center" >
          <li className="nav-item  ">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <FaUserCog
                  className="iconOption mt-3"
                  style={{
                    backgroundColor: "transparent",
                    fontSize: "19px",
                    color: "white",
                  }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <button
                    className="nav-link text-secondary" 
                    onClick={handleLogout}
                  >
                    <BiLogOut /> <span className="">Logout</span>
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className=" mt-3">
            <Link className="nav-link text-white " >
              {user.map((item) => (
                <h5 key={item._id} style={{fontSize:"15px"}}>
                  {item.User_name}  
                </h5>
              ))}
            </Link>
          </li>
        </ul>
      </div>
 
    </nav>
  );
};
