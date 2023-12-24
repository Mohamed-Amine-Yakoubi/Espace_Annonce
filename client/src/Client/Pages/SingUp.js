import React, { useState } from "react";
import "../Scss/SignIn.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FormInput } from "../Components/FormInput";
import { CostumButton } from "../Components/CostumButton";

/********************************/
export const SingUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [, setCookies] = useCookies("access_token");
  const [user, setUser] = useState({
    User_name: "",
    User_firstname: "",
    User_email: "",
    User_password: "",
    User_phone: "",
  });
  const handleChangeValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleNewUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/project_announcement/SignUp", user)
      .then((res) => {
        alert(res.data.message);
        navigate("/Home");

        setCookies("access_token", res.data.token);
        window.localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userID", res.data.user._id);
        window.location.reload(false);
      })
      .catch((error) => {
        setError(error.res.data.message);
        console.error("Error:", error.res); // Log the detailed error response
      });
  };

  return (
    <div className="Sign">
      <div>
        <div className="wrapper">
          <h1>Create your Account</h1>
          {error ? (
            <p className="alert alert-danger text-center">{error}</p>
          ) : null}
          <form onSubmit={handleNewUser}>
            <div className="input-container">
              <FormInput
                className="Forminput"
                type="text"
                placeholder="Enter Name  "
                name="User_name"
                onChange={handleChangeValue}
              />
              <i className="bi bi-person-fill"></i>
            </div>
            <div className="input-container">
              <FormInput
                className="Forminput"
                type="text"
                placeholder="Enter Firstname  "
                name="User_firstname"
                onChange={handleChangeValue}
              />
              <i className="bi bi-person-fill"></i>
            </div>
            <div className="input-container">
              <FormInput
                className="Forminput"
                type="email"
                placeholder="Email"
                name="User_email"
                onChange={handleChangeValue}
              />
              <i className="bi bi-envelope-fill"></i>
            </div>

            <div className="input-container">
              <FormInput
                className="Forminput"
                type="password"
                placeholder="Password"
                name="User_password"
                onChange={handleChangeValue}
              />
              <i className="bi bi-lock-fill"></i>
            </div>
            <div className="input-container">
              <FormInput
                className="Forminput"
                type="text"
                placeholder="Phone"
                name="User_phone"
                onChange={handleChangeValue}
              />
              <i className="bi bi-telephone-fill"></i>
            </div>
            <CostumButton className='ButtonSubmit' type="submit">Sign in</CostumButton>
          </form>

          <div className="not-member">
            Not a member? <Link to="/SignIn">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
