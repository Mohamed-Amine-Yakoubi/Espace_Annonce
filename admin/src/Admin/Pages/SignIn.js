import React, { useState } from "react";
import "../Scss/SignIn.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FormInput } from "../Components/FormInput.js";
import { CostumButton } from "../Components/CostumButton.js";
import { FaUser } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";

/********************************/

export const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({ User_email: "", User_password: "" });

  const [, setCookies] = useCookies(["access_token"]);
  const handleChangeValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/project_announcement/SignIn", user)
      .then((res) => {
        setCookies("access_token", res.data.token);
        window.localStorage.setItem("userID", res.data.user._id);
        window.localStorage.setItem("userRole", res.data.user.role);

        navigate("/UsersManagement");
        window.location.reload(false);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <div>
      <div className="Sign">
        <div className="wrapper">
          <h1>Hello Again!</h1>
          <p>
            Welcome back you've <br /> been missed!
          </p>

          {error ? (
            <p className="alert alert-danger text-center">{error}</p>
          ) : null}
          <form onSubmit={handleSignIn}>
            <div className="input-container">
              <FormInput
                className="Forminput"
                type="text"
                placeholder="Enter email"
                name="User_email"
                onChange={handleChangeValue}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-container">
              <FormInput
                className="Forminput"
                type="password"
                placeholder="Password"
                name="User_password"
                onChange={handleChangeValue}
              />
              <FaUnlockAlt className="icon" />
            </div>

            <CostumButton className="ButtonSubmit" type="submit">
              Sign in
            </CostumButton>
          </form>
        </div>
      </div>
    </div>
  );
};
