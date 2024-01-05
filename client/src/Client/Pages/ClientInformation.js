import axios from "axios";
import React, { useEffect, useState } from "react";

import { FormInput } from "../Components/FormInput";
import { CostumButton } from "../Components/CostumButton";
import { useCookies } from "react-cookie";

export const ClientInformation = () => {
  const [error, setError] = useState("");

  const userID = localStorage.getItem("userID");
  const [cookies] = useCookies(["access_token"]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [UpdateUser, setUpdateUser] = useState({
    User_name: "",
    User_firstname: "",
    User_email: "",
    User_password: "",
    User_phone: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/project_announcement/GetUserById/${userID}`)
      .then((res) => {
        setUpdateUser(res.data.data[0]);
      })
      .catch((error) => {
        setError(error.res.data.message);
        console.error("Error:", error.res);
      });
  }, [userID]);

  const handleChangeValue = (e) => {
    if (e.target.name === "User_password") {
      setUpdateUser((prevUpdateUser) => ({
        ...prevUpdateUser,
        User_password: e.target.value,
      }));
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else {
      setUpdateUser((prevUpdateUser) => ({
        ...prevUpdateUser,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleNewUser = (e) => {
    e.preventDefault();
  
    if (
      UpdateUser.User_password !== "" &&
      UpdateUser.User_password === confirmPassword
    ) {
     
   
      const requestPayload = {
        ...UpdateUser,
        // Exclude User_password from the update if not provided
        User_password: UpdateUser.User_password !== "" ? UpdateUser.User_password : undefined,
      };
      axios
        .put(
          `http://localhost:3000/project_announcement/UpdateAccountPassword/${userID}`,
          JSON.stringify(requestPayload),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        )
        .then((res) => {
          alert(res.data.message);
          window.location.reload(false);
        })
        .catch((error) => {
          setError(
            error.response?.data?.message ||
              "An error occurred while updating password"
          );
          console.error("Error:", error.response);
        });
      }
      // Update the other user information without checking passwords
      axios
        .put(
          `http://localhost:3000/project_announcement/UpdateAccount/${userID}`,
          JSON.stringify({
            ...UpdateUser,
            // Exclude User_password from the update if not provided
            User_password: undefined,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        )
        .then((res) => {
          alert(res.data.message);
          window.location.reload(false);
        })
        .catch((error) => {
          setError(
            error.response?.data?.message ||
              "An error occurred while updating account"
          );
          console.error("Error:", error.response);
        });
    }
 

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
                placeholder="Enter Name"
                name="User_name"
                value={UpdateUser.User_name}
                onChange={handleChangeValue}
              />
              <i className="bi bi-person-fill"></i>
            </div>
            <div className="input-container">
              <FormInput
                className="Forminput"
                type="text"
                placeholder="Enter Firstname"
                name="User_firstname"
                value={UpdateUser.User_firstname}
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
                value={UpdateUser.User_email}
                onChange={handleChangeValue}
              />
              <i className="bi bi-envelope-fill"></i>
            </div>
            <div className="input-container">
              <FormInput
                className="Forminput"
                type="password"
                placeholder="New Password"
                name="User_password"
                onChange={handleChangeValue}
              />
              <i className="bi bi-lock-fill"></i>
            </div>
            <div className="input-container">
              <FormInput
                className="Forminput"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
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
                value={UpdateUser.User_phone}
                onChange={handleChangeValue}
              />
              <i className="bi bi-telephone-fill"></i>
            </div>
            <CostumButton className="ButtonSubmit" type="submit">
              Update
            </CostumButton>
          </form>
        </div>
      </div>
    </div>
  );
};
