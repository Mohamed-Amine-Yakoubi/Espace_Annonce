import React from "react";
import NotFoundimg from "../images/NotFound.svg";
import { Link } from "react-router-dom";
export const NotFound = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "65.5px",
    marginBottom: "65.5px",
  };

  const imgStyle = {
    width: "400px",
    position:"relative",
  };

  const buttonStyle = {
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div style={containerStyle}>
      <div>
        <img src={NotFoundimg} style={imgStyle} alt="img" />
        <Link style={buttonStyle} to='./Home'className="btn GoHome btn-dark">
          Go Home
        </Link>
      </div>
    </div>
  );
};
