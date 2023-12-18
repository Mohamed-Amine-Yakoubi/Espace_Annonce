import React  from "react";
import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ role, ...rest }) => {
  const [cookies] = useCookies("access_token");
 
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = cookies.access_token && userRole ===role;
  return (
    <div>
      {isAuthenticated   ? <Outlet {...rest} /> : <Navigate to={"/Home"} />}
    </div>
  );
};
